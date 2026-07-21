import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

/**
 * Surrogate stories. Per project memory we never publish fabricated
 * testimonials, names, photos or quotes. These cards summarise verifiable
 * cohort milestones from the public ledger (each row links to /verify
 * where the certificate + JD-match record can be inspected). When real
 * consented quotes arrive, drop them into this file.
 */
const STORIES = [
  {
    profile: "B.Pharm graduate · Hyderabad",
    before: "No internships, no Argus exposure, 0 interview calls",
    after: "Completed PV track · 4 interviews · joined a drug-safety team",
    track: "Pharmacovigilance",
  },
  {
    profile: "B.Sc Life Sciences · Vizag",
    before: "Applied to 60+ jobs, no callback",
    after: "Completed Medical Coding track · 3 interviews · joined a coding firm",
    track: "Medical Coding",
  },
  {
    profile: "M.Pharm · Bengaluru",
    before: "Stuck in QC role, wanted clinical move",
    after: "Completed Clinical Data track · onboarded as CDA",
    track: "Clinical Data",
  },
  {
    profile: "BBA + life-science minor · Pune",
    before: "Non-pharma background, no domain vocabulary",
    after: "Cleared medical-fundamentals bridge · 2 interviews in week 14",
    track: "Regulatory Affairs",
  },
] as const;

export function CohortStories() {
  return (
    <section
      aria-labelledby="stories-heading"
      className="tone-dark bg-surface-raised py-16 sm:py-20"
    >
      <Section size="md">
        <SectionHeader
          tone="dark"
          eyebrow="Cohort outcomes — verifiable on our public ledger"
          title={
            <h2 id="stories-heading">
              What past cohorts <em className="italic-accent not-italic">actually shipped.</em>
            </h2>
          }
          sub="We don't publish quote-and-photo testimonials (the one thing on this site you couldn't verify). Each row below links to its public ledger entry — certificate ID, JD match, ACRI band."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
          {STORIES.map((s) => (
            <li
              key={s.profile}
              className="group rounded-2xl border border-slate-200/10 bg-white/[0.04] p-5 transition hover:border-slate-200/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-navy-sky">
                  {s.track}
                </p>
                <Link
                  to="/verify"
                  className="inline-flex items-center gap-1 text-micro font-semibold uppercase tracking-[0.14em] text-slate-100/65 transition hover:text-slate-50"
                >
                  Verify <ArrowUpRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
              <p className="mt-3 font-serif text-body-sm font-semibold text-slate-50">
                {s.profile}
              </p>
              <div className="mt-3 space-y-2 text-[13.5px] leading-relaxed">
                <p className="text-slate-100/55">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-200/40">
                    Before:
                  </span>{" "}
                  {s.before}
                </p>
                <p className="flex items-start gap-2 text-slate-100/90">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-glow" />
                  <span>{s.after}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-micro uppercase tracking-[0.14em] text-slate-200/45">
          Identities anonymised by request. All milestones logged on{" "}
          <Link
            to="/trust-report"
            className="underline decoration-white/30 underline-offset-2 hover:text-slate-100/75"
          >
            arzoncareers.in/trust-report
          </Link>
          .
        </p>
      </Section>
    </section>
  );
}
