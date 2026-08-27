import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, X, Clock } from "lucide-react";
import { QuickLeadRegisterModal } from "./QuickLeadRegisterModal";

export function GlobalFloatingIntakeBar() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ y: shouldReduceMotion ? 0 : 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl rounded-2xl border border-blue-500/30 bg-[#0F172A]/95 backdrop-blur-md p-3 sm:px-6 shadow-2xl text-slate-100 flex flex-wrap items-center justify-between gap-3"
      >
        {/* Left Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex h-9 w-9 rounded-xl bg-blue-500/20 border border-blue-400/40 items-center justify-center text-blue-400 shrink-0">
            <Clock className="h-4 w-4 motion-safe:animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-ping" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                LIVE INTAKE OPEN · 60 SEATS CAP
              </span>
            </div>
            <p className="text-xs font-serif font-bold text-slate-50 truncate mt-0.5">
              Tier-1 Enterprise Tech & Quant AI Cohort Closing Soon
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-50 text-xs font-bold font-sans flex items-center gap-1.5 shadow-md transition-all whitespace-nowrap"
          >
            Check Eligibility <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800/80 flex items-center justify-center transition-all"
            aria-label="Dismiss intake bar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Embedded Modal */}
      <QuickLeadRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
