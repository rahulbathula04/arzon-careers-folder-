import type { TrackSlug } from "@/data/trackTheme";

export type DomainCard = {
  /** Track slug - drives the locked theme via getTrackTheme. */
  slug: TrackSlug | "digital-health-fhir";
  /** Target Job Title hero heading (e.g., "Fresher PV Associate Track"). */
  heroTitle?: string;
  /** Subject descriptor (e.g., "Pharmacovigilance & Drug Safety"). */
  subject?: string;
  /** Display label on the tile. */
  label: string;
  /** Short eyebrow chip text, ≤ 20 chars. */
  eyebrow: string;
  /** One-sentence outcome promise. */
  blurb: string;
  /** Header text for skills section (e.g. "Build skills in:"). */
  skillsHeader?: string;
  /** Specific skill list items for the card. */
  skills?: string[];
  /** Optional one-line "who this is for" line. */
  bestFor?: string;
  /** Footer badge tag. */
  footerTag?: string;
  /**
   * Four short qualitative signals that help a student choose between tracks
   * at a glance. Kept as bands (no fabricated absolute numbers) - see the
   * project "De-AI" rule and `src/data/jdProvenance.ts`.
   */
  decision?: {
    salary: string;
    hiring: string;
    difficulty: string;
    demand: string;
  };
};

/**
 * Domain tiles surfaced on /courses, the home page and the top of /apply.
 * Each entry points to a real programme slug so the Apply CTA can
 * deep-link `?programme=<slug>` and preselect the track.
 */
export const DOMAIN_CARDS: DomainCard[] = [
  {
    slug: "pharmacovigilance",
    heroTitle: "Fresher PV Associate Track",
    subject: "Pharmacovigilance & Drug Safety",
    label: "Pharmacovigilance",
    eyebrow: "Drug safety",
    blurb: "Process ICSRs in Argus, write narratives, work to IQVIA / Cognizant SLAs.",
    skillsHeader: "Learn how to work with:",
    skills: [
      "ICSR case processing",
      "MedDRA coding",
      "Case narratives",
      "Causality assessment",
      "Safety database workflows",
    ],
    bestFor: "B.Pharm / M.Pharm / Pharm.D / Life Sciences",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: { salary: "₹2.8–4.2 LPA", hiring: "High", difficulty: "Medium", demand: "Steady" },
  },
  {
    slug: "medical-coding",
    heroTitle: "Fresher Medical Coder Track",
    subject: "Medical Coding",
    label: "Medical Coding",
    eyebrow: "RCM coding",
    blurb: "Code real US charts in ICD-10-CM, CPT, HCPCS to AAPC-grade accuracy.",
    skillsHeader: "Build skills in:",
    skills: [
      "ICD-10-CM",
      "CPT",
      "HCPCS",
      "Medical terminology",
      "Clinical documentation",
      "Coding accuracy",
    ],
    bestFor: "B.Pharm / Nursing / Life Sciences / Healthcare graduates",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: {
      salary: "₹2.4–3.8 LPA",
      hiring: "Very high",
      difficulty: "Medium",
      demand: "Strong",
    },
  },
  {
    slug: "clinical-data-management",
    heroTitle: "Fresher Clinical Data Associate Track",
    subject: "Clinical Data Management",
    label: "Clinical Data Management",
    eyebrow: "EDC + CDASH",
    blurb: "Build Medidata Rave studies, write edit checks, lock trial databases.",
    skillsHeader: "Build skills in:",
    skills: [
      "EDC systems",
      "CRF/eCRF",
      "Data validation",
      "Query management",
      "Data cleaning",
      "Clinical database workflows",
    ],
    bestFor: "B.Pharm / M.Pharm / Life Sciences / Biotech",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: {
      salary: "₹3.0–4.5 LPA",
      hiring: "Medium",
      difficulty: "Medium-high",
      demand: "Growing",
    },
  },
  {
    slug: "regulatory-affairs",
    heroTitle: "Fresher Regulatory Affairs Track",
    subject: "Regulatory Affairs Associate",
    label: "Regulatory Affairs",
    eyebrow: "CTD / eCTD",
    blurb: "Compile Module 1–5 dossiers for CDSCO, USFDA and EMA submissions.",
    skillsHeader: "Build skills in:",
    skills: [
      "Regulatory documentation",
      "CTD/eCTD",
      "Submission workflows",
      "CMC fundamentals",
      "Regulatory databases",
      "Compliance requirements",
    ],
    bestFor: "M.Pharm / Pharm.D / Pharmacy graduates",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: { salary: "₹3.0–4.5 LPA", hiring: "Medium", difficulty: "High", demand: "Niche" },
  },
  {
    slug: "sas-clinical",
    heroTitle: "Fresher Clinical SAS Programming Track",
    subject: "SAS Programmer - Clinical Research",
    label: "Clinical SAS Programming",
    eyebrow: "SDTM + ADaM",
    blurb: "Program SDTM/ADaM datasets and TLFs for trial submissions.",
    skillsHeader: "Build skills in:",
    skills: [
      "SAS programming",
      "Clinical datasets",
      "SDTM",
      "ADaM",
      "TLFs",
      "Clinical trial data analysis",
    ],
    bestFor: "Statistics / Mathematics / Data / Life Sciences graduates",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: { salary: "₹3.6–5.2 LPA", hiring: "Medium", difficulty: "High", demand: "Premium" },
  },
  {
    slug: "medical-writing",
    heroTitle: "Fresher Medical Writer Track",
    subject: "Medical Writing",
    label: "Medical Writing",
    eyebrow: "Regulatory writing",
    blurb: "Draft CSRs, protocols and PSURs to ICH-E3 quality, JD-mapped.",
    skillsHeader: "Build skills in:",
    skills: [
      "Scientific writing",
      "Literature review",
      "Clinical documentation",
      "Protocols",
      "Safety reports",
      "Regulatory writing",
    ],
    bestFor: "Pharma / Life Sciences / Biotechnology graduates",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: {
      salary: "₹3.0–4.2 LPA",
      hiring: "Medium",
      difficulty: "Medium-high",
      demand: "Steady",
    },
  },
  {
    slug: "digital-health-fhir",
    heroTitle: "Fresher AI Healthcare Engineer Track",
    subject: "AI in Healthcare",
    label: "AI in Healthcare",
    eyebrow: "AI + FHIR",
    blurb: "Build FHIR-native AI workflows for digital health and HL7 integrations.",
    skillsHeader: "Build skills in:",
    skills: ["FHIR standards", "HL7 integrations", "AI workflows", "Health data pipelines"],
    bestFor: "Engineering / CS / Biomedical",
    footerTag: "12 WEEKS · ROLE-BASED · FRESHER",
    decision: { salary: "₹4.0–6.0 LPA", hiring: "Emerging", difficulty: "High", demand: "Growing" },
  },
];

