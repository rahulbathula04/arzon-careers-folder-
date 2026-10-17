import { Calendar, Clock, Video, ArrowRight, Users } from "lucide-react";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";

interface MasterclassHeroProps {
  onReserveClick: () => void;
}

const TOPICS = [
  "ICSR Case Processing",
  "Adverse Event Triage",
  "Standardized Medical Coding",
  "Safety Database Architecture",
  "Medical Narrative Writing",
  "Expedited Regulatory Reporting",
];

export function MasterclassHero({ onReserveClick }: MasterclassHeroProps) {
  return (
    <section className="relative w-full pt-14 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-[#E4EAF2] bg-white tone-light card-light">
      {/* Background ambient radial glow matching homepage */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.08),rgba(255,255,255,0))] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Apple-grade live status eyebrow matching homepage */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-6 sm:mb-8 tone-light card-light">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <span>Free Live Masterclass · Pharmacovigilance Career Intelligence</span>
        </div>

        {/* Headline with Apple-grade typographic scale & homepage gradient */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#081F38] tracking-[-0.03em] leading-[1.12] mb-6 sm:mb-8 font-serif">
          Your pharmacy degree is a start.{" "}
          <span className="block mt-1 sm:mt-2">
            Do you know what a{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              drug safety job actually involves?
            </span>
          </span>
        </h1>

        {/* Subtitle with optical line length */}
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-sans">
          See how pharmacovigilance works, understand how an Individual Case Safety Report moves through CRO teams, and explore what employers expect from entry-level candidates.
        </p>

        {/* Apple Unified Session Capsule Bar with Homepage Accent Colors */}
        <div className="inline-flex flex-wrap items-center justify-center rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-xl border border-[#E2E8F0] shadow-xs p-1.5 sm:p-2 mb-8 sm:mb-10 tone-light card-light text-xs sm:text-sm font-medium text-slate-700 gap-1 sm:gap-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full hover:bg-[#EEF6FF]/60 transition-colors">
            <Calendar className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span className="font-semibold text-[#081F38]">Tuesday, October 20th</span>
          </div>
          <span className="hidden sm:inline-block text-slate-300 font-light px-1">|</span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full hover:bg-[#EEF6FF]/60 transition-colors">
            <Clock className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span className="font-semibold text-[#081F38]">6:00 PM IST</span>
          </div>
          <span className="hidden sm:inline-block text-slate-300 font-light px-1">|</span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full hover:bg-[#EEF6FF]/60 transition-colors">
            <Video className="w-4 h-4 text-[#10B981] shrink-0" />
            <span className="font-semibold text-[#081F38]">Google Meet</span>
          </div>
        </div>

        {/* Prestige Faculty Badge with Photo */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-2xs tone-light card-light">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs bg-slate-100 ring-2 ring-[#2563EB]/25">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-white" />
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-semibold text-[#081F38]">
                Mohamed Kumail Abbas, M.Pharm
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                15+ Yrs PV Leadership · Ex-IQVIA, Accenture, Cognizant
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA Button & Live Capacity Gauge */}
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-md hover:shadow-xl shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
          >
            <span>RESERVE MY FREE SEAT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Micro Capacity Gauge */}
          <div className="w-full max-w-xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-[#2563EB] font-bold">
                <Users className="w-3 h-3 text-[#2563EB]" />
                348 / 500 Seats Reserved
              </span>
              <span className="font-semibold text-slate-700">70% Full</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
              <div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]" style={{ width: "70%" }} />
            </div>
            <p className="text-[10.5px] text-slate-400 italic text-center">
              * For pharmacy students and graduates seriously exploring pharmacovigilance.
            </p>
          </div>
        </div>

        {/* Masterclass Core Topics Bar with Homepage Tag Styling */}
        <div className="mt-10 pt-6 border-t border-[#E4EAF2] max-w-2xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            What You'll Explore In This Session
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TOPICS.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 rounded-full bg-[#F8FAFC] hover:bg-[#EEF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB] border border-[#E2E8F0] text-[#081F38] text-xs font-semibold tone-light card-light shadow-2xs transition-colors cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
