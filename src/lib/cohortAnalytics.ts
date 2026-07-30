/**
 * Cohort-funnel analytics helpers (GA4 + analytics_events fallback).
 *
 * Events:
 *   seat_availability_viewed   - countdown component first render
 *   lock_countdown_visible     - fired when <= 24h to lock
 *   checkout_blocked_locked    - Razorpay order rejected with cohort_locked
 *   waitlist_page_viewed       - /waitlist landing render
 *   seat_claim_succeeded       - server: webhook claimed a seat
 *   seat_claim_skipped_duplicate - server: webhook short-circuited on dedupe
 */
import { trackEvent } from "./analytics";

type Primitive = string | number | boolean | undefined;

export function trackCohort(name: string, params: Record<string, Primitive> = {}): void {
  try {
    trackEvent(name, params);
  } catch {
    /* swallow - analytics must never break UX */
  }
}
