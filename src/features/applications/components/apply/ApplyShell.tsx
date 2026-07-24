import { useEffect } from "react";
import { Link, useRouterState, getRouteApi } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { COURSES_BY_SLUG } from "@/data/courses";
import { COHORT_BY_ID } from "@/components/landing/constants";
import { track } from "@/lib/track";
import { FunnelProgress } from "@/components/funnel/FunnelProgress";

const applyRouteApi = getRouteApi("/apply");

const applySearchSchema = z.object({
  programme: z.string().optional(),
  cohort: z.string().optional(),
});

const STEPS = [
  { path: "/apply", label: "Your profile" },
  { path: "/apply/review", label: "Pick programme" },
  { path: "/apply/confirm", label: "Apply" },
  { path: "/apply/success", label: "You're in" },
];

export function ApplyShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.path === pathname),
  );
  const search = applyRouteApi.useSearch();
  const programme =
    typeof search === "object" && search && "programme" in search
      ? (search as { programme?: string }).programme
      : undefined;
  const cohort =
    typeof search === "object" && search && "cohort" in search
      ? (search as { cohort?: string }).cohort
      : undefined;
  useEffect(() => {
    track("apply_step_viewed", {
      program_slug: programme ?? null,
      cohort: cohort ?? null,
      props: { step_index: currentIndex, step_path: pathname },
    });
  }, [pathname, programme, cohort, currentIndex]);
  const course = programme ? COURSES_BY_SLUG[programme] : undefined;
  const cohortInfo = cohort ? COHORT_BY_ID[cohort] : undefined;
  const hasContext = !!course || !!cohortInfo;

  return (
    <main className="min-h-app surface-page tone-light">
      <header className="border-b border-ink/10 bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">
              <img src={arzonIcon} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="leading-none">
              <p className="font-mono text-caption font-semibold tracking-[0.28em] text-[color:var(--ink)]">
                ARZON
              </p>
              <p className="font-mono text-micro tracking-[0.42em] text-[color:var(--ink-soft)]">
                GLOBAL
              </p>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
        </div>
      </header>

      <FunnelProgress />

      <div className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14">
        {hasContext && (
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-[color:var(--teal-deep)]/25 bg-[color:var(--teal-soft)] px-4 py-3 text-xs text-[color:var(--ink-soft)]">
            <span className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
              Applying for
            </span>
            {course && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-[color:var(--ink)]">
                <BookOpen className="h-3 w-3 text-[color:var(--teal-deep)]" />
                {course.title}
              </span>
            )}
            {cohortInfo && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-[color:var(--ink)]">
                <Calendar className="h-3 w-3 text-primary-glow" />
                {cohortInfo.label} cohort · starts {cohortInfo.startsLabel}
              </span>
            )}
            <span className="text-white/60">Change anytime in step 2.</span>
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
