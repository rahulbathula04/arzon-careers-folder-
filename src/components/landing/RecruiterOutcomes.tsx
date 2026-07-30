import { RECRUITER_OUTCOMES } from "@/data/recruiterOutcomes";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function RecruiterOutcomes({ compact: _compact = false }: { compact?: boolean }) {
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

  return (
    <section
      id="recruiter-outcomes"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header (Matching Image 1) */}
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
        </div>

        {/* Editorial Table Card (Matching Image 1 Table Layout) */}
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

        <p className="text-center font-mono text-[10px] text-[#707C90]">
          Every artefact above is verifiable on the public ledger - certificates, JD sources,
          refunds, methodology.
        </p>
      </div>
    </section>
  );
}
