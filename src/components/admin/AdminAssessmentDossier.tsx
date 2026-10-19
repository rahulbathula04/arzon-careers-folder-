import React, { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  X,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Copy,
  Check,
  Building2,
  GraduationCap,
  Calendar,
  Smartphone,
  Compass,
  TrendingUp,
  Brain,
  ShieldCheck,
  Zap,
  BookOpen,
  HelpCircle,
  FileText,
  Search,
} from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { getResultDetail, markLeadContacted } from "@/lib/leads.functions";
import { ARCHETYPES, type CareerEngineResult } from "@/data/careerEngineScoring";
import { QUESTIONS, type Question, type ArchetypeId } from "@/data/careerEngineQuestions";

export interface AdminAssessmentDossierProps {
  leadId?: string | null;
  initialLead?: any | null;
  onClose: () => void;
  onContactedChange?: (id: string, contacted: boolean) => void;
}

export function AdminAssessmentDossier({
  leadId,
  initialLead,
  onClose,
  onContactedChange,
}: AdminAssessmentDossierProps) {
  const fetchDetail = useServerFn(getResultDetail);
  const markContactedFn = useServerFn(markLeadContacted);

  const [activeTab, setActiveTab] = useState<
    "overview" | "radar" | "tracks" | "curriculum" | "questions"
  >("overview");

  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<any>(initialLead || null);
  const [session, setSession] = useState<any>(null);
  const [trace, setTrace] = useState<any[]>([]);
  const [contacted, setContacted] = useState<boolean>(
    Boolean(initialLead?.contacted_at || initialLead?.status === "contacted"),
  );
  const [updatingContacted, setUpdatingContacted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCategory, setQuestionCategory] = useState<string>("all");

  const targetId = leadId || initialLead?.id;

  // Load detailed lead + session + trace if we have an ID
  useEffect(() => {
    if (!targetId) return;
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const res = await fetchDetail({ data: { id: targetId } });
        if (cancelled) return;
        if (res.lead) {
          setLead(res.lead);
          setContacted(Boolean(res.lead.contacted_at));
        }
        if (res.session) setSession(res.session);
        if (Array.isArray(res.trace)) setTrace(res.trace);
      } catch (err) {
        console.warn("Could not fetch assessment detail:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [targetId, fetchDetail]);

  // Extract result payload
  const payload = useMemo(() => {
    const raw = lead?.result_payload;
    if (raw && typeof raw === "object") {
      return raw as Partial<CareerEngineResult> & Record<string, any>;
    }
    return {} as Partial<CareerEngineResult> & Record<string, any>;
  }, [lead?.result_payload]);

  // Identify Archetype
  const archetypeId = (lead?.archetype || payload?.archetypeId) as ArchetypeId | undefined;
  const archetypeMap = ARCHETYPES as Record<string, any>;
  const archetype = archetypeId && archetypeMap[archetypeId] ? archetypeMap[archetypeId] : null;

  // Academic Info from Profile
  const profile = (payload.profile || {}) as {
    college?: string;
    course?: string;
    stream?: string;
    year?: string;
  };

  const college = profile.college || lead?.college || "Not Specified";
  const degree = profile.course || lead?.degree || "Healthcare";
  const stream = profile.stream || lead?.branch || "General";
  const gradYear = profile.year || lead?.grad_year || "2025/2026";

  // Fit & Readiness Scores
  const fitScore = typeof lead?.fit_score === "number" ? lead.fit_score : payload.fitScore ?? 0;
  const readinessScore = payload.readinessScore ?? Math.round(fitScore * 0.9);
  const confidenceBand = payload.confidenceBand ?? "recommended";
  const confidence = payload.confidence ?? 75;

  // 4 Pillars Breakdown
  const breakdown = (payload.breakdown || {
    aptitude: 0,
    interest: 0,
    background: 0,
    commitment: 0,
  }) as Record<string, number>;

  // Trait Scores
  const traitScores = (payload.traitScores || {}) as Record<string, number>;

  // Ranking & Paths
  const ranking = Array.isArray(payload.ranking) ? payload.ranking : [];
  const topPaths = Array.isArray(lead?.top_paths) ? lead.top_paths : archetype?.topPaths || [];

  // "Not Fit" Career & Reasons
  const notFit = payload.notFit as { id?: string; fit?: number } | undefined;
  const notFitArchetype = notFit?.id && archetypeMap[notFit.id] ? archetypeMap[notFit.id] : null;
  const notFitReasons = Array.isArray(payload.notFitReasons) ? payload.notFitReasons : [];

  // Risks & Warnings
  const risks = Array.isArray(payload.risks) ? payload.risks : [];

  // AI Analysis (Study Plan, Skill Gaps, Estimated Salary)
  const aiAnalysis = payload.aiAnalysis as {
    skillGaps?: string[];
    studyPlan?: Array<{ week: number; focus: string; description: string }>;
    estimatedSalary?: string;
    industryReadiness?: number;
  } | undefined;

  // Map Questions & Answers
  const questionMap = useMemo(() => new Map(QUESTIONS.map((q) => [q.id, q])), []);

  const mappedAnswers = useMemo(() => {
    const answerEvents = trace.filter((t) => t.source === "answer");
    return answerEvents.map((a) => {
      const q: Question | undefined = questionMap.get(a.question_id);
      const chosenOpt = q?.options.find((opt) => opt.value === a.answer);
      return {
        questionId: a.question_id,
        kind: q?.kind || "scenario",
        prompt: q?.prompt || a.question_id,
        chosenValue: a.answer,
        chosenLabel: chosenOpt?.label || a.answer,
        correct: chosenOpt?.correct,
        reveals: chosenOpt?.reveals,
        at: a.at,
      };
    });
  }, [trace, questionMap]);

  // Filtered Questions
  const filteredAnswers = useMemo(() => {
    return mappedAnswers.filter((item) => {
      if (questionCategory !== "all" && item.kind !== questionCategory) return false;
      if (!questionSearch.trim()) return true;
      const q = questionSearch.toLowerCase();
      return (
        item.prompt.toLowerCase().includes(q) ||
        item.chosenLabel.toLowerCase().includes(q) ||
        (item.reveals && item.reveals.toLowerCase().includes(q))
      );
    });
  }, [mappedAnswers, questionCategory, questionSearch]);

  // Actions
  const handleToggleContacted = async () => {
    if (!targetId || updatingContacted) return;
    setUpdatingContacted(true);
    const nextVal = !contacted;
    try {
      await markContactedFn({ data: { id: targetId, contacted: nextVal } });
      setContacted(nextVal);
      if (onContactedChange) onContactedChange(targetId, nextVal);
      toast.success(nextVal ? "Marked as Contacted" : "Marked as Uncontacted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setUpdatingContacted(false);
    }
  };

  const handleCopyResultLink = () => {
    if (!targetId) return;
    const url = `${window.location.origin}/career-engine/result?id=${encodeURIComponent(targetId)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success("Candidate report link copied to clipboard");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Pre-filled URL
  const cleanPhone = (lead?.phone || "").replace(/\D/g, "");
  const digits10 = cleanPhone.slice(-10);
  const candidateName = lead?.name || "Student";
  const whatsappMsg = encodeURIComponent(
    `Hi ${candidateName}, this is Arzon Global Admissions. We reviewed your Career Assessment dossier: you scored ${fitScore}% fit for ${archetype?.name || "Pharmacovigilance"}. Would you like to schedule a 10-minute briefing to review your evaluation?`
  );
  const whatsappUrl = digits10 ? `https://wa.me/91${digits10}?text=${whatsappMsg}` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:bg-white animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-[#090D16] border border-slate-800 rounded-2xl shadow-2xl text-slate-100 flex flex-col max-h-[92vh] overflow-hidden print:max-h-none print:border-none print:shadow-none print:text-black">
        {/* ── TOP ACTION BAR ─────────────────────────────────────── */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-[#0C1220]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-mono text-[11px] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Career Dossier</span>
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-50 font-serif">{candidateName}</h2>
              {contacted ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-mono font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Contacted</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[10.5px] font-mono font-semibold">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Uncontacted</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-50 font-mono text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                title="Send WhatsApp Briefing Message"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}

            {targetId && (
              <a
                href={`${typeof window !== "undefined" ? window.location.origin : ""}/career-engine/result?id=${encodeURIComponent(targetId)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 font-mono text-xs font-bold transition shadow-xs cursor-pointer"
                title="Open Candidate's Live Result Report"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Report</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleToggleContacted}
              disabled={updatingContacted}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition cursor-pointer ${
                contacted
                  ? "border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300"
                  : "border-blue-400/40 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 font-bold"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{contacted ? "Mark Uncontacted" : "Mark Contacted"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyResultLink}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 transition cursor-pointer"
              title="Copy candidate's view link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 transition cursor-pointer"
              title="Print / Save Dossier PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 transition cursor-pointer ml-1"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ── CANDIDATE STRIP & ACADEMIC DOSSIER ────────────────── */}
        <section className="px-6 py-3.5 bg-[#070A11] border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
              Direct Contact
            </span>
            <div className="font-semibold text-slate-200 mt-0.5 truncate flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{lead?.phone || "—"}</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{lead?.email || "—"}</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
              College / University
            </span>
            <div className="font-semibold text-slate-200 mt-0.5 truncate flex items-center gap-1.5" title={college}>
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{college}</span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Graduation: {gradYear}
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
              Degree &amp; Stream
            </span>
            <div className="font-semibold text-slate-200 mt-0.5 truncate flex items-center gap-1.5" title={`${degree} - ${stream}`}>
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{degree}</span>
            </div>
            <span className="text-[11px] text-slate-400 block truncate" title={stream}>
              Stream: {stream}
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
              Assessment Telemetry
            </span>
            <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {lead?.created_at
                  ? new Date(lead.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-slate-400" />
                <span>{session?.device || "Desktop"}</span>
              </span>
              <span>·</span>
              <span className="font-mono text-[10px] text-teal-400">
                {session?.utm_source || "direct"}
              </span>
            </div>
          </div>
        </section>

        {/* ── TAB SELECTOR ───────────────────────────────────────── */}
        <nav className="flex items-center gap-1 px-6 border-b border-slate-800 bg-[#0B101D] overflow-x-auto shrink-0 py-2">
          {[
            { id: "overview", label: "01 · Archetype & Diagnosis", icon: Brain },
            { id: "radar", label: "02 · 4-Pillars & Competencies", icon: TrendingUp },
            { id: "tracks", label: "03 · Career Matches & Not-Fit", icon: Compass },
            { id: "curriculum", label: "04 · AI 90-Day Curriculum", icon: BookOpen },
            {
              id: "questions",
              label: `05 · Question Responses (${mappedAnswers.length})`,
              icon: HelpCircle,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-blue-500/20 text-blue-200 border border-blue-400/40 font-bold shadow-xs shadow-blue-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ── TAB CONTENT BODY ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          {loading && (
            <div className="py-12 flex justify-center">
              <AiThinkingLoader label="Loading candidate dossier…" size="md" />
            </div>
          )}

          {!loading && (
            <>
              {/* TAB 1: ARCHETYPE & DIAGNOSIS */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Archetype Hero Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-[#0E1528] to-[#0A0E1A] border border-blue-500/30 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
                          <span>{archetype?.emoji || "🛡️"}</span>
                          <span>PRIMARY ARCHETYPE IDENTIFIED</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-50 font-serif tracking-tight">
                          {archetype?.name || lead?.archetype || "Pharmacovigilance Sentinel"}
                        </h3>
                        <p className="text-sm text-blue-200/90 italic font-sans max-w-2xl leading-relaxed">
                          "{archetype?.tagline || "Methodical, rigorous evaluator of adverse events and patient safety signals."}"
                        </p>
                      </div>

                      {/* Fit Score Badge */}
                      <div className="flex items-center gap-3 bg-black/40 border border-slate-700/80 p-4 rounded-xl shrink-0 text-center">
                        <div>
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                            OVERALL CAREER FIT
                          </span>
                          <span className="text-3xl sm:text-4xl font-mono font-black text-blue-400">
                            {fitScore}%
                          </span>
                        </div>
                        <div className="h-10 w-px bg-slate-800" />
                        <div>
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                            CONFIDENCE
                          </span>
                          <span className="text-sm font-mono font-bold text-emerald-400 uppercase">
                            {confidenceBand.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Diagnosis Narrative */}
                    {archetype?.description && (
                      <div className="mt-5 pt-5 border-t border-slate-800 space-y-2">
                        <span className="font-mono text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                          PSYCHOLOGICAL &amp; WORK IDENTITY DIAGNOSIS
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {archetype.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Operational Traits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <Zap className="w-4 h-4" />
                        <span>Core Work Environment &amp; Needs</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(archetype?.needs || [
                          "Structured SOPs and clear regulatory guidelines",
                          "High-volume data processing with dual-monitor accuracy",
                          "Objective, evidence-based decision making",
                        ]).map((need: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Dealbreakers &amp; Burnout Traps</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {(archetype?.dealbreakers || [
                          "Aggressive direct sales quotas or retail counter shifts",
                          "Unstructured environments with vague documentation expectations",
                          "High-chaos roles without verified standard operating procedures",
                        ]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-400 shrink-0 font-bold">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Session Trace Metadata */}
                  <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10.5px] uppercase font-bold text-slate-400 tracking-wider block">
                      Test Session Footprint
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Session ID:</span>
                        <span className="text-[11px] text-slate-200 select-all truncate block">
                          {lead?.session_id || "Local"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Started At:</span>
                        <span>
                          {session?.started_at
                            ? new Date(session.started_at).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Completed At:</span>
                        <span>
                          {session?.completed_at
                            ? new Date(session.completed_at).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Questions Answered:</span>
                        <span className="text-emerald-400 font-bold font-mono">
                          {mappedAnswers.length} items logged
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 4-PILLARS & COMPETENCIES */}
              {activeTab === "radar" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* 4 Core Pillars Matrix */}
                  <div className="p-6 rounded-2xl bg-[#0C1222] border border-slate-800 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-50 font-serif">
                          4 Core Assessment Pillars
                        </h3>
                        <p className="text-xs text-slate-400">
                          Evaluated across Aptitude, Interest, Educational Background, and Timeline Commitment.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                        Pillar Balance: High
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          key: "aptitude",
                          label: "Clinical & Logic Aptitude",
                          desc: "Critical reasoning, ADR cause deduction, accuracy under pressure.",
                          score: breakdown.aptitude ?? 75,
                          color: "from-blue-600 to-sky-400",
                        },
                        {
                          key: "interest",
                          label: "Healthcare Interest Domain",
                          desc: "Affinity for drug safety, clinical documentation, and pharmacovigilance.",
                          score: breakdown.interest ?? 85,
                          color: "from-teal-600 to-emerald-400",
                        },
                        {
                          key: "background",
                          label: "Degree & Foundational Match",
                          desc: "Pharmacy / Life Sciences education alignment with employer expectations.",
                          score: breakdown.background ?? 80,
                          color: "from-violet-600 to-purple-400",
                        },
                        {
                          key: "commitment",
                          label: "Learning Timeline & Urgency",
                          desc: "Weekly dedicated hours (10-15h) and dedication to start employment.",
                          score: breakdown.commitment ?? 90,
                          color: "from-amber-600 to-yellow-400",
                        },
                      ].map((p) => (
                        <div key={p.key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-50 text-xs">{p.label}</span>
                            <span className="font-mono font-bold text-sm text-slate-200">
                              {p.score}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${p.color} transition-all duration-500`}
                              style={{ width: `${Math.max(5, Math.min(100, p.score))}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competency & Trait Scorecard */}
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-slate-50 font-serif">
                      Cognitive Trait &amp; Readiness Scorecard
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { key: "detail", label: "Detail Orientation", val: traitScores.detail ?? 80 },
                        { key: "logic", label: "Logic & Critical Deduction", val: traitScores.logic ?? 75 },
                        { key: "compliance", label: "Regulatory Compliance", val: traitScores.compliance ?? 85 },
                        { key: "screen", label: "Dual-Monitor Screen Stamina", val: traitScores.screen ?? 70 },
                        { key: "writing", label: "Narrative & Medical Writing", val: traitScores.writing ?? 75 },
                        { key: "pressure", label: "Strict Deadline Composure", val: traitScores.pressure ?? 80 },
                      ].map((t) => (
                        <div key={t.key} className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{t.label}</span>
                            <span className="font-mono font-bold text-blue-400">{t.val}</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${Math.max(8, Math.min(100, t.val))}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CAREER MATCHES & NOT-FIT */}
              {activeTab === "tracks" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Ranked Career Paths */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-50 font-serif">
                        Ranked Healthcare Career Matches
                      </h3>
                      <span className="font-mono text-xs text-slate-400">
                        Ranked from strongest alignment
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {topPaths.map((p: any, idx: number) => {
                        const title = typeof p === "string" ? p : p?.title || p?.slug || "Career Path";
                        const salary = typeof p === "object" && p?.salary ? p.salary : "₹4.5 – ₹7.0 LPA";
                        const rankFit = Math.max(50, fitScore - idx * 8);

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              idx === 0
                                ? "bg-blue-950/30 border-blue-500/40 shadow-md"
                                : "bg-slate-900/60 border-slate-800"
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-blue-400">
                                  #{idx + 1}
                                </span>
                                <h4 className="font-bold text-slate-50 text-sm">{title}</h4>
                                {idx === 0 && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                                    TOP RECOMMENDATION
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 font-sans max-w-xl">
                                Corporate desk role processing drug safety reports, Standardized Medical Coding, and expedited regulatory submissions.
                              </p>
                            </div>

                            <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0 font-mono text-right">
                              <span className="text-xs font-bold text-emerald-400">{salary}</span>
                              <span className="text-[11px] text-slate-400">
                                {rankFit}% Match
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* "Not Fit" Career Alert */}
                  <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Least Aligned Career Track (Avoid)</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-50 text-sm">
                        {notFitArchetype?.name || "Retail Counter Pharmacy & Field Medical Sales"}
                      </h4>
                      <p className="text-xs text-rose-100 leading-relaxed font-sans">
                        Based on the candidate's answers, customer-facing retail dispensing or target-driven sales represents the highest risk of burnout and compensation stagnation.
                      </p>
                    </div>

                    {notFitReasons.length > 0 && (
                      <ul className="space-y-1 pt-2 border-t border-rose-500/20 text-xs text-rose-400 font-sans">
                        {notFitReasons.map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Risks Alert */}
                  {risks.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                      <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        Watch-Outs for Admissions Counsellor:
                      </span>
                      <ul className="space-y-1 text-xs text-amber-100">
                        {risks.map((r: any, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">⚠️</span>
                            <span>{typeof r === "string" ? r : r.text || r.message}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AI 90-DAY CURRICULUM */}
              {activeTab === "curriculum" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Skill Gaps */}
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                      <Brain className="w-4 h-4" />
                      <span>Identified Skill Gaps to Bridge</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(aiAnalysis?.skillGaps || [
                        "Standardized Medical Coding & Global Medicinal Product Dictionaries Terminology Coding",
                        "CIOMS I & MedWatch Narrative Formulation",
                        "Enterprise Safety Database Database Workflow Simulation",
                        "Expedited Regulatory Reporting Clocks (ICH E2B/E2D)",
                      ]).map((gap, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-400/25 text-blue-200 text-xs font-mono font-medium"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 90-Day Study Plan */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-50 font-serif">
                      Tailored 12-Week Pharmacovigilance Pathway
                    </h3>

                    <div className="space-y-2.5">
                      {[
                        {
                          phase: "Phase 1 · Weeks 1–4",
                          title: "Foundations & Triage Mechanics",
                          desc: "Adverse event classification, regulatory frameworks (ICH GCP, FDA 21 CFR 312), and valid case triage criteria.",
                        },
                        {
                          phase: "Phase 2 · Weeks 5–8",
                          title: "Applied Case Processing & Coding",
                          desc: "Standardized Medical Coding LLT/PT coding, seriousness assessment, causality algorithms (WHO-UMC/Naranjo), and narrative drafting.",
                        },
                        {
                          phase: "Phase 3 · Weeks 9–12",
                          title: "Expedited Reporting & Portfolio Defence",
                          desc: "E2B(R3) transmission, 7/15-day expedited clock management, dossier signoff, and hiring manager interview preparation.",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                          <span className="font-mono text-[10.5px] uppercase font-bold text-blue-400 block">
                            {item.phase}
                          </span>
                          <h4 className="font-bold text-slate-50 text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-400 font-sans leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Salary Projection */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-teal-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10.5px] uppercase font-bold text-emerald-400 block">
                        ESTIMATED POST-PROGRAMME STARTING SALARY
                      </span>
                      <span className="text-2xl font-mono font-bold text-slate-50 mt-1 block">
                        {aiAnalysis?.estimatedSalary || "₹4,20,000 – ₹6,00,000 LPA"}
                      </span>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        Compared to average retail pharmacy starting package of ₹1.8 – ₹2.4 LPA.
                      </p>
                    </div>
                    <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0 opacity-80" />
                  </div>
                </div>
              )}

              {/* TAB 5: QUESTION-BY-QUESTION AUDIT */}
              {activeTab === "questions" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={questionSearch}
                        onChange={(e) => setQuestionSearch(e.target.value)}
                        placeholder="Search questions or answers…"
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-slate-700/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                      {[
                        { id: "all", label: "All Questions" },
                        { id: "scenario", label: "Scenarios" },
                        { id: "behaviour", label: "Behaviour" },
                        { id: "micro", label: "Micro-Tasks" },
                        { id: "profile", label: "Profile" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setQuestionCategory(cat.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition whitespace-nowrap ${
                            questionCategory === cat.id
                              ? "bg-blue-500 text-slate-50 font-bold"
                              : "bg-slate-900/60 text-slate-400 hover:text-slate-100"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Cards */}
                  {filteredAnswers.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No question responses match your search.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredAnswers.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5 transition hover:border-slate-700"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="font-mono text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                                {item.kind.toUpperCase()} · #{idx + 1} ({item.questionId})
                              </span>
                              <h4 className="text-xs sm:text-sm font-semibold text-slate-50 leading-relaxed">
                                {item.prompt}
                              </h4>
                            </div>

                            {item.correct !== undefined && (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                                  item.correct
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                }`}
                              >
                                {item.correct ? "CORRECT" : "INCORRECT"}
                              </span>
                            )}
                          </div>

                          {/* Selected Option */}
                          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 flex items-start gap-2.5">
                            <span className="text-blue-400 font-bold shrink-0 text-xs">→ Selected:</span>
                            <span className="text-xs text-slate-200 font-medium">
                              {item.chosenLabel}
                            </span>
                          </div>

                          {/* Reveals / Insight */}
                          {item.reveals && (
                            <p className="text-[11px] text-slate-400 italic font-sans">
                              💡 <span className="font-medium text-slate-300">Reveals:</span> {item.reveals}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
