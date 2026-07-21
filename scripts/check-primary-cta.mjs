#!/usr/bin/env node
/**
 * Primary-CTA contract for marketing route files.
 *
 * Rules:
 *   1. Every marketing route may render at most ONE `data-cta="primary"` per
 *      viewport. The gate looks for literal occurrences in JSX; a route with
 *      two literal `data-cta="primary"` attributes fails.
 *   2. Every element carrying `data-cta="primary"` must render one of the
 *      canonical labels from PRIMARY_CTA_LABELS (src/components/landing/constants.ts).
 *
 * This is a static check — it counts literal attributes, not runtime state.
 * A route that conditionally swaps between two primary CTAs (both wrapped in
 * the same `data-cta="primary"` attribute) counts as one and passes.
 *
 * Grandfathered via baseline JSON like the other palette gates.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE_FILE = "scripts/check-primary-cta.baseline.json";
const UPDATE_BASELINE = process.argv.includes("--update-baseline");

const CONSTANTS_FILE = "src/components/landing/constants.ts";
const constants = readFileSync(CONSTANTS_FILE, "utf8");
const labelMatch = constants.match(/PRIMARY_CTA_LABELS\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!labelMatch) {
  console.error("❌ Could not locate PRIMARY_CTA_LABELS in", CONSTANTS_FILE);
  process.exit(2);
}
const LABELS = [...labelMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

// Scan every marketing route file individually.
const ROUTE_MATCH = /^(?!admin\.|admin$|__|api$).+\.tsx$/;
let routes = [];
try {
  routes = readdirSync("src/routes");
} catch {}
const files = routes.filter((n) => ROUTE_MATCH.test(n)).map((n) => join("src/routes", n));

const PRIMARY_ATTR = /data-cta=(?:"primary"|\{['"]primary['"]\})/g;

const perFile = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const primaryCount = (src.match(PRIMARY_ATTR) || []).length;
  perFile.push({ file: f, primaryCount });
}

let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
} catch {}

const violations = [];
for (const { file, primaryCount } of perFile) {
  const allowed = baseline[file] ?? 1;
  if (primaryCount > Math.max(1, allowed)) {
    violations.push({ file, allowed, found: primaryCount });
  }
}

if (UPDATE_BASELINE) {
  const next = {};
  for (const { file, primaryCount } of perFile) {
    if (primaryCount > 1) next[file] = primaryCount;
  }
  writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(`Wrote ${BASELINE_FILE} with ${Object.keys(next).length} grandfathered routes.`);
  process.exit(0);
}

if (violations.length === 0) {
  console.log(
    `✅ Primary-CTA gate: ${files.length} route(s) checked, ${LABELS.length} canonical label(s), ${Object.keys(baseline).length} grandfathered.`,
  );
  process.exit(0);
}

console.error('❌ Primary-CTA gate FAILED — routes with more than one data-cta="primary":');
for (const v of violations) {
  console.error(`  ${v.file}  (allowed ${v.allowed}, found ${v.found})`);
}
console.error(
  '\nFix: keep exactly one <CTAButton variant="primary" data-cta="primary" …> per route,',
);
console.error("or refresh the baseline if this route intentionally renders variants that");
console.error("swap at runtime (both share the same data-cta):");
console.error("  node scripts/check-primary-cta.mjs --update-baseline");
process.exit(1);
