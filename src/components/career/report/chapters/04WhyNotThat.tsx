import { Scale, CheckCircle2, XCircle } from "lucide-react";
import { buildVsRunnerUp } from "@/lib/careerEngine/explainability";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";
import { cn } from "@/lib/utils";

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

  return (
    <ReportCard
      id={`ch-${chapter}-why-not`}
      chapter={chapter}
      eyebrow="Why this, not that"
      tone="warn"
      title={
        isTie ? (
          <>
            {v.topTitle} and {v.runnerTitle} are{" "}
            <span className={cn("tabular-nums", REPORT_TONES.warn.chipText)}>essentially tied</span>
          </>
        ) : (
          <>
            {v.topTitle} beat {v.runnerTitle} by{" "}
            <span className={cn("tabular-nums", REPORT_TONES.warn.chipText)}>{deltaLabel}</span>
          </>
        )
      }
      subtitle={
        <>
          <Scale className={cn("mr-1 inline h-4 w-4", REPORT_TONES.warn.iconFill)} />
          {v.topTitle} scored{" "}
          <span className="font-bold tabular-nums text-white">{Math.round(v.topFit)}%</span> vs{" "}
          {v.runnerTitle} at{" "}
          <span className="font-bold tabular-nums text-white">{Math.round(v.runnerFit)}%</span>.
        </>
      }
      whatThisMeans={
        isTie
          ? "Both paths score within a whisker of each other — treat this as a preference call, not a ranking."
          : "The runner-up was close but not close enough — here's the exact evidence that tipped the call."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            {v.topTitle} scored higher because
          </p>
          {v.topWonOn.length ? (
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {v.topWonOn.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2
                    className={cn("mt-0.5 h-4 w-4 shrink-0", REPORT_TONES.secondary.iconFill)}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/55">
              Marginal — both paths use a similar trait mix.
            </p>
          )}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            {v.runnerTitle} lost points because
          </p>
          {v.runnerLostOn.length ? (
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {v.runnerLostOn.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle
                    className={cn("mt-0.5 h-4 w-4 shrink-0", REPORT_TONES["ruled-out"].iconFill)}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/55">No clear trait-level gap.</p>
          )}
        </div>
      </div>
    </ReportCard>
  );
}

export default ChapterWhyNotThat;
