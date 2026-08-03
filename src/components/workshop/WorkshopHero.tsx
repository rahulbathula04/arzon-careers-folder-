import { useState } from "react";
import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Building2, Cpu, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface WorkshopHeroProps {
  onOpenRegister: () => void;
}

export function WorkshopHero({ onOpenRegister }: WorkshopHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24 text-white">
      {/* Subtle Apple-style dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      
      {/* Soft gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-blue-900/10 via-slate-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left">
            
            {/* Minimal Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-300 backdrop-blur-sm mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-blue-400 motion-safe:animate-pulse" />
              <span>HEALTHCARE CAREER INTELLIGENCE PLATFORM</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              Don't choose another healthcare course.{" "}
              <span className="block mt-2 text-slate-300 font-normal italic">
                Until you know which healthcare career actually fits you.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-sans"
            >
              Every year students spend ₹50,000 to ₹2L on courses before answering one question: <strong className="text-slate-200">"What should I become?"</strong> Healthcare Career Intelligence helps you answer that first.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all cursor-pointer"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#explorer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-850 hover:text-white transition-all"
              >
                <Compass className="h-4 w-4 text-sky-400" />
                <span>Explore Live Intelligence</span>
              </a>
            </motion.div>

            {/* Minimal Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-slate-900 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ISO 9001:2015 & TASK Aligned
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                No Pushy Sales Calls
              </span>
            </motion.div>

          </div>

          {/* Right Column: Perplexity-Style Product Live Preview Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Product Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">CAREER INTELLIGENCE LIVE PREVIEW</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-400">
                  92% Best Match
                </span>
              </div>

              {/* Product Metric Content */}
              <div className="mt-5 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">TARGET DOMAIN</span>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">Pharmacovigilance & Drug Safety</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-500 block">HIRING DEMAND</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">High (4,850+ JDs)</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-500 block">AI AUTOMATION RISK</span>
                    <span className="text-xs font-bold text-blue-300 mt-1 block">Low (Legally Required)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-500 block">ACTIVE HIRING COMPANIES</span>
                    <span className="text-xs font-bold text-white mt-1 block">186 Verified Employers</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-500 block">SALARY SCALE</span>
                    <span className="text-xs font-mono font-bold text-white mt-1 block">₹3.8L – ₹16.0L</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1.5">MANDATORY CORPORATE SOFTWARE</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">Oracle Argus Safety</span>
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">MedDRA 26.0</span>
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">Safety Gateway</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600/10 py-2.5 text-xs font-bold text-blue-300 hover:bg-blue-600/20 transition-colors"
              >
                <span>Calculate Your Personal Match Score</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
