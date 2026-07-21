import type { TrackSlug } from "@/data/trackTheme";

export type DomainCard = {
  /** Track slug — drives the locked theme via getTrackTheme. */
  slug: TrackSlug | "digital-health-fhir";
  /** Display label on the tile. */
  label: string;
  /** Short eyebrow chip text, ≤ 20 chars. */
  eyebrow: string;
  /** One-sentence outcome promise. */
  blurb: string;
  /** Optional one-line "who this is for" line. */
  bestFor?: string;
  /**
   * Four short qualitative signals that help a student choose between tracks
   * at a glance. Kept as bands (no fabricated absolute numbers) — see the
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
 *
 * AI healthcare is mapped to `digital-health-fhir`, our live AI-in-health
 * programme — confirm with marketing if a dedicated AI track is launched.
 */
export const DOMAIN_CARDS: DomainCard[] = [
  {
    slug: "pharmacovigilance",
    label: "Pharmacovigilance",
    eyebrow: "Drug safety",
    blurb: "Process ICSRs in Argus, write narratives, work to IQVIA / Cognizant SLAs.",
    bestFor: "Pharma / Pharm.D / Life Sciences",
    decision: { salary: "₹2.8–4.2 LPA", hiring: "High", difficulty: "Medium", demand: "Steady" },
  },
  {
    slug: "medical-coding",
    label: "Medical Coding",
    eyebrow: "RCM coding",
    blurb: "Code real US charts in ICD-10-CM, CPT, HCPCS to AAPC-grade accuracy.",
    bestFor: "Pharma / Nursing / Life Sciences",
    decision: {
      salary: "₹2.4–3.8 LPA",
      hiring: "Very high",
      difficulty: "Medium",
      demand: "Strong",
    },
  },
  {
    slug: "clinical-data-management",
    label: "Clinical Data Management",
    eyebrow: "EDC + CDASH",
    blurb: "Build Medidata Rave studies, write edit checks, lock trial databases.",
    bestFor: "Pharma / B.Sc / Biotech",
    decision: {
      salary: "₹3.0–4.5 LPA",
      hiring: "Medium",
      difficulty: "Medium-high",
      demand: "Growing",
    },
  },
  {
    slug: "regulatory-affairs",
    label: "Regulatory Affairs",
    eyebrow: "CTD / eCTD",
    blurb: "Compile Module 1–5 dossiers for CDSCO, USFDA and EMA submissions.",
    bestFor: "Pharma / Pharm.D",
    decision: { salary: "₹3.0–4.5 LPA", hiring: "Medium", difficulty: "High", demand: "Niche" },
  },
  {
    slug: "sas-clinical",
    label: "Clinical SAS Programming",
    eyebrow: "SDTM + ADaM",
    blurb: "Program SDTM/ADaM datasets and TLFs for trial submissions.",
    bestFor: "Stats / B.Sc / Engineering",
    decision: { salary: "₹3.6–5.2 LPA", hiring: "Medium", difficulty: "High", demand: "Premium" },
  },
  {
    slug: "medical-writing",
    label: "Medical Writing",
    eyebrow: "Regulatory writing",
    blurb: "Draft CSRs, protocols and PSURs to ICH-E3 quality, JD-mapped.",
    bestFor: "Pharma / Life Sciences / English",
    decision: {
      salary: "₹3.0–4.2 LPA",
      hiring: "Medium",
      difficulty: "Medium-high",
      demand: "Steady",
    },
  },
  {
    slug: "digital-health-fhir",
    label: "AI in Healthcare",
    eyebrow: "AI + FHIR",
    blurb: "Build FHIR-native AI workflows for digital health and HL7 integrations.",
    bestFor: "Engineering / CS / Biomedical",
    decision: { salary: "₹4.0–6.0 LPA", hiring: "Emerging", difficulty: "High", demand: "Growing" },
  },
];
