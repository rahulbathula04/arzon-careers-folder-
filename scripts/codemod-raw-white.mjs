#!/usr/bin/env node
/**
 * Auto-fix raw Tailwind white utilities in landing/admin/routes trees.
 *
 *   text-white          → text-slate-50
 *   text-white/N        → text-slate-100/N   (100 for N>=50, 200 for N<50)
 *   bg-white/N          → bg-slate-50/N
 *   border-white/N      → border-slate-200/N
 *
 * Skips any occurrence prefixed with `// @allow-raw-white` on the same line.
 * Only touches src/components/landing, src/components/admin, and
 * src/routes/{admin,internships}.*.tsx to match the check gate scope.
 *
 * Usage:
 *   node scripts/codemod-raw-white.mjs           # write in place
 *   node scripts/codemod-raw-white.mjs --dry     # preview only
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DRY = process.argv.includes("--dry");
const ROOTS = ["src/components/landing", "src/components/admin"];
const ROUTE_DIR = "src/routes";
const ROUTE_RE = /^(admin\.|internships\.).+\.tsx$/;

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

function gather() {
  const files = new Set();
  for (const r of ROOTS) for (const f of walk(r)) files.add(f);
  try {
    for (const name of readdirSync(ROUTE_DIR)) {
      if (ROUTE_RE.test(name)) files.add(join(ROUTE_DIR, name));
    }
  } catch {
    /* noop */
  }
  return [...files];
}

function rewriteLine(line) {
  if (line.includes("@allow-raw-white")) return line;
  return line
    .replace(/\bborder-white\/(\d{1,3})\b/g, "border-slate-200/$1")
    .replace(/\bbg-white\/(\d{1,3})\b/g, "bg-slate-50/$1")
    .replace(/\btext-white\/(\d{1,3})\b/g, (_, n) =>
      Number(n) >= 50 ? `text-slate-100/${n}` : `text-slate-200/${n}`,
    )
    .replace(/\btext-white\b(?!\/)/g, "text-slate-50");
}

let changedFiles = 0;
let changedLines = 0;
for (const file of gather()) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  let fileChanged = false;
  for (let i = 0; i < lines.length; i++) {
    const next = rewriteLine(lines[i]);
    if (next !== lines[i]) {
      lines[i] = next;
      changedLines++;
      fileChanged = true;
    }
  }
  if (fileChanged) {
    changedFiles++;
    if (!DRY) writeFileSync(file, lines.join("\n"));
    console.log(`${DRY ? "would fix" : "fixed"}: ${file}`);
  }
}

console.log(`\n${DRY ? "[dry-run] " : ""}${changedLines} line(s) across ${changedFiles} file(s).`);
if (!DRY && changedFiles > 0) {
  console.log(
    "→ re-run `node scripts/check-no-raw-white.mjs --update-baseline` if you fixed offenders.",
  );
}
