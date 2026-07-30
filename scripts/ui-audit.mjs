#!/usr/bin/env node
/**
 * UI consistency audit. Run with: `node scripts/ui-audit.mjs`
 * Flags broken slugs, ad-hoc spacing, heading drift, and small tap targets
 * across landing components and routes. Output is informational only.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src/components/landing", "src/routes"];

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (/\.(tsx?|jsx?)$/.test(f)) out.push(p);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

// 1 - broken slugs
const courses = readFileSync(join(ROOT, "src/data/courses.ts"), "utf8");
const slugs = new Set([...courses.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]));

const findings = { slugs: [], spacing: [], headings: [], tap: [] };

for (const f of files) {
  const src = readFileSync(f, "utf8");
  const rel = relative(ROOT, f);

  // broken slugs: params={{ slug: "..." }}
  for (const m of src.matchAll(/params=\{\{\s*slug:\s*["']([^"']+)["']/g)) {
    if (!slugs.has(m[1])) findings.slugs.push(`${rel}: unknown slug "${m[1]}"`);
  }

  // ad-hoc tap targets - h-8/h-9/h-10 on <a|button>
  for (const m of src.matchAll(/<(a|button|Link)\b[^>]*\bh-(8|9|10)\b/g)) {
    findings.tap.push(`${rel}: <${m[1]}> with h-${m[2]} (<44px tap target)`);
  }

  // heading drift - <h1|h2> without h-display / h-section
  for (const m of src.matchAll(/<(h1|h2)\b([^>]*)>/g)) {
    const cls = m[2];
    if (!/h-(display|section|card)/.test(cls)) {
      findings.headings.push(`${rel}: <${m[1]}> missing h-display / h-section`);
    }
  }

  // route files: should use <Section> + <Container> (or page-level wrapper)
  if (
    rel.startsWith("src/routes/") &&
    !rel.endsWith("__root.tsx") &&
    !rel.endsWith("routeTree.gen.ts")
  ) {
    const usesShell = /<Section\b/.test(src) || /<Container\b/.test(src);
    if (!usesShell && /<main\b/.test(src) === false && /<section\b/.test(src)) {
      findings.spacing.push(`${rel}: bare <section> - wrap in <Section>/<Container>`);
    }
  }
}

function print(title, items) {
  console.log(`\n${title} (${items.length})`);
  if (!items.length) return console.log("  ✓ clean");
  for (const i of items.slice(0, 25)) console.log("  • " + i);
  if (items.length > 25) console.log(`  … (${items.length - 25} more)`);
}

print("Broken course slugs", findings.slugs);
print("Tap targets <44px", findings.tap);
print("Routes not using <Section>/<Container>", findings.spacing);
print("Headings without typography token", findings.headings);
