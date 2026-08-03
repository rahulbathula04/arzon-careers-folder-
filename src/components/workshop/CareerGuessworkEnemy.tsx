import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CareerGuessworkEnemyProps {
  onOpenRegister: () => void;
}

export function CareerGuessworkEnemy({ onOpenRegister }: CareerGuessworkEnemyProps) {
  const steps = [
    { emoji: "😕", label: "Confused", desc: "Unsure which healthcare role fits your exact degree." },
    { emoji: "🤔", label: "Researching", desc: "Binge-watching contradictory YouTube videos & articles." },
    { emoji: "😩", label: "Overwhelmed", desc: "Flooded with generic EdTech webinars & sales calls." },
    { emoji: "💡", label: "Career Intelligence", desc: "Assessing data-backed match scores, tools & pay." },
    { emoji: "😊", label: "Certain", desc: "Targeting a clear domain with exact software skills." },
    { emoji: "🚀", label: "Interview Ready", desc: "Shortlisted and selected by top healthcare MNCs." }
  ];

  return (
    <section className="bg-slate-950 py-16 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>5-SECOND TRANSFORMATION TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            From Career Guesswork to Total Clarity
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            How Healthcare Career Intelligence transforms your career trajectory in minutes.
          </p>
        </div>

        {/* 6-Step Horizontal Emotional Journey Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
          {steps.map((s, idx) => {
            const isHighlight = idx >= 3;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className={`p-4 rounded-2xl border flex flex-col justify-between text-center transition-all ${
                  isHighlight
                    ? "border-blue-500/40 bg-blue-600/10 text-white shadow-md"
                    : "border-slate-800 bg-slate-900/60 text-slate-400"
                }`}
              >
                <div>
                  <span className="text-3xl block mb-2">{s.emoji}</span>
                  <span className={`text-xs font-bold font-mono block ${isHighlight ? "text-blue-300" : "text-slate-300"}`}>
                    {s.label}
                  </span>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-400 font-sans">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Ready to jump straight to Career Intelligence and Certainty?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
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
