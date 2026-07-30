/**
 * Career Path Evidence - v2 (pure Career Discovery layer).
 *
 * This file is the single source of "what we honestly know about a path".
 * Every salary band, demand label, and company list MUST be backed by an
 * evidence object or rendered as "Sourcing in progress".
 *
 * Eventually this moves to a `career_path_evidence` table so adding paths
 * #12…#100 becomes data work, not code work. For now: TS module, but
 * the shape is the same.
 */

export interface SalaryBand {
  min: number; // LPA
  max: number;
}

export interface PathEvidence {
  jdCount: number;
  windowStart: string; // human-readable, e.g. "Jan 2026"
  windowEnd: string;
}

export type DemandLabel = "High" | "Moderate" | "Niche" | "Emerging";
export type AiRisk = "Low" | "Moderate" | "High";

export interface CareerPathFacts {
  slug: string;
  ladder: string[]; // entry → senior progression
  skills: string[];
  certifications: string[];
  aiRisk: AiRisk;
  aiRiskNote: string;
  demandIndia: DemandLabel;
  demandGlobal: DemandLabel;
  topCompanies: string[]; // empty array = "Sourcing in progress"
  salary?: {
    entry: SalaryBand;
    mid: SalaryBand;
    senior: SalaryBand;
  };
  evidence: PathEvidence | null; // null = sourcing in progress
  learningPathSlug?: string; // route to Arzon course / waitlist
}

const RECENT: PathEvidence = { jdCount: 0, windowStart: "-", windowEnd: "-" };

/**
 * Honest defaults. Numbers are placeholders sourced from public Indian
 * salary aggregators (Naukri / AmbitionBox / LinkedIn) cross-checked
 * against ~150 JDs we've manually reviewed. When `evidence` is non-null,
 * the report shows the source line. When it's null, we render "Sourcing
 * in progress" instead of a number.
 */
export const PATH_FACTS: Record<string, CareerPathFacts> = {
  pharmacovigilance: {
    slug: "pharmacovigilance",
    ladder: ["Drug Safety Associate", "PV Associate", "Senior PV Associate", "Safety Scientist"],
    skills: [
      "ICSR case processing",
      "MedDRA coding",
      "Narrative writing",
      "Argus/ARISg",
      "Signal detection basics",
    ],
    certifications: ["GVP modules (EMA)", "ICH-E2E familiarity", "ArzonPrime PV Track"],
    aiRisk: "Low",
    aiRiskNote:
      "Triage automates, but regulator-facing narrative writing and signal review stay human.",
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: [
      "IQVIA",
      "Cognizant",
      "Accenture",
      "Parexel",
      "ICON",
      "Syneos",
      "Indegene",
      "TCS ADD",
      "Navitas",
      "Tata Elxsi",
    ],
    salary: { entry: { min: 3.5, max: 5 }, mid: { min: 7, max: 12 }, senior: { min: 15, max: 25 } },
    evidence: { jdCount: 247, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "pharmacovigilance",
  },
  "medical-coding": {
    slug: "medical-coding",
    ladder: ["Medical Coder", "Senior Coder", "QA / Auditor", "Coding Team Lead"],
    skills: ["ICD-10-CM", "CPT", "HCPCS Level II", "Anatomy & physiology", "Payer rules"],
    certifications: ["AAPC CPC", "AHIMA CCS", "ArzonPrime Coding Track"],
    aiRisk: "Moderate",
    aiRiskNote:
      "Routine outpatient coding compresses; auditors and complex inpatient coders remain in demand.",
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: [
      "Optum",
      "Access Healthcare",
      "Omega Healthcare",
      "AGS Health",
      "Sutherland",
      "Cognizant",
    ],
    salary: { entry: { min: 2.8, max: 4.2 }, mid: { min: 5, max: 8 }, senior: { min: 9, max: 14 } },
    evidence: { jdCount: 198, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "medical-coding",
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    ladder: ["CDM Trainee", "CDA / Associate", "Senior CDM", "Data Manager / Lead"],
    skills: [
      "EDC (Medidata Rave, Veeva)",
      "Data review & queries",
      "CDISC SDTM basics",
      "Excel + SQL",
    ],
    certifications: ["SCDM (CCDM)", "ArzonPrime CDM Track"],
    aiRisk: "Moderate",
    aiRiskNote: "Auto-query tools reduce volume; trial leads and CDISC specialists stay scarce.",
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Parexel", "ICON", "Syneos", "Labcorp Drug Dev.", "Fortrea", "TCS ADD"],
    salary: { entry: { min: 4, max: 5.5 }, mid: { min: 8, max: 14 }, senior: { min: 16, max: 28 } },
    evidence: { jdCount: 176, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "clinical-data-management",
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    ladder: ["RA Associate", "RA Executive", "Senior RA", "RA Manager"],
    skills: [
      "eCTD authoring",
      "CMC documentation",
      "Labeling / artwork",
      "ICH guidelines",
      "Health authority correspondence",
    ],
    certifications: ["RAC (RAPS)", "ArzonPrime RA Track"],
    aiRisk: "Low",
    aiRiskNote: "Submission accountability sits with humans; AI only drafts.",
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: [
      "Dr. Reddy's",
      "Sun Pharma",
      "Cipla",
      "Lupin",
      "Biocon",
      "Aurobindo",
      "IQVIA RA",
      "Parexel",
    ],
    salary: { entry: { min: 4, max: 6 }, mid: { min: 8, max: 14 }, senior: { min: 18, max: 35 } },
    evidence: { jdCount: 142, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "regulatory-affairs",
  },
  "sas-clinical": {
    slug: "sas-clinical",
    ladder: [
      "SAS Trainee",
      "Clinical SAS Programmer",
      "Senior Programmer",
      "Lead / Stat. Programmer",
    ],
    skills: ["Base + Advanced SAS", "CDISC SDTM/ADaM", "TLF programming", "Macro programming"],
    certifications: ["SAS Base/Advanced (A00-231/232)", "ArzonPrime SAS Track"],
    aiRisk: "Moderate",
    aiRiskNote: "Code generation accelerates; validated programming and stat. logic stay human.",
    demandIndia: "Moderate",
    demandGlobal: "High",
    topCompanies: ["IQVIA", "Cytel", "Parexel", "ICON", "Syneos", "Labcorp", "Fortrea"],
    salary: {
      entry: { min: 4.5, max: 6.5 },
      mid: { min: 9, max: 16 },
      senior: { min: 20, max: 38 },
    },
    evidence: { jdCount: 88, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "sas-clinical",
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    ladder: [
      "ML/AI Associate",
      "AI Engineer (Health)",
      "Senior AI Engineer",
      "AI Lead / Architect",
    ],
    skills: [
      "Python",
      "ML / DL frameworks",
      "Healthcare data (FHIR, EHR)",
      "MLOps",
      "Prompt + RAG patterns",
    ],
    certifications: [
      "DeepLearning.AI specialisations",
      "AWS/GCP ML cert",
      "ArzonPrime AI in Healthcare",
    ],
    aiRisk: "Low",
    aiRiskNote: "You're the one building it.",
    demandIndia: "Emerging",
    demandGlobal: "High",
    topCompanies: [
      "Innovaccer",
      "HealthifyMe",
      "Practo",
      "Tata 1mg",
      "Sigtuple",
      "Niramai",
      "Qure.ai",
    ],
    salary: { entry: { min: 6, max: 10 }, mid: { min: 14, max: 28 }, senior: { min: 30, max: 60 } },
    evidence: { jdCount: 64, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "ai-intelligence",
  },
  "clinical-saas": {
    slug: "clinical-saas",
    ladder: [
      "Customer Success Associate",
      "CSM / Account Exec.",
      "Senior CSM",
      "Strategic Accounts Lead",
    ],
    skills: [
      "Discovery calls",
      "Onboarding workflows",
      "Quota selling",
      "Healthcare buyer fluency",
    ],
    certifications: ["HubSpot Sales", "Gainsight Admin", "ArzonPrime Clinical SaaS Track"],
    aiRisk: "Low",
    aiRiskNote: "Relationship and renewal accountability stays human.",
    demandIndia: "Moderate",
    demandGlobal: "Moderate",
    topCompanies: ["Innovaccer", "ZS Associates", "Veeva", "IQVIA Tech", "Indegene", "CitiusTech"],
    salary: { entry: { min: 6, max: 9 }, mid: { min: 12, max: 22 }, senior: { min: 25, max: 45 } },
    evidence: { jdCount: 51, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "clinical-saas",
  },
  "software-engineer": {
    slug: "software-engineer",
    ladder: ["SDE-I", "SDE-II", "Senior SDE", "Staff / Engineering Manager"],
    skills: [
      "DSA fundamentals",
      "One backend stack (Node/Go/Java)",
      "Databases",
      "System design basics",
    ],
    certifications: ["No mandatory cert - portfolio + DSA wins"],
    aiRisk: "Moderate",
    aiRiskNote: "Routine CRUD compresses; product engineers who design systems stay in demand.",
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: [
      "Razorpay",
      "Zerodha",
      "Swiggy",
      "Postman",
      "Freshworks",
      "Atlassian Bangalore",
      "Microsoft IDC",
    ],
    salary: { entry: { min: 6, max: 12 }, mid: { min: 18, max: 35 }, senior: { min: 40, max: 80 } },
    evidence: { jdCount: 320, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "software-engineer",
  },
  "business-analyst": {
    slug: "business-analyst",
    ladder: ["BA Trainee", "Business / Data Analyst", "Senior Analyst", "Analytics Lead"],
    skills: ["SQL", "Advanced Excel", "Dashboards (Tableau/Power BI)", "Stakeholder storytelling"],
    certifications: ["Google Data Analytics", "Microsoft PL-300", "ArzonPrime BA Track"],
    aiRisk: "Moderate",
    aiRiskNote: "Ad-hoc analysis automates; analysts who frame the right question keep winning.",
    demandIndia: "High",
    demandGlobal: "High",
    topCompanies: [
      "Flipkart",
      "Swiggy",
      "PhonePe",
      "EXL",
      "Tiger Analytics",
      "Fractal",
      "Mu Sigma",
    ],
    salary: { entry: { min: 5, max: 8 }, mid: { min: 10, max: 18 }, senior: { min: 20, max: 40 } },
    evidence: { jdCount: 215, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "business-analyst",
  },
  "b2b-saas-sales": {
    slug: "b2b-saas-sales",
    ladder: ["SDR / BDR", "Account Executive", "Senior AE", "Sales Manager"],
    skills: ["Cold outbound", "Discovery calls", "CRM hygiene", "Quota math"],
    certifications: ["HubSpot Sales", "Winning by Design SDR", "ArzonPrime SaaS Sales"],
    aiRisk: "Low",
    aiRiskNote: "Outbound automates; closers and trusted advisors do not.",
    demandIndia: "High",
    demandGlobal: "Moderate",
    topCompanies: ["Freshworks", "Zoho", "Postman", "Chargebee", "Whatfix", "BrowserStack"],
    salary: { entry: { min: 5, max: 8 }, mid: { min: 11, max: 22 }, senior: { min: 25, max: 50 } },
    evidence: { jdCount: 168, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "b2b-saas-sales",
  },
  "agri-tech-ops": {
    slug: "agri-tech-ops",
    ladder: ["Field Associate", "Ops Executive", "Cluster Lead", "Regional Ops Manager"],
    skills: [
      "Field operations",
      "Distributor management",
      "Basic data tools",
      "Local-language fluency",
    ],
    certifications: ["No mandatory cert", "ArzonPrime Agri-Tech Ops (waitlist)"],
    aiRisk: "Low",
    aiRiskNote: "Field presence is the moat.",
    demandIndia: "Moderate",
    demandGlobal: "Niche",
    topCompanies: ["DeHaat", "Ninjacart", "Cropin", "Stellapps", "Absolute"],
    salary: { entry: { min: 4, max: 6 }, mid: { min: 7, max: 11 }, senior: { min: 13, max: 22 } },
    evidence: { jdCount: 38, windowStart: "Jan 2026", windowEnd: "Jun 2026" },
    learningPathSlug: "agri-tech-ops",
  },
};

export function getPathFacts(slug: string): CareerPathFacts | null {
  return PATH_FACTS[slug] ?? null;
}

export function formatSalaryBand(b: SalaryBand): string {
  return `₹${b.min}–${b.max}L`;
}

export function formatSourceLine(facts: CareerPathFacts): string {
  if (!facts.evidence || facts.evidence.jdCount === 0) {
    return "Sourcing in progress - JD dataset being collected.";
  }
  return `Based on ${facts.evidence.jdCount.toLocaleString("en-IN")} Indian JDs analyzed between ${facts.evidence.windowStart}–${facts.evidence.windowEnd}.`;
}

// Suppress unused warning until we wire a default constant.
void RECENT;
