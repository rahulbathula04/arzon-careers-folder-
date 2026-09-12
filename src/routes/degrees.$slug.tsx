import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, BookOpen, AlertCircle, Compass, Sparkles } from "lucide-react";
import { getDegreePathway } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Header Banner */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-10 sm:py-14 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Link to="/degrees" className="font-mono text-xs font-bold text-[#1B3F8B] hover:underline uppercase flex items-center gap-1">
              <span>← ALL DEGREE PATHWAYS</span>
            </Link>
            <span className="text-stone-400">·</span>
            <span className="font-mono text-xs text-stone-500 uppercase font-bold">{pathway.degreeName}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Careers After{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              {pathway.degreeName}
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-3xl">
            {pathway.overview}
          </p>

          {/* Academic Core Subjects */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-xs font-bold uppercase text-stone-500 mr-2">ACADEMIC FOUNDATION:</span>
            {pathway.coreSubjects.map((sub, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-stone-100/90 border border-stone-300 text-stone-800 text-xs font-mono font-bold shadow-2xs">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 z-10">
        {/* Section 1: Eligible Roles */}
        <section className="space-y-6">
          <div className="border-b border-stone-300 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Verified Industry Role Alignment
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Roles commonly hiring graduates from this degree background, supported by 300+ public JD analysis.
              </p>
            </div>
            <Floating3dBadge duration={4} delay={0.2}>
              <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                VERIFIED FIT ✦
              </span>
            </Floating3dBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathway.eligibleRoles.map((role, idx) => (
              <Interactive3dCard
                key={idx}
                maxTilt={6}
                className="rounded-2xl border border-stone-300 bg-white/95 tone-light p-6 shadow-md hover:shadow-lg transition-all space-y-4"
              >
                <Card3dLayer translateZ={25} className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                    {role.fitLevel}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#8A6D1F]">
                    {role.typicalStartingCtc}
                  </span>
                </Card3dLayer>

                <Card3dLayer translateZ={35}>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {role.roleName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans mt-2">
                    {role.whyFit}
                  </p>
                </Card3dLayer>

                <Card3dLayer translateZ={40} className="pt-2 border-t border-stone-200 space-y-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    REQUIRED DATABASE &amp; TOOLING SKILLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.keySkillsNeeded.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-900 text-[11px] font-mono font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card3dLayer>
              </Interactive3dCard>
            ))}
          </div>
        </section>

        {/* Section 2: Arzon Role-Focused Training Options */}
        <section className="space-y-6 rounded-3xl bg-white/95 tone-light border border-stone-300 p-6 sm:p-8 shadow-md">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Arzon Role Training &amp; Applied Internship Fit
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Structured preparation programs designed to bridge university theory with GCC day-one requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathway.arzonTrainingTracks.map((track, i) => (
              <div key={i} className="rounded-2xl border border-stone-200 bg-stone-50/90 p-5 space-y-4">
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
                      <span key={k} className="px-2.5 py-0.5 rounded bg-white tone-light border border-stone-300 text-stone-900 text-xs font-mono font-bold shadow-2xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/training"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B3F8B] hover:underline pt-2 block"
                >
                  <span>View Full Curriculum &amp; Internship Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Evidence Disclaimer */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-xs text-amber-900 font-sans">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
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
              <div key={strat.step} className="rounded-2xl border border-stone-300 bg-white/95 tone-light p-5 space-y-2 shadow-xs">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded-md inline-block">
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
          <section className="space-y-6 border-t border-stone-300 pt-8">
            <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#1B3F8B]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {pathway.faq.map((item, i) => (
                <div key={i} className="rounded-2xl border border-stone-200 bg-white/95 tone-light p-5 space-y-2 shadow-xs">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
