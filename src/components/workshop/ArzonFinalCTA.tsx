import { ArrowRight, Sparkles, Video, Calendar, Clock } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-[var(--color-medical-navy)] tone-dark border-t border-[#0A1F3E] text-center text-[var(--color-warm-paper)] select-none">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Subtle Live Event Marker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]"></span>
          </span>
          <span className="text-white">LIVE WORKING SESSION · 06 SEP 2026 · 06:00 PM IST</span>
        </div>

        {/* Large Editorial Headline */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            <span className="text-white" style={{ color: '#FFFFFF' }}>SEE A REAL CASE PROCESSED.</span> <br />
            <span className="text-[var(--color-editorial-amber)]" style={{ color: '#D99A20' }}>
              UNDERSTAND WHAT EMPLOYERS ACTUALLY TEST.
            </span>
          </h2>
          <p style={{ color: '#E2E8F0' }} className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl mx-auto pt-2">
            Free 75-minute operational masterclass with Mohamed Kumail Abbas. No prior pharmacovigilance experience required.
          </p>
        </div>

        {/* Event Logistics Summary Strip */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-mono text-stone-300">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-clinical-teal)]" />
            <span>SUN 6 SEP 2026</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--color-clinical-teal)]" />
            <span>6:00 PM – 7:15 PM IST</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[var(--color-clinical-teal)]" />
            <span>GOOGLE MEET</span>
          </div>
        </div>

        {/* Large Primary Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center gap-3 py-4 px-8 sm:px-10 rounded-xl bg-[var(--color-warm-white)] hover:bg-white text-[var(--color-medical-navy)] font-mono text-sm sm:text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer group tone-light"
          >
            <span style={{ color: '#102E5C' }}>RESERVE MY FREE SEAT</span>
            <ArrowRight className="w-4 h-4 text-[var(--color-medical-navy)] group-hover:translate-x-1.5 transition-transform" style={{ color: '#102E5C' }} />
          </button>
          <p className="text-[11px] text-stone-400 font-sans mt-3">
            Zero cost · Google Meet access link sent directly via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
