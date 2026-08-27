import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Building2, CheckCircle2, ArrowRight, Briefcase } from "lucide-react";
import { LiveOpportunitiesData, type LiveRoleBrief } from "@/data/liveOpportunities";
import { QuickLeadRegisterModal } from "./QuickLeadRegisterModal";

export function LiveOpportunityMatcher() {
  const shouldReduceMotion = useReducedMotion();
  const roles: LiveRoleBrief[] = LiveOpportunitiesData.ROLES;
  const [selectedRole, setSelectedRole] = useState<LiveRoleBrief>(roles[0] || {
    id: "ENT-AI-01",
    role: "Enterprise AI Engineer",
    employer: "Tier-1 Global Tech Enterprise",
    partnerBadge: "ENTERPRISE VMO",
    openingsCount: 25,
    openingsDisplay: "25 Openings",
    eligibility: "STEM / CS Freshers",
    ctcDisplay: "₹14–18 LPA",
    deadlineDisplay: "Intake Window Open",
    status: "OPEN",
    urgencyLabel: "Drive Open",
    skills: ["Python", "PyTorch", "FastAPI", "Docker", "SQL"],
    trackSlug: "ai-engineer",
    description: "Build production GenAI microservices and ML pipelines.",
  });
  const [filterTrack, setFilterTrack] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRoles = filterTrack === "ALL"
    ? roles
    : roles.filter((r) => r.role.toUpperCase().includes(filterTrack) || r.employer.toUpperCase().includes(filterTrack));

  return (
    <section id="opportunity-matcher" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 motion-safe:animate-pulse" /> 75+ Active Openings Live
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Real-Time AI Opportunity Matcher
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            See how your skill profile & ACRI benchmark score map directly to open Tier-1 Enterprise Tech & Quant Fintech briefs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["ALL", "ANALYST", "AI", "CLINICAL", "DEVELOPER"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTrack(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all ${
                filterTrack === t
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid Matcher */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Opportunities List */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredRoles.map((roleItem: LiveRoleBrief) => {
              const isSelected = selectedRole.id === roleItem.id;
              return (
                <div
                  key={roleItem.id}
                  onClick={() => setSelectedRole(roleItem)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-slate-900/90 shadow-lg shadow-blue-500/10"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                      {roleItem.employer}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      94% Match
                    </span>
                  </div>
                  <h4 className="mt-1 font-serif text-base font-bold text-white">
                    {roleItem.role}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-sans">
                    <span>{roleItem.ctcDisplay}</span>
                    <span>{roleItem.openingsDisplay}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Role Match Card */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                  Target Brief: {selectedRole.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
                  {selectedRole.role}
                </h3>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-emerald-400">
                  {selectedRole.ctcDisplay}
                </span>
                <p className="text-[11px] text-slate-400 font-mono">Day 1 Package Floor</p>
              </div>
            </div>

            {/* Role Metadata */}
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Eligibility</span>
                <span className="font-bold text-white text-xs mt-0.5 block leading-snug">
                  {selectedRole.eligibility}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Interview Scheduling</span>
                <span className="font-bold text-emerald-400 text-xs mt-0.5 block">
                  Direct Partner Desk Routing
                </span>
              </div>
            </div>

            {/* Required Skill Checkpoints */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                Screening Criteria Checkpoints
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {selectedRole.skills.map((skillItem: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{skillItem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Briefcase className="h-4 w-4 text-blue-400" />
                <span>{selectedRole.openingsCount} Open Slots in July 2026 Drive</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-sans flex items-center gap-2 shadow-lg transition-all"
              >
                Apply & Route Profile <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuickLeadRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultTrack={selectedRole.role} />
    </section>
  );
}
