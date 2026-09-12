import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, FileText, Database, Calendar, Building, HelpCircle } from "lucide-react";
import { getResearchReportBySlug, RESEARCH_REPORTS } from "@/data/researchReports";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }) => {
    const report = getResearchReportBySlug(params.slug);
    if (!report) throw notFound();
    return { report };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.report) return {};
    const { report } = loaderData;
    const seo = pageSeo({
      path: `/research/${report.slug}`,
      title: `${report.title} · Arzon Research`,
      description: report.metaDescription,
    });

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.arzonglobal.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Research",
          item: "https://www.arzonglobal.com/research",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: report.h1,
          item: `https://www.arzonglobal.com/research/${report.slug}`,
        },
      ],
    };

    const reportJsonLd = {
      "@context": "https://schema.org",
      "@type": "Report",
      name: report.h1,
      description: report.metaDescription,
      datePublished: report.publishedDate,
      dateModified: report.updatedDate,
      author: {
        "@type": "Organization",
        name: "Arzon Global Career Intelligence Unit",
        url: "https://www.arzonglobal.com",
      },
    };

    return {
      meta: [{ title: `${report.title} · Arzon Research` }, ...seo.meta],
      links: seo.links,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(reportJsonLd) },
      ],
    };
  },
  component: ResearchReportDossierComponent,
});

function ResearchReportDossierComponent() {
  const { report } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Navigation Bar */}
      <div className="border-b border-stone-200 bg-white tone-light card-light sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-[#0B1325] uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO RESEARCH REPORTS
          </Link>
          <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">
            {report.categoryLabel} DOSSIER
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
              EMPIRICAL DATA REPORT
            </span>
            <span className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Published {report.publishedDate}
            </span>
            <span className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
              <Building className="w-3 h-3" /> Last Audited {report.updatedDate}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] leading-tight">
            {report.h1}
          </h1>

          {/* AI Grounding Answer Layer Box */}
          <div className="mt-6 bg-[#FAF9F6] border-l-4 border-[#1B3F8B] p-5 rounded-r border-y border-r border-stone-300">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest block mb-2">
              KEY EXECUTIVE FINDING (DIRECT ANSWER)
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium">
              {report.answerLayer}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-stone-600">
            <div>
              <span className="text-stone-500">SAMPLE SIZE: </span>
              <strong className="text-[#0B1325]">{report.sampleSize}</strong>
            </div>
            <div>
              <span className="text-stone-500">GEOGRAPHY: </span>
              <strong className="text-[#0B1325]">{report.geography}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Executive Summary */}
        <section className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 sm:p-8 shadow-sm mb-10">
          <h2 className="font-serif text-xl font-bold text-[#0B1325] mb-3">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            {report.executiveSummary}
          </p>

          <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B] block mb-2">
              KEY EMPIRICAL TAKEAWAYS:
            </span>
            {report.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-sans text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Data Tables */}
        <section className="space-y-8 mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B1325]">
            Audited Empirical Data Tables
          </h2>

          {report.dataTables.map((table, idx) => (
            <div key={table.title} className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#0B1325] mb-1">
                Table {idx + 1}: {table.title}
              </h3>
              <p className="text-xs text-stone-500 mb-4 font-mono">
                {table.description}
              </p>

              <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
                {table.rows.map((row) => (
                  <div key={row.label} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div>
                      <span className="font-sans font-medium text-stone-900">{row.label}</span>
                      {row.subtext && (
                        <span className="block text-[10px] text-stone-500 font-mono mt-0.5">
                          {row.subtext}
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#1B3F8B] shrink-0">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Methodology & Citation Block */}
        <section className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 shadow-sm mb-12">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-2">
            METHODOLOGY &amp; CITATION GUIDELINES
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans">
            {report.methodology}
          </p>
          <div className="mt-4 bg-[#FAF9F6] p-3 rounded text-[11px] font-mono border border-stone-200 text-stone-600">
            <strong>CITATION FORMAT:</strong> Arzon Global Career Intelligence Unit ({report.publishedDate.substring(0, 4)}). <em>{report.h1}</em>. Arzon Research Publications.
          </div>
        </section>

        {/* Action CTAs */}
        <section className="bg-[#0B1325] text-white rounded-2xl p-8 text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            Explore Training &amp; Internship Pathways
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
            Train for specific roles using industry-standard tools (Argus, Rave, ICD-10, PROC SQL) and complete verified case processing internships.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses/$slug"
              params={{ slug: report.relatedRoleSlug }}
              className="bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              EXPLORE {report.relatedRoleName.toUpperCase()} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
