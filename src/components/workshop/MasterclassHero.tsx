import { Calendar, Clock, Video, ArrowRight, ShieldCheck } from "lucide-react";

interface MasterclassHeroProps {
  onReserveClick: () => void;
}

export function MasterclassHero({ onReserveClick }: MasterclassHeroProps) {
  return (
    <section className="relative w-full pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 bg-[var(--color-warm-paper)]">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-blue-100/50 via-sky-50/20 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
            Arzon Careers · Free Live Masterclass
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#081F38] tracking-tight leading-[1.15] mb-6 sm:mb-8 font-serif">
          Your pharmacy degree is a start. Do you know what a drug safety job actually involves?
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-sans">
          See how pharmacovigilance works, understand how a safety case moves through the system, and explore what employers expect from entry-level drug safety candidates.
        </p>

        {/* Mentor callout */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs mb-8 sm:mb-10 tone-light card-light">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs sm:text-sm text-slate-700">
            A free live masterclass with <strong className="font-semibold text-[#081F38]">Mohamed Kumail Abbas, M.Pharm</strong>
          </span>
        </div>

        {/* Session details strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 text-xs sm:text-sm font-medium text-slate-600">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs tone-light card-light">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Tuesday, October 20th</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs tone-light card-light">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>6:00 PM IST</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs tone-light card-light">
            <Video className="w-4 h-4 text-blue-600" />
            <span>Google Meet</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-3.5">
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>RESERVE MY FREE SEAT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-slate-500 italic">
            For pharmacy students and graduates seriously exploring pharmacovigilance.
          </p>
        </div>
      </div>
    </section>
  );
}
