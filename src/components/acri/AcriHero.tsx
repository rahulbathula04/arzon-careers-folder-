import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, CheckCircle2, Clock, Sparkles, ShieldCheck, Award } from "lucide-react";

interface AcriHeroProps {
  onOpenVideo?: () => void;
  onApplyClick?: () => void;
}

const EMPLOYER_LOGOS = [
  { name: "Novartis", subtitle: "Global Pharma" },
  { name: "IQVIA", subtitle: "Clinical Research" },
  { name: "Parexel", subtitle: "CRO Leader" },
  { name: "Pfizer", subtitle: "Biopharma" },
  { name: "Dr. Reddy's", subtitle: "Generics & Biosimilars" },
  { name: "Sun Pharma", subtitle: "Speciality Pharma" },
  { name: "Cipla", subtitle: "Respiratory & Therapeutics" },
  { name: "GSK", subtitle: "Healthcare Pioneer" },
  { name: "Syneos Health", subtitle: "Biopharmaceutical Solutions" },
];

export function AcriHero({ onOpenVideo, onApplyClick }: AcriHeroProps) {
  const handleApply = (e: React.MouseEvent) => {
    if (onApplyClick) {
      e.preventDefault();
      onApplyClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-14 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge matching comp */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#005B4F]/20 bg-[#E8F7F1] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#005B4F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#005B4F] motion-safe:animate-pulse" />
              <span>LAUNCH COHORT 01 · 100 CANDIDATE ALLOCATIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0B1325] leading-[1.12]">
              Turn Your Degree Into a{" "}
              <span className="text-[#005B4F]">Healthcare Career.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Assess your industry readiness. Build job-ready skills. Prove demonstrated capability to top clinical employers.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                to="/acri/pharmacovigilance-certification"
                search={{ apply: "true" }}
                onClick={handleApply}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] px-7 py-4 text-sm sm:text-base font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer group"
              >
                <span>APPLY FOR AN ACRI INVITE →</span>
                <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/roles"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-stone-300 bg-white tone-light card-light px-5 py-4 text-sm font-bold text-stone-800 hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer shadow-2xs"
              >
                <span>EXPLORE PHARMACOVIGILANCE</span>
              </Link>

              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer px-3 py-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F7F1] text-[#005B4F]">
                  <Play className="h-2.5 w-2.5 fill-[#005B4F] ml-0.5" />
                </div>
                <span>Watch Walkthrough</span>
              </button>
            </div>

            {/* 4 Micro-badges below CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-2xl text-xs font-medium text-stone-600">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-stone-100/70 border border-stone-200/60">
                <Clock className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />
                <span className="truncate">25 min certification</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-stone-100/70 border border-stone-200/60">
                <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />
                <span className="truncate">9 competencies</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-stone-100/70 border border-stone-200/60">
                <Sparkles className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />
                <span className="truncate">100 Launch Invites</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-stone-100/70 border border-stone-200/60">
                <Award className="h-3.5 w-3.5 text-[#005B4F] shrink-0" />
                <span className="truncate">Verifiable credential</span>
              </div>
            </div>

            {/* Metrics Row (10,000+ Assessed, 100 Cohort Invites, 9 Competencies, 25 min) */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">10,000+</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Students on Arzon</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#005B4F]">100</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Launch Invites (C01)</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">9</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Competencies</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0B1325]">25 min</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Certification</div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 font-medium italic">
              Cohort 01 is limited to 100 candidates. No payment required for Launch Cohort 01.
            </p>
          </div>

          {/* Right Column: Visual Composition with Hero Student & Floating ACRI Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Hand-drawn Annotation Accent (Comp Reference: "Same You. Bigger Opportunities ↗") */}
            <div className="absolute -top-4 -left-6 sm:-left-12 z-30 hidden sm:flex items-center gap-1.5 transform -rotate-6">
              <span className="font-serif italic font-semibold text-sm text-[#005B4F] bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/30 shadow-xs">
                Same You. Bigger Opportunities ↗
              </span>
            </div>

            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              {/* Authentic Indian Student Photo */}
              <div className="relative z-10 overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-xl">
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Indian healthcare graduate holding laptop and books on campus"
                  width={540}
                  height={640}
                  className="h-auto w-full object-cover aspect-4/5"
                  loading="eager"
                />
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1325]/70 to-transparent pointer-events-none flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-bold">Ananya Sharma · B.Pharm</p>
                    <p className="text-[10px] text-emerald-300 font-mono">ACRI Certified (82/100) · Industry Ready</p>
                  </div>
                </div>
              </div>

              {/* Floating ACRI Scorecard */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 z-20 w-52 sm:w-56">
                <div className="card-light rounded-2xl border border-stone-200 bg-white tone-light p-4 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">
                      ACRI SCORECARD
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  </div>

                  {/* Circular Score Gauge */}
                  <div className="my-2.5 flex flex-col items-center">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#E7E5E4"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#005B4F"
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeDashoffset="45.2"
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="font-sans text-xl font-black text-[#0B1325]">82</span>
                        <span className="text-[9px] font-semibold text-stone-500">/ 100</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                      <span>INDUSTRY READY</span>
                    </div>
                  </div>

                  {/* Mini competency meters */}
                  <div className="space-y-1.5 pt-1.5 border-t border-stone-100 text-[10px]">
                    <div className="flex justify-between text-stone-600">
                      <span>PV Knowledge</span>
                      <span className="font-bold text-stone-900">86%</span>
                    </div>
                    <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005B4F] rounded-full" style={{ width: "86%" }} />
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>ICSR Processing</span>
                      <span className="font-bold text-stone-900">76%</span>
                    </div>
                    <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005B4F] rounded-full" style={{ width: "76%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employer Logos Marquee Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200">
          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6">
            CAREER ECOSYSTEM · GLOBAL PHARMA, BIOTECH &amp; CLINICAL RESEARCH DESTINATIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {EMPLOYER_LOGOS.map((emp) => (
              <div
                key={emp.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white tone-light card-light border border-stone-200/60 shadow-2xs hover:border-[#005B4F]/40 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-[#005B4F]" />
                <span className="font-serif font-bold text-xs sm:text-sm text-stone-800 tracking-tight">
                  {emp.name}
                </span>
                <span className="text-[10px] text-stone-500 hidden sm:inline">· {emp.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
