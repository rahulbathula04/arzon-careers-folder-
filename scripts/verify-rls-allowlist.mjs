#!/usr/bin/env node
/**
 * Verifies every entry in scripts/.rls-check-allowlist is genuinely
 * historical: each CREATE POLICY in an allowlisted migration must be
 * superseded (DROP POLICY or CREATE POLICY with the same name on the
 * same table) by a later migration.
 *
 * Fails the build if an allowlisted migration still defines an active
 * permissive policy that no later migration overrides.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const MIG_DIR = "supabase/migrations";
const ALLOWLIST_FILE = "scripts/.rls-check-allowlist";

function loadAllowlist() {
  if (!existsSync(ALLOWLIST_FILE)) return [];
  return readFileSync(ALLOWLIST_FILE, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function loadMigrations() {
  return readdirSync(MIG_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((name) => ({
      name,
      sql: readFileSync(join(MIG_DIR, name), "utf8"),
    }));
}

// Match a full CREATE POLICY ... ; statement so we can inspect its body.
const CREATE_FULL_RE = /create\s+policy\s+"([^"]+)"\s+on\s+([a-z0-9_."]+)[\s\S]*?;/gi;
const CREATE_HEAD_RE = /create\s+policy\s+"([^"]+)"\s+on\s+([a-z0-9_."]+)/gi;
const DROP_RE = /drop\s+policy\s+(?:if\s+exists\s+)?"([^"]+)"\s+on\s+([a-z0-9_."]+)/gi;

function normalizeTable(t) {
  return t.replace(/"/g, "").toLowerCase();
}

function extractPolicies(sql, regex) {
  const out = [];
  regex.lastIndex = 0;
  let m;
  while ((m = regex.exec(sql)) !== null) {
    out.push({ policy: m[1], table: normalizeTable(m[2]) });
  }
  return out;
}

// Only flag policies that the prebuild RLS check would actually reject:
// permissive write policies using USING(true) / WITH CHECK(true).
function extractRiskyWritePolicies(sql) {
  const out = [];
  CREATE_FULL_RE.lastIndex = 0;
  let m;
  while ((m = CREATE_FULL_RE.exec(sql)) !== null) {
    const stmt = m[0];
    const lower = stmt.toLowerCase();
    const forMatch = lower.match(/\bfor\s+(select|insert|update|delete|all)\b/);
    const cmd = forMatch ? forMatch[1] : "all";
    if (cmd === "select") continue;
    const usingTrue = /\busing\s*\(\s*true\s*\)/i.test(stmt);
    const checkTrue = /\bwith\s+check\s*\(\s*true\s*\)/i.test(stmt);
    if (!usingTrue && !checkTrue) continue;
    out.push({ policy: m[1], table: normalizeTable(m[2]) });
  }
  return out;
}

function run() {
  const allowlist = loadAllowlist();
  if (allowlist.length === 0) {
    console.log("✅ Allowlist is empty - nothing to verify.");
    process.exit(0);
  }

  const migrations = loadMigrations();
  const indexByName = new Map(migrations.map((m, i) => [m.name, i]));
  const problems = [];
  const missingFiles = [];

  for (const allowedName of allowlist) {
    const idx = indexByName.get(allowedName);
    if (idx === undefined) {
      missingFiles.push(allowedName);
      continue;
    }

    const allowed = migrations[idx];
    const allowedPolicies = extractRiskyWritePolicies(allowed.sql);
    if (allowedPolicies.length === 0) continue;

    // Aggregate every drop/create from migrations that come AFTER this one.
    const laterDrops = [];
    const laterCreates = [];
    for (let i = idx + 1; i < migrations.length; i++) {
      laterDrops.push(...extractPolicies(migrations[i].sql, DROP_RE));
      laterCreates.push(...extractPolicies(migrations[i].sql, CREATE_HEAD_RE));
    }

    const isSuperseded = (p) =>
      laterDrops.some((d) => d.policy === p.policy && d.table === p.table) ||
      laterCreates.some((c) => c.policy === p.policy && c.table === p.table);

    const stillActive = allowedPolicies.filter((p) => !isSuperseded(p));
    if (stillActive.length > 0) {
      problems.push({ file: allowedName, policies: stillActive });
    }
  }

  let failed = false;

  if (missingFiles.length > 0) {
    failed = true;
    console.error("❌ Allowlist references migrations that no longer exist:");
    for (const f of missingFiles) console.error(`   - ${f}`);
    console.error("");
  }

  if (problems.length > 0) {
    failed = true;
    console.error("❌ Allowlisted migrations still define ACTIVE permissive policies:\n");
    for (const p of problems) {
      console.error(`  ${p.file}`);
      for (const pol of p.policies) {
        console.error(`    - "${pol.policy}" on ${pol.table}`);
      }
      console.error("");
    }
    console.error(
      "Fix: add a new migration that DROPs each policy listed above and\n" +
        "recreates it with a scoped predicate (auth.uid(), has_role(),\n" +
        "or column-based check). Only then is the allowlist entry valid.",
    );
  }

  if (failed) process.exit(1);

  console.log(
    `✅ Allowlist verified (${allowlist.length} entr${
      allowlist.length === 1 ? "y" : "ies"
    }, all superseded).`,
  );
}

run();
