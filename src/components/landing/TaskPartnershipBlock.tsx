import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, ArrowRight, ShieldCheck, Maximize2 } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import hsbcCertImg from "@/assets/proof/hsbc-cert.jpg";
import jpmorganCertImg from "@/assets/proof/jpmorgan-cert.jpg";
import { CertificateModal, type CertificateItem } from "./CertificateModal";
import { FEATURED_CERTIFICATES } from "./CertificateShowcase";

/**
 * Section Two — The Partnership Proof
 * Design: White section (#FFFFFF). Two columns on desktop, stacked on mobile.
 * Real framed certificate photographs, exact contract IDs, and 4-step operational proof.
 */
export function TaskPartnershipBlock() {
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);

  const hsbcCertItem = FEATURED_CERTIFICATES.find((c) => c.id === "cert-hsbc-official") || {
    id: "cert-hsbc-official",
    certNo: "HSBC-CERT-2024-25",
    vmoId: "HSBC2621TAVM026",
    title: "HSBC Certificate of Recognition: Recruitment Partner",
    issuer: "HSBC Workforce Services (India) Pvt. Ltd.",
    recipient: "Arzon Global",
    issueDate: "01 May 2024 (Valid 2024-25 & Active)",
    location: "Bangalore World - Headquarters",
    signatories: [
      "Sandeep Shahani, Head of Global Service Centre, HSBC India",
      "Kartik Jain, Head of Talent Acquisition, HSBC India",
    ],
    description:
      "Official Certificate of Recognition certifying Arzon Global as a Recruitment Partner for proactively collaborating to support successful recruitment drives and talent acquisition goals across HSBC Global Service Centres.",
    image_url: hsbcCertImg,
    type: "partner" as const,
  };

  const jpmorganCertItem = FEATURED_CERTIFICATES.find((c) => c.id === "cert-jpmorgan-official") || {
    id: "cert-jpmorgan-official",
    certNo: "JPMC-VC-2026-10231X",
    title: "JPMorgan Chase Recruitment Partnership Certificate",
    issuer: "JPMorgan Chase & Co.",
    recipient: "Arzon Software Solutions",
    issueDate: "30 July 2026",
    location: "Bengaluru, Karnataka, India",
    signatories: ["RAKESH.M, Sr. Director TGA & SDE, JPMorgan"],
    description:
      "Official Recruitment Partnership Certificate presented to Arzon Software Solutions in recognition of valuable contribution and commitment in identifying, engaging, and connecting talented professionals for JPMorgan Chase software & AI recruitment initiatives.",
    image_url: jpmorganCertImg,
    type: "partner" as const,
  };

  return (
    <section
      id="partnership-proof"
      aria-labelledby="partnership-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            INSTITUTIONAL ACCREDITATION & RECRUITMENT CONTRACTS
          </PremiumChip>
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
          <div className="rounded-3xl border border-slate-700/60 bg-[#0B1325] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl hover:border-teal-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold ring-1 ring-teal-500/30">
                    <Building2 className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">HSBC Holdings</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-400">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <PremiumChip variant="emerald" size="sm" icon={ShieldCheck}>
                  VMO ACTIVE
                </PremiumChip>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Issued Date:</span>
                  <span className="font-bold text-white">01 May 2024</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Validity:</span>
                  <span className="font-bold text-teal-300">Active Partner</span>
                </div>
                <div>
                  <span className="text-slate-500 block">VMO ID:</span>
                  <span className="font-bold text-sky-400">HSBC2621TAVM026</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <span className="font-bold text-white">Bangalore World HQ</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Official Certificate of Recognition issued by HSBC Workforce Services (India). This is a documented recruitment relationship under which Arzon Global supports HSBC's talent acquisition by sourcing, screening, and presenting qualified candidates directly to hiring teams.
              </p>
            </div>

            <div 
              className="group relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-900 to-[#020617] p-3 sm:p-4 cursor-pointer shadow-xl hover:shadow-teal-500/10 transition-all duration-300"
              onClick={() => setActiveModalCert(hsbcCertItem)}
            >
              <img
                src={hsbcCertImg}
                alt="HSBC Recruitment Partnership Certificate"
                loading="lazy"
                width={600}
                height={800}
                className="w-full h-[360px] sm:h-[440px] object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs rounded-2xl">
                <div className="px-5 py-2.5 bg-slate-900/90 border border-teal-500/40 text-slate-50 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Inspect Official Certificate & Credentials</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block — JPMorgan Chase & Co. */}
          <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3F8B] text-slate-50 font-bold shadow-xs">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">JPMorgan Chase &amp; Co.</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <PremiumChip variant="emerald" size="sm" icon={ShieldCheck}>
                  CONTRACT VERIFIED
                </PremiumChip>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-700 bg-white tone-light p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-500 block">Issued Date:</span>
                  <span className="font-bold text-[#1A1A1A]">30 July 2026</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Certificate No.:</span>
                  <span className="font-bold text-[#1B3F8B]">JPMC-VC-2026-10231X</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Signatory:</span>
                  <span className="font-bold text-[#1A1A1A]">Rakesh M (Sr. Dir)</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Starting Salary:</span>
                  <span className="font-bold text-emerald-700">₹14–18 LPA</span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                Official Recruitment Partnership Certificate presented to Arzon Software Solutions by JPMorgan Chase & Co. Talent Acquisition. High-performing Arzon graduates who pass internal evaluation enter direct candidate presentation.
              </p>
            </div>

            <div 
              className="group relative rounded-2xl overflow-hidden border border-stone-300/80 bg-gradient-to-b from-[#0F172A] to-[#020617] p-3 sm:p-4 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setActiveModalCert(jpmorganCertItem)}
            >
              <img
                src={jpmorganCertImg}
                alt="JPMorgan Chase Recruitment Partnership Certificate"
                loading="lazy"
                width={600}
                height={800}
                className="w-full h-[360px] sm:h-[440px] object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs rounded-2xl">
                <div className="px-5 py-2.5 bg-slate-900/90 border border-slate-700 text-slate-50 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Inspect Official Certificate & Credentials</span>
                </div>
              </div>
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
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold">
                1
              </span>
              <span>
                You complete the 12-week Arzon programme and clear the internal mock threshold of{" "}
                <strong className="font-bold text-[#1A1A1A]">75 out of 100</strong> on the HackerRank-format assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold">
                2
              </span>
              <span>
                Your profile is submitted through the Arzon partner desk directly to the HSBC or JPMorgan hiring team.
                Your application is not in the general applicant pool. It comes with our certified partner introduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold">
                3
              </span>
              <span>
                HSBC commits to a <strong className="font-bold text-[#1B3F8B]">7-day fast-track review</strong> of all
                Arzon-submitted profiles. Standard applicants wait weeks. Arzon-submitted profiles are reviewed within a week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold">
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

      <CertificateModal
        cert={activeModalCert}
        isOpen={!!activeModalCert}
        onClose={() => setActiveModalCert(null)}
      />
    </section>
  );
}
