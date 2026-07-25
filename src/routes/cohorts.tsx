import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { PageCTA } from "@/components/landing/PageCTA";
import { COHORTS, SITE } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/cohorts")({
  head: () => {
    const ps = pageSeo({
      path: "/cohorts",
      title: "Cohort schedule. Arzon Global",
      description:
        "Upcoming pharmacovigilance, medical coding & clinical research internship cohorts in India. Start dates, fees, application windows and how to enrol.",
      image: SITE.ogImages.internships,
    });
    return {
      meta: [{ title: "Cohort schedule. Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: CohortsPage,
});

function CohortsPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Cohort schedule
        </p>
        <h1 className="h-display mt-3">Pick a cohort that fits your year.</h1>
        <p className="mt-4 max-w-2xl text-base text-white/70">
          Three cohorts a year. Live mentor sessions. Real client work. Applications stay open until
          one week before start.
        </p>

        <div className="mt-12 space-y-4">
          {COHORTS.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-glow" />
                  <p className="font-display text-h3 text-white">{c.label}</p>
                  <span className="inline-flex rounded-full bg-accent-glow/10 px-2 py-0.5 text-micro font-semibold text-eyebrow ring-1 ring-accent-glow/30">
                    Open
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Cohort starts {c.startsLabel}. Applications close{" "}
                  {new Date(c.applicationsCloseISO).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  .
                </p>
              </div>
              <Link
                to="/apply"
                className="tone-light inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold shadow-sm ring-1 ring-white/20 transition hover:bg-white/90"
                style={{ color: "#0a1229", boxShadow: "var(--shadow-glow)" }}
              >
                Apply for {c.label} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <ShieldCheck className="h-5 w-5 text-eyebrow" />
          <p className="mt-2 font-semibold text-white">Apply when you're ready.</p>
          <p className="mt-1 text-sm text-white/65">
            Pick the cohort that fits your schedule. That's the whole rule.
          </p>
        </div>
      </section>
      <PageCTA
        title="Ready to lock a cohort?"
        subtitle="Reserve your seat for the upcoming cohort. Select your programme on the next screen."
        primary={{
          label: "Start your application",
          to: "/apply",
          search: { source: "cohorts-cta" },
        }}
        secondary={{ label: "Browse programmes first", to: "/courses" }}
      />
      <Footer />
    </main>
  );
}
