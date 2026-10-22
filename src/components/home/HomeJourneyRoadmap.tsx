import { Search, UserCheck, BookOpen, Award, CheckCircle2, Briefcase } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function HomeJourneyRoadmap() {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Understand the Role",
      desc: "Explore job market demand, daily responsibilities, and required competencies.",
    },
    {
      number: 2,
      icon: UserCheck,
      title: "Identify Skill Gaps",
      desc: "Complete the 6-minute diagnostic to map your background against employer expectations.",
    },
    {
      number: 3,
      icon: BookOpen,
      title: "Build Practical Skills",
      desc: "Hands-on training with industry platforms like enterprise safety databases, standardized clinical coding, and EDC systems.",
    },
    {
      number: 4,
      icon: Award,
      title: "Prepare to Apply",
      desc: "Create verifiable work samples, portfolio deliverables, and interview-ready case studies.",
    },
    {
      number: 5,
      icon: Briefcase,
      title: "Get Hired at Top MNCs",
      desc: "Interview with leading CROs, global pharma sponsors, and healthcare MNCs with placement assistance.",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="ap-shell">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
            <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
            <span>YOUR JOURNEY WITH ARZON</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
            From Guidance to{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              Placement Readiness
            </span>
          </h2>
        </motion.div>

        {/* Mobile View: Apple iOS Progress Timeline */}
        <motion.div
          className="md:hidden relative pl-3 space-y-3.5 sm:space-y-4 before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#1557D6] before:via-[#1557D6]/40 before:to-slate-200"
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={prefersReduced ? undefined : stepVariants}
                className="relative flex items-start gap-3.5 group"
              >
                {/* Step Circle Node */}
                <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white border-2 border-[#1557D6] text-[#1557D6] shadow-xs tone-light card-light font-mono text-xs font-bold">
                  {step.number}
                </div>

                {/* Step Content Card */}
                <div className="flex-1 rounded-2xl border border-[#E4EAF2] bg-white p-3.5 shadow-2xs tone-light card-light">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                    <Icon className="h-3 w-3" />
                    <span>STEP 0{step.number}</span>
                  </div>
                  <h3 className="font-sans text-sm font-bold text-[#071A4A] mt-0.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Desktop View: 5-Step Horizontal Process Track */}
        <div className="hidden md:block relative">
          {/* Animated Connector Line behind steps (desktop) */}
          <motion.div
            className="absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#93C5FD] via-[#2563EB] to-[#93C5FD] origin-left -z-0"
            aria-hidden="true"
            variants={prefersReduced ? undefined : lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          />

          <motion.div
            className="grid grid-cols-5 gap-3 lg:gap-6 relative z-10"
            variants={prefersReduced ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={prefersReduced ? undefined : stepVariants}
                  whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Badge */}
                  <div className="relative mb-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white border-2 border-[#D0E1FD] group-hover:border-[#1557D6] text-[#071A4A] group-hover:text-[#1557D6] shadow-sm group-hover:shadow-[0_8px_20px_rgba(21,87,214,0.18)] transition-all tone-light card-light">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#1557D6] text-white text-[10px] font-mono font-bold shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans text-sm lg:text-[15px] font-bold text-[#071A4A] leading-tight mb-1.5 group-hover:text-[#1557D6] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-[190px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
