/**
 * HeroSnapshot — a Coursera-style course-overview hero. One screen, one
 * question answered: what is my strongest match, how confident are we, and
 * what can I do right now? Renders above the first chapter of the report.
 *
 * All data derives from the existing CareerEngineResult + PATHS + EMPLOYERS
 * tables. No new data pipelines.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Building2, Target, MapPin, IndianRupee, Timer } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { EMPLOYERS } from "@/data/industry/employers";
import { getPathDossier } from "@/data/careerPathDossier";
import { REPORT_TONES, REPORT_PRIMARY_CTA_GRADIENT } from "./reportTones";

function firstName(profile?: CareerEngineResult["profile"]): string | null {
  const raw = ((profile as { name?: string } | undefined)?.name ?? "").trim();
  if (!raw) return null;
  return raw.split(/\s+/)[0] ?? null;
}

function fresherSalaryLabel(slug: string): string | null {
  const dossier = getPathDossier(slug);
  const entry = dossier.salaryTrajectory.find((p) => p.year === 0) ?? dossier.salaryTrajectory[0];
  if (!entry) return null;
  const midpoint = (entry.min + entry.max) / 2;
  return `₹${midpoint.toFixed(1)} LPA`;
}

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
  const roleTitle = path?.title ?? result.archetype?.name ?? "Your top career match";
  const confidence = Math.round(result.confidence ?? result.fitScore ?? 0);
  const salary = primarySlug ? fresherSalaryLabel(primarySlug) : null;
  const companies = primarySlug ? hiringCompanyCount(primarySlug) : 0;
  const cities = primarySlug ? topCities(primarySlug, 3) : [];
  const readiness = Math.round(result.fitScore ?? 0);
  const answered = result.evidence?.scoring?.answered ?? 0;
  const jdCount = 198; // JD-blueprint corpus size; matches copy across product
  const greeting = firstName(result.profile);

  const handleStart = () => {
    if (onScrollToStart) {
      onScrollToStart();
      return;
    }
    const el = document.getElementById("ch-1-verdict");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="report-hero-heading"
      className="report-hero-plate report-print-hide relative overflow-hidden"
    >
      <p className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
        <Sparkles className={`h-3 w-3 ${REPORT_TONES.primary.chipPillText}`} aria-hidden />
        Best Match
      </p>

      <h1
        id="report-hero-heading"
        className="mt-5 font-serif text-3xl leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[42px]"
      >
        {greeting ? (
          <>
            {roleTitle.toUpperCase()}
            <span className="mt-2 block text-lg font-sans font-normal text-white/60">
              Congratulations, {greeting}. This is your strongest fit.
            </span>
          </>
        ) : (
          <>{roleTitle.toUpperCase()}</>
        )}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.55] text-white/85">
        Based on <span className="text-white/90">{answered} answers</span> and{" "}
        <span className="text-white/90">{jdCount} live Indian job descriptions</span>.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[15px] font-medium text-white/90">
            <Target className={`h-4 w-4 ${REPORT_TONES.primary.chipPillText}`} aria-hidden />
            Interview Ready <span className="tabular-nums text-white">{readiness}%</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <Link
            to="/career-engine"
            className={`inline-flex h-11 items-center gap-2 rounded-full ${REPORT_PRIMARY_CTA_GRADIENT} px-5 font-grotesk text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] transition`}
          >
            Take ASSAY Hiring Simulation <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleStart}
            className="report-focus-ring inline-flex h-11 items-center gap-2 rounded-full px-4 font-grotesk text-sm font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
          >
            Read my brief
          </button>
        </div>
      </div>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-white/8 lg:rounded-2xl lg:border lg:border-white/8 lg:bg-white/[0.015]">
        <SnapshotStat
          icon={<IndianRupee className="h-4 w-4" aria-hidden />}
          label="Fresher salary"
          value={salary ?? "See chapter 11"}
        />
        <SnapshotStat
          icon={<Building2 className="h-4 w-4" aria-hidden />}
          label="Hiring right now"
          value={companies > 0 ? `${companies} companies` : "Data building"}
        />
        <SnapshotStat
          icon={<Timer className="h-4 w-4" aria-hidden />}
          label="Time to first interview"
          value="12 weeks"
        />
        <SnapshotStat
          icon={<Target className="h-4 w-4" aria-hidden />}
          label="Interview readiness"
          value={`${readiness}%`}
        />
        <SnapshotStat
          icon={<MapPin className="h-4 w-4" aria-hidden />}
          label="Top cities"
          value={cities.length ? cities.join(" · ") : "Pan-India"}
        />
      </dl>
    </section>
  );
}

function SnapshotStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.015] px-5 py-4 lg:rounded-none lg:border-0 lg:bg-transparent">
      <dt className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
        <span className="text-white/40">{icon}</span>
        {label}
      </dt>
      <dd className="mt-3 truncate font-serif text-h3 leading-none tracking-tight tabular-nums text-white">
        {value}
      </dd>
    </div>
  );
}

export default HeroSnapshot;
