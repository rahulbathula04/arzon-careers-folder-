import { createFileRoute, Link } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  TrendingUp,
  Laptop,
  GraduationCap,
  FileCheck2,
  HelpCircle,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/healthcare-careers")({
  head: () => {
    const seoData = pageSeo({
      path: "/healthcare-careers",
      title: "Healthcare Careers in India 2026 · Top 6 Tracks & Salary Guide",
      description:
        "Comprehensive 2026 guide to high-paying healthcare careers in India. Explore Pharmacovigilance, Medical Coding, Clinical Data Management, and Regulatory tracks.",
      image: "/og/about.jpg",
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which healthcare career track pays the highest starting salary for freshers in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Healthcare & Clinical Data Analytics (Clinical SAS) and Pharmacovigilance (Oracle Argus) offer the highest entry-level packages in Tier-1 GCCs, starting between ₹4.2L to ₹6.5L per annum for B.Pharm and Pharm.D graduates.",
                },
              },
              {
                "@type": "Question",
                name: "Can B.Sc and M.Sc Life Sciences graduates enter corporate healthcare roles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Life Sciences graduates are eligible for Clinical Research Coordination (CRC), Clinical Data Management (eCRF validation), Medical Coding (ICD-10), and Regulatory Affairs with specialized software training.",
                },
              },
              {
                "@type": "Question",
                name: "What software tools do healthcare recruiters test during fresher interviews?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tier-1 recruiters in Hyderabad and Bengaluru primarily test candidate fluency in Oracle Argus Safety 8.4, MedDRA 27.0, Medidata RAVE EDC, ICD-10-CM / CPT coding, and Base SAS 9.4.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://arzoncareers.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Healthcare Careers",
                item: "https://arzoncareers.in/healthcare-careers",
              },
            ],
          }),
        },
      ],
    };
  },
  component: HealthcareCareersPage,
});

const CAREER_LIST = [
  {
    title: "1. Pharmacovigilance (Drug Safety Operations)",
    slug: "/pv-associate",
    salary: "₹4.0L – ₹5.5L (Entry) → ₹14L–₹22L (5+ Yrs)",
    software: "Oracle Argus Safety 8.4, MedDRA 27.0, ARISg",
    hiring: "Novartis, IQVIA, Parexel, Pfizer, Dr. Reddy's",
    degrees: "Pharm.D, B.Pharm, M.Pharm, MBBS, BDS, BAMS",
    overview: "Triage adverse event reports, process individual case safety reports (ICSRs), and code medical terminology according to ICH E2B(R3) compliance standards.",
  },
  {
    title: "2. Medical Coding & Billing",
    slug: "/courses/medical-coding",
    salary: "₹3.8L – ₹5.0L (Entry) → ₹12L–₹18L (5+ Yrs)",
    software: "ICD-10-CM, CPT-4, HCPCS Level II, 3M Encoder",
    hiring: "Optum, Omega Healthcare, GeBBS, Episource",
    degrees: "B.Pharm, B.Sc Life Sciences, Biotechnology, Nursing",
    overview: "Abstract clinical encounters and operative notes into standardized alphanumeric codes for US healthcare reimbursement and revenue cycle audits.",
  },
  {
    title: "3. Clinical Research & Clinical Data Management (CDM)",
    slug: "/courses/clinical-research",
    salary: "₹4.0L – ₹5.2L (Entry) → ₹13.5L–₹20L (5+ Yrs)",
    software: "Medidata RAVE, Oracle InForm, CDISC CDASH",
    hiring: "IQVIA, Syneos Health, ICON plc, Labcorp",
    degrees: "B.Pharm, Pharm.D, M.Sc Biotechnology, Microbiology",
    overview: "Manage end-to-end clinical trial data pipelines, validate electronic Case Report Forms (eCRFs), and resolve investigator query forms.",
  },
  {
    title: "4. Regulatory Affairs & Medical Writing",
    slug: "/courses/regulatory-affairs",
    salary: "₹4.2L – ₹6.5L (Entry) → ₹16L–₹26L (5+ Yrs)",
    software: "eCTD Lorenz DocuBridge, Veeva Vault, ICH E3 Guidelines",
    hiring: "Sun Pharma, AstraZeneca, Sanofi, Dr. Reddy's",
    degrees: "Pharm.D, M.Pharm, M.Sc Chemistry, Life Sciences",
    overview: "Author Clinical Study Reports (CSRs) and compile Electronic Common Technical Document (eCTD) dossiers for US FDA and EMA submissions.",
  },
];

function HealthcareCareersPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B3F8B] font-bold">Healthcare Careers</span>
        </nav>

        {/* Hero Banner */}
        <header className="space-y-4 pb-8 border-b border-stone-200">
          <PremiumChip variant="navy" size="md">
            2026 INDUSTRY GUIDE
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">
            High-Paying Corporate Healthcare Careers in India
          </h1>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-3xl">
            An empirical breakdown of the top 6 career tracks in life-sciences Global Capability Centers (GCCs), including day-one database requirements, starting CTC brackets, and eligibility criteria.
          </p>
        </header>

        {/* Career Tracks List */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Top Healthcare Career Pathways for Freshers
          </h2>

          <div className="grid gap-6">
            {CAREER_LIST.map((track, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-xl font-bold text-[#1B3F8B]">
                    {track.title}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {track.salary}
                  </span>
                </div>

                <p className="text-sm text-stone-700 font-sans leading-relaxed">
                  {track.overview}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">REQUIRED SOFTWARE TOOLS</span>
                    <span className="text-stone-900 font-medium">{track.software}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">TIER-1 HIRING EMPLOYERS</span>
                    <span className="text-[#1B3F8B] font-medium">{track.hiring}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 font-sans">
                    🎓 <strong>Eligible Degrees:</strong> {track.degrees}
                  </span>
                  <Link
                    to={track.slug}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B3F8B] hover:text-[#153270] transition-colors"
                  >
                    <span>View Track Syllabus</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Free Workshop Banner */}
        <aside className="rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
            FREE LIVE REQUISITION BRIEFING
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Learn How to Clear Tier-1 GCC Technical Rounds
          </h3>
          <p className="text-sm text-stone-600 font-sans max-w-2xl mx-auto">
            Attend our 60-minute masterclass where senior directors deconstruct 300+ real job descriptions from Novartis, IQVIA, and Parexel.
          </p>
          <Link
            to="/healthcare-career-workshop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F8B] text-slate-50 font-bold text-xs shadow-sm hover:bg-[#153270] transition-all"
          >
            <span>Reserve Free Seat For Masterclass</span>
            <ArrowRight className="h-4 w-4 text-slate-50" />
          </Link>
        </aside>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
