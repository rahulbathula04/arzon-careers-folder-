import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TrendingUp, PlayCircle, Eye, Target, Loader2 } from "lucide-react";
import { getLearningPath } from "@/lib/learningPath.functions";
import { getWeeklyGoal, toggleWeeklyGoal } from "@/lib/weeklyGoal.functions";
import { getRecruiterViews } from "@/lib/recruiterViews.functions";

export const Route = createFileRoute("/_authenticated/hub")({
  head: () => ({
    meta: [
      { title: "Your dashboard · Arzon Careers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});

// Employability score is a coming-from-triad concept; use its computed proxy.
const EMPLOYABILITY_BAND = (score: number) =>
  score < 55 ? "Emerging" : score < 70 ? "Ready" : score < 85 ? "Strong" : "Elite";

function DashboardPage() {
  const fetchPath = useServerFn(getLearningPath);
  const fetchGoal = useServerFn(getWeeklyGoal);
  const fetchViews = useServerFn(getRecruiterViews);
  const mutateGoal = useServerFn(toggleWeeklyGoal);
  const queryClient = useQueryClient();

  const pathQ = useQuery({ queryKey: ["learning-path"], queryFn: () => fetchPath() });
  const goalQ = useQuery({ queryKey: ["weekly-goal"], queryFn: () => fetchGoal() });
  const viewsQ = useQuery({ queryKey: ["recruiter-views"], queryFn: () => fetchViews() });

  const goalToggle = useMutation({
    mutationFn: (done: boolean) => mutateGoal({ data: { done } }),
    onMutate: async (done) => {
      await queryClient.cancelQueries({ queryKey: ["weekly-goal"] });
      const prev = queryClient.getQueryData<Awaited<ReturnType<typeof fetchGoal>>>(["weekly-goal"]);
      if (prev) queryClient.setQueryData(["weekly-goal"], { ...prev, done });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["weekly-goal"], ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["weekly-goal"] }),
  });

  const projected = pathQ.data?.projected ?? 62;
  const currentScore = pathQ.data?.currentScore ?? 62;
  const delta = Math.max(0, projected - currentScore);
  const nextModule = pathQ.data?.modules.find((m) => m.status === "current") ?? null;
  const goalDone = goalQ.data?.done ?? false;
  const goalPct = goalDone ? 100 : 0;
  const week = viewsQ.data?.week ?? 0;
  const total = viewsQ.data?.total ?? 0;
  const trend = viewsQ.data?.trendVsLastWeek ?? 0;
  const actions = viewsQ.data?.actions ?? [];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Post-assessment
          </p>
          <h1 className="mt-1 text-2xl font-semibold md:text-3xl">Your dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Four numbers that matter this week. Nothing else.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Employability Score */}
          <Widget
            icon={TrendingUp}
            label="Employability Score"
            hint={EMPLOYABILITY_BAND(currentScore)}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums">{currentScore}</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
              {delta > 0 && (
                <span className="ml-auto text-xs font-medium text-primary">+{delta} projected</span>
              )}
            </div>
            <ProgressBar value={currentScore} />
          </Widget>

          {/* Next Module */}
          <Widget
            icon={PlayCircle}
            label="Next Module"
            hint={nextModule ? `${nextModule.pillar} · +${nextModule.lift} pts` : undefined}
          >
            {pathQ.isLoading ? (
              <WidgetSkeleton />
            ) : nextModule ? (
              <>
                <p className="text-base font-medium leading-snug">{nextModule.title}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">~{nextModule.minutes} min</span>
                  <Link
                    to="/learning-path"
                    hash={nextModule.slug}
                    className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                  >
                    Resume →
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                🎉 You've completed every module. Retake ASSAY to unlock the next path.
              </p>
            )}
          </Widget>

          {/* Recruiter Views */}
          <Widget icon={Eye} label="Recruiter Views" hint="Last 7 days">
            {viewsQ.isLoading ? (
              <WidgetSkeleton />
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tabular-nums">{week}</span>
                  <span className="text-sm text-muted-foreground">· {total} all-time</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {week === 0
                    ? "No recruiter views yet. Do these three things first:"
                    : trend === 0
                      ? "Same as last week"
                      : trend > 0
                        ? `+${trend} vs last week`
                        : `${trend} vs last week`}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {actions.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Widget>

          {/* Weekly Goal */}
          <Widget icon={Target} label="Weekly Goal" hint="This week">
            {goalQ.isLoading || !goalQ.data ? (
              <WidgetSkeleton />
            ) : (
              <>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    checked={goalDone}
                    disabled={goalToggle.isPending}
                    onChange={(e) => goalToggle.mutate(e.target.checked)}
                  />
                  <span
                    className={`text-sm leading-snug ${
                      goalDone ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {goalQ.data.task}
                  </span>
                </label>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {goalDone
                      ? "Nice — logged for this week."
                      : "Auto-generated from your current module."}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{goalPct}%</span>
                </div>
                <ProgressBar value={goalPct} />
              </>
            )}
          </Widget>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Want the full cohort view?{" "}
          <Link to="/app" className="text-primary hover:underline">
            Open your cohort workspace →
          </Link>
        </p>
      </main>
    </div>
  );
}

function Widget({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: typeof TrendingUp;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
          <h2 className="text-sm font-semibold">{label}</h2>
        </div>
        {hint && (
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function WidgetSkeleton() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden />
      <span className="text-xs">Loading…</span>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
