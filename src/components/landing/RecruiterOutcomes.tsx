import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { RECRUITER_OUTCOMES } from "@/data/recruiterOutcomes";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * "Day-1 readiness, recruiter's POV." Each row maps a concrete pain a
 * pharma/CRO hiring manager flags during screening to the artefact an
 * Arzon graduate already carries. Used on the homepage, internship
 * conversion page, and the Career Engine result.
 */
export function RecruiterOutcomes({ compact = false }: { compact?: boolean }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  };

  return (
    <Section id="recruiter-outcomes" size={compact ? "sm" : "md"} className="tone-dark bg-[#0a0c10]">
      <SectionHeader
        tone="dark"
        eyebrow="Recruiter view · Day 1"
        title={
          <>
            What a hiring manager sees{" "}
            <span className="italic-accent">when our graduate applies.</span>
          </>
        }
        sub="No vague soft-skill claims. Every row is a real pain CRO/BPO recruiters flag, paired with the artefact our cohort ships at the end of week 12."
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mt-5 overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-white/10 sm:mt-7"
      >
        {/* Header row — desktop only */}
        <div className="hidden grid-cols-[1.1fr_1.2fr_1fr] gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 md:grid">
          <span>Recruiter pain</span>
          <span>Arzon graduate delivers</span>
          <span>Verifiable artefact</span>
        </div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {RECRUITER_OUTCOMES.map((row, i) => (
            <motion.li
              variants={itemVariants}
              key={row.pain}
              className={`grid grid-cols-1 gap-2 px-4 py-2.5 sm:px-5 md:grid-cols-[1.1fr_1.2fr_1fr] md:items-start md:gap-4 ${
                i !== 0 ? "border-t border-white/10" : ""
              }`}
            >
              <p className="text-[13px] font-semibold leading-snug text-slate-50">{row.pain}</p>
              <p className="flex items-start gap-2 text-[13px] leading-snug text-slate-300">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" aria-hidden />
                <span>{row.delivers}</span>
              </p>
              <p className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-teal-400">
                {row.artifact}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-center text-[11px] text-slate-400"
      >
        Every artefact above is verifiable on the public ledger — certificates, JD sources, refunds,
        methodology.
      </motion.p>
    </Section>
  );
}
