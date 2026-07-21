import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Sparkles, Users, Hammer, Timer } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { listFeaturedDemandTracks, type DemandTrack } from "@/lib/demand.functions";

function pct(t: DemandTrack) {
  return Math.min(100, Math.round((t.votes_count / Math.max(1, t.vote_threshold)) * 100));
}
function daysLeft(t: DemandTrack) {
  if (!t.launch_eta) return null;
  const diff = new Date(t.launch_eta).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function DemandUnlockStrip() {
  const fetcher = useServerFn(listFeaturedDemandTracks);
  const { data } = useQuery({
    queryKey: ["demand", "featured"],
    queryFn: () => fetcher(),
    staleTime: 60_000,
  });
  const tracks = data?.tracks ?? [];
  if (tracks.length === 0) return null;

  return (
    <Section id="demand-unlock" size="lg">
      <SectionHeader
        eyebrow="Demand-driven build pipeline"
        title={
          <>
            <span className="italic-accent not-italic">
              We build tracks where verified demand exists.
            </span>
          </>
        }
        sub={
          <>
            Twenty-five verified requests unlock a new track. From day one, the build is{" "}
            <strong>public, dated, and operationally accountable</strong> curriculum, mentors,
            assessments, internships, certificates. You watch it ship.
          </>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:mt-12 md:grid-cols-3">
        {tracks.map((t) => {
          const isBuilding = t.status === "building";
          const left = daysLeft(t);
          return (
            <article
              key={t.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl card-light transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_-24px_oklch(0.62_0.20_258/0.55)]"
            >
              <div className="flex items-center justify-between border-b border-ink/5 p-4 sm:p-5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-[0.16em] ${
                    isBuilding
                      ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  {isBuilding ? <Hammer className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                  {isBuilding ? "Under build" : "Voting open"}
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
                  <p className="mt-2 text-caption leading-relaxed text-slate-600 line-clamp-3">
                    {t.pitch}
                  </p>
                )}

                {/* Vote progress */}
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

                <div className="mt-4 flex items-center justify-between text-micro text-ink/65">
                  {isBuilding && left !== null ? (
                    <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">
                      <Timer className="h-3 w-3" /> {left} days to launch
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]">
                      <Sparkles className="h-3 w-3" /> Founding cohort open
                    </span>
                  )}
                  <Link
                    to="/build/$slug"
                    params={{ slug: t.slug }}
                    className="inline-flex items-center gap-1 text-meta font-semibold text-primary"
                  >
                    {isBuilding ? "Watch build" : "Reserve seat"}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <Link to="/build" className="btn btn-primary btn-md">
          See the full build pipeline <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          to="/build/request"
          className="inline-flex items-center gap-1 text-caption font-semibold text-[#7fb0d8] hover:text-primary"
        >
          Request a track Arzon doesn&rsquo;t offer yet <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
