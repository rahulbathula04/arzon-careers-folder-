import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CareerGuessworkEnemyProps {
  onOpenRegister: () => void;
}

export function CareerGuessworkEnemy({ onOpenRegister }: CareerGuessworkEnemyProps) {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    { emoji: "😕", label: "Confused", desc: "Unsure which healthcare role fits your exact degree." },
    { emoji: "🤔", label: "Researching", desc: "Binge-watching contradictory YouTube videos & articles." },
    { emoji: "😩", label: "Overwhelmed", desc: "Flooded with generic EdTech webinars & sales calls." },
    { emoji: "💡", label: "Career Intelligence", desc: "Assessing data-backed match scores, tools & pay." },
    { emoji: "😊", label: "Certain", desc: "Targeting a clear domain with exact software skills." },
    { emoji: "🚀", label: "Interview Ready", desc: "Shortlisted and selected by top healthcare MNCs." }
  ];

  return (
    <section className="bg-slate-950 py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From Career Guesswork to Total Clarity
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Click any step on the timeline to see how your career transformation unfolds.
          </p>
        </div>

        {/* Vertical Apple-style Setup Timeline */}
        <div className="max-w-xl mx-auto relative border-l-2 border-slate-800 ml-4 sm:ml-auto pl-6 sm:pl-8 space-y-8">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            const isDone = idx < activeStep;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(idx)}
                className={`relative cursor-pointer transition-all ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isDone
                    ? "opacity-70"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                {/* Node Marker */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-1 h-6 w-6 rounded-full border flex items-center justify-center transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-600 text-white shadow-md scale-110"
                      : isDone
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                      : "border-slate-800 bg-slate-900 text-slate-600"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Card Content */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isActive
                    ? "border-blue-500 bg-slate-900 text-white shadow-xl"
                    : "border-slate-800/80 bg-slate-950 text-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Ready to jump straight to Career Intelligence and Certainty?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Find My Career Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
