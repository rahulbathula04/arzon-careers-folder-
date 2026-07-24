import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { COURSES_BY_SLUG } from "@/data/courses";
import { thumbSrcSetFor } from "@/data/courseThumbs";
import { CTAButton } from "./CTAButton";
import { ProgrammeCover } from "./ProgrammeCover";
import { DOMAIN_CARDS } from "@/data/trackDomains";
import { getTrackTheme } from "@/data/trackTheme";

const MOBILE_SIZES = "(max-width: 767px) 85vw, 400px";
const DESKTOP_SIZES =
  "(min-width: 1024px) min(33vw, 600px), (min-width: 768px) min(50vw, 600px), 100vw";

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
      className={`grid grid-cols-3 gap-x-3 rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md ${className}`}
    >
      {[
        ["Hiring", hiring],
        ["Difficulty", difficulty],
        ["Demand", demand],
      ].map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="font-mono text-[0.58rem] uppercase tracking-[0.06em] leading-tight text-white/50">
            {k}
          </dt>
          <dd className="mt-0.5 text-[0.78rem] font-semibold leading-snug text-white/90">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BentoProgrammes() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Intersection Observer for mobile carousel
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
    const left = target.offsetLeft - root.offsetLeft - 20; 
    root.scrollTo({ left, behavior: "smooth" });
  };

  const goPrev = () => scrollToIdx(Math.max(0, activeIdx - 1));
  const goNext = () => scrollToIdx(Math.min(tiles.length - 1, activeIdx + 1));

  // Framer motion variants
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <Section id="programmes" size="md" className="tone-dark bg-[#0a0c10] py-16">
      <SectionHeader
        eyebrow="Live tracks · Healthcare"
        title={<span className="text-white">Role-first tracks</span>}
        tone="dark"
        sub={
          <span className="text-white/70">
            Each track trains you for a <strong>specific role recruiters in India hire for</strong>,
            with the tools and workflows from real JDs. Take
            the Readiness Test to get matched.
          </span>
        }
      />

      {/* Mobile: horizontal snap carousel */}
      <div className="relative mt-7 md:hidden">
        <div
          ref={scrollerRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tiles.map((t, i) => {
            const { src, srcSet } = thumbSrcSetFor(t.slug, COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy");
            const theme = getTrackTheme(t.slug as Parameters<typeof getTrackTheme>[0]);
            return (
              <article
                key={t.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl glass-panel-deep"
              >
                <span aria-hidden className={`absolute inset-x-0 top-0 z-10 h-1 ${theme.accent}`} />
                <ProgrammeCover src={src} srcSet={srcSet} alt={`${t.role} cover`} aspect="aspect-[16/9]" sizes={MOBILE_SIZES}>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 to-transparent" />
                  <span className="absolute right-2 top-2 rounded-full glass-panel px-3 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-brand-gold">
                    {t.salary}
                  </span>
                </ProgrammeCover>
                <div className="flex flex-1 flex-col p-4 bg-[#0a0c10]/50">
                  <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-accent-glow">
                    Job role · 12 weeks
                  </p>
                  <h3 className="font-grotesk text-lg font-bold leading-tight text-white mt-1">
                    {t.role}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">
                    {t.blurb}
                  </p>
                  <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} className="mt-4" />
                  <div className="mt-auto pt-5 flex items-center gap-3">
                    <Link
                      to="/apply"
                      search={{ programme: t.slug, source: APPLY_SOURCE }}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                    >
                      Apply now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Nav Dots */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {tiles.map((t, i) => (
               <button
                 key={t.slug}
                 onClick={() => scrollToIdx(i)}
                 className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-accent-glow" : "w-1.5 bg-white/20"}`}
               />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Animated Staggered Grid */}
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mt-6 hidden grid-cols-1 gap-5 md:mt-10 md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        {tiles.map((t) => {
          const { src, srcSet } = thumbSrcSetFor(t.slug, COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy");
          const theme = getTrackTheme(t.slug as Parameters<typeof getTrackTheme>[0]);
          return (
            <motion.article
              variants={cardVariants}
              key={t.slug}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] glass-panel-deep transition duration-300 hover:border-white/20 hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(125,211,252,0.15)]"
            >
              {/* Dynamic Theme Glow on Hover */}
              <div className={`absolute -inset-1 blur-3xl opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-br ${theme.accent}`} />
              
              <span aria-hidden className={`absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r ${theme.accent}`} />
              
              <ProgrammeCover
                src={src}
                srcSet={srcSet}
                alt={`${t.role} job-role track cover`}
                aspect="aspect-[16/7]"
                sizes={DESKTOP_SIZES}
                imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
              >
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/20 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full glass-panel px-3 py-1 font-mono text-micro font-semibold uppercase tracking-wider text-brand-gold shadow-lg backdrop-blur-md">
                  {t.salary}
                </span>
              </ProgrammeCover>

              <div className="flex flex-1 flex-col p-5 bg-[#0a0c10]/40 relative z-10">
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-accent-glow">
                  Job role · 12 weeks
                </p>
                <h3 className="mt-2 text-xl font-display font-bold leading-snug text-white">{t.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">
                  {t.blurb}
                </p>
                <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} className="mt-4" />
                
                <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to="/courses/$slug"
                    params={{ slug: t.slug }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition hover:text-white group/link"
                  >
                    View Syllabus <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link
                    to="/apply"
                    search={{ programme: t.slug, source: APPLY_SOURCE }}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 hover:scale-105 active:scale-95"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex flex-col items-center justify-center gap-4"
      >
        <CTAButton
          asChild
          variant="primary"
          size="lg"
          leadingIcon={<Compass className="h-4 w-4" />}
          trailingIcon={<ArrowUpRight className="h-4 w-4" />}
        >
          <Link to="/career-engine">Match me to a role, 3-min test</Link>
        </CTAButton>
      </motion.div>
    </Section>
  );
}
