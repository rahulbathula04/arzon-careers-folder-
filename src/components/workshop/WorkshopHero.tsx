import { useState } from "react";
import { ArrowRight, Sparkles, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface WorkshopHeroProps {
  onOpenRegister: () => void;
}

export function WorkshopHero({ onOpenRegister }: WorkshopHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
      {/* Subtle modern grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Radial glow gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Intelligence Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-300 backdrop-blur-md mb-8"
        >
          <Sparkles className="h-4 w-4 text-blue-400 motion-safe:animate-pulse" />
          <span>HEALTHCARE CAREER INTELLIGENCE WORKSHOP</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-ping" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-50 leading-[1.15]"
        >
          You've spent years studying.{" "}
          <span className="block mt-3 bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent italic font-light">
            Yet nobody has shown you how the healthcare industry actually works.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-slate-300 font-normal leading-relaxed"
        >
          Zero sales fluff. 100% data-driven career clarity for B.Pharm, Pharm.D, MBBS, BDS, Life Sciences & Healthcare graduates in India. Stop guessing your specialization. Start exploring real industry metrics.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start My Career Discovery</span>
            <ArrowRight className="h-5 w-5 text-white" />
          </button>

          <a
            href="#career-explorer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all"
          >
            <Compass className="h-5 w-5 text-sky-400" />
            <span>Explore Interactive Map</span>
          </a>
        </motion.div>

        {/* Live Cohort Status & Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs sm:text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Government & ISO Aligned Framework</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-400" />
            <span>Live Interactive Session</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span>Next Intakes: Limited Seats / Small Batches</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
