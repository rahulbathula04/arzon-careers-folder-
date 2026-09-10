import { useState, useEffect } from "react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

interface WorkshopCountdownProps {
  targetIso: string; // e.g. "2026-09-11T18:00:00+05:30"
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const now = Date.now();
  const target = new Date(targetIso).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, expired: false };
}

function DigitBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[var(--color-medical-navy)] flex items-center justify-center shadow-inner border border-white/10"
        style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-stone-500">
        {label}
      </span>
    </div>
  );
}

export function WorkshopCountdown({ targetIso, className = "" }: WorkshopCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(targetIso));

  useEffect(() => {
    if (timeLeft.expired) return;
    // Respect prefers-reduced-motion: skip live ticking, show static value
    if (isReducedMotion()) return;

    const id = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetIso));
    }, 1000);

    return () => clearInterval(id);
  }, [targetIso, timeLeft.expired]);

  if (timeLeft.expired) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-clinical-teal)]" />
        </span>
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--color-clinical-teal)]">
          Session is starting now
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-500">
        Session starts in
      </span>
      <div className="flex items-end gap-2">
        <DigitBox value={timeLeft.days} label="Days" />
        <span className="font-mono text-2xl font-black text-stone-400 mb-4 leading-none">:</span>
        <DigitBox value={timeLeft.hours} label="Hours" />
        <span className="font-mono text-2xl font-black text-stone-400 mb-4 leading-none">:</span>
        <DigitBox value={timeLeft.minutes} label="Mins" />
        <span className="font-mono text-2xl font-black text-stone-400 mb-4 leading-none">:</span>
        <DigitBox value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}
