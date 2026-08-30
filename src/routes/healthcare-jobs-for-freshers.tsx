import { createFileRoute, Link } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/healthcare-jobs-for-freshers")({
  head: () => {
    const seoData = pageSeo({
      path: "/healthcare-jobs-for-freshers",
      title: "Healthcare Jobs for Freshers in India · 2026 Hiring Guide",
      description:
        "Explore verified fresher healthcare jobs across Tier-1 GCCs in Hyderabad, Bengaluru & Mumbai. Pharmacovigilance, Medical Coding & Clinical Data Management roles.",
      image: "/og/internships.jpg",
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: "Junior Pharmacovigilance Associate (ICSR)",
            description: "Process individual case safety reports (ICSRs) in Oracle Argus Safety. MedDRA medical coding and expedited regulatory report authoring.",
            identifier: {
              "@type": "PropertyValue",
              name: "Novartis GCC",
              value: "NOV-PV-2026-01",
            },
            datePosted: "2026-08-01",
            validThrough: "2026-12-31",
            employmentType: "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: "Novartis Global Service Center",
              sameAs: "https://www.novartis.com",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
            },
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "INR",
              value: {
                "@type": "QuantitativeValue",
                minValue: 400000,
                maxValue: 580000,
                unitText: "YEAR",
              },
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
                name: "Can freshers get hired directly in Tier-1 pharma GCCs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, companies like Novartis, IQVIA, and Parexel actively hire freshers who demonstrate practical software fluency in Oracle Argus, MedDRA, and Medidata RAVE.",
                },
              },
              {
                "@type": "Question",
                name: "What is the average starting salary for healthcare freshers in Hyderabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Starting packages range from ₹3.8L to ₹5.5L per annum for Medical Coders and PV Associates, with fast-track progression to ₹8L+ by year 3.",
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
                name: "Healthcare Jobs for Freshers",
                item: "https://arzoncareers.in/healthcare-jobs-for-freshers",
              },
            ],
          }),
        },
      ],
    };
  },
  component: HealthcareJobsFreshersPage,
});

const FRESHER_JOB_ROLES = [
  {
    role: "Junior Drug Safety Associate",
    company: "Novartis / Parexel / IQVIA",
    location: "Hyderabad / Bengaluru",
    ctc: "₹4.2L – ₹5.8L",
    qualification: "Pharm.D / B.Pharm / M.Pharm / Life Sciences",
    skills: ["Oracle Argus Safety 8.4", "MedDRA 27.0", "ICSR Processing", "CIOMS-I"],
  },
  {
    role: "Certified Medical Coder Trainee",
    company: "Optum / Omega Healthcare / Episource",
    location: "Hyderabad / Chennai / Remote",
    ctc: "₹3.8L – ₹5.0L",
    qualification: "B.Pharm / B.Sc Life Sciences / Biotechnology / Nursing",
    skills: ["ICD-10-CM", "CPT-4 Coding", "HCPCS", "Anatomy & Physiology"],
  },
  {
    role: "Clinical Data Coordinator",
    company: "IQVIA / Syneos Health / ICON plc",
    location: "Bengaluru / Mumbai",
    ctc: "₹4.0L – ₹5.2L",
    qualification: "B.Pharm / Pharm.D / M.Sc Biotechnology / Microbiology",
    skills: ["Medidata RAVE", "ICH-GCP E6(R2)", "eCRF Validation", "Query Resolution"],
  },
  {
    role: "Junior Statistical Programmer (SAS)",
    company: "Cytel / Wipro / Cognizant",
    location: "Bengaluru / Pune",
    ctc: "₹5.0L – ₹7.2L",
    qualification: "B.Pharm / M.Pharm / B.Sc Statistics / Computer Science",
    skills: ["Base SAS 9.4", "CDISC SDTM", "ADaM Datasets", "Clinical TLFs"],
  },
];

function HealthcareJobsFreshersPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B3F8B] font-bold">Healthcare Jobs for Freshers</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 pb-8 border-b border-stone-200">
          <PremiumChip variant="gold" size="md">
            2026 FRESHER RECRUITMENT PORTAL
          </PremiumChip>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.12]">
            Healthcare Jobs for Freshers in India (2026)
          </h1>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-3xl">
            A comprehensive guide to entry-level requisitions across Pharmacovigilance, Medical Coding, Clinical Data Management, and Clinical SAS in Tier-1 GCCs.
          </p>
        </header>

        {/* Open Job Profiles Grid */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Active Entry-Level Job Categories
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {FRESHER_JOB_ROLES.map((job, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-stone-200 bg-white tone-light p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      FRESHER ELIGIBLE
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                      {job.ctc}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {job.role}
                  </h3>

                  <div className="space-y-1 text-xs text-stone-600 font-mono">
                    <p className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-stone-400" />
                      <span>{job.company}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-stone-400" />
                      <span>{job.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-stone-700 font-sans pt-1">
                    🎓 <strong>Eligibility:</strong> {job.qualification}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-[10px] border border-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <Link
                    to="/healthcare-career-workshop"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:text-[#153270]"
                  >
                    <span>Learn How to Clear Interviews</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Closing Action */}
        <aside className="rounded-2xl border border-stone-300 bg-[#FAF8F5] p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
            NEED HELP PICKING THE RIGHT TRACK?
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Take the 90-Second Career Engine Assessment
          </h3>
          <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto">
            Our algorithmic diagnostic evaluates your academic background and matches you to the highest-probability healthcare career path.
          </p>
          <Link
            to="/career-engine/start"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F8B] text-slate-50 font-bold text-xs shadow-sm hover:bg-[#153270] transition-all"
          >
            <span>Start Free 90-Sec Assessment</span>
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
