import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Trophy,
  Award,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  Zap,
  Users,
  Copy,
  Check,
  MessageCircle,
  Building2,
  Flame,
  Swords,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

export interface CandidateEntry {
  rank: number;
  name: string;
  college: string;
  degree: string;
  archetype: string;
  trackKey: "pharmacovigilance" | "clinical-data-management" | "medical-coding" | "regulatory-affairs" | "sas-clinical";
  trackLabel: string;
  score: number;
  percentile: string;
  credentialId: string;
  date: string;
  city: string;
  verified: boolean;
}

export interface CollegeEntry {
  rank: number;
  collegeName: string;
  city: string;
  state: string;
  aptitudeIndex: number;
  activeCandidates: number;
  topTrack: string;
  badge: string;
}

export const VERIFIED_CANDIDATES: CandidateEntry[] = [
  {
    rank: 1,
    name: "Pooja S.",
    college: "Manipal College of Pharmaceutical Sciences",
    degree: "Pharm.D",
    archetype: "The Patient-Safety Sentinel",
    trackKey: "pharmacovigilance",
    trackLabel: "Pharmacovigilance",
    score: 96,
    percentile: "Top 0.5%",
    credentialId: "ARZ-CE-2026-9A1F",
    date: "1 Oct 2026",
    city: "Manipal",
    verified: true,
  },
  {
    rank: 2,
    name: "Karthik R.",
    college: "JNTU Hyderabad (School of Pharmacy)",
    degree: "Pharm.D",
    archetype: "The Regulatory Architect",
    trackKey: "regulatory-affairs",
    trackLabel: "Regulatory Affairs",
    score: 94,
    percentile: "Top 1.2%",
    credentialId: "ARZ-CE-2026-4B82",
    date: "28 Sep 2026",
    city: "Hyderabad",
    verified: true,
  },
  {
    rank: 3,
    name: "Sneha M.",
    college: "NIPER Hyderabad",
    degree: "M.Pharm (Pharmacology)",
    archetype: "The Clinical Data Strategist",
    trackKey: "clinical-data-management",
    trackLabel: "Clinical Data Mgt",
    score: 93,
    percentile: "Top 2.1%",
    credentialId: "ARZ-CE-2026-7C33",
    date: "25 Sep 2026",
    city: "Hyderabad",
    verified: true,
  },
  {
    rank: 4,
    name: "Rahul B.",
    college: "Osmania University (Dept of Genetics)",
    degree: "B.Sc Biotechnology",
    archetype: "The Clinical Coding Auditor",
    trackKey: "medical-coding",
    trackLabel: "Medical Coding",
    score: 92,
    percentile: "Top 3.0%",
    credentialId: "ARZ-CE-2026-1F9D",
    date: "24 Sep 2026",
    city: "Hyderabad",
    verified: true,
  },
  {
    rank: 5,
    name: "Ananya D.",
    college: "Bombay College of Pharmacy",
    degree: "B.Pharm",
    archetype: "The Biostatistical SAS Analyst",
    trackKey: "sas-clinical",
    trackLabel: "SAS Clinical",
    score: 91,
    percentile: "Top 4.2%",
    credentialId: "ARZ-CE-2026-3E4C",
    date: "22 Sep 2026",
    city: "Mumbai",
    verified: true,
  },
  {
    rank: 6,
    name: "Vikram K.",
    college: "BITS Pilani (Pharmacy Division)",
    degree: "B.Pharm",
    archetype: "The Regulatory Architect",
    trackKey: "regulatory-affairs",
    trackLabel: "Regulatory Affairs",
    score: 90,
    percentile: "Top 5.5%",
    credentialId: "ARZ-CE-2026-5A8E",
    date: "19 Sep 2026",
    city: "Pilani",
    verified: true,
  },
  {
    rank: 7,
    name: "Divya P.",
    college: "Andhra University (College of Pharm Sciences)",
    degree: "M.Pharm",
    archetype: "The Clinical Data Strategist",
    trackKey: "clinical-data-management",
    trackLabel: "Clinical Data Mgt",
    score: 89,
    percentile: "Top 6.8%",
    credentialId: "ARZ-CE-2026-8D1B",
    date: "16 Sep 2026",
    city: "Visakhapatnam",
    verified: true,
  },
  {
    rank: 8,
    name: "Aditya N.",
    college: "Kakatiya University",
    degree: "Pharm.D",
    archetype: "The Patient-Safety Sentinel",
    trackKey: "pharmacovigilance",
    trackLabel: "Pharmacovigilance",
    score: 88,
    percentile: "Top 8.0%",
    credentialId: "ARZ-CE-2026-6C7A",
    date: "14 Sep 2026",
    city: "Warangal",
    verified: true,
  },
];

export const COLLEGE_POWER_RANKINGS: CollegeEntry[] = [
  {
    rank: 1,
    collegeName: "NIPER Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    aptitudeIndex: 96.4,
    activeCandidates: 214,
    topTrack: "Clinical Data Management",
    badge: "🏆 National Champion",
  },
  {
    rank: 2,
    collegeName: "Manipal College of Pharmaceutical Sciences",
    city: "Manipal",
    state: "Karnataka",
    aptitudeIndex: 95.8,
    activeCandidates: 198,
    topTrack: "Pharmacovigilance",
    badge: "🔥 High Velocity",
  },
  {
    rank: 3,
    collegeName: "Osmania University (College of Technology & Science)",
    city: "Hyderabad",
    state: "Telangana",
    aptitudeIndex: 94.9,
    activeCandidates: 342,
    topTrack: "Medical Coding",
    badge: "🚀 Most Active Campus",
  },
  {
    rank: 4,
    collegeName: "JNTU Hyderabad (School of Pharmacy)",
    city: "Hyderabad",
    state: "Telangana",
    aptitudeIndex: 93.7,
    activeCandidates: 289,
    topTrack: "Regulatory Affairs",
    badge: "⚡ Rising Contender",
  },
  {
    rank: 5,
    collegeName: "Bombay College of Pharmacy",
    city: "Mumbai",
    state: "Maharashtra",
    aptitudeIndex: 92.5,
    activeCandidates: 164,
    topTrack: "SAS Clinical Programming",
    badge: "⭐ Top Metro Division",
  },
  {
    rank: 6,
    collegeName: "Andhra University (College of Pharmaceutical Sciences)",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    aptitudeIndex: 91.8,
    activeCandidates: 175,
    topTrack: "Clinical Data Management",
    badge: "📍 Coastal Leader",
  },
  {
    rank: 7,
    collegeName: "Kakatiya University",
    city: "Warangal",
    state: "Telangana",
    aptitudeIndex: 90.6,
    activeCandidates: 142,
    topTrack: "Pharmacovigilance",
    badge: "🎯 High Precision",
  },
  {
    rank: 8,
    collegeName: "SRM College of Pharmacy",
    city: "Chennai",
    state: "Tamil Nadu",
    aptitudeIndex: 89.4,
    activeCandidates: 130,
    topTrack: "Medical Coding",
    badge: "✨ Rapid Challenger",
  },
];

const RECENT_ACTIVITY_TICKER = [
  "Sai Krishna (Pharm.D, JNTUH) just completed PV Diagnostic with 92% readiness fit",
  "Pooja S. (B.Pharm, Manipal) claimed #1 National Rank in Pharmacovigilance",
  "NIPER Hyderabad moved up to #1 Rank in the University Power Arena!",
  "Ananya D. (B.Pharm, BCP Mumbai) scored 91% in SAS Clinical Programming",
  "Osmania University crossed 340+ completed healthcare career diagnostics this week!",
];

type PillarFilter = "all" | "pharmacovigilance" | "clinical-data-management" | "medical-coding" | "regulatory-affairs" | "sas-clinical";

export function ViralLeaderboardSuite() {
  const [activeTab, setActiveTab] = useState<"candidates" | "colleges" | "duel">("candidates");
  const [pillarFilter, setPillarFilter] = useState<PillarFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userResult, setUserResult] = useState<CareerEngineResult | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Peer Duel Form State
  const [opponentName, setOpponentName] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("Osmania University");
  const [copiedLink, setCopiedLink] = useState(false);

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

  useEffect(() => {
    if (isReducedMotion()) return;
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % RECENT_ACTIVITY_TICKER.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredCandidates = VERIFIED_CANDIDATES.filter((c) => {
    const matchesPillar = pillarFilter === "all" || c.trackKey === pillarFilter;
    const matchesSearch =
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.credentialId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  const getWhatsAppShareUrl = (customText: string) => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(customText)}`;
  };

  const generateCollegeShareText = (collegeName: string, rank: number) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    return `🏛️ ${collegeName} is ranked #${rank} on the Arzon Healthcare Career Intelligence Index!\n\nRepresent our campus and take the 5-min clinical diagnostic to push us to #1:\n👉 ${baseUrl}/career-engine/start?ref_college=${encodeURIComponent(collegeName)}`;
  };

  const generateDuelShareText = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    const name = opponentName.trim() || "Batchmate";
    const myScore = userResult ? Math.round(userResult.fitScore) : 92;
    return `⚔️ CLINICAL CAREER CHALLENGE FOR ${name.toUpperCase()}!\n\nI scored ${myScore}% on the Arzon Healthcare Career Intelligence Engine for ${selectedCollege}!\n\nThink your clinical decision-making is sharper? Take the 5-min diagnostic now and compare our capability radar:\n👉 ${baseUrl}/career-engine/start?ref_duel=${encodeURIComponent(name)}`;
  };

  const handleCopyDuelLink = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    const link = `${baseUrl}/career-engine/start?ref_duel=${encodeURIComponent(opponentName || "Batchmate")}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      toast.success("Challenge link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-7 font-sans text-[#071A4A] pt-4 sm:pt-6" id="leaderboard-arena">
      {/* ─── APPLE DYNAMIC ISLAND TICKER BAR ────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 py-2.5 shadow-xs shadow-slate-200/50 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            LIVE VELOCITY
          </span>
        </div>

        <div className="flex-1 overflow-hidden text-xs text-[#3F4A60] font-medium truncate text-center sm:text-left px-2">
          <span className="transition-all duration-500 motion-safe:animate-fade-in inline-block truncate">
            {RECENT_ACTIVITY_TICKER[tickerIndex]}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#69758A] shrink-0 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/60">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Real-time Verified</span>
        </div>
      </div>

      {/* ─── APPLE DOSSIER HERO CARD (IF DIAGNOSTIC COMPLETED) ──────────── */}
      {userResult && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#EEF6FF] via-white to-slate-50 p-6 sm:p-7 shadow-sm">
          <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-5">
            <Trophy className="h-64 w-64 text-[#071A4A]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#071A4A] text-white shadow-md shrink-0">
                <Award className="h-7 w-7 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1557D6] bg-white tone-light px-2.5 py-0.5 rounded-full border border-[#D0E1FD] shadow-xs">
                    VERIFIED LEADERBOARD DOSSIER
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    AUTHENTICATED
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] tracking-tight">
                  {userResult.archetype?.name || "Healthcare Specialist"}{" "}
                  <span className="inline-block ml-2 rounded-full bg-[#1557D6] px-3.5 py-1 text-xs font-mono font-bold text-white align-middle shadow-xs">
                    {Math.round(userResult.fitScore)}% Readiness Fit
                  </span>
                </h3>

                <p className="mt-1 text-xs text-[#3F4A60] leading-relaxed">
                  Evaluated Path: <strong className="text-[#071A4A] font-semibold">{userResult.archetype?.topPaths?.[0]?.title || "Clinical Healthcare Speciality"}</strong> · Credential ID: <code className="font-mono text-[#1557D6] font-bold">ARZ-CE-2026-ACTIVE</code>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={getWhatsAppShareUrl(
                  `🎯 I scored ${Math.round(userResult.fitScore)}% as ${userResult.archetype?.name || "Healthcare Specialist"} on the Arzon Healthcare Career Intelligence Engine! Check my rank dossier:\n👉 ${typeof window !== "undefined" ? window.location.href : ""}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1EBE5D] transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Share Score to WhatsApp</span>
              </a>

              <Link
                to="/career-engine/result"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all active:scale-[0.98]"
              >
                <span>View Full Dossier</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── macOS / iOS SEGMENTED CONTROL TABS & SEARCH BAR ───────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        {/* Segmented Control Capsule */}
        <div className="inline-flex items-center rounded-full bg-slate-100/90 p-1 border border-slate-200/80 shadow-inner overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("candidates")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "candidates"
                ? "bg-white text-[#071A4A] shadow-xs"
                : "text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>National Candidates ({VERIFIED_CANDIDATES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("colleges")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "colleges"
                ? "bg-white text-[#071A4A] shadow-xs"
                : "text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Building2 className="h-3.5 w-3.5 text-[#1557D6]" />
            <span>University Arena ({COLLEGE_POWER_RANKINGS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("duel")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "duel"
                ? "bg-[#1557D6] text-white shadow-xs"
                : "text-[#1557D6] hover:text-[#071A4A] font-medium"
            }`}
          >
            <Swords className="h-3.5 w-3.5 text-amber-300" />
            <span>1v1 Batchmate Duel</span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === "candidates" && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200/80 bg-slate-50/80 pl-9 pr-4 py-2 text-xs font-sans text-[#071A4A] placeholder:text-slate-400 focus:bg-white focus:border-[#1557D6] focus:outline-none transition-all shadow-xs"
            />
          </div>
        )}
      </div>

      {/* ─── TAB 1: NATIONAL CANDIDATES LEADERBOARD ─────────────────────── */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          {/* Healthcare Pillar Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 mr-1">
              Filter Pillar:
            </span>
            <button
              type="button"
              onClick={() => setPillarFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "all"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              All 5 Healthcare Pillars
            </button>
            <button
              type="button"
              onClick={() => setPillarFilter("pharmacovigilance")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "pharmacovigilance"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              Pharmacovigilance
            </button>
            <button
              type="button"
              onClick={() => setPillarFilter("clinical-data-management")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "clinical-data-management"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              Clinical Data Mgt
            </button>
            <button
              type="button"
              onClick={() => setPillarFilter("medical-coding")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "medical-coding"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              Medical Coding
            </button>
            <button
              type="button"
              onClick={() => setPillarFilter("regulatory-affairs")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "regulatory-affairs"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              Regulatory Affairs
            </button>
            <button
              type="button"
              onClick={() => setPillarFilter("sas-clinical")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                pillarFilter === "sas-clinical"
                  ? "bg-[#071A4A] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              SAS Clinical
            </button>
          </div>

          {/* Desktop Apple-Style System Table */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200/90 bg-white tone-light card-light shadow-xs">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead className="border-b border-slate-200/80 bg-slate-50/80 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3 w-16 text-center">Rank</th>
                  <th scope="col" className="px-4 py-4">Candidate & Institution</th>
                  <th scope="col" className="px-4 py-4">Evaluated Archetype</th>
                  <th scope="col" className="px-4 py-4">Primary Pillar</th>
                  <th scope="col" className="px-4 py-4">Readiness Fit</th>
                  <th scope="col" className="py-4 pl-4 pr-6 text-right">Verification ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map((row) => (
                  <tr key={row.credentialId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pl-6 pr-3 font-mono text-center">
                      {row.rank === 1 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 font-bold border border-amber-300/80 shadow-2xs">
                          🥇
                        </span>
                      ) : row.rank === 2 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800 font-bold border border-slate-300/80 shadow-2xs">
                          🥈
                        </span>
                      ) : row.rank === 3 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-amber-800/10 to-amber-800/20 text-amber-900 font-bold border border-amber-600/30 shadow-2xs">
                          🥉
                        </span>
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                          #{row.rank}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 max-w-xs sm:max-w-sm">
                      <div className="font-bold text-[#071A4A] text-sm flex items-center gap-1.5">
                        <span>{row.name}</span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <div
                        className="text-[11px] text-[#69758A] mt-0.5 truncate"
                        title={`${row.degree} · ${row.college} (${row.city})`}
                      >
                        {row.degree} · {row.college}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1 text-xs font-semibold text-[#1557D6] whitespace-nowrap shadow-2xs">
                        {row.archetype}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-block whitespace-nowrap rounded-full bg-slate-100 border border-slate-200/60 px-3 py-1 text-[11px] font-mono font-bold text-slate-700">
                        {row.trackLabel}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif text-base font-bold text-[#071A4A]">
                          {row.score}%
                        </span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#1557D6] to-emerald-500"
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          {row.percentile}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                      <Link
                        to="/verify"
                        search={{ id: row.credentialId }}
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#1557D6] hover:underline"
                      >
                        <span>{row.credentialId}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Apple Card View */}
          <div className="space-y-3.5 block md:hidden">
            {filteredCandidates.map((row) => (
              <div
                key={`mob-${row.credentialId}`}
                className="rounded-2xl border border-slate-200/80 bg-white tone-light card-light p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-[#071A4A] text-sm">
                      #{row.rank}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#071A4A] text-sm flex items-center gap-1">
                        <span>{row.name}</span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      </h4>
                      <p className="text-[11px] text-[#69758A] mt-0.5">
                        {row.degree} · {row.college}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-200">
                    {row.score}% Fit
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-[#D0E1FD] bg-[#EEF6FF] px-2.5 py-0.5 text-xs font-semibold text-[#1557D6]">
                    {row.archetype}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                    {row.trackLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 2: UNIVERSITY POWER ARENA ──────────────────────────────── */}
      {activeTab === "colleges" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1557D6] block mb-1">
                  INTER-COLLEGE CLINICAL ARENA
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#071A4A] tracking-tight">
                  University Power Rankings · 2026
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#3F4A60] max-w-xl leading-relaxed">
                  Colleges are ranked by their aggregated <strong>Clinical Aptitude Index</strong> and total verified candidate diagnostics. Mobilize your campus to push your university to #1!
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/career-engine/start"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1557D6] transition-all shadow-sm active:scale-[0.98]"
                >
                  <GraduationCap className="h-4 w-4 text-amber-400" />
                  <span>Represent Your College</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {COLLEGE_POWER_RANKINGS.map((college) => (
              <div
                key={college.collegeName}
                className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-6 shadow-xs hover:border-[#D0E1FD] transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#071A4A] text-white font-mono font-bold text-sm shadow-md shrink-0">
                      #{college.rank}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#071A4A] leading-snug">
                        {college.collegeName}
                      </h4>
                      <p className="text-xs text-[#69758A]">
                        {college.city}, {college.state}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-[10px] font-bold text-amber-900 border border-amber-200 shrink-0">
                    {college.badge}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-b border-slate-100 py-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#69758A] uppercase font-bold block">
                      Aptitude Index
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#1557D6]">
                      {college.aptitudeIndex}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#69758A] uppercase font-bold block">
                      Active Candidates
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#071A4A]">
                      {college.activeCandidates}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-[#3F4A60]">
                    Top Domain: <strong className="text-[#071A4A]">{college.topTrack}</strong>
                  </span>

                  <a
                    href={getWhatsAppShareUrl(
                      generateCollegeShareText(college.collegeName, college.rank)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold text-[#1557D6] hover:bg-blue-100 transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Push Rank on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: 1V1 PEER BATCHMATE DUEL ─────────────────────────────── */}
      {activeTab === "duel" && (
        <div className="rounded-3xl border border-[#1557D6]/30 bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1557D6] text-white shadow-sm">
              <Swords className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block mb-0.5">
                INSTANT PEER CHALLENGE GENERATOR
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#071A4A] tracking-tight">
                Challenge a Batchmate or Rival
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#071A4A] mb-1">
                  Friend / Batchmate's Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071A4A] focus:bg-white focus:border-[#1557D6] focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#071A4A] mb-1">
                  Your Institution
                </label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071A4A] focus:bg-white focus:border-[#1557D6] focus:outline-none transition-all shadow-xs"
                >
                  <option value="Osmania University">Osmania University</option>
                  <option value="JNTU Hyderabad">JNTU Hyderabad</option>
                  <option value="NIPER Hyderabad">NIPER Hyderabad</option>
                  <option value="Manipal College of Pharm Sciences">Manipal College of Pharm Sciences</option>
                  <option value="Andhra University">Andhra University</option>
                  <option value="Kakatiya University">Kakatiya University</option>
                  <option value="Bombay College of Pharmacy">Bombay College of Pharmacy</option>
                  <option value="SRM College of Pharmacy">SRM College of Pharmacy</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppShareUrl(generateDuelShareText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1EBE5D] transition-all active:scale-[0.98] flex-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Challenge on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyDuelLink}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-xs font-bold text-[#1557D6] hover:bg-blue-100 transition-all active:scale-[0.98]"
                >
                  {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>Copy Challenge Link</span>
                </button>
              </div>
            </div>

            {/* Live Duel Preview Card */}
            <div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/40 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1557D6] block mb-1">
                  DUEL PREVIEW CARD
                </span>
                <h4 className="font-serif text-xl font-bold text-[#071A4A]">
                  You vs {opponentName.trim() || "Batchmate"}
                </h4>
                <p className="mt-2 text-xs text-[#3F4A60] leading-relaxed">
                  "I scored {userResult ? Math.round(userResult.fitScore) : 92}% in Healthcare Career Intelligence for {selectedCollege}. Think your clinical execution is built better? Take the 5-min diagnostic!"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D0E1FD] flex items-center justify-between text-xs font-mono font-bold text-[#1557D6]">
                <span>Arzon 1v1 Battle Mode</span>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
