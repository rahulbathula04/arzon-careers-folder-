import { useState } from "react";
import { ArrowRight, Search, Info, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

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
    name: "Arun Jain",
    college: "Dayanand Sagar College of Pharmacy",
    track: "Pharmacovigilance",
    score: 96,
    avatar: "/images/testimonials/arun-jain.png",
  },
  {
    rank: "02",
    name: "Pooja Patel",
    college: "JSS College of Pharmacy, Ooty",
    track: "Clinical Data Management",
    score: 94,
    avatar: "/images/testimonials/pooja-patel.jpg",
  },
  {
    rank: "03",
    name: "Ronak Reddy",
    college: "Bombay College of Pharmacy, Mumbai",
    track: "Regulatory Affairs",
    score: 93,
    avatar: "/images/testimonials/ronak-reddy.jpg",
  },
  {
    rank: "04",
    name: "Aman D",
    college: "Osmania University, Hyderabad",
    track: "Medical Coding",
    score: 91,
    avatar: "/images/testimonials/aman-d.jpg",
  },
];

export function CareerEngineLeaderboard() {
  const [activeTab, setActiveTab] = useState<"candidates" | "universities" | "duel">("candidates");
  const [search, setSearch] = useState("");
  const prefersReduced = useReducedMotion();

  const filteredCandidates = CANDIDATES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.college.toLowerCase().includes(search.toLowerCase()) ||
    c.track.toLowerCase().includes(search.toLowerCase())
  );

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const tabs = [
    { id: "candidates" as const, label: "Top Candidates" },
    { id: "universities" as const, label: "University Rankings" },
    { id: "duel" as const, label: "1v1 Challenge" },
  ];

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light" id="leaderboard">
      <div className="ap-shell">
        {/* Header Bar */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>CANDIDATE HEALTHCARE ROLE READINESS ARENA · 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
              Top verified candidates.<br />
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                One place to see where you stand.
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B] max-w-xl">
              Candidates benchmark their clinical role readiness across 40 calibrated scenario questions before beginning practical training cohorts.
            </p>
          </div>

          <Link
            to="/career-engine/start"
            className="w-full sm:w-auto h-11 sm:h-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-start md:self-auto active:scale-95"
          >
            <span>Take diagnostic</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? "text-white" : "text-[#475569] hover:text-[#071A4A] bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLeaderboardTab"
                      className="absolute inset-0 rounded-full bg-[#1557D6] shadow-xs"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {filteredCandidates.map((c) => (
            <motion.article
              key={c.name}
              variants={prefersReduced ? undefined : cardVariants}
              whileHover={prefersReduced ? undefined : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:border-[#1557D6]/30 hover:shadow-md transition-all tone-light card-light flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-11 w-11 rounded-full object-cover object-[center_20%] border border-[#E4EAF2]"
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

              {/* Score Bar with Slow Motion Fill */}
              <div className="pt-2 border-t border-[#F1F5F9]">
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-[#64748B] text-[10px] font-sans font-semibold">Role Readiness</span>
                  <span className="text-[#1557D6]">{c.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1557D6] to-[#38BDF8] rounded-full"
                    initial={prefersReduced ? { width: `${c.score}%` } : { width: 0 }}
                    whileInView={{ width: `${c.score}%` }}
                    viewport={{ once: true }}
                    transition={
                      prefersReduced
                        ? undefined
                        : {
                            duration: 0.85,
                            delay: 0.15,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }
                    }
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
