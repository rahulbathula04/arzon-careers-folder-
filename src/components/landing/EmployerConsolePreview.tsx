import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Search, Filter, CheckCircle2, ShieldCheck, FileCode2, ExternalLink, Calendar, Star } from "lucide-react";
import { QuickLeadRegisterModal } from "./QuickLeadRegisterModal";

export function EmployerConsolePreview() {
  const shouldReduceMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);

  const sampleCandidates = [
    {
      name: "Aditya Verma",
      role: "Enterprise AI/ML & Quant Engineer",
      acriScore: 94,
      tier: "Executive VIP",
      skills: ["Python", "PyTorch", "Kubernetes", "O(N log N) DSA"],
      repo: "github.com/aditya/quant-trading-engine",
      benchmark: "Pass (94/100)",
      salaryTarget: "₹14–18 LPA",
    },
    {
      name: "Sneha Reddy",
      role: "GenAI & Agentic Systems Specialist",
      acriScore: 89,
      tier: "Tier-1 Qualified",
      skills: ["LangChain", "Vector DBs", "FastAPI", "Docker"],
      repo: "github.com/sneha/agentic-rag-pipeline",
      benchmark: "Pass (89/100)",
      salaryTarget: "₹12–16 LPA",
    },
    {
      name: "Karan Malhotra",
      role: "Enterprise ML Data Architect",
      acriScore: 86,
      tier: "Tier-1 Qualified",
      skills: ["Spark", "Iceberg", "Delta Lake", "Snowflake"],
      repo: "github.com/karan/lakehouse-pipeline-v2",
      benchmark: "Pass (86/100)",
      salaryTarget: "₹10–14 LPA",
    },
  ];

  const candidate = sampleCandidates[selectedCandidateIndex];

  return (
    <section id="employer-console" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] via-[#0B132B] to-[#0F172A] text-slate-100">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5" /> Direct Enterprise Intake Console
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight">
            How Enterprise Recruiters Hire Arzon Graduates
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Enterprise hiring managers access real-time ACRI candidate scorecards, verified GitHub repos, and schedule direct 48-hour interviews.
          </p>
        </div>

        {/* Dashboard Preview Interface */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden">
          {/* Top Bar */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs font-bold text-slate-400">
                Arzon Partner Console · July 2026 Intake Stream
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" /> 121 Verified RLS Partner Policies Active
            </div>
          </div>

          {/* Body Grid */}
          <div className="grid gap-6 lg:grid-cols-12 p-6 sm:p-8">
            {/* Candidate Roster List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Pre-Screened Candidates (ACRI ≥ 75)
              </span>

              {sampleCandidates.map((c, idx) => {
                const isSelected = selectedCandidateIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCandidateIndex(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-950/40 shadow-lg"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-50 text-sm font-sans">{c.name}</span>
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {c.acriScore} ACRI
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">{c.role}</p>
                  </div>
                );
              })}
            </div>

            {/* Candidate Detail Card */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="font-serif text-xl font-bold text-slate-50">{candidate.name}</h4>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">{candidate.role}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-400/30 text-blue-300">
                  {candidate.tier}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <span className="text-slate-400 block text-[10px]">ACRI Score</span>
                  <span className="font-bold text-emerald-400 text-base">{candidate.acriScore}/100</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <span className="text-slate-400 block text-[10px]">Benchmark</span>
                  <span className="font-bold text-slate-50 text-base">{candidate.benchmark}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px]">Salary Target</span>
                  <span className="font-bold text-blue-400 text-base">{candidate.salaryTarget}</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block mb-2">Verified Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2 truncate">
                  <FileCode2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="truncate">{candidate.repo}</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-50 text-xs font-bold font-sans flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Calendar className="h-4 w-4" /> Book Direct Profile Routing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickLeadRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
