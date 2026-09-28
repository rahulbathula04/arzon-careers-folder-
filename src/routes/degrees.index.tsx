import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/degrees/")({
  head: () => {
    const seo = pageSeo({
      path: "/degrees",
      title: "Degree to Career Pathways in Healthcare | Arzon Global",
      description: "See which healthcare roles, skills and preparation tracks align with B.Pharm, Pharm.D, M.Pharm and Life Sciences degrees.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Degree to Career Pathways | Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Arzon Degree-to-Career Pathways",
          numberOfItems: DEGREE_PATHWAYS.length,
          itemListElement: DEGREE_PATHWAYS.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.degreeName,
            url: `https://arzoncareers.in/degrees/${d.slug}`,
          })),
        }),
      }],
    };
  },
  component: DegreesIndex,
});

function DegreesIndex() {
  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow="DEGREE → ROLE"
        title="Your degree is the starting point. The role is the destination."
        description="Compare the healthcare roles that commonly align with your qualification, the skills those roles require, and the Arzon preparation tracks connected to them."
        mobileImageSrc="/images/bpharm-students-group.jpg"
        mobileImageAlt="Healthcare students reviewing career options"
      >
        <Link to="/career-engine" className="arzon-v2-button-primary">
          Get My Career Plan <ArrowRight className="h-4 w-4" />
        </Link>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="CHOOSE WITH CONTEXT"
        title="Start from your qualification, then check your fit."
        description="A degree pathway shows the market options. The Career Engine adds your interests, working style and current readiness."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles"
        secondaryTo="/roles"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEGREE_PATHWAYS.map((degree) => (
            <article key={degree.slug} className="arzon-v2-card flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="arzon-v2-data-label">{degree.typicalDuration}</span>
                <span className="rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--arzon-ink-soft)]">
                  {degree.eligibleRoles.length} role paths
                </span>
              </div>
              <div className="mt-5 flex-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[var(--arzon-blue-700)]" />
                  <span className="arzon-v2-eyebrow">QUALIFICATION</span>
                </div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-[var(--arzon-ink)]">{degree.degreeName}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--arzon-ink-soft)]">{degree.overview}</p>
                <div className="mt-5 space-y-2">
                  {degree.eligibleRoles.slice(0, 4).map((role) => (
                    <div key={role.roleSlug + role.roleName} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
                      <span className="text-[var(--arzon-ink-soft)]">{role.roleName}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/degrees/$slug"
                params={{ slug: degree.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]"
              >
                View degree pathway <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <span className="arzon-v2-eyebrow">NEXT DECISION</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--arzon-ink)]">Not sure which path fits you?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
            Use the free Career Engine after reviewing your degree options. Your result can point to a specific role family and preparation track.
          </p>
          <Link to="/career-engine" className="arzon-v2-button-primary mt-6">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
