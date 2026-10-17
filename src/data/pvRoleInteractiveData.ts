export interface PvRoleInteractiveMeta {
  roleCode: "DSA" | "PVA" | "ICSR";
  badgeLabel: string;
  heroHeadline: string;
  heroSubhead: string;
  leadParagraph: string;
  dailyTimeSplit: Array<{ label: string; pct: number; detail: string; color: string }>;
  coreWorkflows: Array<{
    step: string;
    title: string;
    tagline: string;
    description: string;
    toolBadge: string;
    regulatoryRef: string;
    sampleArtifact: string;
  }>;
  interactiveCaseStudy: {
    caseId: string;
    sourceType: string;
    receiptClock: string;
    rawTranscript: string;
    intakeChecklist: Array<{ item: string; pass: boolean; note: string }>;
    codingHierarchy: {
      soc: string;
      hlgt: string;
      hlt: string;
      pt: string;
      llt: string;
      code: string;
    };
    chronologicalNarrative: string;
    triageDecision: {
      seriousness: string;
      criteria: string[];
      causality: string;
      reportingClock: string;
      submissionTarget: string;
    };
  };
  defectClassificationSystem: Array<{
    severity: "Critical" | "Major" | "Minor";
    definition: string;
    realWorldExample: string;
    qualityImpact: string;
    reworkRequired: string;
  }>;
  verifiedEmployersDataset: Array<{
    name: string;
    location: string;
    fresherTitle: string;
    jdFrequency: string;
    keySkillsMandated: string[];
    sampleSalaryBand: string;
  }>;
  productionMetrics: {
    dailyTarget: string;
    averageSla: string;
    rightFirstTimeAql: string;
    criticalErrorTolerance: string;
  };
  skillsTraceabilityMatrix: Array<{
    employerDemand: string;
    whyCROsHireForIt: string;
    syllabusClass: string;
    practicalOutput: string;
    testedInProject: string;
  }>;
  interviewDefenseQuestions: Array<{
    question: string;
    whatPanelEvaluates: string;
    modelDefense: string;
  }>;
}

export const PV_ROLE_ENHANCED_DATA: Record<string, PvRoleInteractiveMeta> = {
  "drug-safety-associate": {
    roleCode: "DSA",
    badgeLabel: "FRONTLINE CASE PROCESSING & TRIAGE",
    heroHeadline: "Drug Safety Associate (DSA)",
    heroSubhead: "Triage source records, extract clinical data, verify Day-0 validity, and execute end-to-end ICSR data entry within strict 15-day regulatory clocks.",
    leadParagraph: "A Drug Safety Associate (DSA) is the core operational entry gate in pharmaceutical pharmacovigilance units and Clinical Research Organisations (CROs). DSAs receive raw, messy adverse event reports from physicians, clinical trial investigators, patient support hotlines, and digital channels, convert them into structured E2B(R3) safety records, code clinical terms using standardized medical dictionaries, write chronological narratives, and perform initial seriousness and causality triage.",
    dailyTimeSplit: [
      { label: "Intake Triage & Day-0 Validity", pct: 25, detail: "Reviewing raw source PDFs, checking 4 minimum criteria, establishing receipt timestamp", color: "#1557D6" },
      { label: "Standardized Medical & Drug Coding", pct: 25, detail: "Selecting accurate LLT/PT paths, coding trade names to generic salts and ATC classes", color: "#6946E8" },
      { label: "Chronological Narrative Drafting", pct: 30, detail: "Authoring clinical sequence from onset to dechallenge, labs, and reporter causality", color: "#27B9B3" },
      { label: "Self-QC & Duplicate Reconciliation", pct: 20, detail: "Running duplicate algorithms, verifying field agreement, checking expedited flags", color: "#071A4A" },
    ],
    productionMetrics: {
      dailyTarget: "3–4 Full Cases / Shift",
      averageSla: "24–48 Hours per Case",
      rightFirstTimeAql: "≥ 98.0% Accuracy",
      criticalErrorTolerance: "0% (Zero Tolerance for missed Seriousness/Clock)",
    },
    coreWorkflows: [
      {
        step: "01",
        title: "Intake & 4 Minimum Criteria Validation",
        tagline: "Determining Regulatory Reportability & Day-0",
        description: "Review primary intake documentation across spontaneous calls, hospital emails, and clinical trial SAE forms. Confirm the 4 essential pillars: identifiable patient, identifiable reporter, suspect medicinal product, and adverse event. Record Day-0 timestamp immediately to lock regulatory clock.",
        toolBadge: "Intake Ledger / OCR Triage",
        regulatoryRef: "ICH E2D(R1) & E2A",
        sampleArtifact: "Case Validity Checklist with Day-0 Clock Stamp",
      },
      {
        step: "02",
        title: "Dual Medical Dictionary Coding",
        tagline: "Standardized Clinical & Drug Coding",
        description: "Translate ambiguous physician verbatims into official 5-tier clinical coding hierarchy (LLT $\\rightarrow$ PT $\\rightarrow$ HLT $\\rightarrow$ HLGT $\\rightarrow$ SOC) according to ICH MTS:PTC rules. Code suspect medications and concomitants to standardized global medicinal product dictionaries and ATC classifications.",
        toolBadge: "Clinical Coding Browser",
        regulatoryRef: "ICH M1 & WHO-UMC",
        sampleArtifact: "Coded Verbatim Rationale Table",
      },
      {
        step: "03",
        title: "Chronological Clinical Narrative Construction",
        tagline: "Regulatory Storytelling without Speculation",
        description: "Synthesize unstructured discharge summaries, lab sheets, and prescription logs into an objective, past-tense chronological narrative detailing patient baseline, therapy initiation, event onset, dechallenge, rechallenge, and outcome.",
        toolBadge: "Safety Narrative Editor",
        regulatoryRef: "ICH E2B(R3) Section B.5",
        sampleArtifact: "300-word Standard Chronological Case Narrative",
      },
      {
        step: "04",
        title: "Triage, Listedness & Expedited Routing",
        tagline: "Seriousness Classification & Gateway Dispatch",
        description: "Assess adverse events against the 6 regulatory seriousness criteria (Death, Life-Threatening, Hospitalization, Disability, Congenital Anomaly, OMIC). Cross-reference with active CCDS/SmPC to evaluate listedness and route for 7-day or 15-day expedited submission.",
        toolBadge: "Safety Gateway Workflow",
        regulatoryRef: "US 21 CFR 314.80 / EMA GVP VI",
        sampleArtifact: "Expedited Triage & Reporting Clock Ledger",
      },
    ],
    interactiveCaseStudy: {
      caseId: "ARZ-2026-PV-0891",
      sourceType: "Spontaneous Hospital Intake (Apollo Hospital, Hyderabad)",
      receiptClock: "Day-0: 12-Oct-2026 09:30 IST · 15-Day Expedited Deadline: 27-Oct-2026",
      rawTranscript: "Dr. K. Sastry (Consultant Cardiologist) reports: 58-year-old male with hypertension and hyperlipidemia initiated Atorvastatin 40 mg OD and Clopidogrel 75 mg OD on 28-Sep-2026. On 08-Oct-2026, patient experienced severe generalized muscle pain, dark brown tea-colored urine, and extreme fatigue. Serum Creatine Kinase (CK) recorded at 14,200 U/L (normal <200). Patient admitted to ICU on 09-Oct-2026 for acute kidney injury secondary to rhabdomyolysis. Atorvastatin immediately withheld; IV hydration commenced. CK reduced to 4,800 U/L by 11-Oct-2026. Patient improving.",
      intakeChecklist: [
        { item: "Identifiable Patient", pass: true, note: "58-year-old male, inpatient" },
        { item: "Identifiable Reporter", pass: true, note: "Dr. K. Sastry, Cardiologist, Apollo Hospital" },
        { item: "Suspect Drug", pass: true, note: "Atorvastatin 40 mg (Primary suspect), Clopidogrel (Concomitant/Secondary suspect)" },
        { item: "Adverse Event", pass: true, note: "Severe muscle pain, tea-colored urine, CK elevation, Rhabdomyolysis, Acute Kidney Injury" },
      ],
      codingHierarchy: {
        soc: "Musculoskeletal and connective tissue disorders",
        hlgt: "Muscle disorders",
        hlt: "Myopathies",
        pt: "Rhabdomyolysis",
        llt: "Rhabdomyolysis acute",
        code: "10039020",
      },
      chronologicalNarrative: "This spontaneous report from a cardiologist concerns a 58-year-old male patient with hypertension and dyslipidemia who developed rhabdomyolysis and acute kidney injury while receiving Atorvastatin 40 mg once daily. The patient initiated therapy on 28-Sep-2026. On 08-Oct-2026, ten days post-initiation, the patient presented with severe diffuse myalgia, dark urine, and fatigue. Serum creatine kinase was significantly elevated at 14,200 U/L. The patient was admitted to the intensive care unit on 09-Oct-2026. Atorvastatin was permanently discontinued (positive dechallenge). Following intensive intravenous hydration, creatine kinase decreased to 4,800 U/L on 11-Oct-2026 with clinical stabilization. Clopidogrel 75 mg was continued. The reporting physician considered the rhabdomyolysis related to Atorvastatin therapy.",
      triageDecision: {
        seriousness: "Serious",
        criteria: ["Inpatient Hospitalization / Prolongation", "Other Medically Important Condition (OMIC)"],
        causality: "Probable",
        reportingClock: "15-Day Expedited Reportable",
        submissionTarget: "CDSCO (PvPI) & US FDA / EMA Gateway",
      },
    },
    defectClassificationSystem: [
      {
        severity: "Critical",
        definition: "Fatal non-compliance: downgrades seriousness, misses regulatory clock, or alters suspect drug identity.",
        realWorldExample: "Marking an ICU admission as 'Non-Serious' or calculating Day-0 from data entry date rather than receipt date.",
        qualityImpact: "Immediate Regulatory Audit Finding / FDA 483 observation / Zero score on assignment",
        reworkRequired: "Immediate corrective action, root cause analysis, locked database unlock protocol",
      },
      {
        severity: "Major",
        definition: "Clinical distortion: miscodes clinical Preferred Term, creates date conflicts, or omits critical medical history.",
        realWorldExample: "Coding 'Rhabdomyolysis' as 'Myalgia' (loss of primary diagnosis), or narrative onset date conflicting with structured tab.",
        qualityImpact: "Distorts signal detection and product safety profiles; CRO quality audit penalty",
        reworkRequired: "Formal case rework with reviewer sign-off and tracked change rationale",
      },
      {
        severity: "Minor",
        definition: "Typographical or formatting defect that does not alter medical interpretation or regulatory timelines.",
        realWorldExample: "Misspelling non-critical hospital department name or omitting reporter postal code where city/country are present.",
        qualityImpact: "Standard feedback during routine batch QC; tracks against Right-First-Time metrics",
        reworkRequired: "Corrected inline during trainee self-check before final supervisor submission",
      },
    ],
    verifiedEmployersDataset: [
      {
        name: "Cognizant Technology Solutions",
        location: "Hyderabad, Pune, Mumbai",
        fresherTitle: "Process Specialist - Pharmacovigilance / Drug Safety",
        jdFrequency: "Found in 42% of entry PV JDs",
        keySkillsMandated: ["ICSR Book-in & Data Entry", "Safety Database Case Routing", "Standardized Medical Coding", "Chronological Narratives"],
        sampleSalaryBand: "₹3.8 – 4.5 LPA",
      },
      {
        name: "IQVIA",
        location: "Bengaluru, Kochi, Ahmedabad",
        fresherTitle: "Safety Associate - Post-Marketing Surveillance",
        jdFrequency: "Found in 35% of entry PV JDs",
        keySkillsMandated: ["ICH E2D(R1) Case Intake", "Medical Narrative Construction", "Duplicate Search & Query Drafting", "E2B(R3) Field Validation"],
        sampleSalaryBand: "₹4.2 – 5.2 LPA",
      },
      {
        name: "Parexel International",
        location: "Hyderabad, Bengaluru, Chandigarh",
        fresherTitle: "Associate Drug Safety Specialist",
        jdFrequency: "Found in 28% of entry PV JDs",
        keySkillsMandated: ["Seriousness & Listedness Evaluation", "SmPC / CCDS Reference Check", "Clinical Trial SAE Processing", "Quality Defect Logging"],
        sampleSalaryBand: "₹4.0 – 4.8 LPA",
      },
      {
        name: "Tata Consultancy Services (TCS ADD)",
        location: "Mumbai, Pune, Hyderabad, Chennai",
        fresherTitle: "Trainee Pharmacovigilance Associate",
        jdFrequency: "Found in 31% of entry PV JDs",
        keySkillsMandated: ["ICSR Validity Assessment", "WHO Drug ATC Mapping", "Regulatory Timeline Tracking", "AQL Quality Audits"],
        sampleSalaryBand: "₹3.6 – 4.2 LPA",
      },
    ],
    skillsTraceabilityMatrix: [
      {
        employerDemand: "ICSR Intake & 4 Minimum Criteria Verification",
        whyCROsHireForIt: "Prevents logging invalid junk cases and guarantees Day-0 audit readiness.",
        syllabusClass: "Class 04 & Class 05",
        practicalOutput: "Case Validity & Day-0 Decision Register",
        testedInProject: "Minor Project 1 (20 ICSRs)",
      },
      {
        employerDemand: "Clinical Terminology Coding via Points to Consider (MTS:PTC)",
        whyCROsHireForIt: "Inaccurate coding destroys signal detection and triggers client audit defects.",
        syllabusClass: "Class 10 & Class 11",
        practicalOutput: "Verbatim-to-PT Coding Rationale Log",
        testedInProject: "Minor Project 1 & Major Capstone",
      },
      {
        employerDemand: "Chronological Regulatory Narrative Authoring",
        whyCROsHireForIt: "Medical reviewers and health authorities read the narrative first to judge causality.",
        syllabusClass: "Class 13 & Class 14",
        practicalOutput: "Standard Chronological Case Narrative",
        testedInProject: "Minor Project 1 (20 Narratives)",
      },
      {
        employerDemand: "Seriousness & Expedited 15-Day Clock Triage",
        whyCROsHireForIt: "A single late 15-day expedited report triggers FDA 483 inspection observations.",
        syllabusClass: "Class 06 & Class 07",
        practicalOutput: "Seriousness Determination Ledger",
        testedInProject: "Minor Project 2 & Final Exam",
      },
      {
        employerDemand: "Case Quality Control (QC) & Defect Logging",
        whyCROsHireForIt: "CRO clients demand 98%+ Right-First-Time accuracy on every production batch.",
        syllabusClass: "Class 19 & Class 31",
        practicalOutput: "Independent QC Form with Error Severity",
        testedInProject: "Minor Project 2 (15 Case Audits)",
      },
    ],
    interviewDefenseQuestions: [
      {
        question: "How do you calculate Day-0 when a report arrives via email on Saturday night for an Indian MAH?",
        whatPanelEvaluates: "Evaluates exact regulatory clock discipline and understanding of receipt vs. triage date.",
        modelDefense: "Under ICH E2D and CDSCO/EMA guidelines, Day-0 is the exact calendar date any employee or contractual agent of the MAH first receives the four minimum criteria. For electronic transmissions like emails or faxes, Day-0 is the timestamp of receipt on the server (Saturday), not Monday morning when the processor opens it. The 15-day clock begins on Day-0 regardless of weekends or holidays.",
      },
      {
        question: "If a physician reports 'Myocardial Infarction secondary to extreme dehydration', what is your primary Preferred Term (PT)?",
        whatPanelEvaluates: "Tests adherence to ICH MTS:PTC coding guideline regarding diagnoses vs. underlying causes.",
        modelDefense: "Under ICH Points to Consider (MTS:PTC Section 2.1), when a definitive clinical diagnosis is reported alongside a secondary or precipitating cause, both events are coded to capture the full safety picture. The primary adverse event PT is 'Acute myocardial infarction' (or 'Myocardial infarction'), and 'Dehydration' is coded as a concurrent event. Neither is ignored.",
      },
      {
        question: "What differentiates a Critical defect from a Major defect during case QC?",
        whatPanelEvaluates: "Tests whether the candidate understands audit impact and patient risk versus formatting polish.",
        modelDefense: "A Critical defect affects patient safety classification or regulatory compliance—such as downgrading a fatal event to non-serious, missing a 15-day clock, or selecting the incorrect suspect drug. A Major defect distorts the clinical narrative or coding (such as coding chest pain instead of angina) without breaching the regulatory reporting clock. Critical defects require immediate corrective action and root cause investigation.",
      },
    ],
  },

  "icsr-case-processor": {
    roleCode: "ICSR",
    badgeLabel: "HIGH-THROUGHPUT OPERATIONAL PROCESSING",
    heroHeadline: "ICSR Case Processor",
    heroSubhead: "Process high-volume post-marketing and clinical safety batches with rigorous field mapping, duplicate reconciliation, and zero-defect SLA precision.",
    leadParagraph: "An ICSR Case Processor is an operational precision specialist inside drug safety delivery centers. Responsible for transforming clinical intake packets into clean, fully articulated database records, the processor navigates enterprise safety databases, maps structured fields in accordance with ICH E2B(R3), checks duplicate histories, identifies missing data for targeted follow-up queries, and self-checks every data element before supervisor review.",
    dailyTimeSplit: [
      { label: "End-to-End Data Entry in Safety System", pct: 40, detail: "Populating General, Patient, Product, Event, and Analysis tabs with absolute precision", color: "#1557D6" },
      { label: "Standardized Medical & Drug Mapping", pct: 25, detail: "Assigning exact LLT codes and mapping brand trade names to standardized active substances", color: "#6946E8" },
      { label: "Duplicate Checks & Database Search", pct: 20, detail: "Running multi-parameter queries across patient DOB, initials, country, and event dates", color: "#27B9B3" },
      { label: "Targeted Follow-Up Query Drafting", pct: 15, detail: "Identifying clinical gaps and drafting specific query forms for treating physicians", color: "#071A4A" },
    ],
    productionMetrics: {
      dailyTarget: "4–6 Processed Cases / Shift",
      averageSla: "18–24 Hours Turnaround",
      rightFirstTimeAql: "≥ 98.5% Accuracy",
      criticalErrorTolerance: "0% Critical Data Entry Errors",
    },
    coreWorkflows: [
      {
        step: "01",
        title: "Source Extraction & Field Normalization",
        tagline: "Unstructured Source to Structured Schema",
        description: "Parse physician prescription slips, discharge cards, and patient survey forms. Normalize dates into standard ISO formats (`YYYY-MM-DD`), convert dosages to standardized units, and classify reporter qualifications.",
        toolBadge: "Intake Ledger / Extraction Form",
        regulatoryRef: "ICH E2B(R3) Header & Source Data",
        sampleArtifact: "Structured Extraction Worksheet",
      },
      {
        step: "02",
        title: "Multi-Parameter Duplicate Search",
        tagline: "Preventing Database Inflation & Double-Counting",
        description: "Query master database using patient initials, age/birthdate, country, suspect drug, and event term. Distinguish true duplicates from valid new reports or amendments to existing cases.",
        toolBadge: "Master Search & Match Utility",
        regulatoryRef: "GVP Module VI Section VI.C.6",
        sampleArtifact: "Duplicate Match Decision Log",
      },
      {
        step: "03",
        title: "E2B(R3) Field Population & Tab Routing",
        tagline: "Accurate Population of Core Data Blocks",
        description: "Enter data into respective modules: Patient Characteristics (`A.1`), Medical History (`D`), Suspect and Concomitant Products (`F`), Adverse Reactions (`E`), and Clinical Narrative (`B.5`). Verify null flavors for missing data.",
        toolBadge: "Safety DB Simulator / E2B Matrix",
        regulatoryRef: "ICH E2B(R3) Implementation Guide",
        sampleArtifact: "E2B Field Mapping Verification Sheet",
      },
      {
        step: "04",
        title: "Targeted Follow-Up Query Formulation",
        tagline: "Closing Critical Diagnostic & Dechallenge Gaps",
        description: "Where crucial information is missing (such as exact therapy stop date, rechallenge result, or baseline renal function), draft targeted questionnaire templates tailored to the clinical event.",
        toolBadge: "Targeted Follow-up Builder",
        regulatoryRef: "ICH E2D Follow-up Standards",
        sampleArtifact: "Targeted Hepatic / Cardiac Query Letter",
      },
    ],
    interactiveCaseStudy: {
      caseId: "ARZ-2026-ICSR-0412",
      sourceType: "Consumer Hotline Intake via Patient Support Program (ICH E2D(R1))",
      receiptClock: "Day-0: 10-Oct-2026 · Target Processing SLA: 24 Hours",
      rawTranscript: "Patient Support Nurse logs: 64-year-old female enrolled in osteoporosis adherence program taking Teriparatide 20 mcg subcutaneous injection daily since 15-May-2026. On 02-Oct-2026, patient called reporting severe dizziness, nausea, and feeling of fainting within 20 minutes after self-injection. Blood pressure recorded at 86/52 mmHg by home health aide. Dose withheld for 3 days; symptoms resolved completely. Patient resumed injection on 06-Oct-2026 and experienced recurrent dizziness and hypotension. Drug permanently discontinued on doctor advice.",
      intakeChecklist: [
        { item: "Identifiable Patient", pass: true, note: "64-year-old female, PSP ID #OP-9812" },
        { item: "Identifiable Reporter", pass: true, note: "PSP Support Nurse (Healthcare Professional)" },
        { item: "Suspect Drug", pass: true, note: "Teriparatide 20 mcg SC daily (Osteoporosis)" },
        { item: "Adverse Event", pass: true, note: "Post-injection hypotension, severe dizziness, syncope pre-monitory symptoms" },
      ],
      codingHierarchy: {
        soc: "Vascular disorders",
        hlgt: "Vascular therapeutic procedures and vascular disorders NEC",
        hlt: "Decreased and negative regulation of blood pressure",
        pt: "Orthostatic hypotension",
        llt: "Postural dizziness",
        code: "10013958",
      },
      chronologicalNarrative: "This solicited report from a patient support program nurse describes a 64-year-old female patient who experienced orthostatic hypotension and severe dizziness following self-administration of Teriparatide 20 mcg subcutaneous injection for osteoporosis. The patient initiated therapy on 15-May-2026. On 02-Oct-2026, within 20 minutes of injection, she developed severe dizziness and near-syncope with a documented blood pressure of 86/52 mmHg. The drug was withheld for three days with complete resolution (positive dechallenge). Upon rechallenge on 06-Oct-2026, the symptoms recurred promptly (positive rechallenge). Therapy was permanently discontinued. Concomitant medications included calcium carbonate and vitamin D3.",
      triageDecision: {
        seriousness: "Non-Serious (Listed Transient Hypotension without Hospitalization/Disability)",
        criteria: ["Reported in SmPC Section 4.8 as common transient reaction"],
        causality: "Certain (Positive dechallenge and positive rechallenge documented)",
        reportingClock: "Standard Periodic Reporting / Aggregate Queue",
        submissionTarget: "Safety Database Locked Archive & PSUR Tabulation",
      },
    },
    defectClassificationSystem: [
      {
        severity: "Critical",
        definition: "Data corruption that distorts case reportability or regulatory submission format.",
        realWorldExample: "Failing to document positive rechallenge in structured flags, or corrupting patient birth date so age becomes negative.",
        qualityImpact: "Rejection by E2B regulatory gateways (FDA ESG / EudraVigilance gateway error)",
        reworkRequired: "Immediate schema validation re-run, supervisor unblocking, audit log documentation",
      },
      {
        severity: "Major",
        definition: "Omission of actionable clinical fields or incorrect concomitant drug entry.",
        realWorldExample: "Entering suspect drug under concomitant medication section, or leaving route of administration blank when stated.",
        qualityImpact: "Discrepancy in aggregate reports and miscalculation of exposure metrics",
        reworkRequired: "Case returned to processor queue for mandatory re-entry and secondary review",
      },
      {
        severity: "Minor",
        definition: "Inconsequential typographical errors in narrative text that do not affect clinical meaning.",
        realWorldExample: "Typo in brand name spelling inside narrative when structured product tab is 100% correct.",
        qualityImpact: "Logged on internal trainee scorecard; self-corrected during post-entry check",
        reworkRequired: "Inline correction during standard self-QC checklist execution",
      },
    ],
    verifiedEmployersDataset: [
      {
        name: "Accenture Operations",
        location: "Bengaluru, Chennai, Hyderabad",
        fresherTitle: "ICSR Processing Associate - Life Sciences",
        jdFrequency: "Found in 38% of case processor JDs",
        keySkillsMandated: ["High-Volume Case Data Entry", "Enterprise Safety Database Navigation", "Standardized Medical Coding", "Duplicate Check Algorithms"],
        sampleSalaryBand: "₹3.5 – 4.2 LPA",
      },
      {
        name: "Wipro Life Sciences",
        location: "Pune, Hyderabad, Chennai",
        fresherTitle: "Safety Operations Processor",
        jdFrequency: "Found in 29% of case processor JDs",
        keySkillsMandated: ["E2B(R3) Field Verification", "Narrative Drafting Standards", "Medicinal Product Matching", "Discrepancy Rework"],
        sampleSalaryBand: "₹3.4 – 4.0 LPA",
      },
      {
        name: "Indegene",
        location: "Bengaluru",
        fresherTitle: "Drug Safety Data Entry Specialist",
        jdFrequency: "Found in 22% of case processor JDs",
        keySkillsMandated: ["Source Document Verification", "Targeted Query Formulation", "SLA Adherence Tracking", "SOP Compliance"],
        sampleSalaryBand: "₹3.8 – 4.6 LPA",
      },
      {
        name: "Navitas Life Sciences",
        location: "Chennai, Bengaluru",
        fresherTitle: "Junior Safety Processor",
        jdFrequency: "Found in 18% of case processor JDs",
        keySkillsMandated: ["ICH E2D Triage", "Medical Coding Rationale", "Self-QC Execution", "15-Day Expedited Clocks"],
        sampleSalaryBand: "₹3.3 – 3.9 LPA",
      },
    ],
    skillsTraceabilityMatrix: [
      {
        employerDemand: "High-Volume Structured Case Data Entry",
        whyCROsHireForIt: "Entry-level processors are measured by daily case throughput and accuracy.",
        syllabusClass: "Class 16 & Class 28",
        practicalOutput: "Production Intake Queue Schedule",
        testedInProject: "Minor Project 1 & Major Capstone",
      },
      {
        employerDemand: "ICH E2B(R3) Data Mapping & XML Structure",
        whyCROsHireForIt: "All modern safety transmissions use E2B(R3); missing mandatory fields rejects files at gateways.",
        syllabusClass: "Class 17 & Class 18",
        practicalOutput: "CIOMS-to-E2B(R3) Field Mapping Ledger",
        testedInProject: "Minor Project 1 & Minor Project 2",
      },
      {
        employerDemand: "Duplicate Search & Patient Matching",
        whyCROsHireForIt: "Prevents double-counting adverse events which distorts pharmacovigilance safety signals.",
        syllabusClass: "Class 15",
        practicalOutput: "Duplicate Search Decision Record",
        testedInProject: "Minor Project 1 (Duplicate Log)",
      },
      {
        employerDemand: "Targeted Follow-Up Formulation",
        whyCROsHireForIt: "Recovers incomplete clinical data needed to assess medical causality accurately.",
        syllabusClass: "Class 15",
        practicalOutput: "Targeted Query Pack",
        testedInProject: "Minor Project 1 (Follow-up Pack)",
      },
      {
        employerDemand: "Audit Trail & Data Integrity Discipline",
        whyCROsHireForIt: "CROs operate under strict 21 CFR Part 11; every change requires documented rationale.",
        syllabusClass: "Class 27 & Class 30",
        practicalOutput: "Follow-Up Records with Version Histories",
        testedInProject: "Major Capstone (Operations Dashboard)",
      },
    ],
    interviewDefenseQuestions: [
      {
        question: "How do you distinguish an amendment from a follow-up report in the safety database?",
        whatPanelEvaluates: "Tests understanding of case versioning and regulatory report updates.",
        modelDefense: "A follow-up report provides new, previously unavailable clinical data (e.g., patient recovered, new lab report, autopsy result) received after the initial case was locked, requiring a new workflow version and possible re-triage of expedited clocks. An amendment corrects an administrative or data entry error in the existing case without introducing new source data from the reporter.",
      },
      {
        question: "What are 'Null Flavors' in E2B(R3) and when should you use them?",
        whatPanelEvaluates: "Tests precise technical knowledge of ICH E2B(R3) transmission architecture.",
        modelDefense: "Null flavors are standardized standardized codes (such as NI: No Information, UNK: Unknown, NA: Not Applicable, ASKU: Asked but Unknown) used in E2B(R3) XML schemas when mandatory data elements cannot be provided. Using null flavors prevents schema validation failures while transparently documenting that the information was sought but not available.",
      },
      {
        question: "What steps do you take when a duplicate search reveals a potential match with slightly different dates?",
        whatPanelEvaluates: "Tests practical investigative rigor and documentation habits.",
        modelDefense: "I cross-reference the core anchor variables: patient age/DOB, gender, country, reporter identity or institution, suspect drug therapy dates, and clinical event narrative. If key elements match but dates differ by a few days (often due to reporter recall error), I do not merge immediately. I document the findings in a Duplicate Investigation Note, consult the medical reviewer, and maintain both cross-referenced records pending reporter clarification.",
      },
    ],
  },

  "pv-associate": {
    roleCode: "PVA",
    badgeLabel: "MEDICAL CONSISTENCY & REGULATORY COMPLIANCE",
    heroHeadline: "Pharmacovigilance Associate (PV Associate)",
    heroSubhead: "Lead clinical narrative writing, evaluate medical causality (WHO-UMC/Naranjo), audit case quality, and ensure inspection-ready pharmacovigilance operations.",
    leadParagraph: "The Pharmacovigilance Associate (PV Associate) is the cornerstone role at every contract research organisation and pharmaceutical drug safety team. Moving beyond mechanical data entry, the PV Associate oversees end-to-end case integrity: authoring clear, submission-ready medical narratives, performing rigorous causality evaluations, verifying expectedness against Reference Safety Information (CCDS/SmPC), identifying special situations, and conducting peer quality control audits.",
    dailyTimeSplit: [
      { label: "Narrative Construction & Medical Coherence", pct: 35, detail: "Synthesizing complex clinical histories, hospital courses, and lab timelines into publication-standard narratives", color: "#1557D6" },
      { label: "Causality & Listedness Evaluation", pct: 25, detail: "Applying WHO-UMC / Naranjo algorithms and cross-checking against active SmPC Section 4.8", color: "#6946E8" },
      { label: "Case Quality Control & Peer Audits", pct: 25, detail: "Auditing case packets for critical/major defects, verifying data field agreement, logging CAPAs", color: "#27B9B3" },
      { label: "Special Situations & Escalations", pct: 15, detail: "Triaging off-label use, pregnancy exposures, medication errors, and potential signal alerts", color: "#071A4A" },
    ],
    productionMetrics: {
      dailyTarget: "3 Complex Cases / Shift + 2 Peer QC Audits",
      averageSla: "24–36 Hours End-to-End",
      rightFirstTimeAql: "≥ 99.0% Audit Score",
      criticalErrorTolerance: "0% Critical Quality Defects",
    },
    coreWorkflows: [
      {
        step: "01",
        title: "Medical Record Review & Timeline Synthesis",
        tagline: "Dissecting Complex Inpatient Encounters",
        description: "Analyze multi-page hospital records, ICU charts, laboratory panels, and concomitant drug lists. Establish exact chronological milestones from baseline risk factors to adverse event peak and recovery.",
        toolBadge: "Clinical Extraction Dossier",
        regulatoryRef: "ICH E2D Clinical Evaluation",
        sampleArtifact: "Synthesized Patient Event Timeline",
      },
      {
        step: "02",
        title: "Formal Causality Assessment (WHO-UMC & Naranjo)",
        tagline: "Evaluating Biological Plausibility & Drug Interaction",
        description: "Apply standardized causality frameworks. Analyze temporal plausibility, dechallenge responses, rechallenge evidence, alternate etiologies, and potential drug-drug interactions between suspect and concomitant agents.",
        toolBadge: "Naranjo Algorithm Scorer",
        regulatoryRef: "WHO-UMC Causality Classification",
        sampleArtifact: "Causality Evaluation Report with Scoring Rationale",
      },
      {
        step: "03",
        title: "Reference Safety Information (RSI) Listedness Audit",
        tagline: "CCDS, SmPC & Investigator Brochure Benchmarking",
        description: "Compare reported adverse events against current Company Core Data Sheet (CCDS), Summary of Product Characteristics (SmPC), or US Prescribing Information (USPI) to determine if the event is expected or unexpected.",
        toolBadge: "RSI Comparison Matrix",
        regulatoryRef: "ICH E2A Expectedness Criteria",
        sampleArtifact: "SmPC Section 4.8 Listedness Log",
      },
      {
        step: "04",
        title: "Independent Quality Control & Defect Logging",
        tagline: "Enforcing Acceptable Quality Limits (AQL)",
        description: "Audit completed cases against strict quality rubrics before regulatory release. Identify discrepancies between narrative and structured tabs, classify findings by severity (Critical/Major/Minor), and guide rework.",
        toolBadge: "Independent QC Form",
        regulatoryRef: "EMA GVP Module I Quality Systems",
        sampleArtifact: "Quality Audit Form & CAPA Log",
      },
    ],
    interactiveCaseStudy: {
      caseId: "ARZ-2026-PVA-1205",
      sourceType: "Clinical Trial SAE (Phase III Oncology Protocol, Tata Memorial Hospital)",
      receiptClock: "Day-0: 11-Oct-2026 14:00 IST · Expedited 7-Day Fatal/Life-Threatening SUSAR Clock",
      rawTranscript: "Principal Investigator reports: 61-year-old female with metastatic breast cancer enrolled in double-blind trial receiving Investigational Agent ARZ-301 vs. placebo alongside standard paclitaxel. On cycle 2 day 8 (07-Oct-2026), patient developed high-grade fever (103.2°F), severe rigors, and hypotension (80/50 mmHg). Absolute Neutrophil Count (ANC) plummeted to 180/μL (Grade 4 neutropenia). Diagnosed with Febrile Neutropenia and Septic Shock. Patient admitted to ICU, intubated, and initiated on IV meropenem and noradrenaline. Unblinding requested by DMC; trial treatment held. Patient remains in critical condition. Investigator rates relationship to ARZ-301 as 'Suspected / Reasonable Possibility'.",
      intakeChecklist: [
        { item: "Identifiable Patient", pass: true, note: "61-year-old female, Subject ID #TMH-301-042" },
        { item: "Identifiable Reporter", pass: true, note: "Dr. R. Banerjee, Principal Investigator, TMH Mumbai" },
        { item: "Suspect Drug", pass: true, note: "Investigational Medicinal Product ARZ-301 (Blinded) / Paclitaxel" },
        { item: "Adverse Event", pass: true, note: "Grade 4 Febrile Neutropenia, Septic Shock, Hypotension" },
      ],
      codingHierarchy: {
        soc: "Blood and lymphatic system disorders",
        hlgt: "White blood cell disorders",
        hlt: "Neutropenias",
        pt: "Febrile neutropenia",
        llt: "Febrile neutropenic sepsis",
        code: "10016288",
      },
      chronologicalNarrative: "This clinical trial SAE report from a principal investigator concerns a 61-year-old female subject with metastatic breast cancer participating in a double-blind protocol (ARZ-301 versus placebo plus paclitaxel) who developed life-threatening febrile neutropenia and septic shock. Therapy was initiated on 15-Sep-2026. On cycle 2 day 8 (07-Oct-2026), the subject presented with fever (103.2°F), severe rigors, and hypotension (80/50 mmHg). Laboratory evaluation revealed an absolute neutrophil count of 180/μL. She was admitted to the intensive care unit with septic shock requiring mechanical ventilation and vasopressor support. Study drug was interrupted. The investigator considered the event serious (life-threatening) and causally related to the investigational agent. Reference to the Investigator's Brochure confirmed that Grade 4 febrile neutropenia is unexpected at this frequency, categorizing this case as an expedited 7-day SUSAR.",
      triageDecision: {
        seriousness: "Serious (Life-Threatening / Inpatient Hospitalization)",
        criteria: ["Life-Threatening", "Inpatient Hospitalization"],
        causality: "Reasonable Possibility (Suspected)",
        reportingClock: "7-Day Expedited SUSAR Reporting Clock (Health Authorities & Ethics Committees)",
        submissionTarget: "CDSCO (DCGI), US FDA IND Safety Gateway, EMA CTIS",
      },
    },
    defectClassificationSystem: [
      {
        severity: "Critical",
        definition: "Regulatory breach: failure to recognize a SUSAR, violation of expedited 7-day clock, or improper unblinding.",
        realWorldExample: "Treating a fatal/life-threatening clinical trial SAE as a 15-day report rather than triggering the 7-day expedited SUSAR notification.",
        qualityImpact: "Trial suspension by regulatory authority / Serious GCP breach inspection finding",
        reworkRequired: "Immediate regulatory escalation, sponsor notification, and corrective CAPA filing",
      },
      {
        severity: "Major",
        definition: "Inconsistent medical narrative where onset dates contradict lab test nadirs or omitted concomitant antibiotics.",
        realWorldExample: "Failing to document that the patient was on concurrent paclitaxel, which has known bone marrow toxicity.",
        qualityImpact: "Compromises causality assessment by safety review committees and independent data monitoring boards",
        reworkRequired: "Mandatory narrative rewrite and re-review by Lead Medical Reviewer",
      },
      {
        severity: "Minor",
        definition: "Formatting discrepancies in investigator site numbering or minor non-critical typographical slips.",
        realWorldExample: "Minor discrepancy in site postal code while clinical site name and PI name are unambiguous.",
        qualityImpact: "Internal tracking metric; does not impede submission",
        reworkRequired: "Inline resolution during routine QC checklist review",
      },
    ],
    verifiedEmployersDataset: [
      {
        name: "ICON plc",
        location: "Chennai, Bengaluru, Hyderabad",
        fresherTitle: "Pharmacovigilance Associate - Clinical & Post-Marketing",
        jdFrequency: "Found in 36% of PV Associate JDs",
        keySkillsMandated: ["Clinical Trial SAE Processing", "Chronological Narrative Writing", "WHO-UMC Causality Scoring", "SUSAR Reporting Timelines"],
        sampleSalaryBand: "₹4.0 – 5.0 LPA",
      },
      {
        name: "Parexel",
        location: "Hyderabad, Bengaluru",
        fresherTitle: "PV Associate II / Safety Specialist",
        jdFrequency: "Found in 33% of PV Associate JDs",
        keySkillsMandated: ["Expectedness Review against IB & SmPC", "Standardized Coding via MTS:PTC", "Independent Case QC", "CAPA Logging"],
        sampleSalaryBand: "₹4.2 – 5.2 LPA",
      },
      {
        name: "Syneos Health",
        location: "Gurugram, Hyderabad, Bengaluru",
        fresherTitle: "Drug Safety Associate - Medical Review Support",
        jdFrequency: "Found in 24% of PV Associate JDs",
        keySkillsMandated: ["Oncology SAE Processing", "Narrative Medical Coherence", "Reconciliation with Clinical EDC", "Audit Readiness"],
        sampleSalaryBand: "₹4.5 – 5.5 LPA",
      },
      {
        name: "Cipla / Dr. Reddy's Laboratories",
        location: "Mumbai, Hyderabad",
        fresherTitle: "Junior Pharmacovigilance Officer",
        jdFrequency: "Found in 20% of Indian Pharma PV JDs",
        keySkillsMandated: ["CDSCO & PvPI Blue Form Submission", "Local PSUR Drafting", "Indian MAH Regulatory Compliance", "Risk Management (RMP)"],
        sampleSalaryBand: "₹3.8 – 4.8 LPA",
      },
    ],
    skillsTraceabilityMatrix: [
      {
        employerDemand: "Clinical Trial SAE & SUSAR Expedited Triage",
        whyCROsHireForIt: "Failure to dispatch a life-threatening SUSAR within 7 days halts clinical trials globally.",
        syllabusClass: "Class 20 & Class 21",
        practicalOutput: "Clinical Trial SAE/SUSAR Triage Worksheet",
        testedInProject: "Minor Project 2 & Capstone",
      },
      {
        employerDemand: "WHO-UMC & Naranjo Causality Assessment",
        whyCROsHireForIt: "Distinguishes true drug-induced adverse reactions from underlying disease progression.",
        syllabusClass: "Class 08",
        practicalOutput: "Causality Evaluation Report",
        testedInProject: "Minor Project 1 & Minor Project 2",
      },
      {
        employerDemand: "Clinical Safety Reconciliation (EDC vs. Safety DB)",
        whyCROsHireForIt: "Ensures clinical study data submitted to FDA matches safety database numbers precisely.",
        syllabusClass: "Class 21",
        practicalOutput: "Clinical Safety Reconciliation Tracker",
        testedInProject: "Minor Project 2 (25 vs. 20 Records)",
      },
      {
        employerDemand: "Independent Case Quality Control & Defect Audits",
        whyCROsHireForIt: "Senior associates spend 30%+ of their day reviewing junior work to protect CRO quality metrics.",
        syllabusClass: "Class 19 & Class 31",
        practicalOutput: "Independent QC Form with Error Severity",
        testedInProject: "Minor Project 2 (15 Case Audits)",
      },
      {
        employerDemand: "Signal Screening & Preliminary Evaluation",
        whyCROsHireForIt: "Enables safety teams to spot disproportionate reporting trends before health authorities intervene.",
        syllabusClass: "Class 23 & Class 24",
        practicalOutput: "Preliminary Signal Evaluation Memo",
        testedInProject: "Major Capstone (PRR Calculations)",
      },
    ],
    interviewDefenseQuestions: [
      {
        question: "When is an adverse event in a clinical trial classified as a SUSAR, and what is the expedited submission clock?",
        whatPanelEvaluates: "Tests exact knowledge of ICH E2A and GCP clinical trial regulatory criteria.",
        modelDefense: "An event is a SUSAR if it fulfills three cumulative criteria: (1) It is Serious (e.g. fatal, life-threatening, requiring hospitalization), (2) It is Suspected to have a reasonable causal relationship to the investigational product, and (3) It is Unexpected according to the Investigator's Brochure. If it is fatal or life-threatening, it must be reported within 7 calendar days with an 8-day follow-up. All other serious unexpected events must be reported within 15 calendar days.",
      },
      {
        question: "How do you evaluate causality using the WHO-UMC scale when a patient is receiving three concomitant drugs with overlapping hepatotoxic profiles?",
        whatPanelEvaluates: "Tests clinical reasoning in polypharmacy scenarios.",
        modelDefense: "Under the WHO-UMC system, causality cannot be categorized as 'Certain' without positive rechallenge and absence of confounding drugs. When multiple hepatotoxic agents are co-administered, I analyze the exact latency period (onset relative to each drug start), dechallenge response when one or all are stopped, and known enzyme elevation patterns. Unless differential dechallenge singles out one agent, causality is categorized as 'Possible' for each suspect product with explicit documentation of concomitant confounding.",
      },
      {
        question: "What is reconciliation between EDC and the safety database, and why do discrepancies occur?",
        whatPanelEvaluates: "Tests operational knowledge of cross-functional clinical trial safety.",
        modelDefense: "Reconciliation is the formal comparison between adverse events recorded in the clinical electronic data capture (EDC) system and serious adverse events entered in the enterprise safety database. Discrepancies routinely arise due to differing data entry timelines, site coordinators failing to update the safety team when an event is upgraded to serious, mismatched onset dates, or differing verbatim terms. Both databases must achieve 100% agreement on critical variables before study database lock.",
      },
    ],
  },
};
