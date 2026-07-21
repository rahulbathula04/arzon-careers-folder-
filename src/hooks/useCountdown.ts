import { useEffect, useState } from "react";

/** Drift-corrected countdown to a fixed ISO timestamp. Returns ms remaining (>= 0). */
export function useCountdown(targetIso: string | null): number {
  const target = targetIso ? new Date(targetIso).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) return 0;
  return Math.max(0, target - now);
}

/**
 * Same drift-corrected countdown as `useCountdown` but also returns the
 * timestamp of the last tick so the UI can communicate that the clock is
 * being actively re-synced against the wall clock (not just decremented
 * locally). Used to render the small "Time synced HH:MM:SS" trust note
 * next to the ARZONPRIME60 countdown.
 */
export function useCountdownWithSync(targetIso: string | null): {
  remaining: number;
  syncedAt: number | null;
} {
  const target = targetIso ? new Date(targetIso).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) return { remaining: 0, syncedAt: null };
  return { remaining: Math.max(0, target - now), syncedAt: now };
}

export function formatHMS(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
