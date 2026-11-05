import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Play,
  ShieldCheck,
  ArrowRight,
  Radio,
  Tv,
  Clock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { LINKS } from "@/components/landing/constants";
import { TaskRealLogo, HybizTvLogo, MsmeGovtLogo } from "@/components/common/TrustLogos";

const CHAPTERS = [
  {
    time: 39,
    timestamp: "0:39",
    tag: "KEYNOTE",
    mobileShort: "Address",
    title: "Chief Guest Address",
    speaker: "Dr. Srikanth Sinha (CEO, TASK)",
    summary: "Addressing media on industry readiness and clinical skill gaps",
    highlight: "Clinical workforce readiness & state skill gap",
  },
  {
    time: 105,
    timestamp: "1:45",
    tag: "CEREMONY",
    mobileShort: "Launch",
    title: "Facility Inauguration",
    speaker: "TASK & Arzon Leadership",
    summary: "Ribbon cutting of the Hyderabad healthcare career hub",
    highlight: "Formal ribbon cutting of Hyderabad career facility",
  },
  {
    time: 252,
    timestamp: "4:12",
    tag: "MANDATE",
    mobileShort: "Mandate",
    title: "State Workforce Mandate",
    speaker: "Dept. of ITE&C Alignment",
    summary: "Bridging pharmacy & life sciences graduates to global clinical roles",
    highlight: "Bridging pharmacy & life sciences graduates to global trials",
  },
] as const;

const BROADCAST_NETWORKS = [
  { name: "HYBIZ TV HD", tag: "697K+ Subs", short: "HYBIZ HD" },
  { name: "ETV Telangana", tag: "Satellite", short: "ETV" },
  { name: "TV5 News", tag: "Cable HD", short: "TV5" },
  { name: "V5 News", tag: "Broadcast", short: "V5" },
] as const;

export function HomeInstitutionalTrust() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const media = LINKS.mediaInauguration;
  const prefersReduced = useReducedMotion();

  const handleSelectChapter = (index: number) => {
    setActiveChapter(index);
    setIsPlaying(true);
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const consoleVariants = {
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

  const bladesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const bladeVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="institutional-trust"
      className="py-7 sm:py-16 lg:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light relative overflow-hidden"
      aria-labelledby="institutional-trust-heading"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="ap-shell relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Minimal High-Impact Header with Apple Calligraphic Balance */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-3.5 sm:gap-6 mb-5 sm:mb-10"
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="max-w-2xl">
            {/* Apple-grade Eyebrow Capsule */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.08em] text-[#1557D6] mb-2 sm:mb-3 shadow-2xs">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>GOVERNMENT ALIGNMENT · PUBLIC RECORD</span>
            </div>

            {/* Precision Typography / Apple Editorial Heading */}
            <h2
              id="institutional-trust-heading"
              className="text-[23px] xs:text-2xl sm:text-3xl lg:text-[40px] font-sans font-bold text-[#081F38] tracking-[-0.025em] leading-[1.18] sm:leading-tight"
            >
              Inaugurated with Government{" "}
              <span className="font-serif italic font-medium bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Skill Leadership.
              </span>
            </h2>

            <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm lg:text-base text-[#475569] leading-relaxed tracking-[-0.01em]">
              When Arzon Global expanded healthcare operations in Hyderabad,{" "}
              <strong className="text-[#081F38] font-semibold">
                Dr. Srikanth Sinha, CEO of TASK
              </strong>{" "}
              (Govt. of Telangana), joined as Chief Guest to inaugurate the facility — broadcast
              live across 4 regional television channels.
            </p>
          </div>

          {/* Quick Header Proof Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start lg:self-auto pt-0.5 sm:pt-0">
            <a
              href={media.watch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] px-3.5 sm:px-4.5 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs active:scale-[0.97]"
            >
              <Tv className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2563EB]" />
              <span>Telecast (5:36 HD)</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
            <Link
              to="/legal"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#E2E8F0] bg-white tone-light card-light hover:bg-slate-50 text-[#081F38] px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-bold transition-all shadow-2xs active:scale-[0.97]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Statutory Hub</span>
            </Link>
          </div>
        </motion.div>

        {/* Master Studio Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 items-start">
          {/* ─── LEFT: CINEMATIC BROADCAST MONITOR (Cols 1-7) ─── */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            variants={prefersReduced ? undefined : consoleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Monitor Titanium Housing with Hairline Highlight */}
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0A101D] p-2 sm:p-3 shadow-[0_18px_45px_-10px_rgba(8,31,56,0.28)] ring-1 ring-inset ring-white/[0.08]">
              {/* Studio Telemetry Header Bar */}
              <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-950/70 backdrop-blur-md rounded-xl mb-1.5 sm:mb-2.5 border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-red-400">
                    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                    </span>
                    <span>ON AIR ARCHIVE</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-300">
                    HYBIZ TV HD
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Apple Music Style Sound Equalizer */}
                  <div
                    className="flex items-end gap-0.5 h-2.5 sm:h-3 px-1"
                    aria-hidden="true"
                    title="Live Audio Signal"
                  >
                    <span
                      className="w-0.5 h-1.5 bg-emerald-400 rounded-full motion-safe:animate-pulse"
                      style={{ animationDuration: "0.6s" }}
                    />
                    <span
                      className="w-0.5 h-2.5 sm:h-3 bg-emerald-400 rounded-full motion-safe:animate-pulse"
                      style={{ animationDuration: "0.4s" }}
                    />
                    <span
                      className="w-0.5 h-1 bg-emerald-400 rounded-full motion-safe:animate-pulse"
                      style={{ animationDuration: "0.7s" }}
                    />
                    <span
                      className="w-0.5 h-2 bg-emerald-400 rounded-full motion-safe:animate-pulse"
                      style={{ animationDuration: "0.5s" }}
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-slate-400 bg-slate-900/90 px-1.5 sm:px-2 py-0.5 rounded border border-white/[0.08]">
                    1080p HD
                  </span>
                </div>
              </div>

              {/* Viewport Screen */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black group shadow-inner">
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="relative h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={`Play telecast chapter: ${CHAPTERS[activeChapter].title}`}
                  >
                    <img
                      src={media.poster}
                      alt="TASK CEO Dr. Srikanth Sinha inaugurating Arzon Global facility"
                      className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = media.fallbackPoster;
                      }}
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/40" />

                    {/* Floating Telecast Metrics */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold text-white/90 border border-white/10 shadow-sm">
                        <Radio className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-400" />
                        <span>697K+ REACH</span>
                      </span>
                    </div>

                    {/* Apple-grade Frosted Glass Lens Play Trigger */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="grid h-13 w-13 sm:h-18 sm:w-18 place-items-center rounded-full bg-white/85 hover:bg-white text-[#081F38] shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 group-hover:scale-108 border border-white/90 active:scale-95">
                        <Play className="h-5.5 w-5.5 sm:h-7 sm:w-7 fill-[#081F38] translate-x-0.5" />
                      </div>
                      <span className="hidden sm:inline-block mt-2.5 text-[10px] font-mono font-bold tracking-wider uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10">
                        Stream telecast ({CHAPTERS[activeChapter].timestamp})
                      </span>
                    </div>

                    {/* Bottom Dynamic Headline Overlay */}
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                      <div className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-300" />
                        <span>{CHAPTERS[activeChapter].timestamp}</span>
                        <span className="hidden sm:inline">· {CHAPTERS[activeChapter].tag}</span>
                      </div>
                      <h3 className="font-sans text-[13px] sm:text-sm lg:text-base font-bold text-white drop-shadow-sm leading-tight line-clamp-1">
                        {CHAPTERS[activeChapter].speaker}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5 hidden sm:block">
                        {CHAPTERS[activeChapter].summary}
                      </p>
                    </div>
                  </button>
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?start=${CHAPTERS[activeChapter].time}&autoplay=1&rel=0&modestbranding=1`}
                    title={media.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>

              {/* Apple Segmented Chapter Controller (Mobile Precision) */}
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-400" />
                    <span>Telecast Jump Chapters</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    Tap to jump video
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {CHAPTERS.map((chapter, idx) => {
                    const isSelected = activeChapter === idx;
                    return (
                      <button
                        key={chapter.timestamp}
                        type="button"
                        onClick={() => handleSelectChapter(idx)}
                        className={`group text-left p-1.5 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer active:scale-[0.97] ${
                          isSelected
                            ? "bg-gradient-to-b from-blue-900/80 to-blue-950/90 border-blue-400/60 shadow-[0_2px_12px_rgba(37,99,235,0.3)] ring-1 ring-blue-400/30"
                            : "bg-slate-950/50 border-white/[0.06] hover:border-white/[0.12] hover:bg-slate-900/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                          <span
                            className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded leading-none ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-800 text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {chapter.timestamp}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-mono font-semibold uppercase text-slate-400 hidden sm:inline">
                            {chapter.tag}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                            isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          <span className="sm:hidden">{chapter.mobileShort}</span>
                          <span className="hidden sm:inline">{chapter.title}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 hidden sm:block">
                          {chapter.highlight}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Micro Caption Under Monitor */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 px-0.5 text-[10px] sm:text-[11px] text-[#64748B]">
              <div className="flex items-center gap-1">
                <span className="font-mono font-semibold text-[#081F38]">Simulcast Coverage:</span>
                <span className="font-mono text-[#475569]">
                  ETV · TV5 · V5 · HYBIZ TV HD
                </span>
              </div>
              <span className="font-mono text-slate-400 hidden sm:inline">
                Verified Television Record
              </span>
            </div>
          </motion.div>

          {/* ─── RIGHT: 3 GRAPHICAL VERIFICATION BLADES (Cols 8-12) ─── */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5"
            variants={prefersReduced ? undefined : bladesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Blade 1: TASK Collaboration (Government Alignment) */}
            <motion.div
              variants={prefersReduced ? undefined : bladeVariants}
              whileHover={
                prefersReduced
                  ? undefined
                  : { y: -2, transition: { duration: 0.2, ease: "easeOut" } }
              }
              className="rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light p-3 sm:p-4.5 shadow-2xs hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 shadow-2xs">
                    <TaskRealLogo className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#047857]">
                      STATE GOVERNMENT ALIGNMENT
                    </span>
                    <h3 className="font-sans text-xs sm:text-sm font-bold text-[#081F38] leading-tight">
                      Dr. Srikanth Sinha · CEO, TASK
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Govt. of Telangana
                </span>
              </div>

              {/* Main Bullet Points (Minimal Text) */}
              <ul className="space-y-1 text-[11px] sm:text-xs text-[#475569]">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Formally inaugurated Arzon Global&apos;s healthcare training center in Hyderabad as
                    Chief Guest.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Dept. of ITE&amp;C skilling mandate to fast-track Life Sciences &amp; Pharmacy
                    graduates into global roles.
                  </span>
                </li>
              </ul>

              <div className="mt-2 sm:mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#64748B]">
                <span>Dept. of ITE&amp;C Partnership</span>
                <span className="text-emerald-700 font-bold">State Public Record</span>
              </div>
            </motion.div>

            {/* Blade 2: 4-Network Televised Telecast (Mass Media) */}
            <motion.div
              variants={prefersReduced ? undefined : bladeVariants}
              whileHover={
                prefersReduced
                  ? undefined
                  : { y: -2, transition: { duration: 0.2, ease: "easeOut" } }
              }
              className="rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light p-3 sm:p-4.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 shadow-2xs">
                    <HybizTvLogo className="h-4.5 sm:h-5 w-auto" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                      BROADCAST TELEVISION
                    </span>
                    <h3 className="font-sans text-xs sm:text-sm font-bold text-[#081F38] leading-tight">
                      Simulcast on 4 Networks
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                  <Radio className="h-3 w-3 text-blue-600" />
                  697K+ Reach
                </span>
              </div>

              {/* 4-Network Matrix Chips (Compact on Mobile) */}
              <div className="grid grid-cols-4 sm:grid-cols-2 gap-1 sm:gap-1.5 mb-2">
                {BROADCAST_NETWORKS.map((net) => (
                  <div
                    key={net.name}
                    className="flex items-center justify-between px-1.5 sm:px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] sm:text-[11px]"
                  >
                    <span className="font-semibold text-[#081F38] sm:hidden">{net.short}</span>
                    <span className="font-semibold text-[#081F38] hidden sm:inline">{net.name}</span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#64748B] hidden sm:inline">{net.tag}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-1.5 sm:pt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#64748B]">
                <span>5:36 HD Master Telecast</span>
                <span className="text-[#1D4ED8] font-bold">Uncut Archive</span>
              </div>
            </motion.div>

            {/* Blade 3: MSME Sovereign Standing (Govt of India) */}
            <motion.div
              variants={prefersReduced ? undefined : bladeVariants}
              whileHover={
                prefersReduced
                  ? undefined
                  : { y: -2, transition: { duration: 0.2, ease: "easeOut" } }
              }
              className="rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light p-3 sm:p-4.5 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 shadow-2xs">
                    <MsmeGovtLogo className="h-5 sm:h-6 w-auto" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#4338CA]">
                      SOVEREIGN REGISTRATION
                    </span>
                    <h3 className="font-sans text-xs sm:text-sm font-bold text-[#081F38] leading-tight">
                      MSME Registered Enterprise
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                  <ShieldCheck className="h-3 w-3 text-indigo-600" />
                  Govt. of India
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed line-clamp-2 sm:line-clamp-none">
                Registered under the Ministry of Micro, Small and Medium Enterprises (MSME). Open-ledger
                transparency and sovereign enterprise identity.
              </p>

              <div className="mt-2 sm:mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#64748B]">
                <span>Ministry of MSME</span>
                <span className="text-[#4338CA] font-bold">UDYAM Registered</span>
              </div>
            </motion.div>

            {/* Quick Action Navigation */}
            <div className="pt-0.5 flex flex-row gap-2">
              <Link
                to="/why-arzon"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#081F38] hover:bg-[#153270] text-white px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-[0.97]"
              >
                <span>All Verifications</span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
              <a
                href={media.watch}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-full border border-[#E2E8F0] bg-white tone-light card-light hover:bg-slate-50 text-[#081F38] px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold transition-all shadow-2xs active:scale-[0.97]"
              >
                <Tv className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2563EB]" />
                <span>YouTube</span>
                <ExternalLink className="h-3 w-3 text-[#64748B]" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ─── BOTTOM FULL-WIDTH TELEMETRY RIBBON (Apple Spec Strip) ─── */}
        <motion.div
          className="mt-5 sm:mt-10 lg:mt-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] tone-light card-light p-3.5 sm:p-5 lg:p-6 shadow-2xs"
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 divide-y-0 sm:divide-x divide-slate-200">
            {/* Metric 1 */}
            <div className="sm:px-3 first:sm:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.08em] uppercase text-[#64748B] block mb-0.5">
                CHIEF GUEST
              </span>
              <p className="text-xs sm:text-base font-bold text-[#081F38]">Dr. Srikanth Sinha</p>
              <p className="text-[10px] sm:text-xs text-[#475569] mt-0.5 line-clamp-1">
                CEO, TASK · Govt of Telangana
              </p>
            </div>

            {/* Metric 2 */}
            <div className="sm:px-3">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.08em] uppercase text-[#64748B] block mb-0.5">
                TV COVERAGE
              </span>
              <p className="text-xs sm:text-base font-bold text-[#081F38]">4 Channels</p>
              <p className="text-[10px] sm:text-xs text-[#475569] mt-0.5 line-clamp-1">
                HYBIZ, ETV, TV5, V5
              </p>
            </div>

            {/* Metric 3 */}
            <div className="sm:px-3">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.08em] uppercase text-[#64748B] block mb-0.5">
                AUDIENCE
              </span>
              <p className="text-xs sm:text-base font-bold text-[#081F38]">697,000+</p>
              <p className="text-[10px] sm:text-xs text-[#475569] mt-0.5 line-clamp-1">
                Uncut 5:36 HD Telecast
              </p>
            </div>

            {/* Metric 4 */}
            <div className="sm:px-3">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.08em] uppercase text-[#64748B] block mb-0.5">
                SOVEREIGN ID
              </span>
              <p className="text-xs sm:text-base font-bold text-[#081F38]">UDYAM Registered</p>
              <p className="text-[10px] sm:text-xs text-[#475569] mt-0.5 line-clamp-1">
                Ministry of MSME, Govt. of India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
