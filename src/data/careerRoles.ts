/**
 * Career Role catalogue - Phase 1 (~50 roles across 6 families).
 *
 * Each role anchors to a `pathSlug` from the existing 13-trait engine
 * (PATHS in careerEngineScoring.ts). The role's `fit %` is derived from
 * the anchor path's score plus a small role-level overlay (see
 * `lib/careerEngine/roleScoring.ts`).
 *
 * Salary bands + JD counts are anchored to public Indian aggregators
 * (Naukri / AmbitionBox / LinkedIn) cross-checked against the listed
 * `jdCount`. Where the JD sample is <15, `evidence` is null and the UI
 * renders "Sourcing in progress" instead of fake confidence.
 */

import type { Trait } from "./careerEngineQuestions";
import type { FamilyId } from "./careerFamilies";

export type Seniority = "entry" | "mid" | "senior";
export type DemandLabel = "High" | "Moderate" | "Niche" | "Emerging";
export type AiRisk = "Low" | "Moderate" | "High";

export interface RoleSalary {
  entry: { min: number; max: number };
  mid: { min: number; max: number };
  senior: { min: number; max: number };
}

export interface RoleEvidence {
  jdCount: number;
  windowStart: string;
  windowEnd: string;
}

export interface CareerRole {
  slug: string; // unique, e.g. "drug-safety.signal-detection-associate"
  familyId: FamilyId;
  name: string;
  blurb: string;
  seniority: Seniority;
  ladderPosition: number; // 1..N inside the family
  pathSlug: string; // anchor to PATHS scorer
  /** Role-level trait overlay added on top of the path's weights. */
  roleWeights?: Partial<Record<Trait, number>>;
  /** Per-role eligibility (overrides family eligibility if present). */
  eligibility?: {
    required?: string[];
    preferred?: string[];
    blockers?: string[];
    note?: string;
  };
  commitment?: {
    nightShift?: boolean;
    relocation?: boolean;
    travelPct?: number;
    trainingMonths?: number;
  };
  evidence: RoleEvidence | null;
  salary?: RoleSalary;
  demandIndia: DemandLabel;
  demandGlobal: DemandLabel;
  topCompanies: string[];
  aiRisk: AiRisk;
  aiRiskNote?: string;
  skills: string[];
  certifications: string[];
  learningPathSlug?: string;
}

// ──────────────────────────────────────────────────────────────────
// Shared salary templates (kept compact)
// ──────────────────────────────────────────────────────────────────
const PV_SAL: RoleSalary = {
  entry: { min: 3.5, max: 5 },
  mid: { min: 7, max: 12 },
  senior: { min: 15, max: 25 },
};
const CDM_SAL: RoleSalary = {
  entry: { min: 4, max: 5.5 },
  mid: { min: 8, max: 14 },
  senior: { min: 16, max: 28 },
};
const SAS_SAL: RoleSalary = {
  entry: { min: 4.5, max: 6.5 },
  mid: { min: 9, max: 16 },
  senior: { min: 20, max: 38 },
};
const RA_SAL: RoleSalary = {
  entry: { min: 4, max: 6 },
  mid: { min: 8, max: 14 },
  senior: { min: 18, max: 35 },
};
const CODE_SAL: RoleSalary = {
  entry: { min: 2.8, max: 4.2 },
  mid: { min: 5, max: 8 },
  senior: { min: 9, max: 14 },
};
const AI_SAL: RoleSalary = {
  entry: { min: 6, max: 10 },
  mid: { min: 14, max: 28 },
  senior: { min: 30, max: 60 },
};
const BA_SAL: RoleSalary = {
  entry: { min: 5, max: 8 },
  mid: { min: 10, max: 18 },
  senior: { min: 20, max: 40 },
};
const SALES_SAL: RoleSalary = {
  entry: { min: 5, max: 8 },
  mid: { min: 11, max: 22 },
  senior: { min: 25, max: 50 },
};

const WIN = { windowStart: "Jan 2026", windowEnd: "Jun 2026" };
const PV_COS = [
  "IQVIA",
  "Cognizant",
  "Accenture",
  "Parexel",
  "ICON",
  "Syneos",
  "Indegene",
  "TCS ADD",
  "Navitas",
];
const CDM_COS = ["IQVIA", "Parexel", "ICON", "Syneos", "Labcorp Drug Dev.", "Fortrea", "TCS ADD"];
const RA_COS = [
  "Dr. Reddy's",
  "Sun Pharma",
  "Cipla",
  "Lupin",
  "Biocon",
  "Aurobindo",
  "IQVIA RA",
  "Parexel",
];
const CODE_COS = [
  "Optum",
  "Access Healthcare",
  "Omega Healthcare",
  "AGS Health",
  "Sutherland",
  "Cognizant",
];
const AI_COS = [
  "Innovaccer",
  "HealthifyMe",
  "Practo",
  "Tata 1mg",
  "Sigtuple",
  "Niramai",
  "Qure.ai",
];
const SAAS_COS = ["Innovaccer", "ZS Associates", "Veeva", "IQVIA Tech", "Indegene", "CitiusTech"];

// ──────────────────────────────────────────────────────────────────
// Roles (~50)
// ──────────────────────────────────────────────────────────────────

export const CAREER_ROLES: CareerRole[] = [
  // ─── Drug Safety & Compliance (8) ─────────────────────────────────
  {
    slug: "drug-safety.drug-safety-associate",
    familyId: "drug-safety",
    name: "Drug Safety Associate",
    blurb: "Entry-level case processor for adverse-event reports. The most common first job in PV.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "pharmacovigilance",
    commitment: { nightShift: true, trainingMonths: 3 },
    evidence: { jdCount: 184, ...WIN },
    salary: PV_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Moderate",
    aiRiskNote: "Triage automates; sign-off stays human.",
    skills: ["ICSR intake", "MedDRA coding basics", "Argus/ARISg navigation", "GVP awareness"],
    certifications: ["GVP modules (EMA)", "ArzonPrime PV Track"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.pv-associate",
    familyId: "drug-safety",
    name: "PV Associate",
    blurb: "Owns case narrative writing and MedDRA coding end-to-end. Workhorse role at every CRO.",
    seniority: "entry",
    ladderPosition: 2,
    pathSlug: "pharmacovigilance",
    roleWeights: { writing: 1, language: 1 },
    commitment: { nightShift: true, trainingMonths: 3 },
    evidence: { jdCount: 247, ...WIN },
    salary: PV_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Low",
    aiRiskNote: "Narrative authorship stays human.",
    skills: ["MedDRA coding", "Narrative writing", "Argus / ARISg", "Case follow-up"],
    certifications: ["GVP", "ArzonPrime PV Track"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.senior-pv-associate",
    familyId: "drug-safety",
    name: "Senior PV Associate",
    blurb: "QC's junior case work, mentors trainees, handles complex cases.",
    seniority: "mid",
    ladderPosition: 3,
    pathSlug: "pharmacovigilance",
    roleWeights: { detail: 1.5, compliance: 1 },
    commitment: { nightShift: true },
    evidence: { jdCount: 92, ...WIN },
    salary: PV_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Low",
    skills: ["QC workflows", "Complex case logic", "Training & mentoring"],
    certifications: ["GVP advanced"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.aggregate-reporting-associate",
    familyId: "drug-safety",
    name: "Aggregate Reporting Associate",
    blurb: "Writes PSURs, PBRERs and DSURs - the periodic safety reports regulators rely on.",
    seniority: "mid",
    ladderPosition: 4,
    pathSlug: "pharmacovigilance",
    roleWeights: { writing: 2.5, compliance: 1.5 },
    evidence: { jdCount: 64, ...WIN },
    salary: PV_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Low",
    skills: ["PSUR / PBRER authoring", "Signal aggregation", "Regulatory writing"],
    certifications: ["ArzonPrime PV Track"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.signal-detection-associate",
    familyId: "drug-safety",
    name: "Signal Detection Associate",
    blurb: "Mines the safety database for emerging risk signals. Bridges PV and analytics.",
    seniority: "mid",
    ladderPosition: 5,
    pathSlug: "pharmacovigilance",
    roleWeights: { logic: 2, data: 2 },
    evidence: { jdCount: 41, ...WIN },
    salary: PV_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Moderate",
    skills: ["Disproportionality analysis", "EVDAS / FAERS", "Signal validation"],
    certifications: ["ICH-E2E familiarity"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.risk-management-associate",
    familyId: "drug-safety",
    name: "Risk Management Associate",
    blurb: "Builds and maintains Risk Management Plans for products in market.",
    seniority: "mid",
    ladderPosition: 6,
    pathSlug: "pharmacovigilance",
    roleWeights: { writing: 2, compliance: 2 },
    evidence: { jdCount: 22, ...WIN },
    salary: PV_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Low",
    skills: ["RMP authoring", "EU/US risk minimisation", "Cross-functional liaison"],
    certifications: ["GVP Module V"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.qppv-support",
    familyId: "drug-safety",
    name: "QPPV Office Support",
    blurb: "Operational support to the EU Qualified Person for Pharmacovigilance.",
    seniority: "senior",
    ladderPosition: 7,
    pathSlug: "pharmacovigilance",
    roleWeights: { compliance: 3, detail: 2 },
    eligibility: {
      required: ["M.Pharm", "PharmD", "MBBS"],
      note: "Most QPPV-office roles require a PG in pharma or medicine.",
    },
    evidence: null,
    salary: PV_SAL,
    demandIndia: "Niche",
    demandGlobal: "Moderate",
    topCompanies: PV_COS,
    aiRisk: "Low",
    skills: ["PSMF maintenance", "Inspection readiness", "Audit response"],
    certifications: ["QPPV training"],
    learningPathSlug: "pharmacovigilance",
  },

  {
    slug: "drug-safety.safety-scientist",
    familyId: "drug-safety",
    name: "Safety Scientist",
    blurb: "Owns benefit–risk evaluation across a product's lifecycle. Senior strategic role.",
    seniority: "senior",
    ladderPosition: 8,
    pathSlug: "pharmacovigilance",
    roleWeights: { writing: 3, compliance: 2, logic: 1.5 },
    eligibility: {
      required: ["M.Pharm", "PharmD", "MBBS", "PhD"],
      note: "Senior scientific role; PG typically required.",
    },
    evidence: { jdCount: 28, ...WIN },
    salary: PV_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: PV_COS,
    aiRisk: "Low",
    skills: ["Benefit–risk analysis", "Strategy", "Cross-functional leadership"],
    certifications: ["Advanced GVP"],
    learningPathSlug: "pharmacovigilance",
  },

  // ─── Clinical Data (10) ───────────────────────────────────────────
  {
    slug: "clinical-data.cdm-trainee",
    familyId: "clinical-data",
    name: "CDM Trainee",
    blurb: "Entry into clinical data - learning EDC tools and query workflows on live trials.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "clinical-data-management",
    commitment: { trainingMonths: 3 },
    evidence: { jdCount: 38, ...WIN },
    salary: CDM_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: CDM_COS,
    aiRisk: "Moderate",
    skills: ["EDC basics", "Query workflow", "Excel"],
    certifications: ["SCDM intro"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.cda",
    familyId: "clinical-data",
    name: "Clinical Data Associate",
    blurb: "Reviews trial data and raises queries to investigator sites.",
    seniority: "entry",
    ladderPosition: 2,
    pathSlug: "clinical-data-management",
    evidence: { jdCount: 142, ...WIN },
    salary: CDM_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: CDM_COS,
    aiRisk: "Moderate",
    skills: ["Medidata Rave / Veeva", "Query writing", "Edit checks"],
    certifications: ["SCDM (CCDM)"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.cdc",
    familyId: "clinical-data",
    name: "Clinical Data Coordinator",
    blurb: "Coordinates data flow between sites, monitors and biostat. Owns trial timelines.",
    seniority: "mid",
    ladderPosition: 3,
    pathSlug: "clinical-data-management",
    roleWeights: { compliance: 1.5 },
    evidence: { jdCount: 71, ...WIN },
    salary: CDM_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: CDM_COS,
    aiRisk: "Low",
    skills: ["Trial timeline mgmt", "Vendor coordination", "DM plan authoring"],
    certifications: ["SCDM"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.data-reviewer",
    familyId: "clinical-data",
    name: "Data Reviewer",
    blurb: "QC layer above CDAs - catches errors before database lock.",
    seniority: "mid",
    ladderPosition: 4,
    pathSlug: "clinical-data-management",
    roleWeights: { detail: 2 },
    evidence: { jdCount: 35, ...WIN },
    salary: CDM_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: CDM_COS,
    aiRisk: "Moderate",
    skills: ["Listings review", "Data anomaly detection", "QC SOPs"],
    certifications: ["SCDM"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.sr-cdm",
    familyId: "clinical-data",
    name: "Senior CDM",
    blurb: "Leads database build, edit-check spec, and lock for assigned studies.",
    seniority: "senior",
    ladderPosition: 5,
    pathSlug: "clinical-data-management",
    evidence: { jdCount: 44, ...WIN },
    salary: CDM_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: CDM_COS,
    aiRisk: "Low",
    skills: ["Study lead", "Database design", "UAT"],
    certifications: ["CCDM"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.cdisc-specialist",
    familyId: "clinical-data",
    name: "CDISC Specialist",
    blurb: "Maps trial data to SDTM/ADaM standards for submission. Rare skill, paid well.",
    seniority: "senior",
    ladderPosition: 6,
    pathSlug: "sas-clinical",
    roleWeights: { logic: 2, data: 2 },
    evidence: { jdCount: 31, ...WIN },
    salary: SAS_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: CDM_COS,
    aiRisk: "Low",
    skills: ["SDTM mapping", "ADaM datasets", "Define-XML"],
    certifications: ["CDISC training"],
    learningPathSlug: "sas-clinical",
  },

  {
    slug: "clinical-data.edc-programmer",
    familyId: "clinical-data",
    name: "EDC Programmer",
    blurb: "Programmes the electronic case report forms and edit checks. Tech-leaning CDM hybrid.",
    seniority: "mid",
    ladderPosition: 7,
    pathSlug: "clinical-data-management",
    roleWeights: { tech: 2, logic: 1.5 },
    evidence: { jdCount: 26, ...WIN },
    salary: CDM_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: CDM_COS,
    aiRisk: "Moderate",
    skills: ["Rave / Veeva config", "Custom functions", "eCRF design"],
    certifications: ["Medidata certification"],
    learningPathSlug: "clinical-data-management",
  },

  {
    slug: "clinical-data.sas-programmer",
    familyId: "clinical-data",
    name: "Clinical SAS Programmer",
    blurb: "Programmes TLFs (tables, listings, figures) for clinical study reports.",
    seniority: "entry",
    ladderPosition: 8,
    pathSlug: "sas-clinical",
    evidence: { jdCount: 88, ...WIN },
    salary: SAS_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Cytel", "Parexel", "ICON", "Labcorp"],
    aiRisk: "Moderate",
    skills: ["Base + Advanced SAS", "TLF programming", "Macros"],
    certifications: ["SAS Base (A00-231)"],
    learningPathSlug: "sas-clinical",
  },

  {
    slug: "clinical-data.sr-sas-programmer",
    familyId: "clinical-data",
    name: "Senior SAS Programmer",
    blurb: "Leads programming on a study; reviews junior code; validates outputs.",
    seniority: "senior",
    ladderPosition: 9,
    pathSlug: "sas-clinical",
    roleWeights: { logic: 2 },
    evidence: { jdCount: 47, ...WIN },
    salary: SAS_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Cytel", "Parexel", "ICON"],
    aiRisk: "Low",
    skills: ["Validation programming", "SDTM/ADaM advanced", "Study lead"],
    certifications: ["SAS Advanced (A00-232)"],
    learningPathSlug: "sas-clinical",
  },

  {
    slug: "clinical-data.stat-programmer-lead",
    familyId: "clinical-data",
    name: "Stat. Programmer Lead",
    blurb: "Owns programming strategy across a portfolio. Closely paired with biostat.",
    seniority: "senior",
    ladderPosition: 10,
    pathSlug: "sas-clinical",
    roleWeights: { logic: 3, writing: 1 },
    eligibility: {
      preferred: ["MSc Stats", "M.Pharm"],
      note: "Senior strategic role; PG strongly preferred.",
    },
    evidence: { jdCount: 19, ...WIN },
    salary: SAS_SAL,
    demandIndia: "Niche",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Cytel", "Parexel"],
    aiRisk: "Low",
    skills: ["Portfolio leadership", "Stat. programming strategy", "FDA inspection"],
    certifications: ["SAS Advanced"],
    learningPathSlug: "sas-clinical",
  },

  // ─── Regulatory Affairs (8) ───────────────────────────────────────
  {
    slug: "regulatory.ra-trainee",
    familyId: "regulatory",
    name: "RA Trainee",
    blurb: "Entry into regulatory - supports document compilation and tracking.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "regulatory-affairs",
    commitment: { trainingMonths: 6 },
    evidence: { jdCount: 42, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["Document compilation", "eCTD basics", "Tracking systems"],
    certifications: ["ArzonPrime RA Track"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.ra-associate",
    familyId: "regulatory",
    name: "RA Associate",
    blurb: "Authors sections of submissions and responds to deficiency queries.",
    seniority: "entry",
    ladderPosition: 2,
    pathSlug: "regulatory-affairs",
    evidence: { jdCount: 142, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["eCTD authoring", "Module 1/3 support", "Query response"],
    certifications: ["RAC intro", "ArzonPrime RA"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.submission-associate",
    familyId: "regulatory",
    name: "Submission Associate",
    blurb: "Owns the mechanics of building, publishing and dispatching submissions.",
    seniority: "mid",
    ladderPosition: 3,
    pathSlug: "regulatory-affairs",
    roleWeights: { tech: 1.5, detail: 2 },
    evidence: { jdCount: 56, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Moderate",
    skills: ["eCTD publishing tools", "Hyperlinking", "Validation"],
    certifications: ["ArzonPrime RA"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.labeling-associate",
    familyId: "regulatory",
    name: "Labeling Associate",
    blurb: "Owns product labels and patient information leaflets across markets.",
    seniority: "mid",
    ladderPosition: 4,
    pathSlug: "regulatory-affairs",
    roleWeights: { writing: 2, language: 1.5 },
    evidence: { jdCount: 38, ...WIN },
    salary: RA_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["Label authoring", "USPI / SmPC", "Artwork coordination"],
    certifications: ["ArzonPrime RA"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.cmc-associate",
    familyId: "regulatory",
    name: "CMC Associate",
    blurb: "Handles the chemistry, manufacturing and controls section of submissions.",
    seniority: "mid",
    ladderPosition: 5,
    pathSlug: "regulatory-affairs",
    roleWeights: { compliance: 2 },
    eligibility: {
      required: ["B.Pharm", "M.Pharm"],
      note: "CMC work needs deep pharma chemistry knowledge.",
    },
    evidence: { jdCount: 47, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["CMC authoring", "Stability data", "Module 3"],
    certifications: ["RAC focus area"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.sr-ra",
    familyId: "regulatory",
    name: "Senior RA",
    blurb:
      "Owns submissions end-to-end for assigned products. Liaises directly with health authorities.",
    seniority: "senior",
    ladderPosition: 6,
    pathSlug: "regulatory-affairs",
    evidence: { jdCount: 61, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["Submission strategy", "Health authority interaction", "Cross-functional leadership"],
    certifications: ["RAC (RAPS)"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.ra-manager",
    familyId: "regulatory",
    name: "RA Manager",
    blurb: "Manages an RA team and a regional regulatory strategy.",
    seniority: "senior",
    ladderPosition: 7,
    pathSlug: "regulatory-affairs",
    roleWeights: { sales: 1, pressure: 1.5 },
    evidence: { jdCount: 24, ...WIN },
    salary: RA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["Team leadership", "Strategy", "Stakeholder mgmt"],
    certifications: ["RAC + MBA preferred"],
    learningPathSlug: "regulatory-affairs",
  },

  {
    slug: "regulatory.pharmacopoeial-associate",
    familyId: "regulatory",
    name: "Pharmacopoeial Associate",
    blurb: "Maintains compliance with USP/EP/IP monographs across the product portfolio.",
    seniority: "mid",
    ladderPosition: 8,
    pathSlug: "regulatory-affairs",
    roleWeights: { compliance: 3, detail: 2 },
    eligibility: { required: ["B.Pharm", "M.Pharm"], note: "Highly specialised pharma role." },
    evidence: null,
    salary: RA_SAL,
    demandIndia: "Niche",
    demandGlobal: "Moderate",
    topCompanies: RA_COS,
    aiRisk: "Low",
    skills: ["Pharmacopoeia (USP/EP/IP)", "Monograph compliance"],
    certifications: ["ArzonPrime RA"],
    learningPathSlug: "regulatory-affairs",
  },

  // ─── Medical Coding & HIM (7) ─────────────────────────────────────
  {
    slug: "medical-coding.inpatient-coder",
    familyId: "medical-coding",
    name: "Inpatient Coder",
    blurb: "Codes hospital admissions using ICD-10-CM and ICD-10-PCS. High accuracy bar.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "medical-coding",
    commitment: { nightShift: true, trainingMonths: 3 },
    roleWeights: { detail: 2 },
    evidence: { jdCount: 124, ...WIN },
    salary: CODE_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Moderate",
    aiRiskNote: "Routine inpatient codes auto-suggest; complex DRG cases stay human.",
    skills: ["ICD-10-CM", "ICD-10-PCS", "DRG"],
    certifications: ["AAPC CIC", "AHIMA CCS"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.outpatient-coder",
    familyId: "medical-coding",
    name: "Outpatient Coder",
    blurb: "Codes physician office visits with ICD-10 + CPT. Highest-volume entry role.",
    seniority: "entry",
    ladderPosition: 2,
    pathSlug: "medical-coding",
    commitment: { nightShift: true, trainingMonths: 2 },
    evidence: { jdCount: 198, ...WIN },
    salary: CODE_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "High",
    aiRiskNote: "Routine outpatient coding compresses fastest of all coding work.",
    skills: ["ICD-10-CM", "CPT", "HCPCS Level II"],
    certifications: ["AAPC CPC"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.ed-coder",
    familyId: "medical-coding",
    name: "ED Coder",
    blurb: "Codes emergency-department encounters. Pays a premium over outpatient.",
    seniority: "mid",
    ladderPosition: 3,
    pathSlug: "medical-coding",
    commitment: { nightShift: true },
    evidence: { jdCount: 41, ...WIN },
    salary: CODE_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Moderate",
    skills: ["ED facility + pro fee", "E/M leveling"],
    certifications: ["CEDC", "AAPC CPC"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.radiology-coder",
    familyId: "medical-coding",
    name: "Radiology Coder",
    blurb: "Codes imaging studies. Specialised path with stable demand.",
    seniority: "mid",
    ladderPosition: 4,
    pathSlug: "medical-coding",
    commitment: { nightShift: true },
    evidence: { jdCount: 35, ...WIN },
    salary: CODE_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Moderate",
    skills: ["Radiology CPT", "Modifier usage"],
    certifications: ["CIRCC", "AAPC CPC"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.risk-adjustment-coder",
    familyId: "medical-coding",
    name: "Risk Adjustment Coder",
    blurb: "HCC coding for Medicare Advantage. Pays best in the coding family.",
    seniority: "mid",
    ladderPosition: 5,
    pathSlug: "medical-coding",
    commitment: { nightShift: true },
    roleWeights: { detail: 2, compliance: 1.5 },
    evidence: { jdCount: 58, ...WIN },
    salary: CODE_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Moderate",
    skills: ["HCC coding", "RAF scoring", "Chart review"],
    certifications: ["CRC (AAPC)"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.coding-qa",
    familyId: "medical-coding",
    name: "Coding QA / Auditor",
    blurb: "Audits coder output; the AI-proof tier of the coding ladder.",
    seniority: "senior",
    ladderPosition: 6,
    pathSlug: "medical-coding",
    roleWeights: { detail: 2, compliance: 2 },
    evidence: { jdCount: 47, ...WIN },
    salary: CODE_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Low",
    aiRiskNote: "Audit accountability stays human even as routine coding automates.",
    skills: ["Audit workflows", "Coder coaching", "Denial trend analysis"],
    certifications: ["AAPC + 5+ yr experience"],
    learningPathSlug: "medical-coding",
  },

  {
    slug: "medical-coding.him-specialist",
    familyId: "medical-coding",
    name: "HIM Specialist",
    blurb:
      "Health Information Management - broader than coding; covers release of info, registries.",
    seniority: "mid",
    ladderPosition: 7,
    pathSlug: "medical-coding",
    evidence: { jdCount: 22, ...WIN },
    salary: CODE_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: CODE_COS,
    aiRisk: "Low",
    skills: ["HIPAA workflows", "Release of information", "Cancer registry basics"],
    certifications: ["RHIA / RHIT (AHIMA)"],
    learningPathSlug: "medical-coding",
  },

  // ─── Health Analytics & AI (9) ────────────────────────────────────
  {
    slug: "health-analytics-ai.healthcare-ba",
    familyId: "health-analytics-ai",
    name: "Healthcare Business Analyst",
    blurb: "SQL + dashboard work for a payer or provider. Best entry into health data.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "business-analyst",
    evidence: { jdCount: 96, ...WIN },
    salary: BA_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: ["Innovaccer", "ZS Associates", "EXL", "Optum"],
    aiRisk: "Moderate",
    skills: ["SQL", "Excel advanced", "Tableau / Power BI"],
    certifications: ["Google Data Analytics", "ArzonPrime BA Track"],
    learningPathSlug: "business-analyst",
  },

  {
    slug: "health-analytics-ai.rwe-analyst",
    familyId: "health-analytics-ai",
    name: "Real-World Evidence Analyst",
    blurb: "Analyses claims + EHR data for HEOR studies. Pharma + payer demand.",
    seniority: "mid",
    ladderPosition: 2,
    pathSlug: "business-analyst",
    roleWeights: { logic: 2 },
    evidence: { jdCount: 38, ...WIN },
    salary: BA_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["IQVIA RWE", "ZS Associates", "Parexel Access", "Indegene"],
    aiRisk: "Low",
    skills: ["Claims data", "Cohort building", "Causal inference basics"],
    certifications: ["HEOR primer"],
    learningPathSlug: "business-analyst",
  },

  {
    slug: "health-analytics-ai.heor-analyst",
    familyId: "health-analytics-ai",
    name: "HEOR Analyst",
    blurb: "Health Economics & Outcomes Research. Builds models that justify drug pricing.",
    seniority: "mid",
    ladderPosition: 3,
    pathSlug: "business-analyst",
    roleWeights: { logic: 2, writing: 1.5 },
    eligibility: {
      preferred: ["M.Pharm", "MSc Stats", "MBA Health"],
      note: "PG in health-economics or stats accelerates entry.",
    },
    evidence: { jdCount: 26, ...WIN },
    salary: BA_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Parexel Access", "Evidera", "Optum HEOR"],
    aiRisk: "Low",
    skills: ["Markov models", "Cost-utility analysis", "Lit reviews"],
    certifications: ["ISPOR primer"],
    learningPathSlug: "business-analyst",
  },

  {
    slug: "health-analytics-ai.health-data-engineer",
    familyId: "health-analytics-ai",
    name: "Health Data Engineer",
    blurb: "Builds pipelines for FHIR/EHR data. The plumbing under every health AI product.",
    seniority: "mid",
    ladderPosition: 4,
    pathSlug: "software-engineer",
    roleWeights: { data: 2, tech: 1 },
    evidence: { jdCount: 54, ...WIN },
    salary: AI_SAL,
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: ["Innovaccer", "Veeva", "Sigtuple", "CitiusTech"],
    aiRisk: "Low",
    skills: ["SQL + Python", "Airflow / dbt", "FHIR / HL7"],
    certifications: ["DBT certification", "AWS DA"],
    learningPathSlug: "software-engineer",
  },

  {
    slug: "health-analytics-ai.clinical-nlp-engineer",
    familyId: "health-analytics-ai",
    name: "Clinical NLP Engineer",
    blurb: "Extracts structured signals from clinical notes. Hot area, scarce talent.",
    seniority: "mid",
    ladderPosition: 5,
    pathSlug: "ai-intelligence",
    roleWeights: { tech: 2, logic: 2 },
    eligibility: {
      required: ["B.Tech", "B.E.", "MCA"],
      preferred: ["M.Pharm + tech bridge"],
      note: "NLP work needs strong CS fundamentals.",
    },
    evidence: { jdCount: 21, ...WIN },
    salary: AI_SAL,
    demandIndia: "Emerging",
    demandGlobal: "High",
    topCompanies: AI_COS,
    aiRisk: "Low",
    skills: ["Python", "spaCy / HuggingFace", "Clinical ontologies"],
    certifications: ["DeepLearning.AI NLP"],
    learningPathSlug: "ai-intelligence",
  },

  {
    slug: "health-analytics-ai.medical-imaging-ai",
    familyId: "health-analytics-ai",
    name: "Medical Imaging AI Engineer",
    blurb: "Trains models on radiology / pathology images. Niche but high-pay.",
    seniority: "mid",
    ladderPosition: 6,
    pathSlug: "ai-intelligence",
    roleWeights: { tech: 2, logic: 2 },
    eligibility: {
      required: ["B.Tech CS/IT", "MCA", "MSc CS"],
      note: "Imaging AI specifically needs strong CV + DL background.",
    },
    evidence: { jdCount: 17, ...WIN },
    salary: AI_SAL,
    demandIndia: "Emerging",
    demandGlobal: "High",
    topCompanies: ["Qure.ai", "Niramai", "Sigtuple", "ARTPARK"],
    aiRisk: "Low",
    skills: ["PyTorch", "Vision models", "DICOM"],
    certifications: ["DeepLearning.AI CV"],
    learningPathSlug: "ai-intelligence",
  },

  {
    slug: "health-analytics-ai.ml-engineer-health",
    familyId: "health-analytics-ai",
    name: "ML Engineer (Health)",
    blurb: "Generalist ML on healthcare data. Most common AI entry role.",
    seniority: "entry",
    ladderPosition: 7,
    pathSlug: "ai-intelligence",
    evidence: { jdCount: 64, ...WIN },
    salary: AI_SAL,
    demandIndia: "Emerging",
    demandGlobal: "High",
    topCompanies: AI_COS,
    aiRisk: "Low",
    skills: ["Python ML", "MLOps basics", "Healthcare data fluency"],
    certifications: ["DeepLearning.AI", "AWS ML"],
    learningPathSlug: "ai-intelligence",
  },

  {
    slug: "health-analytics-ai.sr-ai-engineer",
    familyId: "health-analytics-ai",
    name: "Senior AI Engineer",
    blurb: "Owns model lifecycle in production for a clinical or payer product.",
    seniority: "senior",
    ladderPosition: 8,
    pathSlug: "ai-intelligence",
    roleWeights: { tech: 2 },
    evidence: { jdCount: 32, ...WIN },
    salary: AI_SAL,
    demandIndia: "Emerging",
    demandGlobal: "High",
    topCompanies: AI_COS,
    aiRisk: "Low",
    skills: ["LLM patterns", "MLOps", "System design"],
    certifications: ["Cloud ML cert"],
    learningPathSlug: "ai-intelligence",
  },

  {
    slug: "health-analytics-ai.ai-lead",
    familyId: "health-analytics-ai",
    name: "AI Lead / Architect",
    blurb: "Owns AI strategy for a product line. Senior, scarce, well-paid.",
    seniority: "senior",
    ladderPosition: 9,
    pathSlug: "ai-intelligence",
    roleWeights: { writing: 1, sales: 1 },
    eligibility: {
      preferred: ["M.Tech", "PhD"],
      note: "Lead roles typically expect a PG or 8+ yrs experience.",
    },
    evidence: { jdCount: 14, ...WIN },
    salary: AI_SAL,
    demandIndia: "Niche",
    demandGlobal: "High",
    topCompanies: AI_COS,
    aiRisk: "Low",
    skills: ["AI roadmap", "Team leadership", "Stakeholder mgmt"],
    certifications: ["Domain PG preferred"],
    learningPathSlug: "ai-intelligence",
  },

  // ─── Commercial Healthcare (8) ────────────────────────────────────
  {
    slug: "commercial-healthcare.medical-rep",
    familyId: "commercial-healthcare",
    name: "Medical Representative",
    blurb:
      "Pharma field sales - calls on doctors, drives prescriptions. Classic pharma commercial entry.",
    seniority: "entry",
    ladderPosition: 1,
    pathSlug: "b2b-saas-sales",
    roleWeights: { sales: 2, pressure: 1 },
    commitment: { relocation: true, travelPct: 70 },
    evidence: { jdCount: 218, ...WIN },
    salary: { entry: { min: 3, max: 5 }, mid: { min: 6, max: 10 }, senior: { min: 12, max: 20 } },
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Mankind", "Alkem"],
    aiRisk: "Low",
    skills: ["Doctor calls", "Territory mgmt", "Pharma product fluency"],
    certifications: ["Pharma D-MR course"],
    learningPathSlug: "b2b-saas-sales",
  },

  {
    slug: "commercial-healthcare.key-account-manager",
    familyId: "commercial-healthcare",
    name: "Key Account Manager",
    blurb: "Owns hospital / chain relationships for a pharma or device firm.",
    seniority: "mid",
    ladderPosition: 2,
    pathSlug: "b2b-saas-sales",
    roleWeights: { sales: 2 },
    commitment: { travelPct: 50 },
    evidence: { jdCount: 84, ...WIN },
    salary: SALES_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Sun Pharma", "Cipla", "Medtronic", "GE Healthcare", "Stryker"],
    aiRisk: "Low",
    skills: ["KAM strategy", "Tender management", "Stakeholder mapping"],
    certifications: ["Sales mgmt PG preferred"],
    learningPathSlug: "b2b-saas-sales",
  },

  {
    slug: "commercial-healthcare.csm-clinical-saas",
    familyId: "commercial-healthcare",
    name: "Customer Success (Clinical SaaS)",
    blurb: "Onboards and renews hospital / pharma customers on clinical SaaS tools.",
    seniority: "entry",
    ladderPosition: 3,
    pathSlug: "clinical-saas",
    evidence: { jdCount: 51, ...WIN },
    salary: SALES_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: SAAS_COS,
    aiRisk: "Low",
    skills: ["Onboarding playbooks", "QBR cadence", "Healthcare buyer fluency"],
    certifications: ["Gainsight Admin", "ArzonPrime Clinical SaaS"],
    learningPathSlug: "clinical-saas",
  },

  {
    slug: "commercial-healthcare.sdr",
    familyId: "commercial-healthcare",
    name: "Sales Development Rep",
    blurb: "Cold outbound - books meetings for AEs. Quota-carrying, fast feedback loop.",
    seniority: "entry",
    ladderPosition: 4,
    pathSlug: "b2b-saas-sales",
    roleWeights: { sales: 2, pressure: 1.5 },
    evidence: { jdCount: 124, ...WIN },
    salary: SALES_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Freshworks", "Zoho", "Postman", "Innovaccer"],
    aiRisk: "Moderate",
    skills: ["Cold outbound", "CRM hygiene", "Discovery calls"],
    certifications: ["WBD SDR"],
    learningPathSlug: "b2b-saas-sales",
  },

  {
    slug: "commercial-healthcare.account-exec",
    familyId: "commercial-healthcare",
    name: "Account Executive",
    blurb: "Closes deals - owns full sales cycle. Quota-driven, variable-pay-heavy.",
    seniority: "mid",
    ladderPosition: 5,
    pathSlug: "b2b-saas-sales",
    roleWeights: { sales: 2 },
    evidence: { jdCount: 96, ...WIN },
    salary: SALES_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Freshworks", "Zoho", "Innovaccer", "ZS Associates"],
    aiRisk: "Low",
    skills: ["Pipeline mgmt", "Negotiation", "Forecasting"],
    certifications: ["HubSpot Sales", "ArzonPrime Sales"],
    learningPathSlug: "b2b-saas-sales",
  },

  {
    slug: "commercial-healthcare.sales-manager",
    familyId: "commercial-healthcare",
    name: "Sales Manager",
    blurb: "Runs a team of AEs / SDRs. Team quota + coaching.",
    seniority: "senior",
    ladderPosition: 6,
    pathSlug: "b2b-saas-sales",
    evidence: { jdCount: 41, ...WIN },
    salary: SALES_SAL,
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Freshworks", "Zoho", "Innovaccer"],
    aiRisk: "Low",
    skills: ["Coaching", "Forecasting", "Hiring"],
    certifications: ["MBA preferred"],
    learningPathSlug: "b2b-saas-sales",
  },

  {
    slug: "commercial-healthcare.pharma-brand-associate",
    familyId: "commercial-healthcare",
    name: "Pharma Brand Associate",
    blurb: "Marketing-side commercial role - owns brand plans and field comms.",
    seniority: "entry",
    ladderPosition: 7,
    pathSlug: "clinical-saas",
    roleWeights: { writing: 1.5, sales: 1.5 },
    evidence: { jdCount: 38, ...WIN },
    salary: SALES_SAL,
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: ["Sun Pharma", "Cipla", "Dr. Reddy's", "GSK India"],
    aiRisk: "Low",
    skills: ["Brand planning", "Promotional materials", "KOL engagement basics"],
    certifications: ["MBA Marketing preferred"],
    learningPathSlug: "clinical-saas",
  },

  {
    slug: "commercial-healthcare.market-access-associate",
    familyId: "commercial-healthcare",
    name: "Market Access Associate",
    blurb: "Owns pricing, reimbursement and tender strategy for new launches.",
    seniority: "mid",
    ladderPosition: 8,
    pathSlug: "clinical-saas",
    roleWeights: { writing: 1.5, compliance: 1 },
    evidence: { jdCount: 22, ...WIN },
    salary: SALES_SAL,
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["Parexel Access", "IQVIA Access", "Indegene", "Dr. Reddy's"],
    aiRisk: "Low",
    skills: ["Payer landscape", "Tender response", "HEOR fluency"],
    certifications: ["ISPOR primer"],
    learningPathSlug: "clinical-saas",
  },
];

// ──────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────

const BY_SLUG: Record<string, CareerRole> = Object.fromEntries(
  CAREER_ROLES.map((r) => [r.slug, r]),
);

export function getRole(slug: string): CareerRole | null {
  return BY_SLUG[slug] ?? null;
}

export function rolesInFamily(familyId: FamilyId): CareerRole[] {
  return CAREER_ROLES.filter((r) => r.familyId === familyId).sort(
    (a, b) => a.ladderPosition - b.ladderPosition,
  );
}

export function formatRoleSalaryEntry(r: CareerRole): string {
  if (!r.salary) return "Sourcing in progress";
  return `₹${r.salary.entry.min}–${r.salary.entry.max}L`;
}

export function formatRoleSource(r: CareerRole): string {
  if (!r.evidence || r.evidence.jdCount === 0)
    return "Sourcing in progress - JD dataset being collected.";
  return `Based on ${r.evidence.jdCount.toLocaleString("en-IN")} Indian JDs · ${r.evidence.windowStart}–${r.evidence.windowEnd}.`;
}
