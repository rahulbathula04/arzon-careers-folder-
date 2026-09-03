import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { ArrowRight, Sparkles, Trophy, Activity, Share2 } from "lucide-react";
import { getShareCard, recordReferralVisit } from "@/lib/shareCard.functions";
import { Footer } from "@/components/landing/Footer";
import { CTAButton } from "@/components/landing/CTAButton";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";

/**
 * Public share landing for an assessment result. Indexable, SSR'd, with a
 * dynamic OG image and a single CTA to take the test. The teaser shows the
 * archetype + ACRI score; the depth lives behind the user's own attempt.
 */
export const Route = createFileRoute("/r/$id")({
  loader: async ({ params }) => {
    const card = await getShareCard({ data: { slug: params.id } });
    if (!card) throw notFound();
    return card;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const name = loaderData.archetype_name;
    const score = loaderData.acri_overall;
    const track = loaderData.top_track_title ?? loaderData.archetype_name;
    const title = `Scored ${score} ACRI · Top fit ${track} · Arzon Global`;
    const description = `Someone took the 4-min Arzon Career Engine assessment and scored ${score}/100 ACRI with ${name} as their archetype. Take yours, ground-truthed against 12,400+ healthcare cohort outcomes.`;
    const ogImage = `/api/public/og/result/${params.id}.svg`;
    const ps = pageSeo({
      path: `/r/${params.id}`,
      title,
      description,
      image: ogImage,
      ogType: "article",
    });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: ShareLanding,
  pendingComponent: () => (
    <div className="min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-lg">
        <div className="h-64 w-full rounded-3xl bg-white/5" />
      </div>
    </div>
  ),
});

function ShareLanding() {
  const card = Route.useLoaderData();
  const params = Route.useParams();
  const recordVisit = useServerFn(recordReferralVisit);

  // Drop a referral cookie + log the attribution. Best-effort only.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const code = card.referral_code || card.slug;
    document.cookie = `ref=${encodeURIComponent(code)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    try {
      window.localStorage.setItem("arz_ref", code);
    } catch {
      /* noop */
    }
    recordVisit({
      data: {
        referralCode: code,
        landingPath: `/r/${params.id}`,
        userAgent: navigator.userAgent.slice(0, 480),
      },
    }).catch(() => undefined);
  }, [card.referral_code, card.slug, params.id, recordVisit]);

  const score = card.acri_overall;
  const track = card.top_track_title ?? card.archetype_name;
  const trackSlug = card.top_track_slug ?? "pharmacovigilance";
  const ringPct = Math.max(0, Math.min(100, score));
  const dash = (ringPct / 100) * 264;

  return (
    <main className="min-h-dvh bg-[#070A14] text-white">
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-14 sm:px-6">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary-glow">
          A friend shared their result · Arzon Global
        </p>
        <h1 className="font-grotesk mt-3 text-h1 font-bold">
          They scored <span className="text-primary-glow">{score}</span> on the ACRI scale.
        </h1>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          Their top-matched career: <span className="font-semibold text-white">{track}</span>. The
          full breakdown - strengths, watch-outs, 5-year package projection - comes from a 4-minute,
          28-question assessment calibrated against real cohort outcomes.
        </p>

        {/* Hero ring */}
        <div className="mt-10 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div className="relative h-44 w-44 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-primary-glow"
                strokeDasharray={`${dash} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-grotesk text-h2 font-bold">{score}</span>
              <span className="font-mono text-micro uppercase tracking-[0.18em] text-white/80">
                / 100 ACRI
              </span>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-glow/40 bg-primary/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary-glow">
              <Activity className="h-3 w-3" /> {card.band_label ?? "Career-ready preview"}
            </span>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/75">
              <Trophy className="h-4 w-4 text-gold" /> Archetype ·{" "}
              <span className="font-semibold text-white">{card.archetype_name}</span>
            </p>
            <p className="mt-1 text-xs text-white/60 font-mono uppercase tracking-[0.16em]">
              {card.views ?? 0} people viewed this card
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.10] to-gold/[0.02] p-6 sm:p-8">
          <Sparkles className="h-5 w-5 text-gold" />
          <h2 className="mt-3 font-grotesk text-h3 font-bold">Take yours. 4 minutes. Free.</h2>
          <p className="mt-2 max-w-xl text-sm text-white/70">
            28 micro-questions. Get your ACRI score, top archetype, 5-year and 10-year package
            projection, AI-risk verdict per role, and a recommended cohort track. Calibrated against
            12,400+ real healthcare outcomes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/career-engine" className="btn btn-primary">
              Start the assessment <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <CTAButton asChild variant="ghost">
              <Link to="/industry/$role" params={{ role: trackSlug }}>
                Explore {track} careers
              </Link>
            </CTAButton>
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/60">
            <Share2 className="h-3 w-3" /> Share code · {card.referral_code || card.slug}
          </p>
        </div>

        {/* Methodology trust strip */}
        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80">
            Methodology
          </p>
          <p className="mt-2 text-caption leading-relaxed text-white/75">
            Scoring fuses four signals - aptitude, interest, background, commitment - against
            archetype prototypes built from JD aggregation (Naukri + LinkedIn + AmbitionBox),
            NASSCOM/IQVIA sector reports, and Arzon's own cohort placement data. Refreshed
            quarterly.
          </p>
        </div>

        <p className="mt-6 text-center font-mono text-micro uppercase tracking-[0.18em] text-white/60">
          Card · {card.slug} · {absUrl(`/r/${params.id}`).replace(/^https?:\/\//, "")}
        </p>
      </section>
      <Footer />
    </main>
  );
}
