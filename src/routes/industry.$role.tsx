import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

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
    <div className="arzon-v2-page min-h-dvh bg-white tone-light text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow={`CAREER INTELLIGENCE · ${r.shortName}`}
        title={`${r.name} in India`}
        description={r.tagline}
      />
      <ArzonDecisionHub
        eyebrow="UNDERSTAND THE ROLE"
        title="Know the work before you decide how to prepare for it."
        description="Review the role profile, skills and employer context, then use the free Career Engine to see what your own next step could be."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Programmes"
        secondaryTo="/courses"
      />

      <main className="arzon-v2-container pb-24 pt-10">
        <Section title="What this job actually is" icon={Briefcase}>
          <p className="text-[var(--arzon-ink-soft)]">{r.whatIsIt}</p>
        </Section>

        <Section title="Why India keeps hiring for it" icon={GraduationCap}>
          <p className="text-[var(--arzon-ink-soft)]">{r.whyHiring}</p>
          <p className="mt-2 text-meta text-[var(--arzon-ink-soft)]">{r.industrySize}</p>
          <p className="mt-2 text-meta text-[var(--arzon-ink-soft)]">
            <span className="text-[var(--arzon-ink-muted)]">Who fits:</span> {r.who}
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
                className="rounded-lg border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-3 py-2 text-sm text-[var(--arzon-ink-soft)]"
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
                className="rounded-full bg-[var(--arzon-surface-blue)] px-3 py-1 text-meta text-[var(--arzon-ink)]/85"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Certifications that pay off">
          <ul className="space-y-2">
            {r.certs.map((c) => (
              <li key={c.name} className="rounded-lg border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-3">
                <p className="text-sm font-semibold text-[var(--arzon-ink)]">{c.name}</p>
                <p className="text-meta text-[var(--arzon-ink-muted)]">{c.pays}</p>
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
              <li key={f.q} className="rounded-lg border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4">
                <p className="text-sm font-semibold text-[var(--arzon-ink)]">{f.q}</p>
                <p className="mt-1 text-caption text-[var(--arzon-ink-soft)]">{f.a}</p>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-10 rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-blue)] p-6">
          <p className="font-mono text-micro uppercase tracking-[0.2em] text-[var(--arzon-blue-700)]">Arzon path</p>
          <p className="mt-1 text-lg font-semibold text-[var(--arzon-ink)]">
            Train for {r.shortName} with our live cohort programme.
          </p>
          <p className="mt-1 text-caption text-[var(--arzon-ink-soft)]">
            Job-ready in 12-16 weeks. Real cases, real tools, performance-based LOR.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/enrol"
              search={{ programme: r.arzonCourseSlug, source: `industry-${r.slug}` }}
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-[#1A1300] hover:bg-gold/90"
            >
              Apply with {r.shortName} pre-selected <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses/$slug"
              params={{ slug: r.arzonCourseSlug }}
              className="card-light inline-flex h-11 items-center gap-1.5 rounded-full border border-[var(--arzon-border)] bg-white px-5 text-sm font-semibold text-[var(--arzon-ink)] hover:bg-white/[0.08]"
            >
              See the {r.name} programme
            </Link>
          </div>
          <p className="mt-3 text-micro text-[var(--arzon-ink)]/50">
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
  return <span className="rounded-full bg-[var(--arzon-surface-blue)] px-3 py-1 text-[var(--arzon-ink-soft)]">{children}</span>;
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
      <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--arzon-ink)]">
        {Icon && <Icon className="h-4 w-4 text-[var(--arzon-blue-700)]" />}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
