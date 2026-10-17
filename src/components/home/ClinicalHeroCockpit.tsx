import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  Flame,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Zap,
} from "lucide-react";

interface HeroTrackData {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  icon: typeof Stethoscope;
  accentColor: string;
  salaryBand: string;
  jdsCount: string;
  matchScore: number;
  matchLabel: string;
  eligibility: string;
  skills: string[];
  jdSignals: { label: string; pct: number }[];
  ctaLink: string;
}

const HERO_TRACKS: HeroTrackData[] = [
  {
    id: "pv",
    name: "Pharmacovigilance & Drug Safety",
    shortName: "Pharmacovigilance",
    badge: "Top Pick · Pharmacy Graduates",
    icon: Stethoscope,
    accentColor: "#1557D6",
    salaryBand: "₹4.50 – ₹6.80 LPA",
    jdsCount: "840+ Active JDs",
    matchScore: 88,
    matchLabel: "High Role Match",
    eligibility: "B.Pharm · M.Pharm · Pharm.D · BDS",
    skills: [
      "Safety Database Systems",
      "Standardized Medical Coding",
      "ICSR Triage",
      "Narrative Writing",
      "Aggregate Reports (PSUR)",
    ],
    jdSignals: [
      { label: "ICH-GCP E6(R2) & GVP Modules", pct: 94 },
      { label: "Clinical Coding & Terminology", pct: 88 },
      { label: "Serious AE Causality Assessment", pct: 82 },
    ],
    ctaLink: "/career-assessment",
  },
  {
    id: "cdm",
    name: "Clinical Data Management",
    shortName: "CDM & Biostats",
    badge: "High Growth Data Track",
    icon: Database,
    accentColor: "#0D9488",
    salaryBand: "₹4.20 – ₹6.50 LPA",
    jdsCount: "620+ Active JDs",
    matchScore: 82,
    matchLabel: "Strong Analytical Fit",
    eligibility: "B.Pharm · Life Sciences · Biotech · M.Sc",
    skills: [
      "CDISC SDTM",
      "Electronic Data Capture (EDC)",
      "eCRF Design",
      "Data Cleaning",
      "Query Management",
    ],
    jdSignals: [
      { label: "GCP & 21 CFR Part 11 Audit", pct: 96 },
      { label: "EDC Systems & eCRF Validation", pct: 86 },
      { label: "Discrepancy Validation & Locking", pct: 90 },
    ],
    ctaLink: "/career-assessment",
  },
  {
    id: "ra",
    name: "Regulatory Affairs",
    shortName: "Regulatory Affairs",
    badge: "Global Submissions Track",
    icon: FileCheck2,
    accentColor: "#7C3AED",
    salaryBand: "₹4.80 – ₹7.20 LPA",
    jdsCount: "430+ Active JDs",
    matchScore: 79,
    matchLabel: "Strategic Regulatory Fit",
    eligibility: "B.Pharm · M.Pharm · Pharm.D",
    skills: [
      "CTD / eCTD Dossiers",
      "US FDA & EMA Filings",
      "Module 1-5 Assembly",
      "Variation Submissions",
      "Regulatory Strategy",
    ],
    jdSignals: [
      { label: "eCTD Compilation & Lifecycle", pct: 92 },
      { label: "21 CFR & ICH Regulatory Standards", pct: 87 },
      { label: "CMC Compliance Review", pct: 81 },
    ],
    ctaLink: "/career-assessment",
  },
  {
    id: "cr",
    name: "Clinical Research (CRC / CRA)",
    shortName: "Clinical Operations",
    badge: "Hospital & Site Operations",
    icon: Activity,
    accentColor: "#0284C7",
    salaryBand: "₹4.00 – ₹6.20 LPA",
    jdsCount: "510+ Active JDs",
    matchScore: 84,
    matchLabel: "High Clinical Operations Fit",
    eligibility: "B.Pharm · Pharm.D · MBBS · BDS · Nursing",
    skills: [
      "Site Monitoring (IMV)",
      "Informed Consent Verification",
      "Protocol Compliance",
      "Trial Master File (TMF)",
      "IRB / Ethics Submissions",
    ],
    jdSignals: [
      { label: "ICH-GCP E6(R2) Operationalization", pct: 97 },
      { label: "Source Data Verification (SDV)", pct: 89 },
      { label: "SAE Reporting to Regulatory Authorities", pct: 84 },
    ],
    ctaLink: "/career-assessment",
  },
];

interface ClinicalHeroCockpitProps {
  shouldReduceMotion: boolean | null;
}

export function ClinicalHeroCockpit({ shouldReduceMotion }: ClinicalHeroCockpitProps) {
  const [activeTrackId, setActiveTrackId] = useState<string>("pv");
  const activeTrack = HERO_TRACKS.find((t) => t.id === activeTrackId) || HERO_TRACKS[0];

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto [perspective:1200px] mt-6 sm:mt-10"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Floating Stage */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative rounded-3xl border border-[#D0E1FD]/90 bg-white/95 backdrop-blur-2xl p-4 sm:p-7 shadow-[0_30px_70px_rgba(7,26,74,0.12)] tone-light card-light transition-shadow duration-300"
      >
        {/* Cockpit Header with Interactive Track Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#E4EAF2]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#081F38]">
              Live Career Intelligence Simulator
            </span>
            <span className="hidden sm:inline-block rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-mono font-bold text-[#1557D6]">
              2,000+ JDs Analyzed
            </span>
          </div>

          {/* Interactive Track Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F0F5FE] border border-[#D8E6FD] overflow-x-auto no-scrollbar">
            {HERO_TRACKS.map((track) => {
              const isSelected = track.id === activeTrack.id;
              const Icon = track.icon;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-white text-[#081F38] shadow-xs font-bold border border-white"
                      : "text-slate-600 hover:text-[#081F38] hover:bg-white/50"
                  }`}
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: isSelected ? track.accentColor : undefined }}
                  />
                  <span>{track.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Track Diagnostic Display (Animated Presence) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 pt-4 sm:pt-6 items-center"
          >
            {/* Left 7 Columns: Track Intelligence Metrics */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Badge & Title */}
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-800 mb-2">
                  <Flame className="h-3 w-3 text-emerald-600 shrink-0" />
                  <span>{activeTrack.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#081F38] leading-tight">
                  {activeTrack.name}
                </h3>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                  <div className="text-[10px] text-slate-500 font-mono font-medium">
                    MEDIAN ENTRY CTC BAND
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-[#081F38] mt-0.5">
                    {activeTrack.salaryBand}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
                  <div className="text-[10px] text-slate-500 font-mono font-medium">
                    ACTIVE HIRING SIGNALS
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-[#1557D6] mt-0.5 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{activeTrack.jdsCount}</span>
                  </div>
                </div>
              </div>

              {/* In-Demand Skills Pill Cluster */}
              <div>
                <div className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#1557D6]" />
                  <span>Core Skills Employers Require:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EEF4FE] text-[#081F38] border border-[#D0E1FD]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Graduate Backgrounds */}
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Recommended for: </span>
                <span>{activeTrack.eligibility}</span>
              </div>
            </div>

            {/* Right 5 Columns: Diagnostic Role Fit Gauge & Action */}
            <div className="lg:col-span-5 flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-[#F8FAFE] border border-[#D8E6FD] text-center">
              {/* Radial Progress Ring */}
              <div className="relative w-20 h-20 mb-2">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3.2"
                  />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke={activeTrack.accentColor}
                    strokeWidth="3.2"
                    strokeDasharray="100"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 100 - activeTrack.matchScore }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-xl font-extrabold text-[#081F38] leading-none">
                    {activeTrack.matchScore}%
                  </span>
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase mt-0.5">
                    Match
                  </span>
                </div>
              </div>

              <div className="font-bold text-sm text-[#081F38]">
                {activeTrack.matchLabel}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
                Based on current pharma hiring benchmarks
              </p>

              {/* JD Requirement Mini-Bars */}
              <div className="w-full space-y-1.5 text-left mb-4">
                {activeTrack.jdSignals.map((sig) => (
                  <div key={sig.label}>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-700 mb-0.5">
                      <span className="truncate pr-1">{sig.label}</span>
                      <span className="font-mono text-[#081F38] shrink-0">{sig.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: activeTrack.accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${sig.pct}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary Assessment CTA Button */}
              <Link
                to={activeTrack.ctaLink}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1557D6] hover:bg-[#1044A5] text-white px-4 py-2.5 text-xs font-bold transition-all shadow-sm group"
              >
                <span>Run Free Role Fit Test</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── 3D FLOATING SATELLITE 1: TASK Telangana Accreditation (translateZ: 50px) ─── */}
        <motion.div
          style={shouldReduceMotion ? undefined : { transform: "translateZ(50px)" }}
          className="hidden sm:flex absolute -top-4 -right-3 z-30 items-center gap-2 rounded-full border border-white/95 bg-white/95 px-3.5 py-1.5 shadow-[0_12px_28px_rgba(7,26,74,0.14)] backdrop-blur-md tone-light card-light"
        >
          <Award className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-mono text-[10.5px] font-bold text-[#081F38]">
            Govt. of Telangana · TASK Accredited
          </span>
        </motion.div>

        {/* ─── 3D FLOATING SATELLITE 2: Live JD Signal Beacon (translateZ: 40px) ─── */}
        <motion.div
          style={shouldReduceMotion ? undefined : { transform: "translateZ(40px)" }}
          className="hidden sm:flex absolute -bottom-3 -left-3 z-30 items-center gap-2 rounded-full border border-white/95 bg-white/95 px-3 py-1 shadow-[0_12px_28px_rgba(7,26,74,0.12)] backdrop-blur-md tone-light card-light"
        >
          <span className="h-2 w-2 rounded-full bg-blue-500 motion-safe:animate-ping shrink-0" />
          <span className="text-[10px] font-mono text-slate-600">
            Real-Time Analysis · Nov 2026 Batch
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
