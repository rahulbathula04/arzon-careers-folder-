import { useState } from "react";
import {
  ExternalLink,
  Play,
  Tv,
  CheckCircle2,
  Clock,
  Radio,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { LINKS } from "@/components/landing/constants";
import { TaskRealLogo, MsmeGovtLogo } from "@/components/common/TrustLogos";

const CHAPTERS = [
  {
    time: 39,
    timestamp: "0:39",
    title: "Chief Guest Address",
    speaker: "Dr. Srikanth Sinha (CEO, TASK)",
    summary: "Addressing media on industry readiness and clinical skill gaps",
  },
  {
    time: 105,
    timestamp: "1:45",
    title: "Facility Inauguration",
    speaker: "TASK & Arzon Leadership",
    summary: "Formal ribbon cutting of Hyderabad career facility",
  },
  {
    time: 252,
    timestamp: "4:12",
    title: "State Skilling Mandate",
    speaker: "Dept. of ITE&C Alignment",
    summary: "Bridging pharmacy & life sciences graduates to global clinical roles",
  },
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
      id="institutional-trust"
      className="py-6 sm:py-10 bg-[#F8FAFC]"
      aria-labelledby="institutional-trust-heading"
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
          {/* Top-Right Architectural Modern Glass Facade Fade */}
          <div
            className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-48 sm:h-64 pointer-events-none select-none overflow-hidden rounded-tr-[28px] sm:rounded-tr-[36px] z-0 opacity-40 sm:opacity-50"
            aria-hidden="true"
          >
            <img
              src="/images/acri-campus-bg.jpg"
              alt=""
              className="w-full h-full object-cover object-top"
              style={{
                maskImage:
                  "radial-gradient(circle at 80% 20%, black 25%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 80% 20%, black 25%, transparent 75%)",
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Header Eyebrow with hairline accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#081F38]">
                GOVERNMENT ALIGNED
              </span>
              <span className="h-1 w-1 rounded-full bg-[#081F38]" aria-hidden="true" />
              <span className="h-px w-8 sm:w-14 bg-slate-300" aria-hidden="true" />
            </div>

            {/* Precision Headline */}
            <h2
              id="institutional-trust-heading"
              className="text-2xl sm:text-3xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-[-0.025em] leading-[1.14] max-w-2xl"
            >
              Inaugurated with
              <br />
              Government{" "}
              <span className="font-serif italic font-medium bg-gradient-to-r from-[#2563EB] to-[#0284C7] bg-clip-text text-transparent [box-decoration-break:clone]">
                Skill Leadership.
              </span>
            </h2>

            {/* Approved Supporting Copy */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-[#475569] leading-relaxed max-w-2xl">
              Arzon Global&apos;s healthcare training center in Hyderabad was inaugurated by{" "}
              <strong className="text-[#081F38] font-semibold">Dr. Srikanth Sinha</strong>, CEO
              of TASK (Govt. of Telangana), and broadcast across 4 television networks.
            </p>

            {/* ─── 3 HORIZONTAL VERIFICATION BADGES (Exact layout from reference) ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-5 sm:my-7">
              {/* Card 1: TASK (State Government Alignment) */}
              <a
                href="https://www.task.telangana.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:bg-slate-50/80 transition-all duration-200 shadow-2xs tone-light card-light active:scale-[0.99] cursor-pointer"
                title="TASK - Telangana Academy for Skill and Knowledge (External official portal)"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-50 border border-slate-200 p-1.5 sm:p-2 flex items-center justify-center shrink-0">
                  <TaskRealLogo className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-sm font-bold text-[#081F38] group-hover:text-emerald-700 transition-colors">
                      TASK
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="block text-[11px] sm:text-xs text-[#64748B] leading-tight truncate">
                    Govt. of Telangana
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-[#64748B] leading-tight truncate">
                    (Dept. of ITE&amp;C)
                  </span>
                </div>
              </a>

              {/* Card 2: Broadcast Television (Telecast on 4 Networks) */}
              <a
                href={media.watch}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50/80 transition-all duration-200 shadow-2xs tone-light card-light active:scale-[0.99] cursor-pointer"
                title="HYBIZ TV HD Telecast (Simulcast with ETV Telangana, TV5 News, V5 News)"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0 text-[#2563EB]">
                  <Tv className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] sm:text-xs text-[#64748B] leading-tight">
                    Telecast on
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-sm font-bold text-[#081F38] group-hover:text-[#2563EB] transition-colors">
                      4 Networks
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </a>

              {/* Card 3: MSME (Sovereign Registration) */}
              <Link
                to="/legal"
                className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:bg-slate-50/80 transition-all duration-200 shadow-2xs tone-light card-light active:scale-[0.99] cursor-pointer"
                title="Ministry of MSME, Govt. of India Statutory Hub & UDYAM Registration"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-50 border border-slate-200 p-1.5 sm:p-2 flex items-center justify-center shrink-0">
                  <MsmeGovtLogo className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-sans text-sm font-bold text-[#081F38] group-hover:text-indigo-700 transition-colors">
                    MSME
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#64748B] leading-tight truncate">
                    Registered Enterprise
                  </span>
                </div>
              </Link>
            </div>

            {/* ─── FULL-WIDTH CINEMATIC BROADCAST VIDEO MONITOR ─── */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group relative h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Play telecast: Arzon Global training facility inauguration by TASK CEO Dr. Srikanth Sinha"
                >
                  <img
                    src={media.poster}
                    alt="TASK CEO Dr. Srikanth Sinha inaugurating Arzon Global facility"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = media.fallbackPoster;
                    }}
                  />
                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                  {/* Top-Right Telecast Badge */}
                  <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold text-white/90 border border-white/10 shadow-sm">
                      <Radio className="h-2.5 w-2.5 text-red-400" />
                      <span>697K+ SUBSCRIBERS</span>
                    </span>
                  </div>

                  {/* Bottom-Left Frosted Play Capsule (Matching reference screenshot) */}
                  <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
                    <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white/95 hover:bg-white text-[#081F38] pl-2 pr-4 sm:pl-2.5 sm:pr-5 py-1.5 sm:py-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md border border-white/80 transition-all duration-200 group-hover:scale-105 active:scale-95">
                      <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-[#081F38] text-white shrink-0">
                        <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white translate-x-0.5" />
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-medium text-[#081F38]">
                        Watch <strong className="font-bold">Telecast</strong> (5:36 HD)
                      </span>
                    </div>
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

            {/* Segmented Jump Chapters & Telecast Footnote */}
            <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B] shrink-0 mr-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-600" />
                  <span>Chapters:</span>
                </span>
                {CHAPTERS.map((chap, idx) => (
                  <button
                    key={chap.timestamp}
                    type="button"
                    onClick={() => handleSelectChapter(idx)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-medium transition-all shrink-0 cursor-pointer ${
                      isPlaying && activeChapter === idx
                        ? "bg-[#081F38] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-[#475569]"
                    }`}
                  >
                    <span className="font-bold">{chap.timestamp}</span>
                    <span className="hidden sm:inline">· {chap.title}</span>
                  </button>
                ))}
              </div>

              {/* Public Telecast Networks Footer */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#64748B]">
                <Building2 className="h-3 w-3 text-slate-400" />
                <span>Simulcast: HYBIZ TV HD · ETV Telangana · TV5 · V5</span>
              </div>
            </div>

            {/* Supporting Credibility Statistics Ribbon */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div>
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  CHIEF GUEST
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#081F38] truncate">
                  Dr. Srikanth Sinha
                </span>
                <span className="block text-[10px] text-[#64748B] truncate">
                  CEO, TASK · Govt of Telangana
                </span>
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  TV REACH
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#081F38]">
                  4 Channels
                </span>
                <span className="block text-[10px] text-[#64748B] truncate">
                  697,000+ Reach
                </span>
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  GOVERNMENT BODIES
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#081F38] truncate">
                  Dept. of ITE&amp;C
                </span>
                <span className="block text-[10px] text-[#64748B] truncate">
                  Telangana State Mandate
                </span>
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  PUBLIC RECORD
                </span>
                <span className="block text-xs sm:text-sm font-bold text-[#081F38] flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>UDYAM Verified</span>
                </span>
                <span className="block text-[10px] text-[#64748B] truncate">
                  Ministry of MSME, India
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
