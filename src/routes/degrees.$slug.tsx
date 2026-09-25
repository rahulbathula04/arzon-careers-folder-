import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, BookOpen, AlertCircle, ChevronRight } from "lucide-react";
import { getDegreePathway } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/degrees/$slug")({
  loader: ({ params }) => {
    const pathway = getDegreePathway(params.slug);
    if (!pathway) {
      throw notFound();
    }
    return { pathway };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.pathway;
    if (!p) return {};
    const seo = pageSeo({
      path: `/degrees/${p.slug}`,
      title: `${p.shortTitle} · Healthcare Role Pathways & Training`,
      description: p.metaDescription,
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: `${p.shortTitle} · Healthcare Role Pathways & Training` }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalCredential",
            name: p.degreeName,
            description: p.overview,
            credentialCategory: "Degree Pathway",
            competencyRequired: p.coreSubjects.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Degrees", item: "https://www.arzoncareers.in/degrees" },
              { "@type": "ListItem", position: 3, name: p.degreeName, item: `https://www.arzoncareers.in/degrees/${p.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: DegreeSlugComponent,
});

function DegreeSlugComponent() {
  const { pathway } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Header Banner */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Link to="/degrees" className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline uppercase flex items-center gap-1">
              <span>&larr; ALL DEGREE PATHWAYS</span>
            </Link>
            <span className="text-stone-400">&bull;</span>
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">{pathway.degreeName}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Careers After {pathway.degreeName}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-3xl">
            {pathway.overview}
          </p>

          {/* Academic Core Subjects */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-xs font-bold uppercase text-stone-500 mr-2">ACADEMIC FOUNDATION:</span>
            {pathway.coreSubjects.map((sub, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 text-xs font-mono font-bold">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Section 1: Eligible Roles */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                ROLE COMPATIBILITY
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Verified Industry Role Alignment
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Roles commonly hiring graduates from this degree background, supported by 300+ public JD analyses.
              </p>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
              VERIFIED FIT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathway.eligibleRoles.map((role, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded">
                      {role.fitLevel}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                      {role.typicalStartingCtc}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {role.roleName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {role.whyFit}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    REQUIRED DATABASE &amp; TOOLING SKILLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.keySkillsNeeded.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-900 text-[11px] font-mono font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Arzon Role-Focused Training Options */}
        <section className="space-y-6 rounded-2xl bg-white tone-light border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Arzon Role Training &amp; Applied Internship Fit
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Structured preparation programs designed to bridge university theory with GCC day-one requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathway.arzonTrainingTracks.map((track, i) => (
              <div key={i} className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">
                    {track.duration}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                    {track.trackName}
                  </h3>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-stone-500 block">
                    SOFTWARE &amp; TOOLS TAUGHT
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.keyTools.map((t, k) => (
                      <span key={k} className="px-2 py-0.5 rounded bg-white tone-light border border-stone-200 text-stone-900 text-xs font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:underline pt-2 block"
                >
                  <span>View Full Curriculum &amp; Internship Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Evidence Disclaimer */}
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 flex items-start gap-3 text-xs text-stone-700 font-sans">
            <AlertCircle className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
            <p>{pathway.eligibilityDisclaimer}</p>
          </div>
        </section>

        {/* Section 3: Transition Strategy */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Recommended Preparation Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pathway.transitionStrategy.map((strat) => (
              <div key={strat.step} className="rounded-xl border border-stone-200 bg-white tone-light p-5 space-y-2 shadow-xs">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 inline-block">
                  STEP 0{strat.step}
                </span>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {strat.title}
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  {strat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: FAQ */}
        {pathway.faq && pathway.faq.length > 0 && (
          <section className="space-y-6 border-t border-stone-200 pt-8">
            <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#1B3F8B]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {pathway.faq.map((item, i) => (
                <div key={i} className="rounded-xl border border-stone-200 bg-white tone-light p-5 space-y-2 shadow-xs">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ACRI Certification Conversion Panel */}
        <section className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              OFFICIAL CLINICAL READINESS INDEX
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Assess Your Pharmacovigilance Capability
            </h3>
            <p className="font-sans text-xs text-stone-300 max-w-xl">
              25-minute calibrated simulation measuring 9 core PV competencies. Receive an official ACRI readiness score and verified industry credential.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/acri/pharmacovigilance-certification"
              className="bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
            >
              APPLY FOR INVITE &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
