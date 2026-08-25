import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Reveal } from "@/components/motion/Reveal";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";

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
    arzonTarget: 14.0,
    partnerRoles: "Quant Fintech Data Analyst (14 LPA) · Enterprise AI Engineer",
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
    arzonTarget: 14.0,
    partnerRoles: "Quant Fintech Data Analyst (14 LPA) · Enterprise Analytics",
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
        <Reveal className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" icon={Calculator} size="md">
            ILLUSTRATIVE CAREER SCENARIO COMPARISON
          </PremiumChip>
          <h2
            id="roi-calculator-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Compare cold application baselines vs.{" "}
            <span className="italic text-[#1B3F8B]">calibrated partner desk opportunities.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            See the financial potential when preparing directly against active Tier-1 Enterprise & Quant Fintech job briefs.
          </p>
        </Reveal>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Background Selection & Controls */}
          <div className="lg:col-span-6 rounded-2xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 block">
                1. SELECT YOUR ACADEMIC BACKGROUND
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEGREES.map((deg) => {
                  const isSelected = selectedDegree.id === deg.id;
                  return (
                    <button
                      key={deg.id}
                      type="button"
                      onClick={() => {
                        setSelectedDegree(deg);
                        trackEvent("roi_degree_change", { degree: deg.id });
                      }}
                      style={{
                        color: isSelected ? "#1B3F8B" : "#1C1917",
                        backgroundColor: isSelected ? "#EEF2FF" : "#F5F5F4",
                        borderColor: isSelected ? "#1B3F8B" : "#D6D3D1",
                      }}
                      className={`p-3 rounded-xl border text-left font-sans text-xs font-extrabold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3F8B] focus-visible:ring-offset-2 ${
                        isSelected
                          ? "ring-2 ring-[#1B3F8B]/30 shadow-xs"
                          : "hover:border-stone-400 hover:bg-stone-200"
                      }`}
                    >
                      <span style={{ color: isSelected ? "#1B3F8B" : "#1C1917" }}>{deg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. PROGRAMME PREPARATION DURATION
                </label>
                <span
                  style={{ color: "#1B3F8B", backgroundColor: "#DBEAFE" }}
                  className="font-mono text-xs font-extrabold px-3 py-1 rounded-full border border-blue-300"
                >
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
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#1B3F8B]"
              />
              <div className="flex justify-between font-mono text-[10px] text-stone-700 font-extrabold">
                <span>8 WEEKS (FAST-TRACK)</span>
                <span>12 WEEKS (STANDARD)</span>
                <span>16 WEEKS (ELITE VIP)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <p className="font-mono text-[11px] font-bold flex items-center gap-1.5" style={{ color: "#065F46" }}>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span style={{ color: "#065F46" }}>Target Roles: {selectedDegree.partnerRoles}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Outcome Display */}
          <motion.div 
            style={{ backgroundColor: "#1B3F8B", color: "#FFFFFF" }}
            className="lg:col-span-6 rounded-2xl border-2 border-[#1B3F8B] tone-dark p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider" style={{ color: "#BAE6FD" }}>
                  PROJECTED CAREER OUTCOME
                </span>
                <span
                  style={{ color: "#6EE7B7", backgroundColor: "rgba(6, 78, 59, 0.5)", borderColor: "rgba(110, 231, 183, 0.4)" }}
                  className="px-3 py-1 rounded-full font-mono text-xs font-extrabold border"
                >
                  +{percentageLift}% SALARY LIFT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-extrabold uppercase block" style={{ color: "#CBD5E1" }}>
                    COLD PORTAL FLOOR
                  </span>
                  <p className="font-serif text-2xl font-bold line-through" style={{ color: "#CBD5E1" }}>
                    ₹{baselineSalary.toFixed(1)} LPA
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-extrabold uppercase block" style={{ color: "#BAE6FD" }}>
                    ARZON PARTNER DESK
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-extrabold" style={{ color: "#FFFFFF" }}>
                    ₹{targetSalary.toFixed(1)} LPA
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl space-y-2 border" style={{ backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(255, 255, 255, 0.2)" }}>
                <div className="flex items-center justify-between text-xs font-mono" style={{ color: "#FFFFFF" }}>
                  <span>ANNUAL SALARY LIFT:</span>
                  <span className="font-extrabold" style={{ color: "#6EE7B7" }}>+₹{totalLiftLakhs} LAKH / YEAR</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono" style={{ color: "#FFFFFF" }}>
                  <span>TIME TO RECOUP INVESTMENT:</span>
                  <span className="font-extrabold" style={{ color: "#BAE6FD" }}>{monthsToRecoup} MONTHS</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#apply"
                onClick={() => trackEvent("roi_calculator_cta_click", { degree: selectedDegree.id })}
                style={{ backgroundColor: "#FFFFFF", color: "#1B3F8B" }}
                className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <span style={{ color: "#1B3F8B" }}>Check Eligibility For My Degree</span>
                <ArrowRight className="w-4 h-4" style={{ color: "#1B3F8B" }} />
              </a>
            </div>
          </motion.div>

        </div>

        {/* ASCI Disclaimer */}
        <p className="text-[11px] text-stone-700 font-mono text-center max-w-3xl mx-auto leading-relaxed border-t border-stone-200 pt-4 font-medium">
          Disclaimer: Figures shown represent illustrative scenario comparisons based on verified employer job briefs. Final salary and employment decisions remain solely with the hiring employer and depend on candidate assessment performance, background check, and interview evaluation. Arzon Careers does not guarantee employment or specific salary outcomes.
        </p>
      </div>
    </section>
  );
}
