import { useState } from "react";
import { DollarSign, Clock, AlertTriangle, ShieldCheck, Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function CostOfGuessingCalculator() {
  const [monthsUncertain, setMonthsUncertain] = useState<number>(6);
  const [attemptedCertifications, setAttemptedCertifications] = useState<number>(1);

  // Math metrics
  const monthlySalaryForgone = 38000; // Average starting domain salary
  const totalSalaryLost = monthsUncertain * monthlySalaryForgone;
  const certificationWaste = attemptedCertifications * 45000;
  const totalCost = totalSalaryLost + certificationWaste;

  return (
    <section className="bg-slate-900 py-20 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400 mb-4">
            <DollarSign className="h-3.5 w-3.5" />
            <span>THE REAL COST OF GUESSING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            How much is career ambiguity costing you?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Every month spent in confusion, applying blindly or taking generic courses, has a tangible financial and emotional price. Calculate your true opportunity cost.
          </p>
        </div>

        {/* 4 Cost Pill Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">12 - 18 Months Lost</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Drifting between non-domain roles, generic internships, or preparing for exams without target company JDs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">₹50k - ₹1.5L Wasted</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Paid to institutes selling generic certificates that recruiters discard due to lack of real tool practice.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Wrong Specialization</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Entering a domain ill-matched with your innate strengths, causing burnout and zero promotion trajectory.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Career Momentum</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Missing the early entry window for high-demand roles in Pharmacovigilance, CDM, and Regulatory Affairs.
            </p>
          </div>
        </div>

        {/* Interactive Calculator Widget */}
        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Interactive Opportunity Cost Calculator</h3>
              <p className="text-xs text-slate-400">Adjust the sliders below based on your current career status.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-300 mb-2">
                  <span>Months of Career Delay / Ambiguity</span>
                  <span className="text-blue-400 font-mono font-bold text-base">{monthsUncertain} months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={monthsUncertain}
                  onChange={(e) => setMonthsUncertain(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1 Month</span>
                  <span>12 Months</span>
                  <span>24 Months</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-300 mb-2">
                  <span>Generic Courses / Institutes Considered</span>
                  <span className="text-blue-400 font-mono font-bold text-base">{attemptedCertifications} course(s)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={attemptedCertifications}
                  onChange={(e) => setAttemptedCertifications(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0 (None yet)</span>
                  <span>2 Courses</span>
                  <span>4 Courses</span>
                </div>
              </div>
            </div>

            {/* Total Cost Display */}
            <div className="rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-950/20 via-slate-900 to-slate-900 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-1">
                  Estimated Total Opportunity Loss
                </span>
                <div className="text-3xl sm:text-5xl font-mono font-extrabold text-white">
                  ₹{totalCost.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Includes ₹{totalSalaryLost.toLocaleString("en-IN")} in lost entry-level salary + ₹{certificationWaste.toLocaleString("en-IN")} in wasted course fees.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Healthcare Career Intelligence Cost: ₹0 for Workshop
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
