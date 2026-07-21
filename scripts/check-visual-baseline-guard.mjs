#!/usr/bin/env node
/**
 * Guard: PRs that touch tests/visual/baseline/** must either
 *   (a) add a matching entry to docs/visual-baseline-changelog.md, OR
 *   (b) carry the `baseline-refresh` PR label (set by the manual refresh workflow).
 *
 * Env:
 *   BASE_SHA   git sha to diff against (defaults to origin/main).
 *   PR_LABELS  comma-separated PR labels (Actions sets from context).
 */
import { execSync } from "node:child_process";

const BASE = process.env.BASE_SHA || "origin/main";
const LABELS = (process.env.PR_LABELS || "").split(",").map((s) => s.trim());

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

let changed = [];
try {
  changed = sh(`git diff --name-only ${BASE}...HEAD`).split("\n").filter(Boolean);
} catch {
  console.log("check-visual-baseline-guard: no git history to diff — skipping.");
  process.exit(0);
}

const baselineTouched = changed.filter((f) => f.startsWith("tests/visual/baseline/"));
if (!baselineTouched.length) {
  console.log("✓ no baseline files changed");
  process.exit(0);
}

if (LABELS.includes("baseline-refresh")) {
  console.log(
    `✓ baseline-refresh label present — ${baselineTouched.length} baseline file(s) accepted`,
  );
  process.exit(0);
}

const changelogTouched = changed.includes("docs/visual-baseline-changelog.md");
if (!changelogTouched) {
  console.error(
    "✗ Visual baseline changed without a docs/visual-baseline-changelog.md entry and without the `baseline-refresh` label.",
  );
  console.error("  Files:");
  for (const f of baselineTouched) console.error(`   - ${f}`);
  console.error(
    "\n  Either add an explanation to docs/visual-baseline-changelog.md, or apply the `baseline-refresh` label.",
  );
  process.exit(1);
}

console.log(
  `✓ ${baselineTouched.length} baseline change(s) documented in docs/visual-baseline-changelog.md`,
);
