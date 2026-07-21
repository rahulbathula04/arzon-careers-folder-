#!/usr/bin/env node
/**
 * Enforce design-token-based colors in landing + admin components.
 *
 * Bans bare `text-white`, `text-white/N`, `bg-white/N`, and `border-white/N`
 * Tailwind utilities in:
 *   - src/components/landing/**
 *   - src/components/admin/**
 *   - src/routes/admin*.tsx
 *   - src/routes/internships.*.tsx
 *
 * These utilities are silently rewritten by the global tone-light safety net
 * in src/styles.css, which can collapse white text to navy ink on dark
 * surfaces (the original "invisible footer" regression).
 *
 * Allowed alternatives:
 *   - text-slate-50 / text-slate-100 / text-slate-200 / text-slate-300
 *   - explicit inline style={{ color: "#…" }}
 *   - utilities prefixed with a "@allow-raw-white" comment on the same line
 *
 * Run: node scripts/check-no-raw-white.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE_FILE = "scripts/check-no-raw-white.baseline.json";
const UPDATE_BASELINE = process.argv.includes("--update-baseline");

const ROOTS = ["src/components/landing", "src/components/admin"];
const ROUTE_PATTERNS = [{ dir: "src/routes", match: /^(admin\.|internships\.).+\.tsx$/ }];

const BANNED = [
  { name: "text-white", re: /\btext-white(?:\\?\/(?:\d{1,3}|\[[^\]]+\]))?\b/g },
  { name: "bg-white/N", re: /\bbg-white\\?\/(?:\d{1,3}|\[[^\]]+\])\b/g },
  { name: "border-white/N", re: /\bborder-white\\?\/(?:\d{1,3}|\[[^\]]+\])\b/g },
];

const ALLOW_TAG = "@allow-raw-white";

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

function gatherFiles() {
  const files = new Set();
  for (const r of ROOTS) for (const f of walk(r)) files.add(f);
  for (const { dir, match } of ROUTE_PATTERNS) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const name of entries) {
      if (!match.test(name)) continue;
      files.add(join(dir, name));
    }
  }
  return [...files];
}

function scan(file) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(ALLOW_TAG)) continue;
    for (const b of BANNED) {
      b.re.lastIndex = 0;
      const m = b.re.exec(line);
      if (m) hits.push({ line: i + 1, rule: b.name, match: m[0], text: line.trim().slice(0, 140) });
    }
  }
  return hits;
}

const files = gatherFiles();
let totalHits = 0;
const offenders = [];
for (const f of files) {
  const h = scan(f);
  if (h.length) {
    offenders.push({ file: f, hits: h });
    totalHits += h.length;
  }
}

// Ratchet: a known baseline of pre-existing offenders is allowed. New
// offenders (any file not in the baseline, or any file whose count exceeds
// its baseline value) fail the build.
let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
} catch {
  baseline = {};
}

const newOrWorse = [];
for (const o of offenders) {
  const allowed = baseline[o.file] ?? 0;
  if (o.hits.length > allowed) {
    newOrWorse.push({ file: o.file, allowed, found: o.hits.length, hits: o.hits });
  }
}

if (UPDATE_BASELINE) {
  const next = {};
  for (const o of offenders) next[o.file] = o.hits.length;
  writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `Wrote ${BASELINE_FILE} with ${Object.keys(next).length} files (${totalHits} utilities).`,
  );
  process.exit(0);
}

if (newOrWorse.length === 0) {
  const tracked = Object.keys(baseline).length;
  console.log(
    `✅ Raw-white token check passed. ${files.length} files scanned, ${tracked} legacy files in baseline (${totalHits} grandfathered utilities).`,
  );
  process.exit(0);
}

console.error(`❌ Raw-white token check FAILED.`);
console.error(
  `   ${newOrWorse.length} file(s) introduced new banned utilities beyond the baseline.\n`,
);
for (const o of newOrWorse.slice(0, 50)) {
  console.error(`  ${o.file}  (baseline ${o.allowed}, now ${o.found})`);
  for (const h of o.hits.slice(0, 5)) {
    console.error(`    L${h.line.toString().padStart(4)} ${h.rule.padEnd(16)} ${h.match}`);
  }
}
console.error("");
console.error("Fix options (per offending line):");
console.error(
  "  • swap for text-slate-50 / slate-100 / slate-200 / slate-300 (not rewritten by the global override)",
);
console.error('  • or use inline style={{ color: "#F8FAFC" }}');
console.error("  • or add a trailing // @allow-raw-white comment on the same line");
console.error("");
console.error(
  "If you intentionally fixed a legacy file and removed offenders, regenerate the baseline:",
);
console.error("  node scripts/check-no-raw-white.mjs --update-baseline");
process.exit(1);
