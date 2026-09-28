import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Quote, ShieldCheck, Star } from "lucide-react";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { REVIEWS, EXTERNAL_RATINGS } from "@/data/reviews";
import { SITE, absUrl } from "@/components/landing/constants";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global Reviews & Learner Feedback" },
      {
        name: "description",
        content:
          "Public ratings, first-party cohort feedback and public learner posts about Arzon Global, with source labels so visitors can tell where each review came from.",
      },
      { property: "og:title", content: "Arzon Global Reviews & Learner Feedback" },
      {
        property: "og:description",
        content:
          "Review Arzon Global through external ratings, published learner feedback and public learner posts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reviews") },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
  }),
  component: ReviewsPage,
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </span>
  );
}

function ReviewsPage() {
  return (
    <div className="arzon-v2-page min-h-screen bg-white text-[var(--arzon-ink)] tone-light isolate overflow-hidden font-sans antialiased">
      <ArzonV2PageHero
        eyebrow="REVIEWS & LEARNER FEEDBACK"
        title="Read what learners have publicly shared about Arzon."
        description="We separate external ratings from Arzon-published testimonials and public learner posts. That makes the source of every piece of feedback visible."
        mobileImageSrc="/images/pv-career-graduate.jpg"
        mobileImageAlt="Healthcare graduate reviewing career information">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Find My Career Path
          </Link>
          <Link to="/why-arzon" className="arzon-v2-button-secondary">
            See How Arzon Works
          </Link>
        </div>
      </ArzonV2PageHero>

      <main className="arzon-v2-container space-y-16 pb-24 pt-12">
        <section aria-labelledby="external-heading" className="space-y-6">
          <div>
            <PremiumChip variant="gold" size="md">EXTERNAL LISTINGS</PremiumChip>
            <h2 id="external-heading" className="mt-3 font-serif text-3xl font-bold text-[var(--arzon-ink)] sm:text-4xl">
              Ratings from public business listings
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
              These are shown as separate platform measurements. We do not add them together or convert first-party testimonials into star ratings.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {EXTERNAL_RATINGS.map((rating) => (
              <article key={rating.platform} className="rounded-2xl border border-[var(--arzon-border)] bg-white p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">{rating.platform}</p>
                    <p className="mt-2 text-3xl font-black text-[var(--arzon-ink)]">{rating.rating.toFixed(1)} / 5</p>
                    <div className="mt-2"><Stars rating={Math.round(rating.rating)} /></div>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="mt-4 text-sm text-[var(--arzon-ink-soft)]">
                  {rating.reviewCount.toLocaleString("en-IN")} ratings · {rating.location}
                </p>
                <a
                  href={rating.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--arzon-blue-700)] hover:underline"
                >
                  View source listing <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="learner-heading" className="space-y-7">
          <div className="flex flex-col gap-3 border-b border-[var(--arzon-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <PremiumChip variant="navy" size="md">PUBLIC LEARNER FEEDBACK</PremiumChip>
              <h2 id="learner-heading" className="mt-3 font-serif text-3xl font-bold text-[var(--arzon-ink)] sm:text-4xl">
                More than map ratings
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
                These cards come from public learner posts or feedback published on Arzon Careers. Source type is displayed on every card.
              </p>
            </div>
            <a
              href="https://www.instagram.com/arzon.global"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--arzon-border)] bg-white px-4 py-3 text-sm font-bold text-[var(--arzon-ink)] hover:bg-slate-50"
            >
              View Arzon Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <article key={review.id} className="flex h-full flex-col rounded-2xl border border-[var(--arzon-border)] bg-white p-6 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[var(--arzon-ink)]">{review.author}</p>
                    {review.degree || review.college ? (
                      <p className="mt-1 text-xs text-[var(--arzon-ink-muted)]">
                        {[review.degree, review.college].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <Quote className="h-5 w-5 text-[var(--arzon-blue-700)]" />
                </div>

                {review.rating ? (
                  <div className="mt-4"><Stars rating={review.rating} /></div>
                ) : null}

                <p className="mt-4 flex-1 text-sm leading-6 text-[var(--arzon-ink-soft)]">
                  “{review.body}”
                </p>

                <div className="mt-5 border-t border-[var(--arzon-border)] pt-4">
                  <p className="text-xs font-bold text-[var(--arzon-ink)]">{review.domain}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
                    {review.sourceLabel}
                  </p>
                  <p className="mt-2 text-[11px] leading-4 text-[var(--arzon-ink-muted)]">
                    {review.verificationNote}
                  </p>
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--arzon-blue-700)] hover:underline"
                  >
                    Open source <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-950 p-7 text-white shadow-lg sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">TRANSPARENCY STANDARD</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              We will keep the source visible.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              New reviews should be added only when there is a traceable public source or a documented learner feedback record. First-party feedback will never be presented as an independent Google or marketplace review.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
