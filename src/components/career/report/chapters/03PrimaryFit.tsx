import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { getPathFacts } from "@/data/careerPathEvidence";
import { familyForPathSlug, eligibilityFitForCourse } from "@/data/careerFamilies";
import { ReportCard } from "../ReportCard";
import { JDOverlapBar } from "../JDOverlapBar";
import { EvidencePill } from "../EvidencePill";
import { bandForScore } from "../ScoreChip";
import { REPORT_TONES } from "../reportTones";
import { RecruiterInsights } from "../RecruiterInsights";
import { cn } from "@/lib/utils";
import { Scale, Briefcase } from "lucide-react";

export function ChapterPrimaryFit({
  result,
  slug,
  chapter,
  tone = "primary",
  eyebrow,
}: {
  result: CareerEngineResult;
  slug: string;
  chapter: number;
  tone?: "primary" | "secondary";
  eyebrow?: string;
}) {
  const path = PATHS[slug];
  if (!path) return null;
  const facts = getPathFacts(slug);
  const family = familyForPathSlug(slug);
  const fit = result.evidence?.scoring?.topPathFits?.find((p) => p.slug === slug)?.fit ?? 0;
  const drivers = (result.evidence?.pathDrivers?.[slug] ?? result.evidence?.topDrivers ?? []).slice(
    0,
    4,
  );
  const eligibility = family ? eligibilityFitForCourse(family, result.profile?.course) : null;
  const jdCount = facts?.evidence?.jdCount ?? 0;
  const matched = drivers.length;
  const total = 6;

  const eyebrowText = eyebrow ?? `Primary fit${family ? ` · ${family.name}` : ""}`;
  const dayTasks = facts?.skills?.slice(0, 4) ?? [];

  return (
    <ReportCard
      id={`ch-${chapter}-fit-${slug}`}
      chapter={chapter}
      eyebrow={eyebrowText}
      tone={tone}
      title={path.title}
      subtitle={path.blurb}
      score={{ value: fit, band: bandForScore(fit), suffix: "fit" }}
    >
      {eligibility &&
        eligibility.tier !== "unknown" &&
        (() => {
          const toneKey =
            eligibility.tier === "required"
              ? "secondary"
              : eligibility.tier === "preferred"
                ? "primary"
                : "ruled-out";
          const t = REPORT_TONES[toneKey];
          return (
            <div
              className={cn(
                "mb-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
                t.chipBorder,
                t.chipBg,
                t.chipText,
              )}
            >
              <Scale className="h-3 w-3" /> Eligibility · {eligibility.note}
            </div>
          );
        })()}

      {jdCount > 0 && (
        <JDOverlapBar
          filled={matched}
          of={total}
          caption={`Matched against ${jdCount} live Indian JDs posted ${facts?.evidence?.windowStart} – ${facts?.evidence?.windowEnd}.`}
        />
      )}

      {drivers.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {drivers.slice(0, 4).map((d, i) => (
            <EvidencePill
              key={i}
              label={d.chosenLabel}
              signal={d.traitImpacts[0]?.trait ?? "fit"}
              delta={
                d.pathImpacts?.find((p) => p.slug === slug)?.delta ?? d.pathImpacts?.[0]?.delta
              }
            />
          ))}
        </ul>
      )}

      {dayTasks.length > 0 && (
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <Briefcase className="h-3 w-3" /> A typical day looks like
          </p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {dayTasks.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-white/75">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      <RecruiterInsights result={result} slug={slug} roleTitle={path.title} tone={tone} />
    </ReportCard>
  );
}

export default ChapterPrimaryFit;
