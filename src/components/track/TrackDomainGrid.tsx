import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DOMAIN_CARDS } from "@/data/trackDomains";
import { getTrackTheme } from "@/data/trackTheme";

export type TrackDomainGridProps = {
  /** Optional section heading rendered above the grid. */
  title?: string;
  /** Sub-line under the heading. */
  subtitle?: string;
  /** Source label for analytics + apply preselection. */
  source?: string;
  /** Restrict to the six core tracks (skip AI healthcare). */
  coreOnly?: boolean;
  /** Surface tone - `dark` (default, gradient cards on dark page) or `light` (pastel cards on light page like /apply). */
  tone?: "dark" | "light";
  className?: string;
};

export function TrackDomainGrid({
  title,
  subtitle,
  source = "domain-grid",
  coreOnly = false,
  tone = "dark",
  className = "",
}: TrackDomainGridProps) {
  const cards = coreOnly
    ? DOMAIN_CARDS.filter((c) => c.slug !== "digital-health-fhir")
    : DOMAIN_CARDS;

  const isLight = tone === "light";
  // Palette per tone so labels, values, and the outline CTA never wash out.
  const tk = isLight
    ? {
        title: "text-ink",
        body: "text-ink/75",
        meta: "text-ink/60",
        metricBox: "border-ink/10 bg-white/70",
        dt: "text-ink/55",
        dd: "text-ink",
        divider: "border-ink/10",
        primary: "bg-ink !text-white hover:bg-ink/90",
        secondary: "border-ink/25 bg-white !text-ink hover:bg-ink/[0.04]",
        cardBorder: "border-ink/10",
      }
    : {
        title: "text-white",
        body: "text-white/75",
        meta: "text-white/55",
        // Track cards sit on light/mid gradient backdrops, so the metric
        // pill needs a much darker wash + higher-opacity ink for the dt/dd
        // labels to hit AA. bg-[#0a0c10]/40 backdrop-blur-md shadow-sm over a mid-gray gradient composites
        // to ~#808494, which drops white/55 to 1.26:1.
        metricBox: "border-white/15 bg-[#0a0c10]/65 backdrop-blur-sm",
        dt: "text-white/80",
        dd: "text-white",
        divider: "border-white/10",
        primary: "bg-white !text-black hover:bg-white/90",
        secondary: "border-white/35 bg-white/[0.04] !text-white hover:bg-white/10",
        cardBorder: "border-white/25",
      };

  return (
    <section className={className}>
      {(title || subtitle) && (
        <header className="mb-6 sm:mb-8">
          {title ? (
            <h2
              className={`text-[clamp(1.4rem,3.4vw,2rem)] font-semibold leading-tight ${tk.title}`}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className={`mt-2 max-w-2xl text-caption leading-relaxed sm:text-body-sm ${tk.body}`}>
              {subtitle}
            </p>
          ) : null}
        </header>
      )}

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => {
          const t = getTrackTheme(c.slug);
          return (
            <article
              key={c.slug}
              data-testid="track-hero"
              data-track={c.slug}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-br ${t.grad} p-4 ring-1 ${t.ring} transition hover:-translate-y-0.5 sm:p-5 ${tk.cardBorder}`}
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 h-[3px] ${t.accent}`} />
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h4 ring-1 sm:h-12 sm:w-12 sm:text-h3 ${t.ring}`}
                  aria-hidden
                >
                  {t.emoji}
                </div>
                <div className="min-w-0">
                  <span
                    className={`mb-1.5 inline-flex items-center rounded-full px-2 py-0.5 font-mono text-micro uppercase tracking-[0.18em] ${t.chip}`}
                  >
                    {c.eyebrow}
                  </span>
                  <h3
                    className={`text-body-sm font-semibold leading-tight sm:text-body ${tk.title}`}
                  >
                    {c.label}
                  </h3>
                </div>
              </div>

              <p className={`mt-3 text-caption leading-relaxed sm:text-caption ${tk.body}`}>
                {c.blurb}
              </p>
              {c.bestFor ? (
                <p className={`mt-2 font-mono text-micro ${tk.meta}`}>Best for: {c.bestFor}</p>
              ) : null}

              {c.decision ? (
                <dl
                  className={`mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border p-3 ${tk.metricBox}`}
                >
                  {(
                    [
                      ["Salary", c.decision.salary, 0],
                      ["Hiring", c.decision.hiring, 1],
                      ["Difficulty", c.decision.difficulty, 2],
                      ["Demand", c.decision.demand, 3],
                    ] as const
                  ).map(([k, v, i]) => (
                    <div
                      key={k}
                      className={`min-w-0 pr-2 ${i >= 2 ? `border-t pt-3 ${tk.divider}` : ""}`}
                    >
                      <dt
                        className={`font-mono text-[0.6rem] uppercase tracking-[0.04em] leading-tight ${tk.dt}`}
                      >
                        {k}
                      </dt>
                      <dd className={`mt-1 text-[0.8125rem] font-semibold leading-snug ${tk.dd}`}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link
                  to="/apply"
                  search={{ programme: c.slug, source }}
                  data-apply-surface="track-domain-grid"
                  data-programme-slug={c.slug}
                  aria-label={`Apply for ${c.label} internship`}
                  className={`inline-flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto ${tk.primary}`}
                >
                  Apply now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/courses/$slug"
                  params={{ slug: c.slug }}
                  aria-label={`See full ${c.label} programme`}
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-auto ${tk.secondary}`}
                >
                  See full programme
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
