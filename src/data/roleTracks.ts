import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Shield,
  FileCheck2,
  Database,
  FileText,
  FlaskConical,
  LineChart,
  PenLine,
  Stethoscope,
  Activity,
} from "lucide-react";

export type RoleTier = "Tier 1 · Launch First" | "Tier 2 · Next Wave" | "Tier 3 · Researching";

export interface JDSkillFrequency {
  skill: string;
  percentage: number;
  category: "core" | "tool" | "compliance" | "analytical";
}

export interface RoleTrack {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  wave: number;
  tier: RoleTier;
  status: "active" | "enrolling" | "coming_soon" | "researching";
  iconName: string;
  jdCountAnalyzed: number;
  entryLevelListings: string;
  salaryRange: string;
  durationWeeks: number;
  sampleEmployers: string[];
  skillsFrequency: JDSkillFrequency[];
  keyModules: string[];
  targetDegrees: string[];
  heroBadge: string;
}

export const ROLE_TRACKS: RoleTrack[] = [
  {
    id: "medical-coder",
    slug: "medical-coding",
    title: "Fresher Medical Coder",
    shortTitle: "Medical Coder",
    tagline: "Classify clinical procedures & diagnoses using ICD-10-CM, CPT, and HCPCS coding guidelines.",
    wave: 1,
    tier: "Tier 1 · Launch First",
    status: "enrolling",
    iconName: "Code2",
    jdCountAnalyzed: 921,
    entryLevelListings: "855+ Active Openings",
    salaryRange: "₹4.5 – 9.5 LPA",
    durationWeeks: 12,
    sampleEmployers: ["R1 RCM", "CorroHealth", "Omega Healthcare", "Access Healthcare", "Optum"],
    skillsFrequency: [
      { skill: "ICD-10-CM & CPT Coding", percentage: 94, category: "core" },
      { skill: "Human Anatomy & Pathophysiology", percentage: 88, category: "core" },
      { skill: "Medical Terminology & Chart Auditing", percentage: 82, category: "analytical" },
      { skill: "HCPCS Level II Standards", percentage: 76, category: "compliance" },
      { skill: "3M Encoder & EHR Systems", percentage: 68, category: "tool" },
      { skill: "HIPAA & Compliance Auditing", percentage: 61, category: "compliance" },
    ],
    keyModules: [
      "Medical Terminology & Systemic Anatomy Breakdown",
      "ICD-10-CM Official Coding Guidelines for Outpatient/Inpatient",
      "CPT Surgical Procedures & Modifiers Mastery",
      "Real-World Patient Chart Auditing & Claim Error Resolution",
    ],
    targetDegrees: ["B.Pharm", "B.Sc Life Sciences", "BAMS/BHMS", "Nursing", "Biotechnology"],
    heroBadge: "⚡ Wave 1 · Highest Entry-Level Volume",
  },
  {
    id: "pv-associate",
    slug: "pharmacovigilance",
    title: "Fresher Pharmacovigilance Associate",
    shortTitle: "PV Associate",
    tagline: "Process adverse event cases, draft narratives, and ensure global regulatory compliance.",
    wave: 2,
    tier: "Tier 1 · Launch First",
    status: "active",
    iconName: "Shield",
    jdCountAnalyzed: 87,
    entryLevelListings: "27+ Verified Fresher Roles",
    salaryRange: "₹5.0 – 14.0 LPA",
    durationWeeks: 12,
    sampleEmployers: ["TCS", "Accenture", "ProPharma", "Syneos Health", "IQVIA"],
    skillsFrequency: [
      { skill: "Drug Safety Fundamentals", percentage: 82, category: "core" },
      { skill: "ICSR Case Processing & Narrative Writing", percentage: 71, category: "core" },
      { skill: "MedDRA & WHO-Drug Coding", percentage: 64, category: "tool" },
      { skill: "AE/SAE Triage & Causality Assessment", percentage: 61, category: "analytical" },
      { skill: "FDA & EMA Regulatory Compliance", percentage: 54, category: "compliance" },
      { skill: "Safety Database Navigation (Argus/ArisG)", percentage: 48, category: "tool" },
    ],
    keyModules: [
      "Adverse Event Detection & ICSR Intake Triage",
      "MedDRA Hierarchy & Medical Coding Practice",
      "Case Narrative Writing & Quality Control Standards",
      "Argus Safety Database Hands-on Case Simulation",
    ],
    targetDegrees: ["B.Pharm", "M.Pharm", "Pharm.D", "B.Sc/M.Sc Life Sciences"],
    heroBadge: "★ Wave 2 · Direct Partner Desk Fast-Track",
  },
  {
    id: "clinical-research-coordinator",
    slug: "clinical-research",
    title: "Fresher Clinical Research Coordinator",
    shortTitle: "CRC Coordinator",
    tagline: "Manage clinical trial site operations, patient consent, ICH-GCP logs, and audit readiness.",
    wave: 3,
    tier: "Tier 1 · Launch First",
    status: "enrolling",
    iconName: "FileCheck2",
    jdCountAnalyzed: 142,
    entryLevelListings: "64+ Site Openings",
    salaryRange: "₹4.8 – 11.0 LPA",
    durationWeeks: 12,
    sampleEmployers: ["Fortis Healthcare", "Apollo Research", "Max Healthcare", "IQVIA Sites"],
    skillsFrequency: [
      { skill: "ICH-GCP E6(R2) Compliance", percentage: 91, category: "compliance" },
      { skill: "Informed Consent Form (ICF) Workflow", percentage: 85, category: "core" },
      { skill: "Site Master File (TMF/ISF) Maintenance", percentage: 79, category: "core" },
      { skill: "Protocol Deviation & SAE Reporting", percentage: 72, category: "analytical" },
      { skill: "Patient Recruitment & Retention Protocol", percentage: 66, category: "core" },
      { skill: "IRB / Ethics Committee Submissions", percentage: 58, category: "compliance" },
    ],
    keyModules: [
      "ICH-GCP Guidelines & Site Operations Governance",
      "Informed Consent Process & Patient Log Tracking",
      "Source Document Verification & Trial Master File Audit",
      "Investigator Site Inspection & Audit Preparedness",
    ],
    targetDegrees: ["B.Pharm", "M.Pharm", "Pharm.D", "Nursing", "Biotechnology", "Microbiology"],
    heroBadge: "🚀 Wave 3 · Clinical Trial Site Operations",
  },
  {
    id: "clinical-data-associate",
    slug: "clinical-data-management",
    title: "Fresher Clinical Data Associate",
    shortTitle: "Clinical Data Associate",
    tagline: "Clean, validate, and query trial data across Electronic Data Capture (EDC) systems.",
    wave: 4,
    tier: "Tier 1 · Launch First",
    status: "enrolling",
    iconName: "Database",
    jdCountAnalyzed: 129,
    entryLevelListings: "52+ Active Associate Listings",
    salaryRange: "₹5.2 – 12.5 LPA",
    durationWeeks: 12,
    sampleEmployers: ["IQVIA", "Accenture", "TCS", "Cognizant", "Parexel"],
    skillsFrequency: [
      { skill: "Clinical Data Validation & Discrepancy Mgmt", percentage: 89, category: "core" },
      { skill: "EDC Systems (Medidata Rave / Redcap)", percentage: 81, category: "tool" },
      { skill: "Data Cleaning & Query Generation", percentage: 76, category: "analytical" },
      { skill: "Data Management Plan (DMP) Review", percentage: 67, category: "compliance" },
      { skill: "Excel Data Auditing & VLOOKUP/Pivot", percentage: 62, category: "tool" },
      { skill: "GCDMP & CDISC SDTM Concepts", percentage: 55, category: "compliance" },
    ],
    keyModules: [
      "Clinical Trial Data Life Cycle & DMP Execution",
      "EDC Navigation & Automated Discrepancy Management",
      "Data Reconciliation, Self-Evident Corrections & Queries",
      "Database Lock Procedures & Quality Auditing",
    ],
    targetDegrees: ["B.Pharm", "M.Pharm", "B.Sc/M.Sc Stats", "B.Tech BioTech", "BCA/B.Sc CS"],
    heroBadge: "💡 Wave 4 · Healthcare + Tech + Analytics",
  },
  {
    id: "regulatory-affairs-associate",
    slug: "regulatory-affairs",
    title: "Fresher Regulatory Affairs Associate",
    shortTitle: "RA Associate",
    tagline: "Prepare CTD/eCTD dossier submissions, support document reviews, and follow global health authority guidelines.",
    wave: 5,
    tier: "Tier 1 · Launch First",
    status: "enrolling",
    iconName: "FileText",
    jdCountAnalyzed: 764,
    entryLevelListings: "60+ Entry-Level Listings",
    salaryRange: "₹4.5 – 10.5 LPA",
    durationWeeks: 12,
    sampleEmployers: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Torrent Pharma"],
    skillsFrequency: [
      { skill: "CTD / eCTD Dossier Structure (Modules 1–5)", percentage: 86, category: "core" },
      { skill: "USFDA, EMA & CDSCO Guidelines", percentage: 80, category: "compliance" },
      { skill: "Regulatory Document Auditing & Proofing", percentage: 73, category: "analytical" },
      { skill: "Labeling & Package Leaflet Compliance", percentage: 64, category: "core" },
      { skill: "Post-Approval Changes & Variations", percentage: 57, category: "compliance" },
      { skill: "Global Regulatory Intelligence Scanning", percentage: 49, category: "analytical" },
    ],
    keyModules: [
      "Global Health Authority Frameworks (CDSCO, FDA, EMA)",
      "CTD Dossier Preparation (Module 1 to Module 5)",
      "Publishing & Electronic Submissions (eCTD Overview)",
      "Lifecycle Management & Regulatory Query Handling",
    ],
    targetDegrees: ["B.Pharm", "M.Pharm", "M.Sc Chemistry", "Life Sciences"],
    heroBadge: "📋 Wave 5 · Global Pharma Submissions",
  },
  {
    id: "quality-assurance-associate",
    slug: "pharmaceutical-qa",
    title: "Fresher Quality Assurance Associate",
    shortTitle: "QA Associate",
    tagline: "GMP compliance, QMS documentation, CAPA tracking, and manufacturing plant audit readiness.",
    wave: 6,
    tier: "Tier 2 · Next Wave",
    status: "coming_soon",
    iconName: "FlaskConical",
    jdCountAnalyzed: 101,
    entryLevelListings: "26+ Entry-Level Roles",
    salaryRange: "₹4.0 – 9.0 LPA",
    durationWeeks: 12,
    sampleEmployers: ["Aurobindo", "Mylan", "Biocon", "Hetero Labs"],
    skillsFrequency: [
      { skill: "cGMP & WHO-GMP Protocols", percentage: 92, category: "compliance" },
      { skill: "Quality Management System (QMS)", percentage: 84, category: "core" },
      { skill: "Deviation, OOS & CAPA Investigation", percentage: 78, category: "analytical" },
      { skill: "Batch Manufacturing Record (BMR) Review", percentage: 70, category: "core" },
    ],
    keyModules: [
      "cGMP Environment & Documented Quality Controls",
      "Root Cause Analysis & CAPA Log Management",
      "Auditing Batch Records & Release Protocols",
    ],
    targetDegrees: ["B.Pharm", "M.Pharm", "B.Sc Chemistry"],
    heroBadge: "⏳ Wave 6 · Coming Soon",
  },
  {
    id: "healthcare-data-analyst",
    slug: "healthcare-analytics",
    title: "Fresher Healthcare Data Analyst",
    shortTitle: "Healthcare Data Analyst",
    tagline: "Analyze patient outcomes, claims data, and hospital metrics using SQL, Power BI, and Python.",
    wave: 7,
    tier: "Tier 2 · Next Wave",
    status: "coming_soon",
    iconName: "LineChart",
    jdCountAnalyzed: 646,
    entryLevelListings: "646 Broad Entry Roles",
    salaryRange: "₹6.0 – 15.0 LPA",
    durationWeeks: 12,
    sampleEmployers: ["UnitedHealth Group", "Evalueserve", "ZS Associates", "ZS Healthcare"],
    skillsFrequency: [
      { skill: "Healthcare Domain Data Schema (Claims/EHR)", percentage: 88, category: "core" },
      { skill: "SQL Querying & Data Aggregation", percentage: 85, category: "tool" },
      { skill: "Power BI / Tableau Dashboarding", percentage: 79, category: "tool" },
      { skill: "Excel Advanced Formulas & Pivot Tables", percentage: 74, category: "tool" },
    ],
    keyModules: [
      "Healthcare Claims Data Architecture & ICD Metrics",
      "Advanced SQL for Medical Database Querying",
      "Interactive Dashboarding with Power BI & Healthcare KPI Reports",
    ],
    targetDegrees: ["B.Pharm", "B.Tech", "B.Sc Statistics", "BCA", "Life Sciences"],
    heroBadge: "⏳ Wave 7 · Coming Soon",
  },
  {
    id: "medical-writer",
    slug: "medical-writing",
    title: "Fresher Medical Writer",
    shortTitle: "Medical Writer",
    tagline: "Draft clinical study reports, protocol summaries, and peer-reviewed scientific literature.",
    wave: 8,
    tier: "Tier 2 · Next Wave",
    status: "coming_soon",
    iconName: "PenLine",
    jdCountAnalyzed: 45,
    entryLevelListings: "Niche Fresher Openings",
    salaryRange: "₹5.5 – 13.0 LPA",
    durationWeeks: 12,
    sampleEmployers: ["Parexel", "Cactus Communications", "Indegene", "Novartis"],
    skillsFrequency: [
      { skill: "Scientific Writing & Grammar Precision", percentage: 95, category: "core" },
      { skill: "Clinical Study Report (CSR) Formatting", percentage: 82, category: "core" },
      { skill: "AMA Style Guide Compliance", percentage: 74, category: "compliance" },
      { skill: "PubMed & Literature Synthesis", percentage: 69, category: "analytical" },
    ],
    keyModules: [
      "AMA Style Guidelines & Scientific Communication",
      "CSR Section Drafting & Statistical Table Interpretation",
      "Literature Search Strategy & Systematic Review Protocols",
    ],
    targetDegrees: ["Pharm.D", "M.Pharm", "Ph.D Life Sciences", "MBBS"],
    heroBadge: "⏳ Wave 8 · Coming Soon",
  },
];
