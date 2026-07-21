#!/usr/bin/env node
/**
 * Scans supabase/migrations for risky RLS policies on write operations.
 *
 * Fails the check if any CREATE POLICY for INSERT / UPDATE / DELETE / ALL
 * uses a permissive `USING (true)` or `WITH CHECK (true)` clause.
 *
 * SELECT-only policies with USING (true) are allowed (public-read tables).
 *
 * Allowlist: prefix the policy with a SQL comment containing
 *   `-- rls-check: allow-true reason: <why>`
 * to intentionally skip a specific statement.
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
    files = readdirSync(MIG_DIR).filter((f) => f.endsWith(".sql"));
  } catch {
    return [];
  }
  return files.map((name) => ({
    name,
    path: join(MIG_DIR, name),
    sql: readFileSync(join(MIG_DIR, name), "utf8"),
  }));
}

// Capture each CREATE POLICY ... ; statement (greedy until first ;)
const POLICY_RE = /create\s+policy[\s\S]*?;/gi;

function lineOf(src, idx) {
  return src.slice(0, idx).split("\n").length;
}

function checkPolicy(stmt) {
  const lower = stmt.toLowerCase();
  // Determine command
  const forMatch = lower.match(/\bfor\s+(select|insert|update|delete|all)\b/);
  const cmd = forMatch ? forMatch[1] : "all"; // default in PG is ALL

  const issues = [];
  if (/\busing\s*\(\s*true\s*\)/i.test(stmt)) {
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
  const violations = [];

  for (const mig of migrations) {
    if (allowlist.has(mig.name)) continue;
    let m;
    POLICY_RE.lastIndex = 0;
    while ((m = POLICY_RE.exec(mig.sql)) !== null) {
      const stmt = m[0];
      // Look back ~200 chars for an allow tag comment
      const preceding = mig.sql.slice(Math.max(0, m.index - 240), m.index);
      if (preceding.includes(ALLOW_TAG)) continue;

      const issues = checkPolicy(stmt);
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
    console.log(`✅ RLS policy check passed (${migrations.length} migrations scanned).`);
    process.exit(0);
  }

  console.error(`❌ Found ${violations.length} risky RLS policy(ies):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    for (const i of v.issues) console.error(`    - ${i}`);
    console.error(`    ${v.snippet.replace(/\n/g, "\n    ")}\n`);
  }
  console.error(
    `Fix: scope writes with auth.uid()/has_role()/column predicates, or add a\n` +
      `comment "-- ${ALLOW_TAG} reason: <why>" immediately above the policy if\n` +
      `the permissive write is genuinely intentional.`,
  );
  process.exit(1);
}

run();
