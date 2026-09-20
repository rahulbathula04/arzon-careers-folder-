import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, ShieldCheck, CheckCircle2, FileText, ChevronRight } from "lucide-react";
import { COURSES } from "@/data/courses";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/training/")({
  head: () => {
    const seo = pageSeo({
      path: "/training",
      title: "Role-Focused Healthcare Training & Internships · Arzon Global",
      description:
        "12-week blended role training in Pharmacovigilance (Oracle Argus), Medical Coding (ICD-10), CDM (RAVE), and Clinical SAS. Includes applied internship and ISO credential.",
      image: "/og/internships.jpg",
    });
    return {
      meta: [{ title: "Role-Focused Healthcare Training & Internships · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Arzon Global — Role-Focused Training Tracks",
            numberOfItems: COURSES.length,
            itemListElement: COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Course",
                name: c.title,
                description: c.blurb,
                url: `https://www.arzoncareers.in/courses/${c.slug}`,
                educationalCredentialAwarded: c.certification,
              },
            })),
          }),
        },
      ],
    };
  },
  component: TrainingIndexComponent,
});

function TrainingIndexComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCourses = COURSES.filter((c) => {
    if (selectedCategory === "all") return true;
    return c.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ROLE-FOCUSED READINESS SYSTEM
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Train for Roles, Not Generic Courses
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Every Arzon program starts with a specific industry role specification, then works backward into required software fluency, practical case assignments, applied internships, and ACRI readiness benchmarking.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-bold">
              12-WEEK BLENDED MODEL
            </span>
            <span>&bull;</span>
            <span>APPLIED INTERNSHIP INCLUDED</span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      {/* Program Catalogue Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
          <span className="font-mono text-xs font-bold uppercase text-stone-500 mr-2">Domain:</span>
          {[
            { id: "all", label: "All Role Tracks" },
            { id: "safety", label: "Drug Safety & PV" },
            { id: "coding", label: "Medical Coding" },
            { id: "clinical", label: "Clinical Data & SAS" },
            { id: "regulatory", label: "Regulatory Affairs" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0B1325] text-slate-50 shadow-xs"
                  : "bg-white tone-light text-stone-700 hover:bg-stone-100 border border-stone-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Training Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.slug}
              className="rounded-xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded">
                    12-WEEK BLENDED TRACK
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {c.category}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-2">
                    {c.blurb}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Includes 4-week applied capstone internship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#1B3F8B] shrink-0" />
                    <span>{c.certification}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  to={`/courses/${c.slug}`}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B3F8B] hover:text-[#0B1325] inline-flex items-center gap-1"
                >
                  <span>View Curriculum</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/career-engine/test"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  Test Fit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
