import React from "react";
import { X, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { MovingBorder } from "@/components/aceternity/moving-border";
import { BorderBeam } from "@/components/magicui/border-beam";

/**
 * Animated check/x icon using React Spring for physics-based entrance.
 */
function SpringIcon({ type, delay = 0 }: { type: "check" | "x"; delay?: number }) {
  const style = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay,
    config: { tension: 340, friction: 22 },
  });
  return (
    <animated.div style={style} className="shrink-0 mt-0.5">
      {type === "check" ? (
        <Check className="h-5 w-5 text-emerald-600" />
      ) : (
        <X className="h-5 w-5 text-rose-500" />
      )}
    </animated.div>
  );
}

/**
 * Section 3D — TransformationBlock ("What Changes After 12 Weeks?")
 * Design: High-contrast paper background (#FFFFFF), side-by-side Before vs After matrix.
 * Upgraded with: Aceternity MovingBorder on "After" column, Magic UI BorderBeam on "Before" card,
 * and React Spring physics-animated check/x icons.
 */
export function TransformationBlock() {
  const shouldReduceMotion = useReducedMotion();

  const points = [
    {
      before: "Applying on job portals and getting zero replies",
      after: "Direct Partner Desk profile routing to Tier-1 Enterprise & Quant recruiters",
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
      id="transformation"
      aria-labelledby="transformation-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            STUDENT TRANSFORMATION MATRIX
          </PremiumChip>
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
          {/* Column 1: Today (Before Arzon) — with BorderBeam */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
            className="relative rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
          >
            <BorderBeam colorFrom="#E11D48" colorTo="#FB7185" duration={16} delay={0} borderWidth={1} />
            <div className="border-b border-stone-300 pb-3">
              <PremiumChip variant="stone" size="sm">
                TODAY (BEFORE ARZON)
              </PremiumChip>
            </div>
            <ul className="space-y-4">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-600 font-sans">
                  {shouldReduceMotion ? (
                    <X className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  ) : (
                    <SpringIcon type="x" delay={i * 80} />
                  )}
                  <span>{p.before}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: After 12 Weeks (With Arzon) — wrapped in MovingBorder */}
          <MovingBorder
            duration={3000}
            borderRadius="1rem"
            containerClassName="h-full"
            className="p-0 h-full"
            borderClassName="opacity-80"
          >
            <motion.div
              variants={itemVariants}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.01, transition: { type: "spring", stiffness: 350 } }}
              className="relative rounded-[calc(1rem*0.96)] bg-white tone-light p-6 sm:p-8 space-y-6 shadow-md hover:shadow-xl transition-shadow w-full h-full overflow-hidden"
            >
              <BorderBeam colorFrom="#1B3F8B" colorTo="#8A6D1F" duration={10} delay={2} />
              <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                <PremiumChip variant="navy" size="sm">
                  AFTER 12 WEEKS (WITH ARZON)
                </PremiumChip>
                <PremiumChip variant="emerald" size="sm">
                  RECRUITER READY
                </PremiumChip>
              </div>
              <ul className="space-y-4">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-900 font-semibold font-sans">
                    {shouldReduceMotion ? (
                      <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <SpringIcon type="check" delay={i * 100 + 200} />
                    )}
                    <span>{p.after}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </MovingBorder>
        </motion.div>
      </div>
    </section>
  );
}
