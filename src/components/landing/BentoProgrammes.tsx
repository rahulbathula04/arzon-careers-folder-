import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { COURSES_BY_SLUG } from "@/data/courses";
import { thumbSrcSetFor } from "@/data/courseThumbs";
import { ProgrammeCover } from "./ProgrammeCover";
import { DOMAIN_CARDS } from "@/data/trackDomains";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";

const MOBILE_SIZES = "(max-width: 767px) 85vw, 400px";
const DESKTOP_SIZES =
  "(min-width: 1024px) min(33vw, 600px), (min-width: 768px) min(50vw, 600px), 100vw";

const APPLY_SOURCE = "home-tracks";
const tiles = DOMAIN_CARDS.filter((c) => c.slug !== "digital-health-fhir").map((c) => ({
  slug: c.slug as string,
  heroTitle: c.heroTitle ?? `${c.label} Track`,
  subject: c.subject ?? c.label,
  role: c.label,
  eyebrow: c.eyebrow,
  blurb: c.blurb,
  skillsHeader: c.skillsHeader ?? "Build skills in:",
  skills: c.skills ?? [],
  bestFor: c.bestFor,
  footerTag: c.footerTag ?? "12 WEEKS · ROLE-BASED · FRESHER",
  salary: c.decision?.salary ?? "",
  hiring: c.decision?.hiring ?? "",
  difficulty: c.decision?.difficulty ?? "",
  demand: c.decision?.demand ?? "",
}));

export function BentoProgrammes() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState("all");
  const shouldReduceMotion = useReducedMotion();

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
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">
              12-WEEK FRESHER CAREER TRACKS
            </p>
            <div className="h-0.5 w-8 bg-[#8A6D1F]/60 mt-1 rounded-full" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">
            Train for the role. <em className="italic-accent not-italic text-[#8A6D1F]">Not just the subject.</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
            Every track is built around the skills, workflows and expectations associated with a specific entry-level role.
          </p>

          {/* 1-Tap Category Segment Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: "All Roles" },
              { id: "pharmacy", label: "Pharmacy / B.Pharm" },
              { id: "non-pharma", label: "Non-Pharma / B.Sc / BBA" },
              { id: "nursing", label: "Nursing & Allied" },
            ].map((tab) => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer border ${
                    isSelected
                      ? "text-slate-50 border-[#0F172A]"
                      : "border-slate-300 bg-white text-[#334155] hover:border-slate-400 hover:text-[#0F172A] shadow-xs"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeCategoryTab"
                      transition={TRANSITION_PRESETS.springQuick}
                      className="absolute inset-0 bg-[#0F172A] rounded-full shadow-md -z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
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
                    alt={`${t.heroTitle} cover`}
                    aspect="aspect-[16/9]"
                    sizes={MOBILE_SIZES}
                  >
                    <span className="absolute right-2 top-2 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-[11px] font-bold shadow-md backdrop-blur-md">
                      {t.salary}
                    </span>
                  </ProgrammeCover>

                  <div className="flex flex-1 flex-col pt-4 space-y-3">
                    <div>
                      <p className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
                        {t.heroTitle}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-[#0F172A] mt-0.5">
                        {t.subject}
                      </h3>

                      {/* Skills List */}
                      {t.skills.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-100 space-y-1.5">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                            {t.skillsHeader}
                          </p>
                          <ul className="space-y-1">
                            {t.skills.map((skill) => (
                              <li key={skill} className="flex items-center gap-1.5 text-xs text-[#334155] font-medium">
                                <CheckCircle2 className="h-3 w-3 text-teal-600 shrink-0" />
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p className="text-[11px] text-[#64748B] mt-3 italic font-medium">
                        Best for: {t.bestFor}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0F172A] border border-slate-200">
                        {t.footerTag}
                      </span>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <Link
                        to="/apply"
                        search={{ programme: t.slug, source: APPLY_SOURCE }}
                        className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-sm w-full"
                      >
                        <span className="text-white font-bold">Apply for this track</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                      </Link>
                      <Link
                        to="/courses/$slug"
                        params={{ slug: t.slug }}
                        className="text-xs h-10 px-3 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm w-full"
                      >
                        <span className="text-[#0F172A] font-bold">View role roadmap</span>
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

        {/* Desktop Grid with Staggered Framer Motion Reveals */}
        <StaggerContainer className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((t) => {
            const { src, srcSet } = thumbSrcSetFor(
              t.slug,
              COURSES_BY_SLUG[t.slug]?.category ?? "Pharmacy",
            );
            return (
              <StaggerItem key={t.slug}>
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.015, transition: TRANSITION_PRESETS.springGentle }}
                  className="rounded-[28px] glass-card-light flex flex-col overflow-hidden p-5 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-slate-300 group"
                >
                  <ProgrammeCover
                    src={src}
                    srcSet={srcSet}
                    alt={`${t.heroTitle} cover`}
                    aspect="aspect-[16/8]"
                    sizes={DESKTOP_SIZES}
                  >
                    <span className="absolute right-3 top-3 rounded-full bg-[#0F172A] text-white px-3 py-1 font-mono text-xs font-bold shadow-md backdrop-blur-md">
                      {t.salary}
                    </span>
                  </ProgrammeCover>

                  <div className="flex flex-1 flex-col pt-4 space-y-3 justify-between">
                    <div>
                      <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
                        {t.heroTitle}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-0.5">
                        {t.subject}
                      </h3>

                      {/* Skills List */}
                      {t.skills.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                            {t.skillsHeader}
                          </p>
                          <ul className="space-y-1">
                            {t.skills.map((skill) => (
                              <li key={skill} className="flex items-center gap-1.5 text-xs text-[#334155] font-medium">
                                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p className="text-[11px] text-[#64748B] mt-3 italic font-medium">
                        Best for: {t.bestFor}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3">
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0F172A] border border-slate-200">
                          {t.footerTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Link
                            to="/apply"
                            search={{ programme: t.slug, source: APPLY_SOURCE }}
                            className="text-xs h-10 px-3 flex items-center justify-center gap-1.5 text-white font-bold rounded-xl bg-[#0F172A] hover:bg-[#1E293B] shadow-sm transition-colors w-full"
                          >
                            <span className="text-white font-bold">Apply for this track</span>
                            <ArrowRight className="h-3.5 w-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Link
                            to="/courses/$slug"
                            params={{ slug: t.slug }}
                            className="text-xs h-10 px-3 flex items-center justify-center gap-1 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm w-full"
                          >
                            <span className="text-[#0F172A] font-bold">View role roadmap</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B]" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Global Match CTA */}
        <div className="text-center pt-6">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="inline-block"
          >
            <Link
              to="/career-engine"
              className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 shadow-lg shadow-blue-600/25 transition-all"
            >
              <Compass className="h-4 w-4 text-white" />
              <span className="text-white font-bold">Match me to a role in 3 minutes</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

