#!/usr/bin/env node
/**
 * Bans inline dark-navy gradient literals in components. The canonical
 * gradients live in `src/styles.css` as `--gradient-navy-01` /
 * `--gradient-navy-02`; components should consume them via
 *   className="bg-[image:var(--gradient-navy-01)]"
 * so the palette is theme-controlled.
 *
 * Baseline-gated. Refresh: node scripts/check-navy-gradient-tokens.mjs --update-baseline
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE = "scripts/check-navy-gradient-tokens.baseline.json";
const UPDATE = process.argv.includes("--update-baseline");
// Banned literals: navy hex + slate-900 gradient stops paired with any
// via/to/from utility that indicates a gradient stop, plus arbitrary
// [#0e1730]/[#0f1b3d]/[#0a0f1e] used as backgrounds.
const RULES = [
  /\b(?:from|via|to)-slate-900(?:\/\d+)?\b/g,
  /\bbg-\[#0[eEfF]1[bB]3[dD]\]/g,
  /\bbg-\[#0[Aa]0[Ff]1[Ee]\]/g,
  /\b(?:from|via|to)-\[#0[eE]1730\]/g,
];
const EXEMPT = new Set(["src/styles.css"]);
function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?|css)$/.test(n) && !EXEMPT.has(p)) out.push(p);
  }
  return out;
}
const files = walk("src");
const offenders = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  let n = 0;
  for (const re of RULES) n += (src.match(re) || []).length;
  if (n) offenders.push({ file: f, count: n });
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
    `✅ Navy-gradient token gate passed. ${offenders.length} legacy files (${Object.values(baseline).reduce((a, b) => a + b, 0)} grandfathered).`,
  );
  process.exit(0);
}
console.error(`❌ Navy-gradient token gate FAILED. Use var(--gradient-navy-01|02) instead.`);
for (const o of worse)
  console.error(`  ${o.file}  (baseline ${baseline[o.file.replace(/\\/g, "/")] ?? 0}, now ${o.count})`);
process.exit(1);
