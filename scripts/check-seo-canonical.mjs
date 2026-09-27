#!/usr/bin/env node
/**
 * SEO integrity guard.
 * Prevents legacy production hosts from leaking into canonical, JSON-LD,
 * Open Graph, breadcrumb, or share URLs.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src/routes", "src/components", "src/lib"];
const LEGACY_HOSTS = [
  "https://www.arzonglobal.com",
  "https://www.arzoncareers.in",
];
const CURRENT_HOST = "https://arzoncareers.in";
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|ts|mjs)$/.test(entry.name)) {
      const src = fs.readFileSync(full, "utf8");
      for (const host of LEGACY_HOSTS) {
        if (src.includes(host)) failures.push(`${full}: legacy host ${host}`);
      }
    }
  }
}

for (const root of ROOTS) walk(root);

if (failures.length) {
  console.error("\n[check-seo-canonical] FAIL:");
  for (const failure of failures) console.error("  - " + failure);
  process.exit(1);
}

console.log(`[check-seo-canonical] OK · canonical host ${CURRENT_HOST}`);
