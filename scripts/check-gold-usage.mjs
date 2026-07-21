#!/usr/bin/env node
/**
 * Gold-usage guard. Gold (--accent-premium / historical `bg-gold` class)
 * is reserved for Prime60 / premium launch surfaces. Every other CTA must
 * use the teal `--cta-*` tokens.
 *
 * Run: node scripts/check-gold-usage.mjs
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const ALLOWLIST = new Set([
  "src/styles.css",
  "src/components/landing/CTAButton.tsx",
  "src/lib/design-tokens.ts",
  "scripts/check-gold-usage.mjs",
  // Prime60 surfaces — premium accent is intentional here.
  "src/components/Prime60WaitlistForm.tsx",
  "src/components/Prime60Countdown.tsx",
  "src/routes/admin.arzonprime60.tsx",
]);

// Only the BRAND gold token (literal `-gold` classes and brand-gold hexes).
// Amber/yellow are legitimate semantic warning colors and stay untouched.
const PATTERNS = [
  "bg-gold(/|\\b|\\s|\"|')",
  "text-gold(/|\\b|\\s|\"|')",
  "border-gold(/|\\b|\\s|\"|')",
  "ring-gold(/|\\b|\\s|\"|')",
  "from-gold(/|\\b|\\s|\"|')",
  "to-gold(/|\\b|\\s|\"|')",
  "via-gold(/|\\b|\\s|\"|')",
  "#c9a84c",
  "#e6c97a",
  "#1A1300",
];
const PATTERN = PATTERNS.join("|");

const res = spawnSync(
  "rg",
  [
    "-n",
    "--hidden",
    "-g",
    "!node_modules",
    "-g",
    "!dist",
    "-g",
    "*.{ts,tsx,css}",
    PATTERN,
    "src",
    "scripts",
  ],
  { encoding: "utf8" },
);
const out = res.stdout ?? "";

const violations = out
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [file] = line.split(":");
    return { file, line };
  })
  .filter(({ file }) => !ALLOWLIST.has(file));

if (violations.length) {
  const strict = process.env.STRICT === "1";
  const label = strict ? "✗" : "⚠";
  console[strict ? "error" : "warn"](
    `${label} ${violations.length} gold-usage occurrences ` +
      `(brand gold = teal alias today; migrate to --cta-* tokens or add to ALLOWLIST):\n`,
  );
  for (const v of violations) console[strict ? "error" : "warn"]("  " + v.line);
  if (strict) process.exit(1);
  console.log("\n(Non-strict mode: not failing. Re-run with STRICT=1 to enforce.)");
  process.exit(0);
}
console.log("✓ Gold usage clean — premium accent stays scoped to allowlisted surfaces.");
