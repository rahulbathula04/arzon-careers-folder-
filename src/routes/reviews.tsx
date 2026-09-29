import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Instagram, Linkedin, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { EXTERNAL_RATINGS, REVIEW_CATEGORIES, REVIEWS, type PublishedReview, type ReviewCategory } from "@/data/reviews";
import { SITE, absUrl } from "@/components/landing/constants";

type SourceFilter = "All" | "Google" | "Justdial" | "Glassdoor" | "AmbitionBox" | "LinkedIn" | "Instagram" | "Arzon";

type PreviewReview = {
  id: string;
  author: string;
  rating?: number;
  body: string;
  degree?: string;
  domain: ReviewCategory;
  channel: Exclude<SourceFilter, "All">;
  sourceKind: "preview";
  sourceLabel: "Synthetic local preview";
  sourceUrl: "";
  verificationNote: "Synthetic local-development preview only. Not a real review.";
};

type FeedReview = (PublishedReview & {
  channel: Exclude<SourceFilter, "All">;
}) | PreviewReview;

const SOURCES: Array<{ key: SourceFilter; label: string; value: string; meta: string }> = [
  { key: "Google", label: "Google", value: "4.5 ★", meta: "447 reviews" },
  { key: "Justdial", label: "Justdial", value: "4.5 ★", meta: "445+ reviews" },
  { key: "Glassdoor", label: "Glassdoor", value: "Not verified", meta: "Arzon listing not verified" },
  { key: "AmbitionBox", label: "AmbitionBox", value: "4.8 ★", meta: "31 votes · web result" },
  { key: "LinkedIn", label: "LinkedIn", value: "Public posts", meta: "Learner feedback" },
  { key: "Instagram", label: "Instagram", value: "Public mentions", meta: "Not counted as ratings" },
  { key: "Arzon", label: "Arzon Careers", value: "Published", meta: "First-party feedback" },
];

const SOURCE_LINKS = {
  LinkedIn: "https://www.linkedin.com/company/arzon-global/",
  Instagram: "https://www.instagram.com/arzon.global",
};


const DEV_PREVIEW_REVIEWS: PreviewReview[] = [
  { id: "preview-glassdoor-1", author: "Demo contributor 01", rating: 5, domain: "Internships", channel: "Glassdoor", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Synthetic Glassdoor-style preview used only to test the local review feed layout." },
  { id: "preview-glassdoor-2", author: "Demo contributor 02", rating: 4, domain: "Career Guidance", channel: "Glassdoor", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Placeholder feedback for spacing and scrolling tests. Replace with source-verified copy before publishing." },
  { id: "preview-ambition-1", author: "Demo learner 01", rating: 5, domain: "Medical Coding", channel: "AmbitionBox", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Synthetic AmbitionBox-style review for local UI testing. It is not an independently verified testimonial." },
  { id: "preview-ambition-2", author: "Demo learner 02", rating: 4, domain: "Pharmacovigilance", channel: "AmbitionBox", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Placeholder AmbitionBox feedback used to validate the filter and continuous feed." },
  { id: "preview-instagram-1", author: "Demo participant 01", domain: "AI in Healthcare", channel: "Instagram", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Synthetic Instagram mention used only for local design testing. It is not a published social post." },
  { id: "preview-instagram-2", author: "Demo participant 02", domain: "Workshops", channel: "Instagram", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Placeholder Instagram feedback for source-filter and marquee testing." },
  { id: "preview-google-1", author: "Demo learner 03", rating: 5, domain: "Career Guidance", channel: "Google", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Sample Google review card for local visual testing only." },
  { id: "preview-justdial-1", author: "Demo learner 04", rating: 5, domain: "Workshops", channel: "Justdial", sourceKind: "preview", sourceLabel: "Synthetic local preview", sourceUrl: "", verificationNote: "Synthetic local-development preview only. Not a real review.", body: "Sample Justdial review card for local visual testing only." },
];

const REAL_FEED_REVIEWS: FeedReview[] = REVIEWS.map((review) => ({
  ...review,
  channel: review.source === "LinkedIn public post" ? "LinkedIn" : "Arzon",
}));

const FEED_REVIEWS: FeedReview[] = import.meta.env.DEV
  ? [...REAL_FEED_REVIEWS, ...DEV_PREVIEW_REVIEWS]
  : REAL_FEED_REVIEWS;

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global Reviews & Learner Testimonials" },
      { name: "description", content: "Source-labelled learner testimonials, public posts and verified platform-level ratings for Arzon Global." },
      { property: "og:title", content: "Arzon Global Reviews & Learner Testimonials" },
      { property: "og:description", content: "A lightweight source-labelled testimonial feed for Arzon Global." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reviews") },
      { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
  }),
  component: ReviewsPage,
});

const SOURCE_LOGOS: Record<string, { src: string; alt: string }> = {
  Google: { src: "https://www.google.com/s2/favicons?domain=google.com&sz=128", alt: "Google" },
  Justdial: { src: "https://www.google.com/s2/favicons?domain=justdial.com&sz=128", alt: "Justdial" },
  Glassdoor: { src: "https://www.google.com/s2/favicons?domain=glassdoor.co.in&sz=128", alt: "Glassdoor" },
  AmbitionBox: { src: "https://www.google.com/s2/favicons?domain=ambitionbox.com&sz=128", alt: "AmbitionBox" },
  LinkedIn: { src: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128", alt: "LinkedIn" },
  Instagram: { src: "https://www.google.com/s2/favicons?domain=instagram.com&sz=128", alt: "Instagram" },
  "Arzon Careers": { src: "/images/arzon-logo.png", alt: "Arzon Careers" },
};

function SourceIcon({ source }: { source: string }) {
  const key =
    source.toLowerCase().includes("google") ? "Google" :
    source.toLowerCase().includes("justdial") ? "Justdial" :
    source.toLowerCase().includes("glassdoor") ? "Glassdoor" :
    source.toLowerCase().includes("ambition") ? "AmbitionBox" :
    source.toLowerCase().includes("linkedin") ? "LinkedIn" :
    source.toLowerCase().includes("instagram") ? "Instagram" :
    "Arzon Careers";
  const logo = SOURCE_LOGOS[key];
  return (
    <span className="rv-icon rv-brand-logo" aria-hidden="true">
      <img src={logo.src} alt="" loading="lazy" />
    </span>
  );
}

function Stars({ rating = 5 }: { rating?: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return (
    <span className="rv-stars" aria-label={safeRating + " out of 5"}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, safeRating - i));
        return (
          <span className="rv-star" key={i}>
            <Star className="rv-star-base" aria-hidden="true" />
            {fill > 0 ? (
              <span className="rv-star-fill" style={{ width: `${fill * 100}%` }}>
                <Star aria-hidden="true" />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

function SourceCard({ source, active, onClick }: { source: (typeof SOURCES)[number]; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={"rv-source-card" + (active ? " is-active" : "")} aria-pressed={active} aria-label={"Filter testimonials by " + source.label}>
      <SourceIcon source={source.label} />
      <span className="rv-source-copy">
        <strong>{source.label}</strong>
        <b>{source.value}</b>
        <small>{source.meta}</small>
      </span>
    </button>
  );
}

function TestimonialCard({ review }: { review: FeedReview }) {
  const sourceLabel = review.channel === "Arzon" ? "Arzon Careers" : review.channel;
  return (
    <article className={"rv-card" + (review.sourceKind === "preview" ? " is-preview" : "")}>
      <div className="rv-card-top">
        <div className="rv-card-source"><SourceIcon source={sourceLabel} /><span><strong>{sourceLabel}</strong><small>{review.sourceKind === "preview" ? "Synthetic local preview" : review.sourceKind === "first-party" ? "Published feedback" : "Public post"}</small></span></div>
        {review.rating ? <Stars rating={review.rating} /> : null}
      </div>
      <p className="rv-quote">“{review.body}”</p>
      <div className="rv-person">
        <span className="rv-avatar">{review.author.trim().charAt(0).toUpperCase()}</span>
        <span><strong>{review.author}</strong><small>{[review.degree, review.domain].filter(Boolean).join(" · ") || "Learner / participant"}</small></span>
      </div>
      <div className="rv-tags"><span>{review.domain}</span><span>{review.sourceKind === "preview" ? "DEMO DATA" : review.sourceKind === "first-party" ? "Student Experience" : "Public Feedback"}</span></div>
    </article>
  );
}

function RatingPanel({ source }: { source: "Google" | "Justdial" }) {
  const rating = source === "Google" ? EXTERNAL_RATINGS[0] : EXTERNAL_RATINGS[1];
  return (
    <div className="rv-rating-panel">
      <div>
        <small>{rating.platform}</small>
        <strong>{rating.rating.toFixed(1)}<em>/5</em></strong>
        <Stars rating={rating.rating} />
        <span>{rating.reviewCount}+ ratings · {rating.location}</span>
      </div>
      <a href={rating.sourceUrl} target="_blank" rel="noopener noreferrer">View source <ArrowRight /></a>
    </div>
  );
}

function EmptySource({ source }: { source: SourceFilter }) {
  const sourceMeta = SOURCES.find((s) => s.key === source);
  return (
    <div className="rv-empty">
      <SourceIcon source={sourceMeta?.label ?? source} />
      <h3>No verified individual testimonials added for {sourceMeta?.label ?? source}.</h3>
      <p>The source remains visible, but no rating or review text is displayed until an exact Arzon listing or public post can be verified.</p>
    </div>
  );
}

function ReviewsPage() {
  const [source, setSource] = useState<SourceFilter>("All");
  const [category, setCategory] = useState<"All" | ReviewCategory>("All");

  const filtered = useMemo(() => FEED_REVIEWS.filter((review) => {
    const categoryMatch = category === "All" || review.domain === category;
    if (!categoryMatch) return false;
    return source === "All" || review.channel === source;
  }), [source, category]);

  const showAggregate = source === "Google" || source === "Justdial";

  return (
    <div className="rv-page">
      <section className="rv-hero">
        <div className="rv-container rv-hero-inner">
          <div className="rv-hero-copy">
            <span className="rv-eyebrow">LEARNER STORIES & TESTIMONIALS</span>
            <h1>What learners have<br />publicly shared.</h1>
            <p>Real experiences from learners, interns, workshop participants and professionals across multiple platforms.</p>
          </div>
          <div className="rv-hero-visual" aria-hidden="true">
            <div className="rv-hero-photo"><img src="/images/pv-career-graduate.jpg" alt="" loading="eager" decoding="async" /></div>
            <div className="rv-float rv-float-one"><span>G</span><strong>Google Business Profile</strong><small>4.5 / 5 · 447 reviews</small><Stars rating={4.5} /></div>
            <div className="rv-float rv-float-two"><span>in</span><strong>LinkedIn</strong><small>Public learner posts</small></div>
            <div className="rv-float rv-float-three"><span className="rv-float-instagram"><Instagram /></span><strong>Arzon Careers</strong><small>First-party published feedback</small></div>
          </div>
        </div>
      </section>

      <main className="rv-container rv-main">
        {import.meta.env.DEV ? <div className="rv-preview-banner" role="note">LOCAL DEVELOPMENT PREVIEW · synthetic examples are shown for channels without verified review text.</div> : null}
        <section className="rv-source-bar" aria-label="Review sources">
          {SOURCES.map((item) => <SourceCard key={item.key} source={item} active={source === item.key} onClick={() => setSource(item.key)} />)}
        </section>

        <section className="rv-feed-head">
          <div>
            <span className="rv-kicker">TESTIMONIAL FEED</span>
            <h2>Experiences, kept simple.</h2>
            <p>{filtered.length} source-labelled records. The testimonials move continuously in one horizontal line.</p>
          </div>
          <label className="rv-filter-button">Source <select value={source} onChange={(event) => setSource(event.target.value as SourceFilter)} aria-label="Filter testimonials by source">{["All", ...SOURCES.map((item) => item.key)].map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown /></label>
        </section>

        <div className="rv-topic-row" aria-label="Testimonial topics">
          {REVIEW_CATEGORIES.map((item) => <button key={item} type="button" className={category === item ? "is-selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>

        {showAggregate ? <RatingPanel source={source} /> : source === "All" || filtered.length > 0 ? (
          <div className="rv-marquee-viewport" role="region" aria-label="Learner testimonials">
            <div className="rv-marquee-track">
              <div className="rv-marquee-set">
                {filtered.map((review) => <TestimonialCard key={review.id} review={review} />)}
              </div>
              <div className="rv-marquee-set" aria-hidden="true">
                {filtered.map((review) => <TestimonialCard key={review.id + "-loop"} review={review} />)}
              </div>
            </div>
          </div>
        ) : <EmptySource source={source} />}

        <section className="rv-note">
          <div><span className="rv-kicker">SOURCE RULE</span><h3>Ratings stay ratings. Posts stay posts.</h3><p>Google and Justdial ratings are shown separately from public LinkedIn posts and Arzon-published feedback. Glassdoor and AmbitionBox remain visible as sources, but no Arzon-specific rating is shown without a verified listing. Instagram mentions are not converted into ratings.</p></div>
          <div className="rv-links"><a href={SOURCE_LINKS.LinkedIn} target="_blank" rel="noopener noreferrer"><Linkedin />Company LinkedIn</a><a href={SOURCE_LINKS.Instagram} target="_blank" rel="noopener noreferrer"><Instagram />Instagram</a></div>
        </section>

        <section className="rv-cta"><div><span>YOUR NEXT STEP</span><h3>Want your own career-fit report?</h3></div><Link to="/career-engine">Start assessment <ArrowRight /></Link></section>
      </main>
    </div>
  );
}
