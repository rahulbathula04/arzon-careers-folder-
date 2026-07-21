/**
 * reportTones — single source of truth for accent classes used across the
 * Career Fit Report V3. Every chapter and every sub-atom (ScoreChip,
 * ReportCard, EvidencePill, chapter cards) must consume tone strings from
 * this file. Prevents drift when the tone palette changes and keeps the
 * report visually consistent even as chapters are edited independently.
 *
 * Do NOT hardcode `text-blue-300`, `bg-sky-400/10`, etc. in any file
 * under `src/components/career/report/**` other than this one and
 * `ReportCard.tsx`. The `check-report-accent-tokens.mjs` CI guard enforces
 * this on new/edited files.
 */

export type ReportTone =
  | "primary" // blue — the "recommended" verdict
  | "secondary" // sky — "strong" alternative
  | "warn" // amber — watch-outs, why-not-that
  | "ruled-out" // rose — not a fit
  | "neutral";

export interface ToneClassSet {
  /** Foreground accent text (headline highlight, inline icons). */
  accentText: string;
  /** Solid dot / stripe colour. */
  accentBg: string;
  /** Ring / border for chips at 25–35% alpha. */
  chipBorder: string;
  /** Chip background at low alpha. */
  chipBg: string;
  /** Chip foreground text (2xx shade). */
  chipText: string;
  /** Icon fill for status cues (CheckCircle2, XCircle, etc.). */
  iconFill: string;
  /** Stripe class used on the ReportCard left accent. */
  stripe: string;
  /** Eyebrow tint (small caps). */
  eyebrow: string;
  /** SVG ring stroke class for ScoreChip. */
  ringStroke: string;
  /** Ultra-light surface tint used for callout cards. */
  softBg: string;
  /** Soft border matching {@link softBg}. */
  softBorder: string;
  /** Muted eyebrow tint for soft cards (2xx / 80). */
  softEyebrow: string;
  /** Brighter icon shade (3xx). */
  iconAccent: string;
  /** Progress-bar fill class. */
  bar: string;
  /** Status-pill composite (border + bg + text). */
  statePill: string;
  /** Pill chip bg for compact score/count chips. */
  chipPillBg: string;
  /** Pill chip text matching {@link chipPillBg}. */
  chipPillText: string;
  /** Solid dot (timeline markers, sparkline anchors). */
  dot: string;
  /** Ring around dot markers. */
  dotRing: string;
  /** Solid CTA background. */
  solidCtaBg: string;
  /** Focus-visible border for form inputs. */
  focusBorder: string;
  /** Selected-tab surface tint. */
  activeTabBg: string;
  /** Selected-tab ring accent. */
  activeTabRing: string;
  /** Hover accent (used on inline links). */
  hoverAccent: string;
}

export const REPORT_TONES: Record<ReportTone, ToneClassSet> = {
  primary: {
    accentText: "text-blue-100",
    accentBg: "bg-blue-300",
    chipBorder: "border-blue-300/45",
    chipBg: "bg-blue-400/20",
    chipText: "text-blue-50",
    iconFill: "text-blue-100",
    stripe: "bg-blue-300/70",
    eyebrow: "text-blue-100",
    ringStroke: "stroke-blue-300",
    softBg: "bg-blue-300/[0.05]",
    softBorder: "border-blue-300/25",
    softEyebrow: "text-blue-200/80",
    iconAccent: "text-blue-300",
    bar: "bg-blue-300/80",
    statePill: "border-blue-300/40 bg-blue-300/10 text-blue-200",
    chipPillBg: "bg-blue-300/15",
    chipPillText: "text-blue-200",
    dot: "bg-blue-300",
    dotRing: "ring-blue-300/20",
    solidCtaBg: "bg-blue-300",
    focusBorder: "focus:border-blue-300/50",
    activeTabBg: "bg-blue-300/[0.10]",
    activeTabRing: "ring-blue-300/40",
    hoverAccent: "hover:text-blue-100",
  },
  secondary: {
    accentText: "text-sky-100",
    accentBg: "bg-sky-400",
    chipBorder: "border-sky-300/45",
    chipBg: "bg-sky-400/20",
    chipText: "text-sky-50",
    iconFill: "text-sky-300",
    stripe: "bg-sky-400/60",
    eyebrow: "text-sky-100",
    ringStroke: "stroke-sky-400",
    softBg: "bg-sky-400/[0.05]",
    softBorder: "border-sky-400/25",
    softEyebrow: "text-sky-200/80",
    iconAccent: "text-sky-300",
    bar: "bg-sky-400/80",
    statePill: "border-sky-300/40 bg-sky-300/10 text-sky-200",
    chipPillBg: "bg-sky-400/15",
    chipPillText: "text-sky-200",
    dot: "bg-sky-400",
    dotRing: "ring-sky-400/20",
    solidCtaBg: "bg-sky-400/90",
    focusBorder: "focus:border-sky-400/50",
    activeTabBg: "bg-sky-400/[0.10]",
    activeTabRing: "ring-sky-400/40",
    hoverAccent: "hover:text-sky-100",
  },
  warn: {
    accentText: "text-amber-100",
    accentBg: "bg-amber-300",
    chipBorder: "border-amber-300/45",
    chipBg: "bg-amber-300/20",
    chipText: "text-amber-50",
    iconFill: "text-amber-200",
    stripe: "bg-amber-300/70",
    eyebrow: "text-amber-100",
    ringStroke: "stroke-amber-300",
    softBg: "bg-amber-300/[0.05]",
    softBorder: "border-amber-300/25",
    softEyebrow: "text-amber-200/80",
    iconAccent: "text-amber-300",
    bar: "bg-amber-300/80",
    statePill: "border-amber-300/40 bg-amber-300/10 text-amber-200",
    chipPillBg: "bg-amber-300/15",
    chipPillText: "text-amber-200",
    dot: "bg-amber-300",
    dotRing: "ring-amber-300/20",
    solidCtaBg: "bg-amber-300",
    focusBorder: "focus:border-amber-300/50",
    activeTabBg: "bg-amber-300/[0.10]",
    activeTabRing: "ring-amber-300/40",
    hoverAccent: "hover:text-amber-100",
  },
  "ruled-out": {
    accentText: "text-rose-100",
    accentBg: "bg-rose-400",
    chipBorder: "border-rose-400/45",
    chipBg: "bg-rose-400/20",
    chipText: "text-rose-50",
    iconFill: "text-rose-300",
    stripe: "bg-rose-400/70",
    eyebrow: "text-rose-100",
    ringStroke: "stroke-rose-400",
    softBg: "bg-rose-400/[0.05]",
    softBorder: "border-rose-400/25",
    softEyebrow: "text-rose-200/80",
    iconAccent: "text-rose-300",
    bar: "bg-rose-400/80",
    statePill: "border-rose-300/40 bg-rose-300/10 text-rose-200",
    chipPillBg: "bg-rose-400/15",
    chipPillText: "text-rose-200",
    dot: "bg-rose-400",
    dotRing: "ring-rose-400/20",
    solidCtaBg: "bg-rose-400",
    focusBorder: "focus:border-rose-400/50",
    activeTabBg: "bg-rose-400/[0.10]",
    activeTabRing: "ring-rose-400/40",
    hoverAccent: "hover:text-rose-100",
  },
  neutral: {
    accentText: "text-white",
    accentBg: "bg-white/50",
    chipBorder: "border-white/25",
    chipBg: "bg-white/15",
    chipText: "text-white/95",
    iconFill: "text-white/85",
    stripe: "bg-white/30",
    eyebrow: "text-white/70",
    ringStroke: "stroke-white/70",
    softBg: "bg-white/[0.03]",
    softBorder: "border-white/15",
    softEyebrow: "text-white/60",
    iconAccent: "text-white/80",
    bar: "bg-white/40",
    statePill: "border-white/20 bg-white/10 text-white/80",
    chipPillBg: "bg-white/10",
    chipPillText: "text-white/85",
    dot: "bg-white/60",
    dotRing: "ring-white/15",
    solidCtaBg: "bg-white/80",
    focusBorder: "focus:border-white/40",
    activeTabBg: "bg-white/[0.06]",
    activeTabRing: "ring-white/25",
    hoverAccent: "hover:text-white",
  },
};

/**
 * Shared multi-stop palette strings used across report chrome.
 * Live here so the accent-token gate stays green — never inline
 * `from-blue-…`/`to-sky-…` in a consumer file.
 */
export const REPORT_PRIMARY_CTA_GRADIENT =
  "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500";
export const REPORT_RESUME_BANNER_GRADIENT =
  "bg-gradient-to-r from-blue-500/10 via-sky-500/8 to-transparent";
export const REPORT_RAIL_PROGRESS_GRADIENT =
  "bg-gradient-to-r from-blue-300/80 via-blue-300 to-sky-300";

/**
 * Sticky rail pill classes — encoded once (data-attribute variants require
 * literal class strings so Tailwind's JIT can pick them up).
 */
export const REPORT_STICKY_RAIL_PILL =
  "data-[active=true]:border-blue-300/50 data-[active=true]:bg-blue-300/10 data-[done=true]:border-blue-300/30 data-[done=true]:text-blue-100";
export const REPORT_STICKY_RAIL_DOT =
  "data-[active=true]:bg-blue-300 data-[active=true]:text-slate-900 data-[done=true]:bg-blue-300 data-[done=true]:text-slate-900 data-[done=true]:border-transparent";

/** Confidence-band → tone mapping (matches ScoreChip.bandForScore ranges). */
export function toneForBand(
  band: "recommended" | "strong" | "watch" | "notfit" | "neutral",
): ReportTone {
  switch (band) {
    case "strong":
      return "secondary";
    case "recommended":
      return "primary";
    case "watch":
      return "warn";
    case "notfit":
      return "ruled-out";
    default:
      return "neutral";
  }
}
