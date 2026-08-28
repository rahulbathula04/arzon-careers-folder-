import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ROLE_TRACKS,
  type RoleTrack,
  type RoleTier,
} from "@/data/roleTracks";
import {
  Code2,
  Shield,
  FileCheck2,
  Database,
  FileText,
  FlaskConical,
  LineChart,
  PenLine,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Building2,
  Search,
  Target,
  BarChart3,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Shield,
  FileCheck2,
  Database,
  FileText,
  FlaskConical,
  LineChart,
  PenLine,
};

export function RoleTrackLibrary() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>("medical-coder");
  const [activeTierFilter, setActiveTierFilter] = useState<"all" | RoleTier>("all");

  const selectedTrack = ROLE_TRACKS.find((t) => t.id === selectedTrackId) || ROLE_TRACKS[0];

  const filteredTracks = ROLE_TRACKS.filter((track) => {
    if (activeTierFilter === "all") return true;
    return track.tier === activeTierFilter;
  });

  const getIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || Briefcase;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="role-tracks" className="py-16 sm:py-24 bg-[#050B17] text-slate-100 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/5 blur-3xl pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-sky-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>ARZON ROLE TRACK LIBRARY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-50 leading-tight">
            Pick the job you want. <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Train for what employers ask.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-normal">
            We don’t sell generic pharma courses. We run a continuous India hiring scan across active job descriptions, extract the exact skills top employers ask for, and build targeted 12-Week Role Tracks.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {(["all", "Tier 1 · Launch First", "Tier 2 · Next Wave"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveTierFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 border ${
                activeTierFilter === filter
                  ? "bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-sm"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {filter === "all" ? "All Role Tracks (8)" : filter}
            </button>
          ))}
        </div>

        {/* Main Grid: Track Selector + Deep-Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Track Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
              CHOOSE YOUR TARGET ROLE:
            </h3>

            <div className="space-y-2.5">
              {filteredTracks.map((track) => {
                const isSelected = track.id === selectedTrackId;
                const isComingSoon = track.status === "coming_soon";

                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between ${
                      isSelected
                        ? "bg-[#0B1528] border-sky-500/50 shadow-lg ring-1 ring-sky-500/30"
                        : "bg-[#070D1B]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0A1122]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? "bg-sky-500/20 text-sky-300 border-sky-400/40"
                            : "bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200"
                        }`}
                      >
                        {getIcon(track.iconName)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm sm:text-base text-slate-100 group-hover:text-sky-200 transition-colors">
                            {track.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-slate-400">
                            Wave {track.wave} · {track.durationWeeks} Weeks
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] font-mono font-medium text-emerald-400">
                            {track.entryLevelListings}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isComingSoon ? (
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? "text-sky-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Role Track Inspector */}
          <div className="lg:col-span-7 bg-[#070E1E] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-8 shadow-xl relative">
            {/* Top Badge & Header */}
            <div className="space-y-4 border-b border-slate-800/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 px-3 py-1 text-xs font-mono font-bold text-sky-300">
                  {selectedTrack.heroBadge}
                </span>

                <span className="text-xs font-mono text-slate-400">
                  <span className="font-bold text-slate-200">{selectedTrack.jdCountAnalyzed} JDs</span> Analyzed & Frequency-Mapped
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50">
                  {selectedTrack.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedTrack.tagline}
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#0D182E] p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">Salary Range</span>
                  <span className="font-serif font-bold text-base text-emerald-400 mt-0.5 block">
                    {selectedTrack.salaryRange}
                  </span>
                </div>

                <div className="bg-[#0D182E] p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">Hiring Signal</span>
                  <span className="font-mono font-bold text-sm text-sky-300 mt-0.5 block">
                    {selectedTrack.entryLevelListings}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-[#0D182E] p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block font-bold">Target Degrees</span>
                  <span className="font-sans text-xs text-slate-300 mt-0.5 block font-medium truncate">
                    {selectedTrack.targetDegrees.slice(0, 3).join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Empirical Skill Frequency Map */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-sky-400" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                    Empirical Skill Frequency (% of Analyzed JDs)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Live Scraped Signals</span>
              </div>

              <div className="space-y-3 bg-[#0A1224] p-5 rounded-2xl border border-slate-800/80">
                {selectedTrack.skillsFrequency.map((item) => (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-slate-200 font-medium">{item.skill}</span>
                      <span className="font-mono text-sky-300 font-bold">{item.percentage}% of JDs</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Employers & Curriculum Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 font-bold">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span>Sample Employers Hiring</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.sampleEmployers.map((emp) => (
                    <span
                      key={emp}
                      className="text-xs font-mono font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 font-bold">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span>12-Week Track Output</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                  {selectedTrack.keyModules.slice(0, 3).map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Box */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                <span>Next Intake SLA: </span>
                <span className="text-slate-200 font-bold">7-Day Fast-Track Desk Submission</span>
              </div>

              {selectedTrack.slug === "pharmacovigilance" ? (
                <Link
                  to="/pv-associate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <span>Explore PV Associate Track</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/courses/$slug"
                  params={{ slug: selectedTrack.slug }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <span>Explore {selectedTrack.shortTitle} Track</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
