import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "./constants";

export function FinalHeroOfferCTA() {
  const WHATSAPP_URL = waLink(
    "Hi Arzon Global, I want to know more about the 12-Week Healthcare Career Track",
  );

  return (
    <section className="py-16 sm:py-20 bg-[#1B3F8B] text-slate-50 border-b border-[#153270]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-900/40 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest"
          style={{ color: "#FFFFFF" }}
        >
          YOUR NEXT STEP
        </div>

        {/* Main Headline */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <h2
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
            style={{ color: "#FFFFFF" }}
          >
            Stop collecting certificates.
          </h2>
          <h2
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] italic font-normal"
            style={{ color: "#F6D860" }}
          >
            Start building career evidence.
          </h2>
        </div>

        {/* Supporting Copy */}
        <p
          className="text-sm sm:text-lg font-sans font-medium leading-relaxed max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Build the skills. Create verifiable proof. Measure your readiness with ACRI. Prepare for
          the next opportunity — systematically, not by chance.
        </p>

        {/* Value Stack */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold px-2"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          {[
            "12-Week Structure",
            "Real Healthcare Files",
            "ACRI Readiness Score",
            "ISO-Certified Dossier",
            "Partner Desk Introduction",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }}>
                  ·
                </span>
              )}
              <span className="bg-sky-900/60 border border-sky-400/20 px-2.5 py-1 rounded-md sm:bg-transparent sm:border-0 sm:p-0">
                {item}
              </span>
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#apply"
            className="h-13 sm:h-14 px-6 sm:px-8 inline-flex items-center justify-center gap-3 text-sm sm:text-base font-extrabold rounded-2xl shadow-xl transition-all cursor-pointer w-full sm:w-auto bg-white hover:bg-slate-100"
            style={{ backgroundColor: "#FFFFFF", color: "#1B3F8B" }}
          >
            <span style={{ color: "#1B3F8B" }} className="!text-[#1B3F8B] font-extrabold">
              Check Your Career Readiness
            </span>
            <ArrowRight
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 !text-[#1B3F8B]"
              style={{ color: "#1B3F8B" }}
            />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-13 sm:h-14 px-6 sm:px-8 inline-flex items-center justify-center gap-3 text-sm sm:text-base font-extrabold rounded-2xl border-2 border-sky-200/40 hover:border-sky-200/80 hover:bg-sky-900/30 transition-all cursor-pointer w-full sm:w-auto"
            style={{ color: "#FFFFFF" }}
          >
            <MessageCircle
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0"
              style={{ color: "#FFFFFF" }}
            />
            <span>Talk to Arzon on WhatsApp</span>
          </a>
        </div>

        {/* Micro-trust */}
        <p className="text-xs font-mono font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
          No job guarantee · No hidden costs · No pressure · Only honest career readiness
          development
        </p>
      </div>
    </section>
  );
}
