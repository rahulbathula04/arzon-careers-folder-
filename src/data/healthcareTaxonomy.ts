export interface HealthcareDegree {
  id: string;
  name: string;
  shortName: string;
  description: string;
  popularPaths: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  category: "Pharmacy & Drug Safety" | "Clinical & Research" | "Healthcare Technology" | "Emerging Fields" | "Commercial & Business";
  summary: string;
  whatItIs: string;
  responsibilities: string[];
  hiringCompanies: string[];
  qualifications: { degree: string; percentage: number }[];
  requiredSkills: string[];
  preferredSkills: string[];
  tools: { name: string; frequency: string; relevance: string }[];
  salaryByCity: {
    city: string;
    entry: string;
    mid: string;
    senior: string;
  }[];
  activeOpeningsCount: number;
  growthPath: string[];
  assayTest: string;
}

export interface CompanyRolePosting {
  id: string;
  roleTitle: string;
  companyName: string;
  companyType: "MNC CRO" | "IT-Pharma Services" | "MNC Pharma" | "Indian Pharma" | "Health Tech" | "Indian CRO";
  location: string;
  experience: string;
  degreesAccepted: string[];
  keySkills: string[];
  postedDate: string;
  activeOpenings: number;
}

export interface CareerAdvisor {
  id: string;
  name: string;
  title: string;
  background: string;
  yearsExp: number;
  expertiseAreas: string[];
  qualifications: string[];
  industries: string[];
  avatar: string;
}

export const HEALTHCARE_DEGREES: HealthcareDegree[] = [
  {
    id: "bpharm",
    name: "B.Pharm (Bachelor of Pharmacy)",
    shortName: "B.Pharm",
    description: "Strong foundation in pharmaceutics, pharmacology, pharmaceutical chemistry, and clinical workflows.",
    popularPaths: ["Pharmacovigilance", "Regulatory Affairs", "Clinical Research", "Quality Assurance", "Healthcare Data"],
  },
  {
    id: "pharmd",
    name: "Pharm.D (Doctor of Pharmacy)",
    shortName: "Pharm.D",
    description: "Advanced clinical therapeutics, patient care, drug safety monitoring, and clinical research methodology.",
    popularPaths: ["Pharmacovigilance", "Clinical Data Management", "Medical Writing", "Medical Affairs", "Precision Medicine"],
  },
  {
    id: "dpharm",
    name: "D.Pharm (Diploma in Pharmacy)",
    shortName: "D.Pharm",
    description: "Practical pharmacy operations, dispensing standards, and foundational drug safety compliance.",
    popularPaths: ["Drug Safety Operations", "Quality Control", "Pharma Sales", "Clinical Support Operations"],
  },
  {
    id: "biotech",
    name: "B.Tech / B.Sc Biotechnology",
    shortName: "Biotechnology",
    description: "Cellular biology, molecular genetics, bioprocess engineering, and bioinformatics computational tools.",
    popularPaths: ["Bioinformatics", "Clinical Data Science", "Biomanufacturing QA", "Healthcare AI", "Computational Biology"],
  },
  {
    id: "lifesciences",
    name: "B.Sc / M.Sc Life Sciences",
    shortName: "Life Sciences",
    description: "Biological systems, physiology, clinical research protocols, and medical data analysis.",
    popularPaths: ["Clinical Research", "Medical Writing", "Clinical Operations", "Healthcare Business Analytics"],
  },
  {
    id: "microbio",
    name: "B.Sc / M.Sc Microbiology",
    shortName: "Microbiology",
    description: "Microbial genetics, sterile manufacturing quality control, and clinical diagnostic testing.",
    popularPaths: ["Quality Control", "Microbiological QA", "Clinical Trials", "Regulatory Compliance"],
  },
  {
    id: "biochem",
    name: "B.Sc / M.Sc Biochemistry",
    shortName: "Biochemistry",
    description: "Enzyme kinetics, molecular pathology, bio-analytical testing, and biomarker validation.",
    popularPaths: ["Bio-Analytical QC", "Clinical Data Management", "Biomarker Research", "Drug Safety"],
  },
  {
    id: "other",
    name: "Other Allied Healthcare Degree",
    shortName: "Other Healthcare",
    description: "Nursing, BAMS, BHMS, Allied Health Sciences, and Bioengineering backgrounds.",
    popularPaths: ["Medical Writing", "Clinical Coordination", "Health Informatics", "Patient Safety Ops"],
  },
];

export const DEGREE_CAREER_MAPS: Record<string, Record<string, string[]>> = {
  bpharm: {
    "Pharmacy & Drug Safety": [
      "Pharmacovigilance (PV)",
      "Drug Safety Operations",
      "Regulatory Affairs (RA)",
      "Quality Assurance (QA)",
      "Quality Control (QC)",
      "Medical Affairs",
    ],
    "Clinical & Research": [
      "Clinical Research Associate (CRA)",
      "Clinical Data Management (CDM)",
      "Clinical Operations",
      "Medical Writing",
      "Trial Monitoring",
    ],
    "Healthcare Technology": [
      "Healthcare Data Analytics",
      "Health Informatics",
      "Real-World Evidence (RWE)",
      "Healthcare AI",
      "Digital Health",
    ],
    "Emerging Fields": [
      "Pharmacogenomics",
      "Bioinformatics",
      "Precision Medicine",
      "Computational Biology",
      "Nanoscience",
    ],
    "Commercial & Business": [
      "Pharma Sales & Marketing",
      "Market Research",
      "Product Management",
      "Healthcare Business Analytics",
    ],
  },
  pharmd: {
    "Pharmacy & Drug Safety": [
      "Pharmacovigilance Specialist",
      "Drug Safety Evaluation",
      "Medical Affairs",
      "Regulatory Affairs",
      "Clinical Quality Audit",
    ],
    "Clinical & Research": [
      "Clinical Research Associate (CRA)",
      "Clinical Data Management (CDM)",
      "Medical Writing",
      "Clinical Operations",
      "Biostatistics Support",
    ],
    "Healthcare Technology": [
      "Healthcare AI Analytics",
      "Health Informatics",
      "Real-World Evidence (RWE)",
      "Digital Health Solutions",
    ],
    "Emerging Fields": [
      "Pharmacogenomics",
      "Precision Medicine",
      "Gene Therapy Safety",
      "Bioinformatics",
    ],
    "Commercial & Business": [
      "Medical Science Liaison (MSL)",
      "Healthcare Business Analytics",
      "Market Access Strategy",
    ],
  },
};

export const CAREER_PROFILES: Record<string, CareerPath> = {
  pv: {
    id: "pv",
    title: "Pharmacovigilance (PV) Associate / Safety Specialist",
    category: "Pharmacy & Drug Safety",
    summary: "Monitor, log, and evaluate safety reports of side effects from medicines to ensure drugs remain safe for public use.",
    whatItIs: "You monitor, log, and evaluate safety reports of side effects from medicines to ensure drugs remain safe for public use across global markets.",
    responsibilities: [
      "Triage incoming adverse event reports and extract safety data for Individual Case Safety Reports (ICSR).",
      "Code adverse events and concomitant medications using standardized MedDRA and WHODrug dictionaries.",
      "Write clear medical narratives detailing Serious Adverse Events (SAEs) based on raw hospital and trial records.",
      "Initiate safety follow-up requests to healthcare professionals to obtain missing clinical details.",
      "Format and submit compliant electronic E2B(R3) safety files to CDSCO, USFDA FAERS, and EMA EudraVigilance.",
    ],
    hiringCompanies: ["IQVIA", "Cognizant Life Sciences", "Accenture Life Sciences", "Parexel", "Novartis GCC", "TCS BPS", "Labcorp"],
    qualifications: [
      { degree: "B.Pharm", percentage: 45 },
      { degree: "Pharm.D", percentage: 30 },
      { degree: "M.Pharm", percentage: 15 },
      { degree: "B.Sc/M.Sc Life Sciences & Biotech", percentage: 10 },
    ],
    requiredSkills: [
      "ICSR Case Processing & Triage",
      "MedDRA Medical Dictionary Coding",
      "Adverse Event Causality Assessment",
      "ICH E2A & ICH E2B(R3) Guidelines",
      "SAE Narrative Drafting",
    ],
    preferredSkills: [
      "Signal Detection & Evaluation",
      "Aggregate Safety Report Drafting (DSUR/PSUR)",
      "USFDA 21 CFR 314.80 Compliance",
      "GVP Modules I–XVI Standards",
    ],
    tools: [
      { name: "Oracle Argus Safety", frequency: "75%", relevance: "ICSR Intake, Triage, Signal Detection & E2B Safety Reporting" },
      { name: "MedDRA Dictionary", frequency: "80%", relevance: "Universal AE & Medical History Coding" },
      { name: "WHODrug Dictionary", frequency: "65%", relevance: "Standard Dictionary for Concomitant Medication Coding" },
      { name: "Veeva Vault Safety", frequency: "55%", relevance: "Cloud Documentation Management for Safety Operations" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹3.0 – ₹4.5 LPA", mid: "₹5.0 – ₹8.5 LPA", senior: "₹9.0 – ₹16.0 LPA" },
      { city: "Bengaluru (Tech Premium)", entry: "₹3.2 – ₹5.0 LPA", mid: "₹5.5 – ₹9.5 LPA", senior: "₹10.0 – ₹18.0 LPA" },
      { city: "Mumbai (MNC HQ)", entry: "₹3.2 – ₹5.2 LPA", mid: "₹5.5 – ₹10.0 LPA", senior: "₹10.0 – ₹20.0 LPA" },
      { city: "Pune", entry: "₹2.8 – ₹4.2 LPA", mid: "₹4.5 – ₹8.0 LPA", senior: "₹8.0 – ₹15.0 LPA" },
      { city: "NCR (Delhi/Gurgaon)", entry: "₹2.8 – ₹4.5 LPA", mid: "₹5.0 – ₹8.5 LPA", senior: "₹9.0 – ₹16.0 LPA" },
    ],
    activeOpeningsCount: 750,
    growthPath: [
      "Junior PV Associate (0-2 yrs)",
      "Senior PV Specialist / Narrative Writer (2-5 yrs)",
      "PV Team Lead / Safety Auditor (5-8 yrs)",
      "PV Manager / Associate Director Safety (8+ yrs)",
    ],
    assayTest: "ASSAY Case Drafting: Convert an unstructured physician email into a formatted ICSR report, selecting MedDRA codes and drafting a 150-word narrative.",
  },
  cdm: {
    id: "cdm",
    title: "Clinical Data Management (CDM) Analyst / EDC Specialist",
    category: "Clinical & Research",
    summary: "Collect, clean, and organize clinical trial patient records in software databases so doctors and scientists can trust trial results.",
    whatItIs: "You collect, clean, and organize clinical trial patient records in EDC databases so researchers, biostatisticians, and regulators can trust trial outcomes.",
    responsibilities: [
      "Perform electronic Case Report Form (eCRF) data validation and review data listings against protocol rules.",
      "Issue, track, and resolve data queries/discrepancies with clinical trial site coordinators.",
      "Reconcile external central laboratory data and serious adverse event (SAE) logs against eCRF data.",
      "Conduct data consistency checks to ensure patient visit schedules and dosages comply with study guidelines.",
      "Prepare study documentation for final Database Lock (DBL) prior to statistical analysis.",
    ],
    hiringCompanies: ["IQVIA", "Cognizant Life Sciences", "Parexel", "TCS BPS", "Labcorp", "Quanticate", "Navitas Life Sciences"],
    qualifications: [
      { degree: "B.Pharm", percentage: 40 },
      { degree: "B.Sc/M.Sc Life Sciences & Biotech", percentage: 35 },
      { degree: "Pharm.D", percentage: 15 },
      { degree: "M.Pharm", percentage: 10 },
    ],
    requiredSkills: [
      "Medidata Rave EDC Navigation",
      "Data Discrepancy & Query Management",
      "CDISC SDTM & CDASH Standards",
      "USFDA 21 CFR Part 11 Compliance",
    ],
    preferredSkills: [
      "SAS Statistical Programming",
      "SQL Querying for eCRF Discrepancies",
      "Oracle Clinical Remote Data Capture",
    ],
    tools: [
      { name: "Medidata Rave EDC", frequency: "70%", relevance: "Electronic Data Capture & Data Cleaning" },
      { name: "Oracle Clinical / RDC", frequency: "50%", relevance: "Clinical Database Design & Remote Data Capture" },
      { name: "WHODrug Dictionary", frequency: "65%", relevance: "Concomitant Medication Coding" },
      { name: "MedDRA Dictionary", frequency: "80%", relevance: "Medical Terminology Coding" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹3.0 – ₹4.5 LPA", mid: "₹5.0 – ₹9.0 LPA", senior: "₹9.0 – ₹16.0 LPA" },
      { city: "Bengaluru (Tech Premium)", entry: "₹3.5 – ₹5.2 LPA", mid: "₹5.5 – ₹10.0 LPA", senior: "₹10.0 – ₹18.0 LPA" },
      { city: "Mumbai", entry: "₹3.5 – ₹5.5 LPA", mid: "₹6.0 – ₹11.0 LPA", senior: "₹11.0 – ₹20.0 LPA" },
      { city: "Pune", entry: "₹3.0 – ₹4.5 LPA", mid: "₹5.0 – ₹9.0 LPA", senior: "₹9.0 – ₹15.0 LPA" },
      { city: "NCR", entry: "₹3.0 – ₹4.5 LPA", mid: "₹5.5 – ₹9.5 LPA", senior: "₹10.0 – ₹17.0 LPA" },
    ],
    activeOpeningsCount: 520,
    growthPath: [
      "Data Management Associate (0-2 yrs)",
      "Clinical Data Manager (2-5 yrs)",
      "Lead Data Manager / Database Administrator (5-8 yrs)",
      "Head of Clinical Data Management (8+ yrs)",
    ],
    assayTest: "ASSAY Query Resolution: Review a mock 20-patient trial dataset, identify logical data errors (e.g. male patient logged with pregnancy test), and draft site queries.",
  },
  cra: {
    id: "cra",
    title: "Clinical Research Associate (CRA) / Trial Monitor",
    category: "Clinical & Research",
    summary: "Visit and audit hospital trial sites to confirm doctors follow safety protocols and document patient data accurately.",
    whatItIs: "You visit and audit hospital trial sites to confirm doctors follow safety protocols, document patient data accurately, and maintain ICH-GCP compliance.",
    responsibilities: [
      "Conduct Source Data Verification (SDV) by cross-checking hospital medical charts against eCRF entries.",
      "Verify that Informed Consent Forms (ICF) were properly executed before any patient procedures began.",
      "Perform Investigational Product (IP) accountability checks to ensure trial drugs are stored and dispensed correctly.",
      "Identify, track, and report protocol deviations and safety violations to the Ethics Committee.",
      "Draft comprehensive Site Monitoring Reports (SMR) following site initiation, routine monitoring, or site close-out visits.",
    ],
    hiringCompanies: ["Parexel", "IQVIA", "Novartis GCC", "Syneos Health", "Sanofi", "Sun Pharma", "Dr. Reddy's"],
    qualifications: [
      { degree: "Pharm.D", percentage: 40 },
      { degree: "M.Pharm", percentage: 30 },
      { degree: "B.Pharm", percentage: 20 },
      { degree: "M.Sc Life Sciences / Biotech", percentage: 10 },
    ],
    requiredSkills: [
      "Source Data Verification (SDV)",
      "ICH-GCP E6(R2) Audit Guidelines",
      "Informed Consent Process Verification",
      "Investigational Product (IP) Accountability",
    ],
    preferredSkills: [
      "Risk-Based Monitoring (RBM)",
      "Veeva Vault CTMS Operations",
      "Site Initiation & Close-Out Visits",
    ],
    tools: [
      { name: "Veeva Vault CTMS", frequency: "55%", relevance: "Clinical Trial Management & Document Audit" },
      { name: "Medidata Rave EDC", frequency: "70%", relevance: "Cross-checking eCRF against Hospital Source Files" },
      { name: "eTMF Systems", frequency: "50%", relevance: "Electronic Trial Master File Archival" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹3.2 – ₹5.0 LPA", mid: "₹5.5 – ₹9.5 LPA", senior: "₹10.0 – ₹17.0 LPA" },
      { city: "Bengaluru (Tech Premium)", entry: "₹3.5 – ₹5.5 LPA", mid: "₹6.0 – ₹10.5 LPA", senior: "₹11.0 – ₹19.0 LPA" },
      { city: "Mumbai", entry: "₹3.5 – ₹5.5 LPA", mid: "₹6.0 – ₹12.0 LPA", senior: "₹11.0 – ₹20.0 LPA" },
      { city: "Pune", entry: "₹3.0 – ₹4.8 LPA", mid: "₹5.0 – ₹9.0 LPA", senior: "₹9.0 – ₹15.0 LPA" },
      { city: "NCR", entry: "₹3.2 – ₹5.0 LPA", mid: "₹5.5 – ₹10.0 LPA", senior: "₹10.0 – ₹17.0 LPA" },
    ],
    activeOpeningsCount: 480,
    growthPath: [
      "Clinical Trial Assistant / In-House CRA (0-2 yrs)",
      "CRA I / CRA II Field Monitor (2-5 yrs)",
      "Senior CRA / Lead Monitor (5-8 yrs)",
      "Clinical Operations Manager (8+ yrs)",
    ],
    assayTest: "ASSAY Protocol Deviation Audit: Evaluate a mock hospital monitoring log to identify ICH-GCP protocol violations, assign severity ratings, and recommend corrective actions.",
  },
  ra: {
    id: "ra",
    title: "Regulatory Affairs (RA) Executive / eCTD Dossier Specialist",
    category: "Pharmacy & Drug Safety",
    summary: "Compile legal and scientific applications for health authorities so companies can test or sell drugs legally.",
    whatItIs: "You compile legal and scientific applications across eCTD Modules 1 to 5 for health authorities (CDSCO, USFDA, EMA) to secure and maintain drug marketing approvals.",
    responsibilities: [
      "Compile technical documents across eCTD Modules 1 to 5 (Administrative, Quality, Nonclinical, Clinical).",
      "Review packaging artwork, Summary of Product Characteristics (SmPC), and Patient Information Leaflets (PIL).",
      "Manage post-approval lifecycle submissions including variations, renewals, and annual safety updates.",
      "Perform regulatory gap analyses on drug dossiers prior to submitting them to CDSCO, USFDA, or EMA.",
      "Track regulatory agency Deficiency Letters and coordinate with R&D or Manufacturing teams to prepare responses.",
    ],
    hiringCompanies: ["Sun Pharma", "Dr. Reddy's", "Novartis GCC", "Parexel", "Syneos Health", "TCS BPS", "Indegene"],
    qualifications: [
      { degree: "M.Pharm (RA/Pharmaceutics)", percentage: 45 },
      { degree: "B.Pharm", percentage: 35 },
      { degree: "Pharm.D", percentage: 15 },
      { degree: "M.Sc Life Sciences", percentage: 5 },
    ],
    requiredSkills: [
      "eCTD Module 1 to 5 Dossier Structure",
      "USFDA 21 CFR & EMA Regulations",
      "CDSCO SUGAM Portal Filings",
      "Packaging & SmPC Leaflet Audits",
    ],
    preferredSkills: [
      "eCTDexpress / docuBridge Software",
      "Regulatory Gap Analysis",
      "Deficiency Letter Response Drafting",
    ],
    tools: [
      { name: "eCTDexpress / docuBridge", frequency: "45%", relevance: "Electronic Common Technical Document Publishing" },
      { name: "Veeva Vault RIM", frequency: "55%", relevance: "Cloud Regulatory Information Management" },
      { name: "CDSCO SUGAM Portal", frequency: "50%", relevance: "India Government Drug Licensing Portal" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹2.8 – ₹4.5 LPA", mid: "₹4.8 – ₹8.5 LPA", senior: "₹9.0 – ₹16.0 LPA" },
      { city: "Bengaluru", entry: "₹3.0 – ₹4.8 LPA", mid: "₹5.2 – ₹9.2 LPA", senior: "₹9.5 – ₹17.5 LPA" },
      { city: "Mumbai (HQ)", entry: "₹3.2 – ₹5.2 LPA", mid: "₹5.5 – ₹10.0 LPA", senior: "₹10.0 – ₹18.5 LPA" },
      { city: "Pune", entry: "₹2.6 – ₹4.2 LPA", mid: "₹4.5 – ₹8.0 LPA", senior: "₹8.0 – ₹14.5 LPA" },
      { city: "NCR", entry: "₹2.8 – ₹4.5 LPA", mid: "₹5.0 – ₹8.5 LPA", senior: "₹9.0 – ₹16.0 LPA" },
    ],
    activeOpeningsCount: 390,
    growthPath: [
      "Regulatory Affairs Executive (0-2 yrs)",
      "Regulatory Affairs Specialist (2-5 yrs)",
      "Lead Regulatory Manager (5-8 yrs)",
      "Director Regulatory Affairs & Policy (8+ yrs)",
    ],
    assayTest: "ASSAY eCTD Assembly: Structure an analytical raw data package into its corresponding eCTD Modules (Module 3 Quality vs Module 5 Clinical) following USFDA/CDSCO guidelines.",
  },
  med_writing: {
    id: "med_writing",
    title: "Medical Writing / Scientific Communications Specialist",
    category: "Clinical & Research",
    summary: "Write clear scientific reports, trial manuals, and medical papers based on complex data for regulators, doctors, and patients.",
    whatItIs: "You write clear scientific reports, trial protocols, and medical publications based on complex clinical trial data for regulators, physicians, and patients.",
    responsibilities: [
      "Draft and edit Clinical Study Reports (CSR) summarizing efficacy and safety data after trial completion.",
      "Write and update Investigator's Brochures (IB) and clinical trial protocols following ICH E6 guidelines.",
      "Create lay-language summaries of scientific findings for Patient Information Leaflets (PIL) and consent forms.",
      "Prepare peer-reviewed journal manuscripts, scientific posters, and conference presentations.",
      "Ensure document formatting complies with ICH E6 guidelines and target journal specifications.",
    ],
    hiringCompanies: ["Novartis GCC", "Parexel", "Sanofi", "Indegene", "IQVIA", "Accenture Life Sciences"],
    qualifications: [
      { degree: "Pharm.D", percentage: 50 },
      { degree: "M.Pharm", percentage: 25 },
      { degree: "M.Sc / Ph.D. Life Sciences", percentage: 20 },
      { degree: "B.Pharm", percentage: 5 },
    ],
    requiredSkills: [
      "Clinical Study Report (CSR) Drafting",
      "Investigator's Brochure (IB) Compilation",
      "ICH E6 Guideline Compliance",
      "Peer-Reviewed Medical Journal Formatting",
    ],
    preferredSkills: [
      "Lay-Language Patient Summary Writing",
      "EndNote Literature Management",
      "Veeva MedComms Platform",
    ],
    tools: [
      { name: "Veeva Vault MedComms", frequency: "55%", relevance: "Medical Content & Scientific Asset Management" },
      { name: "PubMed / Literature DBs", frequency: "80%", relevance: "Systematic Medical Literature Synthesis" },
      { name: "EndNote / Reference Tools", frequency: "60%", relevance: "Academic & Clinical Citation Management" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹3.5 – ₹5.2 LPA", mid: "₹6.0 – ₹10.0 LPA", senior: "₹10.5 – ₹18.0 LPA" },
      { city: "Bengaluru (Tech Premium)", entry: "₹3.8 – ₹5.8 LPA", mid: "₹6.5 – ₹11.0 LPA", senior: "₹11.5 – ₹20.0 LPA" },
      { city: "Mumbai", entry: "₹3.5 – ₹5.5 LPA", mid: "₹6.0 – ₹10.5 LPA", senior: "₹10.5 – ₹19.0 LPA" },
      { city: "Pune", entry: "₹3.2 – ₹4.8 LPA", mid: "₹5.5 – ₹9.0 LPA", senior: "₹9.5 – ₹16.0 LPA" },
      { city: "NCR", entry: "₹3.5 – ₹5.2 LPA", mid: "₹6.0 – ₹10.0 LPA", senior: "₹10.0 – ₹17.5 LPA" },
    ],
    activeOpeningsCount: 310,
    growthPath: [
      "Junior Medical Writer (0-2 yrs)",
      "Medical Writing Specialist (2-5 yrs)",
      "Lead Scientific Communicator (5-8 yrs)",
      "Head of Global Medical Writing (8+ yrs)",
    ],
    assayTest: "ASSAY CSR Summary: Synthesize raw trial tables into a compliant 300-word Clinical Study Report executive summary adhering to ICH E6 guidelines.",
  },
  hc_data: {
    id: "hc_data",
    title: "Healthcare Data & RWE (Real-World Evidence) Analyst",
    category: "Healthcare Technology",
    summary: "Analyze hospital records, claims databases, and health apps to evaluate how treatments work in real-world patient populations.",
    whatItIs: "You analyze real-world patient data (EHRs, insurance claims) using SQL, SAS, Python, and PowerBI to evaluate drug safety, efficacy, and treatment patterns.",
    responsibilities: [
      "Extract, clean, and structure data from Electronic Health Record (EHR) systems and insurance claim databases.",
      "Write data scripts using SQL, SAS, or Python to define patient cohorts and treatment timelines.",
      "Harmonize Clinical Outcome Assessment (COA) and Patient-Reported Outcome (PRO) datasets.",
      "Execute statistical plans for retrospective observational studies evaluating long-term drug safety.",
      "Create visual dashboards summarizing treatment outcomes for market access and health economics teams.",
    ],
    hiringCompanies: ["Optum (UnitedHealth Group)", "Novartis GCC", "Cognizant Life Sciences", "IQVIA", "Sanofi", "Accenture"],
    qualifications: [
      { degree: "B.Sc/M.Sc Biostatistics/Biotech/Data Analytics", percentage: 40 },
      { degree: "Pharm.D", percentage: 30 },
      { degree: "M.Pharm", percentage: 20 },
      { degree: "B.Pharm", percentage: 10 },
    ],
    requiredSkills: [
      "SQL Query Writing & Cohort Extraction",
      "PowerBI / Tableau Dashboard Building",
      "Python / SAS Patient Data Manipulation",
      "HIPAA & GDPR Health Data Compliance",
    ],
    preferredSkills: [
      "CDISC SDTM & ADaM Data Models",
      "Real-World Evidence (RWE) Retrospective Analysis",
      "Snowflake / BigQuery Healthcare Warehousing",
    ],
    tools: [
      { name: "SQL & PowerBI", frequency: "35%", relevance: "Database Querying & RWE Health Outcome Dashboarding" },
      { name: "SAS (Base/STAT) & CDISC SDTM", frequency: "40%", relevance: "Statistical Programming & Clinical Submissions" },
      { name: "Python / R", frequency: "50%", relevance: "Advanced Patient Cohort Data Scripts" },
    ],
    salaryByCity: [
      { city: "Hyderabad (GCC Hub)", entry: "₹4.5 – ₹7.5 LPA", mid: "₹8.0 – ₹13.0 LPA", senior: "₹13.5 – ₹22.0 LPA" },
      { city: "Bengaluru (Tech Premium)", entry: "₹5.0 – ₹8.5 LPA", mid: "₹8.5 – ₹15.0 LPA", senior: "₹15.0 – ₹26.0 LPA" },
      { city: "Mumbai", entry: "₹5.0 – ₹8.5 LPA", mid: "₹8.5 – ₹15.0 LPA", senior: "₹15.0 – ₹28.0 LPA" },
      { city: "Pune", entry: "₹4.2 – ₹7.2 LPA", mid: "₹7.5 – ₹12.5 LPA", senior: "₹12.5 – ₹20.0 LPA" },
      { city: "NCR", entry: "₹4.5 – ₹7.8 LPA", mid: "₹8.0 – ₹13.5 LPA", senior: "₹13.0 – ₹23.0 LPA" },
    ],
    activeOpeningsCount: 610,
    growthPath: [
      "Junior Healthcare Data Analyst (0-2 yrs)",
      "Healthcare Data Scientist / RWE Specialist (2-5 yrs)",
      "Lead Health Analytics Consultant (5-8 yrs)",
      "Director of Healthcare Data & AI (8+ yrs)",
    ],
    assayTest: "ASSAY SQL Cohort Extraction: Write SQL queries to extract patient cohort retention rates from an anonymized EHR dataset.",
  },
};

export const VERIFIED_COMPANY_ROLES: CompanyRolePosting[] = [
  {
    id: "job-1",
    roleTitle: "Junior Pharmacovigilance Associate",
    companyName: "IQVIA India",
    companyType: "MNC CRO",
    location: "Bengaluru / Hyderabad",
    experience: "0 - 2 Years",
    degreesAccepted: ["B.Pharm", "Pharm.D", "M.Pharm"],
    keySkills: ["Argus Safety (75% JD)", "MedDRA Coding", "ICSR Processing", "ICH E2B(R3)"],
    postedDate: "2 days ago",
    activeOpenings: 45,
  },
  {
    id: "job-2",
    roleTitle: "PV Services Associate",
    companyName: "Cognizant Life Sciences",
    companyType: "IT-Pharma Services",
    location: "Mumbai / Hyderabad",
    experience: "0 - 1 Year",
    degreesAccepted: ["B.Pharm", "Pharm.D", "Life Sciences"],
    keySkills: ["SAE Narratives", "Argus Safety", "GVP Modules"],
    postedDate: "1 day ago",
    activeOpenings: 60,
  },
  {
    id: "job-3",
    roleTitle: "Clinical Data Management Analyst",
    companyName: "Accenture Life Sciences",
    companyType: "IT-Pharma Services",
    location: "Bengaluru / Mumbai",
    experience: "0 - 2 Years",
    degreesAccepted: ["B.Pharm", "Life Sciences", "Biotech"],
    keySkills: ["Medidata Rave EDC (70% JD)", "eCRF Queries", "CDISC SDTM"],
    postedDate: "3 days ago",
    activeOpenings: 38,
  },
  {
    id: "job-4",
    roleTitle: "Clinical Trial Associate / CRA Monitor",
    companyName: "Parexel International",
    companyType: "MNC CRO",
    location: "Hyderabad / Bengaluru",
    experience: "0 - 2 Years",
    degreesAccepted: ["Pharm.D", "M.Pharm", "B.Pharm"],
    keySkills: ["Source Data Verification (SDV)", "ICH-GCP E6(R2)", "Veeva Vault CTMS"],
    postedDate: "4 days ago",
    activeOpenings: 32,
  },
  {
    id: "job-5",
    roleTitle: "Healthcare Data Analyst (RWE)",
    companyName: "Optum (UnitedHealth Group)",
    companyType: "Health Tech",
    location: "Hyderabad / NCR",
    experience: "0 - 2 Years",
    degreesAccepted: ["B.Pharm", "Pharm.D", "Biotech", "Biostatistics"],
    keySkills: ["SQL & PowerBI (35% JD)", "EHR Claims Data", "SAS / Python"],
    postedDate: "Just now",
    activeOpenings: 75,
  },
];

export const CAREER_ADVISORS: CareerAdvisor[] = [
  {
    id: "adv-1",
    name: "Dr. Ananya Sharma, Pharm.D",
    title: "Senior PV Specialist — IQVIA India (8 Yrs)",
    background: "Led ICSR case processing and MedDRA coding operations at IQVIA Hyderabad for 5 years before transitioning to signal detection and risk management. Has interviewed 200+ B.Pharm and Pharm.D freshers for entry-level PV roles across IQVIA, Cognizant Health Sciences, and Parexel.",
    yearsExp: 8,
    expertiseAreas: ["Pharmacovigilance", "MedDRA Coding", "ICSR Narratives", "Signal Detection", "E2B(R3)"],
    qualifications: ["Pharm.D", "Certified PV Professional (CPVP)", "ICH-GCP Auditor"],
    industries: ["MNC CROs", "IT-Pharma GCCs", "Multinational Pharma"],
    avatar: "",
  },
  {
    id: "adv-2",
    name: "Vikramaditya Rao, M.Pharm",
    title: "CDM Lead & CRA — Parexel / Quintiles (10 Yrs)",
    background: "Started as a CDM associate at Quintiles in Bengaluru, progressed to CRA and now leads clinical data management for Phase II/III oncology trials at Parexel. Specialises in Medidata Rave EDC, CDISC SDTM standards, and site monitoring. Has guided 300+ freshers into clinical research roles.",
    yearsExp: 10,
    expertiseAreas: ["Clinical Data Management", "Regulatory Affairs", "Clinical Trial Operations", "CDISC SDTM", "ATS Resume Optimization"],
    qualifications: ["M.Pharm (RA)", "RAPS Regulatory Certificate", "ICH-GCP E6(R2) Certified"],
    industries: ["Global CROs", "Top Indian Pharma", "US FDA Filing Teams"],
    avatar: "",
  },
  {
    id: "adv-3",
    name: "Priya Nair, M.Sc Biostatistics",
    title: "Healthcare Data Analytics & RWE Specialist — Optum (7 Yrs)",
    background: "Lead Health Data Specialist at Optum with deep expertise in SQL cohort extraction, PowerBI dashboards, and Real-World Evidence (RWE) analytics for payer and provider networks. Helps Life Sciences and Biotech graduates map into healthcare data and informatics roles.",
    yearsExp: 7,
    expertiseAreas: ["Healthcare Data Science", "RWE Analytics", "SQL & PowerBI", "Health Informatics", "Technical Skill Gap Analysis"],
    qualifications: ["M.Sc Biostatistics", "Microsoft Certified PowerBI Analyst", "Python for Healthcare Data"],
    industries: ["US Healthcare IT", "Health Analytics", "EHR & Claims Data"],
    avatar: "",
  },
];

export const CAREER_COMPARISON_MATRIX = {
  id: "pv_vs_cr",
  career1: "Pharmacovigilance",
  career2: "Clinical Research",
  typicalWork1: "Drug safety case processing, adverse event coding, medical narrative drafting, signal evaluation.",
  typicalWork2: "On-site trial monitoring, patient consent verification, investigator meeting coordination, trial protocol audits.",
  commonBg1: "B.Pharm (45%), Pharm.D (30%), M.Pharm (15%), Life Sciences (10%)",
  commonBg2: "Pharm.D (40%), M.Pharm (30%), B.Pharm (20%), Life Sciences (10%)",
  commonSkills1: "MedDRA coding, ICSR narrative writing, ICH E2B(R3) guidelines, causality assessment.",
  commonSkills2: "ICH-GCP E6(R2) compliance, site monitoring (SDV), informed consent audit, protocol management.",
  typicalTools1: "Argus Safety (75% JD), MedDRA (80% JD), WHODrug (65% JD), Veeva Vault Safety",
  typicalTools2: "Veeva Vault CTMS (55% JD), Medidata Rave EDC (70% JD), eTMF Systems",
  workEnv1: "Corporate office or hybrid setup (IT-Pharma GCCs & CROs)",
  workEnv2: "Office / Hospital trial site monitoring / Hybrid",
  demand1: "High (400–600 monthly openings in Hyd/Blr)",
  demand2: "High (480+ active trial monitor openings)",
  salary1: "Entry: ₹3.0–5.0 LPA | Mid: ₹5.0–9.5 LPA",
  salary2: "Entry: ₹3.2–5.5 LPA | Mid: ₹5.5–10.5 LPA",
};
