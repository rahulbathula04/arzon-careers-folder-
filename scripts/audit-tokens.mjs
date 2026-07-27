#!/usr/bin/env node
/**
 * Token audit report.
 *
 * Walks src/ and lists every remaining raw palette hex / rgb / hsl literal
 * (excluding files explicitly annotated with `@allow-raw-palette` on the
 * same line). Writes a Markdown report to docs/reports/token-audit.md with
 * file:line context so the fixes are a mechanical drive-down.
 *
 * Usage:
 *   node scripts/audit-tokens.mjs           # print + write report
 *   node scripts/audit-tokens.mjs --json    # also emit JSON alongside
 */
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";

import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const OUT_MD = join(ROOT, "docs/reports/token-audit.md");
const OUT_JSON = join(ROOT, "docs/reports/token-audit.json");
// JSON is always emitted (used by the PR-comment bot); the flag is kept
// for back-compat but has no effect on output.
const EMIT_JSON = true;

// Hex, rgb(), rgba(), hsl(), hsla(). Ignore var(--…) and #-fragment JSX hrefs.
const HEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGBISH = /\b(rgb|rgba|hsl|hsla)\s*\(\s*[\d.,%\s\/]+\)/gi;

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".output",
  ".vite",
  ".cache",
  "public",
]);
const SKIP_FILES = /(routeTree\.gen\.ts|\.d\.ts|\.snap|\.test\.[tj]sx?)$/;
// Files that legitimately encode raw palette (design tokens themselves).
const ALLOW_FILES = /^src\/(styles\.css|data\/trackTheme|integrations\/supabase\/)/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?|css|mdx?)$/.test(name) && !SKIP_FILES.test(name)) out.push(p);
  }
  return out;
}

const findings = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (ALLOW_FILES.test(rel)) continue;
  const src = readFileSync(file, "utf8");
  src.split(/\r?\n/).forEach((line, i) => {
    if (line.includes("@allow-raw-palette")) return;
    // Skip anchor href="#foo" and hash-fragment strings ("#reviews").
    const stripped = line
      .replace(/href=(["'])#[^"']*\1/g, "")
      .replace(/["'`]#[a-zA-Z_-][\w-]*["'`]/g, "");
    const hits = [...stripped.matchAll(HEX), ...stripped.matchAll(RGBISH)];
    for (const m of hits) {
      findings.push({
        file: rel,
        line: i + 1,
        kind: m[0].startsWith("#") ? "hex" : m[1].toLowerCase(),
        value: m[0],
        snippet: line.trim().slice(0, 180),
      });
    }
  });
}

// Group by file for readability.
const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
const sortedFiles = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);

const now = new Date().toISOString();
const total = findings.length;
const distinctFiles = byFile.size;

let md = `# Token audit report\n\n`;
md += `_Generated ${now}_\n\n`;
md += `- **Total raw palette literals:** ${total}\n`;
md += `- **Files affected:** ${distinctFiles}\n`;
md += `- **Scope:** \`src/**\` (excluding \`styles.css\`, \`data/trackTheme\`, generated files, and lines annotated \`@allow-raw-palette\`).\n\n`;
md += `## How to fix\n\n`;
md += `Replace hex/rgb literals with a semantic token from \`src/styles.css\` (\`--brand\`, \`--ink\`, \`--surface-1\`, \`--flag-in-*\`, etc.) or a track-theme accessor from \`@/data/trackTheme\`. When a raw value is genuinely required (e.g. the tricolour flag glyph), add a trailing comment \`/* @allow-raw-palette <reason> */\` on the same line.\n\n`;
if (!total) {
  md += `**No raw palette literals detected.** ✨\n`;
} else {
  md += `## Findings\n\n`;
  for (const [file, rows] of sortedFiles) {
    md += `### \`${file}\` — ${rows.length}\n\n`;
    md += `| Line | Kind | Value | Context |\n|---:|---|---|---|\n`;
    for (const r of rows) {
      const ctx = r.snippet.replace(/\|/g, "\\|");
      md += `| ${r.line} | ${r.kind} | \`${r.value}\` | \`${ctx}\` |\n`;
    }
    md += `\n`;
  }
}

mkdirSync(dirname(OUT_MD), { recursive: true });
writeFileSync(OUT_MD, md);
if (EMIT_JSON)
  writeFileSync(
    OUT_JSON,
    JSON.stringify({ generatedAt: now, total, distinctFiles, findings }, null, 2),
  );

console.log(`token-audit: ${total} literal(s) in ${distinctFiles} file(s)`);
console.log(`  → wrote ${relative(ROOT, OUT_MD)}`);
if (EMIT_JSON) console.log(`  → wrote ${relative(ROOT, OUT_JSON)}`);
// Report-only: always exit 0. The strict gate is check-no-raw-palette.mjs.
process.exit(0);
