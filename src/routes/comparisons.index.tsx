import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Scale, CheckCircle2, ShieldCheck, TrendingUp, DollarSign } from "lucide-react";
import { ROLE_COMPARISONS } from "@/data/roleComparisons";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/comparisons/")({
  head: () => {
    const seo = pageSeo({
      path: "/comparisons",
      title: "Healthcare Career Role Comparisons 2026 · Arzon Global",
      description:
        "Side-by-side technical & financial comparisons of PV, Medical Coding, CDM, Regulatory Affairs, SAS Clinical & Healthcare Analytics roles in India.",
    });
    return {
      meta: [{ title: "Healthcare Career Role Comparisons 2026 · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: RoleComparisonsHubComponent,
});

function RoleComparisonsHubComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Header Banner */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
              ARZON GLOBAL · CAREER COMPARISON ENGINE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">
            Side-by-Side Healthcare Career Dossiers (2026)
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Data-backed comparative intelligence evaluating salary bands, software tool mastery, AI automation risk, and hiring manager expectations across India’s top healthcare capability hubs.
          </p>
        </div>
      </section>

      {/* Grid of Comparisons */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROLE_COMPARISONS.map((comp) => (
            <article
              key={comp.slug}
              className="bg-white tone-light card-light border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded">
                    {comp.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] text-stone-700">
                    REFRESHED: {comp.updatedDate}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0B1325] leading-snug">
                  <Link
                    to="/comparisons/$slug"
                    params={{ slug: comp.slug }}
                    className="hover:text-[#1B3F8B] transition-colors"
                  >
                    {comp.title}
                  </Link>
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {comp.executiveSummary}
                </p>

                {/* Quick Spec Matrix */}
                <div className="mt-6 grid grid-cols-2 gap-3 bg-[#FAF9F6] p-3.5 rounded-lg border border-stone-200 text-xs font-mono">
                  <div className="border-r border-stone-200 pr-2">
                    <span className="block text-[10px] font-bold uppercase text-stone-700">
                      {comp.roleA.name}
                    </span>
                    <span className="block text-[#0B1325] font-semibold mt-1">
                      {comp.roleA.entrySalary}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="block text-[10px] font-bold uppercase text-stone-700">
                      {comp.roleB.name}
                    </span>
                    <span className="block text-[#0B1325] font-semibold mt-1">
                      {comp.roleB.entrySalary}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-700">
                  {comp.dimensions.length} Technical Dimensions
                </span>
                <Link
                  to="/comparisons/$slug"
                  params={{ slug: comp.slug }}
                  className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                >
                  View Full Matrix <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Career Engine CTA Banner */}
        <section className="mt-16 bg-[#0B1325] text-white rounded-2xl p-8 sm:p-10 border border-stone-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded inline-block mb-4">
              ● CAREER FIT DIAGNOSTIC
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Not Sure Which Healthcare Track Fits Your Qualifications?
            </h2>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              Take Arzon’s Career Engine Diagnostic. We analyze your degree (B.Pharm, Pharm.D, Life Sciences, B.Tech) against 300+ live employer Job Descriptions to generate your instant role compatibility score.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/career-engine/start"
                className="inline-flex items-center gap-2 bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-5 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                START FIT TEST NOW <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
