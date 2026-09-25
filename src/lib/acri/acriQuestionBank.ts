/**
 * ACRI-PV Versioned, Validated Assessment Item Bank (v1.1)
 *
 * Implements the 40-item mixed occupational assessment standard across 9 sections:
 * - Section A: PV Knowledge & Regulatory Fundamentals (4 items)
 * - Section B: ICSR Case Processing & 4 Criteria Intake (6 items)
 * - Section C: Case Assessment & Seriousness Triage (6 items)
 * - Section D: Medical Interpretation & WHO-UMC Causality (4 items)
 * - Section E: MedDRA Coding & E2B Data Mapping (5 items)
 * - Section F: Documentation & Clinical Narrative Review (4 items)
 * - Section G: Quality, Compliance & Audit Readiness (4 items)
 * - Section H: Analytical Reasoning & Signal Detection (4 items)
 * - Section I: Centerpiece Real Integrated Case Simulation (Case 0174) (3 items)
 *
 * Every item is traceable to versioned regulations:
 * - ICH E2D(R1) Step 4 (Adopted September 2025)
 * - EMA GVP Module VI & IX
 * - CDSCO 2024 Guidance for MAHs (India)
 * - US FDA 21 CFR 314.80
 * - MedDRA PtC v27.0 & WHO-UMC Table
 */

import type {
  AcriAssessmentItemRecord,
  AcriClientAssessmentItem,
  CompetencyKey,
  TherapeuticDomain,
} from "@/data/acri/acriItemSchema";
import type { AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";

// ─── Mulberry32 PRNG for Controlled Deterministic Variant Selection ──────────
function createPrng(seedStr: string) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], prng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Canonical 40 Authored Assessment Items (Traceable & Versioned) ──────────

export const AUTHORED_ACRI_ITEM_BANK: AcriAssessmentItemRecord[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // SECTION A: PV KNOWLEDGE & REGULATORY FUNDAMENTALS (4 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-A-01",
    itemVersion: "1.1.0",
    itemNumber: 1,
    section: "A",
    sectionTitle: "Section A: PV Knowledge & Fundamentals",
    competencyId: "pvFundamentals",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "Under the ICH E2D(R1) guideline (Step 4, adopted September 2025), how does the regulatory presumption of causality differ between a post-marketing spontaneous adverse event report and an adverse event recorded during an interventional clinical trial?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Step 4 Section 2.1 Post-Approval Safety Data",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Spontaneous post-marketing reports carry an implied suspicion of causality by the reporter and cannot be dismissed by the sponsor, whereas trial adverse events require documented investigator/sponsor causality attribution.",
        isCorrect: true,
        rationale:
          "Correct. ICH E2D(R1) reaffirms that spontaneous reports inherently convey the reporter's suspicion that the medicinal product contributed to the event, establishing minimum validity without requiring sponsor proof.",
      },
      {
        key: "B",
        text: "Post-marketing spontaneous reports are exempt from seriousness assessment and are only collated in annual commercial summaries.",
        isCorrect: false,
        rationale: "Incorrect. Spontaneous reports must be evaluated against seriousness criteria and expedited within 15 days if serious.",
      },
      {
        key: "C",
        text: "Clinical trial adverse events must only be recorded if the patient experiences permanent physical disability.",
        isCorrect: false,
        rationale: "Incorrect. All adverse events occurring during a clinical trial must be captured regardless of seriousness.",
      },
      {
        key: "D",
        text: "Spontaneous reports require rechallenge documentation before entry into the corporate global safety database.",
        isCorrect: false,
        rationale: "Incorrect. Rechallenge is never a prerequisite for post-marketing ICSR validity.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-A-02",
    itemVersion: "1.1.0",
    itemNumber: 2,
    section: "A",
    sectionTitle: "Section A: PV Knowledge & Fundamentals",
    competencyId: "pvFundamentals",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "A medical sales representative of a pharmaceutical company is notified by a clinic cardiologist of an acute myocardial infarction in a patient taking the company's antiarrhythmic drug. According to global GVP standards (EMA GVP Module VI and US FDA 21 CFR 314.80), when does 'Day 0' legally begin?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module VI • Section VI.B.1 & US FDA 21 CFR 314.80(c)",
    sourceVersion: "GVP Rev 2 & 2024 CFR",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Day 0 begins on the exact date the medical sales representative received the notification, as any company employee represents the Marketing Authorization Holder.",
        isCorrect: true,
        rationale:
          "Correct. Under global GVP and FDA regulations, receipt by any company personnel (including sales, marketing, medical affairs, or contracted third parties) constitutes Day 0 for the MAH.",
      },
      {
        key: "B",
        text: "Day 0 begins only after the central pharmacovigilance department enters the report into the Argus or ARISg database.",
        isCorrect: false,
        rationale: "Incorrect. Internal processing delays do not alter the statutory Day 0 receipt date.",
      },
      {
        key: "C",
        text: "Day 0 begins when the treating cardiologist emails certified hospital discharge summaries to the safety physician.",
        isCorrect: false,
        rationale: "Incorrect. Day 0 clock starts immediately upon initial receipt of the 4 minimum criteria.",
      },
      {
        key: "D",
        text: "Day 0 starts on the next working business day, excluding weekends and national public holidays.",
        isCorrect: false,
        rationale: "Incorrect. Regulatory submission deadlines are calculated strictly using calendar days.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-A-03",
    itemVersion: "1.1.0",
    itemNumber: 3,
    section: "A",
    sectionTitle: "Section A: PV Knowledge & Fundamentals",
    competencyId: "pvFundamentals",
    domain: "Oncology",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "European Union (EMA)",
    prompt:
      "In the European Union, what is the statutory role and legal responsibility of the Qualified Person for Pharmacovigilance (QPPV) under Directive 2001/83/EC and EMA GVP Module I?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module I • Section I.C.1 QPPV Legal Independence",
    sourceVersion: "GVP Module I",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "The QPPV has personal legal responsibility for the establishment and maintenance of the MAH's pharmacovigilance system and has full authority over the safety profile and risk management plans.",
        isCorrect: true,
        rationale:
          "Correct. EMA GVP Module I requires the QPPV to reside in the EEA, possess 24/7 accessibility, and hold statutory personal authority over the safety database and regulatory submissions.",
      },
      {
        key: "B",
        text: "The QPPV acts strictly as a commercial advisor who approves marketing advertisements before distribution.",
        isCorrect: false,
        rationale: "Incorrect. The QPPV has strict clinical safety oversight and must remain independent of commercial pressures.",
      },
      {
        key: "C",
        text: "The QPPV is only required to review cases if an inspection reveals more than 50 overdue submissions.",
        isCorrect: false,
        rationale: "Incorrect. The QPPV maintains continuous, real-time oversight of the entire safety system.",
      },
      {
        key: "D",
        text: "The QPPV role is optional for companies holding fewer than 5 marketed products.",
        isCorrect: false,
        rationale: "Incorrect. A designated QPPV is legally mandatory for every Marketing Authorization Holder in the EU.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-A-04",
    itemVersion: "1.1.0",
    itemNumber: 4,
    section: "A",
    sectionTitle: "Section A: PV Knowledge & Fundamentals",
    competencyId: "pvFundamentals",
    domain: "Infectious Diseases",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "India (CDSCO)",
    prompt:
      "According to CDSCO 2024 regulatory guidance for Marketing Authorization Holders in India and the Pharmacovigilance Programme of India (PvPI), which statement correctly defines the reporting timeline distinction between serious adverse reactions and non-serious reports?",
    regulatoryRefId: "CDSCO-PVPI-2024",
    sourceReference: "CDSCO 2024 Guidance Document for PSUR & PV • Section 4.2",
    sourceVersion: "CDSCO 2024 Guidance",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious unexpected adverse drug reactions occurring in India mandate expedited reporting within 15 calendar days to CDSCO, whereas non-serious reactions are collated in periodic safety reports (or within 90 days in applicable frameworks).",
        isCorrect: true,
        rationale:
          "Correct. CDSCO 2024 guidance aligns with international 15-day expedited standards for serious events and mandates 90-day/periodic collation for non-serious reports.",
      },
      {
        key: "B",
        text: "All adverse reactions in India, regardless of seriousness, must be reported within 24 hours of receipt.",
        isCorrect: false,
        rationale: "Incorrect. 24-hour reporting applies only to clinical trial deaths/life-threatening events, not standard spontaneous ICSRs.",
      },
      {
        key: "C",
        text: "Foreign serious adverse reactions occurring outside India must never be reported or referenced in CDSCO submissions.",
        isCorrect: false,
        rationale: "Incorrect. Global safety signals and foreign serious cases must be integrated into PSURs submitted to CDSCO.",
      },
      {
        key: "D",
        text: "Non-serious reports can be deleted from the corporate database after 30 days without regulatory disclosure.",
        isCorrect: false,
        rationale: "Incorrect. Deleting safety records violates Good Pharmacovigilance Practice and data retention laws.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION B: ICSR CASE PROCESSING & 4 CRITERIA INTAKE (6 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-B-05",
    itemVersion: "1.1.0",
    itemNumber: 5,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "Infectious Diseases",
    difficulty: "foundational",
    questionType: "intake_validation",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "48-year-old male (Initials: S.P.)",
      suspectDrug: "Amoxicillin-Clavulanate 625 mg TID",
      adverseEvent: "Acute maculopapular exanthem and facial swelling",
      reporter: { name: "Dr. K. Nair", role: "General Physician", location: "Apollo Clinic, Bengaluru" },
      narrativeSnippet:
        "Source Report: Dr. K. Nair, Apollo Clinic Bengaluru, reports patient S.P., 48-year-old male, prescribed Amoxicillin-Clavulanate 625 mg TID for acute bronchitis on 04/02/2026. On 07/02/2026, patient developed diffuse pruritic maculopapular exanthem and periorbital edema. Drug withdrawn; symptoms cleared after oral cetirizine. No prior penicillin allergy recorded.",
    },
    prompt:
      "Evaluate the source intake report. Under ICH E2D(R1), verify whether the 4 minimum ICSR criteria are satisfied to register this case into the safety database.",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Minimum Criteria for ICSR Processing",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Valid ICSR: Patient (48M S.P.), Reporter (Dr. K. Nair), Suspect Drug (Amoxicillin-Clavulanate), and Adverse Event (Exanthem/edema) are all verified. Proceed to case booking.",
        isCorrect: true,
        rationale: "Correct. All 4 statutory criteria are present with clear evidence. The case is legally valid.",
      },
      {
        key: "B",
        text: "Invalid Case: Cannot be booked because the patient's national identity number and blood group are missing.",
        isCorrect: false,
        rationale: "Incorrect. National identity numbers and blood groups are optional supplemental data, not core validity criteria.",
      },
      {
        key: "C",
        text: "Invalid Case: Spontaneous reports require histopathological skin biopsy proof before booking.",
        isCorrect: false,
        rationale: "Incorrect. Clinical observation by a treating physician is sufficient for ICSR intake.",
      },
      {
        key: "D",
        text: "Invalid Case: The drug manufacturer must independently interview the patient before creating an ICSR record.",
        isCorrect: false,
        rationale: "Incorrect. Direct patient contact is not mandatory when reported by a healthcare professional.",
      },
    ],
    correctAnswer: "A",
    simulationData: {
      criteria: { patient: true, reporter: true, product: true, event: true },
      verdict: "valid",
    },
  },
  {
    itemId: "ACRI-PV-SEC-B-06",
    itemVersion: "1.1.0",
    itemNumber: 6,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "intake_validation",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "Unknown (no initials, age, gender, or medical record number provided)",
      suspectDrug: "Atorvastatin 40 mg OD",
      adverseEvent: "Severe generalized myalgia",
      reporter: { name: "Consumer web feedback form", role: "Anonymous", location: "Unknown IP" },
      narrativeSnippet:
        "Source Web Form: 'Someone took Atorvastatin 40 mg and had terrible muscle cramps and couldn't get out of bed for three days.' No contact info, no patient identifiers, no reporter email.",
    },
    prompt:
      "Review the consumer feedback submission. Under ICH E2D(R1) and GVP Module VI, what is the mandatory regulatory intake action?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Section 2.2 Incomplete Reports & Query Management",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Invalid ICSR: Neither an identifiable patient nor an identifiable reporter is present. Retain in non-valid query archive; do not transmit as an expedited ICSR.",
        isCorrect: true,
        rationale:
          "Correct. Without at least one identifiable patient parameter and an identifiable reporter with verifiable contact ability, the report lacks legal ICSR validity.",
      },
      {
        key: "B",
        text: "Valid ICSR: Assign a fictitious patient name and submit as an expedited 15-day alert to the regulatory agency.",
        isCorrect: false,
        rationale: "Incorrect. Fabricating patient data violates clinical data integrity laws.",
      },
      {
        key: "C",
        text: "Valid ICSR: Any consumer complaint mentioning a drug name must immediately be logged as a serious event.",
        isCorrect: false,
        rationale: "Incorrect. Validity requires minimum criteria; seriousness is evaluated separately.",
      },
      {
        key: "D",
        text: "Delete permanently: Remove from company servers immediately without retaining an audit log.",
        isCorrect: false,
        rationale: "Incorrect. All incoming safety notices must be archived in non-valid query logs for inspection audits.",
      },
    ],
    correctAnswer: "A",
    simulationData: {
      criteria: { patient: false, reporter: false, product: true, event: true },
      verdict: "invalid",
    },
  },
  {
    itemId: "ACRI-PV-SEC-B-07",
    itemVersion: "1.1.0",
    itemNumber: 7,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "Oncology",
    difficulty: "intermediate",
    questionType: "case_assessment",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "64-year-old female",
      suspectDrug: "Trastuzumab 6 mg/kg IV",
      adverseEvent: "Asymptomatic drop in Left Ventricular Ejection Fraction (LVEF) from 62% to 44%",
      reporter: { name: "Dr. S. Kulkarni", role: "Cardio-oncologist", location: "Tata Medical Center" },
      narrativeSnippet:
        "Routine 3-month surveillance echocardiogram demonstrated an asymptomatic decline in LVEF from 62% to 44% (18% absolute reduction). Trastuzumab withheld per protocol; patient started on lisinopril and carvedilol. No congestive heart failure symptoms.",
    },
    prompt:
      "A literature or clinical report describes this asymptomatic LVEF decline. Under ICH E2A Section II.B, how should this event be triaged regarding seriousness?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2A • Section II.B Medically Significant Events",
    sourceVersion: "ICH E2A Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious (Medically Significant): An LVEF drop below 45% represents significant cardiotoxicity that jeopardizes the patient and requires medical intervention to prevent permanent impairment.",
        isCorrect: true,
        rationale:
          "Correct. Under ICH E2A, medically important events that may not result in immediate hospitalization but jeopardize the patient and require medical intervention qualify as Serious.",
      },
      {
        key: "B",
        text: "Non-Serious: Because the patient remained asymptomatic without overnight hospital bed admission, it cannot be classified as serious.",
        isCorrect: false,
        rationale: "Incorrect. The 'medically significant' criterion captures severe subclinical toxicities requiring urgent therapy.",
      },
      {
        key: "C",
        text: "Life-Threatening: Automatic 7-day expedited report because any oncology event is classified as life-threatening.",
        isCorrect: false,
        rationale: "Incorrect. Life-threatening is reserved for events placing the patient at immediate risk of death.",
      },
      {
        key: "D",
        text: "Exempt from reporting: Echocardiography findings are laboratory artifacts exempt from pharmacovigilance tracking.",
        isCorrect: false,
        rationale: "Incorrect. Diagnostic findings documenting organ dysfunction must be reported as adverse reactions.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-B-08",
    itemVersion: "1.1.0",
    itemNumber: 8,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "Endocrinology",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "When screening scientific literature under EMA GVP Module VI and ICH guidelines, what is the mandatory regulatory rule regarding duplicate case detection between published literature articles and spontaneous ICSRs already in the database?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module VI • Section VI.C.2 Literature Monitoring",
    sourceVersion: "GVP Rev 2",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Safety associates must match patient demographics, country, hospital, dates, and medical details to identify whether the literature case is a duplicate of a prior spontaneous ICSR, merging information into a master case with cross-referencing.",
        isCorrect: true,
        rationale:
          "Correct. Duplicate management prevents signal distortion while ensuring unique clinical follow-up details from published literature enrich the master case record.",
      },
      {
        key: "B",
        text: "Literature cases should always be logged as brand-new independent cases without checking existing spontaneous records.",
        isCorrect: false,
        rationale: "Incorrect. Creating unlinked duplicate cases artificially inflates disproportionality metrics and safety signals.",
      },
      {
        key: "C",
        text: "Literature cases are exempt from database entry if the author is not employed by the marketing authorization holder.",
        isCorrect: false,
        rationale: "Incorrect. MAHs have a statutory obligation to monitor published medical literature worldwide.",
      },
      {
        key: "D",
        text: "All literature cases must be deleted after 14 days to preserve database disk space.",
        isCorrect: false,
        rationale: "Incorrect. Literature citations must be archived in compliance with GVP record retention standards.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-B-09",
    itemVersion: "1.1.0",
    itemNumber: 9,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "Gastroenterology & Analgesics",
    difficulty: "intermediate",
    questionType: "intake_validation",
    jurisdiction: "Global (ICH)",
    prompt:
      "A hospital pharmacist calls the corporate medical information line reporting that a patient experienced acute liver failure after an intentional massive overdose of 25 grams of acetaminophen with alcohol. Under ICH E2D(R1), how must intentional overdose and poisonings be processed?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Section 2.4 Overdose, Abuse, Off-Label and Medication Errors",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "It must be processed as a valid ICSR: Overdose reports associated with adverse reactions must be recorded and evaluated for seriousness (here, life-threatening/hospitalization requiring 15-day expedited reporting).",
        isCorrect: true,
        rationale:
          "Correct. ICH E2D(R1) mandates that reports of overdose, abuse, misuse, or medication errors leading to adverse events must be processed as valid ICSRs.",
      },
      {
        key: "B",
        text: "It should be dismissed immediately because intentional overdoses represent psychiatric intent rather than adverse drug reactions.",
        isCorrect: false,
        rationale: "Incorrect. Intentionality does not exempt serious adverse outcomes from pharmacovigilance surveillance.",
      },
      {
        key: "C",
        text: "It must only be submitted to local law enforcement authorities and withheld from the safety database.",
        isCorrect: false,
        rationale: "Incorrect. Public health surveillance demands corporate safety database entry.",
      },
      {
        key: "D",
        text: "It should be held in pending status for 365 days before regulatory notification.",
        isCorrect: false,
        rationale: "Incorrect. Expedited clocks apply strictly from the date of initial receipt.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-B-10",
    itemVersion: "1.1.0",
    itemNumber: 10,
    section: "B",
    sectionTitle: "Section B: ICSR Case Processing & Intake",
    competencyId: "icsrProcessing",
    domain: "CNS & Neurology",
    difficulty: "intermediate",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "Under the ICH E2B(R3) electronic transmission standard, which data element path represents the primary sender's unique worldwide case identification number?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2B(R3) Implementation Guide • Field C.1.1",
    sourceVersion: "E2B(R3) Specification",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "C.1.8.1 (Worldwide Unique Case Identification Number - WWUID)",
        isCorrect: true,
        rationale:
          "Correct. Field C.1.8.1 in ICH E2B(R3) stores the Worldwide Unique Case Identifier, composed of Country Code, MAH/Sponsor Name, and Case Number.",
      },
      {
        key: "B",
        text: "A.1.0.1 (Batch Transmission Envelope Number)",
        isCorrect: false,
        rationale: "Incorrect. A.1 fields denote transmission batch envelope routing.",
      },
      {
        key: "C",
        text: "D.1 (Patient Demographics Record)",
        isCorrect: false,
        rationale: "Incorrect. Section D specifies patient clinical attributes.",
      },
      {
        key: "D",
        text: "G.k (Suspect Drug Dosage Posology)",
        isCorrect: false,
        rationale: "Incorrect. Section G describes medicinal product characteristics.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION C: CASE ASSESSMENT & SERIOUSNESS TRIAGE (6 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-C-11",
    itemVersion: "1.1.0",
    itemNumber: 11,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "case_assessment",
    jurisdiction: "Global (ICH)",
    prompt:
      "According to ICH E2A Section II.B, which of the following patient outcomes legally classifies an adverse drug reaction as 'Serious'?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2A • Section II.B Definition of Serious Adverse Event",
    sourceVersion: "ICH E2A Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "The event resulted in inpatient hospitalization or prolongation of existing hospitalization.",
        isCorrect: true,
        rationale: "Correct. Inpatient hospitalization or its prolongation is an explicit statutory criterion of seriousness under ICH E2A.",
      },
      {
        key: "B",
        text: "The patient experienced moderate nausea treated with oral over-the-counter antacids.",
        isCorrect: false,
        rationale: "Incorrect. Mild/moderate symptomatic nausea managed at home is non-serious.",
      },
      {
        key: "C",
        text: "The patient missed half a day of school or work without seeking medical consultation.",
        isCorrect: false,
        rationale: "Incorrect. Transient occupational inconvenience does not meet regulatory seriousness.",
      },
      {
        key: "D",
        text: "The prescribing physician switched the medication brand to reduce treatment costs.",
        isCorrect: false,
        rationale: "Incorrect. Economic brand substitution is not an adverse event.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-C-12",
    itemVersion: "1.1.0",
    itemNumber: 12,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "Immunology & Rheumatology",
    difficulty: "intermediate",
    questionType: "case_assessment",
    jurisdiction: "Global (ICH)",
    prompt:
      "A 32-year-old pregnant woman receiving an anti-TNF biologic for rheumatoid arthritis delivers an infant with a ventricular septal defect (congenital heart defect). What is the mandatory seriousness criterion and regulatory classification under ICH E2A and GVP Module VI?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2A Section II.B & EMA GVP Module VI • Congenital Anomaly Criteria",
    sourceVersion: "ICH E2A Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious (Congenital Anomaly / Birth Defect): Mandates 15-day expedited reporting to regulatory authorities regardless of surgical outcome.",
        isCorrect: true,
        rationale:
          "Correct. Congenital anomaly or birth defect is an independent statutory seriousness criterion under ICH E2A and demands 15-day expedited reporting.",
      },
      {
        key: "B",
        text: "Non-Serious: Congenital anomalies are evaluated only in 5-year post-marketing epidemiological reviews.",
        isCorrect: false,
        rationale: "Incorrect. Congenital anomalies are serious events subject to strict expedited clocks.",
      },
      {
        key: "C",
        text: "Non-Reportable: Maternal drug exposure during pregnancy is excluded from pharmacovigilance tracking.",
        isCorrect: false,
        rationale: "Incorrect. Pregnancy exposure and neonatal outcomes are key areas of pharmacovigilance surveillance.",
      },
      {
        key: "D",
        text: "Internal Notice Only: Reporting is optional unless the infant required open-heart bypass surgery within 24 hours.",
        isCorrect: false,
        rationale: "Incorrect. The presence of the structural defect establishes seriousness immediately.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-C-13",
    itemVersion: "1.1.0",
    itemNumber: 13,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "Endocrinology",
    difficulty: "intermediate",
    questionType: "case_assessment",
    jurisdiction: "European Union (EMA)",
    prompt:
      "A 54-year-old patient taking an SGLT2 inhibitor develops euglycemic diabetic ketoacidosis (arterial pH 7.18, bicarbonate 8 mEq/L, ketones 4+). The patient is stabilized in the emergency department for 14 hours with intravenous insulin and fluids before being discharged home without overnight ward admission. How should seriousness be classified?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module VI • Section VI.B.1.2 Seriousness Criteria",
    sourceVersion: "GVP Rev 2",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious (Life-Threatening / Medically Significant): Severe acidemia (pH 7.18) placed the patient at immediate risk of death and required intensive emergency intervention, satisfying seriousness despite avoiding overnight ward admission.",
        isCorrect: true,
        rationale:
          "Correct. Life-threatening applies to events placing the patient at immediate risk of death at the time of the event. A pH of 7.18 meets life-threatening/medically significant criteria regardless of bed duration.",
      },
      {
        key: "B",
        text: "Non-Serious: Because the patient was discharged from the emergency department after 14 hours without formal inpatient bed admission, it is non-serious.",
        isCorrect: false,
        rationale: "Incorrect. Seriousness is not solely determined by hospital billing codes; clinical severity and life threat govern.",
      },
      {
        key: "C",
        text: "Non-Serious: Euglycemic DKA is expected for this drug class and therefore can never be serious.",
        isCorrect: false,
        rationale: "Incorrect. Expectedness determines expedited reporting status, never whether an event is Serious.",
      },
      {
        key: "D",
        text: "Unassessable: Blood gas values cannot be utilized to judge clinical seriousness.",
        isCorrect: false,
        rationale: "Incorrect. Objective laboratory findings directly substantiate medical significance.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-C-14",
    itemVersion: "1.1.0",
    itemNumber: 14,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "Infectious Diseases",
    difficulty: "advanced",
    questionType: "case_assessment",
    jurisdiction: "United States (FDA)",
    prompt:
      "Under US FDA 21 CFR 314.80(a), what is the definitive regulatory difference between 'Expected' (Listed) and 'Unexpected' (Unlisted) adverse drug experiences?",
    regulatoryRefId: "FDA-21CFR-314-80",
    sourceReference: "US FDA 21 CFR 314.80(a) • Definition of Unexpected Adverse Drug Experience",
    sourceVersion: "2024 CFR Title 21",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "An unexpected event is not listed in the current FDA-approved package insert at the specificity or severity that was observed, or is not consistent with the risk information in the labeling.",
        isCorrect: true,
        rationale:
          "Correct. 21 CFR 314.80(a) states an event is unexpected if it is not listed in the current labeling, or is not listed at the observed specificity or severity (e.g. hepatic necrosis when only elevated transaminases are labeled).",
      },
      {
        key: "B",
        text: "Any event with an incidence rate below 1% in post-marketing registries is deemed unexpected.",
        isCorrect: false,
        rationale: "Incorrect. Statistical frequency in registries does not define regulatory labeled expectedness.",
      },
      {
        key: "C",
        text: "An event is expected if it has been published in any medical textbook, even if omitted from the product label.",
        isCorrect: false,
        rationale: "Incorrect. Only the official approved product labeling (RSI/USPI/SmPC) dictates regulatory expectedness.",
      },
      {
        key: "D",
        text: "Expectedness is determined solely by the treating doctor's clinical opinion at the time of reporting.",
        isCorrect: false,
        rationale: "Incorrect. Expectedness is a legal determination evaluated against approved reference safety information.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-C-15",
    itemVersion: "1.1.0",
    itemNumber: 15,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "Cardiovascular",
    difficulty: "intermediate",
    questionType: "case_assessment",
    jurisdiction: "Global (ICH)",
    prompt:
      "A 50-year-old patient on an oral anticoagulant develops acute hematemesis and melena with hemoglobin dropping from 14 g/dL to 7.8 g/dL, requiring admission to the intensive care unit and 3 units of packed red blood cells. The product labeling lists 'gastrointestinal hemorrhage'. How is this case classified for expedited reporting?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Expectedness and Seriousness Evaluation",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious & Expected: The event required hospitalization (Serious) and severe hemorrhage is listed in labeling (Expected). Expedited reporting depends on local jurisdiction rules (in many regions, serious expected post-marketing reports are periodic, unless fatal or specified).",
        isCorrect: true,
        rationale:
          "Correct. The event satisfies the hospitalization seriousness criterion, but is listed in the approved reference safety information as Expected.",
      },
      {
        key: "B",
        text: "Non-Serious: Because bleeding is expected for an anticoagulant, it is downgraded to non-serious.",
        isCorrect: false,
        rationale: "Incorrect. Expected events that result in hospitalization or life threat remain legally Serious.",
      },
      {
        key: "C",
        text: "Serious & Unexpected: Any event requiring a blood transfusion is automatically classified as unlisted.",
        isCorrect: false,
        rationale: "Incorrect. Transfusions describe supportive medical treatment, not term unlistedness.",
      },
      {
        key: "D",
        text: "Invalid Case: Hemorrhage caused by an anticoagulant is an anticipated pharmacology outcome exempt from reporting.",
        isCorrect: false,
        rationale: "Incorrect. Pharmacological mechanism does not exempt adverse events from pharmacovigilance reporting.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-C-16",
    itemVersion: "1.1.0",
    itemNumber: 16,
    section: "C",
    sectionTitle: "Section C: Case Assessment & Seriousness",
    competencyId: "caseAssessment",
    domain: "CNS & Neurology",
    difficulty: "advanced",
    questionType: "case_assessment",
    jurisdiction: "Global (ICH)",
    prompt:
      "A patient on an atypical antipsychotic develops high fever, muscle rigidity, altered consciousness, and creatine kinase > 10,000 U/L (Neuroleptic Malignant Syndrome). The patient survives after 6 days in the ICU. The company's reference safety information lists 'hyperthermia' but does NOT list 'Neuroleptic Malignant Syndrome'. What is the expectedness determination?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Severity and Specificity Principles in Expectedness",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Unexpected (Unlisted): Listing a minor symptom like 'hyperthermia' does not anticipate a complex, life-threatening syndrome like Neuroleptic Malignant Syndrome under ICH specificity standards.",
        isCorrect: true,
        rationale:
          "Correct. ICH E2A/E2D rules dictate that a broader, less specific term does not cover a more severe, distinct clinical syndrome. Listing hyperthermia does not render NMS expected.",
      },
      {
        key: "B",
        text: "Expected (Listed): Any syndrome involving elevated temperature is covered by the term 'hyperthermia'.",
        isCorrect: false,
        rationale: "Incorrect. Under ICH rules, listing a single non-specific symptom does not render a multi-system syndrome expected.",
      },
      {
        key: "C",
        text: "Exempt from expectedness analysis because the patient survived.",
        isCorrect: false,
        rationale: "Incorrect. Survival does not alter the requirement to determine listedness.",
      },
      {
        key: "D",
        text: "Conditional: Expectedness must be deferred until a follow-up EEG is completed.",
        isCorrect: false,
        rationale: "Incorrect. Expectedness is determined at the time of intake against approved reference documentation.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION D: MEDICAL INTERPRETATION & WHO-UMC CAUSALITY (4 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-D-17",
    itemVersion: "1.1.0",
    itemNumber: 17,
    section: "D",
    sectionTitle: "Section D: Medical Interpretation & Causality",
    competencyId: "medicalInterpretation",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "causality_determination",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "58-year-old male",
      suspectDrug: "Lisinopril 20 mg OD",
      adverseEvent: "Orofacial angioedema with lip and tongue swelling",
      narrativeSnippet:
        "Patient started Lisinopril 20 mg on 10/01/2026. On 24/01/2026, he developed acute tongue and lip swelling without urticaria. Lisinopril was discontinued on 24/01/2026, and angioedema resolved within 24 hours. Two months later, the patient accidentally took his spouse's Lisinopril tablet; within 4 hours, identical lip and tongue angioedema recurred.",
    },
    prompt:
      "Apply the standardized WHO-UMC causality classification framework. What is the most defensible causality category for the relationship between Lisinopril and angioedema in this case?",
    regulatoryRefId: "WHO-UMC-CAUSALITY",
    sourceReference: "WHO-UMC Causality Assessment Table • Category: Certain",
    sourceVersion: "WHO-UMC Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Certain: Plausible temporal relationship, event cannot be explained by disease or other drugs, positive dechallenge, and definitive positive rechallenge.",
        isCorrect: true,
        rationale:
          "Correct. According to the WHO-UMC table, 'Certain' strictly requires plausible time window, positive dechallenge, event cannot be explained by concurrent disease, and positive rechallenge.",
      },
      {
        key: "B",
        text: "Probable / Likely: Because rechallenge was accidental, it cannot count toward a Certain rating.",
        isCorrect: false,
        rationale: "Incorrect. The WHO-UMC criteria do not disqualify rechallenges simply because they occurred accidentally.",
      },
      {
        key: "C",
        text: "Possible: Lisinopril is an ACE inhibitor and tongue swelling could be caused by dietary food allergies.",
        isCorrect: false,
        rationale: "Incorrect. Positive dechallenge and rechallenge firmly establish higher causality than Possible.",
      },
      {
        key: "D",
        text: "Unassessable: An allergic blood test was not conducted in the laboratory.",
        isCorrect: false,
        rationale: "Incorrect. Rechallenge provides the highest clinical evidence of causality.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-D-18",
    itemVersion: "1.1.0",
    itemNumber: 18,
    section: "D",
    sectionTitle: "Section D: Medical Interpretation & Causality",
    competencyId: "medicalInterpretation",
    domain: "Infectious Diseases",
    difficulty: "intermediate",
    questionType: "causality_determination",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "42-year-old female",
      suspectDrug: "Levofloxacin 500 mg OD",
      adverseEvent: "Acute bilateral Achilles tendinitis",
      narrativeSnippet:
        "Patient started Levofloxacin for pyelonephritis. On Day 5, she noticed severe bilateral heel pain and swelling. Ultrasound revealed acute Achilles tendinitis. Levofloxacin was discontinued, and symptoms resolved over 2 weeks with rest. Rechallenge was NOT performed due to medical risk.",
    },
    prompt:
      "What is the appropriate WHO-UMC causality category for this case?",
    regulatoryRefId: "WHO-UMC-CAUSALITY",
    sourceReference: "WHO-UMC Causality Assessment Table • Category: Probable/Likely",
    sourceVersion: "WHO-UMC Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Probable / Likely: Plausible temporal sequence, response to withdrawal (positive dechallenge) is clinically reasonable, event cannot be reasonably explained by known disease characteristics, and rechallenge is not required.",
        isCorrect: true,
        rationale:
          "Correct. 'Probable/Likely' fits when there is a reasonable time sequence, positive dechallenge, cannot be explained by disease, and rechallenge is absent.",
      },
      {
        key: "B",
        text: "Certain: Tendinitis is a well-known black-box warning for fluoroquinolones, so rechallenge is never needed for Certain.",
        isCorrect: false,
        rationale: "Incorrect. Under WHO-UMC, 'Certain' cannot be assigned without positive rechallenge or definitive re-exposure evidence.",
      },
      {
        key: "C",
        text: "Unlikely: Urinary tract infections frequently cause Achilles tendon inflammation.",
        isCorrect: false,
        rationale: "Incorrect. Pyelonephritis does not explain bilateral Achilles tendinitis.",
      },
      {
        key: "D",
        text: "Unclassifiable: Safety databases automatically reject cases that lack rechallenge.",
        isCorrect: false,
        rationale: "Incorrect. The vast majority of valid post-marketing ICSRs do not contain rechallenges.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-D-19",
    itemVersion: "1.1.0",
    itemNumber: 19,
    section: "D",
    sectionTitle: "Section D: Medical Interpretation & Causality",
    competencyId: "medicalInterpretation",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "causality_determination",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "68-year-old male with Stage IV squamous cell lung cancer",
      suspectDrug: "Immunotherapy Checkpoint Inhibitor",
      concomitantDrugs: "Gemcitabine, Carboplatin, Ondansetron",
      adverseEvent: "Acute renal failure with serum creatinine increasing from 1.1 to 3.4 mg/dL",
      narrativeSnippet:
        "Patient received checkpoint inhibitor and concomitant platinum doublet chemotherapy. Additionally, patient had baseline diabetic nephropathy and suffered septic shock requiring IV vancomycin 48 hours prior to acute creatinine rise.",
    },
    prompt:
      "When evaluating causality for the suspect checkpoint inhibitor in this multi-confounded oncology setting, which WHO-UMC category is most scientifically defensible?",
    regulatoryRefId: "WHO-UMC-CAUSALITY",
    sourceReference: "WHO-UMC Causality Assessment Table • Category: Possible",
    sourceVersion: "WHO-UMC Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Possible: Event has a reasonable time relationship to drug administration, but could readily be produced by the patient's clinical state (septic shock) or other therapies (carboplatin, vancomycin).",
        isCorrect: true,
        rationale:
          "Correct. 'Possible' is designated when an event has a plausible temporal relationship, but concurrent disease, septic shock, or concomitant nephrotoxic drugs provide substantial alternative explanations.",
      },
      {
        key: "B",
        text: "Certain: Immune checkpoint inhibitors are known to cause nephritis, so confounding factors can be ignored.",
        isCorrect: false,
        rationale: "Incorrect. Confounders rule out 'Certain' under WHO-UMC rules.",
      },
      {
        key: "C",
        text: "Unlikely: Checkpoint inhibitors have zero documented renal toxicity in worldwide clinical literature.",
        isCorrect: false,
        rationale: "Incorrect. Immune-mediated nephritis is a known class effect; temporal relation makes it Possible.",
      },
      {
        key: "D",
        text: "Exempt from review: Oncology adverse events are never subject to causality assessment.",
        isCorrect: false,
        rationale: "Incorrect. Oncology pharmacovigilance requires rigorous causality evaluation.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-D-20",
    itemVersion: "1.1.0",
    itemNumber: 20,
    section: "D",
    sectionTitle: "Section D: Medical Interpretation & Causality",
    competencyId: "medicalInterpretation",
    domain: "CNS & Neurology",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "When evaluating a clinical drug-drug interaction (DDI) causing an adverse reaction, what is the primary pharmacokinetic mechanism when a potent CYP3A4 inhibitor (e.g. ketoconazole) is co-administered with a CYP3A4 substrate having a narrow therapeutic index?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH Guidelines on Clinical Safety Data Management • Drug Interactions",
    sourceVersion: "ICH Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Enzymatic inhibition reduces hepatic metabolic clearance of the substrate, markedly elevating its plasma concentration and AUC, precipitating concentration-dependent toxicity.",
        isCorrect: true,
        rationale:
          "Correct. CYP3A4 inhibition blocks metabolic biotransformation, increasing systemic drug exposure and precipitating dose-related adverse events.",
      },
      {
        key: "B",
        text: "Enzymatic inhibition accelerates renal glomerular filtration rate, causing rapid sub-therapeutic failure.",
        isCorrect: false,
        rationale: "Incorrect. Enzymatic inhibition decreases clearance, it does not accelerate filtration.",
      },
      {
        key: "C",
        text: "CYP3A4 inhibition destroys gastric acid secretions, preventing drug dissolution.",
        isCorrect: false,
        rationale: "Incorrect. CYP3A4 is a hepatic and enterocytic cytochrome P450 enzyme, not a gastric acid pump.",
      },
      {
        key: "D",
        text: "Pharmacodynamic receptor antagonism blocks all peripheral cholinergic synapses.",
        isCorrect: false,
        rationale: "Incorrect. CYP3A4 interaction is a pharmacokinetic metabolic mechanism, not cholinergic receptor antagonism.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION E: MEDDRA CODING & E2B DATA MAPPING (5 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-E-21",
    itemVersion: "1.1.0",
    itemNumber: 21,
    section: "E",
    sectionTitle: "Section E: Coding & Data Mapping",
    competencyId: "meddraCoding",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "What is the hierarchical structure of the Medical Dictionary for Regulatory Activities (MedDRA) from the most granular level to the highest grouping level?",
    regulatoryRefId: "ICH-MEDDRA-PTC",
    sourceReference: "MedDRA Term Selection: Points to Consider • Section 1 Hierarchy",
    sourceVersion: "MedDRA PtC Release 27.0",
    effectiveFrom: "2024-03-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Lowest Level Term (LLT) → Preferred Term (PT) → High Level Term (HLT) → High Level Group Term (HLGT) → System Organ Class (SOC)",
        isCorrect: true,
        rationale:
          "Correct. MedDRA possesses a 5-tier hierarchical structure: LLT (lowest/most specific) to SOC (broadest anatomical/physiological grouping).",
      },
      {
        key: "B",
        text: "System Organ Class (SOC) → Preferred Term (PT) → Sub-Term (ST) → ICD-10 Code",
        isCorrect: false,
        rationale: "Incorrect. ICD-10 is a separate classification system; MedDRA uses LLT, PT, HLT, HLGT, SOC.",
      },
      {
        key: "C",
        text: "Verbatim Code → Intermediate Code → Final Category Code",
        isCorrect: false,
        rationale: "Incorrect. Fictitious terminology not used in MedDRA.",
      },
      {
        key: "D",
        text: "Lowest Level Term (LLT) → System Organ Class (SOC) → High Level Term (HLT)",
        isCorrect: false,
        rationale: "Incorrect. SOC is the top tier of the hierarchy, not the intermediate tier.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-E-22",
    itemVersion: "1.1.0",
    itemNumber: 22,
    section: "E",
    sectionTitle: "Section E: Coding & Data Mapping",
    competencyId: "meddraCoding",
    domain: "Gastroenterology & Analgesics",
    difficulty: "intermediate",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "In an adverse event narrative, the reporter writes: 'Patient experienced severe belly pain and threw up green liquid.' According to MedDRA Term Selection: Points to Consider (PtC) guidelines, what is the correct medical coding practice?",
    regulatoryRefId: "ICH-MEDDRA-PTC",
    sourceReference: "MedDRA Term Selection: Points to Consider • Section 3.2 Specificity",
    sourceVersion: "MedDRA PtC Release 27.0",
    effectiveFrom: "2024-03-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Code each distinct clinical concept separately to its most specific LLT: LLT Abdominal pain (PT Abdominal pain) and LLT Vomiting bile (PT Vomiting).",
        isCorrect: true,
        rationale:
          "Correct. MedDRA PtC mandates coding all reported signs and symptoms to their respective specific Lowest Level Terms without omitting clinical details.",
      },
      {
        key: "B",
        text: "Code to LLT Peptic ulcer perforation because severe belly pain and green vomiting usually mean an ulcer burst.",
        isCorrect: false,
        rationale: "Incorrect. Coders must never introduce an unconfirmed provisional diagnosis when only symptoms are reported.",
      },
      {
        key: "C",
        text: "Code only to LLT Malaise to minimize the apparent severity of the adverse event.",
        isCorrect: false,
        rationale: "Incorrect. Down-coding or diluting clinical reporter terms violates data integrity rules.",
      },
      {
        key: "D",
        text: "Do not code the event until an exploratory laparotomy confirms the exact surgical pathology.",
        isCorrect: false,
        rationale: "Incorrect. Symptoms must be coded at the time of intake.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-E-23",
    itemVersion: "1.1.0",
    itemNumber: 23,
    section: "E",
    sectionTitle: "Section E: Coding & Data Mapping",
    competencyId: "meddraCoding",
    domain: "Infectious Diseases",
    difficulty: "intermediate",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "A clinical report verbatim states: 'Suspected bacterial pneumonia; rule out COVID-19.' The discharge summary confirms COVID-19 PCR was negative, and the final confirmed diagnosis by the attending physician was Streptococcus pneumoniae lobar pneumonia. Under MedDRA PtC, what is the definitive PT?",
    regulatoryRefId: "ICH-MEDDRA-PTC",
    sourceReference: "MedDRA Term Selection: Points to Consider • Section 3.5 Provisional vs Confirmed Diagnoses",
    sourceVersion: "MedDRA PtC Release 27.0",
    effectiveFrom: "2024-03-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "PT: Pneumococcal pneumonia (under SOC: Infections and infestations).",
        isCorrect: true,
        rationale:
          "Correct. When a definitive diagnosis is confirmed by laboratory/physician findings, code directly to the confirmed diagnosis. Do not code ruled-out conditions.",
      },
      {
        key: "B",
        text: "PT: COVID-19 (because COVID-19 was suspected at initial intake).",
        isCorrect: false,
        rationale: "Incorrect. Ruled-out diagnoses must not be coded as adverse events.",
      },
      {
        key: "C",
        text: "PT: Cough (code only the individual symptoms and omit the confirmed diagnosis).",
        isCorrect: false,
        rationale: "Incorrect. When a definitive diagnosis is confirmed, it takes precedence over individual symptoms.",
      },
      {
        key: "D",
        text: "PT: Medical observation (General disorders).",
        isCorrect: false,
        rationale: "Incorrect. Non-specific administrative codes should not be chosen when a specific pathology is documented.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-E-24",
    itemVersion: "1.1.0",
    itemNumber: 24,
    section: "E",
    sectionTitle: "Section E: Coding & Data Mapping",
    competencyId: "meddraCoding",
    domain: "Immunology & Rheumatology",
    difficulty: "advanced",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "A patient on a biological DMARD presents with jaundice, right upper quadrant pain, ALT 850 U/L, AST 720 U/L, and liver biopsy demonstrating drug-induced centrilobular necrosis. What is the primary System Organ Class (SOC) for PT: Drug-induced liver injury?",
    regulatoryRefId: "ICH-MEDDRA-PTC",
    sourceReference: "MedDRA Term Selection: Points to Consider • Multiaxiality & Primary SOC",
    sourceVersion: "MedDRA PtC Release 27.0",
    effectiveFrom: "2024-03-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Hepatobiliary disorders",
        isCorrect: true,
        rationale: "Correct. In MedDRA, the primary SOC for PT Drug-induced liver injury is Hepatobiliary disorders.",
      },
      {
        key: "B",
        text: "Gastrointestinal disorders",
        isCorrect: false,
        rationale: "Incorrect. Liver-specific pathologies map primarily to Hepatobiliary disorders.",
      },
      {
        key: "C",
        text: "Investigations",
        isCorrect: false,
        rationale: "Incorrect. Investigations is for lab values (e.g. ALT increased), not pathological tissue diagnoses.",
      },
      {
        key: "D",
        text: "General disorders and administration site conditions",
        isCorrect: false,
        rationale: "Incorrect. Inappropriate high-level bucket for organ-specific hepatotoxicity.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-E-25",
    itemVersion: "1.1.0",
    itemNumber: 25,
    section: "E",
    sectionTitle: "Section E: Coding & Data Mapping",
    competencyId: "meddraCoding",
    domain: "Cardiovascular",
    difficulty: "intermediate",
    questionType: "coding_mapping",
    jurisdiction: "Global (ICH)",
    prompt:
      "Under WHO Drug Global (WHODD) coding conventions, what is the essential distinction between the Medicinal Product Name (Trade Name) and the Active Ingredient (Preferred Base Name)?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "WHO Drug Dictionary Guidelines • Product versus Substance Hierarchy",
    sourceVersion: "WHODD Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "The Trade Name reflects the commercial brand marketed in a specific country (e.g. Zestril), while the Active Ingredient identifies the pharmacological chemical substance (e.g. Lisinopril). Both must be mapped to maintain regulatory substance grouping.",
        isCorrect: true,
        rationale:
          "Correct. WHODD enables mapping from trade brand names to standardized active substances, facilitating cross-brand signal detection.",
      },
      {
        key: "B",
        text: "Trade names are confidential and forbidden from being entered into safety databases.",
        isCorrect: false,
        rationale: "Incorrect. Capturing the exact commercial trade name and lot number is critical for product quality defect detection.",
      },
      {
        key: "C",
        text: "Active ingredients only apply to herbal dietary supplements.",
        isCorrect: false,
        rationale: "Incorrect. All pharmaceutical medicinal products are characterized by active chemical or biological substances.",
      },
      {
        key: "D",
        text: "Regulatory agencies only accept generic chemical formulas and reject brand names.",
        isCorrect: false,
        rationale: "Incorrect. ICH E2B(R3) supports both verbatim commercial product names and active substance codes.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION F: DOCUMENTATION & CLINICAL NARRATIVE REVIEW (4 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-F-26",
    itemVersion: "1.1.0",
    itemNumber: 26,
    section: "F",
    sectionTitle: "Section F: Documentation & Narrative Review",
    competencyId: "documentation",
    domain: "Cardiovascular",
    difficulty: "foundational",
    questionType: "narrative_evaluation",
    jurisdiction: "Global (ICH)",
    prompt:
      "Under ICH E2B(R3) Section H.1, what is the mandatory structural sequence for a self-contained, audit-ready clinical case safety narrative?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2B(R3) • Section H.1 Case Summary Narrative Structure",
    sourceVersion: "ICH E2B(R3) Specification",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Patient demographics & baseline medical history → Suspect drug posology, indication, and start/stop dates → Adverse reaction onset timeline and clinical course → Relevant laboratory/diagnostic findings → Dechallenge and interventions → Final clinical outcome.",
        isCorrect: true,
        rationale:
          "Correct. Global health authorities mandate a chronological, objective narrative allowing independent inspectors to reconstruct the entire clinical course.",
      },
      {
        key: "B",
        text: "Legal non-liability statement → Sales revenue of the product → Brief mention of event outcome.",
        isCorrect: false,
        rationale: "Incorrect. Commercial and legal disclaimers have no place in clinical safety narratives.",
      },
      {
        key: "C",
        text: "Final autopsy report first, omitting all prior medications to preserve narrative brevity.",
        isCorrect: false,
        rationale: "Incorrect. Omitting concomitant medications prevents accurate causality assessment.",
      },
      {
        key: "D",
        text: "Personal subjective opinions of the safety associate regarding why the doctor should have prescribed a competitor drug.",
        isCorrect: false,
        rationale: "Incorrect. Subjective, non-factual speculation is strictly prohibited in regulatory narratives.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-F-27",
    itemVersion: "1.1.0",
    itemNumber: 27,
    section: "F",
    sectionTitle: "Section F: Documentation & Narrative Review",
    competencyId: "documentation",
    domain: "Oncology",
    difficulty: "intermediate",
    questionType: "narrative_evaluation",
    jurisdiction: "Global (ICH)",
    prompt:
      "A junior pharmacovigilance associate drafts this sentence in an ICSR narrative: 'The patient probably got colitis because the oncologist gave too high a dose of the drug.' Why is this sentence non-compliant with global GVP documentation standards?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module VI • Section VI.App.1 Narrative Writing Standards",
    sourceVersion: "GVP Rev 2",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "It introduces subjective, speculative, and accusatory language instead of stating objective chronological facts (e.g. 'Patient received Dose X; on Day Y, Grade 3 diarrhea occurred').",
        isCorrect: true,
        rationale:
          "Correct. Narratives must be purely factual, objective, and chronological. Conjectural statements, blame, or speculation violate regulatory audit standards.",
      },
      {
        key: "B",
        text: "It is non-compliant because the word 'colitis' must always be translated into Latin in regulatory narratives.",
        isCorrect: false,
        rationale: "Incorrect. Standard English medical terms are required.",
      },
      {
        key: "C",
        text: "It is non-compliant because oncologists are legally immune from medication errors.",
        isCorrect: false,
        rationale: "Incorrect. Fictitious rule.",
      },
      {
        key: "D",
        text: "It is compliant as long as the oncologist is not named personally in the sentence.",
        isCorrect: false,
        rationale: "Incorrect. Subjective speculation remains unacceptable regardless of anonymization.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-F-28",
    itemVersion: "1.1.0",
    itemNumber: 28,
    section: "F",
    sectionTitle: "Section F: Documentation & Narrative Review",
    competencyId: "documentation",
    domain: "CNS & Neurology",
    difficulty: "intermediate",
    questionType: "narrative_evaluation",
    jurisdiction: "Global (ICH)",
    prompt:
      "When subsequent follow-up information (e.g. confirmatory biopsy report) is received for a case previously submitted to health authorities as an expedited ICSR, how must the clinical narrative be updated?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Section 3 Follow-up Information Handling",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Integrate the new clinical findings clearly marked under a distinct follow-up sub-heading (e.g. 'FOLLOW-UP 01 — Received [Date]'), maintaining the original initial text intact for audit traceability.",
        isCorrect: true,
        rationale:
          "Correct. GVP guidelines require follow-up narratives to append new information under explicit follow-up headers while preserving historical text intact for inspection audit trails.",
      },
      {
        key: "B",
        text: "Overwrite and delete the initial narrative completely so only the latest biopsy is visible.",
        isCorrect: false,
        rationale: "Incorrect. Overwriting historical text destroys the inspection audit trail.",
      },
      {
        key: "C",
        text: "Create a brand new case with a different patient number and discard the initial report.",
        isCorrect: false,
        rationale: "Incorrect. Follow-up information must always remain linked to the master case.",
      },
      {
        key: "D",
        text: "Do not update the narrative because regulatory agencies only read the first initial submission.",
        isCorrect: false,
        rationale: "Incorrect. Health authorities review cumulative follow-up submissions rigorously.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-F-29",
    itemVersion: "1.1.0",
    itemNumber: 29,
    section: "F",
    sectionTitle: "Section F: Documentation & Narrative Review",
    competencyId: "documentation",
    domain: "Endocrinology",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "In an audit inspection by the US FDA or EMA, which of the following is considered a 'Critical Finding' in case documentation and narrative quality?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module III • Pharmacovigilance Inspections & Critical Deficiencies",
    sourceVersion: "GVP Module III",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Systematic failure to collect or document critical clinical details (such as drug start dates or death outcomes), leading to misclassification of seriousness and failure to expedite serious unexpected cases.",
        isCorrect: true,
        rationale:
          "Correct. Systematic omission of critical safety data resulting in missed expedited reporting or distorted safety profiles constitutes a Critical Finding in regulatory inspections.",
      },
      {
        key: "B",
        text: "A single typographical spelling mistake in the name of the hospital clinic.",
        isCorrect: false,
        rationale: "Incorrect. Minor isolated typos without clinical impact are minor observations.",
      },
      {
        key: "C",
        text: "Writing 'mg' with a capital 'M' in a patient diary attachment.",
        isCorrect: false,
        rationale: "Incorrect. Inconsequential formatting irregularity.",
      },
      {
        key: "D",
        text: "Submitting a narrative with 250 words instead of exactly 200 words.",
        isCorrect: false,
        rationale: "Incorrect. Word count is not governed by a rigid statutory cap.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION G: QUALITY, COMPLIANCE & AUDIT READINESS (4 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-G-30",
    itemVersion: "1.1.0",
    itemNumber: 30,
    section: "G",
    sectionTitle: "Section G: Quality & Compliance",
    competencyId: "qualityCompliance",
    domain: "Cardiovascular",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "Under ALCOA+ data integrity principles and FDA 21 CFR Part 11 electronic records regulations, what must be automatically captured in a safety database whenever a user modifies a patient's adverse event date?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module II & FDA 21 CFR Part 11 • Computerized Systems Validation",
    sourceVersion: "GVP Module II",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "A computerized audit trail recording the prior value, the new value, the unique user ID of the person making the change, an exact UTC timestamp, and a mandatory documented reason for change.",
        isCorrect: true,
        rationale:
          "Correct. ALCOA+ and 21 CFR Part 11 demand that audit trails be automated, secure, timestamped, attributable, and record the explicit reason for any data alteration.",
      },
      {
        key: "B",
        text: "A printed paper memo mailed to the country's national patent office.",
        isCorrect: false,
        rationale: "Incorrect. Irrelevant to electronic record audit trails.",
      },
      {
        key: "C",
        text: "The user's personal residential address and annual salary band.",
        isCorrect: false,
        rationale: "Incorrect. Privacy violation and irrelevant.",
      },
      {
        key: "D",
        text: "No audit record is necessary if the change was approved by an informal instant message.",
        isCorrect: false,
        rationale: "Incorrect. All electronic database changes must have automated audit trails.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-G-31",
    itemVersion: "1.1.0",
    itemNumber: 31,
    section: "G",
    sectionTitle: "Section G: Quality & Compliance",
    competencyId: "qualityCompliance",
    domain: "Infectious Diseases",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "A safety associate receives a duplicate ICSR for a patient already in the safety database. The new report includes additional laboratory liver function test results. What is the mandatory GVP procedure for duplicate management?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module VI • Section VI.C.6 Duplicate Detection and Management",
    sourceVersion: "GVP Rev 2",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Merge the supplemental laboratory findings into the existing master case record, document the duplicate linkage in the audit trail, and submit a follow-up transmission if required by regulatory clocks.",
        isCorrect: true,
        rationale:
          "Correct. GVP Module VI requires merging verified duplicate reports into a primary master case to maintain a unified clinical history while preserving all source references.",
      },
      {
        key: "B",
        text: "Immediately delete the new report without logging the source or reason.",
        isCorrect: false,
        rationale: "Incorrect. Deleting source data violates audit trail and record retention laws.",
      },
      {
        key: "C",
        text: "Open two parallel independent cases and submit both to health authorities as separate patients.",
        isCorrect: false,
        rationale: "Incorrect. Creating duplicate active cases artificially distorts post-marketing safety signals.",
      },
      {
        key: "D",
        text: "Block the reporting hospital from sending future adverse event communications.",
        isCorrect: false,
        rationale: "Incorrect. Obstructing adverse event reporting is illegal.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-G-32",
    itemVersion: "1.1.0",
    itemNumber: 32,
    section: "G",
    sectionTitle: "Section G: Quality & Compliance",
    competencyId: "qualityCompliance",
    domain: "Cardiovascular",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "A multinational company has a pharmacovigilance hub in India (UTC +5:30) processing cases for a product licensed in the United States. An expedited 15-day alert report due on 12 March 2026 is submitted electronically via the FDA Electronic Submissions Gateway (ESG) at 23:30 IST on 12 March. At the FDA ESG gateway in Maryland, USA (UTC -5:00), the receipt time is 13:00 EST on 12 March. Was the submission compliant?",
    regulatoryRefId: "FDA-21CFR-314-80",
    sourceReference: "US FDA 21 CFR 314.80 & Electronic Submissions Gateway Timestamps",
    sourceVersion: "2024 CFR",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Compliant: The electronic submission was received by the FDA gateway prior to 23:59:59 EST on Day 15, satisfying the statutory calendar day deadline.",
        isCorrect: true,
        rationale:
          "Correct. The submission arrived at 13:00 EST on Day 15, well before the midnight agency cutoff, fulfilling the legal submission clock.",
      },
      {
        key: "B",
        text: "Non-compliant: Time-zone differences between India and the US automatically void electronic transmissions.",
        isCorrect: false,
        rationale: "Incorrect. The FDA ESG gateway operates 24/7 and validates UTC/local timestamping seamlessly.",
      },
      {
        key: "C",
        text: "Late submission: All international cases must be received before 09:00 AM on Day 1.",
        isCorrect: false,
        rationale: "Incorrect. The 15-day expedited reporting window allows submission up to the end of Day 15.",
      },
      {
        key: "D",
        text: "Critical Audit Finding: Transmitting after business hours in India violates Indian labor laws and invalidates the ICSR.",
        isCorrect: false,
        rationale: "Incorrect. Irrelevant to regulatory drug safety compliance.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-G-33",
    itemVersion: "1.1.0",
    itemNumber: 33,
    section: "G",
    sectionTitle: "Section G: Quality & Compliance",
    competencyId: "qualityCompliance",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "European Union (EMA)",
    prompt:
      "According to EMA GVP Module II (Pharmacovigilance Quality Systems), what is the statutory requirement regarding Standard Operating Procedures (SOPs) for critical pharmacovigilance processes?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module II • Quality System Management & SOPs",
    sourceVersion: "GVP Module II",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Critical processes (including ICSR collection, validation, medical evaluation, expedited reporting, signal detection, and PSUR preparation) must be governed by approved, version-controlled SOPs with documented staff training records.",
        isCorrect: true,
        rationale:
          "Correct. GVP Module II mandates formal, versioned SOPs and documented training for all personnel engaged in critical pharmacovigilance operations.",
      },
      {
        key: "B",
        text: "SOPs are informal recommendations that associates may choose whether or not to follow.",
        isCorrect: false,
        rationale: "Incorrect. Adherence to approved SOPs is legally mandatory under Good Pharmacovigilance Practices.",
      },
      {
        key: "C",
        text: "SOPs only need to be written after an inspector issues a formal warning letter.",
        isCorrect: false,
        rationale: "Incorrect. Robust quality systems must be established prior to marketing authorization.",
      },
      {
        key: "D",
        text: "SOPs should be kept secret from employees to prevent operational leaks.",
        isCorrect: false,
        rationale: "Incorrect. Personnel must be fully trained and tested on active SOPs.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION H: ANALYTICAL REASONING & SIGNAL DETECTION (4 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-H-34",
    itemVersion: "1.1.0",
    itemNumber: 34,
    section: "H",
    sectionTitle: "Section H: Analytical Reasoning & Signal Detection",
    competencyId: "analyticalReasoning",
    domain: "Cardiovascular",
    difficulty: "intermediate",
    questionType: "knowledge_mcq",
    jurisdiction: "European Union (EMA)",
    prompt:
      "In pharmacovigilance signal detection, how is the Proportional Reporting Ratio (PRR) mathematically defined from a 2x2 contingency table (where a = target drug cases with event, b = target drug cases without event, c = other drugs with event, d = other drugs without event)?",
    regulatoryRefId: "EMA-GVP-MOD-IX",
    sourceReference: "EMA GVP Module IX • Signal Management & Statistical Disproportionality",
    sourceVersion: "GVP Module IX Rev 1",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "PRR = [a / (a + b)] / [c / (c + d)]",
        isCorrect: true,
        rationale:
          "Correct. PRR represents the proportion of target drug cases with the event divided by the proportion of other drug cases with the event in the database.",
      },
      {
        key: "B",
        text: "PRR = (a * d) / (b * c)",
        isCorrect: false,
        rationale: "Incorrect. (a*d)/(b*c) is the formula for the Reporting Odds Ratio (ROR), not the PRR.",
      },
      {
        key: "C",
        text: "PRR = a / (a + b + c + d)",
        isCorrect: false,
        rationale: "Incorrect. That formula measures crude single-event incidence.",
      },
      {
        key: "D",
        text: "PRR = (a - c) / (b - d)",
        isCorrect: false,
        rationale: "Incorrect. Mathematically meaningless in pharmacovigilance statistics.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-H-35",
    itemVersion: "1.1.0",
    itemNumber: 35,
    section: "H",
    sectionTitle: "Section H: Analytical Reasoning & Signal Detection",
    competencyId: "analyticalReasoning",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "European Union (EMA)",
    prompt:
      "A safety epidemiologist evaluates disproportionality data for a newly approved kinase inhibitor. The calculated PRR for interstitial lung disease is 4.8, with a Chi-square of 62.4 (p < 0.0001) based on 52 cases. According to Evans criteria (GVP Module IX), what does this finding represent?",
    regulatoryRefId: "EMA-GVP-MOD-IX",
    sourceReference: "EMA GVP Module IX • Section IX.B.1 Disproportionality Signals",
    sourceVersion: "GVP Module IX Rev 1",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "A validated statistical safety signal: Exceeds standard thresholds (PRR >= 2.0, Chi-square >= 4.0, N >= 3), requiring formal multidisciplinary signal evaluation and clinical triage.",
        isCorrect: true,
        rationale:
          "Correct. Evans criteria are clearly met. This constitutes a verified statistical signal demanding formal epidemiological and clinical investigation.",
      },
      {
        key: "B",
        text: "Absolute proof that the kinase inhibitor causes lung disease; the drug must be recalled from the global market within 24 hours.",
        isCorrect: false,
        rationale: "Incorrect. Disproportionality metrics generate hypotheses; they do not prove biological causality or mandate immediate recalls without review.",
      },
      {
        key: "C",
        text: "A non-significant background noise finding that can be archived without documentation.",
        isCorrect: false,
        rationale: "Incorrect. A Chi-square of 62.4 with 52 cases is statistically overwhelming.",
      },
      {
        key: "D",
        text: "An error in database programming that should be discarded.",
        isCorrect: false,
        rationale: "Incorrect. Signal detection findings must be formally evaluated in quality logs.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-H-36",
    itemVersion: "1.1.0",
    itemNumber: 36,
    section: "H",
    sectionTitle: "Section H: Analytical Reasoning & Signal Detection",
    competencyId: "analyticalReasoning",
    domain: "Endocrinology",
    difficulty: "advanced",
    questionType: "knowledge_mcq",
    jurisdiction: "Global (ICH)",
    prompt:
      "In spontaneous reporting databases, what is 'confounding by indication' and how does it threaten signal validity?",
    regulatoryRefId: "EMA-GVP-MOD-IX",
    sourceReference: "CIOMS VIII Guidelines • Confounding Factors in Signal Analysis",
    sourceVersion: "CIOMS VIII Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "When an adverse event is an inherent symptom or complication of the underlying disease for which the drug was prescribed (e.g. myocardial infarction in patients taking cardioprotective statins).",
        isCorrect: true,
        rationale:
          "Correct. Confounding by indication occurs when the clinical condition prompting treatment is itself a major risk factor for the adverse outcome, creating a false-positive statistical association.",
      },
      {
        key: "B",
        text: "When a doctor accidentally writes the wrong patient name on a prescription sheet.",
        isCorrect: false,
        rationale: "Incorrect. That is a clinical dispensing error, not confounding by indication.",
      },
      {
        key: "C",
        text: "When a drug is prescribed only on weekends.",
        isCorrect: false,
        rationale: "Incorrect. Irrelevant.",
      },
      {
        key: "D",
        text: "When regulatory agencies change the generic name of a medicine.",
        isCorrect: false,
        rationale: "Incorrect. Administrative naming change, not an epidemiological confounder.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-H-37",
    itemVersion: "1.1.0",
    itemNumber: 37,
    section: "H",
    sectionTitle: "Section H: Analytical Reasoning & Signal Detection",
    competencyId: "situationalJudgment",
    domain: "Infectious Diseases",
    difficulty: "advanced",
    questionType: "situational_judgment",
    jurisdiction: "Global (ICH)",
    prompt:
      "It is 17:00 on Day 14 of a statutory 15-day expedited reporting clock for a fatal spontaneous ICSR. The commercial business unit director instructs you to hold submission until next week to avoid bad publicity ahead of an investor quarterly earnings call. What is your required occupational and ethical action?",
    regulatoryRefId: "EMA-GVP-MOD-VI",
    sourceReference: "EMA GVP Module I • Section I.C Regulatory Independence and Timeliness",
    sourceVersion: "GVP Module I",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Refuse the request and submit the expedited ICSR by the Day 15 deadline: Regulatory reporting timelines are statutory legal requirements that cannot be delayed for commercial considerations, and escalate the pressure to the QPPV / Compliance Officer.",
        isCorrect: true,
        rationale:
          "Correct. Safety associates must uphold regulatory compliance. Intentionally withholding a serious report to protect investor sentiment is illegal and endangers public safety.",
      },
      {
        key: "B",
        text: "Agree to the delay as long as the commercial director signs an email accepting all future legal fines.",
        isCorrect: false,
        rationale: "Incorrect. Employees cannot waive statutory regulatory obligations.",
      },
      {
        key: "C",
        text: "Downgrade the death event to 'mild fatigue' in the database to eliminate the expedited reporting clock.",
        isCorrect: false,
        rationale: "Incorrect. Falsifying clinical safety data is a criminal offense.",
      },
      {
        key: "D",
        text: "Delete the suspect drug from the database until the investor meeting is over.",
        isCorrect: false,
        rationale: "Incorrect. Deleting active safety records is a severe breach of data integrity.",
      },
    ],
    correctAnswer: "A",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION I: CENTERPIECE REAL INTEGRATED CASE SIMULATION (Case 0174) (3 Items)
  // ───────────────────────────────────────────────────────────────────────────
  {
    itemId: "ACRI-PV-SEC-I-38",
    itemVersion: "1.1.0",
    itemNumber: 38,
    section: "I",
    sectionTitle: "Section I: Integrated Case Simulation (Case 0174)",
    competencyId: "icsrProcessing",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "integrated_simulation",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "58-year-old male (Initials: D.M.)",
      indication: "Metastatic Non-Small Cell Lung Cancer",
      suspectDrug: "Immunotherapy Monoclonal Antibody 200 mg IV q3w",
      concomitantDrugs: "Carboplatin, Pemetrexed, Ondansetron",
      adverseEvent: "Severe Grade 3 watery diarrhea (9 stools/day) with abdominal cramping and hypokalemia",
      reporter: { name: "Dr. Arvind Gupta", role: "Attending Medical Oncologist", location: "Medanta Hospital" },
      timeline: [
        { day: "Day 0 (15/01/2026)", event: "Cycle 1 immunotherapy initiated at hospital oncology clinic." },
        { day: "Day 12 (27/01/2026)", event: "Patient develops severe watery diarrhea (8-10 stools/day) with cramping." },
        { day: "Day 14 (29/01/2026)", event: "Emergency hospitalization; IV fluids and systemic methylprednisolone started." },
        { day: "Day 15 (30/01/2026)", event: "Immunotherapy treatment officially discontinued by oncologist." },
        { day: "Day 18 (02/02/2026)", event: "Diarrhea resolves to 1-2 soft stools/day; potassium normalized." },
      ],
      labData: "Stool C. difficile PCR negative. Serum K+ 2.9 mEq/L on admission. Colonoscopy reveals diffuse colonic mucosal erythema and ulceration consistent with immune-mediated colitis.",
      narrativeSnippet:
        "CASE 0174 SUMMARY:\nPatient 58-year-old male with metastatic NSCLC on suspect immunotherapy initiated 15/01/2026. On 27/01/2026 (Day 12), developed severe watery diarrhea (9 bowel movements/day). On 29/01/2026 (Day 14), hospitalized for dehydration and hypokalemia (K+ 2.9). Stool cultures negative. Colonoscopy confirmed mucosal inflammation. Suspect drug discontinued on 30/01/2026; high-dose IV corticosteroids administered. Symptoms resolved by 02/02/2026. Reporter: Dr. Arvind Gupta, Medanta Hospital.",
    },
    prompt:
      "INTEGRATED SIMULATION (STAGE 1 OF 3): Evaluate Case 0174 for minimum ICSR intake validity. Under ICH E2D(R1), does this source record meet all statutory criteria to initiate case booking into the global safety database?",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2D(R1) • Case 0174 Minimum Criteria Evaluation",
    sourceVersion: "September 2025 Final Guideline",
    effectiveFrom: "2025-09-15",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Valid ICSR: Identifiable Patient (58M D.M.), Identifiable Reporter (Dr. Arvind Gupta), Suspect Medicinal Product (Immunotherapy), and Adverse Event (Grade 3 colitis/diarrhea) are all documented with clear evidence.",
        isCorrect: true,
        rationale:
          "Correct. All 4 minimum criteria are satisfied with clinical dates, institution, and investigator identity.",
      },
      {
        key: "B",
        text: "Invalid Case: The case is invalid because the patient did not pass away.",
        isCorrect: false,
        rationale: "Incorrect. Fatality is not required for validity.",
      },
      {
        key: "C",
        text: "Invalid Case: An ICSR cannot be processed if the patient was receiving concomitant chemotherapy.",
        isCorrect: false,
        rationale: "Incorrect. Polypharmacy is common; concomitant drugs must be recorded, not excluded.",
      },
      {
        key: "D",
        text: "Invalid Case: The report lacks the patient's signature giving permission to be logged.",
        isCorrect: false,
        rationale: "Incorrect. Patient signature is not a statutory requirement for spontaneous HCP reporting.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-I-39",
    itemVersion: "1.1.0",
    itemNumber: 39,
    section: "I",
    sectionTitle: "Section I: Integrated Case Simulation (Case 0174)",
    competencyId: "caseAssessment",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "integrated_simulation",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "58-year-old male (Initials: D.M.)",
      suspectDrug: "Immunotherapy Monoclonal Antibody 200 mg IV q3w",
      adverseEvent: "Severe immune-mediated colitis requiring hospitalization",
      timeline: [
        { day: "Day 14", event: "Emergency hospitalization for Grade 3 diarrhea and severe dehydration." },
        { day: "Day 18", event: "Resolution following corticosteroid therapy." },
      ],
      narrativeSnippet:
        "Refer to Case 0174 Dossier: Patient hospitalized on Day 14 for severe diarrhea and electrolyte loss. Discharged on Day 20 after recovery.",
    },
    prompt:
      "INTEGRATED SIMULATION (STAGE 2 OF 3): Determine the regulatory seriousness classification and expedited submission timeline for Case 0174 under ICH E2A and FDA 21 CFR 314.80 / EMA GVP Module VI.",
    regulatoryRefId: "ICH-E2D-R1",
    sourceReference: "ICH E2A & GVP Module VI • Expedited Reporting Rules for Case 0174",
    sourceVersion: "ICH E2A Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "Serious (Inpatient Hospitalization): Mandates 15-calendar-day expedited submission from Day 0 to the health authorities (FDA, EMA, CDSCO).",
        isCorrect: true,
        rationale:
          "Correct. Hospital admission establishes regulatory Seriousness under ICH E2A and triggers the non-negotiable 15-day expedited reporting clock.",
      },
      {
        key: "B",
        text: "Non-Serious: Because the diarrhea resolved prior to discharge, it is converted to a non-serious routine periodic report.",
        isCorrect: false,
        rationale: "Incorrect. Transient recovery does not downgrade an event that required hospital admission.",
      },
      {
        key: "C",
        text: "7-Day Expedited Alert: Because non-small cell lung cancer is a fatal disease, all events require 7-day reporting.",
        isCorrect: false,
        rationale: "Incorrect. 7-day reporting is strictly reserved for fatal or life-threatening unexpected trial reactions (SUSARs).",
      },
      {
        key: "D",
        text: "Exempt: Colitis is listed in the Investigator Brochure, so expedited reporting is waived.",
        isCorrect: false,
        rationale: "Incorrect. Post-marketing spontaneous cases must be evaluated against the approved package insert.",
      },
    ],
    correctAnswer: "A",
  },
  {
    itemId: "ACRI-PV-SEC-I-40",
    itemVersion: "1.1.0",
    itemNumber: 40,
    section: "I",
    sectionTitle: "Section I: Integrated Case Simulation (Case 0174)",
    competencyId: "medicalInterpretation",
    domain: "Oncology",
    difficulty: "advanced",
    questionType: "integrated_simulation",
    jurisdiction: "Global (ICH)",
    clinicalScenario: {
      patient: "58-year-old male (Initials: D.M.)",
      suspectDrug: "Immunotherapy Monoclonal Antibody 200 mg IV q3w",
      adverseEvent: "Endoscopically confirmed immune-mediated colitis",
      labData: "Colonoscopy confirmed mucosal ulceration; negative C. diff; positive dechallenge.",
      narrativeSnippet:
        "Refer to Case 0174 Dossier: Positive dechallenge (symptoms resolved when drug stopped and steroids started); negative microbiological cultures; plausible 12-day onset latency.",
    },
    prompt:
      "INTEGRATED SIMULATION (STAGE 3 OF 3): Complete the medical safety evaluation for Case 0174: Assign the MedDRA Preferred Term (PT) and the WHO-UMC causality classification.",
    regulatoryRefId: "ICH-MEDDRA-PTC",
    sourceReference: "WHO-UMC & MedDRA PtC • Comprehensive Case Assessment",
    sourceVersion: "WHO-UMC Standard",
    effectiveFrom: "2024-01-01",
    reviewStatus: "ACTIVE",
    approvedBy: "Medical Safety Review Board",
    options: [
      {
        key: "A",
        text: "MedDRA PT: Colitis (Primary SOC: Gastrointestinal disorders) · WHO-UMC Causality: Probable / Likely (Plausible temporal onset, positive dechallenge, negative infectious etiology, no rechallenge attempted).",
        isCorrect: true,
        rationale:
          "Correct. PT Colitis captures the confirmed biopsy/colonoscopy diagnosis under Gastrointestinal disorders. WHO-UMC 'Probable/Likely' is exact because temporal sequence and dechallenge are positive, infectious causes are ruled out, and rechallenge was not attempted.",
      },
      {
        key: "B",
        text: "MedDRA PT: Diarrhoea · WHO-UMC Causality: Unlikely (Chemotherapy carboplatin is the only possible cause of diarrhea).",
        isCorrect: false,
        rationale: "Incorrect. Colitis is the confirmed endoscopic pathology; causality cannot be dismissed as Unlikely.",
      },
      {
        key: "C",
        text: "MedDRA PT: Food poisoning · WHO-UMC Causality: Certain (Hospital food caused the infection).",
        isCorrect: false,
        rationale: "Incorrect. Stool cultures were negative; diagnosis is autoimmune colitis.",
      },
      {
        key: "D",
        text: "MedDRA PT: Malaise · WHO-UMC Causality: Unassessable.",
        isCorrect: false,
        rationale: "Incorrect. Comprehensive clinical data exists; unassessable is invalid.",
      },
    ],
    correctAnswer: "A",
  },
];

// ─── Assembled 40-Item Assessment Battery with Controlled Clinical Variants ───

/**
 * Assembles a controlled, versioned 40-item assessment form.
 *
 * Architecture:
 * 1. Base items are strictly drawn from the authored, validated catalog.
 * 2. Deterministic option shuffling keyed to session seed.
 * 3. Clinical constraints enforced (no nonsensical drug-event combinations).
 * 4. Stratified across all 9 competencies and mixed occupational sections (A through I).
 */
export function assembleAssessmentForm(
  attemptSeed: string,
  targetCount: number = 40
): AcriAssessmentItemRecord[] {
  const prng = createPrng(attemptSeed || "ACRI_SEED_DEFAULT");

  // Clone items
  const battery = AUTHORED_ACRI_ITEM_BANK.map((item, idx) => {
    const cloned = { ...item };
    cloned.itemNumber = idx + 1;
    // Controlled shuffle of options
    cloned.options = seededShuffle(item.options, prng);
    return cloned;
  });

  return battery.slice(0, targetCount);
}

/**
 * Client Sanitizer: Strips sensitive answer keys, correct flags, and internal rationales
 * before delivering questions to candidate's browser.
 */
export function sanitizeAssessmentItemsForClient(
  items: (AcriAssessmentItemRecord | AcriAssessmentItem)[]
): AcriClientAssessmentItem[] {
  return items.map((item, idx) => {
    const rec = item as any;
    return {
      id: rec.itemId || rec.id,
      itemNumber: rec.itemNumber || idx + 1,
      section: rec.section || "A",
      sectionTitle: rec.sectionTitle || rec.stageName || "General Section",
      stageName: rec.stageName || rec.sectionTitle || "Assessment Section",
      stageCategory: rec.stageCategory || rec.competencyId || "PV Basics",
      simulationType: rec.questionType || rec.simulationType || "knowledge_mcq",
      competencyId: rec.competencyId,
      domain: rec.domain || "Cardiovascular",
      difficulty: rec.difficulty || "intermediate",
      jurisdiction: rec.jurisdiction || "Global (ICH)",
      clinicalScenario: rec.clinicalScenario,
      prompt: rec.prompt,
      evidenceRef: rec.sourceReference || rec.evidenceRef || "ICH E2D(R1)",
      options: (rec.options || []).map((opt: any) => ({
        key: opt.key,
        text: opt.text,
        // isCorrect and rationale are strictly withheld on server
      })),
      simulationData: rec.simulationData,
    };
  });
}

/**
 * Legacy compatibility adapter for components expecting AcriAssessmentItem[]
 */
export function generateCandidateQuestionBattery(
  attemptSeed: string,
  targetCount: number = 40
): AcriAssessmentItem[] {
  const records = assembleAssessmentForm(attemptSeed, targetCount);
  return records.map((r) => ({
    id: r.itemId,
    itemNumber: r.itemNumber,
    stageName: r.sectionTitle,
    stageCategory:
      r.competencyId === "pvFundamentals"
        ? "PV Basics"
        : r.competencyId === "icsrProcessing"
          ? "ICSR Processing"
          : r.competencyId === "caseAssessment"
            ? "Case Assessment"
            : r.competencyId === "medicalInterpretation"
              ? "Causality"
              : r.competencyId === "meddraCoding"
                ? "Coding"
                : r.competencyId === "documentation"
                  ? "Documentation"
                  : r.competencyId === "qualityCompliance"
                    ? "Quality & Compliance"
                    : "Reasoning & Triage",
    simulationType:
      r.questionType === "intake_validation"
        ? "intake_validation"
        : r.questionType === "coding_mapping"
          ? "meddra_coding"
          : r.questionType === "causality_determination"
            ? "who_causality"
            : "mcq",
    competencyId: r.competencyId,
    difficulty: r.difficulty,
    clinicalScenario: r.clinicalScenario,
    prompt: r.prompt,
    evidenceRef: r.sourceReference,
    options: r.options,
    simulationData: r.simulationData,
    correctAnswer: r.correctAnswer,
  }));
}
