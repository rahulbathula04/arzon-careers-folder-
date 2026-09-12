import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import { Calendar, Clock, Video, ShieldCheck, ArrowRight, CheckCircle2, Users, Sparkles, HelpCircle } from "lucide-react";
import { WorkshopCountdown } from "@/components/workshop/WorkshopCountdown";

const WORKSHOP_ISO = "2026-09-11T18:00:00+05:30";

interface ArzonEventHeroProps {
  onReserveClick: () => void;
  isVariantB?: boolean;
}

export function ArzonEventHero({ onReserveClick }: ArzonEventHeroProps) {
  return (
    <div className="relative text-left space-y-7">
      {/* Coordinate Strip */}
      <div className="flex items-center justify-between font-mono text-[9px] text-stone-500 tracking-widest uppercase border-b border-stone-200 pb-2.5">
        <span>ARZON CAREER INTELLIGENCE · 2026</span>
        <span className="hidden sm:inline">LIVE HEALTHCARE JOB MARKET DECODING</span>
      </div>

      {/* Header Pill & Live Status */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B3F8B] opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1B3F8B]" />
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
            B.PHARM CAREER INTELLIGENCE 2026
          </span>
        </div>
        <span className="hidden sm:flex items-center gap-2">
          <span className="w-8 h-px bg-amber-500" />
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-amber-700">
            Live Session · Free Career Map
          </span>
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-3">
        <h1 className="font-serif tracking-tight text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325] leading-[1.12]">
          You have the degree. <br />
          <span className="italic font-serif text-[#1B3F8B]">But do you know where it can take you?</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl font-normal">
          Before you choose a course, follow someone else's advice, or graduate without a plan, understand the healthcare job market.
        </p>

        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl bg-stone-100 p-3.5 rounded-xl border border-stone-200">
          Join a live career intelligence session built for B.Pharm, M.Pharm, Pharm.D and Life Sciences students and graduates. Discover roles, companies, skills, technologies, certifications, salary ranges and career paths available across the healthcare industry.
        </p>
      </div>

      {/* Core Problem Callout Box */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-[#1B3F8B]" />
          <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
            THE REALITY CHECK
          </span>
        </div>
        <h2 className="font-serif text-lg font-bold text-[#0B1325]">
          You Don't Have A B.Pharm Problem. You Have A Career-Decision Problem.
        </h2>
        <p className="text-xs text-stone-700 leading-relaxed">
          College gives you a degree. The job market expects a career-ready skill set. Arzon helps you understand and bridge that gap before you spend money on courses.
        </p>
      </div>

      {/* Eligibility Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {["B.Pharm", "M.Pharm", "Pharm.D", "Life Sciences", "No Prior Exp Required"].map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 font-mono text-[9.5px] font-semibold text-stone-700 uppercase tracking-wider"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            {tag}
          </span>
        ))}
      </div>

      {/* Mentor & Provenance Row */}
      <div className="rounded-2xl bg-white border border-stone-300 shadow-sm p-4 flex items-center justify-between gap-4 tone-light">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-200 shrink-0">
            <img
              src={mentorKumailImg}
              alt="Mohamed Kumail Abbas"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold text-stone-900">Led by Mohamed Kumail Abbas</h3>
            <p className="font-sans text-xs text-stone-600">Manager, Pharmacovigilance & Drug Safety · Ex-Cognizant, Accenture</p>
          </div>
        </div>
        <button
          onClick={onReserveClick}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B3F8B] text-white font-mono text-xs font-bold hover:bg-[#153270] transition-colors"
        >
          <span>Get Free Career Map</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Event Meta Details */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-600 font-sans border-t border-stone-200 pt-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#1B3F8B]" />
          <span className="font-semibold text-stone-900">Fri 11 Sep 2026</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#1B3F8B]" />
          <span><strong className="text-stone-900">6:00 PM IST</strong> · Live 75-Min Session</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold text-emerald-800">Google Meet</span>
        </div>
      </div>
    </div>
  );
}
