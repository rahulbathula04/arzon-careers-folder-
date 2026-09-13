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
    { icon: "🔍", name: "Pharmacovigilance", domain: "Safety & ICSR" },
    { icon: "💻", name: "Clinical Research", domain: "Trials & GCP" },
    { icon: "📊", name: "Clinical Data Mgmt", domain: "EDC & CDISC" },
    { icon: "📄", name: "Medical Coding", domain: "ICD-10 & CPT" },
    { icon: "⚙️", name: "Regulatory Affairs", domain: "eCTD Dossiers" },
    { icon: "🧪", name: "QA / QC", domain: "GMP Audits" },
    { icon: "📝", name: "Medical Writing", domain: "CSR & Protocols" },
    { icon: "👥", name: "Pharma Sales", domain: "HCP & Detailing" },
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

          {/* Right Column (5 Columns) — Executive Career Intelligence Showcase Dossier */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            
            {/* Dossier Card Container */}
            <div className="relative w-full max-w-md bg-white tone-light card-light rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-xl overflow-hidden">
              
              {/* Top Dossier Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                    SAME DEGREE · 19+ PATHWAYS
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  Live Market Map
                </span>
              </div>

              {/* Hero Graduate Portrait with Unobstructed View */}
              <div className="relative flex flex-col items-center text-center mb-5">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl bg-emerald-50 mb-3 ring-4 ring-teal-100/70">
                  <img
                    src="/images/bpharm-female-graduate-hero.jpg"
                    alt="Indian Female Pharmacy Graduate"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={176}
                    height={176}
                  />
                </div>
                
                {/* Candidate Verified Archetype Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[11px] font-bold">
                  <span>🎓 B.Pharm Candidate</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-teal-700">Class of 2026</span>
                </div>
              </div>

              {/* 7 High-Demand Pathways Grid (Clean 2-Column Responsive Layout) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    Verified Fresher Career Tracks:
                  </p>
                  <span className="font-mono text-[10px] font-bold text-teal-600">
                    8 Core Domains
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {floatingPaths.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-stone-50/90 hover:bg-teal-50/90 border border-stone-200/80 hover:border-teal-300 transition-colors"
                    >
                      <span className="text-base shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <span className="font-sans text-xs font-semibold text-stone-800 block truncate">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-stone-500 block truncate">
                          {item.domain}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Intelligence Footnote */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-stone-500 font-medium">
                  2,180+ Job Postings Mapped
                </span>
                <span className="font-bold text-teal-700 flex items-center gap-1">
                  7 Hiring Hubs →
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
