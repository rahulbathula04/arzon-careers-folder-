import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calculator, DollarSign, TrendingUp, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/tools/cost-calculator")({
  head: () => {
    const seo = pageSeo({
      path: "/tools/cost-calculator",
      title: "Healthcare Career Preparation & Cost Calculator · Arzon",
      description:
        "Interactive calculator estimating direct course tuition, PG rent, food, transport, and job-search financial exposure for healthcare aspirants in Hyderabad.",
    });
    return {
      meta: [{ title: "Healthcare Career Preparation & Cost Calculator · Arzon" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: CostCalculatorComponent,
});

function CostCalculatorComponent() {
  const [courseDuration, setCourseDuration] = useState(6);
  const [pgRent, setPgRent] = useState(10000);
  const [foodCost, setFoodCost] = useState(6000);
  const [transportCost, setTransportCost] = useState(2000);
  const [courseFee, setCourseFee] = useState(25000);
  const [targetSalaryLpa, setTargetSalaryLpa] = useState(4.0);
  const [jobSearchMonths, setJobSearchMonths] = useState(6);

  const totalMonths = courseDuration + jobSearchMonths;
  const monthlyLivingCost = pgRent + foodCost + transportCost;
  const totalLivingCost = monthlyLivingCost * totalMonths;
  const directFinancialOutlay = courseFee + totalLivingCost;

  const monthlyOpportunityCost = (targetSalaryLpa * 100000) / 12;
  const foregoneIncome = Math.round(monthlyOpportunityCost * totalMonths);
  const totalEconomicExposure = directFinancialOutlay + foregoneIncome;

  // Arzon Route Comparison: Remote/Hybrid 3-Month Intensive
  const arzonMonths = 3;
  const arzonCourseFee = 18000;
  const arzonDirectCost = arzonCourseFee; // Zero relocation expense required
  const arzonForegoneIncome = Math.round(monthlyOpportunityCost * arzonMonths);
  const arzonEconomicExposure = arzonDirectCost + arzonForegoneIncome;
  const savings = totalEconomicExposure - arzonEconomicExposure;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Header Navigation */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-700 hover:text-[#0B1325] uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO RESEARCH HUBS
          </Link>
          <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-widest">
            ARZON INTERACTIVE CALCULATOR
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
              REAL ECONOMIC EXPOSURE CALCULATOR
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] tracking-tight">
            Healthcare Career Preparation &amp; Relocation Cost Calculator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Calculate your true financial exposure when relocating to major city training hubs. Compare course fees, PG rent, food, transport, and job-search duration against role-focused preparation routes.
          </p>
        </div>
      </header>

      {/* Main Interactive Tool Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Form Column */}
          <div className="lg:col-span-7 bg-white tone-light card-light border border-stone-300 rounded-xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#0B1325] mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#1B3F8B]" /> 1. Input Your Parameters
            </h2>

            <div className="space-y-6 text-xs">
              {/* Course Duration */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Classroom Course Duration:</span>
                  <span className="text-[#1B3F8B]">{courseDuration} Months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* PG Rent */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Monthly PG Accommodation Rent:</span>
                  <span className="text-[#1B3F8B]">₹{pgRent.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min={4000}
                  max={20000}
                  step={500}
                  value={pgRent}
                  onChange={(e) => setPgRent(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* Food & Mess */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Monthly Food &amp; Mess Expense:</span>
                  <span className="text-[#1B3F8B]">₹{foodCost.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={12000}
                  step={500}
                  value={foodCost}
                  onChange={(e) => setFoodCost(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* Transport */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Monthly Local Transport Expense:</span>
                  <span className="text-[#1B3F8B]">₹{transportCost.toLocaleString()}/mo</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={6000}
                  step={500}
                  value={transportCost}
                  onChange={(e) => setTransportCost(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* Course Fee */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Admitted Course Tuition Fee:</span>
                  <span className="text-[#1B3F8B]">₹{courseFee.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={80000}
                  step={1000}
                  value={courseFee}
                  onChange={(e) => setCourseFee(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* Job Search Window */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Expected Job Search Window:</span>
                  <span className="text-[#1B3F8B]">{jobSearchMonths} Months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={jobSearchMonths}
                  onChange={(e) => setJobSearchMonths(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>

              {/* Target Salary */}
              <div>
                <div className="flex justify-between font-mono font-bold text-stone-800 mb-1">
                  <span>Target Entry Salary:</span>
                  <span className="text-[#1B3F8B]">₹{targetSalaryLpa.toFixed(1)} LPA</span>
                </div>
                <input
                  type="range"
                  min={2.5}
                  max={8.0}
                  step={0.5}
                  value={targetSalaryLpa}
                  onChange={(e) => setTargetSalaryLpa(Number(e.target.value))}
                  className="w-full accent-[#1B3F8B]"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Total Financial Outlay Card */}
            <div className="bg-[#0B1325] tone-dark text-white rounded-xl p-6 sm:p-8 border border-stone-800">
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                ● CUMULATIVE FINANCIAL BREAKDOWN
              </span>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Total Duration (Course + Search):</span>
                  <span className="font-bold text-white">{totalMonths} Months</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Monthly Living Expense:</span>
                  <span className="font-bold text-white">₹{monthlyLivingCost.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Total Living Cost Exposure:</span>
                  <span className="font-bold text-white">₹{totalLivingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-300">Direct Course Tuition Fee:</span>
                  <span className="font-bold text-white">₹{courseFee.toLocaleString()}</span>
                </div>

                <div className="pt-2">
                  <span className="text-stone-400 text-[10px] block">DIRECT OUT-OF-POCKET EXPENSE:</span>
                  <span className="text-2xl font-extrabold text-amber-300 font-serif">
                    ₹{directFinancialOutlay.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-800">
                  <span className="text-stone-400 text-[10px] block">6-MONTH FOREGONE INCOME (@ ₹{targetSalaryLpa} LPA):</span>
                  <span className="text-sm font-bold text-rose-300">
                    ₹{foregoneIncome.toLocaleString()}
                  </span>
                </div>

                <div className="pt-3 border-t-2 border-stone-700 bg-stone-900/80 p-3 rounded">
                  <span className="text-emerald-400 text-[10px] font-bold block">TOTAL ILLUSTRATIVE ECONOMIC EXPOSURE:</span>
                  <span className="text-3xl font-extrabold text-white font-serif">
                    ₹{totalEconomicExposure.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="bg-white tone-light card-light border border-stone-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-base text-[#0B1325] mb-2">
                Arzon Role-Focused Route Comparison
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                By mastering role skills &amp; completing remote case processing labs, aspirants eliminate unnecessary city living expenses.
              </p>
              <div className="mt-4 bg-emerald-50 border border-emerald-300 p-3 rounded text-xs font-mono text-emerald-900">
                <strong>ILLUSTRATIVE ECONOMIC SAVINGS:</strong> ₹{savings.toLocaleString()}
              </div>

              <div className="mt-6">
                <Link
                  to="/career-engine/start"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-4 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                >
                  DIAGNOSE YOUR ROLE FIT →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Module: What Happens If I Do Nothing? */}
        <section className="mt-12 rounded-3xl border border-stone-300 bg-white tone-light card-light p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-2.5 py-1 rounded border border-blue-200 inline-block">
              EDUCATIONAL DECISION ANALYSIS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
              What Happens If I Delay Preparation By 1 Year?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl font-sans">
              Delaying role preparation post-graduation is not just a matter of waiting—it carries measurable time and illustrative economic opportunity exposure. Here are the transparent assumptions:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] block">1. 12 Months of Time Exposure</span>
              <p className="text-stone-700 leading-relaxed">
                Expending 12 months in trial-and-error searching without hands-on software tools increases resume gaps on recruiter screens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] block">2. Unearned Fresher Compensation</span>
              <p className="text-stone-700 leading-relaxed">
                At an indicative fresher benchmark of ₹4.0L LPA, 12 months of delay equals ~₹4,00,000 in unearned salary exposure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] block">3. Compounding Seniority Gap</span>
              <p className="text-stone-700 leading-relaxed">
                Starting 1 year earlier means achieving Senior Associate / Team Lead promotion benchmarks 12 months sooner.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
