import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, BookOpen, ShieldCheck, CheckCircle2, Building2, Compass, ChevronRight } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] font-sans pb-24">
      {/* Hero Header */}
      <section className="relative border-b border-stone-200 bg-white tone-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Eyebrow Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#1B3F8B]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
                DEGREE-TO-ROLE ARCHITECTURE &bull; 2026
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
              <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 font-bold">
                300+ JDs BENCHMARKED
              </span>
              <span>&bull;</span>
              <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ISO 9001 VERIFIED
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight max-w-4xl">
            Careers After Your Degree: Train for Roles, Not Generic Courses
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans font-normal">
            University curricula teach theoretical definitions. Global capability centers (GCCs) and CROs hire for{" "}
            <strong className="text-[#1B3F8B] font-bold">
              day-one database fluency
            </strong>{" "}
            in Oracle Argus, MedDRA, Medidata RAVE, ICD-10, and SAS. Map your qualification directly to target industry roles.
          </p>
        </div>
      </section>

      {/* Degree Cards Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEGREE_PATHWAYS.map((degree) => (
            <div
              key={degree.slug}
              className="rounded-xl border border-stone-200 bg-white tone-light p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded">
                    {degree.typicalDuration}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {degree.eligibleRoles.length} Role Tracks
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {degree.degreeName}
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mt-2 line-clamp-3">
                    {degree.overview}
                  </p>
                </div>

                {/* Eligible Roles snippet */}
                <div className="space-y-2 pt-3 border-t border-stone-100">
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
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <Link
                  to={`/degrees/${degree.slug}` as any}
                  className="inline-flex items-center justify-between w-full text-xs font-mono font-bold uppercase tracking-wider text-[#1B3F8B] hover:text-[#0B1325]"
                >
                  <span>Explore Pathway</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Assessment Banner */}
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Not sure which role best matches your degree specialization?
            </h3>
            <p className="text-xs text-stone-600">
              Take the ACRI occupational simulation to evaluate your clinical reasoning and data aptitude.
            </p>
          </div>
          <Link
            to="/career-engine/test"
            className="px-5 py-2.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Take Assessment</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
