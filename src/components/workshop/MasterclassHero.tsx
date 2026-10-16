import { Calendar, Clock, Video, ArrowRight, ShieldCheck, Sparkles, Users, CheckCircle2 } from "lucide-react";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";

interface MasterclassHeroProps {
  onReserveClick: () => void;
}

const TOPICS = [
  "ICSR Case Processing",
  "Adverse Event Triage",
  "MedDRA & WHODrug Coding",
  "Argus Safety Workflows",
  "Narrative Writing",
  "Expedited Regulatory Reporting",
];

export function MasterclassHero({ onReserveClick }: MasterclassHeroProps) {
  return (
    <section className="relative w-full pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 bg-[var(--color-warm-paper)]">
      {/* Background ambient radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.08),transparent)] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow with live pulse */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-6 sm:mb-8">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <span>ARZON CAREERS · FREE LIVE MASTERCLASS</span>
        </div>

        {/* Headline with Apple-grade typographic scale */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#081F38] tracking-tight leading-[1.12] mb-6 sm:mb-8 font-serif">
          Your pharmacy degree is a start.{" "}
          <span className="block mt-1 sm:mt-2">
            Do you know what a{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#1D4ED8] bg-clip-text text-transparent [box-decoration-break:clone]">
              drug safety job actually involves?
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-sans">
          See how pharmacovigilance works, understand how a safety case moves through the system, and explore what employers expect from entry-level drug safety candidates.
        </p>

        {/* Faculty callout pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-8 sm:mb-10 tone-light card-light">
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs bg-slate-100">
            <img
              src={mentorKumailImg}
              alt="Mohamed Kumail Abbas"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-xs sm:text-sm text-slate-700">
            A free live masterclass with <strong className="font-semibold text-[#081F38]">Mohamed Kumail Abbas, M.Pharm</strong>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            15+ Yrs Industry Lead
          </span>
        </div>

        {/* Session details badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm font-medium text-slate-700">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs tone-light card-light">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Tuesday, October 20th</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs tone-light card-light">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">6:00 PM IST</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs tone-light card-light">
            <Video className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Google Meet</span>
          </div>
        </div>

        {/* Primary CTA with pulse & capacity pill */}
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>RESERVE MY FREE SEAT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Capacity micro-indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>348 of 500 seats reserved (70% full)</span>
            <span className="text-slate-300">·</span>
            <span className="italic">For pharmacy students &amp; graduates exploring drug safety.</span>
          </div>
        </div>

        {/* Core Topics Ticker Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 max-w-2xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Core Masterclass Modules
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TOPICS.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-medium tone-light card-light shadow-2xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
