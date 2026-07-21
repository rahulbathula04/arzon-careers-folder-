import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyEnrolments, getMySubmissions } from "@/lib/learner.functions";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, GraduationCap, Inbox, LogOut, BookOpen, Loader2 } from "lucide-react";
import { TIER_META } from "@/data/enrolmentTiers";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Your cohort · Arzon Careers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LearnerShell,
});

function LearnerShell() {
  const fetchEnrolments = useServerFn(getMyEnrolments);
  const fetchSubmissions = useServerFn(getMySubmissions);

  const enrolQuery = useQuery({
    queryKey: ["my-enrolments"],
    queryFn: () => fetchEnrolments({}),
  });
  const subQuery = useQuery({
    queryKey: ["my-submissions"],
    queryFn: () => fetchSubmissions({}),
  });

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const enrolments = enrolQuery.data ?? [];
  const active = enrolments.find((e) => e.status === "active") ?? enrolments[0];
  const submissions = subQuery.data ?? [];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            Arzon Careers
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold md:text-3xl">Your cohort</h1>

        {enrolQuery.isLoading ? (
          <div className="mt-8 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden /> Loading your
            enrolment…
          </div>
        ) : !active ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
            <GraduationCap className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
              No active enrolment yet. If you just paid, allow a few minutes for provisioning.
            </p>
            <Link
              to="/enrol"
              className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              See enrolment tiers
            </Link>
          </div>
        ) : (
          <>
            {/* Cohort card */}
            <section className="mt-6 rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {TIER_META[active.tier as keyof typeof TIER_META]?.name ?? active.tier}
              </p>
              <h2 className="mt-1 text-xl font-semibold">Cohort {active.cohort_id ?? "—"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Status: <span className="font-medium text-foreground">{active.status}</span>
                {active.paid_at && (
                  <> · enrolled {new Date(active.paid_at).toLocaleDateString("en-IN")}</>
                )}
              </p>
            </section>

            {/* Three columns */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card icon={BookOpen} title="Syllabus" desc="40 / 30 / 20 / 10 module map">
                <Link to="/curriculum" className="text-sm text-primary hover:underline">
                  Open syllabus →
                </Link>
              </Card>
              <Card icon={Calendar} title="Next session" desc="Live cohort call">
                <p className="text-sm text-muted-foreground">
                  Session times are shared in your WhatsApp cohort group. Calendar sync is on the
                  roadmap.
                </p>
              </Card>
              <Card icon={Inbox} title="Submissions" desc={`${submissions.length} in inbox`}>
                <SubmissionSummary submissions={submissions} loading={subQuery.isLoading} />
              </Card>
            </div>

            {/* Submissions inbox */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold">Recent submissions</h3>
              {subQuery.isLoading ? (
                <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
              ) : submissions.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Nothing submitted yet. Your first assignment appears here once a mentor posts it
                  inside the WhatsApp cohort group.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                  {submissions.map((s) => (
                    <li key={s.id} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {new Date(s.submitted_at).toLocaleDateString("en-IN")}
                          {s.reviewed_at && (
                            <> · reviewed {new Date(s.reviewed_at).toLocaleDateString("en-IN")}</>
                          )}
                        </p>
                      </div>
                      <StatusChip status={s.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof BookOpen;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
      <p className="text-sm font-semibold">{title}</p>
      <p className="mb-3 text-xs text-muted-foreground">{desc}</p>
      {children}
    </div>
  );
}

function SubmissionSummary({
  submissions,
  loading,
}: {
  submissions: Array<{ status: string }>;
  loading: boolean;
}) {
  if (loading) return <p className="text-sm text-muted-foreground">…</p>;
  const pending = submissions.filter((s) => s.status === "submitted").length;
  const reviewed = submissions.filter((s) => s.status === "reviewed").length;
  return (
    <p className="text-sm text-muted-foreground">
      {pending} awaiting review · {reviewed} reviewed
    </p>
  );
}

function StatusChip({ status }: { status: string }) {
  const cls =
    status === "reviewed"
      ? "bg-sky-500/10 text-sky-500"
      : status === "returned"
        ? "bg-amber-500/10 text-amber-500"
        : "bg-primary/10 text-primary";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}
