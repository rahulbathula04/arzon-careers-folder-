import React from "react";
import { ArrowRight, X, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 3D — TransformationBlock ("What Changes After 12 Weeks?")
 * Design: High-contrast paper background (#FFFFFF), side-by-side Before vs After matrix.
 */
export function TransformationBlock() {
  const shouldReduceMotion = useReducedMotion();

  const points = [
    {
      before: "Applying on job portals and getting zero replies",
      after: "Direct Partner Desk profile routing to HSBC & JPMorgan recruiters",
    },
    {
      before: "Generic resume with college projects everyone has",
      after: "Production GitHub repo & Kaggle data lab portfolio",
    },
    {
      before: "Failing HackerRank screening in the first 15 minutes",
      after: "Passed internal mock assessment scorecard & verified benchmark",
    },
    {
      before: "Unverified certificates from online video platforms",
      after: "ISO 9001:2015 & MSME verified internship certificate with public URL",
    },
    {
      before: "Facing cold interviews with zero recruiter context",
      after: "Hiring managers receive your verified evaluation packet before calling",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section
      id="transformation"
      aria-labelledby="transformation-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            STUDENT TRANSFORMATION MATRIX
          </p>
          <h2
            id="transformation-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            What changes after{" "}
            <span className="italic text-[#1B3F8B]">12 weeks in the Arzon pipeline?</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            See the exact difference between how candidates enter our program and how they present to global hiring teams upon completion.
          </p>
        </div>

        {/* Before vs After Matrix */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          
          {/* Column 1: Today (Before Arzon) */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="border-b border-stone-300 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-stone-600 tracking-wider">
                TODAY (BEFORE ARZON)
              </span>
            </div>
            <ul className="space-y-4">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-600 font-sans">
                  <X className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{p.before}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: After 12 Weeks (With Arzon) */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border-2 border-[#1B3F8B] bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-[#1B3F8B] tracking-wider">
                AFTER 12 WEEKS (WITH ARZON)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold">
                RECRUITER READY
              </span>
            </div>
            <ul className="space-y-4">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-900 font-semibold font-sans">
                  <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{p.after}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

