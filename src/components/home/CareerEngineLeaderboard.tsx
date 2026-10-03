import { Link } from "@tanstack/react-router";
import { Trophy, ArrowRight, Zap, Sparkles } from "lucide-react";
import { ViralLeaderboardSuite } from "@/components/career/leaderboard/ViralLeaderboardSuite";

export function CareerEngineLeaderboard() {
  return (
    <section className="ap-section ap-white font-sans text-[#071A4A]" id="leaderboard">
      <div className="ap-shell max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4EAF2]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold text-[#1557D6] uppercase tracking-wider mb-2">
              <Trophy className="h-3.5 w-3.5 text-[#1557D6]" />
              NATIONAL HEALTHCARE ROLE READINESS ARENA · 2026
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#071A4A] tracking-tight">
              Top Verified Candidates & University Arena
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#3F4A60] max-w-2xl leading-relaxed">
              Every score on this leaderboard represents an authenticated clinical diagnostic evaluated against pharmaceutical & CRO industry operational standards.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/career-engine/start"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all w-full sm:w-auto"
            >
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Take Diagnostic · Claim Rank</span>
            </Link>
          </div>
        </div>

        {/* ─── Viral Leaderboard Suite Component ───────────────────────────── */}
        <div className="mt-8">
          <ViralLeaderboardSuite />
        </div>

        {/* ─── Explanatory Scoring Note ──────────────────────────────────── */}
        <div className="mt-12 rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
                <Sparkles className="h-4 w-4" />
                CAREER ENGINE VERIFIED DIAGNOSTICS
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-[#071A4A]">
                How candidates earn their verified national rank
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#3F4A60] max-w-2xl leading-relaxed">
                Candidates undergo a 42-point clinical situational diagnostic measuring regulatory vigilance, discrepancy detection, ICSR causality logic, and structured writing discipline across 5 core healthcare domains.
              </p>
            </div>

            <Link
              to="/career-engine/start"
              className="inline-flex shrink-0 min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1557D6] transition-all w-full sm:w-auto"
            >
              <span>Test Your Readiness</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
