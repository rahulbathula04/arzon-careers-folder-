import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "tint" | "dark" | "flat" | "data";
type Padding = "none" | "sm" | "md" | "lg";

const toneClass: Record<Tone, string> = {
  paper: "bg-white text-[color:var(--ink)] border border-black/[0.06] shadow-[var(--shadow-card)]",
  tint: "bg-[color:var(--teal-soft)] text-[color:var(--ink)] border border-black/[0.05]",
  dark: "bg-[#0E1730] text-white border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
  flat: "bg-white text-[color:var(--ink)] border border-black/[0.08]",
  data: "bg-white/[0.025] text-white border border-white/[0.08] backdrop-blur-sm",
};

const padClass: Record<Padding, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  padding?: Padding;
  /** Adds hover lift; only meaningful for clickable cards. */
  interactive?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * SurfaceCard - single source of truth for card chrome across the site.
 * Use instead of hand-rolled `rounded-2xl border bg-white shadow-…` divs.
 * Three tones (paper / tint / dark) cover every section we render today.
 */
export const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(function SurfaceCard(
  { tone = "paper", padding = "md", interactive, as: As = "div", className, ...rest },
  ref,
) {
  const Comp = As as any;
  return (
    <Comp
      ref={ref}
      className={cn(
        "rounded-2xl",
        toneClass[tone],
        padClass[padding],
        interactive &&
          "transition-transform duration-[var(--dur-base)] [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2",
        className,
      )}
      {...rest}
    />
  );
});
