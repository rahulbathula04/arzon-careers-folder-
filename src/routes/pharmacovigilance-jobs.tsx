import { createFileRoute, Link } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Award,
  BookOpen,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/pharmacovigilance-jobs")({
  head: () => {
    const seoData = pageSeo({
      path: "/pharmacovigilance-jobs",
      title: "Pharmacovigilance Jobs for Freshers 2026 · Oracle Argus & Salary",
      description:
        "Explore entry-level Pharmacovigilance jobs in India. Learn Oracle Argus Safety, ICSR case processing, MedDRA coding, and salary trajectories in Tier-1 GCCs.",
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
            "@type": "Course",
            name: "Pharmacovigilance Operations & Oracle Argus Safety Certification",
            description: "Industry-aligned drug safety training covering Oracle Argus Safety 8.4, MedDRA 27.0, ICSR narrative writing, and US FDA 21 CFR Part 11.",
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              sameAs: "https://arzoncareers.in",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does an entry-level Pharmacovigilance Associate do daily?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PV Associates triage spontaneous and clinical trial adverse event reports, enter data into Oracle Argus Safety, code terms in MedDRA, author medical narratives, and submit expedited 7/15-day safety reports to health authorities.",
                },
              },
              {
                "@type": "Question",
                name: "Which pharma companies hire Pharmacovigilance freshers in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Novartis (Hyderabad), IQVIA (Bengaluru/Kochi), Parexel (Hyderabad/Bengaluru), Pfizer (Chennai), Dr. Reddy's (Hyderabad), and Cognizant Life Sciences hire extensive fresher cohorts annually.",
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
                name: "Pharmacovigilance Jobs",
                item: "https://arzoncareers.in/pharmacovigilance-jobs",
              },
            ],
          }),
        },
      ],
    };
  },
  component: PharmacovigilanceJobsPage,
});

function PharmacovigilanceJobsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B3F8B] font-bold">Pharmacovigilance Jobs</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200">
          <PremiumChip variant="navy" size="md">
            2026 DRUG SAFETY CAREER GUIDE
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">
            Pharmacovigilance Jobs &amp; Oracle Argus Operations in India
          </h1>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-3xl">
            A practical guide to securing high-paying Drug Safety Associate and ICSR case processing roles at Tier-1 Global Capability Centers.
          </p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-[#1B3F8B]">₹4.0L–₹5.5L</span>
            <p className="text-xs text-stone-600 font-sans">Starting Fresher CTC</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-[#8A6D1F]">₹14L–₹22L</span>
            <p className="text-xs text-stone-600 font-sans">5-Year Earning Potential</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-emerald-700">Oracle Argus</span>
            <p className="text-xs text-stone-600 font-sans">Core Enterprise Database</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-stone-800">84%</span>
            <p className="text-xs text-stone-600 font-sans">JD ATS Tool Frequency</p>
          </div>
        </div>

        {/* Core Operational Workflows */}
        <section className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Core Pharmacovigilance Tasks in Global Capability Centers
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">ICSR Case Triage</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                Evaluating spontaneous reports for minimum 4 criteria: identifiable patient, reporter, suspect drug, and adverse event.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">MedDRA 27.0 Coding</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                Assigning Lowest Level Terms (LLT) and mapping to Preferred Terms (PT) and System Organ Classes (SOC).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">Medical Narrative</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                Drafting chronological clinical narratives summarizing patient history, concomitant medications, and dechallenge/rechallenge.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-sans">
              Top hiring employers: <strong>Novartis, IQVIA, Parexel, Pfizer, Dr. Reddy's, Cognizant</strong>
            </span>
            <Link
              to="/pv-associate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F8B] text-slate-50 font-bold text-xs shadow-sm hover:bg-[#153270] transition-all"
            >
              <span>Explore Pharmacovigilance Associate Programme</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
