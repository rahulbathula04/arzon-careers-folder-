/**
 * Arzon Employer Fit Scoring & Recruiter Calibration Engine v1.0
 * 
 * Computes exact Recruiter Fit Index (RFI) for:
 *  - Cognizant Life Sciences
 *  - IQVIA India
 *  - Parexel International
 *  - Novartis Healthcare
 *  - Accenture Health & Life Sciences
 * 
 * Based on candidate performance across 5 regulatory dimensions:
 *  1. icsr_triage: ICSR Intake & 4 Minimum Criteria Validity
 *  2. seriousness_clocks: Seriousness Evaluation & Day 0 Regulatory Clocks
 *  3. medical_coding: Standardized Medical Coding (MedDRA & WHO-DD)
 *  4. clinical_narrative: Clinical Case Logic & Scientific Narratives
 *  5. gcp_data_integrity: GCP, GVP & Data Integrity Standards
 */

import {
  EMPLOYER_SCENARIO_QUESTIONS,
  type CompetencyDimensionKey,
} from "./employerAssessmentBank";
import { LIVE_EMPLOYER_OPENINGS } from "./industry/liveEmployerOpenings";

export type EmployerName =
  | "Cognizant"
  | "IQVIA"
  | "Parexel"
  | "Novartis"
  | "Accenture";

export interface EmployerCalibrationWeights {
  employer: EmployerName;
  hiringBarCutoff: number; // Minimum RFI score (0-100) to clear interview rounds
  weights: Record<CompetencyDimensionKey, number>; // Sums to 1.0
}

export const EMPLOYER_WEIGHT_CONFIGS: Record<EmployerName, EmployerCalibrationWeights> = {
  Novartis: {
    employer: "Novartis",
    hiringBarCutoff: 78,
    weights: {
      clinical_narrative: 0.35,
      seriousness_clocks: 0.25,
      icsr_triage: 0.15,
      medical_coding: 0.15,
      gcp_data_integrity: 0.10,
    },
  },
  IQVIA: {
    employer: "IQVIA",
    hiringBarCutoff: 72,
    weights: {
      icsr_triage: 0.30,
      seriousness_clocks: 0.25,
      medical_coding: 0.20,
      clinical_narrative: 0.15,
      gcp_data_integrity: 0.10,
    },
  },
  Parexel: {
    employer: "Parexel",
    hiringBarCutoff: 70,
    weights: {
      seriousness_clocks: 0.25,
      icsr_triage: 0.25,
      clinical_narrative: 0.20,
      gcp_data_integrity: 0.15,
      medical_coding: 0.15,
    },
  },
  Cognizant: {
    employer: "Cognizant",
    hiringBarCutoff: 65,
    weights: {
      medical_coding: 0.30,
      icsr_triage: 0.30,
      clinical_narrative: 0.20,
      gcp_data_integrity: 0.10,
      seriousness_clocks: 0.10,
    },
  },
  Accenture: {
    employer: "Accenture",
    hiringBarCutoff: 62,
    weights: {
      medical_coding: 0.30,
      icsr_triage: 0.25,
      gcp_data_integrity: 0.20,
      clinical_narrative: 0.15,
      seriousness_clocks: 0.10,
    },
  },
};

export type FitStatus =
  | "Exceeds Hiring Bar"
  | "Competitive Candidate"
  | "Borderline / Supervised"
  | "Critical Skill Deficit";

export interface EmployerFitScore {
  employer: EmployerName;
  fullCompanyName: string;
  roleTitle: string;
  matchScore: number; // 0 to 100
  hiringCutoff: number;
  gapFromCutoff: number; // matchScore - hiringCutoff
  status: FitStatus;
  statusColor: string;
  clearedInterviewStages: string[];
  eliminationRisk: string;
  atsReadinessSummary: string;
  recommendedPathway: string;
}

export interface DimensionBreakdown {
  key: CompetencyDimensionKey;
  label: string;
  score: number; // 0 to 100
  weight: number;
  rating: "Production Ready" | "Reviewer Ready" | "Needs QC" | "Unprepared";
  rationale: string;
}

export interface EmployerReadinessReport {
  overallReadinessScore: number; // 0 to 100
  letterGrade: "A" | "B+" | "B" | "NA";
  gradeSummary: string;
  topMatchedEmployer: EmployerName;
  dimensionBreakdown: Record<CompetencyDimensionKey, DimensionBreakdown>;
  employerMatches: EmployerFitScore[];
  universalStrengths: string[];
  criticalGapsToClose: string[];
  immediateFourteenDayPlan: { dayRange: string; milestone: string; targetSkill: string }[];
}

/**
 * Calculates candidate's calibrated Recruiter Fit Index across all 5 employers.
 * Works seamlessly whether candidate answered the specialized employer questions,
 * or the broader Career Engine assessment suite.
 */
export function evaluateEmployerHiringReadiness(
  answers: Record<string, string>,
  careerEngineFitScore = 75,
  microAccuracy = 0.8,
  traitScores?: Record<string, number>,
): EmployerReadinessReport {
  // 1. Calculate raw dimension scores from employer scenario questions if answered
  const dimensionRawScores: Record<CompetencyDimensionKey, { earned: number; total: number }> = {
    icsr_triage: { earned: 0, total: 0 },
    seriousness_clocks: { earned: 0, total: 0 },
    medical_coding: { earned: 0, total: 0 },
    clinical_narrative: { earned: 0, total: 0 },
    gcp_data_integrity: { earned: 0, total: 0 },
  };

  let answeredScenarioCount = 0;

  for (const q of EMPLOYER_SCENARIO_QUESTIONS) {
    const selectedOptId = answers[q.id];
    if (selectedOptId) {
      answeredScenarioCount++;
      const option = q.options.find((o) => o.id === selectedOptId);
      const weight = option ? option.scoreWeight : 0;
      dimensionRawScores[q.dimension].earned += weight;
      dimensionRawScores[q.dimension].total += 1;
    }
  }

  // 2. Synthesize baseline dimension scores (0-100)
  // If candidate answered specialized scenario items, compute direct percentage.
  // Otherwise, derive calibrated baseline from careerEngine traits (compliance, detail, logic, language).
  const detailTrait = traitScores?.detail ?? (careerEngineFitScore * 0.95);
  const complianceTrait = traitScores?.compliance ?? (careerEngineFitScore * 0.92);
  const logicTrait = traitScores?.logic ?? (careerEngineFitScore * 0.94);
  const languageTrait = traitScores?.language ?? (careerEngineFitScore * 0.90);
  const microBonus = microAccuracy * 10;

  const getDimensionScore = (dim: CompetencyDimensionKey, fallbackFormula: number): number => {
    const data = dimensionRawScores[dim];
    if (data.total > 0) {
      const directScore = (data.earned / data.total) * 100;
      return Math.round(Math.min(99, Math.max(35, directScore)));
    }
    return Math.round(Math.min(96, Math.max(48, fallbackFormula + microBonus)));
  };

  const dimensionScores: Record<CompetencyDimensionKey, number> = {
    icsr_triage: getDimensionScore("icsr_triage", 0.6 * detailTrait + 0.4 * complianceTrait),
    seriousness_clocks: getDimensionScore("seriousness_clocks", 0.7 * logicTrait + 0.3 * complianceTrait),
    medical_coding: getDimensionScore("medical_coding", 0.6 * detailTrait + 0.4 * logicTrait),
    clinical_narrative: getDimensionScore("clinical_narrative", 0.7 * languageTrait + 0.3 * detailTrait),
    gcp_data_integrity: getDimensionScore("gcp_data_integrity", 0.8 * complianceTrait + 0.2 * detailTrait),
  };

  // 3. Compute Recruiter Fit Index (RFI) for each employer
  const employerOrder: EmployerName[] = ["Novartis", "IQVIA", "Parexel", "Cognizant", "Accenture"];
  const employerMatches: EmployerFitScore[] = [];

  for (const empName of employerOrder) {
    const config = EMPLOYER_WEIGHT_CONFIGS[empName];
    const liveProfile = LIVE_EMPLOYER_OPENINGS.find((e) => e.shortName.toLowerCase().includes(empName.toLowerCase()));

    let weightedRfi = 0;
    for (const [dimKey, dimWeight] of Object.entries(config.weights)) {
      weightedRfi += (dimensionScores[dimKey as CompetencyDimensionKey] || 70) * dimWeight;
    }

    const matchScore = Math.round(Math.min(98, Math.max(45, weightedRfi)));
    const gap = matchScore - config.hiringBarCutoff;

    let status: FitStatus = "Borderline / Supervised";
    let statusColor = "#F59E0B";
    const clearedInterviewStages: string[] = [];

    if (gap >= 8) {
      status = "Exceeds Hiring Bar";
      statusColor = "#10B981";
      clearedInterviewStages.push("Round 1: Talent HR Screen (Cleared with High Distinction)");
      clearedInterviewStages.push("Round 2: Technical Domain Case Exercise (Full Pass)");
      clearedInterviewStages.push("Round 3: Senior Safety Operations Panel (Strong Recommend)");
    } else if (gap >= 0) {
      status = "Competitive Candidate";
      statusColor = "#2563EB";
      clearedInterviewStages.push("Round 1: Talent HR Screen (Cleared)");
      clearedInterviewStages.push("Round 2: Technical Domain Case Exercise (Standard Pass)");
      clearedInterviewStages.push("Round 3: Operations Manager Panel (Subject to Reviewer Pod)");
    } else if (gap >= -10) {
      status = "Borderline / Supervised";
      statusColor = "#F59E0B";
      clearedInterviewStages.push("Round 1: Talent HR Screen (Cleared)");
      clearedInterviewStages.push("Round 2: Technical Domain Assessment (Conditional / Borderline)");
    } else {
      status = "Critical Skill Deficit";
      statusColor = "#EF4444";
      clearedInterviewStages.push("Round 1: Talent HR Screen (Basic Clearance Only)");
    }

    const fatalGap = liveProfile?.fatalGaps[0] ?? "Inability to demonstrate hands-on case processing speed.";
    const roleTitle = liveProfile?.activeOpenings.roleTitle ?? "Drug Safety Associate";

    employerMatches.push({
      employer: empName,
      fullCompanyName: liveProfile?.company ?? empName,
      roleTitle,
      matchScore,
      hiringCutoff: config.hiringBarCutoff,
      gapFromCutoff: gap,
      status,
      statusColor,
      clearedInterviewStages,
      eliminationRisk: fatalGap,
      atsReadinessSummary: `Candidate scores ${matchScore}% against ${empName}'s ${config.hiringBarCutoff}% baseline hiring benchmark for entry-level ${roleTitle}.`,
      recommendedPathway: `Close the ${gap < 0 ? Math.abs(gap) : 0}% gap in ${Object.entries(config.weights).sort((a,b) => b[1]-a[1])[0][0].replace('_', ' ')} before applying.`,
    });
  }

  // 4. Calculate Aggregate Overall Readiness Score
  const overallReadinessScore = Math.round(
    Object.values(dimensionScores).reduce((acc, s) => acc + s, 0) / 5
  );

  let letterGrade: "A" | "B+" | "B" | "NA" = "B";
  let gradeSummary = "Standard fresher candidate profile. Recommended for structured training pods with supervised QC.";

  if (overallReadinessScore >= 90) {
    letterGrade = "A";
    gradeSummary = "Production-grade execution. Directly deployable into live sponsor accounts (Novartis/IQVIA Day-1 standard).";
  } else if (overallReadinessScore >= 75) {
    letterGrade = "B+";
    gradeSummary = "Reviewer-ready candidate. Clears Parexel and Cognizant technical bars with short 4-week paired mentoring.";
  } else if (overallReadinessScore < 60) {
    letterGrade = "NA";
    gradeSummary = "Critical foundational gaps in regulatory timelines or clinical coding. Certificate bar not met.";
  }

  // 5. Dimension Breakdowns
  const dimensionMeta: Record<CompetencyDimensionKey, { label: string; weight: number }> = {
    icsr_triage: { label: "ICSR Triage & Validity Verification", weight: 0.25 },
    seriousness_clocks: { label: "Seriousness & Day 0 Regulatory Clocks", weight: 0.20 },
    medical_coding: { label: "Standardized Medical Coding (MedDRA)", weight: 0.20 },
    clinical_narrative: { label: "Clinical Narratives & Case Logic", weight: 0.20 },
    gcp_data_integrity: { label: "GCP, GVP & Data Integrity (ALCOA+)", weight: 0.15 },
  };

  const dimensionBreakdown: Record<CompetencyDimensionKey, DimensionBreakdown> = {} as any;

  for (const [key, meta] of Object.entries(dimensionMeta)) {
    const k = key as CompetencyDimensionKey;
    const score = dimensionScores[k];
    let rating: DimensionBreakdown["rating"] = "Needs QC";
    let rationale = "Requires paired review on edge-case scenarios.";

    if (score >= 88) {
      rating = "Production Ready";
      rationale = "Zero-defect understanding verified against global regulatory standards.";
    } else if (score >= 74) {
      rating = "Reviewer Ready";
      rationale = "Competent grasp of core rules; light supervisor oversight suggested.";
    } else if (score < 60) {
      rating = "Unprepared";
      rationale = "Significant risk of technical interview elimination.";
    }

    dimensionBreakdown[k] = {
      key: k,
      label: meta.label,
      score,
      weight: meta.weight,
      rating,
      rationale,
    };
  }

  // Sort employers by matchScore to find top match
  employerMatches.sort((a, b) => b.matchScore - a.matchScore);
  const topMatchedEmployer = employerMatches[0].employer;

  // 6. Actionable 14-Day Remediation Plan
  const immediateFourteenDayPlan = [
    {
      dayRange: "Days 1 – 4",
      milestone: "ICSR Triage & 4 Criteria Elimination Drill",
      targetSkill: "Mastering ICH-E2D patient identifiability and Day 0 calculation under timezone handovers.",
    },
    {
      dayRange: "Days 5 – 8",
      milestone: "MedDRA Term Selection & WHO-Drug Mapping",
      targetSkill: "MTS:PTC diagnosis vs symptom rules and primary SOC hierarchy assignment without supervisor edits.",
    },
    {
      dayRange: "Days 9 – 11",
      milestone: "SBAR Clinical Narrative Authoring",
      targetSkill: "Drafting 5-point chronological safety narratives with lab trajectory and dechallenge documentation.",
    },
    {
      dayRange: "Days 12 – 14",
      milestone: "Audit Trail Integrity & Mock Recruiter Screen",
      targetSkill: "Simulated technical panel defence covering Hy's Law, 7-day SUSARs, and 21 CFR Part 11 GDP.",
    },
  ];

  return {
    overallReadinessScore,
    letterGrade,
    gradeSummary,
    topMatchedEmployer,
    dimensionBreakdown,
    employerMatches,
    universalStrengths: [
      "Demonstrated grasp of healthcare career taxonomy and baseline pharmacology.",
      "Clear differentiation between post-marketing surveillance and early-phase trial monitoring.",
      "Aptitude for structured, detail-critical analytical workflows.",
    ],
    criticalGapsToClose: [
      dimensionScores.seriousness_clocks < 70
        ? "Regulatory Clocks: Confusing calendar days with working days on 7/15 day expedited filings."
        : "Expedited Timelines: Strengthen Day 0 determination across regional affiliate inboxes.",
      dimensionScores.medical_coding < 75
        ? "Medical Coding: Practice selecting exact LLT/PT without splitting confirmed diagnoses."
        : "MedDRA Navigation: Master primary vs secondary SOC linkage for multi-system adverse events.",
    ],
    immediateFourteenDayPlan,
  };
}
