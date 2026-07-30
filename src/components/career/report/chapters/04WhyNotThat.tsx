import { Scale, CheckCircle2, XCircle } from "lucide-react";
import { buildVsRunnerUp } from "@/lib/careerEngine/explainability";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { ReportCard } from "../ReportCard";

export function ChapterWhyNotThat({
  result,
  chapter,
}: {
  result: CareerEngineResult;
  chapter: number;
}) {
  const v = buildVsRunnerUp(result);
  if (!v) return null;

  const isTie = v.delta <= 0.05;
  const deltaLabel = `${v.delta} ${v.delta === 1 ? "pt" : "pts"}`;
  const topWonOn = v.topWonOn ?? [];
  const runnerLostOn = v.runnerLostOn ?? [];

  return (
    <ReportCard
      id={`ch-${chapter}-why-not`}
      chapter={chapter}
      eyebrow="Why This, Not That"
      tone="warn"
      title={
        isTie ? (
          <>
            {v.topTitle} and {v.runnerTitle} are{" "}
            <span className="text-amber-400 font-bold tabular-nums">essentially tied</span>
          </>
        ) : (
          <>
            {v.topTitle} beat {v.runnerTitle} by{" "}
            <span className="text-amber-400 font-bold tabular-nums">{deltaLabel}</span>
          </>
        )
      }
      subtitle={
        <>
          <Scale className="mr-1.5 inline h-4 w-4 text-amber-400" />
          {v.topTitle} scored{" "}
          <span className="font-bold tabular-nums text-white">{Math.round(v.topFit)}%</span> vs{" "}
          {v.runnerTitle} at{" "}
          <span className="font-bold tabular-nums text-white">{Math.round(v.runnerFit)}%</span>.
        </>
      }
      whatThisMeans={
        isTie
          ? "Both paths score within a whisker of each other - treat this as a preference call, not a ranking."
          : "The runner-up was close but not close enough - here's the exact evidence that tipped the call."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            {v.topTitle} scored higher because
          </p>
          {topWonOn.length ? (
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {topWonOn.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Marginal - both paths use a similar trait mix.</p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            {v.runnerTitle} lost points because
          </p>
          {runnerLostOn.length ? (
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {runnerLostOn.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">No clear trait-level gap.</p>
          )}
        </div>
      </div>
    </ReportCard>
  );
}

export default ChapterWhyNotThat;
