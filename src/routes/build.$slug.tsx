import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Circle,
  GraduationCap,
  Hammer,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import {
  getDemandTrackBySlug,
  type DemandMilestone,
  type DemandPartner,
} from "@/lib/demand.functions";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/build/$slug")({
  loader: async ({ params }) => {
    const data = await getDemandTrackBySlug({ data: { slug: params.slug } });
    if (!data.track) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const t = loaderData?.track;
    const title = t ? `${t.title} - build log` : "Track build - Arzon Careers";
    const desc = t?.pitch
      ? t.pitch.slice(0, 155)
      : "Public build log: curriculum, mentors, assessments and internships shipping in the open.";
    const slug = params?.slug ?? t?.slug ?? "";
    const ps = pageSeo({ path: `/build/${slug}`, title, description: desc });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  notFoundComponent: TrackNotFound,
  errorComponent: TrackErrorComponent,
  component: TrackDetail,
  pendingComponent: () => (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 motion-safe:animate-pulse">
      <div className="h-3 w-20 rounded bg-black/10" />
      <div className="mt-4 h-9 w-1/2 rounded-xl bg-black/10" />
      <div className="mt-3 h-4 w-3/4 rounded bg-black/10" />
      <div className="mt-8 h-48 rounded-3xl bg-black/10" />
      <div className="mt-6 h-40 rounded-2xl bg-black/10" />
      <div className="mt-4 h-40 rounded-2xl bg-black/10" />
    </div>
  ),
});

function TrackNotFound() {
  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-mono text-meta font-semibold uppercase tracking-[0.18em] text-black/60">
          404 · track not found
        </p>
        <h1 className="mt-3 font-display text-h2 font-semibold text-black">
          This track isn&rsquo;t in the pipeline.
        </h1>
        <p className="mt-3 text-body-sm leading-relaxed text-black/70">
          It may have been renamed or it hasn&rsquo;t been requested yet.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/build" className="btn btn-secondary btn-md">
            All tracks
          </Link>
          <Link to="/build/request" className="btn btn-primary btn-md">
            Request a track
          </Link>
        </div>
      </div>
    </main>
  );
}

function TrackErrorComponent({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-h3 font-semibold text-black">
          Couldn&rsquo;t load this track.
        </h1>
        <p className="mt-3 text-body-sm leading-relaxed text-black/70">{error.message}</p>
        <button
          type="button"
          onClick={() => router.invalidate()}
          className="btn btn-primary btn-md mt-5"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

function fmtDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function TrackDetail() {
  const data = Route.useLoaderData();
  const track = data.track!;
  const milestones = data.milestones as DemandMilestone[];
  const partners = data.partners as DemandPartner[];

  const mentors = partners.filter((p) => p.type === "mentor");
  const internships = partners.filter((p) => p.type === "internship");

  const isLive = track.status === "live";
  const isBuilding = track.status === "building";

  const donePct = milestones.length
    ? Math.round((milestones.filter((m) => m.status === "done").length / milestones.length) * 100)
    : 0;

  const launchLabel = fmtDate(track.launch_eta) ?? `${track.eta_days} days`;
  const seatsLeft = Math.max(0, track.founding_cap - track.founding_filled);

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <Link
          to="/build"
          className="inline-flex items-center gap-1.5 text-caption font-semibold text-black/70 hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All tracks
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <StatusBadge status={track.status} />
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-black/60">
            {track.category}
          </span>
        </div>

        <h1 className="mt-4 font-display text-h1 font-bold text-black">{track.title}</h1>
        {track.pitch && (
          <p className="mt-4 max-w-2xl text-body leading-relaxed text-black/75">{track.pitch}</p>
        )}

        {/* Stat tiles */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat
            label="Verified demand"
            value={`${track.votes_count} / ${track.vote_threshold}`}
            sub={
              isLive
                ? "Threshold met"
                : `${Math.min(100, Math.round((track.votes_count / Math.max(1, track.vote_threshold)) * 100))}% of threshold`
            }
          />
          <Stat
            label={isLive ? "Launched" : "Launch ETA"}
            value={launchLabel}
            icon={<Timer className="h-4 w-4 text-black/70" />}
          />
          <Stat
            label="Founding cohort"
            value={`${track.founding_filled} / ${track.founding_cap}`}
            sub={seatsLeft > 0 ? `${seatsLeft} seats left` : "Cohort full"}
          />
        </div>

        {/* Build log */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60">
                Build log
              </p>
              <h2 className="mt-1 font-display text-h3 font-bold text-black">
                Milestones · public & dated
              </h2>
            </div>
            {milestones.length > 0 && (
              <span className="font-mono text-meta font-semibold text-black/65">
                {donePct}% done
              </span>
            )}
          </div>

          {milestones.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center">
              <p className="text-body-sm text-black/70">
                Build log opens when the voting threshold is met. Cast your vote to fast-track it.
              </p>
            </div>
          ) : (
            <ol className="mt-5 space-y-3">
              {milestones.map((m: DemandMilestone, i: number) => (
                <li
                  key={m.id}
                  className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  <MilestoneIcon status={m.status} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-micro font-semibold text-black/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body-sm font-semibold text-black">{m.label}</p>
                    </div>
                    <p className="mt-1 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-black/60">
                      {m.status.replace(/_/g, " ")}
                      {m.completed_at && m.status === "done" && (
                        <span className="ml-2 text-black/55">· {fmtDate(m.completed_at)}</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Partners */}
        <section className="mt-14">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60">
            Confirmed partners
          </p>
          <h2 className="mt-1 font-display text-h3 font-bold text-black">
            Mentors & internship hosts
          </h2>
          <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-black/70">
            We only ship a track once mentors and internship partners are committed in writing.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <PartnerGroup
              icon={<GraduationCap className="h-4 w-4" />}
              title="Mentors"
              partners={mentors}
              emptyLabel="Mentor outreach in progress."
            />
            <PartnerGroup
              icon={<Briefcase className="h-4 w-4" />}
              title="Internship partners"
              partners={internships}
              emptyLabel="Internship MOUs in negotiation."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[oklch(0.97_0.01_220)] p-8 text-center">
          {isLive && track.live_course_slug ? (
            <>
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]">
                Now live
              </p>
              <h3 className="mt-2 font-display text-h3 font-bold text-black sm:text-h2">
                Enrolment is open. Join the next cohort.
              </h3>
              <Link
                to="/courses/$slug"
                params={{ slug: track.live_course_slug }}
                className="btn btn-primary btn-md mt-5"
              >
                View live track <ArrowUpRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]">
                {isBuilding ? "Reserve a founding seat" : "Cast your verified vote"}
              </p>
              <h3 className="mt-2 font-display text-h3 font-bold text-black sm:text-h2">
                {isBuilding
                  ? `${seatsLeft > 0 ? seatsLeft + " seats left in the founding cohort." : "Cohort is full - join the waitlist."}`
                  : "25 verified votes unlock the build."}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-body-sm leading-relaxed text-black/70">
                Verified votes are tied to a phone number and a small refundable hold. No anonymous
                demand.
              </p>
              <Link to="/build/request" className="btn btn-primary btn-md mt-5">
                {isBuilding ? "Apply" : "Cast vote"} <Sparkles className="h-4 w-4" />
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: "voting" | "building" | "live" }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-sky-800 ring-1 ring-sky-200">
        <CheckCircle2 className="h-3 w-3" /> Live
      </span>
    );
  }
  if (status === "building") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-amber-800 ring-1 ring-amber-200">
        <Hammer className="h-3 w-3" /> Under build
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] text-slate-700 ring-1 ring-slate-200">
      <Users className="h-3 w-3" /> Voting open
    </span>
  );
}

function MilestoneIcon({ status }: { status: "pending" | "in_progress" | "done" }) {
  if (status === "done") return <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />;
  if (status === "in_progress") return <Hammer className="mt-0.5 h-5 w-5 text-amber-600" />;
  return <Circle className="mt-0.5 h-5 w-5 text-black/30" />;
}

function Stat({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-black/60">
        {label}
      </p>
      <p className="mt-1.5 inline-flex items-center gap-1.5 font-display text-h4 font-bold text-black">
        {icon}
        {value}
      </p>
      {sub && <p className="mt-0.5 text-meta text-black/65">{sub}</p>}
    </div>
  );
}

function PartnerGroup({
  icon,
  title,
  partners,
  emptyLabel,
}: {
  icon: React.ReactNode;
  title: string;
  partners: DemandPartner[];
  emptyLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex items-center gap-2 text-black">
        <span className="text-[color:var(--teal-ink)]">{icon}</span>
        <p className="font-mono text-micro font-bold uppercase tracking-[0.16em]">{title}</p>
        <span className="ml-auto font-mono text-micro font-semibold text-black/55">
          {partners.length}
        </span>
      </div>
      {partners.length === 0 ? (
        <p className="mt-3 text-caption text-black/65">{emptyLabel}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {partners.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-lg border border-black/8 bg-white p-3"
            >
              {p.logo_url ? (
                <img
                  src={p.logo_url}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  className="h-8 w-8 flex-shrink-0 rounded object-contain"
                />
              ) : (
                <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-[#0a0c10]/5 text-micro font-bold text-black/60">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-body-sm font-semibold text-black">{p.name}</p>
                {p.confirmed_at && (
                  <p className="font-mono text-micro text-black/55">
                    Confirmed · {fmtDate(p.confirmed_at)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
