import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "teal" | "premium" | "dark";
type Size = "sm" | "md";

const toneClass: Record<Tone, string> = {
  neutral: "bg-white text-[color:var(--ink)] border border-black/10",
  teal: "bg-[color:var(--teal-soft)] text-[color:var(--teal-deep)] border border-[color:var(--teal-deep)]/15",
  premium:
    "bg-[color:var(--accent-premium-soft)] text-[#5a4500] border border-[color:var(--accent-premium)]/30",
  dark: "bg-white/10 text-white border border-white/15",
};

const sizeClass: Record<Size, string> = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
};

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: Size;
}

/**
 * Pill — one unified chip for tags, badges, role labels, and status hints.
 * Replaces ad-hoc `inline-flex rounded-full px-… text-[11px] …` chips.
 */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(function Pill(
  { tone = "neutral", size = "sm", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none",
        toneClass[tone],
        sizeClass[size],
        className,
      )}
      {...rest}
    />
  );
});
