import { useState, useEffect } from "react";
import { Calculator, ArrowRight, TrendingDown, DollarSign } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 1000 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("en-IN")
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

interface CostOfGuessingCalculatorProps {
  onOpenRegister: () => void;
}

export function CostOfGuessingCalculator({ onOpenRegister }: CostOfGuessingCalculatorProps) {
  const [months, setMonths] = useState<number>(6);
  const [courseFee, setCourseFee] = useState<number>(45000);

  const monthlySalaryLoss = 32000;
  const totalSalaryLost = months * monthlySalaryLoss;
  const totalCost = totalSalaryLost + courseFee;

  return (
    <section className="bg-slate-950 py-16 lg:py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 mb-4">
            <Calculator className="h-3.5 w-3.5 text-blue-400" />
            <span>INTERACTIVE FINANCIAL OPPORTUNITY COST CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The True Cost of Career Guesswork
          </h2>
          <p className="mt-4 text-base text-slate-400">
            See the exact financial impact of spending months trying to figure out your career without intelligence.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-300">Months Lost Guessing:</span>
                  <span className="font-mono text-blue-400 text-base">{months} Months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1 Month</span>
                  <span>6 Months</span>
                  <span>12 Months</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-300">Spent on Generic Courses:</span>
                  <span className="font-mono text-emerald-400 text-base">₹{courseFee.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={150000}
                  step={5000}
                  value={courseFee}
                  onChange={(e) => setCourseFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>₹0</span>
                  <span>₹75,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Estimated Entry Salary:</span>
                  <span className="text-slate-200">₹32,000 / month</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary Forgone ({months} mo):</span>
                  <span className="text-rose-400">₹{totalSalaryLost.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Total Animated Cost Result Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-center flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  TOTAL ESTIMATED OPPORTUNITY COST
                </span>
                
                {/* Animated Counter Output */}
                <div className="text-4xl sm:text-5xl font-mono font-bold text-white mt-4 flex items-center justify-center gap-1">
                  <span>₹</span>
                  <AnimatedNumber value={totalCost} />
                </div>
                
                <p className="mt-3 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Lost income from delayed employment plus unguided course spend.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
              >
                <span>Stop Guessing & Save Your Career Time</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized answer to stop losing months to guesswork?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
            >
              <span>Find My Career Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
