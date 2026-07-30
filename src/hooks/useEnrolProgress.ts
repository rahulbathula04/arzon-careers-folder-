import { useCallback, useEffect, useState } from "react";
import type { TierId } from "@/data/enrolmentTiers";
import { isTier } from "@/data/enrolmentTiers";

/**
 * Durable enrolment funnel progress.
 *
 * Persists the active intent + contact + step in localStorage so a refresh,
 * accidental back-nav, tab restore, or Razorpay dismissal never drops the
 * learner back to step 1. The server intent row remains authoritative;
 * this is a fast, offline-safe mirror.
 */

const KEY = "arzon_enrol_v1";
const TTL_MS = 24 * 60 * 60 * 1000;

export type EnrolStep = "profile" | "programme" | "seat" | "payment" | "confirmed";

export interface EnrolProgress {
  v: 1;
  intentId?: string;
  intentToken?: string;
  tier?: TierId;
  contact?: { name?: string; email?: string; phone?: string };
  step: EnrolStep;
  coupon?: { code: string; appliedAt: string; expiresAt: string };
  updatedAt: number;
}

function read(): EnrolProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EnrolProgress;
    if (parsed?.v !== 1) return null;
    if (Date.now() - (parsed.updatedAt ?? 0) > TTL_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    if (parsed.tier && !isTier(parsed.tier)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function write(next: EnrolProgress | null) {
  if (typeof window === "undefined") return;
  try {
    if (!next) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify({ ...next, updatedAt: Date.now() }));
  } catch {
    /* quota - ignore */
  }
}

/**
 * Imperative helpers - safe to call from event handlers.
 * These bypass React state so callers don't need the hook mounted.
 */
export const enrolProgressStore = {
  get: read,
  set: (patch: Partial<EnrolProgress>) => {
    const prev = read() ?? { v: 1 as const, step: "profile" as const, updatedAt: Date.now() };
    write({ ...prev, ...patch, v: 1, updatedAt: Date.now() });
  },
  clear: () => write(null),
};

/** React hook - subscribes to storage events so open tabs stay in sync. */
export function useEnrolProgress() {
  const [state, setState] = useState<EnrolProgress | null>(null);

  useEffect(() => {
    setState(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setState(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((patch: Partial<EnrolProgress>) => {
    enrolProgressStore.set(patch);
    setState(read());
  }, []);

  const clear = useCallback(() => {
    enrolProgressStore.clear();
    setState(null);
  }, []);

  return { state, update, clear };
}
