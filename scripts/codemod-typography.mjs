#!/usr/bin/env node
// Codemod: rewrite ad-hoc Tailwind type sizes to semantic utilities.
//
// Usage:
//   node scripts/codemod-typography.mjs <file> [<file> ...]   explicit targets
//   node scripts/codemod-typography.mjs --all                 every offender file
//   node scripts/codemod-typography.mjs --all --dry-run       preview only
//   node scripts/codemod-typography.mjs --all --write-report  emit codemod report
//
// `--all` also refreshes scripts/.typography-baseline.json after the rewrite.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, relative } from "node:path";
import { PX_MAP, NAMED_MAP, suggestForSize, scanProject } from "./lib/typography-tokens.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const argv = process.argv.slice(2);
const FLAGS = new Set(argv.filter((a) => a.startsWith("--")));
const POSITIONALS = argv.filter((a) => !a.startsWith("--"));
const DRY = FLAGS.has("--dry-run");
const WRITE_REPORT = FLAGS.has("--write-report");
const ALL = FLAGS.has("--all");

const DEFAULTS = [
  "src/components/track/TrackHeroPanel.tsx",
  "src/routes/curriculum.tsx",
  "src/routes/proof-methodology.tsx",
];

// Rewriters. Each returns the replacement string, only when a safe
// mapping exists — unknown sizes are left alone so the offender report
// keeps flagging them for a human.
const SIZE_RE = /(^|[\s"'`])((?:[a-z-]+:)*)text-\[(\d+(?:\.\d+)?(?:px|rem))\]/g;
const NAMED_RE = /(^|[\s"'`])((?:[a-z-]+:)*)(text-(?:xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl))\b/g;
const SHORT_RE = /(^|[\s"'`])((?:[a-z-]+:)*)text-\[(\d+(?:\.\d+)?(?:px|rem))\]\/\[[^\]]+\]/g;
const FONT_RE = /(^|[\s"'`])((?:[a-z-]+:)*)font-\[(\d+(?:\.\d+)?(?:px|rem))\]/g;

function rewrite(source) {
  let changes = 0;
  const replacements = [];

  const rewriteSize = (match, lead, variants, value) => {
    const exact = PX_MAP.get(value);
    if (!exact) return match; // closest-token is advisory only — never auto-apply
    changes++;
    replacements.push({ from: `${variants}text-[${value}]`, to: `${variants}${exact}` });
    return `${lead}${variants}${exact}`;
  };

  // size + leading shorthand: text-[14px]/[20px] → text-body-sm (drops leading).
  source = source.replace(SHORT_RE, (match, lead, variants, value) => {
    const exact = PX_MAP.get(value);
    if (!exact) return match;
    changes++;
    replacements.push({ from: match.slice(lead.length), to: `${variants}${exact}` });
    return `${lead}${variants}${exact}`;
  });

  source = source.replace(SIZE_RE, rewriteSize);

  source = source.replace(NAMED_RE, (match, lead, variants, cls) => {
    const sem = NAMED_MAP.get(cls);
    if (!sem) return match;
    changes++;
    replacements.push({ from: `${variants}${cls}`, to: `${variants}${sem}` });
    return `${lead}${variants}${sem}`;
  });

  source = source.replace(FONT_RE, (match, lead, variants, value) => {
    const exact = PX_MAP.get(value);
    if (!exact) return match;
    changes++;
    replacements.push({ from: `${variants}font-[${value}]`, to: `${variants}${exact}` });
    return `${lead}${variants}${exact}`;
  });

  return { source, changes, replacements };
}

function discoverAll() {
  const rows = scanProject(ROOT);
  return [...new Set(rows.map((r) => r.file))];
}

const targets = ALL ? discoverAll() : POSITIONALS.length ? POSITIONALS : DEFAULTS;

let total = 0;
const perFile = [];

for (const rel of targets) {
  const path = join(ROOT, rel);
  if (!existsSync(path)) {
    console.warn(`  ${rel}: skipped (missing)`);
    continue;
  }
  const before = readFileSync(path, "utf8");
  const { source, changes, replacements } = rewrite(before);
  if (changes > 0) {
    if (!DRY) writeFileSync(path, source);
    console.log(`  ${rel}: ${changes} replacement(s)${DRY ? " (dry-run)" : ""}`);
    total += changes;
    perFile.push({ file: rel, changes, replacements });
  } else {
    console.log(`  ${rel}: no auto-fixable changes`);
  }
}

console.log(
  `\ncodemod-typography: ${total} replacement(s) across ${targets.length} file(s)${DRY ? " (dry-run)" : ""}`,
);

if (WRITE_REPORT) {
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  const lines = [];
  lines.push("# Typography codemod report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(
    `Mode: ${DRY ? "dry-run" : "applied"} · Files touched: ${perFile.length} · Replacements: ${total}`,
  );
  lines.push("");
  for (const f of perFile) {
    lines.push(`## \`${f.file}\` — ${f.changes} replacement(s)`);
    lines.push("");
    lines.push("| From | To |");
    lines.push("| --- | --- |");
    for (const r of f.replacements.slice(0, 50)) {
      lines.push(`| \`${r.from}\` | \`${r.to}\` |`);
    }
    if (f.replacements.length > 50) lines.push(`| … ${f.replacements.length - 50} more | |`);
    lines.push("");
  }
  const out = join(ROOT, "docs/typography-codemod-report.md");
  writeFileSync(out, lines.join("\n") + "\n");
  console.log(`wrote ${relative(ROOT, out)}`);
}

if (ALL && !DRY && total > 0) {
  try {
    execSync("node scripts/check-typography-tokens.mjs --update-baseline", {
      cwd: ROOT,
      stdio: "inherit",
    });
  } catch (err) {
    console.warn("baseline refresh failed:", err.message);
  }
}
