import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import { Calendar, Clock, Video, ShieldCheck, ArrowRight, Award, CheckCircle2 } from "lucide-react";

interface ArzonEventHeroProps {
  onReserveClick: () => void;
  isVariantB?: boolean;
}

export function ArzonEventHero({ onReserveClick, isVariantB = false }: ArzonEventHeroProps) {
  return (
    <div className="relative text-left space-y-7 select-none-watermark">
      {/* Editorial Watermark (Subtle Background Typographic Treatment) */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-6 z-0 select-none overflow-hidden opacity-[0.035] leading-none font-serif font-black text-stone-950 text-[100px] sm:text-[140px] lg:text-[180px] tracking-tighter"
      >
        PV / 2026
      </div>

      {/* Subtle Editorial Technical Coordinate System */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[var(--color-arzon-ink)]/50 tracking-widest uppercase border-b border-[var(--color-border-warm)]/60 pb-2">
        <span>ARZON / HC-2026 · SESSION 01</span>
        <span className="hidden sm:inline">INDIA · PHARMACOVIGILANCE</span>
      </div>

      {/* Eyebrow & Recurring Event Signal (Teal Pulse + Amber Rule + Mono Metadata) */}
      <div className="relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xs">
          {/* Subtle Teal Pulse */}
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]"></span>
          </span>
          <span className="font-mono text-[11px] font-bold tracking-wider text-[var(--color-arzon-ink)] uppercase">
            LIVE WORKING SESSION
          </span>
          {/* Thin Amber Rule */}
          <span className="w-px h-3 bg-[var(--color-editorial-amber)]"></span>
          <span className="font-mono text-[10px] text-[var(--color-arzon-ink)]/70 uppercase">
            SUNDAY 6 SEP
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--color-arzon-ink)]">
          <div className="w-1 h-3.5 bg-[var(--color-editorial-amber)] rounded-sm"></div>
          <span>FREE LIVE HEALTHCARE CAREER WORKSHOP</span>
        </div>
      </div>

      {/* Main Dominant Headline */}
      <div className="relative z-10 space-y-2">
        {isVariantB ? (
          <>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-arzon-ink)]/80 font-normal leading-snug">
              What does a Pharmacovigilance Associate
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-[var(--color-medical-navy)] tracking-tight leading-[0.95]">
              ACTUALLY DO?
            </h1>
          </>
        ) : (
          <>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-arzon-ink)]/85 font-normal leading-tight">
              You finished your healthcare degree.
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-[var(--color-arzon-ink)] tracking-tight leading-[0.95]">
              NOW WHAT?
            </h1>
          </>
        )}
      </div>

      {/* Subhead / Problem Framing */}
      <p className="relative z-10 font-sans text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
        Explore what Pharmacovigilance and Clinical Data employers actually expect from freshers
        before you spend money on another generic course or send another unanswered application.
      </p>

      {/* Mentor Hero Breakout (Break out of internal container without overlapping next section) */}
      <div className="relative z-10 pt-3">
        <div className="relative rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] p-4 sm:p-5 shadow-sm max-w-xl">
          {/* Accent Label */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-warm)]/70 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
            <span className="flex items-center gap-1.5 text-[var(--color-clinical-teal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-teal)]"></span>
              PRACTITIONER-LED WORKING SESSION
            </span>
            <span>EX-COGNIZANT · ACCENTURE · QUINTILES</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-4">
            {/* Breakout Portrait */}
            <div className="relative shrink-0 sm:-mt-6 sm:-ml-2">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-[var(--color-warm-white)] shadow-md bg-stone-200">
                <img
                  src={mentorKumailImg}
                  alt="Mohamed Kumail Abbas"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#0A66C2] rounded-md flex items-center justify-center text-white font-bold text-[11px] shadow-xs" title="Verified LinkedIn Profile">
                in
              </div>
            </div>

            {/* Mentor Details */}
            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-arzon-ink)]">
                  Mohamed Kumail Abbas
                </h3>
                <span className="font-mono text-xs font-semibold text-[var(--color-clinical-teal)]">
                  M.Pharm
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm font-medium text-[var(--color-medical-navy)]">
                Manager, Pharmacovigilance · Novaspire
              </p>
              <p className="font-sans text-xs text-stone-600 leading-relaxed pt-0.5">
                Processed thousands of ICSRs and trained global safety associates. Walking you through a live case step-by-step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Meta Badges */}
      <div className="relative z-10 flex flex-wrap items-center gap-y-3 gap-x-6 pt-2 font-sans text-xs sm:text-sm text-[var(--color-arzon-ink)]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--color-medical-navy)]" />
          <span className="font-bold">Sun 6 Sep 2026</span>
        </div>
        <div className="w-px h-4 bg-[var(--color-border-warm)] hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--color-medical-navy)]" />
          <span><strong className="font-bold">6:00 PM – 7:15 PM IST</strong> (75 min)</span>
        </div>
        <div className="w-px h-4 bg-[var(--color-border-warm)] hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[var(--color-clinical-teal)]" />
          <span className="font-bold text-[var(--color-clinical-teal)]">Google Meet</span>
        </div>
      </div>

      {/* Micro Trust Bullets */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700 font-sans pt-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
          <span>No prior PV experience needed</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
          <span>Live adverse event case triage</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
          <span>Verified industry career roadmap</span>
        </div>
      </div>
    </div>
  );
}
