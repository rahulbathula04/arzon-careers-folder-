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
    <section id="role-tracks" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] tone-light text-[#1A1A1A] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#1B3F8B]" />
            <span>ARZON ROLE TRACK LIBRARY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Pick the job you want. <br />
            <span className="italic font-normal text-[#8A6D1F]">
              Train for what employers ask.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            We don’t sell generic pharma courses. We run a continuous India hiring scan across active job descriptions, extract the exact skills top employers ask for, and build targeted 12-Week Role Tracks.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {(["all", "Tier 1 · Launch First", "Tier 2 · Next Wave"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveTierFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 border cursor-pointer ${
                activeTierFilter === filter
                  ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50 shadow-2xs"
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
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold px-1">
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
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#1B3F8B] shadow-md ring-2 ring-[#1B3F8B]/15"
                        : "bg-white/80 border-stone-200/90 hover:border-stone-300 hover:bg-white shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? "bg-sky-50 text-[#1B3F8B] border-sky-300"
                            : "bg-stone-100 text-stone-600 border-stone-200 group-hover:text-stone-900"
                        }`}
                      >
                        {getIcon(track.iconName)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#1B3F8B] transition-colors">
                            {track.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-stone-500 font-medium">
                            Wave {track.wave} · {track.durationWeeks} Weeks
                          </span>
                          <span className="text-stone-400">•</span>
                          <span className="text-[11px] font-mono font-bold text-[#1B3F8B]">
                            {track.entryLevelListings}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isComingSoon ? (
                        <span className="text-[10px] font-mono font-bold text-[#8A6D1F] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? "text-[#1B3F8B] translate-x-1" : "text-stone-400 group-hover:text-stone-600"
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
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-xl relative tone-light card-light">
            {/* Top Badge & Header */}
            <div className="space-y-4 border-b border-stone-100 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-mono font-bold text-[#1B3F8B]">
                  {selectedTrack.heroBadge}
                </span>

                <span className="text-xs font-mono text-stone-500 font-medium">
                  <span className="font-bold text-stone-900">{selectedTrack.jdCountAnalyzed} JDs</span> Analyzed & Frequency-Mapped
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  {selectedTrack.title}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-sans font-medium">
                  {selectedTrack.tagline}
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Salary Range</span>
                  <span className="font-serif font-bold text-base text-[#1B3F8B] mt-0.5 block">
                    {selectedTrack.salaryRange}
                  </span>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Hiring Signal</span>
                  <span className="font-mono font-bold text-sm text-[#1B3F8B] mt-0.5 block">
                    {selectedTrack.entryLevelListings}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Target Degrees</span>
                  <span className="font-sans text-xs text-stone-700 mt-0.5 block font-medium truncate">
                    {selectedTrack.targetDegrees.slice(0, 3).join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Empirical Skill Frequency Map */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#1B3F8B]" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
                    Empirical Skill Frequency (% of Analyzed JDs)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-stone-500 font-medium">Live Scraped Signals</span>
              </div>

              <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200/80">
                {selectedTrack.skillsFrequency.map((item) => (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-sans text-stone-800 font-bold">{item.skill}</span>
                      <span className="font-mono text-[#1B3F8B] font-bold">{item.percentage}% of JDs</span>
                    </div>
                    <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1B3F8B] rounded-full transition-all duration-500"
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
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-700 font-bold">
                  <Building2 className="h-4 w-4 text-[#1B3F8B]" />
                  <span>Sample Employers Hiring</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.sampleEmployers.map((emp) => (
                    <span
                      key={emp}
                      className="text-xs font-mono font-semibold bg-stone-100 border border-stone-200 text-stone-800 px-3 py-1.5 rounded-xl shadow-2xs"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-700 font-bold">
                  <Target className="h-4 w-4 text-teal-700" />
                  <span>12-Week Track Output</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-700 font-sans font-medium">
                  {selectedTrack.keyModules.slice(0, 3).map((mod, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Box */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-bold text-stone-500 uppercase">12-Week Immersive Cohort</p>
                <p className="text-sm font-extrabold text-[#1A1A1A]">Curriculum Mapped to {selectedTrack.jdCountAnalyzed} Live JDs</p>
              </div>

              <Link
                to="/courses/$slug"
                params={{ slug: selectedTrack.slug }}
                style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
                className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md shadow-[#1B3F8B]/20 transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>View Full Syllabus</span>
                <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#FFFFFF" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
