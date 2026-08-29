import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const DEGREES = [
  { id: "bpharm", label: "B.Pharm", avgFresherOffCampus: 2.2 },
  { id: "pharmd", label: "Pharm.D", avgFresherOffCampus: 3.2 },
  { id: "bsc", label: "B.Sc (Life Sciences)", avgFresherOffCampus: 1.8 },
  { id: "biotech", label: "B.Tech / M.Sc Biotech", avgFresherOffCampus: 2.4 },
];

const ROLES = [
  { id: "pv", label: "Pharmacovigilance Associate", targetSalary: 4.8, demand: "High Demand", paybackMonths: 2.5 },
  { id: "coder", label: "Medical Coder (CPC / ICD-10)", targetSalary: 4.5, demand: "Extreme Volume", paybackMonths: 2.2 },
  { id: "cdm", label: "Clinical Data Associate", targetSalary: 5.2, demand: "High Demand", paybackMonths: 2.8 },
  { id: "cra", label: "Clinical Research Associate", targetSalary: 5.5, demand: "Niche High Pay", paybackMonths: 3.0 },
];

export function SalaryRoiCalculator() {
  const [selectedDegreeId, setSelectedDegreeId] = useState("bpharm");
  const [selectedRoleId, setSelectedRoleId] = useState("pv");

  const degree = DEGREES.find((d) => d.id === selectedDegreeId) || DEGREES[0];
  const role = ROLES.find((r) => r.id === selectedRoleId) || ROLES[0];

  const salaryDifference = Math.max(0.5, role.targetSalary - degree.avgFresherOffCampus);
  const threeYearGain = Math.round(salaryDifference * 3 * 10) / 10;

  return (
    <section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            <Calculator className="h-3.5 w-3.5 text-[#1B3F8B]" />
            <span>INTERACTIVE ROI &amp; SALARY CALCULATOR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Calculate your career income boost. <br />
            <span className="italic font-normal text-[#8A6D1F]">
              See payback timelines in months.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Select your academic degree and target healthcare role to calculate the projected starting salary uplift, 3-year cumulative income delta, and estimated fee payback period.
          </p>
        </div>

        {/* Interactive Calculator Panel */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xl tone-light card-light grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Input Selectors */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Select Degree */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold block">
                1. Select Your Degree / Background:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {DEGREES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDegreeId(d.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-sans text-xs sm:text-sm font-bold ${
                      selectedDegreeId === d.id
                        ? "bg-sky-50 text-[#1B3F8B] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div>{d.label}</div>
                    <div className="text-[11px] font-mono font-medium text-stone-500 mt-0.5">
                      Off-campus avg: ₹{d.avgFresherOffCampus} LPA
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Target Role */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold block">
                2. Select Your Target Healthcare Role:
              </label>
              <div className="space-y-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRoleId(r.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedRoleId === r.id
                        ? "bg-white text-[#1A1A1A] border-[#1B3F8B] ring-2 ring-[#1B3F8B]/15 shadow-sm"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                        {r.label}
                      </div>
                      <div className="text-[11px] font-mono font-semibold text-[#1B3F8B] mt-0.5">
                        Target Starting CTC: ₹{r.targetSalary} LPA
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#8A6D1F] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      {r.demand}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Live ROI Display */}
          <div className="lg:col-span-6 bg-gradient-to-br from-stone-50 via-sky-50/50 to-amber-50/30 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
                PROJECTED ROI SCORECARD
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                VERIFIED PLACEMENT DATA
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white tone-light card-light p-4 rounded-xl border border-stone-200 shadow-2xs">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Starting CTC Uplift</span>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1B3F8B] block mt-1">
                    +₹{salaryDifference.toFixed(1)} LPA
                  </span>
                  <span className="text-[10px] font-sans text-stone-500 mt-0.5 block font-medium">
                    vs. Off-campus market avg
                  </span>
                </div>

                <div className="bg-white tone-light card-light p-4 rounded-xl border border-stone-200 shadow-2xs">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block font-bold">Estimated Fee Payback</span>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#8A6D1F] block mt-1">
                    {role.paybackMonths} Months
                  </span>
                  <span className="text-[10px] font-sans text-stone-500 mt-0.5 block font-medium">
                    From career entry CTC
                  </span>
                </div>
              </div>

              {/* 3-Year Cumulative Impact */}
              <div className="bg-white tone-light card-light p-5 rounded-xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-stone-600 font-bold uppercase">3-Year Additional Earnings</span>
                  <TrendingUp className="h-4 w-4 text-[#1B3F8B]" />
                </div>
                <div className="font-mono font-black text-3xl text-[#1B3F8B]">
                  ₹{threeYearGain} Lakhs+
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Cumulative income increase over 3 years by entering a specialized role track vs. taking a general non-core desk job.
                </p>
              </div>
            </div>

            <a
              href="#tracks"
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
              className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer"
            >
              <span>Explore {role.label} Track</span>
              <ArrowRight className="h-4 w-4" style={{ color: "#FFFFFF" }} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
