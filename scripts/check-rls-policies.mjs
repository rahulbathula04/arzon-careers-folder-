#!/usr/bin/env node
/**
 * Scans supabase/migrations for risky RLS policies on write operations.
 *
 * Fails the check if any CREATE POLICY for INSERT / UPDATE / DELETE / ALL
 * uses a permissive `USING (true)` or `WITH CHECK (true)` clause — unless:
 *
 *   1. A later migration drops the policy via `DROP POLICY … ON <table>`
 *      (tombstone-aware: the checker does a global pre-pass to build the
 *      index of all dropped policies before evaluating violations).
 *   2. The policy is preceded (within 240 chars) by an allow-tag comment:
 *        -- rls-check: allow-true reason: <why>
 *   3. The migration filename is listed in scripts/.rls-check-allowlist
 *
 * SELECT-only policies with USING (true) are NOT flagged — public-read
 * tables are a valid design choice; the real risk is unrestricted writes.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const MIG_DIR = "supabase/migrations";
const ALLOW_TAG = "rls-check: allow-true";
const ALLOWLIST_FILE = "scripts/.rls-check-allowlist";

function loadAllowlist() {
  if (!existsSync(ALLOWLIST_FILE)) return new Set();
  return new Set(
    readFileSync(ALLOWLIST_FILE, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#")),
  );
}

function loadMigrations() {
  let files = [];
  try {
    files = readdirSync(MIG_DIR).filter((f) => f.endsWith(".sql")).sort();
  } catch {
    return [];
  }
  return files.map((name) => ({
    name,
    sql: readFileSync(join(MIG_DIR, name), "utf8"),
  }));
}

// ---------------------------------------------------------------------------
// PASS 1 — Build a global tombstone index from every DROP POLICY statement.
// Key: "normalised policy name::tablename". A policy that is ever dropped in
// any migration is considered superseded and will not be flagged.
// ---------------------------------------------------------------------------
const DROP_RE =
  /drop\s+policy\s+(?:if\s+exists\s+)?["']([^"']+)["']\s+on\s+(?:public\.)?(\w+)/gi;

function buildTombstones(migrations) {
  const tombstones = new Set();
  for (const { sql } of migrations) {
    let m;
    DROP_RE.lastIndex = 0;
    while ((m = DROP_RE.exec(sql)) !== null) {
      tombstones.add(`${m[1].toLowerCase()}::${m[2].toLowerCase()}`);
    }
  }
  return tombstones;
}

// ---------------------------------------------------------------------------
// PASS 2 — Scan CREATE POLICY statements and flag genuine violations.
// ---------------------------------------------------------------------------
const CREATE_RE = /create\s+policy\s+["']([^"']+)["'][\s\S]*?;/gi;
const ON_TABLE_RE = /\bon\s+(?:public\.)?(\w+)\b/i;

function lineOf(src, idx) {
  return src.slice(0, idx).split("\n").length;
}

function getIssues(stmt) {
  const lower = stmt.toLowerCase();
  const forMatch = lower.match(/\bfor\s+(select|insert|update|delete|all)\b/);
  const cmd = forMatch ? forMatch[1] : "all";

  const issues = [];
  // USING(true) on anything except a pure SELECT is risky
  if (/\busing\s*\(\s*true\s*\)/i.test(stmt) && cmd !== "select") {
    issues.push(`USING (true) on ${cmd.toUpperCase()}`);
  }
  if (/\bwith\s+check\s*\(\s*true\s*\)/i.test(stmt)) {
    issues.push(`WITH CHECK (true) on ${cmd.toUpperCase()}`);
  }
  return issues.length ? issues : null;
}

function run() {
  const migrations = loadMigrations();
  const allowlist = loadAllowlist();
  const tombstones = buildTombstones(migrations); // global pre-pass
  const violations = [];

  for (const mig of migrations) {
    if (allowlist.has(mig.name)) continue;

    let m;
    CREATE_RE.lastIndex = 0;
    while ((m = CREATE_RE.exec(mig.sql)) !== null) {
      const stmt = m[0];
      const policyName = m[1]; // captured group 1 = the quoted policy name

      // 1. Tombstone check — was this policy dropped by any migration?
      const tableMatch = stmt.match(ON_TABLE_RE);
      if (tableMatch) {
        const key = `${policyName.toLowerCase()}::${tableMatch[1].toLowerCase()}`;
        if (tombstones.has(key)) continue; // superseded — safe
      }

      // 2. Allow-tag — explicit opt-out comment immediately above the policy
      const preceding = mig.sql.slice(Math.max(0, m.index - 240), m.index);
      if (preceding.includes(ALLOW_TAG)) continue;

      const issues = getIssues(stmt);
      if (issues) {
        violations.push({
          file: mig.name,
          line: lineOf(mig.sql, m.index),
          issues,
          snippet: stmt.split("\n").slice(0, 3).join("\n"),
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log(
      `✅ RLS policy check passed (${migrations.length} migrations scanned, tombstone-aware).`,
    );
    process.exit(0);
  }

  console.error(`❌ Found ${violations.length} risky RLS policy(ies):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    for (const i of v.issues) console.error(`    - ${i}`);
    console.error(`    ${v.snippet.replace(/\n/g, "\n    ")}\n`);
  }
  console.error(
    `Fix: scope writes with auth.uid()/has_role()/column predicates, or add\n` +
      `  "-- ${ALLOW_TAG} reason: <why>"\n` +
      `above the policy if the permissive write is genuinely intentional.`,
  );
  process.exit(1);
}

run();
