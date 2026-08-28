import { useState } from "react";
import { CAREER_PROFILES } from "@/data/healthcareTaxonomy";
import { Scale, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareerComparisonMatrixProps {
  onAdvisorClick: () => void;
}

export function CareerComparisonMatrix({ onAdvisorClick }: CareerComparisonMatrixProps) {
  const careers = Object.values(CAREER_PROFILES);
  const [career1Id, setCareer1Id] = useState<string>("pv");
  const [career2Id, setCareer2Id] = useState<string>("cra");

  const c1 = CAREER_PROFILES[career1Id] || CAREER_PROFILES.pv;
  const c2 = CAREER_PROFILES[career2Id] || CAREER_PROFILES.cra;

  return (
    <section className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-sky-400" />
            <span>Interactive Career Comparison</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            Still deciding between two paths? <br />
            <span className="italic text-sky-400">Compare them side-by-side.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select any two healthcare corporate careers to compare daily duties, entry degrees, top
            tools, and city salary benchmarks.
          </p>
        </div>

        {/* Career Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-[#0B152C] border border-slate-800">
          <div className="space-y-1.5">
            <label
              htmlFor="career-comparison-one"
              className="font-mono text-xs font-bold text-sky-400 block"
            >
              Select Career 1
            </label>
            <select
              id="career-comparison-one"
              value={career1Id}
              onChange={(e) => setCareer1Id(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="career-comparison-two"
              className="font-mono text-xs font-bold text-emerald-400 block"
            >
              Select Career 2
            </label>
            <select
              id="career-comparison-two"
              value={career2Id}
              onChange={(e) => setCareer2Id(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Desktop Matrix & Mobile Cards */}
        <div className="rounded-3xl border border-slate-800 bg-[#0B152C] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#070D1B] border-b border-slate-800">
                  <th className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase w-1/4">
                    Comparison Metric
                  </th>
                  <th className="p-4 sm:p-5 font-serif text-base font-bold text-sky-300 w-3/8 border-l border-slate-800 bg-sky-950/20">
                    {c1.title}
                  </th>
                  <th className="p-4 sm:p-5 font-serif text-base font-bold text-emerald-300 w-3/8 border-l border-slate-800 bg-emerald-950/20">
                    {c2.title}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr>
                  <td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">
                    Category
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs font-bold text-sky-300">
                    {c1.category}
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs font-bold text-emerald-300">
                    {c2.category}
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">
                    What You Do
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 leading-relaxed text-xs">
                    {c1.summary}
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 leading-relaxed text-xs">
                    {c2.summary}
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">
                    Common Degrees
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs text-slate-300">
                    {c1.qualifications.map((q) => `${q.degree} (${q.percentage}%)`).join(", ")}
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs text-slate-300">
                    {c2.qualifications.map((q) => `${q.degree} (${q.percentage}%)`).join(", ")}
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">
                    Primary Software Tools
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs text-sky-300">
                    {c1.tools.map((t) => `${t.name} (${t.frequency})`).join(", ")}
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono text-xs text-emerald-300">
                    {c2.tools.map((t) => `${t.name} (${t.frequency})`).join(", ")}
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-mono text-xs font-bold text-slate-400 uppercase bg-[#070D1B]/50">
                    Hyderabad Entry Salary
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono font-bold text-amber-400 text-xs">
                    {c1.salaryByCity[0]?.entry || "₹3.0 – ₹4.5 LPA"}
                  </td>
                  <td className="p-4 sm:p-5 border-l border-slate-800 font-mono font-bold text-amber-400 text-xs">
                    {c2.salaryByCity[0]?.entry || "₹3.2 – ₹5.0 LPA"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisor CTA */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-slate-50">
              Want a 1-on-1 comparison for your specific profile?
            </h4>
            <p className="font-sans text-xs text-slate-300">
              Speak with a senior healthcare career advisor to figure out which path aligns best
              with your strengths.
            </p>
          </div>
          <Button
            onClick={onAdvisorClick}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shrink-0 shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Ask a Career Expert</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
