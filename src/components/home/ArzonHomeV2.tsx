import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Folder,
  Shield,
  Wrench,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HomeStatsStrip } from "@/components/home/HomeStatsStrip";
import { HomeEmployerResearchStrip } from "@/components/home/HomeEmployerResearchStrip";
import { HomePriorityTracks } from "@/components/home/HomePriorityTracks";
import { HomeAssessmentComparison } from "@/components/home/HomeAssessmentComparison";
import { HomeJourneyRoadmap } from "@/components/home/HomeJourneyRoadmap";
import { HomeEmployerTrustStrip } from "@/components/home/HomeEmployerTrustStrip";
import { HomeInstitutionalTrust } from "@/components/home/HomeInstitutionalTrust";
import { CareerEngineLeaderboard } from "@/components/home/CareerEngineLeaderboard";
import { HomeLearnerFeedback } from "@/components/home/HomeLearnerFeedback";
import { HomeClosingBanner } from "@/components/home/HomeClosingBanner";

export function ArzonHomeV2() {
  return (
    <div className="arzon-premium-home bg-white tone-light card-light">
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Subtle ambient gradients */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#EEF6FF]/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#F0F6FE]/60 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

        <div className="ap-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
                <span>INDIA'S MOST TRUSTED PLATFORM FOR HEALTHCARE CAREERS</span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-[2.6rem] sm:text-6xl lg:text-[62px] font-serif font-normal tracking-tight text-[#071A4A] leading-[1.05]">
                Turn your degree into<br />
                <span className="text-[#1557D6]">a career in healthcare.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#3F4A60] leading-relaxed max-w-xl">
                We analyse real job descriptions, show you the exact skills employers ask for and help you build the skills, projects and proof to apply with confidence.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to="/career-assessment"
                  data-testid="primary-career-cta"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white px-7 py-3.5 text-sm font-bold transition-all shadow-sm"
                >
                  <span>Find My Career Path</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#priority-tracks"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3.5 text-sm font-bold transition-all tone-light card-light shadow-2xs"
                >
                  <span>Explore Programmes</span>
                </a>
              </div>

              {/* 3 Check Items */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#3F4A60] pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6]" />
                  <span>Real job description insights</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6]" />
                  <span>Role-specific skill gaps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1557D6]" />
                  <span>Practical work samples</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden border border-[#E4EAF2] bg-[#F7F9FE] shadow-[0_20px_60px_rgba(7,26,74,0.12)] min-h-[440px] sm:min-h-[500px]">
                {/* Doctor Photo - framed so face is completely in clear view */}
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Healthcare professional graduate"
                  className="w-full h-full object-cover object-[center_12%] absolute inset-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/ai-pv.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating Career Fit Report Card - positioned at bottom-left so face is 100% unobstructed */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 w-[250px] sm:w-[268px] rounded-2xl border border-white/90 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md tone-light card-light">
                  <div className="flex items-center justify-between text-xs font-bold text-[#071A4A] pb-2 border-b border-[#F1F5F9]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#1557D6]" />
                      Your Career Fit Report
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    {/* Score Ring */}
                    <div className="relative w-11 h-11 shrink-0">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E4EAF2" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9"
                          fill="none"
                          stroke="#27B9B3"
                          strokeWidth="3"
                          strokeDasharray="78 22"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-extrabold text-[10.5px] text-[#071A4A]">
                        78%
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#071A4A]">Good Fit</div>
                      <div className="text-[10px] text-slate-500">for Pharmacovigilance</div>
                      <span className="inline-flex items-center gap-1 mt-0.5 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[8.5px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-2 w-2" />
                        Recommended
                      </span>
                    </div>
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-0.5 pt-1.5 border-t border-[#F1F5F9] text-[10.5px] font-semibold text-slate-700">
                    {[
                      { icon: FileText, label: "Role overview" },
                      { icon: BarChart3, label: "Key skills to learn" },
                      { icon: Wrench, label: "Tool recommendations" },
                      { icon: BookOpen, label: "Learning path & projects" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between p-1 rounded hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Icon className="h-3 w-3 text-[#1557D6]" />
                            {item.label}
                          </span>
                          <ChevronRight className="h-2.5 w-2.5 text-slate-400" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STATS STRIP ────────────────────────────────────────── */}
      <HomeStatsStrip />

      {/* ─── SECTION 3: EMPLOYER RESEARCH MARQUEE ──────────────────────────── */}
      <HomeEmployerResearchStrip />

      {/* ─── SECTION 4: PRIORITY CAREER TRACKS (4-CARD GRID) ────────────────── */}
      <HomePriorityTracks />

      {/* ─── SECTION 5: TWO ASSESSMENT ENGINES ─────────────────────────────── */}
      <HomeAssessmentComparison />

      {/* ─── SECTION 6: FROM GUIDANCE TO PLACEMENT READINESS ────────────────── */}
      <HomeJourneyRoadmap />

      {/* ─── SECTION 7: EMPLOYER REQUIREMENTS (6 CARDS) ────────────────────── */}
      <HomeEmployerTrustStrip />

      {/* ─── SECTION 8: INSTITUTIONAL TRUST & GOVERNMENT ALIGNMENT (TASK VIDEO) */}
      <HomeInstitutionalTrust />

      {/* ─── SECTION 9: CANDIDATE LEADERBOARD ARENA ─────────────────────────── */}
      <CareerEngineLeaderboard />

      {/* ─── SECTION 10: LEARNER FEEDBACK (4 VERIFIED CARDS) ─────────────────── */}
      <HomeLearnerFeedback />

      {/* ─── SECTION 11: CLOSING CTA BANNER ─────────────────────────────────── */}
      <HomeClosingBanner />
    </div>
  );
}
