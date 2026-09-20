/**
 * ACRI-PV Standard v1.0
 * Arzon Clinical Readiness Index — Pharmacovigilance Associate Competency Framework
 * Grounded in:
 *  - EMA GVP Module VI (Management and reporting of adverse reactions)
 *  - ICH E2A, E2B(R3), E2C(R2), E2D Guidelines
 *  - WHO-UMC Causality Assessment Framework
 *  - US FDA 21 CFR 314.80 & 312.32
 *  - AERA / APA / NCME Standards for Educational & Psychological Testing
 */

export interface CompetencyDimension {
  id: string;
  name: string;
  code: string;
  weight: number; // 0.0 - 1.0, sum = 1.0
  minThreshold: number; // minimum required for Industry Ready
  isCriticalGate: boolean;
  description: string;
  occupationalBehavior: string;
}

export const ACRI_PV_COMPETENCIES: Record<string, CompetencyDimension> = {
  pvFundamentals: {
    id: "pvFundamentals",
    name: "PV Fundamentals",
    code: "PV-FUN",
    weight: 0.1,
    minThreshold: 75,
    isCriticalGate: false,
    description: "Core pharmacology, adverse drug reaction definitions, and ICH/CIOMS regulatory foundations.",
    occupationalBehavior: "Demonstrates accurate recall and conceptual understanding of safety terminology and reporting obligations.",
  },
  icsrProcessing: {
    id: "icsrProcessing",
    name: "ICSR Processing",
    code: "ICSR-PRC",
    weight: 0.15,
    minThreshold: 80,
    isCriticalGate: true,
    description: "Verifying 4 minimum ICSR criteria, initial triage, duplicate search, and validity verification.",
    occupationalBehavior: "Zero-error verification of the four minimum criteria before initiating downstream processing.",
  },
  caseAssessment: {
    id: "caseAssessment",
    name: "Case Assessment",
    code: "CASE-ASM",
    weight: 0.15,
    minThreshold: 75,
    isCriticalGate: false,
    description: "Evaluating seriousness criteria, listedness/expectedness against RSI/SmPC, and labeled adverse reactions.",
    occupationalBehavior: "Accurately identifies seriousness outcomes (death, hospitalization, disability) and SmPC expectedness.",
  },
  medicalInterpretation: {
    id: "medicalInterpretation",
    name: "Medical Interpretation",
    code: "MED-INT",
    weight: 0.1,
    minThreshold: 70,
    isCriticalGate: false,
    description: "Clinical laboratory value interpretation, differential diagnosis, and drug-drug interaction mechanisms.",
    occupationalBehavior: "Interprets lab trajectories (e.g. ALT/AST elevations) and assesses competing clinical etiologies.",
  },
  meddraCoding: {
    id: "meddraCoding",
    name: "MedDRA / Coding",
    code: "MEDDRA-COD",
    weight: 0.1,
    minThreshold: 75,
    isCriticalGate: false,
    description: "MedDRA hierarchy navigation, verbatim term capture, Lowest Level Term (LLT) to Preferred Term (PT) assignment.",
    occupationalBehavior: "Selects precise LLT without over-interpretation or loss of clinical specificity.",
  },
  documentation: {
    id: "documentation",
    name: "Documentation & Narratives",
    code: "DOC-NAR",
    weight: 0.15,
    minThreshold: 70,
    isCriticalGate: false,
    description: "Drafting concise, chronological case narratives for MedWatch 3500A and CIOMS I safety summaries.",
    occupationalBehavior: "Writes objective, chronological case narratives free of subjective bias or missing timeline anchors.",
  },
  qualityCompliance: {
    id: "qualityCompliance",
    name: "Quality & Compliance",
    code: "QUAL-CMP",
    weight: 0.1,
    minThreshold: 80,
    isCriticalGate: true,
    description: "Expedited reporting timelines (7-day fatal/life-threatening vs 15-day serious unexpected), audit trails, and GVP standards.",
    occupationalBehavior: "Strict adherence to regulatory submission clocks and documentation integrity.",
  },
  analyticalReasoning: {
    id: "analyticalReasoning",
    name: "Analytical Reasoning",
    code: "ANA-RSN",
    weight: 0.1,
    minThreshold: 75,
    isCriticalGate: false,
    description: "Dechallenge/rechallenge logic, WHO-UMC causality algorithms, and confounding factor evaluation.",
    occupationalBehavior: "Systematically distinguishes suspect drugs from concomitant medications when evaluating adverse events.",
  },
  situationalJudgment: {
    id: "situationalJudgment",
    name: "Situational Judgment",
    code: "SIT-JUD",
    weight: 0.05,
    minThreshold: 75,
    isCriticalGate: true,
    description: "Multi-case prioritization, deadline trade-offs, and escalation protocols under operational pressure.",
    occupationalBehavior: "Correctly prioritizes unexpected serious cases over non-serious or incomplete reports.",
  },
};

/**
 * Critical Occupational Gates (Hard-Gate Fail-Safes)
 * Even if composite score is ≥ 80, failing any critical gate results in "Readiness Gap Identified".
 */
export interface CriticalGateRule {
  id: string;
  name: string;
  dimensionCode: string;
  minScore: number;
  failureMessage: string;
  remediationPath: string;
}

export const CRITICAL_GATES: CriticalGateRule[] = [
  {
    id: "gate_icsr_validity",
    name: "Gate 1: Minimum ICSR Validity Protocol",
    dimensionCode: "ICSR-PRC",
    minScore: 80,
    failureMessage: "Failure to verify the 4 minimum ICSR criteria (Patient, Reporter, Suspect Drug, Event) under ICH E2B(R3).",
    remediationPath: "Module 2.1: ICSR Triage and Validity Determination",
  },
  {
    id: "gate_reporting_timelines",
    name: "Gate 2: Expedited Reporting Regulatory Compliance",
    dimensionCode: "QUAL-CMP",
    minScore: 80,
    failureMessage: "Misapplication of 7-calendar-day (fatal/life-threatening) vs 15-calendar-day expedited reporting deadlines.",
    remediationPath: "Module 4.3: Global Expedited Reporting Requirements (FDA/EMA)",
  },
  {
    id: "gate_case_prioritization",
    name: "Gate 3: Clinical Safety Triage & Case Prioritization",
    dimensionCode: "SIT-JUD",
    minScore: 75,
    failureMessage: "Incorrect prioritization of serious unexpected safety events over routine documentation tasks.",
    remediationPath: "Module 5.2: Operational PV Workflow and Triage Decision-Making",
  },
];

/**
 * WHO-UMC Causality Assessment Categories
 */
export type WhoUmcCategory =
  | "Certain"
  | "Probable_Likely"
  | "Possible"
  | "Unlikely"
  | "Conditional_Unclassified"
  | "Unassessable_Unclassifiable";

export interface WhoUmcCriteria {
  temporalRelationship: boolean;
  dechallengePositive: boolean;
  rechallengePositive: boolean;
  alternativeCausesExcluded: boolean;
  pharmacologicallyPlausible: boolean;
}

/**
 * Narrative Scoring Rubric (Predetermined Weighted Dimensions)
 */
export interface NarrativeRubricDimension {
  id: string;
  name: string;
  weight: number; // percentage
  criteria: string;
}

export const NARRATIVE_SCORING_RUBRIC: NarrativeRubricDimension[] = [
  {
    id: "medicalAccuracy",
    name: "Medical Accuracy",
    weight: 0.3,
    criteria: "Accurate representation of dosage, clinical indications, symptoms, lab values, and clinical outcome.",
  },
  {
    id: "chronology",
    name: "Chronological Flow",
    weight: 0.2,
    criteria: "Sequential progression from therapy initiation to event onset, intervention, dechallenge, and final resolution.",
  },
  {
    id: "completeness",
    name: "Completeness of Information",
    weight: 0.2,
    criteria: "Contains all 4 minimum ICSR criteria, relevant medical history, concomitant drugs, and reporter qualification.",
  },
  {
    id: "neutralLanguage",
    name: "Neutral & Objective Language",
    weight: 0.15,
    criteria: "Objective factual reporting without subjective speculation, editorial emotion, or liability statements.",
  },
  {
    id: "pvTerminology",
    name: "PV & Regulatory Terminology",
    weight: 0.1,
    criteria: "Correct use of terms: 'suspect drug', 'concomitant', 'dechallenge', 'serious adverse event', 'recovered'.",
  },
  {
    id: "clarity",
    name: "Clarity & Conciseness",
    weight: 0.05,
    criteria: "Well-structured paragraphing, absence of redundant filler text, and clear readability.",
  },
];

/**
 * Standard Setting & Decision Rules
 */
export type ReadinessDecision = "Industry Ready" | "Readiness Gap Identified";

export interface AcriDecisionResult {
  decision: ReadinessDecision;
  compositeScore: number;
  passedGates: boolean;
  failedGates: CriticalGateRule[];
  dimensionScores: Record<string, number>;
  strengths: { dimension: CompetencyDimension; score: number }[];
  developmentGaps: { dimension: CompetencyDimension; score: number; gap: number }[];
  tailoredRemediation: string[];
}
