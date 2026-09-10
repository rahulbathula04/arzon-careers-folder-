import { ArrowRight, Video, Calendar, Clock, MessageCircle } from "lucide-react";
import { WorkshopCountdown } from "@/components/workshop/WorkshopCountdown";

const WORKSHOP_ISO = "2026-09-11T18:00:00+05:30";
const WA_LINK = "https://wa.me/919121283638?text=Hi%20Arzon%2C%20I%20want%20to%20reserve%20my%20seat%20for%20the%20workshop.";

interface ArzonFinalCTAProps {
  onReserveClick: () => void;
}

export function ArzonFinalCTA({ onReserveClick }: ArzonFinalCTAProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-[var(--color-medical-navy)] tone-dark border-t border-[#0A1F3E] text-[var(--color-warm-paper)] select-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Headline + Countdown + CTAs ── */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Live marker pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]" />
              </span>
              <span className="text-white" style={{ color: "#FFFFFF" }}>
                LIVE WORKING SESSION · 11 SEP 2026
              </span>
            </div>

            {/* Dominant headline */}
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.04]">
                <span className="text-white block" style={{ color: "#FFFFFF" }}>
                  DON'T PREPARE FOR A JOB
                </span>
                <span className="text-white block" style={{ color: "#FFFFFF" }}>
                  YOU DON'T UNDERSTAND.
                </span>
                <span style={{ color: "#D99A20" }} className="block">
                  See the work first.
                </span>
              </h2>
              <p style={{ color: "#CBD5E1" }} className="font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                Join 500+ students. Get real insights. Make better career decisions.
              </p>
            </div>

            {/* Countdown in dark mode */}
            <div className="space-y-3">
              <WorkshopCountdown targetIso={WORKSHOP_ISO} className="[&_.font-mono.text-stone-500]:text-slate-400" />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
              <button
                type="button"
                onClick={onReserveClick}
                className="inline-flex items-center gap-3 py-3.5 px-7 rounded-xl bg-[var(--color-warm-white)] hover:bg-white text-[var(--color-medical-navy)] font-mono text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer group tone-light w-full sm:w-auto justify-center"
              >
                <span style={{ color: "#102E5C" }}>Reserve My Free Seat</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-medical-navy)] group-hover:translate-x-1.5 transition-transform" style={{ color: "#102E5C" }} />
              </button>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3.5 px-7 rounded-xl bg-[#25D366] hover:bg-[#1fba5a] text-white font-mono text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            <p className="font-mono text-[11px] text-slate-400 text-center lg:text-left">
              Zero cost · Certificate included · Google Meet access via WhatsApp
            </p>
          </div>

          {/* ── Right: Featured Student Quote + Event Logistics ── */}
          <div className="space-y-5">
            {/* Hero testimonial card */}
            <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed" style={{ color: "#F1F5F9" }}>
                "Students learn careers. Arzon teaches them the work. That's what we needed."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/15">
                <div className="w-9 h-9 rounded-full bg-sky-400/30 flex items-center justify-center font-mono text-sm font-black text-sky-300">
                  DR
                </div>
                <div>
                  <p className="font-serif text-sm font-bold text-white" style={{ color: "#FFFFFF" }}>Dr. Ravi M.</p>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">M.Pharm · 2024 · Hyderabad</p>
                </div>
              </div>
            </div>

            {/* Event logistics summary */}
            <div className="p-5 rounded-2xl bg-white/8 border border-white/12 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                EVENT LOGISTICS
              </span>
              <div className="flex flex-col gap-2.5 text-sm font-mono">
                <div className="flex items-center gap-3 text-slate-200">
                  <Calendar className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
                  <span>Friday, 11 September 2026</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Clock className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
                  <span>6:00 PM – 7:15 PM IST · 75 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Video className="w-4 h-4 text-[var(--color-clinical-teal)] shrink-0" />
                  <span>Live on Google Meet · Link via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "100% Free", sub: "No hidden fees" },
                { label: "Certificate", sub: "PDF on completion" },
                { label: "75 Minutes", sub: "Structured session" },
              ].map(({ label, sub }) => (
                <div key={label} className="p-3 rounded-xl bg-white/8 border border-white/12 text-center space-y-0.5">
                  <p className="font-mono text-xs font-bold text-white" style={{ color: "#FFFFFF" }}>{label}</p>
                  <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
