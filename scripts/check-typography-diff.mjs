#!/usr/bin/env node
// Diff-aware typography gate.
//
// Fails when a PR introduces ad-hoc typography utilities on NEW lines.
// Pre-existing offenders are left alone — use the codemod for those.
//
// Env / args:
//   BASE_REF (default: origin/main)  the merge-base to diff against
//   --json                            write docs/typography-diff.json
//   --comment                         write docs/typography-diff.md
//
// In CI, set BASE_REF to ${{ github.base_ref }} (the script will fetch).

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { scanText } from "./lib/typography-tokens.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const FLAGS = new Set(process.argv.slice(2));
const EMIT_JSON = FLAGS.has("--json");
const EMIT_MD = FLAGS.has("--comment");
const BASE_REF = process.env.BASE_REF || "origin/main";

function sh(cmd) {
  return execSync(cmd, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }).toString();
}

function safeSh(cmd) {
  try {
    return sh(cmd);
  } catch {
    return "";
  }
}

// Ensure the base ref exists locally. In GitHub Actions the default
// checkout is shallow, so we fetch the branch we are diffing against.
function ensureBase() {
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_BASE_REF) {
    safeSh(`git fetch --no-tags --depth=200 origin ${process.env.GITHUB_BASE_REF}`);
  }
  const exists = safeSh(`git rev-parse --verify ${BASE_REF}`).trim();
  return exists || "HEAD~1";
}

const base = ensureBase();
const mergeBase = safeSh(`git merge-base HEAD ${base}`).trim() || base;

const touched = sh(
  `git diff --name-only ${mergeBase}...HEAD -- 'src/*.ts' 'src/*.tsx' 'src/*.js' 'src/*.jsx' 'src/**/*.ts' 'src/**/*.tsx' 'src/**/*.js' 'src/**/*.jsx'`,
)
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

if (touched.length === 0) {
  console.log("typography-diff: no source files touched");
  process.exit(0);
}

// Parse `git diff --unified=0` to know which line numbers are NEW in HEAD.
function newLinesFor(file) {
  const diff = safeSh(`git diff --unified=0 ${mergeBase}...HEAD -- ${file}`);
  const ranges = [];
  for (const line of diff.split("\n")) {
    const m = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
    if (!m) continue;
    const start = parseInt(m[1], 10);
    const count = m[2] ? parseInt(m[2], 10) : 1;
    for (let i = 0; i < count; i++) ranges.push(start + i);
  }
  return new Set(ranges);
}

const newViolations = [];
const carriedViolations = [];

for (const file of touched) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) continue; // deleted in this PR
  const text = readFileSync(abs, "utf8");
  const rows = scanText(abs, text, { root: ROOT });
  if (rows.length === 0) continue;
  const newLines = newLinesFor(file);
  for (const r of rows) {
    if (newLines.has(r.line)) newViolations.push(r);
    else carriedViolations.push(r);
  }
}

console.log(
  `typography-diff: ${touched.length} touched file(s), ${newViolations.length} NEW violation(s), ${carriedViolations.length} pre-existing.`,
);

if (newViolations.length) {
  console.error("\n✗ New ad-hoc typography classes introduced in this PR:");
  for (const v of newViolations.slice(0, 50)) {
    console.error(`    ${v.file}:${v.line}  ${v.current}  →  ${v.suggested}`);
  }
  if (newViolations.length > 50) console.error(`    … ${newViolations.length - 50} more`);
  console.error(
    `\nFix: replace with one of text-display/h1/h2/h3/h4/body[-lg|-sm]/caption/overline/meta/micro,`,
  );
  console.error(
    `or run  node scripts/codemod-typography.mjs <file>  to auto-apply safe replacements.`,
  );
}

if (EMIT_JSON || EMIT_MD) mkdirSync(join(ROOT, "docs"), { recursive: true });

if (EMIT_JSON) {
  writeFileSync(
    join(ROOT, "docs/typography-diff.json"),
    JSON.stringify({ base: mergeBase, newViolations, carriedViolations }, null, 2),
  );
}

if (EMIT_MD) {
  const out = [];
  out.push(`### Typography diff against \`${BASE_REF}\``);
  out.push("");
  out.push(`- Touched files: **${touched.length}**`);
  out.push(`- New violations: **${newViolations.length}**`);
  out.push(`- Pre-existing (allowed): ${carriedViolations.length}`);
  if (newViolations.length) {
    out.push("");
    out.push("| File | Line | Current | Suggested |");
    out.push("| --- | ---: | --- | --- |");
    for (const v of newViolations.slice(0, 50)) {
      out.push(`| \`${v.file}\` | ${v.line} | \`${v.current}\` | \`${v.suggested}\` |`);
    }
    if (newViolations.length > 50) out.push(`| … ${newViolations.length - 50} more | | | |`);
  }
  writeFileSync(join(ROOT, "docs/typography-diff.md"), out.join("\n") + "\n");
}

process.exit(newViolations.length ? 1 : 0);
