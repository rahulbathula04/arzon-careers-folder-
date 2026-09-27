import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { getJdProvenance } from "@/data/jdProvenance";
import { getRoleIntelligence } from "@/data/roleIntelligence";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/roles/$slug")({
  loader: async ({ params }) => {
    const role = CAREER_ROLES.find(
      (r) =>
        r.slug === params.slug ||
        r.slug.endsWith(`.${params.slug}`) ||
        r.slug.replace(/^[^\.]+\./, "") === params.slug,
    );
    if (!role) throw notFound();

    const intelligence = getRoleIntelligence(role);
    const provenance = getJdProvenance(intelligence.programmeSlug);
    return { role, intelligence, provenance };
  },

  head: ({ loaderData }) => {
    if (!loaderData?.role || !loaderData?.intelligence) return {};
    const { role, intelligence } = loaderData;
    const cleanSlug = intelligence.roleSlug;

    const seo = pageSeo({
      path: `/roles/${cleanSlug}`,
      title: `${role.name}: Role Guide, Skills & Employer Requirements · Arzon Global`,
      description:
        `Understand what a ${role.name} does, what employers ask for, the tools used, common skill gaps, and the next step for career planning.`,
    });

    return {
      meta: [{ title: `${role.name}: Role Guide, Skills & Employer Requirements · Arzon Global` }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Occupation",
            name: role.name,
            description: intelligence.whatIsThisRole,
            occupationLocation: { "@type": "Country", name: "India" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Roles", item: "https://arzoncareers.in/roles" },
              { "@type": "ListItem", position: 3, name: role.name, item: `https://arzoncareers.in/roles/${cleanSlug}` },
            ],
          }),
        },
      ],
    };
  },

  component: RoleIntelligencePage,
});

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1B3F8B]">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function RoleIntelligencePage() {
  const { role, intelligence, provenance } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-stone-900 pb-24">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
          <Link to="/roles" className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> All roles
          </Link>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 pt-7">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-600">{role.seniority} level</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">{role.demandIndia} India demand signal</span>
            </div>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-tight text-stone-950">{role.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{intelligence.whatIsThisRole}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/career-engine/test" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] px-5 py-3 text-sm font-bold text-white hover:bg-[#153270]">
                Check My Fit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses/$slug" params={{ slug: intelligence.programmeSlug }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-900 hover:bg-stone-50">
                View {intelligence.programmeLabel}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Section eyebrow="01 · Role reality" title="What does this role actually involve?">
          <div className="grid gap-3 md:grid-cols-2">
            {intelligence.dayToDay.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex gap-3"><BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3F8B]" /><p className="text-sm leading-6 text-stone-700">{item}</p></div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="02 · Employer requirements" title="What do employers typically ask for?">
          <div className="grid gap-3 sm:grid-cols-2">
            {intelligence.employerRequirements.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-stone-200 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /><p className="text-sm leading-6 text-stone-700">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section eyebrow="03 · Tools & systems" title="What should you be able to work with?">
            <div className="flex flex-wrap gap-2">
              {intelligence.tools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-semibold text-stone-800">
                  <Wrench className="h-3.5 w-3.5 text-[#1B3F8B]" />{tool}
                </span>
              ))}
            </div>
          </Section>

          <Section eyebrow="04 · Eligibility" title="Who commonly enters this role?">
            <div className="space-y-3">
              {intelligence.eligibility.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-stone-200 p-4">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3F8B]" /><p className="text-sm leading-6 text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <Section eyebrow="05 · Evidence" title="What is this information based on?">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm leading-7 text-stone-700">{intelligence.marketContext}</p>
              {provenance && (
                <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-5">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#1B3F8B]" /><span className="font-bold text-stone-900">JD evidence</span></div>
                  <p className="mt-2 text-sm text-stone-600">{provenance.jdCount} sampled descriptions, refreshed {provenance.refreshedOn}.</p>
                  <p className="mt-1 text-xs text-stone-500">Sources: {provenance.sources.join(", ")}.</p>
                </div>
              )}
            </div>

            {role.salary && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">Observed CTC bands</p>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between gap-4 text-sm"><span>Entry</span><strong>₹{role.salary.entry.min} - ₹{role.salary.entry.max} LPA</strong></div>
                  <div className="flex justify-between gap-4 text-sm"><span>Mid</span><strong>₹{role.salary.mid.min} - ₹{role.salary.mid.max} LPA</strong></div>
                  <div className="flex justify-between gap-4 text-sm"><span>Senior</span><strong>₹{role.salary.senior.min} - ₹{role.salary.senior.max} LPA</strong></div>
                </div>
                <p className="mt-4 text-[11px] leading-5 text-stone-500">These are observed catalogue bands, not guaranteed offers. Verify compensation against the current employer and location.</p>
              </div>
            )}
          </div>
        </Section>

        <section className="rounded-3xl border border-[#1B3F8B]/20 bg-[#EEF4FF] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1B3F8B]">Career decision</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-950">What skills may be missing from your profile?</h2>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {intelligence.skillGaps.map((gap) => <div key={gap} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-stone-800">{gap}</div>)}
              </div>
            </div>
            <div className="rounded-2xl bg-[#0B1325] p-6 text-white">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">Recommended next actions</p>
              <ol className="mt-4 space-y-4">
                {intelligence.whatNext.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-stone-200"><span className="font-mono text-emerald-300">0{index + 1}</span><span>{step}</span></li>
                ))}
              </ol>
              <Link to="/career-engine/test" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-stone-950 hover:bg-stone-100">
                Start Career Engine <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-[#0B1325] p-7 sm:p-9 text-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">Role → skill gap → programme</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold">Build the skills this role requires</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">Use the assessment first. If the result shows a training gap, the {intelligence.programmeLabel} programme is the next product step.</p>
            </div>
            <Link to="/courses/$slug" params={{ slug: intelligence.programmeSlug }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-stone-950 hover:bg-stone-100">
              See programme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {intelligence.relatedRoles.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2"><Code2 className="h-4 w-4 text-[#1B3F8B]" /><h2 className="font-serif text-2xl font-bold text-stone-950">Related roles</h2></div>
            <div className="flex flex-wrap gap-2">
              {intelligence.relatedRoles.map((slug) => (
                <Link key={slug} to="/roles/$slug" params={{ slug }} className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-[#1B3F8B] hover:text-[#1B3F8B]">
                  {slug.replaceAll("-", " ")}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
