import { track, getAnonId } from "@/lib/track";

/**
 * Tiny client-side A/B bucketing utility.
 *
 * - Stable per `anon_id`: same user always lands in the same variant for a
 *   given experiment key (no flicker between visits).
 * - Equal-weight buckets; no server round-trip.
 * - Assignment is logged once per session per experiment as `ab_assignment`
 *   so we can join it against `apply_cta_click` / `apply_submitted` later.
 *
 * Outcomes are NOT recorded here - they flow through the existing
 * `apply_cta_click` delegated listener in `__root.tsx` and the
 * `apply_submitted` funnel event. Joining on `anon_id + experiment` in
 * the metrics dashboard is enough to compute lift.
 */

function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

const sessionLogged = new Set<string>();
const variantCache = new Map<string, string>();

/**
 * Dev/E2E-only force override. Reads `?ab_force=<experiment>:<variant>`
 * from the URL and stickies it in sessionStorage so navigations keep
 * the same variant. Disabled in production builds.
 */
function readForcedVariant(experiment: string): string | null {
  if (typeof window === "undefined") return null;
  if (!import.meta.env.DEV && !window.sessionStorage.getItem("__ab_force_enabled")) {
    // Allow Playwright to opt-in by setting __ab_force_enabled before navigation.
    return null;
  }
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get("ab_force");
    if (raw) {
      const [exp, variant] = raw.split(":");
      if (exp === experiment && variant) {
        window.sessionStorage.setItem(`ab:${experiment}:forced`, variant);
        return variant;
      }
    }
    return window.sessionStorage.getItem(`ab:${experiment}:forced`);
  } catch {
    return null;
  }
}

/** Read the currently-assigned variant without (re)assigning. */
export function getAssignedVariant(experiment: string): string | null {
  if (variantCache.has(experiment)) return variantCache.get(experiment)!;
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(`ab:${experiment}`);
  } catch {
    return null;
  }
}

export function assignVariant<V extends string>(experiment: string, variants: readonly V[]): V {
  if (variants.length === 0) throw new Error("assignVariant: empty variants");
  // Cache hit: return identical variant for the lifetime of the tab.
  const cached = variantCache.get(experiment) as V | undefined;
  if (cached && variants.includes(cached)) return cached;

  const forced = readForcedVariant(experiment) as V | null;
  const anon = (typeof window !== "undefined" && getAnonId()) || "anon";
  const idx = hash(`${experiment}:${anon}`) % variants.length;
  const variant: V = forced && variants.includes(forced) ? forced : variants[idx]!;
  variantCache.set(experiment, variant);

  // Log assignment once per session so we don't spam analytics_events.
  if (typeof window !== "undefined") {
    const key = `ab:${experiment}`;
    if (!sessionLogged.has(key)) {
      sessionLogged.add(key);
      try {
        const flag = window.sessionStorage.getItem(key);
        window.sessionStorage.setItem(key, variant);
        if (flag !== variant) {
          track("ab_assignment", {
            props: { experiment, variant, forced: !!forced },
          });
        }
      } catch {
        track("ab_assignment", { props: { experiment, variant } });
      }
    }
  }
  return variant;
}

/** Live experiments. Add new ones here so the dashboard can enumerate them. */
export const EXPERIMENTS = {
  sticky_cta_placement: ["control", "bottom_pill", "scroll_trigger"] as const,
  hero_headline: ["control", "outcome", "urgency"] as const,
  apply_cta_urgency: ["control", "seats_left", "deadline"] as const,
  apply_step1_field_order: ["control", "whatsapp_first", "minimal_top"] as const,
  apply_step1_cta_placement: ["control", "sticky_bottom", "inline_after_whatsapp"] as const,
  apply_step1_confirm_copy: ["control", "outcome", "urgency"] as const,
} satisfies Record<string, readonly string[]>;

export type ExperimentKey = keyof typeof EXPERIMENTS;
