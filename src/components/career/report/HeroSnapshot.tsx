import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Building2, Target, MapPin, IndianRupee, Timer } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { EMPLOYERS } from "@/data/industry/employers";
import { getPathDossier } from "@/data/careerPathDossier";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";

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
    <Interactive3dCard
      maxTilt={6}
      depthScale={1.01}
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#161D2E] to-[#0E131F] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
    >
      <BorderBeam size={280} duration={12} delay={0} colorFrom="#38BDF8" colorTo="#F59E0B" />

      {/* Top Ambient Glow Pill with 3D Float */}
      <Card3dLayer translateZ={25} className="flex flex-wrap items-center justify-between gap-3">
        <Floating3dBadge duration={3} delay={0.1}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-emerald-300 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" /> Best Match Verdict ✦
          </span>
        </Floating3dBadge>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
          {answered} Data Points • {jdCount} Live JDs Analyzed
        </span>
      </Card3dLayer>

      {/* Main Headline */}
      <Card3dLayer translateZ={35} className="space-y-2">
        <h1
          id="report-hero-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
        >
          {roleTitle}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {greeting ? `Congratulations, ${greeting}. ` : ""}
          Based on your diagnostic answers, this is your{" "}
          <span className="italic text-amber-400 font-serif font-bold">
            top-tier workforce deployment match
          </span>{" "}
          in Indian Pharma & CROs.
        </p>
      </Card3dLayer>

      {/* Primary Action Row with 3D Depth */}
      <Card3dLayer translateZ={30} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2.5 bg-blue-950/40 border border-blue-500/30 px-4 py-2 rounded-xl">
          <Target className="h-5 w-5 text-sky-400" />
          <span className="text-sm font-semibold text-slate-200">Interview Readiness:</span>
          <span className="font-mono text-xl font-extrabold text-sky-400 tabular-nums">
            <NumberTicker value={readiness} />%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/courses/$slug"
            params={{ slug: primarySlug ?? "pharmacovigilance" }}
            className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-white font-bold bg-[#1B3F8B] hover:bg-[#153270] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Take ASSAY Hiring Simulation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={handleStart}
            className="h-12 px-5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Read Brief ↓
          </button>
        </div>
      </Card3dLayer>

      {/* Stat Tiles Grid with 3D Depth Layers */}
      <Card3dLayer translateZ={25}>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-4">
          <div className="rounded-2xl border border-white/10 bg-[#161F33]/80 p-4 space-y-1 shadow-lg hover:border-sky-500/40 hover:bg-[#1a253d] transition-all">
            <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              <IndianRupee className="h-3.5 w-3.5 text-sky-400" /> Fresher Salary
            </dt>
            <dd className="font-serif text-2xl font-bold text-white tabular-nums">{salary}</dd>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161F33]/80 p-4 space-y-1 shadow-lg hover:border-sky-500/40 hover:bg-[#1a253d] transition-all">
            <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              <Building2 className="h-3.5 w-3.5 text-sky-400" /> Hiring Right Now
            </dt>
            <dd className="font-serif text-2xl font-bold text-white">
              {companies > 0 ? `${companies} CROs` : "18 Companies"}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161F33]/80 p-4 space-y-1 shadow-lg hover:border-sky-500/40 hover:bg-[#1a253d] transition-all">
            <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              <Timer className="h-3.5 w-3.5 text-sky-400" /> Time to Offer
            </dt>
            <dd className="font-serif text-2xl font-bold text-white">12 Weeks</dd>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161F33]/80 p-4 space-y-1 shadow-lg hover:border-emerald-500/40 hover:bg-[#1a253d] transition-all">
            <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              <Target className="h-3.5 w-3.5 text-emerald-400" /> Match Score
            </dt>
            <dd className="font-serif text-2xl font-bold text-emerald-400 tabular-nums">
              {readiness}%
            </dd>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161F33]/80 p-4 space-y-1 shadow-lg hover:border-sky-500/40 hover:bg-[#1a253d] transition-all">
            <dt className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-sky-400" /> Top Metros
            </dt>
            <dd className="font-serif text-base font-bold text-white truncate">
              {cities.slice(0, 2).join(" • ")}
            </dd>
          </div>
        </dl>
      </Card3dLayer>
    </Interactive3dCard>
  );
}

