import { useState } from "react";
import { ArrowRight, Search, ShieldCheck, Trophy, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Candidate {
  rank: string;
  name: string;
  college: string;
  track: string;
  score: number;
  avatar: string;
}

const CANDIDATES: Candidate[] = [
  {
    rank: "01",
    name: "Karthik R.",
    college: "JNTU Hyderabad",
    track: "Pharmacovigilance",
    score: 96,
    avatar: "/images/candidate-plaid.webp",
  },
  {
    rank: "02",
    name: "Pooja S.",
    college: "Manipal College of Pharmaceutical Sciences",
    track: "Regulatory Affairs",
    score: 94,
    avatar: "/images/candidate-woman.webp",
  },
  {
    rank: "03",
    name: "Siddharth M.",
    college: "NIPER Hyderabad",
    track: "Clinical Data Management",
    score: 93,
    avatar: "/images/candidate-maroon.webp",
  },
  {
    rank: "04",
    name: "Aman D.",
    college: "Andhra University College of Pharmacy",
    track: "Clinical Data Associate",
    score: 91,
    avatar: "/images/candidate-striped.webp",
  },
];

export function CareerEngineLeaderboard() {
  const [activeTab, setActiveTab] = useState<"candidates" | "universities" | "duel">("candidates");
  const [search, setSearch] = useState("");

  const filteredCandidates = CANDIDATES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.college.toLowerCase().includes(search.toLowerCase()) ||
    c.track.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light" id="leaderboard">
      <div className="ap-shell">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">
              <span>CANDIDATE HEALTHCARE ROLE READINESS ARENA · 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">
              Top verified candidates.<br />
              <span className="text-[#1557D6]">One place to see where you stand.</span>
            </h2>
          </div>

          <Link
            to="/career-engine/start"
            className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>Take diagnostic</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("candidates")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "candidates"
                  ? "bg-[#1557D6] text-white shadow-xs"
                  : "bg-slate-100 text-[#475569] hover:bg-slate-200"
              }`}
            >
              Top Candidates
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("universities")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "universities"
                  ? "bg-[#1557D6] text-white shadow-xs"
                  : "bg-slate-100 text-[#475569] hover:bg-slate-200"
              }`}
            >
              University Rankings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("duel")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "duel"
                  ? "bg-[#1557D6] text-white shadow-xs"
                  : "bg-slate-100 text-[#475569] hover:bg-slate-200"
              }`}
            >
              1v1 Challenge
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or university..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#E4EAF2] bg-[#F8FAFC] pl-9 pr-4 py-1.5 text-xs text-[#071A4A] placeholder-slate-400 focus:border-[#1557D6] focus:bg-white focus:outline-hidden transition-all tone-light"
            />
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCandidates.map((c) => (
            <article
              key={c.name}
              className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all tone-light card-light flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-11 w-11 rounded-full object-cover border border-[#E4EAF2]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/pharmacy-student-avatar.jpg";
                      }}
                    />
                    <span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#071A4A] text-white font-mono text-[9px] font-bold">
                      {c.rank}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-sm font-bold text-[#071A4A] truncate">
                      {c.name}
                    </h3>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5" title={c.college}>
                      {c.college}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center rounded-md bg-[#EEF6FF] px-2 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] mb-4">
                  {c.track}
                </div>
              </div>

              {/* Score Bar */}
              <div className="pt-2 border-t border-[#F1F5F9]">
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-[#64748B] text-[10px] font-sans font-semibold">Role Readiness</span>
                  <span className="text-[#1557D6]">{c.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1557D6] to-[#38BDF8] rounded-full"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Audit & Trust Notice */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono text-[#69758A] bg-[#F8FAFC] p-3 rounded-xl border border-[#E4EAF2]">
          <span className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-[#1557D6] shrink-0" />
            <span>Sample diagnostic records shown for index illustration. Readiness evaluated across 40 calibrated scenario questions.</span>
          </span>
          <Link to="/career-engine/start" className="text-[#1557D6] font-bold hover:underline">
            Take baseline assessment &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
