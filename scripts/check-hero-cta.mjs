#!/usr/bin/env node
/**
 * Hero CTA hygiene gate.
 * Locks the homepage hero to the assessment CTA and blocks any
 * re-introduction of cohort Apply CTAs / countdown badges.
 */
import fs from "node:fs";

const HERO = "src/components/landing/Hero.tsx";
const src = fs.readFileSync(HERO, "utf8");

const required = ["Check My Eligibility"];
const forbidden = [
  { pat: /NEXT_COHORT/, msg: "Hero must not depend on NEXT_COHORT (no cohort badge)" },
  { pat: /applications close in/i, msg: '"applications close in" countdown is banned in Hero' },
];

const errs = [];
for (const r of required) if (!src.includes(r)) errs.push(`missing required snippet: ${r}`);
for (const { pat, msg } of forbidden) if (pat.test(src)) errs.push(msg);

if (errs.length) {
  console.error("❌ Hero CTA gate failed:");
  for (const e of errs) console.error("   • " + e);
  process.exit(1);
}
console.log("✅ Hero CTA gate: assessment CTA present, no cohort-apply remnants.");
