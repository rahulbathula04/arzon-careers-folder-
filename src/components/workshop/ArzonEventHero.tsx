import { ArrowRight, Download, PlayCircle, GraduationCap, BarChart2, Building, Users, MapPin } from "lucide-react";

interface ArzonEventHeroProps {
  onReserveClick: () => void;
  isVariantB?: boolean;
}

export function ArzonEventHero({ onReserveClick }: ArzonEventHeroProps) {
  const stats = [
    { icon: BarChart2, value: "19+", label: "Career Paths" },
    { icon: Building, value: "2,180+", label: "Job Postings Analysed" },
    { icon: Users, value: "187", label: "Top Employers" },
    { icon: MapPin, value: "7", label: "Major Hiring Hubs" },
  ];

  const floatingPaths = [
    { icon: "🔍", name: "Pharmacovigilance" },
    { icon: "💻", name: "Clinical Research" },
    { icon: "📊", name: "Clinical Data Management" },
    { icon: "📄", name: "Medical Coding" },
    { icon: "⚙️", name: "Regulatory Affairs" },
    { icon: "🧪", name: "QA / QC" },
    { icon: "👥", name: "Pharma Sales" },
  ];

  return (
    <section id="hero" className="relative w-full py-10 sm:py-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/60 via-[var(--color-warm-paper)] to-[var(--color-warm-paper)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Session Event Metadata Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full tone-dark bg-[#0B1325] text-white font-sans text-xs font-semibold shadow-xs border border-stone-800">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider motion-safe:animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-100"></span>
                LIVE SESSION
              </span>
              <span className="text-teal-400 font-bold">FREE</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-300">75 MINS</span>
              <span className="text-stone-400">·</span>
              <span className="text-white font-medium">Sat, 19 Sep 2026 @ 6:00 PM IST</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-arzon-ink)] tracking-tight leading-[1.08]">
              What Can You Actually{" "}
              <span className="text-teal-600 block sm:inline">
                Do After B.Pharm?
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
              Find out which healthcare careers you can realistically target after B.Pharm, who hires for them, what employers expect, what skills you need, and where each path can take you.
            </p>

            {/* 4 Statistics Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              {stats.map((st, idx) => {
                const IconC = st.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-teal-50 text-teal-800 shrink-0 mt-0.5 border border-teal-100">
                      <IconC className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-sans font-extrabold text-base sm:text-lg text-slate-900 block leading-tight">
                        {st.value}
                      </span>
                      <span className="font-sans text-[11px] font-medium text-slate-600 block">
                        {st.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dual CTA Buttons */}
            <div className="pt-2 space-y-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  id="hero-primary-cta"
                  onClick={onReserveClick}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-sans text-sm font-bold shadow-lg shadow-teal-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>GET MY FREE CAREER MAP</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <a
                  href="#career-paths"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white tone-light border border-slate-300 hover:border-slate-400 text-slate-800 font-sans text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-teal-600" />
                  <span>Explore Career Map</span>
                </a>
              </div>

              <p className="font-sans text-xs text-slate-500">
                100% Free Live Session. No course purchase required.
              </p>

              {/* Indian B.Pharm Candidates Registered Strip */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover object-top"
                    src="/images/pharmacy-student-avatar.jpg"
                    alt="Indian B.Pharm Student"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover object-top"
                    src="/images/bpharm-male-graduate.jpg"
                    alt="Indian B.Pharm Candidate"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover object-top"
                    src="/images/bpharm-female-graduate-hero.jpg"
                    alt="Indian B.Pharm Graduate"
                  />
                </div>
                <p className="font-sans text-xs text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">500+ Indian B.Pharm Candidates</span> registered from 120+ pharmacy colleges
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5 Columns) — Visual Overlay Stack matching Reference 1 */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Soft Mint Glow Circle */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-teal-100/70 blur-2xl pointer-events-none" />

              {/* Main Female Graduate Photo */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 bg-emerald-50">
                <img
                  src="/images/bpharm-female-graduate-hero.jpg"
                  alt="Indian Female Pharmacy Graduate"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Handwritten Script Top Left: "Same Degree. So Many Possibilities." */}
              <div className="absolute -top-2 left-0 z-20 pointer-events-none">
                <p className="font-handwriting text-2xl sm:text-3xl text-teal-800 transform -rotate-6 font-bold tracking-wide">
                  Same Degree.
                  <br />
                  So Many Possibilities.
                </p>
                <svg className="w-28 h-6 text-teal-500 -mt-2 ml-4" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M 5 15 Q 50 5 95 12" strokeLinecap="round" />
                </svg>
              </div>

              {/* Floating Glassmorphism Card Top Right (7 Career Paths) */}
              <div className="absolute top-4 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/90 shadow-xl w-56 space-y-2 text-left">
                {floatingPaths.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 font-sans text-xs text-stone-700">
                    <span className="text-sm shrink-0">{item.icon}</span>
                    <span className="font-medium text-stone-800">{item.name}</span>
                  </div>
                ))}
                <div className="pt-1 font-mono text-[10px] text-stone-400 font-bold border-t border-stone-100">
                  — and more...
                </div>
              </div>

              {/* Handwritten Script Bottom Right Annotation */}
              <div className="absolute -bottom-6 right-0 z-20 text-right pointer-events-none">
                <p className="font-handwriting text-2xl sm:text-3xl text-teal-900 transform rotate-3 font-bold">
                  Turn Your
                  <br />
                  B.Pharm Into
                  <br />
                  A Real Future
                </p>
                <svg className="w-16 h-10 text-teal-600 ml-auto -mt-1" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M 40 25 Q 10 20 15 5" strokeLinecap="round" />
                  <path d="M 10 12 L 15 5 L 22 10" strokeLinecap="round" />
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
