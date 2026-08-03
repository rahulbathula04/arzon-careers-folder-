import { useState } from "react";
import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Sparkles, Clock, Layers, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_PREVIEW_DOMAINS = [
  {
    id: "pv",
    name: "Pharmacovigilance",
    match: 92,
    hiringDemand: "High (4,850+ JDs)",
    aiRisk: "Low (FDA Mandatory Sign-off)",
    employers: "186 Verified Employers",
    salary: "₹3.8L – ₹16.0L",
    tools: ["Oracle Argus Safety", "MedDRA 26.0", "Safety Gateway"]
  },
  {
    id: "cdm",
    name: "Clinical Data Management",
    match: 88,
    hiringDemand: "High (3,620+ JDs)",
    aiRisk: "Low (Clinical Audit Lock)",
    employers: "142 Verified Employers",
    salary: "₹3.5L – ₹14.0L",
    tools: ["Medidata Rave", "Oracle Clinical", "Veeva Vault"]
  },
  {
    id: "ra",
    name: "Regulatory Affairs",
    match: 85,
    hiringDemand: "Steady (2,140+ JDs)",
    aiRisk: "Minimal (Legal Agency Filings)",
    employers: "98 Verified Employers",
    salary: "₹4.2L – ₹18.0L",
    tools: ["eCTDexpress", "Lorenz docuBridge", "ESG Portal"]
  }
];

interface WorkshopHeroProps {
  onOpenRegister: () => void;
}

export function WorkshopHero({ onOpenRegister }: WorkshopHeroProps) {
  const [selectedDomainId, setSelectedDomainId] = useState("pv");
  const activeDomain = HERO_PREVIEW_DOMAINS.find(d => d.id === selectedDomainId) || HERO_PREVIEW_DOMAINS[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 sm:pt-10 pb-20 text-white">
      {/* Subtle background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 55% / 45% Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Headline & Hero CTAs (55%) */}
          <div className="lg:col-span-7 text-left pt-2">
            
            {/* Category Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-mono font-semibold text-blue-300 backdrop-blur-md mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400 motion-safe:animate-pulse" />
              <span>STOP CAREER GUESSWORK · HEALTHCARE CAREER INTELLIGENCE™</span>
            </motion.div>

            {/* Dominant Headline with Gradient Highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-2xl"
            >
              Don't choose another healthcare course.{" "}
              <span className="block mt-2 font-semibold italic bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                Until you know which healthcare career fits you.
              </span>
            </motion.h1>

            {/* Subtext Paragraph (580px width) */}
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
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#explorer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
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
              className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-mono"
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

          {/* Right Column: Interactive Live Product Dashboard (45%) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-xl lg:max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 shadow-2xl shadow-blue-950/30 relative overflow-hidden backdrop-blur-xl"
            >
              {/* Product Workspace Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-400 motion-safe:animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">CAREER INTELLIGENCE LIVE PREVIEW</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">Updated live</span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                    {activeDomain.match}% Match
                  </span>
                </div>
              </div>

              {/* Interactive Domain Selector Pills */}
              <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {HERO_PREVIEW_DOMAINS.map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDomainId(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      d.id === selectedDomainId
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>

              {/* Dynamic Domain Content Inspection */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-5 space-y-4"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">INSPECTING DOMAIN</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{activeDomain.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-xl bg-slate-950 p-4 min-h-[96px] flex flex-col justify-between border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">HIRING DEMAND</span>
                      <span className="text-sm font-bold text-emerald-400 block">{activeDomain.hiringDemand}</span>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 min-h-[96px] flex flex-col justify-between border border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">AI AUTOMATION RISK</span>
                        <span className="h-2 w-2 rounded-full bg-blue-400 motion-safe:animate-pulse" />
                      </div>
                      <span className="text-sm font-bold text-blue-300 block">{activeDomain.aiRisk}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-950 p-4 min-h-[96px] flex flex-col justify-between border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">ACTIVE EMPLOYERS</span>
                      <span className="text-sm font-bold text-white block">{activeDomain.employers}</span>
                    </div>
                    <div className="rounded-xl bg-slate-950 p-4 min-h-[96px] flex flex-col justify-between border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">SALARY SCALE</span>
                      <span className="text-sm font-mono font-bold text-white block">{activeDomain.salary}</span>
                    </div>
                  </div>

                  {/* Software Tools */}
                  <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2 font-bold">MANDATORY CORPORATE SOFTWARE</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.tools.map(tool => (
                        <span key={tool} className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-mono font-semibold text-blue-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/30 py-3.5 text-xs font-bold text-blue-300 hover:bg-blue-600/20 transition-colors cursor-pointer"
              >
                <span>Calculate Your Degree Match Score</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
