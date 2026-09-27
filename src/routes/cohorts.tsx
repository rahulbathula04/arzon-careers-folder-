import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { COHORTS, SITE } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/cohorts")({
  head: () => {
    const ps = pageSeo({
      path: "/cohorts",
      title: "Upcoming programme cohorts · Arzon Global",
      description: "Review upcoming Arzon programme cohorts, start dates and application windows, then choose the right role and programme path.",
      image: SITE.ogImages.internships,
    });
    return { meta: [{ title: "Upcoming programme cohorts · Arzon Global" }, ...ps.meta], links: ps.links };
  },
  component: CohortsPage,
});

function CohortsPage() {
  return (
    <div className="arzon-v2-page min-h-screen bg-white tone-light text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow="PROGRAMMES · UPCOMING COHORTS"
        title="Choose a cohort after you know which career path you are building toward."
        description="Review upcoming start dates and application windows. Use the free Career Engine or programme catalogue first when you still need help deciding what to study."
        mobileImageSrc="/images/bpharm-students-group.jpg"
        mobileImageAlt="Indian healthcare students preparing for a programme cohort"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">Get My Career Plan <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/courses" className="arzon-v2-button-secondary">Explore Programmes</Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="BEFORE YOU RESERVE A SEAT"
        title="Know your role and programme before the cohort date."
        description="Start with career clarity, then use the cohort schedule to choose timing. The same programme context follows into enrolment."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Programmes"
        secondaryTo="/courses"
      />

      <main className="arzon-v2-container pb-24 pt-12">
        <section className="space-y-6">
          <div>
            <span className="arzon-v2-eyebrow">COHORT SCHEDULE</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--arzon-ink)]">Upcoming programme starts</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--arzon-ink-soft)]">Choose a start date after you have selected the programme that matches your career goal.</p>
          </div>

          <div className="space-y-4">
            {COHORTS.map((c) => (
              <article key={c.id} className="arzon-v2-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]"><Calendar className="h-5 w-5" /></span>
                    <h3 className="text-xl font-bold text-[var(--arzon-ink)]">{c.label}</h3>
                    <span className="rounded-full border border-[var(--arzon-teal-100)] bg-[var(--arzon-teal-100)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-teal-600)]">Open</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--arzon-ink-soft)]">Starts {c.startsLabel}. Applications close {new Date(c.applicationsCloseISO).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.</p>
                </div>
                <Link to="/enrol" className="arzon-v2-button-primary shrink-0">Start Application <ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>

          <div className="arzon-v2-card bg-[var(--arzon-surface-subtle)] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-[var(--arzon-blue-700)]" />
              <div>
                <h3 className="font-bold text-[var(--arzon-ink)]">Need help before applying?</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--arzon-ink-soft)]">Use the Career Engine to understand the roles and skills first, then return here when you are ready to choose a cohort date.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
