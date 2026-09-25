/**
 * ACRI Readiness Classifier — Authoritative Single Source of Truth
 *
 * RULE: This is the ONLY place in the entire application where a score
 * is mapped to a readiness state. Do not replicate this logic in:
 * - Result components
 * - Certificate components
 * - Share card components
 * - Verification page
 * - CTA logic
 * - Color selection
 *
 * All components that need the readiness state must:
 * 1. Receive it as a prop (preferred), or
 * 2. Call getAcriReadinessState(score) from this module.
 *
 * Thresholds live in ACRI_READINESS_CONFIG. Do not hardcode 80 or 60
 * anywhere else in the codebase.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type AcriReadinessState =
  | "industry_ready"       // score >= 80
  | "near_ready"           // score 60–79 (Approaching Readiness)
  | "developing"           // score 40–59
  | "building_foundations" // score < 40
  ;

// ─── Configuration ────────────────────────────────────────────────────────────

export interface AcriReadinessConfig {
  /** Minimum score for Industry Ready. All UI uses this constant. */
  industryReadyThreshold: number;
  /** Minimum score for Approaching Readiness / Near Ready. */
  nearReadyThreshold: number;
  /** Minimum score for Developing. */
  developingThreshold: number;
}

export const ACRI_READINESS_CONFIG: AcriReadinessConfig = {
  industryReadyThreshold: 80,
  nearReadyThreshold: 60,
  developingThreshold: 40,
};

// ─── Authoritative Classifier ─────────────────────────────────────────────────

/**
 * Maps a composite score to an AcriReadinessState.
 *
 * Score >= 80  → "industry_ready" (Industry Ready)
 * Score 60-79  → "near_ready" (Approaching Readiness)
 * Score 40-59  → "developing" (Developing)
 * Score < 40   → "building_foundations" (Foundation Building)
 *
 * NOTE: Critical gate results are NOT considered here.
 * Sub-80% areas are presented as Development Areas and do not invalidate
 * an overall >= 80 Industry Ready result.
 */
export function getAcriReadinessState(score: number): AcriReadinessState {
  const { industryReadyThreshold, nearReadyThreshold, developingThreshold } = ACRI_READINESS_CONFIG;
  if (score >= industryReadyThreshold) return "industry_ready";
  if (score >= nearReadyThreshold) return "near_ready";
  if (score >= developingThreshold) return "developing";
  return "building_foundations";
}

// ─── Display Labels ───────────────────────────────────────────────────────────

export const READINESS_LABELS: Record<AcriReadinessState, string> = {
  industry_ready: "INDUSTRY READY",
  near_ready: "APPROACHING READINESS",
  developing: "DEVELOPING",
  building_foundations: "FOUNDATION BUILDING",
};

export const READINESS_HEADLINES: Record<AcriReadinessState, string> = {
  industry_ready: "You Did It!",
  near_ready: "Keep Going!",
  developing: "Developing Foundations",
  building_foundations: "Build Your Foundation",
};

export const READINESS_SUBTITLES: Record<AcriReadinessState, string> = {
  industry_ready:
    "You have successfully completed the Arzon Clinical Readiness Index for Pharmacovigilance Associate.",
  near_ready:
    "You are close to the industry readiness threshold. Focus on the identified areas to reach 80+ and become Industry Ready.",
  developing:
    "You have demonstrated baseline competence in selected core areas. Targeted practice in ICSR triage and MedDRA coding will accelerate your qualification.",
  building_foundations:
    "You are currently below the industry readiness threshold. This is a great starting point. Follow the recommended learning path and reassess when you're ready.",
};

export const READINESS_BADGE_COPY: Record<AcriReadinessState, string> = {
  industry_ready: "Congratulations!",
  near_ready: "Keep Going!",
  developing: "Developing Skillset",
  building_foundations: "Build Your Foundation",
};

// ─── Colour Tokens (semantic, not raw hex — match CSS token names) ────────────

export const READINESS_COLORS: Record<
  AcriReadinessState,
  {
    ring: string;
    badge: string;
    badgeBg: string;
    badgeBorder: string;
  }
> = {
  industry_ready: {
    ring: "#16a34a",
    badge: "#14532d",
    badgeBg: "#f0fdf4",
    badgeBorder: "#bbf7d0",
  },
  near_ready: {
    ring: "#d97706",
    badge: "#78350f",
    badgeBg: "#fffbeb",
    badgeBorder: "#fde68a",
  },
  developing: {
    ring: "#0284c7",
    badge: "#075985",
    badgeBg: "#f0f9ff",
    badgeBorder: "#bae6fd",
  },
  building_foundations: {
    ring: "#dc2626",
    badge: "#7f1d1d",
    badgeBg: "#fef2f2",
    badgeBorder: "#fecaca",
  },
};

// ─── Distance Helpers ─────────────────────────────────────────────────────────

/** Points needed to reach Industry Ready from current score */
export function pointsToIndustryReady(score: number): number {
  return Math.max(0, ACRI_READINESS_CONFIG.industryReadyThreshold - score);
}

/** Points needed to reach Near Ready from current score */
export function pointsToNearReady(score: number): number {
  return Math.max(0, ACRI_READINESS_CONFIG.nearReadyThreshold - score);
}
