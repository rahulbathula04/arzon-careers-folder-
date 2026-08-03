import { useState, useEffect } from "react";
import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Sparkles, Clock } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

function AnimatedMatchScore({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 1000 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

interface WorkshopHeroProps {
  onOpenRegister: () => void;
}

export function WorkshopHero({ onOpenRegister }: WorkshopHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-6 sm:pt-8 pb-20 text-white">
      {/* 3% opacity dot pattern with radial mask */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, transparent 20%, black 100%)" }}
      />
      
      {/* Soft radial blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 55% Content / 45% Dashboard Rebalanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Hero Column: 7 Columns (55% Width) */}
          <div className="lg:col-span-7 text-left pt-2">
            
            {/* Category Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-mono font-semibold text-blue-300 backdrop-blur-sm mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>STOP CAREER GUESSWORK · HEALTHCARE CAREER INTELLIGENCE™</span>
            </motion.div>

            {/* Dominant Headline - Pure White Title */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-2xl"
            >
              Don't choose another healthcare course.{" "}
              <span className="block mt-2 font-medium italic text-slate-200">
                Until you know which healthcare career fits you.
              </span>
            </motion.h1>

            {/* Subtext - 580px Max Reading Width */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 max-w-[580px] text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
            >
              Every year students spend ₹50,000 to ₹2L on courses before answering one question: <strong className="text-white font-semibold">"What should I become?"</strong> Healthcare Career Intelligence helps you answer that first.
            </motion.p>

            {/* Prominent CTAs Group */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#explorer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Explore Live Intelligence</span>
              </a>
            </motion.div>

            {/* Redesigned Equal-Width Trust Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 pt-6 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-mono"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                <span>TASK Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Zero Sales Calls</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Free Intelligence</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 5 Columns (45% Width) Expanded Product Dashboard Interface */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-xl lg:max-w-2xl mx-auto rounded-2xl border border-slate-800/90 bg-slate-900/95 p-6 sm:p-7 shadow-xl shadow-blue-950/20 relative overflow-hidden backdrop-blur-xl"
            >
              {/* Product Workspace Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">CAREER INTELLIGENCE LIVE PREVIEW</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">Updated today</span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                    <AnimatedMatchScore value={92} />% Best Match
                  </span>
                </div>
              </div>

              {/* Product Interface Body */}
              <div className="mt-6 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">TARGET DOMAIN</span>
                  {/* Dominant Target Domain Title */}
                  <h3 className="text-2xl font-bold text-white mt-1">Pharmacovigilance & Drug Safety</h3>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[100px] flex flex-col justify-between">
                    <span className="text-[11px] font-mono text-slate-300 uppercase block font-bold">HIRING DEMAND</span>
                    <span className="text-sm font-bold text-emerald-400 block">High (4,850+ JDs)</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[100px] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300 uppercase block font-bold">AI AUTOMATION RISK</span>
                      <span className="h-2 w-2 rounded-full bg-blue-400 motion-safe:animate-pulse" />
                    </div>
                    <span className="text-sm font-bold text-blue-300 block">Low (Human Legal Sign-off)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[100px] flex flex-col justify-between">
                    <span className="text-[11px] font-mono text-slate-300 uppercase block font-bold">ACTIVE HIRING COMPANIES</span>
                    <span className="text-sm font-bold text-white block">186 Verified Employers</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[100px] flex flex-col justify-between">
                    <span className="text-[11px] font-mono text-slate-300 uppercase block font-bold">SALARY SCALE</span>
                    <span className="text-sm font-mono font-bold text-white block">₹3.8L – ₹16.0L</span>
                  </div>
                </div>

                {/* Software Chips */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-[11px] font-mono text-slate-300 uppercase block mb-2.5 font-bold">MANDATORY CORPORATE SOFTWARE</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-mono font-semibold text-blue-300">Oracle Argus Safety</span>
                    <span className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-mono font-semibold text-blue-300">MedDRA 26.0</span>
                    <span className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-mono font-semibold text-blue-300">Safety Gateway</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/30 py-3.5 text-xs font-bold text-blue-300 hover:bg-blue-600/20 transition-colors"
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
