/**
 * ACRI Readiness Preview — derives a 5-dimension readiness profile from
 * existing Career Engine trait scores. No DB schema changes; computed
 * client-side at result time. This is the v1 "preview" rubric — the real
 * ASSAY rubric will replace this map without touching the result page.
 */
import type { Trait, ArchetypeId } from "@/data/careerEngineQuestions";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";

/**
 * Each trait maps to one or two ACRI dimensions with a weight that sums to 1.
 * Picked so that PV-shaped traits (detail, compliance, writing, language)
 * raise documentation + communication, and operational traits (data, logic,
 * pressure, screen) raise operational + workflow.
 */
export const TRAIT_TO_ACRI: Record<Trait, Partial<Record<AcriDimensionId, number>>> = {
  detail: { documentation: 0.7, operational: 0.3 },
  logic: { operational: 0.7, workflow: 0.3 },
  language: { communication: 0.6, documentation: 0.4 },
  screen: { workflow: 0.7, operational: 0.3 },
  patient: { communication: 0.7, domain: 0.3 },
  data: { operational: 0.6, documentation: 0.4 },
  writing: { documentation: 0.7, communication: 0.3 },
  sales: { communication: 1.0 },
  compliance: { documentation: 0.6, domain: 0.4 },
  tech: { workflow: 0.6, operational: 0.4 },
  lab: { domain: 0.7, operational: 0.3 },
  empathy: { communication: 0.8, domain: 0.2 },
  pressure: { operational: 0.6, workflow: 0.4 },
};

/**
 * Returns any Trait values that lack a TRAIT_TO_ACRI mapping. Used by the
 * unit test suite as a build-time guard so that adding a new Trait without
 * mapping it surfaces immediately. Logs a console.warn at runtime too.
 */
export function validateTraitCoverage(allTraits: readonly Trait[]): Trait[] {
  const missing = allTraits.filter((t) => {
    const m = TRAIT_TO_ACRI[t];
    return !m || Object.keys(m).length === 0;
  });
  if (missing.length && typeof console !== "undefined") {
    console.warn("[acri] Traits missing from TRAIT_TO_ACRI:", missing);
  }
  return missing;
}

export type AcriProfile = Record<AcriDimensionId, number>;

/**
 * Convert raw trait scores (any range, typically 0-20) into a normalised
 * 0-100 ACRI profile across the 5 dimensions.
 */
export function computeAcri(traitScores: Partial<Record<Trait, number>>): AcriProfile {
  const raw: AcriProfile = {
    operational: 0,
    communication: 0,
    documentation: 0,
    workflow: 0,
    domain: 0,
  };
  const wsum: AcriProfile = {
    operational: 0,
    communication: 0,
    documentation: 0,
    workflow: 0,
    domain: 0,
  };

  (Object.entries(traitScores) as [Trait, number][]).forEach(([trait, score]) => {
    if (typeof score !== "number") return;
    const map = TRAIT_TO_ACRI[trait];
    if (!map) return;
    (Object.entries(map) as [AcriDimensionId, number][]).forEach(([dim, w]) => {
      raw[dim] += Math.max(0, score) * w;
      wsum[dim] += w;
    });
  });

  // Normalise: rescale each dim against the strongest trait-driven dim so
  // the bars are readable even when traits are sparse.
  const max = Math.max(1, ...Object.values(raw));
  const out: AcriProfile = {
    operational: 0,
    communication: 0,
    documentation: 0,
    workflow: 0,
    domain: 0,
  };
  ACRI_DIMENSIONS.forEach(({ id }) => {
    out[id] = Math.round((raw[id] / max) * 100);
  });
  return out;
}

/** Average across the 5 dimensions, used for the headline readiness score. */
export function acriOverall(profile: AcriProfile): number {
  const vals = ACRI_DIMENSIONS.map(({ id }) => profile[id]);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export type ReadinessBand = "foundation" | "developing" | "industry_ready";

export interface ReadinessBandMeta {
  id: ReadinessBand;
  label: string;
  sub: string;
  tone: string;
}

export function readinessBand(overall: number, trackTitle?: string): ReadinessBandMeta {
  const cohort = trackTitle ? `${trackTitle} cohort` : "cohort";
  if (overall >= 70)
    return {
      id: "industry_ready",
      label: "Industry-ready",
      sub: `Strong base across most ACRI dimensions. The ${cohort} starts you at operational depth.`,
      tone: "border-blue-400/40 bg-blue-400/10 text-blue-200",
    };
  if (overall >= 45)
    return {
      id: "developing",
      label: "Developing",
      sub: `Solid foundation. The ${cohort} is built to close the remaining gaps in 12 weeks.`,
      tone: "border-primary-glow/40 bg-primary/10 text-primary-glow",
    };
  return {
    id: "foundation",
    label: "Foundation",
    sub: `Early-stage readiness. The ${cohort} starts at the right level — no prior experience assumed.`,
    tone: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  };
}

/**
 * Returns the bottom-2 ACRI dimensions — what the cohort will help close.
 */
export function acriGapMap(
  profile: AcriProfile,
): { id: AcriDimensionId; label: string; score: number }[] {
  return [...ACRI_DIMENSIONS]
    .map(({ id, label }) => ({ id, label, score: profile[id] }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);
}

export interface RecommendedTrack {
  slug: string;
  title: string;
  why: string;
  tag: "flagship" | "secondary";
  fit?: number;
}

const PATH_TITLES: Record<string, string> = {
  pharmacovigilance: "Pharmacovigilance",
  "medical-coding": "Medical Coding",
  "clinical-data-management": "Clinical Data Management",
  "regulatory-affairs": "Regulatory Affairs",
  "sas-clinical": "SAS Programming (Clinical)",
  "ai-intelligence": "AI in Healthcare",
  "clinical-saas": "Clinical SaaS Programme",
  "software-engineer": "Software Engineer (Product / Backend)",
  "business-analyst": "Business Analyst / Data Analyst",
  "b2b-saas-sales": "B2B SaaS Sales / Customer Success",
  "agri-tech-ops": "Agri-Tech Product Operations",
};

/** Top 2 ACRI dimensions, returned as their human labels. */
function topTwoStrengths(profile: AcriProfile): string[] {
  return [...ACRI_DIMENSIONS]
    .map(({ id, label }) => ({ label, score: profile[id] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((d) => d.label.toLowerCase());
}

function whyLine(slug: string, profile: AcriProfile, fit: number): string {
  const [s1, s2] = topTwoStrengths(profile);
  const strong = s2 ? `${s1} + ${s2}` : s1;
  const fitTier =
    fit >= 75 ? "very strong" : fit >= 60 ? "strong" : fit >= 45 ? "solid" : "early-stage";
  switch (slug) {
    case "pharmacovigilance":
      return `${fitTier} match — your ${strong} signal lines up with ICSR processing, MedDRA coding and aggregate-report ownership.`;
    case "medical-coding":
      return `${fitTier} match — your ${strong} signal fits the 95%+ accuracy bar, daily chart volume and audit grind that coders win on.`;
    case "clinical-data-management":
      return `${fitTier} match — your ${strong} signal maps to EDC build, edit-check writing and database-lock discipline.`;
    case "regulatory-affairs":
      return `${fitTier} match — your ${strong} signal fits long-form CTD authoring, deficiency-letter response and submission strategy.`;
    case "sas-clinical":
      return `${fitTier} match — your ${strong} signal pairs with SDTM/ADaM construction and CDISC validation work.`;
    case "ai-intelligence":
      return `${fitTier} match — your ${strong} signal matches the build-and-validate loop of clinical AI, where you ARE the automation.`;
    case "clinical-saas":
      return `${fitTier} match — your ${strong} signal fits product-led customer ownership in clinical SaaS accounts.`;
    case "software-engineer":
      return `${fitTier} match — your ${strong} signal lines up with shipping production code, code review and on-call ownership.`;
    case "business-analyst":
      return `${fitTier} match — your ${strong} signal fits SQL + storytelling roles where you turn ambiguous business questions into clean analyses.`;
    case "b2b-saas-sales":
      return `${fitTier} match — your ${strong} signal lines up with quota-carrying inside sales / customer success in Indian SaaS.`;
    case "agri-tech-ops":
      return `${fitTier} match — your ${strong} signal fits field-aware operations: farmer trust, regional supply and last-mile execution.`;
    default:
      return `${fitTier} match — derived directly from your ${strong} signal across the 40-question assessment.`;
  }
}

/**
 * Top track is whichever PATH scored highest in this attempt — not a
 * hardcoded flagship. The secondary is the next-best path with a
 * different slug. The archetype only influences tie-breaks.
 */
export function recommendedTracks(
  archetypeId: ArchetypeId,
  profile: AcriProfile,
  pathFits: { slug: string; title?: string; fit: number }[] = [],
  course?: string,
): RecommendedTrack[] {
  if (!pathFits.length) {
    // Legacy fallback (pre-v2 leads with no payload)
    return [
      {
        slug: "pharmacovigilance",
        title: "Pharmacovigilance",
        why: whyLine("pharmacovigilance", profile, 60),
        tag: "flagship",
      },
    ];
  }

  const sorted = [...pathFits].sort((a, b) => b.fit - a.fit);
  const top = sorted[0];
  const second = sorted.find((p) => p.slug !== top.slug);

  const out: RecommendedTrack[] = [
    {
      slug: top.slug,
      title: top.title ?? PATH_TITLES[top.slug] ?? top.slug,
      why: whyLine(top.slug, profile, top.fit),
      tag: "flagship",
      fit: top.fit,
    },
  ];
  // Suppress secondary track when it would mislead the candidate:
  //  - low absolute fit (< 50)
  //  - or a tech-heavy path surfaced for a non-tech background (Commerce / Arts)
  // Otherwise a BBA student sees "AI in Healthcare 45%" next to their real match
  // and the whole result reads as un-genuine.
  const TECH_HEAVY = new Set(["ai-intelligence", "sas-clinical"]);
  const nonTechCourse = course === "comm" || course === "arts" || course === "agri";
  const suppressSecondary =
    !!second && (second.fit < 50 || (nonTechCourse && TECH_HEAVY.has(second.slug)));
  if (second && !suppressSecondary) {
    out.push({
      slug: second.slug,
      title: second.title ?? PATH_TITLES[second.slug] ?? second.slug,
      why: whyLine(second.slug, profile, second.fit),
      tag: "secondary",
      fit: second.fit,
    });
  }
  // Suppress archetype param until consumed by an algorithmic tie-break.
  void archetypeId;
  return out;
}
