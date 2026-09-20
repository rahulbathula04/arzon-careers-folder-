import {
  ACRI_PV_COMPETENCIES,
  CRITICAL_GATES,
  NARRATIVE_SCORING_RUBRIC,
  type AcriDecisionResult,
  type CompetencyDimension,
  type CriticalGateRule,
  type ReadinessDecision,
} from "@/data/acri/acriPvStandard";
import { ACRI_PV_WORK_SIMULATION_ITEMS, type AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";

export interface CandidateResponses {
  answers: Record<string, any>; // itemId -> response payload
  timeSpentSeconds?: Record<string, number>;
  flaggedItems?: string[];
}

export function evaluateCandidateResponses(
  responses: CandidateResponses,
  items: AcriAssessmentItem[] = ACRI_PV_WORK_SIMULATION_ITEMS,
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
    const rawAnswer = responses.answers[item.id];
    let earned = 0;
    const maxPoints = 100;

    switch (item.simulationType) {
      case "intake_validation": {
        // Evaluate 4 criteria + verdict
        if (rawAnswer && typeof rawAnswer === "object") {
          const crit = rawAnswer.criteria || {};
          let critMatches = 0;
          if (crit.patient === true) critMatches += 20;
          if (crit.reporter === true) critMatches += 20;
          if (crit.product === true) critMatches += 20;
          if (crit.event === true) critMatches += 20;
          if (rawAnswer.verdict === "valid") critMatches += 20;
          earned = critMatches;
        }
        break;
      }

      case "field_extraction": {
        if (rawAnswer && typeof rawAnswer === "object") {
          const correct = item.correctAnswer || {};
          let matches = 0;
          const totalFields = Object.keys(correct).length;
          Object.keys(correct).forEach((fieldKey) => {
            if (rawAnswer[fieldKey] === correct[fieldKey]) {
              matches++;
            }
          });
          earned = totalFields > 0 ? Math.round((matches / totalFields) * 100) : 0;
        }
        break;
      }

      case "who_causality": {
        if (rawAnswer === "Probable_Likely") {
          earned = 100;
        } else if (rawAnswer === "Certain" || rawAnswer === "Possible") {
          earned = 40; // partial credit for plausible differential
        } else {
          earned = 0;
        }
        break;
      }

      case "confounder_update": {
        if (rawAnswer === "B") {
          earned = 100;
        } else {
          earned = 0;
        }
        break;
      }

      case "meddra_coding": {
        if (rawAnswer === "B") {
          earned = 100;
        } else {
          earned = 0;
        }
        break;
      }

      case "narrative_writing": {
        const text = typeof rawAnswer === "string" ? rawAnswer.trim() : "";
        earned = evaluateNarrativeText(text);
        break;
      }

      case "case_triage": {
        // Evaluate rank correlation or top priority placement
        if (Array.isArray(rawAnswer) && rawAnswer.length > 0) {
          let score = 0;
          // Case A must be #1 priority (fatal/life-threatening SUSAR)
          if (rawAnswer[0] === "CASE_A") score += 40;
          // Case E must be #2 (safety signal cluster)
          if (rawAnswer[1] === "CASE_E") score += 30;
          // Remaining order
          if (rawAnswer[2] === "CASE_D") score += 15;
          if (rawAnswer[3] === "CASE_B") score += 10;
          if (rawAnswer[4] === "CASE_C") score += 5;
          earned = score;
        }
        break;
      }

      case "mcq":
      default: {
        const matchingOpt = item.options?.find((o) => o.key === rawAnswer);
        if (matchingOpt && matchingOpt.isCorrect) {
          earned = 100;
        } else {
          earned = 0;
        }
        break;
      }
    }

    const compKey = item.competencyId;
    if (dimensionTallies[compKey]) {
      dimensionTallies[compKey].earnedPoints += earned;
      dimensionTallies[compKey].totalPoints += maxPoints;
      dimensionTallies[compKey].itemCount += 1;
    }
  });

  // Calculate percentage scores for each competency
  const dimensionScores: Record<string, number> = {};
  let compositeSum = 0;
  let weightSum = 0;

  Object.entries(ACRI_PV_COMPETENCIES).forEach(([key, comp]) => {
    const tally = dimensionTallies[key];
    const score =
      tally && tally.totalPoints > 0
        ? Math.round((tally.earnedPoints / tally.totalPoints) * 100)
        : 82; // fallback baseline if no items mapped

    dimensionScores[key] = Math.min(100, Math.max(0, score));
    compositeSum += dimensionScores[key] * comp.weight;
    weightSum += comp.weight;
  });

  const compositeScore = Math.round(weightSum > 0 ? compositeSum / weightSum : 80);

  // Evaluate Critical Gates
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

  // Final Decision: Composite >= 80 AND all gates passed
  const decision: ReadinessDecision =
    compositeScore >= 80 && passedGates
      ? "Industry Ready"
      : "Readiness Gap Identified";

  // Sort dimensions by score to determine Top 3 Strengths & Gaps
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

  // Build tailored remediation paths
  const tailoredRemediation: string[] = [];
  if (failedGates.length > 0) {
    failedGates.forEach((g) => tailoredRemediation.push(g.remediationPath));
  } else {
    developmentGaps.forEach((g) => {
      tailoredRemediation.push(
        `Focus Module: ${g.dimension.name} Mastery (${g.dimension.code}) - Current: ${g.score}% (Target: ${g.dimension.minThreshold}%)`,
      );
    });
  }

  return {
    decision,
    compositeScore,
    passedGates,
    failedGates,
    dimensionScores,
    strengths,
    developmentGaps,
    tailoredRemediation,
  };
}

/**
 * Objective scoring of narrative text based on rubric criteria
 */
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
  if (!hasSubjective) {
    score += 15;
  } else {
    score += 5;
  }

  // PV Terminology (10 pts)
  const pvTerms = ["dechallenge", "discontinued", "resolved", "recovered", "suspect", "concomitant"];
  const matchedTerms = pvTerms.filter((term) => lower.includes(term));
  score += Math.min(10, matchedTerms.length * 3);

  // Clarity & Length (5 pts)
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 50 && wordCount <= 250) {
    score += 5;
  }

  return Math.min(100, Math.max(0, score));
}
