import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { COURSES_BY_SLUG } from "@/data/courses";
import { thumbSrcSetFor } from "@/data/courseThumbs";
import { ProgrammeCover } from "./ProgrammeCover";
import { DOMAIN_CARDS } from "@/data/trackDomains";

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
      className={`grid grid-cols-3 gap-x-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 ${className}`}
    >
      {[
        ["HIRING", hiring],
        ["DIFFICULTY", difficulty],
        ["DEMAND", demand],
      ].map(([k, v]) => (
        <div key={k} className="min-w-0 text-center">
          <dt className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
            {k}
          </dt>
          <dd className="mt-0.5 text-xs font-bold text-[#0F172A] truncate">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BentoProgrammes() {
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
    const left = target.offsetLeft - root.offsetLeft - 20;
    root.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <section
      id="programmes"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">
              LIVE TRACKS · HEALTHCARE
            </p>
            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#8A6D1F] italic tracking-tight leading-tight">
            Role-first tracks
          </h2>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
            Each track trains you for a <strong>specific role recruiters in India hire for</strong>,
            with the tools and workflows from real JDs.{" "}
            <strong>Engineering, Agri-tech and Business tracks</strong> roll out across 2026 — take
            the Readiness Test to get matched.
          </p>
        </div>

        {/* Mobile Horizontal Snap */}
        <div className="relative md:hidden">
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]"
          >
            {tiles.map((t, i) => {
              const { src, srcSet } = thumbSrcSetFor(
                t.slug,
                COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy",
              );
              return (
                <article
                  key={t.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-4 shadow-sm"
                >
                  <ProgrammeCover
                    src={src}
                    srcSet={srcSet}
                    alt={`${t.role} cover`}
                    aspect="aspect-[16/9]"
                    sizes={MOBILE_SIZES}
                  >
                    <span className="absolute right-2 top-2 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">
                      {t.salary}
                    </span>
                  </ProgrammeCover>
                  <div className="flex flex-1 flex-col pt-4 space-y-3">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                        JOB ROLE · 12 WEEKS
                      </p>
                      <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">
                        {t.role}
                      </h3>
                      <p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">
                        {t.blurb}
                      </p>
                      <p className="text-[11px] text-[#64748B] mt-1 italic font-medium">
                        Best for: {t.bestFor}
                      </p>
                    </div>

                    <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} />

                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        to="/apply"
                        search={{ programme: t.slug, source: APPLY_SOURCE }}
                        className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm"
                      >
                        <span className="text-white font-bold">Apply now</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </Link>
                      <Link
                        to="/courses/$slug"
                        params={{ slug: t.slug }}
                        className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        <span className="text-[#0F172A] font-bold">Explore role-track</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex justify-center gap-1.5 pt-2">
            {tiles.map((t, i) => (
              <button
                key={t.slug}
                onClick={() => scrollToIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((t) => {
            const { src, srcSet } = thumbSrcSetFor(
              t.slug,
              COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy",
            );
            return (
              <article
                key={t.slug}
                className="rounded-[28px] border border-slate-200/90 bg-white flex flex-col overflow-hidden p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <ProgrammeCover
                  src={src}
                  srcSet={srcSet}
                  alt={`${t.role} job-role track cover`}
                  aspect="aspect-[16/8]"
                  sizes={DESKTOP_SIZES}
                >
                  <span className="absolute right-3 top-3 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-xs font-bold shadow-md backdrop-blur-md">
                    {t.salary}
                  </span>
                </ProgrammeCover>

                <div className="flex flex-1 flex-col pt-4 space-y-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      JOB ROLE · 12 WEEKS
                    </p>
                    <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">{t.role}</h3>
                    <p className="text-xs text-[#334155] line-clamp-2 mt-1 leading-relaxed font-medium">
                      {t.blurb}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-1 italic font-medium">
                      Best for: {t.bestFor}
                    </p>
                  </div>

                  <DecisionStrip hiring={t.hiring} difficulty={t.difficulty} demand={t.demand} />

                  <div className="mt-auto pt-4 flex items-center gap-2 border-t border-slate-100">
                    <Link
                      to="/apply"
                      search={{ programme: t.slug, source: APPLY_SOURCE }}
                      className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors"
                    >
                      <span className="text-white font-bold">Apply now</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </Link>

                    <Link
                      to="/courses/$slug"
                      params={{ slug: t.slug }}
                      className="text-xs h-10 px-3 flex-1 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <span className="text-[#0F172A] font-bold">Explore role-track</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Match CTA */}
        <div className="text-center pt-6">
          <Link
            to="/career-engine"
            className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
          >
            <Compass className="h-4 w-4 text-white" />
            <span className="text-white font-bold">Match me to a role in 3 minutes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
