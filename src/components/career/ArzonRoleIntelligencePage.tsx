import { ArrowRight, Briefcase, CheckCircle2, GraduationCap, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import type { CareerRole } from "@/data/careerRoles";

export function ArzonRoleIntelligencePage({
  role,
  courseSlug,
  provenance,
}: {
  role: CareerRole;
  courseSlug: string;
  provenance: {
    refreshedOn: string;
    topJdPhrases: Array<{ phrase: string; satisfiedByModule?: string | null }>;
  } | null;
}) {
  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow={`CAREER INTELLIGENCE · ${role.familyId.replaceAll("-", " ").toUpperCase()}`}
        title={`${role.name}: understand the work before you prepare for it.`}
        description={role.blurb}
        mobileImageSrc="/images/bpharm-male-graduate.jpg"
        mobileImageAlt="Healthcare graduate researching a career path"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-v2-button-secondary">
            Explore Programmes
          </Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="ROLE → READINESS"
        title="See the requirements first. Then decide what to build."
        description="Use this role profile to understand the common work, tools and requirements. The free Career Engine then maps that context to your own next step."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Browse Role Directory"
        secondaryTo="/roles"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="Seniority" value={role.seniority.toUpperCase()} />
          <Metric
            label="JD evidence"
            value={role.evidence ? `${role.evidence.jdCount} sampled` : "Sourcing in progress"}
          />
          <Metric label="India demand signal" value={role.demandIndia} />
        </section>

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionHeading icon={Briefcase} eyebrow="01 · THE JOB" title={`What a ${role.name} role is built around`} />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <InfoBlock title="Core work">
              <p>{role.blurb}</p>
              <ul className="mt-4 space-y-2">
                {role.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
            <InfoBlock title="Common eligibility">
              <div className="space-y-3">
                <p><strong>Typical degrees:</strong> {role.eligibility?.required?.join(", ") || "See employer-specific job description."}</p>
                {role.eligibility?.preferred?.length ? (
                  <p><strong>Preferred:</strong> {role.eligibility.preferred.join(", ")}</p>
                ) : null}
                {role.eligibility?.note ? <p className="text-[var(--arzon-ink-soft)]">{role.eligibility.note}</p> : null}
              </div>
            </InfoBlock>
          </div>
        </section>

        {role.salary ? (
          <section className="arzon-v2-card p-6 sm:p-8">
            <SectionHeading icon={GraduationCap} eyebrow="02 · MARKET CONTEXT" title="Observed compensation bands" />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <SalaryCard label="Entry · 0–2 years" min={role.salary.entry.min} max={role.salary.entry.max} />
              <SalaryCard label="Mid · 3–5 years" min={role.salary.mid.min} max={role.salary.mid.max} />
              <SalaryCard label="Senior · 6+ years" min={role.salary.senior.min} max={role.salary.senior.max} />
            </div>
            <p className="mt-4 text-xs text-[var(--arzon-ink-muted)]">
              These are observed ranges in Arzon's current role dataset, not a guaranteed offer or salary outcome.
            </p>
          </section>
        ) : null}

        <section className="arzon-v2-card p-6 sm:p-8">
          <SectionHeading icon={Wrench} eyebrow="03 · CAPABILITY MODEL" title="What to build before you apply" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock title="Technical skills">
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-3 py-1.5 text-xs font-medium">{skill}</span>)}
              </div>
            </InfoBlock>
            <InfoBlock title="Credentials & evidence">
              <ul className="space-y-2">
                {role.certifications.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-blue-700)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
          </div>
        </section>

        {provenance ? (
          <section className="arzon-v2-card p-6 sm:p-8">
            <SectionHeading icon={ShieldCheck} eyebrow="04 · EVIDENCE" title="Job-description requirement mapping" />
            <p className="mt-3 text-sm text-[var(--arzon-ink-soft)]">
              Refreshed {provenance.refreshedOn}. Requirements below are the phrases Arzon currently uses to connect employer demand to preparation content.
            </p>
            <div className="mt-6 space-y-3">
              {provenance.topJdPhrases.map((item) => (
                <div key={item.phrase} className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4">
                  <p className="text-sm font-semibold text-[var(--arzon-ink)]">{item.phrase}</p>
                  {item.satisfiedByModule ? (
                    <p className="mt-1 text-xs text-[var(--arzon-ink-soft)]">Mapped to: {item.satisfiedByModule}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] p-8 text-white sm:p-10">
          <span className="arzon-v2-eyebrow !text-[var(--arzon-blue-200)]">NEXT DECISION</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Find out how this role compares with your current readiness.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Start with the free assessment. Arzon can then route you toward a relevant role path and preparation option instead of sending you straight to a generic course catalogue.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/career-engine" className="arzon-v2-button-secondary bg-white tone-light text-[var(--arzon-ink)]">
              Check My Fit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/courses/$slug" params={{ slug: courseSlug }} className="inline-flex items-center justify-center gap-2 rounded-[var(--arzon-radius-md)] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              View Relevant Programme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <p className="text-xs text-[var(--arzon-ink-muted)]">
          Hiring requirements change by employer, geography, seniority and time period. Treat this page as career intelligence, not a promise of hiring or compensation.
        </p>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="arzon-v2-card p-5">
      <span className="arzon-v2-data-label">{label}</span>
      <p className="mt-2 text-lg font-bold text-[var(--arzon-ink)]">{value}</p>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: typeof Briefcase;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[var(--arzon-blue-700)]" />
        <span className="arzon-v2-eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-3xl">{title}</h2>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5 text-sm leading-6 text-[var(--arzon-ink-soft)]">
      <h3 className="font-semibold text-[var(--arzon-ink)]">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function SalaryCard({ label, min, max }: { label: string; min: number; max: number }) {
  return (
    <div className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5">
      <span className="arzon-v2-data-label">{label}</span>
      <p className="mt-3 text-2xl font-bold text-[var(--arzon-ink)]">₹{min}L–₹{max}L LPA</p>
    </div>
  );
}
