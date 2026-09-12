import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="w-full bg-[var(--color-medical-navy)] text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Background Teal Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 text-teal-300 shadow-xl mx-auto mb-2">
          <GraduationCap className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          DON'T SPEND THE NEXT SIX MONTHS
          <br />
          <span className="text-teal-300">
            PREPARING FOR A CAREER YOU HAVEN'T CHOSEN.
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Understand the market. Explore the roles. Identify the skills. Choose your direction.
        </p>

        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            id="final-cta-get-map-btn"
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 sm:py-5 rounded-2xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-sm font-bold uppercase tracking-wider shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            style={{ color: '#FFFFFF' }}
          >
            <span>GET MY FREE CAREER MAP</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="font-mono text-xs text-stone-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Limited seats per live session. Free 75-minute career intelligence.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
