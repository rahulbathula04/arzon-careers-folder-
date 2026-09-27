import { ArrowRight, CheckCircle2, FileSearch, GraduationCap, ShieldCheck, Users, BriefcaseBusiness, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_CAREERS, ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { ArzonCareerPathGrid } from "@/components/home/ArzonCareerPathGrid";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
).slice(0, 6);

const PROOF_POINTS = [
  {
    icon: FileSearch,
    title: "Role-first research",
    body: "Understand the job before choosing what to study. Arzon connects role pages, employer requirements and programme design.",
  },
  {
    icon: GraduationCap,
    title: "Applied learning",
    body: "Work through role-specific tasks, projects and review points instead of relying on course completion alone.",
  },
  {
    icon: ShieldCheck,
    title: "Readiness evidence",
    body: "Turn completed work and assessments into evidence that can be reviewed, verified and improved.",
  },
  {
    icon: Users,
    title: "Human career support",
    body: "When a decision needs context, move from the digital experience to a direct conversation with the Arzon team.",
  },
];

export function ArzonHomeV2() {
  return (
    <div className="arzon-v2-page min-h-screen antialiased">
      <section className="relative overflow-hidden border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--arzon-navy-950)]" />
        <div className="arzon-v2-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
          <div className="max-w-2xl">
            <span className="arzon-v2-eyebrow">ARZON GLOBAL · HEALTHCARE CAREER INTELLIGENCE</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[var(--arzon-ink)] sm:text-5xl lg:text-6xl">
              Build toward the healthcare role you want.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-7 text-[var(--arzon-ink)]">
              Understand the role. See the skills. Build the evidence. Move toward hiring.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--arzon-ink-soft)]">
              Arzon brings career research, readiness assessment, role-focused programmes and practical evidence into one system for healthcare and life-sciences graduates.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/career-engine" className="arzon-v2-button-primary group">
                Start My Career Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/courses" className="arzon-v2-button-secondary">
                Explore Programmes
              </Link>
            </div>

            <div className="mt-7 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--arzon-border)] pt-5 text-sm">
              {["Healthcare role pathways", "Employer-led skill mapping", "Applied projects", "Readiness evidence"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[var(--arzon-ink-soft)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="arzon-v2-card overflow-hidden bg-[var(--arzon-surface-blue)] p-5 sm:p-6">
            <div className="rounded-[var(--arzon-radius-lg)] bg-[var(--arzon-navy-950)] p-6 text-white">
              <p className="arzon-v2-data-label !text-[#BFD5F2]">HOW THE SYSTEM WORKS</p>
              <div className="mt-5 space-y-4">
                {[
                  ["01", "Choose a target role", "Start with the work, not the course catalogue."],
                  ["02", "See the requirement gap", "Compare your current readiness with role expectations."],
                  ["03", "Build missing capability", "Use projects, assessment and mentor review."],
                  ["04", "Create evidence", "Carry your work and readiness record forward."],
                ].map(([step, title, body]) => (
                  <div key={step} className="flex gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="font-mono text-sm text-[#8FB2D9]">{step}</span>
                    <div>
                      <h2 className="text-sm font-bold">{title}</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/why-arzon"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#BFD5F2]"
              >
                See how Arzon works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ArzonCareerPathGrid />

      <section className="arzon-v2-section border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="arzon-v2-container">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <span className="arzon-v2-eyebrow">WHY THE ROLE COMES FIRST</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-4xl">
                Stop comparing courses. Start comparing the work.
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--arzon-ink-soft)]">
                A healthcare career decision becomes clearer when you can see the role, software, recurring tasks, employer expectations and the evidence you will need to produce.
              </p>
              <Link to="/industry" className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--arzon-blue-700)]">
                Explore career intelligence <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROOF_POINTS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="arzon-v2-card p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--arzon-ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="arzon-v2-section bg-[var(--arzon-surface-subtle)]">
        <div className="arzon-v2-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="arzon-v2-eyebrow">ROLE READINESS PROGRAMMES</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-4xl">
                Programmes built around healthcare roles.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--arzon-ink-soft)]">
                Explore the core Arzon catalogue. Each programme should connect a target role to skills, tools, projects and readiness evidence.
              </p>
            </div>
            <Link to="/courses" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[var(--arzon-blue-700)]">
              View all programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_COURSES.slice(0, 6).map((course) => (
              <Link
                key={course.slug}
                to="/courses/$slug"
                params={{ slug: course.slug }}
                className="arzon-v2-card group p-5 transition hover:-translate-y-0.5 hover:border-[#B9CCE6] hover:shadow-[var(--arzon-shadow-popover)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
                    <course.Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--arzon-blue-600)] transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-5 arzon-v2-data-label">{course.roleTitle ?? course.category}</p>
                <h3 className="mt-1 text-lg font-bold leading-6 text-[var(--arzon-ink)]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{course.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-2.5 py-1 font-mono text-[10px] text-[var(--arzon-ink-soft)]">
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
        <div className="arzon-v2-container grid gap-10 py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="arzon-v2-data-label !text-[#BFD5F2]">FOR INSTITUTIONS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Build career-readiness into your college or hiring workflow.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Colleges can use role intelligence and readiness programmes for student preparation. Employers can review evidence and engage the Arzon talent pipeline.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/tpos" className="arzon-v2-button-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              <GraduationCap className="h-4 w-4" /> For Colleges
            </Link>
            <Link to="/recruiters" className="arzon-v2-button-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              <BriefcaseBusiness className="h-4 w-4" /> For Employers
            </Link>
          </div>
        </div>
      </section>

      <section className="arzon-v2-section bg-white tone-light">
        <div className="arzon-v2-container">
          <div className="arzon-v2-card bg-[var(--arzon-surface-blue)] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="arzon-v2-eyebrow">NEXT STEP</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink)]">
                Get a career plan before you spend money on training.
              </h2>
              <p className="mt-3 text-base leading-7 text-[var(--arzon-ink-soft)]">
                Start with the assessment. See the recommended path and your current gaps. Then decide whether an Arzon programme is the right next step.
              </p>
            </div>
            <Link to="/career-engine" className="arzon-v2-button-primary mt-6 shrink-0 lg:mt-0">
              Get My Career Plan <BarChart3 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)]">
        <div className="arzon-v2-container flex flex-col gap-3 py-6 text-xs text-[var(--arzon-ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Arzon Global · Healthcare career intelligence and role readiness</span>
          <Link to="/why-arzon" className="font-semibold text-[var(--arzon-blue-700)]">
            See our evidence and methodology
          </Link>
        </div>
      </div>
    </div>
  );
}
