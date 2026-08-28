import { useState } from "react";
import { DollarSign, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { CAREER_PROFILES } from "@/data/healthcareTaxonomy";

export function SalaryInsightsBlock() {
  const [selectedCity, setSelectedCity] = useState("Hyderabad (GCC Hub)");
  const [selectedRoleKey, setSelectedRoleKey] = useState("pv");

  const activeRole = CAREER_PROFILES[selectedRoleKey] || CAREER_PROFILES.pv;
  const activeCityData =
    activeRole.salaryByCity.find((c) => c.city.includes(selectedCity.split(" ")[0])) ||
    activeRole.salaryByCity[0];

  const cityOptions = [
    "Hyderabad (GCC Hub)",
    "Bengaluru (Tech Hub)",
    "Mumbai (MNC HQ)",
    "Pune",
    "NCR (Delhi/Gurgaon)",
  ];

  return (
    <section
      id="salary-insights"
      className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Interactive Salary Explorer</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            What can you realistically <br />
            <span className="italic text-emerald-400">expect to earn?</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We do not use single inflated average numbers. Select a role and city to view verified
            entry, mid, and senior level compensation ranges.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-[#0B152C] border border-slate-800">
          <div className="space-y-1.5">
            <label
              htmlFor="salary-role"
              className="font-mono text-xs font-bold text-sky-400 block flex items-center gap-1.5"
            >
              <span>Select Role</span>
            </label>
            <select
              id="salary-role"
              value={selectedRoleKey}
              onChange={(e) => setSelectedRoleKey(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              {Object.keys(CAREER_PROFILES).map((k) => (
                <option key={k} value={k}>
                  {CAREER_PROFILES[k].title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="salary-city"
              className="font-mono text-xs font-bold text-emerald-400 block flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" /> Select City Hub
            </label>
            <select
              id="salary-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-700 text-xs font-sans text-slate-100 focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Tier Salary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entry Level */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-4 text-center shadow-xl">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-slate-400 uppercase">
              Entry Level (0 - 2 Years)
            </span>
            <div className="py-2">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-50">
                {activeCityData.entry}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed font-medium">
              Junior {activeRole.title} handling initial case processing, triage, and documentation.
            </p>
          </div>

          {/* Mid Level */}
          <div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-[#0B152C] space-y-4 text-center shadow-2xl relative ring-1 ring-emerald-500/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-extrabold uppercase">
              High Growth Tier
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 font-mono text-xs font-bold text-emerald-400 uppercase">
              3 – 5 Years Experience
            </span>
            <div className="py-2">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {activeCityData.mid}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed font-medium">
              Senior Specialist handling medical narrative writing, signal detection, and trial
              audits.
            </p>
          </div>

          {/* Senior Level */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-4 text-center shadow-xl">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-slate-400 uppercase">
              Senior Level (6+ Years)
            </span>
            <div className="py-2">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-50">
                {activeCityData.senior}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed font-medium">
              Team Lead, Lead Data Manager, Safety Auditor, or Regulatory Affairs Manager.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
