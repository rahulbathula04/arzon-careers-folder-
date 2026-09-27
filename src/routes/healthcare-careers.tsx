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
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

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
    <main className="arzon-v2-page min-h-screen bg-white tone-light">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE"
        title="See the healthcare roles, skills and employers before you choose a programme."
        description="Compare common healthcare career paths, the tools they use, the qualifications often requested and the programme path Arzon offers for each role."
      
        mobileImageSrc="/images/bpharm-students-group.jpg"
        mobileImageAlt="Indian B.Pharm students preparing for healthcare careers">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Start Career Assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-v2-button-secondary">
            Explore Programmes
          </Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="START WITH CAREER CLARITY"
        title="Explore the role before you choose the programme."
        description="Use the free assessment to identify roles worth exploring, or continue researching the work, skills and employers behind each pathway."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Browse Role Profiles"
        secondaryTo="/roles"
      />

      <div className="arzon-v2-container py-12 sm:py-16">
        {/* Career Tracks List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--arzon-ink)]">
            Top Healthcare Career Pathways for Freshers
          </h2>

          <div className="grid gap-6">
            {CAREER_LIST.map((track, idx) => (
              <article
                key={idx}
                className="arzon-v2-card p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--arzon-border)]">
                  <h3 className="font-serif text-xl font-bold text-[var(--arzon-blue-700)]">
                    {track.title}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[var(--arzon-amber-600)]">
                    {track.salary}
                  </span>
                </div>

                <p className="text-sm text-[var(--arzon-ink-soft)] font-sans leading-relaxed">
                  {track.overview}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
                  <div className="p-3 rounded-lg bg-[var(--arzon-surface-subtle)] border border-[var(--arzon-border)]">
                    <span className="text-[var(--arzon-ink-muted)] block text-[10px] uppercase font-bold">REQUIRED SOFTWARE TOOLS</span>
                    <span className="text-[var(--arzon-ink)] font-medium">{track.software}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--arzon-surface-subtle)] border border-[var(--arzon-border)]">
                    <span className="text-[var(--arzon-ink-muted)] block text-[10px] uppercase font-bold">TIER-1 HIRING EMPLOYERS</span>
                    <span className="text-[var(--arzon-blue-700)] font-medium">{track.hiring}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-[var(--arzon-ink-muted)] font-sans">
                    🎓 <strong>Eligible Degrees:</strong> {track.degrees}
                  </span>
                  <Link
                    to={track.slug}
                    className="arzon-v2-button-secondary inline-flex items-center gap-1.5 text-xs"
                  >
                    <span>View Career Path</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Free Workshop Banner */}
        <aside className="arzon-v2-card p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--arzon-teal-600)] bg-[var(--arzon-teal-100)] border border-[#BCE6DE] px-2.5 py-1 rounded">
            FREE LIVE REQUISITION BRIEFING
          </span>
          <h3 className="font-serif text-2xl font-bold text-[var(--arzon-ink)]">
            Learn How to Clear Tier-1 GCC Technical Rounds
          </h3>
          <p className="text-sm text-[var(--arzon-ink-soft)] font-sans max-w-2xl mx-auto">
            Attend our 60-minute masterclass where senior directors deconstruct 300+ real job descriptions from Novartis, IQVIA, and Parexel.
          </p>
          <Link
            to="/healthcare-career-workshop"
            className="arzon-v2-button-primary text-xs"
          >
            <span>Reserve Free Seat For Masterclass</span>
            <ArrowRight className="h-4 w-4 text-slate-50" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
