import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, HelpCircle, Search, AlertCircle, Lightbulb, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface CareerGuessworkEnemyProps {
  onOpenRegister: () => void;
}

export function CareerGuessworkEnemy({ onOpenRegister }: CareerGuessworkEnemyProps) {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    { Icon: HelpCircle, label: "Confused", desc: "Unsure which healthcare role fits your exact degree.", color: "text-slate-400" },
    { Icon: Search, label: "Researching", desc: "Binge-watching contradictory YouTube videos & forum threads.", color: "text-amber-400" },
    { Icon: AlertCircle, label: "Overwhelmed", desc: "Flooded with generic EdTech webinars & sales calls.", color: "text-rose-400" },
    { Icon: Lightbulb, label: "Career Intelligence", desc: "Assessing data-backed match scores, tools & pay scale.", color: "text-blue-400" },
    { Icon: CheckCircle2, label: "Certain", desc: "Targeting a clear domain with exact corporate tool skills.", color: "text-emerald-400" },
    { Icon: Rocket, label: "Interview Ready", desc: "Shortlisted and selected by top healthcare MNCs.", color: "text-violet-400" },
  ];

  return (
    <section className="tone-dark bg-[#020617] py-20 text-white border-t border-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>CAREER TRANSFORMATION ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From Career Guesswork to Total Certainty
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Click any step on the timeline to inspect your transformation path.
          </p>
        </div>

        {/* Vertical Timeline Process */}
        <div className="max-w-xl mx-auto relative border-l-2 border-slate-800 ml-4 sm:ml-auto pl-6 sm:pl-8 space-y-6">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            const isDone = idx < activeStep;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(idx)}
                className={`relative cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isDone
                    ? "opacity-75"
                    : "opacity-45 hover:opacity-75"
                }`}
              >
                {/* Node Marker */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-1.5 h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg scale-110"
                      : isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-[#0f172a] text-slate-500 border border-slate-800"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Step Card */}
                <div className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#0f172a]/90 text-white shadow-xl backdrop-blur-sm border border-slate-800"
                    : "bg-[#0f172a]/30 text-slate-300 hover:bg-[#0f172a]/50"
                }`}>
                  <div className="flex items-center gap-3">
                    <s.Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : s.color}`} />
                    <div>
                      <h3 className="text-base font-bold text-white">{s.label}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-4 backdrop-blur-md">
            <span className="text-xs text-slate-300 font-medium">
              Ready to identify your position on the career intelligence timeline?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>See My Position</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
