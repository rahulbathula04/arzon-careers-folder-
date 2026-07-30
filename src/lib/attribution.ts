/**
 * First-touch attribution capture.
 *
 * Reads UTM params + referrer on entry and persists them in localStorage so
 * every subsequent analytics event in the session can carry the same
 * attribution payload - even after the user navigates away from the landing
 * URL. Designed to be called from any entry route (Career Engine test page,
 * landing, etc.); first writer wins so attribution doesn't get clobbered if
 * the user revisits with new UTM params mid-session.
 */
const KEY = "arzon_attribution_v1";

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landing_path: string | null;
  first_touch_at: string;
};

function emptyAttribution(): Attribution {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    gclid: null,
    fbclid: null,
    referrer: null,
    landing_path: null,
    first_touch_at: new Date().toISOString(),
  };
}

/** Capture first-touch attribution if not already stored. Safe to call repeatedly. */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.localStorage.getItem(KEY);
    if (existing) {
      try {
        return JSON.parse(existing) as Attribution;
      } catch {
        /* re-capture */
      }
    }
    const url = new URL(window.location.href);
    const a = emptyAttribution();
    let hasAny = false;
    for (const f of UTM_FIELDS) {
      const v = url.searchParams.get(f);
      if (v) {
        (a as Record<string, unknown>)[f] = v.slice(0, 120);
        hasAny = true;
      }
    }
    const ref = document.referrer || null;
    a.referrer = ref ? ref.slice(0, 256) : null;
    a.landing_path = (url.pathname + url.search).slice(0, 256);
    // Only persist if we got at least one signal - keeps storage clean for
    // direct navigations.
    if (hasAny || ref) {
      window.localStorage.setItem(KEY, JSON.stringify(a));
    }
    return a;
  } catch {
    return null;
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** Flat key/value map for merging into analytics event `props`. */
export function getAttributionProps(): Record<string, string> {
  const a = getAttribution();
  if (!a) return {};
  const out: Record<string, string> = {};
  for (const f of UTM_FIELDS) {
    const v = a[f];
    if (v) out[f] = v;
  }
  if (a.referrer) out.first_referrer = a.referrer;
  if (a.landing_path) out.first_landing_path = a.landing_path;
  return out;
}

export function getAttributionUtmSource(): string | null {
  return getAttribution()?.utm_source ?? null;
}
