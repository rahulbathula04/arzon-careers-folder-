import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ARZON_CORE_CAREERS } from "@/data/siteArchitecture";

export function ArzonCareerPathGrid() {
  return (
    <section className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] py-12 sm:py-16">
      <div className="arzon-v2-container">
        <div className="max-w-3xl">
          <span className="arzon-v2-eyebrow">CAREER PATHS</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-4xl">
            Choose the healthcare role you want to build toward.
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--arzon-ink-soft)]">
            Arzon connects role research, skill requirements, practical training and readiness evidence in one career system.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARZON_CORE_CAREERS.map((career) => (
            <Link
              key={career.href}
              to={career.href as any}
              className="group arzon-v2-card flex min-h-28 items-center justify-between gap-4 p-5 transition hover:-translate-y-0.5 hover:border-[#B9CCE6] hover:shadow-[var(--arzon-shadow-popover)]"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--arzon-ink)]">{career.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-muted)]">
                    Role, skills, employers and programme path
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[var(--arzon-blue-600)] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
