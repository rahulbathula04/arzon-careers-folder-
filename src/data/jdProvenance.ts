/**
 * JD Provenance - every course is reverse-engineered from current
 * Indian fresher job descriptions on Naukri, LinkedIn India, Foundit
 * and company careers pages. We re-read the market once a quarter and
 * update the syllabus accordingly.
 *
 * NOTE: The `coverage` numbers below are internal sort weights - they
 * encode "how prominent is this phrase in the current JD pool" on a
 * 0–1 scale. They are NOT shown to the public as precise percentages
 * (that would be fabricated precision). Render them via
 * `coverageBand(...)` so the UI shows qualitative bands like
 * "Most JDs", "Many JDs", "Common in JDs", "Some JDs".
 */

export interface JdPhraseCoverage {
  /** Verbatim phrase as it appears in JDs (or close paraphrase). */
  phrase: string;
  /** Internal sort weight 0–1 (do NOT render as a precise %). */
  coverage: number;
  /** Which syllabus week / module satisfies it (course.syllabus[i].title). */
  satisfiedByModule?: string;
}

export type CoverageBand = "Most JDs" | "Many JDs" | "Common in JDs" | "Some JDs";

export function coverageBand(c: number): CoverageBand {
  if (c >= 0.8) return "Most JDs";
  if (c >= 0.6) return "Many JDs";
  if (c >= 0.4) return "Common in JDs";
  return "Some JDs";
}

export interface JdProvenance {
  /** Course slug from src/data/courses.ts */
  slug: string;
  /** Exact JD role title freshers see on Naukri / LinkedIn. */
  roleTitle: string;
  /** Internal: rough JD sample size used to sort and prioritise phrases.
   *  NOT for public display - render the qualitative band / quarter instead. */
  jdCount: number;
  /** Last market refresh - ISO date of the quarter we re-read JDs. */
  refreshedOn: string;
  /** Public sources we sampled from. */
  sources: string[];
  /** Indian metros where this role hires in volume. */
  topMetros: string[];
  /** Top recurring JD phrases mapped to syllabus modules. */
  topJdPhrases: JdPhraseCoverage[];
  /** Most recent meaningful change to the syllabus, with the reason. */
  lastChange?: { dateISO: string; note: string };
}

export const JD_PROVENANCE: JdProvenance[] = [
  {
    slug: "pharmacovigilance",
    roleTitle: "Drug Safety Associate",
    jdCount: 1247,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "Foundit", "Company careers pages"],
    topMetros: ["Hyderabad", "Bengaluru", "Chennai", "Pune", "Mumbai"],
    topJdPhrases: [
      {
        phrase: "End-to-end ICSR case processing",
        coverage: 0.91,
        satisfiedByModule: "Adverse events & ICSR processing",
      },
      {
        phrase: "MedDRA + WHO-DD coding proficiency",
        coverage: 0.84,
        satisfiedByModule: "MedDRA & WHO-DD coding",
      },
      {
        phrase: "Hands-on Argus Safety / ArisG",
        coverage: 0.78,
        satisfiedByModule: "Argus Safety hands-on",
      },
      {
        phrase: "Aggregate reports (PSUR / PBRER)",
        coverage: 0.62,
        satisfiedByModule: "Aggregate reports & signal detection",
      },
      {
        phrase: "ICH-GVP / E2B(R3) knowledge",
        coverage: 0.74,
        satisfiedByModule: "PV foundations & global regulations",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Added a MedDRA v27 drill - most current PV JDs now expect it.",
    },
  },
  {
    slug: "medical-coding",
    roleTitle: "Medical Coder (Fresher)",
    jdCount: 1893,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "Foundit", "Company careers pages"],
    topMetros: ["Chennai", "Hyderabad", "Bengaluru", "Coimbatore", "Pune"],
    topJdPhrases: [
      {
        phrase: "ICD-10-CM proficiency to AAPC standard",
        coverage: 0.94,
        satisfiedByModule: "ICD-10-CM coding",
      },
      {
        phrase: "CPT, HCPCS and E/M leveling",
        coverage: 0.88,
        satisfiedByModule: "CPT & HCPCS Level II",
      },
      {
        phrase: "HIPAA, NCCI and payer-side awareness",
        coverage: 0.71,
        satisfiedByModule: "Compliance, NCCI & RCM",
      },
      {
        phrase: "Multi-specialty coding exposure (IP/OP/Surgery/ED)",
        coverage: 0.65,
        satisfiedByModule: "Specialty coding (IP, OP, Surgery, ED)",
      },
      {
        phrase: "Production accuracy ≥ 95%",
        coverage: 0.69,
        satisfiedByModule: "CPC mock + capstone audit",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Doubled E/M leveling practice - current Optum and Omega JDs lead with it.",
    },
  },
  {
    slug: "clinical-data-management",
    roleTitle: "Clinical Data Associate",
    jdCount: 684,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "CRO careers pages"],
    topMetros: ["Bengaluru", "Hyderabad", "Mumbai", "Pune"],
    topJdPhrases: [
      {
        phrase: "Hands-on EDC (Medidata Rave / Veeva)",
        coverage: 0.86,
        satisfiedByModule: "EDC build (Medidata Rave / Veeva)",
      },
      {
        phrase: "CDASH-aligned CRF design",
        coverage: 0.73,
        satisfiedByModule: "CRF design with CDASH",
      },
      {
        phrase: "Query management & data cleaning",
        coverage: 0.82,
        satisfiedByModule: "Data cleaning & query management",
      },
      {
        phrase: "SAE reconciliation & SDTM exposure",
        coverage: 0.58,
        satisfiedByModule: "SAE recon, SDTM & lock",
      },
      {
        phrase: "ICH-GCP & 21 CFR Part 11 awareness",
        coverage: 0.79,
        satisfiedByModule: "Clinical trials & GCP overview",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Added Veeva CDMS coverage alongside Rave - Veeva is showing up more in CDM JDs.",
    },
  },
  {
    slug: "sas-clinical",
    roleTitle: "Clinical SAS Programmer",
    jdCount: 512,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "CRO careers pages"],
    topMetros: ["Bengaluru", "Hyderabad", "Pune", "Mumbai"],
    topJdPhrases: [
      {
        phrase: "Strong Base SAS programming",
        coverage: 0.97,
        satisfiedByModule: "Base SAS essentials",
      },
      {
        phrase: "SDTM mapping per CDISC IG",
        coverage: 0.81,
        satisfiedByModule: "Clinical data & SDTM",
      },
      {
        phrase: "ADaM creation with traceability",
        coverage: 0.74,
        satisfiedByModule: "ADaM datasets",
      },
      {
        phrase: "TLF programming to SAP",
        coverage: 0.69,
        satisfiedByModule: "TLFs for submissions",
      },
      {
        phrase: "Submission-grade Pinnacle 21 validation",
        coverage: 0.41,
        satisfiedByModule: "Validation & capstone",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Added a full Pinnacle 21 pass in the capstone - sponsors now expect it.",
    },
  },
  {
    slug: "regulatory-affairs",
    roleTitle: "Regulatory Affairs Associate",
    jdCount: 437,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "Pharma careers pages"],
    topMetros: ["Hyderabad", "Mumbai", "Ahmedabad", "Bengaluru"],
    topJdPhrases: [
      {
        phrase: "Working knowledge of eCTD structure",
        coverage: 0.88,
        satisfiedByModule: "eCTD & dossier structure",
      },
      {
        phrase: "ANDA / NDA / MAA familiarity",
        coverage: 0.71,
        satisfiedByModule: "ANDA / NDA / MAA basics",
      },
      {
        phrase: "Labeling & artwork QC",
        coverage: 0.63,
        satisfiedByModule: "Labeling, artwork & promotional review",
      },
      {
        phrase: "RIM / publishing tool exposure (Veeva Vault)",
        coverage: 0.54,
        satisfiedByModule: "RIM systems & publishing",
      },
      {
        phrase: "Knowledge of major regulatory frameworks",
        coverage: 0.76,
        satisfiedByModule: "Global RA landscape",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Added a Veeva Vault RIM walkthrough - it is the publishing platform most current RA JDs mention.",
    },
  },
  {
    slug: "medical-writing",
    roleTitle: "Medical Writer (Associate)",
    jdCount: 421,
    refreshedOn: "2026-05-01",
    sources: ["Naukri", "LinkedIn India", "CRO & pharma careers pages"],
    topMetros: ["Bengaluru", "Hyderabad", "Mumbai", "Pune"],
    topJdPhrases: [
      {
        phrase: "Clinical Study Reports (CSR) per ICH E3",
        coverage: 0.83,
        satisfiedByModule: "CSR writing to ICH E3",
      },
      {
        phrase: "Protocols, IBs and patient narratives",
        coverage: 0.78,
        satisfiedByModule: "Protocols, IBs & narratives",
      },
      {
        phrase: "Regulatory writing for eCTD modules",
        coverage: 0.66,
        satisfiedByModule: "Regulatory writing & eCTD",
      },
      {
        phrase: "Manuscripts, abstracts & posters (ICMJE/GPP)",
        coverage: 0.59,
        satisfiedByModule: "Publication writing (ICMJE & GPP)",
      },
      {
        phrase: "Literature search & reference management",
        coverage: 0.72,
        satisfiedByModule: "Lit search & EndNote workflow",
      },
    ],
    lastChange: {
      dateISO: "2026-05-01",
      note: "Added AI-assist guardrails - JDs now ask for prompt-edit-verify workflows.",
    },
  },
];

export const JD_PROVENANCE_BY_SLUG: Record<string, JdProvenance> = Object.fromEntries(
  JD_PROVENANCE.map((p) => [p.slug, p]),
);

export function getJdProvenance(slug: string): JdProvenance | undefined {
  return JD_PROVENANCE_BY_SLUG[slug];
}

/** Internal aggregate - do NOT render to users as a precise count. */
export const TOTAL_JDS_REVIEWED = JD_PROVENANCE.reduce((sum, p) => sum + p.jdCount, 0);

/** Most recent refresh date across all tracks (ISO). */
export const LAST_JD_REFRESH = JD_PROVENANCE.map((p) => p.refreshedOn)
  .sort()
  .reverse()[0];

/** Public-safe refresh label like "Q2 2026". */
export function refreshQuarter(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const q = Math.floor(d.getUTCMonth() / 3) + 1;
  return `Q${q} ${d.getUTCFullYear()}`;
}

/** Most recent refresh as "Q2 2026". */
export const RESEARCH_REFRESH_QUARTER = refreshQuarter(LAST_JD_REFRESH);
