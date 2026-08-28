import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Circle, TrendingUp, AlertTriangle } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { CrisisSimulationSandbox } from "@/components/simulations/CrisisSimulationSandbox";
import {
  getLearningPath,
  markModuleComplete,
  type LearningModule,
  type LearningPathPayload,
} from "@/lib/learningPath.functions";

export const Route = createFileRoute("/_authenticated/learning-path")({
  head: () => ({
    meta: [
      { title: "Your learning path · Arzon Careers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LearningPathPage,
});

type Module = LearningModule;

const PILLAR_STYLE: Record<Module["pillar"], string> = {
  Domain: "bg-primary/10 text-primary",
  Process: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Tool: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Workplace: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function LearningPathPage() {
  const fetchPath = useServerFn(getLearningPath);
  const mutateComplete = useServerFn(markModuleComplete);
  const queryClient = useQueryClient();
  const pathQuery = useQuery({
    queryKey: ["learning-path"],
    queryFn: () => fetchPath(),
  });

  const completeMutation = useMutation({
    mutationFn: (moduleId: string) => mutateComplete({ data: { moduleId } }),
    onMutate: async (moduleId) => {
      await queryClient.cancelQueries({ queryKey: ["learning-path"] });
      const prev = queryClient.getQueryData<LearningPathPayload>(["learning-path"]);
      if (prev) {
        const modules = prev.modules.map((m) =>
          m.id === moduleId ? { ...m, status: "done" as const } : m,
        );
        // Recompute "current": first non-done becomes current, rest locked.
        const firstNonDone = modules.findIndex((m) => m.status !== "done");
        const rebalanced = modules.map((m, idx) => ({
          ...m,
          status:
            m.status === "done"
              ? m.status
              : idx === firstNonDone
                ? ("current" as const)
                : ("locked" as const),
        }));
        const projected =
          prev.currentScore +
          rebalanced.reduce((s, m) => (m.status === "done" ? s : s + m.lift), 0);
        queryClient.setQueryData<LearningPathPayload>(["learning-path"], {
          ...prev,
          modules: rebalanced,
          projected,
        });
      }
      return { prev };
    },
    onError: (_err, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["learning-path"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["learning-path"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-goal"] });
    },
  });

  // Deep-link support: scroll to #<slug> once data is present.
  useEffect(() => {
    if (!pathQuery.data) return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathQuery.data]);

  if (pathQuery.isLoading || !pathQuery.data) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <main className="mx-auto flex max-w-4xl items-center justify-center px-4 py-24">
          <AiThinkingLoader label="Thinking & building your path…" size="lg" />
        </main>
      </div>
    );
  }

  const { modules, currentScore, targetScore, projected } = pathQuery.data;
  const remainingGap = Math.max(0, targetScore - projected);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Prescriptive plan
          </p>
          <h1 className="mt-1 text-2xl font-semibold md:text-3xl">Your learning path</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Each module is picked to close a specific readiness gap. Complete them in order and your
            projected employability score is on the right.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Employability score
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums">{currentScore}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span className="text-3xl font-semibold tabular-nums text-primary">
                  {projected}
                </span>
                <span className="text-sm text-muted-foreground">/ target {targetScore}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                If you finish this path
              </p>
              <p className="mt-1 text-sm">
                {remainingGap === 0 ? (
                  <span className="font-medium text-primary">On track to hit target</span>
                ) : (
                  <span className="text-muted-foreground">
                    Add ~<span className="font-medium text-foreground">{remainingGap} pts</span>{" "}
                    after this path
                  </span>
                )}
              </p>
            </div>
          </div>
          <ProjectionBar current={currentScore} projected={projected} target={targetScore} />
        </section>

        {/* Live Crisis Simulation Sandbox */}
        <section className="mb-8">
          <CrisisSimulationSandbox
            scenarioTitle="CDSCO Expedited Adverse Event Crisis Audit"
            scenarioType="pharmacovigilance"
          />
        </section>

        {/* Module timeline */}
        <ol className="relative space-y-4 border-l border-border pl-6">
          {modules.map((m, idx) => (
            <ModuleCard
              key={m.id}
              module={m}
              index={idx + 1}
              onComplete={() => completeMutation.mutate(m.id)}
              busy={completeMutation.isPending && completeMutation.variables === m.id}
            />
          ))}
        </ol>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Path updates every time you complete a module or retake ASSAY.{" "}
          <Link to="/hub" className="text-primary hover:underline">
            Back to your hub →
          </Link>
        </p>
      </main>
    </div>
  );
}

function ModuleCard({
  module: m,
  index,
  onComplete,
  busy,
}: {
  module: Module;
  index: number;
  onComplete: () => void;
  busy: boolean;
}) {
  const isDone = m.status === "done";
  const isCurrent = m.status === "current";
  const isLocked = m.status === "locked";

  return (
    <li id={m.slug} className="relative scroll-mt-24">
      <span
        className={`absolute -left-[33px] top-4 flex h-6 w-6 items-center justify-center rounded-full border ${
          isDone
            ? "border-primary bg-primary text-primary-foreground"
            : isCurrent
              ? "border-primary bg-background text-primary"
              : "border-border bg-background text-muted-foreground"
        }`}
        aria-hidden
      >
        {isDone ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Circle className="h-3 w-3 fill-current" />
        )}
      </span>

      <article
        className={`rounded-2xl border p-5 transition-colors ${
          isCurrent
            ? "border-primary/50 bg-card shadow-sm"
            : isDone
              ? "border-border bg-card/60"
              : "border-border bg-card"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Module {index}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PILLAR_STYLE[m.pillar]}`}
              >
                {m.pillar}
              </span>
              {isDone && (
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-600 dark:text-sky-400">
                  Completed
                </span>
              )}
            </div>
            <h2 className="mt-1.5 text-base font-semibold leading-snug">{m.title}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">~{m.minutes} min</p>
          </div>

          <div
            className={`shrink-0 rounded-xl px-3 py-2 text-right ${
              isDone ? "bg-muted/50" : "bg-primary/10"
            }`}
          >
            <div className="flex items-center justify-end gap-1">
              <TrendingUp
                className={`h-3.5 w-3.5 ${isDone ? "text-muted-foreground" : "text-primary"}`}
                aria-hidden
              />
              <span
                className={`text-lg font-semibold tabular-nums ${
                  isDone ? "text-muted-foreground line-through" : "text-primary"
                }`}
              >
                +{m.lift}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">points</p>
          </div>
        </div>

        {/* Gaps closed */}
        <div className="mt-4 rounded-lg border border-dashed border-border bg-background/40 p-3">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Closes these readiness gaps
            </p>
          </div>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {m.gaps.map((g) => (
              <li
                key={g}
                className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
              >
                {g}
              </li>
            ))}
          </ul>
        </div>

        {!isDone && (
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {isCurrent && (
              <a
                href={m.deepLink}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
              >
                Open module <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            )}
            <button
              type="button"
              onClick={onComplete}
              disabled={isLocked || busy}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-opacity ${
                isCurrent
                  ? "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60"
                  : "border border-border text-muted-foreground opacity-60"
              }`}
            >
              {busy ? (
                <AiThinkingLoader label="Thinking & saving…" size="sm" />
              ) : isCurrent ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Mark complete
                </>
              ) : (
                "Locked"
              )}
            </button>
          </div>
        )}
      </article>
    </li>
  );
}

function ProjectionBar({
  current,
  projected,
  target,
}: {
  current: number;
  projected: number;
  target: number;
}) {
  const max = Math.max(target, projected, 100);
  const currentPct = (current / max) * 100;
  const projectedPct = (projected / max) * 100;
  const targetPct = (target / max) * 100;

  return (
    <div className="relative mt-4 h-2 w-full rounded-full bg-muted">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary/40"
        style={{ width: `${projectedPct}%` }}
      />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary"
        style={{ width: `${currentPct}%` }}
      />
      <div
        className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-foreground"
        style={{ left: `${targetPct}%` }}
        aria-label="target"
      />
    </div>
  );
}
