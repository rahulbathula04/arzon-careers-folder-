import { useState, useMemo } from "react";
import {
  ArrowRight,
  Search,
  Trophy,
  Landmark,
  BarChart3,
  Award,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

interface CandidateRecord {
  rank: string;
  name: string;
  college: string;
  track: string;
  score: number;
  avatar: string;
}

interface UniversityRecord {
  rank: string;
  name: string;
  city: string;
  candidates: number;
  index: number;
  topTrack: string;
}

const CANDIDATES: CandidateRecord[] = [
  {
    rank: "01",
    name: "Arun Jain",
    college: "Dayanand Sagar College of Pharmacy",
    track: "Pharmacovigilance",
    score: 96,
    avatar: "/images/testimonials/arun-jain.png",
  },
  {
    rank: "02",
    name: "Neha Reddy",
    college: "JSS College of Pharmacy",
    track: "Clinical Data Mgmt.",
    score: 94,
    avatar: "/images/testimonials/pooja-patel.jpg",
  },
  {
    rank: "03",
    name: "Vikram Rao",
    college: "Sultan-ul-Uloom College",
    track: "Medical Coding",
    score: 92,
    avatar: "/images/testimonials/ronak-reddy.jpg",
  },
  {
    rank: "04",
    name: "Sneha Rao",
    college: "Osmania University, Hyderabad",
    track: "Pharmacovigilance",
    score: 94,
    avatar: "/images/testimonials/sneha-rao.jpg",
  },
  {
    rank: "05",
    name: "Aman D",
    college: "Osmania University, Hyderabad",
    track: "Medical Coding",
    score: 91,
    avatar: "/images/testimonials/aman-d.jpg",
  },
  {
    rank: "06",
    name: "Ananya Verma",
    college: "Bombay College of Pharmacy",
    track: "Regulatory Affairs",
    score: 91,
    avatar: "/images/testimonials/ananya-verma.jpg",
  },
];

const UNIVERSITIES: UniversityRecord[] = [
  {
    rank: "01",
    name: "NIPER Hyderabad",
    city: "Hyderabad, Telangana",
    candidates: 214,
    index: 96.4,
    topTrack: "Pharmacovigilance",
  },
  {
    rank: "02",
    name: "JSS College of Pharmacy",
    city: "Ooty, Tamil Nadu",
    candidates: 198,
    index: 95.8,
    topTrack: "Clinical Data Mgmt.",
  },
  {
    rank: "03",
    name: "Osmania University",
    city: "Hyderabad, Telangana",
    candidates: 342,
    index: 94.9,
    topTrack: "Medical Coding",
  },
  {
    rank: "04",
    name: "Bombay College of Pharmacy",
    city: "Mumbai, Maharashtra",
    candidates: 176,
    index: 94.1,
    topTrack: "Regulatory Affairs",
  },
  {
    rank: "05",
    name: "Dayanand Sagar College of Pharmacy",
    city: "Bengaluru, Karnataka",
    candidates: 152,
    index: 93.6,
    topTrack: "Pharmacovigilance",
  },
];

export function CareerEngineLeaderboard() {
  const [activeTab, setActiveTab] = useState<"candidates" | "universities" | "insights">("candidates");
  const [search, setSearch] = useState("");
  const prefersReduced = useReducedMotion();

  // Search filter across candidates
  const filteredCandidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CANDIDATES;
    return CANDIDATES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.college.toLowerCase().includes(q) ||
        c.track.toLowerCase().includes(q)
    );
  }, [search]);

  // Search filter across universities
  const filteredUniversities = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return UNIVERSITIES;
    return UNIVERSITIES.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.topTrack.toLowerCase().includes(q)
    );
  }, [search]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="leaderboard"
      className="pb-10 sm:pb-16 bg-[#F8FAFC]"
      aria-labelledby="readiness-arena-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Master Card Container matching Reference Design media_1793949276015_4ba39a9b.jpg */}
        <motion.div
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#E2E8F0] bg-white tone-light card-light p-5 sm:p-9 lg:p-11 shadow-[0_12px_40px_-15px_rgba(8,31,56,0.07)]"
          variants={prefersReduced ? undefined : cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Subtle light-blue radial glow in bottom-right corner */}
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100/35 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Header Eyebrow with hairline divider & 2026 Pill Badge */}
            <div className="flex items-center justify-between gap-3 mb-2 sm:mb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#081F38]">
                  CANDIDATE READINESS ARENA
                </span>
                <span className="h-px w-8 sm:w-14 bg-slate-300" aria-hidden="true" />
              </div>

              {/* 2026 Cohort Tag matching screenshot */}
              <div className="inline-flex items-center gap-1 rounded-full border border-blue-200/90 bg-blue-50/70 px-3 py-0.5 text-[11px] sm:text-xs font-mono font-bold text-[#2563EB] shadow-2xs">
                <span>2026</span>
              </div>
            </div>

            {/* Precision Headline */}
            <h2
              id="readiness-arena-heading"
              className="text-2xl sm:text-3xl lg:text-[40px] font-sans font-bold text-[#081F38] tracking-[-0.025em] leading-[1.15] max-w-2xl"
            >
              Top verified candidates.
              <br />
              <span className="text-[#2563EB]">One place to see where you stand.</span>
            </h2>

            {/* Approved Supporting Copy */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-[#475569] leading-relaxed max-w-2xl">
              Benchmark your clinical role readiness across 40 calibrated scenario questions before
              beginning practical training.
            </p>

            {/* ─── 3 SEGMENTED TAB BUTTONS (Top Candidates, University Rankings, Cohort Insights) ─── */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-5 sm:my-6">
              <button
                type="button"
                onClick={() => setActiveTab("candidates")}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  activeTab === "candidates"
                    ? "bg-[#081F38] text-white shadow-sm ring-1 ring-slate-900/10"
                    : "bg-[#F1F5F9] text-[#081F38] hover:bg-[#E2E8F0]"
                }`}
                aria-pressed={activeTab === "candidates"}
              >
                <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Top Candidates</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("universities")}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  activeTab === "universities"
                    ? "bg-[#081F38] text-white shadow-sm ring-1 ring-slate-900/10"
                    : "bg-[#F1F5F9] text-[#081F38] hover:bg-[#E2E8F0]"
                }`}
                aria-pressed={activeTab === "universities"}
              >
                <Landmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>University Rankings</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("insights")}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  activeTab === "insights"
                    ? "bg-[#081F38] text-white shadow-sm ring-1 ring-slate-900/10"
                    : "bg-[#F1F5F9] text-[#081F38] hover:bg-[#E2E8F0]"
                }`}
                aria-pressed={activeTab === "insights"}
              >
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Cohort Insights</span>
              </button>
            </div>

            {/* ─── SEARCH & FILTER INPUT (Real functioning search) ─── */}
            {activeTab !== "insights" && (
              <div className="relative mb-4 sm:mb-5">
                <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "candidates"
                      ? "Search candidate name, college, or career track..."
                      : "Search university, city, or top track..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-[#F8FAFC] pl-10 sm:pl-11 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-[#081F38] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-hidden transition-all tone-light"
                  aria-label="Filter arena records"
                />
              </div>
            )}

            {/* ─── TAB 1: TOP CANDIDATES LEADERBOARD ROWS (Matching Screenshot) ─── */}
            {activeTab === "candidates" && (
              <div className="space-y-2.5 sm:space-y-3">
                {filteredCandidates.length === 0 ? (
                  <div className="py-8 text-center text-xs sm:text-sm text-[#64748B] bg-slate-50/70 rounded-2xl border border-dashed border-slate-200">
                    No candidates found matching &ldquo;{search}&rdquo;. Try another term.
                  </div>
                ) : (
                  filteredCandidates.map((c) => (
                    <div
                      key={c.name}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:bg-slate-50/60 transition-all duration-200 shadow-2xs tone-light card-light"
                    >
                      {/* Left Block: Rank + Avatar + Name & College */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        {/* Rank Badge */}
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-[#081F38] shrink-0 border border-slate-200/60">
                          {c.rank}
                        </div>

                        {/* Circular Avatar */}
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover object-[center_20%] border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/pharmacy-student-avatar.jpg";
                          }}
                        />

                        {/* Name and University */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-sans text-sm sm:text-base font-bold text-[#081F38] truncate group-hover:text-[#2563EB] transition-colors">
                            {c.name}
                          </h3>
                          <p
                            className="text-[11px] sm:text-xs text-[#64748B] truncate mt-0.5"
                            title={c.college}
                          >
                            {c.college}
                          </p>
                        </div>
                      </div>

                      {/* Right Block: Track Pill + Score & Animated Progress Bar */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pl-11 sm:pl-0">
                        {/* Track Chip */}
                        <span className="inline-flex items-center rounded-full bg-[#EEF6FF] px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono font-bold text-[#1D4ED8] whitespace-nowrap">
                          {c.track}
                        </span>

                        {/* Score & Calibrated Progress Bar */}
                        <div className="flex flex-col items-end shrink-0 w-24 sm:w-32">
                          <span className="font-mono text-sm sm:text-base font-bold text-[#081F38]">
                            {c.score}%
                          </span>
                          <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full"
                              initial={prefersReduced ? { width: `${c.score}%` } : { width: 0 }}
                              whileInView={{ width: `${c.score}%` }}
                              viewport={{ once: true }}
                              transition={
                                prefersReduced
                                  ? undefined
                                  : {
                                      duration: 0.85,
                                      delay: 0.1,
                                      ease: [0.16, 1, 0.3, 1] as const,
                                    }
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ─── TAB 2: UNIVERSITY RANKINGS ─── */}
            {activeTab === "universities" && (
              <div className="space-y-2.5 sm:space-y-3">
                {filteredUniversities.length === 0 ? (
                  <div className="py-8 text-center text-xs sm:text-sm text-[#64748B] bg-slate-50/70 rounded-2xl border border-dashed border-slate-200">
                    No university records matching &ldquo;{search}&rdquo;.
                  </div>
                ) : (
                  filteredUniversities.map((u) => (
                    <div
                      key={u.name}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:bg-slate-50/60 transition-all duration-200 shadow-2xs tone-light card-light"
                    >
                      {/* Left: Rank + Icon + Name & City */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-[#081F38] shrink-0 border border-slate-200/60">
                          {u.rank}
                        </div>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-blue-50/80 border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0">
                          <Landmark className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-sans text-sm sm:text-base font-bold text-[#081F38] truncate group-hover:text-[#2563EB] transition-colors">
                            {u.name}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-[#64748B] truncate mt-0.5">
                            {u.city} · {u.candidates} assessed candidates
                          </p>
                        </div>
                      </div>

                      {/* Right: Top Track Chip + Readiness Index Bar */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pl-11 sm:pl-0">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono font-bold text-[#475569] whitespace-nowrap">
                          {u.topTrack}
                        </span>

                        <div className="flex flex-col items-end shrink-0 w-24 sm:w-32">
                          <span className="font-mono text-sm sm:text-base font-bold text-[#081F38]">
                            {u.index}%
                          </span>
                          <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full"
                              initial={prefersReduced ? { width: `${u.index}%` } : { width: 0 }}
                              whileInView={{ width: `${u.index}%` }}
                              viewport={{ once: true }}
                              transition={
                                prefersReduced
                                  ? undefined
                                  : {
                                      duration: 0.85,
                                      delay: 0.1,
                                      ease: [0.16, 1, 0.3, 1] as const,
                                    }
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ─── TAB 3: COHORT INSIGHTS ─── */}
            {activeTab === "insights" && (
              <div className="space-y-4">
                {/* 4 Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      TOTAL ASSESSED
                    </span>
                    <span className="block text-lg sm:text-xl font-mono font-bold text-[#081F38] mt-0.5">
                      10,000+
                    </span>
                    <span className="block text-[11px] text-[#64748B]">
                      Verified candidate pool
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      COHORT MEAN
                    </span>
                    <span className="block text-lg sm:text-xl font-mono font-bold text-[#081F38] mt-0.5">
                      84.6%
                    </span>
                    <span className="block text-[11px] text-[#64748B]">
                      Role readiness index
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      CALIBRATION
                    </span>
                    <span className="block text-lg sm:text-xl font-mono font-bold text-[#081F38] mt-0.5">
                      40 Questions
                    </span>
                    <span className="block text-[11px] text-[#64748B]">
                      Standardized test form
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-left">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      STANDARDS
                    </span>
                    <span className="block text-sm sm:text-base font-bold text-[#081F38] mt-1 truncate">
                      GVP · GCP · MedDRA
                    </span>
                    <span className="block text-[11px] text-[#64748B]">
                      Regulatory frameworks
                    </span>
                  </div>
                </div>

                {/* Track Readiness Distribution Breakdown */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white tone-light card-light space-y-3">
                  <span className="block text-xs sm:text-sm font-bold text-[#081F38]">
                    Clinical Track Readiness Distribution
                  </span>

                  {[
                    { track: "Pharmacovigilance & Drug Safety", rate: 88, color: "from-blue-600 to-cyan-500" },
                    { track: "Clinical Data Management (CDM)", rate: 84, color: "from-indigo-600 to-blue-400" },
                    { track: "Medical Coding & Informatics", rate: 86, color: "from-emerald-600 to-teal-400" },
                    { track: "Regulatory Affairs", rate: 82, color: "from-amber-600 to-yellow-400" },
                  ].map((item) => (
                    <div key={item.track} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#475569] font-medium">{item.track}</span>
                        <span className="font-mono font-bold text-[#081F38]">{item.rate}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── FULL-WIDTH PRIMARY CTA BUTTON (Matching reference screenshot) ─── */}
            <Link
              to="/career-engine/start"
              className="mt-6 sm:mt-7 w-full h-12.5 sm:h-14 inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#153270] text-white text-sm sm:text-base font-bold shadow-md shadow-slate-900/10 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <span>Take Diagnostic Test</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
