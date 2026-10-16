import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 bg-[var(--color-warm-paper)] border-b border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#081F38] text-white text-center relative overflow-hidden tone-dark shadow-xl border border-slate-800">
          {/* Subtle glow */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/15 blur-3xl pointer-events-none -z-10" 
            aria-hidden="true" 
          />

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400 block mb-4">
            08 · Final Step
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 font-serif">
            Understand the work. Then decide your next step.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-2 leading-relaxed">
            Pharmacovigilance may be the career you are looking for. Start by understanding what it involves.
          </p>

          <p className="text-sm sm:text-base font-semibold text-blue-200 mb-8">
            Join the free Arzon Careers Pharmacovigilance Masterclass.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>RESERVE MY FREE SEAT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metadata pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium mb-6">
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Tuesday, October 20th</span>
            </div>
            <span>·</span>
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>6:00 PM IST</span>
            </div>
            <span>·</span>
            <div className="inline-flex items-center gap-1.5">
              <Video className="w-4 h-4 text-blue-400" />
              <span>Google Meet</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            * Introductory educational session. No employment or placement guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
