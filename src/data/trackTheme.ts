// Locked design tokens per track. The curriculum page is the design source of
// truth; every page that surfaces a track must pull from this single map so
// colors, gradients, chips and rings stay identical sitewide.

export type TrackSlug =
  | "pharmacovigilance"
  | "medical-coding"
  | "clinical-data-management"
  | "sas-clinical"
  | "regulatory-affairs"
  | "medical-writing";

export type TrackTheme = {
  /** Tailwind gradient classes used on hero panels (`bg-gradient-to-br ${grad}`). */
  grad: string;
  /** Ring color around the hero panel and icon tile. */
  ring: string;
  /** Pill / chip background + foreground for eyebrow labels and stats. */
  chip: string;
  /** Solid accent used for thin top strips on cards, links, icons. */
  accent: string;
  /** Same accent expressed as a Tailwind text class for inline icons / links. */
  accentText: string;
  /** Display emoji shown in the icon tile. */
  emoji: string;
  /** Raw hex pair (start, end) for inline styles where Tailwind can't reach. */
  hex: { from: string; to: string };
  /**
   * Lightened accent hex (the Tailwind 300-shade equivalent) for small text
   * — percentage labels, inline captions — that must stay ≥4.5:1 on dark
   * navy card surfaces. Using the base 500-shade accent for 10–11px text
   * fails AA on rose / violet / cyan tracks.
   */
  accentInk: string;
};

export const TRACK_THEME: Record<TrackSlug, TrackTheme> = {
  pharmacovigilance: {
    grad: "from-sky-500/25 to-blue-500/10",
    ring: "ring-sky-400/30",
    chip: "bg-sky-500/15 text-sky-200",
    accent: "bg-sky-400",
    accentText: "text-sky-300",
    emoji: "🛡️",
    hex: { from: "#0EA5E9", to: "#2563EB" },
    accentInk: "#7DD3FC",
  },
  "medical-coding": {
    grad: "from-violet-500/25 to-indigo-500/10",
    ring: "ring-violet-400/30",
    chip: "bg-violet-500/15 text-violet-200",
    accent: "bg-violet-400",
    accentText: "text-violet-300",
    emoji: "🩺",
    hex: { from: "#8B5CF6", to: "#4F46E5" },
    accentInk: "#C4B5FD",
  },
  "clinical-data-management": {
    grad: "from-amber-500/25 to-orange-500/10",
    ring: "ring-amber-400/30",
    chip: "bg-amber-500/15 text-amber-200",
    accent: "bg-amber-400",
    accentText: "text-amber-300",
    emoji: "📊",
    hex: { from: "#F59E0B", to: "#EA580C" },
    accentInk: "#FCD34D",
  },
  "sas-clinical": {
    grad: "from-rose-500/25 to-pink-500/10",
    ring: "ring-rose-400/30",
    chip: "bg-rose-500/15 text-rose-200",
    accent: "bg-rose-400",
    accentText: "text-rose-300",
    emoji: "📈",
    hex: { from: "#F43F5E", to: "#EC4899" },
    accentInk: "#FDA4AF",
  },
  "regulatory-affairs": {
    grad: "from-fuchsia-500/25 to-purple-500/10",
    ring: "ring-fuchsia-400/30",
    chip: "bg-fuchsia-500/15 text-fuchsia-200",
    accent: "bg-fuchsia-400",
    accentText: "text-fuchsia-300",
    emoji: "📜",
    hex: { from: "#D946EF", to: "#9333EA" },
    accentInk: "#F0ABFC",
  },
  "medical-writing": {
    grad: "from-cyan-500/25 to-sky-500/10",
    ring: "ring-cyan-400/30",
    chip: "bg-cyan-500/15 text-cyan-200",
    accent: "bg-cyan-400",
    accentText: "text-cyan-300",
    emoji: "✍️",
    hex: { from: "#06B6D4", to: "#0EA5E9" },
    accentInk: "#67E8F9",
  },
};

/** Neutral fallback theme for non-track contexts (FAQ, generic panels). */
export const NEUTRAL_THEME: TrackTheme = {
  grad: "from-slate-500/20 to-slate-500/5",
  ring: "ring-white/15",
  chip: "bg-white/10 text-white/80",
  accent: "bg-white/40",
  accentText: "text-white/80",
  emoji: "✦",
  hex: { from: "#94A3B8", to: "#475569" },
  accentInk: "#CBD5E1",
};

export function getTrackTheme(slug: string | undefined | null): TrackTheme {
  if (!slug) return NEUTRAL_THEME;
  return (TRACK_THEME as Record<string, TrackTheme>)[slug] ?? NEUTRAL_THEME;
}
