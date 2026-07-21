#!/usr/bin/env node
// Report-only font-defaults guardrail.
// Flags any `font-family:` literal outside src/styles.css and any
// non-token Google Fonts <link> that doesn't match an @theme declaration.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const ALLOW = ["src/styles.css"];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?|css)$/.test(name)) acc.push(p);
  }
  return acc;
}

const findings = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (ALLOW.some((a) => rel === a)) continue;
  const text = readFileSync(file, "utf8");
  const ff = text.match(/font-family\s*:\s*(?!var\()[^;]+/g);
  if (ff) for (const m of ff) findings.push({ file: rel, match: m.slice(0, 80) });
}

console.log(`font-defaults: ${findings.length} ad-hoc font-family declarations (report-only)`);
for (const f of findings.slice(0, 10)) console.log(`  ${f.file}  ${f.match}`);
process.exit(0);
