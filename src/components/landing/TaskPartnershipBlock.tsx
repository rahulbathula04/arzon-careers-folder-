import { Link } from "@tanstack/react-router";
import { Building2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import hsbcCertImg from "@/assets/proof/hsbc-cert.jpg";
import jpmorganCertImg from "@/assets/proof/jpmorgan-cert.jpg";

/**
 * Section Two — The Partnership Proof
 * Design: White section (#FFFFFF). Two columns on desktop, stacked on mobile.
 * Real framed certificate photographs, VMO IDs, and 4-step operational proof.
 */
export function TaskPartnershipBlock() {
  return (
    <section
      id="partnership-proof"
      aria-labelledby="partnership-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            WHY THIS IS DIFFERENT FROM A LOGO ON A SLIDE DECK
          </p>
          <h2
            id="partnership-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Traditional institutes put logos on decks without permission.{" "}
            <span className="italic text-[#1B3F8B]">We have signed contracts.</span>
          </h2>
        </div>

        {/* Two Column Certificate Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Block — HSBC Holdings */}
          <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3F8B] text-white font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">HSBC Holdings</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-stone-200/80 px-2.5 py-1 font-mono text-[10px] font-bold text-stone-700">
                  VMO ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-700 bg-white tone-light p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 block">Issued:</span>
                  <span className="font-bold text-[#1A1A1A]">13 July 2026</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Valid Until:</span>
                  <span className="font-bold text-[#1A1A1A]">05 August 2028</span>
                </div>
                <div>
                  <span className="text-stone-500 block">VMO ID:</span>
                  <span className="font-bold text-[#1B3F8B]">HSBC2621TAVM026</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Issued:</span>
                  <span className="font-bold text-[#1A1A1A]">Bangalore</span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                This certificate was issued by HSBC's Corporate Relations function. It is not a co-branding
                agreement or a marketing partnership. It is a documented recruitment relationship under which
                Arzon Global supports HSBC's talent acquisition by sourcing, screening, and presenting qualified
                candidates. The contract ID is searchable.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-300">
              <img
                src={hsbcCertImg}
                alt="HSBC Recruitment Partnership Certificate"
                loading="lazy"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Right Block — JPMorgan Chase & Co. */}
          <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3F8B] text-white font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">JPMorgan Chase &amp; Co.</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-stone-200/80 px-2.5 py-1 font-mono text-[10px] font-bold text-stone-700">
                  CONTRACT VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-700 bg-white tone-light p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 block">Issued:</span>
                  <span className="font-bold text-[#1A1A1A]">July 2026</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Contract ID:</span>
                  <span className="font-bold text-[#1B3F8B]">HSBC-IN-2026-AIML-891</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Coverage:</span>
                  <span className="font-bold text-[#1A1A1A]">100+ Countries</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Starting Salary:</span>
                  <span className="font-bold text-emerald-700">₹14–18 LPA</span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                JPMorgan Chase's India GCC operations hire AI/ML engineers at ₹14–18 LPA starting salary for freshers.
                Arzon graduates who meet the technical threshold enter the recruitment review within 7 days of
                programme completion.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-300">
              <img
                src={jpmorganCertImg}
                alt="JPMorgan Chase Recruitment Partnership Certificate"
                loading="lazy"
                width={500}
                height={350}
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

        </div>

        {/* Full-Width Operational Proof Section */}
        <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            What this actually means when you apply.
          </h3>

          <ol className="space-y-4 text-sm sm:text-base text-stone-800 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold">
                1
              </span>
              <span>
                You complete the 12-week Arzon programme and clear the internal mock threshold of{" "}
                <strong className="font-bold text-[#1A1A1A]">75 out of 100</strong> on the HackerRank-format assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold">
                2
              </span>
              <span>
                Your profile is submitted through the Arzon partner desk directly to the HSBC or JPMorgan hiring team.
                Your application is not in the general applicant pool. It comes with our certified partner introduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold">
                3
              </span>
              <span>
                HSBC commits to a <strong className="font-bold text-[#1B3F8B]">7-day fast-track review</strong> of all
                Arzon-submitted profiles. Standard applicants wait weeks. Arzon-submitted profiles are reviewed within a week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold">
                4
              </span>
              <span>
                The hiring decision remains entirely with HSBC and JPMorgan. We do not guarantee an offer. We guarantee
                that your application reaches the right desk with proof of your preparation behind it. The rest is you.
              </span>
            </li>
          </ol>

          <p className="text-xs font-mono text-stone-600 border-t border-stone-300 pt-4">
            Every claim on this page links to the registration, contract, or verifier behind it. We do not ask you to take our word.
          </p>
        </div>
      </div>
    </section>
  );
}
