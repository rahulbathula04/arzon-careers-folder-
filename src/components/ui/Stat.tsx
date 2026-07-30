import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Optional small qualifier under the value (e.g. "since 2023"). */
  hint?: React.ReactNode;
  /** Tone of the surrounding surface (controls text contrast). */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/**
 * Stat - display the same way everywhere big numbers appear (hero proof,
 * credibility strip, course outcome card, industry pay bands).
 */
export function Stat({ value, label, hint, tone = "light", align = "left", className }: StatProps) {
  const valueColor = tone === "dark" ? "text-white" : "text-[color:var(--ink)]";
  const labelColor = tone === "dark" ? "text-white/75" : "text-[color:var(--ink-soft)]";
  const hintColor = tone === "dark" ? "text-white/55" : "text-[color:var(--ink-mute)]";
  const a = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={cn("flex flex-col gap-1", a, className)}>
      <span className={cn("font-display text-3xl leading-none sm:text-4xl", valueColor)}>
        {value}
      </span>
      <span className={cn("text-xs font-semibold uppercase tracking-[0.12em]", labelColor)}>
        {label}
      </span>
      {hint && <span className={cn("text-[11px]", hintColor)}>{hint}</span>}
    </div>
  );
}
