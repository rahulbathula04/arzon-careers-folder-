import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HomeStatsStrip } from "@/components/home/HomeStatsStrip";
import { HomePriorityTracks } from "@/components/home/HomePriorityTracks";
import { HomeAssessmentComparison } from "@/components/home/HomeAssessmentComparison";
import { HomeJourneyRoadmap } from "@/components/home/HomeJourneyRoadmap";
import { HomeClosingBanner } from "@/components/home/HomeClosingBanner";

export function ArzonHomeV2() {
  return (
    <div className="arzon-premium-home bg-white tone-light card-light">
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-6 sm:pt-16 pb-12 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Subtle ambient gradients */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#EEF6FF]/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#F0F6FE]/60 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

        <div className="ap-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Eyebrow Badge - Scaled cleanly for mobile screens */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6] shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse shrink-0" />
                <span>HEALTHCARE CAREER INTELLIGENCE</span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-[2.25rem] sm:text-6xl lg:text-[62px] font-serif font-normal tracking-tight text-[#071A4A] leading-[1.08] sm:leading-[1.05]">
                Turn your degree into<br />
                <span className="text-[#1557D6]">a career in healthcare.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-[#3F4A60] leading-relaxed max-w-xl">
                Explore healthcare roles, understand the skills they ask for, and compare preparation options before choosing a programme.
              </p>

              {/* CTAs - Mobile-native full-width touch ergonomics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  to="/career-assessment"
                  data-testid="primary-career-cta"
                  className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-7 py-3.5 text-sm font-bold transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Find My Career Path</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#priority-tracks"
                  className="w-full sm:w-auto h-12 sm:h-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3.5 text-sm font-bold transition-all tone-light card-light shadow-2xs active:scale-[0.98]"
                >
                  <span>Explore Programmes</span>
                </a>
              </div>

              {/* 3 Check Items */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 text-xs sm:text-sm font-semibold text-[#3F4A60] pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>Role requirements and skills</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>Career-fit guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6] shrink-0" />
                  <span>Programme learning activities</span>
                </div>
              </div>
            </div>

            {/* Real product context: role profile, not a fictional candidate score */}
            <div className="lg:col-span-5">
              <article className="rounded-2xl border border-[#DCE5F0] bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">ROLE PROFILE EXAMPLE</span>
                  <span className="rounded-full border border-[#DCE5F0] bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-medium text-slate-600">Pharmacovigilance</span>
                </div>
                <h2 className="mt-5 text-2xl font-serif font-bold leading-tight text-[#071A4A] sm:text-3xl">Drug Safety Associate</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Explore the work behind an entry-level drug-safety role before deciding how to prepare.
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "Check incoming safety reports for required information",
                    "Review and code reported events using the relevant terminology",
                    "Document case details and follow defined reporting workflows",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 border-b border-[#EEF2F7] pb-3 last:border-0 last:pb-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1557D6]" />
                      <p className="text-sm leading-5 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] leading-5 text-slate-500">
                  Example role summary. Actual responsibilities and requirements vary by employer and job posting.
                </p>
                <Link to="/roles" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1557D6] hover:underline">
                  Explore role profiles <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ────────────────────────────────────────── */}
      <HomeStatsStrip />

      {/* ─── SECTION 4: PRIORITY CAREER TRACKS (4-CARD GRID) ────────────────── */}
      <HomePriorityTracks />

      {/* ─── CAREER ASSESSMENT ──────────────────────────────────────────────── */}
      <HomeAssessmentComparison />

      {/* ─── SECTION 6: FROM GUIDANCE TO PLACEMENT READINESS ────────────────── */}
      <HomeJourneyRoadmap />

      {/* ─── CLOSING CTA ────────────────────────────────────────────────────── */}
      <HomeClosingBanner />
    </div>
  );
}
