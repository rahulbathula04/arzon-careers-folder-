import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

/**
 * Section Three — The Problem
 * Design: Off-white background (#F2EFE9), slightly darker than the hero.
 * Dense editorial layout with a large pullout statistic (92%) in an enormous serif font.
 */
export function ProblemBlock() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="the-problem"
      aria-labelledby="problem-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EFE9] text-[#1A1A1A] border-b border-stone-300/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <PremiumChip variant="navy" size="md">
            WHY TRADITIONAL APPLICATION PATHS FAIL
          </PremiumChip>
          <h2
            id="problem-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
          >
            Most AI graduates fail before the interview.{" "}
            <span className="italic text-[#1B3F8B]">Not because they're untalented. Because recruiters test skills that colleges never teach.</span>
          </h2>
        </div>

        {/* Visual Path Comparison Diagram */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Black Hole Path Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-red-200 bg-red-50/50 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between border-b border-red-200/80 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-red-800 tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-600" />
                THE TRADITIONAL PATH (COLD APPLYING)
              </span>
              <span 
                style={{ color: "#991B1B", backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" }}
                className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold border shadow-xs"
              >
                92% REJECTED
              </span>
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-white tone-light rounded-xl border border-red-200 text-stone-700">
                1. College Degree &amp; Generic Resume
              </div>
              <div className="text-center text-red-400">↓</div>
              <div className="p-3 bg-white tone-light rounded-xl border border-red-200 text-stone-700">
                2. 200+ Applications on Job Portals
              </div>
              <div className="text-center text-red-400">↓</div>
              <div className="p-3 bg-red-100 rounded-xl border border-red-300 text-red-950 font-bold text-center">
                3. Automated ATS Filter / Black Hole Drop
              </div>
            </div>
          </motion.div>

          {/* Arzon Pipeline Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                THE ARZON CERTIFIED PIPELINE
              </span>
              <PremiumChip variant="emerald" size="sm">
                RECRUITER READY
              </PremiumChip>
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-white tone-light rounded-xl border border-emerald-200 text-stone-800">
                1. Skill Gap Audit &amp; Real Data Labs
              </div>
              <div className="text-center text-emerald-600 font-bold">↓</div>
              <div className="p-3 bg-white tone-light rounded-xl border border-emerald-200 text-stone-800">
                2. Verified Internship &amp; HackerRank Benchmark
              </div>
              <div className="text-center text-emerald-600 font-bold">↓</div>
              <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950 font-bold text-center">
                3. Partner Desk Submission → Hiring Manager Review
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Three Stat Blocks */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <motion.div variants={itemVariants} className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              ₹3.5 LPA
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Generic IT Roles Floor
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              What generic IT roles pay fresh graduates in India today.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2 border-l-4 border-l-[#1B3F8B]">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3F8B]">
              ₹6–18 LPA
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">
              Tier-1 Enterprise &amp; Quant Track
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              What Tier-1 Tech Enterprises and Quant Fintechs pay AI/ML freshers. 2x to 5x higher. For people who pass Day 1.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              10 : 1
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600">
              India GCC Talent Deficit
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              Open GCC AI/ML roles per qualified engineer in India in 2026.
            </p>
          </motion.div>
        </motion.div>

        {/* Conclusion Paragraph */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-base sm:text-lg font-serif italic text-[#1A1A1A]">
            "The gap is not talent. It is preparation calibrated to the exact test, the exact domain, and the exact employer. That is what Arzon builds."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

