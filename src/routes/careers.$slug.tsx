import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap, Wrench } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const pathway = DEGREE_PATHWAYS.find((item) => item.slug === params.slug);
    if (!pathway) throw notFound();
    return { pathway };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.pathway) return {};
    const { pathway } = loaderData;
    const seo = pageSeo({
      path: `/careers/${pathway.slug}`,
      title: `${pathway.shortTitle} | Arzon Global`,
      description: pathway.metaDescription,
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: `${pathway.shortTitle} | Arzon Global` }, ...seo.meta],
      links: seo.links,
    };
  },
  component: DegreePathwayPage,
});

function DegreePathwayPage() {
  const { pathway } = Route.useLoaderData();

  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow={`DEGREE → CAREER INTELLIGENCE · ${pathway.degreeName}`}
        title={pathway.shortTitle}
        description={pathway.overview}
        mobileImageSrc="/images/bpharm-female-graduate-hero.jpg"
        mobileImageAlt="Healthcare graduate reviewing career options"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/degrees" className="arzon-v2-button-secondary">Compare Degrees</Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="DEGREE → ROLE → READINESS"
        title={`See the roles that connect to ${pathway.degreeName}.`}
        description="Use the pathway to compare role requirements and preparation tracks. Use the Career Engine when you want a personal recommendation."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Browse All Roles"
        secondaryTo="/roles"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="Qualification" value={pathway.degreeName} />
          <Metric label="Typical duration" value={pathway.typicalDuration} />
          <Metric label="Role paths" value={String(pathway.eligibleRoles.length)} />
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionTitle icon={GraduationCap} eyebrow="01 · YOUR FOUNDATION" title="What your degree already gives you" />
          <div className="mt-6 flex flex-wrap gap-2">
            {pathway.coreSubjects.map((subject) => (
              <span key={subject} className="rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--arzon-ink-soft)]">
                {subject}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--arzon-ink-soft)]">{pathway.eligibilityDisclaimer}</p>
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionTitle icon={Wrench} eyebrow="02 · ROLE OPTIONS" title="Compare the role paths" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pathway.eligibleRoles.map((role) => (
              <article key={role.roleSlug + role.roleName} className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="arzon-v2-data-label">{role.fitLevel}</span>
                  <span className="text-xs font-semibold text-[var(--arzon-ink-muted)]">{role.typicalStartingCtc}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-[var(--arzon-ink)]">{role.roleName}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{role.whyFit}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.keySkillsNeeded.map((skill) => (
                    <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-white px-2.5 py-1 text-xs text-[var(--arzon-ink-soft)]">{skill}</span>
                  ))}
                </div>
                <Link to="/roles/$slug" params={{ slug: role.roleSlug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]">
                  View role requirements <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionTitle icon={CheckCircle2} eyebrow="03 · PREPARATION" title="Preparation tracks connected to this degree" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pathway.arzonTrainingTracks.map((track) => (
              <article key={track.trackSlug} className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5">
                <h3 className="text-lg font-bold text-[var(--arzon-ink)]">{track.trackName}</h3>
                <p className="mt-2 text-sm text-[var(--arzon-ink-soft)]">{track.duration}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.keyTools.map((tool) => (
                    <span key={tool} className="rounded-full border border-[var(--arzon-border)] bg-white px-2.5 py-1 text-xs text-[var(--arzon-ink-soft)]">{tool}</span>
                  ))}
                </div>
                <Link to="/courses/$slug" params={{ slug: track.trackSlug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]">
                  View programme <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionTitle icon={CheckCircle2} eyebrow="04 · PRACTICAL PLAN" title="A simple transition sequence" />
          <ol className="mt-6 space-y-3">
            {pathway.transitionStrategy.map((step) => (
              <li key={step.step} className="flex gap-4 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--arzon-navy-950)] text-xs font-bold text-white">{step.step}</span>
                <div>
                  <h3 className="font-semibold text-[var(--arzon-ink)]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--arzon-ink-soft)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] p-8 text-white sm:p-10">
          <span className="arzon-v2-eyebrow !text-[var(--arzon-blue-200)]">NEXT DECISION</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Want the system to recommend the path for you?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Take the Career Engine, then use your result to open the specific programme connected to your strongest path.</p>
          <Link to="/career-engine" className="arzon-v2-button-secondary mt-6 bg-white tone-light text-[var(--arzon-ink)]">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="arzon-v2-card p-5"><span className="arzon-v2-data-label">{label}</span><p className="mt-2 text-lg font-bold text-[var(--arzon-ink)]">{value}</p></div>;
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof GraduationCap; eyebrow: string; title: string }) {
  return <div><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[var(--arzon-blue-700)]" /><span className="arzon-v2-eyebrow">{eyebrow}</span></div><h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-3xl">{title}</h2></div>;
}
