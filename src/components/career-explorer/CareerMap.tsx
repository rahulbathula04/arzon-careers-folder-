import React from "react";
import { CAREER_PROFILES, CareerPath } from "@/data/healthcareTaxonomy";
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

interface CareerMapProps {
  degreeName: string;
  onExploreCareer: (career: CareerPath) => void;
}

export const CareerMap: React.FC<CareerMapProps> = ({
  degreeName,
  onExploreCareer,
}) => {
  const careersList = Object.values(CAREER_PROFILES);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Your Custom Career Map</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-50 tracking-tight">
          Here are the corporate paths connected to your {degreeName}
        </h2>
        <p className="font-sans text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore each role to understand daily work, required software tools, city salary ranges, and active hiring volume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left pt-2">
        {careersList.map((c, index) => {
          const isFeatured = index === 0 || index === 1;
          return (
            <div
              key={c.id}
              className={`group relative p-6 rounded-2xl bg-[#0B152C] border transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-xl ${
                isFeatured
                  ? "border-sky-500/50 hover:border-sky-400 bg-gradient-to-b from-[#0C1938] to-[#0B152C]"
                  : "border-slate-800 hover:border-sky-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    {c.category}
                  </span>
                  {isFeatured ? (
                    <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> High Hiring Volume
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> ASSAY™ Ready
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-50 group-hover:text-sky-300 transition-colors">
                  {c.title}
                </h3>

                <div className="space-y-2 text-xs font-sans text-slate-300">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-bold">What you do</span>
                    <p className="text-slate-200 line-clamp-2 mt-0.5">{c.summary}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-bold">Common degrees</span>
                    <p className="text-slate-300 font-mono text-[11px] mt-0.5">
                      {c.qualifications.map((q) => q.degree).join(" | ")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onExploreCareer(c)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-sky-500/10 text-sky-400 border border-slate-800 hover:border-sky-400/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:border-sky-400/60"
              >
                <span>Explore Career</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
