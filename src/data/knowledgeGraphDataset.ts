/**
 * Arzon Global & Arzon Careers · Role-to-Skill-to-Tool Structured Knowledge Graph.
 *
 * Establishes the authoritative 3-layer diagnostic model:
 * - Layer A: Industry Requirements (What employers ask for in JDs)
 * - Layer B: Arzon Curriculum (What Arzon teaches in 12-week role training)
 * - Layer C: Applied Internship (Hands-on deliverables & ISO 9001 credential)
 */

export interface RoleDiagnosticNode {
  roleSlug: string;
  roleTitle: string;
  shortDesc: string;
  targetDegrees: string[];
  primaryDomains: string[];
  
  // Layer A: What Employers Ask For (Industry Requirement)
  employerRequirements: {
    responsibilities: string[];
    demandedSkills: string[];
    industryTools: string[];
    commonDesignations: string[];
    entrySalaryRange: string;
  };

  // Layer B: What Arzon Teaches (Curriculum)
  arzonCurriculum: {
    trackName: string;
    trackSlug: string;
    durationWeeks: number;
    keyModules: string[];
    softwareTaught: string[];
  };

  // Layer C: Applied Internship & Practical Exposure
  appliedInternship: {
    internshipTitle: string;
    deliverables: string[];
    toolsUsed: string[];
    credentialType: string;
    isoVerified: boolean;
  };
}

export const DIAGNOSTIC_ROLE_NODES: Record<string, RoleDiagnosticNode> = {
  pharmacovigilance: {
    roleSlug: "pharmacovigilance",
    roleTitle: "Drug Safety & Pharmacovigilance Associate",
    shortDesc: "Triage adverse event reports (ICSRs), execute case entries in Oracle Argus, perform MedDRA coding, and draft safety summaries for regulatory submissions.",
    targetDegrees: ["bpharm", "pharmd", "msc", "bsc"],
    primaryDomains: ["pv", "safety", "clinical-research"],
    
    employerRequirements: {
      responsibilities: [
        "ICSR case processing and data entry from spontaneously reported adverse events.",
        "Medical coding of reported adverse events and medical history using MedDRA dictionary hierarchies.",
        "Causality assessment, triage, and seriousness evaluation per FDA/EMA regulatory guidelines.",
        "Drafting narrative summaries for PSUR (Periodic Safety Update Reports) and PBRER."
      ],
      demandedSkills: [
        "Adverse Event Narrative Writing",
        "MedDRA Terminology Hierarchy (SOC, HLGT, HLT, PT, LLT)",
        "FDA 21 CFR Part 314 & E2B(R3) Electronic Transmission Rules",
        "Case Seriousness & Expectedness Evaluation"
      ],
      industryTools: [
        "Oracle Argus Safety 8.4+",
        "MedDRA Dictionary 27.0",
        "ARISg Safety Suite",
        "E2B Gateway Parsers"
      ],
      commonDesignations: [
        "Drug Safety Associate (DSA)",
        "Pharmacovigilance Officer",
        "Safety Data Processing Specialist",
        "ICSR Processing Associate"
      ],
      entrySalaryRange: "₹3.8L – ₹5.8L LPA"
    },

    arzonCurriculum: {
      trackName: "12-Week Pharmacovigilance & Safety Reporting Track",
      trackSlug: "pharmacovigilance",
      durationWeeks: 12,
      keyModules: [
        "Module 1: Global Regulatory Frameworks (FDA, EMA, CDSCO)",
        "Module 2: ICSR Case Intake & Triage Protocol",
        "Module 3: Hands-On Oracle Argus Safety Case Management",
        "Module 4: MedDRA Medical Coding & Auto-Encoding Rules",
        "Module 5: Narrative Writing & Aggregate Safety Reporting"
      ],
      softwareTaught: ["Oracle Argus Safety 8.4", "MedDRA 27.0 Browser", "Arzon ICSR Simulator"]
    },

    appliedInternship: {
      internshipTitle: "4-Week Oracle Argus ICSR Case Safety Internship",
      deliverables: [
        "Processed 25+ real-world ICSR cases through intake, coding, and narrative drafting",
        "MedDRA medical coding audit sheet with 100% dictionary term validation",
        "E2B XML export validation file for regulatory submission practice"
      ],
      toolsUsed: ["Oracle Argus Safety 8.4", "MedDRA Browser", "Arzon ICSR Sandbox"],
      credentialType: "ISO 9001:2015 Verifiable Applied Internship Credential",
      isoVerified: true
    }
  },

  "clinical-data-management": {
    roleSlug: "clinical-data-management",
    roleTitle: "Clinical Data Coordinator / CDM Specialist",
    shortDesc: "Design Electronic Case Report Forms (eCRFs), validate clinical trial data entry, manage data queries, and audit database lock readiness.",
    targetDegrees: ["bpharm", "pharmd", "msc", "bsc", "biotech"],
    primaryDomains: ["cdm", "data", "clinical-research"],

    employerRequirements: {
      responsibilities: [
        "Review eCRF data entries for completeness, logic consistency, and protocol compliance.",
        "Generate and resolve data clarification forms (DCFs / queries) with clinical trial sites.",
        "Perform medical coding for concomitant medications using WHO Drug Global.",
        "Assist in Data Management Plan (DMP) execution and database lock verification."
      ],
      demandedSkills: [
        "eCRF Design & Edit Check Specification",
        "Clinical Query Lifecycle Management",
        "GCDMP (Good Clinical Data Management Practice) Compliance",
        "WHO Drug Global & MedDRA Coding"
      ],
      industryTools: [
        "Medidata RAVE EDC",
        "Oracle Clinical / Inform",
        "REDCap Clinical",
        "Veeva Vault EDC"
      ],
      commonDesignations: [
        "Clinical Data Associate (CDA)",
        "CDM Coordinator",
        "Clinical Data Manager",
        "eCRF Data Validation Specialist"
      ],
      entrySalaryRange: "₹4.0L – ₹6.2L LPA"
    },

    arzonCurriculum: {
      trackName: "12-Week Clinical Data Management Track",
      trackSlug: "clinical-data-management",
      durationWeeks: 12,
      keyModules: [
        "Module 1: Clinical Trial Data Architecture & Protocol Parsing",
        "Module 2: eCRF Design Standards & CDASH Implementation",
        "Module 3: Medidata RAVE & EDC Data Entry Validation",
        "Module 4: Query Generation, Site Communication & Resolution",
        "Module 5: Database Locking Protocols & Reconciliation"
      ],
      softwareTaught: ["Medidata RAVE EDC Sandbox", "CDASH Standards", "Arzon EDC Query Workbench"]
    },

    appliedInternship: {
      internshipTitle: "4-Week Clinical eCRF Data Validation Internship",
      deliverables: [
        "Built 1 comprehensive study eCRF workflow per CDASH guidelines",
        "Issued and resolved 40+ clinical queries across simulated site data entries",
        "Completed 1 full clinical study database lock readiness audit"
      ],
      toolsUsed: ["Medidata RAVE Sandbox", "CDASH Guidelines", "Arzon Query Log Studio"],
      credentialType: "ISO 9001:2015 Verifiable Applied Internship Credential",
      isoVerified: true
    }
  },

  "medical-coding": {
    roleSlug: "medical-coding",
    roleTitle: "Certified Medical Coder (CPC / Diagnostic Chart Auditor)",
    shortDesc: "Audit clinical progress notes, extract diagnoses and procedures, and assign compliant ICD-10-CM, CPT, and HCPCS Level II codes for US healthcare RCM.",
    targetDegrees: ["bpharm", "pharmd", "msc", "bsc", "biotech"],
    primaryDomains: ["coding", "rcm", "healthcare"],

    employerRequirements: {
      responsibilities: [
        "Analyze medical records and operative reports to identify billable diagnoses and procedures.",
        "Assign accurate ICD-10-CM diagnostic codes and CPT-4 procedure codes per official coding guidelines.",
        "Ensure compliance with HIPAA, NCCI edits, and payer coverage determinations.",
        "Perform claim denial audits and query physicians for ambiguous clinical documentation."
      ],
      demandedSkills: [
        "ICD-10-CM Official Coding Guidelines 2026",
        "CPT-4 Procedure Coding & Modifier Application",
        "Anatomy, Pathophysiology & Medical Terminology Parsing",
        "NCCI Edit Checks & Claim Denial Resolution"
      ],
      industryTools: [
        "Optum EncoderPro",
        "3M HIS Coding Suite",
        "AAPC Coder",
        "Epic Systems EHR"
      ],
      commonDesignations: [
        "Junior Medical Coder",
        "Chart Auditor",
        "Medical Coding Analyst",
        "CPC Trainee Coder"
      ],
      entrySalaryRange: "₹3.5L – ₹5.0L LPA"
    },

    arzonCurriculum: {
      trackName: "12-Week Medical Coding & Chart Auditing Track",
      trackSlug: "medical-coding",
      durationWeeks: 12,
      keyModules: [
        "Module 1: Clinical Anatomy, Physiology & Pathology Review",
        "Module 2: ICD-10-CM Guidelines (Chapters 1–22)",
        "Module 3: CPT-4 Surgical & Evaluation & Management Coding",
        "Module 4: HCPCS Level II & Modifier Rules",
        "Module 5: Chart Auditing, NCCI Edits & AAPC CPC Exam Practice"
      ],
      softwareTaught: ["EncoderPro Sandbox", "ICD-10-CM Codebook 2026", "Arzon Chart Auditor"]
    },

    appliedInternship: {
      internshipTitle: "4-Week Clinical Chart Auditing & Coding Internship",
      deliverables: [
        "Audited 50+ anonymized clinical patient charts for diagnostic coding accuracy",
        "Generated 1 full NCCI claim edit correction report",
        "Passed Arzon Simulated AAPC CPC Audit Benchmark with >85% score"
      ],
      toolsUsed: ["EncoderPro Suite", "ICD-10-CM 2026", "Arzon Chart Audit Engine"],
      credentialType: "ISO 9001:2015 Verifiable Applied Internship Credential",
      isoVerified: true
    }
  },

  "healthcare-analytics": {
    roleSlug: "healthcare-analytics",
    roleTitle: "Clinical SAS Programmer / Healthcare Data Analyst",
    shortDesc: "Transform raw clinical trial data into FDA-compliant CDISC SDTM and ADaM domain datasets and generate Tables, Listings, and Figures (TLFs).",
    targetDegrees: ["bpharm", "msc", "bsc", "biotech", "tech"],
    primaryDomains: ["sas", "data", "analytics"],

    employerRequirements: {
      responsibilities: [
        "Write SAS programs to import, clean, merge, and transform raw clinical data.",
        "Implement CDISC SDTM (v1.7) mapping specifications from protocol annotated CRFs.",
        "Create ADaM analysis datasets for biostatistical evaluation.",
        "Generate FDA-compliant Tables, Listings, and Figures (TLFs) using PROC REPORT and PROC TABULATE."
      ],
      demandedSkills: [
        "Base SAS & Advanced SAS Macro Programming",
        "PROC SQL Data Aggregation & Joins",
        "CDISC SDTM & ADaM Data Standards",
        "Clinical Trial Protocol Data Parsing"
      ],
      industryTools: [
        "SAS Studio / SAS Enterprise Guide",
        "PROC SQL Engine",
        "Pinnacle 21 Community (Validator)",
        "Python / R Data Libraries"
      ],
      commonDesignations: [
        "Statistical Programmer I",
        "Clinical SAS Programmer",
        "Healthcare Data Analyst",
        "Biostatistical Data Associate"
      ],
      entrySalaryRange: "₹4.5L – ₹7.5L LPA"
    },

    arzonCurriculum: {
      trackName: "12-Week Clinical SAS & Data Analytics Track",
      trackSlug: "healthcare-analytics",
      durationWeeks: 12,
      keyModules: [
        "Module 1: SAS Syntax, Data Steps & Variable Transformations",
        "Module 2: PROC SQL Data Manipulations & Complex Joins",
        "Module 3: SAS Macros & Automated Code Generation",
        "Module 4: CDISC SDTM Domain Mapping (DM, AE, VS, LB, CM)",
        "Module 5: Generating FDA-Compliant Summary TLFs"
      ],
      softwareTaught: ["SAS Studio", "PROC SQL", "Pinnacle 21 Validator", "CDISC SDTM v1.7"]
    },

    appliedInternship: {
      internshipTitle: "4-Week CDISC SDTM Clinical Dataset Mapping Internship",
      deliverables: [
        "Mapped raw clinical trial data into 5 core SDTM domains (Demographics, Adverse Events, Vital Signs, Labs, ConMeds)",
        "Executed Pinnacle 21 validation checks with 0 critical compliance errors",
        "Generated 1 full FDA-compliant summary table report using PROC REPORT"
      ],
      toolsUsed: ["SAS Studio", "Pinnacle 21", "CDISC SDTM Standard Library"],
      credentialType: "ISO 9001:2015 Verifiable Applied Internship Credential",
      isoVerified: true
    }
  }
};

/**
 * Helper function to match diagnostic query parameters to structured knowledge node.
 */
export function getDiagnosticRecommendation(
  problem: string,
  stage: string,
  degree: string,
  interest: string
): RoleDiagnosticNode {
  // If specific interest selected
  if (interest === "pv" || (interest === "auto" && degree === "bpharm" && problem !== "skill-gap")) {
    return DIAGNOSTIC_ROLE_NODES.pharmacovigilance;
  }
  if (interest === "analytics" || (interest === "auto" && (degree === "tech" || degree === "msc"))) {
    return DIAGNOSTIC_ROLE_NODES["healthcare-analytics"];
  }
  if (interest === "coding" || problem === "practical-exp") {
    return DIAGNOSTIC_ROLE_NODES["medical-coding"];
  }
  if (interest === "cdm" || problem === "internship") {
    return DIAGNOSTIC_ROLE_NODES["clinical-data-management"];
  }

  // Fallback default based on degree
  if (degree === "bpharm" || degree === "pharmd") {
    return DIAGNOSTIC_ROLE_NODES.pharmacovigilance;
  }
  return DIAGNOSTIC_ROLE_NODES["medical-coding"];
}
