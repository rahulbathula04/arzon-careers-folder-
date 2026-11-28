import { Award, ArrowUpRight, GraduationCap, Users, Layers } from "lucide-react";
import { LINKS } from "@/components/landing/constants";

interface GlobalImpactAwardCardProps {
  className?: string;
  announcementUrl?: string;
}

export function GlobalImpactAwardCard({
  className = "",
  announcementUrl = "https://lnkd.in/p/dxSyrMUb",
}: GlobalImpactAwardCardProps) {
  return (
    <article
      aria-label="2026 Global Impact Award conferred to Arzon Global Labs"
      className={`group relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-gradient-to-br from-[#042823] via-[#021C18] to-[#011210] border border-amber-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_0_60px_rgba(0,143,131,0.12),0_24px_60px_-12px_rgba(0,25,22,0.6)] p-6 sm:p-8 lg:p-10 text-white transition-all duration-300 hover:border-amber-400/35 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_0_70px_rgba(0,143,131,0.18),0_30px_70px_-12px_rgba(0,25,22,0.7)] ${className}`}
    >
      {/* Museum Ambient Lighting & Geometric Rings */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-amber-400/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 rounded-full border border-white/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-64 w-64 rounded-full border border-amber-400/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-12 bottom-0 w-80 sm:w-96 h-80 sm:h-96 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16)_0%,rgba(0,143,131,0.12)_45%,transparent_75%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-[radial-gradient(circle,rgba(120,189,187,0.12)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* ── LEFT: Typography, Metadata & Verifications (Cols 1-7) ── */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Top Eyebrow Bar */}
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-white/5 px-3 py-1 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md">
                <Award className="h-3.5 w-3.5 text-[#F59E0B] shrink-0 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                <span>RECOGNITION · 04–05 NOV 2026</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/60">
                <span className="h-1 w-1 rounded-full bg-amber-400/80" />
                <span>SARSD · NEW DELHI</span>
              </div>
            </div>

            {/* Headline Block */}
            <div className="mb-4 sm:mb-5">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.04em] leading-none bg-gradient-to-br from-white via-[#FCE7B8] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-sm">
                  2026
                </span>
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  ANNUAL CITATION
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-white leading-tight">
                Global Impact Award
              </h3>
            </div>

            {/* Amber Highlight Callout */}
            <div className="border-l-2 border-amber-400/70 pl-3.5 my-4 sm:my-5 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
                Conferred to <strong className="text-white font-bold">Arzon Global Labs</strong> by the Society of Applied Research and Social Development (SARSD) at the 8th ICAATAS International Conference, Malla Reddy University.
              </p>
            </div>

            {/* Structured Proof Metadata Panel (Glass Citation Plaque) */}
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 sm:p-5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.25)] max-w-xl space-y-3.5 my-5">
              {/* Top Split Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-white/10">
                {/* Host Venue */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-400/30 flex items-center justify-center shrink-0 mt-0.5 text-[#78BDBB]">
                    <GraduationCap className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-amber-200/80 font-medium block">
                      HOST VENUE
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                      Malla Reddy University
                    </strong>
                  </div>
                </div>

                {/* Conferring Body */}
                <div className="flex items-start gap-2.5 sm:border-l sm:border-white/10 sm:pl-4">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-amber-200/80 font-medium block">
                      CONFERRING BODY
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                      SARSD (Regd. Govt. of India)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Bottom Scope Row */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-amber-200/80 font-medium block">
                    SCOPE OF AWARD
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/95 block mt-0.5">
                    Workforce Development &amp; Practical Healthcare Skilling Model
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Verification Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 mt-1 sm:mt-2 border-t border-white/10">
            <a
              href={announcementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-200 hover:text-white transition-all group/link"
            >
              <span className="underline underline-offset-4 decoration-amber-400/40 group-hover/link:decoration-amber-300">
                View public announcement
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-amber-300" />
            </a>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>LinkedIn Verified</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Physical 3D Trophy Showcase (Cols 8-12) ── */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-2 sm:p-4">
          {/* Amber Gold & White Halo Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22)_0%,rgba(255,255,255,0.08)_40%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none flex flex-col items-center justify-center">
            <img
              src="/images/credentials/global-impact-trophy-transparent.png"
              alt="Global Impact Award 2026 Trophy - Conferred to Arzon Global Labs by SARSD at 8th ICAATAS"
              loading="lazy"
              decoding="async"
              className="relative z-10 max-h-[240px] sm:max-h-[300px] lg:max-h-[340px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.04] group-hover:-translate-y-1 transition-all duration-500 ease-out"
            />
            {/* Golden pedestal reflection blur */}
            <div
              aria-hidden="true"
              className="pointer-events-none -mt-4 h-4 w-44 sm:w-56 rounded-[100%] bg-amber-400/25 blur-md"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
