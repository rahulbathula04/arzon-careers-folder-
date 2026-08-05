#!/usr/bin/env node
/**
 * Guard against invalid Tailwind v4 arbitrary-value class tokens.
 *
 * Tailwind v4 scans every source file for class candidates. If a file
 * contains a token like min-h-[var(--mh-PLACEHOLDER)] (even inside a JSDoc
 * comment), Tailwind generates a CSS rule for it. Lightning CSS then
 * refuses to parse the escaped selector and the dev server
 * returns 500 for /src/styles.css, blanking the preview.
 *
 * This script greps src/ for Tailwind-shaped arbitrary tokens that
 * contain a literal `...` and fails the build if any are found.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "scripts"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md", ".mdx", ".mjs"]);
// Matches e.g. arbitrary utility tokens whose value contains literal dots -
// any utility-shaped token whose arbitrary value contains a literal `...`.
const BAD = /\b[a-z][a-z0-9:-]*-\[[^\]\s]*\.\.\.[^\]\s]*\]/g;

const hits = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (EXTS.has(extname(name))) {
      const text = readFileSync(p, "utf8");
      const lines = text.split("\n");
      lines.forEach((line, i) => {
        for (const m of line.matchAll(BAD)) {
          hits.push(`${p}:${i + 1}: ${m[0]}`);
        }
      });
    }
  }
}
ROOTS.forEach(walk);

if (hits.length) {
  console.error("✖ Found Tailwind arbitrary-value tokens containing literal `...`:\n");
  for (const h of hits) console.error("  " + h);
  console.error(
    "\nTailwind v4 will try to compile these and Lightning CSS will reject the\n" +
      "resulting selector, breaking /src/styles.css in dev. Replace the `...` with\n" +
      "a concrete value or rewrite the comment so it doesn't look like a class.\n",
  );
  process.exit(1);
}
console.log("✓ No invalid Tailwind arbitrary-value tokens found.");
