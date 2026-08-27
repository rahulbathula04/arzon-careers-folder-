import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Search, Filter, CheckCircle2, ShieldCheck, FileCode2, ExternalLink, Calendar, Star, GitCommit, Award, Sparkles, ChevronRight, Check } from "lucide-react";
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
      skills: ["Python", "PyTorch", "Kubernetes", "O(N log N) DSA", "Distributed Systems"],
      repo: "github.com/aditya/quant-trading-engine",
      commits: "38 Verified Commits",
      benchmark: "Pass (94/100)",
      salaryTarget: "₹14–18 LPA",
      competencies: [
        { label: "Code Architecture", score: 96 },
        { label: "DSA & Algorithmic Rigor", score: 94 },
        { label: "System Scalability", score: 92 },
        { label: "Production Readiness", score: 95 },
      ],
    },
    {
      name: "Sneha Reddy",
      role: "GenAI & Agentic Systems Specialist",
      acriScore: 89,
      tier: "Tier-1 Qualified",
      skills: ["LangChain", "Vector DBs", "FastAPI", "Docker", "RAG Pipelines"],
      repo: "github.com/sneha/agentic-rag-pipeline",
      commits: "29 Verified Commits",
      benchmark: "Pass (89/100)",
      salaryTarget: "₹12–16 LPA",
      competencies: [
        { label: "Code Architecture", score: 90 },
        { label: "DSA & Algorithmic Rigor", score: 88 },
        { label: "System Scalability", score: 91 },
        { label: "Production Readiness", score: 89 },
      ],
    },
    {
      name: "Karan Malhotra",
      role: "Enterprise ML Data Architect",
      acriScore: 86,
      tier: "Tier-1 Qualified",
      skills: ["Spark", "Iceberg", "Delta Lake", "Snowflake", "PySpark"],
      repo: "github.com/karan/lakehouse-pipeline-v2",
      commits: "42 Verified Commits",
      benchmark: "Pass (86/100)",
      salaryTarget: "₹10–14 LPA",
      competencies: [
        { label: "Code Architecture", score: 87 },
        { label: "DSA & Algorithmic Rigor", score: 85 },
        { label: "System Scalability", score: 89 },
        { label: "Production Readiness", score: 86 },
      ],
    },
  ];

  const candidate = sampleCandidates[selectedCandidateIndex];

  return (
    <section id="employer-console" className="tone-dark py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] text-slate-100 border-t border-slate-800">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/10 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
            <Building2 className="h-4 w-4 text-sky-400" /> Direct Enterprise Intake Console
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            How Enterprise Hiring Managers Screen & Offer Arzon Graduates
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Recruitment desks access real-time candidate ACRI audit scorecards, inspected GitHub codebases, and schedule direct 48-hour interview rounds.
          </p>
        </div>

        {/* Enterprise Console Surface */}
        <div className="rounded-3xl border border-slate-700/80 bg-[#0B132B] shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Dashboard Window Header Bar */}
          <div className="bg-[#020617] px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <span className="h-4 w-px bg-slate-800" />
              <span className="font-mono text-xs font-bold text-slate-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Arzon Partner Portal · Live July Intake Roster
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 121 Active Partner VMO Desks
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700">
                ACRI Engine v4.2
              </span>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid gap-6 lg:grid-cols-12 p-5 sm:p-8 bg-[#091124]">
            
            {/* Left Candidate Roster Feed */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 uppercase tracking-wider px-1">
                <span>Pre-Screened Candidates</span>
                <span className="text-emerald-400 font-bold">ACRI ≥ 75 Verified</span>
              </div>

              <div className="space-y-3">
                {sampleCandidates.map((c, idx) => {
                  const isSelected = selectedCandidateIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedCandidateIndex(idx)}
                      role="button"
                      tabIndex={0}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-sky-400 bg-[#0F224A] shadow-xl ring-2 ring-sky-400/40"
                          : "border-slate-800 bg-[#0B152C] hover:border-slate-700 hover:bg-[#0E1A36]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base font-sans">{c.name}</span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-sky-300 bg-sky-500/20 border border-sky-400/40 px-2 py-0.5 rounded-full">
                                Active View
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-sky-300 font-mono font-semibold">{c.role}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/40 px-2.5 py-1 rounded-lg shrink-0">
                          {c.acriScore} ACRI
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-300">
                        <span>Target: <strong className="text-white font-bold">{c.salaryTarget}</strong></span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Benchmark Pass
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recruiter Guarantee Banner */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-[#0B152C] space-y-1 text-xs font-sans">
                <span className="font-mono font-bold text-sky-400 uppercase text-[11px] block">
                  ENTERPRISE PARTNER SLA
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  All profiles listed above cleared Arzon's 75/100 proctored assessment benchmark and carry verified candidate GitHub repositories.
                </p>
              </div>
            </div>

            {/* Right Candidate Detailed Audit Scorecard */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0B152C] p-6 sm:p-7 space-y-6 shadow-xl">
              
              {/* Scorecard Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-2xl font-bold text-white tracking-tight">{candidate.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                      {candidate.tier}
                    </span>
                  </div>
                  <p className="text-xs text-sky-300 font-mono font-bold">{candidate.role}</p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/40 px-3 py-1 rounded-lg inline-block">
                    Verified Intake Candidate
                  </span>
                </div>
              </div>

              {/* Core Audit Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">ACRI SCORE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-emerald-400 text-xl sm:text-2xl">{candidate.acriScore}</span>
                    <span className="text-slate-400 text-xs">/100</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">BENCHMARK STATUS</span>
                  <span className="font-bold text-white text-base block mt-1">{candidate.benchmark}</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#060D1E] p-3.5 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">TARGET BAND</span>
                  <span className="font-bold text-sky-300 text-base block mt-1">{candidate.salaryTarget}</span>
                </div>
              </div>

              {/* Competency Radar Breakdown */}
              <div className="space-y-3 p-4 rounded-xl border border-slate-800 bg-[#060D1E]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-sky-400" />
                    PROCTORED EVALUATION COMPETENCY MATRIX
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">ALL PASS</span>
                </div>

                <div className="space-y-3">
                  {candidate.competencies.map((comp, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-sans text-slate-100">
                        <span className="font-semibold text-white">{comp.label}</span>
                        <span className="font-mono font-bold text-sky-300">{comp.score}%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Stack Badges */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase block">VERIFIED TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg border border-slate-700 bg-[#060D1E] text-xs font-mono text-slate-100 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified GitHub Repository Inspector */}
              <div className="p-4 rounded-xl border border-sky-500/30 bg-[#060D1E] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-300 font-bold flex items-center gap-2">
                    <FileCode2 className="h-4 w-4 text-sky-400" />
                    Verified Candidate Portfolio Repo
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                    <GitCommit className="h-3.5 w-3.5 text-emerald-400" />
                    {candidate.commits}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#020617] border border-slate-700 font-mono text-xs text-white flex items-center justify-between">
                  <span className="truncate text-sky-300 font-bold">{candidate.repo}</span>
                  <span className="text-slate-400 text-[11px] font-bold">MIT License</span>
                </div>
              </div>

              {/* Recruiter Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-amber-300" />
                  Schedule Direct 48-Hour Technical Interview
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


