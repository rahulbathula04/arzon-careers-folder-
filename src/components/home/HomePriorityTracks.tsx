import { useState, useRef } from "react";
import { ArrowRight, Calendar, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

export interface PriorityTrack {
  id: string;
  badge: string;
  badgeStyle: {
    bg: string;
    text: string;
    border: string;
  };
  duration: string;
  feature: string;
  title: string;
  slug: string;
  image: string;
  cardBg: string;
  isDark?: boolean;
  buttonBg: string;
  buttonText: string;
  link: string;
}

export const PRIORITY_TRACKS: PriorityTrack[] = [
  {
    id: "pharmacovigilance",
    badge: "Flagship",
    badgeStyle: {
      bg: "bg-white/20 backdrop-blur-md",
      text: "text-white",
      border: "border-white/20",
    },
    duration: "12 Weeks",
    feature: "Hands-on Cases",
    title: "Pharmacovigilance & Drug Safety Monitoring",
    slug: "pharmacovigilance",
    image: "/images/bpharm-female-graduate-hero.jpg",
    cardBg: "bg-gradient-to-r from-[#123BA5] via-[#1A4FD8] to-[#1E40AF]",
    isDark: true,
    buttonBg: "bg-white",
    buttonText: "text-[#1557D6]",
    link: "/pv-associate",
  },
  {
    id: "medical-coding",
    badge: "Popular",
    badgeStyle: {
      bg: "bg-blue-50",
      text: "text-[#2563EB]",
      border: "border-blue-200",
    },
    duration: "12 Weeks",
    feature: "Live Chart Audits",
    title: "Medical Coding & Clinical Informatics",
    slug: "medical-coding",
    image: "/images/ai-coding.jpg",
    cardBg: "bg-[#F0F6FE] border border-blue-200/80",
    isDark: false,
    buttonBg: "bg-[#1557D6]",
    buttonText: "text-white",
    link: "/courses/medical-coding",
  },
  {
    id: "cdm",
    badge: "Core Governance",
    badgeStyle: {
      bg: "bg-emerald-50",
      text: "text-[#059669]",
      border: "border-emerald-200",
    },
    duration: "12 Weeks",
    feature: "eCRF & EDC Datasets",
    title: "Clinical Data Management (CDM)",
    slug: "clinical-data-management",
    image: "/images/ai-cdm.jpg",
    cardBg: "bg-[#F0FDF4] border border-emerald-200/80",
    isDark: false,
    buttonBg: "bg-[#059669]",
    buttonText: "text-white",
    link: "/courses/clinical-data-management",
  },
  {
    id: "clinical-sas",
    badge: "Technical",
    badgeStyle: {
      bg: "bg-purple-50",
      text: "text-[#7C3AED]",
      border: "border-purple-200",
    },
    duration: "16 Weeks",
    feature: "CDISC & TLF Macros",
    title: "Clinical SAS & Biostatistics",
    slug: "clinical-sas",
    image: "/images/benchmarks/benchmark-clinical-sas.webp",
    cardBg: "bg-[#FAF5FF] border border-purple-200/80",
    isDark: false,
    buttonBg: "bg-[#7C3AED]",
    buttonText: "text-white",
    link: "/courses/sas-clinical",
  },
];

export function HomePriorityTracks() {
  const shouldReduceMotion = useReducedMotion();
  const trackScrollRef = useRef<HTMLDivElement>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const handleTrackScroll = () => {
    if (!trackScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackScrollRef.current;
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
              <span className="text-[#2563EB]">
                Healthcare
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed">
              Role-focused programmes designed from real job requirements with practical learning and verifiable outcomes.
            </p>
          </div>

          <Link
            to="/courses"
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-sm font-bold transition-all shadow-sm shrink-0 active:scale-[0.98]"
          >
            <span>View all programmes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* 4 Track Cards: Mobile Horizontal Snap Rail with Peek / Desktop Grid */}
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
              className={`w-[84vw] min-[390px]:w-[80vw] max-w-[340px] sm:w-auto shrink-0 snap-start rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between p-5 min-h-[200px] min-[390px]:min-h-[210px] text-left ${track.cardBg}`}
            >
              <Link to={track.link as any} className="absolute inset-0 z-10" aria-label={`Explore ${track.title}`}>
                <span className="sr-only">Explore {track.title}</span>
              </Link>

              {/* Background Image with Gradient Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500 ease-out [mask-image:linear-gradient(to_left,black_60%,transparent)]"
                  loading="lazy"
                />
              </div>

              {/* Card Content (Left Column) */}
              <div className="relative z-10 max-w-[58%] flex flex-col justify-between h-full">
                <div>
                  {/* Badge */}
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-bold tracking-wide border ${track.badgeStyle.bg} ${track.badgeStyle.text} ${track.badgeStyle.border}`}
                  >
                    {track.badge}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-sans text-base min-[390px]:text-[17px] font-bold leading-snug mt-2.5 mb-3 group-hover:opacity-90 transition-opacity ${
                      track.isDark ? "text-white" : "text-[#081F38]"
                    }`}
                  >
                    {track.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-1.5 pt-1">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                      track.isDark ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    <Calendar
                      className={`h-3.5 w-3.5 shrink-0 ${
                        track.isDark ? "text-white/80" : "text-[#2563EB]"
                      }`}
                    />
                    <span>{track.duration}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                      track.isDark ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    <Layers
                      className={`h-3.5 w-3.5 shrink-0 ${
                        track.isDark ? "text-white/80" : "text-[#2563EB]"
                      }`}
                    />
                    <span>{track.feature}</span>
                  </div>
                </div>
              </div>

              {/* Floating Action Circle Button */}
              <div
                className={`absolute bottom-4 right-4 z-20 h-10 w-10 min-[390px]:h-11 min-[390px]:w-11 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform pointer-events-none ${track.buttonBg} ${track.buttonText}`}
              >
                <ArrowRight className="h-5 w-5" />
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
                  ? "w-5 h-2 bg-[#2563EB]"
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
            className="w-full h-13 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white font-bold text-base shadow-md shadow-blue-700/20 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View All Programmes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
