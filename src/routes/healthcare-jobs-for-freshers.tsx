import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/healthcare-jobs-for-freshers")({
  head: () => {
    const seo = pageSeo({
      path: "/healthcare-jobs-for-freshers",
      title: "Healthcare Jobs for Freshers in India · Role Requirements & Career Guide",
      description:
        "Explore entry-level healthcare and life-sciences roles, recurring skills, employer requirements and preparation paths before choosing a programme.",
      image: "/og/internships.jpg",
    });

    return {
      meta: [{ title: "Healthcare Jobs for Freshers in India · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Healthcare Jobs for Freshers in India",
            description: "Career intelligence for entry-level healthcare and life-sciences roles.",
            url: "https://arzoncareers.in/healthcare-jobs-for-freshers",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Healthcare Jobs for Freshers", item: "https://arzoncareers.in/healthcare-jobs-for-freshers" },
            ],
          }),
        },
      ],
    };
  },
  component: HealthcareJobsFreshersPage,
});

const ENTRY_ROLES = CAREER_ROLES
  .filter((role) => role.seniority === "entry")
  .slice(0, 12);

function HealthcareJobsFreshersPage() {
  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE · FRESHERS"
        title="Understand the healthcare roles available to freshers before choosing what to learn."
        description="Compare entry-level role profiles, recurring skills and the kind of evidence employers ask for. Then use the Career Engine to turn that market context into a personal career plan."
        mobileImageSrc="/images/bpharm-male-graduate.jpg"
        mobileImageAlt="Healthcare graduate exploring fresher career options"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/roles" className="arzon-v2-button-secondary">
            Browse Role Directory
          </Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="FRESHER → ROLE → READINESS"
        title="Do not choose a course from a job title alone."
        description="Start with the work. Compare requirements. Check your current fit. Then choose preparation for the role you actually want."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Programmes"
        secondaryTo="/courses"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="grid gap-4 sm:grid-cols-3">
          <Metric label="Entry-level role profiles" value={String(ENTRY_ROLES.length)} />
          <Metric
            label="Role families"
            value={String(new Set(ENTRY_ROLES.map((role) => role.familyId)).size)}
          />
          <Metric
            label="JD samples represented"
            value={`${ENTRY_ROLES.reduce((sum, role) => sum + (role.evidence?.jdCount ?? 0), 0)} sampled`}
          />
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 h-5 w-5 shrink-0 text-[var(--arzon-blue-700)]" />
            <div>
              <span className="arzon-v2-eyebrow">ENTRY-LEVEL ROLE DIRECTORY</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-3xl">
                Role profiles you can compare before preparing.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
                Salary figures shown here are observed dataset ranges where available. They are not job offers or guarantees.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ENTRY_ROLES.map((role) => {
              const slug = role.slug.split(".").pop() ?? role.slug;
              return (
                <article key={role.slug} className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5">
                  <span className="arzon-v2-data-label">{role.familyId.replaceAll("-", " ")}</span>
                  <h3 className="mt-2 text-lg font-bold text-[var(--arzon-ink)]">{role.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{role.blurb}</p>

                  <div className="mt-4 space-y-2 text-xs text-[var(--arzon-ink-soft)]">
                    {role.salary ? (
                      <p><strong>Observed entry band:</strong> ₹{role.salary.entry.min}L–₹{role.salary.entry.max}L LPA</p>
                    ) : null}
                    <p><strong>Demand signal:</strong> {role.demandIndia}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full border border-[var(--arzon-border)] tone-light bg-white px-2.5 py-1 text-[11px] text-[var(--arzon-ink-soft)]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link to="/roles/$slug" params={{ slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]">
                    View requirements <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] p-8 text-white sm:p-10">
          <span className="arzon-v2-eyebrow !text-[var(--arzon-blue-200)]">DECIDE WITH CONTEXT</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Your degree is the starting point. Role readiness is the next question.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Use the assessment to map your current profile to role families, then decide whether you need a programme, more practice, or a different path.
          </p>
          <Link to="/career-engine" className="mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--arzon-radius-md)] tone-light bg-white px-5 py-3 text-sm font-semibold text-[var(--arzon-ink)]">
            Start Career Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <div className="flex items-start gap-2 text-xs text-[var(--arzon-ink-muted)]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
          <p>Job availability, employer requirements and compensation change over time. Use the linked role profile and current employer job description as the final application reference.</p>
        </div>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="arzon-v2-card p-5">
      <span className="arzon-v2-data-label">{label}</span>
      <p className="mt-2 text-xl font-bold text-[var(--arzon-ink)]">{value}</p>
    </div>
  );
}
