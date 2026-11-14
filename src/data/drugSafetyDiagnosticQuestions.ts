/**
 * Arzon Clinical Interview Diagnostic: Drug Safety Associate (PV / ICSR)
 *
 * 40 Authoritative Scenario-Based Technical Interview Questions
 * Structured across 8 Industry Competencies (5 questions each):
 *  1. pv_fundamentals: PV Scope, Fundamentals & Trial vs Post-Marketing (Q1 - Q5)
 *  2. icsr_validity: ICSR Intake, 4 Minimum Criteria & Source Triage (Q6 - Q10)
 *  3. day0_clocks: Day 0 Regulatory Clocks & Calendar Disciplines (Q11 - Q15)
 *  4. seriousness_expedited: Seriousness Criteria & Expedited Reporting Timelines (Q16 - Q20)
 *  5. meddra_coding: MedDRA 5-Level Hierarchy & MSSO Coding Rules (Q21 - Q25)
 *  6. special_situations: Special Safety Situations (Pregnancy, Off-Label, Overdose) (Q26 - Q30)
 *  7. narrative_queries: SBAR Chronological Narrative Writing & Targeted Queries (Q31 - Q35)
 *  8. causality_escalation: Causality Assessment (WHO-UMC/Naranjo) & Dispute Escalation (Q36 - Q40)
 *
 * Correct answer options are strictly balanced across A (10), B (10), C (10), and D (10).
 * Grounded in: ICH E2A, ICH E2D, ICH-GCP E6(R2), EMA GVP Module VI & IX, CIOMS, and MedDRA MSSO PTC v27.0.
 */

import type { Question } from "./careerEngineQuestions";

export type DsaCompetencyKey =
  | "pv_fundamentals"
  | "icsr_validity"
  | "day0_clocks"
  | "seriousness_expedited"
  | "meddra_coding"
  | "special_situations"
  | "narrative_queries"
  | "causality_escalation";

export interface DsaQuestionOption {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface DsaDiagnosticQuestion {
  id: string;
  number: number;
  competency: DsaCompetencyKey;
  competencyTitle: string;
  topic: string;
  scenario: string;
  prompt: string;
  options: DsaQuestionOption[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: string;
  guidelineReference: string;
  recruiterInsight: string;
  whatToStudy: string;
}

export const DSA_COMPETENCIES: Record<
  DsaCompetencyKey,
  { title: string; count: number; description: string }
> = {
  pv_fundamentals: {
    title: "PV Scope & Fundamentals",
    count: 5,
    description: "AE vs ADR distinctions, clinical trial vs post-marketing safety, and Reference Safety Information (RSI).",
  },
  icsr_validity: {
    title: "ICSR Intake & Validity",
    count: 5,
    description: "The 4 mandatory validity elements under ICH E2D / GVP Module VI and handling ambiguous digital/literature reports.",
  },
  day0_clocks: {
    title: "Day 0 Regulatory Clocks",
    count: 5,
    description: "Partner hand-offs, timezone crossings, significant follow-up resets, and calendar vs business day compliance.",
  },
  seriousness_expedited: {
    title: "Seriousness & Expedited Timelines",
    count: 5,
    description: "The 6 ICH E2A seriousness criteria, Medically Important Events, 7-day SUSAR clock vs 15-day expedited reporting.",
  },
  meddra_coding: {
    title: "MedDRA Hierarchy & MSSO Rules",
    count: 5,
    description: "MedDRA 5-level hierarchy, diagnosis superseding symptoms (PTC Sec 1.3), surgical terms, and SMQ surveillance.",
  },
  special_situations: {
    title: "Special Safety Situations",
    count: 5,
    description: "Maternal exposure without AE (registries), lactation transfer, off-label use, medication errors, and therapeutic failures.",
  },
  narrative_queries: {
    title: "SBAR Narratives & Queries",
    count: 5,
    description: "Chronological SBAR narrative writing, dechallenge/rechallenge records, and targeted query generation.",
  },
  causality_escalation: {
    title: "Causality & Dispute Escalation",
    count: 5,
    description: "WHO-UMC and Naranjo algorithms, resolving Investigator vs Sponsor causality conflicts, and SUSAR unblinding.",
  },
};

export const DRUG_SAFETY_DIAGNOSTIC_QUESTIONS: DsaDiagnosticQuestion[] = [
  // ── 1. PV SCOPE & FUNDAMENTALS (Q1 - Q5) ───────────────────────────────────────
  {
    id: "dsa_q1",
    number: 1,
    competency: "pv_fundamentals",
    competencyTitle: "PV Scope & Fundamentals",
    topic: "Adverse Event (AE) vs. Adverse Drug Reaction (ADR)",
    scenario:
      "A 62-year-old male with type 2 diabetes enrolled in a Phase III cardiovascular trial slips on wet tiles at home and fractures his right distal radius while taking investigational product IP-204. The investigator documents the fracture in the trial eCRF.",
    prompt:
      "In pharmacovigilance, how is this event categorized and what is the primary regulatory distinction between an Adverse Event (AE) and an Adverse Drug Reaction (ADR)?",
    options: [
      {
        id: "A",
        text: "It is classified as an ADR because any physical injury occurring during an active clinical trial must be presumed to be drug-related until proven otherwise.",
      },
      {
        id: "B",
        text: "It is an AE. An AE is any untoward medical occurrence without regard to causal relationship; an ADR requires at least a reasonable possibility of a causal relationship.",
      },
      {
        id: "C",
        text: "It is neither an AE nor an ADR because slip-and-fall domestic accidents are non-clinical social events exempt from trial logs.",
      },
      {
        id: "D",
        text: "It is immediately classified as a SUSAR because bone fractures represent severe skeletal trauma under ICH guidelines.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "Under ICH E2A Section II.A and ICH-GCP E6(R2) Section 1.2, an Adverse Event (AE) is any untoward medical occurrence in a clinical investigation subject administered a medicinal product which does not necessarily have a causal relationship. An Adverse Drug Reaction (ADR) requires at least a reasonable possibility of a causal relationship.",
    guidelineReference: "ICH E2A Section II.A & ICH-GCP E6(R2) Section 1.2",
    recruiterInsight:
      "Recruiters at Cognizant and IQVIA test this in 100% of fresher interviews to ensure candidates do not confuse temporal association with causality.",
    whatToStudy: "ICH E2A definitions of AE, ADR, Unexpected Adverse Reaction, and SUSAR.",
  },
  {
    id: "dsa_q2",
    number: 2,
    competency: "pv_fundamentals",
    competencyTitle: "PV Scope & Fundamentals",
    topic: "Clinical Trial Safety vs. Post-Marketing Surveillance",
    scenario:
      "A fresher candidate is asked during a technical panel at Parexel: 'What is the primary operational difference in pharmacovigilance between handling safety data in an ongoing double-blind clinical trial compared to a marketed commercial drug?'",
    prompt:
      "Which statement correctly defines the regulatory and operational distinction between pre-marketing clinical trial PV and post-marketing surveillance?",
    options: [
      {
        id: "A",
        text: "Clinical trial PV operates under strict protocol-driven causality and unblinding rules (ICH E2A) evaluating against the Investigator's Brochure; post-marketing handles spontaneous/real-world data evaluating against the SmPC/USPI.",
      },
      {
        id: "B",
        text: "Clinical trial PV only requires logging deaths, whereas post-marketing surveillance requires capturing all non-serious events.",
      },
      {
        id: "C",
        text: "Clinical trial PV is managed entirely by hospital ethics committees, whereas post-marketing PV is solely the responsibility of marketing representatives.",
      },
      {
        id: "D",
        text: "Post-marketing safety does not require Individual Case Safety Reports (ICSRs), relying exclusively on quarterly literature sales reports.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Pre-marketing PV evaluates safety against the Reference Safety Information (RSI) in the Investigator's Brochure (IB) under protocol-governed trials. Post-marketing evaluates voluntary spontaneous, solicited, and literature reports against the Summary of Product Characteristics (SmPC) or Package Insert under EMA GVP Module VI and FDA 21 CFR 314.80.",
    guidelineReference: "EMA GVP Module VI & ICH E2A Section I",
    recruiterInsight:
      "Interviewers check if you know what document is used to determine 'Expectedness' in trials (Investigator's Brochure) versus post-marketing (SmPC).",
    whatToStudy: "Reference Safety Information (RSI), Investigator Brochure (IB) vs SmPC.",
  },
  {
    id: "dsa_q3",
    number: 3,
    competency: "pv_fundamentals",
    competencyTitle: "PV Scope & Fundamentals",
    topic: "Why Post-Marketing Surveillance is Mandatory After Phase III",
    scenario:
      "During a Novartis Hyderabad technical interview, the panel asks: 'Why do regulatory authorities mandate post-authorization safety surveillance (GVP Module IX) when Phase III clinical trials have already established safety in thousands of patients?'",
    prompt:
      "Which statement accurately explains the fundamental clinical limitation of Phase III trials that necessitates lifelong post-marketing pharmacovigilance?",
    options: [
      {
        id: "A",
        text: "Phase III trials only monitor healthy male volunteers, requiring female and pediatric data to be collected post-marketing.",
      },
      {
        id: "B",
        text: "Regulatory authorities do not accept electronic trial master records, requiring real-world prescriptions for legal validation.",
      },
      {
        id: "C",
        text: "Phase III trials have restricted sample sizes (typically N=1,000–3,000), short duration, and exclude real-world comorbidities, polypharmacy, and vulnerable populations, leaving rare ADRs (<1:10,000) undetected.",
      },
      {
        id: "D",
        text: "Pharmaceutical sponsors must renew their marketing authorization every 60 days by submitting fresh clinical trial batches.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "Clinical trials cannot detect rare adverse reactions (<1 in 10,000), long-term toxicities, or drug-drug interactions resulting from real-world polypharmacy and heterogeneous patient populations. Post-marketing surveillance provides continuous real-world safety surveillance.",
    guidelineReference: "WHO Technical Report Series & EMA GVP Module IX",
    recruiterInsight:
      "Novartis and IQVIA use this question to test scientific reasoning and epidemiological understanding beyond textbook rote memorization.",
    whatToStudy: "Limitations of clinical trials: sample size, selection bias, duration, and detection of rare adverse events.",
  },
  {
    id: "dsa_q4",
    number: 4,
    competency: "pv_fundamentals",
    competencyTitle: "PV Scope & Fundamentals",
    topic: "Severity vs. Seriousness Regulatory Distinction",
    scenario:
      "A 45-year-old migraine patient experiences an incapacitating, 10/10 visual aura headache for 6 hours. She rests at home in a dark room and fully recovers without consulting a doctor or visiting an emergency department.",
    prompt:
      "In pharmacovigilance case triage, how should this event be classified in terms of severity and seriousness?",
    options: [
      {
        id: "A",
        text: "It is both severe and serious because a 10/10 pain score represents an acute medical crisis under hospital triage scales.",
      },
      {
        id: "B",
        text: "It is serious but mild because migraine headaches are chronic neurovascular conditions.",
      },
      {
        id: "C",
        text: "It is neither severe nor serious because the patient did not receive intravenous prescription analgesics.",
      },
      {
        id: "D",
        text: "It is severe in intensity, but non-serious from a regulatory perspective because it did not result in death, hospitalization, disability, or a life-threatening outcome.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Severity describes the medical intensity of an event (mild, moderate, severe). Seriousness is a regulatory definition based on patient outcome (death, life-threatening, inpatient hospitalization, disability, congenital anomaly, or medically important). A severe headache that does not meet these outcome criteria is severe, but non-serious.",
    guidelineReference: "ICH E2A Section II.B (Seriousness vs Severity)",
    recruiterInsight:
      "This is one of the most common elimination questions in technical screening rounds. Candidates who equate 'severe pain' with 'regulatory seriousness' fail immediately.",
    whatToStudy: "ICH E2A distinction between Severity (intensity) and Seriousness (outcome criteria).",
  },
  {
    id: "dsa_q5",
    number: 5,
    competency: "pv_fundamentals",
    competencyTitle: "PV Scope & Fundamentals",
    topic: "Expectedness & Reference Safety Information (RSI)",
    scenario:
      "In a clinical trial for an oncology drug, a patient develops severe peripheral neuropathy. The Investigator's Brochure lists 'mild paresthesia' in 3% of patients, but does not list sensory motor peripheral neuropathy.",
    prompt:
      "Under ICH E2A guidelines, how should the safety associate assess the 'expectedness' of this adverse drug reaction?",
    options: [
      {
        id: "A",
        text: "It is expected because paresthesia and peripheral neuropathy both involve nervous system symptoms.",
      },
      {
        id: "B",
        text: "It is unexpected because the specific nature and severity of peripheral neuropathy are not consistent with the reference safety information in the Investigator's Brochure.",
      },
      {
        id: "C",
        text: "It is expected because all oncology therapies are known to cause neurological side effects in clinical practice.",
      },
      {
        id: "D",
        text: "The safety associate must wait for the annual Development Safety Update Report (DSUR) before deciding expectedness.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "Under ICH E2A Section II.C, an unexpected adverse drug reaction is one whose nature or severity is not consistent with applicable product information (e.g., Investigator's Brochure for an unapproved investigational product). A mild mention of paresthesia does not render severe peripheral neuropathy expected.",
    guidelineReference: "ICH E2A Section II.C (Expectedness of an ADR)",
    recruiterInsight:
      "Interviewers look for candidates who understand that expectedness is determined strictly by the Reference Safety Information (RSI), not physician intuition.",
    whatToStudy: "Assessment of expectedness against Investigator Brochure (IB) and Summary of Product Characteristics (SmPC).",
  },

  // ── 2. ICSR INTAKE & VALIDITY (Q6 - Q10) ──────────────────────────────────────
  {
    id: "dsa_q6",
    number: 6,
    competency: "icsr_validity",
    competencyTitle: "ICSR Intake & Validity",
    topic: "The 4 Mandatory Minimum Elements of a Valid ICSR",
    scenario:
      "A safety associate receives an unsolicited intake report stating: 'Dr. A. Sharma (Cardiologist, Apollo Hospital Hyderabad) reported that a patient prescribed Tab Vasotec 10mg developed severe angioedema with lip swelling.' No patient initials, age, or date of birth are mentioned.",
    prompt:
      "Under ICH E2D and GVP Module VI, does this report meet the minimum criteria for a valid Individual Case Safety Report (ICSR)?",
    options: [
      {
        id: "A",
        text: "Yes, because an identifiable patient does not require full name or age; confirmation of an individual treated patient by an identifiable healthcare professional suffices for initial validity.",
      },
      {
        id: "B",
        text: "No, because without exact patient initials and numerical age, the safety database will reject book-in as invalid.",
      },
      {
        id: "C",
        text: "No, because the hospital ward admission number and drug batch number are legally mandatory minimum criteria.",
      },
      {
        id: "D",
        text: "Yes, but only if the physician signs a notarized physical affidavit within 24 hours of transmission.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Under ICH E2D Section 2.2 and GVP Module VI Section VI.B.2, the 4 minimum criteria are: (1) an identifiable patient, (2) an identifiable reporter, (3) at least one suspect product, and (4) at least one adverse event. For patient identifiability, any evidence of an individual patient (e.g., initials, age, sex, or simply that a specific patient was treated by a physician) suffices. Full name or birth date is not required.",
    guidelineReference: "ICH E2D Section 2.2 & EMA GVP Module VI Section VI.B.2",
    recruiterInsight:
      "Recruiters test if you know the true legal threshold of patient identifiability. Rejecting cases for lack of initials is a common rookie error.",
    whatToStudy: "ICH E2D 4 minimum validity criteria: patient, reporter, suspect product, adverse event.",
  },
  {
    id: "dsa_q7",
    number: 7,
    competency: "icsr_validity",
    competencyTitle: "ICSR Intake & Validity",
    topic: "Patient Identifiability in Aggregate Case Intakes",
    scenario:
      "A sales representative sends an email to the safety department: 'During my hospital visit today, several physicians told me that lots of patients in their clinics are getting nausea after taking our new antibiotic.' No specific patient, clinic name, or case details are provided.",
    prompt:
      "How should the drug safety triage desk handle this intake report under global regulatory standards?",
    options: [
      {
        id: "A",
        text: "Book in 10 separate individual ICSRs in the safety database to represent 'lots of patients' and mark them expedited.",
      },
      {
        id: "B",
        text: "Immediately issue an expedited safety alert to the national regulatory authority for batch contamination.",
      },
      {
        id: "C",
        text: "Classify it as an invalid ICSR due to lack of an identifiable individual patient, log it in the aggregate tracking log, and initiate targeted follow-up with the sales representative.",
      },
      {
        id: "D",
        text: "Permanently delete the email because hearsay reports from company sales representatives have no legal standing.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "GVP Module VI states that reports mentioning 'several' or 'lots of' patients without individual differentiation are invalid as ICSRs due to the absence of identifiable patients. They must not be entered as speculative individual cases; instead, they are tracked and targeted follow-up is initiated.",
    guidelineReference: "EMA GVP Module VI Section VI.B.2 (Identifiable Patient)",
    recruiterInsight:
      "Interviewers at IQVIA and Accenture look for candidates who know how to protect the safety database from garbage data while maintaining audit trails.",
    whatToStudy: "Handling aggregate/unspecified patient numbers and follow-up query rules under GVP VI.",
  },
  {
    id: "dsa_q8",
    number: 8,
    competency: "icsr_validity",
    competencyTitle: "ICSR Intake & Validity",
    topic: "Social Media & Digital Health Source Identifiability",
    scenario:
      "On the pharmaceutical company's official public Facebook product page, an account named '@health_warrior_99' posts: 'Your arthritis cream caused a chemical burn on my mother's knee! Worst product ever.' The profile has no real name or contact info.",
    prompt:
      "What is the correct pharmacovigilance procedure for digital and social media screening under EMA GVP Module VI?",
    options: [
      {
        id: "A",
        text: "Ignore the post completely because anonymous social media comments are excluded from global regulatory surveillance.",
      },
      {
        id: "B",
        text: "Immediately book in an expedited serious ICSR and list the Facebook handle as the primary physician.",
      },
      {
        id: "C",
        text: "Delete the post immediately to prevent regulatory inspectors from seeing negative public sentiment.",
      },
      {
        id: "D",
        text: "Recognize that company-sponsored digital media must be screened; attempt to establish contact via direct message to obtain identifiable reporter/patient details, and document the follow-up attempt.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under EMA GVP Module VI Section VI.B.1.1.2, marketing authorization holders must regularly screen company-sponsored or owned digital media. If an adverse event is reported with an unverified handle, reasonable attempts must be made to contact the user to obtain valid reporting criteria, with all attempts documented.",
    guidelineReference: "EMA GVP Module VI Section VI.B.1.1.2 (Digital Media)",
    recruiterInsight:
      "Digital media PV is a major modern interview theme at Cognizant, Parexel, and Accenture, especially for post-marketing consumer desks.",
    whatToStudy: "GVP Module VI rules for screening digital and social media channels.",
  },
  {
    id: "dsa_q9",
    number: 9,
    competency: "icsr_validity",
    competencyTitle: "ICSR Intake & Validity",
    topic: "Scientific Literature Screening & Author Identifiability",
    scenario:
      "A weekly literature search retrieves a published case report in the Indian Journal of Pharmacology describing 'A 28-year-old female who developed acute pancreatitis after initiation of Drug Z.' The article lists authors Dr. R. K. Sen and Dr. M. Iyer from AIIMS New Delhi.",
    prompt:
      "How is the reporter identified in this published medical literature case for ICSR processing?",
    options: [
      {
        id: "A",
        text: "The journal editor-in-chief is considered the primary reporter for safety database entry.",
      },
      {
        id: "B",
        text: "The primary author (or corresponding author) of the published article is documented as the identifiable reporter.",
      },
      {
        id: "C",
        text: "Literature cases are invalid by definition unless the patient personally contacts the marketing authorization holder.",
      },
      {
        id: "D",
        text: "The medical literature screening vendor who ran the PubMed query is documented as the legal healthcare reporter.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "Under GVP Module VI Section VI.C.2, for adverse reactions described in scientific literature, the author(s) of the publication serve as the identifiable reporter(s). The publication details (journal name, year, volume, page numbers) serve as source documentation.",
    guidelineReference: "EMA GVP Module VI Section VI.C.2 (Scientific Literature)",
    recruiterInsight:
      "Interviewers check if you understand how global literature screening (PubMed, Embase) translates into standard ICSRs.",
    whatToStudy: "Literature screening procedures, author as reporter, and duplicate avoidance in literature cases.",
  },
  {
    id: "dsa_q10",
    number: 10,
    competency: "icsr_validity",
    competencyTitle: "ICSR Intake & Validity",
    topic: "Product Quality Complaints (PQC) with Associated Adverse Events",
    scenario:
      "A consumer calls customer care: 'The tablets in bottle Lot #B204 were discolored and smelled like vinegar. After taking one tablet, my husband had severe vomiting and stomach cramps.' The complaint is routed to Drug Safety.",
    prompt:
      "What is the required workflow when an intake report contains both a Product Quality Complaint (PQC) and an Adverse Event (AE)?",
    options: [
      {
        id: "A",
        text: "Process an ICSR for the adverse event in the safety database, cross-reference the PQC tracking number, and simultaneously notify Quality Assurance (QA) for batch investigation.",
      },
      {
        id: "B",
        text: "Hand the report entirely to Quality Assurance and take no safety action until QA completes its chemical batch analysis in 30 days.",
      },
      {
        id: "C",
        text: "Reject the adverse event because quality defects automatically invalidate clinical causality.",
      },
      {
        id: "D",
        text: "Log only the quality complaint in the QA database and delete the adverse event narrative to prevent dual reporting.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Whenever a Product Quality Complaint is accompanied by an adverse event, dual workflows are triggered: Drug Safety processes the valid ICSR under standard regulatory timelines, cross-referencing the PQC ID, while QA investigates the product defect. Safety clocks cannot be paused waiting for QA results.",
    guidelineReference: "EMA GVP Module VI & FDA 21 CFR 211.198",
    recruiterInsight:
      "A classic cross-functional dilemma question used to test whether freshers understand that regulatory safety clocks never pause for internal laboratory checks.",
    whatToStudy: "Interface between Pharmacovigilance and Quality Assurance (PQC with AE).",
  },

  // ── 3. DAY 0 REGULATORY CLOCKS (Q11 - Q15) ────────────────────────────────────
  {
    id: "dsa_q11",
    number: 11,
    competency: "day0_clocks",
    competencyTitle: "Day 0 Regulatory Clocks",
    topic: "First Knowledge Date Across Global Affiliates & Vendors",
    scenario:
      "A market research agency contracted by a pharmaceutical company conducts patient surveys. On Thursday, October 10, an agency interviewer records a serious unexpected adverse event with all 4 valid elements. The agency faxes the report to the pharma company's safety department on Monday, October 14.",
    prompt:
      "Under ICH and GVP guidelines, what is Day 0 for calculating the regulatory expedited reporting timeline?",
    options: [
      {
        id: "A",
        text: "Monday, October 14, because that is when the drug safety team opened and logged the fax.",
      },
      {
        id: "B",
        text: "Tuesday, October 15, allowing 24 hours of initial technical triage review.",
      },
      {
        id: "C",
        text: "Thursday, October 10, because Day 0 is the date any personnel or contracted third-party acting on behalf of the company first receives the 4 valid criteria.",
      },
      {
        id: "D",
        text: "October 31, at the end of the monthly contractual vendor invoicing cycle.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "Under GVP Module VI Section VI.B.7, Day 0 is the calendar date on which any personnel of the marketing authorization holder—including sales reps, medical science liaisons, or contracted vendors (such as market research agencies)—first receives the minimum information. Vendor delays do not shift Day 0.",
    guidelineReference: "EMA GVP Module VI Section VI.B.7 (Day 0 Definition)",
    recruiterInsight:
      "Recruiters at Cognizant, Parexel, and Novartis use this exact case scenario to test if candidates understand contractual compliance and vendor liability.",
    whatToStudy: "Day 0 definition: first knowledge by company or contracted third party.",
  },
  {
    id: "dsa_q12",
    number: 12,
    competency: "day0_clocks",
    competencyTitle: "Day 0 Regulatory Clocks",
    topic: "Safety Data Exchange Agreements (SDEA) & Commercial Partners",
    scenario:
      "Company Alpha co-markets a drug with Company Beta under a Safety Data Exchange Agreement (SDEA). Company Beta receives a fatal SUSAR report on Friday evening. Beta transfers the report to Company Alpha on Tuesday morning.",
    prompt:
      "For Company Alpha's regulatory submission clock to health authorities, when did the clock start?",
    options: [
      {
        id: "A",
        text: "When Company Alpha's Qualified Person for Pharmacovigilance (QPPV) formally approves the narrative.",
      },
      {
        id: "B",
        text: "On Tuesday morning when Company Alpha received the electronic transmission from Beta.",
      },
      {
        id: "C",
        text: "On the following Monday, skipping the intervening weekend and public holiday.",
      },
      {
        id: "D",
        text: "On Friday evening when Company Beta (as an official contractual partner) first received the minimum information.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under GVP Module VI, receipt of a valid ICSR by a contractual partner or licensee counts as first receipt by the MAH. The regulatory clock begins on the date the partner received it, which is why SDEAs mandate partner transfers within strict 24–48 hour windows.",
    guidelineReference: "EMA GVP Module VI Section VI.B.7 & GVP Module I",
    recruiterInsight:
      "Senior interviewers test this to check if candidates understand why late partner transfers trigger high-severity audit findings in pharmacovigilance inspections.",
    whatToStudy: "Safety Data Exchange Agreements (SDEA) and partner reporting timelines.",
  },
  {
    id: "dsa_q13",
    number: 13,
    competency: "day0_clocks",
    competencyTitle: "Day 0 Regulatory Clocks",
    topic: "Calendar Days vs. Business Days During Weekends & Holidays",
    scenario:
      "A fatal unexpected adverse event report arrives via email in the safety inbox on Friday at 11:30 PM before a 3-day holiday weekend. The safety office reopens on Tuesday morning.",
    prompt:
      "How are regulatory reporting clocks calculated when safety cases arrive on weekends or national holidays?",
    options: [
      {
        id: "A",
        text: "All international regulatory clocks pause on weekends and public holidays, so the clock starts Tuesday morning.",
      },
      {
        id: "B",
        text: "Regulatory expedited reporting timelines (such as 7-day or 15-day clocks) are strictly based on calendar days, not business days; Saturday is Day 1 regardless of office hours.",
      },
      {
        id: "C",
        text: "Regulatory clocks only count days when the stock exchange and commercial banks are open.",
      },
      {
        id: "D",
        text: "The clock starts only after the email server administrator logs a digital read-receipt.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "ICH and health authorities worldwide (FDA, EMA, MHRA, CDSCO) calculate all expedited reporting deadlines in calendar days. Weekends, office closures, and public holidays count against the 7-day and 15-day clocks without exception.",
    guidelineReference: "ICH E2A Section III.A & EMA GVP Module VI",
    recruiterInsight:
      "Confusing calendar days with working days is an automatic disqualifier in technical interviews at IQVIA and Cognizant.",
    whatToStudy: "Calendar day calculations vs business days in global pharmacovigilance.",
  },
  {
    id: "dsa_q14",
    number: 14,
    competency: "day0_clocks",
    competencyTitle: "Day 0 Regulatory Clocks",
    topic: "Day 0 Reset on Significant Follow-Up Information",
    scenario:
      "A non-serious case of mild skin rash was booked in on March 1 (Day 0). On March 20, the treating physician faxes a follow-up letter stating the patient developed Stevens-Johnson Syndrome (SJS), was admitted to the ICU, and is in critical condition.",
    prompt:
      "What happens to the regulatory reporting clock upon receipt of this significant follow-up information?",
    options: [
      {
        id: "A",
        text: "March 20 becomes the new Day 0 for an expedited 15-day serious unexpected reporting clock, because the follow-up upgraded the case from non-serious to serious.",
      },
      {
        id: "B",
        text: "The case is overdue and marked as a major compliance breach because 15 days have already elapsed since March 1.",
      },
      {
        id: "C",
        text: "Follow-up information never changes regulatory clocks; the case remains classified under the original non-serious March 1 timeline.",
      },
      {
        id: "D",
        text: "A completely new case with a new patient ID must be created, and the March 1 case must be deleted from the database.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Under GVP Module VI Section VI.B.7.2, when significant follow-up information is received that alters the medical assessment (e.g., upgrading a case from non-serious to serious or unexpected), the date of receipt of that follow-up becomes the new Day 0 for expedited reporting.",
    guidelineReference: "EMA GVP Module VI Section VI.B.7.2 (Follow-up Information)",
    recruiterInsight:
      "Interviewers test whether candidates know the difference between routine administrative follow-up (which does not reset Day 0) and significant clinical follow-up.",
    whatToStudy: "Significant follow-up vs administrative follow-up, Day 0 reset rules.",
  },
  {
    id: "dsa_q15",
    number: 15,
    competency: "day0_clocks",
    competencyTitle: "Day 0 Regulatory Clocks",
    topic: "International Timezone Crossing & Global Regulatory Midnight",
    scenario:
      "A serious adverse reaction occurs in Tokyo (JST) on Monday at 3:00 PM and is reported to the local Japanese affiliate. The global pharmacovigilance database hub is located in New Jersey, USA (EST), where it is still Sunday night.",
    prompt:
      "What date should be documented as Day 0 in the global safety database (Argus / ArisG)?",
    options: [
      {
        id: "A",
        text: "Always Sunday night, because the central database server clock in the USA governs all regulatory filings.",
      },
      {
        id: "B",
        text: "The date of the nearest international date line crossing.",
      },
      {
        id: "C",
        text: "Monday, because Day 0 is established by the local calendar date of the receiving affiliate/entity, converted to local health authority regulatory requirements.",
      },
      {
        id: "D",
        text: "The date must be rounded up to Wednesday to account for global server latency.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "Regulatory guidelines specify that Day 0 is determined by the local date on which the initial entity received the report. In global safety databases, local receipt dates and central receipt dates are tracked separately to comply with local health authority filing deadlines.",
    guidelineReference: "ICH E2B(R3) Data Elements & GVP Module VI",
    recruiterInsight:
      "Multinational delivery hubs in Hyderabad and Bangalore operate on global client accounts across US, EU, and Japan timezones; this checks timezone discipline.",
    whatToStudy: "Local receipt date vs central receipt date in Oracle Argus / ARISg.",
  },

  // ── 4. SERIOUSNESS CRITERIA & EXPEDITED TIMELINES (Q16 - Q20) ─────────────────
  {
    id: "dsa_q16",
    number: 16,
    competency: "seriousness_expedited",
    competencyTitle: "Seriousness & Expedited Timelines",
    topic: "The 6 ICH E2A Regulatory Seriousness Criteria",
    scenario:
      "A 32-year-old female patient taking an oral antidiabetic drug develops severe hypoglycemia, becomes unconscious, and is treated by paramedics at home with intravenous dextrose. She regains consciousness and declines hospital transport.",
    prompt:
      "Under ICH E2A and GVP Module VI, why does this case qualify as a serious adverse event despite no hospital admission taking place?",
    options: [
      {
        id: "A",
        text: "It is non-serious because hospital admission was declined and the patient fully recovered at home.",
      },
      {
        id: "B",
        text: "It is serious only if the paramedics were registered physicians licensed in that district.",
      },
      {
        id: "C",
        text: "It is serious only if the blood glucose meter serial number is documented in the safety database.",
      },
      {
        id: "D",
        text: "It meets the criteria for 'Life-Threatening' or a 'Medically Important Event' requiring medical intervention to prevent permanent impairment or death.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under ICH E2A Section II.B, the 6 seriousness criteria are: (1) Death, (2) Life-threatening, (3) Inpatient hospitalization or prolongation of existing hospitalization, (4) Persistent or significant disability/incapacity, (5) Congenital anomaly/birth defect, and (6) Other medically important event requiring intervention to prevent one of the above. Profound hypoglycemia with unconsciousness is life-threatening/medically important.",
    guidelineReference: "ICH E2A Section II.B (Seriousness Criteria)",
    recruiterInsight:
      "Candidates who think hospitalization is required for seriousness fail this question. Recruiters specifically test the 6th criterion (Medically Important Event).",
    whatToStudy: "The 6 ICH E2A seriousness criteria and Medically Important Event definitions.",
  },
  {
    id: "dsa_q17",
    number: 17,
    competency: "seriousness_expedited",
    competencyTitle: "Seriousness & Expedited Timelines",
    topic: "Expedited Reporting Timeline for Fatal/Life-Threatening SUSARs",
    scenario:
      "In an ongoing Phase II clinical investigation of an investigational monoclonal antibody, a trial subject suffers sudden cardiac arrest and dies. The investigator determines there is a reasonable possibility the investigational product caused the event. Cardiac arrest is not listed in the current Investigator's Brochure.",
    prompt:
      "Under ICH E2A Section III.A, what is the mandatory regulatory timeline for the sponsor to file the initial expedited safety report to health authorities?",
    options: [
      {
        id: "A",
        text: "Within 15 calendar days, which applies as the standard timeline for all serious unexpected reports.",
      },
      {
        id: "B",
        text: "Within 7 calendar days of first knowledge for the initial report, followed by a complete report within an additional 8 calendar days.",
      },
      {
        id: "C",
        text: "Within 24 hours via phone call, followed by formal notification in the annual DSUR.",
      },
      {
        id: "D",
        text: "Within 30 calendar days as part of quarterly clinical trial monitoring filings.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "ICH E2A Section III.A mandates that fatal or life-threatening unexpected ADRs (SUSARs) occurring in clinical investigations must be filed as an initial report as soon as possible, but no later than 7 calendar days after first knowledge, followed by a complete report within an additional 8 calendar days (7+8 rule). Non-fatal serious unexpected reactions have a 15-day timeline.",
    guidelineReference: "ICH E2A Section III.A (Fatal or Life-Threatening SUSARs)",
    recruiterInsight:
      "This is the #1 regulatory accuracy rule. Never teach 15 days as universal; recruiters disqualify candidates who state 15 days for a fatal clinical trial SUSAR.",
    whatToStudy: "ICH E2A Section III.A: 7-day clock for fatal/life-threatening SUSARs vs 15-day clock for non-fatal.",
  },
  {
    id: "dsa_q18",
    number: 18,
    competency: "seriousness_expedited",
    competencyTitle: "Seriousness & Expedited Timelines",
    topic: "Expedited Reporting for Non-Fatal Serious Unexpected ADRs",
    scenario:
      "A patient taking a commercial biologic drug experiences acute anaphylactic shock requiring emergency room admission and overnight hospitalization. Anaphylaxis is not listed in the approved SmPC.",
    prompt:
      "What is the standard global regulatory timeline for submitting this non-fatal, serious, unexpected post-marketing adverse drug reaction?",
    options: [
      {
        id: "A",
        text: "Within 15 calendar days from Day 0.",
      },
      {
        id: "B",
        text: "Within 7 calendar days from Day 0.",
      },
      {
        id: "C",
        text: "Within 30 calendar days from the patient's hospital discharge date.",
      },
      {
        id: "D",
        text: "Within 90 calendar days in the annual Periodic Safety Update Report (PSUR).",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Under ICH E2D and GVP Module VI, all serious, unexpected adverse drug reactions that are not fatal or life-threatening must be submitted as expedited ICSRs to regulatory authorities within 15 calendar days of Day 0.",
    guidelineReference: "ICH E2D Section 4.1 & EMA GVP Module VI",
    recruiterInsight:
      "Tests candidate ability to clearly distinguish the 15-day standard clock from the 7-day fatal/life-threatening clock.",
    whatToStudy: "15-day expedited reporting rules under ICH E2D and GVP Module VI.",
  },
  {
    id: "dsa_q19",
    number: 19,
    competency: "seriousness_expedited",
    competencyTitle: "Seriousness & Expedited Timelines",
    topic: "Medically Important Events (MIE / IME List)",
    scenario:
      "A 24-year-old female taking an oral contraceptive suffers an acute grand mal seizure for the first time in her life. She is seen in an outpatient clinic and prescribed anticonvulsants, but is not admitted overnight.",
    prompt:
      "Why must this case be evaluated as serious under the Medically Important Event (MIE) regulatory criterion?",
    options: [
      {
        id: "A",
        text: "It is non-serious because outpatient clinic visits never trigger regulatory seriousness.",
      },
      {
        id: "B",
        text: "It is serious only if the anticonvulsant medication was manufactured by the same pharmaceutical company.",
      },
      {
        id: "C",
        text: "Medical and scientific judgment dictates that a first-onset grand mal seizure is an important medical event that may jeopardize the patient and requires medical intervention to prevent permanent harm.",
      },
      {
        id: "D",
        text: "All female neurological conditions are automatically marked serious under ICH gender guidelines.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "ICH E2A Section II.B states that medical judgment must be exercised in deciding whether an adverse event is medically important. Events such as convulsions, bronchospasm, or blood dyscrasias that do not lead to hospital admission but require intervention to prevent a serious outcome meet the criterion for a Medically Important Event.",
    guidelineReference: "ICH E2A Section II.B & EudraVigilance Important Medical Event (IME) List",
    recruiterInsight:
      "Interviewers look for candidates who reference the EMA EudraVigilance IME (Important Medical Event) list.",
    whatToStudy: "EudraVigilance IME list and clinical judgment in medical importance.",
  },
  {
    id: "dsa_q20",
    number: 20,
    competency: "seriousness_expedited",
    competencyTitle: "Seriousness & Expedited Timelines",
    topic: "Non-Serious ICSR Handling & Periodic Aggregate Submission",
    scenario:
      "A patient taking a blood pressure medication reports mild dizziness that resolves when sitting down. The dizziness did not interfere with work or require medical treatment.",
    prompt:
      "How are non-serious adverse drug reactions submitted to health authorities under modern pharmacovigilance regulations?",
    options: [
      {
        id: "A",
        text: "They are discarded because regulatory authorities only review cases involving death or hospitalization.",
      },
      {
        id: "B",
        text: "They must be submitted individually within 7 calendar days as minor SUSARs.",
      },
      {
        id: "C",
        text: "They are held on local laptops until a regulatory inspection is announced.",
      },
      {
        id: "D",
        text: "They are processed in the safety database and submitted either in aggregate periodic reports (PBRER/PSUR) or electronically via E2B(R3) within regional non-serious timelines (e.g., 90 days in EU).",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Non-serious ADRs do not require expedited 7- or 15-day reporting. They are captured in safety databases and submitted either as part of Periodic Benefit-Risk Evaluation Reports (PBRER) / PSURs, or transmitted electronically within standard regional timelines (e.g., 90 days in the EU via E2B).",
    guidelineReference: "EMA GVP Module VI Section VI.C.1 & ICH E2C(R2)",
    recruiterInsight:
      "Ensures the candidate understands that non-serious cases are vital for signal detection and periodic aggregate reporting, not thrown away.",
    whatToStudy: "Handling of non-serious adverse reactions and aggregate periodic reporting (PBRER/PSUR).",
  },

  // ── 5. MEDDRA HIERARCHY & MSSO CODING RULES (Q21 - Q25) ───────────────────────
  {
    id: "dsa_q21",
    number: 21,
    competency: "meddra_coding",
    competencyTitle: "MedDRA Hierarchy & MSSO Rules",
    topic: "The 5-Level Structural Hierarchy of MedDRA",
    scenario:
      "During a technical screening at Cognizant Life Sciences, the interviewer writes five acronyms on a whiteboard: LLT, PT, HLT, HLGT, SOC, and asks the candidate to explain their relationship.",
    prompt:
      "What is the structural hierarchy of MedDRA from the most specific level to the broadest level?",
    options: [
      {
        id: "A",
        text: "SOC (System Organ Class) → HLGT → HLT → PT → LLT (Lowest Level Term).",
      },
      {
        id: "B",
        text: "LLT (Lowest Level Term) → PT (Preferred Term) → HLT (High Level Term) → HLGT (High Level Group Term) → SOC (System Organ Class).",
      },
      {
        id: "C",
        text: "PT → LLT → SOC → HLT → HLGT.",
      },
      {
        id: "D",
        text: "LLT → HLT → PT → HLGT → SOC.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "MedDRA has a strict 5-level hierarchy from most specific to broadest: (1) Lowest Level Term (LLT) - 80,000+ terms including synonyms and colloquialisms, (2) Preferred Term (PT) - distinct medical concept, (3) High Level Term (HLT), (4) High Level Group Term (HLGT), and (5) System Organ Class (SOC) - 27 anatomical/etiological groups.",
    guidelineReference: "MedDRA MSSO Introductory Guide v27.0 & ICH M1",
    recruiterInsight:
      "Every single PV recruiter asks the 5 levels of MedDRA. Confusing HLT and PT is an immediate interview disqualifier.",
    whatToStudy: "MedDRA 5-level hierarchy from LLT to SOC.",
  },
  {
    id: "dsa_q22",
    number: 22,
    competency: "meddra_coding",
    competencyTitle: "MedDRA Hierarchy & MSSO Rules",
    topic: "MSSO 'Diagnosis vs. Signs and Symptoms' Rule",
    scenario:
      "A hospital discharge summary states: 'Patient admitted with severe crushing substernal chest pain, diaphoresis, and shortness of breath. Confirmed diagnosis: Acute Myocardial Infarction.'",
    prompt:
      "Under official MedDRA Term Selection: Points to Consider (PTC) Section 1.3, how should the medical coder handle this verbatim report?",
    options: [
      {
        id: "A",
        text: "Code only the confirmed diagnosis: Acute Myocardial Infarction. Do not code chest pain, diaphoresis, or shortness of breath because they are characteristic signs and symptoms of the diagnosis.",
      },
      {
        id: "B",
        text: "Code all 4 individual terms separately (Chest pain, Diaphoresis, Dyspnea, Acute myocardial infarction) to ensure maximum safety signal coverage.",
      },
      {
        id: "C",
        text: "Code only Chest Pain because that was the chief complaint upon hospital admission.",
      },
      {
        id: "D",
        text: "Code Diaphoresis under Skin disorders and discard Acute Myocardial Infarction because it is a cardiology term.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "MSSO Points to Consider (PTC) Section 1.3 states that when a diagnosis is confirmed, code the diagnosis alone. Do not code individual signs and symptoms that are characteristic of the diagnosis, as doing so leads to artificial double-counting and signal distortion. Only signs/symptoms not characteristic of the diagnosis should be coded separately.",
    guidelineReference: "MedDRA MSSO Points to Consider (PTC) Section 1.3",
    recruiterInsight:
      "This is the golden rule of MedDRA coding. 90% of freshers fail this by coding every symptom. Demonstrating knowledge of PTC Section 1.3 proves real domain readiness.",
    whatToStudy: "MedDRA PTC Section 1.3: Definitive diagnosis vs provisional diagnosis vs symptoms.",
  },
  {
    id: "dsa_q23",
    number: 23,
    competency: "meddra_coding",
    competencyTitle: "MedDRA Hierarchy & MSSO Rules",
    topic: "Verbatim LLT Selection & Primary SOC Assignment",
    scenario:
      "A patient's relative reports that the patient suffered 'flu-like illness with chills'. In MedDRA, the verbatim maps directly to LLT 'Flu-like syndrome'.",
    prompt:
      "In MedDRA multi-axiality, which level is directly selected by the coder in the safety database, and what dictates the Primary SOC?",
    options: [
      {
        id: "A",
        text: "Coders manually select the SOC; the LLT is assigned automatically by the regulatory authority.",
      },
      {
        id: "B",
        text: "Coders select the HLT, and the database randomly assigns one of the 27 SOCs.",
      },
      {
        id: "C",
        text: "Coders always code to the Lowest Level Term (LLT) that represents the verbatim text; the database automatically links it to its unique PT and pre-defined Primary SOC.",
      },
      {
        id: "D",
        text: "The Primary SOC is chosen based on the treating physician's medical specialty.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "In pharmacovigilance safety databases, coding is always executed at the Lowest Level Term (LLT) level to preserve the reporter's verbatim meaning. Each LLT links to exactly one Preferred Term (PT). While a PT may belong to multiple secondary SOCs (multi-axiality), it has exactly one pre-defined Primary SOC assigned by the MSSO.",
    guidelineReference: "MedDRA MSSO Introductory Guide Section 2.2 & ICH M1",
    recruiterInsight:
      "Recruiters test if you know that data entry associates NEVER type or choose a PT directly; they select an LLT, which automatically maps upward.",
    whatToStudy: "LLT selection and MedDRA multi-axiality rules (Primary vs Secondary SOC).",
  },
  {
    id: "dsa_q24",
    number: 24,
    competency: "meddra_coding",
    competencyTitle: "MedDRA Hierarchy & MSSO Rules",
    topic: "Coding Surgical & Medical Procedures vs. Indication",
    scenario:
      "A case narrative reports: 'Patient with severe cholecystitis underwent laparoscopic cholecystectomy.'",
    prompt:
      "Under MSSO Points to Consider Section 1.15, how should surgical and medical procedures be coded in an ICSR?",
    options: [
      {
        id: "A",
        text: "Code only the surgical procedure 'Laparoscopic cholecystectomy' under Surgical and medical procedures SOC.",
      },
      {
        id: "B",
        text: "Reject the case because surgical operations are excluded from pharmacovigilance databases.",
      },
      {
        id: "C",
        text: "Code Cholecystectomy as an adverse reaction and classify the surgeon as a suspect medical product.",
      },
      {
        id: "D",
        text: "Code the medical condition (Cholecystitis) as the adverse event; code the surgical procedure (Laparoscopic cholecystectomy) under the treatment/procedure section unless the procedure itself is reported as an unexpected event.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "MSSO PTC Section 1.15 states that surgical and medical procedures should not be selected as the adverse reaction term if the underlying medical condition is known. The medical condition (Cholecystitis) is the adverse event; the surgery is documented as therapy/intervention.",
    guidelineReference: "MedDRA MSSO PTC Section 1.15 (Surgical and Medical Procedures)",
    recruiterInsight:
      "Interviewers check if candidates avoid miscoding treatments (like appendectomy or dialysis) as the disease event itself.",
    whatToStudy: "Coding procedures vs underlying conditions under MedDRA PTC Section 1.15.",
  },
  {
    id: "dsa_q25",
    number: 25,
    competency: "meddra_coding",
    competencyTitle: "MedDRA Hierarchy & MSSO Rules",
    topic: "Standardised MedDRA Queries (SMQ) Utility & Scope",
    scenario:
      "During signal detection at Novartis GCC Hyderabad, a safety scientist is assigned to run a quarterly search to detect potential drug-induced acute liver injury across thousands of global cases.",
    prompt:
      "What MedDRA tool is specifically designed to retrieve all validated cases relating to a complex medical syndrome across multiple SOCs?",
    options: [
      {
        id: "A",
        text: "A manual keyword search in Microsoft Excel using text wildcards.",
      },
      {
        id: "B",
        text: "A Standardised MedDRA Query (SMQ) for Drug Related Hepatic Disorders, combining Narrow scope (highly specific terms) and Broad scope (sensitive/precursor terms).",
      },
      {
        id: "C",
        text: "Filtering cases solely by the Gastrointestinal disorders System Organ Class.",
      },
      {
        id: "D",
        text: "Exporting only fatal cases where the reporter was a licensed gastroenterologist.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "Standardised MedDRA Queries (SMQs) are validated groupings of MedDRA terms (primarily PTs) across multiple SOCs designed to assist in signal detection and safety surveillance for specific medical concepts (e.g., Acute pancreatitis, Hepatic failure). SMQs feature 'Narrow' search (high specificity) and 'Broad' search (high sensitivity).",
    guidelineReference: "MedDRA MSSO SMQ Introductory Guide v27.0",
    recruiterInsight:
      "Novartis and IQVIA signal detection teams prize candidates who know what an SMQ is and understand the difference between Narrow and Broad queries.",
    whatToStudy: "Standardised MedDRA Queries (SMQs): structure, Narrow vs Broad search scope.",
  },

  // ── 6. SPECIAL SAFETY SITUATIONS (Q26 - Q30) ──────────────────────────────────
  {
    id: "dsa_q26",
    number: 26,
    competency: "special_situations",
    competencyTitle: "Special Safety Situations",
    topic: "Pregnancy Exposure Without Associated Adverse Reaction",
    scenario:
      "A 29-year-old female patient calls the medical information line: 'I just found out I am 6 weeks pregnant. I have been taking Drug K (Category X teratogen) for chronic psoriasis.' She reports no symptoms, and an initial ultrasound shows normal fetal heartbeat.",
    prompt:
      "Under EMA GVP Module VI (Section VI.C.6) and FDA post-marketing rules, how should this pregnancy report be handled?",
    options: [
      {
        id: "A",
        text: "Capture the case in the safety database as 'Pregnancy exposure without adverse reaction' for prospective follow-up until delivery; do not submit as an expedited serious ICSR unless an adverse outcome (e.g., congenital anomaly) occurs.",
      },
      {
        id: "B",
        text: "Immediately submit an expedited 7-day fatal SUSAR to regulatory authorities because Category X drugs cause birth defects.",
      },
      {
        id: "C",
        text: "Delete the record because pregnancy is a natural physiological state and not an adverse medical event.",
      },
      {
        id: "D",
        text: "Code the case as 'Abortion induced' and mark the case closed without further follow-up.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "GVP Module VI Section VI.C.6 states that pregnancy exposure without adverse outcome is not an adverse reaction per se, but must be captured in the safety database and prospectively tracked to collect pregnancy outcome data (normal delivery, miscarriage, congenital anomaly). It is not subject to expedited reporting unless an adverse reaction/congenital anomaly occurs.",
    guidelineReference: "EMA GVP Module VI Section VI.C.6 (Pregnancy Exposure)",
    recruiterInsight:
      "Interviewers at Parexel and Novartis love this question because freshers often panic and mark pregnancy as an immediate fatal/serious event.",
    whatToStudy: "Pregnancy exposure workflows, prospective pregnancy registries, and GVP VI.C.6.",
  },
  {
    id: "dsa_q27",
    number: 27,
    competency: "special_situations",
    competencyTitle: "Special Safety Situations",
    topic: "Lactation & Breastmilk Transfer of Medications",
    scenario:
      "A nursing mother taking a prescribed antidepressant reports that her 3-month-old infant has developed profound lethargy and poor feeding since she started the medication.",
    prompt:
      "How is this lactation exposure case processed in the safety database under international E2B(R3) guidelines?",
    options: [
      {
        id: "A",
        text: "Book the case with the mother as the patient because she swallowed the prescription tablets.",
      },
      {
        id: "B",
        text: "Invalidate the case because medicines taken by adults cannot be legally attributed to pediatric infants.",
      },
      {
        id: "C",
        text: "Book the case with the infant as the primary patient experiencing the adverse event (lethargy), document the mother as the parent through whom exposure occurred, and record the suspect drug and dosage taken by the mother.",
      },
      {
        id: "D",
        text: "Create two separate unrelated cases with different corporate IDs and no cross-referencing.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "Under ICH E2B(R3) and GVP Module VI, in cases of drug exposure via breast milk, the child/infant is the patient who suffered the adverse reaction. The mother is documented in the parent-child section as the individual who took the drug, with maternal dosing and lactation history documented.",
    guidelineReference: "ICH E2B(R3) Parent-Child Data Elements & GVP Module VI",
    recruiterInsight:
      "Parent-child case processing in Argus is a classic Round 2 interview topic. Testing who is the 'patient' reveals whether the candidate has actual workflow exposure.",
    whatToStudy: "Parent-child ICSR processing and lactation exposure under ICH E2B(R3).",
  },
  {
    id: "dsa_q28",
    number: 28,
    competency: "special_situations",
    competencyTitle: "Special Safety Situations",
    topic: "Off-Label Use & Intentional Medical Misuse",
    scenario:
      "A physician prescribes a registered diabetes drug (GLP-1 agonist) to a non-diabetic patient purely for cosmetic weight loss. The patient experiences severe acute pancreatitis requiring emergency hospitalization.",
    prompt:
      "How must this report be evaluated in terms of special safety situations and regulatory reporting?",
    options: [
      {
        id: "A",
        text: "The case is legally void because pharmaceutical manufacturers are never liable for physician off-label prescribing.",
      },
      {
        id: "B",
        text: "The case must be suppressed from regulatory submission because cosmetic use is not approved by the FDA or CDSCO.",
      },
      {
        id: "C",
        text: "Code only 'Off-label use' and omit 'Acute pancreatitis' because the physician violated prescribing guidelines.",
      },
      {
        id: "D",
        text: "The case must be processed as a valid serious unexpected ICSR under the 15-day expedited reporting timeline, coding both 'Acute pancreatitis' as the serious event and 'Off-label use' as a special situation term.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under GVP Module VI Section VI.C.6.2.2, off-label use accompanied by an adverse reaction must be collected and processed. If the adverse reaction meets seriousness criteria (hospitalization for pancreatitis), it is subject to standard expedited reporting (15 days), with both the clinical event and 'Off-label use' coded.",
    guidelineReference: "EMA GVP Module VI Section VI.C.6.2.2 (Off-label Use)",
    recruiterInsight:
      "Tests if candidates know that pharmaceutical companies must capture and report safety events even when the drug was used outside its approved label.",
    whatToStudy: "Off-label use, intentional misuse, and abuse reporting requirements.",
  },
  {
    id: "dsa_q29",
    number: 29,
    competency: "special_situations",
    competencyTitle: "Special Safety Situations",
    topic: "Medication Errors (Intercepted vs. Actual Harm)",
    scenario:
      "A hospital nurse notices that two ampoules of look-alike muscle relaxant and heparin were stored in adjacent bins. She caught the error before administering the drug to the patient. No drug was administered and no harm occurred.",
    prompt:
      "Under GVP Module VI, how are intercepted medication errors (near misses) without adverse reactions documented?",
    options: [
      {
        id: "A",
        text: "They are submitted within 24 hours as emergency fatal alerts to the national drug controller.",
      },
      {
        id: "B",
        text: "They are captured in the safety database as 'Intercepted medication error' to contribute to packaging/labeling risk evaluation, but are not expedited as serious ICSRs.",
      },
      {
        id: "C",
        text: "They are destroyed because near misses without physical injury have no place in clinical databases.",
      },
      {
        id: "D",
        text: "The nurse is reported to the police for clinical malpractice under medical law.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "GVP Module VI Section VI.C.6.2.1 mandates that medication errors—including intercepted errors and potential errors—must be tracked by marketing authorization holders to evaluate packaging, naming, and labeling safety signals. Intercepted errors without adverse outcomes do not require expedited reporting.",
    guidelineReference: "EMA GVP Module VI Section VI.C.6.2.1 (Medication Errors)",
    recruiterInsight:
      "Recruiters look for candidates who understand that pharmacovigilance monitors packaging and human-factor design to prevent future catastrophes.",
    whatToStudy: "Medication error categories: potential error, intercepted error, error with adverse reaction.",
  },
  {
    id: "dsa_q30",
    number: 30,
    competency: "special_situations",
    competencyTitle: "Special Safety Situations",
    topic: "Lack of Therapeutic Efficacy in Life-Threatening Diseases",
    scenario:
      "A hospitalized patient with severe Pseudomonas septicemia is treated with a broad-spectrum antibiotic. Despite compliance and standard dosage, the infection worsens and the patient develops septic shock. Microbial testing reveals the bacteria is fully susceptible in vitro to the antibiotic.",
    prompt:
      "Under global pharmacovigilance standards, how is 'Lack of Therapeutic Efficacy' treated when involving life-threatening therapies or vaccines?",
    options: [
      {
        id: "A",
        text: "It is treated as a reportable safety event because lack of efficacy for life-saving drugs (anti-infectives, vaccines, contraceptives) may represent batch failure, counterfeit medication, or emergent resistance.",
      },
      {
        id: "B",
        text: "Lack of efficacy is strictly an efficacy matter handled by clinical development and is never logged in pharmacovigilance databases.",
      },
      {
        id: "C",
        text: "It is automatically classified as patient non-compliance without further investigation.",
      },
      {
        id: "D",
        text: "The physician's license must be suspended before the case is entered into the database.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "Under GVP Module VI Section VI.C.6.2.3, reports of lack of therapeutic efficacy must be recorded and evaluated in pharmacovigilance, particularly for drugs used in life-threatening diseases, vaccines, and contraceptives, as they can indicate manufacturing defects, resistance, or counterfeits.",
    guidelineReference: "EMA GVP Module VI Section VI.C.6.2.3 (Lack of Efficacy)",
    recruiterInsight:
      "A classic trap question. Freshers often assume PV only tracks 'reactions', not understanding that 'failing to work' in life-threatening conditions is a critical safety issue.",
    whatToStudy: "Lack of therapeutic efficacy in critical medicines and vaccines.",
  },

  // ── 7. SBAR NARRATIVE WRITING & QUERIES (Q31 - Q35) ───────────────────────────
  {
    id: "dsa_q31",
    number: 31,
    competency: "narrative_queries",
    competencyTitle: "SBAR Narratives & Queries",
    topic: "Chronological Clinical Sequencing in SBAR Narratives",
    scenario:
      "A junior safety associate drafts an ICSR narrative by pasting raw physician notes verbatim: 'Patient died on Monday. Started Drug X 3 weeks ago. Past medical history hypertension. Lab values AST 400. Patient felt sick on Friday.'",
    prompt:
      "What is the industry-standard narrative structure required in pharmacovigilance under CIOMS IV and ICH E2B(R3)?",
    options: [
      {
        id: "A",
        text: "Random alphabetical ordering of medical terms to match the MedDRA index.",
      },
      {
        id: "B",
        text: "Writing exclusively in bullet points without complete English sentences.",
      },
      {
        id: "C",
        text: "A structured, chronological clinical narrative using SBAR: Demographics/Baseline → Medical History & Concomitant Meds → Suspect Drug Administration → Event Chronology/Symptoms → Diagnostics/Labs → Dechallenge/Rechallenge → Clinical Outcome.",
      },
      {
        id: "D",
        text: "Writing a fictional backstory of the patient's lifestyle before the clinical trial.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "CIOMS guidelines and ICH E2B(R3) require ICSR case narratives to follow a strict chronological presentation: patient demographics, relevant medical history, concomitant drugs, suspect drug administration (dose, dates, route), onset of adverse reaction, clinical management, laboratory workup, dechallenge, rechallenge, and final outcome.",
    guidelineReference: "CIOMS IV Guidelines on Case Narratives & ICH E2B(R3)",
    recruiterInsight:
      "During Round 2 and Round 3 at Cognizant and IQVIA, candidates are given raw doctor's notes and told to write a 150-word narrative. Poor sequencing is an instant tell of inexperience.",
    whatToStudy: "SBAR format for ICSR clinical case narratives.",
  },
  {
    id: "dsa_q32",
    number: 32,
    competency: "narrative_queries",
    competencyTitle: "SBAR Narratives & Queries",
    topic: "Dechallenge & Rechallenge Documentation Rules",
    scenario:
      "A case report states that a patient's jaundice resolved when the suspect drug was discontinued, but returned 2 weeks later when the patient resumed taking the drug on their own.",
    prompt:
      "How should the dechallenge and rechallenge actions be precisely articulated in the clinical narrative?",
    options: [
      {
        id: "A",
        text: "State that the patient was irresponsible and should be disqualified from future healthcare insurance.",
      },
      {
        id: "B",
        text: "Omit the rechallenge details because patient self-administration is considered unverified gossip.",
      },
      {
        id: "C",
        text: "State that dechallenge was negative because the drug was restarted.",
      },
      {
        id: "D",
        text: "Document positive dechallenge (abatement of jaundice following drug withdrawal) and positive rechallenge (recurrence of jaundice upon re-administration), supporting strong drug-event association.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Dechallenge is positive when the event abates or resolves after the drug is stopped. Rechallenge is positive when the event recurs after re-introduction of the drug. Accurately documenting positive dechallenge and rechallenge provides the strongest clinical evidence of causality in pharmacovigilance.",
    guidelineReference: "WHO-UMC Causality Assessment & CIOMS IV",
    recruiterInsight:
      "Interviewers check whether candidates use precise pharmacovigilance vocabulary (positive dechallenge, negative dechallenge, unassessable) rather than layman terms.",
    whatToStudy: "Dechallenge (positive vs negative) and rechallenge concepts in narrative writing.",
  },
  {
    id: "dsa_q33",
    number: 33,
    competency: "narrative_queries",
    competencyTitle: "SBAR Narratives & Queries",
    topic: "Laboratory Data & Relevant Negative Findings",
    scenario:
      "A patient taking an investigational anticoagulant experiences sudden hematuria. The investigator's report includes blood tests: 'Platelet count: 250,000/uL (Normal: 150,000–450,000), Prothrombin Time / INR: 5.2 (Elevated), Renal ultrasound: Normal.'",
    prompt:
      "Why must 'normal' or negative test results (such as normal platelet count and normal renal ultrasound) be included in the ICSR narrative?",
    options: [
      {
        id: "A",
        text: "They are only included if the laboratory technician signs an affidavit under oath.",
      },
      {
        id: "B",
        text: "Relevant negative findings rule out alternative etiologies (e.g., thrombocytopenia or structural kidney pathology), proving that the bleeding is coagulopathy-related.",
      },
      {
        id: "C",
        text: "Normal values are mandated by regulatory agencies solely to fill empty data fields in the E2B transmission file.",
      },
      {
        id: "D",
        text: "Normal values should be deleted because pharmacovigilance is only interested in abnormal pathological numbers.",
      },
    ],
    correctOptionId: "B",
    explanation:
      "In medical case assessment, 'relevant negative' findings are just as critical as abnormal findings. Documenting normal platelets rules out thrombocytopenia, and a normal renal ultrasound rules out renal stones or structural tumors, directing medical reviewers to the suspect anticoagulant.",
    guidelineReference: "CIOMS IV Narrative Writing Principles & ICH E2D",
    recruiterInsight:
      "Senior medical review leads test if candidates know why 'negative' labs matter. Freshers who delete normal labs demonstrate weak clinical diagnostic judgment.",
    whatToStudy: "Inclusion of relevant negative findings and laboratory reference ranges in narratives.",
  },
  {
    id: "dsa_q34",
    number: 34,
    competency: "narrative_queries",
    competencyTitle: "SBAR Narratives & Queries",
    topic: "Targeted Follow-Up Query Generation",
    scenario:
      "An initial serious report of acute liver injury from an identifiable physician is missing: (1) baseline liver function test results prior to drug start, (2) suspect drug batch/lot number, and (3) patient's favorite morning exercise routine.",
    prompt:
      "Under GVP Module VI follow-up rules, what principles govern the drafting of targeted follow-up queries to healthcare professionals?",
    options: [
      {
        id: "A",
        text: "Queries must be concise, targeted, clinically relevant, and non-burdensome, seeking only essential missing clinical data (baseline LFTs, batch number) while omitting extraneous lifestyle trivia.",
      },
      {
        id: "B",
        text: "Send a 12-page standardized hospital questionnaire with 150 generic questions to ensure no possible variable is missed.",
      },
      {
        id: "C",
        text: "Never send follow-up queries to physicians because healthcare professionals are too busy to respond to pharmaceutical companies.",
      },
      {
        id: "D",
        text: "Demand that the physician send the patient's entire original lifetime medical record under threat of legal action.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "GVP Module VI Section VI.B.7.1 emphasizes that follow-up requests must be targeted, polite, and prioritize critical medical elements (seriousness outcome, causality, baseline labs, batch numbers, concomitant drugs). Overwhelming reporters with irrelevant forms results in query abandonment.",
    guidelineReference: "EMA GVP Module VI Section VI.B.7.1 (Follow-up Principles)",
    recruiterInsight:
      "Interviewers test whether candidates can write targeted, respectful queries without irritating treating physicians.",
    whatToStudy: "Targeted follow-up query generation and reporter communication ethics.",
  },
  {
    id: "dsa_q35",
    number: 35,
    competency: "narrative_queries",
    competencyTitle: "SBAR Narratives & Queries",
    topic: "Concomitant Therapy vs. Medical History Differentiation",
    scenario:
      "A patient had a coronary artery bypass graft (CABG) in 2018 and has been taking Aspirin 75mg daily since 2018. In 2024, she starts Drug M and develops severe gastric ulcer bleeding.",
    prompt:
      "How must CABG and Aspirin be structured and documented in the ICSR safety database?",
    options: [
      {
        id: "A",
        text: "Aspirin is coded as medical history; CABG is coded as a concomitant drug.",
      },
      {
        id: "B",
        text: "Both CABG and Aspirin must be coded as suspect drugs alongside Drug M.",
      },
      {
        id: "C",
        text: "CABG is documented under Past Medical History; Aspirin is documented under Concomitant Medications (and evaluated as a potential secondary suspect or interacting medication).",
      },
      {
        id: "D",
        text: "Both terms are deleted because events occurring before 2024 are outside the regulatory audit window.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "Surgical operations and resolved past medical conditions belong in Past Medical History. Medications administered concurrently during the event timeline belong under Concomitant Medications. In gastric bleeding, concomitant NSAIDs/antiplatelets like Aspirin must be evaluated as co-suspects or risk factors.",
    guidelineReference: "ICH E2B(R3) Data Elements (B.1.7 & B.1.8)",
    recruiterInsight:
      "Field-level confusion between Past Medical History and Concomitant Medications is a frequent QC defect in BPO safety delivery centers.",
    whatToStudy: "E2B data structure: Past Medical History vs Concomitant Therapy.",
  },

  // ── 8. CAUSALITY & DISPUTE ESCALATION (Q36 - Q40) ─────────────────────────────
  {
    id: "dsa_q36",
    number: 36,
    competency: "causality_escalation",
    competencyTitle: "Causality & Dispute Escalation",
    topic: "WHO-UMC Causality Assessment Algorithm Categories",
    scenario:
      "A clinical case features: plausible temporal relationship to drug initiation, positive dechallenge, positive rechallenge, and no alternative explanation from underlying disease or other drugs.",
    prompt:
      "Under the official WHO-Uppsala Monitoring Centre (WHO-UMC) causality assessment criteria, what category should this event be assigned?",
    options: [
      {
        id: "A",
        text: "Unlikely.",
      },
      {
        id: "B",
        text: "Possible.",
      },
      {
        id: "C",
        text: "Conditional / Unclassified.",
      },
      {
        id: "D",
        text: "Certain.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under WHO-UMC causality criteria, 'Certain' requires: a clinical event or laboratory test abnormality with plausible time relationship to drug intake; cannot be explained by concurrent disease or other drugs; response to withdrawal (dechallenge) clinically plausible; event must be definitive pharmacologically/phenomenologically; and a satisfactory rechallenge procedure if necessary.",
    guidelineReference: "WHO-UMC System for Standardised Causality Assessment",
    recruiterInsight:
      "The WHO-UMC 6 categories (Certain, Probable, Possible, Unlikely, Conditional, Unassessable) are asked in almost every senior technical interview at Parexel and Novartis.",
    whatToStudy: "WHO-UMC 6 causality categories and definitions.",
  },
  {
    id: "dsa_q37",
    number: 37,
    competency: "causality_escalation",
    competencyTitle: "Causality & Dispute Escalation",
    topic: "Naranjo Algorithm Scoring in Multi-Drug Scenarios",
    scenario:
      "A safety team evaluates a drug-induced rash case using the Naranjo Adverse Drug Reaction Probability Scale. The calculated score is +7.",
    prompt:
      "How is a Naranjo score of +7 interpreted in pharmacovigilance causality assessment?",
    options: [
      {
        id: "A",
        text: "Doubtful (score ≤ 0).",
      },
      {
        id: "B",
        text: "Probable (score 5 to 8).",
      },
      {
        id: "C",
        text: "Definite (score ≥ 9).",
      },
      {
        id: "D",
        text: "Possible (score 1 to 4).",
      },
    ],
    correctOptionId: "B",
    explanation:
      "The Naranjo Algorithm has 10 questions scored from -1 to +2. The total score categories are: Definite (≥ 9), Probable (5 to 8), Possible (1 to 4), and Doubtful (≤ 0). A score of +7 falls squarely in the 'Probable' category.",
    guidelineReference: "Naranjo CA et al. Clin Pharmacol Ther. 1981;30(2):239-245",
    recruiterInsight:
      "Interviewers test if you know the difference between qualitative causality (WHO-UMC) and semi-quantitative questionnaire scoring (Naranjo Scale).",
    whatToStudy: "Naranjo Algorithm scoring intervals: Definite, Probable, Possible, Doubtful.",
  },
  {
    id: "dsa_q38",
    number: 38,
    competency: "causality_escalation",
    competencyTitle: "Causality & Dispute Escalation",
    topic: "Resolving Investigator vs. Sponsor Causality Disagreements",
    scenario:
      "In a clinical trial, a subject develops acute pancreatitis. The clinical investigator marks causality as 'Unrelated - Due to alcohol history'. However, the pharmaceutical sponsor's clinical safety physician reviews the data and determines there is a reasonable possibility the study drug caused the pancreatitis.",
    prompt:
      "Under ICH E2A guidelines, how must this causality conflict be handled for expedited regulatory submission?",
    options: [
      {
        id: "A",
        text: "Under ICH E2A Section III.A, if either the investigator OR the sponsor believes there is a reasonable possibility of a causal relationship, the case is considered related and must be expedited as a SUSAR.",
      },
      {
        id: "B",
        text: "The investigator's opinion always legally overrides the sponsor; therefore, the case is suppressed as non-related.",
      },
      {
        id: "C",
        text: "The sponsor must fire the investigator and remove all patient data from the clinical trial record.",
      },
      {
        id: "D",
        text: "The case is delayed until the trial is completed and unblinded 2 years later.",
      },
    ],
    correctOptionId: "A",
    explanation:
      "ICH E2A Section III.A explicitly states: 'Usually, causality assessment is made by the investigator... However, if the sponsor does not concur with the investigator's assessment, both the opinions of the investigator and the sponsor should be reported. For the purposes of reporting, if either considers the event related, it must be reported.'",
    guidelineReference: "ICH E2A Section III.A (Causality Assessment Standards)",
    recruiterInsight:
      "A premier interview question at Novartis and Parexel. Freshers think the doctor's word is final; industry pros know the 'either-considers-related' regulatory rule.",
    whatToStudy: "ICH E2A rules on handling divergent causality assessments.",
  },
  {
    id: "dsa_q39",
    number: 39,
    competency: "causality_escalation",
    competencyTitle: "Causality & Dispute Escalation",
    topic: "Unblinding SUSARs in Double-Blind Clinical Trials",
    scenario:
      "A fatal SUSAR occurs in a double-blind, randomized, placebo-controlled trial. The protocol specifies that investigators and clinical study team members must remain blinded to protect trial integrity.",
    prompt:
      "How is unblinding handled for expedited reporting to regulatory authorities under ICH E2A?",
    options: [
      {
        id: "A",
        text: "The entire clinical trial must be halted and all patients unblinded simultaneously.",
      },
      {
        id: "B",
        text: "The case is reported as blinded without ever identifying whether the patient took active drug or placebo.",
      },
      {
        id: "C",
        text: "The patient's treatment assignment is unblinded only for the designated safety/regulatory submission team; the investigator and clinical trial operational team remain blinded to maintain study integrity.",
      },
      {
        id: "D",
        text: "Only the hospital pharmacist is allowed to see the code, and no report is sent to the health authority.",
      },
    ],
    correctOptionId: "C",
    explanation:
      "ICH E2A Section III.C states that when a serious unexpected event occurs in a blinded study, the sponsor must break the blind for that individual subject before submitting the SUSAR to health authorities. However, blind maintenance is enforced: blinding is broken only for designated safety personnel, while investigators and trial teams remain blinded.",
    guidelineReference: "ICH E2A Section III.C (Managing Blinded Therapy)",
    recruiterInsight:
      "Interviewers check whether candidates know that regulatory authorities will not accept a blind SUSAR if unblinding reveals the patient received placebo.",
    whatToStudy: "Unblinding procedures in clinical trial safety reporting (ICH E2A Section III.C).",
  },
  {
    id: "dsa_q40",
    number: 40,
    competency: "causality_escalation",
    competencyTitle: "Causality & Dispute Escalation",
    topic: "Escalation Protocols & Urgent Safety Restrictions (USR)",
    scenario:
      "During routine aggregate surveillance, a drug safety associate notices an unexpected clustering of severe aplastic anemia cases associated with a newly launched antibiotic across 4 global markets.",
    prompt:
      "What is the immediate professional responsibility and escalation path for the safety team?",
    options: [
      {
        id: "A",
        text: "Wait 12 months for the next scheduled Periodic Safety Update Report (PSUR) before mentioning the cases.",
      },
      {
        id: "B",
        text: "Leak the data to social media and news organizations to alert the general public.",
      },
      {
        id: "C",
        text: "Contact prescribers directly without management knowledge to tell them to cease writing prescriptions.",
      },
      {
        id: "D",
        text: "Immediately escalate the safety signal to the Safety Management Committee and Qualified Person for Pharmacovigilance (QPPV) to initiate an Urgent Safety Restriction (USR), trigger root-cause analysis, and communicate with health authorities.",
      },
    ],
    correctOptionId: "D",
    explanation:
      "Under GVP Module IX (Signal Management) and GVP Module I, when an emergent safety signal with significant public health risk is detected, immediate escalation to the Safety Governance Committee and QPPV is mandated. This may trigger an Urgent Safety Restriction (USR), Dear Healthcare Professional Letters (DHPC), and label revisions.",
    guidelineReference: "EMA GVP Module IX (Signal Management) & GVP Module I",
    recruiterInsight:
      "Senior managers ask this to evaluate governance awareness, compliance escalation pathways, and professional ethical maturity.",
    whatToStudy: "Signal escalation pathways, QPPV responsibilities, and Urgent Safety Restrictions (USR).",
  },
];

export interface DsaDiagnosticResult {
  totalScore: number; // 0-100 percentage
  totalCorrect: number; // 0-40
  totalQuestions: number; // 40
  benchmarkStatus: "cleared" | "borderline" | "remediation";
  benchmarkLabel: string;
  nationalAverageBenchmark: number; // 54%
  competencyBreakdown: Record<
    DsaCompetencyKey,
    {
      title: string;
      score: number; // percentage
      correct: number;
      total: number;
      needsImprovement: boolean;
    }
  >;
  questionReviews: Array<{
    id: string;
    number: number;
    competency: DsaCompetencyKey;
    competencyTitle: string;
    topic: string;
    scenario: string;
    prompt: string;
    selectedOptionId: "A" | "B" | "C" | "D" | null;
    selectedOptionText: string;
    correctOptionId: "A" | "B" | "C" | "D";
    correctOptionText: string;
    isCorrect: boolean;
    explanation: string;
    guidelineReference: string;
    recruiterInsight: string;
    whatToStudy: string;
  }>;
  topGaps: string[];
}

export function scoreDsaDiagnostic(
  answers: Record<string, string>,
): DsaDiagnosticResult {
  let correctCount = 0;
  const competencyTallies: Record<
    DsaCompetencyKey,
    { correct: number; total: number }
  > = {
    pv_fundamentals: { correct: 0, total: 0 },
    icsr_validity: { correct: 0, total: 0 },
    day0_clocks: { correct: 0, total: 0 },
    seriousness_expedited: { correct: 0, total: 0 },
    meddra_coding: { correct: 0, total: 0 },
    special_situations: { correct: 0, total: 0 },
    narrative_queries: { correct: 0, total: 0 },
    causality_escalation: { correct: 0, total: 0 },
  };

  const questionReviews = DRUG_SAFETY_DIAGNOSTIC_QUESTIONS.map((q) => {
    competencyTallies[q.competency].total += 1;
    const rawAnswer = answers[q.id];
    const selectedOption =
      q.options.find((o) => o.id === rawAnswer || o.text === rawAnswer) ?? null;
    const selectedId = selectedOption?.id ?? null;
    const isCorrect = selectedId === q.correctOptionId;

    if (isCorrect) {
      correctCount += 1;
      competencyTallies[q.competency].correct += 1;
    }

    const correctOption =
      q.options.find((o) => o.id === q.correctOptionId) ?? q.options[0];

    return {
      id: q.id,
      number: q.number,
      competency: q.competency,
      competencyTitle: q.competencyTitle,
      topic: q.topic,
      scenario: q.scenario,
      prompt: q.prompt,
      selectedOptionId: selectedId,
      selectedOptionText: selectedOption?.text ?? "Not Answered",
      correctOptionId: q.correctOptionId,
      correctOptionText: correctOption.text,
      isCorrect,
      explanation: q.explanation,
      guidelineReference: q.guidelineReference,
      recruiterInsight: q.recruiterInsight,
      whatToStudy: q.whatToStudy,
    };
  });

  const totalScore = Math.round(
    (correctCount / DRUG_SAFETY_DIAGNOSTIC_QUESTIONS.length) * 100,
  );

  let benchmarkStatus: "cleared" | "borderline" | "remediation" = "remediation";
  let benchmarkLabel = "Technical Remediation Required";
  if (totalScore >= 75) {
    benchmarkStatus = "cleared";
    benchmarkLabel = "Cleared Technical Interview Benchmark";
  } else if (totalScore >= 60) {
    benchmarkStatus = "borderline";
    benchmarkLabel = "Borderline Technical Clearance";
  }

  const competencyBreakdown: DsaDiagnosticResult["competencyBreakdown"] = {
    pv_fundamentals: {
      title: DSA_COMPETENCIES.pv_fundamentals.title,
      score: Math.round(
        (competencyTallies.pv_fundamentals.correct /
          competencyTallies.pv_fundamentals.total) *
          100,
      ),
      correct: competencyTallies.pv_fundamentals.correct,
      total: competencyTallies.pv_fundamentals.total,
      needsImprovement:
        competencyTallies.pv_fundamentals.correct <
        competencyTallies.pv_fundamentals.total,
    },
    icsr_validity: {
      title: DSA_COMPETENCIES.icsr_validity.title,
      score: Math.round(
        (competencyTallies.icsr_validity.correct /
          competencyTallies.icsr_validity.total) *
          100,
      ),
      correct: competencyTallies.icsr_validity.correct,
      total: competencyTallies.icsr_validity.total,
      needsImprovement:
        competencyTallies.icsr_validity.correct <
        competencyTallies.icsr_validity.total,
    },
    day0_clocks: {
      title: DSA_COMPETENCIES.day0_clocks.title,
      score: Math.round(
        (competencyTallies.day0_clocks.correct /
          competencyTallies.day0_clocks.total) *
          100,
      ),
      correct: competencyTallies.day0_clocks.correct,
      total: competencyTallies.day0_clocks.total,
      needsImprovement:
        competencyTallies.day0_clocks.correct <
        competencyTallies.day0_clocks.total,
    },
    seriousness_expedited: {
      title: DSA_COMPETENCIES.seriousness_expedited.title,
      score: Math.round(
        (competencyTallies.seriousness_expedited.correct /
          competencyTallies.seriousness_expedited.total) *
          100,
      ),
      correct: competencyTallies.seriousness_expedited.correct,
      total: competencyTallies.seriousness_expedited.total,
      needsImprovement:
        competencyTallies.seriousness_expedited.correct <
        competencyTallies.seriousness_expedited.total,
    },
    meddra_coding: {
      title: DSA_COMPETENCIES.meddra_coding.title,
      score: Math.round(
        (competencyTallies.meddra_coding.correct /
          competencyTallies.meddra_coding.total) *
          100,
      ),
      correct: competencyTallies.meddra_coding.correct,
      total: competencyTallies.meddra_coding.total,
      needsImprovement:
        competencyTallies.meddra_coding.correct <
        competencyTallies.meddra_coding.total,
    },
    special_situations: {
      title: DSA_COMPETENCIES.special_situations.title,
      score: Math.round(
        (competencyTallies.special_situations.correct /
          competencyTallies.special_situations.total) *
          100,
      ),
      correct: competencyTallies.special_situations.correct,
      total: competencyTallies.special_situations.total,
      needsImprovement:
        competencyTallies.special_situations.correct <
        competencyTallies.special_situations.total,
    },
    narrative_queries: {
      title: DSA_COMPETENCIES.narrative_queries.title,
      score: Math.round(
        (competencyTallies.narrative_queries.correct /
          competencyTallies.narrative_queries.total) *
          100,
      ),
      correct: competencyTallies.narrative_queries.correct,
      total: competencyTallies.narrative_queries.total,
      needsImprovement:
        competencyTallies.narrative_queries.correct <
        competencyTallies.narrative_queries.total,
    },
    causality_escalation: {
      title: DSA_COMPETENCIES.causality_escalation.title,
      score: Math.round(
        (competencyTallies.causality_escalation.correct /
          competencyTallies.causality_escalation.total) *
          100,
      ),
      correct: competencyTallies.causality_escalation.correct,
      total: competencyTallies.causality_escalation.total,
      needsImprovement:
        competencyTallies.causality_escalation.correct <
        competencyTallies.causality_escalation.total,
    },
  };

  // Top technical gaps derived from incorrect questions
  const topGaps = questionReviews
    .filter((q) => !q.isCorrect)
    .map((q) => q.whatToStudy)
    .slice(0, 4);

  return {
    totalScore,
    totalCorrect: correctCount,
    totalQuestions: DRUG_SAFETY_DIAGNOSTIC_QUESTIONS.length,
    benchmarkStatus,
    benchmarkLabel,
    nationalAverageBenchmark: 54, // Published fresher benchmark
    competencyBreakdown,
    questionReviews,
    topGaps:
      topGaps.length > 0
        ? topGaps
        : [
            "Advanced MedDRA SMQ Signal Surveillance",
            "PBRER Aggregate Safety Synthesis",
            "Investigator Brochure Reconciliation",
          ],
  };
}

/**
 * Converts the 40 DSA diagnostic questions into the assessment Question format
 * for the interactive assessment runner.
 */
export function getDrugSafetyAssessmentQuestions(): Question[] {
  return DRUG_SAFETY_DIAGNOSTIC_QUESTIONS.map((q) => ({
    id: q.id,
    kind: "scenario" as const,
    prompt: q.prompt,
    scenario: q.scenario,
    helper: `${q.competencyTitle} · Reference: ${q.guidelineReference}`,
    measures: q.topic,
    difficulty: "medium" as const,
    options: q.options.map((opt) => ({
      value: opt.id,
      label: opt.text,
      correct: opt.id === q.correctOptionId,
      reveals: q.explanation,
      weights: {
        compliance: opt.id === q.correctOptionId ? 3 : 0,
        detail: opt.id === q.correctOptionId ? 2 : 0,
        patient: opt.id === q.correctOptionId ? 2 : 0,
      },
    })),
  }));
}
