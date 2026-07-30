import type { ReactNode } from "react";
import { useTone, type Tone } from "@/lib/tone/ToneContext";

/**
 * IconTile - the single icon-chip primitive used across landing, admin and
 * result surfaces. Replaces ad-hoc wrappers like
 * `bg-primary/15 text-primary-glow ring-1 ring-primary/30` which ghost out
 * on lighter surfaces.
 *
 * Reads ambient `ToneContext` so callers rarely need to pass `tone` directly.
 * Intent + tone map to AA-safe semantic class pairs; never raw hex.
 */

type Size = "sm" | "md" | "lg" | "xl";
type Intent = "accent" | "gold" | "neutral";

const SIZE_MAP: Record<Size, { box: string; icon: string }> = {
  sm: { box: "h-8 w-8 rounded-lg", icon: "[&>svg]:h-4 [&>svg]:w-4" },
  md: { box: "h-10 w-10 rounded-xl", icon: "[&>svg]:h-5 [&>svg]:w-5" },
  lg: { box: "h-12 w-12 rounded-xl", icon: "[&>svg]:h-6 [&>svg]:w-6" },
  xl: { box: "h-14 w-14 rounded-2xl", icon: "[&>svg]:h-7 [&>svg]:w-7" },
};

function variantFor(tone: Tone, intent: Intent): string {
  if (tone === "dark") {
    switch (intent) {
      case "accent":
        return "bg-accent-glow/15 text-eyebrow-strong ring-1 ring-accent-glow/30";
      case "gold":
        return "bg-amber-300/15 text-amber-200 ring-1 ring-amber-300/30";
      case "neutral":
      default:
        return "bg-white/[0.06] text-white/85 ring-1 ring-white/15";
    }
  }
  // light / muted
  switch (intent) {
    case "accent":
      return "bg-sky-100 text-primary ring-1 ring-sky-200";
    case "gold":
      return "bg-gold-soft text-warning ring-1 ring-amber-200";
    case "neutral":
    default:
      return "bg-muted text-ink ring-1 ring-border";
  }
}

export interface IconTileProps {
  children: ReactNode;
  /** Override ambient ToneContext when needed. */
  tone?: Tone;
  intent?: Intent;
  size?: Size;
  className?: string;
  "aria-hidden"?: boolean;
}

export function IconTile({
  children,
  tone,
  intent = "accent",
  size = "md",
  className = "",
  "aria-hidden": ariaHidden = true,
}: IconTileProps) {
  const ambient = useTone();
  const actual = tone ?? ambient;
  const variant = variantFor(actual, intent);
  const { box, icon } = SIZE_MAP[size];
  return (
    <span
      aria-hidden={ariaHidden}
      className={`inline-flex items-center justify-center shrink-0 ${box} ${icon} ${variant} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

/**
 * IconChipDot - inline pin/dot variant for chips and list bullets
 * (cohort cities, lightweight tags). Smaller, no ring.
 */
export function IconChipDot({
  children,
  tone,
  intent = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  intent?: Intent;
  className?: string;
}) {
  const ambient = useTone();
  const actual = tone ?? ambient;
  const color =
    intent === "gold"
      ? actual === "dark"
        ? "text-amber-300"
        : "text-warning"
      : intent === "neutral"
        ? actual === "dark"
          ? "text-white/70"
          : "text-muted-foreground"
        : actual === "dark"
          ? "text-eyebrow"
          : "text-primary";
  return (
    <span
      aria-hidden
      className={`inline-flex h-3.5 w-3.5 items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5 ${color} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
