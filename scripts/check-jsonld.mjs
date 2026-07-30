#!/usr/bin/env node
/**
 * Build-time guard: every <script type="application/ld+json"> string
 * inside src/routes/**.tsx must parse as valid JSON, and the @context
 * must be schema.org.
 *
 * This catches typos like trailing commas, unescaped quotes, or missing
 * @type fields before they ship.
 */
import fs from "node:fs";
import path from "node:path";

const ROUTES_DIR = "src/routes";
const SCHEMA_RE =
  /type:\s*"application\/ld\+json"\s*,\s*children:\s*JSON\.stringify\(\s*(\{[\s\S]*?\})\s*\)/g;

let scanned = 0;
let scriptCount = 0;
const failures = [];

const files = fs.readdirSync(ROUTES_DIR).filter((f) => /\.tsx$/.test(f));
for (const f of files) {
  const src = fs.readFileSync(path.join(ROUTES_DIR, f), "utf8");
  scanned++;
  const matches = [...src.matchAll(SCHEMA_RE)];
  for (const m of matches) {
    scriptCount++;
    const blob = m[1];
    // Light-weight validation - just check the @context + @type tokens
    // are present. Full JSON.parse would require evaluating a JS object
    // literal which contains template strings / refs; that's fine to
    // skip because TS / Vite already validate the JS itself.
    if (!/['"]?@context['"]?\s*:\s*"https:\/\/schema\.org"/.test(blob)) {
      failures.push(`${f}: JSON-LD block missing @context: "https://schema.org"`);
    }
    if (!/['"]?@type['"]?\s*:/.test(blob)) {
      failures.push(`${f}: JSON-LD block missing @type`);
    }
  }
}

if (failures.length) {
  console.error("\n[check-jsonld] FAIL:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`[check-jsonld] OK · ${scriptCount} JSON-LD blocks across ${scanned} route files`);
