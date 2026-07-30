/**
 * Credibility constants - single source of truth for the home-page
 * CredibilityStrip, the /credibility deep-dive page, the Footer
 * sister-brand row, and the Hero micro-credit line.
 *
 * Bump LEARNER_COUNT as cohorts complete. Numbers stay editable here
 * so the marketing team can update without touching components.
 */

export const LEARNER_COUNT = 1200;
export const LEARNER_COUNT_LABEL = "1,200+";

export const LIVE_TRACKS = ["Medical Coding", "Pharmacovigilance", "AI in Healthcare"] as const;

export const AI_TRACK_BULLETS = [
  "Prompt fluency for documentation and audit workflows.",
  "AI-assisted SOAP review and adverse-event triage practice.",
  "Resume-aware coding co-pilot you actually use on the job.",
] as const;

export interface SisterBrand {
  code: string;
  name: string;
  url: string;
  host: string;
  desc: string;
}

export const SISTER_BRANDS: SisterBrand[] = [
  {
    code: "AG",
    name: "Arzon Global",
    url: "https://arzonglobal.com",
    host: "arzonglobal.com",
    desc: "Talent & workforce partner across India.",
  },
  {
    code: "AL",
    name: "Assay Labs",
    url: "https://assaylabs.in",
    host: "assaylabs.in",
    desc: "Bio-analytical & CRO services for life sciences.",
  },
];
