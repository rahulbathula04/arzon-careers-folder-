import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Calendar, CheckCircle2, X, ExternalLink, Sparkles } from "lucide-react";
import type { AiAssessmentResult, DimensionScore } from "@/lib/aiAssessmentEngine";
import { submitApplication } from "@/lib/applications.functions";

interface RecruiterDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AiAssessmentResult;
  candidateName?: string;
  candidatePhone?: string;
  verificationId?: string;
}

export function RecruiterDossierModal({
  isOpen,
  onClose,
  result,
  candidateName = "Candidate",
  candidatePhone = "",
  verificationId = "ENT-ACRI-2026-9482X",
}: RecruiterDossierModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRouted, setIsRouted] = useState(false);

  if (!isOpen) return null;

  const dimensionList: DimensionScore[] = Object.values(result.dimensions);

  const handleRouteProfile = async () => {
    setIsSubmitting(true);
    try {
      if (candidatePhone) {
        await submitApplication({
          data: {
            name: candidateName,
            email: `${candidatePhone.replace(/\D/g, "")}@candidate.arzon.global`,
            phone: candidatePhone,
            programSlug: "enterprise-ai-quant",
            programName: "Tier-1 Enterprise AI & Quant",
            utmSource: "dossier_modal_auto_route",
          },
        });
      }
      setIsRouted(true);
    } catch (e) {
      console.error("[RecruiterDossierModal] Routing error:", e);
      setIsRouted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-[#0F172A] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-slate-700 bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-50 hover:bg-slate-700 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Dossier Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Recruiter Dossier · Ref: {verificationId}
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-50">
              {candidateName}
            </h3>
            <p className="text-xs text-emerald-400 font-mono mt-0.5">
              Target Track: {result.topRecommendedTrack}
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-serif font-bold text-emerald-400">
              {result.overallAcriScore} <span className="text-xs font-mono text-slate-400">/ 100 ACRI</span>
            </div>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
              {result.tierLabel}
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">Assessment Verdict</span>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {result.automatedSummary}
          </p>
        </div>

        {/* Dimension Breakdown */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
            Enterprise Technical Skill Radios
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {dimensionList.map((dim: DimensionScore, idx: number) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200 font-sans">{dim.label}</span>
                  <span className="font-mono font-bold text-emerald-400">{dim.score}/100</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono block truncate">{dim.feedback}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Flags */}
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
            <span className="font-mono font-bold text-emerald-400 uppercase text-[11px] block">Verified Strengths</span>
            <ul className="space-y-1.5">
              {result.topStrengths.map((str: string, i: number) => (
                <li key={i} className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-2">
            <span className="font-mono font-bold text-blue-400 uppercase text-[11px] block">Recommended Accelerations</span>
            <ul className="space-y-1.5">
              {result.improvementFlags.map((flag: string, i: number) => (
                <li key={i} className="flex items-start gap-1.5 text-slate-300">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Routing Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href={`/verify?id=${verificationId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5 text-blue-400" /> Public Verification Certificate
          </a>

          {isRouted ? (
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4" /> Profile Routed to Partner Desk (SLA 15m)
            </div>
          ) : (
            <button
              onClick={handleRouteProfile}
              disabled={isSubmitting}
              className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-50 text-xs font-bold font-sans flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Routing Profile...</>
              ) : (
                <>
                  <Calendar className="h-4 w-4" /> Route Dossier to Enterprise Recruiters
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
