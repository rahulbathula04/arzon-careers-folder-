#!/usr/bin/env node
/**
 * Build-time guard: every og:image referenced in route head() blocks must
 * resolve to an actual file in public/. Catches broken social-card previews
 * before they hit production.
 *
 * Checks:
 *   1. Default OG image (SITE.ogImage.inauguration) exists.
 *   2. Every per-route image passed to pageSeo({ image: ... }) resolves.
 *   3. Every explicit `property: "og:image"` string literal resolves.
 *   4. Every SITE.ogImages.* reference resolves.
 */
import fs from "node:fs";
import path from "node:path";

const ROUTES_DIR = "src/routes";
const PUBLIC_DIR = "public";

const PRIVATE_PREFIXES = [
  "admin.",
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
  "reset-password",
  "checkin.",
  "internships.",
  "_dev.",
  "dev.",
];

// Resolve og path (root-relative or absolute) to public/ disk path.
function resolvePublic(ogPath) {
  if (!ogPath) return null;
  // Strip origin if absolute
  const rel = ogPath.replace(/^https?:\/\/[^/]+/, "");
  if (!rel.startsWith("/")) return null;
  return path.join(PUBLIC_DIR, rel);
}

// Parse SITE.ogImage / SITE.ogImages from constants.ts
function loadSiteOgImages() {
  const constPath = "src/components/landing/constants.ts";
  const src = fs.readFileSync(constPath, "utf8");
  const map = new Map();

  // Default: SITE.ogImage.inauguration
  const defaultMatch = src.match(/ogImage:\s*\{[\s\S]*?inauguration:\s*"([^"]+)"/);
  if (defaultMatch) map.set("DEFAULT", defaultMatch[1]);

  // Per-section: SITE.ogImages.{key}: "/og/xxx.jpg"
  for (const m of src.matchAll(/ogImages:\s*\{([\s\S]*?)\}/g)) {
    const block = m[1];
    for (const entry of block.matchAll(/(\w+):\s*"([^"]+)"/g)) {
      map.set(entry[1], entry[2]);
    }
  }
  return map;
}

const siteOgImages = loadSiteOgImages();
const failures = [];
const checkedPaths = new Set();

function assertExists(label, ogPath, context) {
  const disk = resolvePublic(ogPath);
  if (!disk) {
    failures.push(`${context}: ${label} - unresolvable path "${ogPath}"`);
    return;
  }
  if (checkedPaths.has(disk)) return;
  checkedPaths.add(disk);
  if (!fs.existsSync(disk)) {
    failures.push(`${context}: ${label} - missing file "${disk}" (ref: ${ogPath})`);
  }
}

// 1. Default OG image
const defaultImage = siteOgImages.get("DEFAULT");
if (defaultImage) {
  assertExists("default og:image", defaultImage, "src/components/landing/constants.ts");
}

const files = fs
  .readdirSync(ROUTES_DIR)
  .filter((f) => /\.(tsx|ts)$/.test(f))
  .filter((f) => !PRIVATE_PREFIXES.some((p) => f.startsWith(p)));

for (const f of files) {
  const full = path.join(ROUTES_DIR, f);
  const src = fs.readFileSync(full, "utf8");

  // Skip routes without head()
  if (!/head\s*:\s*\(/.test(src)) continue;

  // 2. pageSeo({ image: "..." }) or pageSeo({ image: SITE.ogImages.xxx })
  const pageSeoMatches = [...src.matchAll(/pageSeo\s*\(\s*\{([^}]*image:[^}]*)\}\s*\)/g)];
  for (const m of pageSeoMatches) {
    const block = m[1];
    // Direct string
    const strMatch = block.match(/image:\s*"([^"]+)"/);
    if (strMatch) {
      assertExists("og:image (pageSeo)", strMatch[1], f);
    }
    // SITE.ogImages.xxx
    const siteMatch = block.match(/image:\s*SITE\.ogImages\.(\w+)/);
    if (siteMatch) {
      const key = siteMatch[1];
      const resolved = siteOgImages.get(key);
      if (resolved) {
        assertExists(`og:image (SITE.ogImages.${key})`, resolved, f);
      } else {
        failures.push(`${f}: unknown SITE.ogImages.${key} in pageSeo()`);
      }
    }
    // SITE.ogImage.inauguration (default fallback)
    const defaultMatch2 = block.match(/image:\s*SITE\.ogImage\.inauguration/);
    if (defaultMatch2 && defaultImage) {
      assertExists("og:image (default)", defaultImage, f);
    }
  }

  // 3. Explicit property: "og:image" meta entries
  for (const m of src.matchAll(/property:\s*"og:image"\s*,\s*content:\s*"([^"]+)"/g)) {
    assertExists("og:image (explicit meta)", m[1], f);
  }

  // 4. SITE.ogImages.xxx used outside pageSeo (e.g. spread into meta)
  for (const m of src.matchAll(/SITE\.ogImages\.(\w+)/g)) {
    const key = m[1];
    const resolved = siteOgImages.get(key);
    if (resolved) {
      assertExists(`og:image (SITE.ogImages.${key})`, resolved, f);
    } else {
      failures.push(`${f}: unknown SITE.ogImages.${key}`);
    }
  }
}

if (failures.length) {
  console.error("\n[check-og-images] FAIL:");
  for (const e of failures) console.error("  - " + e);
  console.error("\nFix: add the missing image to public/ or update the reference in the route.");
  process.exit(1);
}
console.log(`[check-og-images] OK · ${checkedPaths.size} image(s) verified`);
