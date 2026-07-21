#!/usr/bin/env node
/**
 * Walks public/ and reports every asset with:
 *   - size on disk
 *   - whether it's referenced anywhere in src/, public/, docs/, or scripts/
 *
 * Writes a manifest to src/data/public-assets-manifest.json (consumed by
 * /admin/assets) and prints a human summary.
 *
 * A file is "referenced" if its basename OR its public-relative path (e.g.
 * /favicon.ico, /og/hero.png) shows up in any source or docs file.
 *
 * Flags:
 *   --fail-on-unused  exit 1 when any unreferenced asset exists (CI use)
 *   --json            print JSON to stdout only, no manifest write
 */
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, relative, extname, sep } from "node:path";

const ROOT = process.cwd();
const PUBLIC = "public";
const SEARCH_ROOTS = ["src", "public", "docs", "scripts", "index.html", "README.md"].filter((p) =>
  existsSync(p),
);
const IGNORE_BASENAMES = new Set([
  ".DS_Store",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "site.webmanifest",
  "manifest.json",
  "browserconfig.xml",
  "favicon.ico",
  "apple-touch-icon.png",
]);
const MANIFEST_PATH = "src/data/public-assets-manifest.json";

const args = new Set(process.argv.slice(2));
const failOnUnused = args.has("--fail-on-unused");
const jsonOnly = args.has("--json");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else yield { path: p, size: s.size };
  }
}

function* walkText(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walkText(p);
    else if (
      s.size < 2_000_000 &&
      /\.(ts|tsx|js|jsx|mjs|cjs|css|scss|html|md|mdx|json|yml|yaml|txt|xml)$/i.test(entry)
    ) {
      yield p;
    }
  }
}

// Build one giant haystack — fastest for a few hundred files.
const chunks = [];
for (const root of SEARCH_ROOTS) {
  const s = statSync(root);
  if (s.isFile()) {
    chunks.push(readFileSync(root, "utf8"));
  } else {
    for (const file of walkText(root)) {
      // Skip the manifest itself so it doesn't self-reference.
      if (file.endsWith(MANIFEST_PATH.replace(/\//g, sep))) continue;
      try {
        chunks.push(readFileSync(file, "utf8"));
      } catch {
        /* binary */
      }
    }
  }
}
const haystack = chunks.join("\n");

const assets = [];
for (const file of walk(PUBLIC)) {
  const rel = "/" + relative(PUBLIC, file.path).split(sep).join("/");
  const base = rel.split("/").pop();
  const ignored = IGNORE_BASENAMES.has(base);
  const refByPath = haystack.includes(rel);
  const refByName = base.length > 3 && haystack.includes(base);
  assets.push({
    path: rel,
    size: file.size,
    ext: extname(base).toLowerCase(),
    referenced: ignored || refByPath || refByName,
    matchedBy: ignored ? "always-kept" : refByPath ? "path" : refByName ? "basename" : null,
  });
}

assets.sort((a, b) => b.size - a.size);

const totalBytes = assets.reduce((n, a) => n + a.size, 0);
const unused = assets.filter((a) => !a.referenced);
const large = assets.filter((a) => a.size > 5 * 1024 * 1024);

const manifest = {
  generatedAt: new Date().toISOString(),
  totalCount: assets.length,
  totalBytes,
  unusedCount: unused.length,
  largeCount: large.length,
  assets,
};

if (jsonOnly) {
  process.stdout.write(JSON.stringify(manifest, null, 2));
  process.exit(0);
}

mkdirSync("src/data", { recursive: true });
writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const fmt = (n) => (n > 1024 * 1024 ? mb(n) : kb(n));

console.log(`\npublic/ scan — ${assets.length} files, ${mb(totalBytes)} total\n`);

if (large.length) {
  console.log("Large (>5 MB):");
  for (const a of large) console.log(`  ${a.path.padEnd(50)} ${fmt(a.size)}`);
  console.log("");
}

if (unused.length) {
  console.log(`Unreferenced (${unused.length}):`);
  for (const a of unused) console.log(`  ${a.path.padEnd(50)} ${fmt(a.size)}`);
  console.log("");
  console.log("  Delete with:  rm public<path>   (verify manually first)\n");
} else {
  console.log("✓ every asset is referenced\n");
}

console.log(`Manifest written → ${MANIFEST_PATH}\n`);

if (failOnUnused && unused.length) {
  console.error(`✗ ${unused.length} unreferenced asset(s) in public/`);
  process.exit(1);
}
