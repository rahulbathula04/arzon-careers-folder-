import * as React from "react";
import { useState } from "react";
import {
  Award,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Zap,
  CheckCircle2,
  Brain,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AiCandidateProofDossier } from "@/components/recruiters/AiCandidateProofDossier";

export interface EliteCandidate {
  id: string;
  name: string;
  role: string;
  acriScore: number;
  percentile: number;
  location: string;
  skills: string[];
  bidsCount: number;
}

const SAMPLE_ELITE_CANDIDATES: EliteCandidate[] = [
  {
    id: "p60-1",
    name: "Ananya Sharma",
    role: "Senior Medical Coding Specialist",
    acriScore: 92,
    percentile: 98,
    location: "Hyderabad / Remote",
    skills: ["ICD-10-CM", "CPT Coding", "EHR Audit", "HIPAA"],
    bidsCount: 4,
  },
  {
    id: "p60-2",
    name: "Rohan Varma",
    role: "Pharmacovigilance Safety Associate",
    acriScore: 89,
    percentile: 95,
    location: "Bengaluru",
    skills: ["Argus Safety", "MedDRA", "CDSCO Compliance", "Form 44"],
    bidsCount: 3,
  },
  {
    id: "p60-3",
    name: "Priya Nair",
    role: "Clinical Data Management Lead",
    acriScore: 87,
    percentile: 92,
    location: "Mumbai / Remote",
    skills: ["EDC Systems", "SAS Clinical", "CDISC SDTM", "Data Validation"],
    bidsCount: 5,
  },
];

export function Prime60TalentExchange({ className }: { className?: string }) {
  const [selectedCandidate, setSelectedCandidate] = useState<EliteCandidate | null>(null);

  const handlePlaceBid = (c: EliteCandidate) => {
    toast.success(`Interview bid request submitted for ${c.name}! Arzon Concierge will connect you within 2 hours.`);
  };

  return (
    <div className={cn("space-y-6 text-slate-200", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-black p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Prime60 Talent Exchange</h2>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-amber-500/30">
                Top 5% ACRI Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Direct employer bidding and 24-hour placement matching for elite candidates (ACRI 85+)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-black/50 px-4 py-2 text-right border border-white/10">
            <div className="font-mono text-xs font-bold text-amber-400">14 Active Hiring Partners</div>
            <div className="text-[10px] text-slate-400 font-mono">Avg Time to Offer: 4.2 Days</div>
          </div>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {SAMPLE_ELITE_CANDIDATES.map((c) => (
          <div
            key={c.id}
            className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#070C18]/90 p-5 space-y-4 shadow-xl transition-all hover:border-amber-400/40 hover:scale-[1.01]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                    Prime60 Verified
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{c.name}</h3>
                  <p className="text-xs text-slate-300">{c.role}</p>
                </div>
                <span className="rounded-md bg-teal-500/20 px-2.5 py-1 font-mono text-xs font-bold text-teal-300 border border-teal-500/30">
                  {c.acriScore} ACRI
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-t border-b border-white/5 py-2">
                <span>{c.location}</span>
                <span className="text-emerald-400">{c.bidsCount} Active Recruiter Bids</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.skills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 text-teal-400" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCandidate(c)}
                className="flex-1 rounded-xl border border-white/20 bg-white/5 py-2 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Brain className="h-3.5 w-3.5 text-teal-400" />
                Proof Dossier
              </button>
              <button
                type="button"
                onClick={() => handlePlaceBid(c)}
                className="flex-1 rounded-xl bg-amber-500 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-1.5"
              >
                <Zap className="h-3.5 w-3.5" />
                Bid Interview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Proof Dossier Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl">
            <button
              type="button"
              onClick={() => setSelectedCandidate(null)}
              className="absolute -top-10 right-0 text-white hover:text-teal-400 font-mono text-sm font-bold"
            >
              ✕ Close
            </button>
            <AiCandidateProofDossier
              candidateName={selectedCandidate.name}
              roleTitle={selectedCandidate.role}
              acriScore={selectedCandidate.acriScore}
              percentile={selectedCandidate.percentile}
              onContact={() => {
                handlePlaceBid(selectedCandidate);
                setSelectedCandidate(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
