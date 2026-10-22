#!/usr/bin/env node
/**
 * SEO indexability guard for programmatic city × role pages.
 *
 * These URLs are only promoted to search engines when the underlying role
 * has both a pay band and role-matched employers in the requested city.
 * Keep the sitemap and page-level robots policy aligned.
 */
import fs from "node:fs";

const sitemap = fs.readFileSync("src/routes/sitemap[.]xml.ts", "utf8");
const route = fs.readFileSync("src/routes/industry.$role.$city.tsx", "utf8");

const checks = [
  [
    "sitemap imports the role-matched employer data",
    /import\s+\{\s*employersForRole\s*\}\s+from\s+["']@\/data\/industry\/employers["']/.test(sitemap),
  ],
  [
    "sitemap checks for a local role-matched employer before emitting city URLs",
    /const\s+hasLocalEmployer\s*=\s*employersForRole\(role\.slug\)\.some/.test(sitemap) &&
      /if\s*\(!hasLocalEmployer\)\s*continue/.test(sitemap),
  ],
  [
    "city-role pages without local employers emit noindex,follow",
    /employers\.length\s*===\s*0\s*\?\s*\[\{\s*name:\s*["']robots["']\s*,\s*content:\s*["']noindex,follow["']/.test(route),
  ],
];

const failures = checks.filter(([, passed]) => !passed).map(([label]) => label);
if (failures.length) {
  console.error("[check-city-role-indexability] FAIL:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

console.log("[check-city-role-indexability] OK · city-role sitemap and robots policy stay aligned.");
