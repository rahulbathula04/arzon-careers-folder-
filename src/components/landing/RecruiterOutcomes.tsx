import { useState } from "react";
import { RECRUITER_OUTCOMES } from "@/data/recruiterOutcomes";
import { CheckCircle2, XCircle, Sparkles, FileCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function RecruiterOutcomes({ compact: _compact = false }: { compact?: boolean }) {
  const [activeView, setActiveView] = useState<"matrix" | "diff">("matrix");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 24 },
    },
  };

  const diffItems = [
    {
      label: "Practical Tool Experience",
      generic: "Learned theory from PDFs / YouTube videos only",
      arzon: "Processed real ICSR case files in Argus Safety / MedDRA",
    },
    {
      label: "Workplace Deliverable",
      generic: "Participation certificate (non-verifiable PDF)",
      arzon: "Publicly verifiable ISO 9001:2015 credential with QR Code",
    },
    {
      label: "Interview Readiness",
      generic: "Memorized textbook definitions",
      arzon: "1-on-1 mock interviews + ATS resume rewritten from real JDs",
    },
    {
      label: "Hiring Manager Evaluation",
      generic: "Screened out by ATS filters (64% rejection rate)",
      arzon: "Direct introduction to 120+ Hiring Partners (Day-1 ready)",
    },
  ];

  return (
    <section
      id="recruiter-outcomes"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">
              RECRUITER VIEW - DAY 1
            </p>
            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-[1.15]">
            What a hiring manager sees <br className="hidden sm:inline" />
            <span className="italic text-[#8A6D1F]">when our graduate applies.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed max-w-2xl mx-auto">
            No vague soft-skill claims. Every row is a real pain CRO/BPO recruiters flag, paired
            with the artefact our cohort ships at the end of week 12.
          </p>

          {/* View Switcher Pills */}
          <div className="flex items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveView("matrix")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all border ${
                activeView === "matrix"
                  ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"
                  : "bg-white text-[#334155] border-slate-300 hover:border-slate-400"
              }`}
            >
              Recruiter Pain Matrix
            </button>
            <button
              onClick={() => setActiveView("diff")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all border ${
                activeView === "diff"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "bg-white text-[#334155] border-slate-300 hover:border-slate-400"
              }`}
            >
              Candidate Diff (Generic vs Arzon) ⭐
            </button>
          </div>
        </div>

        {/* View 1: Recruiter Pain Matrix */}
        {activeView === "matrix" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] space-y-2"
          >
            {/* Header Row */}
            <div className="hidden md:grid md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-4 pb-3 border-b border-slate-200/80 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#707C90] px-3">
              <span>RECRUITER PAIN</span>
              <span>ARZON GRADUATE DELIVERS</span>
              <span>VERIFIABLE ARTEFACT</span>
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="divide-y divide-slate-100"
            >
              {RECRUITER_OUTCOMES.map((row) => (
                <motion.li
                  variants={itemVariants}
                  key={row.pain}
                  className="py-3.5 px-3 grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.1fr] gap-3 items-center hover:bg-slate-50/80 rounded-xl transition-colors"
                >
                  <p className="text-xs font-bold text-[#151C2E]">{row.pain}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#151C2E]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                    <span>{row.delivers}</span>
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                    {row.artifact}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {/* View 2: Candidate Diff Engine */}
        {activeView === "diff" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#707C90]">
                SIDE-BY-SIDE CANDIDATE COMPARISON
              </span>
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
            </div>

            <div className="grid gap-4">
              {diffItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                      EVALUATION CRITERIA
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#0F172A] mt-0.5">
                      {item.label}
                    </h4>
                  </div>

                  {/* Generic Applicant */}
                  <div className="md:col-span-4 p-3 rounded-xl bg-rose-50/80 border border-rose-200/80 flex items-start gap-2.5">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-rose-700 block">
                        Generic EdTech Applicant
                      </span>
                      <p className="text-xs text-rose-950 font-medium leading-snug mt-0.5">
                        {item.generic}
                      </p>
                    </div>
                  </div>

                  {/* Arzon Graduate */}
                  <div className="md:col-span-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-blue-700 block">
                        Arzon Proof-Backed Candidate
                      </span>
                      <p className="text-xs text-blue-950 font-bold leading-snug mt-0.5">
                        {item.arzon}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <p className="text-center font-mono text-[10px] text-[#707C90]">
          Every artefact above is verifiable on the public ledger - certificates, JD sources,
          refunds, methodology.
        </p>
      </div>
    </section>
  );
}
