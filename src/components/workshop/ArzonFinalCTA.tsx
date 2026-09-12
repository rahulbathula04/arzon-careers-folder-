import { ArrowRight, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1B3F8B] to-[#0F2860] text-white relative overflow-hidden shadow-2xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
          <span>ONE QUESTION BEFORE YOU LEAVE</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            If someone asked you tomorrow: <br />
            <span className="italic text-amber-300 font-serif">"What are you going to do after B.Pharm?"</span> <br />
            Would you have a specific answer?
          </h2>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed font-sans">
            If not, this session is designed for you. Don't graduate with just a degree. Graduate with a direction.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 border border-white/20 max-w-xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block">
            B.PHARM CAREER INTELLIGENCE 2026
          </span>
          <p className="text-xs text-blue-100 font-sans leading-relaxed">
            Live 75-minute practical market breakdown · Google Meet · 100% Free · No prior experience required
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-sm font-bold px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>BUILD MY B.PHARM CAREER MAP</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-blue-200/80 pt-2">
          <span>LIVE SESSION</span>
          <span>·</span>
          <span>EVIDENCE-BASED</span>
          <span>·</span>
          <span>INDUSTRY-LED</span>
        </div>
      </div>
    </section>
  );
}
