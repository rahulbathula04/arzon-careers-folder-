import { useState, useEffect } from "react";
import { ArrowRight, AlertTriangle, TrendingDown } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 800 });
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
    <section className="bg-slate-950 py-20 text-white border-t border-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-400 mb-3">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>FINANCIAL OPPORTUNITY COST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The True Cost of Career Guesswork
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Calculate the exact financial impact of spending months trying to navigate your career without intelligence.
          </p>
        </div>

        {/* Calculator Workspace */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-200">Months Spent Guessing:</span>
                  <span className="font-mono text-blue-400 text-base font-bold">{months} Months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400 mt-1">
                  <span>1 Mo</span>
                  <span>6 Mo</span>
                  <span>12 Mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-200">Generic Course Spend:</span>
                  <span className="font-mono text-emerald-400 text-base font-bold">₹{courseFee.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={150000}
                  step={5000}
                  value={courseFee}
                  onChange={(e) => setCourseFee(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400 mt-1">
                  <span>₹0</span>
                  <span>₹75,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-4 text-xs text-slate-300 space-y-2 font-sans">
                <div className="flex justify-between">
                  <span>Estimated Entry Salary:</span>
                  <span className="text-white font-mono font-bold">₹32,000 / month</span>
                </div>
                <div className="flex justify-between">
                  <span>Forgone Income ({months} months):</span>
                  <span className="text-rose-400 font-mono font-bold">₹{totalSalaryLost.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Total Financial Opportunity Cost */}
            <div className="rounded-2xl bg-slate-950/80 p-6 text-center flex flex-col justify-between h-full border border-rose-500/20">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                  <TrendingDown className="h-4 w-4" />
                  <span>TOTAL ESTIMATED OPPORTUNITY COST</span>
                </div>
                
                {/* Large Counter */}
                <div className="text-4xl sm:text-5xl font-mono font-bold text-white mt-3 flex items-center justify-center gap-1">
                  <span>₹</span>
                  <AnimatedNumber value={totalCost} />
                </div>
                
                <p className="mt-3 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-sans">
                  Forgone income from delayed employment plus unguided course spend.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenRegister}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Stop Guessing & Save Your Career Time</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
