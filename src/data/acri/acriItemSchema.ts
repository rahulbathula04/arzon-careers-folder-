/**
 * ACRI Enterprise Assessment Item Schema
 *
 * Defines the canonical types for versioned, authored assessment items,
 * clinical scenarios, scoring rules, and item lifecycle states.
 */

export type CompetencyKey =
  | "pvFundamentals"
  | "icsrProcessing"
  | "caseAssessment"
  | "medicalInterpretation"
  | "meddraCoding"
  | "documentation"
  | "qualityCompliance"
  | "analyticalReasoning"
  | "situationalJudgment";

export type TherapeuticDomain =
  | "Cardiovascular"
  | "Oncology"
  | "Infectious Diseases"
  | "CNS & Neurology"
  | "Endocrinology"
  | "Immunology & Rheumatology"
  | "Vaccines & Biologics"
  | "Gastroenterology & Analgesics";

export type AssessmentSectionCode =
  | "A" // Section A: PV Knowledge & Fundamentals
  | "B" // Section B: ICSR Case Processing & 4 Criteria
  | "C" // Section C: Case Assessment & Seriousness
  | "D" // Section D: Medical Interpretation & Causality
  | "E" // Section E: Coding & Data Mapping
  | "F" // Section F: Documentation & Event Narrative
  | "G" // Section G: Quality, Compliance & Audit
  | "H" // Section H: Analytical Reasoning & Signal Detection
  | "I"; // Section I: Centerpiece Integrated Case Simulation

export type ItemReviewStatus =
  | "DRAFT"
  | "EXPERT_REVIEW"
  | "ACTIVE"
  | "MONITORED"
  | "REVISED"
  | "RETIRED";

export type QuestionType =
  | "knowledge_mcq"
  | "intake_validation"
  | "case_assessment"
  | "causality_determination"
  | "coding_mapping"
  | "narrative_evaluation"
  | "situational_judgment"
  | "integrated_simulation";

export interface ItemOption {
  key: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface ClientSanitizedOption {
  key: string;
  text: string;
}

export interface ClinicalScenario {
  patient?: string;
  indication?: string;
  suspectDrug?: string;
  concomitantDrugs?: string;
  adverseEvent?: string;
  narrativeSnippet?: string;
  labData?: string;
  timeline?: { day: string; event: string }[];
  reporter?: { name: string; role: string; location: string };
}

export interface AcriAssessmentItemRecord {
  itemId: string;
  itemVersion: string; // e.g. "1.1.0"
  itemNumber: number; // 1 to 40 in standard form
  section: AssessmentSectionCode;
  sectionTitle: string;
  competencyId: CompetencyKey;
  domain: TherapeuticDomain;
  difficulty: "foundational" | "intermediate" | "advanced";
  questionType: QuestionType;
  jurisdiction: "Global (ICH)" | "European Union (EMA)" | "India (CDSCO)" | "United States (FDA)";

  // Clinical Content
  clinicalScenario?: ClinicalScenario;
  prompt: string;
  options: ItemOption[];
  correctAnswer: string | Record<string, unknown>;

  // Regulatory Traceability
  regulatoryRefId: string; // e.g. "ICH-E2D-R1"
  sourceReference: string; // Citation e.g. "ICH E2D(R1) • Step 4 Section 2.1"
  sourceVersion: string; // e.g. "2025 Final Guideline"
  effectiveFrom: string; // ISO date

  // Governance & Lifecycle
  reviewStatus: ItemReviewStatus;
  approvedBy: string; // e.g. "Medical Safety Review Board"
  retiredAt?: string;

  // Rich Simulation Payloads (for interactive widgets)
  simulationData?: Record<string, any>;
}

/**
 * Sanitized Item for Browser Delivery
 * Strips correctAnswer, isCorrect flags, and confidential scoring rationales.
 */
export interface AcriClientAssessmentItem {
  id: string;
  itemNumber: number;
  section: AssessmentSectionCode;
  sectionTitle: string;
  stageName: string;
  stageCategory: string;
  simulationType: string;
  competencyId: string;
  domain: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  jurisdiction: string;
  clinicalScenario?: ClinicalScenario;
  prompt: string;
  evidenceRef: string;
  options: ClientSanitizedOption[];
  simulationData?: Record<string, any>;
}
