import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 text-white text-center relative overflow-hidden tone-dark shadow-2xl border border-slate-800">
          {/* Subtle ambient lighting */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.25),transparent)] pointer-events-none -z-10" 
            aria-hidden="true" 
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-2xs">
            <span>08 · Final Step</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white mb-3">
            Understand the work. Then{" "}
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#C084FC] bg-clip-text text-transparent [box-decoration-break:clone]">
              decide your next step.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-2 leading-relaxed font-sans">
            Pharmacovigilance may be the career you are looking for. Start by understanding what it involves.
          </p>

          <p className="text-xs sm:text-sm font-medium text-slate-300 mb-8 font-sans">
            Join the free Arzon Careers Pharmacovigilance Masterclass with Mohamed Kumail Abbas, M.Pharm.
          </p>

          {/* Primary CTA Button with Homepage Blue Polish */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-lg hover:shadow-2xl shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer tone-light"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Unified Metadata Capsule Bar */}
          <div className="inline-flex flex-wrap items-center justify-center rounded-2xl sm:rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 text-xs text-slate-300 font-medium mb-5 gap-2 sm:gap-4">
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Tuesday, October 20th</span>
            </div>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>6:00 PM IST</span>
            </div>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <div className="inline-flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Google Meet</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * Introductory educational session. No employment or placement guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
