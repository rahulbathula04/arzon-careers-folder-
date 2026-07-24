import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Target, Factory, TrendingUp, ArrowRight, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPercentileBenchmark } from "@/lib/percentileBenchmark.functions";
import { ReportCard } from "../ReportCard";
import { BandMeter } from "../BandMeter";
import { REPORT_TONES } from "../reportTones";

function industryReadiness(traits: Record<string, number>): number {
  const t = (k: string) => Number(traits?.[k] ?? 0);
  const domain = t("compliance");
  const process = (t("logic") + t("detail")) / 2;
  const tool = (t("data") + t("screen")) / 2;
  const workplace = (t("pressure") + t("language")) / 2;
  const raw = 0.4 * domain + 0.3 * process + 0.2 * tool + 0.1 * workplace;
  const scaled = ((raw + 3) / 6) * 100;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

export function ChapterThreeNumbers({ result }: { result: CareerEngineResult }) {
  const stream = (result.profile?.stream ?? "").trim() || null;
  const fetchBenchmark = useServerFn(getPercentileBenchmark);
  const benchmark = useQuery({
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

  const careerFit = Math.round(result.fitScore ?? 0);
  const readiness = industryReadiness(result.traitScores as Record<string, number>);
  const rows = benchmark.data?.rows ?? [];
  const hasMarket = !benchmark.data?.hidden && rows.length > 0;
  const marketScore = hasMarket
    ? Math.round(rows.reduce((s, r) => s + (100 - r.topPct), 0) / rows.length)
    : null;

  return (
    <ReportCard
      id="ch-2-three-numbers"
      chapter={2}
      eyebrow="The numbers"
      tone="primary"
      title="Two numbers that decide your first job"
      subtitle="Recruiters don't score you on one thing. These are what they care about most."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <NumberTile
          icon={<Target className="h-4 w-4" aria-hidden />}
          label="Career fit"
          score={careerFit}
          explain={`How closely your traits match ${result.archetype?.name ?? "your top role"} work day-to-day.`}
          improvement="Answer the deeper role questions to lock in your top match."
        />
        <NumberTile
          icon={<Factory className="h-4 w-4" aria-hidden />}
          label="Industry readiness"
          score={readiness}
          explain="How deployment-ready you are on the 40/30/20/10 model: domain, process, tools, workplace habits."
          improvement="A JD-mapped module lifts this the fastest — target your weakest pillar first."
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
          <Users className="h-3 w-3" aria-hidden />
          Peer rank ·{" "}
          {benchmark.isLoading
            ? "loading…"
            : hasMarket && marketScore !== null
              ? `${marketScore}/100 vs recent cohort`
              : "sample still building"}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          <TrendingUp className="h-3 w-3" aria-hidden /> Updates live as more students finish
        </span>
      </div>

      <div
        className={`mt-6 grid gap-4 rounded-2xl border ${REPORT_TONES.primary.softBorder} ${REPORT_TONES.primary.softBg} p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center`}
      >
        <div className="min-w-0">
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${REPORT_TONES.primary.softEyebrow}`}
          >
            Want a harder score?
          </p>
          <p className="mt-1.5 text-sm text-white/85">
            ASSAY grades your job-readiness across five recruiter dimensions — documentation,
            communication, domain knowledge, simulations, and integrity.
          </p>
        </div>
        <Link
          to="/career-engine"
          className={`inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full ${REPORT_TONES.primary.solidCtaBg} px-5 font-grotesk text-sm font-bold text-slate-900 transition hover:brightness-110`}
        >
          Take ASSAY <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <details className="group mt-5 text-xs text-white/50">
        <summary className="cursor-pointer select-none text-white/60 hover:text-white/80">
          How is this calculated?
        </summary>
        <div className="mt-3 space-y-2 rounded-2xl glass-panel-deep p-4 text-white/65">
          <p>
            <span className="font-semibold text-white/85">Career fit</span> — fit score of your
            answers vs your top-matched role's trait profile.
          </p>
          <p>
            <span className="font-semibold text-white/85">Industry readiness</span> — 40% domain
            (compliance) + 30% process (logic + detail) + 20% tool exposure + 10% workplace habits.
          </p>
          <p>
            <span className="font-semibold text-white/85">Peer rank</span> — average percentile
            across five benchmark dimensions vs the last 90 days of student results. Hidden until N
            ≥ 20.
          </p>
        </div>
      </details>
    </ReportCard>
  );
}

function NumberTile({
  icon,
  label,
  score,
  explain,
  improvement,
}: {
  icon: React.ReactNode;
  label: string;
  score: number;
  explain: string;
  improvement: string;
}) {
  return (
    <div className="rounded-2xl glass-panel-deep p-6">
      <div className="flex items-center gap-2 text-white/70">
        <span className="text-white/80">{icon}</span>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]">{label}</p>
      </div>
      <div className="mt-4">
        <BandMeter value={score} label={undefined} size="lg" />
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/75">{explain}</p>
      <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          Improvement target
        </p>
        <p className="mt-1 text-sm text-white/85">{improvement}</p>
      </div>
    </div>
  );
}

export default ChapterThreeNumbers;
