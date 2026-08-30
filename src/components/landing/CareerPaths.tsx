import { useState } from "react";
import { ROLE_TRACKS } from "@/data/roleTracks";
import { ArrowRight, CheckCircle2, Briefcase, Target, BarChart3 } from "lucide-react";

export function CareerPaths() {
  const [activeId, setActiveId] = useState<string>(ROLE_TRACKS[0].id);
  const active = ROLE_TRACKS.find((t) => t.id === activeId) || ROLE_TRACKS[0];

  const TRACK_COLORS: Record<string, { text: string; bg: string; border: string }> = {
    "medical-coder":    { text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-300" },
    "pv-associate":     { text: "text-[#1B3F8B]",  bg: "bg-sky-50",    border: "border-sky-300" },
    "cdm-associate":    { text: "text-teal-700",    bg: "bg-teal-50",   border: "border-teal-300" },
    "cra-associate":    { text: "text-purple-700",  bg: "bg-purple-50", border: "border-purple-300" },
    "ra-associate":     { text: "text-orange-700",  bg: "bg-orange-50", border: "border-orange-300" },
    "medical-writer":   { text: "text-rose-700",    bg: "bg-rose-50",   border: "border-rose-300" },
    "clinical-trials":  { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-300" },
    "biostatistics":    { text: "text-[#8A6D1F]",   bg: "bg-amber-50",  border: "border-amber-300" },
  };

  const trackColor = TRACK_COLORS[active.id] ?? { text: "text-[#1B3F8B]", bg: "bg-sky-50", border: "border-sky-300" };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-stone-600 shadow-xs">
            HEALTHCARE CAREER PATHS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Where could your degree take you?
            <br />
            <span className="italic font-normal text-[#8A6D1F]">
              Pick a role to explore the path.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Every career path below is built from real Indian job descriptions. Select a role to see what skills it requires, what the work actually involves, and what Arzon modules build that readiness.
          </p>
        </div>

        {/* Role Selector Chips - Swipeable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
          {ROLE_TRACKS.map((track) => {
            const color = TRACK_COLORS[track.id] ?? { text: "text-[#1B3F8B]", bg: "bg-sky-50", border: "border-sky-300" };
            const isActive = track.id === activeId;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveId(track.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer border shrink-0 whitespace-nowrap min-h-[40px] flex items-center ${
                  isActive
                    ? `${color.bg} ${color.border} ${color.text} shadow-xs ring-2 ring-offset-1 ${color.border}`
                    : "bg-white tone-light card-light text-stone-700 border-stone-200 hover:bg-stone-50 shadow-2xs"
                }`}
              >
                {track.shortTitle}
                {track.status === "coming_soon" && (
                  <span className="ml-1.5 text-[9px] font-mono font-bold text-stone-400">·Coming</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Role Deep-Dive */}
        <div className="bg-white tone-light card-light rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Role Overview */}
          <div className="lg:col-span-6 space-y-6 border-r-0 lg:border-r border-stone-100 lg:pr-8">
            {/* Title & Badge */}
            <div className="space-y-3 border-b border-stone-100 pb-5">
              <span className={`inline-block text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${trackColor.bg} ${trackColor.border} ${trackColor.text}`}>
                {active.heroBadge}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">{active.title}</h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans font-medium">{active.tagline}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-stone-500 uppercase block font-bold">Salary Range</span>
                <span className={`font-serif font-bold text-base mt-0.5 block ${trackColor.text}`}>{active.salaryRange}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono text-stone-500 uppercase block font-bold">Active Openings</span>
                <span className={`font-mono font-bold text-sm mt-0.5 block ${trackColor.text}`}>{active.entryLevelListings}</span>
              </div>
            </div>

            {/* Employers */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-500 font-bold">
                <Briefcase className="h-3.5 w-3.5" />
                Sample Employers Hiring
              </div>
              <div className="flex flex-wrap gap-2">
                {active.sampleEmployers.map((e) => (
                  <span key={e} className="text-xs font-mono font-semibold bg-stone-100 border border-stone-200 text-stone-800 px-2.5 py-1 rounded-lg">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Degrees */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-500 font-bold">
                <Target className="h-3.5 w-3.5" />
                Matching Degrees
              </div>
              <div className="flex flex-wrap gap-2">
                {active.targetDegrees.map((d) => (
                  <span key={d} className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${trackColor.bg} ${trackColor.border} ${trackColor.text}`}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Skill Frequency + Modules */}
          <div className="lg:col-span-6 space-y-6">
            {/* Skill Frequency Bars */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-700 font-bold">
                <BarChart3 className="h-3.5 w-3.5 text-[#1B3F8B]" />
                Skills Frequency from {active.jdCountAnalyzed} Analyzed JDs
              </div>
              <div className="space-y-2.5">
                {active.skillsFrequency.map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-sans font-bold text-stone-800">{item.skill}</span>
                      <span className={`font-mono font-bold ${trackColor.text}`}>{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: "#1B3F8B" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Modules */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-500 block">ARZON MODULES THAT BUILD THIS READINESS</span>
              <ul className="space-y-2">
                {active.keyModules.map((mod, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700 font-sans font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`/courses/${active.slug}`}
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
              className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer"
            >
              <span>View Full {active.shortTitle} Syllabus</span>
              <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#FFFFFF" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
