#!/usr/bin/env node
// Ratcheted typography token guardrail.
// Compares per-file ad-hoc Tailwind sizing counts against
// scripts/.typography-baseline.json. Fails when any tracked file's count
// increases, when a file not in the baseline introduces offenders, or
// (warning) when a baseline entry has been cleared - update the baseline.
//
// Refresh baseline after a surface migration: `node scripts/check-typography-tokens.mjs --update-baseline`

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const WRITE_REPORT = process.argv.includes("--report");
const UPDATE_BASELINE = process.argv.includes("--update-baseline");
const BASELINE_PATH = join(ROOT, "scripts/.typography-baseline.json");

// Patterns that should migrate to text-display / text-h1.. / text-body* etc.
const PATTERNS = [
  { re: /\btext-\[(\d+(?:\.\d+)?)(px|rem)\]/g, label: "raw text-[Npx|rem]" },
  { re: /\bleading-\[(\d|\.)+\]/g, label: "raw leading-[…]" },
  { re: /\btext-(4xl|5xl|6xl|7xl|8xl|9xl)\b/g, label: "ad-hoc text-Nxl (use text-display/h1/h2)" },
];

// Directories/files excluded entirely from scanning.
const ALLOWLIST = new Set([
  "src/components/ui", // shadcn primitives - keep upstream defaults
  "src/routeTree.gen.ts",
]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      const rel = relative(ROOT, p);
      if ([...ALLOWLIST].some((a) => rel.startsWith(a))) continue;
      walk(p, acc);
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

const findings = [];
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  for (const { re, label } of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      // Approximate line number from char offset.
      const upto = text.slice(0, m.index);
      const line = upto.split("\n").length;
      findings.push({ file: relative(ROOT, file), line, match: m[0], label });
    }
  }
}

const by = new Map();
for (const f of findings) {
  const k = `${f.label}`;
  by.set(k, (by.get(k) ?? 0) + 1);
}

const total = findings.length;
console.log(`typography-tokens: ${total} ad-hoc usages`);
for (const [k, n] of [...by.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${k}`);
}

// Per-file count for ratchet comparison.
const currentByFile = {};
for (const f of findings) currentByFile[f.file] = (currentByFile[f.file] ?? 0) + 1;

if (UPDATE_BASELINE) {
  const sorted = {};
  for (const k of Object.keys(currentByFile).sort()) sorted[k] = currentByFile[k];
  writeFileSync(BASELINE_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`updated baseline: ${Object.keys(sorted).length} files, ${total} offenders`);
  process.exit(0);
}

let baseline = {};
if (existsSync(BASELINE_PATH)) {
  baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
} else {
  console.warn("typography-tokens: no baseline file - run with --update-baseline to create one");
}

const regressions = [];
const newFiles = [];
for (const [file, count] of Object.entries(currentByFile)) {
  const base = baseline[file];
  if (base === undefined) newFiles.push({ file, count });
  else if (count > base) regressions.push({ file, before: base, after: count });
}
const cleared = Object.keys(baseline).filter((f) => !(f in currentByFile));

if (cleared.length) {
  console.log(`\n✓ ${cleared.length} file(s) fully migrated - run --update-baseline:`);
  for (const f of cleared.slice(0, 10)) console.log(`    ${f}`);
}

if (regressions.length || newFiles.length) {
  console.error("\n✗ typography-tokens regression:");
  for (const r of regressions) console.error(`    ${r.file}: ${r.before} → ${r.after}`);
  for (const n of newFiles) console.error(`    ${n.file}: NEW (${n.count} offenders)`);
  console.error(
    "\nUse semantic utilities from src/styles.css (text-display/h1/h2/h3/h4/body/body-sm/caption/overline/meta/micro).",
  );
  if (!WRITE_REPORT) process.exit(1);
}

if (WRITE_REPORT) {
  // Per-file aggregation for the audit doc.
  const byFile = new Map();
  for (const f of findings) {
    const cur = byFile.get(f.file) ?? { total: 0, byLabel: {}, samples: [] };
    cur.total += 1;
    cur.byLabel[f.label] = (cur.byLabel[f.label] ?? 0) + 1;
    if (cur.samples.length < 3) cur.samples.push(`${f.line}: ${f.match}`);
    byFile.set(f.file, cur);
  }
  const ranked = [...byFile.entries()].sort((a, b) => b[1].total - a[1].total);
  const lines = [];
  lines.push("# Typography Audit Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Total ad-hoc usages: **${total}** across **${byFile.size}** files`);
  lines.push("");
  lines.push("## Summary by category");
  lines.push("");
  lines.push("| Category | Count |");
  lines.push("| --- | ---: |");
  for (const [k, n] of [...by.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${k} | ${n} |`);
  }
  lines.push("");
  lines.push("## Top 30 offenders by file");
  lines.push("");
  lines.push("| File | Total | Breakdown | Sample |");
  lines.push("| --- | ---: | --- | --- |");
  for (const [file, info] of ranked.slice(0, 30)) {
    const breakdown = Object.entries(info.byLabel)
      .map(([k, n]) => `${k} (${n})`)
      .join("; ");
    lines.push(`| \`${file}\` | ${info.total} | ${breakdown} | \`${info.samples[0] ?? ""}\` |`);
  }
  lines.push("");
  lines.push("## Recommended replacements");
  lines.push("");
  lines.push("| Ad-hoc pattern | Replacement utility (defined in src/styles.css) |");
  lines.push("| --- | --- |");
  lines.push("| `text-6xl md:text-7xl` / `text-[Npx]` ≥ 40px | `text-display` |");
  lines.push("| `text-4xl md:text-5xl` | `text-h1` |");
  lines.push("| `text-2xl md:text-3xl` | `text-h2` |");
  lines.push("| `text-xl md:text-2xl` | `text-h3` |");
  lines.push("| `text-lg` heading | `text-h4` |");
  lines.push("| `text-base` paragraph | `text-body` |");
  lines.push("| `text-sm` paragraph | `text-body-sm` |");
  lines.push("| `text-xs` label | `text-caption` |");
  lines.push("| `text-[11px] uppercase tracking-widest` | `text-overline` |");
  lines.push("| `leading-[1.1]` etc. on headings | none - `text-h*` ships line-height |");
  lines.push("");
  const out = join(ROOT, "docs/typography-audit-2026-06.md");
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  writeFileSync(out, lines.join("\n"));
  console.log(`wrote ${relative(ROOT, out)}`);
}
