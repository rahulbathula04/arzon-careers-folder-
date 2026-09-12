import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Database, ShieldCheck, TrendingUp, Search } from "lucide-react";
import { RESEARCH_REPORTS } from "@/data/researchReports";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/research/")({
  head: () => {
    const seo = pageSeo({
      path: "/research",
      title: "Arzon Career Intelligence Empirical Research Reports",
      description:
        "Data-backed, timestamped empirical research reports analyzing healthcare JD skill frequencies, relocation costs, and degree mobility in India.",
    });
    return {
      meta: [{ title: "Arzon Career Intelligence Empirical Research Reports" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: ResearchHubComponent,
});

function ResearchHubComponent() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Header Banner */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
              ARZON GLOBAL · CAREER INTELLIGENCE RESEARCH ENGINE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">
            Empirical Healthcare Career Research Reports &amp; Data Indices
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Methodologically audited, timestamped research publications evaluating job description skill frequencies, relocation economic exposure, and pharmacy graduate degree mobility in India.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESEARCH_REPORTS.map((report) => (
            <article
              key={report.slug}
              className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                    {report.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">
                    AUDITED: {report.updatedDate}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0B1325] leading-snug">
                  <Link
                    to="/research/$slug"
                    params={{ slug: report.slug }}
                    className="hover:text-[#1B3F8B] transition-colors"
                  >
                    {report.h1}
                  </Link>
                </h2>

                {/* Direct Answer Layer Preview */}
                <div className="mt-4 bg-[#FAF9F6] border-l-2 border-[#1B3F8B] p-3 rounded-r text-xs text-stone-700 font-sans leading-relaxed">
                  <strong className="text-[#0B1325] font-mono text-[10px] block mb-1 uppercase">EXECUTIVE GROUNDING FINDING:</strong>
                  {report.answerLayer}
                </div>

                <p className="mt-4 font-sans text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {report.executiveSummary}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2 text-[10px] font-mono text-stone-500">
                  <span>SAMPLE: {report.sampleSize}</span>
                  <span>·</span>
                  <span>GEOGRAPHY: {report.geography}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-500">
                  {report.dataTables.length} Data Tables
                </span>
                <Link
                  to="/research/$slug"
                  params={{ slug: report.slug }}
                  className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                >
                  READ REPORT DOSSIER <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Link to Cost Calculator */}
        <section className="mt-16 bg-[#0B1325] text-white rounded-2xl p-8 sm:p-12 text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded inline-block mb-4">
            ● INTERACTIVE RESEARCH TOOL
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Calculate Your Career Relocation &amp; Training Cost Exposure
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Use Arzon’s interactive cost calculator to compare direct course tuition, PG rent, food, transport, and job-search windows.
          </p>
          <div className="mt-6">
            <Link
              to="/tools/cost-calculator"
              className="inline-flex items-center gap-2 bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              LAUNCH COST CALCULATOR <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
