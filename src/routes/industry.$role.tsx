import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ROLES_BY_SLUG } from "@/data/industry/roles";
import { employersForRole } from "@/data/industry/employers";
import { PayBandTable } from "@/components/industry/PayBandTable";
import { EmployerGrid } from "@/components/industry/EmployerGrid";
import { CareerLadder } from "@/components/industry/CareerLadder";
import { AbroadStrip } from "@/components/industry/AbroadStrip";
import { AIImpactCard } from "@/components/industry/AIImpactCard";
import { SourceFootnotes } from "@/components/industry/SourceFootnotes";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, BadgeCheck, Briefcase, GraduationCap, Wrench } from "lucide-react";

export const Route = createFileRoute("/industry/$role")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    };
  },
  loader: ({ params }) => {
    const role = ROLES_BY_SLUG[params.role];
    if (!role) throw notFound();
    return role;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const title = `${loaderData.name} salary, roles, employers, India 2026`;
    const description = `${loaderData.tagline} Pay bands by city, top employers, career ladder, abroad opportunities. Sourced quarterly.`;
    const ps = pageSeo({ path: `/industry/${params.role}`, title, description, ogType: "article" });
    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            datePublished: "2025-11-01",
            dateModified: "2026-07-22",
            author: { "@type": "Organization", name: "Arzon Global" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: RolePage,
  pendingComponent: () => (
    <div className="min-h-dvh motion-safe:animate-pulse bg-[#070A14] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="h-3 w-32 rounded bg-white/10" />
        <div className="mt-4 h-10 w-2/3 rounded-xl bg-white/10" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-white/10" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 rounded-2xl bg-white/5" />
            <div className="h-64 rounded-2xl bg-white/5" />
          </div>
          <div className="space-y-4">
            <div className="h-40 rounded-2xl bg-white/5" />
            <div className="h-40 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  ),
});

function RolePage() {
  const r: import("@/data/industry/types").RoleProfile = Route.useLoaderData();
  const employers = employersForRole(r.slug);

  return (
    <div className="min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/60">
          <Link to="/industry" className="hover:text-white/70">
            Industry
          </Link>{" "}
          / {r.shortName}
        </p>
        <h1 className="mt-2 text-h1 font-semibold">{r.name} in India</h1>
        <p className="mt-2 text-base text-white/70">{r.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2 text-meta">
          <Tag>Demand: {r.demand}</Tag>
          <Tag>English: {r.englishNeeded}</Tag>
          <Tag>{r.workMode}</Tag>
          <Tag>As of {r.asOf}</Tag>
        </div>

        <Section title="What this job actually is" icon={Briefcase}>
          <p className="text-white/80">{r.whatIsIt}</p>
        </Section>

        <Section title="Why India keeps hiring for it" icon={GraduationCap}>
          <p className="text-white/80">{r.whyHiring}</p>
          <p className="mt-2 text-meta text-white/80">{r.industrySize}</p>
          <p className="mt-2 text-meta text-white/80">
            <span className="text-white/60">Who fits:</span> {r.who}
          </p>
        </Section>

        <Section title="Pay by city × experience" icon={BadgeCheck}>
          <PayBandTable bands={r.pay} asOf={r.asOf} />
        </Section>

        <Section title="Career ladder">
          <CareerLadder steps={r.ladder} />
        </Section>

        <Section title="Top employers hiring right now" icon={Briefcase}>
          <EmployerGrid employers={employers} />
        </Section>

        <Section title="Roles you can apply for">
          <ul className="grid gap-2 sm:grid-cols-2">
            {r.hiringRoles.map((role) => (
              <li
                key={role}
                className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80"
              >
                {role}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills + tools that show up in JDs" icon={Wrench}>
          <div className="flex flex-wrap gap-2">
            {r.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/[0.06] px-3 py-1 text-meta text-white/85"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Certifications that pay off">
          <ul className="space-y-2">
            {r.certs.map((c) => (
              <li key={c.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-meta text-white/65">{c.pays}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="AI impact, honestly">
          <AIImpactCard risk={r.aiRisk} note={r.aiNote} />
        </Section>

        <Section title="Abroad opportunities for India-trained talent">
          <AbroadStrip markets={r.abroad} />
        </Section>

        <Section title="Frequently asked, plainly answered">
          <ul className="space-y-3">
            {r.faqs.map((f) => (
              <li key={f.q} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="text-sm font-semibold text-white">{f.q}</p>
                <p className="mt-1 text-caption text-white/75">{f.a}</p>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
          <p className="font-mono text-micro uppercase tracking-[0.2em] text-gold">Arzon path</p>
          <p className="mt-1 text-lg font-semibold text-white">
            Train for {r.shortName} with our live cohort programme.
          </p>
          <p className="mt-1 text-caption text-white/70">
            Job-ready in 12-16 weeks. Real cases, real tools, performance-based LOR.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/apply"
              search={{ programme: r.arzonCourseSlug, source: `industry-${r.slug}` }}
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90"
            >
              Apply with {r.shortName} pre-selected <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses/$slug"
              params={{ slug: r.arzonCourseSlug }}
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white hover:bg-white/[0.08]"
            >
              See the {r.name} programme
            </Link>
          </div>
          <p className="mt-3 text-micro text-white/50">
            Pre-fill saves you a step - your application form opens with this programme already
            chosen.
          </p>
        </div>

        <div className="mt-8">
          <SourceFootnotes ids={r.sources} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-white/[0.06] px-3 py-1 text-white/75">{children}</span>;
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
        {Icon && <Icon className="h-4 w-4 text-gold" />}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
