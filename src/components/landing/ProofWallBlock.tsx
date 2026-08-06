import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, FileCheck, Award, Lock, BookOpen, Users } from "lucide-react";

const PROOF_TILES = [
  {
    label: "PARTNERSHIPS",
    stat: "CERTIFIED RECRUITMENT PARTNER",
    headline: "HSBC + JPMorgan Chase",
    desc: "Official signed Recruitment Partnership Certificates from both institutions, effective July 2026. VMO ID visible on request.",
    linkText: "VERIFY THE CERTIFICATES →",
    to: "/proof",
    icon: FileCheck,
  },
  {
    label: "LEARNERS",
    stat: "12,000+",
    headline: "Learners enrolled across India since 2024",
    desc: "This count includes all paid programme enrolments across clinical and AI/ML tracks. We explain exactly how we count on the linked page.",
    linkText: "HOW WE COUNT →",
    to: "/why-arzon",
    icon: Users,
  },
  {
    label: "REGISTRATIONS",
    stat: "REGISTERED AND ACCREDITED",
    headline: "ISO 9001:2015 · MSME UDYAM · MCA",
    desc: "Company registration, quality management certification, and MSME registration are all independently searchable by registration number.",
    linkText: "SEE REGISTRATION IDS →",
    to: "/trust-report",
    icon: ShieldCheck,
  },
  {
    label: "CERTIFICATE VERIFIER",
    stat: "PUBLIC VERIFIER",
    headline: "Any Arzon certificate can be verified by ID",
    desc: "No login required. Enter the certificate ID. See the name, programme, date, and grade. Recruiters and parents can check this independently.",
    linkText: "TRY THE VERIFIER →",
    to: "/verify",
    icon: Award,
  },
  {
    label: "TRUST LEDGER",
    stat: "PUBLIC TRUST LEDGER",
    headline: "Every refund issued and complaint received",
    desc: "We publish this because companies that have nothing to hide, hide nothing. This is on the record.",
    linkText: "READ THE LEDGER →",
    to: "/refund",
    icon: Lock,
  },
  {
    label: "SELECTIVITY",
    stat: "36% ACCEPT RATE",
    headline: "We turn away approximately 64% of applicants",
    desc: "We do this because HSBC and JPMorgan expect us to present only qualified candidates. Accepting everyone would destroy the partnership. We take selectivity seriously.",
    linkText: "SEE SELECTIVITY DATA →",
    to: "/proof",
    icon: BookOpen,
  },
];

/**
 * Section Six — The Proof Wall
 * Design: White background (#FFFFFF). Grid of six verifiable tiles.
 * Clean borders, press-clipping aesthetic, pure verifiable information.
 */
export function ProofWallBlock() {
  return (
    <section
      id="proof-wall"
      aria-labelledby="proof-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            PROOF · EVERY CLAIM BELOW IS INDEPENDENTLY VERIFIABLE
          </p>
          <h2
            id="proof-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            We do not ask you to take our word.{" "}
            <span className="italic text-[#1B3F8B]">We give you a link to check it yourself.</span>
          </h2>
        </div>

        {/* 6 Grid Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROOF_TILES.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 space-y-4 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-300/80 pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-700">
                      {t.label}
                    </span>
                    <Icon className="h-4 w-4 text-[#1B3F8B]" />
                  </div>

                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3F8B] tracking-tight">
                    {t.stat}
                  </p>

                  <h3 className="font-serif text-base font-bold text-[#1A1A1A] leading-snug">
                    {t.headline}
                  </h3>

                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {t.desc}
                  </p>
                </div>

                <Link
                  to={t.to}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] hover:text-[#153270] pt-3 border-t border-stone-300/80"
                >
                  <span>{t.linkText}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
