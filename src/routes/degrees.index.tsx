import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, BookOpen, ShieldCheck, CheckCircle2, Building2, Sparkles, Compass } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export const Route = createFileRoute("/degrees/")({
  head: () => {
    const seo = pageSeo({
      path: "/degrees",
      title: "University Degree-to-Career Pathways · Arzon Global",
      description:
        "Map your B.Pharm, Pharm.D, M.Pharm, or B.Sc/M.Sc Life Sciences degree to verified healthcare role training and applied internship tracks.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "University Degree-to-Career Pathways · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Arzon Degree-to-Role Pathways",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: DEGREE_PATHWAYS.length,
            itemListElement: DEGREE_PATHWAYS.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.degreeName,
              url: `https://www.arzoncareers.in/degrees/${d.slug}`,
            })),
          }),
        },
      ],
    };
  },
  component: DegreesIndexComponent,
});

function DegreesIndexComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B3F8B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white/95 tone-light backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto space-y-5">
          {/* Eyebrow Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                ARZON DEGREE-TO-ROLE ARCHITECTURE · 2026
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
              <Floating3dBadge duration={4} delay={0.2}>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">
                  300+ JDs SCRAPED
                </span>
              </Floating3dBadge>
              <span>·</span>
              <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ISO 9001 VERIFIED
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] max-w-4xl">
            Careers After Your Degree:{" "}
            <AnimatedGradientText className="font-serif italic font-bold">
              Train for Roles, Not Courses
            </AnimatedGradientText>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans font-normal">
            University curricula teach theoretical definitions. Global capability centers (GCCs) and CROs hire for{" "}
            <strong className="text-[#1B3F8B] underline decoration-[#1B3F8B]/30 underline-offset-4 font-bold">
              day-one database fluency
            </strong>{" "}
            in Oracle Argus, MedDRA, Medidata RAVE, ICD-10, and SAS. Map your qualification directly to target industry roles.
          </p>
        </div>
      </section>

      {/* Degree Cards Grid */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEGREE_PATHWAYS.map((degree) => (
            <Interactive3dCard
              key={degree.slug}
              maxTilt={8}
              className="rounded-3xl border border-stone-300 bg-white/95 tone-light p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all backdrop-blur-md flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Card3dLayer translateZ={25} className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-100/90 border border-stone-200 px-2.5 py-1 rounded-md">
                    {degree.typicalDuration}
                  </span>
                  <Floating3dBadge duration={3.5} delay={0.3}>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                      {degree.eligibleRoles.length} Role Alignment Tracks
                    </span>
                  </Floating3dBadge>
                </Card3dLayer>

                <Card3dLayer translateZ={35}>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {degree.degreeName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans mt-2 line-clamp-3">
                    {degree.overview}
                  </p>
                </Card3dLayer>

                {/* Eligible Roles snippet */}
                <Card3dLayer translateZ={40} className="space-y-2 pt-3 border-t border-stone-200">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    TARGET GCC INDUSTRY ROLES
                  </span>
                  <ul className="space-y-1.5">
                    {degree.eligibleRoles.map((role, i) => (
                      <li key={i} className="text-xs text-stone-800 font-medium flex items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#1B3F8B] shrink-0" />
                          <span>{role.roleName}</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#8A6D1F] shrink-0">
                          {role.typicalStartingCtc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card3dLayer>
              </div>

              <Card3dLayer translateZ={45}>
                <Link
                  to={`/degrees/${degree.slug}` as any}
                  className="inline-flex items-center justify-between w-full h-11 px-5 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Explore {degree.shortTitle}</span>
                  <ArrowRight className="h-4 w-4 text-slate-50" />
                </Link>
              </Card3dLayer>
            </Interactive3dCard>
          ))}
        </div>
      </section>

      {/* Methodology & Trust Footer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 z-10 relative">
        <div className="rounded-3xl bg-white/90 tone-light border border-stone-300 p-6 sm:p-8 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-[#1B3F8B]" />
            <span>EMPIRICAL RESEARCH &amp; EVIDENCE METHODOLOGY</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            Degree pathways are compiled from an empirical study of 300+ public job descriptions published by global capability centers (GCCs), pharmaceutical MNCs, and contract research organizations in Hyderabad, Bangalore, and Pune. Academic prerequisites are mapped against entry-level database requirements.
          </p>
        </div>
      </section>
    </div>
  );
}
