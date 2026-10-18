import { Calendar, Clock, Video, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section id="final-cta" className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-[#E4EAF2] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)] pointer-events-none" 
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <div className="p-5 sm:p-14 lg:p-16 rounded-2xl sm:rounded-[32px] bg-white text-center relative overflow-hidden tone-light card-light shadow-[0_20px_60px_-15px_rgba(37,99,235,0.08),0_1px_3px_rgba(0,0,0,0.04)] border border-[#E2E8F0]">
          {/* Apple top micro-accent gradient line */}
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
            <span>08 · Final Step</span>
          </div>

          {/* Cupertino Bold Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#081F38] mb-4 leading-[1.18] font-serif">
            Understand the work. Then{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              decide your next step.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-2 leading-relaxed font-sans">
            Pharmacovigilance is a high-growth, recession-proof division in global life sciences. Start by understanding what the work actually looks like.
          </p>

          <p className="text-xs sm:text-sm font-semibold text-[#081F38] mb-8 font-sans flex items-center justify-center gap-1.5">
            <span>Free Masterclass with</span>
            <strong className="text-[#2563EB]">Mohamed Kumail Abbas, M.Pharm</strong>
            <span className="text-slate-400 font-normal">· Senior PV Lead</span>
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col items-center mb-6 w-full max-w-sm mx-auto">
            <button
              type="button"
              onClick={onReserveClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-[0_10px_25px_-5px_rgba(37,99,235,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.45)] transition-all transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs font-mono text-slate-400 mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              100% Free · 100 Live Seats Allocated · No Credit Card Required
            </span>
          </div>

          {/* Unified Metadata Capsule Bar */}
          <div className="inline-flex flex-wrap items-center justify-center rounded-2xl sm:rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 text-xs sm:text-[13px] text-[#081F38] font-semibold mb-8 gap-3 sm:gap-6 shadow-2xs">
            <div className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>Tuesday, October 20th</span>
            </div>
            <span className="hidden sm:inline-block text-slate-300">·</span>
            <div className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span>6:00 PM IST (Prompt)</span>
            </div>
            <span className="hidden sm:inline-block text-slate-300">·</span>
            <div className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                <Video className="w-3.5 h-3.5" />
              </div>
              <span>Google Meet (Live Session)</span>
            </div>
          </div>

          {/* 3 Apple Trust / Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-6 border-t border-slate-100 text-left sm:text-center">
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC]/90 border border-slate-200/70">
              <div className="flex items-center sm:justify-center gap-1.5 text-xs font-bold text-[#081F38] mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Educational Only</span>
              </div>
              <div className="text-[11.5px] text-slate-500 font-sans">
                Zero sales pitch. Real technical case triage walkthrough.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC]/90 border border-slate-200/70">
              <div className="flex items-center sm:justify-center gap-1.5 text-xs font-bold text-[#081F38] mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Interactive Q&amp;A</span>
              </div>
              <div className="text-[11.5px] text-slate-500 font-sans">
                Direct career questions with Mohamed Kumail Abbas.
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC]/90 border border-slate-200/70">
              <div className="flex items-center sm:justify-center gap-1.5 text-xs font-bold text-[#081F38] mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Instant Pass</span>
              </div>
              <div className="text-[11.5px] text-slate-500 font-sans">
                Instant WhatsApp room link &amp; preparation field guide.
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-6 font-sans italic">
            * Introductory educational session. No employment or placement guarantee implied.
          </p>
        </div>
      </div>
    </section>
  );
}
