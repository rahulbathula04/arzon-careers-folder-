import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Layers,
  Target,
  Wrench,
} from "lucide-react";
import { getShareCard } from "@/lib/shareCard.functions";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { Footer } from "@/components/landing/Footer";

interface BriefPayload {
  kind?: string;
  gaps?: { id: string; label: string; score: number }[];
  skills?: string[];
  roles?: string[];
  candidateName?: string | null;
}

/**
 * Mentor / recruiter facing brief for a shared assessment result. Renders
 * the same gap map + focus stack the candidate saw, in a calm
 * white-on-white layout designed to be skimmed in 30 seconds.
 *
 * Lives at /r/<slug>/brief; data comes from the existing assessment_shares
 * row (payload.kind === "mentor_brief").
 */
export const Route = createFileRoute("/r/$id/brief")({
  loader: async ({ params }) => {
    const card = await getShareCard({ data: { slug: params.id } });
    if (!card) throw notFound();
    return card;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const track = loaderData.top_track_title ?? loaderData.archetype_name;
    const title = `Mentor brief · ${track} · ACRI ${loaderData.acri_overall}`;
    const description = `Skill gap map and focus stack for a candidate matched to ${track}.`;
    const ps = pageSeo({
      path: `/r/${params.id}/brief`,
      title,
      description,
      image: `/api/public/og/result/${params.id}.svg`,
      ogType: "article",
      noindex: true,
    });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: BriefPage,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="h-32 w-full rounded-2xl bg-white/5" />
        <div className="h-64 w-full rounded-2xl bg-white/5" />
      </div>
    </div>
  ),
});

function BriefPage() {
  const card = Route.useLoaderData();
  const params = Route.useParams();
  const payload = (card.payload as BriefPayload | null) ?? {};
  const gaps = payload.gaps ?? [];
  const skills = payload.skills ?? [];
  const roles = payload.roles ?? [];
  const who = payload.candidateName || "Candidate";
  const track = card.top_track_title ?? card.archetype_name;
  const trackSlug = card.top_track_slug ?? "pharmacovigilance";
  const target = 80;

  return (
    <main className="min-h-dvh bg-[#f5f7fa] text-slate-900">
      <section className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-6">
        {/* Header card */}
        <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
          <div className="border-b border-slate-100 bg-[#0f1b3d] px-5 py-5 text-white sm:px-7">
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary-glow">
              Arzon Careers · Mentor brief
            </p>
            <h1 className="mt-2 font-grotesk text-h3 font-extrabold leading-tight sm:text-h3">
              {who} · {track}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white">
                <Activity className="h-3 w-3" /> {card.band_label ?? "Career-ready preview"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white">
                ACRI {card.acri_overall} / 100
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white">
                Archetype · {card.archetype_name}
              </span>
            </div>
          </div>

          {/* Gap map */}
          {gaps.length > 0 && (
            <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
              <div className="flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
                  <Target className="h-3.5 w-3.5" /> Skill gap map · {track}
                </p>
                <p className="hidden font-mono text-micro text-slate-500 sm:block">
                  Current → target ({target})
                </p>
              </div>
              <ol className="mt-4 divide-y divide-slate-100">
                {gaps.map((g, i) => {
                  const cur = Math.max(0, Math.min(100, g.score));
                  const done = cur >= target;
                  return (
                    <li key={g.id} className="flex items-center gap-3 py-3">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-micro font-bold ${
                          done
                            ? "bg-accent-emerald-deep/15 text-accent-emerald-deep"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : <span>{i + 1}</span>}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate font-grotesk text-body-sm font-bold text-slate-900">
                            {g.label}
                          </p>
                          <p className="shrink-0 font-mono text-micro tabular-nums text-slate-500">
                            <span className="font-bold text-slate-900">{cur}</span>
                            <span className="mx-1 text-slate-300">→</span>
                            <span className="text-primary">{target}</span>
                          </p>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${done ? "bg-accent-emerald-deep" : "bg-primary"}`}
                            style={{ width: `${cur}%` }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Focus stack */}
          {(skills.length > 0 || roles.length > 0) && (
            <div className="grid gap-0 sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
              {skills.length > 0 && (
                <div className="px-5 py-6 sm:px-7">
                  <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
                    <Wrench className="h-3.5 w-3.5" /> Skills & tools to build
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-primary/[0.07] px-3 py-1.5 font-grotesk text-meta font-semibold text-slate-800 ring-1 ring-primary/15"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {roles.length > 0 && (
                <div className="border-t border-slate-100 px-5 py-6 sm:border-t-0 sm:px-7">
                  <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-accent-emerald-deep">
                    <Briefcase className="h-3.5 w-3.5" /> Roles to target after the cohort
                  </p>
                  <ul className="mt-3 grid gap-1.5">
                    {roles.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2 text-caption leading-snug text-slate-800"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald-deep/70"
                        />
                        <span className="font-grotesk font-semibold">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Empty fallback */}
          {gaps.length === 0 && skills.length === 0 && roles.length === 0 && (
            <div className="px-5 py-8 text-sm text-slate-600 sm:px-7">
              <Layers className="h-5 w-5 text-slate-400" />
              <p className="mt-2">
                This share link was created before the mentor brief was available. Ask the candidate
                to re-share from their latest result page.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-meta text-slate-600 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono">
                {absUrl(`/r/${params.id}/brief`).replace(/^https?:\/\//, "")}
              </span>
              <Link
                to="/industry/$role"
                params={{ role: trackSlug }}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                Explore {track} careers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </article>

        <p className="mt-6 text-center font-mono text-micro uppercase tracking-[0.18em] text-slate-500">
          Card · {card.slug}
        </p>
      </section>
      <Footer />
    </main>
  );
}
