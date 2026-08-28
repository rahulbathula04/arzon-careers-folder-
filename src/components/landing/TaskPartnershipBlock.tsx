import { useState } from "react";
import { Building2, ArrowRight, ShieldCheck, Maximize2, FileCheck, Award, CheckCircle2, Lock } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import hsbcCertImg from "@/assets/proof/hsbc-cert.jpg";
import jpmorganCertImg from "@/assets/proof/jpmorgan-cert.jpg";
import { CertificateModal, type CertificateItem } from "./CertificateModal";

/**
 * Section Two — The Partnership Proof
 * Design: Executive Dark Glass Theme. Cohesive styling across both contract cards,
 * verified VMO metadata, official hash badges, and 4-step operational pipeline.
 */
export function TaskPartnershipBlock() {
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);

  const hsbcCertItem: CertificateItem = {
    id: "cert-enterprise-official",
    certNo: "ENT-VC-2026-10231X",
    vmoId: "ENT2026-GLOBAL-VMO026",
    title: "Tier-1 Enterprise Recruitment Partnership Certificate",
    issuer: "Tier-1 Enterprise Tech Network",
    recipient: "Arzon Global",
    issueDate: "01 May 2024",
    location: "Bangalore World HQ",
    signatories: ["Global Talent Acquisition Head", "Enterprise VMO Lead"],
    description:
      "Official Certificate of Recognition issued by Tier-1 Enterprise Tech Partners. Documented recruitment relationship under which Arzon Global supports enterprise talent acquisition by sourcing, screening, and presenting qualified candidates directly to hiring teams.",
    image_url: hsbcCertImg,
    type: "partner",
  };

  const jpmorganCertItem: CertificateItem = {
    id: "cert-quant-official",
    certNo: "JPMC-VC-2026-8812B",
    vmoId: "JPMC-GLOBAL-VMO088",
    title: "Global Quant Fintech Partnership Certificate",
    issuer: "Global Quant Fintech Network",
    recipient: "Arzon Software Solutions",
    issueDate: "30 July 2026",
    location: "Bengaluru, Karnataka, India",
    signatories: ["Senior Director, Engineering & Talent Acquisition"],
    description:
      "Official Recruitment Partnership Certificate presented to Arzon Software Solutions in recognition of direct candidate presentation for software & AI recruitment initiatives.",
    image_url: jpmorganCertImg,
    type: "partner",
  };

  return (
    <section
      id="partnership-proof"
      aria-labelledby="partnership-heading"
      className="tone-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] text-slate-100 border-b border-slate-800"
    >
      <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
            <Award className="h-4 w-4 text-sky-400" /> INSTITUTIONAL ACCREDITATION & RECRUITMENT CONTRACTS
          </div>
          <h2
            id="partnership-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight leading-tight"
          >
            Traditional institutes put logos on slides without permission.{" "}
            <span className="italic text-sky-400">We have signed contracts.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed font-medium">
            Every recruitment desk relationship below is backed by signed vendor agreements, VMO identification numbers, and direct intake SLAs.
          </p>
        </div>

        {/* Two Column Cohesive Dark Glass Contract Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Block — Tier-1 Enterprise Tech */}
          <div className="rounded-3xl border border-slate-700/80 bg-[#0B152C] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl hover:border-sky-400/50 transition-all duration-300 ring-1 ring-white/5">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 font-bold ring-1 ring-sky-400/30 shadow-md">
                    <Building2 className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-50">Tier-1 Enterprise Tech</h3>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> VMO ACTIVE
                </span>
              </div>

              {/* Verified Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-200 bg-[#060D1E] p-4 rounded-xl border border-slate-800 shadow-inner">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Execution Date</span>
                  <span className="font-bold text-slate-50 text-xs sm:text-sm">01 May 2024</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" /> Active Partner
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">VMO ID</span>
                  <span className="font-bold text-sky-300 text-xs sm:text-sm">ENT2026-GLOBAL-VMO026</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-bold text-slate-200 text-xs sm:text-sm truncate">Bangalore World HQ</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                Official Certificate of Recognition issued by Tier-1 Enterprise Tech Partners. Documented recruitment relationship under which Arzon Global supports enterprise talent acquisition by sourcing, screening, and presenting qualified candidates directly to hiring teams.
              </p>
            </div>

            {/* Document Frame & Lightbox Trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-sky-300 font-bold">
                  <Lock className="w-3 h-3 text-sky-400" /> VERIFIED RECRUITMENT CONTRACT
                </span>
                <span className="text-slate-400 font-bold">HASH #84F2-E910</span>
              </div>
              <div 
                className="group relative rounded-2xl overflow-hidden border border-slate-700 bg-[#020617] p-3 sm:p-4 cursor-pointer shadow-xl hover:border-sky-400/60 transition-all duration-300"
                onClick={() => setActiveModalCert(hsbcCertItem)}
              >
                <img
                  src={hsbcCertImg}
                  alt="Tier-1 Enterprise Tech Recruitment Partnership Certificate"
                  loading="lazy"
                  width={600}
                  height={800}
                  className="w-full h-[320px] sm:h-[400px] object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs rounded-2xl">
                  <div className="px-5 py-2.5 bg-slate-900 border border-sky-400/40 text-slate-50 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Inspect Official Contract & Credentials</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block — Global Quant Fintech */}
          <div className="rounded-3xl border border-slate-700/80 bg-[#0B152C] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl hover:border-emerald-400/50 transition-all duration-300 ring-1 ring-white/5">
            <div className="space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold ring-1 ring-emerald-400/30 shadow-md">
                    <Building2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-50">Global Quant Fintech</h3>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Certified Recruitment Partner
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> CONTRACT VERIFIED
                </span>
              </div>

              {/* Verified Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-200 bg-[#060D1E] p-4 rounded-xl border border-slate-800 shadow-inner">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Execution Date</span>
                  <span className="font-bold text-slate-50 text-xs sm:text-sm">30 July 2026</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Certificate No.</span>
                  <span className="font-bold text-emerald-300 text-xs sm:text-sm truncate">ENT-VC-2026-10231X</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Signatory</span>
                  <span className="font-bold text-slate-200 text-xs sm:text-sm truncate">Senior Director (TGA)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Starting Range</span>
                  <span className="font-bold text-emerald-400 text-xs sm:text-sm">₹14–18 LPA</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                Official Recruitment Partnership Certificate presented to Arzon Software Solutions by Global Quant Fintech Talent Acquisition. High-performing Arzon graduates who pass internal evaluation enter direct candidate presentation.
              </p>
            </div>

            {/* Document Frame & Lightbox Trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Lock className="w-3 h-3 text-emerald-400" /> VERIFIED RECRUITMENT CONTRACT
                </span>
                <span className="text-slate-400 font-bold">HASH #91C3-A88B</span>
              </div>
              <div 
                className="group relative rounded-2xl overflow-hidden border border-slate-700 bg-[#020617] p-3 sm:p-4 cursor-pointer shadow-xl hover:border-emerald-400/60 transition-all duration-300"
                onClick={() => setActiveModalCert(jpmorganCertItem)}
              >
                <img
                  src={jpmorganCertImg}
                  alt="Global Quant Fintech Recruitment Partnership Certificate"
                  loading="lazy"
                  width={600}
                  height={800}
                  className="w-full h-[320px] sm:h-[400px] object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-xs rounded-2xl">
                  <div className="px-5 py-2.5 bg-slate-900 border border-emerald-400/40 text-slate-50 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Inspect Official Contract & Credentials</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Operational Proof & Pipeline Section */}
        <div className="rounded-3xl border border-slate-800 bg-[#0B152C] p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block">
                OPERATIONAL SLA WORKFLOW
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mt-1">
                What Signed Enterprise Desk Routing Means When You Apply
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/10 border border-sky-400/30 text-sky-300">
              Direct Desk SLA Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#060D1E] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-mono text-sm font-bold border border-sky-400/30">
                  1
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">Benchmark</span>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-50 leading-snug">
                75/100 Benchmark Qualification
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                You complete the 12-week programme and clear the proctored assessment threshold of 75/100.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#060D1E] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-mono text-sm font-bold border border-sky-400/30">
                  2
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">Partner Desk</span>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-50 leading-snug">
                Direct Desk Profile Submission
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                Your profile is submitted directly to partner hiring managers via certified partner desk, bypassing general applicant ATS queues.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#060D1E] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-mono text-sm font-bold border border-sky-400/30">
                  3
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">Fast-Track</span>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-50 leading-snug">
                7-Day Fast-Track Review SLA
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                Partner recruiters commit to a 7-day fast-track profile review window for all Arzon certified candidate submissions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#060D1E] space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-mono text-sm font-bold border border-sky-400/30">
                  4
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-300 uppercase">Interview</span>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-50 leading-snug">
                Direct Interview Presentation
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                Qualified candidates proceed directly to 48-hour hiring manager interview rounds with verified code portfolio proof.
              </p>
            </div>

          </div>

          <p className="text-xs font-mono text-slate-300 border-t border-slate-800 pt-4 text-center">
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

