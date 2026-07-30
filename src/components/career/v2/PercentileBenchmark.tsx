import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BarChart3, RefreshCw, Info } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPercentileBenchmark, type BenchmarkRow } from "@/lib/percentileBenchmark.functions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const DIMENSION_EXPLAIN: Record<string, string> = {
  analytical:
    "Combines your Logic and Data-thinking traits - how confidently you break problems into steps and reason with numbers.",
  domain:
    "Your Compliance/Domain-knowledge score - familiarity with rules, protocols, and industry vocabulary in the paths you were matched to.",
  detail:
    "How consistently your answers signalled accuracy over speed - the trait recruiters proxy from careful, complete responses.",
  communication:
    "Average of your Language and Writing signals - clarity, structure, and precision in the way you frame answers.",
  commitment:
    "Your Pressure-handling signal - willingness to stay with a task when it gets slow, ambiguous, or high-stakes.",
};

const STREAM_LABEL: Record<string, string> = {
  MPC: "MPC students",
  BiPC: "BiPC students",
  Commerce: "Commerce students",
  Arts: "Arts students",
  all: "all students",
};

const BAND_STYLE: Record<BenchmarkRow["band"], { bar: string; chip: string; label: string }> = {
  top10: {
    bar: "bg-sky-400",
    chip: "bg-sky-400/15 text-sky-200 border-sky-300/25",
    label: "Top 10%",
  },
  top25: {
    bar: "bg-sky-400",
    chip: "bg-sky-400/15 text-sky-200 border-sky-300/25",
    label: "Top quartile",
  },
  top50: {
    bar: "bg-white/40",
    chip: "bg-white/10 text-white/75 border-white/15",
    label: "Above median",
  },
  bottom: {
    bar: "bg-amber-400/70",
    chip: "bg-amber-400/15 text-amber-200 border-amber-300/25",
    label: "Room to grow",
  },
};

export function PercentileBenchmark({ result }: { result: CareerEngineResult }) {
  const stream = (result.profile?.stream ?? "").trim() || null;
  const fetchBenchmark = useServerFn(getPercentileBenchmark);

  const query = useQuery({
    queryKey: ["percentile-benchmark", stream, result.archetypeId],
    queryFn: () =>
      fetchBenchmark({
        data: {
          stream,
          traitScores: result.traitScores as Record<string, number>,
        },
      }),
    staleTime: 5 * 60 * 1000,
  });

  if (query.isLoading) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="h-4 w-40 motion-safe:animate-pulse rounded bg-white/10" />
        <div className="mt-5 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 motion-safe:animate-pulse rounded bg-white/[0.04]" />
          ))}
        </div>
      </section>
    );
  }

  const rows = query.data?.rows ?? [];
  if (query.data?.hidden || rows.length === 0) return null;

  const streamUsed = rows[0]?.streamUsed ?? "all";
  const sampleSize = Math.max(...rows.map((r) => r.sampleSize));
  const cohortLabel =
    STREAM_LABEL[streamUsed] ?? (streamUsed === "all" ? "all students" : `${streamUsed} students`);
  const refreshed = rows[0]?.refreshedAt ? new Date(rows[0].refreshedAt) : null;

  return (
    <section
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      aria-labelledby="benchmark-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-sky-300" aria-hidden />
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-200/90">
              How you compare
            </p>
          </div>
          <h3
            id="benchmark-heading"
            className="mt-2 font-grotesk text-lg font-bold text-white sm:text-xl"
          >
            vs {sampleSize.toLocaleString("en-IN")} {cohortLabel}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/[0.08] disabled:opacity-60"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${query.isFetching ? "motion-safe:animate-spin" : ""}`}
              aria-hidden
            />
            {query.isFetching ? "Refreshing…" : "Refresh benchmark"}
          </button>
          {streamUsed === "all" && stream && (
            <p className="max-w-xs text-right text-xs text-white/50">
              Sample for {stream} is still small - comparing you against all streams for now.
            </p>
          )}
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map((row) => (
          <BenchmarkBar key={row.dimension} row={row} cohortLabel={cohortLabel} />
        ))}
      </ul>

      <p className="mt-5 text-xs text-white/45">
        Percentiles are computed from completed tests in the last 90 days.
        {refreshed && ` Updated ${refreshed.toLocaleDateString("en-IN")}.`}
      </p>
    </section>
  );
}

function BenchmarkBar({ row, cohortLabel }: { row: BenchmarkRow; cohortLabel: string }) {
  const style = BAND_STYLE[row.band];
  // Bar fills from the right: "Top 8%" ⇒ 92% filled.
  const fillPct = Math.min(100, Math.max(2, 100 - row.topPct));

  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white/90">{row.label}</p>
          <BenchmarkDrilldown row={row} cohortLabel={cohortLabel} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold tabular-nums text-white">
            Top {row.topPct}%
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${style.chip}`}
          >
            {style.label}
          </span>
        </div>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${style.bar}`}
          style={{ width: `${fillPct}%` }}
        />
      </div>
      <p className="mt-1 text-[11px] text-white/45">
        n = {row.sampleSize.toLocaleString("en-IN")} · {cohortLabel} · last 90 days
      </p>
    </li>
  );
}

function BenchmarkDrilldown({ row, cohortLabel }: { row: BenchmarkRow; cohortLabel: string }) {
  // Draw a coarse distribution using the 21 CDF breakpoints. Bar height is
  // the inverse of the gap between consecutive breakpoints (dense regions →
  // taller bars). Marker sits at the user's percentile rank.
  const cdf = row.distribution ?? [];
  const gaps = cdf.slice(1).map((v, i) => Math.max(0.0001, v - cdf[i]));
  const invHeights = gaps.map((g) => 1 / g);
  const maxH = Math.max(...invHeights, 1);
  const userRank = 100 - row.topPct;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`What does ${row.label} percentile mean?`}
          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white/80"
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg border-white/10 bg-neutral-950 text-white">
        <DialogHeader>
          <DialogTitle className="font-grotesk text-lg text-white">
            {row.label} - Top {row.topPct}%
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {DIMENSION_EXPLAIN[row.dimension] ??
              "How your score compares to other students on this dimension."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              Distribution across {row.sampleSize.toLocaleString("en-IN")} {cohortLabel}
            </p>
            <div className="relative mt-3 h-24 w-full">
              <div className="flex h-full items-end gap-[2px]">
                {invHeights.map((h, i) => {
                  const inUserBucket = i * 5 <= userRank && userRank < (i + 1) * 5;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${
                        inUserBucket ? "bg-sky-400" : "bg-white/15"
                      }`}
                      style={{ height: `${Math.max(6, (h / maxH) * 100)}%` }}
                      title={`p${i * 5}–p${(i + 1) * 5}`}
                    />
                  );
                })}
              </div>
              <div
                className="pointer-events-none absolute -top-1 h-[calc(100%+8px)] w-px bg-sky-300"
                style={{ left: `${userRank}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
              <span>lower scores</span>
              <span>You · p{userRank}</span>
              <span>higher scores</span>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs">
            <div>
              <dt className="text-white/50">Sample size</dt>
              <dd className="mt-0.5 font-mono text-sm font-semibold text-white">
                {row.sampleSize.toLocaleString("en-IN")}
              </dd>
            </div>
            <div>
              <dt className="text-white/50">Cohort</dt>
              <dd className="mt-0.5 text-sm text-white/90">{cohortLabel}</dd>
            </div>
            <div>
              <dt className="text-white/50">Window</dt>
              <dd className="mt-0.5 text-sm text-white/90">Last 90 days</dd>
            </div>
            <div>
              <dt className="text-white/50">Your rank</dt>
              <dd className="mt-0.5 font-mono text-sm font-semibold text-white">
                Top {row.topPct}%
              </dd>
            </div>
          </dl>

          <p className="text-xs text-white/50">
            Comparability caveat: cohort is completed tests in the last 90 days. Small samples
            (&lt;100) are pooled across streams for stability.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
