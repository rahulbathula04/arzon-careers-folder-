import { ArrowRight, Briefcase, CheckCircle2, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { CAREER_ROLES } from "@/data/careerRoles";
import type { FamilyId } from "@/data/careerFamilies";

export function ArzonJobIntelligencePage({
  familyId,
  eyebrow,
  title,
  description,
  courseSlug,
  mobileImageSrc = "/images/bpharm-male-graduate.jpg",
}: {
  familyId: FamilyId;
  eyebrow: string;
  title: string;
  description: string;
  courseSlug: string;
  mobileImageSrc?: string;
}) {
  const roles = CAREER_ROLES.filter((role) => role.familyId === familyId);
  const skills = Array.from(new Set(roles.flatMap((role) => role.skills))).slice(0, 12);
  const employers = Array.from(new Set(roles.flatMap((role) => role.topCompanies))).slice(0, 10);
  const evidenceCount = roles.reduce((sum, role) => sum + (role.evidence?.jdCount ?? 0), 0);

  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        mobileImageSrc={mobileImageSrc}
        mobileImageAlt="Healthcare graduate researching career opportunities"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/roles" className="arzon-v2-button-secondary">
            Compare Roles
          </Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="SEARCH → DECIDE → PREPARE"
        title="Use the job market to choose what to build next."
        description="Start with role information, check your current fit, then compare preparation options. The programme is the last step of the decision—not the first."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Programmes"
        secondaryTo="/courses"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="Role profiles" value={String(roles.length)} />
          <Metric label="JD evidence represented" value={evidenceCount ? `${evidenceCount} sampled` : "Dataset growing"} />
          <Metric label="Core employers in dataset" value={String(employers.length)} />
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 h-5 w-5 shrink-0 text-[var(--arzon-blue-700)]" />
            <div>
              <span className="arzon-v2-eyebrow">ROLE DIRECTORY</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-3xl">
                Explore the roles inside this career family.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
                These profiles are designed to help a learner understand the work, skills, eligibility and evidence behind a job title before choosing preparation.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {roles.slice(0, 8).map((role) => {
              const slug = role.slug.split(".").pop() ?? role.slug;
              return (
                <article key={role.slug} className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="arzon-v2-data-label">{role.seniority} level</span>
                    {role.evidence ? (
                      <span className="text-xs font-semibold text-[var(--arzon-green-600)]">{role.evidence.jdCount} sampled</span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[var(--arzon-ink)]">{role.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{role.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-white px-2.5 py-1 text-xs text-[var(--arzon-ink-soft)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link to="/roles/$slug" params={{ slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]">
                    View role requirements <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InfoPanel icon={Wrench} title="Skills that recur across this family">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--arzon-ink-soft)]">
                  {skill}
                </span>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel icon={Briefcase} title="Employers represented in Arzon's dataset">
            <div className="flex flex-wrap gap-2">
              {employers.map((employer) => (
                <span key={employer} className="rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--arzon-ink-soft)]">
                  {employer}
                </span>
              ))}
            </div>
          </InfoPanel>
        </section>

        <section className="rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] p-8 text-white sm:p-10">
          <span className="arzon-v2-eyebrow !text-[var(--arzon-blue-200)]">NEXT STEP</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Turn career research into a personalised preparation plan.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Take the assessment first. Then compare the relevant role path with the programme that maps to its required capabilities.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/career-engine" className="arzon-v2-button-secondary bg-white tone-light text-[var(--arzon-ink)]">
              Check My Fit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/courses/$slug" params={{ slug: courseSlug }} className="inline-flex items-center justify-center gap-2 rounded-[var(--arzon-radius-md)] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              View Programme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="flex items-start gap-2 text-xs text-[var(--arzon-ink-muted)]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
          <p>Role requirements, employer mix and compensation vary by employer, city, experience and time period. Use individual job descriptions as the final source for an application decision.</p>
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

function InfoPanel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Briefcase;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="arzon-v2-card p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[var(--arzon-blue-700)]" />
        <h2 className="font-semibold text-[var(--arzon-ink)]">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
