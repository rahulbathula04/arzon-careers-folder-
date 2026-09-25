import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Trophy,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { getAcriLeaderboardFn } from "@/lib/acri-core.functions";

export const Route = createFileRoute("/acri/leaderboard")({
  head: () => {
    const ps = pageSeo({
      path: "/acri/leaderboard",
      title: "ACRI Weekly Leaders · Pharmacovigilance Certification",
      description:
        "Recognising top performers in the ACRI Pharmacovigilance certification assessment across universities and institutions.",
    });
    return {
      meta: [
        { title: "ACRI Weekly Leaders · Pharmacovigilance Certification" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriLeaderboardPage,
});

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  status: "Industry Ready" | "Near Ready";
  avatarColor: string;
  avatarImg?: string;
  college?: string;
}

const FALLBACK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Ananya R.", score: 96, status: "Industry Ready", avatarColor: "bg-emerald-600", avatarImg: "/images/avatar-ananya.jpg", college: "Manipal College of Pharm Sciences" },
  { rank: 2, name: "Rahul K.", score: 92, status: "Industry Ready", avatarColor: "bg-teal-600", avatarImg: "/images/avatar-rahul.jpg", college: "JSS College of Pharmacy" },
  { rank: 3, name: "Priya S.", score: 91, status: "Industry Ready", avatarColor: "bg-indigo-600", avatarImg: "/images/avatar-priya.jpg", college: "NIPER Hyderabad" },
  { rank: 4, name: "Arjun M.", score: 89, status: "Industry Ready", avatarColor: "bg-blue-600", college: "Bombay College of Pharmacy" },
  { rank: 5, name: "Sneha P.", score: 87, status: "Industry Ready", avatarColor: "bg-purple-600", avatarImg: "/images/avatar-sneha.jpg", college: "Poona College of Pharmacy" },
  { rank: 6, name: "Karan V.", score: 84, status: "Near Ready", avatarColor: "bg-amber-600", college: "Delhi Institute of Pharm Sciences" },
  { rank: 7, name: "Meera T.", score: 83, status: "Near Ready", avatarColor: "bg-rose-600", college: "MS Ramaiah University" },
  { rank: 8, name: "Vishal S.", score: 81, status: "Near Ready", avatarColor: "bg-cyan-600", college: "KLE College of Pharmacy" },
  { rank: 9, name: "Pooja N.", score: 79, status: "Near Ready", avatarColor: "bg-emerald-700", college: "SRM College of Pharmacy" },
  { rank: 10, name: "Aditya G.", score: 78, status: "Near Ready", avatarColor: "bg-slate-700", college: "Amrita School of Pharmacy" },
];

function AcriLeaderboardPage() {
  const [filterPeriod, setFilterPeriod] = useState<"week" | "month" | "all">("week");
  const [entries, setEntries] = useState<LeaderboardEntry[]>(FALLBACK_LEADERBOARD);
  const [stats, setStats] = useState({ totalCompleted: 47, averageScore: 74, industryReadyCount: 31 });

  useEffect(() => {
    getAcriLeaderboardFn()
      .then((res) => {
        if (res && res.entries && res.entries.length > 0) {
          const colors = ["bg-emerald-600", "bg-teal-600", "bg-indigo-600", "bg-blue-600", "bg-purple-600"];
          const mapped: LeaderboardEntry[] = res.entries.map((item: any, idx: number) => ({
            rank: item.rank,
            name: item.name,
            score: item.score,
            status: item.score >= 80 ? "Industry Ready" : "Near Ready",
            avatarColor: colors[idx % colors.length],
            college: item.college,
          }));
          setEntries(mapped);
          if (res.stats) setStats(res.stats);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F8F5] text-[#0B1325] py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold uppercase tracking-wider border border-[#005B4F]/20">
              ACRI PHARMACOVIGILANCE CERTIFICATION
            </span>
            <span className="text-stone-400 text-xs font-mono">•</span>
            <span className="text-stone-500 text-xs font-mono font-semibold">
              Week 39 · September 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1325] tracking-tight">
            ACRI Weekly Leaders
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Recognising top performers in the ACRI Pharmacovigilance assessment. Scores reflect
            rigorous clinical simulation decisions, ICSR processing, and causality analysis.
          </p>
        </div>

        {/* 3 Metric Stat Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white tone-light card-light p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-[#0B1325]">{stats.totalCompleted}</div>
              <div className="text-xs text-stone-500 font-medium">Candidates this week</div>
            </div>
          </div>

          <div className="bg-white tone-light card-light p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-[#0B1325]">{stats.averageScore}</div>
              <div className="text-xs text-stone-500 font-medium">Average ACRI score</div>
            </div>
          </div>

          <div className="bg-white tone-light card-light p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#E8F7F1] border border-emerald-100 flex items-center justify-center text-[#005B4F] shrink-0">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-serif font-black text-[#0B1325]">{stats.industryReadyCount}</div>
              <div className="text-xs text-stone-500 font-medium">Industry Ready this week</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Time Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white tone-light card-light border border-stone-200">
            <button
              type="button"
              onClick={() => setFilterPeriod("week")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterPeriod === "week"
                  ? "bg-[#005B4F] text-white shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              This Week
            </button>
            <button
              type="button"
              onClick={() => setFilterPeriod("month")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterPeriod === "month"
                  ? "bg-[#005B4F] text-white shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => setFilterPeriod("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterPeriod === "all"
                  ? "bg-[#005B4F] text-white shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              All Time
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-mono">Cohort: Cohort 01</span>
          </div>
        </div>

        {/* Leaderboard Table Card */}
        <div className="bg-white tone-light card-light rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F5]/80 text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
                  <th className="py-3.5 px-4 sm:px-6">Candidate</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Score</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                {entries.map((entry) => {
                  const isTop3 = entry.rank <= 3;
                  const medalEmoji =
                    entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : null;

                  return (
                    <tr
                      key={entry.rank}
                      className="hover:bg-stone-50 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 sm:px-6 text-center font-mono font-bold text-stone-700">
                        {medalEmoji ? (
                          <span className="text-base">{medalEmoji}</span>
                        ) : (
                          <span className="text-stone-400">{entry.rank}</span>
                        )}
                      </td>

                      {/* Candidate */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-full overflow-hidden ${entry.avatarColor} text-white font-semibold text-xs flex items-center justify-center shadow-2xs shrink-0`}
                          >
                            {entry.avatarImg ? (
                              <img
                                src={entry.avatarImg}
                                alt={entry.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span>{entry.name.slice(0, 1)}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-[#0B1325]">{entry.name}</div>
                            {entry.college && (
                              <div className="text-[11px] text-stone-500 truncate max-w-[200px] sm:max-w-none">
                                {entry.college}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        <span className="font-mono font-black text-sm text-[#0B1325]">
                          {entry.score}
                        </span>
                        <span className="font-mono text-stone-400 text-xs">/100</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                            entry.status === "Industry Ready"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-[#FAF8F5] border-t border-stone-200 text-xs text-stone-500 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />
            <span>
              Leaderboard displays candidates who opted into public achievement rankings. Names are
              formatted with first name and last initial to uphold privacy standards.
            </span>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#005B4F] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-serif font-bold text-white">
              Ready to benchmark your clinical readiness?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Take the 25-minute ACRI Pharmacovigilance assessment to discover your capability profile and earn your certified credential.
            </p>
          </div>

          <Link
            to="/acri/pharmacovigilance-certification"
            className="px-6 py-3 rounded-xl bg-white tone-light text-[#005B4F] font-semibold text-xs sm:text-sm hover:bg-emerald-50 transition-colors shadow-xs shrink-0 flex items-center gap-2"
          >
            <span>Apply for an Invite</span>
            <ArrowRight className="h-4 w-4 text-[#005B4F]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
