import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ROLES } from "@/data/industry/roles";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, TrendingUp, Building2, Globe2, Download } from "lucide-react";
import { exportIndustrySummaryPDF } from "@/lib/industry-pdf";
import { IndustryReadinessCTA } from "@/components/industry/IndustryReadinessCTA";

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
    <div className="min-h-dvh bg-[#070A14] text-white">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-white/70">
          Industry Intelligence
        </p>
        <h1 className="mt-2 text-h1 font-semibold text-white">
          What hiring actually pays in India, 2026.
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/70">
          We scrape the JD boards, talk to alumni inside these firms, and publish the numbers. No
          staffing-agency spin, no LinkedIn brag-posts. Refreshed every quarter.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => exportIndustrySummaryPDF()}
            className="inline-flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/20"
          >
            <Download className="h-4 w-4" />
            Download full PDF summary
          </button>
          <span className="self-center text-meta text-white/70">
            All 5 roles · pay, employers, abroad markets, sources.
          </span>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link
            to="/industry/salaries"
            search={{ city: "all", exp: "fresher", role: "all" }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05]"
          >
            <TrendingUp className="h-5 w-5 text-gold" />
            <p className="mt-2 text-sm font-semibold">Salary tables</p>
            <p className="text-meta text-white/80">Pay by role, city, experience.</p>
          </Link>
          <Link
            to="/industry/employers"
            search={{ city: "all", role: "all", tier: "all" }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05]"
          >
            <Building2 className="h-5 w-5 text-gold" />
            <p className="mt-2 text-sm font-semibold">Top employers</p>
            <p className="text-meta text-white/80">~30 firms, what they pay at L1.</p>
          </Link>
          <Link
            to="/industry/compare"
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.05]"
          >
            <Globe2 className="h-5 w-5 text-gold" />
            <p className="mt-2 text-sm font-semibold">Compare all 5</p>
            <p className="text-meta text-white/80">Side-by-side: pay, demand, AI risk.</p>
          </Link>
        </div>

        <div className="mt-12">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/70">
            Role profiles
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.slug}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <Link to="/industry/$role" params={{ role: r.slug }} className="block">
                  <p className="font-mono text-micro uppercase tracking-[0.18em] text-white/70">
                    {r.shortName}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">{r.name}</p>
                  <p className="mt-2 text-meta text-white/65">{r.tagline}</p>
                </Link>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3 text-meta">
                  <Link
                    to="/industry/$role"
                    params={{ role: r.slug }}
                    className="inline-flex items-center text-white/70 hover:text-white"
                  >
                    Open profile{" "}
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/apply"
                    search={{ programme: r.arzonCourseSlug, source: `industry-hub-${r.slug}` }}
                    className="inline-flex items-center font-semibold text-gold hover:underline"
                  >
                    Apply for {r.shortName} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-micro text-white/65">
            More roles (SAS Programming, Clinical Research, RCM, Healthcare IT) ship next cohort.
          </p>
        </div>

        <IndustryReadinessCTA
          source="industry-hub"
          context='Five roles. Real pay. The honest answer to "am I ready?" takes three minutes.'
        />
      </main>
      <Footer />
    </div>
  );
}
