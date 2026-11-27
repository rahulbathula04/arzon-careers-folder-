import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
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
  Trophy,
  Users,
} from "lucide-react";
import { LINKS } from "@/components/landing/constants";

const LINKEDIN = LINKS.linkedin;
const GLOBAL_IMPACT_AWARD_LINKEDIN = "https://lnkd.in/p/dxSyrMUb";
const MALLA_REDDY_LINKEDIN =
  "https://www.linkedin.com/posts/arzonglobal-campusvisit-presentation-ugcPost-7459179713735995394-_bmu/?highlightedUpdateUrn=urn%3Ali%3AugcPost%3A7459179713735995394&highlightedUpdateType=SOCIAL_SHARE&origin=SOCIAL_SHARE&utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEnmUHsBc7DzVndPmNWZqFqDa73sXe72aMI&utm_campaign=whatsapp";

const CAREER_PATHS = [
  {
    title: "Pharmacovigilance",
    subtitle: "Medicine safety and case processing",
    image: "/assets/thumbs/pharmacovigilance.webp",
    href: "/pv-associate",
    tag: "Drug safety",
  },
  {
    title: "Clinical Data Management",
    subtitle: "Clinical data review and quality",
    image: "/assets/thumbs/clinical-data-management.webp",
    href: "/courses/clinical-data-management",
    tag: "Clinical operations",
  },
  {
    title: "Medical Coding",
    subtitle: "Clinical documentation and coding",
    image: "/assets/thumbs/medical-coding.webp",
    href: "/courses/medical-coding",
    tag: "Healthcare operations",
  },
  {
    title: "Regulatory Affairs",
    subtitle: "Regulatory information and submissions",
    image: "/assets/thumbs/regulatory-affairs.webp",
    href: "/courses/regulatory-affairs",
    tag: "Regulatory",
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
  const prefersReducedMotion = useReducedMotion();
  const preview = TRACK_PREVIEWS[activeTrack];

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

            <h1 className="max-w-[620px] text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.04] tracking-[-0.045em] text-[#063F39]">
              Build capability.
              <span className="mt-1 block text-[#008F83]">Show the work.</span>
            </h1>

            <p className="mt-3.5 max-w-[500px] text-[14px] leading-relaxed text-[#526B67] sm:text-[16px]">
              We connect role requirements, practical learning and evidence of skill — helping students make clearer career decisions.
            </p>

            <div className="mt-6 flex flex-row items-center gap-2.5 sm:gap-3">
              <Link
                to={"/career-engine/start" as any}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#004B45] px-5 text-[12.5px] sm:text-[13px] font-bold text-white shadow-[0_6px_18px_rgba(0,75,69,0.18)] transition-all hover:bg-[#00675D] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F83]"
              >
                Build my profile <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#proof"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-[#BFD5D0] bg-white/90 backdrop-blur px-4 sm:px-5 text-[12.5px] sm:text-[13px] font-bold text-[#174D47] transition-all hover:border-[#008F83] hover:bg-white active:scale-[0.98] shadow-2xs"
              >
                See our work <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-7 sm:mt-8 grid grid-cols-3 gap-2 border-t border-[#DCE9E6] pt-4 text-center sm:text-left sm:flex sm:items-center sm:gap-6">
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
            {/* Card 1: 2026 Global Impact Award Showcase (lg:col-span-8 — in Arzon signature Deep Forest Teal branding) */}
            <a
              href={GLOBAL_IMPACT_AWARD_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.14] bg-[#073F39] p-5 sm:p-7 text-white shadow-[0_20px_50px_rgba(0,75,69,0.22)] ring-1 ring-inset ring-white/[0.08] transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_24px_60px_rgba(0,75,69,0.30)] lg:col-span-8"
            >
              {/* Arzon Seafoam & Emerald Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(120,189,187,0.20)_0%,rgba(0,143,131,0.06)_50%,transparent_75%)] blur-2xl"
              />
              <div className="pointer-events-none absolute -right-12 -top-14 h-56 w-56 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-2 top-2 h-40 w-40 rounded-full border border-white/10" />

              <div>
                {/* Header Utility Rail */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9BD8D0]/30 bg-white/10 px-2.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-[#9BD8D0]">
                    <Award className="h-3 w-3 text-[#E7C982] shrink-0" />
                    Recognition · 04-05 Nov 2026
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-white/70">
                    SARSD · New Delhi
                  </span>
                </div>

                {/* 2-Column Split: Narrative on Left (~60%), Physical Trophy Proof in former TASK slot (~40%) */}
                <div className="relative z-10 mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  {/* Left Column: Official Narrative & Institutional Breakdown */}
                  <div className="flex-1 min-w-0 pr-0 lg:pr-3">
                    <p className="text-[40px] sm:text-[52px] font-bold leading-none tracking-[-0.06em] text-[#F3D99D]">
                      2026
                    </p>
                    <h3 className="mt-2 text-[22px] sm:text-[25px] font-bold leading-[1.08] tracking-[-0.04em] text-white">
                      Global Impact Award
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-white/80 font-normal">
                      Conferred to <strong className="text-white font-semibold">Arzon Global Labs</strong> by the Society of Applied Research and Social Development (SARSD) at the 8th ICAATAS International Conference, Malla Reddy University.
                    </p>

                    {/* Institutional Breakdown Box */}
                    <div className="mt-3.5 rounded-[14px] border border-white/15 bg-white/[0.07] p-3 text-[10.5px] backdrop-blur-sm">
                      <div className="grid grid-cols-2 gap-2 border-b border-white/15 pb-2">
                        <div>
                          <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0]">Host Venue</span>
                          <span className="font-semibold text-white">Malla Reddy University</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0]">Conferring Body</span>
                          <span className="font-semibold text-white">SARSD (Regd. Govt. of India)</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[#9BD8D0]">Scope of Award</span>
                        <span className="text-white/90">Workforce Development & Practical Healthcare Skilling Model</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Physical Award Plaque with luminous white fade spotlight (Positioned in former TASK slot space) */}
                  <div className="relative flex items-center justify-center shrink-0 w-full lg:w-[240px] xl:w-[270px] py-2 sm:py-1">
                    {/* Luminous soft white-to-transparent studio fade */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_45%,transparent_72%)] blur-xl"
                    />

                    {/* Floating Transparent Cutout Plaque with Soft Ground Reflection */}
                    <div className="relative flex flex-col items-center justify-center">
                      <img
                        src="/images/credentials/global-impact-trophy-transparent.png"
                        alt="Official 2026 Global Impact Award Plaque presented to Arzon Global Labs"
                        className="relative z-10 max-h-[210px] sm:max-h-[255px] w-auto object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {/* Soft white ground reflection / pedestal fade */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none -mt-3.5 h-4 w-36 sm:w-44 rounded-[100%] bg-white/20 blur-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link Rail */}
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-[11px] font-semibold text-[#A9E0D8]">
                <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-white">
                  View public announcement
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
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

            <Link
              to={"/career-assessment" as any}
              className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-bold text-[#00796F] transition hover:gap-3"
            >
              Explore the assessment <ArrowRight className="h-4 w-4" />
            </Link>
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
            </div>

            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-[9px] text-[#8AA19B]">
              <span>Assessment scope: Task-specific feedback, not a job guarantee or professional certification.</span>
              <span className="text-slate-400">Synthetic training data</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04 / CAREER PATHS */}
      <section
        id="career-paths"
        className="flex min-h-[calc(100svh-48px)] items-center bg-white py-10 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10">
          <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-2.5 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Explore career directions</SectionLabel>
              <h2 className="text-[26px] sm:text-[34px] font-bold tracking-tight text-[#063F39] leading-[1.08]">
                Start with the work you want to do.
              </h2>
            </div>
            <p className="max-w-[360px] text-[12.5px] sm:text-[13px] leading-relaxed text-[#6B817C]">
              Explore role expectations before choosing what to learn next.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CAREER_PATHS.map((path, index) => (
              <motion.div
                key={path.title}
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.15 },
                      transition: { duration: 0.45, delay: index * 0.06 },
                    })}
              >
                <Link
                  to={path.href as any}
                  className="group block overflow-hidden rounded-[22px] border border-[#E1EBE8] bg-[#F8FBFA] transition duration-300 hover:-translate-y-1 hover:border-[#A9D1CB] hover:shadow-[0_18px_44px_rgba(0,75,69,0.10)] active:scale-[0.98]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E6F0ED]">
                    <img
                      src={path.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#052E2A]/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#062E2B]/60 px-2.5 py-1 text-[8.5px] sm:text-[9px] font-mono font-semibold uppercase tracking-[0.13em] text-white backdrop-blur-md">
                      {path.tag}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-[17px] font-bold tracking-tight text-[#0B3934]">{path.title}</h3>
                    <p className="mt-1.5 min-h-[32px] text-[11.5px] leading-relaxed text-[#718781]">{path.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#00796F] group-hover:text-[#004B45]">
                      Explore path <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col justify-between gap-4 rounded-[22px] bg-[#073F39] p-5 sm:p-6 text-white sm:flex-row sm:items-center">
            <div className="flex items-center gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#A6DDD5]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-white">For colleges, TPOs and hiring teams</p>
                <p className="mt-0.5 text-[11px] text-white/70">Discuss campus engagement, assessment and role requirements.</p>
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
            Career-path images are illustrative. Programme scope, eligibility and outcomes depend on the relevant role and published programme details.
          </p>
        </div>
      </section>
    </main>
  );
}
