import { useState } from "react";
import { HEALTHCARE_DEGREES, DEGREE_CAREER_MAPS, type HealthcareDegree } from "@/data/healthcareTaxonomy";
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";

interface DegreeCareerMapSectionProps {
  selectedDegree: string;
  onSelectDegree: (degreeId: string) => void;
  onSelectCareer: (careerName: string) => void;
}

export function DegreeCareerMapSection({
  selectedDegree,
  onSelectDegree,
  onSelectCareer,
}: DegreeCareerMapSectionProps) {
  const currentDegreeObj = HEALTHCARE_DEGREES.find((d) => d.id === selectedDegree) || HEALTHCARE_DEGREES[0];
  const careerMap = DEGREE_CAREER_MAPS[selectedDegree] || DEGREE_CAREER_MAPS["bpharm"];

  return (
    <section id="degree-selector" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>03. IMMEDIATE DEGREE VALUE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            Start with your degree. <br />
            <span className="italic text-sky-400">What are you studying?</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300">
            Select your degree below to immediately explore verified career paths, company requirements, tool stacks, and salary insights.
          </p>
        </div>

        {/* Zero-Friction Degree Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {HEALTHCARE_DEGREES.map((deg) => {
            const isSelected = deg.id === selectedDegree;
            return (
              <button
                key={deg.id}
                onClick={() => onSelectDegree(deg.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? "bg-gradient-to-br from-sky-600 to-indigo-700 border-sky-400 text-slate-50 shadow-xl ring-2 ring-sky-400/50 scale-[1.02]"
                    : "bg-[#070D1B] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold uppercase ${isSelected ? "text-amber-300" : "text-slate-400"}`}>
                    {deg.shortName}
                  </span>
                  {isSelected && <Sparkles className="w-4 h-4 text-amber-300 motion-safe:animate-pulse" />}
                </div>
                <p className="font-serif text-sm font-bold leading-snug line-clamp-2">
                  {deg.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Degree Career Map Display */}
        <div className="rounded-3xl border border-slate-700/80 bg-[#070D1B] p-6 sm:p-10 space-y-8 shadow-2xl relative">
          
          {/* Header Banner for Selected Degree */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block">
                04. DEGREE CAREER MAP
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50 mt-1">
                Your {currentDegreeObj.name} Career Map
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                Your degree can connect to more career paths than you may realize. Click any career below to inspect job descriptions, tools, and salary bounds.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-emerald-400 flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Arzon Taxonomy</span>
            </div>
          </div>

          {/* 5-Category Career Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(careerMap).map(([category, careers]) => (
              <div key={category} className="p-5 rounded-2xl border border-slate-800 bg-[#0B152C] space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-50 border-b border-slate-800/80 pb-2">
                    {category}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {careers.map((career) => (
                      <li key={career}>
                        <button
                          onClick={() => onSelectCareer(career)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#070D1B] hover:bg-slate-900 border border-slate-800/80 hover:border-sky-400/50 text-xs font-sans font-medium text-slate-200 hover:text-sky-300 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span className="font-semibold">{career}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    Click role to inspect parameters →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
