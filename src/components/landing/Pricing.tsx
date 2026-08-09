import { Link } from "@tanstack/react-router";
import { Check, ShieldCheck, ArrowRight, Zap, Crown, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

/**
 * Section Seven — Pricing & Guarantee
 * Design: Dark Navy background (#1B2B4B), flat solid card backgrounds,
 * transparent investment structure, warm gold (#B8860B) accent on Elite tier.
 */
export function Pricing() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#1B2B4B] tone-dark text-white border-b border-slate-800"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-sky-400">
            TRANSPARENT INVESTMENT STRUCTURE
          </p>
          <h2
            id="pricing-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18]"
          >
            Choose how closely you want us involved in your{" "}
            <span className="italic text-sky-400">hiring preparation.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto">
            All tiers include full learning portal access, project feedback, and zero hidden charges.
            No EMI traps. No income share agreements. No loan tie-ins. You pay. You learn. You own the outcome.
          </p>
        </div>

        {/* Value Anchor Header Box */}
        <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-4 text-center max-w-3xl mx-auto space-y-1">
          <p className="font-mono text-xs text-sky-200 font-bold">
            💡 VALUE ANCHOR: Built from ₹3.2 Lakh worth of 1:1 Mentoring, Verified Internship, Codebook Labs &amp; Direct Recruiter Delivery
          </p>
          <p className="text-xs text-slate-300">
            Available at accessible institutional pricing starting from ₹14,999.
          </p>
        </div>

        {/* Trust Strip */}
        <div className="text-center py-2 border-y border-slate-700/80">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
            NO HIDDEN EMI / LOAN TRAPS · SEAT DEPOSIT ADJUSTED IN FINAL FEE · ASCI CODE COMPLIANT · GST TAX INVOICE ISSUED
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          
          {/* Card 1 — Self-Learning / Foundation */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border border-slate-600 bg-[#162444] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-200 font-mono text-[10px] font-bold uppercase tracking-wider border border-slate-600">
                SELF-LEARNING / FOUNDATION
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Foundation</h3>
              <div>
                <span className="text-xs text-slate-300 line-through block font-mono">₹24,999</span>
                <span className="font-serif text-4xl font-bold text-white">₹14,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹10,000</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                For self-starters who want the recorded curriculum, codebook labs, and verified completion.
              </p>

              <ul className="space-y-3 pt-4 border-t border-slate-700/80 text-xs text-slate-100">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>12-month access to all recorded video modules</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Codebook reference labs &amp; projects</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Course completion certificate with public verifier URL</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Community cohort group access</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "essential" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "essential" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-xl border border-slate-500 transition-all shadow-md"
            >
              <span>Reserve Foundation Seat</span>
            </Link>
          </motion.div>

          {/* Card 2 — Mentor-Guided / Recruitment Track (Recommended) */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border-2 border-sky-400 bg-[#1b3464] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl ring-2 ring-sky-400/30"
          >
            {/* Glowing Accent Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-500 text-slate-50 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              RECOMMENDED TIER
            </div>

            <div className="space-y-4 pt-1">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-500/25 text-sky-200 font-mono text-[10px] font-bold uppercase tracking-wider border border-sky-300/50">
                CHOSEN BY FINAL-YEAR STUDENTS &amp; GRADS TARGETING AI ROLES
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-50">Recruitment Track</h3>
              <div>
                <span className="text-xs text-slate-300 line-through block font-mono">₹41,999</span>
                <span className="font-serif text-4xl font-bold text-slate-50">₹24,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹17,000</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                For graduates seeking live mentor instruction, active placement prep, and 24-hr resolution.
              </p>

              {/* Feature Callout */}
              <div className="bg-sky-500/20 border border-sky-300/50 p-3.5 rounded-xl text-xs font-mono text-sky-100 font-bold leading-snug">
                ⚡ Direct access to hiring managers at HSBC, JPMorgan Chase &amp; partner GCCs
              </div>

              <ul className="space-y-3 pt-2 text-xs text-slate-100">
                <li className="flex items-start gap-2.5 font-semibold text-slate-50">
                  <Check className="h-4 w-4 text-sky-300 shrink-0 mt-0.5" />
                  <span>Everything in Foundation tier</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-300 shrink-0 mt-0.5" />
                  <span>Live mentor sessions (8 weeks)</span>
                </li>
                <li className="flex items-start gap-2.5 font-bold text-sky-200">
                  <Check className="h-4 w-4 text-sky-300 shrink-0 mt-0.5" />
                  <span>Never get stuck for more than 24 hours (Mentor Resolution)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-300 shrink-0 mt-0.5" />
                  <span>Verifiable internship certificate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-300 shrink-0 mt-0.5" />
                  <span>Partner Desk candidate routing &amp; 1:1 mocks</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "career" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "career" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-extrabold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
            >
              <span>Reserve My Seat (Recommended)</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
          </motion.div>

          {/* Card 3 — Recruiter-Assisted / Executive VIP */}
          <motion.div 
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-2xl border-2 border-[#B8860B] bg-[#1e2942] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#B8860B]/25 text-amber-200 font-mono text-[10px] font-bold uppercase tracking-wider border border-[#B8860B]/60">
                👑 DIRECT RECRUITER SLA · GUARANTEED INTROS
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Executive VIP</h3>
              <div>
                <span className="text-xs text-slate-300 line-through block font-mono">₹69,999</span>
                <span className="font-serif text-4xl font-bold text-amber-300">₹39,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹30,000</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                For candidates wanting a dedicated mentor and guaranteed hiring manager profile delivery.
              </p>

              {/* Feature Callout */}
              <div className="bg-[#B8860B]/25 border border-amber-400/50 p-3.5 rounded-xl text-xs font-mono text-amber-100 font-bold leading-snug">
                👑 Three decision-makers will receive your verified profile directly
              </div>

              <ul className="space-y-3 pt-2 text-xs text-slate-100">
                <li className="flex items-start gap-2.5 font-semibold text-white">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Everything in Recruitment Track</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>1:1 dedicated senior mentor pairing</span>
                </li>
                <li className="flex items-start gap-2.5 font-bold text-amber-200">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Three decision-makers receive your profile directly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Custom ATS-optimised resume &amp; LinkedIn rewrite</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "elite" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "elite" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg font-sans"
            >
              <span>Book My Recruiter Review</span>
            </Link>
          </motion.div>

        </motion.div>

        {/* Guarantee Clarification Policy Block */}
        <div className="rounded-2xl border border-slate-600 bg-[#162444] p-6 sm:p-8 space-y-3">
          <h4 className="font-serif text-lg font-bold text-amber-300">
            What does the Elite interview guarantee mean:
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            We commit to arranging 3 direct introductions to hiring managers within our partner network within 60 days
            of programme completion, subject to your mock assessment score meeting the internal threshold. A hiring manager
            introduction is a confirmed calendar call with a decision-maker at a partner company. It is not a guarantee of an offer.
            The hiring decision belongs to the company. If we cannot fulfil the 3 introductions within 90 days, we refund the difference
            between Career and Elite tier pricing. This is documented in the refund policy and visible in our public trust ledger.
          </p>
        </div>
      </div>
    </section>
  );
}

