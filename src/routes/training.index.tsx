import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, ShieldCheck, CheckCircle2, AlertCircle, FileText, Compass, Sparkles } from "lucide-react";
import { COURSES } from "@/data/courses";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
              ARZON ROLE PREPARATION SYSTEM
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Train for Roles,{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Not Courses
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Every Arzon program starts with a specific industry role description, then works backward into required software fluency, practical case assignments, applied internships, and interview readiness.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-stone-600">
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                12-WEEK BLENDED MODEL
              </span>
            </Floating3dBadge>
            <span>·</span>
            <span>APPLIED INTERNSHIP INCLUDED</span>
            <span>·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
              ISO 9001 VERIFIABLE CREDENTIAL
            </span>
          </div>
        </div>
      </section>

      {/* Program Catalogue Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 z-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-4">
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1B3F8B] text-slate-50 shadow-sm font-sans"
                  : "bg-white tone-light text-stone-700 hover:bg-stone-100 border border-stone-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Training Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((c) => (
            <Interactive3dCard
              key={c.slug}
              maxTilt={8}
              className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Card3dLayer translateZ={25} className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    12-WEEK BLENDED TRACK
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {c.category}
                  </span>
                </Card3dLayer>

                <Card3dLayer translateZ={35}>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                    Target Role: <strong className="text-stone-900 font-serif">{c.roleTitle ?? c.title}</strong>
                  </p>
                </Card3dLayer>

                <Card3dLayer translateZ={40}>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {c.blurb}
                  </p>
                </Card3dLayer>

                {/* Practical Tools */}
                <Card3dLayer translateZ={45} className="space-y-2 pt-2 border-t border-stone-200">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    SOFTWARE &amp; DATABASES TAUGHT
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.jd.topSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-300 text-stone-900 text-xs font-mono font-bold shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card3dLayer>

                {/* Eligibility Note */}
                <Card3dLayer translateZ={45} className="space-y-1 pt-2 border-t border-stone-200 text-xs text-stone-600 font-sans">
                  <span className="font-mono text-[10px] font-bold uppercase text-stone-500 block">
                    RECOMMENDED ELIGIBILITY
                  </span>
                  <p>B.Pharm, Pharm.D, M.Pharm, B.Sc / M.Sc Life Sciences, Biotechnology</p>
                </Card3dLayer>
              </div>

              <Card3dLayer translateZ={50} className="pt-4 border-t border-stone-200 space-y-3">
                <Link
                  to={`/courses/${c.slug}` as any}
                  className="inline-flex items-center justify-between w-full h-11 px-5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-colors shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Explore Curriculum &amp; Internship</span>
                  <ArrowRight className="h-4 w-4 text-slate-50" />
                </Link>

                <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Non-Guarantee Policy: Skills &amp; Internship</span>
                  <span>ISO 9001 Verifiable</span>
                </div>
              </Card3dLayer>
            </Interactive3dCard>
          ))}
        </div>
      </section>

      {/* Non-Guarantee Transparency Disclosure */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 z-10">
        <div className="rounded-2xl bg-white/90 tone-light border border-stone-300 p-6 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-bold uppercase">
            <AlertCircle className="h-4 w-4 text-[#1B3F8B]" />
            <span>ARZON RESPONSIBILITY &amp; TRANSPARENCY GUARANTEE</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            Arzon provides structured role training, practical database case processing, applied internships, ISO-verifiable credentials, and direct technical interview preparation. Arzon does not promise or guarantee employment, job selection, or minimum salary outcomes, as final hiring decisions remain solely at the discretion of individual employers.
          </p>
        </div>
      </section>
    </div>
  );
}
