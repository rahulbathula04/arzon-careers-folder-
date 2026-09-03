import { Terminal, ShieldAlert, CheckCircle2, ArrowRight, Play } from "lucide-react";

export function WorkshopLiveCaseTeaser({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#0B1325] text-white tone-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider border border-blue-700/50">
            <Terminal className="w-3.5 h-3.5" />
            LIVE SCREEN DEMO PREVIEW
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-white leading-[1.18]">
            What We Will Process Live on Screen (75 Mins)
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
            No endless theory slides. Mohamed Kumail Abbas will open a live enterprise case scenario and walk through the exact triage steps corporate teams perform daily.
          </p>
        </div>

        {/* Live Case Terminal Card */}
        <div className="rounded-2xl border border-stone-700/80 bg-stone-900/90 overflow-hidden shadow-2xl max-w-4xl mx-auto">
          {/* Terminal Window Header */}
          <div className="px-4 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="font-mono text-xs text-stone-400 ml-2">
                ARZON-VIRTUAL-LAB · ORACLE_ARGUS_ICSR_TRIAGE.LOG
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              SIMULATION READY
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 sm:p-8 space-y-6 font-mono text-xs sm:text-sm">
            <div className="space-y-2 border-b border-stone-800 pb-5">
              <span className="text-stone-400 block">// STEP 01: INCOMING ADVERSE EVENT REPORT</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-stone-200">
                <div>
                  <span className="text-stone-500">Patient Identifier:</span> M-46 / Hyderabad Hub
                </div>
                <div>
                  <span className="text-stone-500">Suspect Product:</span> Tramadol 50mg + Paracetamol
                </div>
                <div>
                  <span className="text-stone-500">Reported Reaction:</span> Severe Bronchospasm + Urticaria
                </div>
                <div>
                  <span className="text-stone-500">Dechallenge Status:</span> Positive (Symptoms subsided on withdrawal)
                </div>
              </div>
            </div>

            <div className="space-y-3 border-b border-stone-800 pb-5">
              <span className="text-stone-400 block">// STEP 02: THE 4 VALIDITY CRITERIA (ICH-E2D COMPLIANCE)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Identifiable Patient</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Identifiable Reporter</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Suspect Drug</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Adverse Event</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-stone-400 block">// STEP 03: REGULATORY TIMELINE CLOCK DECISION</span>
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-amber-200">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs font-sans">
                  <span className="font-bold font-mono">SERIOUS CRITERIA MET: LIFE-THREATENING. </span>
                  Triggers mandatory <strong>15-Day Expedited Regulatory Filing</strong> to US FDA ESG &amp; EMA EudraVigilance.
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Bottom CTA */}
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-300 font-sans">
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Watch Mohamed Kumail Abbas solve this case live on Google Meet</span>
            </div>
            <button
              type="button"
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1B3F8B] hover:bg-blue-600 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Join Live Case Processing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
