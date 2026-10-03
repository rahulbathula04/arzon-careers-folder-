import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, ArrowRight, Zap, ShieldCheck, Sparkles, Building2, Flame } from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ViralLeaderboardSuite } from "@/components/career/leaderboard/ViralLeaderboardSuite";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/career-engine/leaderboard")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine/leaderboard",
      title: "National Healthcare Career Leaderboard & College Arena · Arzon",
      description:
        "Explore national rankings, verified candidate scores, and university power rankings across Pharmacovigilance, Clinical Data Management, Regulatory Affairs, Medical Coding, and SAS Clinical.",
    });
    return {
      meta: [
        { title: "National Healthcare Leaderboard & College Arena | Arzon Global" },
        ...ps.meta,
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Career Engine", path: "/career-engine" },
            { name: "Leaderboard", path: "/career-engine/leaderboard" },
          ]),
        },
      ],
    };
  },
  component: CareerEngineLeaderboardPage,
});

function CareerEngineLeaderboardPage() {
  return (
    <CareerShell>
      <main className="min-h-screen arzon-page-surface pb-16">
        {/* Apple Frosted Hero Banner */}
        <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-slate-200/80 bg-white/80 tone-light backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold text-[#1557D6] uppercase tracking-wider border border-[#D0E1FD]/80 shadow-2xs">
                  <Trophy className="h-3.5 w-3.5 text-[#1557D6]" />
                  <span>NATIONAL HEALTHCARE ARENA · 2026</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#071A4A] tracking-tight">
                  National Role Readiness Leaderboard & University Power Index
                </h1>
                <p className="text-[#3F4A60] text-sm sm:text-base leading-relaxed max-w-2xl">
                  Authenticated 42-point clinical situational diagnostics evaluated against global regulatory and CRO operational benchmarks across India's premier pharmacy & life sciences institutions.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/career-engine/start"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Take Diagnostic · Claim Rank</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Viral Leaderboard Suite */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <ViralLeaderboardSuite />
        </section>

        {/* Apple Dark Panel CTA Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
          <div className="rounded-3xl bg-[#071A4A] text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden border border-white/10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/15 blur-[80px]" />

            <div className="space-y-2 text-center sm:text-left z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                READY TO PROVE YOUR CLINICAL READINESS?
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Benchmark your skills against national peers today.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Take the 6-minute Arzon Healthcare Career Intelligence Diagnostic. Unlock your verified dossier, claim your national rank, and challenge your classmates.
              </p>
            </div>

            <Link
              to="/career-engine/start"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white tone-light px-7 py-3 text-sm font-bold text-[#071A4A] hover:bg-blue-50 transition-all shadow-md shrink-0 z-10 active:scale-[0.98]"
            >
              <span>Start Free Diagnostic</span>
              <ArrowRight className="h-4 w-4 text-[#1557D6]" />
            </Link>
          </div>
        </section>
      </main>
    </CareerShell>
  );
}
