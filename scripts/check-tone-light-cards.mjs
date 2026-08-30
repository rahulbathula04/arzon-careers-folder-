#!/usr/bin/env node
/**
 * Light surfaces (bg-white, card-light, etc.) rendered inside the global
 * `.tone-dark` shell must explicitly opt out of the dark colour cascade,
 * otherwise body copy inherits white-on-white and disappears.
 *
 * The CSS `:not(.card-light *, .card-light, .tone-light *, .tone-light)`
 * guard in src/styles.css covers everything tagged `card-light` or
 * `tone-light`. This linter enforces: any JSX node with a `bg-white`
 * (or `bg-[#fff…]`) className must also include `tone-light` or
 * `card-light` in that same className expression.
 *
 * Files inside src/components/{apply,career,learn,admin}/ and
 * src/routes/{apply,career,learn,admin,enrol}.* are exempt - those
 * route shells render outside or on top of the marketing dark backdrop.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/components", "src/routes"];
const EXEMPT_PATH = /\/(apply|career|learn|admin|enrol)[/.]/;
const EXEMPT_FILES = new Set(["src/routes/admin.seo.tsx", "src/routes/republic.tsx"]);

// Baseline snapshot - files that already contain bg-white surfaces without
// a tone-light/card-light guard at the time this lint was introduced.
// Goal: stop the bleed (new files must be clean) without forcing a
// 38-file mass refactor in a single PR. Drop files from this set as we
// migrate them.
const BASELINE = new Set([
  "src/components/acri/BandLadder.tsx",
  "src/components/acri/TraitDimensionMap.tsx",
  "src/components/briefing/BriefingPackForm.tsx",
  "src/components/courses/Certificate.tsx",
  "src/components/courses/CourseGrid.tsx",
  "src/components/courses/EnquiryForm.tsx",
  "src/components/credibility/JDMirror.tsx",
  "src/components/landing/ApplicationForm.tsx",
  "src/components/landing/CertificateShowcase.tsx",
  "src/components/landing/CertificateVerifyMini.tsx",
  "src/components/landing/CohortVoices.tsx",
  "src/components/landing/CounsellorLeadForm.tsx",
  "src/components/landing/FAQ.tsx",
  "src/components/landing/BentoProgrammes.tsx",
  "src/components/landing/CredibilityStrip.tsx",
  "src/components/landing/FinalCTA.tsx",
  "src/components/landing/Footer.tsx",
  "src/components/landing/Hero.tsx",
  "src/components/landing/HowItWorks.tsx",
  "src/components/landing/Nav.tsx",
  "src/components/landing/RecruiterOutcomes.tsx",
  "src/components/landing/StudentQuestionBank.tsx",
  "src/components/landing/TrustLedgerStrip.tsx",
  "src/components/recruiters/ArtifactRequestLane.tsx",
  "src/components/recruiters/CandidatePortfolio.tsx",
  "src/components/recruiters/GradingRubricTable.tsx",
  "src/components/recruiters/WorkSampleCard.tsx",
  "src/components/tpos/BatchOutcomeStrip.tsx",
  "src/components/tpos/CounsellorLanes.tsx",
  "src/components/track/TrackDomainGrid.tsx",
  "src/routes/acri.tsx",
  "src/routes/build.$slug.tsx",
  "src/routes/build.index.tsx",
  "src/routes/build.request.tsx",
  "src/routes/career-engine.result.tsx",
  "src/routes/courses.$slug.tsx",
  "src/routes/courses.index.tsx",
  "src/routes/curriculum.tsx",
  "src/routes/deployment-model.tsx",
  "src/routes/jd-mirror.tsx",
  "src/routes/r.$id.brief.tsx",
  "src/routes/r.artifact.$token.tsx",
  "src/routes/recruiters.tsx",
  "src/routes/tpos.tsx",
  "src/routes/healthcare-career-workshop.tsx",
  "src/routes/pv-associate.tsx",
  "src/routes/placements.tsx",
  "src/routes/verify.tsx",
  "src/routes/why-arzon.tsx",
  "src/routes/about.tsx",
  "src/routes/contact.tsx",
  "src/routes/career-engine.start.tsx",
  "src/components/landing/ExitIntentQuiz.tsx",
  "src/components/landing/FinalHeroOfferCTA.tsx",
]);

/** Walk a dir, yielding .tsx files. */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) yield* walk(full);
    else if (/\.tsx?$/.test(name)) yield full;
  }
}

// Find every className="..." or className={`...`} string and check it.
const CLASS_RE = /className\s*=\s*(?:"([^"]+)"|\{`([^`]+)`\}|\{"([^"]+)"\})/g;

/**
 * Returns true if `cls` is a bg-white surface that is MISSING the
 * `tone-light` / `card-light` guard. Exported-ish for the self-test below.
 */
function isUnguardedBgWhite(cls) {
  const hasBgWhite =
    /(?:^|\s)bg-white(?=\s|$)/.test(cls) || /(?:^|\s)bg-\[#(?:fff|ffffff)\](?=\s|$)/i.test(cls);
  if (!hasBgWhite) return false;
  const hasGuard = /\b(tone-light|card-light)\b/.test(cls);
  return !hasGuard;
}

// ---------------------------------------------------------------------------
// Self-test: guarantees the detector itself doesn't silently regress. Runs on
// every invocation; a broken detector fails the build before it can miss real
// offenders (e.g. TaskLogo bg-white → tone-dark cascade → white-on-white).
// ---------------------------------------------------------------------------
const SELF_TESTS = [
  { cls: "inline-flex bg-white rounded-sm", expect: true, label: "raw bg-white → flag" },
  { cls: "tone-light inline-flex bg-white", expect: false, label: "bg-white + tone-light → pass" },
  { cls: "card-light bg-white p-4", expect: false, label: "bg-white + card-light → pass" },
  { cls: "bg-[#fff] p-2", expect: true, label: "bg-[#fff] → flag" },
  { cls: "tone-light bg-[#ffffff] p-2", expect: false, label: "bg-[#ffffff] + tone-light → pass" },
  { cls: "bg-white/10 border", expect: false, label: "translucent bg-white/10 → skip" },
  { cls: "flex text-slate-900", expect: false, label: "no bg-white → skip" },
];
for (const t of SELF_TESTS) {
  const got = isUnguardedBgWhite(t.cls);
  if (got !== t.expect) {
    console.error(
      `❌ tone-light guard self-test regressed: ${t.label}\n   input: "${t.cls}"\n   expected ${t.expect}, got ${got}`,
    );
    process.exit(1);
  }
}

const findings = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (EXEMPT_PATH.test("/" + rel)) continue;
    if (EXEMPT_FILES.has(rel)) continue;
    const src = readFileSync(file, "utf8");
    let m;
    while ((m = CLASS_RE.exec(src)) !== null) {
      const cls = m[1] ?? m[2] ?? m[3] ?? "";
      // Solid white surface only - skip translucent overlays like
      // bg-white/5, bg-white/[0.04], bg-white/15 that sit on dark cards.
      if (!isUnguardedBgWhite(cls)) continue;
      // Find line number of this match
      const line = src.slice(0, m.index).split("\n").length;
      findings.push({ file: rel, line, snippet: cls.slice(0, 80) });
    }
  }
}

const fresh = findings.filter((f) => !BASELINE.has(f.file));
const inBaseline = findings.length - fresh.length;

if (fresh.length === 0) {
  console.log(
    "✅ tone-light/card-light guard present on every bg-white surface in marketing tree.",
  );
  if (inBaseline > 0) {
    console.log(
      `   (${inBaseline} pre-existing occurrence(s) tracked in BASELINE - migrate over time.)`,
    );
  }
  process.exit(0);
}

console.error(`❌ ${fresh.length} new bg-white surface(s) missing tone-light/card-light guard:`);
for (const f of fresh) {
  console.error(`   • ${f.file}:${f.line}  ${f.snippet}…`);
}
console.error("");
console.error("Fix: add `tone-light` (or `card-light`) to the className so .tone-dark");
console.error("     colour overrides don't bleach the body copy. If the file legitimately");
console.error("     renders outside the dark shell, add it to EXEMPT_FILES in this script.");
process.exit(1);
