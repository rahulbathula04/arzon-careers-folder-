import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Target, Factory, TrendingUp } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPercentileBenchmark } from "@/lib/percentileBenchmark.functions";

// ---------- band helpers ----------
type Band = "emerging" | "ready" | "strong" | "elite";
const BANDS: { max: number; key: Band; label: string; next: number | null }[] = [
  { max: 54, key: "emerging", label: "Emerging", next: 55 },
  { max: 69, key: "ready", label: "Ready", next: 70 },
  { max: 84, key: "strong", label: "Strong", next: 85 },
  { max: 100, key: "elite", label: "Elite", next: null },
];

function bandFor(score: number) {
  return BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1];
}

const BAND_STYLE: Record<Band, { text: string; ring: string; chip: string }> = {
  emerging: {
    text: "text-amber-200",
    ring: "ring-amber-300/25",
    chip: "bg-amber-400/15 text-amber-200 border-amber-300/25",
  },
  ready: {
    text: "text-sky-200",
    ring: "ring-sky-300/25",
    chip: "bg-sky-400/15 text-sky-200 border-sky-300/25",
  },
  strong: {
    text: "text-sky-200",
    ring: "ring-sky-300/25",
    chip: "bg-sky-400/15 text-sky-200 border-sky-300/25",
  },
  elite: {
    text: "text-white",
    ring: "ring-white/25",
    chip: "bg-white/15 text-white border-white/25",
  },
};

// ---------- score computations ----------

// Industry readiness — 40/30/20/10 (Domain / Process / Tool / Workplace).
// Traits used come from src/data/careerEngineQuestions.ts trait vocabulary.
function industryReadiness(traits: Record<string, number>): number {
  const t = (k: string) => Number(traits?.[k] ?? 0);
  const domain = t("compliance"); // 40%
  const process = (t("logic") + t("detail")) / 2; // 30%
  const tool = (t("data") + t("screen")) / 2; // 20%
  const workplace = (t("pressure") + t("language")) / 2; // 10%
  const raw = 0.4 * domain + 0.3 * process + 0.2 * tool + 0.1 * workplace;
  // Traits are ~-3..+3; map to 0..100.
  const scaled = ((raw + 3) / 6) * 100;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

// ---------- component ----------

export function EmployabilityTriad({ result }: { result: CareerEngineResult }) {
  const stream = (result.profile?.stream ?? "").trim() || null;
  const fetchBenchmark = useServerFn(getPercentileBenchmark);
  // Reuse the same query key as PercentileBenchmark so React Query dedupes.
  const benchmark = useQuery({
    queryKey: ["percentile-benchmark", stream, result.archetypeId],
    queryFn: () =>
      fetchBenchmark({
        data: { stream, traitScores: result.traitScores as Record<string, number> },
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
    <section
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      aria-labelledby="triad-heading"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-200/90">
          Employability triad
        </p>
      </div>
      <h2 id="triad-heading" className="mt-1 font-grotesk text-h3 font-extrabold text-white">
        Three numbers that decide your first job
      </h2>
      <p className="mt-1 text-sm text-white/60">
        Recruiters don't score you on one thing. These are the three they care about.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <TriadCard
          icon={<Target className="h-4 w-4" aria-hidden />}
          label="Career fit"
          score={careerFit}
          explain={`How closely your traits match ${result.archetype?.name ?? "your top role"} work day-to-day.`}
          nextAction="Answer the deeper role questions to lock in your top match."
        />
        <TriadCard
          icon={<Factory className="h-4 w-4" aria-hidden />}
          label="Industry readiness"
          score={readiness}
          explain="How deployment-ready you are on the 40/30/20/10 model: domain, process, tool exposure, workplace habits."
          nextAction="A JD-mapped module lifts this the fastest — target your weakest pillar first."
        />
        <TriadCard
          icon={<TrendingUp className="h-4 w-4" aria-hidden />}
          label="Market competitiveness"
          score={marketScore}
          fallback={
            benchmark.isLoading
              ? "Calculating…"
              : "Sample still building — we'll show your peer rank once N ≥ 20."
          }
          explain="Where you rank against students who took the same assessment."
          nextAction="Move any dimension into the top quartile to jump a band."
        />
      </div>

      <details className="group mt-5 text-xs text-white/50">
        <summary className="cursor-pointer select-none text-white/60 hover:text-white/80">
          How is this calculated?
        </summary>
        <div className="mt-3 space-y-2 rounded-2xl glass-panel-deep p-4 text-white/65">
          <p>
            <span className="font-semibold text-white/85">Career fit</span> — the fit score from
            your answers vs the trait profile of your top-matched role.
          </p>
          <p>
            <span className="font-semibold text-white/85">Industry readiness</span> — weighted
            blend: 40% domain (compliance), 30% process (logic + detail), 20% tool exposure (data +
            screens), 10% workplace habits (pressure + language). Same 40/30/20/10 curriculum
            recruiters hire against.
          </p>
          <p>
            <span className="font-semibold text-white/85">Market competitiveness</span> — average
            percentile across your five benchmark dimensions vs the last 90 days of student results.
            Hidden until we have at least 20 comparable students.
          </p>
          <p className="text-white/45">
            Bands: &lt;55 Emerging · 55–69 Ready · 70–84 Strong · 85+ Elite.
          </p>
        </div>
      </details>
    </section>
  );
}

function TriadCard({
  icon,
  label,
  score,
  explain,
  nextAction,
  fallback,
}: {
  icon: React.ReactNode;
  label: string;
  score: number | null;
  explain: string;
  nextAction: string;
  fallback?: string;
}) {
  const hasScore = typeof score === "number";
  const band = hasScore ? bandFor(score!) : null;
  const style = band ? BAND_STYLE[band.key] : null;
  const pointsToNext = hasScore && band?.next ? band.next - score! : null;

  return (
    <div
      className={`rounded-2xl glass-panel-deep p-5 ring-1 ${style?.ring ?? "ring-white/10"}`}
    >
      <div className="flex items-center gap-2 text-white/60">
        <span className={style?.text ?? "text-white/70"}>{icon}</span>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">{label}</p>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={`font-grotesk text-5xl font-extrabold tabular-nums ${style?.text ?? "text-white/40"}`}
        >
          {hasScore ? score : "—"}
        </span>
        {hasScore && <span className="text-sm text-white/40">/ 100</span>}
      </div>

      {band && style ? (
        <span
          className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${style.chip}`}
        >
          {band.label}
        </span>
      ) : (
        <p className="mt-2 text-xs text-white/50">{fallback}</p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-white/70">{explain}</p>

      {hasScore && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
            Improvement target
          </p>
          <p className="mt-0.5 text-xs text-white/80">
            {pointsToNext
              ? `+${pointsToNext} pts to reach ${BANDS.find((b) => b.key !== band!.key && b.max >= band!.next!)?.label ?? "next band"}. ${nextAction}`
              : "You're at Elite. Hold this by publishing artefacts recruiters can verify."}
          </p>
        </div>
      )}
    </div>
  );
}

export default EmployabilityTriad;
