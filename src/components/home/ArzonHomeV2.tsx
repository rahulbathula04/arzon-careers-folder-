import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { ArzonCareerPathGrid } from "@/components/home/ArzonCareerPathGrid";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
).slice(0, 6);

const JOURNEY = [
  ["01", "Discover", "Explore the work, skills and employers behind a career role."],
  ["02", "Assess", "Check your current readiness and identify the gaps that matter."],
  ["03", "Prepare", "Build role-specific skills through structured learning and projects."],
  ["04", "Prove", "Create evidence of what you can actually do."],
  ["05", "Apply", "Take a clearer profile into applications and conversations."],
] as const;

const TRUST_POINTS = [
  {
    icon: FileSearch,
    title: "Role-first research",
    body: "Start with the job and its requirements, then decide how to prepare.",
  },
  {
    icon: GraduationCap,
    title: "Practical preparation",
    body: "Build capability through structured work, projects and mentor review.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence, not just completion",
    body: "Keep a record of assessment, projects and demonstrated skills.",
  },
  {
    icon: Users,
    title: "Human support when needed",
    body: "Move from self-service research to a direct conversation when you need context.",
  },
];

export function ArzonHomeV2() {
  return (
    <div className="arzon-v2-page min-h-screen antialiased">
      <section className="tone-light border-b border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <span className="arzon-v2-eyebrow">ARZON GLOBAL · CAREER INTELLIGENCE</span>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--arzon-ink-strong)]">
              Know where you want to go before you choose what to study.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--arzon-ink-soft)] sm:text-xl">
              Explore healthcare and life-science careers, understand what employers expect, check your readiness, and build the skills and evidence for your next step.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/career-engine" className="arzon-button-primary group">
                Find my career path
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/roles" className="arzon-button-secondary">
                Explore roles
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--arzon-ink-soft)]">
              {["Free career assessment", "Role intelligence", "Practical programmes", "Readiness evidence"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--arzon-teal-700)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="arzon-v2-card overflow-hidden bg-[var(--arzon-surface-blue)] p-3 sm:p-4">
            <div className="overflow-hidden rounded-[var(--arzon-radius-lg)] bg-[var(--arzon-navy-950)] text-white">
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  THE ARZON PATH
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  One system from career question to practical evidence.
                </p>
              </div>
              <div className="divide-y divide-white/10">
                {JOURNEY.map(([number, title, body]) => (
                  <div key={number} className="flex gap-4 px-5 py-4 sm:px-6">
                    <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-blue-300">{number}</span>
                    <div>
                      <h2 className="text-sm font-semibold">{title}</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/why-arzon"
                className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm font-semibold hover:bg-white/5 sm:px-6"
              >
                See how Arzon works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface)] py-5">
        <div className="arzon-v2-container flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[var(--arzon-ink-strong)]">
            Start with the question you are trying to answer.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/roles" className="tone-light rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--arzon-ink-soft)] hover:border-[var(--arzon-border-strong)]">
              What roles can I do?
            </Link>
            <Link to="/career-engine" className="rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--arzon-ink-soft)] hover:border-[var(--arzon-border-strong)]">
              Am I ready?
            </Link>
            <Link to="/courses" className="rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--arzon-ink-soft)] hover:border-[var(--arzon-border-strong)]">
              What should I learn?
            </Link>
          </div>
        </div>
      </section>

      <ArzonCareerPathGrid />

      <ArzonDecisionHub
        eyebrow="FREE CAREER CLARITY"
        title="Get a direction before you commit to a programme."
        description="Use the assessment to understand your current position and the roles worth exploring. You can then compare the work, skills and preparation required."
        primaryLabel="Find my career path"
        primaryTo="/career-engine"
        secondaryLabel="Explore role intelligence"
        secondaryTo="/roles"
      />

      <section className="tone-light arzon-v2-section border-y border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container">
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="max-w-xl">
              <span className="arzon-v2-eyebrow">WHY ROLE-FIRST</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">
                Stop comparing courses. Start comparing the work.
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--arzon-ink-soft)]">
                A better career decision starts with the role. See the recurring tasks, skills, tools, eligibility and employer context before deciding how to prepare.
              </p>
              <Link to="/roles" className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--arzon-blue-700)]">
                Browse role profiles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {TRUST_POINTS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="arzon-v2-card p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--arzon-ink-strong)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="arzon-v2-section bg-[var(--arzon-surface)]">
        <div className="arzon-v2-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="arzon-v2-eyebrow">ROLE-FOCUSED PROGRAMMES</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">
                Prepare for the work, not just the syllabus.
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--arzon-ink-soft)]">
                Explore programmes built around specific roles, with practical work, projects and readiness checkpoints.
              </p>
            </div>
            <Link to="/courses" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[var(--arzon-blue-700)]">
              View programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_COURSES.map((course) => (
              <Link
                key={course.slug}
                to="/courses/$slug"
                params={{ slug: course.slug }}
                className="arzon-v2-card group p-5 transition hover:-translate-y-0.5 hover:border-[var(--arzon-border-strong)] hover:shadow-[var(--arzon-shadow-popover)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
                    <course.Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--arzon-blue-600)] transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-5 arzon-v2-data-label">{course.roleTitle ?? course.category}</p>
                <h3 className="mt-1 text-lg font-bold leading-6 text-[var(--arzon-ink-strong)]">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{course.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="tone-light rounded-md border border-[var(--arzon-border)] bg-white px-2 py-1 font-mono text-[10px] text-[var(--arzon-ink-soft)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--arzon-border)] bg-[var(--arzon-navy-950)] text-white">
        <div className="arzon-v2-container grid gap-8 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">FOR COLLEGES & EMPLOYERS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Use the same career intelligence with your students or hiring workflow.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Colleges can use role intelligence and readiness programmes for student preparation. Employers can review candidate evidence and role-specific readiness.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <Link to="/tpos" className="arzon-button-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              <GraduationCap className="h-4 w-4" /> For colleges
            </Link>
            <Link to="/recruiters" className="arzon-button-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              <BriefcaseBusiness className="h-4 w-4" /> For employers
            </Link>
          </div>
        </div>
      </section>

      <section className="tone-light arzon-v2-section bg-white">
        <div className="arzon-v2-container">
          <div className="arzon-v2-card bg-[var(--arzon-surface-blue)] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="arzon-v2-eyebrow">YOUR NEXT STEP</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink-strong)]">
                Start with clarity. Decide what to do next.
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--arzon-ink-soft)]">
                Take the free assessment, explore the recommended roles, and only then decide whether a programme is right for you.
              </p>
            </div>
            <Link to="/career-engine" className="arzon-button-primary mt-6 shrink-0 lg:mt-0">
              Find my career path <BarChart3 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
