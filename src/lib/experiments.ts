// Lightweight client-side A/B framework.
// Deterministic 50/50 bucketing keyed by a per-visitor uid + experiment name.
// Exposure is logged once per session per experiment. All other events
// (cta_click, form_submit, whatsapp_click, enrolment_paid) fire on demand.

import { logExperimentEvent } from "./experiments.functions";

const UID_KEY = "arzon_exp_uid";
const EXPOSED_PREFIX = "arzon_exp_seen:";

function uid(): string {
  if (typeof window === "undefined") return "ssr";
  let v = window.localStorage.getItem(UID_KEY);
  if (!v) {
    v = (
      globalThis.crypto?.randomUUID?.() ??
      Math.random().toString(36).slice(2) + Date.now().toString(36)
    ).replace(/-/g, "");
    window.localStorage.setItem(UID_KEY, v);
  }
  return v;
}

// FNV-1a hash → 0..1 deterministic bucket.
function bucket(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return (h % 1000) / 1000;
}

export type Variant = "control" | "variant";

export function getVariant(experiment: string): Variant {
  return bucket(`${uid()}::${experiment}`) < 0.5 ? "control" : "variant";
}

export function trackExposure(experiment: string, courseSlug?: string) {
  if (typeof window === "undefined") return;
  const key = `${EXPOSED_PREFIX}${experiment}`;
  if (window.sessionStorage.getItem(key)) return;
  window.sessionStorage.setItem(key, "1");
  const variant = getVariant(experiment);
  void logExperimentEvent({
    data: { uid: uid(), experiment, variant, event: "exposure", courseSlug },
  }).catch(() => {});
}

export function trackEvent(
  experiment: string,
  event:
    | "cta_click"
    | "form_open"
    | "form_submit"
    | "whatsapp_click"
    | "razorpay_open"
    | "razorpay_success"
    | "enrolment_paid",
  courseSlug?: string,
  props?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const variant = getVariant(experiment);
  void logExperimentEvent({
    data: { uid: uid(), experiment, variant, event, courseSlug, props },
  }).catch(() => {});
}

/** Public accessor for the visitor uid - needed when we attach the visitor
 *  to a server-side write (e.g. enrolment intent) so the paid event can be
 *  tied back to the correct variant later. */
export function getVisitorUid(): string {
  return uid();
}

// Active experiments on the curriculum page.
export const EXP = {
  layout: "curriculum_layout_v1",
  ctaTiming: "cta_timing_v1",
} as const;
