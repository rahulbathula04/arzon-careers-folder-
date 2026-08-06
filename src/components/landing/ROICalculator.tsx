import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { PremiumChip } from "@/components/ui/PremiumChip";

type DegreeOption = {
  id: string;
  label: string;
  baselineFloor: number;
  arzonTarget: number;
  partnerRoles: string;
};

const DEGREES: DegreeOption[] = [
  {
    id: "btech-ai",
    label: "B.Tech / AI & CS",
    baselineFloor: 3.5,
    arzonTarget: 12.0,
    partnerRoles: "HSBC AI Engineer · JPMorgan ML Developer",
  },
  {
    id: "bpharm",
    label: "B.Pharm / M.Pharm",
    baselineFloor: 3.2,
    arzonTarget: 8.5,
    partnerRoles: "Novartis Data Analyst · Pfizer PV Associate",
  },
  {
    id: "bsc-allied",
    label: "B.Sc / Non-Pharma / Allied",
    baselineFloor: 3.0,
    arzonTarget: 7.5,
    partnerRoles: "Cognizant GCC Specialist · IQVIA Analyst",
  },
  {
    id: "fresh-grad",
    label: "Fresh Graduate (Any)",
    baselineFloor: 3.5,
    arzonTarget: 9.0,
    partnerRoles: "JPMorgan Tech Associate · HSBC Analytics",
  },
];

export function ROICalculator() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedDegree, setSelectedDegree] = useState<DegreeOption>(DEGREES[0]);
  const [prepWeeks, setPrepWeeks] = useState(12);

  const baselineSalary = selectedDegree.baselineFloor;
  const targetSalary = selectedDegree.arzonTarget;
  const totalLiftLakhs = (targetSalary - baselineSalary).toFixed(1);
  const percentageLift = Math.round(((targetSalary - baselineSalary) / baselineSalary) * 100);

  // Program cost assumption: Recruitment Track = ~₹0.25 Lakh
  const programCostLakhs = 0.25;
  const monthsToRecoup = ((programCostLakhs / (targetSalary - baselineSalary)) * 12).toFixed(1);

  return (
    <section
      id="roi-calculator"
      aria-labelledby="roi-calculator-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" icon={Calculator} size="md">
            INTERACTIVE ROI &amp; SALARY LIFT CALCULATOR
          </PremiumChip>
          <h2
            id="roi-calculator-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Calculate your career ROI after{" "}
            <span className="italic text-[#1B3F8B]">12 weeks in the Arzon pipeline.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            See the direct financial impact of passing the HSBC &amp; JPMorgan Partner Desk evaluation vs. applying cold on job portals.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Background Selection & Controls */}
          <div className="lg:col-span-6 rounded-2xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 block">
                1. SELECT YOUR ACADEMIC BACKGROUND
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEGREES.map((deg) => (
                  <button
                    key={deg.id}
                    onClick={() => {
                      setSelectedDegree(deg);
                      trackEvent("roi_degree_change", { degree: deg.id });
                    }}
                    className={`p-3 rounded-xl border text-left font-sans text-xs font-bold transition-all ${
                      selectedDegree.id === deg.id
                        ? "border-[#1B3F8B] bg-[#1B3F8B]/5 text-[#1B3F8B] ring-2 ring-[#1B3F8B]/20"
                        : "border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-stone-300 hover:bg-white"
                    }`}
                  >
                    <span>{deg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. PROGRAMME PREPARATION DURATION
                </label>
                <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-[#1B3F8B]/10 px-2.5 py-0.5 rounded-full">
                  {prepWeeks} WEEKS
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={16}
                step={2}
                value={prepWeeks}
                onChange={(e) => setPrepWeeks(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1B3F8B]"
              />
              <div className="flex justify-between font-mono text-[10px] text-stone-500 font-bold">
                <span>8 WEEKS (FAST-TRACK)</span>
                <span>12 WEEKS (STANDARD)</span>
                <span>16 WEEKS (ELITE VIP)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <p className="font-mono text-[11px] text-stone-600 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Target Roles: {selectedDegree.partnerRoles}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Outcome Display */}
          <motion.div 
            className="lg:col-span-6 rounded-2xl border-2 border-[#1B3F8B] bg-[#1B3F8B] tone-dark text-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/20 pb-4">
                <span className="font-mono text-xs font-bold uppercase text-sky-200 tracking-wider">
                  PROJECTED CAREER OUTCOME
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/40">
                  +{percentageLift}% SALARY LIFT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-slate-300 block">
                    COLD PORTAL FLOOR
                  </span>
                  <p className="font-serif text-2xl font-bold text-slate-300/80 line-through">
                    ₹{baselineSalary.toFixed(1)} LPA
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-sky-200 block">
                    ARZON PARTNER DESK
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-slate-50">
                    ₹{targetSalary.toFixed(1)} LPA
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/10 border border-slate-200/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-100">
                  <span>ANNUAL SALARY LIFT:</span>
                  <span className="font-bold text-emerald-300">+₹{totalLiftLakhs} LAKH / YEAR</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-100">
                  <span>TIME TO RECOUP INVESTMENT:</span>
                  <span className="font-bold text-sky-200">{monthsToRecoup} MONTHS</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#apply"
                onClick={() => trackEvent("roi_calculator_cta_click", { degree: selectedDegree.id })}
                className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-[#1B3F8B] bg-white card-light hover:bg-slate-100 rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                <span>Check Eligibility For My Degree</span>
                <ArrowRight className="w-4 h-4 text-[#1B3F8B]" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
