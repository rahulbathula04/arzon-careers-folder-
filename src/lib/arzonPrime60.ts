import { useEffect, useState } from "react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

// Tracks the per-session/email ARZONPRIME60 60-minute window so the
// claim CTAs and the offer card across the marketing/result surfaces
// can react when the window has elapsed (or the user has used it).
//
// The pay page is the source of truth: it calls `recordPrime60Window`
// the first time the server successfully applies the coupon, persisting
// the server-returned `couponExpiresAt`. Other pages read this via
// `usePrime60Availability` to decide whether to show / enable the offer.

const STORAGE_KEY = "arzonprime60.session.v1";
const INTENT_KEY_PREFIX = "arzonprime60.intent.v1.";

export type Prime60Session = {
  expiresAt: string; // ISO
  email?: string | null;
  intentId?: string | null;
};

function readSession(): Prime60Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Prime60Session;
    if (!parsed?.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function recordPrime60Window(session: Prime60Session) {
  if (typeof window === "undefined") return;
  try {
    // Keep the latest (longest) expiry if a new apply lands.
    const existing = readSession();
    const next: Prime60Session =
      existing && new Date(existing.expiresAt).getTime() > new Date(session.expiresAt).getTime()
        ? existing
        : session;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // Notify same-tab listeners (storage event only fires across tabs).
    window.dispatchEvent(new CustomEvent("arzonprime60:changed"));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export function clearPrime60Window() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("arzonprime60:changed"));
  } catch {
    /* ignore */
  }
}

/**
 * Per-intent persisted coupon expiry. Lets the pay page survive reloads
 * without ever extending the window: we always prefer the EARLIEST known
 * expiry between localStorage and the server's value for that intent.
 */
export type StoredIntentExpiry = {
  couponCode: string;
  expiresAt: string; // ISO
};

const intentKey = (intentId: string) => `${INTENT_KEY_PREFIX}${intentId}`;

export function readIntentExpiry(intentId: string): StoredIntentExpiry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(intentKey(intentId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredIntentExpiry;
    if (!parsed?.expiresAt || !parsed?.couponCode) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function recordIntentExpiry(intentId: string, entry: StoredIntentExpiry) {
  if (typeof window === "undefined") return;
  try {
    const existing = readIntentExpiry(intentId);
    // Same coupon → keep the EARLIEST expiry so reloads can't extend it.
    // Different coupon (e.g. swapped to another code) → overwrite.
    let next = entry;
    if (existing && existing.couponCode === entry.couponCode) {
      const a = new Date(existing.expiresAt).getTime();
      const b = new Date(entry.expiresAt).getTime();
      next = a <= b ? existing : entry;
    }
    window.localStorage.setItem(intentKey(intentId), JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function clearIntentExpiry(intentId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(intentKey(intentId));
  } catch {
    /* ignore */
  }
}

/**
 * Resolve the authoritative coupon expiry for the pay-page countdown.
 * - If only server has it → use server (and persist it).
 * - If only storage has it (e.g. server briefly stale) → use storage.
 * - If both → use the EARLIER one, so reloads/re-applies never extend.
 * Ignores mismatched coupon codes.
 */
export function resolvePersistentExpiry(
  intentId: string,
  couponCode: string | null,
  serverExpiresAt: string | null,
): string | null {
  if (!couponCode) return serverExpiresAt;
  const stored = readIntentExpiry(intentId);
  const sameCoupon = stored?.couponCode === couponCode;
  if (!serverExpiresAt) return sameCoupon ? (stored?.expiresAt ?? null) : null;
  if (sameCoupon && stored) {
    const a = new Date(stored.expiresAt).getTime();
    const b = new Date(serverExpiresAt).getTime();
    return a <= b ? stored.expiresAt : serverExpiresAt;
  }
  return serverExpiresAt;
}

export type Prime60Availability = {
  /** True until the user has burned their 60-minute window. */
  available: boolean;
  /** True when a session exists but the 60-minute timer has elapsed. */
  expired: boolean;
  expiresAt: string | null;
  remainingMs: number;
};

function compute(session: Prime60Session | null): Prime60Availability {
  if (!session) {
    return { available: true, expired: false, expiresAt: null, remainingMs: 0 };
  }
  const remaining = new Date(session.expiresAt).getTime() - Date.now();
  if (remaining <= 0) {
    return { available: false, expired: true, expiresAt: session.expiresAt, remainingMs: 0 };
  }
  return { available: true, expired: false, expiresAt: session.expiresAt, remainingMs: remaining };
}

export function usePrime60Availability(): Prime60Availability {
  const [state, setState] = useState<Prime60Availability>(() => compute(readSession()));

  useEffect(() => {
    const refresh = () => setState(compute(readSession()));
    refresh();
    // Tick every second while an unexpired window exists so the "Offer
    // expires in HH:MM:SS" countdown surfaces stay live; otherwise poll
    // every 15s just to flip available→expired without a reload.
    // Honor prefers-reduced-motion: skip the 1s ticker and fall back to a
    // slow poll so the expired flip still happens without animated updates.
    const liveTick = isReducedMotion() ? 15_000 : 1_000;
    const tick = state.expiresAt && state.remainingMs > 0 ? liveTick : 15_000;
    const interval = window.setInterval(refresh, tick);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("arzonprime60:changed", refresh as EventListener);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("arzonprime60:changed", refresh as EventListener);
    };
    // Only re-create the interval when the window starts/ends - not on
    // every per-second remainingMs change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.expiresAt, state.remainingMs > 0]);

  return state;
}
