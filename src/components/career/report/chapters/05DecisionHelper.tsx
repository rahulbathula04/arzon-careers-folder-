import { useState } from "react";
import type { CareerEngineResult, PathDef } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { getPathFacts, type CareerPathFacts } from "@/data/careerPathEvidence";
import { ReportCard } from "../ReportCard";
import { BandMeter } from "../BandMeter";
import { Clock, TrendingUp, Zap, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
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
      eyebrow="Decision Helper"
      tone="primary"
      title="Which of your top matches should you actually pick?"
      subtitle="Salary is not the only axis. Effort and time-to-first-job matter just as much for a first role."
      whatThisMeans="If you pick the wrong trade-off between money, effort and speed, you'll burn six months on the wrong role — this is how to avoid that."
    >
      {/* Tab Selector */}
      <div
        role="tablist"
        aria-label="Compare your top matches"
        className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-[#0B0F19] p-2"
      >
        {top.map((row, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={row.slug}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "flex min-w-[160px] flex-1 items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-all",
                isActive
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-600/30"
                  : "bg-[#161F33] text-slate-300 hover:bg-white/10 border border-white/10",
              )}
            >
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {idx === 0 ? "Top Pick" : `Alternative ${idx}`}
                </p>
                <p className="mt-0.5 truncate font-bold text-sm text-white">
                  {row.path.title}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 font-mono text-xs font-bold text-white tabular-nums">
                {Math.round(row.fit)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trade-off Insights */}
      <div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-3 shadow-lg">
        <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
          <ArrowRightLeft className="h-4 w-4 text-blue-400" />
          Why these alternatives may fit
        </p>
        <ul className="grid gap-3 sm:grid-cols-3 pt-1">
          {top.map((row) => {
            const tradeOff = deriveTradeOff(row as TopRow, top as TopRow[]);
            return (
              <li
                key={row.slug}
                className="flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0B0F19] p-4 shadow-sm"
              >
                <span className="font-bold text-sm text-white">
                  {row.path.title}
                </span>
                <span className="text-xs leading-relaxed text-slate-300">{tradeOff}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start pt-2">
        <div className="rounded-2xl border border-white/10 bg-[#161F33] p-6 space-y-4 shadow-lg">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            Fit For This Role
          </p>
          <div>
            <BandMeter value={active.fit} size="lg" />
          </div>
          <p className="text-sm leading-relaxed text-slate-200">{active.path.blurb}</p>
          <p className="text-xs text-slate-400">
            {activeJd > 0
              ? `Benchmarked against ${activeJd} live Indian JDs in the last 6 months.`
              : "Fresh path — smaller sample so far."}
          </p>
        </div>

        <div className="grid gap-3">
          <StatRow
            icon={<TrendingUp className="h-4 w-4 text-blue-400" />}
            label="Entry Salary"
            value={activeSalaryLabel}
            caption="Median band for entry roles in this path."
          />
          <StatRow
            icon={<Zap className="h-4 w-4 text-emerald-400" />}
            label="Effort To Break In"
            value={activeEffort}
            caption="Based on how close your current traits sit to the role profile."
          />
          <StatRow
            icon={<Clock className="h-4 w-4 text-amber-400" />}
            label="Time To First Offer"
            value={activeTime}
            caption="Typical placement window for a JD-mapped candidate."
          />
        </div>
      </div>

      <p className="text-xs italic text-slate-400">
        Salary and time-to-job bands are directional benchmarks from the JD window used to score you — not personal offers.
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
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 text-xs text-slate-300">{caption}</p>
      </div>
      <p className="shrink-0 whitespace-nowrap font-serif text-xl font-bold text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}

export default ChapterDecisionHelper;
