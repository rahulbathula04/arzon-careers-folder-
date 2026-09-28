import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronDown, Instagram, Linkedin, Quote, ShieldCheck, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { EXTERNAL_RATINGS, REVIEW_CATEGORIES, REVIEWS, type PublishedReview, type ReviewCategory } from "@/data/reviews";
import { absUrl } from "@/components/landing/constants";

const PAGE_SIZE = 6;
type SourceFilter = "All" | "Google" | "Justdial" | "LinkedIn" | "Instagram" | "Glassdoor" | "AmbitionBox" | "Arzon";


const SOURCE_DIRECTORY = [
  { key: "Google" as const, label: "Google", detail: "4.5 · 446 ratings", status: "Verified rating" },
  { key: "Justdial" as const, label: "Justdial", detail: "4.5 · 445 ratings", status: "Verified rating" },
  { key: "LinkedIn" as const, label: "LinkedIn", detail: "Public learner posts", status: "Feedback feed" },
  { key: "Instagram" as const, label: "Instagram", detail: "Public account", status: "Mentions not counted as ratings" },
  { key: "Glassdoor" as const, label: "Glassdoor", detail: "Arzon-specific review page not verified", status: "Not included as a rating" },
  { key: "AmbitionBox" as const, label: "AmbitionBox", detail: "Arzon-specific review page not verified", status: "Not included as a rating" },
];

const SOURCE_LINKS = {
  Instagram: "https://www.instagram.com/arzon.global",
  LinkedIn: "https://www.linkedin.com/company/arzon-global/",
};

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Arzon Global Reviews & Learner Testimonials" },
      { name: "description", content: "Browse source-labelled learner testimonials, public posts and external ratings for Arzon Global." },
      { property: "og:title", content: "Arzon Global Reviews & Learner Testimonials" },
      { property: "og:description", content: "A lightweight, source-labelled feed of learner experiences and external ratings." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/reviews") },
    ],
    links: [{ rel: "canonical", href: absUrl("/reviews") }],
  }),
  component: ReviewsPage,
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={rating + " out of 5 stars"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={index < Math.round(rating) ? "h-3.5 w-3.5 fill-amber-400 text-amber-400" : "h-3.5 w-3.5 text-slate-300"} aria-hidden="true" />
      ))}
    </span>
  );
}

function SourceMark({ source, large = false }: { source: string; large?: boolean }) {
  const normalized = source.toLowerCase();
  const size = large ? "h-11 w-11 text-base" : "h-9 w-9 text-xs";
  const base = "grid shrink-0 place-items-center rounded-xl font-black shadow-sm " + size;
  if (normalized.includes("linkedin")) return <span className={base + " bg-[#0A66C2] text-white"} aria-hidden="true">in</span>;
  if (normalized.includes("instagram")) return <span className={base + " bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white"} aria-hidden="true"><Instagram className={large ? "h-5 w-5" : "h-4 w-4"} /></span>;
  if (normalized.includes("google")) return <span className={base + " border border-slate-200 bg-white text-[#4285F4]"} aria-hidden="true">G</span>;
  if (normalized.includes("justdial")) return <span className={base + " bg-[#1688D4] text-white"} aria-hidden="true">JD</span>;
  if (normalized.includes("glassdoor")) return <span className={base + " bg-[#0CAA41] text-white"} aria-hidden="true">g</span>;
  if (normalized.includes("ambition")) return <span className={base + " bg-[#5C5CE6] text-white"} aria-hidden="true">A</span>;
  return <span className={base + " bg-slate-950 text-white"} aria-hidden="true">A</span>;
}

function SourceBadge({ review }: { review: PublishedReview }) {
  const label = review.sourceKind === "public-post" ? (review.source.includes("LinkedIn") ? "LinkedIn" : "Public post") : review.sourceKind === "first-party" ? "Arzon Careers" : review.source;
  return <span className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700"><SourceMark source={review.source} /><span>{label}</span></span>;
}

function ReviewCard({ review, index }: { review: PublishedReview; index: number }) {
  return (
    <article className="mb-5 break-inside-avoid rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]" aria-posinset={index + 1}>
      <div className="flex items-start justify-between gap-4"><SourceBadge review={review} />{review.rating ? <Stars rating={review.rating} /> : null}</div>
      <Quote className="mt-5 h-5 w-5 text-blue-600" aria-hidden="true" />
      <p className="mt-3 text-[15px] font-medium leading-7 text-slate-800">“{review.body}”</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-700">{review.author.trim().charAt(0).toUpperCase()}</span>
        <div className="min-w-0"><p className="truncate text-sm font-black text-slate-950">{review.author}</p><p className="mt-0.5 truncate text-xs text-slate-500">{[review.degree, review.college].filter(Boolean).join(" · ") || "Learner / participant"}</p></div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-blue-700">{review.domain}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">{review.sourceKind === "first-party" ? "Published by Arzon" : "Public source"}</span>
      </div>
    </article>
  );
}

function DirectoryCard({ item, selected, onSelect }: { item: (typeof SOURCE_DIRECTORY)[number]; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className={"flex min-w-[210px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition sm:min-w-0 " + (selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white hover:border-slate-300")}>
      <SourceMark source={item.label} />
      <span className="min-w-0"><span className={"block text-sm font-black " + (selected ? "text-white" : "text-slate-950")}>{item.label}</span><span className={"mt-0.5 block truncate text-[11px] " + (selected ? "text-slate-300" : "text-slate-500")}>{item.detail}</span></span>
      <span className={"ml-auto shrink-0 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] " + (selected ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-500")}>{item.status}</span>
    </button>
  );
}

function ReviewsPage() {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [category, setCategory] = useState<"All" | ReviewCategory>("All");
  const [cursor, setCursor] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);

  const filteredReviews = useMemo(() => REVIEWS.filter((review) => {
    const matchesCategory = category === "All" || review.domain === category;
    if (!matchesCategory) return false;
    if (sourceFilter === "All") return true;
    if (sourceFilter === "Arzon") return review.source === "Arzon Careers";
    if (sourceFilter === "LinkedIn") return review.source.includes("LinkedIn");
    return false;
  }), [category, sourceFilter]);

  const selectedRating = sourceFilter === "Google"
    ? EXTERNAL_RATINGS[0]
    : sourceFilter === "Justdial"
      ? EXTERNAL_RATINGS[1]
      : null;

  const visibleReviews = filteredReviews.slice(0, cursor);
  const nextCursor = cursor < filteredReviews.length ? cursor + PAGE_SIZE : null;

  useEffect(() => { setCursor(PAGE_SIZE); setLoading(false); lockRef.current = false; }, [category, sourceFilter]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || nextCursor === null) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      setLoading(true);
      window.setTimeout(() => {
        setCursor((current) => Math.min(current + PAGE_SIZE, filteredReviews.length));
        setLoading(false);
        window.setTimeout(() => { lockRef.current = false; }, 80);
      }, 180);
    }, { rootMargin: "900px 0px", threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredReviews.length, nextCursor]);

  const selectedDirectoryItem = SOURCE_DIRECTORY.find((item) => item.key === sourceFilter) ?? null;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F9FC] font-sans text-slate-950 antialiased">
      <ArzonV2PageHero eyebrow="LEARNER STORIES & TESTIMONIALS" title="What learners have publicly shared." description="Real experiences from learners, interns, workshop participants and professionals. The source stays visible, and public posts are never presented as ratings." mobileImageSrc="/images/pv-career-graduate.jpg" mobileImageAlt="Healthcare graduate reviewing career information">
        <div className="flex flex-col gap-3 sm:flex-row"><Link to="/career-engine" className="arzon-v2-button-primary">Find my career path</Link><Link to="/why-arzon" className="arzon-v2-button-secondary">See how Arzon works</Link></div>
      </ArzonV2PageHero>

      <main className="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <section aria-label="Review platform coverage" className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.045)] sm:p-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{SOURCE_DIRECTORY.map((item) => <DirectoryCard key={item.key} item={item} selected={sourceFilter === item.key} onSelect={() => setSourceFilter(item.key)} />)}</div>
          <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-semibold">{selectedDirectoryItem ? selectedDirectoryItem.detail : "Ratings and testimonials are kept as separate evidence types."}</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-500"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />No profile pages or learner accounts are embedded here.</span>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="testimonials-heading">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">TESTIMONIAL FEED</p><h2 id="testimonials-heading" className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Experiences, kept simple.</h2><p className="mt-2 text-sm leading-6 text-slate-600">{filteredReviews.length} published records match your filters. More records load automatically as the cursor reaches the end.</p></div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"><span>Source</span><ChevronDown className="h-4 w-4" /><span className="text-slate-950">{sourceFilter}</span></div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Testimonial topics">{REVIEW_CATEGORIES.map((item) => { const selected = category === item; return <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={selected} className={"shrink-0 rounded-full border px-4 py-2.5 text-xs font-extrabold transition " + (selected ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950")}>{item}</button>; })}</div>

          {selectedRating ? (
            <div className="mt-7 rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{selectedRating.platform}</p><p className="mt-2 text-4xl font-black text-slate-950">{selectedRating.rating.toFixed(1)}<span className="ml-1 text-lg text-slate-400">/ 5</span></p><div className="mt-1"><Stars rating={Math.round(selectedRating.rating)} /></div><p className="mt-1 text-xs text-slate-500">{selectedRating.reviewCount.toLocaleString("en-IN")} ratings · {selectedRating.location}</p></div>
                <a href={selectedRating.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white hover:bg-slate-800">View source</a>
              </div>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">This platform-level rating is kept separate from individual testimonial text. No individual review is reproduced here unless it has been separately verified and added to the registry.</p>
            </div>
          ) : filteredReviews.length > 0 ? <div className="mt-7 columns-1 gap-5 md:columns-2 xl:columns-3" role="feed" aria-busy={loading} aria-label="Learner testimonials">{visibleReviews.map((review, index) => <ReviewCard key={review.id} review={review} index={index} />)}</div> : <div className="mt-7 rounded-[22px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><p className="text-base font-black text-slate-900">No published testimonial is available for this source yet.</p><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">We are keeping this source visible without inventing review counts or learner quotes. Choose another source to view published records.</p></div>}

          <div ref={sentinelRef} className="h-6" aria-hidden="true" />
          {loading && nextCursor !== null ? <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-500" aria-live="polite"><span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />Loading more testimonials…</div> : null}
          {nextCursor === null && filteredReviews.length > 0 ? <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><p className="text-sm font-black text-slate-900">You reached the end of this source.</p><p className="text-xs text-slate-500">The cursor has stopped. No extra records are fabricated.</p></div> : null}
        </section>

        <section className="mt-12 grid gap-4 rounded-[24px] border border-slate-200 bg-white p-5 sm:grid-cols-3 sm:p-6">
          <div className="sm:col-span-2"><p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">SOURCE RULE</p><h3 className="mt-2 text-xl font-black text-slate-950">Ratings stay ratings. Posts stay posts.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Google and Justdial numbers are shown separately from public LinkedIn posts and Arzon-published testimonials. Glassdoor and AmbitionBox are included in the source directory, but no Arzon-specific rating is shown until the exact listing is verified.</p></div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end"><a href={SOURCE_LINKS.LinkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-slate-100"><Linkedin className="h-4 w-4" />Company LinkedIn</a><a href={SOURCE_LINKS.Instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-slate-100"><Instagram className="h-4 w-4" />Instagram</a></div>
        </section>

        <section className="mt-5 rounded-[22px] bg-slate-950 px-5 py-6 text-white sm:px-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">NEXT STEP</p><p className="mt-1 text-lg font-black">Want your own career-fit report?</p><p className="mt-1 text-sm text-slate-300">Take the free Career Engine assessment and see the next step for your background.</p></div><Link to="/career-engine" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100">Start assessment<ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
    </div>
  );
}
