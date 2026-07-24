import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2, Hammer, Sparkles, Timer, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { listDemandTracks, type DemandTrack } from "@/lib/demand.functions";
import { pageSeo } from "@/lib/seo";

type TabKey = "voting" | "building" | "live";

const TABS: { key: TabKey; label: string; icon: typeof Users; blurb: string }[] = [
  {
    key: "voting",
    label: "Demand forming",
    icon: Users,
    blurb: "Verified requests are stacking up. 25 unlock a build.",
  },
  {
    key: "building",
    label: "Under build",
    icon: Hammer,
    blurb: "Curriculum, mentors, assessments and internships shipping in public.",
  },
  {
    key: "live",
    label: "Live tracks",
    icon: CheckCircle2,
    blurb: "Built on verified demand. Now open for enrolment.",
  },
];

export const Route = createFileRoute("/build/")({
  head: () => {
    const title = "Build pipeline — Arzon Careers";
    const description =
      "We build tracks where verified demand exists. Watch the pipeline ship — voting, building, live.";
    const ps = pageSeo({ path: "/build", title, description });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: BuildPipelinePage,
});

function pct(t: DemandTrack) {
  return Math.min(100, Math.round((t.votes_count / Math.max(1, t.vote_threshold)) * 100));
}
function daysLeft(t: DemandTrack) {
  if (!t.launch_eta) return null;
  const diff = new Date(t.launch_eta).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

function BuildPipelinePage() {
  const fetcher = useServerFn(listDemandTracks);
  const { data, isLoading } = useQuery({
    queryKey: ["demand", "all"],
    queryFn: () => fetcher(),
    staleTime: 60_000,
  });
  const tracks = data?.tracks ?? [];
  const [tab, setTab] = useState<TabKey>("building");

  const counts = useMemo(
    () => ({
      voting: tracks.filter((t) => t.status === "voting").length,
      building: tracks.filter((t) => t.status === "building").length,
      live: tracks.filter((t) => t.status === "live").length,
    }),
    [tracks],
  );

  const filtered = tracks.filter((t) => t.status === tab);
  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <main className="min-h-dvh bg-white text-ink">
      <Section size="md" containerSize="lg">
        <SectionHeader
          eyebrow="The Arzon build pipeline"
          title={
            <>
              <span className="italic-accent not-italic">
                We build workforce infrastructure where verified demand exists.
              </span>
            </>
          }
          sub={
            <>
              Every track here passed through the same three stages:{" "}
              <strong>demand forming → under build → live</strong>. Public timelines, named mentors,
              dated milestones. No vapourware.
            </>
          }
        />

        {/* Tab bar */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div
            role="tablist"
            aria-label="Pipeline stage"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-white/80 p-1.5 shadow-sm backdrop-blur"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-meta font-semibold transition-all sm:text-caption ${
                    active
                      ? "bg-ink text-white shadow-[0_6px_18px_-8px_rgba(15,23,42,0.6)]"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                  <span
                    className={`ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-mono text-micro ${
                      active ? "bg-white/20 text-white" : "bg-ink/8 text-ink/70"
                    }`}
                  >
                    {counts[t.key]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="max-w-xl text-center text-caption leading-relaxed text-ink/65">
            {activeTab.blurb}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 motion-safe:animate-pulse rounded-2xl border border-ink/5 bg-ink/[0.03]"
              />
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-ink/15 bg-white p-10 text-center">
              <p className="font-display text-lg text-ink">Nothing in this stage yet.</p>
              <p className="mt-2 text-caption text-ink/65">
                Don&rsquo;t see what you need?{" "}
                <Link
                  to="/build/request"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Request a track
                </Link>{" "}
                and we&rsquo;ll open voting.
              </p>
            </div>
          ) : (
            filtered.map((t) => <TrackCard key={t.id} t={t} />)
          )}
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-gradient-to-br from-white to-[oklch(0.97_0.01_220)] p-8 text-center">
          <p className="font-mono text-micro font-bold uppercase tracking-[0.18em] text-[color:var(--teal-ink)]">
            Don&rsquo;t see your role?
          </p>
          <h3 className="max-w-xl font-display text-h3 font-semibold leading-tight text-ink sm:text-h2">
            Request a track. If 25 verified peers want the same thing, we build it.
          </h3>
          <Link to="/build/request" className="btn btn-primary btn-md mt-2">
            Request a track <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </main>
  );
}

function TrackCard({ t }: { t: DemandTrack }) {
  const isBuilding = t.status === "building";
  const isLive = t.status === "live";
  const left = daysLeft(t);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_-24px_rgba(15,23,42,0.25)]">
      <div className="flex items-center justify-between border-b border-ink/5 p-4 sm:p-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] ${
            isLive
              ? "bg-sky-50 text-sky-800 ring-1 ring-sky-200"
              : isBuilding
                ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
          }`}
        >
          {isLive ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : isBuilding ? (
            <Hammer className="h-3 w-3" />
          ) : (
            <Users className="h-3 w-3" />
          )}
          {isLive ? "Live" : isBuilding ? "Under build" : "Voting open"}
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/55">
          {t.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-body font-bold leading-tight text-ink sm:text-body-lg">
          {t.title}
        </h3>
        {t.pitch && (
          <p className="mt-2 text-caption leading-relaxed text-slate-600 line-clamp-3">{t.pitch}</p>
        )}

        {!isLive && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-micro font-medium text-ink/70">
              <span>
                {t.votes_count} / {t.vote_threshold} verified
              </span>
              <span>{pct(t)}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.14_220)]"
                style={{ width: `${pct(t)}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-5 text-micro text-ink/65">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">
              <CheckCircle2 className="h-3 w-3" /> Enrolment open
            </span>
          ) : isBuilding && left !== null ? (
            <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">
              <Timer className="h-3 w-3" /> {left} days to launch
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">
              <Sparkles className="h-3 w-3" /> Founding cohort open
            </span>
          )}
          {isLive && t.live_course_slug ? (
            <Link
              to="/courses/$slug"
              params={{ slug: t.live_course_slug }}
              className="inline-flex items-center gap-1 text-meta font-semibold text-primary"
            >
              View track <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link
              to="/build/$slug"
              params={{ slug: t.slug }}
              className="inline-flex items-center gap-1 text-meta font-semibold text-primary"
            >
              {isBuilding ? "Watch build" : "Apply"} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
