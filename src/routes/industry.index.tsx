import { createFileRoute, Link } from "@tanstack/react-router";
import { ROLES } from "@/data/industry/roles";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, TrendingUp, Building2, Globe2, Download } from "lucide-react";
import { exportIndustrySummaryPDF } from "@/lib/industry-pdf";
import { IndustryReadinessCTA } from "@/components/industry/IndustryReadinessCTA";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/industry/")({
  component: IndustryHub,
  head: () => {
    const ps = pageSeo({
      path: "/industry",
      title: "Industry Intelligence, India 2026, Arzon",
      description:
        "Real pay bands, top employers, career ladders and abroad markets for PV, Medical Coding, CDM and more. Sourced from JD scrapes and refreshed quarterly.",
    });
    return {
      meta: [{ title: "Industry Intelligence, India 2026, Arzon" }, ...ps.meta],
      links: ps.links,
    };
  },
});

function IndustryHub() {
  return (
    <div className="arzon-v2-page min-h-dvh bg-white tone-light text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE"
        title="Understand the healthcare jobs market before you choose what to study."
        description="Explore role definitions, pay bands, employers, career ladders and source notes. Use the research to choose a target role, then move into readiness assessment."
        mobileImageSrc="/images/bpharm-students-group.jpg"
        mobileImageAlt="Healthcare students exploring career pathways"
      />

      <ArzonDecisionHub
        eyebrow="CAREER INTELLIGENCE → CAREER DECISION"
        title="Use the market data to choose a direction."
        description="Compare roles, pay, employers and skill requirements first. Then use the Career Engine to turn that research into a personal next step."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Browse Role Profiles"
        secondaryTo="/roles"
      />

      <main className="arzon-v2-container pb-24 pt-10">
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => exportIndustrySummaryPDF()}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--arzon-border)] bg-[var(--arzon-blue-100)] px-4 py-2 text-sm font-medium text-[var(--arzon-blue-700)] hover:bg-[var(--arzon-blue-100)]"
          >
            <Download className="h-4 w-4" />
            Download full PDF summary
          </button>
          <span className="self-center text-meta text-[var(--arzon-ink-soft)]">
            All 5 roles · pay, employers, abroad markets, sources.
          </span>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link
            to="/industry/salaries"
            search={{ city: "all", exp: "fresher", role: "all" }}
            className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 hover:bg-[var(--arzon-surface-blue)]"
          >
            <TrendingUp className="h-5 w-5 text-[var(--arzon-blue-700)]" />
            <p className="mt-2 text-sm font-semibold">Salary tables</p>
            <p className="text-meta text-[var(--arzon-ink-soft)]">Pay by role, city, experience.</p>
          </Link>
          <Link
            to="/industry/employers"
            search={{ city: "all", role: "all", tier: "all" }}
            className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 hover:bg-[var(--arzon-surface-blue)]"
          >
            <Building2 className="h-5 w-5 text-[var(--arzon-blue-700)]" />
            <p className="mt-2 text-sm font-semibold">Top employers</p>
            <p className="text-meta text-[var(--arzon-ink-soft)]">~30 firms, what they pay at L1.</p>
          </Link>
          <Link
            to="/industry/compare"
            className="rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 hover:bg-[var(--arzon-surface-blue)]"
          >
            <Globe2 className="h-5 w-5 text-[var(--arzon-blue-700)]" />
            <p className="mt-2 text-sm font-semibold">Compare all 5</p>
            <p className="text-meta text-[var(--arzon-ink-soft)]">Side-by-side: pay, demand, AI risk.</p>
          </Link>
        </div>

        <div className="mt-12">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-[var(--arzon-ink-soft)]">
            Role profiles
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.slug}
                className="group flex flex-col rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5 transition hover:border-white/20 hover:bg-[var(--arzon-surface-blue)]"
              >
                <Link to="/industry/$role" params={{ role: r.slug }} className="block">
                  <p className="font-mono text-micro uppercase tracking-[0.18em] text-[var(--arzon-ink-soft)]">
                    {r.shortName}
                  </p>
                  <p className="mt-1 text-base font-semibold text-[var(--arzon-ink)]">{r.name}</p>
                  <p className="mt-2 text-meta text-[var(--arzon-ink-muted)]">{r.tagline}</p>
                </Link>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--arzon-border)] pt-3 text-meta">
                  <Link
                    to="/industry/$role"
                    params={{ role: r.slug }}
                    className="inline-flex items-center text-[var(--arzon-ink-soft)] hover:text-[var(--arzon-ink)]"
                  >
                    Open profile{" "}
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/enrol"
                    search={{ programme: r.arzonCourseSlug, source: `industry-hub-${r.slug}` }}
                    className="inline-flex items-center font-semibold text-[var(--arzon-blue-700)] hover:underline"
                  >
                    Apply for {r.shortName} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-micro text-[var(--arzon-ink-muted)]">
            More roles (SAS Programming, Clinical Research, RCM, Healthcare IT) ship next cohort.
          </p>
        </div>

        <IndustryReadinessCTA
          source="industry-hub"
          context='Five roles. Real pay. The honest answer to "am I ready?" takes three minutes.'
        />
      </main>
    </div>
  );
}
