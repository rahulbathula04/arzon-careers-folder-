#!/usr/bin/env node
// Ratcheted heading hierarchy guardrail.
// Flags routes with >1 <h1>, skipped levels (h2 → h4), or no <h1>.
// Compared against scripts/.heading-baseline.json — fails on any new
// finding for a previously-clean file or any extra finding kind for an
// already-tracked file. Update: --update-baseline.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ROUTES = join(ROOT, "src/routes");
const BASELINE_PATH = join(ROOT, "scripts/.heading-baseline.json");
const UPDATE_BASELINE = process.argv.includes("--update-baseline");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (/\.tsx$/.test(name)) acc.push(p);
  }
  return acc;
}

const issues = [];
for (const file of walk(ROUTES)) {
  const text = readFileSync(file, "utf8");
  const levels = { h1: 0, h2: 0, h3: 0, h4: 0 };
  for (const lvl of Object.keys(levels)) {
    const re = new RegExp(`<${lvl}[\\s>]`, "g");
    levels[lvl] = (text.match(re) ?? []).length;
  }
  if (levels.h1 > 1) {
    issues.push({ file: relative(ROOT, file), kind: "multiple-h1", detail: `h1×${levels.h1}` });
  }
  // Skip detection: h2>0 and h4>0 but h3==0
  if (levels.h2 > 0 && levels.h4 > 0 && levels.h3 === 0) {
    issues.push({
      file: relative(ROOT, file),
      kind: "skipped-h3",
      detail: `h2×${levels.h2} h4×${levels.h4}`,
    });
  }
  if (levels.h1 === 0 && levels.h2 + levels.h3 + levels.h4 > 0) {
    // Acceptable for layout routes (no <h1>) but worth flagging for content routes.
    issues.push({ file: relative(ROOT, file), kind: "no-h1", detail: `h2×${levels.h2}` });
  }
}

console.log(`heading-hierarchy: ${issues.length} findings`);
const by = {};
for (const i of issues) by[i.kind] = (by[i.kind] ?? 0) + 1;
for (const [k, n] of Object.entries(by)) console.log(`  ${String(n).padStart(4)}  ${k}`);

// Ratchet by file → sorted kinds list.
const byFile = {};
for (const i of issues) {
  (byFile[i.file] ??= new Set()).add(i.kind);
}
const serialized = Object.fromEntries(
  Object.entries(byFile).map(([f, set]) => [f, [...set].sort()]),
);

if (UPDATE_BASELINE) {
  const sorted = {};
  for (const k of Object.keys(serialized).sort()) sorted[k] = serialized[k];
  writeFileSync(BASELINE_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`updated baseline: ${Object.keys(sorted).length} files`);
  process.exit(0);
}

let baseline = {};
if (existsSync(BASELINE_PATH)) baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
else console.warn("heading-hierarchy: no baseline — run --update-baseline to create one");

const regressions = [];
for (const [file, kinds] of Object.entries(serialized)) {
  const base = new Set(baseline[file] ?? []);
  for (const k of kinds) if (!base.has(k)) regressions.push({ file, kind: k });
}
if (regressions.length) {
  console.error("\n✗ heading-hierarchy regression:");
  for (const r of regressions) console.error(`    ${r.file}: ${r.kind}`);
  process.exit(1);
}
process.exit(0);
