import { useState } from "react";
import { Search, Sparkles, HelpCircle, ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerSearchAIProps {
  onOpenRegister: () => void;
}

export function CareerSearchAI({ onOpenRegister }: CareerSearchAIProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const aiQuestions = [
    {
      q: "Will AI replace Pharmacovigilance and Drug Safety roles?",
      a: "No. Global regulatory bodies (USFDA, EMA, CDSCO) legally require human safety scientists to make medical causality assessments on adverse event reports. AI automates routine data intake, increasing corporate demand for skilled human evaluators."
    },
    {
      q: "Should I choose SAS Statistical Programming or Clinical Data Management?",
      a: "If you enjoy coding, data logic, and mathematics, SAS statistical programming offers higher starting salaries (₹4.5L – ₹22L+). If you prefer structured database management and site coordination without heavy math, Clinical Data Management (CDM) is ideal."
    },
    {
      q: "Which healthcare career pays the highest starting salary in India?",
      a: "Health Data Analytics & SAS Programming (₹4.5L–₹7L entry) and Regulatory Affairs (₹4.2L–₹6L entry) command the highest initial pay bands, followed by Pharmacovigilance (₹3.8L–₹5.5L entry)."
    },
    {
      q: "Can Biotechnology and B.Sc / M.Sc Life Sciences students join PV or CDM?",
      a: "Yes. 45% of entry-level Pharmacovigilance scientists and CDM analysts in top MNCs (IQVIA, Novartis, Cognizant) come from B.Sc/M.Sc Biotech, Biochemistry, or Microbiology backgrounds."
    }
  ];

  const quickSearchTags = [
    "Pharmacovigilance Salary",
    "Argus Safety",
    "eCTD Submissions",
    "SAS Programming",
    "Medical Coding CPC",
    "IQVIA Hiring"
  ];

  return (
    <section className="bg-slate-950 py-16 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PERPLEXITY-STYLE CAREER INTELLIGENCE SEARCH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Ask Anything About Healthcare Careers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Instant data-backed answers on salary, software tools, AI risk, and degree eligibility.
          </p>
        </div>

        {/* Live Search Input Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers, salary scales, tools, or hiring MNCs..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all shadow-xl"
            />
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">Popular:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Ask AI Accordion Questions */}
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {aiQuestions.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/50 bg-slate-950/40"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized career answer based on your exact degree?
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
