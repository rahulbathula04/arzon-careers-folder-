import React from "react";
import { ArrowRight, Clock, Target, Gift, Zap, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { GOOGLE_FORM_URL } from "./constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Section 3D — Why Register Today & High Conversion Pipeline CTA
 * High urgency conversion block designed for mobile traffic with repeated CTAs.
 */
export function WhyRegisterBlock() {
  const shouldReduceMotion = useReducedMotion();

  const reasons = [
    {
      icon: Clock,
      title: "JPMorgan Data Analyst (₹14 LPA)",
      desc: "10 roles open for freshers. Applications close September 15th.",
      badge: "⏳ Sept 15 Deadline",
    },
    {
      icon: Target,
      title: "Direct pipeline access",
      desc: "Connect directly to HSBC, JPMorgan, and top partner hiring desks.",
      badge: "🎯 Direct Access",
    },
    {
      icon: Gift,
      title: "100% Free registration",
      desc: "Registration never costs you anything at any stage.",
      badge: "🆓 Free Always",
    },
    {
      icon: Zap,
      title: "Takes under 2 minutes",
      desc: "Submit your basic profile details in less than 120 seconds.",
      badge: "⚡ Fast Form",
    },
  ];

  return (
    <section
      id="why-register"
      aria-labelledby="why-register-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="gold" size="md">
            🔥 JPMORGAN DATA ANALYST (14 LPA) · 10 ROLES OPEN (DEADLINE: SEPT 15)
          </PremiumChip>
          <h2
            id="why-register-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Why Register Today?
          </h2>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
            10 freshers Data Analyst positions at JPMorgan Chase (₹14.0 LPA) must be filled by Sept 15th. Every day you wait, someone else's profile gets evaluated first.
          </p>
        </div>

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-stone-300/80 bg-white tone-light p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      style={{ backgroundColor: "#EEF2FF", color: "#1B3F8B", borderColor: "#93C5FD" }}
                      className="p-2.5 rounded-xl border shadow-xs"
                    >
                      <Icon className="h-5 w-5" style={{ color: "#1B3F8B" }} />
                    </div>
                    <PremiumChip variant="navy" size="sm">
                      {reason.badge}
                    </PremiumChip>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom High-Impact Action Box */}
        <div className="rounded-3xl border border-[#1B3F8B]/30 bg-gradient-to-br from-[#1B3F8B]/5 via-white to-amber-500/5 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-md">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
              Don't Wait for the Perfect Listing. <br className="hidden sm:block" />
              <span className="text-[#1B3F8B] italic">Put Yourself in the Pipeline.</span>
            </h3>
            <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed max-w-2xl mx-auto">
              You may already have the skills they're looking for. The only thing standing between you and a shortlist is hitting submit.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("why_register_cta_click", { target: "google_form" })}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="h-14 px-8 inline-flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-slate-50 rounded-2xl bg-[#1B3F8B] hover:bg-[#153270] shadow-lg transition-all w-full sm:w-auto"
            >
              <span>APPLY NOW (FREE)</span>
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          </div>

          {/* Legal Disclaimer Note */}
          <div className="pt-6 border-t border-stone-200/80 text-center max-w-2xl mx-auto">
            <p className="text-xs text-stone-500 font-sans leading-relaxed italic">
              Registration is free. No payment is required at any stage. Registration does not guarantee employment. Final selection depends on eligibility, assessment performance, and the hiring requirements of the respective organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
