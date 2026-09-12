import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Scale, CheckCircle2, AlertCircle, HelpCircle, ShieldCheck } from "lucide-react";
import { getRoleComparisonBySlug, ROLE_COMPARISONS } from "@/data/roleComparisons";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/comparisons/$slug")({
  loader: ({ params }) => {
    const comp = getRoleComparisonBySlug(params.slug);
    if (!comp) throw notFound();
    return { comp };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.comp) return {};
    const { comp } = loaderData;
    const seo = pageSeo({
      path: `/comparisons/${comp.slug}`,
      title: `${comp.title} · Arzon Global`,
      description: comp.metaDescription,
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
          name: "Comparisons",
          item: "https://www.arzonglobal.com/comparisons",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: comp.title,
          item: `https://www.arzonglobal.com/comparisons/${comp.slug}`,
        },
      ],
    };

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: comp.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return {
      meta: [{ title: `${comp.title} · Arzon Global` }, ...seo.meta],
      links: seo.links,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      ],
    };
  },
  component: RoleComparisonDossierComponent,
});

function RoleComparisonDossierComponent() {
  const { comp } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Navigation */}
      <div className="border-b border-stone-200 bg-white tone-light card-light sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/comparisons"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 hover:text-[#0B1325] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO COMPARISONS
          </Link>
          <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">
            {comp.categoryLabel} DOSSIER
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
              EMPIRICAL JD COMPARISON MATRIX
            </span>
            <span className="font-mono text-[10px] text-stone-700">
              REFRESHED: {comp.updatedDate}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1325] leading-tight">
            {comp.h1}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
            {comp.executiveSummary}
          </p>
        </div>
      </header>

      {/* Main Matrix Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Key Benchmark Snapshot Card */}
        <section className="bg-white tone-light card-light border border-stone-200 rounded-xl p-6 sm:p-8 shadow-sm mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-6 flex items-center gap-2">
            <Scale className="w-4 h-4" /> EXECUTIVE METRIC MATRIX
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Role A */}
            <div className="pt-4 md:pt-0 md:pr-6">
              <span className="font-serif text-xl font-bold text-[#0B1325] block">
                {comp.roleA.name}
              </span>
              <div className="mt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Entry Salary (0-2 Yrs):</span>
                  <span className="font-bold text-[#0B1325]">{comp.roleA.entrySalary}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Mid Salary (3-5 Yrs):</span>
                  <span className="font-bold text-[#0B1325]">{comp.roleA.midSalary}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">AI Automation Risk:</span>
                  <span className="font-bold text-emerald-700">{comp.roleA.aiRisk}</span>
                </div>
                <div className="pt-2">
                  <span className="text-stone-700 block mb-1 font-bold">Key Industry Tools:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.roleA.keyTools.map((t) => (
                      <span key={t} className="bg-stone-100 text-stone-800 text-[10px] px-2 py-0.5 rounded border border-stone-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Role B */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <span className="font-serif text-xl font-bold text-[#0B1325] block">
                {comp.roleB.name}
              </span>
              <div className="mt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Entry Salary (0-2 Yrs):</span>
                  <span className="font-bold text-[#0B1325]">{comp.roleB.entrySalary}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Mid Salary (3-5 Yrs):</span>
                  <span className="font-bold text-[#0B1325]">{comp.roleB.midSalary}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">AI Automation Risk:</span>
                  <span className="font-bold text-emerald-700">{comp.roleB.aiRisk}</span>
                </div>
                <div className="pt-2">
                  <span className="text-stone-700 block mb-1 font-bold">Key Industry Tools:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.roleB.keyTools.map((t) => (
                      <span key={t} className="bg-stone-100 text-stone-800 text-[10px] px-2 py-0.5 rounded border border-stone-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Verdict Boxes */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white tone-light card-light border-l-4 border-l-[#0B1325] border-stone-200 rounded-r-xl p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-2">
              Who Should Choose {comp.roleA.name}?
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {comp.verdict.whoShouldChooseA}
            </p>
          </div>

          <div className="bg-white tone-light card-light border-l-4 border-l-[#1B3F8B] border-stone-200 rounded-r-xl p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] mb-2">
              Who Should Choose {comp.roleB.name}?
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {comp.verdict.whoShouldChooseB}
            </p>
          </div>
        </section>

        {/* Detailed Operational Dimensions */}
        <section className="space-y-8 mb-16">
          <h2 className="font-serif text-2xl font-bold text-[#0B1325]">
            In-Depth Operational Dimensions
          </h2>

          {comp.dimensions.map((dim, idx) => (
            <div
              key={dim.title}
              className="bg-white tone-light card-light border border-stone-200 rounded-xl p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-bold text-[#0B1325] mb-4">
                {idx + 1}. {dim.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans mb-4">
                <div className="bg-[#FAF9F6] p-4 rounded border border-stone-200">
                  <span className="font-mono font-bold text-[#0B1325] uppercase block mb-1 text-[11px]">
                    {comp.roleA.name}:
                  </span>
                  <p className="text-stone-700 leading-relaxed">{dim.roleAValue}</p>
                </div>
                <div className="bg-[#FAF9F6] p-4 rounded border border-stone-200">
                  <span className="font-mono font-bold text-[#1B3F8B] uppercase block mb-1 text-[11px]">
                    {comp.roleB.name}:
                  </span>
                  <p className="text-stone-700 leading-relaxed">{dim.roleBValue}</p>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded text-xs font-mono border border-stone-200 text-stone-700">
                <strong className="text-[#0B1325]">ARZON ANALYSIS:</strong> {dim.analysis}
              </div>
            </div>
          ))}
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="font-serif text-xl font-bold text-[#0B1325] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1B3F8B]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {comp.faqs.map((faq) => (
              <div key={faq.question} className="bg-white tone-light card-light border border-stone-200 rounded-lg p-5">
                <h3 className="font-serif text-sm font-bold text-[#0B1325]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Action CTAs */}
        <section className="bg-[#0B1325] text-white rounded-2xl p-8 text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            Determine Your Role Compatibility in 3 Minutes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
            Our diagnostic engine compares your academic transcript and skills against live job descriptions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/career-engine/start"
              className="bg-white tone-light hover:bg-stone-100 text-[#0B1325] px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              RUN CAREER ENGINE FIT TEST <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
