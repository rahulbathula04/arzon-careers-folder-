import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, BadgeCheck, Landmark, Building2 } from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { trackEvent } from "@/lib/analytics";

/**
 * Section One — The Certificate Hero
 * Design: Institutional paper background (#F7F5F0), serif headline,
 * real photograph of HSBC certificate, deep blue (#1B3F8B) CTA.
 */
export function Hero() {
  const [lang, setLang] = useState<"en" | "hi" | "te">("en");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#F7F5F0] text-[#1A1A1A] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-b border-stone-200/80"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Institutional Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Utility Row: Language Selector & Eyebrow Label */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white/80 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-stone-700 shadow-xs">
                <span>LANG:</span>
                {(["en", "hi", "te"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold transition-colors ${
                      lang === l
                        ? "bg-[#1B3F8B] text-white"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Small Label Above Headline */}
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B] leading-relaxed">
              CERTIFIED RECRUITMENT PARTNER · HSBC HOLDINGS &amp; JPMORGAN CHASE &amp; CO. · AUGUST 2026
            </p>

            {/* Main Headline (Pain-first) */}
            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]"
            >
              Stop sending resumes<br />
              into a black hole.<br />
              <span className="italic font-normal text-[#1B3F8B]">Your profile deserves a recruiter.</span>
            </h1>

            {/* Subheadline Paragraph */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              Most fresh graduates never get interviewed because their resumes get buried in automated tracking systems.
              Arzon Global is a certified recruitment partner for HSBC Holdings (VMO ID: HSBC2621TAVM026) and JPMorgan Chase.
              Our preparation system bypasses cold applying and presents your verified scorecard directly to hiring managers.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#apply"
                onClick={() => trackEvent("hero_primary_cta_click", { target: "apply" })}
                style={{ color: "#ffffff" }}
                className="h-12 px-7 inline-flex items-center justify-center gap-3 text-base font-bold !text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span style={{ color: "#ffffff" }} className="!text-white">Check My Eligibility</span>
                <ArrowRight className="h-5 w-4 !text-white" style={{ color: "#ffffff" }} />
              </a>
              <a
                href="#hiring-system"
                onClick={() => trackEvent("hero_secondary_cta_click", { target: "hiring-system" })}
                className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 rounded-xl border border-stone-300 transition-all"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Scarcity & Trust Strip Below CTA */}
            <div className="pt-3 border-t border-stone-300/60">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600 leading-relaxed">
                12,000+ LEARNERS · 60 SEATS ONLY · SAME-DAY ELIGIBILITY CALL · APPLICATIONS CLOSE WHEN SEATS FILL
              </p>
            </div>
          </div>

          {/* Right Column: Physical HSBC Certificate Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300/90 shadow-xl bg-white p-2">
              <img
                src={taskImg}
                alt="Signed HSBC Recruitment Partnership Certificate displayed in front of Arzon Global office logo"
                loading="eager"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl border border-stone-200"
              />
              <div className="p-3 text-center bg-[#F7F5F0] rounded-b-xl border-t border-stone-200 mt-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700">
                  DOCUMENTED INSTITUTIONAL PROOF · VMO ID: HSBC2621TAVM026
                </p>
                <p className="text-xs font-serif italic text-[#1B3F8B] mt-0.5">
                  Physical contract framed at Arzon Global Headquarters, Hyderabad
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
