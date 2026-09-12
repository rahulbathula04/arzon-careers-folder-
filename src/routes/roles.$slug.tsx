import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, CheckCircle2, ShieldCheck, ExternalLink, Briefcase, DollarSign, GraduationCap, Code } from "lucide-react";
import { CAREER_ROLES, CareerRole } from "@/data/careerRoles";
import { getJdProvenance } from "@/data/jdProvenance";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/roles/$slug")({
  loader: async ({ params }) => {
    // Find role matching slug exact or trailing part (e.g. "pv-associate" matches "drug-safety.pv-associate")
    const role = CAREER_ROLES.find(
      (r) => r.slug === params.slug || r.slug.endsWith(`.${params.slug}`) || r.slug.replace(/^[^\.]+\./, "") === params.slug
    );
    if (!role) throw notFound();

    // Map role to standard course slug
    const courseSlugMap: Record<string, string> = {
      "drug-safety": "pharmacovigilance",
      "clinical-data": "clinical-data-management",
      "regulatory": "regulatory-affairs",
      "medical-coding": "medical-coding",
    };
    const courseSlug = courseSlugMap[role.familyId] || "pharmacovigilance";
    const provenance = getJdProvenance(courseSlug);

    return { role, courseSlug, provenance };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.role) return {};
    const { role } = loaderData;
    const cleanSlug = role.slug.split(".").pop() || role.slug;

    const seo = pageSeo({
      path: `/roles/${cleanSlug}`,
      title: `${role.name} Role Competency & Hiring Requirements · Arzon Global`,
      description: `What employers expect from a ${role.name}. Detailed analysis of job description requirements, skills, software tools, salary bands, and training reverse-engineered by Arzon.`,
    });

    const jsonLdBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arzoncareers.in/" },
        { "@type": "ListItem", "position": 2, "name": "Roles", "item": "https://arzoncareers.in/roles" },
        { "@type": "ListItem", "position": 3, "name": role.name, "item": `https://arzoncareers.in/roles/${cleanSlug}` },
      ],
    };

    return {
      meta: [{ title: `${role.name} Role Competency & Hiring Requirements · Arzon Global` }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdBreadcrumb),
        },
      ],
    };
  },
  component: RoleDetailComponent,
});

function RoleDetailComponent() {
  const { role, courseSlug, provenance } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Navigation & Breadcrumb Header */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-stone-700 hover:text-stone-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO ROLE TAXONOMY
          </Link>
          <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest hidden sm:block">
            ARZON ROLE COMPETENCY MODEL · {role.familyId.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Role Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-300 bg-stone-50 px-2.5 py-1">
              {role.seniority.toUpperCase()} LEVEL ROLE
            </span>
            <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> RECURRING DEMAND: {role.demandIndia.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            {role.name}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">
            {role.blurb}
          </p>

          <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
            <div>
              <span className="text-stone-500 block">HIRING EMPLOYERS:</span>
              <strong className="text-stone-900">{role.topCompanies.slice(0, 4).join(", ")}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">JD SAMPLE SIZE:</span>
              <strong className="text-stone-900">{role.evidence ? `${role.evidence.jdCount} JDs Analyzed` : "Sourcing active"}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">AI RISK IMPACT:</span>
              <strong className="text-stone-900">{role.aiRisk} ({role.aiRiskNote || "Human review required"})</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* 1. Employer Expectation Matrix */}
        <section className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <Briefcase className="w-4 h-4 text-[#1B3F8B]" />
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
              1. What Do Employers Expect From a {role.name}?
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
            Arzon periodically samples job descriptions across Tier-1 GCCs, Pharma Multinationals, and CROs to extract verbatim operational requirements. Candidates entering this role must demonstrate competencies across four core pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-stone-200 bg-stone-50 p-4">
              <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-[#1B3F8B]" /> TECHNICAL SKILLS & SOFTWARE
              </div>
              <ul className="space-y-1.5 font-sans text-xs text-stone-800">
                {role.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1B3F8B] rounded-full" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-4">
              <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#1B3F8B]" /> ELIGIBILITY & DEGREES
              </div>
              <div className="font-sans text-xs text-stone-800 space-y-2">
                <p><strong>Common Degrees:</strong> {role.eligibility?.required?.join(", ") || "B.Pharm, Pharm.D, MBBS, B.Sc Life Sciences"}</p>
                {role.eligibility?.note && <p className="text-stone-600 text-[11px] italic">{role.eligibility.note}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Salary Benchmarks */}
        {role.salary && (
          <section className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <DollarSign className="w-4 h-4 text-[#1B3F8B]" />
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                2. Salary Benchmarks in India (Observed CTC Bands)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-stone-200 p-4 text-center bg-stone-50">
                <span className="font-mono text-[10px] text-stone-500 block uppercase">ENTRY LEVEL (0–2 YRS)</span>
                <span className="font-serif font-bold text-2xl text-stone-900 mt-1 block">
                  ₹{role.salary.entry.min} – ₹{role.salary.entry.max} LPA
                </span>
              </div>
              <div className="border border-stone-200 p-4 text-center bg-stone-50">
                <span className="font-mono text-[10px] text-stone-500 block uppercase">MID LEVEL (3–5 YRS)</span>
                <span className="font-serif font-bold text-2xl text-stone-900 mt-1 block">
                  ₹{role.salary.mid.min} – ₹{role.salary.mid.max} LPA
                </span>
              </div>
              <div className="border border-stone-200 p-4 text-center bg-stone-50">
                <span className="font-mono text-[10px] text-stone-500 block uppercase">SENIOR LEVEL (6+ YRS)</span>
                <span className="font-serif font-bold text-2xl text-stone-900 mt-1 block">
                  ₹{role.salary.senior.min} – ₹{role.salary.senior.max} LPA
                </span>
              </div>
            </div>
            <p className="font-mono text-[10px] text-stone-500 text-center">
              Source: Observed CTC ranges in sampled job postings across Hyderabad, Bangalore, Pune, and Mumbai hubs.
            </p>
          </section>
        )}

        {/* 3. JD Provenance & Reverse-Engineered Syllabus */}
        {provenance && (
          <section className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B3F8B]" />
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                  3. Reverse-Engineered Syllabus Mapping
                </h2>
              </div>
              <span className="font-mono text-[10px] font-bold text-stone-500">
                LAST REFRESHED: {provenance.refreshedOn}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
              Arzon reverse-engineers training modules directly from recurring JD requirements. Below is the mapping from employer demand to the Arzon training module:
            </p>

            <div className="space-y-3">
              {provenance.topJdPhrases.map((phrase, idx) => (
                <div key={idx} className="border border-stone-200 p-4 bg-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-stone-500 uppercase">EMPLOYER REQUIREMENT:</span>
                    <p className="font-sans text-xs font-bold text-stone-900 mt-0.5">"{phrase.phrase}"</p>
                  </div>
                  {phrase.satisfiedByModule && (
                    <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200 w-full sm:w-auto">
                      <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase">SATISFIED BY MODULE:</span>
                      <p className="font-mono text-xs text-stone-800 mt-0.5">{phrase.satisfiedByModule}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conversion Action Panel */}
        <section className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              ROLE READINESS COHORT
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Ready to Train Specifically for the {role.name} Role?
            </h3>
            <p className="font-sans text-xs text-stone-300 max-w-xl">
              12 weeks of structured software tool drills, synthetic case processing, and cryptographic certificate auditing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/courses/$slug"
              params={{ slug: courseSlug }}
              className="bg-white tone-light text-stone-900 hover:bg-stone-100 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              VIEW SYLLABUS <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/career-engine/start"
              className="border border-stone-500 text-white hover:bg-stone-800 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider"
            >
              TEST FIT SCORE
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
