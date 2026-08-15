import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight, ShieldAlert, Zap, Clock } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { trackEvent } from "@/lib/analytics";

export function LossPipelineComparisonBlock() {
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
      id="pipeline-choice"
      aria-labelledby="pipeline-choice-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EFE9] text-[#1A1A1A] border-b border-stone-300/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Core Statement Banner */}
        <div className="bg-[#1B3F8B] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <PremiumChip variant="gold" size="md">
              THE ARZON POSITIONING
            </PremiumChip>
            <h2
              id="pipeline-choice-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug"
            >
              "The gap is not talent. It is preparation calibrated to the exact test, domain, and employer."
            </h2>
            <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed">
              Every day you wait, another candidate enters the partner review pipeline. You can keep sending cold resumes to job portals, or you can calibrate your skills directly against actual employer requirements.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            WHICH PIPELINE DO YOU WANT TO BE IN?
          </PremiumChip>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            The Cost of Waiting vs. <span className="italic text-[#1B3F8B]">The Calibrated Fast-Track</span>
          </h3>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            The job doesn't wait for your resume to be ready. Compare the two paths available to you right now.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Option A: IF YOU WAIT */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-red-200 bg-red-50/40 p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-red-200 pb-3">
                <span className="font-mono text-xs font-bold uppercase text-red-800 tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" />
                  IF YOU WAIT (COLD APPLYING)
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold bg-red-100 text-red-900 border border-red-200">
                  HIGH FRICTION
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="p-3.5 bg-white rounded-xl border border-red-200 text-stone-700 flex items-center gap-3">
                  <span className="font-mono font-bold text-red-600">01</span>
                  <span>Generic college resume with standard projects</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-red-200 text-stone-700 flex items-center gap-3">
                  <span className="font-mono font-bold text-red-600">02</span>
                  <span>Applying to 100+ job portal listings</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-red-200 text-stone-700 flex items-center gap-3">
                  <span className="font-mono font-bold text-red-600">03</span>
                  <span>Failing automated ATS or initial 15-min screening</span>
                </div>
                <div className="p-3.5 bg-red-100/80 rounded-xl border border-red-300 text-red-950 font-bold flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                  <span>No feedback, zero callbacks, lost hiring window</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-red-200/80 text-center font-mono text-xs text-red-800 font-medium">
              Result: Endless application cycle without employer context.
            </div>
          </motion.div>

          {/* Option B: IF YOU START NOW */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <span className="font-mono text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  IF YOU START NOW (ARZON PIPELINE)
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  PARTNER ROUTE
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-stone-800 flex items-center gap-3">
                  <span className="font-mono font-bold text-emerald-700">01</span>
                  <span>Target training against actual HSBC / JPMC job briefs</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-stone-800 flex items-center gap-3">
                  <span className="font-mono font-bold text-emerald-700">02</span>
                  <span>Build bank-domain GitHub repos & capstone projects</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-stone-800 flex items-center gap-3">
                  <span className="font-mono font-bold text-emerald-700">03</span>
                  <span>Pass internal 75/100 mock benchmark assessment</span>
                </div>
                <div className="p-3.5 bg-emerald-100/90 rounded-xl border border-emerald-300 text-emerald-950 font-bold flex items-center gap-3">
                  <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Direct candidate routing via Certified Partner Desk</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200 text-center font-mono text-xs text-emerald-900 font-bold">
              Result: Profile submitted directly to decision makers.
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <div className="text-center space-y-3 pt-4">
          <a
            href="#apply"
            onClick={() => trackEvent("loss_block_cta_click")}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B] focus-visible:ring-offset-2"
          >
            <span>CHECK ELIGIBILITY — FREE</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </a>
          <p className="text-xs text-stone-500 font-mono">
            No payment required to submit your profile · Free eligibility check takes under 2 mins
          </p>
        </div>
      </div>
    </section>
  );
}
