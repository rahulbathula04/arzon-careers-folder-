import { ArrowRight, ShieldCheck, Video, Users, CheckCircle2, Sparkles } from "lucide-react";

interface ArzonEventHeroProps {
  onReserveClick: () => void;
  isVariantB?: boolean;
}

export function ArzonEventHero({ onReserveClick }: ArzonEventHeroProps) {
  return (
    <div className="relative text-left space-y-6">
      
      {/* Coordinate & Live Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-stone-500 tracking-widest uppercase border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <span className="font-bold text-[var(--color-medical-navy)]">
            ARZON CAREER INTELLIGENCE 2026
          </span>
        </div>
        <span className="text-stone-400">INDIAN HEALTHCARE JOB MARKET</span>
      </div>

      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold uppercase tracking-wider">
        <span>B.PHARM STUDENTS & GRADUATES</span>
      </div>

      {/* Main Hero Headline matching reference mockup */}
      <div className="space-y-3">
        <h1 className="font-serif tracking-tight text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-medical-navy)] leading-[1.12]">
          B.PHARM STUDENTS:
          <br />
          BEFORE YOU CHOOSE YOUR CAREER,{" "}
          <span className="text-[var(--color-arzon-blue)]">
            UNDERSTAND THE JOB MARKET.
          </span>
        </h1>

        <p className="font-serif text-lg font-bold text-stone-800">
          What Can You Actually Do After B.Pharm?
        </p>

        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
          Discover the healthcare roles you can target, the companies that hire for them, the skills employers look for, the technologies used, the certifications that matter, the salary ranges, and how each career can grow.
        </p>
      </div>

      {/* Feature Badges matching Mockup `media_1789216663202.jpg` */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 font-mono text-[11px] font-bold">
          <Video className="w-3.5 h-3.5 text-teal-600" />
          <span>Live Career Intelligence Session</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-stone-300 text-stone-800 font-mono text-[11px] font-bold">
          <Users className="w-3.5 h-3.5 text-stone-600" />
          <span>For B.Pharm | M.Pharm | Pharm.D | Life Sciences</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>FREE SESSION</span>
        </div>
      </div>

      {/* Primary CTA & Microcopy */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          id="hero-get-free-career-map-btn"
          onClick={onReserveClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-sm font-bold uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          style={{ color: '#FFFFFF' }}
        >
          <span>GET MY FREE CAREER MAP</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="font-mono text-[11px] text-stone-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Free career intelligence session. No course purchase required to attend.</span>
        </p>
      </div>

      {/* Credibility Microline */}
      <div className="pt-2 font-mono text-[10px] text-stone-400 uppercase tracking-wider">
        Built from current Indian healthcare hiring intelligence.
      </div>

    </div>
  );
}
