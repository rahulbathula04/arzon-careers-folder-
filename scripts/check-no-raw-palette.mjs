#!/usr/bin/env node
/**
 * Enforce semantic design tokens over raw Tailwind palette utilities in the
 * marketing tree (landing components, shared UI, marketing routes).
 *
 * Banned utilities (any prefix + palette name + optional shade + optional
 * opacity):
 *   text-slate-700, bg-sky-500, border-fuchsia-400/40, from-emerald-500,
 *   to-rose-500, ring-indigo-500, decoration-purple-500 …
 *
 * Also bans arbitrary color literals:
 *   text-[#fff], bg-[rgb(…)], border-[hsl(…)]
 *
 * Allowed alternatives:
 *   • semantic tokens: bg-surface, text-ink, border-edge, ring-focus, …
 *   • the raw-white guard's existing exceptions (text-slate-50/100/200/300)
 *     are permitted here too - they cover a specific dark-theme legibility
 *     escape hatch tracked separately.
 *   • line comment `// @allow-raw-palette` to acknowledge a legacy line
 *
 * A baseline JSON grandfathers pre-existing offenders - the gate fails on
 * any *new* violation. Refresh after intentional migrations:
 *   node scripts/check-no-raw-palette.mjs --update-baseline
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASELINE_FILE = "scripts/check-no-raw-palette.baseline.json";
const UPDATE_BASELINE = process.argv.includes("--update-baseline");

const ROOTS = [
  "src/components/landing",
  "src/components/ui",
  "src/components/common",
  "src/components/courses",
  "src/components/track",
  "src/components/industry",
  "src/components/proof",
  "src/components/site",
];

// Route files scanned individually; admin/career-engine/learn/verify are
// grandfathered by omission.
const ROUTE_MATCH = /^(?!admin\.|career-engine\.|learn\.|verify\.|checkin\.|admin$|__).+\.tsx$/;

const PALETTES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];
// Any Tailwind color-carrying utility prefix.
const PREFIXES = [
  "text",
  "bg",
  "border",
  "ring",
  "decoration",
  "from",
  "via",
  "to",
  "outline",
  "divide",
  "placeholder",
  "caret",
  "fill",
  "stroke",
  "shadow",
  "accent",
  "ring-offset",
];

// Slate 50/100/200/300 are the explicit escape hatch established by
// check-no-raw-white for legible dark-theme text. Don't re-flag them here.
const SLATE_LIGHT_ALLOW = /\btext-slate-(?:50|100|200|300)\b/;

const bannedPalette = new RegExp(
  `\\b(?:${PREFIXES.join("|")})-(?:${PALETTES.join("|")})-\\d{2,3}(?:\\\\?/(?:\\d{1,3}|\\[[^\\]]+\\]))?\\b`,
  "g",
);

const bannedArbitrary = new RegExp(
  `\\b(?:${PREFIXES.join("|")})-\\[(?:#|rgb|rgba|hsl|hsla|oklch|color)[^\\]]*\\]`,
  "g",
);

const ALLOW_TAG = "@allow-raw-palette";
// Files whose whole reason for existing is theming (design tokens map,
// palette registries) - exempt.
const FILE_EXEMPT = [/trackTheme\.ts$/, /careerEngineKindMeta\.ts$/];

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

function gatherFiles() {
  const files = new Set();
  for (const r of ROOTS) for (const f of walk(r)) files.add(f);
  let routes = [];
  try {
    routes = readdirSync("src/routes");
  } catch {}
  for (const name of routes) {
    if (!ROUTE_MATCH.test(name)) continue;
    files.add(join("src/routes", name));
  }
  return [...files].filter((f) => !FILE_EXEMPT.some((re) => re.test(f)));
}

function scan(file) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(ALLOW_TAG)) continue;
    // Strip the allowed slate-light escape so it doesn't count.
    const scrub = line.replace(SLATE_LIGHT_ALLOW, "");
    bannedPalette.lastIndex = 0;
    let m;
    while ((m = bannedPalette.exec(scrub))) {
      hits.push({ line: i + 1, rule: "palette", match: m[0] });
    }
    bannedArbitrary.lastIndex = 0;
    while ((m = bannedArbitrary.exec(scrub))) {
      hits.push({ line: i + 1, rule: "arbitrary", match: m[0] });
    }
  }
  return hits;
}

const files = gatherFiles();
let totalHits = 0;
const offenders = [];
for (const f of files) {
  const h = scan(f);
  if (h.length) {
    offenders.push({ file: f, hits: h });
    totalHits += h.length;
  }
}

let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
} catch {}

const newOrWorse = [];
for (const o of offenders) {
  const allowed = baseline[o.file.replace(/\\/g, "/")] ?? 0;
  if (o.hits.length > allowed) {
    newOrWorse.push({ file: o.file, allowed, found: o.hits.length, hits: o.hits });
  }
}

if (UPDATE_BASELINE) {
  const next = {};
  for (const o of offenders) next[o.file.replace(/\\/g, "/")] = o.hits.length;
  writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `Wrote ${BASELINE_FILE} with ${Object.keys(next).length} files (${totalHits} utilities).`,
  );
  process.exit(0);
}

if (newOrWorse.length === 0) {
  const tracked = Object.keys(baseline).length;
  console.log(
    `✅ Raw-palette token check passed. ${files.length} files scanned, ${tracked} legacy files in baseline (${totalHits} grandfathered utilities).`,
  );
  process.exit(0);
}

console.error(`❌ Raw-palette token check FAILED.`);
console.error(
  `   ${newOrWorse.length} file(s) introduced new palette utilities beyond the baseline.\n`,
);
for (const o of newOrWorse.slice(0, 40)) {
  console.error(`  ${o.file}  (baseline ${o.allowed}, now ${o.found})`);
  for (const h of o.hits.slice(0, 5)) {
    console.error(`    L${String(h.line).padStart(4)} ${h.rule.padEnd(10)} ${h.match}`);
  }
}
console.error("");
console.error("Fix options (per offending line):");
console.error("  • swap for a semantic token (bg-surface, text-ink, border-edge, ring-focus)");
console.error("  • or add a trailing // @allow-raw-palette comment");
console.error("");
console.error("If you intentionally migrated a legacy file, regenerate the baseline:");
console.error("  node scripts/check-no-raw-palette.mjs --update-baseline");
process.exit(1);
