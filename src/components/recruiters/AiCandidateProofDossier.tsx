import * as React from "react";
import { useState } from "react";
import {
  ShieldCheck,
  Award,
  Play,
  Pause,
  Sparkles,
  Download,
  ExternalLink,
  CheckCircle2,
  Brain,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTrackTheme } from "@/data/trackTheme";

export interface AiCandidateProofDossierProps {
  candidateName?: string;
  roleTitle?: string;
  acriScore?: number;
  percentile?: number;
  auditHash?: string;
  onContact?: () => void;
  className?: string;
}

export function AiCandidateProofDossier({
  candidateName = "Ananya Sharma",
  roleTitle = "Senior Medical Coding Specialist",
  acriScore = 88,
  percentile = 94,
  auditHash = "arz_acri_89a2f7c41d9e",
  onContact,
  className,
}: AiCandidateProofDossierProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const theme = getTrackTheme("medical-coding");

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-[#070C18]/95 p-6 text-slate-200 shadow-2xl backdrop-blur-md space-y-6",
        className,
      )}
    >
      {/* Header with Verified Seal */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
              ✓ AI Verified Candidate
            </span>
            <span className="text-xs text-slate-400 font-mono">Hash: {auditHash}</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">{candidateName}</h3>
          <p className="text-xs text-slate-300 font-medium">{roleTitle}</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-extrabold text-teal-400 tabular-nums">
              {acriScore}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100 ACRI</span>
          </div>
          <span className="mt-1 rounded-md bg-teal-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-teal-300 border border-teal-500/20">
            Top {100 - percentile}% Talent
          </span>
        </div>
      </div>

      {/* 60-Second AI Interview Simulation Player */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              60s AI Mock Interview Snippet
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Audio Verified</span>
        </div>

        <div className="rounded-lg bg-black/50 p-3.5 border border-white/5 space-y-2">
          <p className="text-xs text-teal-300 font-mono">Q: "How do you handle ambiguous clinical documentation during hospital coding?"</p>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "I query the attending physician directly while flagging the record under HIPAA compliance guidelines, ensuring zero unbilled discrepancies..."
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-all shadow-lg shrink-0"
            >
              {isPlayingAudio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{isPlayingAudio ? "0:24 / 0:60" : "Click to Play Audio"}</span>
                <span>Voice Quality: 98%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-teal-400 transition-all duration-300"
                  style={{ width: isPlayingAudio ? "40%" : "0%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACRI 5-Dimension Radar Summary */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
          Audited Readiness Competencies
        </h4>

        <div className="grid gap-2.5">
          {[
            { label: "ICD-10-CM / CPT Accuracy", pct: 92 },
            { label: "Clinical Audit Speed", pct: 86 },
            { label: "HIPAA Compliance Precision", pct: 95 },
            { label: "Communication & Technical Pitch", pct: 84 },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{item.label}</span>
                <span className="font-mono font-bold text-white">{item.pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-teal-400"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onContact}
          className="flex-1 rounded-xl bg-teal-500 py-3 text-xs font-bold text-slate-950 hover:bg-teal-400 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Request Direct Intro Call
        </button>
        <a
          href="/verify"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Audit Hash
        </a>
      </div>
    </div>
  );
}
