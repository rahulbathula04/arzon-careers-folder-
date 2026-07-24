import { useState } from "react";
import type { CareerEngineResult, PathDef } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { getPathFacts, type CareerPathFacts } from "@/data/careerPathEvidence";
import { ReportCard } from "../ReportCard";
import { bandForScore } from "../ScoreChip";
import { BandMeter } from "../BandMeter";
import { Clock, TrendingUp, Zap, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { REPORT_TONES } from "../reportTones";
import { RecruiterInsights } from "../RecruiterInsights";

type TopRow = {
  slug: string;
  path: PathDef;
  facts: CareerPathFacts | null;
  fit: number;
};

function deriveTradeOff(row: TopRow, all: TopRow[]): string {
  const entryMax = row.facts?.salary?.entry?.max ?? 0;
  const allSalaries = all.map((r) => r.facts?.salary?.entry?.max ?? 0);
  const maxSalary = Math.max(...allSalaries);
  const minSalary = Math.min(...allSalaries);

  const allFits = all.map((r) => r.fit);
  const maxFit = Math.max(...allFits);

  const jdCount = row.facts?.evidence?.jdCount ?? 0;
  const allJd = all.map((r) => r.facts?.evidence?.jdCount ?? 0);
  const maxJd = Math.max(...allJd);

  const isHighestFit = row.fit === maxFit && allFits.filter((f) => f === maxFit).length === 1;
  const isHighestSalary =
    entryMax > 0 &&
    entryMax === maxSalary &&
    allSalaries.filter((s) => s === maxSalary).length === 1;
  const isLowestSalary =
    entryMax > 0 &&
    entryMax === minSalary &&
    allSalaries.filter((s) => s === minSalary).length === 1;
  const isMostJds =
    jdCount > 0 && jdCount === maxJd && allJd.filter((j) => j === maxJd).length === 1;

  if (isHighestFit) {
    if (isLowestSalary)
      return "Best match to your strengths, but lower starting pay than the others.";
    if (row.facts?.aiRisk === "High")
      return "Best match to your strengths, but higher automation exposure.";
    return "Best match to your strengths — your traits align most naturally here.";
  }

  if (isHighestSalary) {
    return "Highest starting pay, but steeper learning curve to break in.";
  }

  if (isMostJds) {
    return "Most established hiring pipeline, but more competitive entry.";
  }

  if (row.facts?.demandIndia === "High" && row.facts?.aiRisk !== "Low") {
    return "Strong demand right now, but watch automation trends.";
  }
  if (row.facts?.demandIndia === "High") {
    return "Strong demand with low automation risk — a stable entry.";
  }
  if (row.facts?.aiRisk === "High") {
    return "Exciting growth path, but automation is changing the role fast.";
  }

  return "Solid alternative with a different mix of pay, pace, and prep.";
}

/**
 * ChapterDecisionHelper — tabbed compare of the top-3 fits so the user can
 * actually read them. Previously rendered three squished columns that
 * character-wrapped on a laptop viewport.
 */
export function ChapterDecisionHelper({
  result,
  slugs,
  chapter,
}: {
  result: CareerEngineResult;
  slugs: string[];
  chapter: number;
}) {
  const top = slugs
    .map((slug) => {
      const path = PATHS[slug];
      const facts = getPathFacts(slug);
      const fit = result.evidence?.scoring?.topPathFits?.find((p) => p.slug === slug)?.fit ?? 0;
      if (!path) return null;
      return { slug, path, facts, fit } as {
        slug: string;
        path: PathDef;
        facts: CareerPathFacts | null;
        fit: number;
      };
    })
    .filter(
      (
        x,
      ): x is {
        slug: string;
        path: PathDef;
        facts: CareerPathFacts | null;
        fit: number;
      } => Boolean(x),
    )
    .slice(0, 3);

  const [activeIdx, setActiveIdx] = useState(0);
  if (top.length < 2) return null;

  const active = top[Math.min(activeIdx, top.length - 1)];
  const activeSalary = active.facts?.salary?.entry;
  const activeJd = active.facts?.evidence?.jdCount ?? 0;
  const activeTime =
    activeJd >= 200 ? "8–12 weeks" : activeJd >= 100 ? "10–16 weeks" : "12–20 weeks";
  const activeEffort = active.fit >= 65 ? "Moderate" : active.fit >= 50 ? "Focused" : "Heavy";
  const activeSalaryLabel = activeSalary
    ? `₹${activeSalary.min}–${activeSalary.max} LPA`
    : "Emerging band";

  return (
    <ReportCard
      id={`ch-${chapter}-decision`}
      chapter={chapter}
      eyebrow="Decision helper"
      tone="primary"
      title="Which of your top matches should you actually pick?"
      subtitle="Salary is not the only axis. Effort and time-to-first-job matter just as much for a first role."
      whatThisMeans="If you pick the wrong trade-off between money, effort and speed, you'll burn six months on the wrong role — this is how to avoid that."
    >
      <div
        role="tablist"
        aria-label="Compare your top matches"
        className="glass-panel-deep flex flex-wrap gap-2 rounded-2xl p-1.5"
      >
        {top.map((row, idx) => {
          const isActive = idx === activeIdx;
          const rowBand = bandForScore(row.fit);
          const chipTone =
            rowBand === "strong"
              ? REPORT_TONES.secondary
              : rowBand === "recommended"
                ? REPORT_TONES.primary
                : rowBand === "watch"
                  ? REPORT_TONES.warn
                  : REPORT_TONES["ruled-out"];
          const chipClass = `${chipTone.chipPillBg} ${chipTone.chipPillText}`;
          return (
            <button
              key={row.slug}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "flex min-w-[160px] flex-1 items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition",
                isActive
                  ? `${REPORT_TONES.primary.activeTabBg} ring-1 ${REPORT_TONES.primary.activeTabRing}`
                  : "hover:bg-white/[0.04]",
              )}
            >
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {idx === 0 ? "Top pick" : `Alternative ${idx}`}
                </p>
                <p className="mt-1 truncate font-grotesk text-sm font-bold text-white">
                  {row.path.title}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 font-mono text-xs font-bold tabular-nums",
                  chipClass,
                )}
              >
                {Math.round(row.fit)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Why these alternatives may fit — one trade-off per option */}
      <div className="glass-panel-deep mt-4 rounded-2xl p-5">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
          <ArrowRightLeft
            className={`h-3.5 w-3.5 ${REPORT_TONES.secondary.iconFill}`}
            aria-hidden
          />
          Why these alternatives may fit
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {top.map((row) => {
            const tradeOff = deriveTradeOff(row as TopRow, top as TopRow[]);
            return (
              <li
                key={row.slug}
                className="flex flex-col gap-1 rounded-xl border border-white/6 bg-white/[0.02] px-3.5 py-3"
              >
                <span className="font-grotesk text-sm font-semibold text-white">
                  {row.path.title}
                </span>
                <span className="text-xs leading-relaxed text-white/70">{tradeOff}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start">
        <div className="glass-panel-deep min-w-0 rounded-2xl p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Fit for this role
          </p>
          <div className="mt-3">
            <BandMeter value={active.fit} size="lg" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/75">{active.path.blurb}</p>
          <p className="mt-4 text-xs text-white/50">
            {activeJd > 0
              ? `Benchmarked against ${activeJd} live Indian JDs in the last 6 months.`
              : "Fresh path — smaller sample so far."}
          </p>
        </div>

        <div className="grid gap-3">
          <StatRow
            icon={<TrendingUp className="h-4 w-4" />}
            label="Entry salary"
            value={activeSalaryLabel}
            caption="Median band for entry roles in this path."
          />
          <StatRow
            icon={<Zap className="h-4 w-4" />}
            label="Effort to break in"
            value={activeEffort}
            caption="Based on how close your current traits sit to the role profile."
          />
          <StatRow
            icon={<Clock className="h-4 w-4" />}
            label="Time to first job"
            value={activeTime}
            caption="Typical placement window for a JD-mapped candidate."
          />
        </div>
      </div>

      <p className="mt-6 text-xs italic text-white/45">
        Salary and time-to-job bands are directional benchmarks from the JD window used to score you
        — not personal offers.
      </p>

      <RecruiterInsights
        result={result}
        slug={active.slug}
        roleTitle={active.path.title}
        tone={activeIdx === 0 ? "primary" : "secondary"}
      />
    </ReportCard>
  );
}

function StatRow({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/70">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</p>
        <p className="mt-1 text-xs text-white/55">{caption}</p>
      </div>
      <p className="shrink-0 whitespace-nowrap font-grotesk text-lg font-extrabold tabular-nums text-white">
        {value}
      </p>
    </div>
  );
}

export default ChapterDecisionHelper;
