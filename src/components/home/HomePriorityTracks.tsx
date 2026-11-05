import { useState, useRef } from "react";
import { ArrowRight, Calendar, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

export interface PriorityTrack {
  id: string;
  badge: string;
  dotColor: string;
  duration: string;
  feature: string;
  title: string;
  slug: string;
  image: string;
  link: string;
}

export const PRIORITY_TRACKS: PriorityTrack[] = [
  {
    id: "pharmacovigilance",
    badge: "Flagship Track",
    dotColor: "bg-[#2563EB]",
    duration: "12 Weeks",
    feature: "Hands-on Cases",
    title: "Pharmacovigilance & Drug Safety Monitoring",
    slug: "pharmacovigilance",
    image: "/images/bpharm-female-graduate-hero.jpg",
    link: "/pv-associate",
  },
  {
    id: "medical-coding",
    badge: "Popular Track",
    dotColor: "bg-[#0284C7]",
    duration: "12 Weeks",
    feature: "Live Chart Audits",
    title: "Medical Coding & Clinical Informatics",
    slug: "medical-coding",
    image: "/images/pv-clinical-coding.jpg",
    link: "/courses/medical-coding",
  },
  {
    id: "cdm",
    badge: "Core Governance",
    dotColor: "bg-[#10B981]",
    duration: "12 Weeks",
    feature: "eCRF & EDC Datasets",
    title: "Clinical Data Management (CDM)",
    slug: "clinical-data-management",
    image: "/images/pv-clinical-workstation.jpg",
    link: "/courses/clinical-data-management",
  },
  {
    id: "clinical-sas",
    badge: "Technical Track",
    dotColor: "bg-[#7C3AED]",
    duration: "16 Weeks",
    feature: "CDISC & TLF Macros",
    title: "Clinical SAS & Biostatistics",
    slug: "clinical-sas",
    image: "/images/bioinformatics-workstation.jpg",
    link: "/courses/sas-clinical",
  },
];

export function HomePriorityTracks() {
  const shouldReduceMotion = useReducedMotion();
  const trackScrollRef = useRef<HTMLDivElement>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const handleTrackScroll = () => {
    if (!trackScrollRef.current) return;
    const { scrollLeft } = trackScrollRef.current;
    const cardWidth = window.innerWidth * 0.82;
    const index = Math.round(scrollLeft / (cardWidth || 300));
    setActiveTrackIndex(Math.min(Math.max(index, 0), PRIORITY_TRACKS.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!trackScrollRef.current) return;
    const cardWidth = window.innerWidth * 0.82 + 16;
    trackScrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveTrackIndex(index);
  };

  return (
    <section id="career-paths" className="relative py-12 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div id="priority-tracks" className="absolute -top-16" aria-hidden="true" />
      <div className="ap-shell max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10 text-left"
        >
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-[#64748B] uppercase mb-2">
              CHOOSE YOUR DIRECTION
            </div>
            <h2 className="text-[32px] min-[390px]:text-[36px] sm:text-[42px] font-sans font-extrabold text-[#081F38] tracking-tight leading-[1.12]">
              Explore Career<br className="sm:hidden" /> Tracks in{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Healthcare
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed">
              Role-focused programmes designed from real job requirements with practical learning and verifiable outcomes.
            </p>
          </div>

          <Link
            to="/courses"
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] hover:bg-[#1557D6] text-white px-6 py-3 text-sm font-bold transition-all shadow-md shrink-0 active:scale-[0.98] cursor-pointer"
          >
            <span>View all programmes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* 4 Track Cards: Dedicated Top Cover Bento Architecture */}
        <div
          ref={trackScrollRef}
          onScroll={handleTrackScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-none pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overscroll-x-contain touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {PRIORITY_TRACKS.map((track, idx) => (
            <motion.article
              key={track.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="w-[84vw] min-[390px]:w-[80vw] max-w-[340px] sm:w-auto shrink-0 snap-start rounded-3xl border border-[#E2E8F0] bg-white p-3.5 sm:p-4 shadow-xs hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 tone-light card-light flex flex-col justify-between group text-left relative overflow-hidden"
            >
              <Link to={track.link as any} className="absolute inset-0 z-20" aria-label={`Explore ${track.title}`}>
                <span className="sr-only">Explore {track.title}</span>
              </Link>

              {/* Dedicated Top Visual Showcase */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl bg-slate-100 shrink-0">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Glassmorphism Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full backdrop-blur-md bg-white/95 px-3 py-1 text-[11px] font-bold text-[#081F38] shadow-xs border border-white/40 tone-light card-light">
                    <span className={`h-1.5 w-1.5 rounded-full ${track.dotColor}`} />
                    {track.badge}
                  </span>
                </div>

                {/* Floating Action Arrow */}
                <div className="absolute bottom-3 right-3 z-10 h-9 w-9 rounded-full bg-white/95 text-[#081F38] shadow-md flex items-center justify-center group-hover:bg-[#081F38] group-hover:text-white group-hover:scale-110 active:scale-95 transition-all duration-300 tone-light card-light pointer-events-none">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Card Body (Full Width Typography - Zero Awkward Wrapping) */}
              <div className="pt-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-sans text-base sm:text-[17px] font-bold text-[#081F38] leading-snug group-hover:text-[#1D4ED8] transition-colors break-normal hyphens-none line-clamp-2 min-h-[2.8rem]">
                    {track.title}
                  </h3>

                  {/* Micro Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-slate-600 mt-2.5">
                    <div className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                      <span>{track.duration}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-[#0284C7] shrink-0" />
                      <span className="truncate">{track.feature}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="border-t border-slate-100 pt-3 mt-3.5 flex items-center justify-between text-xs font-semibold text-[#081F38] group-hover:text-[#1D4ED8] transition-colors">
                  <span>Explore curriculum & roles</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5 sm:hidden" aria-hidden="true">
          {PRIORITY_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeTrackIndex === idx
                  ? "w-6 h-2 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Full-Width View All Programmes Button */}
        <div className="mt-5 md:hidden">
          <Link
            to="/courses"
            className="w-full h-13 rounded-full bg-[#081F38] hover:bg-[#1557D6] text-white font-bold text-base shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View All Programmes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
