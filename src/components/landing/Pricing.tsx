import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShieldCheck, ArrowRight, Sparkles, Crown, Zap, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { trackEvent } from "@/lib/analytics";

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

/**
 * Section Seven — 100x Executive Tiered Enrollment Engine ($1B+ Startup UI/UX)
 * Interactive payment frequency toggle, side-by-side feature matrix,
 * high-contrast cards, and 100% transparent interview guarantee.
 */
export function Pricing() {
  const shouldReduceMotion = useReducedMotion();
  const [billingCycle, setBillingCycle] = useState<"full" | "part">("full");
  const [showComparison, setShowComparison] = useState(false);

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
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } as const;

  // Prices based on billing cycle
  const essentialPrice = billingCycle === "full" ? "₹14,999" : "₹7,999 x 2";
  const careerPrice = billingCycle === "full" ? "₹24,999" : "₹12,999 x 2";
  const elitePrice = billingCycle === "full" ? "₹39,999" : "₹20,999 x 2";

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-200 relative overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[500px] bg-gradient-to-b from-[#1B3F8B]/5 to-transparent blur-3xl rounded-full"
      />

      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            TRANSPARENT INVESTMENT STRUCTURE
          </PremiumChip>
          <h2
            id="pricing-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
          >
            Choose how closely you want us involved in your{" "}
            <span className="italic text-[#1B3F8B]">hiring preparation.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-sans font-medium leading-relaxed max-w-2xl mx-auto">
            All tiers include full learning portal access, project feedback, and zero hidden charges.
            No EMI traps. No income share agreements. No loan tie-ins. You pay. You learn. You own the outcome.
          </p>
        </div>

        {/* Interactive Payment Schedule Toggle */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-stone-300 shadow-sm tone-light">
            <button
              onClick={() => setBillingCycle("full")}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                billingCycle === "full"
                  ? "bg-[#1B3F8B] text-white shadow-md"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
              style={billingCycle === "full" ? { color: "#FFFFFF", backgroundColor: "#1B3F8B" } : undefined}
            >
              <span>ONE-TIME PAYMENT (SAVE EXTRA ₹2,000)</span>
            </button>
            <button
              onClick={() => setBillingCycle("part")}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                billingCycle === "part"
                  ? "bg-[#1B3F8B] text-white shadow-md"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
              style={billingCycle === "part" ? { color: "#FFFFFF", backgroundColor: "#1B3F8B" } : undefined}
            >
              <span>2-PART INSTALLMENT (ZERO INTEREST)</span>
            </button>
          </div>

          <p className="text-xs text-stone-500 font-mono font-semibold">
            💡 Value Anchor: Built from ₹3.2 Lakh worth of 1:1 Mentoring, Codebook Labs &amp; Direct Recruiter Delivery.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Card 1 — Foundation (Self-Paced) */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-bold uppercase tracking-wider border border-stone-200">
                SELF-LEARNING / FOUNDATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Foundation</h3>
              <div>
                <span className="text-xs text-stone-400 line-through block font-mono">₹24,999</span>
                <span className="font-serif text-4xl font-bold text-[#1A1A1A]">{essentialPrice}</span>
                <span className="text-xs text-emerald-700 font-bold ml-2 font-mono">SAVE ₹10,000</span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                For self-starters who want the recorded curriculum, codebook labs, and verified completion.
              </p>

              <ul className="space-y-3 pt-4 border-t border-stone-200 text-xs text-stone-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>12-month access to all recorded video modules</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Codebook reference labs &amp; projects</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Course completion certificate with public verifier URL</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Community cohort group access</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "essential" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "essential", billingCycle })}
              className="h-13 w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-stone-900 hover:bg-black rounded-xl transition-all shadow-sm active:scale-[0.98]"
              style={{ color: "#FFFFFF", backgroundColor: "#1C1917" }}
            >
              <span style={{ color: "#FFFFFF" }}>Reserve Foundation Seat</span>
            </Link>
          </motion.div>

          {/* Card 2 — Recruitment Track (MOST POPULAR / HIGHLIGHTED) */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -8, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-3xl border-2 border-[#1B3F8B] glass-card-light glow-border-sky p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl ring-4 ring-[#1B3F8B]/10 transform lg:-translate-y-2"
          >
            {/* Featured Ribbon Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1B3F8B] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-sky-400/40">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>MOST POPULAR · PARTNER DESK ROUTING</span>
            </div>

            <div className="space-y-4 pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#1B3F8B]/20">
                RECOMMENDED FOR PHARMA &amp; HEALTHCARE FRESHERS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Recruitment Track</h3>
              <div>
                <span className="text-xs text-stone-400 line-through block font-mono">₹41,999</span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3F8B]">{careerPrice}</span>
                <span className="text-xs text-emerald-700 font-bold ml-2 font-mono">SAVE ₹17,000</span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                For graduates seeking live mentor instruction, active placement prep, and 24-hr resolution.
              </p>

              {/* Feature Callout Pill */}
              <div
                className="bg-[#0F1A34] border border-sky-400/40 p-4 rounded-2xl text-xs font-mono font-bold leading-snug shadow-md flex items-center gap-2"
              >
                <span className="text-sky-300 font-bold text-sm shrink-0">⚡</span>
                <span className="text-slate-50 font-bold">Direct access to hiring managers at Top Healthcare Companies, CROs &amp; Medical Coding Hubs</span>
              </div>

              <ul className="space-y-3 pt-2 text-xs text-stone-800 font-medium">
                <li className="flex items-start gap-2.5 font-bold text-[#1A1A1A]">
                  <Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <span>Everything in Foundation tier</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <span>Live mentor sessions (8 weeks)</span>
                </li>
                <li className="flex items-start gap-2.5 font-bold text-[#1B3F8B]">
                  <Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <span>Never get stuck for more than 24 hours (Mentor Resolution)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <span>Verifiable internship certificate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <span>Partner Desk candidate routing &amp; 1:1 mocks</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "career" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "career", billingCycle })}
              className="h-14 w-full flex items-center justify-center gap-2 text-base font-extrabold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-lg shadow-[#1B3F8B]/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
            >
              <span style={{ color: "#FFFFFF" }}>Reserve My Seat (Recommended)</span>
              <ArrowRight className="h-5 w-5 text-white" style={{ color: "#FFFFFF" }} />
            </Link>
          </motion.div>

          {/* Card 3 — Executive VIP (ELITE SLA) */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: "spring", stiffness: 350 } }}
            className="rounded-3xl border-2 border-amber-500 bg-white tone-light card-light p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-lg"
          >
            {/* Top Ribbon Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-400/40">
              <Crown className="h-3 w-3 text-amber-200" />
              <span>GUARANTEED INTROS SLA</span>
            </div>

            <div className="space-y-4 pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                👑 DIRECT RECRUITER SLA
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Executive VIP</h3>
              <div>
                <span className="text-xs text-stone-400 line-through block font-mono">₹69,999</span>
                <span className="font-serif text-4xl font-bold text-amber-900">{elitePrice}</span>
                <span className="text-xs text-emerald-700 font-bold ml-2 font-mono">SAVE ₹30,000</span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                For candidates wanting a dedicated mentor and guaranteed hiring manager profile delivery.
              </p>

              {/* Feature Callout Pill */}
              <div
                className="bg-[#241300] border border-amber-500/50 p-4 rounded-2xl text-xs font-mono font-bold leading-snug shadow-md flex items-center gap-2"
              >
                <span className="text-amber-400 font-bold text-sm shrink-0">👑</span>
                <span className="text-amber-100 font-bold">Three decision-makers will receive your verified profile directly</span>
              </div>

              <ul className="space-y-3 pt-2 text-xs text-stone-800 font-medium">
                <li className="flex items-start gap-2.5 font-bold text-[#1A1A1A]">
                  <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Everything in Recruitment Track</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>1:1 dedicated senior mentor pairing</span>
                </li>
                <li className="flex items-start gap-2.5 font-bold text-amber-900">
                  <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Three decision-makers receive your profile directly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Custom ATS-optimised resume &amp; LinkedIn rewrite</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "elite" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "elite", billingCycle })}
              className="h-13 w-full flex items-center justify-center gap-2 text-sm font-extrabold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md active:scale-[0.98]"
              style={{ color: "#0C0A09", backgroundColor: "#F59E0B" }}
            >
              <span style={{ color: "#0C0A09" }}>Book My Recruiter Review</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Expandable Side-by-Side Feature Matrix */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white tone-light text-xs font-mono font-bold text-stone-800 hover:bg-stone-50 transition-all cursor-pointer shadow-xs"
          >
            <span>{showComparison ? "Hide Plan Feature Matrix ▲" : "Compare Full Plan Features ▼"}</span>
          </button>
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-3xl border border-stone-300 bg-white tone-light card-light shadow-md"
            >
              <div className="overflow-x-auto p-6">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="py-3 px-4 font-mono font-bold text-stone-500 uppercase">Features &amp; Deliverables</th>
                      <th className="py-3 px-4 font-mono font-bold text-stone-700 uppercase text-center">Foundation</th>
                      <th className="py-3 px-4 font-mono font-bold text-[#1B3F8B] uppercase text-center bg-[#1B3F8B]/5">Recruitment Track</th>
                      <th className="py-3 px-4 font-mono font-bold text-amber-900 uppercase text-center">Executive VIP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">12-Month Video Curriculum &amp; Labs</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">Verified Certificate &amp; Public Verifier</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">Live 8-Week Mentor Sessions</td>
                      <td className="py-3 px-4 text-center text-stone-400">—</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">24-Hour Mentor Resolution SLA</td>
                      <td className="py-3 px-4 text-center text-stone-400">—</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-[#1B3F8B]/5">✓ Included</td>
                      <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">Partner Desk Routing (Tier-1 Hiring Desks)</td>
                      <td className="py-3 px-4 text-center text-stone-400">—</td>
                      <td className="py-3 px-4 text-center text-[#1B3F8B] font-extrabold bg-[#1B3F8B]/5">✓ 7-Day Review SLA</td>
                      <td className="py-3 px-4 text-center text-amber-900 font-extrabold">✓ 7-Day Review SLA</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">1:1 Dedicated Senior Mentor Pairing</td>
                      <td className="py-3 px-4 text-center text-stone-400">—</td>
                      <td className="py-3 px-4 text-center text-stone-400 bg-[#1B3F8B]/5">—</td>
                      <td className="py-3 px-4 text-center text-amber-900 font-extrabold">✓ 1:1 Dedicated Mentor</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-stone-800">3 Confirmed Decision-Maker Introductions</td>
                      <td className="py-3 px-4 text-center text-stone-400">—</td>
                      <td className="py-3 px-4 text-center text-stone-400 bg-[#1B3F8B]/5">—</td>
                      <td className="py-3 px-4 text-center text-amber-900 font-extrabold">✓ 3 Confirmed Intros Guarantee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transparent Guarantee Policy Card */}
        <div className="rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 font-bold shrink-0">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                What the 3-Interview Guarantee Means
              </h3>
              <p className="font-mono text-xs text-stone-500 font-bold uppercase tracking-wider">
                Transparent SLA &amp; Refund Commitment
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
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
