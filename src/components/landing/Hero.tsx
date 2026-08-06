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
              CERTIFIED RECRUITMENT PARTNER · HSBC HOLDINGS · JPMORGAN CHASE &amp; CO. · JULY 2026
            </p>

            {/* Main Headline (Serif, 3 lines) */}
            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]"
            >
              Two global banks.<br />
              One certified partner.<br />
              <span className="italic font-normal text-[#1B3F8B]">60 seats. Yours or not.</span>
            </h1>

            {/* Subheadline Paragraph */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              HSBC hires fresh AI/ML engineers at ₹6–10 LPA. JPMorgan Chase hires at ₹14–18 LPA.
              Both have issued Arzon Global signed Recruitment Partnership Certificates. Our graduates
              do not apply cold. They enter the hiring pipeline through our certified partner desk. The
              August 2026 cohort starts 30 August. 60 seats. Applications close when they fill.
            </p>

            {/* Primary CTA Button (Deep Institutional Blue #1B3F8B) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/apply"
                onClick={() => trackEvent("hero_primary_cta_click", { target: "apply" })}
                className="h-12 px-8 w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-bold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Apply for the August Cohort</span>
                <ArrowRight className="h-5 w-4 text-white" />
              </Link>
            </div>

            {/* Trust Strip Below CTA */}
            <div className="pt-3 border-t border-stone-300/60">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600 leading-relaxed">
                60 SEATS ONLY · HSBC CERTIFIED · JPMORGAN CERTIFIED · TASK RECOGNISED · ISO 9001:2015 · MCA REGISTERED
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
