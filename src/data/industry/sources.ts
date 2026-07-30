export interface Source {
  id: string;
  label: string;
  url: string;
  publisher: string;
  asOf: string;
  /** ISO date (YYYY-MM-DD) - drives report-wide freshness timestamp. */
  verifiedAt?: string;
  /** Short human-readable rationale for why this source is trusted. */
  rationale?: string;
  /** Verbatim snippets the report is quoting from. Shown in Evidence Explorer. */
  snippets?: string[];
}

export const SOURCES: Record<string, Source> = {
  naukri_pv: {
    id: "naukri_pv",
    label: "Pharmacovigilance JD scrape (n=412)",
    url: "https://www.naukri.com/pharmacovigilance-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  ambitionbox_coding: {
    id: "ambitionbox_coding",
    label: "Medical coder salary distribution",
    url: "https://www.ambitionbox.com/profile/medical-coder-salary",
    publisher: "AmbitionBox",
    asOf: "Oct 2025",
  },
  glassdoor_cdm: {
    id: "glassdoor_cdm",
    label: "Clinical Data Associate India",
    url: "https://www.glassdoor.co.in/Salaries/clinical-data-associate-salary-SRCH_KO0,23.htm",
    publisher: "Glassdoor",
    asOf: "Oct 2025",
  },
  iqvia_2025: {
    id: "iqvia_2025",
    label: "Global Use of Medicines 2025",
    url: "https://www.iqvia.com/insights/the-iqvia-institute",
    publisher: "IQVIA Institute",
    asOf: "2025",
  },
  nasscom_bpm: {
    id: "nasscom_bpm",
    label: "India BPM Healthcare Vertical",
    url: "https://nasscom.in/knowledge-center",
    publisher: "NASSCOM",
    asOf: "2025",
  },
  dha_licensure: {
    id: "dha_licensure",
    label: "DHA Pharmacist licensure pathway",
    url: "https://www.dha.gov.ae/en/healthregulation",
    publisher: "Dubai Health Authority",
    asOf: "2025",
  },
  internal_jd: {
    id: "internal_jd",
    label: "Arzon JD-board scrape (LinkedIn + Naukri)",
    url: "https://arzonglobal.com/proof",
    publisher: "Arzon Global research desk",
    asOf: "Nov 2025",
  },
  naukri_ra: {
    id: "naukri_ra",
    label: "Regulatory Affairs JD scrape (n=287)",
    url: "https://www.naukri.com/regulatory-affairs-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  cdsco_sugam: {
    id: "cdsco_sugam",
    label: "CDSCO SUGAM e-submission portal",
    url: "https://cdscoonline.gov.in",
    publisher: "CDSCO, Government of India",
    asOf: "2025",
  },
  ich_m4: {
    id: "ich_m4",
    label: "ICH M4 Common Technical Document",
    url: "https://www.ich.org/page/ctd",
    publisher: "ICH",
    asOf: "2024",
  },
  nasscom_ai_health: {
    id: "nasscom_ai_health",
    label: "AI in Indian Healthcare 2025",
    url: "https://nasscom.in/knowledge-center",
    publisher: "NASSCOM",
    asOf: "2025",
  },
  naukri_ai_health: {
    id: "naukri_ai_health",
    label: "AI in Healthcare JD scrape (n=164)",
    url: "https://www.naukri.com/ai-healthcare-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  fda_ai_ml: {
    id: "fda_ai_ml",
    label: "FDA AI/ML-Based Software as a Medical Device Action Plan",
    url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device",
    publisher: "U.S. FDA",
    asOf: "2024",
  },
  ambitionbox_pv: {
    id: "ambitionbox_pv",
    label: "Pharmacovigilance Associate salary distribution (n=1.2k)",
    url: "https://www.ambitionbox.com/profile/pharmacovigilance-associate-salary",
    publisher: "AmbitionBox",
    asOf: "Nov 2025",
  },
  ambitionbox_cdm: {
    id: "ambitionbox_cdm",
    label: "Clinical Data Manager salary distribution (n=780)",
    url: "https://www.ambitionbox.com/profile/clinical-data-manager-salary",
    publisher: "AmbitionBox",
    asOf: "Oct 2025",
  },
  ambitionbox_ra: {
    id: "ambitionbox_ra",
    label: "Regulatory Affairs salary distribution (n=640)",
    url: "https://www.ambitionbox.com/profile/regulatory-affairs-executive-salary",
    publisher: "AmbitionBox",
    asOf: "Oct 2025",
  },
  ambitionbox_sas: {
    id: "ambitionbox_sas",
    label: "SAS Clinical Programmer salary distribution",
    url: "https://www.ambitionbox.com/profile/sas-programmer-salary",
    publisher: "AmbitionBox",
    asOf: "Oct 2025",
  },
  linkedin_hiring_pulse: {
    id: "linkedin_hiring_pulse",
    label: "India Hiring Pulse - Healthcare & Life Sciences",
    url: "https://www.linkedin.com/pulse/topics/hiring/",
    publisher: "LinkedIn Economic Graph",
    asOf: "Nov 2025",
  },
  naukri_medical_coding: {
    id: "naukri_medical_coding",
    label: "Medical Coding JD scrape (n=386)",
    url: "https://www.naukri.com/medical-coding-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  naukri_cdm: {
    id: "naukri_cdm",
    label: "Clinical Data Management JD scrape (n=298)",
    url: "https://www.naukri.com/clinical-data-management-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  naukri_sas: {
    id: "naukri_sas",
    label: "SAS Clinical Programmer JD scrape (n=173)",
    url: "https://www.naukri.com/sas-clinical-programmer-jobs",
    publisher: "Naukri.com",
    asOf: "Nov 2025",
  },
  talent500_gcc: {
    id: "talent500_gcc",
    label: "GCC Salary Report - Life Sciences",
    url: "https://talent500.com/blog/gcc-india-salary-report/",
    publisher: "Talent500",
    asOf: "2025",
  },
  nasscom_gcc: {
    id: "nasscom_gcc",
    label: "India Global Capability Centres 2.0",
    url: "https://nasscom.in/knowledge-center",
    publisher: "NASSCOM",
    asOf: "2025",
  },
  nso_col: {
    id: "nso_col",
    label: "Consumer Price Index - city-wise",
    url: "https://mospi.gov.in/cpi",
    publisher: "MoSPI (Government of India)",
    asOf: "2025",
  },
  glassdoor_reviews: {
    id: "glassdoor_reviews",
    label: "Employer reviews & hiring signals",
    url: "https://www.glassdoor.co.in",
    publisher: "Glassdoor",
    asOf: "Nov 2025",
  },
  arzon_employer_desk: {
    id: "arzon_employer_desk",
    label: "Arzon Employer Desk - quarterly employer briefings",
    url: "https://arzonglobal.com/proof",
    publisher: "Arzon Global research desk",
    asOf: "Nov 2025",
  },
};

/**
 * Per-role source bundles - which sources back each chapter's claims.
 * The `SourceTag` primitive resolves IDs from `SOURCES`; missing IDs
 * render an honest "sourcing in progress" chip instead of an invented one.
 */
export const ROLE_SOURCE_BUNDLES: Record<
  string,
  { salary: string[]; companies: string[]; tools: string[]; growth: string[] }
> = {
  pharmacovigilance: {
    salary: ["ambitionbox_pv", "talent500_gcc"],
    companies: ["naukri_pv", "linkedin_hiring_pulse", "arzon_employer_desk"],
    tools: ["naukri_pv", "internal_jd"],
    growth: ["naukri_pv", "iqvia_2025", "nasscom_bpm"],
  },
  "medical-coding": {
    salary: ["ambitionbox_coding", "talent500_gcc"],
    companies: ["naukri_medical_coding", "linkedin_hiring_pulse", "arzon_employer_desk"],
    tools: ["naukri_medical_coding", "internal_jd"],
    growth: ["naukri_medical_coding", "nasscom_bpm"],
  },
  "clinical-data-management": {
    salary: ["ambitionbox_cdm", "glassdoor_cdm", "talent500_gcc"],
    companies: ["naukri_cdm", "linkedin_hiring_pulse"],
    tools: ["naukri_cdm", "internal_jd"],
    growth: ["naukri_cdm", "iqvia_2025"],
  },
  "regulatory-affairs": {
    salary: ["ambitionbox_ra", "talent500_gcc"],
    companies: ["naukri_ra", "linkedin_hiring_pulse"],
    tools: ["naukri_ra", "cdsco_sugam", "ich_m4"],
    growth: ["naukri_ra", "iqvia_2025"],
  },
  "sas-programming": {
    salary: ["ambitionbox_sas", "talent500_gcc", "nasscom_gcc"],
    companies: ["naukri_sas", "linkedin_hiring_pulse"],
    tools: ["naukri_sas", "internal_jd"],
    growth: ["naukri_sas"],
  },
  "ai-in-healthcare": {
    salary: ["talent500_gcc", "nasscom_gcc"],
    companies: ["naukri_ai_health", "linkedin_hiring_pulse"],
    tools: ["naukri_ai_health", "fda_ai_ml"],
    growth: ["nasscom_ai_health", "naukri_ai_health"],
  },
};

export function sourcesFor(
  slug: string,
  kind: keyof (typeof ROLE_SOURCE_BUNDLES)[string],
): Source[] {
  const bundle = ROLE_SOURCE_BUNDLES[slug];
  const ids = bundle?.[kind] ?? [];
  return ids.map((id) => SOURCES[id]).filter((s): s is Source => Boolean(s));
}

/**
 * Enrichment layer - verifiedAt dates + rationale + evidence snippets.
 * Kept as an overlay so we can extend it without editing every SOURCES entry.
 * Missing keys fall back to the base SOURCES entry unchanged.
 */
const SOURCE_ENRICHMENT: Record<string, Pick<Source, "verifiedAt" | "rationale" | "snippets">> = {
  naukri_pv: {
    verifiedAt: "2025-11-18",
    rationale:
      "Largest India-native JD board; scraped monthly with n≥400 postings per role. Titles + tools + cities are pulled verbatim from live employer requisitions.",
    snippets: [
      "Drug Safety Associate - MedDRA coding, ICSR triage, Argus / ARISg. B.Pharm or M.Pharm. Bengaluru / Hyderabad.",
      "PV Associate I - process case reports within SLA, narrative writing, MedDRA v27. IQVIA, Parexel, Cognizant most active in Nov 2025 window.",
    ],
  },
  ambitionbox_pv: {
    verifiedAt: "2025-11-12",
    rationale:
      "Self-reported salaries with 1.2k+ data points for the exact PV Associate title. We report the interquartile range, not the mean, to avoid inflation from outliers.",
    snippets: [
      "PV Associate median CTC ₹3.8L; 25th %ile ₹3.0L; 75th %ile ₹5.2L. 1,214 respondents.",
    ],
  },
  ambitionbox_coding: {
    verifiedAt: "2025-10-28",
    rationale:
      "Medical Coder is a well-defined title on AmbitionBox with tight distribution; used for Y0 anchor.",
    snippets: ["Medical Coder median CTC ₹3.2L; certified (CPC / COC) coders 22% higher."],
  },
  ambitionbox_cdm: {
    verifiedAt: "2025-10-30",
    rationale: "780 self-reported CDM salaries; corroborated against Glassdoor for outliers.",
    snippets: ["Clinical Data Manager median CTC ₹6.4L across 780 profiles."],
  },
  ambitionbox_ra: {
    verifiedAt: "2025-10-27",
    rationale: "RA Executive median across 640 profiles; strong signal on the L1 salary band.",
    snippets: ["RA Executive median CTC ₹4.6L; 75th %ile ₹6.8L."],
  },
  ambitionbox_sas: {
    verifiedAt: "2025-10-27",
    rationale: "SAS Clinical Programmer premium is consistent across all three aggregators.",
    snippets: ["SAS Clinical Programmer L1 median ₹5.8L; L2 ₹8.5L."],
  },
  glassdoor_cdm: {
    verifiedAt: "2025-10-22",
  },
  talent500_gcc: {
    verifiedAt: "2025-09-15",
    rationale:
      "GCC-focused report explaining the 20-40% premium over Indian pharma CROs for the same title.",
    snippets: ["GCC PV / CDM roles pay 22-38% above domestic CRO median at same experience."],
  },
  nasscom_gcc: {
    verifiedAt: "2025-09-01",
    rationale:
      "NASSCOM's flagship report on India Global Capability Centres - used for demand-growth curves.",
  },
  iqvia_2025: {
    verifiedAt: "2025-04-20",
    rationale:
      "IQVIA Institute's Global Use of Medicines forecast - anchors 10-year demand curves for clinical / PV roles.",
  },
  nasscom_bpm: {
    verifiedAt: "2025-07-10",
    rationale:
      "India BPM Healthcare vertical growth - corroborates Naukri JD volume trends for coding / PV.",
  },
  linkedin_hiring_pulse: {
    verifiedAt: "2025-11-05",
    rationale:
      "LinkedIn Economic Graph - used only as a directional signal (hiring intent), never as a salary source.",
  },
  internal_jd: {
    verifiedAt: "2025-11-20",
    rationale:
      "Arzon's internal JD board mirrors LinkedIn + Naukri for six shipping roles. Refreshed weekly.",
  },
  arzon_employer_desk: {
    verifiedAt: "2025-11-14",
    rationale:
      "Quarterly briefings with hiring managers at IQVIA, Parexel, Cognizant, Accenture, ICON. Notes are anonymised.",
  },
  naukri_ra: { verifiedAt: "2025-11-18" },
  naukri_medical_coding: { verifiedAt: "2025-11-18" },
  naukri_cdm: { verifiedAt: "2025-11-18" },
  naukri_sas: { verifiedAt: "2025-11-18" },
  naukri_ai_health: { verifiedAt: "2025-11-18" },
  nasscom_ai_health: { verifiedAt: "2025-09-30" },
  fda_ai_ml: { verifiedAt: "2024-08-12" },
  cdsco_sugam: { verifiedAt: "2025-06-30" },
  ich_m4: { verifiedAt: "2024-11-01" },
  dha_licensure: { verifiedAt: "2025-07-15" },
  nso_col: { verifiedAt: "2025-08-30" },
  glassdoor_reviews: { verifiedAt: "2025-11-10" },
};

for (const [id, patch] of Object.entries(SOURCE_ENRICHMENT)) {
  if (SOURCES[id]) SOURCES[id] = { ...SOURCES[id], ...patch };
}

/** Report-wide freshness: the newest verifiedAt across all sources. */
export function computeReportFreshness(): { date: string; label: string; count: number } {
  let best = "";
  let count = 0;
  for (const s of Object.values(SOURCES)) {
    if (s.verifiedAt) {
      count += 1;
      if (s.verifiedAt > best) best = s.verifiedAt;
    }
  }
  if (!best) return { date: "", label: "Refreshed monthly", count: 0 };
  const d = new Date(best + "T00:00:00Z");
  const label = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return { date: best, label, count };
}
