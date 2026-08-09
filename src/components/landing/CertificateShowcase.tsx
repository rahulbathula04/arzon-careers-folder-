import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ArrowRight, Award, Briefcase, Maximize2, ShieldCheck, Check, Building2, Copy } from "lucide-react";
import { CertificateModal, type CertificateItem } from "./CertificateModal";
import internshipCert from "@/assets/proof/cert-internship.webp";
import projectCert from "@/assets/proof/cert-project.webp";
import hsbcCert from "@/assets/proof/hsbc-cert.jpg";
import jpmorganCert from "@/assets/proof/jpmorgan-cert.jpg";

export const FEATURED_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-jpmorgan-official",
    certNo: "JPMC-VC-2026-10231X",
    title: "JPMorgan Chase Recruitment Partnership Certificate",
    issuer: "JPMorgan Chase & Co.",
    recipient: "Arzon Software Solutions",
    issueDate: "30 July 2026",
    location: "Bengaluru, Karnataka, India",
    signatories: ["RAKESH.M, Sr. Director TGA & SDE, JPMorgan"],
    address: "Prestige Tech Park, Marathahalli-Sarjapur Outer Ring Road, Varthur, Kadubeesanahalli, Kasaba Hobli, Bengaluru 560103",
    description:
      "Official Recruitment Partnership Certificate presented to Arzon Software Solutions in recognition of valuable contribution and commitment in identifying, engaging, and connecting talented professionals for JPMorgan Chase software & AI recruitment initiatives.",
    image_url: jpmorganCert,
    pdf_url: null,
    type: "partner",
  },
  {
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
    image_url: hsbcCert,
    pdf_url: null,
    type: "partner",
  },
  {
    id: "cert-internship-sample",
    certNo: "AZ-2026-INT-9921",
    title: "Performance-Graded Internship Completion Certificate",
    issuer: "Arzon Global Academic Board",
    recipient: "Verified Programme Graduate",
    issueDate: "Issued upon Cohort Completion",
    location: "Hyderabad / Pan-India",
    signatories: ["Director of Academic Operations", "Lead Industry Assessor"],
    description:
      "Branded with ISO 9001:2015, MSME & MCA seals. Performance-graded against exact enterprise job descriptions, complete with public verifier URL & QR code.",
    image_url: internshipCert,
    pdf_url: null,
    type: "graduate",
  },
  {
    id: "cert-capstone-sample",
    certNo: "AZ-2026-PRJ-8812",
    title: "Industry Capstone & Project Completion Certificate",
    issuer: "Arzon Global Engineering Labs",
    recipient: "Verified Programme Graduate",
    issueDate: "Issued upon Project Defense",
    location: "Arzon Virtual Engineering Hub",
    signatories: ["Head of AI & Software Engineering Labs"],
    description:
      "Issued on successful completion of enterprise-level capstone projects, verified by production code commits, unit test suites, and peer code reviews.",
    image_url: projectCert,
    pdf_url: null,
    type: "graduate",
  },
];

export function CertificateShowcase() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "partner" | "graduate">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCerts = FEATURED_CERTIFICATES.filter((c) => {
    if (activeTab === "partner") return c.type === "partner";
    if (activeTab === "graduate") return c.type === "graduate";
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Section id="certificate" size="lg" className="bg-[#F8FAFC] tone-light text-slate-900 border-y border-stone-200">
      <SectionHeader
        align="center"
        eyebrow="ENTERPRISE CREDENTIALS & PARTNERSHIPS"
        title={
          <>
            Documented proof signed by <em className="italic-accent not-italic">global financial leaders</em>.
          </>
        }
        sub="We display real, physically framed recruitment partnership contracts and ISO-certified graduate credentials, verifiable by public URL and QR code."
      />

      {/* Enterprise Filter Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all ${
            activeTab === "all"
              ? "bg-[#1B3F8B] text-slate-50 shadow-md"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-300"
          }`}
        >
          All Verifiable Documents ({FEATURED_CERTIFICATES.length})
        </button>
        <button
          onClick={() => setActiveTab("partner")}
          className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "partner"
              ? "bg-[#1B3F8B] text-slate-50 shadow-md"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-300"
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Corporate Partner Contracts (HSBC & JPMorgan)</span>
        </button>
        <button
          onClick={() => setActiveTab("graduate")}
          className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "graduate"
              ? "bg-[#1B3F8B] text-slate-50 shadow-md"
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-300"
          }`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-500" />
          <span>Graduate Student Credentials</span>
        </button>
      </div>

      {/* Grid Display */}
      <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {filteredCerts.map((c) => {
          const isPartner = c.type === "partner";
          const displayId = c.certNo || c.vmoId || c.id;

          return (
            <article
              key={c.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-300 bg-white tone-light shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Header Badge Bar */}
              <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50 tone-light flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                    isPartner
                      ? "bg-amber-100 text-amber-900 border border-amber-300/70"
                      : "bg-emerald-100 text-emerald-900 border border-emerald-300/70"
                  }`}
                >
                  {isPartner ? <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> : <Award className="h-3.5 w-3.5 text-emerald-600" />}
                  {isPartner ? "Official Partner Document" : "Verifiable Student Certificate"}
                </span>

                <span className="font-mono text-[10px] font-bold text-stone-500">
                  ID: {displayId}
                </span>
              </div>

              {/* Certificate Image Frame Container */}
              <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#020617] p-4 sm:p-5 flex items-center justify-center cursor-pointer group/img"
                   onClick={() => setSelectedCert(c)}>
                <img
                  src={c.image_url}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[320px] sm:max-h-[380px] w-auto max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.03]"
                />

                {/* Hover Inspection Overlay */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-xs">
                  <div className="h-12 w-12 rounded-full bg-slate-50/20 backdrop-blur-md border border-slate-50/40 flex items-center justify-center text-slate-50 mb-2 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-50 tracking-wide uppercase">
                    Click to Inspect High-Res Original
                  </span>
                  <span className="text-[11px] text-stone-300 mt-1 font-sans">
                    View official signatures & seal details
                  </span>
                </div>
              </div>

              {/* Certificate Info Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B]">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{c.issuer}</span>
                  </div>

                  <h3 className="mt-1.5 font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {c.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans">
                    {c.description}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-600">
                  <div>
                    <span className="text-stone-400 block">Issued On:</span>
                    <span className="font-semibold text-stone-800">{c.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Recipient:</span>
                    <span className="font-semibold text-stone-800">{c.recipient}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <Button
                    onClick={() => setSelectedCert(c)}
                    className="h-10 px-4 flex-1 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-mono text-xs font-bold shadow-xs transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
                    <span>Inspect Document</span>
                  </Button>

                  <button
                    onClick={() => handleCopy(c.id, displayId)}
                    title="Copy Credential ID"
                    className="h-10 px-3 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 font-mono text-xs text-stone-700 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedId === c.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Quick Verifier Widget */}
      <div className="mt-12 max-w-4xl mx-auto p-6 rounded-3xl border border-stone-300 bg-white tone-light shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">
                INSTANT PUBLIC CREDENTIAL & PARTNERSHIP VERIFIER
              </span>
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900 mt-1">
              Verify live recruitment partner contracts or graduate IDs
            </h4>
          </div>
          <Link to="/verify" className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline flex items-center gap-1">
            <span>Open full verifier portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <input
            type="text"
            readOnly
            value="JPMC-VC-2026-10231X / HSBC2621TAVM026"
            className="h-12 px-4 rounded-xl border border-stone-300 bg-stone-50 font-mono text-xs font-bold text-stone-800 flex-1"
          />
          <Link
            to="/verify"
            className="h-12 px-7 inline-flex items-center justify-center gap-2 font-mono text-xs font-bold text-slate-50 bg-[#1B3F8B] hover:bg-[#153270] rounded-xl shadow-md transition-colors"
          >
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Live Credential</span>
          </Link>
        </div>
      </div>

      {/* Guarantee Bulletins */}
      <ul className="mt-10 grid gap-3 text-xs sm:text-sm font-sans max-w-4xl mx-auto sm:grid-cols-3 text-stone-700">
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white tone-light border border-stone-200">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
          <span><strong>Signed HR Agreements:</strong> Direct talent sourcing partnerships with HSBC and JPMorgan Chase.</span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white tone-light border border-stone-200">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
          <span><strong>Public Verification URL:</strong> Instant QR code & database ID lookup for every graduate.</span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white tone-light border border-stone-200">
          <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
          <span><strong>ISO 9001 & MSME Seals:</strong> Certified quality management framework for candidate preparation.</span>
        </li>
      </ul>

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </Section>
  );
}
