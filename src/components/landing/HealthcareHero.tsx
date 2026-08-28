import { Stethoscope, ArrowDown, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HEALTHCARE_DEGREES, HealthcareDegree } from "@/data/healthcareTaxonomy";

interface HealthcareHeroProps {
  selectedDegreeId: string | null;
  onSelectDegree: (degree: HealthcareDegree) => void;
  onExploreClick: () => void;
  onAdvisorClick: () => void;
}

export function HealthcareHero({
  selectedDegreeId,
  onSelectDegree,
  onExploreClick,
}: HealthcareHeroProps) {
  return (
    <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070D1B] via-[#0B152C] to-[#070D1B] tone-dark text-slate-100 overflow-hidden border-b border-slate-800">
      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        
        {/* Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4 text-sky-400" />
          <span>HEALTHCARE CAREER INTELLIGENCE PLATFORM</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50 leading-snug">
            Your degree is only the starting point.{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 whitespace-nowrap">
              Find out what you can actually do with it.
            </span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Explore corporate healthcare roles, current job requirements, top employers, skills, tools and city salary ranges — 100% free with no course purchase required.
          </p>
        </div>

        {/* Embedded Interactive Application Entry: What are you studying? */}
        <div className="pt-2 max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block">
            What are you studying? Select your degree to start:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {HEALTHCARE_DEGREES.slice(0, 6).map((deg) => {
              const isSelected = selectedDegreeId === deg.id;
              return (
                <button
                  key={deg.id}
                  onClick={() => {
                    onSelectDegree(deg);
                    onExploreClick();
                  }}
                  className={`py-2.5 px-4 rounded-xl font-mono text-xs font-bold border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105"
                      : "bg-[#070D1B] text-slate-200 border-slate-700 hover:border-sky-400 hover:text-sky-300 active:scale-95"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                  <span>{deg.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Single Primary Action Trigger */}
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
          <Button
            onClick={onExploreClick}
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-xs font-mono font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <span>Explore My Career Options</span>
            <ArrowDown className="w-4 h-4 motion-safe:animate-bounce" />
          </Button>

          {/* Social proof — honest, non-fabricated */}
          <div className="pt-2 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070D1B] border border-slate-800 text-slate-300 text-xs font-sans">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>B.Pharm, Pharm.D &amp; Life Sciences students across India explore careers here</span>
          </div>
        </div>

      </div>
    </section>
  );
}
