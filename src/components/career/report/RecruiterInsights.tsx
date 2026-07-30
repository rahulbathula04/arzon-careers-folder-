/**
 * RecruiterInsights - shared block that surfaces two things a recruiter
 * scanning a candidate for a specific role cares about:
 *   1. "What recruiters liked" - 2–3 short bullets, framed as the recruiter
 *      reading THIS candidate against THIS role.
 *   2. Recruiter-toned skill tiers - the role's skills split into
 *      Must-have / Nice-to-have / Bonus, with tone-tinted chips.
 *
 * Used inside the primary-fit chapter and inside each Decision Helper tab
 * so the best match and every alternative all get the same recruiter lens.
 */
import { CheckCircle2, ThumbsUp, Sparkles } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPathFacts } from "@/data/careerPathEvidence";
import { REPORT_TONES, type ReportTone } from "./reportTones";
import { cn } from "@/lib/utils";

type Tier = "must" | "nice" | "bonus";

const TIER_LABEL: Record<Tier, string> = {
  must: "Must have",
  nice: "Nice to have",
  bonus: "Bonus",
};

const TIER_TONE: Record<Tier, ReportTone> = {
  must: "primary",
  nice: "secondary",
  bonus: "warn",
};

function buildRecruiterLikes(
  result: CareerEngineResult,
  slug: string,
  roleTitle: string,
): string[] {
  const drivers = result.evidence?.pathDrivers?.[slug] ?? result.evidence?.topDrivers ?? [];

  const likes: string[] = [];
  const seenTraits = new Set<string>();
  const role = roleTitle.toLowerCase();

  // Rotate through three phrasings so bullets don't read like a mail merge.
  const templates: Array<(trait: string, choice: string) => string> = [
    (trait, choice) => `${trait} - "${choice}" is exactly how a ${role} hire would answer this.`,
    (trait, choice) =>
      `${trait} - picking "${choice}" signals real ${role} instincts, not a guess.`,
    (trait, choice) =>
      `${trait} - "${choice}" lands the way recruiters expect from a ${role} candidate.`,
  ];

  for (const d of drivers) {
    if (likes.length >= 3) break;
    const trait = d.traitImpacts?.[0]?.trait;
    const choice = d.chosenLabel;
    if (!trait || !choice) continue;
    // One bullet per trait - otherwise "Detail orientation" repeats.
    if (seenTraits.has(trait)) continue;
    seenTraits.add(trait);
    const tmpl = templates[likes.length % templates.length];
    likes.push(tmpl(humanTrait(trait), truncate(choice, 60)));
  }

  // Fallback: keep the block useful even when drivers are thin.
  const fallbacks = [
    `Domain fluency - you use ${roleTitle.toLowerCase()} language naturally, not textbook phrasing.`,
    "Process discipline - recruiters read your answers as someone who thinks in checklists, not vibes.",
    "Coachability - you frame gaps as things to fix, not excuses to avoid.",
  ];
  for (const f of fallbacks) {
    if (likes.length >= 3) break;
    likes.push(f);
  }
  return likes.slice(0, 3);
}

function humanTrait(trait: string): string {
  const map: Record<string, string> = {
    detail: "Detail orientation",
    analytical: "Analytical thinking",
    communication: "Communication",
    empathy: "Empathy",
    ownership: "Ownership",
    resilience: "Resilience",
    curiosity: "Curiosity",
    structure: "Structured thinking",
  };
  return map[trait] ?? trait.charAt(0).toUpperCase() + trait.slice(1);
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function tierSkills(skills: string[]): { tier: Tier; skill: string }[] {
  const out: { tier: Tier; skill: string }[] = [];
  skills.forEach((s, i) => {
    const tier: Tier = i < 2 ? "must" : i < 4 ? "nice" : "bonus";
    out.push({ tier, skill: s });
  });
  return out;
}

export function RecruiterInsights({
  result,
  slug,
  roleTitle,
  tone = "primary",
}: {
  result: CareerEngineResult;
  slug: string;
  roleTitle: string;
  tone?: ReportTone;
}) {
  const facts = getPathFacts(slug);
  const skills = facts?.skills ?? [];
  if (skills.length === 0) return null;
  const likes = buildRecruiterLikes(result, slug, roleTitle);
  const tiered = tierSkills(skills);
  const t = REPORT_TONES[tone];

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {/* Recruiter likes */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          <ThumbsUp className={cn("h-3.5 w-3.5", t.iconFill)} aria-hidden />
          What recruiters liked
        </p>
        <ul className="mt-3 space-y-2">
          {likes.map((l, i) => (
            <li key={i} className="flex items-start gap-2 text-body-sm text-white/80">
              <CheckCircle2 className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", t.iconFill)} aria-hidden />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skill tiers */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          <Sparkles className={cn("h-3.5 w-3.5", t.iconFill)} aria-hidden />
          Recruiter skill tiers
        </p>
        <div className="mt-3 space-y-3">
          {(["must", "nice", "bonus"] as Tier[]).map((tier) => {
            const items = tiered.filter((x) => x.tier === tier);
            if (items.length === 0) return null;
            const tt = REPORT_TONES[TIER_TONE[tier]];
            return (
              <div key={tier}>
                <p
                  className={cn(
                    "font-mono text-[10px] font-semibold uppercase tracking-[0.22em]",
                    tt.eyebrow,
                  )}
                >
                  {TIER_LABEL[tier]}
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {items.map(({ skill }) => (
                    <li
                      key={skill}
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
                        tt.chipBorder,
                        tt.chipBg,
                        tt.chipText,
                      )}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecruiterInsights;
