/**
 * ACRI Scoring Engine
 *
 * ARCHITECTURE:
 * This engine produces TWO separate outputs:
 *
 * 1. AcriDecisionResult — candidate-facing result.
 *    - readiness decision is score-only (score >= 80 = Industry Ready)
 *    - does NOT include gate results
 *    - consumed by result UI, certificate, share card
 *
 * 2. AcriInternalMetrics (gateResults field) — internal/admin only.
 *    - gate pass/fail data lives here
 *    - never shown to candidate
 *    - used for analytics, reporting, future admin dashboard
 *
 * This separation prevents the candidate-facing contradiction where
 * score >= 80 but readiness is "Readiness Gap Identified" due to gates.
 *
 * Rule: getAcriReadinessState(score) from acriReadiness.ts is the
 * authoritative classifier. This engine calls it and does NOT replicate
 * the threshold logic.
 */

import {
  ACRI_PV_COMPETENCIES,
  CRITICAL_GATES,
  NARRATIVE_SCORING_RUBRIC,
  type AcriDecisionResult,
  type CriticalGateRule,
} from "@/data/acri/acriPvStandard";
import { ACRI_PV_WORK_SIMULATION_ITEMS, type AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";
import type { AcriGateAnalytic, AcriInternalMetrics, AcriItemAnalytic } from "./acriAnalytics";
import { getAcriReadinessState } from "./acriReadiness";

export interface CandidateResponses {
  answers: Record<string, unknown>;
  timeSpentSeconds?: Record<string, number>;
  flaggedItems?: string[];
  attemptId?: string;
  startedAt?: number;
}

// ─── Main Evaluation Function ────────────────────────────────────────────────

export function evaluateCandidateResponses(
  responses: CandidateResponses,
  items: (AcriAssessmentItem | any)[] = ACRI_PV_WORK_SIMULATION_ITEMS,
): AcriDecisionResult {
  const dimensionTallies: Record<
    string,
    { totalPoints: number; earnedPoints: number; itemCount: number }
  > = {};

  // Initialize tallies for all 9 competencies
  Object.keys(ACRI_PV_COMPETENCIES).forEach((k) => {
    dimensionTallies[k] = { totalPoints: 0, earnedPoints: 0, itemCount: 0 };
  });

  items.forEach((item) => {
    const itemId = item.id || item.itemId;
    const rawAnswer = responses.answers[itemId] ?? responses.answers[item.id] ?? responses.answers[item.itemId];
    let earned = 0;
    const maxPoints = 100;

    const matchingOpt = item.options?.find((o: any) => o.key === rawAnswer);

    // Primary: if matching option is marked correct or equals correctAnswer directly
    if (matchingOpt?.isCorrect === true) {
      earned = 100;
    } else if (item.correctAnswer && rawAnswer === item.correctAnswer) {
      earned = 100;
    } else if (item.simulationType === "intake_validation" && rawAnswer && typeof rawAnswer === "object") {
      const ans = rawAnswer as Record<string, unknown>;
      const crit = (ans.criteria as Record<string, boolean>) || {};
      let critMatches = 0;
      if (crit.patient === true) critMatches += 20;
      if (crit.reporter === true) critMatches += 20;
      if (crit.product === true) critMatches += 20;
      if (crit.event === true) critMatches += 20;
      if (ans.verdict === "valid") critMatches += 20;
      earned = critMatches;
    } else if (item.simulationType === "field_extraction" && rawAnswer && typeof rawAnswer === "object") {
      const correct = (item.correctAnswer as Record<string, unknown>) || {};
      const ans = rawAnswer as Record<string, unknown>;
      let matches = 0;
      const totalFields = Object.keys(correct).length;
      Object.keys(correct).forEach((fieldKey) => {
        if (ans[fieldKey] === correct[fieldKey]) matches++;
      });
      earned = totalFields > 0 ? Math.round((matches / totalFields) * 100) : 0;
    } else if (item.simulationType === "who_causality") {
      if (rawAnswer === "Probable_Likely" || rawAnswer === item.correctAnswer) {
        earned = 100;
      } else if (rawAnswer === "Certain" || rawAnswer === "Possible") {
        earned = 40;
      }
    } else if (item.simulationType === "narrative_writing") {
      const text = typeof rawAnswer === "string" ? rawAnswer.trim() : "";
      if (text.length > 20) {
        earned = evaluateNarrativeText(text);
      }
    } else if (item.simulationType === "case_triage" && Array.isArray(rawAnswer) && rawAnswer.length > 0) {
      let score = 0;
      if (rawAnswer[0] === "CASE_A") score += 40;
      if (rawAnswer[1] === "CASE_E") score += 30;
      if (rawAnswer[2] === "CASE_D") score += 15;
      if (rawAnswer[3] === "CASE_B") score += 10;
      if (rawAnswer[4] === "CASE_C") score += 5;
      earned = score;
    }

    const compKey = item.competencyId;
    if (dimensionTallies[compKey]) {
      dimensionTallies[compKey].earnedPoints += earned;
      dimensionTallies[compKey].totalPoints += maxPoints;
      dimensionTallies[compKey].itemCount += 1;
    }
  });

  // ─── Competency Scores ──────────────────────────────────────────────────────
  const dimensionScores: Record<string, number> = {};
  let compositeSum = 0;
  let weightSum = 0;

  Object.entries(ACRI_PV_COMPETENCIES).forEach(([key, comp]) => {
    const tally = dimensionTallies[key];
    const score =
      tally && tally.totalPoints > 0
        ? Math.round((tally.earnedPoints / tally.totalPoints) * 100)
        : 0;

    dimensionScores[key] = Math.min(100, Math.max(0, score));
    compositeSum += dimensionScores[key] * comp.weight;
    weightSum += comp.weight;
  });

  const compositeScore = Math.round(weightSum > 0 ? compositeSum / weightSum : 0);

  // ─── Candidate-Facing Decision ──────────────────────────────────────────────
  // RULE: Decision is score-only. Gates do not affect the candidate classification.
  // Score >= 80 → "Industry Ready". Period.
  const readinessState = getAcriReadinessState(compositeScore);
  const decision: AcriDecisionResult["decision"] =
    readinessState === "industry_ready" ? "Industry Ready" : "Readiness Gap Identified";

  // ─── Strengths & Development (candidate-facing) ────────────────────────────
  const sortedDims = Object.entries(dimensionScores)
    .map(([k, score]) => ({
      dimension: ACRI_PV_COMPETENCIES[k],
      score,
      gap: Math.max(0, ACRI_PV_COMPETENCIES[k].minThreshold - score),
    }))
    .sort((a, b) => b.score - a.score);

  const strengths = sortedDims.slice(0, 3).map((d) => ({
    dimension: d.dimension,
    score: d.score,
  }));

  const developmentGaps = [...sortedDims]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => ({
      dimension: d.dimension,
      score: d.score,
      gap: d.gap,
    }));

  // ─── Tailored Remediation (candidate-facing) ───────────────────────────────
  const tailoredRemediation = developmentGaps.map(
    (g) =>
      `Focus Module: ${g.dimension.name} Mastery (${g.dimension.code}) — Current: ${g.score}% (Target: ${g.dimension.minThreshold}%)`,
  );

  // ─── Internal Gate Results (NOT in candidate result) ──────────────────────
  // These go to AcriInternalMetrics via evaluateWithInternalMetrics().
  // This return value only includes candidate-safe fields.
  // passedGates is still returned for backward compat but is INTERNAL ONLY.
  const failedGates: CriticalGateRule[] = [];
  CRITICAL_GATES.forEach((gate) => {
    const matchingKey = Object.keys(ACRI_PV_COMPETENCIES).find(
      (k) => ACRI_PV_COMPETENCIES[k].code === gate.dimensionCode,
    );
    const score = matchingKey ? dimensionScores[matchingKey] : 100;
    if (score < gate.minScore) {
      failedGates.push(gate);
    }
  });
  const passedGates = failedGates.length === 0;

  return {
    decision,
    compositeScore,
    passedGates,   // kept for backward compat — INTERNAL USE ONLY, do not show to candidate
    failedGates,   // INTERNAL USE ONLY — do not show to candidate
    dimensionScores,
    strengths,
    developmentGaps,
    tailoredRemediation,
  };
}

// ─── Internal Metrics Builder ────────────────────────────────────────────────

/**
 * Extended evaluation that also produces AcriInternalMetrics.
 * Call this instead of evaluateCandidateResponses when you need
 * the internal gate analytics (admin dashboards, integrity reporting).
 *
 * The returned candidateResult is identical to evaluateCandidateResponses().
 * The internalMetrics is NEVER passed to candidate-facing components.
 */
export function evaluateWithInternalMetrics(
  responses: CandidateResponses,
  items: AcriAssessmentItem[] = ACRI_PV_WORK_SIMULATION_ITEMS,
): { candidateResult: AcriDecisionResult; internalMetrics: Pick<AcriInternalMetrics, "gateResults" | "itemAnalytics"> } {
  const candidateResult = evaluateCandidateResponses(responses, items);

  // Build gate analytics
  const gateResults: AcriGateAnalytic[] = CRITICAL_GATES.map((gate) => {
    const matchingKey = Object.keys(ACRI_PV_COMPETENCIES).find(
      (k) => ACRI_PV_COMPETENCIES[k].code === gate.dimensionCode,
    );
    const score = matchingKey ? candidateResult.dimensionScores[matchingKey] : 100;
    return {
      gateId: gate.id,
      gateName: gate.name,
      dimensionCode: gate.dimensionCode,
      dimensionScore: score,
      minRequired: gate.minScore,
      passed: score >= gate.minScore,
      remediationPath: gate.remediationPath,
    };
  });

  // Build item analytics
  const itemAnalytics: AcriItemAnalytic[] = items.map((item) => {
    const rawAnswer = responses.answers[item.id];
    const answeredAt = (responses.timeSpentSeconds?.[item.id] || 0) * 1000;

    // Determine correctness
    let isCorrect = false;
    let earnedPoints = 0;
    const maxPoints = 100;

    if (item.simulationType === "mcq") {
      const matchingOpt = item.options?.find((o) => o.key === rawAnswer);
      isCorrect = !!matchingOpt?.isCorrect;
      earnedPoints = isCorrect ? 100 : 0;
    } else {
      // Simplified: a score > 60 is treated as "correct" for analytics
      const fullResult = evaluateCandidateResponses({ answers: { [item.id]: rawAnswer } }, [item]);
      earnedPoints = fullResult.dimensionScores[item.competencyId] ?? 0;
      isCorrect = earnedPoints >= 60;
    }

    return {
      itemId: item.id,
      competencyId: item.competencyId,
      response: rawAnswer,
      isCorrect,
      earnedPoints,
      maxPoints,
      timeSpentMs: answeredAt,
      flagged: (responses.flaggedItems ?? []).includes(item.id),
      answeredAt: Date.now(),
    };
  });

  return { candidateResult, internalMetrics: { gateResults, itemAnalytics } };
}

// ─── Narrative Scoring ────────────────────────────────────────────────────────

function evaluateNarrativeText(text: string): number {
  if (!text || text.length < 40) return 20;

  const lower = text.toLowerCase();
  let score = 0;

  // Medical Accuracy (30 pts)
  if (lower.includes("amoxicillin") && (lower.includes("500") || lower.includes("tid") || lower.includes("oral"))) {
    score += 15;
  }
  if (lower.includes("rash") && (lower.includes("pruritic") || lower.includes("itchy") || lower.includes("red"))) {
    score += 15;
  }

  // Chronology (20 pts)
  if (lower.includes("03") || lower.includes("aug")) score += 10;
  if (lower.includes("06") && lower.includes("08")) score += 10;

  // Completeness (20 pts)
  if (lower.includes("45") || lower.includes("female")) score += 10;
  if (lower.includes("ibuprofen") || lower.includes("advil")) score += 10;

  // Neutral Language (15 pts)
  const subjectiveWords = ["i believe", "in my opinion", "my guess", "i think", "careless"];
  const hasSubjective = subjectiveWords.some((w) => lower.includes(w));
  score += hasSubjective ? 5 : 15;

  // PV Terminology (10 pts)
  const pvTerms = ["dechallenge", "discontinued", "resolved", "recovered", "suspect", "concomitant"];
  const matchedTerms = pvTerms.filter((term) => lower.includes(term));
  score += Math.min(10, matchedTerms.length * 3);

  // Clarity & Length (5 pts)
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 50 && wordCount <= 250) score += 5;

  return Math.min(100, Math.max(0, score));
}

// ─── Exported QA Boundary Test Fixtures ────────────────────────────────────────
export {
  TEST_CANDIDATE_40,
  TEST_CANDIDATE_61,
  TEST_CANDIDATE_79,
  TEST_CANDIDATE_80,
  TEST_CANDIDATE_82,
  TEST_CANDIDATE_92,
  TEST_CANDIDATE_100,
  buildAnswersForTargetScore,
} from "./acriBoundaryFixtures";
