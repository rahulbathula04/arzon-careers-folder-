import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  GraduationCap,
  Layers3,
  Medal,
  Microscope,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { LINKS } from "@/components/landing/constants";
import { openLeadMagnetModal } from "@/components/acri/landing/AcriScrollLeadMagnet";
import { openExpertModal } from "@/components/system/UnifiedExpertModal";

const LINKEDIN = LINKS.linkedin;
const GLOBAL_IMPACT_AWARD_LINKEDIN = "https://lnkd.in/p/dxSyrMUb";
const MALLA_REDDY_LINKEDIN =
  "https://www.linkedin.com/posts/arzonglobal-campusvisit-presentation-ugcPost-7459179713735995394-_bmu/?highlightedUpdateUrn=urn%3Ali%3AugcPost%3A7459179713735995394&highlightedUpdateType=SOCIAL_SHARE&origin=SOCIAL_SHARE&utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEnmUHsBc7DzVndPmNWZqFqDa73sXe72aMI&utm_campaign=whatsapp";

const CAREER_ROLES = [
  {
    roleTitle: "Fresher PV Associate",
    roleDesignation: "Junior Drug Safety Associate",
    tag: "Drug Safety Operations",
    hiringHubs: "Cognizant · IQVIA · Accenture · Parexel",
    dayOneTasks: [
      "Triage spontaneous & clinical adverse event reports for 4-element validity",
      "Assign precise MedDRA terms (LLT, PT, System Organ Class hierarchy)",
      "Draft expedited regulatory safety narratives under 7/15-day reporting clocks",
    ],
    tools: ["Oracle Argus Safety", "MedDRA Browser", "WHO-DD"],
    eligibility: "B.Pharm · Pharm.D · M.Pharm · Life Sciences",
    practicalProof: "25+ Live ICSR Cases Processed",
    image: "/assets/thumbs/pharmacovigilance.webp",
    href: "/pv-associate",
  },
  {
    roleTitle: "Clinical Data Associate",
    roleDesignation: "Junior Clinical Data Coordinator",
    tag: "Clinical Operations",
    hiringHubs: "TCS · Wipro Health · IQVIA · Syneos Health",
    dayOneTasks: [
      "Review Electronic Case Report Forms (eCRFs) against trial protocols",
      "Identify protocol data discrepancies & issue hospital site queries",
      "Execute clinical-safety Serious Adverse Event (SAE) reconciliation",
    ],
    tools: ["Medidata RAVE", "Oracle InForm", "eCRF Engines"],
    eligibility: "B.Pharm · M.Pharm · B.Sc/M.Sc Life Sciences",
    practicalProof: "50+ eCRF Discrepancies Resolved",
    image: "/assets/thumbs/clinical-data-management.webp",
    href: "/courses/clinical-data-management",
  },
  {
    roleTitle: "Medical Coding Specialist",
    roleDesignation: "Trainee Medical Coding Analyst",
    tag: "Clinical Informatics",
    hiringHubs: "Optum · Omega Healthcare · CorroHealth · GeBBS",
    dayOneTasks: [
      "Abstract inpatient & outpatient physician clinical encounter notes",
      "Assign accurate ICD-10-CM diagnosis & CPT procedural codes",
      "Apply medical necessity modifiers to eliminate billing claim rejections",
    ],
    tools: ["ICD-10-CM", "CPT Manuals", "3M Encoder"],
    eligibility: "Life Sciences · B.Pharm · Allied Health · Nursing",
    practicalProof: "100+ Chart Encounters Audited",
    image: "/assets/thumbs/medical-coding.webp",
    href: "/courses/medical-coding",
  },
  {
    roleTitle: "Regulatory Affairs Trainee",
    roleDesignation: "Documentation & Dossier Associate",
    tag: "Regulatory Submissions",
    hiringHubs: "Dr. Reddy's · Sun Pharma · Cipla · Global CROs",
    dayOneTasks: [
      "Structure & review eCTD Module 1-5 submission dossiers",
      "Audit Certificate of Analysis (CoA) & drug substance stability files",
      "Track Health Authority variation filings (US FDA, EMA, CDSCO)",
    ],
    tools: ["eCTD Compilers", "docuBridge", "FDA CDER Portal"],
    eligibility: "B.Pharm · M.Pharm · Pharm.D",
    practicalProof: "Complete eCTD Dossier Assembly",
    image: "/assets/thumbs/regulatory-affairs.webp",
    href: "/courses/regulatory-affairs",
  },
] as const;

const TRACK_PREVIEWS = {
  pv: {
    label: "Pharmacovigilance",
    task: "Review a synthetic safety case",
    detail: "Check the four minimum case elements, review the chronology and document what is missing.",
    stages: ["Case intake", "Validity check", "Timeline review", "Narrative quality"],
  },
  cdm: {
    label: "Clinical Data Management",
    task: "Resolve a sample data query",
    detail: "Review an eCRF discrepancy, assess the supporting information and record a clear query outcome.",
    stages: ["Data review", "Query raised", "Response review", "Closure check"],
  },
  coding: {
    label: "Medical Coding",
    task: "Review a clinical note",
    detail: "Identify the documented condition, check the coding reference and record the rationale for the selected code.",
    stages: ["Read the note", "Identify concepts", "Check references", "Record rationale"],
  },
} as const;

type TrackKey = keyof typeof TRACK_PREVIEWS;

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#008F83]">
      {children}
    </p>
  );
}

export function ArzonHomeIntelligence() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("pv");
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const preview = TRACK_PREVIEWS[activeTrack];
  const [mounted, setMounted] = useState(false);
  const [showStickyDock, setShowStickyDock] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const scrollRoot = document.getElementById("app-scroll-root");
    const checkScroll = () => {
      const top = scrollRoot ? scrollRoot.scrollTop : window.scrollY;
      setShowStickyDock(top > 420);
    };

    checkScroll();
    scrollRoot?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      scrollRoot?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const cardWidth = clientWidth * 0.85;
    if (cardWidth > 0) {
      const index = Math.round(scrollLeft / cardWidth);
      setActiveRoleIndex(Math.min(Math.max(index, 0), CAREER_ROLES.length - 1));
    }
  };

  const scrollToRole = (idx: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
    setActiveRoleIndex(idx);
  };

  const enter = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="arzon-home-intelligence overflow-x-clip bg-[#F7FAF9] text-[#102A28]">
      {/* 01 / HERO */}
      <section
        id="platform"
        className="relative flex min-h-[calc(100svh-48px)] items-center overflow-hidden bg-[#F5FAF8]"
      >
        <div className="pointer-events-none absolute -right-40 -top-44 h-[36rem] w-[36rem] rounded-full bg-[#DFF1EF] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-36 h-[28rem] w-[28rem] rounded-full bg-[#E8F2EF] blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pt-6 pb-10 sm:px-8 sm:py-10 lg:min-h-[calc(100svh-48px)] lg:grid-cols-[1.28fr_0.72fr] lg:gap-12 lg:px-10 lg:py-6">
          <motion.div {...enter} className="relative z-10 max-w-[620px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C2DDD7] bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] sm:text-[11.5px] font-medium tracking-wide text-[#234C46] shadow-[0_2px_8px_rgba(9,58,51,0.04)] whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008F83] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#008F83]" />
              </span>
              <span>Healthcare Talent Intelligence</span>
            </div>

            <h1 className="max-w-[620px] text-[30px] xs:text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.06] tracking-[-0.04em] text-[#063F39]">
              Build capability.
              <span className="mt-1 block text-[#008F83]">Show the work.</span>
            </h1>

            <p className="mt-3.5 max-w-[500px] text-[14px] leading-relaxed text-[#526B67] sm:text-[16px]">
              We connect role requirements, practical learning and evidence of skill — helping students make clearer career decisions.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openExpertModal({ source: "hero_primary" })}
                className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#004B45] px-6 text-[13px] font-bold text-white shadow-[0_6px_18px_rgba(0,75,69,0.18)] transition-all hover:bg-[#00675D] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F83] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Talk to Experts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <a
                href="#career-paths"
                className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-1.5 rounded-full border border-[#BFD5D0] bg-white/95 backdrop-blur px-5 text-[13px] font-bold text-[#174D47] transition-all hover:border-[#008F83] hover:bg-white active:scale-[0.98] shadow-2xs whitespace-nowrap shrink-0"
              >
                <span>Explore 4 Role Blueprints</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 border-t border-[#DCE9E6] pt-4 text-center sm:text-left sm:flex sm:items-center sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-medium text-[#56716C]">
                <ShieldCheck className="h-4 w-4 text-[#008F83] shrink-0" />
                <span>Student-first</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-medium text-[#56716C]">
                <ClipboardCheck className="h-4 w-4 text-[#008F83] shrink-0" />
                <span>Practical assessment</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-medium text-[#56716C]">
                <FileCheck2 className="h-4 w-4 text-[#008F83] shrink-0" />
                <span>Evidence reports</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.98 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="relative mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0"
          >
            {/* Ambient emerald backlight */}
            <div className="absolute -inset-3 rounded-[30px] bg-[#008F83]/12 blur-xl pointer-events-none" aria-hidden="true" />

            {/* Apple Unibody Event Terminal (Compact Sleek Dimension) */}
            <div className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/10 bg-[#02201D] shadow-[0_24px_60px_-12px_rgba(0,35,30,0.5),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
              {/* Minimalist Top Utility Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-white/[0.08] text-[9.5px] sm:text-[10px] font-mono tracking-tight">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
                  </span>
                  <span className="font-semibold text-white/90">Hyderabad · 30 July 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[9px] font-semibold text-[#A2E2DB] border border-white/10">
                    03:45 · HYBIZ
                  </span>
                </div>
              </div>

              {/* Dedicated Media Viewport (Zero Text Collision) */}
              <div className="relative group overflow-hidden bg-black aspect-[16/9] border-b border-white/[0.08]">
                <img
                  src="/images/credentials/task-partnership-ceremony.jpg"
                  alt="Official launch ceremony with Dr. Srikanth Sinha, CEO of TASK, and Arzon Global leadership"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  loading="eager"
                />
                
                {/* Subtle vignette highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Apple Keynote Style Frosted Glass Play Disc */}
                <a
                  href={LINKS.mediaInauguration.watch}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch the official inauguration telecast on YouTube"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 active:scale-95">
                    <Play className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-white text-white ml-0.5 filter drop-shadow" />
                  </div>
                </a>
              </div>

              {/* Solid High-Contrast Intelligence Dock */}
              <div className="p-4 sm:p-4.5 text-left bg-[#02201D]">
                <div className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#00A896]">
                  State Skilling & Leadership
                </div>

                <h2 className="mt-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-white leading-snug">
                  A public launch with TASK leadership.
                </h2>

                <p className="mt-1 text-[11.5px] leading-relaxed text-[#A8D3CD] max-w-[360px]">
                  Dr. Srikanth Sinha (CEO, TASK) formally inaugurated the Arzon Global facility to align healthcare role readiness with state initiatives.
                </p>

                {/* Action Bar + Dignitary Attribution */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-white/[0.08]">
                  <a
                    href={LINKS.mediaInauguration.watch}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#004B45" }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-[#DFF1EF] !text-[#004B45] px-3.5 py-1.5 text-[10.5px] font-bold shadow-md shadow-black/20 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn cursor-pointer"
                  >
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#008F83] text-white group-hover/btn:bg-[#00736A] transition-colors">
                      <Play className="h-1.5 w-1.5 fill-white ml-0.5" />
                    </span>
                    <span style={{ color: "#004B45" }} className="!text-[#004B45] font-bold">Watch telecast</span>
                    <ArrowUpRight className="h-2.5 w-2.5 !text-[#008F83]" style={{ color: "#008F83" }} />
                  </a>

                  <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#78BDBB]/90">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                    <span className="truncate max-w-[170px] sm:max-w-none">Chief Guest: Dr. Srikanth Sinha</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 / RECOGNITIONS & INSTITUTIONAL ENGAGEMENTS (Peak Minimal Apple-Grade Detailing) */}
      <section
        id="proof"
        className="relative bg-[#FAFCFB] py-10 sm:py-16 border-t border-[#E8EFEB]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-2.5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#CFE3DE] bg-[#F0F7F5] px-2.5 py-0.5 text-[9.5px] font-mono font-semibold tracking-[0.12em] text-[#00796F] shadow-2xs">
                <Trophy className="h-3 w-3 text-[#D97706]" />
                <span>Proof in the Public Record</span>
              </div>
              <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.04em] text-[#063F39] leading-[1.08]">
                Work worth showing.
              </h2>
            </div>
            <p className="max-w-[460px] text-[13px] sm:text-[13.5px] leading-relaxed text-[#5C756F]">
              Verified milestones, academic outreach, and industry participation — each directly linked to primary public sources.
            </p>
          </div>

          {/* Grid Layout: Award Flagship Showcase in Slot 1 & former TASK Slot (lg:col-span-8), Malla Reddy untouched (lg:col-span-4) */}
          <div className="grid gap-4 lg:grid-cols-12 items-stretch">
            {/* Card 1: 2026 Global Impact Award Showcase (lg:col-span-8 — in Arzon signature Deep Forest Teal & Champagne Gold luxury detailing) */}
            <a
              href={GLOBAL_IMPACT_AWARD_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[26px] sm:rounded-[30px] border border-amber-400/25 bg-gradient-to-br from-[#042823] via-[#021C18] to-[#011210] p-5 sm:p-7 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_0_60px_rgba(0,143,131,0.12),0_24px_60px_-12px_rgba(0,25,22,0.6)] ring-1 ring-inset ring-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_70px_rgba(0,143,131,0.18),0_30px_70px_-12px_rgba(0,25,22,0.7)] lg:col-span-8"
            >
              {/* Luxury Geometric Orbit Rings & Ambient Lighting */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-amber-400/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 rounded-full border border-white/5"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-4 -top-4 h-64 w-64 rounded-full border border-amber-400/5"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.16)_0%,rgba(0,143,131,0.10)_45%,transparent_75%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-14 -left-14 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(120,189,187,0.12)_0%,transparent_70%)] blur-2xl"
              />

              <div>
                {/* Header Utility Rail */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E7C982]/30 bg-gradient-to-r from-[#E7C982]/15 via-[#E7C982]/5 to-white/5 px-3 py-1 text-[10px] font-mono font-medium tracking-wider text-[#F3D99D] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md">
                    <Award className="h-3.5 w-3.5 text-[#E7C982] shrink-0 drop-shadow-[0_0_6px_rgba(231,201,130,0.6)]" />
                    <span>Recognition · 04–05 Nov 2026</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/60">
                    <span className="h-1 w-1 rounded-full bg-[#E7C982]/80" />
                    <span>SARSD · New Delhi</span>
                  </span>
                </div>

                {/* 2-Column Split: Narrative on Left (~60%), Physical Trophy Proof in former TASK slot (~40%) */}
                <div className="relative z-10 mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  {/* Left Column: Official Narrative & Institutional Breakdown */}
                  <div className="flex-1 min-w-0 pr-0 lg:pr-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[44px] sm:text-[54px] font-extrabold leading-none tracking-[-0.04em] bg-gradient-to-br from-white via-[#FCE7B8] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-sm">
                        2026
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded text-[8.5px] font-mono font-bold tracking-widest uppercase bg-[#E7C982]/15 border border-[#E7C982]/30 text-[#F3D99D]">
                        ANNUAL CITATION
                      </span>
                    </div>

                    <h3 className="mt-2 text-[22px] sm:text-[26px] font-bold leading-[1.1] tracking-tight text-white">
                      Global Impact Award
                    </h3>

                    {/* Amber Highlight Callout */}
                    <div className="border-l-2 border-[#E7C982]/70 pl-3 my-3">
                      <p className="text-[12px] leading-relaxed text-slate-200/90 font-normal">
                        Conferred to <strong className="text-white font-bold">Arzon Global Labs</strong> by the Society of Applied Research and Social Development (SARSD) at the 8th ICAATAS International Conference, Malla Reddy University.
                      </p>
                    </div>

                    {/* Institutional Breakdown Box (Glass Citation Plaque) */}
                    <div className="mt-3.5 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3.5 text-[11px] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.2)]">
                      <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-2.5">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-md bg-teal-500/15 border border-teal-400/30 flex items-center justify-center shrink-0 mt-0.5 text-[#78BDBB]">
                            <GraduationCap className="h-3 w-3" />
                          </div>
                          <div>
                            <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0] font-medium">
                              Host Venue
                            </span>
                            <span className="font-bold text-white text-[11.5px] block mt-0.5">
                              Malla Reddy University
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 border-l border-white/10 pl-3">
                          <div className="w-6 h-6 rounded-md bg-[#E7C982]/15 border border-[#E7C982]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#E7C982]">
                            <Users className="h-3 w-3" />
                          </div>
                          <div>
                            <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0] font-medium">
                              Conferring Body
                            </span>
                            <span className="font-bold text-white text-[11.5px] block mt-0.5">
                              SARSD (Regd. Govt. of India)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-2">
                        <div className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-400/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                          <Layers3 className="h-3 w-3" />
                        </div>
                        <div>
                          <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0] font-medium">
                            Scope of Award
                          </span>
                          <span className="text-white/90 text-[11px] block mt-0.5 font-medium">
                            Workforce Development &amp; Practical Healthcare Skilling Model
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Physical Award Plaque with luminous museum spotlight */}
                  <div className="relative flex items-center justify-center shrink-0 w-full lg:w-[240px] xl:w-[270px] py-2 sm:py-1">
                    {/* Amber Gold & White Halo Spotlight */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(231,201,130,0.22)_0%,rgba(255,255,255,0.06)_45%,transparent_72%)] blur-2xl"
                    />

                    {/* Floating Transparent Cutout Plaque with Soft Ground Reflection */}
                    <div className="relative flex flex-col items-center justify-center">
                      <img
                        src="/images/credentials/global-impact-trophy-transparent.png"
                        alt="Official 2026 Global Impact Award Plaque presented to Arzon Global Labs"
                        className="relative z-10 max-h-[220px] sm:max-h-[265px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1"
                        loading="lazy"
                      />
                      {/* Golden pedestal reflection blur */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none -mt-4 h-4 w-36 sm:w-48 rounded-[100%] bg-[#E7C982]/25 blur-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link Rail */}
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-semibold text-[#F3D99D]">
                <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-amber-100">
                  <span className="underline underline-offset-4 decoration-[#E7C982]/40 group-hover:decoration-[#E7C982]">
                    View public announcement
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E7C982]" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  LinkedIn Verified
                </span>
              </div>
            </a>

            {/* Card 2: Campus Outreach — Malla Reddy University (lg:col-span-4) */}
            <a
              href={MALLA_REDDY_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[320px] flex-col justify-between rounded-[24px] border border-[#DCE9E6] bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,75,69,0.04)] ring-1 ring-inset ring-black/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.08)] lg:col-span-4"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF5F3] px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#00796F] border border-[#CFE3DE]">
                  <GraduationCap className="h-3 w-3 text-[#008F83]" />
                  Campus Outreach
                </span>
                <span className="text-[10px] font-mono text-[#718781]">Academic Session</span>
              </div>

              <div className="my-auto py-2">
                {/* Authentic Faculty Meeting Photo */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-slate-200/80 bg-slate-100 shadow-2xs">
                  <img
                    src="/images/credentials/malla-reddy-authentic-table.jpg"
                    alt="Arzon Global leadership meeting with Malla Reddy University Dean and academic faculty"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8.5px] font-mono text-white">
                    Dean & Faculty Discussion
                  </span>
                </div>

                <h3 className="mt-2.5 text-[19px] font-bold leading-[1.12] tracking-[-0.035em] text-[#063F39]">
                  Malla Reddy University
                </h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-[#5C756F]">
                  Presented skills assessment architecture to Dean and academic faculty for curriculum alignment.
                </p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#F4FAF8] px-2 py-0.5 text-[9px] font-mono text-[#00796F] border border-[#CFE3DE]">
                  Pharmacovigilance & CDM
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#E5EEEB] pt-3 text-[11px] font-semibold text-[#00796F]">
                <span className="inline-flex items-center gap-1 transition-colors group-hover:text-[#004B45]">
                  Read campus briefing
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-[9px] font-mono text-slate-400">Public Briefing</span>
              </div>
            </a>

            {/* Card 3: Industry Participation — PHUSE APAC (lg:col-span-7) */}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[220px] flex-col justify-between rounded-[24px] border border-[#DCE9E6] bg-[#F7FAF9] p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.08)] lg:col-span-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-700 border border-slate-200">
                  <Globe2 className="h-3 w-3 text-slate-600" />
                  Industry Forum · 2026
                </span>
                <span className="text-[10px] font-mono text-[#718781]">Clinical Data Science</span>
              </div>

              <div className="my-auto flex flex-col justify-between gap-4 py-2 sm:flex-row sm:items-center">
                <div className="flex-1 min-w-0 pr-0 sm:pr-2">
                  <h3 className="text-[20px] sm:text-[22px] font-bold leading-[1.12] tracking-[-0.04em] text-[#063F39]">
                    PHUSE APAC Connect
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#5C756F]">
                    Participated in the premier clinical data science assembly, engaging with global leaders to ensure candidate simulations mirror live CDISC standards.
                  </p>
                  <div className="mt-2.5 inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[9.5px] font-mono text-slate-700 border border-slate-200/90 shadow-2xs">
                    Keynote: Shri D. Sridhar Babu (IT Minister)
                  </div>
                </div>

                {/* Minister Keynote Portrait Frame */}
                <div className="relative h-[115px] w-full sm:w-[135px] shrink-0 overflow-hidden rounded-[14px] border border-blue-900/20 bg-[#091E5A] shadow-2xs">
                  <img
                    src="/images/credentials/phuse-minister-portrait.jpg"
                    alt="PHUSE APAC 2026 keynote by Shri D. Sridhar Babu"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8.5px] font-mono text-white">
                    Official Summit Record
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#E5EEEB] pt-3 text-[11px] font-semibold text-[#00796F]">
                <span className="inline-flex items-center gap-1 transition-colors group-hover:text-[#004B45]">
                  Read conference overview
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-[9px] font-mono text-slate-400">Global Standards</span>
              </div>
            </a>

            {/* Card 4: How We Work — Institutional Governance Standard (lg:col-span-5) */}
            <div className="flex min-h-[220px] flex-col justify-between rounded-[24px] bg-[#E7F3F0] border border-[#CDE3DD] p-5 sm:p-6 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/70">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  Institutional Governance · Public Standard
                </span>
                <span className="text-[10px] font-mono text-[#5C756F]">Integrity Policy</span>
              </div>

              <div className="my-auto py-2">
                <h3 className="text-[19px] sm:text-[21px] font-bold leading-[1.12] tracking-[-0.04em] text-[#063F39]">
                  Engagement is not the same as endorsement.
                </h3>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#5C756F]">
                  We publish the exact scope of every event clearly. A university visit, conference presence, or public facility launch is never represented as an exclusive hiring guarantee or government accreditation.
                </p>

                {/* Transparency Validation Checklist */}
                <div className="mt-3.5 space-y-1.5 text-[10.5px] font-medium text-[#40615A]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Public sources linked for every milestone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Objective capability evidence over marketing claims</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Clinical data simulations governed by CDISC & SDTM guidelines</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#CFE3DE] pt-3 text-[11px] font-semibold text-emerald-800">
                <span>Arzon Public Transparency Charter</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-700/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Verified Audit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 / THE PRODUCT */}
      <section
        id="how-it-works"
        className="flex min-h-[calc(100svh-48px)] items-center bg-[#F2F8F6] py-10 sm:py-16"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10">
          <motion.div {...enter} className="max-w-[460px]">
            <SectionLabel>A clearer way to prepare</SectionLabel>
            <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.06] tracking-[-0.045em] text-[#063F39]">
              Understand the role.
              <span className="block text-[#008F83]">Show your capability.</span>
            </h2>
            <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#5B746E]">
              Start with what employers ask for, practise the work in a structured environment and review what you have demonstrated.
            </p>

            <div className="mt-6 sm:mt-8 space-y-2.5">
              {[
                ["01", "Understand", "Review role responsibilities and published requirements."],
                ["02", "Practise", "Work through relevant tasks using synthetic training scenarios."],
                ["03", "Evidence", "See what was demonstrated, what is missing and what to improve."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex items-start gap-3.5 rounded-[16px] border border-[#DCE8E4] bg-white/75 p-3.5 transition hover:bg-white hover:border-[#A9D1CB]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E4F2EF] font-mono text-[11px] font-bold text-[#008F83]">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#063F39]">{title}</h3>
                    <p className="mt-0.5 text-[11.5px] sm:text-[12px] leading-relaxed text-[#5C756F]">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openExpertModal({ source: "section_03_left_cta" })}
              className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-bold text-[#00796F] hover:text-[#004B45] hover:underline transition-all cursor-pointer"
            >
              <span>Talk to an expert about your preparation</span> <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            {...enter}
            className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-[#D7E6E2] bg-white p-4 sm:p-6 shadow-[0_24px_70px_rgba(3,55,48,0.10)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#E8EFED] pb-3 sm:pb-4">
              <div>
                <p className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#82A099]">Interactive product sample</p>
                <h3 className="mt-0.5 text-[16px] sm:text-[17px] font-bold tracking-tight text-[#0B3934]">Role readiness workspace</h3>
              </div>
              <span className="rounded-full border border-[#CFE3DE] bg-[#F1F8F6] px-2.5 py-1 text-[8.5px] sm:text-[9px] font-mono font-semibold uppercase tracking-[0.12em] text-[#39736A]">
                Synthetic training data
              </span>
            </div>

            {/* Apple iOS Segmented Role Switcher (Compact, responsive, zero vertical waste) */}
            <div className="mt-4 rounded-xl sm:rounded-2xl bg-[#EBF3F0] p-1 grid grid-cols-3 gap-1">
              {([
                ["pv", "Pharmacovigilance", "PV"],
                ["cdm", "Clinical Data", "CDM"],
                ["coding", "Medical Coding", "Coding"],
              ] as const).map(([key, label, shortLabel]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={activeTrack === key}
                  onClick={() => setActiveTrack(key)}
                  className={[
                    "rounded-lg sm:rounded-xl py-2 px-1 text-center text-[11px] sm:text-[12px] font-bold transition-all duration-200 cursor-pointer active:scale-[0.98]",
                    activeTrack === key
                      ? "bg-[#004B45] text-white shadow-[0_3px_10px_rgba(0,75,69,0.20)]"
                      : "text-[#58736D] hover:text-[#063F39] hover:bg-white/60",
                  ].join(" ")}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Role Content Display */}
            <div className="mt-4 rounded-[20px] border border-[#E3ECE9] bg-white p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-mono font-semibold uppercase tracking-[0.16em] text-[#85A099]">Selected role</p>
                  <h4 className="mt-0.5 text-[18px] sm:text-[20px] font-bold tracking-tight text-[#0B3934]">{preview.label}</h4>
                </div>
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E4F2EF] text-[#008F83]">
                  <Microscope className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Sample Task Highlight Card */}
              <div className="mt-3.5 rounded-[18px] bg-[#073F39] p-4 text-white sm:p-5">
                <p className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[#9CD8D0]">Sample task</p>
                <p className="mt-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-white">{preview.task}</p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/75">{preview.detail}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {preview.stages.map((stage, index) => (
                    <div key={stage} className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5">
                      <span className="font-mono text-[9px] font-bold text-[#A6DDD5]">0{index + 1}</span>
                      <p className="mt-1 text-[10.5px] font-medium leading-tight text-white/95">{stage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Verification Pillars in Compact Grid */}
              <div className="mt-3.5 grid grid-cols-3 gap-2">
                {[
                  { icon: Layers3, label: "Role context" },
                  { icon: ClipboardCheck, label: "Practical task" },
                  { icon: FileCheck2, label: "Evidence report" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-xl border border-[#E5EEEB] bg-[#FAFCFB] p-2.5 text-center sm:text-left">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#008F83]" />
                    <span className="text-[10px] font-medium text-[#58736D]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Dedicated In-Card Expert Consultation Strip */}
              <div className="mt-4 pt-3.5 border-t border-[#E8EFED] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="text-left w-full sm:w-auto">
                  <p className="text-[11.5px] font-bold text-[#063F39]">
                    Want your profile evaluated for {preview.label}?
                  </p>
                  <p className="text-[10px] text-[#5C756F]">
                    Review eligibility, corporate hiring cutoffs, and your next step with a senior counselor.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openExpertModal({ targetTrack: preview.label, source: `interactive_${activeTrack}` })}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#004B45] hover:bg-[#003B35] text-white px-4 py-2 text-[11.5px] font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <span>Talk to Experts</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-[9px] text-[#8AA19B]">
              <span>Assessment scope: Task-specific feedback, not a job guarantee or professional certification.</span>
              <span className="text-slate-400">Synthetic training data</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04 / ROLE-SPECIFIC TRAINING SHOWCASE */}
      <section
        id="career-paths"
        className="flex min-h-[calc(100svh-48px)] items-center bg-white py-10 sm:py-16 overflow-hidden"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#008F83]/20 bg-[#DFF1EF]/60 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#004B45] mb-2">
                <span>Role-Focused Training · Not Generic Courses</span>
              </div>
              <h2 className="text-[26px] sm:text-[34px] font-bold tracking-tight text-[#063F39] leading-[1.08]">
                Start with the role you want to be hired for.
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B817C] max-w-xl">
                We train graduates for real-world entry designations—not abstract academic theory. Explore Day-1 responsibilities, required enterprise tools, and verified proof deliverables.
              </p>
            </div>

            {/* Mobile Swipe Notice & Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="flex lg:hidden items-center gap-1.5 text-[11px] font-mono text-[#008F83]">
                <span>Swipe roles ({activeRoleIndex + 1}/{CAREER_ROLES.length})</span>
                <ArrowRight className="h-3 w-3" />
              </span>
              <div className="hidden sm:flex lg:hidden items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollToRole(Math.max(0, activeRoleIndex - 1))}
                  disabled={activeRoleIndex === 0}
                  aria-label="Previous role"
                  className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToRole(Math.min(CAREER_ROLES.length - 1, activeRoleIndex + 1))}
                  disabled={activeRoleIndex === CAREER_ROLES.length - 1}
                  aria-label="Next role"
                  className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Swipeable Snap Carousel (Mobile: 84vw peek carousel, Desktop: 4-column responsive grid) */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:mx-0 touch-pan-x"
          >
            {CAREER_ROLES.map((role, index) => (
              <motion.div
                key={role.roleTitle}
                className="w-[84vw] sm:w-[340px] shrink-0 snap-start lg:w-auto lg:shrink"
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.15 },
                      transition: { duration: 0.45, delay: index * 0.06 },
                    })}
              >
                <div className="group flex flex-col justify-between h-full overflow-hidden rounded-[22px] border border-[#E1EBE8] bg-[#F8FBFA] transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_20px_48px_rgba(0,75,69,0.12)] text-left">
                  <div>
                    {/* Visual Card Banner */}
                    <Link to={role.href as any} className="block relative aspect-[16/10] overflow-hidden bg-[#E6F0ED] cursor-pointer">
                      <img
                        src={role.image}
                        alt={role.roleTitle}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#052E2A]/85 via-[#052E2A]/25 to-transparent" />
                      
                      {/* Operational Domain Tag */}
                      <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#062E2B]/70 px-2.5 py-0.5 text-[8.5px] font-mono font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {role.tag}
                      </span>

                      {/* Practical Proof Pill */}
                      <span className="absolute bottom-2.5 right-3 rounded-full border border-[#E7C982]/30 bg-[#062E2B]/85 px-2 py-0.5 text-[8.5px] font-mono font-medium text-[#FCE7B8] backdrop-blur-md">
                        ✓ {role.practicalProof}
                      </span>
                    </Link>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      {/* Role Designation Header */}
                      <Link to={role.href as any} className="block group/link cursor-pointer">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#008F83] font-semibold block">
                          Target Entry Designation
                        </span>
                        <h3 className="text-[17px] sm:text-[18px] font-bold tracking-tight text-[#0B3934] mt-0.5 leading-snug group-hover/link:text-[#008F83] transition-colors">
                          {role.roleTitle}
                        </h3>
                        <p className="text-[11.5px] font-medium text-slate-600 mt-0.5">
                          {role.roleDesignation}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Hiring: <span className="text-slate-700 font-medium">{role.hiringHubs}</span>
                        </p>
                      </Link>

                      {/* Day 1 Operational Responsibilities */}
                      <div className="mt-3 rounded-xl border border-slate-200/80 bg-[#F4FAF9] p-3">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-[#004B45] font-semibold mb-1.5">
                          What You Do on Day 1
                        </span>
                        <ul className="space-y-1.5 text-[11px] leading-snug text-slate-700">
                          {role.dayOneTasks.map((task, tidx) => (
                            <li key={tidx} className="flex items-start gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#008F83] mt-1 shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Enterprise Tool Stack */}
                      <div className="mt-3">
                        <span className="block text-[8.5px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                          Tools Mastered
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {role.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-md border border-slate-200/80 bg-[#F8FBFA] px-2 py-0.5 text-[9.5px] font-medium text-slate-700 shadow-2xs"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action & Eligibility Footer */}
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="pt-3 border-t border-slate-200/70 flex flex-col gap-2">
                      <span className="text-[10px] text-slate-500 truncate">
                        Fit: <strong className="text-slate-700 font-medium">{role.eligibility}</strong>
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openExpertModal({
                              targetTrack: role.roleTitle,
                              source: `carousel_${role.roleTitle.toLowerCase().replace(/\s+/g, "_")}`,
                            });
                          }}
                          className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-[#004B45] hover:bg-[#003B35] !text-white text-white text-[12px] font-semibold transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                        >
                          <span className="!text-white text-white font-bold" style={{ color: "#ffffff" }}>
                            Talk to {role.roleTitle} Expert
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 !text-white text-white transition group-hover:translate-x-1" style={{ color: "#ffffff" }} />
                        </button>
                        <Link
                          to={role.href as any}
                          className="inline-flex items-center justify-center text-[11px] font-semibold text-[#00675D] hover:text-[#004B45] hover:underline py-0.5"
                        >
                          Explore day-1 curriculum →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel Indicator Dots */}
          <div className="mt-2 flex items-center justify-between lg:hidden px-1">
            <div className="flex items-center gap-1">
              {CAREER_ROLES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToRole(i)}
                  aria-label={`Go to role ${i + 1}`}
                  className="p-2 -m-1 inline-flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeRoleIndex === i ? "w-6 bg-[#008F83]" : "w-2 bg-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[10.5px] font-mono text-slate-500">
              Role {activeRoleIndex + 1} of {CAREER_ROLES.length}
            </span>
          </div>

          {/* Institutional / Employer Bottom Banner */}
          <div
            data-arzon-dark="true"
            className="mt-6 sm:mt-8 flex flex-col justify-between gap-4 rounded-[22px] bg-[#073F39] p-5 sm:p-6 !text-white text-white sm:flex-row sm:items-center shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#A6DDD5]">
                <Users className="h-5 w-5 text-[#A6DDD5]" style={{ color: "#A6DDD5" }} />
              </div>
              <div>
                <p className="text-[14px] font-bold !text-white text-white" style={{ color: "#ffffff" }}>
                  For colleges, TPOs and hiring teams
                </p>
                <p
                  className="mt-0.5 text-[11px] !text-[#A6DDD5] text-[#A6DDD5]"
                  style={{ color: "#A6DDD5" }}
                >
                  Discuss campus engagement, diagnostic assessments and entry-level role specifications.
                </p>
              </div>
            </div>
            <Link
              to={"/contact" as any}
              style={{ color: "#004B45" }}
              className="inline-flex h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-white hover:bg-[#DFF1EF] px-6 text-[12.5px] font-bold !text-[#004B45] shadow-sm transition active:scale-[0.98] tone-light card-light cursor-pointer"
            >
              <span style={{ color: "#004B45" }} className="!text-[#004B45] font-bold">
                Talk to Arzon
              </span>
              <ArrowRight className="h-3.5 w-3.5 !text-[#008F83]" style={{ color: "#008F83" }} />
            </Link>
          </div>

          <p className="mt-4 text-[9px] leading-4 text-[#9AAEA9]">
            Role-readiness models reflect live industry hiring job descriptions across clinical research and healthcare analytics. Programme scope, software tools, and deliverables depend on the specific role track.
          </p>
        </div>
      </section>

      {/* Mobile Sticky Action Dock (Portaled to document.body, visible only past hero) */}
      {mounted && showStickyDock && typeof document !== "undefined"
        ? createPortal(
            <div
              data-sticky-action-bar="true"
              data-arzon-dark="true"
              className="fixed bottom-0 inset-x-0 z-40 block lg:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-[#02201D]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_24px_rgba(0,0,0,0.3)] motion-safe:animate-in motion-safe:slide-in-from-bottom duration-300"
            >
              <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                  </span>
                  <div className="truncate">
                    <p className="text-[11.5px] font-bold text-white truncate" style={{ color: "#ffffff" }}>
                      Healthcare Career Intelligence 2026
                    </p>
                    <p className="text-[9.5px] text-[#A6DDD5] truncate" style={{ color: "#A6DDD5" }}>
                      Free 1-on-1 Profile Analysis · Next Steps
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openExpertModal({ source: "mobile_sticky_dock" });
                  }}
                  style={{ color: "#004B45" }}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#DFF1EF] !text-[#004B45] text-[#004B45] font-bold text-[11.5px] shadow-sm transition active:scale-95 cursor-pointer tone-light card-light"
                >
                  <span style={{ color: "#004B45" }} className="!text-[#004B45] font-bold">Talk to Experts</span>
                  <ArrowRight className="h-3 w-3 text-[#004B45]" style={{ color: "#004B45" }} />
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </main>
  );
}
