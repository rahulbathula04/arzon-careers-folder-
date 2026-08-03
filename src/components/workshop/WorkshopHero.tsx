import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface WorkshopHeroProps {
  onOpenRegister: () => void;
}

export function WorkshopHero({ onOpenRegister }: WorkshopHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-32 text-white">
      {/* Subtle radial glow, no loud grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left">
            
            {/* Hero Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 backdrop-blur-sm mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>HEALTHCARE CAREER INTELLIGENCE PLATFORM</span>
            </motion.div>

            {/* Headline - Single Emphasis Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-2xl"
            >
              Don't choose another healthcare course.{" "}
              <span className="block mt-2 text-slate-200">
                Until you know which healthcare career fits you.
              </span>
            </motion.h1>

            {/* Subtext - 650px Max Reading Width */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
            >
              Every year students spend ₹50,000 to ₹2L on courses before answering one question: <strong className="text-white">"What should I become?"</strong> Healthcare Career Intelligence helps you answer that first.
            </motion.p>

            {/* CTAs: Primary Filled Blue + Secondary Ghost Style */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#explorer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900/60 active:scale-[0.98] transition-all"
              >
                <Compass className="h-4 w-4 text-slate-400" />
                <span>Explore Live Intelligence</span>
              </a>
            </motion.div>

            {/* Minimal Micro Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 pt-6 border-t border-slate-900 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ISO 9001:2015 & TASK Aligned
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                No Sales Calls
              </span>
            </motion.div>

          </div>

          {/* Right Column: Clean Live Preview Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-white">CAREER INTELLIGENCE LIVE PREVIEW</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-400">
                  92% Match
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">TARGET DOMAIN</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">Pharmacovigilance & Drug Safety</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">HIRING DEMAND</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">High (4,850+ JDs)</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">AI AUTOMATION RISK</span>
                    <span className="text-xs font-bold text-blue-300 mt-1 block">Low (Legally Required)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">ACTIVE HIRING COMPANIES</span>
                    <span className="text-xs font-bold text-white mt-1 block">186 Employers</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">SALARY SCALE</span>
                    <span className="text-xs font-mono font-bold text-white mt-1 block">₹3.8L – ₹16.0L</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1.5">MANDATORY SOFTWARE STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">Oracle Argus Safety</span>
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">MedDRA 26.0</span>
                    <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">Safety Gateway</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/30 py-2.5 text-xs font-bold text-blue-300 hover:bg-blue-600/20 transition-colors"
              >
                <span>Calculate Your Match Score</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
