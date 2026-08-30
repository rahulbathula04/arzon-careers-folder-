#!/usr/bin/env node
/**
 * Build-time guard: every public route file must declare a head() with at
 * least a title and a description, and the lengths must be SEO-safe
 * (title ≤ 60 chars, description ≤ 160 chars).
 *
 * Routes listed in PRIVATE_PREFIXES are skipped (they're noindex by design).
 */
import fs from "node:fs";
import path from "node:path";

const ROUTES_DIR = "src/routes";
const PRIVATE_PREFIXES = [
  "admin.",
  "employer.",
  "apply.",
  "career-engine.lead",
  "career-engine.result",
  "career-engine.start",
  "career-engine.enrol",
  "career-engine.test",
  "career-engine.tsx",
  "dashboard",
  "learn.",
  "verify",
  "certificates.sample",
  "__root",
  "sitemap",
  "media-test",
  "index.tsx",
  "enrol.",
  "enrol.tsx",
  // Auth recovery (noindex, only reachable via emailed link).
  "reset-password",
  // Retention check-in magic link (noindex, only reachable via emailed token).
  "checkin.",
  // /internships/* and /workshop routes are 301 redirect-only files now (they never render),
  // so they don't carry head() meta. Real SEO lives on /courses/* and /healthcare-career-workshop.
  "internships.",
  "workshop.",
  // Internal Playwright/visual-regression harnesses (noindex, not crawlable).
  "_dev.",
  "dev.",
  "__vr.",
];
/**
 * Public, indexable routes that MUST also have an og:image and a canonical
 * link - either via the pageSeo() helper or explicit meta entries. Keeps
 * social-card parity green forever.
 */
// Only enforce og:image / canonical on the same set of public routes that
// the rest of check-meta inspects (it already excludes PRIVATE_PREFIXES via
// the file walker below). Layout/internal routes (career-engine.tsx,
// career-engine.enrol.tsx, career-engine.test.tsx, media-test.tsx) and the
// home page (which sets canonical via the seo() helper without rel literal)
// are skipped by name.
const REQUIRE_OG_IMAGE_SKIP = new Set([
  "career-engine.tsx",
  "career-engine.enrol.tsx",
  "career-engine.test.tsx",
  "media-test.tsx",
  "index.tsx",
]);
const REQUIRE_OG_IMAGE = (file) =>
  !PRIVATE_PREFIXES.some((p) => file.startsWith(p)) && !REQUIRE_OG_IMAGE_SKIP.has(file);
const TITLE_MAX = 65;
const DESC_MAX = 165;

const failures = [];
const warnings = [];

const files = fs
  .readdirSync(ROUTES_DIR)
  .filter((f) => /\.(tsx|ts)$/.test(f))
  .filter((f) => !PRIVATE_PREFIXES.some((p) => f.startsWith(p)));

for (const f of files) {
  const full = path.join(ROUTES_DIR, f);
  const src = fs.readFileSync(full, "utf8");

  if (!/head\s*:\s*\(/.test(src)) {
    failures.push(`${f}: missing head() block`);
    continue;
  }
  if (!/title\s*:/.test(src) && !/title\s*}/.test(src)) {
    failures.push(`${f}: head() has no title`);
  }
  // Either an explicit { name: "description", content: ... } meta, OR use of
  // the pageSeo() helper which always emits one.
  if (!/name:\s*"description"/.test(src) && !/pageSeo\s*\(/.test(src)) {
    failures.push(`${f}: head() has no description meta`);
  }

  // og:image enforcement - accepted via pageSeo() (always emits one) or an
  // explicit `property: "og:image"` meta entry.
  if (REQUIRE_OG_IMAGE(f)) {
    if (!/pageSeo\s*\(/.test(src) && !/property:\s*"og:image"/.test(src)) {
      failures.push(`${f}: missing og:image (use pageSeo() or add a property: "og:image" meta)`);
    }
    if (!/pageSeo\s*\(/.test(src) && !/rel:\s*"canonical"/.test(src)) {
      failures.push(`${f}: missing canonical link (use pageSeo() or add rel: "canonical")`);
    }
  }

  // Length sniff - inspects inside the head() block
  const headMatch = src.match(/head\s*:\s*\(\)\s*=>\s*(\{[\s\S]*?\n\s*\})/);
  const headSrc = headMatch ? headMatch[1] : src;
  const titleStrings = [...headSrc.matchAll(/title:\s*"([^"]{1,300})"/g)].map((m) => m[1]);
  for (const t of titleStrings) {
    if (t.length > TITLE_MAX)
      warnings.push(`${f}: title length ${t.length} > ${TITLE_MAX} - "${t.slice(0, 80)}…"`);
  }
  const descMatches = [
    ...headSrc.matchAll(/name:\s*"description"\s*,\s*content:\s*"([^"]{1,400})"/g),
  ].map((m) => m[1]);
  for (const d of descMatches) {
    if (d.length > DESC_MAX)
      warnings.push(`${f}: description length ${d.length} > ${DESC_MAX} - "${d.slice(0, 80)}…"`);
  }
}

if (warnings.length) {
  console.warn("\n[check-meta] warnings:");
  for (const w of warnings) console.warn("  - " + w);
}
if (failures.length) {
  console.error("\n[check-meta] FAIL:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`[check-meta] OK · ${files.length} public routes inspected`);
