import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, MapPin, Target } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { EMPLOYERS } from "@/data/industry/employers";

function hiringCompanyCount(slug: string): number {
  return EMPLOYERS.filter((e) => e.hiringFor.includes(slug)).length;
}

function topCities(slug: string, limit = 3): string[] {
  const counts = new Map<string, number>();
  for (const e of EMPLOYERS.filter((x) => x.hiringFor.includes(slug))) {
    for (const c of e.cities) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([c]) => c);
}

export function HeroSnapshot({
  result,
  primarySlug,
  onScrollToStart,
}: {
  result: CareerEngineResult;
  primarySlug: string | null;
  onScrollToStart?: () => void;
}) {
  const path = primarySlug ? PATHS[primarySlug] : null;
  const roleTitle = path?.title ?? result.archetype?.name ?? "Healthcare career";
  const score = Math.round(result.fitScore ?? 0);
  const answered = result.evidence?.scoring?.answered ?? 0;
  const companies = primarySlug ? hiringCompanyCount(primarySlug) : 0;
  const cities = primarySlug ? topCities(primarySlug, 3) : [];
  const handleStart = () => {
    if (onScrollToStart) return onScrollToStart();
    document.getElementById("ch-1-verdict")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="report-hero-heading"
      className="overflow-hidden rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-border)] bg-white shadow-[var(--arzon-shadow-card)]"
    >
      <div className="border-b border-[var(--arzon-border)] bg-[var(--arzon-navy-950)] p-6 text-white sm:p-8 lg:p-10">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">
          YOUR CAREER ENGINE RESULT
        </p>
        <h1
          id="report-hero-heading"
          className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl"
        >
          {roleTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          Your answers point to this as the strongest role path to explore first. This is a career-readiness signal, not a hiring decision or placement prediction.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/roles/$slug"
            params={{ slug: primarySlug ?? "pharmacovigilance" }}
            className="arzon-button-primary bg-white text-[var(--arzon-navy-950)] hover:bg-slate-100"
          >
            Explore this role <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleStart}
            className="arzon-button-secondary border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            See my breakdown
          </button>
        </div>
      </div>

      <dl className="grid divide-y divide-[var(--arzon-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        <div className="p-5">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
            <Target className="h-4 w-4 text-[var(--arzon-blue-600)]" /> Readiness signal
          </dt>
          <dd className="mt-2 text-2xl font-bold text-[var(--arzon-ink-strong)]">{score}/100</dd>
          <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">{answered || 40} assessment responses</p>
        </div>
        <div className="p-5">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
            <Building2 className="h-4 w-4 text-[var(--arzon-blue-600)]" /> Employer context
          </dt>
          <dd className="mt-2 text-2xl font-bold text-[var(--arzon-ink-strong)]">{companies || "—"}</dd>
          <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">employers in Arzon's role dataset</p>
        </div>
        <div className="p-5">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
            <MapPin className="h-4 w-4 text-[var(--arzon-blue-600)]" /> Common markets
          </dt>
          <dd className="mt-2 truncate text-base font-bold text-[var(--arzon-ink-strong)]">
            {cities.length ? cities.slice(0, 2).join(" · ") : "See role profile"}
          </dd>
          <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">from the current role dataset</p>
        </div>
        <div className="p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Next decision</dt>
          <dd className="mt-2 text-base font-bold text-[var(--arzon-ink-strong)]">Inspect the role</dd>
          <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">Then compare preparation options.</p>
        </div>
      </dl>
    </section>
  );
}
