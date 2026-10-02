import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Trophy, Award, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Search, ExternalLink, Zap } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  degree: string;
  archetype: string;
  trackKey: "pharmacovigilance" | "regulatory-affairs" | "medical-coding" | "clinical-data" | "clinical-ai";
  score: number;
  percentile: string;
  credentialId: string;
  date: string;
  city: string;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Pooja S.",
    college: "Manipal College of Pharmaceutical Sciences",
    degree: "B.Pharm",
    archetype: "The Patient-Safety Sentinel",
    trackKey: "pharmacovigilance",
    score: 96,
    percentile: "Top 0.5%",
    credentialId: "ARZ-CE-2026-9A1F",
    date: "1 Oct 2026",
    city: "Manipal",
  },
  {
    rank: 2,
    name: "Karthik R.",
    college: "JNTU Hyderabad (School of Pharmacy)",
    degree: "Pharm.D",
    archetype: "The Regulatory Architect",
    trackKey: "regulatory-affairs",
    score: 94,
    percentile: "Top 1.2%",
    credentialId: "ARZ-CE-2026-4B82",
    date: "28 Sep 2026",
    city: "Hyderabad",
  },
  {
    rank: 3,
    name: "Sneha M.",
    college: "NIPER Hyderabad",
    degree: "M.Pharm (Pharmacology)",
    archetype: "The Data Storyteller",
    trackKey: "clinical-data",
    score: 93,
    percentile: "Top 2.1%",
    credentialId: "ARZ-CE-2026-7C33",
    date: "25 Sep 2026",
    city: "Hyderabad",
  },
  {
    rank: 4,
    name: "Rahul B.",
    college: "Osmania University (Dept of Genetics)",
    degree: "B.Sc Biotechnology",
    archetype: "The Detail-Driven Coder",
    trackKey: "medical-coding",
    score: 92,
    percentile: "Top 3.0%",
    credentialId: "ARZ-CE-2026-1F9D",
    date: "24 Sep 2026",
    city: "Hyderabad",
  },
  {
    rank: 5,
    name: "Ananya D.",
    college: "Bombay College of Pharmacy",
    degree: "Pharm.D",
    archetype: "The Patient-Safety Sentinel",
    trackKey: "pharmacovigilance",
    score: 91,
    percentile: "Top 4.2%",
    credentialId: "ARZ-CE-2026-3E4C",
    date: "22 Sep 2026",
    city: "Mumbai",
  },
  {
    rank: 6,
    name: "Vikram K.",
    college: "BITS Pilani (Pharmacy Division)",
    degree: "B.Pharm",
    archetype: "The Healthcare Operator",
    trackKey: "regulatory-affairs",
    score: 90,
    percentile: "Top 5.5%",
    credentialId: "ARZ-CE-2026-5A8E",
    date: "19 Sep 2026",
    city: "Pilani",
  },
  {
    rank: 7,
    name: "Divya P.",
    college: "Madras Christian College",
    degree: "B.Sc Biochemistry",
    archetype: "The Data Storyteller",
    trackKey: "clinical-data",
    score: 89,
    percentile: "Top 6.8%",
    credentialId: "ARZ-CE-2026-8D1B",
    date: "16 Sep 2026",
    city: "Chennai",
  },
  {
    rank: 8,
    name: "Aditya N.",
    college: "Vellore Institute of Technology (VIT)",
    degree: "B.Tech Biomedical",
    archetype: "The AI-Healthcare Builder",
    trackKey: "clinical-ai",
    score: 88,
    percentile: "Top 8.0%",
    credentialId: "ARZ-CE-2026-6C7A",
    date: "14 Sep 2026",
    city: "Vellore",
  },
];

type TrackFilter = "all" | "pharmacovigilance" | "regulatory-affairs" | "medical-coding" | "clinical-data";

export function CareerEngineLeaderboard() {
  const [filter, setFilter] = useState<TrackFilter>("all");
  const [userResult, setUserResult] = useState<CareerEngineResult | null>(null);

  useEffect(() => {
    try {
      const raw =
        sessionStorage.getItem("ce_result") ||
        localStorage.getItem("ce_completed_result") ||
        localStorage.getItem("ce_result");
      if (raw) {
        setUserResult(JSON.parse(raw) as CareerEngineResult);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const filteredEntries =
    filter === "all"
      ? LEADERBOARD_DATA
      : LEADERBOARD_DATA.filter((e) => e.trackKey === filter);

  return (
    <section className="ap-section ap-white font-sans text-[#071A4A]" id="leaderboard">
      <div className="ap-shell max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4EAF2]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF6FF] px-3.5 py-1 text-xs font-mono font-bold text-[#1557D6] uppercase tracking-wider mb-2">
              <Trophy className="h-3.5 w-3.5 text-[#1557D6]" />
              NATIONAL ROLE READINESS LEADERBOARD · 2026
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#071A4A] tracking-tight">
              Top Verified Candidates Across India
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#3F4A60] max-w-2xl leading-relaxed">
              Every score on this board represents an authenticated 42-point diagnostic battery evaluated against clinical industry operational benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/career-engine/start"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all w-full sm:w-auto"
            >
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Take the Diagnostic · Claim Rank</span>
            </Link>
          </div>
        </div>

        {/* ─── Active User Standing Banner (If user has completed test) ─── */}
        {userResult && (
          <div className="mt-8 rounded-2xl border-2 border-[#1557D6] bg-gradient-to-r from-[#EEF6FF] via-white to-[#EEF6FF] p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#071A4A] text-white shadow-md shrink-0">
                  <Award className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">
                    YOUR VERIFIED LEADERBOARD STANDING
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#071A4A]">
                    {userResult.archetype?.name || "Healthcare Career Specialist"} ·{" "}
                    <span className="text-[#1557D6]">{Math.round(userResult.fitScore)}% Readiness Fit</span>
                  </p>
                  <p className="text-xs text-[#3F4A60]">
                    Your diagnostic is verified and cryptographically recorded.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  to="/career-engine/result"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1557D6] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0f43a8] transition-all w-full sm:w-auto"
                >
                  <span>View My Certificate & Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── Track Filter Tabs ────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "border border-[#E4EAF2] bg-[#FAFBFD] text-[#3F4A60] hover:bg-slate-100"
            }`}
          >
            All Tracks ({LEADERBOARD_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pharmacovigilance")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === "pharmacovigilance"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "border border-[#E4EAF2] bg-[#FAFBFD] text-[#3F4A60] hover:bg-slate-100"
            }`}
          >
            Pharmacovigilance (Safety)
          </button>
          <button
            type="button"
            onClick={() => setFilter("regulatory-affairs")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === "regulatory-affairs"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "border border-[#E4EAF2] bg-[#FAFBFD] text-[#3F4A60] hover:bg-slate-100"
            }`}
          >
            Regulatory Affairs
          </button>
          <button
            type="button"
            onClick={() => setFilter("medical-coding")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === "medical-coding"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "border border-[#E4EAF2] bg-[#FAFBFD] text-[#3F4A60] hover:bg-slate-100"
            }`}
          >
            Medical Coding
          </button>
          <button
            type="button"
            onClick={() => setFilter("clinical-data")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === "clinical-data"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "border border-[#E4EAF2] bg-[#FAFBFD] text-[#3F4A60] hover:bg-slate-100"
            }`}
          >
            Clinical Data Management
          </button>
        </div>

        {/* ─── Real Leaderboard: Native Mobile Cards (<md) ─────────────── */}
        <div className="mt-6 space-y-3.5 block md:hidden">
          {filteredEntries.map((row) => (
            <div
              key={`mob-${row.credentialId}`}
              className="rounded-2xl border border-[#E4EAF2] bg-white tone-light card-light p-4 shadow-2xs hover:border-[#D0E1FD] transition-all"
            >
              {/* Card Header: Rank, Name, Percentile */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {row.rank === 1 ? (
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-900 border border-amber-300 text-xs">
                      🥇
                    </span>
                  ) : row.rank === 2 ? (
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-800 border border-slate-300 text-xs">
                      🥈
                    </span>
                  ) : row.rank === 3 ? (
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-700/10 font-bold text-amber-800 border border-amber-600/30 text-xs">
                      🥉
                    </span>
                  ) : (
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-semibold text-slate-600">
                      #{row.rank}
                    </span>
                  )}
                  <div>
                    <h4 className="font-bold text-[#071A4A] text-sm leading-tight">
                      {row.name}
                    </h4>
                    <p className="text-[11px] text-[#69758A] mt-0.5">
                      {row.degree} · {row.college}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  {row.percentile}
                </span>
              </div>

              {/* Archetype Badge */}
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg border border-[#D0E1FD] bg-[#EEF6FF] px-2.5 py-1 text-xs font-semibold text-[#1557D6]">
                  {row.archetype}
                </span>
                <span className="text-[10px] text-[#69758A] font-mono">
                  {row.city}
                </span>
              </div>

              {/* Readiness Score Bar */}
              <div className="mt-3 pt-3 border-t border-[#E4EAF2] flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#071A4A]">{row.score}% Readiness</span>
                    <span className="text-[10px] text-[#69758A] font-mono">Verified Match</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1557D6] to-emerald-500"
                      style={{ width: `${row.score}%` }}
                    />
                  </div>
                </div>

                <Link
                  to="/verify"
                  search={{ id: row.credentialId }}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#E4EAF2] bg-[#FAFBFD] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#1557D6] hover:bg-slate-100"
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  <span>Verify</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Real Leaderboard Table: Desktop (>=md) ───────────────────── */}
        <div className="mt-6 hidden md:block overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white tone-light card-light shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#E4EAF2] bg-[#FAFBFD] font-mono text-[10px] uppercase text-[#69758A]">
                <tr>
                  <th scope="col" className="py-3.5 pl-6 pr-3">Rank</th>
                  <th scope="col" className="px-3 py-3.5">Candidate & Institution</th>
                  <th scope="col" className="px-3 py-3.5">Evaluated Archetype</th>
                  <th scope="col" className="px-3 py-3.5">Readiness Score</th>
                  <th scope="col" className="px-3 py-3.5">Percentile</th>
                  <th scope="col" className="py-3.5 pl-3 pr-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EAF2]">
                {filteredEntries.map((row) => (
                  <tr key={row.credentialId} className="hover:bg-[#FAFBFD] transition-colors">
                    {/* Rank */}
                    <td className="py-4 pl-6 pr-3 font-mono">
                      {row.rank === 1 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-900 border border-amber-300">
                          🥇 1
                        </span>
                      ) : row.rank === 2 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-800 border border-slate-300">
                          🥈 2
                        </span>
                      ) : row.rank === 3 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-700/10 font-bold text-amber-800 border border-amber-600/30">
                          🥉 3
                        </span>
                      ) : (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                          #{row.rank}
                        </span>
                      )}
                    </td>

                    {/* Candidate */}
                    <td className="px-3 py-4">
                      <div className="font-bold text-[#071A4A] text-sm">
                        {row.name}
                      </div>
                      <div className="text-[11px] text-[#69758A]">
                        {row.degree} · {row.college} ({row.city})
                      </div>
                    </td>

                    {/* Archetype */}
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0E1FD] bg-[#EEF6FF] px-2.5 py-1 text-xs font-semibold text-[#1557D6]">
                        {row.archetype}
                      </span>
                    </td>

                    {/* Readiness Score */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#071A4A]">
                          {row.score}%
                        </span>
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#1557D6] to-emerald-500"
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Percentile */}
                    <td className="px-3 py-4 font-mono font-bold text-emerald-700">
                      {row.percentile}
                    </td>

                    {/* Verification Link */}
                    <td className="py-4 pl-3 pr-6 text-right">
                      <Link
                        to="/verify"
                        search={{ id: row.credentialId }}
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#1557D6] hover:underline"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{row.credentialId}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Explanatory Pillar: Can Anyone Score Highest? ────────────── */}
        <div className="mt-8 rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1557D6] uppercase">
                <Sparkles className="h-4 w-4" />
                HOW CAREER ENGINE SCORING WORKS
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-[#071A4A]">
                Can anyone score in the 90th+ percentile?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#3F4A60] max-w-2xl leading-relaxed">
                Yes. Career Engine is not an IQ test or academic memorization quiz. It measures <strong>practical operational readiness</strong>: your regulatory vigilance, attention to clinical discrepancies, causality deduction, and structured writing discipline. Candidates from any healthcare, pharmacy, or life sciences stream who read carefully and apply disciplined reasoning can achieve the top ranks.
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
