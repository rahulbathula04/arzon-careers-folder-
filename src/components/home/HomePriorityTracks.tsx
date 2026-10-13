import { ArrowRight, ArrowUpRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface PriorityTrack {
  id: string;
  badge: string;
  duration: string;
  title: string;
  slug: string;
  image: string;
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
    image: "/images/ai-pv.jpg",
    summary: "Learn end-to-end drug safety processes with real-world case practice.",
    tools: ["ARGUS", "MEDDRA", "WHO-UMC"],
    link: "/pv-associate",
  },
  {
    id: "medical-coding",
    badge: "HIGH REVENUE CYCLE DEMAND",
    duration: "12 Weeks",
    title: "Medical Coding & Clinical Informatics",
    slug: "medical-coding",
    image: "/images/ai-coding.jpg",
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
    image: "/images/ai-cdm.jpg",
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
    image: "/images/ai-cr.jpg",
    summary: "Learn SAS programming with clinical data and generate TLFs.",
    tools: ["SAS", "SDTM", "ADAM"],
    link: "/courses/sas-clinical",
  },
];

export function HomePriorityTracks() {
  return (
    <section id="priority-tracks" className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="ap-shell">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">
              <span>CHOOSE YOUR DIRECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">
              Explore career tracks in healthcare.
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
        </div>

        {/* 4 Track Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRIORITY_TRACKS.map((track) => (
            <article
              key={track.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white overflow-hidden shadow-xs hover:border-[#1557D6]/40 hover:shadow-lg transition-all group tone-light card-light"
            >
              <div>
                {/* Image Thumbnail with Duration Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/ai-pv.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] border border-white/80 shadow-xs tone-light card-light">
                    <span>{track.duration}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
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
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F1F5F9]">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
