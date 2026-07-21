import { useCallback, useEffect, useState } from "react";

/**
 * useStreak(planId) — 7-day check state with a namespaced localStorage key
 * and safe fallback for private-browsing mode (in-memory only, no throw).
 *
 * Key shape: `arzon.streak.<userOrAnon>.<planId>`.
 * `streak` counts consecutive completed days from day 0.
 */
export interface UseStreakReturn {
  days: boolean[];
  toggle: (dayIdx: number) => void;
  reset: () => void;
  streak: number;
  doneCount: number;
  persistent: boolean;
}

function keyFor(userId: string | null, planId: string) {
  return `arzon.streak.${userId ?? "anon"}.${planId}`;
}

function safeGet(k: string): boolean[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(k);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "boolean")) {
      const out = Array<boolean>(7).fill(false);
      for (let i = 0; i < Math.min(7, parsed.length); i++) out[i] = parsed[i];
      return out;
    }
  } catch {
    /* private mode or bad JSON */
  }
  return null;
}

function safeSet(k: string, v: boolean[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
}

export function useStreak(planId: string, userId: string | null = null): UseStreakReturn {
  const [days, setDays] = useState<boolean[]>(() => Array<boolean>(7).fill(false));
  const [persistent, setPersistent] = useState<boolean>(true);

  useEffect(() => {
    const k = keyFor(userId, planId);
    const existing = safeGet(k);
    if (existing) setDays(existing);
    // Probe writability once to expose `persistent` to the UI.
    const ok = safeSet(`${k}.__probe`, [false, false, false, false, false, false, false]);
    setPersistent(ok);
    if (ok) {
      try {
        window.localStorage.removeItem(`${k}.__probe`);
      } catch {
        /* noop */
      }
    }
  }, [planId, userId]);

  const toggle = useCallback(
    (dayIdx: number) => {
      setDays((prev) => {
        if (dayIdx < 0 || dayIdx > 6) return prev;
        const next = prev.slice();
        next[dayIdx] = !next[dayIdx];
        safeSet(keyFor(userId, planId), next);
        return next;
      });
    },
    [planId, userId],
  );

  const reset = useCallback(() => {
    const empty = Array<boolean>(7).fill(false);
    setDays(empty);
    safeSet(keyFor(userId, planId), empty);
  }, [planId, userId]);

  let streak = 0;
  for (const d of days) {
    if (d) streak += 1;
    else break;
  }
  const doneCount = days.filter(Boolean).length;

  return { days, toggle, reset, streak, doneCount, persistent };
}

export default useStreak;
