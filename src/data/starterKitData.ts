export interface InterviewQuestion {
  id: number;
  category: "Pharmacovigilance & Case Safety" | "Medical Coding & Standards" | "Clinical Trials & GCP" | "Aggregate Safety & Career Strategy";
  question: string;
  interviewerIntent: string;
  answer: string;
  proTip: string;
  keywords: string[];
}

export interface SoftwareWorkflowStep {
  stepNumber: number;
  title: string;
  role: string;
  sla: string;
  description: string;
  enterpriseTool: string;
  complianceRule: string;
}

export interface AtsKeyword {
  keyword: string;
  category: "Pharmacovigilance" | "Clinical Data Management" | "Regulatory & Compliance" | "Core Clinical Competencies";
  tier: "Critical" | "High Impact" | "Recommended";
  sampleBullet: string;
}

export interface CitySalaryBenchmark {
  city: string;
  fresherLpa: [number, number];
  exp3yrLpa: [number, number];
  senior5yrLpa: [number, number];
  lead8yrLpa: [number, number];
  hubType: "Tier-1 Delivery Hub" | "Global Captive R&D" | "High-Volume Processing Hub";
  topEmployers: string[];
}

export interface RoadmapWeek {
  weekRange: string;
  phaseTitle: string;
  milestones: string[];
  deliverables: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. TOP 20 GLOBAL CRO INTERVIEW QUESTIONS & MODEL ANSWERS
// ─────────────────────────────────────────────────────────────────────────────
export const STARTER_KIT_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    category: "Pharmacovigilance & Case Safety",
    question: "What are the four minimum validity criteria required for an ICSR under ICH-E2D?",
    interviewerIntent: "Checks if candidate knows the foundational regulatory bar for logging an adverse event case in Oracle Argus or safety databases.",
    answer: "An Individual Case Safety Report (ICSR) is considered valid for triage and regulatory reporting if and only if all 4 minimum elements are present:\n1. An Identifiable Patient (initials, age, DOB, gender, or patient ID number).\n2. An Identifiable Reporter (name, contact info, healthcare professional qualification, or consumer tag).\n3. At least one Suspect Medicinal Product (brand or generic drug name, dose, or batch).\n4. At least one Adverse Event or Reaction.\nIf any one of these four is missing, the case is marked non-valid/potential and assigned for follow-up query generation.",
    proTip: "Mention that 'Day 0' (Clock Start) begins the exact calendar day all 4 elements are received by any representative of the marketing authorization holder (MAH).",
    keywords: ["ICH-E2D", "ICSR", "Identifiable Patient", "Identifiable Reporter", "Day 0", "Clock Start"],
  },
  {
    id: 2,
    category: "Pharmacovigilance & Case Safety",
    question: "What is the exact clinical and regulatory difference between an Adverse Event (AE) and an Adverse Drug Reaction (ADR)?",
    interviewerIntent: "Distinguishes between mere medical occurrences and causal drug associations.",
    answer: "An Adverse Event (AE) is any untoward medical occurrence in a patient administered a pharmaceutical product, which does not necessarily have a causal relationship with the treatment.\nAn Adverse Drug Reaction (ADR) is an untoward and unintended response to a drug where a causal relationship (at least a reasonable possibility) between the medicinal product and the adverse occurrence cannot be ruled out. In clinical trials, any AE with suspected causality is deemed an ADR.",
    proTip: "Use the phrase 'causality relationship' and reference ICH-E2A to instantly impress technical panelists.",
    keywords: ["Adverse Event", "ADR", "Causal Relationship", "ICH-E2A", "Reasonable Possibility"],
  },
  {
    id: 3,
    category: "Pharmacovigilance & Case Safety",
    question: "What are the 6 criteria that classify an Adverse Event as Serious (SAE)?",
    interviewerIntent: "Tests candidate's ability to immediately recognize cases requiring expedited regulatory clock tracking.",
    answer: "Under ICH guidelines and FDA 21 CFR 312.32, an adverse event is classified as Serious if it results in any of the following 6 seriousness criteria:\n1. Death of the patient.\n2. Life-threatening condition (immediate risk of death at the time of the event).\n3. Inpatient hospitalization or prolongation of existing hospitalization.\n4. Persistent or significant disability or incapacity.\n5. Congenital anomaly or birth defect in offspring.\n6. Other Medically Important Condition (MIC) that jeopardizes the patient and requires medical or surgical intervention to prevent one of the outcomes above (e.g., intensive allergic bronchospasm, seizures not resulting in hospital admission).",
    proTip: "Never forget the 6th criterion ('Medically Important Condition'); forgetting MIC is the #1 mistake freshers make.",
    keywords: ["SAE Criteria", "Life-threatening", "Hospitalization", "Congenital Anomaly", "Medically Important Event"],
  },
  {
    id: 4,
    category: "Pharmacovigilance & Case Safety",
    question: "Explain the regulatory reporting timelines for expedited safety reporting (7-day vs. 15-day).",
    interviewerIntent: "Evaluates compliance awareness and understanding of fatal vs. non-fatal serious regulatory deadlines.",
    answer: "Expedited reporting timelines to health authorities (US FDA, EMA, UK MHRA) depend on outcome and expectedness:\n• 7-Calendar-Day Expedited Report: Mandatory for Serious, Unexpected, Suspected Adverse Reactions (SUSARs) that are Fatal or Life-Threatening. Initial submission must occur within 7 calendar days from Day 0, with a comprehensive follow-up report within an additional 8 calendar days (Day 15).\n• 15-Calendar-Day Expedited Report: Mandatory for all other Serious, Unexpected, Suspected Adverse Reactions (SUSARs) that are non-fatal and non-life-threatening (e.g., hospitalization or permanent disability).\nNon-serious cases are submitted in periodic reports (PBRER/PSUR) rather than expedited tracks.",
    proTip: "Emphasize 'Calendar Days', not business/working days. Regulatory clocks do not stop on weekends or public holidays.",
    keywords: ["7-Calendar-Day", "15-Calendar-Day", "SUSAR", "Expedited Reporting", "Clock Start"],
  },
  {
    id: 5,
    category: "Medical Coding & Standards",
    question: "What is MedDRA and how is its 5-level structural hierarchy organized?",
    interviewerIntent: "Validates practical medical coding competence required for data entry roles in Argus or Rave.",
    answer: "MedDRA (Medical Dictionary for Regulatory Activities) is the standardized international medical terminology developed by ICH for sharing regulatory data across pharmaceutical authorities.\nIts hierarchy comprises 5 distinct levels from broadest to most specific:\n1. System Organ Class (SOC) - 27 top-level physiological systems (e.g., Cardiac disorders).\n2. High-Level Group Term (HLGT) - Pathological or anatomical group (e.g., Cardiac arrhythmias).\n3. High-Level Term (HLT) - Specific group of conditions (e.g., Ventricular arrhythmias and cardiac arrest).\n4. Preferred Term (PT) - The definitive single medical concept used for aggregate data analysis (e.g., Ventricular tachycardia).\n5. Lowest Level Term (LLT) - 80,000+ terms capturing exact verbatim reported terms including synonyms and colloquial expressions.",
    proTip: "Clarify that in Oracle Argus, every reported adverse event verbatim is first matched to an LLT, which automatically assigns its linked PT and Primary SOC.",
    keywords: ["MedDRA", "SOC", "HLGT", "HLT", "Preferred Term (PT)", "LLT", "Verbatim Coding"],
  },
  {
    id: 6,
    category: "Pharmacovigilance & Case Safety",
    question: "What is Oracle Argus Safety and what are its primary operational modules?",
    interviewerIntent: "Verifies whether the candidate has exposure to actual enterprise safety databases used by Novartis, Cognizant, and Accenture.",
    answer: "Oracle Argus Safety 8.4 is the global gold-standard pharmacovigilance safety platform for managing, tracking, and reporting adverse event data across clinical trials and post-marketing surveillance.\nKey modules include:\n1. Argus Intake & Triage: Ingests electronic E2B files, paper forms, and literature reports.\n2. Case Processing: Captures patient demographics, drug administration details, medical history, lab data, and MedDRA coding.\n3. Narrative Writing Tab: Generates structured chronological clinical summary narratives.\n4. Regulatory Reporting Engine: Automates electronic E2B(R2/R3) transmission to FDA ESG, EMA EV, and PMDA.\n5. Audit Trail & Workflow Manager: Enforces 21 CFR Part 11 compliant audit logging for every single field alteration.",
    proTip: "Mention that Argus supports both ICSR E2B(R3) XML formatting and CIOMS I / MedWatch 3500A PDF outputs.",
    keywords: ["Oracle Argus Safety", "Case Processing", "E2B(R3)", "21 CFR Part 11", "Narrative Writing"],
  },
  {
    id: 7,
    category: "Pharmacovigilance & Case Safety",
    question: "What are 'Dechallenge' and 'Rechallenge', and how do they impact causality assessment?",
    interviewerIntent: "Tests clinical pharmacology logic and ability to evaluate drug rechallenge outcomes.",
    answer: "• Dechallenge: The withdrawal or discontinuation of the suspect drug from the patient. If the adverse reaction subsides or improves after stopping the medication, it is considered a 'Positive Dechallenge'. If symptoms continue or worsen, it is a 'Negative Dechallenge'.\n• Rechallenge: The intentional or accidental re-administration of the suspect drug after the event has resolved. If the adverse reaction recurs upon re-exposure, it is a 'Positive Rechallenge'—the strongest clinical evidence of drug causality. If the event does not recur, it is a 'Negative Rechallenge'.",
    proTip: "Mention that in certain conditions (like severe Stevens-Johnson syndrome or anaphylaxis), re-challenging is medically unethical and contraindicated.",
    keywords: ["Dechallenge", "Rechallenge", "Positive Dechallenge", "Positive Rechallenge", "Causality"],
  },
  {
    id: 8,
    category: "Pharmacovigilance & Case Safety",
    question: "What algorithms or systems are used for Causality Assessment in Pharmacovigilance?",
    interviewerIntent: "Assesses familiarity with structured medical evaluation methods like Naranjo and WHO-UMC.",
    answer: "Causality assessment evaluates the likelihood that a medicinal product caused an observed adverse event. The two primary methods are:\n1. WHO-UMC Causality Categories: Categorizes cases into Certain, Probable/Likely, Possible, Unlikely, Conditional/Unclassified, and Unassessable/Unclassifiable based on time-to-onset, dechallenge, rechallenge, and plausible pharmacology.\n2. Naranjo Algorithm: A 10-question scoring questionnaire yielding scores from <=0 (Doubtful), 1-4 (Possible), 5-8 (Probable), to >=9 (Definite).",
    proTip: "Highlight that in spontaneous post-marketing surveillance, if an HCP reports an AE, a default 'Possible' causality is assumed unless explicitly ruled out.",
    keywords: ["WHO-UMC", "Naranjo Algorithm", "Causality Assessment", "Probable", "Possible"],
  },
  {
    id: 9,
    category: "Clinical Trials & GCP",
    question: "What is a SUSAR in clinical trials and what are the unblinding procedures?",
    interviewerIntent: "Tests clinical research trial safety rules and double-blind safety governance.",
    answer: "SUSAR stands for Suspected Unexpected Serious Adverse Reaction. It represents an event occurring in a clinical trial that meets three simultaneous conditions:\n1. Suspected: Reasonable possibility of causal relationship with the investigational product (IP).\n2. Unexpected: The nature or severity is inconsistent with the reference safety information (RSI), such as the Investigator's Brochure (IB).\n3. Serious: Meets one of the 6 regulatory seriousness criteria.\nUnblinding Procedure: To protect study integrity, the clinical trial team and investigator remain blinded. However, the dedicated independent Drug Safety Team unblinds the patient's treatment code solely for expedited regulatory notification to authorities.",
    proTip: "Emphasize that the trial investigator and study monitor remain blinded; only the pharmacovigilance safety officer unblinds the case for reporting.",
    keywords: ["SUSAR", "Investigator's Brochure (IB)", "Unblinding", "Reference Safety Information", "ICH-E2A"],
  },
  {
    id: 10,
    category: "Aggregate Safety & Career Strategy",
    question: "What is the difference between an ICSR and an Aggregate Safety Report (PSUR / PBRER)?",
    interviewerIntent: "Distinguishes individual single-case processing from macro periodic benefit-risk surveillance.",
    answer: "• ICSR (Individual Case Safety Report): Focuses on a single adverse event experienced by one specific patient at a specific time. Managed on a daily basis within tight 7- or 15-day expedited deadlines.\n• Aggregate Reports (PSUR / PBRER / DSUR): Comprehensive cumulative evaluations of the worldwide safety profile of a medicinal product over predefined time periods (e.g., 6 months, 1 year, 3 years). PBRER (Periodic Benefit-Risk Evaluation Report, ICH-E2C R2) evaluates cumulative safety data alongside therapeutic efficacy to determine whether the risk-benefit balance of the drug remains favorable.",
    proTip: "Mention that DSUR (Development Safety Update Report, ICH-E2F) applies to clinical trials, whereas PBRER applies to marketed products.",
    keywords: ["ICSR", "PSUR", "PBRER", "DSUR", "Aggregate Safety", "Benefit-Risk"],
  },
  {
    id: 11,
    category: "Aggregate Safety & Career Strategy",
    question: "What is Signal Detection and how are Disproportionality scores (PRR / ROR) applied?",
    interviewerIntent: "Checks candidate's knowledge of advanced quantitative safety surveillance.",
    answer: "A Safety Signal is defined by WHO as reported information on a possible causal relationship between an adverse event and a drug, the relationship being unknown or incompletely documented previously.\nQuantitative Signal Detection uses statistical disproportionality algorithms comparing observed vs. expected event rates in vast safety databases (like FDA FAERS or WHO VigiBase):\n• PRR (Proportional Reporting Ratio): A PRR >= 2 with Chi-square >= 4 and at least 3 cases typically flags a signal.\n• ROR (Reporting Odds Ratio): Calculated using a 2x2 contingency table to measure the odds of an event occurring with the suspect drug versus all other drugs.",
    proTip: "Clarify that a statistical signal is not proof of causality—it is a trigger for qualitative medical review and epidemiologic investigation.",
    keywords: ["Signal Detection", "PRR", "ROR", "FAERS", "VigiBase", "Disproportionality"],
  },
  {
    id: 12,
    category: "Clinical Trials & GCP",
    question: "What is the difference between Pharmacovigilance (PV) and Clinical Data Management (CDM)?",
    interviewerIntent: "Ensures the candidate understands functional boundaries within CROs and pharmaceutical sponsors.",
    answer: "• Pharmacovigilance (PV): Focuses on patient safety, adverse event intake, medical evaluation, causality assessment, and regulatory compliance (FDA/EMA expedited filings). Driven by safety physicians, clinical pharmacologists, and PV associates working in Oracle Argus.\n• Clinical Data Management (CDM): Focuses on the accuracy, consistency, integrity, and completeness of all clinical trial data (vitals, labs, efficacy endpoints, demographic logs) collected via eCRFs. Driven by data managers working in Electronic Data Capture (EDC) systems like Medidata RAVE or Oracle InForm to lock the trial database for biostatistical analysis.",
    proTip: "Highlight SAE Reconciliation—the exact intersection where PV associates and CDM coordinators cross-check adverse event dates, terms, and codes between Argus and RAVE.",
    keywords: ["PV vs CDM", "Medidata RAVE", "SAE Reconciliation", "eCRF", "Data Lock"],
  },
  {
    id: 13,
    category: "Clinical Trials & GCP",
    question: "What are the core principles of ICH Good Clinical Practice (GCP) E6(R2)?",
    interviewerIntent: "Tests candidate's grasp of trial ethics, patient rights, and data integrity standards.",
    answer: "ICH-GCP E6(R2) establishes ethical and quality standards for designing, conducting, recording, and reporting human clinical trials:\n1. Protection of Human Subjects: The rights, safety, and well-being of trial subjects prevail over the interests of science and society.\n2. Institutional Review Board / IEC Approval: Free and independent ethics committee sign-off prior to trial initiation.\n3. Freely Given Informed Consent: Mandatory written informed consent obtained from every subject before any study procedure.\n4. Qualified Investigators: Medical care governed exclusively by licensed, qualified physicians.\n5. Data Integrity & ALCOA++: All clinical trial records must be Attributable, Legible, Contemporaneous, Original, and Accurate.",
    proTip: "Mention the 'ALCOA++' acronym when answering GCP questions—it signals immediate clinical trial maturity.",
    keywords: ["ICH-GCP E6(R2)", "ALCOA++", "Informed Consent", "IRB/IEC", "Data Integrity"],
  },
  {
    id: 14,
    category: "Clinical Trials & GCP",
    question: "What is Medidata RAVE and how are discrepancies (queries) handled in EDC?",
    interviewerIntent: "Validates technical understanding of Electronic Data Capture and clinical data cleaning.",
    answer: "Medidata RAVE is the leading cloud-based Electronic Data Capture (EDC) system used in clinical trials to capture patient case report forms (eCRFs).\nQuery Lifecycle in RAVE:\n1. System/Edit Check Query: Automated logic check fires instantly if data violates parameters (e.g., systolic BP entered as 2500 or end date preceding start date).\n2. Manual Query: Raised by a Clinical Data Coordinator upon reviewing inconsistent clinical logs or missing lab values.\n3. Site Response: The clinical site investigator or coordinator reviews the query, clarifies data, or amends the entry.\n4. Query Closure: CDM validates the revised entry and formally closes the query.",
    proTip: "Clarify that once all queries are closed and Source Data Verification (SDV) is 100% complete, the database moves through Soft Lock to Final Hard Lock.",
    keywords: ["Medidata RAVE", "EDC", "eCRF", "Discrepancy Management", "Query Closure", "Data Lock"],
  },
  {
    id: 15,
    category: "Medical Coding & Standards",
    question: "What is 21 CFR Part 11 and why is it mandatory for safety and clinical software?",
    interviewerIntent: "Assesses compliance knowledge of FDA electronic records and electronic signatures.",
    answer: "FDA 21 CFR Part 11 sets criteria under which electronic records and electronic signatures are considered equivalent to paper records and handwritten signatures.\nCore Requirements:\n1. Computer System Validation (CSV): Documented evidence that software (Argus, Rave) consistently meets its intended purpose.\n2. Secure Computer-Generated Audit Trails: Independent, timestamped logs capturing date, time, user ID, original value, and revised value for every single field update.\n3. Operational System Checks & Role-Based Access: Limiting system access strictly to authorized, trained personnel.\n4. Non-Repudiable Electronic Signatures: Two distinct identification components (username and password/biometric) certifying formal reviews.",
    proTip: "Mention that audit trails can never be edited or deleted by database administrators or end-users.",
    keywords: ["21 CFR Part 11", "Audit Trail", "Computer System Validation", "Electronic Signature"],
  },
  {
    id: 16,
    category: "Medical Coding & Standards",
    question: "What is an eCTD submission and how are its 5 Modules structured?",
    interviewerIntent: "Assesses regulatory affairs knowledge for global dossier submissions.",
    answer: "eCTD (electronic Common Technical Document) is the mandatory standard format for submitting pharmaceutical dossiers to health authorities (FDA, EMA, PMDA).\nStructure of 5 Modules:\n• Module 1: Administrative Information & Regional Prescribing Information (region-specific, e.g., US FDA forms, package inserts).\n• Module 2: Common Technical Document Summaries (Overviews of quality, non-clinical, and clinical data).\n• Module 3: Quality (Chemistry, Manufacturing, and Controls - CMC documentation).\n• Module 4: Non-clinical Study Reports (Pharmacology, Toxicology, Pharmacokinetics in animal models).\n• Module 5: Clinical Study Reports (All human clinical trial data, safety narratives, and bioequivalence studies).",
    proTip: "Note that Module 1 is regional, whereas Modules 2 through 5 are completely standardized globally across ICH regions.",
    keywords: ["eCTD", "Common Technical Document", "Module 1-5", "CMC", "Clinical Study Reports"],
  },
  {
    id: 17,
    category: "Pharmacovigilance & Case Safety",
    question: "How do you handle an adverse event report with an unknown drug name or missing patient age?",
    interviewerIntent: "Tests practical triage decision-making when dealing with incomplete real-world spontaneous reports.",
    answer: "1. Missing Patient Age: Check if any other identifier exists (patient initials, gender, patient ID, or age group like 'elderly' or 'infant'). If initials or gender are present, the 'Identifiable Patient' criterion is satisfied, making the case valid. A targeted follow-up query is immediately dispatched to obtain the exact DOB/age.\n2. Unknown Drug Name: If the suspect drug is reported vaguely as 'painkiller' without a brand or generic name, the case lacks an 'Identifiable Medicinal Product'. It cannot be formally processed as a valid ICSR. It is cataloged in the triage log as an 'Incomplete/Pending Case' and urgent follow-up is initiated with the reporter.",
    proTip: "Demonstrate vigilance: follow-up attempts are typically documented up to 3 times (e.g., at Day 0, Day 10, Day 20) before closing as unretrievable.",
    keywords: ["Missing Age", "Incomplete Case", "Targeted Follow-up", "Validation Check"],
  },
  {
    id: 18,
    category: "Aggregate Safety & Career Strategy",
    question: "What is a Risk Management Plan (RMP) / REMS in pharmacovigilance?",
    interviewerIntent: "Tests macro understanding of post-authorization drug safety mitigation.",
    answer: "An RMP (Risk Management Plan, EMA standard) or REMS (Risk Evaluation and Mitigation Strategy, US FDA standard) is a dynamic regulatory document describing the safety profile of a medicinal product and actionable steps to prevent or minimize risks to patients.\nThree Key Components:\n1. Safety Specification: Identifies known risks (important identified risks), potential risks (unproven associations), and missing information (e.g., use in pregnant women or severe renal patients).\n2. Pharmacovigilance Plan: Outlines routine PV surveillance and additional post-authorization safety studies (PASS).\n3. Risk Minimization Measures: Special educational brochures, patient alert cards, controlled distribution, or physician checklist guides to mitigate serious reactions.",
    proTip: "Cite an example like Thalidomide (mandatory pregnancy testing) or Isotretinoin iPLEDGE program.",
    keywords: ["Risk Management Plan (RMP)", "REMS", "Safety Specification", "Risk Minimization"],
  },
  {
    id: 19,
    category: "Pharmacovigilance & Case Safety",
    question: "Explain the concept of 'Day 0' and 'Clock Start' in corporate case processing.",
    interviewerIntent: "Checks punctuality and compliance discipline around audit-triggering timelines.",
    answer: "'Day 0' (Clock Start) is the exact calendar date on which any employee, contractual representative, vendor, or affiliate of the pharmaceutical marketing authorization holder (MAH) first becomes aware of a case containing all 4 minimum validity criteria.\nCrucial Rules:\n• Day 0 cannot be altered or reset when transferred between departments (e.g., if a sales rep receives the report on Monday, Day 0 is Monday, even if PV receives it on Thursday).\n• The 7-day or 15-day regulatory reporting clock begins counting from the calendar day following Day 0.\n• Clock start compliance is a primary metric evaluated during FDA and EMA regulatory inspections.",
    proTip: "State that late Day 0 receipt from commercial/field teams is the most common cause of regulatory inspection findings.",
    keywords: ["Day 0", "Clock Start", "Regulatory Inspection", "MAH Affiliate", "SOP Timelines"],
  },
  {
    id: 20,
    category: "Aggregate Safety & Career Strategy",
    question: "How do you justify your pharmacy/life sciences degree for a corporate data/safety role over hospital or retail practice?",
    interviewerIntent: "Assesses candidate's career clarity, passion, long-term stability, and communication polish.",
    answer: "My degree in Pharmacy/Life Sciences provided me with rigorous foundations in human pharmacology, mechanism of action, toxicology, and clinical medical terminology. While retail and hospital practice serve individual patients at the counter, corporate Pharmacovigilance and Clinical Data Management operate at global public health scale.\nIn this role, I can leverage my pharmacological acumen to protect thousands of trial subjects and post-market patients worldwide by analyzing clinical adverse events, applying ICH-GCP rigor, and operating enterprise databases like Oracle Argus.\nI chose this path intentionally, have trained specifically on enterprise case processing workflows, and am committed to building a long-term specialized career in global drug safety.",
    proTip: "Deliver this with confident eye contact. Show that corporate life sciences was your first choice, not a backup option.",
    keywords: ["Career Clarity", "Pharmacology Foundation", "Global Scale", "Patient Safety", "Specialized Career"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. ENTERPRISE SOFTWARE WORKFLOW BLUEPRINT
// ─────────────────────────────────────────────────────────────────────────────
export const ARGUS_WORKFLOW_STEPS: SoftwareWorkflowStep[] = [
  {
    stepNumber: 1,
    title: "Case Intake & Ingestion",
    role: "Intake Specialist / Associate",
    sla: "Within 24 Hours of Day 0",
    description: "Receive adverse event reports via E2B XML, CIOMS forms, spontaneous call center logs, or partner MAH exchange. Perform duplicate check against historical cases.",
    enterpriseTool: "Oracle Argus Intake Module",
    complianceRule: "Check 4 Minimum Criteria (ICH-E2D)",
  },
  {
    stepNumber: 2,
    title: "Triage & Seriousness Classification",
    role: "Drug Safety Associate",
    sla: "Day 1 - Day 2",
    description: "Evaluate seriousness against 6 criteria. Flag fatal/life-threatening events for 7-day clock tracking or other serious events for 15-day reporting.",
    enterpriseTool: "Argus Case Triage Dashboard",
    complianceRule: "Assign Case Priority & Expedited Flag",
  },
  {
    stepNumber: 3,
    title: "Data Entry & MedDRA Coding",
    role: "Safety Associate (Freshers)",
    sla: "Day 2 - Day 5",
    description: "Enter patient demographics, suspect/concomitant medications, lab results, and dechallenge/rechallenge outcomes. Code verbatim events to MedDRA LLT/PT and drugs to WHO-DD.",
    enterpriseTool: "Argus Event & Product Tabs",
    complianceRule: "Strict MedDRA Coding Rules & Verbatim Concordance",
  },
  {
    stepNumber: 4,
    title: "Clinical Narrative & Medical Review",
    role: "Safety Physician / Senior Scientist",
    sla: "Day 5 - Day 8",
    description: "Draft chronological narrative summarizing case history. Perform causality assessment (WHO-UMC/Naranjo) and determine expectedness against RSI / Company Core Data Sheet (CCDS).",
    enterpriseTool: "Argus Narrative & Analysis Tab",
    complianceRule: "Causality & Listedness Determination",
  },
  {
    stepNumber: 5,
    title: "Quality Review (QC) & Case Lock",
    role: "Quality Assurance Specialist",
    sla: "Day 8 - Day 11",
    description: "Comprehensive audit of all entered fields against source documentation. Resolve queries and execute formal Case Lock preventing unauthorized field alterations.",
    enterpriseTool: "Argus Case Lock & QC Checklist",
    complianceRule: "21 CFR Part 11 Electronic Signature Sign-off",
  },
  {
    stepNumber: 6,
    title: "Electronic Regulatory Transmission",
    role: "Regulatory Reporting Team",
    sla: "Before Day 7 / Day 15",
    description: "Generate compliant E2B(R3) XML message. Transmit securely via Electronic Submission Gateway (ESG) to FDA FAERS, EMA EudraVigilance, and PMDA. Capture ACK receipt.",
    enterpriseTool: "Argus ESM (Electronic Submission Module)",
    complianceRule: "FDA ESG & EMA EudraVigilance ACK Verification",
  },
];

export const RAVE_WORKFLOW_STEPS: SoftwareWorkflowStep[] = [
  {
    stepNumber: 1,
    title: "eCRF Specification & Build",
    role: "Clinical Data Coordinator",
    sla: "Pre-Study Initiation",
    description: "Design protocol-compliant electronic Case Report Forms (eCRFs) in Medidata RAVE Architect with automated edit checks and field constraints.",
    enterpriseTool: "Medidata RAVE Architect",
    complianceRule: "CDISC CDASH & Protocol Alignment",
  },
  {
    stepNumber: 2,
    title: "Clinical Site Data Entry",
    role: "Clinical Research Coordinator (CRC)",
    sla: "Within 24-48 Hours of Patient Visit",
    description: "Hospital trial sites enter patient vitals, lab panels, dose administrations, and adverse events directly into RAVE EDC web portal.",
    enterpriseTool: "Medidata RAVE Classic / EDC",
    complianceRule: "Real-time Field Edit Checks",
  },
  {
    stepNumber: 3,
    title: "Query & Discrepancy Management",
    role: "Data Management Associate",
    sla: "Ongoing Weekly Sprints",
    description: "Review system-generated and manual discrepancies. Issue targeted queries to clinical sites for clarification or corrections.",
    enterpriseTool: "RAVE Discrepancy Management",
    complianceRule: "GCP Audit Trail for all Data Modifications",
  },
  {
    stepNumber: 4,
    title: "Source Data Verification (SDV) & SAE Reconciliation",
    role: "CRA & Safety Data Manager",
    sla: "Monthly Trial Sprints",
    description: "Clinical Monitors verify eCRF against hospital charts. Cross-reconcile serious adverse event terms, start dates, and outcomes between RAVE EDC and Oracle Argus.",
    enterpriseTool: "RAVE SDV Matrix & Argus Reconciliation",
    complianceRule: "100% Concordance between Clinical & Safety Databases",
  },
  {
    stepNumber: 5,
    title: "Database Freeze & Hard Lock",
    role: "Lead Clinical Data Manager",
    sla: "Study Conclusion",
    description: "After 100% query resolution, medical coding sign-off, and PI e-signatures, execute Soft Lock followed by Final Hard Lock to freeze data for biostatistical analysis.",
    enterpriseTool: "RAVE Lock Module",
    complianceRule: "21 CFR Part 11 Trial Freeze & CDISC SDTM Export",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. 35+ ATS-OPTIMIZED KEYWORDS FOR HEALTHCARE RESUMES
// ─────────────────────────────────────────────────────────────────────────────
export const ATS_KEYWORDS_DATA: AtsKeyword[] = [
  // Pharmacovigilance
  { keyword: "Oracle Argus Safety 8.4", category: "Pharmacovigilance", tier: "Critical", sampleBullet: "Trained on enterprise case processing workflows in Oracle Argus Safety 8.4 including case book-in, adverse event data entry, and electronic E2B(R3) triage." },
  { keyword: "ICSR (Individual Case Safety Report)", category: "Pharmacovigilance", tier: "Critical", sampleBullet: "Evaluated clinical source documents to extract and log valid ICSRs complying with the 4 minimum validity criteria under ICH-E2D guidelines." },
  { keyword: "MedDRA 26.0 / 27.0", category: "Pharmacovigilance", tier: "Critical", sampleBullet: "Accurately coded adverse event verbatims to Lowest Level Terms (LLTs) and mapped to primary System Organ Classes (SOC) utilizing MedDRA." },
  { keyword: "Serious Adverse Event (SAE) Triage", category: "Pharmacovigilance", tier: "Critical", sampleBullet: "Assessed incoming case narratives against the 6 regulatory seriousness criteria to enforce 7-day and 15-day expedited reporting deadlines." },
  { keyword: "ICH-E2A / E2D / E2C", category: "Pharmacovigilance", tier: "Critical", sampleBullet: "Applied ICH-E2A and ICH-E2D regulatory frameworks for clinical trial safety definitions and post-marketing expedited safety surveillance." },
  { keyword: "Dechallenge & Rechallenge Assessment", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Analyzed clinical outcomes post-drug discontinuation (dechallenge) and re-exposure (rechallenge) to establish plausible drug-event causality." },
  { keyword: "Clinical Narrative Writing", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Authored structured chronological case narratives summarizing patient history, concomitant therapies, lab findings, and medical causality." },
  { keyword: "Causality Assessment (WHO-UMC / Naranjo)", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Utilized WHO-UMC criteria and the Naranjo algorithm to evaluate drug-event causality categories across spontaneous and clinical trial reports." },
  { keyword: "SUSAR (Suspected Unexpected Serious Adverse Reaction)", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Monitored clinical trial adverse events against Investigator Brochures (IB) to identify and prioritize SUSARs for unblinded expedited reporting." },
  { keyword: "PSUR / PBRER Periodic Reports", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Assisted in aggregate safety data compilation for Periodic Safety Update Reports (PSUR) and PBRER benefit-risk ratio monitoring." },
  { keyword: "Signal Detection & PRR/ROR", category: "Pharmacovigilance", tier: "Recommended", sampleBullet: "Familiar with quantitative disproportionality metrics (Proportional Reporting Ratio & Reporting Odds Ratio) in FAERS and VigiBase surveillance." },
  { keyword: "CIOMS I Form & MedWatch 3500A", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Generated standardized CIOMS I and FDA MedWatch 3500A forms for expedited and periodic safety dossiers." },
  { keyword: "WHO Drug Global Dictionary", category: "Pharmacovigilance", tier: "High Impact", sampleBullet: "Coded suspect, concomitant, and past medical treatments using the WHO Drug Dictionary hierarchy down to preferred trade name and ATC code." },

  // Clinical Data Management
  { keyword: "Medidata RAVE EDC", category: "Clinical Data Management", tier: "Critical", sampleBullet: "Hands-on simulation in Medidata RAVE EDC for reviewing electronic Case Report Forms (eCRFs) and executing data entry discrepancy checks." },
  { keyword: "eCRF Design & Validation", category: "Clinical Data Management", tier: "High Impact", sampleBullet: "Assisted in designing protocol-driven eCRFs following CDISC CDASH standards and configured automated edit-check rules." },
  { keyword: "Query Lifecycle Management", category: "Clinical Data Management", tier: "Critical", sampleBullet: "Identified clinical data discrepancies, raised targeted manual queries to trial sites, and tracked query resolution to final closure." },
  { keyword: "CDISC SDTM Standards", category: "Clinical Data Management", tier: "High Impact", sampleBullet: "Understood standard clinical data tabulation models (SDTM) for structuring clinical trial domains (AE, CM, DM, VS) for FDA submissions." },
  { keyword: "SAE Reconciliation", category: "Clinical Data Management", tier: "Critical", sampleBullet: "Performed cross-functional SAE reconciliation between Medidata RAVE EDC and Oracle Argus Safety to ensure 100% data concordance." },
  { keyword: "Data Cleaning & Quality Control", category: "Clinical Data Management", tier: "High Impact", sampleBullet: "Conducted systematic clinical data cleaning sprints, identifying missing values, out-of-range lab vitals, and inconsistent dates." },
  { keyword: "Database Lock (Soft & Hard Lock)", category: "Clinical Data Management", tier: "High Impact", sampleBullet: "Executed pre-lock checklists verifying 100% query closure and medical coding approvals prior to formal clinical trial hard lock." },

  // Regulatory & Compliance
  { keyword: "21 CFR Part 11 Compliance", category: "Regulatory & Compliance", tier: "Critical", sampleBullet: "Enforced strict compliance with FDA 21 CFR Part 11 requirements including electronic signatures, role-based security, and audit trails." },
  { keyword: "ICH-GCP E6(R2) Guidelines", category: "Regulatory & Compliance", tier: "Critical", sampleBullet: "Trained on ICH-GCP E6(R2) principles ensuring patient rights, informed consent adherence, and ALCOA++ clinical documentation standards." },
  { keyword: "eCTD Dossier (Modules 1-5)", category: "Regulatory & Compliance", tier: "High Impact", sampleBullet: "Understood the 5-module structure of electronic Common Technical Documents (eCTD) for global regulatory marketing authorization filings." },
  { keyword: "Standard Operating Procedures (SOPs)", category: "Regulatory & Compliance", tier: "High Impact", sampleBullet: "Adhered to GxP Standard Operating Procedures governing adverse event triage, deviation tracking, and corporate audit readiness." },
  { keyword: "Electronic Submission Gateway (ESG)", category: "Regulatory & Compliance", tier: "Recommended", sampleBullet: "Familiar with FDA ESG and EMA EudraVigilance gateway protocols for secure XML transmissions and ACK 1/2/3 confirmations." },
  { keyword: "Risk Management Plan (RMP / REMS)", category: "Regulatory & Compliance", tier: "High Impact", sampleBullet: "Reviewed post-marketing Risk Evaluation and Mitigation Strategies (REMS) and European RMP safety specifications." },
  { keyword: "GAMP 5 Software Validation", category: "Regulatory & Compliance", tier: "Recommended", sampleBullet: "Understood computerized system validation (CSV) frameworks under GAMP 5 life cycle methodologies." },

  // Core Clinical Competencies
  { keyword: "Clinical Pharmacology & Pharmacokinetics", category: "Core Clinical Competencies", tier: "High Impact", sampleBullet: "Applied pharmacological principles (half-life, therapeutic index, CYP450 metabolism) to evaluate drug-drug interactions and adverse reactions." },
  { keyword: "Medical Terminology & Anatomy", category: "Core Clinical Competencies", tier: "High Impact", sampleBullet: "Leveraged life sciences education to interpret complex clinical diagnosis verbatims, pathology reports, and physician discharge notes." },
  { keyword: "ALCOA++ Data Integrity", category: "Core Clinical Competencies", tier: "High Impact", sampleBullet: "Implemented ALCOA++ data integrity principles: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, and Consistent." },
  { keyword: "Medical Review & Evaluation", category: "Core Clinical Competencies", tier: "High Impact", sampleBullet: "Assisted senior medical reviewers in compiling clinical narratives and synthesizing relevant literature citations for potential signals." },
  { keyword: "Audit Trail Analysis", category: "Core Clinical Competencies", tier: "High Impact", sampleBullet: "Monitored time-stamped system audit trails to verify chronological record preservation during trial data reviews." },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. 2026 FRESHER SALARY BENCHMARK & CITY MATRIX
// ─────────────────────────────────────────────────────────────────────────────
export const CITY_SALARY_BENCHMARKS: CitySalaryBenchmark[] = [
  {
    city: "Hyderabad",
    fresherLpa: [3.8, 5.2],
    exp3yrLpa: [6.5, 9.0],
    senior5yrLpa: [11.5, 16.0],
    lead8yrLpa: [18.0, 26.0],
    hubType: "Global Captive R&D",
    topEmployers: ["Novartis (NBS)", "Cognizant", "Parexel", "TCS Healthcare", "Dr. Reddy's", "Wipro Life Sciences"],
  },
  {
    city: "Bengaluru",
    fresherLpa: [4.2, 5.5],
    exp3yrLpa: [7.0, 9.5],
    senior5yrLpa: [12.0, 17.5],
    lead8yrLpa: [19.0, 28.0],
    hubType: "Global Captive R&D",
    topEmployers: ["IQVIA", "AstraZeneca GDC", "Accenture", "Syneos Health", "Novo Nordisk GBS", "Fortrea"],
  },
  {
    city: "Pune",
    fresherLpa: [3.6, 4.8],
    exp3yrLpa: [6.0, 8.5],
    senior5yrLpa: [10.5, 15.0],
    lead8yrLpa: [16.5, 24.0],
    hubType: "High-Volume Processing Hub",
    topEmployers: ["Cognizant", "TCS", "Infosys BPM Life Sciences", "Wipro", "Cipla", "Sanofi"],
  },
  {
    city: "Mumbai / Navi Mumbai",
    fresherLpa: [4.0, 5.2],
    exp3yrLpa: [6.8, 9.2],
    senior5yrLpa: [11.5, 16.5],
    lead8yrLpa: [18.0, 27.0],
    hubType: "Tier-1 Delivery Hub",
    topEmployers: ["TCS Olympus", "Accenture", "Pfizer Captive", "Lupin", "Glenmark", "ICON plc"],
  },
  {
    city: "Chennai",
    fresherLpa: [3.5, 4.6],
    exp3yrLpa: [5.8, 8.0],
    senior5yrLpa: [10.0, 14.5],
    lead8yrLpa: [16.0, 23.0],
    hubType: "High-Volume Processing Hub",
    topEmployers: ["Cognizant", "Accenture", "Scope e-Knowledge", "HCL Healthcare", "Omega Healthcare"],
  },
  {
    city: "Delhi-NCR (Gurgaon/Noida)",
    fresherLpa: [3.8, 5.0],
    exp3yrLpa: [6.5, 8.8],
    senior5yrLpa: [11.0, 15.5],
    lead8yrLpa: [17.5, 25.0],
    hubType: "Tier-1 Delivery Hub",
    topEmployers: ["Genpact Healthcare", "PAREXEL", "Optum UnitedHealth", "TCS", "Max Healthcare"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. 12-WEEK ZERO-TO-OFFER CORPORATE ROADMAP
// ─────────────────────────────────────────────────────────────────────────────
export const TWELVE_WEEK_ROADMAP: RoadmapWeek[] = [
  {
    weekRange: "Weeks 1 – 3",
    phaseTitle: "Clinical Foundations & Regulatory Frameworks",
    milestones: [
      "Master ICH-GCP E6(R2) trial governance, investigator responsibilities, and informed consent rigor.",
      "Understand ICH-E2A / E2D guidelines and master the 4 minimum ICSR validity criteria.",
      "Learn Seriousness Criteria, Expectedness (RSI / CCDS), and Causality (Naranjo & WHO-UMC algorithms).",
      "Complete MedDRA 26.0 structural hierarchy training (SOC, HLGT, HLT, PT, LLT).",
    ],
    deliverables: "Regulatory Fundamentals & MedDRA Coding Assessment Certificate.",
  },
  {
    weekRange: "Weeks 4 – 7",
    phaseTitle: "Enterprise Software Simulation & Case Processing",
    milestones: [
      "Process 40+ simulated real-world ICSR cases on enterprise drug safety software (Oracle Argus workflows).",
      "Triage spontaneous and clinical trial adverse events, managing 7-day and 15-day expedited reporting clocks.",
      "Draft structured clinical narratives adhering to corporate pharma SOPs.",
      "Hands-on Medidata RAVE EDC navigation: eCRF data review, discrepancy queries, and SAE reconciliation.",
    ],
    deliverables: "Portfolio of 40 Processed ICSR Cases & Verified Case Narrative Portfolio.",
  },
  {
    weekRange: "Weeks 8 – 10",
    phaseTitle: "Quality Control, Audits & Regulatory Submissions",
    milestones: [
      "Perform simulated Case Quality Review (QC) and Case Lock protocols under 21 CFR Part 11 guidelines.",
      "Understand Electronic Submission Gateway (ESG) E2B(R3) transmission and ACK receipt handling.",
      "Study aggregate reporting principles (PSUR / PBRER / DSUR) and quantitative signal detection (PRR / ROR).",
      "Master trial database closeout: query reconciliation, source data verification (SDV), and hard lock.",
    ],
    deliverables: "End-to-End Enterprise Safety Audit Simulation Sign-off.",
  },
  {
    weekRange: "Weeks 11 – 12",
    phaseTitle: "ATS Resume Engineering & Executive Placement Rounds",
    milestones: [
      "Re-engineer resume with 35+ verified corporate ATS keywords to bypass automated HR screeners.",
      "Optimize LinkedIn profile with enterprise software badges, target CRO recruiter connection sprints.",
      "Rigorous technical mock interviews covering the Top 20 Global CRO questions with feedback.",
      "Direct applications to active fresher hiring drives at Novartis, IQVIA, Parexel, Cognizant, and Accenture.",
    ],
    deliverables: "MNC-Ready ATS Resume + Placement Portal Access & First Interview Callbacks.",
  },
];
