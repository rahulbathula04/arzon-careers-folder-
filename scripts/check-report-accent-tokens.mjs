#!/usr/bin/env node
/**
 * check-report-accent-tokens — narrow CI guard for the Career Fit Report V3.
 *
 * Every file under `src/components/career/report/**` must consume tone
 * classes from `reportTones.ts`. Only `reportTones.ts` and `ReportCard.tsx`
 * (the token-source primitives) may reference raw track-palette shades
 * (teal/emerald/amber/rose/... 200/300/400 with common alpha suffixes).
 *
 * Current offenders are baselined; adding a NEW offender or increasing an
 * existing count fails the build. Refresh baseline after a migration with:
 *   node scripts/check-report-accent-tokens.mjs --update-baseline
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, sep } from "node:path";

const ROOT = "src/components/career/report";
const BASELINE = "scripts/check-report-accent-tokens.baseline.json";
const UPDATE = process.argv.includes("--update-baseline");

// Token-source files that ARE allowed to author tone strings.
const EXEMPT = new Set([
  join(ROOT, "reportTones.ts"),
  join(ROOT, "ReportCard.tsx"),
  join(ROOT, "ScoreChip.tsx"),
  join(ROOT, "LeftChapterRail.tsx"),
]);

// Match the same track-palette shade set the accent-usage gate watches, plus
// stroke- variants used inside ScoreChip-style SVG rings.
const SHADE_RE =
  /\b(?:text|bg|ring|border|from|via|to|stroke)-(?:sky|blue|indigo|violet|purple|amber|orange|emerald|teal|rose|pink)-\d{2,3}(?:\/\d{1,3})?\b/g;

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(n)) out.push(p);
  }
  return out;
}

const files = walk(ROOT).filter((f) => !EXEMPT.has(f));
const offenders = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const hits = src.match(SHADE_RE) || [];
  if (hits.length) offenders.push({ file: f.split(sep).join("/"), count: hits.length });
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
const newFiles = offenders.filter((o) => !(o.file in baseline) && o.count > 0);

if (worse.length === 0 && newFiles.length === 0) {
  console.log(
    `✅ Report tone-token gate passed. ${offenders.length} baselined file(s) in src/components/career/report/**.`,
  );
  process.exit(0);
}

console.error(
  `❌ Report tone-token gate FAILED. Files under src/components/career/report/** must import tones from reportTones.ts:`,
);
for (const o of newFiles) console.error(`  ${o.file}  (NEW · ${o.count} raw accent classes)`);
for (const o of worse.filter((o) => o.file in baseline))
  console.error(`  ${o.file}  (baseline ${baseline[o.file.replace(/\\/g, "/")]}, now ${o.count})`);
console.error(
  "\nFix: replace hardcoded palette classes with REPORT_TONES[tone].* from `@/components/career/report/reportTones`.",
);
console.error(
  "Or, if intentional (rare — a new token-source primitive), refresh: node scripts/check-report-accent-tokens.mjs --update-baseline",
);
process.exit(1);
