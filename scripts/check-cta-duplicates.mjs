#!/usr/bin/env node
/**
 * Component-duplication guard for CTA/Button primitives.
 *
 * Fails if any file whose name matches the CTA/Button pattern lives outside
 * the approved allow-list. The point is to keep the site's CTAs funnelling
 * through a single primitive (src/components/ui/button.tsx + CTAButton
 * wrapper) instead of proliferating HeroButton / FinalCTAButton / etc.
 */
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ALLOW = new Set([
  "src/components/ui/button.tsx",
  "src/components/landing/CTAButton.tsx",
  "src/components/landing/PageCTA.tsx", // page-header CTA lockup
  "src/components/landing/FinalCTA.tsx", // marketing final-CTA section
  "src/components/landing/StickyMobileCTA.tsx", // mobile-only shell
  "src/components/landing/MobileWhatsAppFAB.tsx",
  "src/components/site/MobileStickyCTA.tsx",
  "src/components/common/WhatsAppLink.tsx",
  "src/components/career/v2/StickyResultCta.tsx", // career-engine result rail
  "src/components/career/report/StickyNextActionCta.tsx", // chapter-aware next-action pill in report
]);

const PATTERN = /(Hero|Final|Page|Sticky|Primary|Secondary|Ghost|Cta|CTA).*(Cta|CTA|Button)\.tsx$/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (PATTERN.test(name)) out.push(p);
  }
  return out;
}

const found = walk("src");
const offenders = found.filter((f) => !ALLOW.has(f.replace(/\\/g, "/")));

if (offenders.length === 0) {
  console.log(`✅ CTA-duplication guard: ${found.length} CTA/Button file(s) all in allow-list.`);
  process.exit(0);
}

console.error(
  "❌ CTA-duplication guard FAILED — new CTA/Button component(s) outside the allow-list:",
);
for (const f of offenders) console.error("   • " + f);
console.error("\nFix: fold the new component into src/components/ui/button.tsx (variants) or");
console.error("src/components/landing/CTAButton.tsx (analytics wrapper). If this file is");
console.error(
  "intentional and cannot be folded, add it to ALLOW in scripts/check-cta-duplicates.mjs.",
);
process.exit(1);
