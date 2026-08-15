import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, FileCheck, Award, ArrowRight, ExternalLink, Building2, CheckCircle2 } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { GOOGLE_FORM_URL } from "./constants";
import { trackEvent } from "@/lib/analytics";

export function CompressedProofCtaBlock() {
  const shouldReduceMotion = useReducedMotion();

  const PROOF_POINTS = [
    {
      title: "HSBC Certified Partner Brief",
      desc: "Documented institutional contract (VMO ID: HSBC2621TAVM026) on file at Arzon HQ, Hyderabad.",
      badge: "VERIFIED VMO ID",
      icon: ShieldCheck,
    },
    {
      title: "JPMorgan Chase Pipeline",
      desc: "Direct candidate intake briefs for Data Analyst and Technology roles across Pan-India locations.",
      badge: "RECRUITMENT DESK",
      icon: Building2,
    },
    {
      title: "Employer-Driven Curriculum",
      desc: "Training is designed directly from actual job descriptions, not abstract theoretical textbooks.",
      badge: "ACTUAL JDs USED",
      icon: FileCheck,
    },
    {
      title: "Internal Assessment Threshold",
      desc: "Candidates must pass our 75/100 benchmark before profile submission, maintaining high partner trust.",
      badge: "75/100 BENCHMARK",
      icon: Award,
    },
  ];

  return (
    <section
      id="compressed-proof"
      aria-labelledby="compressed-proof-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            WHY SHOULD YOU BELIEVE US?
          </PremiumChip>
          <h2
            id="compressed-proof-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Claim <span className="text-stone-400 font-sans font-normal">→</span> Proof{" "}
            <span className="text-stone-400 font-sans font-normal">→</span> Opportunity{" "}
            <span className="italic text-[#1B3F8B]">→ Action</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            We don't rely on unverified claims or standard marketing logos. We provide actual institutional contracts, documented partner IDs, and transparent employer requirements.
          </p>
        </div>

        {/* 4-Grid Proof Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROOF_POINTS.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#1B3F8B]/10 text-[#1B3F8B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                      {pt.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {pt.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 text-[11px] font-mono font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Substantiated & Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button Strip */}
        <div className="bg-[#FAF8F5] rounded-2xl border border-stone-300 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-xs font-bold uppercase text-[#1B3F8B]">
              NEXT STEP FOR APPLICANTS
            </span>
            <h4 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Ready to verify your eligibility for current openings?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Takes under 2 minutes. Free registration · No payment required.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#partnership-proof"
              className="px-4 py-2.5 rounded-xl font-sans font-bold text-xs text-stone-800 bg-white card-light border border-stone-300 hover:bg-stone-50 shadow-xs transition-all"
            >
              VERIFY THE PARTNERSHIP
            </a>
            <a
              href="#live-opportunity-board"
              className="px-4 py-2.5 rounded-xl font-sans font-bold text-xs text-stone-800 bg-white card-light border border-stone-300 hover:bg-stone-50 shadow-xs transition-all"
            >
              VIEW CURRENT OPENINGS
            </a>
            <a
              href="#apply"
              onClick={() => trackEvent("compressed_proof_cta_click")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-sans font-bold text-xs text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-pointer"
            >
              <span>CHECK MY ELIGIBILITY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
