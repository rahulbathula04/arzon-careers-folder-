#!/usr/bin/env node
// Detailed offenders report for ad-hoc typography classes.
// See scripts/lib/typography-tokens.mjs for the shared detector.
//
// Outputs:
//   • Console table (file:line — current → suggested)
//   • docs/typography-offenders.md
//   • docs/typography-offenders.json (with --json)
//
// Flags:
//   --json     also emit JSON
//   --strict   exit 1 if any offender exists
//   --quiet    suppress per-row console output

import { writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { scanProject, ALLOWED_TOKENS } from "./lib/typography-tokens.mjs";

import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FLAGS = new Set(process.argv.slice(2));
const STRICT = FLAGS.has("--strict");
const EMIT_JSON = FLAGS.has("--json");
const QUIET = FLAGS.has("--quiet");

const offenders = scanProject(ROOT);

// Console output ───────────────────────────────────────────────
console.log(
  `typography-offenders: ${offenders.length} usages in ${new Set(offenders.map((o) => o.file)).size} files\n`,
);
if (!QUIET) {
  for (const o of offenders.slice(0, 200)) {
    console.log(`  ${o.file}:${o.line}  ${o.current.padEnd(22)} → ${o.suggested}`);
  }
  if (offenders.length > 200)
    console.log(`  … ${offenders.length - 200} more (see docs/typography-offenders.md)`);
}

// Markdown report ──────────────────────────────────────────────
mkdirSync(join(ROOT, "docs"), { recursive: true });

const byCat = offenders.reduce((acc, o) => {
  acc[o.category] = (acc[o.category] ?? 0) + 1;
  return acc;
}, {});
const byFile = new Map();
for (const o of offenders) {
  if (!byFile.has(o.file)) byFile.set(o.file, []);
  byFile.get(o.file).push(o);
}

const lines = [];
lines.push("# Typography offenders report");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(`Total: **${offenders.length}** ad-hoc usages across **${byFile.size}** files`);
lines.push("");
lines.push("## Allowed semantic utilities (from `src/styles.css`)");
lines.push("");
lines.push(ALLOWED_TOKENS.map((t) => `\`${t}\``).join(" · "));
lines.push("");
lines.push("## Summary by category");
lines.push("");
lines.push("| Category | Count |");
lines.push("| --- | ---: |");
for (const [k, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  lines.push(`| ${k} | ${n} |`);
}
lines.push("");
lines.push("## Offenders");
lines.push("");
lines.push("| File | Line | Current class | Suggested token |");
lines.push("| --- | ---: | --- | --- |");
for (const [file, list] of [...byFile.entries()].sort()) {
  for (const o of list) {
    lines.push(`| \`${file}\` | ${o.line} | \`${o.current}\` | \`${o.suggested}\` |`);
  }
}

// Composite groups — collapse responsive stacks / size+leading pairs
// so reviewers see "this hunk should become text-body-sm" instead of N rows.
const composites = new Map();
for (const o of offenders) {
  const list = composites.get(o.groupId) ?? [];
  list.push(o);
  composites.set(o.groupId, list);
}
const multi = [...composites.values()].filter((g) => g.length > 1);
if (multi.length) {
  lines.push("");
  lines.push("## Composite blocks (responsive / size + leading stacks)");
  lines.push("");
  lines.push("| File | Line | Current stack | Suggested token |");
  lines.push("| --- | ---: | --- | --- |");
  for (const g of multi) {
    const stack = g.map((o) => `\`${o.current}\``).join(" + ");
    lines.push(`| \`${g[0].file}\` | ${g[0].line} | ${stack} | \`${g[0].suggested}\` |`);
  }
}
lines.push("");
lines.push("## Quick fix");
lines.push("");
lines.push("Run the codemod on a target file:");
lines.push("");
lines.push("```sh");
lines.push("node scripts/codemod-typography.mjs <file> [<file> ...]");
lines.push("```");
lines.push("");
lines.push("Then refresh the ratchet baseline:");
lines.push("");
lines.push("```sh");
lines.push("node scripts/check-typography-tokens.mjs --update-baseline");
lines.push("```");

const mdPath = join(ROOT, "docs/typography-offenders.md");
writeFileSync(mdPath, lines.join("\n") + "\n");
console.log(`\nwrote ${relative(ROOT, mdPath)}`);

if (EMIT_JSON) {
  const jsonPath = join(ROOT, "docs/typography-offenders.json");
  writeFileSync(
    jsonPath,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), total: offenders.length, offenders },
      null,
      2,
    ),
  );
  console.log(`wrote ${relative(ROOT, jsonPath)}`);
}

if (STRICT && offenders.length > 0) {
  console.error(
    `\n✗ typography-strict: ${offenders.length} ad-hoc typography usage(s) — replace with semantic utilities (text-display/h1/h2/h3/h4/body*/caption/overline/meta/micro).`,
  );
  process.exit(1);
}
