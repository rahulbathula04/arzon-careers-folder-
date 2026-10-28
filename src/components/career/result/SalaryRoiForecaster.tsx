import { useState } from "react";
import { TrendingUp, DollarSign, Clock, AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function SalaryRoiForecaster({ result }: Props) {
  const [activeView, setActiveView] = useState<"cumulative" | "yearly">("cumulative");
  const roleName = result.archetype?.name ?? "Healthcare Specialist";

  const years = [
    { year: "Year 1", unverified: 2.8, verified: 4.8, delta: "+₹2.0L" },
    { year: "Year 2", unverified: 3.3, verified: 6.4, delta: "+₹3.1L" },
    { year: "Year 3", unverified: 3.9, verified: 8.5, delta: "+₹4.6L" },
    { year: "Year 4", unverified: 4.6, verified: 11.2, delta: "+₹6.6L" },
    { year: "Year 5", unverified: 5.4, verified: 14.5, delta: "+₹9.1L" },
  ];

  const totalUnverified = 20.0;
  const totalVerified = 45.4;
  const netAdvantage = 25.4; // Lakhs

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white tone-light card-light p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] w-full max-w-full min-w-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 w-full min-w-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-emerald-800 shadow-2xs mb-2 max-w-full">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">5-YEAR SALARY TRAJECTORY <span className="hidden sm:inline">&amp; CAREER ROI</span></span>
          </div>
          <h2 className="text-xl sm:text-3xl font-serif font-bold tracking-tight text-[#081F38] break-words">
            The Cost of Unverified Job Hunting in India
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl font-sans leading-relaxed">
            Healthcare graduates applying with only academic degrees enter lower pay bands and hit early promotion ceilings. See the financial impact of entering with verified work samples.
          </p>
        </div>

        <div className="flex items-center gap-1 self-start md:self-auto rounded-full bg-slate-100 p-1 border border-slate-200/60 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveView("cumulative")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
              activeView === "cumulative"
                ? "bg-white text-[#081F38] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            5-Year Cumulative
          </button>
          <button
            type="button"
            onClick={() => setActiveView("yearly")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
              activeView === "yearly"
                ? "bg-white text-[#081F38] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Year-by-Year
          </button>
        </div>
      </div>

      {/* Comparison Grid: 3-Column Apple Pro Financial Intelligence Deck */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Column 1: Unverified Traditional Route */}
        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/60 p-5.5 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em]">
                TRADITIONAL PATHWAY
              </span>
              <span className="text-[10px] font-mono">Unverified</span>
            </div>
            <h3 className="text-base font-bold text-[#081F38] font-sans">Generic Degree Graduate</h3>
            <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">
              Applies on job portals with standard academic resume. Zero verified industry database casework.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Starting Fresher Package</span>
                <span className="font-mono font-bold text-[#081F38]">₹2.8 – ₹3.2 LPA</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Average Job Search Window</span>
                <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md text-[11px]">
                  6–9 Months
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Year 5 Package Ceiling</span>
                <span className="font-mono font-bold text-slate-700">₹5.4 LPA</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider block">
              5-Year Cumulative Earnings
            </span>
            <p className="text-2xl font-bold font-mono text-slate-700 mt-0.5">
              ₹{totalUnverified.toFixed(1)} Lakhs
            </p>
          </div>
        </div>

        {/* Column 2: Verified Arzon Route (Heroic Centerpiece) */}
        <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-white p-5.5 flex flex-col justify-between relative shadow-[0_8px_32px_-4px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,1)] ring-2 ring-blue-500/15">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#081F38] to-[#1557D6] text-white px-3.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm border border-blue-400/30 flex items-center gap-1.5 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            RECOMMENDED ACCELERATION
          </span>

          <div>
            <div className="flex items-center justify-between text-blue-600 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em]">
                ARZON CAPABILITY PATHWAY
              </span>
              <span className="text-[10px] font-mono font-bold">Verified</span>
            </div>
            <h3 className="text-base font-bold text-[#081F38] font-sans">Verified {roleName}</h3>
            <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed">
              Enters with verified ACRI work simulations in enterprise safety &amp; clinical data tools.
            </p>

            <div className="mt-5 pt-4 border-t border-blue-100 space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700">Starting Fresher Package</span>
                <span className="font-mono font-bold text-blue-700">₹4.5 – ₹5.5 LPA</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700">Average Placement Window</span>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[11px]">
                  30–60 Days
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-700">Year 5 Team Lead Target</span>
                <span className="font-mono font-bold text-blue-700">₹14.5+ LPA</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white border border-blue-200/90 p-3.5 text-center shadow-2xs">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-mono uppercase text-blue-600 font-bold tracking-wider">
                5-Year Cumulative Earnings
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                +127% DELTA
              </span>
            </div>
            <p className="text-2xl font-bold font-mono text-[#081F38] mt-0.5">
              ₹{totalVerified.toFixed(1)} Lakhs
            </p>
          </div>
        </div>

        {/* Column 3: Net Career Premium Differential */}
        <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/70 via-emerald-50/20 to-white p-5.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between text-emerald-800 mb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase font-mono tracking-[0.14em]">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>NET CAREER PREMIUM</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                5-YR UPSIDE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-950 mt-1 tracking-tight">
              +₹{netAdvantage} Lakhs
            </h3>
            <p className="text-xs text-emerald-900 mt-1 leading-relaxed font-sans">
              Additional earnings over your first 5 years as a verified candidate versus competing as an unverified fresher.
            </p>

            <div className="mt-5 pt-4 border-t border-emerald-200/80 space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-emerald-950 font-sans">
                <span className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed">Fast-track promotion from Associate → Specialist within 18 months</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-emerald-950 font-sans">
                <span className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed">Higher recruiter negotiation leverage with audit-proof casework</span>
              </div>
            </div>
          </div>

          {/* Inaction Warning Callout */}
          <div className="mt-6 rounded-xl bg-amber-50/80 border border-amber-200/90 p-3.5 flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-950 leading-snug font-sans">
              <strong>Cost of Inaction:</strong> Every 30 days spent searching without verified casework costs approximately <strong>₹35,000</strong> in lost potential compensation.
            </p>
          </div>
        </div>
      </div>

      {/* Year-By-Year Progression Table (when toggled or visible) */}
      {activeView === "yearly" && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500 font-bold">
                  <th className="py-3 px-4">TIMELINE</th>
                  <th className="py-3 px-4">TRADITIONAL DEGREE</th>
                  <th className="py-3 px-4">VERIFIED ACRI PATHWAY</th>
                  <th className="py-3 px-4 text-right">ANNUAL UPSIDE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono bg-white">
                {years.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/70 transition-colors duration-150">
                    <td className="py-3 px-4 font-bold text-[#081F38]">{row.year}</td>
                    <td className="py-3 px-4 text-slate-600">₹{row.unverified.toFixed(1)} LPA</td>
                    <td className="py-3 px-4 text-blue-700 font-bold">₹{row.verified.toFixed(1)} LPA</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-bold">{row.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
