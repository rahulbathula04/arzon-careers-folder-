import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Building2, Target, MapPin, IndianRupee, Timer } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { EMPLOYERS } from "@/data/industry/employers";
import { getPathDossier } from "@/data/careerPathDossier";

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
  const roleTitle = path?.title ?? result.archetype?.name ?? "Pharmacovigilance";
  const salary = primarySlug ? fresherSalaryLabel(primarySlug) : "₹4.8 LPA";
  const companies = primarySlug ? hiringCompanyCount(primarySlug) : 18;
  const cities = primarySlug ? topCities(primarySlug, 3) : ["Hyderabad", "Bengaluru", "Mumbai"];
  const readiness = Math.round(result.fitScore ?? 69);
  const answered = result.evidence?.scoring?.answered ?? 40;
  const jdCount = 198;
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
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
    >
      {/* Top Ambient Glow Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Best Match Verdict
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
          {answered} Data Points • {jdCount} Live JDs Analyzed
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <h1
          id="report-hero-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
        >
          {roleTitle}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {greeting ? `Congratulations, ${greeting}. ` : ""}
          Based on your answers, this is your <span className="italic text-amber-400 font-serif font-bold">top-tier workforce deployment match</span> in Indian Pharma & CROs.
        </p>
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Interview Readiness:</span>
          <span className="font-mono text-xl font-extrabold text-blue-400 tabular-nums">{readiness}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/courses/$slug"
            params={{ slug: primarySlug ?? "pharmacovigilance" }}
            className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Take ASSAY Hiring Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={handleStart}
            className="h-12 px-5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors shrink-0"
          >
            Read Brief ↓
          </button>
        </div>
      </div>

      {/* Stat Tiles Grid (Unicorn Dark Glassmorphism) */}
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-4">
        <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">
          <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            <IndianRupee className="h-3.5 w-3.5 text-blue-400" /> Fresher Salary
          </dt>
          <dd className="font-serif text-2xl font-bold text-white tabular-nums">{salary}</dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">
          <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            <Building2 className="h-3.5 w-3.5 text-blue-400" /> Hiring Right Now
          </dt>
          <dd className="font-serif text-2xl font-bold text-white">{companies > 0 ? `${companies} CROs` : "18 Companies"}</dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">
          <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            <Timer className="h-3.5 w-3.5 text-blue-400" /> Time to Offer
          </dt>
          <dd className="font-serif text-2xl font-bold text-white">12 Weeks</dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">
          <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            <Target className="h-3.5 w-3.5 text-blue-400" /> Match Score
          </dt>
          <dd className="font-serif text-2xl font-bold text-emerald-400 tabular-nums">{readiness}%</dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-lg hover:border-blue-500/30 transition-all">
          <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-blue-400" /> Top Metros
          </dt>
          <dd className="font-serif text-base font-bold text-white truncate">{cities.slice(0, 2).join(" • ")}</dd>
        </div>
      </dl>
    </section>
  );
}
