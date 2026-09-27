import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const registryPath = path.join(ROOT, "src/data/seoGrowth.ts");
const source = fs.readFileSync(registryPath, "utf8");

const required = [
  'export type SeoIntent',
  'export interface SeoCluster',
  'export const SEO_GROWTH_CLUSTERS',
  'export const SEO_GROWTH_CITIES',
  'export const SEO_GROWTH_GUARDRAILS',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error(`SEO growth registry is missing: ${marker}`);
    process.exit(1);
  }
}

const clusterIds = [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const duplicates = clusterIds.filter((id, i) => clusterIds.indexOf(id) !== i);
if (duplicates.length) {
  console.error(`Duplicate SEO cluster IDs: ${[...new Set(duplicates)].join(", ")}`);
  process.exit(1);
}

const requiredClusters = [
  "career-role",
  "fresher-jobs",
  "degree-careers",
  "eligibility",
  "salary",
  "employer",
  "location",
  "research",
  "tools",
  "comparisons",
];

for (const id of requiredClusters) {
  if (!clusterIds.includes(id)) {
    console.error(`Required SEO cluster missing: ${id}`);
    process.exit(1);
  }
}

const forbidden = [
  "allowDoorwayPages: true",
  "allowSyntheticJobs: true",
  "allowSyntheticReviews: true",
  "allowUnsupportedEmployerClaims: true",
  "allowKeywordStuffing: true",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error(`SEO guardrail weakened: ${marker}`);
    process.exit(1);
  }
}

const routeFiles = fs.readdirSync(path.join(ROOT, "src/routes"), { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

const routeText = routeFiles.join("\n");
const routeHints = [
  "/roles/",
  "/careers/",
  "/degrees/",
  "/industry/",
  "/research/",
  "/comparisons/",
  "/tools/",
  "/locations/",
];

for (const hint of routeHints) {
  const normalized = hint.replace(/^\//, "").replace(/\/$/, "");
  const exists = routeFiles.some((file) => file.includes(normalized.replaceAll("/", ".")));
  if (!exists) {
    console.error(`SEO registry references a route family with no matching route file: ${hint}`);
    process.exit(1);
  }
}

console.log(`SEO growth registry OK: ${clusterIds.length} clusters, ${requiredClusters.length} required acquisition clusters verified.`);
