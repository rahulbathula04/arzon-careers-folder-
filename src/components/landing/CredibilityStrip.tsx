import { Link } from "@tanstack/react-router";
import {
  Users,
  BadgeCheck,
  ShieldCheck,
  ScrollText,
  Filter,
  FileSearch,
  ArrowUpRight,
  ArrowRight,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { LEARNER_COUNT_LABEL } from "@/lib/credibility";
import { CertificateVerifyMini } from "./CertificateVerifyMini";

type Tile = {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
  cta: string;
  to: string;
  hash?: string;
};

const TILES: Tile[] = [
  {
    icon: Building2,
    value: "HSBC + JPMorgan Chase",
    label: "CERTIFIED RECRUITMENT PARTNER",
    sub: "Official Recruitment Partnership Certificates from both global banks — signed July 2026. Our graduates enter their hiring pipeline directly.",
    cta: "SEE PARTNERSHIP PROOF ↗",
    to: "/credibility",
  },
  {
    icon: Users,
    value: LEARNER_COUNT_LABEL,
    label: "LEARNERS TRAINED",
    sub: "Across India since 2024",
    cta: "HOW WE COUNT ↗",
    to: "/credibility",
  },
  {
    icon: BadgeCheck,
    value: "ISO · MSME · MCA",
    label: "REGISTERED & ACCREDITED",
    sub: "ISO 9001 certified, MSME UDYAM, MCA-incorporated.",
    cta: "SEE REGISTRATION IDS ↗",
    to: "/credibility",
    hash: "registrations",
  },
  {
    icon: ShieldCheck,
    value: "Verifiable certificate",
    label: "PUBLIC VERIFIER",
    sub: "Anyone can audit any Arzon certificate by ID, no login.",
    cta: "TRY THE VERIFIER ↗",
    to: "/verify",
  },
  {
    icon: ScrollText,
    value: "Public trust ledger",
    label: "REFUNDS & COMPLAINTS",
    sub: "Every refund issued and complaint received, on the record.",
    cta: "READ THE LEDGER ↗",
    to: "/trust-report",
  },
  {
    icon: Filter,
    value: "36% accept rate",
    label: "SELECTIVITY, NOT VOLUME",
    sub: "Industry edtechs accept ~92%. We turn away ~64% on purpose.",
    cta: "SEE SELECTIVITY DATA ↗",
    to: "/credibility",
    hash: "selectivity",
  },
  {
    icon: FileSearch,
    value: "Syllabus from real JDs",
    label: "JD MIRROR",
    sub: "HSBC AI/ML Engineer JD mapped line-by-line to our 12-week curriculum.",
    cta: "OPEN THE JD MIRROR ↗",
    to: "/jd-mirror",
  },
];

export function CredibilityStrip() {
  return (
    <section
      id="proof-strip"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header (Matching Image 4) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#707C90]">
              PROOF · WHY TRUST THIS
            </p>
            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">
            Everything below is{" "}
            <span className="italic text-[#8A6D1F]">independently verifiable.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-xl mx-auto">
            We don't ask you to take our word. Every tile here links to the registration, ledger or
            verifier behind the claim, exactly what a recruiter or your parent would want to see.
          </p>
        </div>

        {/* 6 Editorial White Cards Grid (Matching Image 4) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              hash={t.hash}
              preload="intent"
              className="rounded-[24px] border border-slate-200/90 bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm group"
              aria-label={`${t.label} - ${t.cta}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#707C90] group-hover:text-[#2563EB] transition-colors" />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">
                    {t.label}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-[#151C2E] mt-1">{t.value}</h3>
                  <p className="text-xs text-[#5B6472] mt-1 leading-relaxed">{t.sub}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  <span>{t.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-2">
          <CertificateVerifyMini />
        </div>
      </div>
    </section>
  );
}
