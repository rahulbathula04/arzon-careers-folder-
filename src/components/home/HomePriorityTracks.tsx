import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import thumbPV from "@/assets/thumbs/pharmacovigilance.webp";
import thumbMC from "@/assets/thumbs/medical-coding.webp";
import thumbCDM from "@/assets/thumbs/clinical-data-management.webp";
import thumbSAS from "@/assets/thumbs/sas-clinical.webp";

import thumbPV400 from "@/assets/thumbs/generated/pharmacovigilance-400w.webp";
import thumbPV600 from "@/assets/thumbs/generated/pharmacovigilance-600w.webp";
import thumbMC400 from "@/assets/thumbs/generated/medical-coding-400w.webp";
import thumbMC600 from "@/assets/thumbs/generated/medical-coding-600w.webp";
import thumbCDM400 from "@/assets/thumbs/generated/clinical-data-management-400w.webp";
import thumbCDM600 from "@/assets/thumbs/generated/clinical-data-management-600w.webp";
import thumbSAS400 from "@/assets/thumbs/generated/sas-clinical-400w.webp";
import thumbSAS600 from "@/assets/thumbs/generated/sas-clinical-600w.webp";

export interface PriorityTrack {
  id: string;
  badge: string;
  duration: string;
  title: string;
  slug: string;
  image: string;
  srcSet?: string;
  summary: string;
  tools: string[];
  link: string;
}

export const PRIORITY_TRACKS: PriorityTrack[] = [
  {
    id: "pharmacovigilance",
    badge: "HIGHEST FRESHER RECRUITMENT VOLUME",
    duration: "12 Weeks",
    title: "Pharmacovigilance & Drug Safety",
    slug: "pharmacovigilance",
    image: thumbPV,
    srcSet: `${thumbPV400} 400w, ${thumbPV600} 600w, ${thumbPV} 800w`,
    summary: "Learn end-to-end drug safety processes with real-world case practice.",
    tools: ["SAFETY DB", "CLINICAL CODING", "WHO-UMC"],
    link: "/pv-associate",
  },
  {
    id: "medical-coding",
    badge: "HIGH REVENUE CYCLE DEMAND",
    duration: "12 Weeks",
    title: "Medical Coding & Clinical Informatics",
    slug: "medical-coding",
    image: thumbMC,
    srcSet: `${thumbMC400} 400w, ${thumbMC600} 600w, ${thumbMC} 800w`,
    summary: "Master ICD-10-CM, CPT-4 coding with practical chart audits.",
    tools: ["ICD-10-CM", "CPT-4", "HCPCS"],
    link: "/courses/medical-coding",
  },
  {
    id: "cdm",
    badge: "CLINICAL TRIAL CORE GOVERNANCE",
    duration: "12 Weeks",
    title: "Clinical Data Management (CDM)",
    slug: "clinical-data-management",
    image: thumbCDM,
    srcSet: `${thumbCDM400} 400w, ${thumbCDM600} 600w, ${thumbCDM} 800w`,
    summary: "Work on eCRF design, data validation and real clinical datasets.",
    tools: ["EDC", "SDV", "SAE Reconciliation"],
    link: "/courses/clinical-data-management",
  },
  {
    id: "clinical-sas",
    badge: "BIOSTATISTICAL PROGRAMMING",
    duration: "16 Weeks",
    title: "Clinical SAS & Biostatistics",
    slug: "clinical-sas",
    image: thumbSAS,
    srcSet: `${thumbSAS400} 400w, ${thumbSAS600} 600w, ${thumbSAS} 800w`,
    summary: "Learn SAS programming with clinical data and generate TLFs.",
    tools: ["STAT COMPUTING", "SDTM", "ADaM"],
    link: "/courses/sas-clinical",
  },
];

export function HomePriorityTracks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="career-paths" className="relative py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div id="priority-tracks" className="absolute -top-16" aria-hidden="true" />
      <div className="ap-shell">
        {/* Header Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
              <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
              <span>CHOOSE YOUR DIRECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
              Explore Career Tracks in{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Healthcare
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
              Role-focused programmes designed from real job requirements with practical learning and verifiable outcomes.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>View all programmes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between sm:hidden mb-3 text-[11px] font-mono text-slate-400">
          <span>SWIPE TO EXPLORE TRACKS</span>
          <span className="flex items-center gap-1 text-[#1557D6] font-bold">
            <span>4 Programmes</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>

        {/* 4 Track Cards: Mobile Snap Rail / Desktop 4-Col Grid */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
              },
            },
          }}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-none pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 overscroll-x-contain touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {PRIORITY_TRACKS.map((track) => (
            <motion.article
              key={track.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { type: "spring", stiffness: 350, damping: 25 },
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.99,
                      transition: { duration: 0.15 },
                    }
              }
              className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white overflow-hidden shadow-xs hover:border-[#1557D6]/40 hover:shadow-lg transition-colors group tone-light card-light w-[82vw] xs:w-[80vw] max-w-[310px] shrink-0 snap-start sm:w-auto"
            >
              <div>
                {/* Image Thumbnail with Duration Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={track.image}
                    srcSet={track.srcSet}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 84vw"
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] border border-white/80 shadow-xs tone-light card-light">
                    <span>{track.duration}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                  <h3 className="font-sans text-base font-bold text-[#071A4A] leading-snug group-hover:text-[#1557D6] transition-colors line-clamp-2">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                    {track.summary}
                  </p>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#475569] border border-slate-200/70"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 flex items-center justify-between border-t border-[#F1F5F9]">
                <Link
                  to={track.link as any}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:text-[#071A4A] transition-colors"
                >
                  <span>View details</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  to={track.link as any}
                  aria-label={`View details for ${track.title}`}
                  className="grid h-7 w-7 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] group-hover:bg-[#1557D6] group-hover:text-white transition-colors"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
