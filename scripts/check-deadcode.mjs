#!/usr/bin/env node
/**
 * Dead-code gate wrapper.
 *
 * Runs `knip` for orphaned files + unused dependencies and compares the
 * result against a committed baseline (.knip-baseline.json). The build
 * fails only when a NEW orphan or unused dependency is introduced — the
 * point is to stop section deletions from silently leaving dead modules
 * behind, not to chase the pre-existing backlog in one pass.
 *
 * Usage:
 *   node scripts/check-deadcode.mjs           # gate (fails on new entries)
 *   node scripts/check-deadcode.mjs --update  # refresh the baseline
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = resolve(ROOT, ".knip-baseline.json");
const UPDATE = process.argv.includes("--update");

function runKnip() {
  let raw = "";
  try {
    raw = execSync(
      "bunx knip --no-progress --reporter json --include files,dependencies,unlisted",
      {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 32 * 1024 * 1024,
      },
    );
  } catch (err) {
    // Knip exits non-zero whenever issues exist; the JSON report still
    // lands on stdout. Re-throw only if we got nothing.
    raw = err.stdout?.toString?.() ?? "";
    if (!raw) throw err;
  }
  return JSON.parse(raw);
}

const report = runKnip();
const issues = report.issues ?? [];
const orphans = Array.from(
  new Set(issues.flatMap((entry) => (entry.files ?? []).map((f) => f.name ?? f))),
).sort();
const unused = Array.from(
  new Set(
    issues.flatMap((entry) => [
      ...(entry.dependencies ?? []).map((d) => d.name ?? d),
      ...(entry.devDependencies ?? []).map((d) => d.name ?? d),
      ...(entry.unlisted ?? []).map((d) => d.name ?? d),
    ]),
  ),
).sort();

const current = { files: orphans, dependencies: unused };

if (UPDATE || !existsSync(BASELINE)) {
  writeFileSync(BASELINE, JSON.stringify(current, null, 2) + "\n");
  console.log(
    `[deadcode] baseline written: ${orphans.length} orphan files, ${unused.length} unused deps`,
  );
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
const newFiles = orphans.filter((f) => !baseline.files.includes(f));
const newDeps = unused.filter((d) => !baseline.dependencies.includes(d));

if (newFiles.length === 0 && newDeps.length === 0) {
  console.log(`[deadcode] OK — baseline holds (${orphans.length} files, ${unused.length} deps)`);
  process.exit(0);
}

console.error("\n[deadcode] FAIL — new dead code introduced:\n");
if (newFiles.length) {
  console.error("Orphaned files (not reachable from any entry):");
  for (const f of newFiles) console.error("  - " + f);
}
if (newDeps.length) {
  console.error("\nUnused dependencies:");
  for (const d of newDeps) console.error("  - " + d);
}
console.error("\nIf intentional, refresh the baseline:");
console.error("  node scripts/check-deadcode.mjs --update");
console.error("Otherwise delete the orphaned file(s) or wire them into a route/component.\n");
process.exit(1);
