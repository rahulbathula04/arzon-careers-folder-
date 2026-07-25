#!/usr/bin/env node
// Fails the build when Tailwind `animate-*` utilities are used in JSX/TSX
// without the required `motion-safe:` prefix (or an explicit allowlist entry).
//
// This complements scripts/check-reduced-motion.mjs: that script validates
// the global reduced-motion CSS rules, this one guards individual class
// usages so a new component can't ship a raw `animate-spin` and regress
// prefers-reduced-motion behaviour.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");

// Tailwind animate utilities we require `motion-safe:` on.
// `animate-in` / `animate-out` are Radix data-state driven and short-lived,
// so they are covered by the reduced-motion CSS override and excluded here.
// Matches either a named animate utility (animate-spin, animate-fade-in, …)
// OR a Tailwind arbitrary-value animate utility (animate-[wiggle_1s_ease]).
// The `prefix` group captures any variant chain that came immediately
// before it so we can check for `motion-safe:`.
const ANIM_RE =
  /(?<prefix>[a-z0-9:_\-\/\.]*?)animate-(?<name>spin|pulse|bounce|ping|marquee|marquee-slow|glow-pulse|shimmer|tilt|fade-in|fade-up|scale-in|\[[^\]\s]+\])/g;

const ALLOWLIST_FILES = new Set([
  "src/components/career/CareerShell.tsx",
  "src/components/career/report/AiCareerCoachWidget.tsx",
  "src/components/landing/CounsellorLeadForm.tsx",
  "src/components/landing/Hero.tsx",
  "src/routes/admin.promotions.tsx",
  "src/routes/career-engine.path.$slug.tsx",
  "src/routes/career-engine.result.tsx",
  "src/routes/certificates.sample.$slug.tsx",
  "src/routes/changelog.tsx",
  "src/routes/copilot.tsx",
  "src/routes/courses.$slug.tsx",
  "src/routes/enrol.success.tsx",
  "src/routes/industry.$role.$city.tsx",
  "src/routes/learn.$slug.tsx",
  "src/routes/moments.$slug.tsx",
  "src/routes/placements.tsx",
  "src/routes/r.$id.brief.tsx",
  "src/routes/r.$id.tsx",
  "src/routes/status.tsx",
  "src/routes/_authenticated/employer.console.tsx",
]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (/\.(tsx|jsx|ts|js)$/.test(entry)) out.push(full);
  }
  return out;
}

const offenders = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (ALLOWLIST_FILES.has(rel)) continue;
  const src = readFileSync(file, "utf8");
  if (!src.includes("animate-")) continue;
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    ANIM_RE.lastIndex = 0;
    let m;
    while ((m = ANIM_RE.exec(line))) {
      const prefix = m.groups.prefix ?? "";
      // Accept motion-safe: directly, or a variant chain ending with motion-safe:
      if (/(^|:)motion-safe:$/.test(prefix)) continue;
      // Allow inside comments
      const before = line.slice(0, m.index);
      if (/\/\/|\/\*|\*/.test(before.trimStart().slice(0, 2))) continue;
      offenders.push({ file: rel, line: i + 1, snippet: line.trim() });
    }
  });
}

if (offenders.length) {
  console.error("❌ animate-* utilities missing `motion-safe:` prefix:\n");
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}\n    ${o.snippet}`);
  }
  console.error("\nFix: prefix the utility with `motion-safe:` (e.g. `motion-safe:animate-spin`).");
  process.exit(1);
}

console.log("✅ animate-* motion-safe check passed.");
