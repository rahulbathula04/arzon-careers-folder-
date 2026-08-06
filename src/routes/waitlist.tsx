import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Lock, MessageCircle, Users2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/landing/CTAButton";
import { ACTIVE_COHORT_ID, cohortWaitlistUrl, getCohortStatus } from "@/lib/cohort.functions";
import { trackCohort } from "@/lib/cohortAnalytics";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/waitlist")({
  head: () => {
    const seo = pageSeo({
      path: "/waitlist",
      title: "Cohort waitlist · Arzon Careers",
      description:
        "The current cohort is locked. Join the WhatsApp waitlist and we'll hold your seat for the next batch.",
      noindex: true,
    });
    return {
      meta: [{ title: "Cohort waitlist · Arzon Careers" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: WaitlistPage,
});

function formatStart(iso?: string): string {
  if (!iso) return "next batch";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function WaitlistPage() {
  const q = useQuery({
    queryKey: ["cohort-status", ACTIVE_COHORT_ID],
    queryFn: () => getCohortStatus({ data: { id: ACTIVE_COHORT_ID } }),
    staleTime: 30_000,
  });

  const status = q.data;
  const label = status?.displayLabel ?? "Upcoming cohort";
  const seatsCap = status?.seatsCap ?? 60;
  const startsAt = formatStart(status?.startsAt);
  const waitlistHref = cohortWaitlistUrl(label);

  useEffect(() => {
    trackCohort("waitlist_page_viewed", {
      cohort_id: status?.id ?? ACTIVE_COHORT_ID,
      effective_locked: status?.effectiveLocked ?? false,
    });
    // Fire once when status first resolves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status?.id]);

  return (
    <Section id="waitlist" size="lg">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-meta text-slate-500 transition hover:text-slate-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 font-mono text-micro uppercase tracking-[0.22em] text-rose-700">
          <Lock className="h-3 w-3" /> Cohort locked
        </div>

        <h1 className="mt-4 font-display text-h1 font-bold leading-tight text-ink">
          The <em className="italic-accent not-italic">{label}</em> cohort is full.
        </h1>
        <p className="mt-3 text-body text-slate-600">
          We cap every batch at {seatsCap} seats so mentors stay reachable. The next batch opens
          shortly - message us on WhatsApp and we'll hold a seat for you first.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="card-light rounded-2xl p-4">
            <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary">
              <CalendarDays className="h-3.5 w-3.5" /> Original start
            </div>
            <div className="mt-2 font-display text-h3 font-bold text-ink">{startsAt}</div>
          </div>
          <div className="card-light rounded-2xl p-4">
            <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-primary">
              <Users2 className="h-3.5 w-3.5" /> Capacity
            </div>
            <div className="mt-2 font-display text-h3 font-bold text-ink">
              {seatsCap} seats · Full
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={waitlistHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="waitlist-whatsapp"
            onClick={() =>
              trackCohort("waitlist_whatsapp_clicked", {
                cohort_id: status?.id ?? ACTIVE_COHORT_ID,
              })
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 text-white" />
            <span>Message on WhatsApp</span>
          </a>
          <Link
            to="/courses"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white tone-light hover:bg-slate-50 px-6 text-sm font-bold text-[#0F172A] shadow-sm transition-all"
          >
            <span>Browse other programmes</span>
          </Link>
        </div>

        <p className="mt-6 text-meta text-slate-500">
          We reply within a few hours on weekdays. No spam, no auto-DMs.
        </p>
      </div>
    </Section>
  );
}
