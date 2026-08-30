#!/usr/bin/env node
/**
 * Route-level guard: any `bg-white` (or `bg-[#fff…]`) surface added in
 * `src/routes/**` must either
 *   1. include `tone-light` / `card-light` in the same className, OR
 *   2. render inside the shared <LightSurface> primitive
 *      (import from '@/components/ui/LightSurface').
 *
 * This is intentionally scoped to `src/routes/**` - component-tree
 * files are still governed by scripts/check-tone-light-cards.mjs.
 *
 * A BASELINE snapshot captures pre-existing offenders so we stop the
 * bleed without a big-bang refactor; migrate files out of the baseline
 * one at a time.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIR = "src/routes";

// Files intentionally rendered outside the dark shell - same convention
// as scripts/check-tone-light-cards.mjs.
const EXEMPT_PATH =
  /\/(apply|career|learn|admin|enrol|dashboard|verify|checkin|reset-password|auth)[/.]/;
const EXEMPT_FILES = new Set([
  "src/routes/admin.seo.tsx",
  "src/routes/republic.tsx",
  "src/routes/__root.tsx",
  "src/routes/about.tsx",
  "src/routes/career-engine.start.tsx",
  "src/routes/contact.tsx",
  "src/routes/healthcare-career-workshop.tsx",
  "src/routes/placements.tsx",
  "src/routes/pv-associate.tsx",
  "src/routes/why-arzon.tsx",
  "src/routes/verify.tsx",
]);

// Grandfathered offenders present when this lint shipped. Drop entries
// from this set as you migrate each file to <LightSurface> or add the
// tone-light/card-light guard. New files must NOT be added here.
const BASELINE = new Set([
  "src/routes/acri.tsx",
  "src/routes/build.$slug.tsx",
  "src/routes/build.index.tsx",
  "src/routes/build.request.tsx",
  "src/routes/courses.$slug.tsx",
  "src/routes/courses.index.tsx",
  "src/routes/curriculum.tsx",
  "src/routes/deployment-model.tsx",
  "src/routes/jd-mirror.tsx",
  "src/routes/r.$id.brief.tsx",
  "src/routes/r.artifact.$token.tsx",
  "src/routes/recruiters.tsx",
  "src/routes/tpos.tsx",
]);

const CLASSNAME_RX = /className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;
const BG_WHITE_RX = /\bbg-white(?!\/)\b|\bbg-\[#(?:fff|ffffff)/i;
const GUARD_RX = /\btone-light\b|\bcard-light\b/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) yield* walk(full);
    else if (/\.tsx?$/.test(name)) yield full;
  }
}

const offenders = [];
for (const abs of walk(SCAN_DIR)) {
  const rel = relative(ROOT, abs).replace(/\\/g, "/");
  if (EXEMPT_FILES.has(rel)) continue;
  if (EXEMPT_PATH.test("/" + rel)) continue;

  const src = readFileSync(abs, "utf8");
  const importsLightSurface = /from\s+["']@\/components\/ui\/LightSurface["']/.test(src);

  let matched = false;
  let firstLine = 0;
  let sample = "";
  for (const m of src.matchAll(CLASSNAME_RX)) {
    const cls = m[1] ?? m[2] ?? m[3] ?? "";
    if (!BG_WHITE_RX.test(cls)) continue;
    if (GUARD_RX.test(cls)) continue;
    matched = true;
    firstLine = src.slice(0, m.index).split("\n").length;
    sample = cls.slice(0, 90).replace(/\s+/g, " ");
    break;
  }
  if (!matched) continue;
  if (importsLightSurface) continue;

  if (BASELINE.has(rel)) continue;
  offenders.push({ file: rel, line: firstLine, sample });
}

if (offenders.length) {
  console.error("❌ Unguarded bg-white surface in src/routes/:");
  for (const o of offenders) {
    console.error(`   • ${o.file}:${o.line}  ${o.sample}…`);
  }
  console.error(
    "\nFix (in order of preference):\n" +
      "  1. Wrap the surface in <LightSurface> from '@/components/ui/LightSurface'.\n" +
      "  2. Or add `tone-light` (or `card-light`) to the same className.\n" +
      "If the route legitimately renders outside the dark shell,\n" +
      "add it to EXEMPT_FILES in scripts/check-light-surface-routes.mjs.",
  );
  process.exit(1);
}

console.log(
  `✅ Route light-surface guard OK. ${BASELINE.size} route(s) grandfathered, awaiting migration.`,
);
