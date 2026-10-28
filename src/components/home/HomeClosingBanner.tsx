import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { openCounsellorModal } from "@/components/system/CounsellorLeadModal";

export function HomeClosingBanner() {
  const prefersReduced = useReducedMotion();

  const benefits = [
    "Personalised career report",
    "Role-specific training",
    "Audit-ready clinical case samples",
    "Placement guidance",
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const copyContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="ap-shell">
        <motion.div
          className="relative overflow-hidden rounded-[1.25rem] xs:rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-4 xs:p-6 sm:p-12 lg:p-16 text-white shadow-xl"
          variants={prefersReduced ? undefined : cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Copy & Actions */}
            <motion.div
              className="lg:col-span-7 space-y-4 sm:space-y-6"
              variants={prefersReduced ? undefined : copyContainerVariants}
            >
              <motion.div
                variants={prefersReduced ? undefined : itemVariants}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93C5FD] shadow-2xs"
              >
                <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                <span>YOUR NEXT STEP</span>
              </motion.div>

              <motion.h2
                variants={prefersReduced ? undefined : itemVariants}
                className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight sm:leading-[1.12]"
              >
                Build Skills You Can{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#A78BFA] bg-clip-text text-transparent [box-decoration-break:clone]">
                  Demonstrate.
                </span>
              </motion.h2>

              <motion.p
                variants={prefersReduced ? undefined : itemVariants}
                className="text-xs sm:text-base text-slate-200 max-w-xl leading-relaxed font-normal"
              >
                Explore healthcare roles, understand the requirements and prepare with practical, role-specific learning.
              </motion.p>

              {/* CTAs - Mobile full-width touch ergonomics */}
              <motion.div
                variants={prefersReduced ? undefined : itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <button
                  type="button"
                  onClick={() => openCounsellorModal({ source: "home_closing_banner" })}
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 text-xs sm:text-sm font-extrabold transition-all shadow-md group active:scale-[0.98] cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 text-white" />
                  <span>Talk to a counsellor</span>
                  <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>

                <Link
                  to="/career-assessment"
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 text-xs sm:text-sm font-bold transition-all backdrop-blur-xs active:scale-[0.98]"
                >
                  <span>Take free career assessment</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Doctor Image & Benefit Badges */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
              {/* Doctor Avatar Card */}
              <motion.div
                whileHover={prefersReduced ? undefined : { scale: 1.03, transition: { duration: 0.3 } }}
                className="relative h-36 w-36 sm:h-52 sm:w-52 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 bg-slate-800"
              >
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Healthcare professional graduate"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/ai-pv.jpg";
                  }}
                />
              </motion.div>

              {/* 4 Benefit Badges */}
              <motion.div
                className="space-y-2 w-full sm:w-auto"
                variants={prefersReduced ? undefined : badgeContainerVariants}
              >
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit}
                    variants={prefersReduced ? undefined : badgeVariants}
                    whileHover={prefersReduced ? undefined : { scale: 1.03, transition: { duration: 0.2 } }}
                    className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap shadow-xs cursor-default"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399] shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
