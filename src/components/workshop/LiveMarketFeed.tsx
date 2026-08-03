import { Activity, Building2, MapPin, TrendingUp, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";

export function LiveMarketFeed() {
  return (
    <section className="bg-slate-900 py-16 text-white border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Pulsing Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              LIVE MARKET INTELLIGENCE FEED · AUGUST 2026 REFRESH
            </span>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Source: Aggregated from 14,280+ Verified MNC Life Science Job Postings (IQVIA, Parexel, Novartis, Cognizant)
          </span>
        </div>

        {/* 4 Metrics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Active Domain Openings</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-mono font-extrabold text-white">
              14,280+
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Across PV, CDM, Regulatory Affairs & SAS.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Top Hiring Clusters</span>
              <MapPin className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white">
              Hyderabad, BLR, Pune
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Followed by Mumbai, NCR & Ahmedabad.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Top Demanded Software</span>
              <Cpu className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white">
              Argus, eCTD, SAS
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Mentioned in 89% of entry job descriptions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">AI Hiring Impact</span>
              <TrendingUp className="h-4 w-4 text-sky-400" />
            </div>
            <div className="text-3xl font-mono font-extrabold text-white">
              +87%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Increase in demand for specialized human evaluators.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
