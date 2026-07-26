#!/usr/bin/env node
/**
 * "De-AI" copy-tell gate. Flags common AI-generated marketing tics in the
 * landing tree so new copy has to be human-toned.
 *
 * Baseline-grandfathered per file; new offenders fail the build. Add a
 * `// @allow-copy-tell` line comment to whitelist a specific line.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE_FILE = "scripts/check-copy-tells.baseline.json";
const UPDATE_BASELINE = process.argv.includes("--update-baseline");
const ALLOW_TAG = "@allow-copy-tell";

const ROOTS = ["src/components/landing", "src/components/courses", "src/components/industry"];

// Case-insensitive, word-boundary regexes.
const TELLS = [
  { name: "unlock", re: /\bunlock(?:s|ed|ing)?\b/i },
  { name: "unleash", re: /\bunleash(?:es|ed|ing)?\b/i },
  { name: "elevate", re: /\belevat(?:e|es|ed|ing)\b/i },
  { name: "empower", re: /\bempower(?:s|ed|ing|ment)?\b/i },
  { name: "seamlessly", re: /\bseamless(?:ly)?\b/i },
  { name: "cutting-edge", re: /\bcutting[- ]edge\b/i },
  { name: "world-class", re: /\bworld[- ]class\b/i },
  { name: "game-changing", re: /\bgame[- ]chang(?:er|ing)\b/i },
  { name: "revolutionary", re: /\brevolutionary\b/i },
  { name: "fast-paced", re: /\bfast[- ]paced\b/i },
  { name: "delve", re: /\bdelv(?:e|es|ed|ing)\b/i },
  { name: "in-the-realm", re: /\bin the realm of\b/i },
  { name: "at-the-heart", re: /\bat the heart of\b/i },
  { name: "act-now", re: /\bact now\b/i },
  { name: "dont-miss-out", re: /\bdon['’]t miss out\b/i },
  { name: "limited-time", re: /\blimited[- ]time\b/i },
];

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

const files = ROOTS.flatMap((r) => walk(r));
const offenders = [];
let totalHits = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const lines = src.split("\n");
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(ALLOW_TAG)) continue;
    for (const t of TELLS) {
      if (t.re.test(line)) hits.push({ line: i + 1, rule: t.name });
    }
  }
  if (hits.length) {
    offenders.push({ file: f, hits });
    totalHits += hits.length;
  }
}

let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
} catch {}

const newOrWorse = [];
for (const o of offenders) {
  const allowed = baseline[o.file.replace(/\\/g, "/")] ?? 0;
  if (o.hits.length > allowed) {
    newOrWorse.push({ file: o.file, allowed, found: o.hits.length, hits: o.hits });
  }
}

if (UPDATE_BASELINE) {
  const next = {};
  for (const o of offenders) next[o.file] = o.hits.length;
  writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `Wrote ${BASELINE_FILE} with ${Object.keys(next).length} files (${totalHits} tells).`,
  );
  process.exit(0);
}

if (newOrWorse.length === 0) {
  console.log(
    `✅ Copy-tell gate passed. ${files.length} files scanned, ${Object.keys(baseline).length} legacy files (${totalHits} grandfathered tells).`,
  );
  process.exit(0);
}

console.error(`❌ Copy-tell gate FAILED.`);
for (const o of newOrWorse.slice(0, 40)) {
  console.error(`  ${o.file}  (baseline ${o.allowed}, now ${o.found})`);
  for (const h of o.hits.slice(0, 5)) {
    console.error(`    L${String(h.line).padStart(4)} ${h.rule}`);
  }
}
console.error("\nRewrite in plain language, or add `// @allow-copy-tell` on the line.");
console.error("If you intentionally rewrote a legacy file, refresh baseline:");
console.error("  node scripts/check-copy-tells.mjs --update-baseline");
process.exit(1);
