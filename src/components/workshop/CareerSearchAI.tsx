import { useState } from "react";
import { Search, Sparkles, ChevronDown, CheckCircle2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerSearchAIProps {
  onOpenRegister?: () => void;
}

export function CareerSearchAI({ onOpenRegister }: CareerSearchAIProps) {
  const [query, setQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const sampleQueries = [
    "What healthcare domain pays highest for B.Pharm?",
    "Is Pharmacovigilance safe from AI automation?",
    "Which company hires freshers for Clinical Data Management?",
    "What software skills are needed for Regulatory Affairs?"
  ];

  const faqs = [
    {
      q: "Which healthcare career offers the highest entry salary for my degree?",
      a: "Salary trajectories vary significantly by domain. Pharmacovigilance starts around ₹3.8L – ₹5.5L for freshers and reaches ₹16L+ at Senior Lead levels. Clinical Data Management and Medical Writing follow closely, especially when paired with enterprise tools like Argus or Medidata Rave.",
      data: "Source: 14,280 Sourced JDs (IQVIA, Parexel, Cognizant)"
    },
    {
      q: "Is Pharmacovigilance or CDM at risk from AI automation?",
      a: "No. While initial case intake uses OCR and AI sorting, FDA and EMA regulations mandate human safety physician sign-off for safety signal evaluation and ICSR submissions. AI increases productivity rather than replacing qualified drug safety scientists.",
      data: "Compliance: USFDA 21 CFR Part 11 & ICH-GCP E6(R2)"
    },
    {
      q: "Do top MNCs hire freshers without prior corporate experience?",
      a: "Yes. MNCs regularly hire freshers who demonstrate direct tool competency (e.g. Argus Safety narrative writing or MedDRA coding) during technical interview rounds, skipping generic orientation phases.",
      data: "Hiring Rate: 84% Technical Interview Conversion"
    },
    {
      q: "How does Healthcare Career Intelligence differ from traditional training?",
      a: "We do not sell generic video courses. We provide degree-matched career intelligence based on live job market demand, precise software skill gaps, and direct corporate recruitment benchmarks.",
      data: "Accreditation: ISO 9001:2015 & TASK Partner"
    }
  ];

  return (
    <section className="tone-dark bg-slate-950 py-20 text-white border-t border-slate-900/60 relative overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <Bot className="h-3.5 w-3.5 text-blue-400" />
            <span>INTERACTIVE CAREER INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ask Healthcare Career Intelligence
          </h2>
          <p className="mt-2 text-base text-slate-300 leading-relaxed font-sans">
            Instant data-backed answers on roles, salaries, AI risk, and MNC software expectations.
          </p>
        </div>

        {/* Search Bar Workspace */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center rounded-2xl bg-slate-900/80 p-2 shadow-lg backdrop-blur-md">
            <Search className="h-5 w-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about salary, AI risk, or top MNC hiring..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
            />
            <button
              type="button"
              onClick={onOpenRegister}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Query AI</span>
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {sampleQueries.map((sq) => (
              <button
                key={sq}
                type="button"
                onClick={() => setQuery(sq)}
                className="text-[11px] font-sans text-slate-300 bg-slate-900/50 hover:bg-slate-800/80 px-3 py-1 rounded-full transition-colors"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-slate-900/40 backdrop-blur-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/70 transition-colors"
                >
                  <span className="text-sm font-semibold text-white leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-800/40">
                        <p>{faq.a}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{faq.data}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
