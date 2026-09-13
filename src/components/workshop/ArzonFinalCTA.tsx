import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="w-full bg-[var(--color-medical-navy)] tone-dark text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Background Teal Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-slate-800/90 border border-slate-700 text-teal-300 shadow-xl mx-auto mb-2">
          <GraduationCap className="w-8 h-8" />
        </div>

        <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          DON'T SPEND THE NEXT SIX MONTHS
          <br />
          <span className="text-teal-400">
            PREPARING FOR A CAREER YOU HAVEN'T CHOSEN.
          </span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Understand the market. Explore the roles. Identify the skills. Choose your direction.
        </p>

        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            id="final-cta-get-map-btn"
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 sm:py-5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-sans text-sm font-extrabold uppercase tracking-wider shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>GET MY FREE CAREER MAP + RESERVE SEAT</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <p className="font-sans text-xs text-white/80 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free 75-minute live career intelligence masterclass.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
