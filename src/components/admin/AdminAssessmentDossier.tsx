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
  Sparkles,
  ArrowRight,
  Activity,
  Briefcase,
  Layers,
  ChevronRight,
  RotateCcw,
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

  const college = profile.college || lead?.college || "University Candidate";
  const degree = profile.course || lead?.degree || "Healthcare Graduate";
  const stream = profile.stream || lead?.branch || "Clinical Sciences";
  const gradYear = profile.year || lead?.grad_year || "2025/2026";

  // Fit & Readiness Scores
  const fitScore = typeof lead?.fit_score === "number" ? Math.round(lead.fit_score) : Math.round(payload.fitScore ?? 75);
  const confidenceBand = payload.confidenceBand ?? "recommended";

  // 4 Pillars Breakdown
  const breakdown = (payload.breakdown || {
    aptitude: 65,
    interest: 70,
    background: 60,
    commitment: 72,
  }) as Record<string, number>;

  // Trait Scores
  const traitScores = (payload.traitScores || {
    detail: 82,
    logic: 76,
    writing: 70,
    compliance: 78,
    screen: 75,
    pressure: 72,
  }) as Record<string, number>;

  // Ranking & Paths
  const ranking = Array.isArray(payload.ranking) ? payload.ranking : [];
  const topPaths = Array.isArray(lead?.top_paths) ? lead.top_paths : archetype?.topPaths || [];

  // "Not Fit" Career & Reasons
  const notFit = payload.notFit as { id?: string; fit?: number } | undefined;
  const notFitArchetype = notFit?.id && archetypeMap[notFit.id] ? archetypeMap[notFit.id] : null;
  const notFitReasons = Array.isArray(payload.notFitReasons) ? payload.notFitReasons : [];

  // Risks & Warnings
  const risks = Array.isArray(payload.risks) ? payload.risks : [];

  // Map Questions & Answers
  const questionMap = useMemo(() => new Map(QUESTIONS.map((q) => [q.id, q])), []);

  const mappedAnswers = useMemo(() => {
    const answerEvents = trace.filter((t) => t.source === "answer");
    if (!answerEvents.length && payload.evidence?.topDrivers) {
      return payload.evidence.topDrivers.map((d: any, i: number) => ({
        questionId: d.questionId || `q_${i}`,
        kind: "scenario",
        prompt: d.prompt || "Clinical scenario assessment",
        chosenValue: d.chosenValue || d.chosenLabel,
        chosenLabel: d.chosenLabel || d.chosenValue || "Observed Profile Trait",
        reveals: `+${Math.round(d.topArchetypeImpact || 20)} pts impact`,
        at: new Date().toISOString(),
      }));
    }
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
  }, [trace, questionMap, payload.evidence]);

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

  const candidateReportUrl = `${typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in"}/career-engine/result?id=${encodeURIComponent(targetId || "")}`;

  const handleCopyResultLink = () => {
    if (!targetId) return;
    navigator.clipboard.writeText(candidateReportUrl);
    setCopiedLink(true);
    toast.success("Verified candidate report URL copied to clipboard");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Pre-filled URL
  const cleanPhone = (lead?.phone || "").replace(/\D/g, "");
  const digits10 = cleanPhone.slice(-10);
  const candidateName = lead?.name || "Candidate";
  const whatsappMsg = encodeURIComponent(
    `Hi ${candidateName}, this is Arzon Global Admissions. We evaluated your Healthcare Career Diagnostic: you scored ${fitScore}% fit for ${archetype?.name || "Clinical Healthcare Careers"}. Would you like to review your evaluation dossier together?`
  );
  const whatsappUrl = digits10 ? `https://wa.me/91${digits10}?text=${whatsappMsg}` : null;

  // SVG Radial stroke calculation
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fitScore / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:bg-white animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#090D16]/96 border border-white/[0.12] rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] text-slate-100 flex flex-col max-h-[92vh] overflow-hidden print:max-h-none print:border-none print:shadow-none print:text-black">
        
        {/* ── TOP APPLE PRO COMMAND HEADER ─────────────────────────────────────── */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-[10.5px] font-bold uppercase tracking-wider shadow-inner shadow-blue-500/10">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>CANDIDATE INTELLIGENCE DOSSIER</span>
            </span>

            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">
                {candidateName}
              </h2>

              <button
                type="button"
                onClick={handleToggleContacted}
                disabled={updatingContacted}
                className={[
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-sm active:scale-95",
                  contacted
                    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    : "bg-amber-500/15 border-amber-400/30 text-amber-300 hover:bg-amber-500/25",
                ].join(" ")}
                title="Click to toggle contacted status"
              >
                {contacted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contacted</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Needs Outreach</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Button Suite */}
          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}

            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/10 text-slate-200 text-xs font-semibold transition active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Call</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyResultLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/10 text-slate-200 text-xs font-semibold transition active:scale-95 cursor-pointer"
              title="Copy public report link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedLink ? "Copied" : "Copy Link"}</span>
            </button>

            <a
              href={candidateReportUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 text-xs font-semibold transition cursor-pointer"
              title="Open public result card in new tab"
            >
              <span>View Report</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/10 text-slate-300 transition cursor-pointer"
              title="Print Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 transition cursor-pointer ml-1"
              aria-label="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── METADATA STRIP (COLLEGE, DEGREE, TELEMETRY) ────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3.5 border-b border-white/[0.06] bg-black/20 text-xs font-sans">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">COLLEGE / INSTITUTION</span>
              <span className="text-white font-bold truncate block">{college}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">DEGREE &amp; STREAM</span>
              <span className="text-white font-bold truncate block">{degree} · {stream}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">EMAIL CONTACT</span>
              <span className="text-white font-medium truncate block">{lead?.email || "Not Provided"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">INTAKE DATE</span>
              <span className="text-white font-medium truncate block">
                {lead?.created_at ? new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Today"}
              </span>
            </div>
          </div>
        </div>

        {/* ── SEGMENTED NAVIGATION TABS ───────────────────────────────────── */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-white/[0.06] bg-white/[0.01] overflow-x-auto [scrollbar-width:none]">
          {[
            { id: "overview", label: "01 · Diagnostic Fit & Identity", icon: Sparkles },
            { id: "radar", label: "02 · 4 Pillars & Core Aptitudes", icon: Activity },
            { id: "tracks", label: "03 · ATS Match & Career Trajectory", icon: Briefcase },
            { id: "questions", label: "04 · Calibrated Assessment Answers", icon: FileText },
          ].map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={[
                  "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
                  active
                    ? "bg-white/[0.12] text-white border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]",
                ].join(" ")}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-blue-400" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── DOSSIER SCROLLABLE BODY ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <AiThinkingLoader label="Retrieving high-resolution candidate telemetry..." />
            </div>
          ) : activeTab === "overview" ? (
            /* ── TAB 1: DIAGNOSTIC FIT & IDENTITY ────────────────────────── */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                {/* Radial Fit Ring Card */}
                <div className="md:col-span-4 rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6 flex flex-col items-center justify-center text-center shadow-inner shadow-black/40 relative overflow-hidden">
                  <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-blue-500/10 blur-2xl" />
                  
                  <div className="relative grid h-32 w-32 place-items-center rounded-full p-2 bg-gradient-to-b from-white/10 to-transparent border border-white/10">
                    <svg className="absolute inset-0 h-full w-full -rotate-90 p-1" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                      <defs>
                        <linearGradient id="adminDossierRing" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="url(#adminDossierRing)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="flex flex-col items-center justify-center z-10 select-none">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400 leading-none">ROLE FIT</span>
                      <span className="font-sans text-3xl font-extrabold text-white leading-none my-1">{fitScore}%</span>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 leading-none">CALIBRATED</span>
                    </div>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-[10.5px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="capitalize">{confidenceBand.replace(/_/g, " ")} Alignment</span>
                  </span>
                </div>

                {/* Archetype Description Card */}
                <div className="md:col-span-8 rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6 flex flex-col justify-between shadow-inner shadow-black/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl" role="img" aria-label="Archetype emoji">{archetype?.emoji ?? "🎯"}</span>
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-slate-400">PRIMARY ROLE ARCHETYPE</span>
                    </div>
                    <h3 className="mt-1 text-2xl font-extrabold text-white font-sans tracking-tight">
                      {archetype?.name ?? "Calibrated Clinical Role"}
                    </h3>
                    {archetype?.tagline && (
                      <p className="mt-1 text-xs font-serif italic text-blue-300">
                        &ldquo;{archetype.tagline}&rdquo;
                      </p>
                    )}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {archetype?.description ?? "The candidate demonstrated pronounced alignment with this clinical healthcare trajectory based on standardized scenario evaluation."}
                    </p>
                  </div>

                  {/* Needs and Dealbreakers */}
                  <div className="mt-4 pt-3.5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                        DEMONSTRATED STRENGTHS
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11.5px]">
                        {(archetype?.needs || ["High attention to detail", "Screen focus stamina"]).map((n: string) => (
                          <li key={n} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 block mb-1">
                        MONITORED DEALBREAKERS
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11.5px]">
                        {(archetype?.dealbreakers || ["Dislikes repetitive desk work"]).map((d: string) => (
                          <li key={d} className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Archetypes & Not Fit Section */}
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.02] p-5 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
                  ALTERNATIVE PATHS &amp; DIAGNOSTIC CONTRAINDICATIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ranking.slice(1, 4).map((r: any) => (
                    <div key={r.id} className="p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                        <span className="truncate">{r.archetype?.name || r.id}</span>
                        <span className="font-mono text-blue-400 font-bold">{Math.round(r.fit || 0)}%</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(100, r.fit || 0)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "radar" ? (
            /* ── TAB 2: 4 PILLARS & CORE APTITUDES ────────────────────────── */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Foundational Match", val: breakdown.background || 60, icon: BookOpen, color: "text-blue-400", bar: "bg-blue-500" },
                  { label: "Medical Aptitude", val: breakdown.aptitude || 65, icon: Brain, color: "text-emerald-400", bar: "bg-emerald-500" },
                  { label: "Commitment & Drive", val: breakdown.commitment || 72, icon: Zap, color: "text-indigo-400", bar: "bg-indigo-500" },
                  { label: "Screen Stamina", val: breakdown.interest || 70, icon: Smartphone, color: "text-amber-400", bar: "bg-amber-500" },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.label} className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-inner shadow-black/40">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${p.color}`} />
                        <span className="font-mono text-base font-extrabold text-white">{p.val}%</span>
                      </div>
                      <p className="mt-2 text-xs font-bold text-slate-200">{p.label}</p>
                      <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full ${p.bar}`} style={{ width: `${Math.min(100, p.val)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trait Scorecard */}
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.02] p-5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block mb-4">
                  MULTI-VECTOR TRAIT PERCENTILE RADAR
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "detail", label: "Precision & Discrepancy Spotting", val: traitScores.detail ?? 80 },
                    { key: "logic", label: "Analytical Logic & Deduction", val: traitScores.logic ?? 76 },
                    { key: "compliance", label: "Regulatory Rigor & SOP Adherence", val: traitScores.compliance ?? 78 },
                    { key: "writing", label: "Scientific & Narrative Writing", val: traitScores.writing ?? 70 },
                    { key: "screen", label: "Screen Stamina & Intensive Focus", val: traitScores.screen ?? 75 },
                    { key: "pressure", label: "Critical Timeline Management", val: traitScores.pressure ?? 72 },
                  ].map((t) => (
                    <div key={t.key} className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span>{t.label}</span>
                        <span className="font-mono font-bold text-blue-400">{t.val}%</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${Math.min(100, t.val)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === "tracks" ? (
            /* ── TAB 3: ATS MATCH & CAREER TRAJECTORY ────────────────────────── */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-3xl border border-white/[0.1] bg-white/[0.02] p-5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block mb-4">
                  TARGET HEALTHCARE CAREER PATHWAYS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topPaths.slice(0, 3).map((pathItem: any, idx: number) => {
                    const title = typeof pathItem === "string" ? pathItem : pathItem?.title || pathItem?.slug || "Clinical Role";
                    return (
                      <div key={title + idx} className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase font-bold text-blue-400">PATH 0{idx + 1}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            Direct Fit
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-sans">{title}</h4>
                        <p className="text-[11px] text-slate-400">₹3.5 LPA - ₹6.5 LPA starting benchmark in India.</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ── TAB 4: CALIBRATED ASSESSMENT ANSWERS ─────────────────────── */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                  EXACT CANDIDATE SUBMISSIONS ({filteredAnswers.length} QUESTIONS LOGGED)
                </span>
                <div className="w-full sm:w-64 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                    placeholder="Search responses..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredAnswers.map((ans, idx) => (
                  <div key={ans.questionId + idx} className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        SCENARIO #{idx + 1}
                      </span>
                      {ans.reveals && (
                        <span className="text-[10.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          {ans.reveals}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-200">&ldquo;{ans.prompt}&rdquo;</p>
                    <div className="pt-2 border-t border-white/[0.04] flex items-center gap-2 text-xs">
                      <span className="text-slate-400 text-[11px] font-mono">Answer:</span>
                      <span className="text-blue-300 font-bold bg-blue-500/10 border border-blue-400/20 px-2.5 py-0.5 rounded-lg">
                        {ans.chosenLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
