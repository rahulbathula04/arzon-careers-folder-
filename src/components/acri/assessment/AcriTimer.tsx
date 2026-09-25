/**
 * AcriTimer — Isolated timer widget
 *
 * Reads timeRemainingSeconds from session via prop (single source of truth).
 * Does NOT own the countdown logic — the terminal owns the interval.
 *
 * States:
 *   normal   — white text, no urgency
 *   warning  — amber text (<5 min), pulses gently
 *   critical — red text (<2 min), pulses aggressively
 *   expired  — red, shows "TIME UP"
 *
 * Fires onExpire once when seconds hits 0.
 */
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AcriTimerProps {
  timeRemainingSeconds: number;
  onExpire?: () => void;
  /** Show in compact mode (header strip) vs. standalone panel */
  compact?: boolean;
  className?: string;
}

function formatTime(seconds: number): string {
  if (seconds <= 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type TimerState = "normal" | "warning" | "critical" | "expired";

function getTimerState(seconds: number): TimerState {
  if (seconds <= 0) return "expired";
  if (seconds <= 120) return "critical";   // < 2 min
  if (seconds <= 300) return "warning";    // < 5 min
  return "normal";
}

const STATE_CLASSES: Record<TimerState, string> = {
  normal:   "text-[var(--color-text-inverse)]",
  warning:  "text-amber-400",
  critical: "text-red-400",
  expired:  "text-red-400",
};

const PULSE_CLASSES: Record<TimerState, string> = {
  normal:   "",
  warning:  "motion-safe:animate-pulse",
  critical: "motion-safe:animate-[pulse_0.7s_ease-in-out_infinite]",
  expired:  "",
};

export function AcriTimer({
  timeRemainingSeconds,
  onExpire,
  compact = true,
  className,
}: AcriTimerProps) {
  const hasExpiredFired = useRef(false);
  const state = getTimerState(timeRemainingSeconds);

  useEffect(() => {
    if (timeRemainingSeconds <= 0 && !hasExpiredFired.current && onExpire) {
      hasExpiredFired.current = true;
      onExpire();
    }
    if (timeRemainingSeconds > 0) {
      hasExpiredFired.current = false;
    }
  }, [timeRemainingSeconds, onExpire]);

  const colorClass = STATE_CLASSES[state];
  const pulseClass = PULSE_CLASSES[state];

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5",
          className,
        )}
        aria-label={`Time remaining: ${formatTime(timeRemainingSeconds)}`}
        aria-live="off"
      >
        {/* Clock icon */}
        <svg
          className={cn("h-3.5 w-3.5 shrink-0", colorClass)}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className={cn(
            "font-mono font-bold text-sm tabular-nums tracking-wide",
            colorClass,
            pulseClass,
          )}
        >
          {state === "expired" ? "TIME UP" : formatTime(timeRemainingSeconds)}
        </span>
      </div>
    );
  }

  // Standalone — larger format for sub-header area
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        className,
      )}
      aria-label={`Time remaining: ${formatTime(timeRemainingSeconds)}`}
      aria-live="off"
    >
      <span className="font-mono text-[10px] text-[var(--color-text-inverse-muted)] uppercase tracking-widest mb-0.5">
        Time Left
      </span>
      <span
        className={cn(
          "font-mono font-extrabold text-xl tabular-nums tracking-wider",
          colorClass,
          pulseClass,
        )}
      >
        {state === "expired" ? "TIME UP" : formatTime(timeRemainingSeconds)}
      </span>
    </div>
  );
}
