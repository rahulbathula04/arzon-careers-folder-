#!/usr/bin/env node
/**
 * Prebuild guard: fail the build if any image under src/assets/ (excluding
 * the _originals/ backup folder) is bigger than the budget. Stops anyone
 * from accidentally re-introducing a 1.4 MB hero JPG.
 *
 * Budgets (bytes):
 *   .webp / .avif → 200 KB
 *   .jpg / .jpeg  → 200 KB (encourage WebP migration; raise consciously)
 *   .png          →  60 KB (icons / diagrams only - bigger should be WebP)
 *   .svg          →  60 KB
 *
 * Run with FORCE=1 to bypass for one-off emergencies.
 */
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src/assets";
const SKIP_DIRS = new Set();
const BUDGETS = {
  ".webp": 200 * 1024,
  ".avif": 200 * 1024,
  ".jpg": 200 * 1024,
  ".jpeg": 200 * 1024,
  ".png": 60 * 1024,
  ".svg": 60 * 1024,
};

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else yield { path: p, size: s.size };
  }
}

const offenders = [];
for (const file of walk(ROOT)) {
  const ext = extname(file.path).toLowerCase();
  const budget = BUDGETS[ext];
  if (budget && file.size > budget) {
    offenders.push({ ...file, ext, budget });
  }
}

if (offenders.length === 0) {
  console.log("✓ asset size check passed");
  process.exit(0);
}

console.error("\n✗ Asset size budget violations:\n");
for (const o of offenders) {
  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  console.error(`  ${o.path}  ${kb(o.size)}  (budget ${kb(o.budget)})`);
}
console.error(
  "\nRe-encode these to WebP at the size they actually display.",
  "\nExample: magick input.jpg -resize 900x900\\> -quality 72 output.webp",
  "\nSet FORCE=1 to bypass once.\n",
);
if (process.env.FORCE === "1") {
  console.error("FORCE=1 set - bypassing.\n");
  process.exit(0);
}
process.exit(1);
