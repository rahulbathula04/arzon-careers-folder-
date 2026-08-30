import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

const PRACTITIONER_FACULTY = [
  {
    name: "Dr. Sandeep Vardhan",
    role: "Senior Director, Global Pharmacovigilance Operations",
    background: "Ex-Novartis, Parexel (14+ Yrs Experience)",
    expertise: "Oracle Argus Safety 8.4, Signal Detection, Aggregate PBRER Reports",
    quote: "When we screen fresher CVs at global delivery centers, we discard candidates who only list college pharmacology theory. We prioritize candidates who can immediately navigate Argus case intake workflows without a 6-month training delay.",
  },
  {
    name: "Ananya Mukherjee",
    role: "Principal Clinical Data Lead & EDC Architect",
    background: "Ex-IQVIA, Syneos Health (11+ Yrs Experience)",
    expertise: "Medidata RAVE, CDASH Standards, eCRF Query Reconciliation",
    quote: "Trial sponsors demand zero data discrepancy. Arzon candidates stand out because they understand clinical data validation specifications before their first interview round.",
  },
  {
    name: "K. Venkatesh",
    role: "Head of US Regulatory Submissions & CMC",
    background: "Ex-Dr. Reddy's, Aurobindo Pharma (16+ Yrs Experience)",
    expertise: "eCTD Modules 1-5, ANDA Compilation, US FDA ESG Filing",
    quote: "Regulatory compliance is non-negotiable. Knowing how to assemble an audit-ready eCTD dossier gives pharmacy graduates an immediate competitive edge.",
  },
];

const PLACEMENT_METRICS = [
  { metric: "₹4.85L", label: "Average Starting CTC", detail: "Top 25% graduates achieve ₹6.2L+ in Tier-1 GCCs" },
  { metric: "84%", label: "First-Round Shortlist Rate", detail: "Compared to 9% industry baseline for freshers" },
  { metric: "14+ GCCs", label: "Active Hiring Partners", detail: "Hyderabad, Bengaluru, Mumbai & Pune hubs" },
  { metric: "100%", label: "Cryptographically Audited", detail: "SHA-256 verified certificates on public ledger" },
];

export function PractitionerMentorsProof() {
  return (
    <section id="mentors" className="py-16 sm:py-24 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-3xl">
            <PremiumChip variant="navy" size="md">
              PRACTITIONER FACULTY &amp; EVIDENCE
            </PremiumChip>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Taught by Operational Directors, Not Academic Lecturers
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              Every Arzon module is designed and delivered by senior life-sciences leaders who actively hire and manage operational teams across global capability centers.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/why-arzon"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-all shadow-2xs cursor-pointer"
            >
              <span>Explore Full Placement Audit</span>
              <ArrowRight className="h-4 w-4 text-[#1B3F8B]" />
            </Link>
          </div>
        </div>

        {/* 4 Audited Placement Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACEMENT_METRICS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 sm:p-6 space-y-2 shadow-xs"
            >
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">
                {item.metric}
              </span>
              <p className="font-serif text-base font-bold text-[#1A1A1A]">
                {item.label}
              </p>
              <p className="text-xs text-stone-500 font-sans font-medium">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Practitioner Faculty Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PRACTITIONER_FACULTY.map((faculty, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[#8A6D1F] uppercase tracking-wider block">
                    {faculty.background}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {faculty.name}
                  </h3>
                  <p className="text-xs font-bold text-[#1B3F8B] font-sans">
                    {faculty.role}
                  </p>
                </div>

                <div className="rounded-lg bg-white tone-light border border-stone-200 p-2.5 text-[11px] font-mono text-stone-700">
                  <strong className="text-stone-900 block text-[10px]">CORE DOMAIN:</strong>
                  {faculty.expertise}
                </div>

                <p className="text-xs text-stone-600 font-sans italic leading-relaxed pt-1">
                  "{faculty.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
