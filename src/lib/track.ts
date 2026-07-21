import { trackEvent } from "@/lib/analytics.functions";
import { getAttributionProps, getAttributionUtmSource } from "@/lib/attribution";
import { claimOnce } from "@/lib/eventDedupe";

const ANON_KEY = "arzon_anon_id";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (RFC4122 v4)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getAnonId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(ANON_KEY);
    if (!id) {
      id = uuid();
      window.localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export interface TrackProps {
  session_id?: string | null;
  application_id?: string | null;
  lead_id?: string | null;
  program_slug?: string | null;
  cohort?: string | null;
  props?: Record<string, unknown>;
  /**
   * If set, the event is sent at most once per browser for this key.
   * Use for funnel events that should not double-fire on retries/refreshes,
   * e.g. `lead_submitted:<attempt_id>` or `payment_success:<intent_id>`.
   */
  dedupeKey?: string;
}

/**
 * High-volume page_view events are sampled on the client to keep
 * `analytics_events` write rate bounded. Funnel-critical events
 * (anything that's not "page_view") are always recorded.
 * Override sample rate at runtime via VITE_ANALYTICS_PAGEVIEW_SAMPLE.
 */
const PAGE_VIEW_SAMPLE_RATE = (() => {
  const raw = (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_ANALYTICS_PAGEVIEW_SAMPLE;
  const n = raw ? Number(raw) : 0.25;
  return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.25;
})();

const HIGH_VOLUME_EVENTS = new Set(["page_view"]);

export function track(eventName: string, extra: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  // Respect Do-Not-Track
  try {
    if (navigator.doNotTrack === "1") return;
  } catch {
    /* noop */
  }
  // Sample high-volume telemetry. Funnel events are never sampled.
  if (HIGH_VOLUME_EVENTS.has(eventName) && Math.random() > PAGE_VIEW_SAMPLE_RATE) {
    return;
  }
  // Idempotency for funnel-critical events.
  if (extra.dedupeKey && !claimOnce(extra.dedupeKey)) return;
  try {
    const url = new URL(window.location.href);
    const utm =
      url.searchParams.get("utm_source") ??
      url.searchParams.get("utm") ??
      getAttributionUtmSource() ??
      null;
    const attributionProps = getAttributionProps();
    const payload = {
      event_name: eventName,
      anon_id: getAnonId(),
      session_id: extra.session_id ?? null,
      application_id: extra.application_id ?? null,
      lead_id: extra.lead_id ?? null,
      path: url.pathname + url.search,
      referrer: document.referrer || null,
      utm_source: utm,
      program_slug: extra.program_slug ?? null,
      cohort: extra.cohort ?? null,
      props: { ...attributionProps, ...(extra.props ?? {}) },
    };
    // Fire-and-forget. trackEvent is a server function; calling it returns a promise.
    void trackEvent({ data: payload }).catch(() => {
      /* swallow */
    });
  } catch {
    /* never break UX for analytics */
  }
}
