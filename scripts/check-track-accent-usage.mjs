#!/usr/bin/env node
/**
 * Track-accent centralisation gate.
 *
 * Every track-brand colour (emerald / violet / amber / rose / orange / teal
 * families, in the specific shades used by `data/trackTheme.ts`) must be
 * consumed through the theme map - never hardcoded into an unrelated
 * component. This prevents drift when the theme changes.
 *
 * The rule is intentionally narrow: only the SHADES that trackTheme uses
 * are policed here. Random `emerald-600` for a status pill is fine - that
 * scenario is covered by the general raw-palette gate.
 *
 * A JSON baseline grandfathers current offenders. Refresh with:
 *   node scripts/check-track-accent-usage.mjs --update-baseline
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE = "scripts/check-track-accent-usage.baseline.json";
const UPDATE = process.argv.includes("--update-baseline");

// Extract the exact classes referenced by TRACK_THEME so we only ban shades
// that would actually cause drift.
const themeSrc = readFileSync("src/data/trackTheme.ts", "utf8");
const themeRe =
  /\b(?:text|bg|ring|border|from|via|to)-(?:sky|blue|indigo|violet|purple|amber|orange|emerald|teal|rose|pink)-\d{2,3}(?:\/\d{1,3})?\b/g;
const themedClasses = new Set(themeSrc.match(themeRe) || []);

// Files exempt (the registry itself + kind-meta which is a similar registry).
const EXEMPT = new Set([
  "src/data/trackTheme.ts",
  "src/data/careerEngineKindMeta.ts",
  // Report tone-source primitives - see check-report-accent-tokens.mjs
  "src/components/career/report/reportTones.ts",
  "src/components/career/report/ReportCard.tsx",
  "src/components/career/report/ScoreChip.tsx",
]);

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(n) && !EXEMPT.has(p)) out.push(p);
  }
  return out;
}

const files = walk("src");
const offenders = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  let hits = 0;
  for (const cls of themedClasses) {
    const re = new RegExp(`\\b${cls.replace(/[/]/g, "\\/")}\\b`, "g");
    const m = src.match(re);
    if (m) hits += m.length;
  }
  if (hits) offenders.push({ file: f, count: hits });
}

let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
} catch {}

if (UPDATE) {
  const next = {};
  for (const o of offenders) next[o.file] = o.count;
  writeFileSync(BASELINE, JSON.stringify(next, null, 2) + "\n");
  console.log(`Wrote ${BASELINE} with ${offenders.length} files.`);
  process.exit(0);
}

const worse = offenders.filter((o) => o.count > (baseline[o.file.replace(/\\/g, "/")] ?? 0));
if (worse.length === 0) {
  console.log(
    `✅ Track-accent gate passed. ${themedClasses.size} themed classes; ${offenders.length} legacy files (${Object.values(baseline).reduce((a, b) => a + b, 0)} grandfathered occurrences).`,
  );
  process.exit(0);
}

console.error(
  `❌ Track-accent gate FAILED. Hardcoded track colours found outside data/trackTheme.ts:`,
);
for (const o of worse)
  console.error(
    `  ${o.file}  (baseline ${baseline[o.file.replace(/\\/g, "/")] ?? 0}, now ${o.count})`,
  );
console.error(
  "\nFix: import the accent from `@/data/trackTheme` (TRACK_THEME[slug].accentText etc.)",
);
console.error(
  "or, if adding a new legacy file intentionally, refresh: node scripts/check-track-accent-usage.mjs --update-baseline",
);
process.exit(1);
