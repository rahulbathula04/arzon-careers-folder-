/**
 * ACRI-PV Occupational Case & Simulation Library v1.0
 * Authentic Pharmacovigilance Associate Workflows
 */

export type SimulationType =
  | "mcq"
  | "intake_validation"
  | "field_extraction"
  | "who_causality"
  | "confounder_update"
  | "meddra_coding"
  | "narrative_writing"
  | "case_triage";

export interface AcriAssessmentItem {
  id: string;
  itemNumber: number;
  stageName: string;
  stageCategory:
    | "PV Basics"
    | "ICSR Processing"
    | "Case Assessment"
    | "Causality"
    | "Coding"
    | "Quality & Compliance"
    | "Reasoning & Triage"
    | "Documentation";
  simulationType: SimulationType;
  competencyId: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  clinicalScenario?: {
    patient?: string;
    suspectDrug?: string;
    concomitantDrugs?: string;
    adverseEvent?: string;
    narrativeSnippet?: string;
    labData?: string;
  };
  prompt: string;
  evidenceRef?: string; // e.g. "ICH E2D • ICSR Processing"
  options?: { key: string; text: string; isCorrect: boolean; rationale: string }[];
  simulationData?: any;
  correctAnswer?: any;
}

export const ACRI_PV_WORK_SIMULATION_ITEMS: AcriAssessmentItem[] = [
  // ── WORKFLOW SIMULATION 1: STAGE 1 — INTAKE & 4 MINIMUM CRITERIA ──
  {
    id: "sim_intake_01",
    itemNumber: 1,
    stageName: "ICSR INTAKE & VALIDATION",
    stageCategory: "ICSR Processing",
    simulationType: "intake_validation",
    competencyId: "icsrProcessing",
    difficulty: "foundational",
    clinicalScenario: {
      patient: "45-year-old female",
      suspectDrug: "Amoxicillin 500 mg capsules",
      adverseEvent: "Generalized pruritic maculopapular rash",
      narrativeSnippet:
        "SOURCE REPORT — Reporter: Dr. Mehta, Internal Medicine Clinic, Hyderabad. Patient: 45-year-old female. Product: Amoxicillin 500 mg TID. Therapy Start: 03/08/2026. Event: Generalized rash on trunk and extremities on 06/08/2026. Outcome: Drug stopped; recovered after 48 hours. No prior allergy documented.",
    },
    prompt:
      "Review the primary intake report from Dr. Mehta. Under ICH E2A and E2B(R3) guidelines, verify whether this report satisfies the 4 minimum criteria required to constitute a valid Individual Case Safety Report (ICSR).",
    evidenceRef: "ICH E2D • Minimum Criteria for ICSR",
    simulationData: {
      criteriaList: [
        { id: "patient", label: "Identifiable Patient", correct: true, evidence: "45-year-old female" },
        { id: "reporter", label: "Identifiable Reporter", correct: true, evidence: "Dr. Mehta, Internal Medicine" },
        { id: "product", label: "Identifiable Suspect Product", correct: true, evidence: "Amoxicillin 500 mg" },
        { id: "event", label: "Identifiable Adverse Event", correct: true, evidence: "Generalized rash" },
      ],
      verdictOptions: [
        { value: "valid", label: "Valid ICSR — Initiate Case Processing in Database" },
        { value: "invalid", label: "Invalid Case — Move to Pending Query Archive" },
      ],
    },
    correctAnswer: {
      criteria: { patient: true, reporter: true, product: true, event: true },
      verdict: "valid",
    },
  },

  // ── WORKFLOW SIMULATION 2: STAGE 2 — STRUCTURED FIELD EXTRACTION ──
  {
    id: "sim_extraction_02",
    itemNumber: 2,
    stageName: "FIELD EXTRACTION & DATA ENTRY",
    stageCategory: "ICSR Processing",
    simulationType: "field_extraction",
    competencyId: "icsrProcessing",
    difficulty: "intermediate",
    clinicalScenario: {
      narrativeSnippet:
        "Case Source: Dr. Mehta reported a 45-year-old female adult treated with Amoxicillin 500 mg orally on 03/08/2026 for acute pharyngitis. On 06/08/2026, she developed a severe generalized rash. The drug was discontinued, and the rash resolved by 08/08/2026.",
    },
    prompt:
      "Map the source report data into the appropriate E2B(R3) clinical data elements for safety database entry.",
    evidenceRef: "ICH E2B(R3) • Electronic Transmission of ICSRs",
    simulationData: {
      fields: [
        { key: "gender", label: "Patient Gender", options: ["Female", "Male", "Unknown"], correct: "Female" },
        { key: "ageGroup", label: "Age / Age Group", options: ["45 (Adult)", "45 (Pediatric)", "Geriatric"], correct: "45 (Adult)" },
        { key: "suspectDrug", label: "Suspect Drug", options: ["Amoxicillin", "Ibuprofen", "Pharyngitis"], correct: "Amoxicillin" },
        { key: "reportedEvent", label: "Reported Event", options: ["Generalized rash", "Acute pharyngitis", "Drug allergy"], correct: "Generalized rash" },
        { key: "onsetLatency", label: "Time to Onset", options: ["3 days", "24 hours", "Immediate"], correct: "3 days" },
        { key: "outcome", label: "Event Outcome", options: ["Recovered / Resolved", "Not Recovered", "Fatal", "Unknown"], correct: "Recovered / Resolved" },
      ],
    },
    correctAnswer: {
      gender: "Female",
      ageGroup: "45 (Adult)",
      suspectDrug: "Amoxicillin",
      reportedEvent: "Generalized rash",
      onsetLatency: "3 days",
      outcome: "Recovered / Resolved",
    },
  },

  // ── WORKFLOW SIMULATION 3: STAGE 3 — WHO-UMC CAUSALITY ASSESSMENT ──
  {
    id: "sim_causality_03",
    itemNumber: 3,
    stageName: "CAUSALITY EVALUATION (WHO-UMC)",
    stageCategory: "Causality",
    simulationType: "who_causality",
    competencyId: "analyticalReasoning",
    difficulty: "intermediate",
    clinicalScenario: {
      patient: "45-year-old female",
      suspectDrug: "Amoxicillin 500 mg",
      adverseEvent: "Generalized rash",
      narrativeSnippet:
        "CLINICAL EVIDENCE AUDIT:\n• Time relationship: Onset occurred 3 days post-first dose (plausible temporal window).\n• Dechallenge: Positive — rash completely resolved 48 hours following Amoxicillin discontinuation.\n• Rechallenge: Not performed (drug was not re-administered).\n• Alternative etiology: No viral exanthem or other active medical cause identified.",
    },
    prompt:
      "Apply the standard WHO-UMC Causality Algorithm to determine the relationship between Amoxicillin and the generalized rash.",
    evidenceRef: "WHO-UMC Causality Assessment System",
    options: [
      {
        key: "Certain",
        text: "Certain",
        isCorrect: false,
        rationale: "Incorrect. Under WHO-UMC, 'Certain' strictly requires a confirmed positive re-challenge or laboratory proof of causation, neither of which is present.",
      },
      {
        key: "Probable_Likely",
        text: "Probable / Likely",
        isCorrect: true,
        rationale: "Correct. The case exhibits a reasonable temporal sequence (3 days), positive dechallenge upon drug cessation, no alternative medical explanation, and rechallenge was not required/attempted.",
      },
      {
        key: "Possible",
        text: "Possible",
        isCorrect: false,
        rationale: "Incorrect. 'Possible' is designated when information is lacking or alternative explanations (such as disease or concomitant medication) could explain the event. Here, dechallenge is clean and no alternative cause exists.",
      },
      {
        key: "Unlikely",
        text: "Unlikely",
        isCorrect: false,
        rationale: "Incorrect. The temporal relationship and dechallenge strongly refute 'Unlikely'.",
      },
      {
        key: "Unassessable",
        text: "Unassessable / Unclassifiable",
        isCorrect: false,
        rationale: "Incorrect. Data is sufficient to conduct causality assessment.",
      },
    ],
  },

  // ── WORKFLOW SIMULATION 4: STAGE 4 — CONFOUNDING & FOLLOW-UP UNCERTAINTY ──
  {
    id: "sim_confounder_04",
    itemNumber: 4,
    stageName: "FOLLOW-UP & REASONING UNDER UNCERTAINTY",
    stageCategory: "Reasoning & Triage",
    simulationType: "confounder_update",
    competencyId: "analyticalReasoning",
    difficulty: "advanced",
    clinicalScenario: {
      narrativeSnippet:
        "CASE UPDATE (FOLLOW-UP INFORMATION RECEIVED):\nDr. Mehta provides additional history: The patient also self-administered Ibuprofen 400 mg over-the-counter for fever on 04/08/2026 (2 days prior to rash onset). NSAIDs are also established causes of cutaneous drug eruptions.",
    },
    prompt:
      "With the introduction of concomitant Ibuprofen, how should the safety professional modify the case causality and suspect drug categorization in the safety database?",
    evidenceRef: "EMA GVP Module VI • Management of Concomitant Suspects",
    options: [
      {
        key: "A",
        text: "Keep Amoxicillin as sole suspect; classify Ibuprofen as irrelevant dietary supplement",
        isCorrect: false,
        rationale: "Incorrect. Ibuprofen has a plausible temporal sequence and is a known cause of drug-induced rash.",
      },
      {
        key: "B",
        text: "Reclassify Ibuprofen as a Co-Suspect drug; adjust Amoxicillin causality from 'Probable' to 'Possible' due to confounding",
        isCorrect: true,
        rationale: "Correct. Under WHO-UMC and CIOMS guidelines, the presence of a biologically plausible concomitant drug introduced in the same latency window acts as a confounding factor, shifting individual certainty to 'Possible' and warranting co-suspect evaluation.",
      },
      {
        key: "C",
        text: "Close the case immediately as invalid because multiple drugs confuse causality",
        isCorrect: false,
        rationale: "Incorrect. Multiple suspect drugs do not invalidate an ICSR.",
      },
      {
        key: "D",
        text: "Automatically mark both drugs as 'Certain' cause",
        isCorrect: false,
        rationale: "Incorrect. Neither drug has rechallenge data, and mutual presence lowers certainty.",
      },
    ],
  },

  // ── WORKFLOW SIMULATION 5: STAGE 5 — MedDRA CODING WORKFLOW ──
  {
    id: "sim_meddra_05",
    itemNumber: 5,
    stageName: "MedDRA CLINICAL CODING WORKFLOW",
    stageCategory: "Coding",
    simulationType: "meddra_coding",
    competencyId: "meddraCoding",
    difficulty: "intermediate",
    clinicalScenario: {
      narrativeSnippet:
        "Reporter verbatim text: 'Patient developed a very red, severely itchy skin rash spreading across both arms and chest.'",
    },
    prompt:
      "Select the most appropriate MedDRA Lowest Level Term (LLT) that represents this verbatim reported term without diagnostic distortion.",
    evidenceRef: "MedDRA MSSO • Term Selection: Points to Consider",
    options: [
      {
        key: "A",
        text: "Stevens-Johnson Syndrome (PT: Stevens-Johnson syndrome)",
        isCorrect: false,
        rationale: "Incorrect. SJS is a severe diagnostic leap unsupported by mucosal involvement or epidermal detachment in the verbatim.",
      },
      {
        key: "B",
        text: "Rash pruritic (LLT: Rash pruritic / PT: Rash pruritic)",
        isCorrect: true,
        rationale: "Correct. 'Rash pruritic' captures both critical components of the verbatim ('itchy' and 'rash') at the exact level of clinical specificity mandated by MedDRA MSSO PTC guidelines.",
      },
      {
        key: "C",
        text: "Pruritus generalized (LLT: Pruritus generalized)",
        isCorrect: false,
        rationale: "Incorrect. Fails to code the primary skin morphology ('rash'), capturing only the symptom of itching.",
      },
      {
        key: "D",
        text: "Erythema multiforme (LLT: Erythema multiforme)",
        isCorrect: false,
        rationale: "Incorrect. Unsubstantiated diagnostic assumption.",
      },
    ],
  },

  // ── WORKFLOW SIMULATION 6: STAGE 6 — CASE NARRATIVE WRITING ──
  {
    id: "sim_narrative_06",
    itemNumber: 6,
    stageName: "SAFETY NARRATIVE DRAFTING",
    stageCategory: "Documentation",
    simulationType: "narrative_writing",
    competencyId: "documentation",
    difficulty: "advanced",
    clinicalScenario: {
      narrativeSnippet:
        "UNSTRUCTURED CLINICAL SOURCE NOTES:\nPatient is female, 45, no allergies. Came to clinic with sore throat on 3rd Aug 2026. Dr. Mehta started Amox 500mg tid. On 4th Aug she took an OTC Advil 400mg. On 6th Aug she got itchy red rashes on chest and arms. Advised to stop Amox immediately. Got calamine and oral cetirizine. By 8th Aug she called back saying rash had completely vanished. Doctor believes Amox is the main culprit.",
    },
    prompt:
      "Draft a professional, concise, chronological safety narrative suitable for submission in an expedited regulatory ICSR database (MedWatch 3500A / CIOMS I).",
    evidenceRef: "ICH E2D • Clinical Safety Data Management: Case Narratives",
    simulationData: {
      rubricChecklist: [
        "Include patient demographics (45-year-old female) and relevant baseline",
        "Chronological timeline with exact dates (03/08/2026 to 08/08/2026)",
        "Suspect product dosage, frequency, and indication",
        "Concomitant medication (Ibuprofen) noted with timing",
        "Event description, dechallenge action, and outcome (recovered)",
        "Neutral, non-speculative regulatory tone",
      ],
      defaultDraft:
        "This spontaneous report from a physician describes the case of a 45-year-old female patient with no known drug allergies who experienced a generalized pruritic rash while receiving Amoxicillin for acute pharyngitis.\n\nOn 03-AUG-2026, the patient initiated oral Amoxicillin 500 mg three times daily. On 04-AUG-2026, the patient took one dose of over-the-counter Ibuprofen 400 mg. On 06-AUG-2026 (three days post-initiation), the patient developed a red, pruritic maculopapular rash on the chest and arms. Amoxicillin was discontinued on 06-AUG-2026. Concomitant symptomatic therapy with oral cetirizine and topical calamine was administered. The event resolved completely on 08-AUG-2026 (positive dechallenge). No re-challenge was performed.",
    },
    correctAnswer: {
      minWords: 60,
      mustContain: ["45-year-old", "amoxicillin", "rash", "03-aug-2026", "06-aug-2026", "discontinued", "resolved"],
    },
  },

  // ── WORKFLOW SIMULATION 7: STAGE 7 — HIGH-PRESSURE 5-CASE TRIAGE ──
  {
    id: "sim_triage_07",
    itemNumber: 7,
    stageName: "OPERATIONAL SAFETY TRIAGE UNDER PRESSURE",
    stageCategory: "Reasoning & Triage",
    simulationType: "case_triage",
    competencyId: "situationalJudgment",
    difficulty: "advanced",
    clinicalScenario: {
      narrativeSnippet:
        "You are the duty Pharmacovigilance Associate entering the morning shift with 5 safety cases in the queue. Regulatory clocks are ticking.",
    },
    prompt:
      "Analyze the five incoming safety reports and determine the correct occupational processing sequence based on regulatory seriousness, expectedness, and submission deadlines.",
    evidenceRef: "FDA 21 CFR 314.80 & EMA GVP Module VI • Triage Priority",
    simulationData: {
      cases: [
        {
          id: "CASE_A",
          title: "Case A: 52-yo male, Oncology Trial, Anaphylactic shock 15 min post-infusion (ICU admission)",
          seriousness: "Serious Unexpected (SUSAR / Life-threatening)",
          deadline: "7 Calendar Days (Immediate Day 0)",
          priorityRank: 1,
        },
        {
          id: "CASE_E",
          title: "Case E: 3 spontaneous reports in 48 hours of sudden acute hepatic failure from same commercial batch",
          seriousness: "Potential Safety Signal / Batch Contamination",
          deadline: "Immediate Safety Committee Escalation",
          priorityRank: 2,
        },
        {
          id: "CASE_B",
          title: "Case B: 61-yo female, Spontaneous report of persistent dry cough with Lisinopril (labeled ADR)",
          seriousness: "Non-Serious Expected",
          deadline: "Routine Periodic Safety Update Report (PBRER)",
          priorityRank: 4,
        },
        {
          id: "CASE_C",
          title: "Case C: Anonymous call about nausea; reporter hung up before providing contact details",
          seriousness: "Potential ICSR missing reporter identification",
          deadline: "Pending Query / Follow-up hold",
          priorityRank: 5,
        },
        {
          id: "CASE_D",
          title: "Case D: Duplicate suspected for a previously processed Stevens-Johnson syndrome hospitalization",
          seriousness: "Potential Duplicate Audit",
          deadline: "24-hour verification window",
          priorityRank: 3,
        },
      ],
    },
    correctAnswer: ["CASE_A", "CASE_E", "CASE_D", "CASE_B", "CASE_C"],
  },

  // ── ADDITIONAL CALIBRATED KNOWLEDGE & REGULATORY QUESTIONS (Items 8–15) ──
  {
    id: "pv_q8_timelines",
    itemNumber: 8,
    stageName: "REGULATORY TIMELINES",
    stageCategory: "Quality & Compliance",
    simulationType: "mcq",
    competencyId: "qualityCompliance",
    difficulty: "foundational",
    clinicalScenario: {
      narrativeSnippet:
        "A post-marketing spontaneous adverse event report details a patient who died from sudden cardiac arrest 10 days after starting an approved antibiotic. The cardiac arrest is not listed in the SmPC/USPI.",
    },
    prompt:
      "Under FDA 21 CFR 314.80 and EMA GVP Module VI, what is the mandatory regulatory reporting timeline for this fatal and unexpected post-marketing case?",
    evidenceRef: "FDA 21 CFR 314.80(c)(1) • 15-Day Alert Reports",
    options: [
      { key: "A", text: "7 calendar days", isCorrect: false, rationale: "Incorrect. In post-marketing surveillance, serious unexpected ADRs are subject to the 15-calendar-day expedited submission clock. 7-day applies to IND investigational clinical trials." },
      { key: "B", text: "15 calendar days", isCorrect: true, rationale: "Correct. Both US FDA 21 CFR 314.80 and EMA GVP Module VI require post-marketing fatal/life-threatening or serious unexpected cases to be submitted within 15 calendar days of Day 0 receipt." },
      { key: "C", text: "30 calendar days", isCorrect: false, rationale: "Incorrect. Exceeds mandatory expedited clocks." },
      { key: "D", text: "Next annual report only", isCorrect: false, rationale: "Incorrect. Fatal unexpected events cannot wait for annual reports." },
    ],
  },
  {
    id: "pv_q9_day0",
    itemNumber: 9,
    stageName: "DAY ZERO DEFINITION",
    stageCategory: "Quality & Compliance",
    simulationType: "mcq",
    competencyId: "qualityCompliance",
    difficulty: "foundational",
    prompt:
      "In Pharmacovigilance regulatory compliance, how is 'Day 0' legally defined for an expedited safety report?",
    evidenceRef: "ICH E2D • Receipt Date Definition",
    options: [
      { key: "A", text: "The day the medical safety officer completes medical review", isCorrect: false, rationale: "Incorrect. Regulatory clocks start upon initial company receipt, not internal review completion." },
      { key: "B", text: "The first day that any personnel of the marketing authorization holder or their agent becomes aware of the 4 minimum ICSR criteria", isCorrect: true, rationale: "Correct. Day 0 is universally defined as the calendar day any employee or designated vendor of the MAH receives the 4 minimum ICSR elements." },
      { key: "C", text: "The day the case is fully entered into the Argus Safety database", isCorrect: false, rationale: "Incorrect. Entry delay cannot extend regulatory submission deadlines." },
      { key: "D", text: "The day the adverse event resolves", isCorrect: false, rationale: "Incorrect. Regulatory clocks are tied to notification, not event resolution." },
    ],
  },
  {
    id: "pv_q10_seriousness",
    itemNumber: 10,
    stageName: "SERIOUSNESS CRITERIA",
    stageCategory: "Case Assessment",
    simulationType: "mcq",
    competencyId: "caseAssessment",
    difficulty: "foundational",
    prompt:
      "According to ICH E2A, which of the following criteria automatically classifies an adverse event as 'Serious'?",
    evidenceRef: "ICH E2A • Section II.B: Definition of Serious Adverse Event",
    options: [
      { key: "A", text: "Severe headache causing missed work for one afternoon without medical visit", isCorrect: false, rationale: "Incorrect. Severe intensity does not equal regulatory 'seriousness'." },
      { key: "B", text: "Event requiring inpatient hospitalization or prolongation of existing hospitalization", isCorrect: true, rationale: "Correct. Inpatient hospitalization or prolongation of hospitalization is one of the definitive ICH E2A seriousness criteria." },
      { key: "C", text: "Nausea relieved by antiemetics taken at home", isCorrect: false, rationale: "Incorrect. Non-serious event." },
      { key: "D", text: "Any event occurring in a patient over 65 years of age", isCorrect: false, rationale: "Incorrect. Age does not determine regulatory seriousness." },
    ],
  },
  {
    id: "pv_q11_dech_rech",
    itemNumber: 11,
    stageName: "DECHALLENGE / RECHALLENGE",
    stageCategory: "Causality",
    simulationType: "mcq",
    competencyId: "analyticalReasoning",
    difficulty: "intermediate",
    prompt:
      "A patient taking an antihypertensive develops angioedema. The medication is discontinued, and angioedema resolves within 24 hours. Two weeks later, the patient inadvertently restarts the drug and angioedema reoccurs within 6 hours. This phenomenon is termed:",
    evidenceRef: "WHO-UMC • Positive Rechallenge Definition",
    options: [
      { key: "A", text: "Negative dechallenge and negative rechallenge", isCorrect: false, rationale: "Incorrect." },
      { key: "B", text: "Positive dechallenge and positive rechallenge", isCorrect: true, rationale: "Correct. Resolution upon drug withdrawal = positive dechallenge; recurrence upon drug re-administration = positive rechallenge. This provides the strongest clinical evidence of causality." },
      { key: "C", text: "Positive dechallenge with unassessable rechallenge", isCorrect: false, rationale: "Incorrect. Rechallenge reoccurred and is documented." },
      { key: "D", text: "Idiosyncratic tachyphylaxis", isCorrect: false, rationale: "Incorrect. Pharmacological misnomer in this context." },
    ],
  },
  {
    id: "pv_q12_duplicate",
    itemNumber: 12,
    stageName: "DUPLICATE DETECTION",
    stageCategory: "Quality & Compliance",
    simulationType: "mcq",
    competencyId: "qualityCompliance",
    difficulty: "intermediate",
    prompt:
      "A Pharmacovigilance Associate receives an ICSR from a treating physician and, two days later, an identical report for the same patient from a hospital pharmacist. What is the mandatory procedural action?",
    evidenceRef: "EMA GVP Module VI • Duplicate Management",
    options: [
      { key: "A", text: "Delete the pharmacist report immediately without recording", isCorrect: false, rationale: "Incorrect. Deleting data violates GVP audit trail and data integrity requirements." },
      { key: "B", text: "Create two separate new cases and submit both independently to regulatory agencies", isCorrect: false, rationale: "Incorrect. Submitting duplicates inflates safety signals and distorts epidemiology." },
      { key: "C", text: "Merge the information into the primary master case as a follow-up source, documenting the linkage in the database audit log", isCorrect: true, rationale: "Correct. Duplicate management requires merging complementary information from multiple reporters into a single master ICSR while maintaining full source provenance." },
      { key: "D", text: "Reject both cases until the reporters resolve who should submit", isCorrect: false, rationale: "Incorrect. Both reports are valid corporate safety intake." },
    ],
  },
];
