import React, { useState } from "react";
import { ArrowRight, UserCheck, ShieldCheck, Code, Award, Send, CheckCircle } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";

/**
 * Section 3B — The Recruiter's Desk (The Hiring System)
 * Design: High-contrast white background, 5-stage horizontal/vertical pipeline
 * explaining how Arzon prepares candidates around how recruiters actually evaluate.
 */
export function HiringSystemBlock() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Candidate Sourcing & Skill Audit",
      desc: "Degree verification. We map your current coding capability against live HSBC & JPMorgan job descriptions.",
      icon: UserCheck,
    },
    {
      num: "02",
      title: "Production Code & GitHub Audit",
      desc: "You build real banking data labs (Scikit-learn, PyTorch, Spacy RAG). Code is audited for production OOP standards.",
      icon: Code,
    },
    {
      num: "03",
      title: "HackerRank Benchmark Clearing",
      desc: "Timed mock assessments matching HSBC's Day 1 screening format. You pass internal thresholds before candidate routing.",
      icon: Award,
    },
    {
      num: "04",
      title: "Partner Desk Submission",
      desc: "Your verified assessment scorecard, GitHub repository, and ISO 9001 internship certificate are packaged for partner review.",
      icon: Send,
    },
    {
      num: "05",
      title: "Hiring Manager Review & Interview",
      desc: "Direct delivery to talent acquisition decision-makers at HSBC, JPMorgan Chase, and partner GCCs across India.",
      icon: ShieldCheck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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
      id="hiring-system"
      aria-labelledby="hiring-system-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            INSIDER RECRUITMENT INFRASTRUCTURE
          </PremiumChip>
          <h2
            id="hiring-system-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            We built a recruitment system around{" "}
            <span className="italic text-[#1B3F8B]">how global banks actually evaluate fresh graduates.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Stop guessing what recruiters want. Every step in our 12-week pipeline matches the exact evaluation criteria used by HSBC and JPMorgan Chase talent acquisition teams.
          </p>
        </div>

        {/* Dynamic Progress Bar Indicator */}
        <div className="hidden md:block w-full bg-stone-100 h-1.5 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#1B3F8B] to-[#059669]"
            initial={{ width: "20%" }}
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* 5-Step Pipeline Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-4 relative"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={s.num}
                variants={itemVariants}
                onClick={() => setActiveStep(idx)}
                whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { type: "spring", stiffness: 350 } }}
                className={`cursor-pointer rounded-2xl border p-5 space-y-3 flex flex-col justify-between transition-all duration-200 ${
                  isActive
                    ? "border-[#1B3F8B] bg-[#F7F5F0] shadow-md ring-2 ring-[#1B3F8B]/20"
                    : "border-stone-200 bg-[#FAF8F5] hover:border-[#1B3F8B]/40 hover:bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <PremiumChip variant={isActive ? "navy" : "stone"} size="sm">
                      STEP {s.num}
                    </PremiumChip>
                    <Icon className={`h-5 w-5 ${isActive ? "text-[#1B3F8B]" : "text-stone-500"}`} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1A1A1A] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:flex justify-end pt-2 text-stone-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

