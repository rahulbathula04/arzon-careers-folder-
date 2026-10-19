import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { EXTERNAL_RATINGS, REVIEW_CATEGORIES, REVIEWS, type PublishedReview, type ReviewCategory } from "@/data/reviews";
import { SITE, absUrl } from "@/components/landing/constants";
import arzonIcon from "@/assets/arzon-icon.webp";
import { RatingBadge } from "@/components/foundations/rating-badge";

type SourceFilter = "All" | "Google" | "Justdial" | "AmbitionBox" | "LinkedIn" | "Instagram" | "Arzon";

type FeedReview = PublishedReview & {
  channel: Exclude<SourceFilter, "All">;
};

const SOURCES: Array<{ key: SourceFilter; label: string; value: string; meta: string }> = [
  { key: "Google", label: "Google", value: "4.5 ★", meta: "447 reviews" },
  { key: "Justdial", label: "Justdial", value: "4.5 ★", meta: "445+ reviews" },
  { key: "AmbitionBox", label: "AmbitionBox", value: "4.8 ★", meta: "31 votes · web result" },
  { key: "LinkedIn", label: "LinkedIn", value: "Public posts", meta: "Learner feedback" },
  { key: "Instagram", label: "Instagram", value: "Public mentions", meta: "Not counted as ratings" },
  { key: "Arzon", label: "Arzon Careers", value: "Published", meta: "First-party feedback" },
];

const REAL_FEED_REVIEWS: FeedReview[] = REVIEWS.map((review) => {
  let channel: Exclude<SourceFilter, "All"> = "Arzon";
  if (review.source === "Google Business Profile") channel = "Google";
  else if (review.source === "Justdial") channel = "Justdial";
  else if (review.source === "LinkedIn public post") channel = "LinkedIn";
  else if (review.source === "Instagram public mention") channel = "Instagram";
  else if (review.source === "AmbitionBox") channel = "AmbitionBox";
  else if (review.source === "Arzon Careers") channel = "Arzon";
  return {
    ...review,
    channel,
  };
});

const FEED_REVIEWS: FeedReview[] = REAL_FEED_REVIEWS;

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global Reviews & Testimonials · Google 4.5★ & Ratings" },
      { name: "description", content: "Read verified Arzon Global reviews, Google 4.5★ ratings, Justdial & LinkedIn feedback from Pharmacovigilance and Medical Coding graduates." },
      { property: "og:title", content: "Arzon Global Reviews & Testimonials · Google 4.5★ & Ratings" },
      { property: "og:description", content: "Read verified Arzon Global reviews, Google 4.5★ ratings, Justdial & LinkedIn feedback from Pharmacovigilance and Medical Coding graduates." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reviews") },
      { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Arzon Global",
          url: "https://arzoncareers.in",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "447",
            bestRating: "5",
            worstRating: "1",
          },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

const SOURCE_LOGOS: Record<string, { src: string; alt: string }> = {
  Google: { src: "https://www.google.com/s2/favicons?domain=google.com&sz=128", alt: "Google" },
  Justdial: { src: "https://www.google.com/s2/favicons?domain=justdial.com&sz=128", alt: "Justdial" },
  AmbitionBox: { src: "https://www.google.com/s2/favicons?domain=ambitionbox.com&sz=128", alt: "AmbitionBox" },
  LinkedIn: { src: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128", alt: "LinkedIn" },
  Instagram: { src: "https://www.google.com/s2/favicons?domain=instagram.com&sz=128", alt: "Instagram" },
  "Arzon Careers": { src: arzonIcon, alt: "Arzon Careers" },
};

function SourceIcon({ source }: { source: string }) {
  const value = source.toLowerCase();
  const key =
    value.includes("google") ? "Google" :
    value.includes("justdial") ? "Justdial" :
    value.includes("ambition") ? "AmbitionBox" :
    value.includes("linkedin") ? "LinkedIn" :
    value.includes("instagram") ? "Instagram" :
    "Arzon Careers";

  const logo = SOURCE_LOGOS[key];
  return (
    <span className="rv3-logo" aria-hidden="true">
      <img src={logo.src} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

function Stars({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return (
    <span className="rv3-stars" aria-label={safeRating + " out of 5"} style={{ ["--rv3-star-size" as string]: size + "px" }}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, safeRating - index));
        return (
          <span className="rv3-star" key={index}>
            <Star className="rv3-star-base" aria-hidden="true" />
            {fill > 0 ? <span className="rv3-star-fill" style={{ width: fill * 100 + "%" }}><Star aria-hidden="true" /></span> : null}
          </span>
        );
      })}
    </span>
  );
}

function SourceCard({ source, active, onClick }: { source: (typeof SOURCES)[number]; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={"rv3-source-card" + (active ? " is-active" : "")}
      onClick={onClick}
      aria-pressed={active}
      aria-label={"Show " + source.label + " feedback"}
    >
      <SourceIcon source={source.label} />
      <span className="rv3-source-copy">
        <strong>{source.label}</strong>
        <b>{source.value}</b>
        <small>{source.meta}</small>
      </span>
    </button>
  );
}

function ReviewCard({ review }: { review: FeedReview }) {
  const label = review.channel === "Arzon" ? "Arzon Careers" : review.channel;

  const initials = review.author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || review.author.charAt(0).toUpperCase();

  const sourceKindBadge =
    review.sourceKind === "first-party"
      ? "Published feedback"
      : review.sourceKind === "public-post"
        ? "Public social post"
        : "Third-party verified";

  const linkBadge =
    review.sourceKind === "first-party"
      ? "Verified Arzon"
      : review.sourceKind === "public-post"
        ? "Verified Post"
        : "Verified Evidence";

  return (
    <article className="rv3-card">
      <div className="rv3-card-head">
        <div className="rv3-card-source">
          <SourceIcon source={label} />
          <span>
            <strong>{label}</strong>
            <small>{sourceKindBadge}</small>
          </span>
        </div>
        {review.rating ? <Stars rating={review.rating} size={13} /> : null}
      </div>

      <p className="rv3-quote">“{review.body}”</p>

      <div className="rv3-person">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.author}
            className="rv3-avatar"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const next = img.nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "grid";
            }}
          />
        ) : null}
        <span
          className="rv3-avatar"
          style={{ display: review.avatar ? "none" : "grid" }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <span>
          <strong>{review.author}</strong>
          <small>{[review.degree, review.college].filter(Boolean).join(" · ") || review.domain}</small>
        </span>
      </div>

      <div className="rv3-card-footer">
        <span>{review.domain}</span>
        {review.sourceUrl ? (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-semibold"
            title={`Open original verified review on ${label}`}
          >
            <span>{linkBadge} ↗</span>
          </a>
        ) : (
          <span>{sourceKindBadge}</span>
        )}
      </div>
    </article>
  );
}

function RatingSummary({ source }: { source: "Google" | "Justdial" | "AmbitionBox" }) {
  const rating =
    source === "Google"
      ? EXTERNAL_RATINGS[0]
      : source === "Justdial"
        ? EXTERNAL_RATINGS[1]
        : EXTERNAL_RATINGS[2];
  return (
    <section className="rv3-rating-summary" aria-label={rating.platform + " summary"}>
      <div className="rv3-rating-left">
        <SourceIcon source={source} />
        <div>
          <span className="rv3-rating-label">{rating.platform}</span>
          <div className="rv3-rating-value-row">
            <strong>{rating.rating.toFixed(1)}</strong>
            <span>/5</span>
            <Stars rating={rating.rating} size={17} />
          </div>
          <small>{rating.reviewCount}+ ratings · {rating.location}</small>
        </div>
      </div>
      <a href={rating.sourceUrl} target="_blank" rel="noopener noreferrer" className="rv3-outline-button">Open source <ArrowRight /></a>
    </section>
  );
}

function ReviewsPage() {
  const [source, setSource] = useState<SourceFilter>("All");
  const [category, setCategory] = useState<"All" | ReviewCategory>("All");
  const [paused, setPaused] = useState(false);

  const filtered = useMemo(() => FEED_REVIEWS.filter((review) => {
    const categoryMatch = category === "All" || review.domain === category;
    return categoryMatch && (source === "All" || review.channel === source);
  }), [source, category]);

  const showAggregate = source === "Google" || source === "Justdial" || source === "AmbitionBox";

  return (
    <div className="rv3-page">
      <section className="rv3-hero">
        <div className="rv3-container rv3-hero-grid">
          <div className="rv3-hero-copy">
            <span className="rv3-eyebrow">LEARNER STORIES & TESTIMONIALS</span>
            <h1>What learners have<br /><span>publicly shared.</span></h1>
            <p>Feedback from interns, workshop participants, learners and professionals, organised by the public source where it appeared.</p>
            <div className="rv3-hero-actions">
              <a href="#review-feed" className="rv3-primary-button">Read feedback <ArrowRight /></a>
              <Link to="/career-engine" className="rv3-secondary-button">Get My Career Plan</Link>
            </div>
            <div className="rv3-proof-row">
              <div><strong>{SOURCES.length}</strong><span>Public channels</span></div>
              <div><strong>{FEED_REVIEWS.length}</strong><span>Published records</span></div>
              <div><strong>4.5/5</strong><span>Google snapshot</span></div>
            </div>
          </div>

          <div className="rv3-hero-art" aria-hidden="true">
            <div className="rv3-photo-frame">
              <img src="/images/realistic-ai-student.jpg" alt="Healthcare learner · Career graduate" loading="eager" decoding="async" />
              <div className="rv3-photo-overlay" />
            </div>
            <div className="rv3-floating-card rv3-floating-google">
              <SourceIcon source="Google" />
              <span><strong>Google</strong><small>4.5 / 5 · public rating</small></span>
              <Stars rating={4.5} size={13} />
            </div>
            <div className="rv3-floating-card rv3-floating-linkedin">
              <SourceIcon source="LinkedIn" />
              <span><strong>LinkedIn</strong><small>Public learner posts</small></span>
            </div>
            <div className="rv3-floating-card rv3-floating-instagram">
              <SourceIcon source="Instagram" />
              <span><strong>Instagram</strong><small>Public mentions</small></span>
            </div>
          </div>
        </div>
      </section>

      <main className="rv3-container rv3-main">
        <section className="rv3-source-section" aria-labelledby="sources-heading">
          <div className="flex justify-center mb-8">
            <RatingBadge
              rating={5}
              title="India's Top Healthcare Career Engine"
              subtitle="2,000+ verified learner reviews"
            />
          </div>

          <div className="rv3-section-heading">
            <div>
              <span className="rv3-kicker">PUBLIC SOURCES</span>
              <h2 id="sources-heading">One view across every channel.</h2>
            </div>
            <span className="rv3-source-count">Select a channel to filter the feed</span>
          </div>

          <div className="rv3-source-rail">
            <div className="rv3-source-track">
              {SOURCES.map((item) => <SourceCard key={item.key} source={item} active={source === item.key} onClick={() => setSource(item.key)} />)}
            </div>
          </div>
        </section>

        <section className="rv3-feed-section" id="review-feed" aria-labelledby="feed-heading">
          <div className="rv3-feed-top">
            <div>
              <span className="rv3-kicker">TESTIMONIAL FEED</span>
              <h2 id="feed-heading">Feedback that keeps moving.</h2>
              <p>{filtered.length} records currently match your filters.</p>
            </div>
            <div className="rv3-feed-controls">
              <label className="rv3-select">
                <span>Source</span>
                <select value={source} onChange={(event) => setSource(event.target.value as SourceFilter)} aria-label="Filter by source">
                  {["All", ...SOURCES.map((item) => item.key)].map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
                <ChevronDown />
              </label>
              <button type="button" className="rv3-pause" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
                {paused ? "Play" : "Pause"} feed
              </button>
            </div>
          </div>

          <div className="rv3-category-rail" aria-label="Filter by topic">
            {REVIEW_CATEGORIES.map((item) => (
              <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          {showAggregate ? (
            <div style={{ marginBottom: "20px" }}>
              <RatingSummary source={source} />
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <div className="rv3-marquee" style={{ ["--rv3-marquee-duration" as string]: Math.max(22, filtered.length * 2.8) + "s" }}>
              <div className={"rv3-marquee-track" + (paused ? " is-paused" : "")}>
                <div className="rv3-marquee-set">
                  {filtered.map((review) => <ReviewCard key={review.id} review={review} />)}
                </div>
                <div className="rv3-marquee-set" aria-hidden="true">
                  {filtered.map((review) => <ReviewCard key={review.id + "-clone"} review={review} />)}
                </div>
              </div>
            </div>
          ) : (
            <div className="rv3-empty">
              <SourceIcon source={source} />
              <h3>No source-verified individual reviews match the selected filters.</h3>
              <p>Try switching the domain topic or viewing &ldquo;All&rdquo; to inspect published evidence across all {SOURCES.length} channels.</p>
            </div>
          )}
        </section>

        <section className="rv3-trust-grid">
          <article>
            <span className="rv3-kicker">WHAT COUNTS</span>
            <h3>Ratings, posts and first-party feedback stay separated.</h3>
            <p>Platform ratings are shown as ratings. Public social posts are shown as posts. Arzon-published feedback is identified as first-party content.</p>
          </article>
          <article className="rv3-trust-stat"><strong>{FEED_REVIEWS.length}</strong><span>publicly sourced records</span></article>
          <article className="rv3-trust-stat"><strong>{SOURCES.length}</strong><span>source channels</span></article>
        </section>

        <section className="rv3-cta">
          <div>
            <span>YOUR NEXT STEP</span>
            <h2>See where your current skills fit.</h2>
            <p>Use the Career Engine to build a role-focused plan from your background and current skill level.</p>
          </div>
          <Link to="/career-engine">Get My Career Plan <ArrowRight /></Link>
        </section>
      </main>
    </div>
  );
}
