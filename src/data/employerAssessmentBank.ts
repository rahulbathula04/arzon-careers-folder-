/**
 * Arzon Employer-Calibrated Assessment Bank v1.0
 * 
 * Scenario-based assessment battery reverse-engineered from live entry-level
 * requisitions and screening rounds at:
 *  - Cognizant Life Sciences (Process Executive - PV/Coding)
 *  - IQVIA India (Safety Data Specialist 1)
 *  - Parexel International (Associate Drug Safety Scientist)
 *  - Novartis Healthcare (Safety Processing Expert / Scientist I)
 *  - Accenture Health & Life Sciences (PV Operations Associate)
 * 
 * Standards Referenced:
 *  - ICH E2A, E2B(R3), E2D Guidelines
 *  - US FDA 21 CFR 314.80 & 312.32
 *  - EMA GVP Module VI & IX
 *  - MedDRA v27.0 MSSO Term Selection: Points to Consider
 *  - WHO-UMC Causality Algorithm
 *  - ALCOA+ & 21 CFR Part 11 Data Integrity
 */

export type CompetencyDimensionKey =
  | "icsr_triage"
  | "seriousness_clocks"
  | "medical_coding"
  | "clinical_narrative"
  | "gcp_data_integrity";

export interface ScenarioQuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  scoreWeight: number; // 0.0 to 1.0 (allows partial credit for secondary clinical rationale)
  rationale: string;
  eliminationFeedback?: string; // Recruiter feedback explaining why choosing this in an interview causes rejection
}

export interface EmployerScenarioQuestion {
  id: string;
  code: string;
  dimension: CompetencyDimensionKey;
  dimensionName: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  targetEmployers: ("Cognizant" | "IQVIA" | "Parexel" | "Novartis" | "Accenture")[];
  regulatoryStandard: string;
  clinicalVignette: {
    sourceType: "Spontaneous HCP" | "Spontaneous Consumer" | "Clinical Trial SAE" | "Literature Case" | "Hospital Discharge";
    patientProfile: string;
    suspectProduct: string;
    concomitantMeds?: string;
    reportedEvent: string;
    timelineDetails: string;
    labMarkers?: string;
  };
  prompt: string;
  options: ScenarioQuestionOption[];
  recruiterInsight: string;
}

export const EMPLOYER_SCENARIO_QUESTIONS: EmployerScenarioQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DIMENSION 1: ICSR TRIAGE & 4 MINIMUM CRITERIA VALIDITY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "emp_triage_01",
    code: "TRIAGE-MIN-01",
    dimension: "icsr_triage",
    dimensionName: "ICSR Triage & Validity Verification",
    difficulty: "foundational",
    targetEmployers: ["Cognizant", "Accenture", "IQVIA"],
    regulatoryStandard: "ICH-E2D • Section 2.2 'Minimum Criteria for Expedited Reporting'",
    clinicalVignette: {
      sourceType: "Spontaneous Consumer",
      patientProfile: "Female, age unknown, calls company consumer hotline from Hyderabad",
      suspectProduct: "Metformin 500mg (Brand: Glucophage)",
      reportedEvent: "Developed severe urticaria and facial puffiness 2 hours post-dose",
      timelineDetails: "Caller states: 'My mother took this tablet and had this reaction. I am calling from her phone but I won't give you our names because we are speaking to our advocate.'",
    },
    prompt: "As the intake triage associate, how must this communication be logged and processed under ICH-E2D and company SOP?",
    options: [
      {
        id: "opt_a",
        label: "Invalid ICSR. Discard communication because caller refused to disclose patient and reporter names.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Safety regulations strictly prohibit discarding potential safety intelligence without audit documentation and follow-up attempts.",
        eliminationFeedback: "Cognizant / Accenture ATS Red Flag: Safety communications can never be deleted or discarded without formal documentation.",
      },
      {
        id: "opt_b",
        label: "Valid ICSR. The patient is identifiable as 'mother', and caller phone number serves as identifiable reporter.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "Under ICH-E2D, an identifiable patient does not require full legal name; initials, age, gender, or clear identifier (e.g. 'mother') suffices. An identifiable reporter exists if contact info (phone/email/address) is captured.",
      },
      {
        id: "opt_c",
        label: "Valid ICSR. Immediately submit an expedited 15-day report to CDSCO and US FDA.",
        isCorrect: false,
        scoreWeight: 0.2,
        rationale: "While valid for book-in, facial puffiness and urticaria without airway compromise or hospitalization does not meet seriousness criteria for expedited regulatory submission.",
        eliminationFeedback: "Parexel / IQVIA Red Flag: Submitting non-serious cases as expedited alert reports breaches regulatory SLA compliance.",
      },
      {
        id: "opt_d",
        label: "Invalid ICSR. A report cannot be valid unless confirmed by a registered healthcare professional (HCP).",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "ICH-E2D explicitly recognizes consumer spontaneous reports as valid ICSRs if the 4 criteria are met.",
        eliminationFeedback: "Fatal interview misconception: Believing consumer reports cannot be valid safety cases.",
      },
    ],
    recruiterInsight: "Cognizant and Accenture screen freshers specifically on whether they confuse legal full names with ICH-E2D 'identifiability' requirements.",
  },
  {
    id: "emp_triage_02",
    code: "TRIAGE-SRC-02",
    dimension: "icsr_triage",
    dimensionName: "ICSR Triage & Validity Verification",
    difficulty: "intermediate",
    targetEmployers: ["IQVIA", "Parexel", "Novartis"],
    regulatoryStandard: "EMA GVP Module VI • Management of Individual Case Safety Reports",
    clinicalVignette: {
      sourceType: "Literature Case",
      patientProfile: "Cohort study published in Indian Journal of Pharmacology: '5 out of 120 diabetic patients developed acute pancreatitis'",
      suspectProduct: "Sitagliptin 100mg once daily",
      reportedEvent: "Acute pancreatitis with elevated serum amylase (>1,200 U/L)",
      timelineDetails: "Published online Oct 20, 2026. Article lists hospital city, ethics approval number, but no individual patient initials or specific case narratives.",
    },
    prompt: "How should an entry-level Safety Specialist triage this published journal article?",
    options: [
      {
        id: "opt_a",
        label: "Log 5 separate individual ICSRs in Argus, marking each patient as 'Patient 1', 'Patient 2', etc., and submit 15-day expedited reports.",
        isCorrect: false,
        scoreWeight: 0.3,
        rationale: "Without individual case details or identifiable individual patient markers in an aggregate cohort publication, creating individual ICSRs causes duplicate data pollution.",
        eliminationFeedback: "IQVIA Technical Screen: Creating fragmented artificial ICSRs from aggregate epidemiological publications causes database audit failure.",
      },
      {
        id: "opt_b",
        label: "Do not create individual ICSRs; classify publication as aggregate safety literature, route to Medical Review / Signal Management.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "Under EMA GVP VI.C.2.2, if an article describes an adverse reaction in a group of patients without identifiable individual cases, it is handled as literature signal data rather than expedited ICSRs.",
      },
      {
        id: "opt_c",
        label: "Reject the literature report entirely because it did not originate from a clinical trial site under GCP.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Literature surveillance is a mandatory regulatory obligation under GVP Module VI.",
        eliminationFeedback: "Novartis GCC Screen: Ignoring post-marketing medical literature is a critical regulatory audit finding.",
      },
      {
        id: "opt_d",
        label: "Email the principal investigator immediately; wait 60 days before recording anything in the safety database.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Regulatory clocks require timely literature triage; you cannot delay literature documentation while awaiting correspondence.",
      },
    ],
    recruiterInsight: "Novartis and IQVIA use this scenario in Round 2 to test if freshers know the boundary between individual ICSRs and aggregate safety signals.",
  },
  {
    id: "emp_triage_03",
    code: "TRIAGE-SOL-03",
    dimension: "icsr_triage",
    dimensionName: "ICSR Triage & Validity Verification",
    difficulty: "intermediate",
    targetEmployers: ["Parexel", "IQVIA"],
    regulatoryStandard: "ICH-E2A • Clinical Safety Data Management: Definitions for Expedited Reporting",
    clinicalVignette: {
      sourceType: "Clinical Trial SAE",
      patientProfile: "Subject ID #104-008, 52-year-old male enrolled in Phase III Double-Blind Oncology Trial",
      suspectProduct: "Investigational Drug 'ARZ-402' vs Matching Placebo (Double-Blind)",
      reportedEvent: "Grade 4 Febrile Neutropenia with Absolute Neutrophil Count (ANC) 450/mcL",
      timelineDetails: "Onset 14 days after Cycle 2. Investigator assessment: 'Reasonable possibility of causal relationship to blind study treatment.'",
    },
    prompt: "In a double-blind clinical trial, what is the mandatory triage and unblinding action for this Serious Adverse Event (SAE)?",
    options: [
      {
        id: "opt_a",
        label: "Immediately unblind the entire study team, principal investigator, and patient to administer therapy.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Unblinding the clinical trial team destroys study integrity. Unblinding for regulatory reporting must be restricted to the dedicated safety desk.",
        eliminationFeedback: "Parexel Oncology Desk: Breaching investigator blinding on a clinical trial protocol is an immediate disqualifier.",
      },
      {
        id: "opt_b",
        label: "Perform emergency unblinding by the designated Drug Safety unit only if the event is a SUSAR; if active drug, submit expedited report without breaking study team's blind.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "Under ICH-E2A Section III.C, blinding is broken by the sponsor's safety team only for the specific patient report to regulatory authorities, preserving the blind for investigators and clinical monitors.",
      },
      {
        id: "opt_c",
        label: "Wait until the clinical trial reaches end-of-study database lock before determining causality or reporting to authorities.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Expedited reporting timelines (7/15 days) cannot be deferred until database lock.",
      },
      {
        id: "opt_d",
        label: "Downgrade the event to non-serious because neutropenia is a common expected finding in oncology.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Grade 4 Febrile Neutropenia is life-threatening / medically significant and cannot be downgraded arbitrarily.",
      },
    ],
    recruiterInsight: "Parexel's Oncology safety desk in Hyderabad tests clinical trial unblinding boundaries to see if freshers understand clinical trial protocols.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DIMENSION 2: SERIOUSNESS CRITERIA & REGULATORY CLOCKS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "emp_clock_01",
    code: "CLOCK-DAY0-01",
    dimension: "seriousness_clocks",
    dimensionName: "Seriousness Evaluation & Regulatory Clocks",
    difficulty: "foundational",
    targetEmployers: ["IQVIA", "Parexel", "Novartis", "Cognizant"],
    regulatoryStandard: "US FDA 21 CFR 314.80(c) & EMA GVP Module VI",
    clinicalVignette: {
      sourceType: "Spontaneous HCP",
      patientProfile: "38-year-old male in London, UK",
      suspectProduct: "Oral Anticoagulant 'Xaban 15mg'",
      reportedEvent: "Fatal intracranial hemorrhage following minor head trauma",
      timelineDetails: "Case first emailed to company's local medical representative in London on Friday, Oct 23 at 17:00 BST. Sent to India central PV hub on Monday, Oct 26 at 09:30 IST.",
    },
    prompt: "According to global regulatory standards, what is Day 0 for this case, and what is the deadline for expedited regulatory submission?",
    options: [
      {
        id: "opt_a",
        label: "Day 0 is Monday, Oct 26 (when India PV hub received it). Submission deadline is 15 calendar days from Oct 26.",
        isCorrect: false,
        scoreWeight: 0.1,
        rationale: "Day 0 begins the moment ANY employee of the marketing authorization holder (MAH) or representative receives the minimum criteria, not when it reaches central PV.",
        eliminationFeedback: "IQVIA / Novartis Fatal Error: Believing Day 0 starts only when central PV opens the email causes severe regulatory late-case citations.",
      },
      {
        id: "opt_b",
        label: "Day 0 is Friday, Oct 23. Because the event is fatal, the global expedited regulatory deadline is 7 calendar days (Oct 30).",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "Per ICH-E2A and EMA GVP VI, Day 0 is when any company personnel receives the 4 criteria. Fatal or life-threatening unexpected reactions (SUSARs) require 7-calendar-day expedited reporting.",
      },
      {
        id: "opt_c",
        label: "Day 0 is Friday, Oct 23. The deadline is 7 working days (excluding Saturday, Sunday and public holidays).",
        isCorrect: false,
        scoreWeight: 0.4,
        rationale: "Regulatory safety clocks run on calendar days, not working or business days.",
        eliminationFeedback: "Cognizant / Parexel Interview Trap: Confusing calendar days with working business days.",
      },
      {
        id: "opt_d",
        label: "Day 0 is when the Medical Reviewer completes causality sign-off; submission occurs within 30 days.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Internal review milestones never extend statutory regulatory reporting clocks.",
      },
    ],
    recruiterInsight: "This is the single most frequently asked technical question in IQVIA and Novartis fresher interviews.",
  },
  {
    id: "emp_clock_02",
    code: "SERIOUS-CRIT-02",
    dimension: "seriousness_clocks",
    dimensionName: "Seriousness Evaluation & Regulatory Clocks",
    difficulty: "intermediate",
    targetEmployers: ["Parexel", "Novartis", "Cognizant"],
    regulatoryStandard: "ICH-E2A • Section II.B 'Serious Adverse Event or Reaction'",
    clinicalVignette: {
      sourceType: "Hospital Discharge",
      patientProfile: "29-year-old female with asthma",
      suspectProduct: "Inhaled Corticosteroid 'Fluti-Air'",
      reportedEvent: "Admitted to emergency ward for 8 hours for observation of acute bronchospasm; nebulized and discharged home without overnight admission.",
      timelineDetails: "Discharge sheet reads: 'Emergency observation 08:00 to 16:30. Vital signs stabilized. No formal bed admission.'",
    },
    prompt: "Does this emergency ward observation meet the regulatory criteria for 'Inpatient Hospitalization' under ICH seriousness standards?",
    options: [
      {
        id: "opt_a",
        label: "Yes. Any visit to a hospital emergency room automatically fulfills the 'Inpatient Hospitalization' seriousness criterion.",
        isCorrect: false,
        scoreWeight: 0.2,
        rationale: "Emergency department treatment or ambulatory observation (<24h without formal ward admission) does NOT constitute inpatient hospitalization.",
        eliminationFeedback: "Novartis Safety Scientist Screen: Misclassifying ER visits as inpatient hospitalizations causes regulatory report over-reporting.",
      },
      {
        id: "opt_b",
        label: "No. ER visits without formal inpatient hospital admission do not meet hospitalization criteria; evaluate if it meets 'Medically Important' instead.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "ICH-E2A clarifies that emergency room visits without formal hospital admission do not qualify as inpatient hospitalization, though severe bronchospasm may qualify as medically significant if life-threatening.",
      },
      {
        id: "opt_c",
        label: "Yes, but only if the patient was prescribed an oral steroid on discharge.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Discharge prescriptions have no bearing on the statutory definition of inpatient hospitalization.",
      },
      {
        id: "opt_d",
        label: "No, because asthma is a pre-existing condition, so adverse events can never be considered serious.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Pre-existing diseases can undergo acute drug-induced exacerbations that qualify as serious.",
      },
    ],
    recruiterInsight: "Parexel and Novartis test whether freshers understand the precise legal definition of 'inpatient hospitalization' vs ambulatory care.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DIMENSION 3: STANDARDIZED MEDICAL CODING (MedDRA & WHO-DRUG)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "emp_coding_01",
    code: "MEDDRA-DIAG-01",
    dimension: "medical_coding",
    dimensionName: "Standardized Medical Coding (MedDRA & WHO-DD)",
    difficulty: "foundational",
    targetEmployers: ["Cognizant", "Accenture", "IQVIA"],
    regulatoryStandard: "MedDRA Term Selection: Points to Consider (MTS:PTC) • Section 1.2 'Diagnosis vs Signs/Symptoms'",
    clinicalVignette: {
      sourceType: "Hospital Discharge",
      patientProfile: "61-year-old male with hypertension",
      suspectProduct: "Amlodipine 5mg",
      reportedEvent: "Discharge summary states: 'Patient presented with severe crushing substernal chest pain, diaphoresis and shortness of breath. ECG and Troponin I confirmed Acute Myocardial Infarction.'",
      timelineDetails: "All symptoms occurred concurrently with the confirmed myocardial infarction.",
    },
    prompt: "According to MedDRA MTS:PTC core coding principles, which adverse event term(s) should be primary coded for this case?",
    options: [
      {
        id: "opt_a",
        label: "Code only the individual signs and symptoms: 'Chest pain', 'Diaphoresis', 'Shortness of breath', and omit the diagnosis.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Omission of a verified definitive diagnosis violates fundamental MedDRA rules.",
        eliminationFeedback: "Cognizant Medical Coding Elimination: Coding only symptoms when a confirmed medical diagnosis exists.",
      },
      {
        id: "opt_b",
        label: "Code the confirmed diagnosis: 'Acute myocardial infarction' (LLT/PT). The presenting symptoms of chest pain, diaphoresis, and dyspnea are characteristic and should not be split-coded unless company SOP requires incidental symptom capture.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "MTS:PTC guidelines specify that when a diagnosis is confirmed, preferred practice is to select the diagnosis term rather than split-coding every classic constituent symptom.",
      },
      {
        id: "opt_c",
        label: "Invent a new MedDRA code combining all 4 elements into a single compound phrase.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Coders cannot create custom MedDRA terms; they must use controlled vocabulary from MSSO.",
      },
      {
        id: "opt_d",
        label: "Code only 'Hypertension' because that is the patient's baseline risk factor.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Medical history is coded in the history tab, not as the primary adverse event reaction.",
      },
    ],
    recruiterInsight: "Cognizant Life Sciences coding rounds test the MTS:PTC diagnosis vs symptom rule in 100% of candidate interviews.",
  },
  {
    id: "emp_coding_02",
    code: "MEDDRA-HIER-02",
    dimension: "medical_coding",
    dimensionName: "Standardized Medical Coding (MedDRA & WHO-DD)",
    difficulty: "intermediate",
    targetEmployers: ["Cognizant", "Accenture", "Parexel"],
    regulatoryStandard: "ICH M1 MedDRA Hierarchy Specifications",
    clinicalVignette: {
      sourceType: "Spontaneous HCP",
      patientProfile: "33-year-old female",
      suspectProduct: "Cefixime 200mg",
      reportedEvent: "Verbatim report: 'Severe Stevens-Johnson Syndrome with epidermal detachment'",
      timelineDetails: "ICSR entered into Oracle Argus Safety database",
    },
    prompt: "Which structural tier of the 5-level MedDRA hierarchy directly represents the lowest level verbatim term that links to the single unique Preferred Term (PT)?",
    options: [
      {
        id: "opt_a",
        label: "High Level Term (HLT)",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "HLT sits above Preferred Term (PT), grouping related PTs together.",
      },
      {
        id: "opt_b",
        label: "Lowest Level Term (LLT)",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "In the 5-tier MedDRA hierarchy (SOC → HLGT → HLT → PT → LLT), the Lowest Level Term (LLT) contains verbatim synonyms, each mapping uniquely to exactly one PT.",
      },
      {
        id: "opt_c",
        label: "System Organ Class (SOC)",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "SOC is the highest anatomical/etiological tier (27 SOCs in MedDRA).",
        eliminationFeedback: "Accenture Technical Screen: Confusing the top of the hierarchy (SOC) with the bottom (LLT).",
      },
      {
        id: "opt_d",
        label: "High Level Group Term (HLGT)",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "HLGT sits directly beneath SOC.",
      },
    ],
    recruiterInsight: "Accenture and Cognizant test knowledge of the 5 MedDRA structural levels (SOC, HLGT, HLT, PT, LLT) to ensure zero data-entry misattribution.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DIMENSION 4: CLINICAL NARRATIVE & MEDICAL PHARMACOLOGY LOGIC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "emp_narrative_01",
    code: "NAR-CAUSAL-01",
    dimension: "clinical_narrative",
    dimensionName: "Clinical Case Logic & Scientific Narratives",
    difficulty: "advanced",
    targetEmployers: ["Novartis", "IQVIA", "Parexel"],
    regulatoryStandard: "WHO-UMC Causality Assessment & FDA DILI Guidance",
    clinicalVignette: {
      sourceType: "Clinical Trial SAE",
      patientProfile: "48-year-old male with psoriasis in randomized trial of Novel Monoclonal Antibody 'Z-mab'",
      suspectProduct: "Z-mab 300mg subcutaneous monthly",
      concomitantMeds: "Paracetamol 500mg PRN (took 1g daily for 3 days)",
      reportedEvent: "Marked transaminase elevation: ALT 420 U/L (baseline: 28), AST 380 U/L (baseline: 24), Total Bilirubin 3.2 mg/dL (baseline: 0.8), Alkaline Phosphatase normal.",
      timelineDetails: "Onset after 3rd monthly dose. Viral hepatitis panel negative. Abdominal ultrasound shows normal biliary tree. Study drug discontinued. 4 weeks later, ALT dropped to 45 U/L.",
      labMarkers: "Meets Hy's Law criteria (ALT > 3x ULN + Total Bili > 2x ULN without cholestasis).",
    },
    prompt: "In authoring the medical evaluation narrative for this potential Hy's Law DILI case, what is the causality interpretation regarding dechallenge?",
    options: [
      {
        id: "opt_a",
        label: "Negative dechallenge: The transaminases dropped, proving the drug was completely harmless.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Resolution upon drug cessation represents POSITIVE dechallenge, which strengthens causality rather than disproving it.",
        eliminationFeedback: "Novartis Medical Board Elimination: Confusing positive dechallenge with negative dechallenge.",
      },
      {
        id: "opt_b",
        label: "Positive dechallenge: Discontinuation of suspect drug resulted in prompt normalization of liver enzymes, strongly supporting a drug-induced etiology under WHO-UMC criteria.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "When an adverse reaction resolves or improves markedly after drug withdrawal, it is defined as a 'Positive Dechallenge', providing significant clinical evidence of a causal relationship.",
      },
      {
        id: "opt_c",
        label: "Unrelated causality: The 3g total paracetamol intake completely explains Hy's Law liver injury, exonerating the investigational compound.",
        isCorrect: false,
        scoreWeight: 0.2,
        rationale: "Therapeutic doses of paracetamol (1g/day) do not typically cause Hy's Law DILI, though listed as a possible contributing factor; it cannot exonerate the biologic.",
      },
      {
        id: "opt_d",
        label: "Mandatory rechallenge: The patient must be administered another dose immediately to see if ALT spikes again before writing the narrative.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Rechallenge in severe Drug-Induced Liver Injury (Hy's Law) is strictly unethical and contraindicated due to risk of fatal hepatic necrosis.",
        eliminationFeedback: "Critical Safety Failure: Suggesting patient rechallenge in suspected life-threatening DILI.",
      },
    ],
    recruiterInsight: "Novartis CONEXTS safety scientists specifically assess whether candidates recognize Hy's Law and understand why positive dechallenge matters in narrative drafting.",
  },
  {
    id: "emp_narrative_02",
    code: "NAR-STRUCT-02",
    dimension: "clinical_narrative",
    dimensionName: "Clinical Case Logic & Scientific Narratives",
    difficulty: "intermediate",
    targetEmployers: ["IQVIA", "Cognizant", "Parexel"],
    regulatoryStandard: "ICH-E2D • Section 5 'Case Narrative Formatting Standards'",
    clinicalVignette: {
      sourceType: "Hospital Discharge",
      patientProfile: "Elderly male, cardiac history",
      suspectProduct: "Digoxin 0.25mg",
      reportedEvent: "Xanthopsia (yellow vision) and Ventricular Arrhythmia",
      timelineDetails: "Fragmented hospital record containing disparate notes across multiple dates.",
    },
    prompt: "What is the standard regulatory chronological structure required when authoring an ICSR case safety narrative?",
    options: [
      {
        id: "opt_a",
        label: "Start with hospital billing details → List doctor qualifications → Concluding with patient age.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Billing and financial records are irrelevant to ICH clinical safety narratives.",
      },
      {
        id: "opt_b",
        label: "Standard Chronology: (1) Patient demographics & baseline history, (2) Concomitant medications, (3) Suspect drug posology & indication, (4) Event description & onset latency, (5) Clinical interventions & lab markers, (6) Dechallenge/Rechallenge & final patient outcome.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "This reflects the universal industry standard SBAR/ICH chronological narrative template followed across Argus and ArisGlobal workflows.",
      },
      {
        id: "opt_c",
        label: "Start with the adverse event outcome (death/recovery) on line 1, then list trade names in alphabetical order.",
        isCorrect: false,
        scoreWeight: 0.3,
        rationale: "Non-chronological narratives fail quality control audits in CRO production pods.",
        eliminationFeedback: "IQVIA / Cognizant QC Fail: Authoring reverse or disorganized narrative paragraphs.",
      },
      {
        id: "opt_d",
        label: "Copy and paste the entire doctor's handwritten notes into the narrative field verbatim without structured formatting.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Safety specialists must synthesize and structure the medical facts into formal standard English.",
      },
    ],
    recruiterInsight: "IQVIA and Cognizant narrative tests grade freshers specifically on whether their written paragraphs follow this 6-point chronological timeline.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DIMENSION 5: GCP, GVP & DATA INTEGRITY (ALCOA+ & 21 CFR PART 11)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "emp_gcp_01",
    code: "GCP-ALCOA-01",
    dimension: "gcp_data_integrity",
    dimensionName: "GCP, GVP & Data Integrity Standards",
    difficulty: "foundational",
    targetEmployers: ["Accenture", "Parexel", "Cognizant", "IQVIA"],
    regulatoryStandard: "US FDA Guidance on Data Integrity • ALCOA+ Principles & 21 CFR Part 11",
    clinicalVignette: {
      sourceType: "Clinical Trial SAE",
      patientProfile: "Data Entry Associate processing eCRF records in Medidata Rave EDC",
      suspectProduct: "Clinical study drug",
      reportedEvent: "Typographical discrepancy identified: Patient date of birth recorded as '12-May-1998' on lab report, but entered as '15-May-1998' in database",
      timelineDetails: "Associate realizes the typing mistake 3 days after case entry.",
    },
    prompt: "Under ALCOA+ and 21 CFR Part 11 audit trail standards, how must this correction be made in the database?",
    options: [
      {
        id: "opt_a",
        label: "Ask the database administrator to execute an SQL command to overwrite the date directly in the database backend so no error history is visible.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Bypassing the front-end audit trail destroys data traceability and constitutes a criminal breach of 21 CFR Part 11.",
        eliminationFeedback: "Severe Audit Violation: Recommending backend data manipulation without audit trail attribution.",
      },
      {
        id: "opt_b",
        label: "Perform a documented revision in the UI entering the correct date, stating the Reason for Change ('Transcription typo'), leaving the original entry preserved in the automated audit trail with timestamp and user ID.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "ALCOA+ requires records to be Traceable, Original, and Attributable. 21 CFR Part 11 mandates that electronic records maintain an indelible, time-stamped audit trail showing who made the change, when, and why, without obscuring previous entries.",
      },
      {
        id: "opt_c",
        label: "Delete the entire case report and start an entirely new report from scratch with a new case ID.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Deleting safety case files breaches regulatory archiving requirements and causes orphaned case numbers.",
      },
      {
        id: "opt_d",
        label: "Leave the error uncorrected because a difference of 3 days in date of birth has no clinical significance.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Demographic inaccuracies compromise patient identity reconciliation across multi-center trials.",
      },
    ],
    recruiterInsight: "Accenture and Parexel test ALCOA+ to confirm candidates understand why audit trails are legally sacrosanct in clinical data management.",
  },
  {
    id: "emp_gcp_02",
    code: "GCP-AUDIT-02",
    dimension: "gcp_data_integrity",
    dimensionName: "GCP, GVP & Data Integrity Standards",
    difficulty: "intermediate",
    targetEmployers: ["Parexel", "Novartis", "IQVIA"],
    regulatoryStandard: "EMA GVP Module IV • Pharmacovigilance Audits & Inspections",
    clinicalVignette: {
      sourceType: "Spontaneous HCP",
      patientProfile: "Fatal anaphylaxis report received 18 days ago; regulatory clock was 15 days",
      suspectProduct: "Injectable Cephalosporin",
      reportedEvent: "Fatal anaphylactic shock",
      timelineDetails: "Report arrived during regional office network migration. Triage was delayed by 3 days. Total elapsed time to submission is 18 days.",
    },
    prompt: "When submitting this late report to the European Medicines Agency (EMA) and US FDA, what mandatory documentation action is required?",
    options: [
      {
        id: "opt_a",
        label: "Alter the computer system clock to backdate the submission timestamp to Day 14.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Falsification of regulatory submission timestamps is an egregious compliance breach leading to criminal penalties.",
        eliminationFeedback: "Disqualification: Timestamp falsification violates international law.",
      },
      {
        id: "opt_b",
        label: "Submit the ICSR immediately with a documented 'Late Case Justification / Root Cause Analysis' attached, and initiate a Corrective and Preventive Action (CAPA) internally.",
        isCorrect: true,
        scoreWeight: 1.0,
        rationale: "GVP Module IV requires immediate late-case disclosure with explicit root-cause explanation and CAPA tracking to prevent systemic recurrence.",
      },
      {
        id: "opt_c",
        label: "Withhold the report permanently because submitting a late report guarantees a critical inspection finding.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Suppressing a fatal safety case is a grave patient safety violation.",
      },
      {
        id: "opt_d",
        label: "Reclassify the event as non-serious so that the 15-day expedited reporting clock no longer applies.",
        isCorrect: false,
        scoreWeight: 0,
        rationale: "Fatal reactions cannot be reclassified as non-serious under any circumstances.",
      },
    ],
    recruiterInsight: "Novartis and Parexel inspect quality culture: freshers must know how CAPA works when an SLA is breached.",
  },
];
