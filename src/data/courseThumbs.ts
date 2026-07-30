// Real, branded course thumbnails (provided by Arzon).
import thumbMC from "@/assets/thumbs/medical-coding.webp";
import thumbPV from "@/assets/thumbs/pharmacovigilance.webp";
import thumbCDM from "@/assets/thumbs/clinical-data-management.webp";
import thumbSAS from "@/assets/thumbs/sas-clinical.webp";
import thumbNano from "@/assets/thumbs/nanoscience.webp";
import thumbAI from "@/assets/thumbs/ai-intelligence.webp";
import thumbSaaS from "@/assets/thumbs/clinical-saas.webp";
// Legacy fallbacks (kept for slugs without bespoke art yet).
import thumbRA from "@/assets/thumbs/regulatory-affairs.webp";
import thumbCR from "@/assets/thumb-clinical-research.webp";
void thumbCR;

// ── Responsive variants (generated at build via sharp; see
// scripts/rebuild-course-thumbs.mjs). 400w / 600w sit next to the 800w
// source so <img srcSet> can pick the cheapest good match for a slot.
import thumbMC400 from "@/assets/thumbs/generated/medical-coding-400w.webp";
import thumbMC600 from "@/assets/thumbs/generated/medical-coding-600w.webp";
import thumbPV400 from "@/assets/thumbs/generated/pharmacovigilance-400w.webp";
import thumbPV600 from "@/assets/thumbs/generated/pharmacovigilance-600w.webp";
import thumbCDM400 from "@/assets/thumbs/generated/clinical-data-management-400w.webp";
import thumbCDM600 from "@/assets/thumbs/generated/clinical-data-management-600w.webp";
import thumbSAS400 from "@/assets/thumbs/generated/sas-clinical-400w.webp";
import thumbSAS600 from "@/assets/thumbs/generated/sas-clinical-600w.webp";
import thumbNano400 from "@/assets/thumbs/generated/nanoscience-400w.webp";
import thumbNano600 from "@/assets/thumbs/generated/nanoscience-600w.webp";
import thumbAI400 from "@/assets/thumbs/generated/ai-intelligence-400w.webp";
import thumbAI600 from "@/assets/thumbs/generated/ai-intelligence-600w.webp";
import thumbSaaS400 from "@/assets/thumbs/generated/clinical-saas-400w.webp";
import thumbSaaS600 from "@/assets/thumbs/generated/clinical-saas-600w.webp";
import thumbRA400 from "@/assets/thumbs/generated/regulatory-affairs-400w.webp";
import thumbRA600 from "@/assets/thumbs/generated/regulatory-affairs-600w.webp";

import type { CourseCategory } from "./courses";

/**
 * Per-slug thumbnail map. Slugs not present fall back to a category default
 * so every card has a credible cover even before bespoke art is generated.
 */
const BY_SLUG: Record<string, string> = {
  "medical-coding": thumbMC,
  pharmacovigilance: thumbPV,
  "clinical-data-management": thumbCDM,
  "sas-clinical": thumbSAS,
  nanoscience: thumbNano,
  "ai-intelligence": thumbAI,
  "ai-healthcare": thumbAI,
  "clinical-research": thumbSAS,
  "regulatory-affairs": thumbRA,
  "clinical-saas": thumbSaaS,
  "healthcare-rcm": thumbMC,
  "digital-health-fhir": thumbAI,
  "medical-writing": thumbRA,
  bioinformatics: thumbNano,
};

/** srcSet variants aligned 1:1 with the BY_SLUG entries above. */
const SRCSET_BY_SLUG: Record<string, { w400: string; w600: string; w800: string }> = {
  "medical-coding": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC },
  pharmacovigilance: { w400: thumbPV400, w600: thumbPV600, w800: thumbPV },
  "clinical-data-management": { w400: thumbCDM400, w600: thumbCDM600, w800: thumbCDM },
  "sas-clinical": { w400: thumbSAS400, w600: thumbSAS600, w800: thumbSAS },
  nanoscience: { w400: thumbNano400, w600: thumbNano600, w800: thumbNano },
  "ai-intelligence": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "ai-healthcare": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "clinical-research": { w400: thumbSAS400, w600: thumbSAS600, w800: thumbSAS },
  "regulatory-affairs": { w400: thumbRA400, w600: thumbRA600, w800: thumbRA },
  "clinical-saas": { w400: thumbSaaS400, w600: thumbSaaS600, w800: thumbSaaS },
  "healthcare-rcm": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC },
  "digital-health-fhir": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "medical-writing": { w400: thumbRA400, w600: thumbRA600, w800: thumbRA },
  bioinformatics: { w400: thumbNano400, w600: thumbNano600, w800: thumbNano },
};

const SRCSET_BY_CATEGORY: Record<CourseCategory, { w400: string; w600: string; w800: string }> = {
  "Pharmacy & Life Sciences": { w400: thumbPV400, w600: thumbPV600, w800: thumbPV },
  "Tech Programmes": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "Commerce & Marketing": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC },
};

/**
 * Return `{ src, srcSet }` for a slug so <img> can pick the smallest good
 * variant. Falls back to the same 800w image the legacy `thumbFor` returned
 * when no responsive set is defined (or when an admin override is active -
 * overrides are single URLs and don't have generated variants).
 */
export function thumbSrcSetFor(
  slug: string,
  category: CourseCategory,
): { src: string; srcSet: string | undefined } {
  const override = OVERRIDES[slug];
  if (override) return { src: override, srcSet: undefined };
  const set = SRCSET_BY_SLUG[slug] ?? SRCSET_BY_CATEGORY[category];
  return {
    src: set.w800,
    srcSet: `${set.w400} 400w, ${set.w600} 600w, ${set.w800} 800w`,
  };
}

const BY_CATEGORY: Record<CourseCategory, string> = {
  "Pharmacy & Life Sciences": thumbPV,
  "Tech Programmes": thumbAI,
  "Commerce & Marketing": thumbMC,
};

export function thumbFor(slug: string, category: CourseCategory): string {
  const override = OVERRIDES[slug];
  if (override) return override;
  return BY_SLUG[slug] ?? BY_CATEGORY[category];
}

/**
 * Admin-managed overrides loaded at app start from the
 * `course_thumbnail_overrides` table. Mutated through `setThumbnailOverrides`
 * so existing call sites (`thumbFor`) need no changes.
 */
let OVERRIDES: Record<string, string> = {};
const subscribers = new Set<() => void>();

export function setThumbnailOverrides(map: Record<string, string>) {
  OVERRIDES = { ...map };
  subscribers.forEach((fn) => fn());
}

export function getThumbnailOverrides(): Record<string, string> {
  return OVERRIDES;
}

export function subscribeThumbnailOverrides(fn: () => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}
