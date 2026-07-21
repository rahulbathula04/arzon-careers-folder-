/**
 * Design tokens map — single source of truth for brand colors used
 * across the page. Values are CSS variables defined in src/styles.css
 * so light/dark theme and global re-skins continue to work.
 *
 * Usage:
 *   import { tokens } from "@/lib/design-tokens";
 *   <div style={{ background: tokens.navy, color: tokens.textOnDark }} />
 *
 * For Tailwind classes, prefer the semantic utilities (text-foreground,
 * bg-primary, etc.) backed by the same CSS variables. Reach for this
 * map only when you need an inline style or a JS-driven color.
 *
 * Do NOT hardcode hex values in components — add the token here first.
 */

export const tokens = {
  // Brand
  gold: "var(--gold)",
  goldSoft: "var(--gold-soft)",
  teal: "var(--teal)",
  tealDeep: "var(--teal-deep)",
  tealInk: "var(--teal-ink)",
  tealSoft: "var(--teal-soft)",
  navy: "var(--navy)",
  navyElevated: "var(--navy-elevated)",

  // Surfaces
  paper: "var(--surface-1)",
  surfaceMuted: "var(--surface-2)",
  surfaceDeep: "var(--surface-3)",

  // Text — on light (paper) surfaces
  text: "var(--foreground)",
  textMuted: "var(--muted-foreground)",
  textAccent: "var(--teal-ink)",

  // Text — on dark (navy) surfaces. Mirrors the opacity ramp used
  // by the contrast audit (>=4.5:1 against #0E1730/#0A0F1E/#070B17).
  textOnDark: "#ffffff",
  textOnDarkStrong: "rgba(255,255,255,0.85)",
  textOnDarkMuted: "rgba(255,255,255,0.70)",
  textOnDarkSubtle: "rgba(255,255,255,0.60)", // floor for readable copy

  // Focus / ring
  ring: "var(--ring)",
} as const;

export type DesignToken = keyof typeof tokens;

/** Convenience groupings for iteration (legends, swatches, docs). */
export const tokenGroups = {
  brand: ["gold", "goldSoft", "teal", "tealDeep", "tealInk", "tealSoft", "navy", "navyElevated"],
  surface: ["paper", "surfaceMuted", "surfaceDeep"],
  textOnLight: ["text", "textMuted", "textAccent"],
  textOnDark: ["textOnDark", "textOnDarkStrong", "textOnDarkMuted", "textOnDarkSubtle"],
} as const satisfies Record<string, readonly DesignToken[]>;
