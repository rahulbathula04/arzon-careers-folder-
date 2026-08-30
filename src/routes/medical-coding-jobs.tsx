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

export const Route = createFileRoute("/medical-coding-jobs")({
  head: () => {
    const seoData = pageSeo({
      path: "/medical-coding-jobs",
      title: "Medical Coding Jobs in India · CPC Certification & Salary Guide",
      description:
        "Guide to medical coding jobs in India for freshers. Learn ICD-10-CM, CPT-4 coding, CPC exam preparation, salary bands, and top hospital hiring partners.",
      image: "/og/medical-coding.jpg",
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
            name: "Medical Coding & US Healthcare Billing Certification",
            description: "Industry-aligned medical coding training covering ICD-10-CM, CPT-4, HCPCS, CPC certification, and US revenue cycle management.",
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
                name: "Is CPC certification mandatory for fresher medical coding jobs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "While non-certified coders start at ₹2.8L–₹3.5L, AAPC CPC-certified freshers command starting packages of ₹4.0L–₹5.5L with immediate hiring priority at Optum and Omega Healthcare.",
                },
              },
              {
                "@type": "Question",
                name: "What code sets are used in daily medical coding operations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Daily operations require ICD-10-CM for diagnosis coding, CPT-4 for surgical and outpatient procedures, and HCPCS Level II for medical supplies and injectables.",
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
                name: "Medical Coding Jobs",
                item: "https://arzoncareers.in/medical-coding-jobs",
              },
            ],
          }),
        },
      ],
    };
  },
  component: MedicalCodingJobsPage,
});

function MedicalCodingJobsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B3F8B] font-bold">Medical Coding Jobs</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200">
          <PremiumChip variant="navy" size="md">
            2026 CODING CAREER GUIDE
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">
            Medical Coding Jobs &amp; CPC Certification in India
          </h1>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-3xl">
            Learn how pharmacy, life-sciences, and nursing graduates can secure high-growth medical coding roles with US healthcare revenue cycle organizations.
          </p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-[#1B3F8B]">₹3.8L–₹5.0L</span>
            <p className="text-xs text-stone-600 font-sans">Starting Fresher CTC</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-[#8A6D1F]">₹12L–₹18L</span>
            <p className="text-xs text-stone-600 font-sans">5-Year Earning Potential</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-emerald-700">AAPC CPC</span>
            <p className="text-xs text-stone-600 font-sans">Gold Standard Credential</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white tone-light p-5 space-y-1 shadow-2xs">
            <span className="font-mono text-2xl font-bold text-stone-800">45,000+</span>
            <p className="text-xs text-stone-600 font-sans">Active Jobs in India</p>
          </div>
        </div>

        {/* Core Syllabus & Tools Breakdown */}
        <section className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Core Code Sets &amp; Clinical Knowledge Tested
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">ICD-10-CM</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                Diagnosis coding across all 21 organ system chapters, including etiology, manifestations, and sequelae.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">CPT-4 Coding</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                Evaluation and Management (E/M), surgical procedures, anesthesia, and modifier application (Mod 25, 59).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-[#1B3F8B] block text-sm">HCPCS Level II</span>
              <p className="text-stone-700 font-sans leading-relaxed">
                National codes for medical equipment, prosthetics, orthotics, and ambulance services for Medicare billing.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-sans">
              Top hiring employers: <strong>Optum, Omega Healthcare, GeBBS, Episource, CorroHealth</strong>
            </span>
            <Link
              to="/courses/medical-coding"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F8B] text-slate-50 font-bold text-xs shadow-sm hover:bg-[#153270] transition-all"
            >
              <span>Explore Medical Coding Programme</span>
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
