import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { COURSES_BY_SLUG } from "@/data/courses";
import { thumbSrcSetFor } from "@/data/courseThumbs";
import { CTAButton } from "./CTAButton";
import { ProgrammeCover } from "./ProgrammeCover";
import { DOMAIN_CARDS } from "@/data/trackDomains";
import { getTrackTheme } from "@/data/trackTheme";

// Single source of truth for card cover sizing. Both the mobile carousel
// and the desktop grid feed the same wrapper so any tweak stays consistent.
const MOBILE_SIZES = "(max-width: 767px) 85vw, 400px";
// Desktop: <=md 1 col, md 2 col (~50vw), lg+ 3 col (~33vw). Cap at 600px
// because the source only offers up to 800w — no point requesting more.
const DESKTOP_SIZES =
  "(min-width: 1024px) min(33vw, 600px), (min-width: 768px) min(50vw, 600px), 100vw";

// Hybrid tiles: visual weight of the old Bento (hero imagery, salary chip,
// track-accent) + the decision data from TrackDomainGrid (Hiring /
// Difficulty / Demand). Single source of truth = DOMAIN_CARDS coreOnly.
const APPLY_SOURCE = "home-tracks";
const tiles = DOMAIN_CARDS.filter((c) => c.slug !== "digital-health-fhir").map((c) => ({
  slug: c.slug as string,
  role: c.label,
  eyebrow: c.eyebrow,
  blurb: c.blurb,
  bestFor: c.bestFor,
  salary: c.decision?.salary ?? "",
  hiring: c.decision?.hiring ?? "",
  difficulty: c.decision?.difficulty ?? "",
  demand: c.decision?.demand ?? "",
}));

function DecisionStrip({
  hiring,
  difficulty,
  demand,
  className = "",
}: {
  hiring: string;
  difficulty: string;
  demand: string;
  className?: string;
}) {
  return (
    <dl
      className={`tone-light grid grid-cols-3 gap-x-3 rounded-xl border border-ink/10 bg-slate-50/70 p-2.5 ${className}`}
    >
      {[
        ["Hiring", hiring],
        ["Difficulty", difficulty],
        ["Demand", demand],
      ].map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="font-mono text-[0.58rem] uppercase tracking-[0.06em] leading-tight text-ink/55">
            {k}
          </dt>
          <dd className="mt-0.5 text-[0.78rem] font-semibold leading-snug text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BentoProgrammes() {
  // Dev safety: warn if any tile points at a slug missing from the catalogue.
  if (import.meta.env.DEV) {
    for (const t of tiles) {
      if (!COURSES_BY_SLUG[t.slug]) {
        console.warn(`[BentoProgrammes] Unknown course slug: ${t.slug}`);
      }
    }
  }
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = cardRefs.current.findIndex((el) => el === visible.target);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { root, threshold: [0.6] },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIdx = (idx: number) => {
    const root = scrollerRef.current;
    const target = cardRefs.current[idx];
    if (!root || !target) return;
    const left = target.offsetLeft - root.offsetLeft - 20; // align with px-5 inset
    root.scrollTo({ left, behavior: "smooth" });
  };

  const goPrev = () => scrollToIdx(Math.max(0, activeIdx - 1));
  const goNext = () => scrollToIdx(Math.min(tiles.length - 1, activeIdx + 1));

  return (
    <Section id="programmes" size="md">
      <SectionHeader
        eyebrow="Live tracks · Healthcare"
        title={<span className="italic-accent">Role-first tracks</span>}
        sub={
          <>
            Each track trains you for a <strong>specific role recruiters in India hire for</strong>,
            with the tools and workflows from real JDs.{" "}
            <strong>Engineering, Agri-tech and Business tracks</strong> roll out across 2026. Take
            the Readiness Test to get matched.
          </>
        }
      />

      {/* Mobile: horizontal snap carousel with prev/next + dot indicators.
            Swipe still works; buttons + dots are progressive enhancement. */}
      <div className="relative mt-7 md:hidden">
        <div
          ref={scrollerRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 28px), transparent 100%)",
          }}
        >
          {tiles.map((t, i) => {
            const { src, srcSet } = thumbSrcSetFor(
              t.slug,
              COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy & Life Sciences",
            );
            const theme = getTrackTheme(t.slug as Parameters<typeof getTrackTheme>[0]);
            return (
              <article
                key={t.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-testid="track-hero"
                data-track={t.slug}
                className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl card-light"
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 z-10 h-[3px] ${theme.accent}`}
                />
                <ProgrammeCover
                  src={src}
                  srcSet={srcSet}
                  alt={`${t.role} job-role track cover`}
                  aspect="aspect-[16/9]"
                  sizes={MOBILE_SIZES}
                >
                  <span className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-wider text-gold">
                    {t.salary}
                  </span>
                </ProgrammeCover>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow">
                    Job role · 12 weeks
                  </p>
                  <h3 className="font-grotesk text-body-sm font-bold leading-tight text-ink">
                    {t.role}
                  </h3>
                  <p className="mt-1.5 text-meta leading-snug text-muted-foreground line-clamp-2">
                    {t.blurb}
                  </p>
                  <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} />
                  <div className="mt-3 flex items-center gap-3">
                    <Link
                      to="/apply"
                      search={{ programme: t.slug, source: APPLY_SOURCE }}
                      data-apply-surface="home-tracks"
                      data-programme-slug={t.slug}
                      aria-label={`Apply for ${t.role} internship`}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold !text-slate-50 transition hover:bg-ink/90"
                    >
                      Apply now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to="/courses/$slug"
                      params={{ slug: t.slug }}
                      className="inline-flex items-center gap-1 text-meta font-semibold text-primary hover:underline"
                    >
                      Explore <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Prev / Next buttons */}
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIdx === 0}
          aria-label="Previous programme"
          className="absolute -left-1 top-[28%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={activeIdx === tiles.length - 1}
          aria-label="Next programme"
          className="absolute -right-1 top-[28%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots + counter */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Programme carousel">
            {tiles.map((t, i) => (
              <button
                key={t.slug}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to programme ${i + 1}: ${t.role}`}
                onClick={() => scrollToIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx ? "w-6 bg-primary" : "w-1.5 bg-ink/25"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-ink/55">
            {activeIdx + 1} / {tiles.length}
          </span>
        </div>
      </div>

      {/* Desktop: uniform 3-column grid, compact card sizing */}
      <div className="mt-6 hidden grid-cols-1 gap-3 md:mt-7 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {tiles.map((t) => {
          const { src, srcSet } = thumbSrcSetFor(
            t.slug,
            COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy & Life Sciences",
          );
          const theme = getTrackTheme(t.slug as Parameters<typeof getTrackTheme>[0]);
          return (
            <article
              key={t.slug}
              data-testid="track-hero"
              data-track={t.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl card-light card-hairline-gradient"
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 z-10 h-[3px] ${theme.accent}`}
              />
              <ProgrammeCover
                src={src}
                srcSet={srcSet}
                alt={`${t.role} job-role track cover`}
                aspect="aspect-[16/6]"
                sizes={DESKTOP_SIZES}
                imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0"
                />
                <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-wider text-gold">
                  {t.salary}
                </span>
              </ProgrammeCover>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-eyebrow">
                  Job role · 12 weeks
                </p>
                <h3 className="mt-0.5 text-[15px] font-bold leading-snug text-ink">{t.role}</h3>
                <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground line-clamp-2">
                  {t.blurb}
                </p>
                {t.bestFor ? (
                  <p className="mt-1 font-mono text-[10px] text-ink/55">Best for: {t.bestFor}</p>
                ) : null}
                <DecisionStrip
                  hiring={t.hiring}
                  difficulty={t.difficulty}
                  demand={t.demand}
                  className="mt-2"
                />
                <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center">
                  <Link
                    to="/apply"
                    search={{ programme: t.slug, source: APPLY_SOURCE }}
                    data-apply-surface="home-tracks"
                    data-programme-slug={t.slug}
                    aria-label={`Apply for ${t.role} internship`}
                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold !text-slate-50 transition hover:bg-ink/90"
                  >
                    Apply now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: t.slug }}
                    className="tone-light inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-ink/20 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition hover:bg-ink/[0.04]"
                  >
                    Explore role-track{" "}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-6">
        <CTAButton
          asChild
          variant="primary"
          size="lg"
          leadingIcon={<Compass className="h-4 w-4" />}
          trailingIcon={<ArrowUpRight className="h-4 w-4" />}
        >
          <Link to="/career-engine">Match me to a role, 3-min test</Link>
        </CTAButton>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-caption font-semibold text-eyebrow hover:text-slate-50"
        >
          Browse healthcare catalogue <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}
