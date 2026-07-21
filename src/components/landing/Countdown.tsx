import { useEffect, useState } from "react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  /** ISO date string for the cohort start (e.g. "2026-05-15"). */
  targetISO: string;
  /** Static fallback label always shown alongside or in place of the ticker. */
  staticLabel: string;
  className?: string;
}

function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / 86_400_000));
}

/**
 * Cohort countdown.
 *
 * Reduced-motion behaviour: shows ONLY the static date label, no ticking,
 * no interval, no `requestAnimationFrame`. This is the "static display"
 * variant for users who opted out of motion (system or in-app toggle).
 *
 * Otherwise: shows the static date plus a "starts in N days" line,
 * recomputed once per hour (no per-second tick, we never animate dates).
 */
export function Countdown({ targetISO, staticLabel, className = "" }: Props) {
  const reduced = typeof document !== "undefined" ? isReducedMotion() : false;
  const [days, setDays] = useState<number | null>(() => (reduced ? null : daysUntil(targetISO)));

  useEffect(() => {
    if (isReducedMotion()) {
      setDays(null);
      return;
    }
    setDays(daysUntil(targetISO));
    // Refresh hourly, coarse enough to avoid any visible "tick" animation
    // while staying accurate across long-lived sessions.
    const id = window.setInterval(() => setDays(daysUntil(targetISO)), 3_600_000);
    return () => window.clearInterval(id);
  }, [targetISO]);

  return (
    <span className={className}>
      <span>Starts {staticLabel}</span>
      {days !== null && days > 0 ? (
        <span className="ml-2 text-slate-100/80">
          · in {days} day{days === 1 ? "" : "s"}
        </span>
      ) : null}
    </span>
  );
}
