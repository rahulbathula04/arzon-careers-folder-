#!/usr/bin/env node
/**
 * Build-time guard: every public, indexable route file under src/routes/
 * must appear in the dynamic sitemap (or be explicitly allowlisted).
 *
 * Walks src/routes/, derives the URL each file claims via createFileRoute(),
 * and diffs against the STATIC_PATHS / dynamic generators in
 * src/routes/sitemap[.]xml.ts.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROUTES_DIR = "src/routes";
const SITEMAP_FILE = "src/routes/sitemap[.]xml.ts";

// Routes intentionally excluded from the sitemap (admin, gated, dynamic-only).
const ALLOWLIST = new Set([
  "/admin",
  "/admin/login",
  "/admin/accept-invite",
  "/admin/applications",
  "/admin/certificates",
  "/admin/funnel",
  "/admin/funnel-test",
  "/admin/funnel-ce",
  "/admin/readiness-journeys",
  "/admin/cohorts",
  "/admin/analytics-alerts",
  "/admin/index",
  "/admin/invites",
  "/admin/leads",
  "/admin/results",
  "/admin/activity",
  "/admin/roles",
  "/admin/thumbnails",
  "/admin/placements",
  // Public placements ledger — gated by loader to 404 while empty so it
  // is not exposed to crawlers. Re-add to the sitemap the day it publishes
  // its first verified hire.
  "/placements",
  "/employer/login",
  "/employer/console",
  "/_authenticated/employer/console",
  "/admin/audit",
  "/admin/backups",
  "/admin/assets",
  "/admin/experiments",
  "/admin/experiments/sticky-cta",
  "/admin/metrics-domain-grid",
  "/admin/qa/content-rebalance",
  "/qa",
  "/apply/confirm",
  "/waitlist",
  "/apply/review",
  "/apply/success",
  // Legacy /apply funnel — 301 redirects to /enrol/$tier.
  "/apply",
  // Merged proof cluster — 301 redirects to /why-arzon.
  "/proof",
  "/credibility",
  "/trust-report",
  "/republic",
  "/methodology",
  "/proof-methodology",
  "/deployment-model",
  "/enrol",
  "/enrol/success",
  "/enrol/$tier",
  "/enrol/$tier/pay",
  "/career-engine/result",
  "/career-engine/lead",
  "/career-engine/test",
  "/career-engine/enrol",
  "/career-engine/start",
  "/career-engine/plan",
  "/dashboard",
  "/sitemap.xml",
  // Gated learner shell (auth-only, noindex).
  "/_authenticated",
  "/_authenticated/app",
  "/_authenticated/hub",
  "/_authenticated/learning-path",
  "/student/resume",
  // Auth recovery page (noindex, only reachable via emailed recovery link).
  "/reset-password",
  // Retention check-in magic link (noindex, only reachable via emailed token).
  "/checkin/$token",
  // Internal QA pages (noindex, not linked from public nav).
  "/media-test",
  // Visual-regression harness for the Moments empty state (dark+light).
  // Registered as pathless "__vr" group; TanStack claims both the group
  // path and the leaf URL, so allowlist both to stay noindex.
  "/__vr/moments-empty",
  "/moments-empty",
  // Internal harnesses + admin (noindex, not linked from public nav).
  "/dev/cards",
  "/_dev/countdown",
  "/admin/arzonprime60",
  "/admin/demand",
  "/admin/seo",
  "/admin/seo/settings",
  "/admin/content-qa-scan",
  "/admin/landing-changelog",
  "/admin/moments",
  "/admin/moments/$id",
  "/admin/retention",
  // Legacy /internships/* paths — kept as 301 redirect routes to /courses/*.
  // They are intentionally absent from the sitemap so crawlers stop indexing
  // the old URLs and follow the redirect to the canonical /courses page.
  "/internships",
  "/internships/pharmacovigilance",
  "/internships/medical-coding",
  "/internships/clinical-data-management",
  // Dynamic routes are emitted by the sitemap server function from real data
  "/courses/$slug",
  // Static override of the pharmacovigilance course (Coursera-inspired
  // rebuild) — URL is already emitted by the dynamic /courses/$slug
  // generator, so we don't duplicate it in STATIC_PATHS.
  "/courses/pharmacovigilance",
  "/learn/$slug",
  "/career-engine/path/$slug",
  "/certificates/sample/$slug",
]);

function listFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

const routeFiles = listFiles(ROUTES_DIR).filter(
  (f) => f.endsWith(".tsx") && !f.includes("__root") && !f.includes("sitemap"),
);

const claims = new Set();
for (const file of routeFiles) {
  const src = readFileSync(file, "utf8");
  const m = src.match(/createFileRoute\("([^"]+)"\)/);
  if (m) claims.add(m[1]);
}

const sitemapSrc = readFileSync(SITEMAP_FILE, "utf8");
const listed = new Set();
const staticBlock = sitemapSrc.match(/STATIC_PATHS\s*=\s*\[([\s\S]*?)\]/);
if (staticBlock) {
  for (const m of staticBlock[1].matchAll(/"([^"]+)"/g)) listed.add(m[1]);
}
// Also accept the structured STATIC_ENTRIES form with `{ path: "...", ... }`.
const entriesBlock = sitemapSrc.match(/STATIC_ENTRIES[\s\S]*?=\s*\[([\s\S]*?)\n\];/);
if (entriesBlock) {
  for (const m of entriesBlock[1].matchAll(/path:\s*"([^"]+)"/g)) listed.add(m[1]);
}

const missing = [];
for (const claim of claims) {
  if (ALLOWLIST.has(claim)) continue;
  if (claim.includes("$")) continue; // dynamic — handled by generator
  // Normalise: TanStack uses "/foo/" for index routes, sitemap uses "/foo".
  const norm = claim.length > 1 && claim.endsWith("/") ? claim.slice(0, -1) : claim;
  if (ALLOWLIST.has(norm)) continue;
  if (!listed.has(norm)) missing.push(norm);
}

if (missing.length) {
  console.error("❌ Sitemap parity check FAILED. Routes not listed in /sitemap.xml:");
  for (const m of missing) console.error("   • " + m);
  console.error("\nFix: add the path to STATIC_PATHS in " + SITEMAP_FILE);
  console.error("     or add it to ALLOWLIST in this script if it's intentionally hidden.");
  process.exit(1);
}

console.log(`✅ Sitemap parity OK. ${claims.size} routes scanned, ${listed.size} listed.`);
