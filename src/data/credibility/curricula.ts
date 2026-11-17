/**
 * Role-Based Job Training Programs and Downloadable Course Curricula.
 */

export interface CurriculumModule {
  week: string;
  title: string;
  topics: string[];
}

export interface TrainingProgram {
  id: string;
  slug: string;
  roleName: string;
  duration: string;
  targetAudience: string;
  bannerImage: string;
  summary: string;
  toolsMastered: string[];
  salaryRange: string;
  modules: CurriculumModule[];
  pdfDownloadUrl: string;
  pdfFileSize: string;
  accreditationNote: string;
}

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "prog-pv",
    slug: "pharmacovigilance",
    roleName: "Pharmacovigilance & Drug Safety Associate",
    duration: "12 Weeks (Full Practicum)",
    targetAudience: "B.Pharm, M.Pharm, Pharm.D, BDS & MBBS Graduates",
    bannerImage: "/images/ai-pv.jpg",
    summary:
      "Hands-on case processing, ICSR intake, MedDRA adverse event coding, causality assessment, and regulatory submission reporting compliant with USFDA and EMA guidelines.",
    toolsMastered: ["Oracle Argus Safety", "MedDRA 27.0", "WHO-UMC Causality", "CIOMS Form I"],
    salaryRange: "₹3.8L - ₹6.5L CTC Entry-Level",
    pdfDownloadUrl: "/Arzon_2026_Healthcare_Career_Starter_Kit.pdf",
    pdfFileSize: "2.1 MB · Official PDF",
    accreditationNote: "Aligned with Good Pharmacovigilance Practices (GVP) Module VI & IX",
    modules: [
      {
        week: "Weeks 1–3",
        title: "Clinical Safety Fundamentals & GVP Framework",
        topics: ["ICH-E2A / E2B(R3) Guidelines", "Spontaneous vs Solicited Reporting", "Minimum 4 Criteria for Valid ICSR"],
      },
      {
        week: "Weeks 4–7",
        title: "MedDRA Terminology & Case Triage Operations",
        topics: ["System Organ Class (SOC) to Preferred Terms (PT)", "Serious Adverse Event (SAE) Triage", "Narrative Drafting"],
      },
      {
        week: "Weeks 8–10",
        title: "Hands-on Oracle Argus Safety Simulation",
        topics: ["Book-in, Data Entry & Event Coding", "Lab Test Tabulation & Product Suspect Evaluation", "Quality Review (QC) Checks"],
      },
      {
        week: "Weeks 11–12",
        title: "Aggregate Reporting & Mock Interview Defense",
        topics: ["PSUR/PBRER Concepts", "Signal Detection Basics", "Technical Case-Defense Viva"],
      },
    ],
  },
  {
    id: "prog-cdm",
    slug: "clinical-data-management",
    roleName: "Clinical Data Management (CDM) Specialist",
    duration: "12 Weeks (Full Practicum)",
    targetAudience: "Life Sciences, Biotechnology, B.Pharm & Science Graduates",
    bannerImage: "/images/ai-cdm.jpg",
    summary:
      "End-to-end clinical trial data lifecycle management: eCRF design, data validation specifications (DVS), query discrepancy management, and database lock preparation.",
    toolsMastered: ["Rave EDC Simulation", "CDASH Standards", "SDTM Basics", "eCRF Builders"],
    salaryRange: "₹3.6L - ₹6.0L CTC Entry-Level",
    pdfDownloadUrl: "/The_Healthcare_Career_Intelligence_Guide_2026.pdf",
    pdfFileSize: "2.2 MB · Official PDF",
    accreditationNote: "Aligned with GCDMP (Good Clinical Data Management Practice) & CDISC",
    modules: [
      {
        week: "Weeks 1–3",
        title: "Clinical Trial Protocols & Data Architecture",
        topics: ["Phase I–IV Trial Protocols", "CDASH Standard Domain Mapping", "eCRF Module Layout Design"],
      },
      {
        week: "Weeks 4–7",
        title: "Edit Check Specifications & Data Validation",
        topics: ["Data Management Plan (DMP)", "Writing Logical Edit Checks (DVS)", "User Acceptance Testing (UAT)"],
      },
      {
        week: "Weeks 8–10",
        title: "Discrepancy Handling & Query Resolution",
        topics: ["Site Queries vs System Auto-Queries", "External Vendor Data Reconciliation", "SAE Reconciliation"],
      },
      {
        week: "Weeks 11–12",
        title: "Audit Trails, Freeze & Final Database Lock",
        topics: ["Blind Review Procedures", "Database Soft Lock vs Hard Lock", "Regulatory Archiving"],
      },
    ],
  },
  {
    id: "prog-medical-coding",
    slug: "medical-coding",
    roleName: "Medical Coding & Clinical Informatics Specialist",
    duration: "14 Weeks (CPC Exam Prep Track)",
    targetAudience: "Life Sciences, Nursing, Physiotherapy, B.Pharm & Allied Health",
    bannerImage: "/images/ai-coding.jpg",
    summary:
      "Accurate alphanumeric translation of healthcare diagnoses, clinical procedures, medical services, and supplies for revenue cycle management and international hospital billing.",
    toolsMastered: ["ICD-10-CM", "CPT-4 Manuals", "HCPCS Level II", "EncoderPro Software"],
    salaryRange: "₹3.5L - ₹5.8L CTC Entry-Level",
    pdfDownloadUrl: "/Arzon_2026_Healthcare_Career_Starter_Kit.pdf",
    pdfFileSize: "2.1 MB · Official PDF",
    accreditationNote: "Prepared in accordance with AAPC CPC & AHIMA CCS Industry Standards",
    modules: [
      {
        week: "Weeks 1–4",
        title: "Human Anatomy, Physiology & Pathology Foundations",
        topics: ["Organ Systems & Clinical Terminology", "Disease Etiology & Diagnostic Pathways", "Pharmacology for Coders"],
      },
      {
        week: "Weeks 5–8",
        title: "ICD-10-CM Diagnostic Coding Rules",
        topics: ["General Coding Guidelines (Chapters 1–22)", "Infections, Neoplasms, Diabetes Coding", "Z-Codes & External Causes"],
      },
      {
        week: "Weeks 9–11",
        title: "CPT Procedural Coding & Modifiers",
        topics: ["Evaluation and Management (E/M) 2024–2026 Rules", "Surgical Coding & Anesthesia", "Modifiers 25, 59, 79 Application"],
      },
      {
        week: "Weeks 12–14",
        title: "HCPCS, HIPAA Compliance & AAPC Mock Exams",
        topics: ["Durable Medical Equipment (DME)", "Fraud, Waste & Abuse Compliance", "Timed 100-Question Simulated Exams"],
      },
    ],
  },
  {
    id: "prog-regulatory-affairs",
    slug: "regulatory-affairs",
    roleName: "Regulatory Affairs & Quality Compliance Officer",
    duration: "10 Weeks (Specialist Track)",
    targetAudience: "M.Pharm, Pharm.D, MSc Chemistry & Life Sciences Postgraduates",
    bannerImage: "/images/ai-ra.jpg",
    summary:
      "International pharmaceutical regulatory submissions, eCTD Module 1–5 compilation, dossier filings, and post-approval variations across USFDA, EMA, and CDSCO jurisdictions.",
    toolsMastered: ["eCTD Structure", "Module 1–5 Dossiers", "USFDA 21 CFR", "CDSCO SUGAM"],
    salaryRange: "₹4.0L - ₹7.0L CTC Entry-Level",
    pdfDownloadUrl: "/The_Healthcare_Career_Intelligence_Guide_2026.pdf",
    pdfFileSize: "2.2 MB · Official PDF",
    accreditationNote: "Compliant with ICH M4 & eCTD v3.2.2 / v4.0 Specifications",
    modules: [
      {
        week: "Weeks 1–3",
        title: "Global Drug Discovery & Regulatory Lifecycle",
        topics: ["IND, NDA, ANDA pathways", "USFDA, EMA & Rest of World (RoW) Markets", "DMF (Drug Master Files) Preparation"],
      },
      {
        week: "Weeks 4–7",
        title: "eCTD Dossier Compilation (Modules 1 to 5)",
        topics: ["Module 2 Summaries & Module 3 Quality (CMC)", "Module 4 Nonclinical & Module 5 Clinical Reports", "Validation Checks"],
      },
      {
        week: "Weeks 8–10",
        title: "Post-Approval Changes & Regulatory Inspections",
        topics: ["Variations (Major, Minor, Type IA/IB/II)", "Labeling & Package Leaflet Updates", "Handling Regulatory Queries (CRL)"],
      },
    ],
  },
];
