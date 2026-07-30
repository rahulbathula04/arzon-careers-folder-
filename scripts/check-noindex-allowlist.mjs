#!/usr/bin/env node
/**
 * Build-time guard: every internal QA route that opts out of indexing
 * (via a `noindex` robots meta) MUST be present in the sitemap parity
 * ALLOWLIST and ABSENT from STATIC_PATHS in the sitemap.
 *
 * Why: it's easy to add a /media-test-style page, mark it noindex, and
 * forget the parity allowlist - that breaks the build later. It's also
 * easy to accidentally publish such a page in the sitemap, which leaks
 * an internal URL to crawlers. This script catches both mistakes.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROUTES_DIR = "src/routes";
const SITEMAP_FILE = "src/routes/sitemap[.]xml.ts";
const PARITY_FILE = "scripts/check-sitemap-parity.mjs";

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

// Detects { name: "robots", content: "...noindex..." } in any quote style /
// whitespace, including content="noindex,nofollow".
const NOINDEX_RE = /name:\s*["']robots["'][^}]*content:\s*["'][^"']*noindex[^"']*["']/i;

const noindexRoutes = [];
for (const file of routeFiles) {
  const src = readFileSync(file, "utf8");
  if (!NOINDEX_RE.test(src)) continue;
  const m = src.match(/createFileRoute\("([^"]+)"\)/);
  if (!m) continue;
  const claim = m[1];
  const norm = claim.length > 1 && claim.endsWith("/") ? claim.slice(0, -1) : claim;
  noindexRoutes.push({ file, path: norm });
}

const paritySrc = readFileSync(PARITY_FILE, "utf8");
const allowlistBlock = paritySrc.match(/ALLOWLIST\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
const allowlist = new Set();
if (allowlistBlock) {
  for (const m of allowlistBlock[1].matchAll(/"([^"]+)"/g)) allowlist.add(m[1]);
}

const sitemapSrc = readFileSync(SITEMAP_FILE, "utf8");
const sitemapPaths = new Set();
const staticBlock = sitemapSrc.match(/STATIC_PATHS\s*=\s*\[([\s\S]*?)\]/);
if (staticBlock) {
  for (const m of staticBlock[1].matchAll(/"([^"]+)"/g)) sitemapPaths.add(m[1]);
}

const errors = [];
for (const r of noindexRoutes) {
  if (!allowlist.has(r.path)) {
    errors.push(
      `   • ${r.path}  (${r.file}) - noindex route missing from ALLOWLIST in ${PARITY_FILE}`,
    );
  }
  if (sitemapPaths.has(r.path)) {
    errors.push(
      `   • ${r.path}  (${r.file}) - noindex route is listed in STATIC_PATHS (${SITEMAP_FILE}); remove it`,
    );
  }
}

if (errors.length) {
  console.error("❌ Noindex allowlist check FAILED:");
  for (const e of errors) console.error(e);
  console.error(
    "\nFix: any route that emits a `noindex` robots meta must be added to" +
      "\n     ALLOWLIST in scripts/check-sitemap-parity.mjs and kept out of" +
      "\n     STATIC_PATHS in src/routes/sitemap[.]xml.ts.",
  );
  process.exit(1);
}

console.log(`✅ Noindex allowlist OK. ${noindexRoutes.length} noindex route(s) scanned.`);
