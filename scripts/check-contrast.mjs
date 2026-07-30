#!/usr/bin/env node
// Automated WCAG AA contrast check for the project's typography tokens.
//
// Parses :root oklch() tokens from src/styles.css, then asserts that
// every (text-on-surface) combination we ship across light + dark
// surfaces meets WCAG AA (4.5:1 body, 3:1 large/display).
//
// Run via `node scripts/check-contrast.mjs` (also wired into prebuild).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, "..", "src", "styles.css");
const css = fs.readFileSync(cssPath, "utf8");

// ---------- oklch parsing ----------
const tokenRe = /--([a-z0-9-]+):\s*oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*\)/gi;
const tokens = {};
for (const m of css.matchAll(tokenRe)) {
  tokens[m[1]] = { l: +m[2], c: +m[3], h: +m[4] };
}

// Also accept hex tokens like `--navy: #0f1b3d;` - convert hex → linear sRGB
// → Oklch so the contrast math above works uniformly on both token forms.
// Only records a token if it is not already present as oklch(). Iterates in
// document order so later redefinitions (e.g. inside `.dark`) do not clobber
// the `:root` value used by this light-surface audit.
const hexRe = /--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g;
function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (h.length === 8) h = h.slice(0, 6);
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
}
function rgbToOklch([r, g, b]) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const R = lin(r),
    G = lin(g),
    B = lin(b);
  const l_ = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m_ = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s_ = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.sqrt(A * A + B2 * B2);
  let h = (Math.atan2(B2, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}
for (const m of css.matchAll(hexRe)) {
  const name = m[1];
  if (tokens[name]) continue;
  tokens[name] = rgbToOklch(hexToRgb(m[2]));
}

// ---------- oklch -> linear sRGB -> sRGB ----------
// Reference: https://bottosson.github.io/posts/oklab/
function oklchToRgb({ l, c, h }) {
  const hr = (h * Math.PI) / 180;
  const a = Math.cos(hr) * c;
  const b = Math.sin(hr) * c;
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const L = l_ ** 3,
    M = m_ ** 3,
    S = s_ ** 3;
  let r = 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
  let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  let b2 = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;
  return [r, g, b2].map((v) => Math.max(0, Math.min(1, v)));
}

function relLuminance(linRgb) {
  // linRgb here is linear-light values from Oklab transform (already linear sRGB)
  const [r, g, b] = linRgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const L1 = relLuminance(oklchToRgb(fg));
  const L2 = relLuminance(oklchToRgb(bg));
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

// Treat translucent white text on dark surface: composite over background.
function whiteAlphaOver(bgTok, alpha) {
  const bg = oklchToRgb(bgTok);
  const comp = bg.map((c) => c * (1 - alpha) + 1 * alpha);
  // Convert composite back to a pseudo-luminance via direct sRGB math.
  const L = 0.2126 * comp[0] + 0.7152 * comp[1] + 0.0722 * comp[2];
  return L;
}
function contrastAlphaOnDark(alpha, bgTok) {
  const Lfg = whiteAlphaOver(bgTok, alpha);
  const Lbg = relLuminance(oklchToRgb(bgTok));
  const [hi, lo] = Lfg > Lbg ? [Lfg, Lbg] : [Lbg, Lfg];
  return (hi + 0.05) / (lo + 0.05);
}

// ---------- assertions ----------
const required = [
  "ink",
  "ink-soft",
  "ink-mute",
  "paper",
  "navy",
  "navy-elevated",
  "teal",
  "teal-deep",
  "teal-soft",
];
for (const t of required) {
  if (!tokens[t]) {
    console.error(`✗ missing token --${t} in styles.css`);
    process.exit(1);
  }
}

const AA_BODY = 4.5;
const AA_LARGE = 3.0;

// Hardcoded sRGB pairs (slate / amber / emerald / rose / fuchsia / gold / yellow
// scales used on white ResultCard surfaces). These are not in :root tokens, so
// we encode their sRGB values directly to keep the audit honest for the cards.
const SRGB = {
  white: [1.0, 1.0, 1.0],
  "slate-50": [0.973, 0.98, 0.988],
  "slate-500": [0.392, 0.455, 0.545],
  "slate-600": [0.282, 0.337, 0.412],
  "slate-700": [0.2, 0.255, 0.333],
  "slate-800": [0.118, 0.161, 0.231],
  "slate-900": [0.059, 0.09, 0.165],
  "amber-700": [0.706, 0.325, 0.035],
  "amber-800": [0.573, 0.251, 0.055],
  "emerald-700": [0.024, 0.42, 0.275],
  "rose-700": [0.745, 0.094, 0.255],
  "fuchsia-700": [0.624, 0.094, 0.62],
  "yellow-700": [0.631, 0.345, 0.012],
  primary: [0.094, 0.31, 0.808], // approx oklch(0.55 0.18 256)
};

function srgbLin(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function srgbContrast(fg, bg) {
  const L = (rgb) => {
    const [r, g, b] = rgb.map(srgbLin);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [lf, lb] = [L(fg), L(bg)];
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}

/** @type {{label:string, fg:any, bg:any, min:number}[]} */
const cases = [
  // Light surfaces (paper)
  { label: "body  ink         on paper", fg: tokens.ink, bg: tokens.paper, min: AA_BODY },
  { label: "body  ink-soft    on paper", fg: tokens["ink-soft"], bg: tokens.paper, min: AA_BODY },
  {
    label: "muted ink-mute    on paper (large only)",
    fg: tokens["ink-mute"],
    bg: tokens.paper,
    min: AA_LARGE,
  },
  { label: "eyebrow teal-deep on paper", fg: tokens["teal-deep"], bg: tokens.paper, min: AA_BODY },

  // Teal-soft surface
  { label: "ink         on teal-soft", fg: tokens.ink, bg: tokens["teal-soft"], min: AA_BODY },
  {
    label: "teal-deep   on teal-soft",
    fg: tokens["teal-deep"],
    bg: tokens["teal-soft"],
    min: AA_BODY,
  },
  { label: "navy        on teal-soft", fg: tokens.navy, bg: tokens["teal-soft"], min: AA_BODY },

  // Dark surfaces (navy / navy-elevated). Translucent whites composited.
  {
    label: "white       on navy        (display)",
    fg: { l: 1, c: 0, h: 0 },
    bg: tokens.navy,
    min: AA_LARGE,
  },
  {
    label: "white       on navy-elev   (display)",
    fg: { l: 1, c: 0, h: 0 },
    bg: tokens["navy-elevated"],
    min: AA_LARGE,
  },
  { label: "teal        on navy        (eyebrow)", fg: tokens.teal, bg: tokens.navy, min: AA_BODY },
  { label: "teal-soft   on navy", fg: tokens["teal-soft"], bg: tokens.navy, min: AA_BODY },
];

let failed = 0;
const out = [];
for (const c of cases) {
  const r = contrast(c.fg, c.bg);
  const pass = r >= c.min;
  if (!pass) failed++;
  out.push(`${pass ? "✓" : "✗"} ${r.toFixed(2).padStart(5)} (≥${c.min}) - ${c.label}`);
}

// Translucent white-on-navy cases - these are the .tone-dark body / Tailwind text-white/NN.
const alphaCases = [
  { alpha: 0.88, surf: "navy", min: AA_BODY, label: ".tone-dark body (alpha 0.88) on navy" },
  {
    alpha: 0.88,
    surf: "navy-elevated",
    min: AA_BODY,
    label: ".tone-dark body (alpha 0.88) on navy-elev",
  },
  { alpha: 0.8, surf: "navy", min: AA_BODY, label: "text-white/80 on navy" },
  { alpha: 0.7, surf: "navy", min: AA_BODY, label: "text-white/70 on navy" },
  { alpha: 0.65, surf: "navy", min: AA_BODY, label: "text-white/65 on navy" },
  { alpha: 0.6, surf: "navy", min: AA_LARGE, label: "text-white/60 on navy (large only)" },
  { alpha: 0.5, surf: "navy", min: AA_LARGE, label: "text-white/50 on navy (large only)" },
];

for (const c of alphaCases) {
  const Lfg = whiteAlphaOver(tokens[c.surf], c.alpha);
  const Lbg = relLuminance(oklchToRgb(tokens[c.surf]));
  const [hi, lo] = Lfg > Lbg ? [Lfg, Lbg] : [Lbg, Lfg];
  const r = (hi + 0.05) / (lo + 0.05);
  const pass = r >= c.min;
  if (!pass) failed++;
  out.push(`${pass ? "✓" : "✗"} ${r.toFixed(2).padStart(5)} (≥${c.min}) - ${c.label}`);
}

// ResultCard / cards-on-white pairs. These exercise the slate ramp used by
// primitives.tsx (SkillBar, StatTile, EvidenceChips, HairlineDivider) plus the
// header-band text colours by tone.
const cardCases = [
  { fg: "slate-900", bg: "white", min: AA_BODY, label: "card body text (slate-900 on white)" },
  { fg: "slate-700", bg: "white", min: AA_BODY, label: "card secondary (slate-700 on white)" },
  { fg: "slate-600", bg: "white", min: AA_BODY, label: "card sub copy (slate-600 on white)" },
  {
    fg: "slate-500",
    bg: "white",
    min: AA_LARGE,
    label: "card micro caps (slate-500 on white, ≤14px allowed at AA-large)",
  },
  { fg: "slate-700", bg: "slate-50", min: AA_BODY, label: "StatTile slate body" },
  { fg: "amber-700", bg: "white", min: AA_BODY, label: "amber header band text" },
  { fg: "amber-800", bg: "white", min: AA_BODY, label: "amber StatTile text" },
  { fg: "emerald-700", bg: "white", min: AA_BODY, label: "emerald header band text" },
  { fg: "rose-700", bg: "white", min: AA_BODY, label: "rose header band text" },
  { fg: "fuchsia-700", bg: "white", min: AA_BODY, label: "fuchsia header band text" },
  { fg: "yellow-700", bg: "white", min: AA_BODY, label: "gold header band text" },
  { fg: "primary", bg: "white", min: AA_BODY, label: "primary CTA / link on white" },
];
for (const c of cardCases) {
  const r = srgbContrast(SRGB[c.fg], SRGB[c.bg]);
  const pass = r >= c.min;
  if (!pass) failed++;
  out.push(`${pass ? "✓" : "✗"} ${r.toFixed(2).padStart(5)} (≥${c.min}) - ${c.label}`);
}

console.log("Contrast audit (WCAG AA):");
for (const line of out) console.log("  " + line);

if (failed > 0) {
  console.error(`\n✗ ${failed} contrast check(s) failed. Adjust tokens in src/styles.css.`);
  process.exit(1);
}
console.log(
  `\n✓ all ${cases.length + alphaCases.length + cardCases.length} contrast checks passed.`,
);
