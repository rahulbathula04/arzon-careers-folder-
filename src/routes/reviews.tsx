import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Quote, ShieldCheck, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { PremiumChip } from "@/components/ui/PremiumChip";
import {
  EXTERNAL_RATINGS,
  REVIEW_CATEGORIES,
  REVIEWS,
  type PublishedReview,
  type ReviewCategory,
} from "@/data/reviews";
import { absUrl } from "@/components/landing/constants";

const BATCH_SIZE = 6;

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global Reviews & Learner Feedback" },
      {
        name: "description",
        content:
          "Source-backed learner feedback, public learner posts and external business ratings for Arzon Global.",
      },
      { property: "og:title", content: "Arzon Global Reviews & Learner Feedback" },
      {
        property: "og:description",
        content:
          "Explore learner experiences from public posts, Arzon-published feedback and external business listings.",
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
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
          }`}
        />
      ))}
    </span>
  );
}

function SourceBadge({ review }: { review: PublishedReview }) {
  const styles =
    review.sourceKind === "third-party"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : review.sourceKind === "public-post"
        ? "border-blue-200 bg-blue-50 text-blue-800"
        : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${styles}`}
    >
      {review.sourceKind === "public-post"
        ? "Public post"
        : review.sourceKind === "first-party"
          ? "First-party"
          : review.source}
    </span>
  );
}

function ReviewCard({ review }: { review: PublishedReview }) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <SourceBadge review={review} />
        <Quote className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-black tracking-tight text-slate-950">
            {review.author}
          </p>
          {(review.degree || review.college) && (
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {[review.degree, review.college].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {review.rating ? <Stars rating={review.rating} /> : null}
      </div>

      <p className="mt-5 flex-1 text-[15px] leading-7 text-slate-700">
        “{review.body}”
      </p>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-600">
            {review.domain}
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500">
            {review.sourceLabel}
          </span>
        </div>

        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          {review.verificationNote}
        </p>

        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-700 hover:text-blue-900 hover:underline"
        >
          View source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | ReviewCategory>(
    "All",
  );
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestLockRef = useRef(false);

  const filteredReviews = useMemo(
    () =>
      activeCategory === "All"
        ? REVIEWS
        : REVIEWS.filter((review) => review.domain === activeCategory),
    [activeCategory],
  );

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setIsLoadingMore(false);
    requestLockRef.current = false;
  }, [activeCategory]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting ||
          requestLockRef.current ||
          !hasMore
        ) {
          return;
        }

        requestLockRef.current = true;
        setIsLoadingMore(true);

        requestAnimationFrame(() => {
          setVisibleCount((current) =>
            Math.min(current + BATCH_SIZE, filteredReviews.length),
          );
          setIsLoadingMore(false);
          requestAnimationFrame(() => {
            requestLockRef.current = false;
          });
        });
      },
      {
        root: null,
        rootMargin: "700px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredReviews.length, hasMore]);

  return (
    <div className="arzon-v2-page min-h-screen overflow-x-clip bg-white font-sans text-[var(--arzon-ink)] antialiased tone-light isolate">
      <ArzonV2PageHero
        eyebrow="REVIEWS & LEARNER FEEDBACK"
        title="Real experiences. Source shown."
        description="Explore public learner posts, feedback published by Arzon and external business ratings. Every review card tells you where the information came from."
        mobileImageSrc="/images/pv-career-graduate.jpg"
        mobileImageAlt="Healthcare graduate reviewing career information"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Find my career path
          </Link>
          <Link to="/why-arzon" className="arzon-v2-button-secondary">
            See How Arzon Works
          </Link>
        </div>
      </ArzonV2PageHero>

      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <section
          aria-labelledby="rating-summary"
          className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <PremiumChip variant="gold" size="md">
                EXTERNAL RATINGS
              </PremiumChip>
              <h2
                id="rating-summary"
                className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
              >
                Ratings stay separate from learner stories.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Platform ratings are shown exactly as separate measurements.
                Public posts and Arzon-published feedback are not added to
                those star counts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {EXTERNAL_RATINGS.map((rating) => (
                <a
                  key={rating.platform}
                  href={rating.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[150px] rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      className="h-4 w-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      {rating.platform}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-black text-slate-950">
                    {rating.rating.toFixed(1)}
                  </p>
                  <Stars rating={Math.round(rating.rating)} />
                  <p className="mt-1 text-[11px] text-slate-500">
                    {rating.reviewCount.toLocaleString("en-IN")} ratings
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="learner-feedback">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <PremiumChip variant="navy" size="md">
                LEARNER FEEDBACK
              </PremiumChip>
              <h2
                id="learner-feedback"
                className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
              >
                Explore the full feedback feed.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {REVIEWS.length} source-backed records are currently in the
                review registry. More load automatically as you reach the
                bottom.
              </p>
            </div>

            <a
              href="https://www.instagram.com/arzon.global"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Arzon Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div
            className="mt-6 -mx-1 overflow-x-auto px-1 pb-2"
            aria-label="Review categories"
          >
            <div className="flex min-w-max gap-2">
              {REVIEW_CATEGORIES.map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-2.5 text-xs font-extrabold transition ${
                      selected
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-950"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="mt-7 grid gap-5 md:grid-cols-2"
            role="feed"
            aria-busy={isLoadingMore}
            aria-live="polite"
          >
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div ref={sentinelRef} className="h-16" aria-hidden="true" />

          {isLoadingMore && hasMore ? (
            <div className="mt-2 grid gap-5 md:grid-cols-2" aria-hidden="true">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-[24px] border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
          ) : null}

          {!hasMore ? (
            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center">
              <p className="text-sm font-extrabold text-slate-900">
                You&apos;ve reached the end of the published feedback.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {activeCategory === "All"
                  ? "No more records are requested once the cursor reaches the end."
                  : `No more ${activeCategory} records are available in the current registry.`}
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-16 overflow-hidden rounded-[28px] bg-slate-950 px-6 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
              SOURCE STANDARD
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Every card keeps its source visible.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Third-party ratings, public learner posts and Arzon-published
              feedback are intentionally separated. We do not turn first-party
              testimonials into independent marketplace ratings.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
