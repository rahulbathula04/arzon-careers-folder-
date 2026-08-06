import { Link } from "@tanstack/react-router";
import { Check, ShieldCheck, ArrowRight, Zap, Crown, Award } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Section Seven — Pricing & Guarantee
 * Design: Dark Navy background (#1B2B4B), flat solid card backgrounds,
 * transparent investment structure, warm gold (#B8860B) accent on Elite tier.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#1B2B4B] text-white border-b border-slate-800"
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
            Choose your level of commitment.{" "}
            <span className="italic text-sky-400">The programme is the same. The support level changes.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            All tiers include full learning portal access, project feedback, and zero hidden charges.
            No EMI traps. No income share agreements. No loan tie-ins. You pay. You learn. You own the outcome.
          </p>
        </div>

        {/* Trust Strip */}
        <div className="text-center py-2 border-y border-slate-700/80">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            NO HIDDEN EMI / LOAN TRAPS · SEAT DEPOSIT ADJUSTED IN FINAL FEE · ASCI CODE COMPLIANT · GST TAX INVOICE ISSUED
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 — Essential */}
          <div className="rounded-2xl border border-slate-700 bg-[#142240] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                SELF-PACED CORE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Essential</h3>
              <div>
                <span className="text-xs text-slate-400 line-through block">₹24,999</span>
                <span className="font-serif text-4xl font-bold text-white">₹14,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹10,000</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                For self-starters who want the recorded curriculum and core materials.
              </p>

              <ul className="space-y-3 pt-4 border-t border-slate-700 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>12-month access to all recorded video modules</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Codebook reference labs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Course completion certificate with public verifier URL</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Community cohort group access</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Self-paced learning portal</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "essential" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "essential" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-600 transition-all"
            >
              <span>Select Essential Tier</span>
            </Link>
          </div>

          {/* Card 2 — Career (Highlighted Most Popular) */}
          <div className="rounded-2xl border-2 border-sky-500 bg-[#162A54] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-xl">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-sky-400/40">
                MOST POPULAR · 87% ENROL HERE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Career</h3>
              <div>
                <span className="text-xs text-slate-400 line-through block">₹41,999</span>
                <span className="font-serif text-4xl font-bold text-white">₹24,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹17,000</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                For graduates seeking live mentor instruction and active placement preparation.
              </p>

              {/* Feature Callout */}
              <div className="bg-sky-500/10 border border-sky-400/30 p-3 rounded-xl text-xs font-mono text-sky-200 font-bold">
                ⚡ Direct access to 120+ hiring partners including Optum, Omega, and Access Healthcare
              </div>

              <ul className="space-y-3 pt-2 text-xs text-slate-200">
                <li className="flex items-start gap-2.5 font-semibold text-white">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Everything in Essential tier</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Live mentor sessions — 8 weeks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Real data labs and capstone projects</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Verifiable internship certificate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Job placement support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>1:1 mock interviews</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "career" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "career" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-lg transition-all hover:scale-[1.01]"
            >
              <span>Select Career Tier — Recommended</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
          </div>

          {/* Card 3 — Elite (Warm Gold Accent #B8860B) */}
          <div className="rounded-2xl border border-[#B8860B] bg-[#1C2436] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-lg">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#B8860B]/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-[#B8860B]/50">
                👑 DIRECT RECRUITER SLA · INTERVIEW GUARANTEE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Elite</h3>
              <div>
                <span className="text-xs text-slate-400 line-through block">₹69,999</span>
                <span className="font-serif text-4xl font-bold text-amber-300">₹39,999</span>
                <span className="text-xs text-emerald-400 font-bold ml-2 font-mono">SAVE ₹30,000</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                For candidates wanting a dedicated mentor and guaranteed hiring manager introductions.
              </p>

              {/* Feature Callout */}
              <div className="bg-[#B8860B]/15 border border-[#B8860B]/40 p-3 rounded-xl text-xs font-mono text-amber-200 font-bold">
                👑 Dedicated 1:1 senior mentor + 3 guaranteed hiring manager introductions through Arzon's partner network
              </div>

              <ul className="space-y-3 pt-2 text-xs text-slate-200">
                <li className="flex items-start gap-2.5 font-semibold text-white">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Everything in Career tier</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>1:1 dedicated senior mentor pairing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>3 confirmed hiring manager introduction calls</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Custom ATS-optimised resume</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>LinkedIn profile rewrite</span>
                </li>
              </ul>
            </div>

            <Link
              to="/enrol/$tier/pay"
              params={{ tier: "elite" }}
              onClick={() => trackEvent("pricing_cta_click", { tier: "elite" })}
              className="h-12 w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all font-sans"
            >
              <span>Select Elite VIP Tier</span>
            </Link>
          </div>

        </div>

        {/* Guarantee Clarification Policy Block */}
        <div className="rounded-2xl border border-slate-700 bg-[#142240] p-6 sm:p-8 space-y-3">
          <h4 className="font-serif text-lg font-bold text-amber-300">
            What does the Elite interview guarantee mean:
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
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
