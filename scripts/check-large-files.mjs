#!/usr/bin/env node
/**
 * Fails when the working tree (or a `--staged` diff) contains files that
 * would break GitHub sync:
 *   - any tracked file larger than 100 MB (GitHub's hard blob limit)
 *   - any file whose basename appears in BANNED_FILENAMES (assets we've
 *     deliberately purged; must never reappear).
 *
 * Usage:
 *   node scripts/check-large-files.mjs            # scan whole working tree
 *   node scripts/check-large-files.mjs --staged   # scan `git diff --cached`
 *   node scripts/check-large-files.mjs --range=A..B  # scan a commit range
 *
 * Exit codes: 0 clean, 1 offender found.
 */
import { execSync } from "node:child_process";
import { statSync, existsSync } from "node:fs";
import { basename } from "node:path";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB - GitHub blob hard limit
const WARN_BYTES = 50 * 1024 * 1024; // 50 MB - GitHub warning threshold

const BANNED_FILENAMES = new Set([
  "intro.mp4",
  "task-inauguration.mp4",
  "task-inauguration-720p.mp4",
]);

const BANNED_EXTS_FOR_STAGED = new Set([".mp4", ".mov", ".webm", ".mkv", ".avi"]);

const args = new Set(process.argv.slice(2));
const staged = args.has("--staged");
const rangeArg = [...args].find((a) => a.startsWith("--range="));
const range = rangeArg ? rangeArg.slice("--range=".length) : null;

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

function listFiles() {
  if (range) {
    // Files changed in the range (added/copied/modified/renamed).
    return sh(`git diff --name-only --diff-filter=ACMR ${range}`).split("\n").filter(Boolean);
  }
  if (staged) {
    return sh("git diff --name-only --cached --diff-filter=ACMR").split("\n").filter(Boolean);
  }
  return sh("git ls-files").split("\n").filter(Boolean);
}

const offenders = [];
const warnings = [];
const bannedHits = [];
const videoWarn = [];

for (const file of listFiles()) {
  if (!existsSync(file)) continue;
  const s = statSync(file);
  if (!s.isFile()) continue;

  const name = basename(file);
  if (BANNED_FILENAMES.has(name)) {
    bannedHits.push(file);
  }

  if (s.size > MAX_BYTES) {
    offenders.push({ file, size: s.size });
  } else if (s.size > WARN_BYTES) {
    warnings.push({ file, size: s.size });
  }

  if (staged) {
    const ext = "." + name.split(".").pop().toLowerCase();
    if (BANNED_EXTS_FOR_STAGED.has(ext) && s.size > 10 * 1024 * 1024) {
      videoWarn.push({ file, size: s.size });
    }
  }
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
let failed = false;

if (offenders.length) {
  failed = true;
  console.error("\n✗ Files over GitHub's 100 MB blob limit:\n");
  for (const o of offenders) console.error(`  ${o.file}  ${mb(o.size)}`);
  console.error(
    "\n  Move these to CDN with lovable-assets (see .agents/skills/migrate-to-assets)",
    "\n  or delete them. GitHub will refuse to sync a repo that contains any",
    "\n  blob > 100 MB, even if the blob only exists in old history.\n",
  );
}

if (bannedHits.length) {
  failed = true;
  console.error("\n✗ Banned filenames reintroduced:\n");
  for (const f of bannedHits) console.error(`  ${f}`);
  console.error(
    "\n  These filenames were purged intentionally and must not come back.",
    "\n  Edit scripts/check-large-files.mjs to change the ban list.\n",
  );
}

if (videoWarn.length) {
  failed = true;
  console.error("\n✗ Large video binary staged for commit:\n");
  for (const v of videoWarn) console.error(`  ${v.file}  ${mb(v.size)}`);
  console.error(
    "\n  Videos > 10 MB must live on a CDN, not in git.",
    "\n  Upload with:  lovable-assets create --file <path> > <path>.asset.json",
    "\n  Then remove the binary and reference the CDN URL from code.",
    "\n  Set LOVABLE_ALLOW_VIDEO=1 to bypass once.\n",
  );
  if (process.env.LOVABLE_ALLOW_VIDEO === "1") {
    console.error("  LOVABLE_ALLOW_VIDEO=1 set - video block bypassed.\n");
    // Not clearing `failed` unless *only* video warnings triggered it.
    if (!offenders.length && !bannedHits.length) failed = false;
  }
}

if (warnings.length) {
  console.warn("\n⚠ Files over 50 MB (still under GitHub's hard limit):\n");
  for (const w of warnings) console.warn(`  ${w.file}  ${mb(w.size)}`);
  console.warn("");
}

if (failed) process.exit(1);
console.log("✓ large-file check passed");
