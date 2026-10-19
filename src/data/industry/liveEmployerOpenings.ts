export interface LiveEmployerOpening {
  company: string;
  shortName: string;
  tagline: string;
  brandColor: string;
  globalHq: string;
  annualFresherIntake: string;
  activeOpenings: {
    reqId: string;
    roleTitle: string;
    department: string;
    locations: string[];
    workModel: "Hybrid (3 Days Office)" | "Office (Security Zone)" | "Rotational Hybrid";
    experience: string;
    openPositions: number;
    salaryBand: string;
    hiringStatus: "Urgent Hiring Wave" | "Active Pipeline" | "Quarterly Batch Intake";
    postedDate: string;
    careersUrl: string;
  };
  eligibility: {
    degrees: string[];
    minMarks: string;
    eligibleBatches: string[];
    bondOrProbation: string;
  };
  requiredTools: {
    name: string;
    category: "Safety Database" | "Medical Dictionary" | "Clinical EDC" | "Regulatory Standard" | "Workflow";
    importance: "Mandatory (ATS Filter)" | "High Priority" | "Preferred";
    proficiency: string;
  }[];
  dayToDayDuties: string[];
  fatalGaps: string[];
  interviewStages: {
    stage: string;
    name: string;
    duration: string;
    format: string;
    keyCheck: string;
  }[];
  atsKeywords: {
    keyword: string;
    category: "Software" | "Regulatory" | "Workflow";
    weight: number; // 1-10
  }[];
}

export const LIVE_EMPLOYER_OPENINGS: LiveEmployerOpening[] = [
  {
    company: "Cognizant Life Sciences",
    shortName: "Cognizant",
    tagline: "Global Delivery Powerhouse for Top-10 Pharma Safety Operations",
    brandColor: "#000048",
    globalHq: "Teaneck, NJ · India Hubs: Hyderabad, Bengaluru, Kolkata, Mumbai, Coimbatore",
    annualFresherIntake: "4,500+ Life Sciences Associates Annually",
    activeOpenings: {
      reqId: "REQ-00069891251",
      roleTitle: "Process Executive – Pharmacovigilance (ICSR)",
      department: "Life Sciences R&D · Managed Safety Services",
      locations: ["Hyderabad (Gachibowli / Financial Dist)", "Bengaluru (Manyata Tech Park)", "Mumbai (Airoli)"],
      workModel: "Office (Security Zone)",
      experience: "0 – 1 Year (Freshers Eligible · 2024–2026 Batches)",
      openPositions: 28,
      salaryBand: "₹3.80 – ₹4.60 LPA + ₹45,000 Shift Allowance",
      hiringStatus: "Urgent Hiring Wave",
      postedDate: "Updated 4 days ago · Spring 2026 Batch",
      careersUrl: "https://careers.cognizant.com",
    },
    eligibility: {
      degrees: ["B.Pharm (Bachelor of Pharmacy)", "M.Pharm (Pharmacology / Pharmaceutics)", "Pharm.D", "M.Sc Life Sciences / Biotechnology / Microbiology"],
      minMarks: "Minimum 60% aggregate across all semesters without active backlogs",
      eligibleBatches: ["2024", "2025", "2026 Graduating"],
      bondOrProbation: "6-Month Probation; Rotational Day/Night Shift agreement required",
    },
    requiredTools: [
      { name: "Oracle Argus Safety v8.2+", category: "Safety Database", importance: "Mandatory (ATS Filter)", proficiency: "Book-in, Product Tab, Event Coding, Routing to QC" },
      { name: "MedDRA v27.0", category: "Medical Dictionary", importance: "Mandatory (ATS Filter)", proficiency: "LLT (Lowest Level Term) to PT (Preferred Term) Hierarchy" },
      { name: "WHO Drug Dictionary (WHO-DD)", category: "Medical Dictionary", importance: "High Priority", proficiency: "Suspect vs Concomitant Trade-to-Generic Mapping" },
      { name: "ICH E2D & E2A", category: "Regulatory Standard", importance: "Mandatory (ATS Filter)", proficiency: "15-Day Expedited Triage for Serious Unexpected Events" },
    ],
    dayToDayDuties: [
      "Process 12–15 Individual Case Safety Reports (ICSRs) per 8-hour shift under strict Service Level Agreements (SLAs)",
      "Verify four mandatory elements of a valid case: Identifiable Patient, Identifiable Reporter, Suspect Medicinal Product, and Adverse Event",
      "Draft concise chronological clinical narratives following SBAR format with laboratory values, timeline markers, and de-challenge/re-challenge outcomes",
      "Determine seriousness criteria: Death, Life-Threatening, Inpatient Hospitalization, Disability/Incapacity, Congenital Anomaly, or Other Medically Important Condition",
      "Manage query workflows and document follow-up attempts for incomplete adverse event records",
    ],
    fatalGaps: [
      "Resume lacks exact ATS tokens: 'Oracle Argus', 'MedDRA Coding', 'ICSR Triage', 'ICH-GCP'",
      "Inability to explain seriousness criteria vs unexpectedness in Round 2 Technical Case Interview",
      "Failing the 20-minute timed medical narrative writing test due to poor English grammar or missing chronological dates",
      "No verified casework portfolio demonstrating book-in of serious vs non-serious cases",
    ],
    interviewStages: [
      { stage: "Round 1", name: "Talent Acquisition HR Screen", duration: "15 Mins", format: "Telephonic / MS Teams", keyCheck: "Communication fluency, shift flexibility, degree documents" },
      { stage: "Round 2", name: "Technical Domain Case Assessment", duration: "45 Mins", format: "Live Case Exercise", keyCheck: "Triage 2 sample ICSRs, select MedDRA PT, draft medical narrative" },
      { stage: "Round 3", name: "Operations Delivery Manager", duration: "30 Mins", format: "Video Panel", keyCheck: "SOP adherence, error-rate sensitivity, client HIPAA confidentiality" },
    ],
    atsKeywords: [
      { keyword: "Oracle Argus Safety", category: "Software", weight: 10 },
      { keyword: "MedDRA Coding", category: "Software", weight: 10 },
      { keyword: "ICSR Case Processing", category: "Workflow", weight: 9 },
      { keyword: "ICH E2D 15-Day Expedited", category: "Regulatory", weight: 9 },
      { keyword: "Medical Narrative Writing", category: "Workflow", weight: 8 },
      { keyword: "WHO Drug Dictionary", category: "Software", weight: 8 },
      { keyword: "Serious Adverse Event (SAE)", category: "Regulatory", weight: 8 },
    ],
  },
  {
    company: "IQVIA India",
    shortName: "IQVIA",
    tagline: "World's Largest Clinical Research Organization & Healthcare Data Leader",
    brandColor: "#002F6C",
    globalHq: "Durham, NC · India Hubs: Bengaluru, Kochi, Thane, Mumbai, Hyderabad",
    annualFresherIntake: "2,800+ Across Lifecycle Safety & Clinical Data Management",
    activeOpenings: {
      reqId: "REQ-R1560211",
      roleTitle: "Safety Associate Trainee (Lifecycle Safety)",
      department: "Global Lifecycle Safety Operations · EU-MAH & US Desks",
      locations: ["Bengaluru (Prestige Tech Park)", "Kochi (Infopark Kakkanad)", "Thane (Ghodbunder Rd)"],
      workModel: "Hybrid (3 Days Office)",
      experience: "0 Years (Fresher Specific · 2024–2026 Batches)",
      openPositions: 34,
      salaryBand: "₹4.20 – ₹5.20 LPA + Comprehensive Medical Insurance",
      hiringStatus: "Urgent Hiring Wave",
      postedDate: "Updated 2 days ago · National Freshers Drive",
      careersUrl: "https://jobs.iqvia.com",
    },
    eligibility: {
      degrees: ["Bachelor's in Pharmacy (B.Pharm)", "Master's in Pharmacy (M.Pharm)", "Pharm.D", "BDS / Allied Health Sciences"],
      minMarks: "Minimum 65% or 7.0 CGPA; strong academic standing in Pharmacology",
      eligibleBatches: ["2024", "2025", "2026 Graduating"],
      bondOrProbation: "12-Month Training & Mentorship Track with structured promotion to DSA-1",
    },
    requiredTools: [
      { name: "Oracle Argus / LifeSphere", category: "Safety Database", importance: "Mandatory (ATS Filter)", proficiency: "Data Entry, QC Checklist, Regulatory Tab, Expedited Routing" },
      { name: "MedDRA v27.0", category: "Medical Dictionary", importance: "Mandatory (ATS Filter)", proficiency: "Primary System Organ Class (SOC) & High Level Term (HLT) Assignment" },
      { name: "ICH-GCP E6(R2)", category: "Regulatory Standard", importance: "Mandatory (ATS Filter)", proficiency: "Investigator Brochure, Informed Consent, Protocol Deviations" },
      { name: "Electronic Data Capture (EDC)", category: "Clinical EDC", importance: "High Priority", proficiency: "Discrepancy Triage on Medidata Rave or Oracle InForm" },
    ],
    dayToDayDuties: [
      "Review and intake spontaneous adverse reaction reports, clinical trial SAEs, and literature-extracted safety citations",
      "Perform high-precision medical coding using MedDRA, ensuring events match clinical diagnosis rather than incidental symptoms",
      "Author comprehensive clinical safety narratives detailing patient demographics, medical history, concurrent treatments, and event course",
      "Collaborate directly with global Safety Review Physicians to evaluate causality, expectedness, and listedness against the Core Company Data Sheet (CCDS)",
      "Maintain 99.2% internal audit quality rating and zero regulatory submission delay under EMA / US FDA timelines",
    ],
    fatalGaps: [
      "Inability to explain the difference between 'Causality Assessment' vs 'Listedness / Expectedness' in technical interview",
      "Weak grasp of clinical pharmacology terms (e.g., Stevens-Johnson Syndrome vs Erythema Multiforme, Torsades de Pointes vs QT Prolongation)",
      "No demonstrated experience handling query reconciliation between safety databases and EDC trial records",
      "Failing IQVIA's proprietary online aptitude & English comprehension assessment",
    ],
    interviewStages: [
      { stage: "Round 1", name: "Online Cognitive & Medical Aptitude Test", duration: "60 Mins", format: "Proctored Online Portal", keyCheck: "Pharmacology, logical reasoning, medical vocabulary, reading speed" },
      { stage: "Round 2", name: "Technical Panel Discussion", duration: "45 Mins", format: "MS Teams Video", keyCheck: "ICSR workflow, MedDRA coding hierarchy, SAE criteria, narrative writing" },
      { stage: "Round 3", name: "Business & Behavioral Fitment", duration: "30 Mins", format: "MS Teams Video", keyCheck: "Career commitment, handling deadline pressure, global client readiness" },
    ],
    atsKeywords: [
      { keyword: "Lifecycle Safety", category: "Workflow", weight: 10 },
      { keyword: "Oracle Argus", category: "Software", weight: 10 },
      { keyword: "MedDRA v27", category: "Software", weight: 9 },
      { keyword: "ICH-GCP E6(R2)", category: "Regulatory", weight: 9 },
      { keyword: "SUSAR Expedited Reporting", category: "Regulatory", weight: 9 },
      { keyword: "Company Core Data Sheet (CCDS)", category: "Regulatory", weight: 8 },
      { keyword: "Pharmacology Clinical Narrative", category: "Workflow", weight: 8 },
    ],
  },
  {
    company: "Parexel International",
    shortName: "Parexel",
    tagline: "Premier Global Biopharmaceutical Services & Oncology Safety Authority",
    brandColor: "#EF5323",
    globalHq: "Newton, MA · India Hubs: Hyderabad, Bengaluru, Mohali (Chandigarh)",
    annualFresherIntake: "1,900+ Across Clinical Operations, Safety & Data Management",
    activeOpenings: {
      reqId: "REQ-R0000045248",
      roleTitle: "Associate Drug Safety Scientist / Trainee Clinical Data Analyst",
      department: "Global Patient Safety Operations · Oncology & Biologics Track",
      locations: ["Hyderabad (Raheja Mindspace / HITEC City)", "Bengaluru (Outer Ring Rd)", "Mohali (Quark City)"],
      workModel: "Hybrid (3 Days Office)",
      experience: "0 – 1 Year (Freshers & 2024–2026 Batch Graduates)",
      openPositions: 19,
      salaryBand: "₹4.00 – ₹5.00 LPA + Annual Performance Incentive",
      hiringStatus: "Active Pipeline",
      postedDate: "Updated 1 week ago · Campus & Lateral Portal",
      careersUrl: "https://jobs.parexel.com",
    },
    eligibility: {
      degrees: ["B.Pharm (Bachelor of Pharmacy)", "M.Pharm (Pharmacology / Clinical Research)", "Pharm.D", "M.Sc Life Sciences / Biotechnology"],
      minMarks: "Minimum 60% aggregate; clear communication and academic credibility",
      eligibleBatches: ["2024", "2025", "2026 Graduating"],
      bondOrProbation: "6-Month Evaluation Period; full-time permanent conversion",
    },
    requiredTools: [
      { name: "Oracle Argus / Veeva Safety", category: "Safety Database", importance: "Mandatory (ATS Filter)", proficiency: "End-to-end ICSR case workflow, Seriousness & Listedness determination" },
      { name: "MedDRA & WHODrug", category: "Medical Dictionary", importance: "Mandatory (ATS Filter)", proficiency: "Exact Term Selection, Preferred Term hierarchy, Drug Trade-to-Generic" },
      { name: "Medidata Rave EDC", category: "Clinical EDC", importance: "High Priority", proficiency: "eCRF query generation, discrepancy reconciliation, 21 CFR Part 11 audit trails" },
      { name: "SUSAR & CIOMS-I", category: "Regulatory Standard", importance: "Mandatory (ATS Filter)", proficiency: "Preparation of CIOMS-I format expedited submission dossiers" },
    ],
    dayToDayDuties: [
      "Process complex serious adverse event cases arising from global Phase II–III oncology and immunotherapy trials",
      "Conduct triage evaluation of incoming safety source documents within 24 hours of receipt to confirm expedited reporting clock",
      "Perform precise MedDRA coding for adverse events, primary disease manifestations, and medical history",
      "Draft comprehensive scientific narratives highlighting temporal association, confounding medications, and laboratory trajectory",
      "Support Senior Safety Scientists in generating quarterly aggregate safety listings and periodic reconciliation tables",
    ],
    fatalGaps: [
      "No demonstrated exposure to Medidata Rave eCRF discrepancy management or query workflows",
      "Inability to explain why a 7-day fatal/life-threatening SUSAR timeline differs from a 15-day non-fatal serious timeline",
      "Poor understanding of clinical oncology trial protocols, tumor progression endpoints vs true adverse drug events",
      "Failing technical panel questioning on 21 CFR Part 11 electronic data integrity principles",
    ],
    interviewStages: [
      { stage: "Round 1", name: "Recruiter Telephonic Screening", duration: "20 Mins", format: "Voice Call", keyCheck: "Qualifications, notice period, location preference, career goals" },
      { stage: "Round 2", name: "Technical Case Evaluation", duration: "50 Mins", format: "MS Teams Video", keyCheck: "Live review of sample patient discharge summary, identifying 4 valid ICSR elements, coding quiz" },
      { stage: "Round 3", name: "Senior Operations Director", duration: "30 Mins", format: "MS Teams Video", keyCheck: "Cultural fit, analytical thinking, resilience, willingness to learn specialized therapeutic areas" },
    ],
    atsKeywords: [
      { keyword: "Associate Drug Safety Scientist", category: "Workflow", weight: 10 },
      { keyword: "Oracle Argus Safety", category: "Software", weight: 10 },
      { keyword: "MedDRA Hierarchy", category: "Software", weight: 9 },
      { keyword: "CIOMS-I Reporting", category: "Regulatory", weight: 9 },
      { keyword: "SUSAR 7/15-Day Expedited", category: "Regulatory", weight: 9 },
      { keyword: "Medidata Rave EDC", category: "Software", weight: 8 },
      { keyword: "21 CFR Part 11", category: "Regulatory", weight: 8 },
    ],
  },
  {
    company: "Novartis Healthcare",
    shortName: "Novartis",
    tagline: "Global Pharmaceutical Innovator & Hyderabad Global Capability Center (GCC)",
    brandColor: "#0460A9",
    globalHq: "Basel, Switzerland · India Mega Hub: Hyderabad (Genome Valley / Ghatkesar)",
    annualFresherIntake: "800+ Specialized Life Sciences & Clinical Scientific Experts",
    activeOpenings: {
      reqId: "REQ-10088191",
      roleTitle: "Safety Processing Expert / Safety Scientist I",
      department: "Novartis Biomedical Research · Global Drug Safety & Epidemiology",
      locations: ["Hyderabad (Genome Valley GCC)", "Hyderabad (Ghatkesar Campus)"],
      workModel: "Hybrid (3 Days Office)",
      experience: "0 – 2 Years (Pharm.D, M.Pharm & High-Performing B.Pharm Freshers)",
      openPositions: 14,
      salaryBand: "₹5.20 – ₹6.80 LPA + Performance Bonus + Global Benefits",
      hiringStatus: "Active Pipeline",
      postedDate: "Updated 3 days ago · Global GCC Hiring Requisition",
      careersUrl: "https://www.novartis.com/careers",
    },
    eligibility: {
      degrees: ["Doctor of Pharmacy (Pharm.D)", "M.Pharm (Pharmacology / Clinical Pharmacy)", "B.Pharm (High Academic Merit)", "M.Sc Life Sciences"],
      minMarks: "Minimum 70% or 7.5 CGPA; exceptional scientific acumen and pharmacology depth",
      eligibleBatches: ["2024", "2025", "2026 Graduating"],
      bondOrProbation: "1-Year Scientific Development Program with direct global project exposure",
    },
    requiredTools: [
      { name: "Novartis Global Safety System", category: "Safety Database", importance: "Mandatory (ATS Filter)", proficiency: "Advanced case evaluation, multi-product causality, medical assessment" },
      { name: "MedDRA v27.0 & SMQ", category: "Medical Dictionary", importance: "Mandatory (ATS Filter)", proficiency: "Standardised MedDRA Queries (SMQ) for Signal Detection" },
      { name: "GVP Modules VI & IX", category: "Regulatory Standard", importance: "Mandatory (ATS Filter)", proficiency: "Good Pharmacovigilance Practices for Post-Authorisation Safety" },
      { name: "Signal Detection Software", category: "Safety Database", importance: "High Priority", proficiency: "Disproportionality analysis (PRR / ROR), aggregate safety listings" },
    ],
    dayToDayDuties: [
      "Evaluate complex global safety cases involving innovative oncology, immunology, and gene-therapy compounds",
      "Perform in-depth scientific causality assessments and determine drug-event relationship across co-administered therapies",
      "Screen medical literature databases (PubMed, EMBASE) to detect emergent safety signals and write structured evaluation briefs",
      "Collaborate directly with Global Safety Leaders in Basel and Cambridge to support Risk Management Plans (RMPs)",
      "Ensure adherence to EU GVP Modules and FDA Post-Marketing Safety reporting requirements",
    ],
    fatalGaps: [
      "Surface-level textbook knowledge; failing technical questions on drug receptor mechanisms and pharmacokinetics",
      "No understanding of Standardised MedDRA Queries (SMQs) or aggregate safety reporting principles (PBRER / PSUR)",
      "Weak scientific writing; unable to articulate clinical arguments for why an adverse event is likely drug-induced vs disease progression",
      "Academic-only resume with zero industry work-simulation or project experience",
    ],
    interviewStages: [
      { stage: "Round 1", name: "Global Talent Acquisition Screener", duration: "25 Mins", format: "MS Teams Video", keyCheck: "Scientific credentials, research thesis, English fluency, motivations" },
      { stage: "Round 2", name: "Scientific Domain Assessment Panel", duration: "60 Mins", format: "MS Teams Video (2 Interviewers)", keyCheck: "Deep-dive clinical pharmacology case, multi-drug causality, MedDRA SMQ exercise" },
      { stage: "Round 3", name: "Global Capability Center Director", duration: "30 Mins", format: "MS Teams Video", keyCheck: "Strategic curiosity, cultural alignment, research mindset, ethical integrity" },
    ],
    atsKeywords: [
      { keyword: "Safety Scientist", category: "Workflow", weight: 10 },
      { keyword: "Clinical Pharmacology", category: "Regulatory", weight: 10 },
      { keyword: "Standardised MedDRA Queries (SMQ)", category: "Software", weight: 9 },
      { keyword: "GVP Module VI", category: "Regulatory", weight: 9 },
      { keyword: "Signal Detection PRR", category: "Workflow", weight: 9 },
      { keyword: "Risk Management Plan (RMP)", category: "Regulatory", weight: 8 },
      { keyword: "Causality Assessment", category: "Workflow", weight: 8 },
    ],
  },
  {
    company: "Accenture Health & Life Sciences",
    shortName: "Accenture",
    tagline: "Enterprise Technology & Life Sciences Managed Services Leader",
    brandColor: "#A100FF",
    globalHq: "Dublin, Ireland · India Hubs: Bengaluru, Hyderabad, Chennai, Pune, Gurugram",
    annualFresherIntake: "3,500+ Across Healthcare Operations & Life Sciences R&D",
    activeOpenings: {
      reqId: "REQ-AIOC-S01628146",
      roleTitle: "Pharmacovigilance Services New Associate (Drug Safety)",
      department: "Life Sciences R&D Operations · Enterprise Safety Surveillance",
      locations: ["Bengaluru (IBC Knowledge Park / Whitefield)", "Hyderabad (Mindspace / Raheja)", "Chennai (DLF IT Park)"],
      workModel: "Rotational Hybrid",
      experience: "0 – 2 Years (Freshers & Junior Associates Eligible)",
      openPositions: 42,
      salaryBand: "₹3.60 – ₹4.50 LPA + Night Shift Allowance + Quarterly Bonus",
      hiringStatus: "Urgent Hiring Wave",
      postedDate: "Updated 1 day ago · Large Capacity Intake Drive",
      careersUrl: "https://www.accenture.com/in-en/careers",
    },
    eligibility: {
      degrees: ["B.Pharm (Bachelor of Pharmacy)", "M.Pharm", "Pharm.D", "B.Sc / M.Sc Life Sciences / Nursing / BPT"],
      minMarks: "Minimum 58% or 6.0 CGPA; basic computer proficiency and analytical aptitude",
      eligibleBatches: ["2024", "2025", "2026 Graduating"],
      bondOrProbation: "3-Month Intensive Skill Immersion followed by client account deployment",
    },
    requiredTools: [
      { name: "Oracle Argus / ArisGlobal", category: "Safety Database", importance: "Mandatory (ATS Filter)", proficiency: "Adverse event data entry, triage queues, medical history logging" },
      { name: "MedDRA & WHO-Drug", category: "Medical Dictionary", importance: "Mandatory (ATS Filter)", proficiency: "Coding of adverse drug reactions and concomitant therapeutic classes" },
      { name: "Client Mailbox Triage", category: "Workflow", importance: "High Priority", proficiency: "Monitoring affiliate inbox, initial intake reconciliation, tracking logs" },
      { name: "SOP & Compliance Workflows", category: "Regulatory Standard", importance: "Mandatory (ATS Filter)", proficiency: "Quality check (QC) checklists, turn-around-time compliance tracking" },
    ],
    dayToDayDuties: [
      "Monitor global client safety mailboxes and affiliate intake queues to capture potential adverse event notifications",
      "Extract case information from hospital records, spontaneous consumer calls, and digital patient support programs",
      "Accurately input patient data, drug information, and adverse event details into enterprise safety databases",
      "Perform standardized medical coding using current MedDRA version and verify WHO-DD trade-to-generic classification",
      "Execute documented written follow-ups to gather critical missing medical details on serious unconfirmed reports",
    ],
    fatalGaps: [
      "Inability to achieve required operational typing speed (30+ WPM) and accuracy during client screening test",
      "Lack of awareness of rotational night shifts (necessary for US/EU timezone safety desk handovers)",
      "Zero familiarity with standard operating procedures (SOPs) or quality control (QC) error thresholds",
      "Missing foundational medical terminology in written communication assessments",
    ],
    interviewStages: [
      { stage: "Round 1", name: "Online Cognitive & Communication Test", duration: "45 Mins", format: "Automated Platform", keyCheck: "English grammar, written comprehension, numerical logic, attention to detail" },
      { stage: "Round 2", name: "Life Sciences Domain Interview", duration: "35 Mins", format: "MS Teams Video", keyCheck: "ICSR basics, pharmacology concepts, MedDRA coding rationale, shift willingness" },
      { stage: "Round 3", name: "HR & Account Alignment", duration: "20 Mins", format: "MS Teams Video", keyCheck: "Document verification, salary confirmation, operational shifts commitment" },
    ],
    atsKeywords: [
      { keyword: "Pharmacovigilance Services", category: "Workflow", weight: 10 },
      { keyword: "Oracle Argus Safety", category: "Software", weight: 10 },
      { keyword: "MedDRA Coding", category: "Software", weight: 9 },
      { keyword: "ICSR Data Entry", category: "Workflow", weight: 9 },
      { keyword: "SOP Compliance", category: "Regulatory", weight: 8 },
      { keyword: "Mailbox Intake Triage", category: "Workflow", weight: 8 },
      { keyword: "Quality Control (QC)", category: "Workflow", weight: 8 },
    ],
  },
];
