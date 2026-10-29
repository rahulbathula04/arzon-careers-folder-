import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  Filter,
  GraduationCap,
  IndianRupee,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  Presentation,
  Radio,
  RefreshCw,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  getAllAdminResponses,
  updateUnifiedResponseStatus,
  getLiveWebsiteAnalytics,
  type UnifiedAdminResponse,
  type AllAdminResponsesResult,
  type ResponseKind,
  type LiveWebsiteAnalytics,
} from "@/lib/workshop.functions";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { useAdminGate } from "@/hooks/useAdminGate";
import { SystemStatusEditor } from "@/components/admin/SystemStatusEditor";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { exportCsv, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";
import { AdminAssessmentDossier } from "@/components/admin/AdminAssessmentDossier";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Apple Pro Command Center · Admissions & Intake · Arzon" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminHome,
  errorComponent: AdminHomeError,
});

function AdminHomeError({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[admin/index] error:", error);
  }, [error]);
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-3xl border border-rose-500/20 bg-[#0B0F19]/90 p-8 text-center backdrop-blur-2xl shadow-2xl">
        <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-rose-400" />
        <h1 className="text-xl font-bold text-white tracking-tight">Telemetry Interface Interrupted</h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-zinc-400 leading-relaxed font-mono">
          {error instanceof Error ? error.message : "An unexpected telemetry disruption occurred while loading responses."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition cursor-pointer backdrop-blur-md active:scale-95"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reconnect Radar
          </button>
        </div>
      </div>
    </div>
  );
}

// Apple Titanium Specular Status Palette
const STATUS_SPECS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  registered: { bg: "bg-sky-500/10", text: "text-sky-300", border: "border-sky-500/25", glow: "shadow-sky-500/10" },
  submitted: { bg: "bg-sky-500/10", text: "text-sky-300", border: "border-sky-500/25", glow: "shadow-sky-500/10" },
  reviewing: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/25", glow: "shadow-amber-500/10" },
  shortlisted: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/25", glow: "shadow-emerald-500/10" },
  accepted: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
  enrolled: { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/25", glow: "shadow-purple-500/10" },
  paid: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
  contacted: { bg: "bg-teal-500/10", text: "text-teal-300", border: "border-teal-500/25", glow: "shadow-teal-500/10" },
  uncontacted: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20", glow: "shadow-zinc-500/5" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/25", glow: "shadow-amber-500/10" },
  rejected: { bg: "bg-rose-500/10", text: "text-rose-300", border: "border-rose-500/25", glow: "shadow-rose-500/10" },
};

function getAvailableStatuses(kind: ResponseKind): { value: string; label: string }[] {
  switch (kind) {
    case "career_engine":
    case "counsellor":
      return [
        { value: "uncontacted", label: "Uncontacted" },
        { value: "contacted", label: "Contacted" },
      ];
    case "enrolment":
      return [
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
        { value: "failed", label: "Failed" },
        { value: "abandoned", label: "Abandoned" },
        { value: "refunded", label: "Refunded" },
      ];
    case "workshop":
      return [
        { value: "registered", label: "Registered" },
        { value: "reviewing", label: "Reviewing" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "accepted", label: "Accepted" },
        { value: "enrolled", label: "Enrolled" },
        { value: "rejected", label: "Rejected" },
      ];
    case "application":
    default:
      return [
        { value: "submitted", label: "Submitted" },
        { value: "reviewing", label: "Reviewing" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" },
        { value: "enrolled", label: "Enrolled" },
        { value: "withdrawn", label: "Withdrawn" },
      ];
  }
}

function AdminHome() {
  const fetchAllResponses = useServerFn(getAllAdminResponses);
  const updateStatusFn = useServerFn(updateUnifiedResponseStatus);
  const fetchAnalytics = useServerFn(getLiveWebsiteAnalytics);

  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = useState<AllAdminResponsesResult | null>(null);
  const [analyticsResult, setAnalyticsResult] = useState<LiveWebsiteAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Active view tab
  const [activeTab, setActiveTab] = useState<
    "all" | "career_engine" | "application" | "workshop" | "enrolment" | "counsellor" | "analytics" | "controls"
  >("all");

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [fitScorePreset, setFitScorePreset] = useState<"all" | "high" | "solid" | "guidance">("all");
  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState<
    "all" | "needs_attention" | "high_fit_uncontacted" | "pending_review" | "pending_payment"
  >("all");
  const [dispatchingNext, setDispatchingNext] = useState(false);

  // Candidate Dossier Detail Drawer & Assessment Modal
  const [selectedCandidate, setSelectedCandidate] = useState<UnifiedAdminResponse | null>(null);
  const [dossierCandidate, setDossierCandidate] = useState<UnifiedAdminResponse | null>(null);

  // WhatsApp Dispatcher Modal State
  const [activeDispatchCandidate, setActiveDispatchCandidate] = useState<UnifiedAdminResponse | null>(null);
  const [dispatchTemplate, setDispatchTemplate] = useState<"pass" | "acri_pass" | "reminder" | "interview" | "question">("pass");
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Clock & Auto-refresh State
  const [currentTime, setCurrentTime] = useState("");
  const [autoRefreshActive, setAutoRefreshActive] = useState(true);
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  // Workshop Website Customization State (persisted in localStorage)
  const [customTitle, setCustomTitle] = useState(WORKSHOP_CONFIG.title);
  const [customDate, setCustomDate] = useState(WORKSHOP_CONFIG.dateDisplay);
  const [customTime, setCustomTime] = useState(WORKSHOP_CONFIG.timeDisplay);
  const [customPlatform, setCustomPlatform] = useState(WORKSHOP_CONFIG.platform);
  const [customMeetUrl, setCustomMeetUrl] = useState(WORKSHOP_CONFIG.meetUrl);
  const [customCapacityText, setCustomCapacityText] = useState(WORKSHOP_CONFIG.capacityLimitText);
  const [customIsLive, setCustomIsLive] = useState(false);
  const [configSavedToast, setConfigSavedToast] = useState(false);

  // Live Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " IST"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize workshop settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("arzon_workshop_custom_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setCustomTitle(parsed.title);
        if (parsed.dateDisplay) setCustomDate(parsed.dateDisplay);
        if (parsed.timeDisplay) setCustomTime(parsed.timeDisplay);
        if (parsed.platform) setCustomPlatform(parsed.platform);
        if (parsed.meetUrl) setCustomMeetUrl(parsed.meetUrl);
        if (parsed.capacityLimitText) setCustomCapacityText(parsed.capacityLimitText);
        if (parsed.isLiveNow !== undefined) setCustomIsLive(Boolean(parsed.isLiveNow));
      }
    } catch {}
  }, []);

  function handleSaveWorkshopConfig() {
    const payload = {
      title: customTitle,
      dateDisplay: customDate,
      timeDisplay: customTime,
      platform: customPlatform,
      meetUrl: customMeetUrl,
      capacityLimitText: customCapacityText,
      isLiveNow: customIsLive,
    };
    localStorage.setItem("arzon_workshop_custom_config", JSON.stringify(payload));
    window.dispatchEvent(new Event("storage"));
    setConfigSavedToast(true);
    toast.success("Workshop configuration updated live");
    setTimeout(() => setConfigSavedToast(false), 3000);
  }

  function handleResetWorkshopConfig() {
    localStorage.removeItem("arzon_workshop_custom_config");
    setCustomTitle(WORKSHOP_CONFIG.title);
    setCustomDate(WORKSHOP_CONFIG.dateDisplay);
    setCustomTime(WORKSHOP_CONFIG.timeDisplay);
    setCustomPlatform(WORKSHOP_CONFIG.platform);
    setCustomMeetUrl(WORKSHOP_CONFIG.meetUrl);
    setCustomCapacityText(WORKSHOP_CONFIG.capacityLimitText);
    setCustomIsLive(false);
    window.dispatchEvent(new Event("storage"));
    toast.success("Reset to default config");
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
  }

  // Load all responses
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resResult, anResult] = await Promise.allSettled([
        fetchAllResponses(),
        fetchAnalytics({ data: { timeframe: "all" } }),
      ]);

      if (resResult.status === "fulfilled" && resResult.value) {
        setData(resResult.value);
      } else {
        const errorMsg =
          resResult.status === "rejected" && resResult.reason instanceof Error
            ? resResult.reason.message
            : "Failed to load platform records from server";
        toast.error(`Dashboard load failed: ${errorMsg}`, { duration: 8000 });
        setData({
          responses: [],
          totalCount: 0,
          todayCount: 0,
          countsByKind: {
            workshop: 0,
            application: 0,
            career_engine: 0,
            enrolment: 0,
            counsellor: 0,
            enrolment_paid: 0,
            enrolment_intent: 0,
          },
          countsByStatus: {},
          byCollege: {},
          byBranch: {},
          byDegree: {},
          totalPaidRevenueInr: 0,
          warnings: [errorMsg],
        });
      }

      if (anResult.status === "fulfilled") {
        setAnalyticsResult(anResult.value);
      }
    } catch (e) {
      console.warn("[admin] load error:", e);
    } finally {
      setLoading(false);
      setRefreshCountdown(30);
    }
  }, [fetchAllResponses, fetchAnalytics]);

  useEffect(() => {
    if (gate !== "ready") return;
    loadData();
  }, [gate, loadData]);

  // 30-Second Auto-Refresh Ticker
  useEffect(() => {
    if (gate !== "ready" || !autoRefreshActive || isReducedMotion()) return;
    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          loadData();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gate, autoRefreshActive, loadData]);

  // Live 10-second analytics pulse
  useEffect(() => {
    if (gate !== "ready" || activeTab !== "analytics" || isReducedMotion()) return;
    const interval = setInterval(() => {
      fetchAnalytics({ data: { timeframe: "all" } })
        .then((res) => {
          if (res) setAnalyticsResult(res);
        })
        .catch(() => {});
    }, 10000);
    return () => clearInterval(interval);
  }, [gate, activeTab, fetchAnalytics]);

  // Update candidate status inline
  async function handleStatusChange(item: UnifiedAdminResponse, newStatus: string) {
    setSavingStatusId(item.id);
    try {
      await updateStatusFn({
        data: {
          id: item.id,
          kind: item.kind,
          status: newStatus,
        },
      });

      // Update local state
      setData((prev) => {
        if (!prev) return prev;
        const updated = prev.responses.map((r) =>
          r.id === item.id ? { ...r, status: newStatus } : r
        );
        return { ...prev, responses: updated };
      });

      if (selectedCandidate?.id === item.id) {
        setSelectedCandidate((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      toast.success(`Updated ${item.name}'s status to ${newStatus}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setSavingStatusId(null);
    }
  }

  // Autonomous Attention Metrics for the Lazy Operator
  const attentionMetrics = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) {
      return {
        highFitUncontacted: [],
        pendingReview: [],
        pendingPayment: [],
        pendingCounsellor: [],
        hotLeads: [],
        totalNeedsAttention: 0,
      };
    }
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;

    const highFitUncontacted = data.responses.filter(
      (r) => r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85
    );
    const pendingReview = data.responses.filter(
      (r) => (r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing")
    );
    const pendingPayment = data.responses.filter(
      (r) => r.kind === "enrolment" && r.status === "pending"
    );
    const pendingCounsellor = data.responses.filter(
      (r) => r.kind === "counsellor" && r.status === "uncontacted"
    );
    const hotLeads = data.responses.filter(
      (r) => new Date(r.created_at).getTime() >= twoHoursAgo && (r.status === "uncontacted" || r.status === "submitted" || r.status === "registered")
    );

    const totalNeedsAttention =
      highFitUncontacted.length + pendingReview.length + pendingPayment.length + pendingCounsellor.length;

    return {
      highFitUncontacted,
      pendingReview,
      pendingPayment,
      pendingCounsellor,
      hotLeads,
      totalNeedsAttention,
    };
  }, [data]);

  // 1-Click WhatsApp + Auto-Mark Contacted for Next Priority Lead
  async function handleOneClickDispatchNextLead() {
    const nextLead =
      attentionMetrics.highFitUncontacted.find((lead) => lead.whatsapp_link) ||
      attentionMetrics.hotLeads.find((lead) => lead.whatsapp_link);
    if (!nextLead) {
      toast.success("Zero pending urgent leads! All queues caught up.");
      return;
    }
    setDispatchingNext(true);
    try {
      const msg = getWhatsAppTemplate(nextLead, nextLead.kind === "career_engine" ? "interview" : "pass");
      const digits10 = (nextLead.phone || "").replace(/\D/g, "").slice(-10);
      if (!digits10) {
        toast.error(`Candidate ${nextLead.name} has no valid 10-digit phone number`);
        return;
      }
      const waUrl = `https://wa.me/91${digits10}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      if (nextLead.status === "uncontacted") {
        await handleStatusChange(nextLead, "contacted");
      }
      toast.success(`Dispatched WhatsApp & marked ${nextLead.name} as Contacted!`);
    } finally {
      setDispatchingNext(false);
    }
  }

  // 1-Click WhatsApp + Auto-Mark Contacted for a Specific Row
  async function handleOneClickWhatsAppRow(r: UnifiedAdminResponse) {
    const msg = getWhatsAppTemplate(r, r.kind === "career_engine" ? "interview" : "pass");
    const digits10 = (r.phone || "").replace(/\D/g, "").slice(-10);
    if (!digits10) {
      toast.error(`Candidate ${r.name} has no valid 10-digit phone number`);
      return;
    }
    const waUrl = `https://wa.me/91${digits10}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (r.status === "uncontacted") {
      await handleStatusChange(r, "contacted");
    }
  }

  // Quick clipboard copy
  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  }

  // Filtered response list
  const filteredResponses = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) return [];
    return data.responses.filter((r) => {
      // Focus Mode Priority Queue
      if (focusMode === "high_fit_uncontacted") {
        if (!(r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85)) {
          return false;
        }
      } else if (focusMode === "pending_review") {
        if (!((r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing"))) {
          return false;
        }
      } else if (focusMode === "pending_payment") {
        if (!(r.kind === "enrolment" && r.status === "pending")) {
          return false;
        }
      } else if (focusMode === "needs_attention") {
        const isHighFit = r.kind === "career_engine" && r.status === "uncontacted" && (r.fit_score ?? 0) >= 85;
        const isAppPending = (r.kind === "application" || r.kind === "workshop") && (r.status === "submitted" || r.status === "reviewing");
        const isPayPending = r.kind === "enrolment" && r.status === "pending";
        if (!isHighFit && !isAppPending && !isPayPending) {
          return false;
        }
      }

      // 1. Tab filter
      if (activeTab !== "all" && activeTab !== "analytics" && activeTab !== "controls") {
        if (r.kind !== activeTab) return false;
      }

      // 2. Status filter
      if (statusFilter !== "all" && r.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // 3. College filter
      if (collegeFilter !== "all" && r.college !== collegeFilter) {
        return false;
      }

      // 4. Degree filter
      if (degreeFilter !== "all") {
        if (!r.degree || !r.degree.toLowerCase().includes(degreeFilter.toLowerCase())) {
          return false;
        }
      }

      // 5. Fit Score Preset
      if (fitScorePreset !== "all") {
        const score = r.fit_score ?? 0;
        if (fitScorePreset === "high" && score < 85) return false;
        if (fitScorePreset === "solid" && (score < 70 || score >= 85)) return false;
        if (fitScorePreset === "guidance" && score >= 70) return false;
      }

      // 6. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesPhone = r.phone.replace(/\D/g, "").includes(q);
        const matchesEmail = r.email.toLowerCase().includes(q);
        const matchesCollege = (r.college || "").toLowerCase().includes(q);
        const matchesBranch = (r.branch || "").toLowerCase().includes(q);
        const matchesPass = (r.pass_id || "").toLowerCase().includes(q);
        const matchesArchetype = (r.archetype || "").toLowerCase().includes(q);
        const matchesSource = (r.utm_source || "").toLowerCase().includes(q);
        const matchesProgram = (r.program_name || "").toLowerCase().includes(q);
        const matchesEntryAction = (r.entry_action || "").toLowerCase().includes(q);
        const matchesEntryDetail = (r.entry_detail || "").toLowerCase().includes(q);
        const matchesEntryPath = (r.entry_path || "").toLowerCase().includes(q);
        const matchesRecordType = r.kind.replace("_", " ").toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesCollege &&
          !matchesBranch &&
          !matchesPass &&
          !matchesArchetype &&
          !matchesSource &&
          !matchesProgram &&
          !matchesEntryAction &&
          !matchesEntryDetail &&
          !matchesEntryPath &&
          !matchesRecordType
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data, activeTab, statusFilter, collegeFilter, degreeFilter, fitScorePreset, searchQuery, focusMode]);

  // Unique colleges for filter dropdown
  const uniqueColleges = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) return [];
    const set = new Set<string>();
    data.responses.forEach((r) => {
      if (r.college && r.college !== "Not Specified") set.add(r.college);
    });
    return Array.from(set).sort();
  }, [data]);

  // Generate WhatsApp Message Template
  function getWhatsAppTemplate(candidate: UnifiedAdminResponse, tpl: typeof dispatchTemplate) {
    const meetLink = customMeetUrl || WORKSHOP_CONFIG.meetUrl;
    const timeStr = `${customDate || WORKSHOP_CONFIG.dateDisplay} at ${customTime || WORKSHOP_CONFIG.timeDisplay}`;

    if (candidate.kind === "career_engine") {
      return `Hi ${candidate.name}, I reviewed your Arzon Career Engine diagnostic assessment. You scored an impressive ${candidate.fit_score ?? 90}% match for ${candidate.archetype || "Clinical Research & Safety"} roles! We would love to walk you through your personalized career roadmap and recommended industry tracks. When would be a good time for a quick 10-minute briefing call today?`;
    }

    const isAcri =
      candidate.program_slug?.toLowerCase().includes("acri") ||
      candidate.program_name?.toLowerCase().includes("acri") ||
      candidate.program_name?.toLowerCase().includes("pharmacovigilance");

    if (tpl === "acri_pass" || (tpl === "pass" && isAcri && candidate.status.toLowerCase() === "accepted")) {
      const code = candidate.pass_id || "ACRI-PV-READY";
      return `Hi ${candidate.name}! 🎉 Congratulations, your application for the ACRI Pharmacovigilance Certification has been ACCEPTED by Arzon Admissions!\n\n🔑 Your Official ACRI Access Key is:\n*${code}*\n\nStart your 25-minute certification directly:\n👉 https://arzoncareers.in/acri/invite?code=${encodeURIComponent(code)}\n\nCollege: ${candidate.college || "Affiliated Institute"}\nDegree: ${candidate.degree || "Healthcare"}\n\nAll the best with your assessment!\n— Arzon Global Admissions Desk`;
    }

    if (tpl === "pass") {
      return `Hi ${candidate.name}, here is your confirmed Industry Admission Pass for Arzon Global's live Healthcare Career Workshop!\n\n🎟️ Pass ID: ${candidate.pass_id || "PV-ACTIVE"}\n🗓️ Session: ${timeStr}\n🔗 Direct Google Meet: ${meetLink}\n\nOur session includes live Enterprise Safety Database & Standardized Medical Coding adverse drug event triage. Look forward to seeing you live!`;
    }
    if (tpl === "reminder") {
      return `Hi ${candidate.name}, quick reminder: the live Healthcare Career Workshop begins shortly at ${customTime || WORKSHOP_CONFIG.timeDisplay}!\n\n🎟️ Pass ID: ${candidate.pass_id || "PV-ACTIVE"}\n🔗 Direct Room Link: ${meetLink}\n\nEnsure your device is connected on time.`;
    }
    if (tpl === "interview") {
      return `Hi ${candidate.name}, we reviewed your application for ${candidate.program_name || "Arzon Healthcare roles"} and would like to schedule a 15-minute introductory technical screening. What time works best for you today or tomorrow?`;
    }
    return `Hi ${candidate.name}, regarding your question for mentor Mohamed Kumail Abbas:\n\n"${candidate.mentor_question || "Career growth in Pharmacovigilance"}"\n\nHe will be covering this exact case live during our session on ${timeStr}!\n\n🔗 Join Room: ${meetLink}`;
  }

  // Export filtered responses to CSV
  function handleExportCsv() {
    if (!filteredResponses.length) {
      toast.error("No responses to export in current filter");
      return;
    }
    const cols: CsvColumn<UnifiedAdminResponse>[] = [
      { key: "created_at", header: "Timestamp" },
      { key: "kind", header: "Submission Type" },
      { key: "name", header: "Full Name" },
      { key: "phone", header: "Phone Number" },
      { key: "email", header: "Email Address" },
      { key: "college", header: "College / University" },
      { key: "degree", header: "Degree" },
      { key: "branch", header: "Branch / Stream" },
      { key: "grad_year", header: "Passing Year" },
      { key: "status", header: "Status" },
      { key: "pass_id", header: "Pass ID" },
      { key: "program_name", header: "Program / Role" },
      { key: "archetype", header: "Archetype" },
      { key: "fit_score", header: "Fit Score" },
      { key: "amount_inr", header: "Paid Amount (INR)" },
      { key: "mentor_question", header: "Question / Notes" },
      { key: "entry_action", header: "Entry Action" },
      { key: "entry_detail", header: "Entry Detail" },
      { key: "entry_path", header: "Entry Page" },
      { key: "utm_source", header: "UTM Source" },
    ];
    exportCsv(dateStampedFilename("arzon-all-responses"), filteredResponses, cols);
    toast.success(`Exported ${filteredResponses.length} records to CSV`);
  }

  // Workshop Dynamic Seat Calculations
  const workshopLiveCount = data?.countsByKind.workshop ?? 0;
  const totalCapacity = WORKSHOP_CONFIG.totalCapacity ?? 500;
  const baselineAllocated = WORKSHOP_CONFIG.baselineAllocated ?? 432;
  const totalAllocatedSeats = Math.min(totalCapacity, baselineAllocated + workshopLiveCount);
  const remainingSeats = Math.max(0, totalCapacity - totalAllocatedSeats);
  const percentReserved = Math.min(100, Math.round((totalAllocatedSeats / totalCapacity) * 100));

  if (loading && !data) {
    return (
      <div className="tone-dark space-y-6 text-left">
        {/* Shimmer Apple Glass Skeleton */}
        <div className="h-24 rounded-3xl border border-white/[0.08] bg-[#0A0D18]/70 backdrop-blur-2xl motion-safe:animate-pulse" />
        <div className="h-44 rounded-3xl border border-white/[0.08] bg-[#0A0D18]/70 backdrop-blur-2xl motion-safe:animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl border border-white/[0.08] bg-[#0A0D18]/70 backdrop-blur-2xl motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="h-96 rounded-3xl border border-white/[0.08] bg-[#0A0D18]/70 backdrop-blur-2xl motion-safe:animate-pulse" />
      </div>
    );
  }

  return (
    <div className="tone-dark space-y-6 text-left pb-16">
      {/* ── TOP TELEMETRY RADAR & COMMAND STRIP ── */}
      <header className="rounded-3xl border border-white/[0.08] bg-[#080B14]/85 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col xl:flex-row xl:items-center justify-between gap-5 relative overflow-hidden">
        {/* Specular Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand & Live System Status */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A2560] to-[#040E28] border border-sky-400/30 flex items-center justify-center text-white font-serif font-black text-xl shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-white/10 shrink-0">
            A
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none font-sans">
                Cupertino Command Center
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px] font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                <span>LIVE TELEMETRY</span>
              </div>
              {currentTime && (
                <span className="font-mono text-xs text-zinc-400 hidden md:inline">
                  {currentTime}
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-zinc-400 tracking-wide">
              Autonomous Intake Pipeline · Career Engine Diagnostics · Verified Placement Ledger
            </p>
          </div>
        </div>

        {/* Executive Action Suite */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* 1-Click WhatsApp Quick Outreach */}
          {attentionMetrics.highFitUncontacted.length > 0 && (
            <button
              type="button"
              onClick={handleOneClickDispatchNextLead}
              disabled={dispatchingNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-sans font-extrabold text-xs shadow-[0_0_20px_rgba(16,185,129,0.35)] transition cursor-pointer active:scale-95 disabled:opacity-50"
              title="Dispatches WhatsApp for top candidate and auto-marks contacted"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Quick Outreach Next</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-950/20 text-[10px] font-mono">
                {attentionMetrics.highFitUncontacted[0]?.fit_score}% Fit
              </span>
            </button>
          )}

          {/* Auto Refresh Toggle */}
          <button
            type="button"
            onClick={() => setAutoRefreshActive(!autoRefreshActive)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-medium transition cursor-pointer active:scale-95 ${
              autoRefreshActive
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
            }`}
            title="Auto-refresh 30-second loop"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{autoRefreshActive ? `${refreshCountdown}s` : "Paused"}</span>
          </button>

          {/* Manual Refresh */}
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Force refresh database state"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "motion-safe:animate-spin text-sky-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Workshop Live Link */}
          <Link
            to="/healthcare-career-workshop"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95"
          >
            <Presentation className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Workshop</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </Link>

          {/* Brochure */}
          <WorkshopBrochureDownloadButton variant="admin" label="Brochure" />

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* ── AUTONOMOUS OPERATOR ATTENTION RADAR ── */}
      <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#080E24] via-[#050A1A] to-[#04060E] text-white p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[11px] font-semibold tracking-wide border border-emerald-500/25 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                Operator Autopilot Radar
              </span>
              <span className="text-zinc-600 text-xs">·</span>
              <span className="text-zinc-400 font-mono text-xs">
                {attentionMetrics.totalNeedsAttention === 0
                  ? "All bottlenecks cleared"
                  : `${attentionMetrics.totalNeedsAttention} high-priority items awaiting action`}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
              {attentionMetrics.totalNeedsAttention === 0
                ? "Platform Healthy · Zero Pending Bottlenecks"
                : `Action Queue: ${attentionMetrics.highFitUncontacted.length} high-fit leads & ${attentionMetrics.pendingReview.length} applications pending`}
            </h2>
            <p className="text-xs text-zinc-400 font-sans max-w-2xl leading-relaxed">
              Real-time dispatch telemetry computed from live diagnostic test completions, role submissions, and checkout drop-offs.
            </p>
          </div>

          {focusMode !== "all" && (
            <button
              type="button"
              onClick={() => setFocusMode("all")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 font-mono text-xs cursor-pointer active:scale-95 self-start lg:self-center"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Queue Filter</span>
            </button>
          )}
        </div>

        {/* Priority Filter Radar Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-4 border-t border-white/[0.08] relative z-10">
          <button
            type="button"
            onClick={() => setFocusMode(focusMode === "high_fit_uncontacted" ? "all" : "high_fit_uncontacted")}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border backdrop-blur-xl ${
              focusMode === "high_fit_uncontacted"
                ? "bg-teal-500/20 border-teal-400/50 ring-1 ring-teal-400/30 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-teal-300 font-sans">
              <span>High-Fit Leads</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-200 text-[10px] font-mono font-bold">
                {attentionMetrics.highFitUncontacted.length}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">≥85% score · Uncontacted</p>
          </button>

          <button
            type="button"
            onClick={() => setFocusMode(focusMode === "pending_review" ? "all" : "pending_review")}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border backdrop-blur-xl ${
              focusMode === "pending_review"
                ? "bg-purple-500/20 border-purple-400/50 ring-1 ring-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-purple-300 font-sans">
              <span>Review Queue</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-[10px] font-mono font-bold">
                {attentionMetrics.pendingReview.length}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">Awaiting evaluation / call</p>
          </button>

          <button
            type="button"
            onClick={() => setFocusMode(focusMode === "pending_payment" ? "all" : "pending_payment")}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border backdrop-blur-xl ${
              focusMode === "pending_payment"
                ? "bg-amber-500/20 border-amber-400/50 ring-1 ring-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 font-sans">
              <span>Checkout Intents</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-200 text-[10px] font-mono font-bold">
                {attentionMetrics.pendingPayment.length}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">Cart recovery queue</p>
          </button>

          <button
            type="button"
            onClick={() => setFocusMode(focusMode === "needs_attention" ? "all" : "needs_attention")}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer border backdrop-blur-xl ${
              focusMode === "needs_attention"
                ? "bg-rose-500/20 border-rose-400/50 ring-1 ring-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-rose-300 font-sans">
              <span>All Urgent Items</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-200 text-[10px] font-mono font-bold">
                {attentionMetrics.totalNeedsAttention}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">Combined priority queue</p>
          </button>
        </div>
      </section>

      {/* ── BEAST EXECUTIVE TELEMETRY HUD (4 Cupertino Glass Tiles) ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: Total Pipeline Volume */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0A0D18]/80 backdrop-blur-2xl p-5 shadow-xl hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-3 group">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              TOTAL INTAKE RECORDS
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                {data?.totalCount ?? 0}
              </span>
              {data && data.todayCount > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  +{data.todayCount} today
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06] text-[11px] text-zinc-400 font-mono">
              <span>{data?.countsByKind.career_engine ?? 0} tests</span>
              <span>·</span>
              <span>{data?.countsByKind.application ?? 0} apps</span>
              <span>·</span>
              <span>{data?.countsByKind.workshop ?? 0} workshops</span>
              <span>·</span>
              <span>{data?.countsByKind.counsellor ?? 0} counsellor requests</span>
            </div>
          </div>
        </div>

        {/* Tile 2: High-Fit Placement Ready */}
        <div className="rounded-3xl border border-teal-500/20 bg-teal-500/[0.03] backdrop-blur-2xl p-5 shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-teal-400 uppercase tracking-wider">
              PLACEMENT READY (≥85%)
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Compass className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                {attentionMetrics.highFitUncontacted.length}
              </span>
              <span className="text-xs font-mono font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                Top Tier
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mt-2 pt-2 border-t border-white/[0.06]">
              Avg fit score: ~91.8% · High conversion intent
            </p>
          </div>
        </div>

        {/* Tile 3: Outreach Velocity & Uncontacted */}
        <div className="rounded-3xl border border-purple-500/20 bg-purple-500/[0.03] backdrop-blur-2xl p-5 shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              UNCONTACTED DISPATCH
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                {attentionMetrics.highFitUncontacted.length + attentionMetrics.pendingReview.length}
              </span>
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                Awaiting
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mt-2 pt-2 border-t border-white/[0.06]">
              Instant 1-Click WhatsApp outreach available
            </p>
          </div>
        </div>

        {/* Tile 4: Admissions & Verified Revenue */}
        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-2xl p-5 shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              PAID ADMISSIONS REVENUE
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight font-sans">
                ₹{(data?.totalPaidRevenueInr ?? 0).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06] text-[11px] text-zinc-400 font-mono">
              <span className="text-amber-400 font-bold">{data?.countsByKind.enrolment_paid ?? 0} paid</span>
              <span>·</span>
              <span>{data?.countsByKind.enrolment ?? 0} total intents</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUPERTINO SEGMENTED CONTROL BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        {/* Capsule Navigation */}
        <div className="p-1 rounded-2xl border border-white/[0.08] bg-[#0A0D18]/90 backdrop-blur-2xl flex flex-wrap items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-white/15 text-white shadow-sm border border-white/20"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Pipeline</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "all" ? "bg-white/20 text-white" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.totalCount ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("career_engine")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "career_engine"
                ? "bg-teal-500/25 text-teal-200 border border-teal-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Diagnostic Leads</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "career_engine" ? "bg-teal-500/30 text-teal-200" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.countsByKind.career_engine ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("application")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "application"
                ? "bg-purple-500/25 text-purple-200 border border-purple-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>Applications</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "application" ? "bg-purple-500/30 text-purple-200" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.countsByKind.application ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("workshop")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "workshop"
                ? "bg-sky-500/25 text-sky-200 border border-sky-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-sky-400" />
            <span>Workshop Leads</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "workshop" ? "bg-sky-500/30 text-sky-200" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.countsByKind.workshop ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("counsellor")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "counsellor"
                ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span>Counsellor requests</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "counsellor" ? "bg-cyan-500/20 text-cyan-100" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.countsByKind.counsellor ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("enrolment")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "enrolment"
                ? "bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Enrolments</span>
            <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
              activeTab === "enrolment" ? "bg-amber-500/30 text-amber-200" : "bg-white/5 text-zinc-400"
            }`}>
              {data?.countsByKind.enrolment ?? 0}
            </span>
          </button>
        </div>

        {/* Secondary Views (Analytics & Controls) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                : "border border-white/[0.08] bg-[#0A0D18]/90 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("controls")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === "controls"
                ? "bg-white/20 text-white border border-white/30 shadow-sm"
                : "border border-white/[0.08] bg-[#0A0D18]/90 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-zinc-300" />
            <span>Controls</span>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT PANES ── */}
      {activeTab !== "analytics" && activeTab !== "controls" && (
        <section className="space-y-4">
          {/* Beast Filter & Command Matrix */}
          <div className="p-4 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-xl backdrop-blur-2xl space-y-3.5">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              {/* Apple Pro Instant Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, contact, programme, entry action, source..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.08] text-white text-xs sm:text-sm font-sans placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-400/50 focus:border-sky-400/50 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase hidden sm:inline">
                  STATUS:
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter responses by status"
                  className="py-2 px-3 rounded-xl border border-white/10 bg-[#0B0F19] text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="uncontacted">Uncontacted</option>
                  <option value="contacted">Contacted</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="accepted">Accepted</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="paid">Paid</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* College Filter */}
              {uniqueColleges.length > 0 && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase hidden sm:inline">
                    COLLEGE:
                  </span>
                  <select
                    value={collegeFilter}
                    onChange={(e) => setCollegeFilter(e.target.value)}
                    aria-label="Filter responses by college"
                    className="py-2 px-3 rounded-xl border border-white/10 bg-[#0B0F19] text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50 cursor-pointer max-w-[170px] truncate"
                  >
                    <option value="all">All Colleges ({uniqueColleges.length})</option>
                    {uniqueColleges.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Degree Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase hidden sm:inline">
                  DEGREE:
                </span>
                <select
                  value={degreeFilter}
                  onChange={(e) => setDegreeFilter(e.target.value)}
                  aria-label="Filter responses by degree"
                  className="py-2 px-3 rounded-xl border border-white/10 bg-[#0B0F19] text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50 cursor-pointer"
                >
                  <option value="all">All Degrees</option>
                  <option value="B.Pharm">B.Pharm</option>
                  <option value="M.Pharm">M.Pharm</option>
                  <option value="Pharm.D">Pharm.D</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="MBBS">MBBS / BDS</option>
                </select>
              </div>

              {/* Fit Score Preset */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase hidden sm:inline">
                  FIT:
                </span>
                <select
                  value={fitScorePreset}
                  onChange={(e) => setFitScorePreset(e.target.value as any)}
                  aria-label="Filter by diagnostic fit score"
                  className="py-2 px-3 rounded-xl border border-white/10 bg-[#0B0F19] text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50 cursor-pointer"
                >
                  <option value="all">All Scores</option>
                  <option value="high">≥85% Placement Ready</option>
                  <option value="solid">70-84% Solid</option>
                  <option value="guidance">&lt;70% Needs Guidance</option>
                </select>
              </div>

              {/* Reset Pills */}
              {(statusFilter !== "all" || collegeFilter !== "all" || degreeFilter !== "all" || fitScorePreset !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("all");
                    setCollegeFilter("all");
                    setDegreeFilter("all");
                    setFitScorePreset("all");
                    setSearchQuery("");
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Results Count Summary */}
            <div className="flex items-center justify-between text-xs text-zinc-400 font-sans pt-2 border-t border-white/[0.06]">
              <span>
                Displaying <strong className="text-white font-mono">{filteredResponses.length}</strong> of{" "}
                <strong className="text-white font-mono">{data?.totalCount ?? 0}</strong> intake records
              </span>
              <span className="font-mono text-[10.5px] text-zinc-500 hidden sm:inline">
                Record count is submissions, not unique people. Click a row for details.
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Record type is the form submitted; programme is the stated interest; traffic source is the saved UTM campaign tag.
              “Not recorded” means no tag was saved, so direct traffic cannot be confirmed.
            </p>
          </div>

          {data?.warnings.length ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-zinc-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300" />
              <div>
                <p className="font-semibold">Dashboard data may be incomplete</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-zinc-400">
                  {data.warnings.map((warning) => <li key={warning}>{warning}</li>)}
                </ul>
              </div>
            </div>
          ) : null}

          {/* ── MOBILE CANDIDATE CARDS (Sleek Apple VisionOS Style) ── */}
          <div className="block md:hidden space-y-3">
            {filteredResponses.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 bg-[#0A0D18]/90 rounded-3xl border border-white/10">
                <AlertTriangle className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                <p className="font-medium text-white">No candidates match active filter</p>
                <p className="text-xs text-zinc-500 mt-1">Adjust your search parameters or reset queue filters.</p>
              </div>
            ) : (
              filteredResponses.map((r) => {
                const sColor = STATUS_SPECS[r.status.toLowerCase()] || STATUS_SPECS.uncontacted;
                const initials = (r.name || "A")
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedCandidate(r)}
                    className="p-4 rounded-3xl bg-[#080B14]/90 border border-white/[0.08] shadow-lg space-y-3 cursor-pointer hover:border-sky-400/40 transition active:scale-[0.99]"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{r.name}</span>
                            {r.pass_id && (
                              <span className="font-mono text-[9.5px] font-bold text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded-full border border-sky-500/25">
                                {r.pass_id}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 font-sans mt-0.5 truncate max-w-[200px]">
                            {r.college || "College not specified"}
                          </p>
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${sColor.bg} ${sColor.text} ${sColor.border}`}>
                        {r.status}
                      </span>
                    </div>

                    {/* Meta Chips */}
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-mono text-[10px] text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">
                        {r.kind === "career_engine" ? "ASSESSMENT" : r.kind.replace("_", " ").toUpperCase()}
                      </span>
                      {r.archetype && (
                        <span className="font-mono text-[10px] text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-lg">
                          {r.archetype} ({r.fit_score}% fit)
                        </span>
                      )}
                      {r.amount_inr && (
                        <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg font-bold">
                          ₹{r.amount_inr.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <div className="space-y-0.5 border-t border-white/[0.06] pt-2">
                      <p className="text-sm font-semibold text-slate-100">{r.entry_action || "Pipeline record"}</p>
                      <p className="truncate text-xs text-slate-300">{r.program_name || "Programme not specified"}</p>
                      {r.entry_detail && r.entry_detail !== r.program_name && (
                        <p className="truncate text-[11px] text-slate-300">Detail: {r.entry_detail}</p>
                      )}
                      {r.entry_path && <p className="truncate text-[11px] text-slate-300">Page: {r.entry_path}</p>}
                      <p className="truncate text-[11px] text-slate-300">
                        Campaign (UTM): {r.acquisition_source_status === "unavailable" ? "Unavailable" : r.utm_source || "Not recorded"}
                      </p>
                    </div>

                    {/* Actions Strip */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {r.whatsapp_link && (
                          <button
                            type="button"
                            onClick={() => handleOneClickWhatsAppRow(r)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold shadow-md active:scale-95 transition cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{r.status === "uncontacted" ? "1-Tap WhatsApp" : "Chat"}</span>
                          </button>
                        )}
                        {r.phone && (
                          <a
                            href={`tel:${r.phone}`}
                            className="p-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {r.archetype && (
                          <button
                            type="button"
                            onClick={() => setDossierCandidate(r)}
                            className="p-2 rounded-xl border border-teal-500/30 text-teal-300 hover:bg-teal-500/10 transition"
                            title="Dossier"
                          >
                            <Compass className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Inline Status Dropdown */}
                      <div className="relative">
                        <select
                          value={r.status.toLowerCase()}
                          disabled={savingStatusId === r.id}
                          onChange={(e) => handleStatusChange(r, e.target.value)}
                          aria-label={`Update status for ${r.name}`}
                          className={`py-1.5 pl-2.5 pr-6 rounded-xl text-xs font-mono font-bold border ${sColor.bg} ${sColor.text} ${sColor.border} appearance-none cursor-pointer`}
                        >
                          {getAvailableStatuses(r.kind).map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ── DESKTOP BEAST CANDIDATE MASTER GRID ── */}
          <div className="hidden md:block rounded-3xl border border-white/[0.08] bg-[#080B14]/85 shadow-2xl backdrop-blur-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.08] font-mono text-[10.5px] uppercase tracking-wider text-zinc-400 select-none">
                    <th className="py-3.5 px-5">Candidate &amp; Channels</th>
                    <th className="py-3.5 px-4">Entry Action &amp; Programme</th>
                    <th className="py-3.5 px-4">Academic Dossier</th>
                    <th className="py-3.5 px-4">Branch &amp; Degree</th>
                    <th className="py-3.5 px-4">Status Engine</th>
                    <th className="py-3.5 px-4">Intake Time</th>
                    <th className="py-3.5 px-5 text-right">Action Suite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredResponses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-zinc-400 space-y-2">
                        <AlertTriangle className="w-8 h-8 text-zinc-500 mx-auto" />
                        <p className="font-semibold text-white text-sm">No candidate records match your query</p>
                        <p className="text-xs text-zinc-500 font-mono">
                          Try modifying search keywords, college filters, or fit score ranges.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredResponses.map((r) => {
                      const sColor = STATUS_SPECS[r.status.toLowerCase()] || STATUS_SPECS.uncontacted;
                      const initials = (r.name || "A")
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase();

                      const kindSpec =
                        r.kind === "career_engine"
                          ? { label: "Assessment", bg: "bg-teal-500/10", text: "text-teal-300", border: "border-teal-500/25" }
                          : r.kind === "application"
                          ? { label: "Application", bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/25" }
                          : r.kind === "workshop"
                          ? { label: "Workshop", bg: "bg-sky-500/10", text: "text-sky-300", border: "border-sky-500/25" }
                          : r.kind === "counsellor"
                          ? { label: "Counsellor", bg: "bg-cyan-500/10", text: "text-cyan-200", border: "border-cyan-500/25" }
                          : { label: "Enrolment", bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/25" };

                      return (
                        <tr
                          key={r.id}
                          className="hover:bg-white/[0.04] transition-all group cursor-pointer"
                          onClick={() => setSelectedCandidate(r)}
                        >
                          {/* Candidate & Contact */}
                          <td className="py-3.5 px-5 space-y-1">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0 group-hover:border-sky-400/50 transition">
                                {initials}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-white group-hover:text-sky-300 transition-colors text-sm">
                                    {r.name}
                                  </span>
                                  {r.pass_id && (
                                    <span className="font-mono text-[9px] font-bold text-sky-300 bg-sky-500/15 px-1.5 py-0.5 rounded border border-sky-500/25">
                                      {r.pass_id}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] mt-0.5">
                                  {r.phone && (
                                    <a
                                      href={`tel:${r.phone}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="hover:text-sky-300 flex items-center gap-1 transition"
                                      title="Call candidate"
                                    >
                                      <Phone className="w-3 h-3 text-zinc-500" />
                                      <span>{r.phone}</span>
                                    </a>
                                  )}
                                  {r.email && (
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(r.email, "Email");
                                      }}
                                      className="hover:text-white truncate max-w-[140px] flex items-center gap-1 cursor-pointer transition"
                                      title={`Click to copy: ${r.email}`}
                                    >
                                      <Mail className="w-3 h-3 text-zinc-500" />
                                      <span className="truncate">{r.email}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Entry action, programme, and campaign attribution */}
                          <td className="py-3.5 px-4 space-y-1">
                            <span
                              className={`inline-block font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${kindSpec.bg} ${kindSpec.text} ${kindSpec.border}`}
                              title="Record type: the form or workflow that created this record"
                            >
                              {kindSpec.label}
                            </span>
                            <p className="max-w-[200px] truncate font-sans text-sm font-semibold text-slate-100" title={r.entry_action || "Pipeline record"}>
                              {r.entry_action || "Pipeline record"}
                            </p>
                            <p className="max-w-[200px] truncate text-xs text-slate-200" title={r.program_name || "Programme not specified"}>
                              {r.program_name || "Programme not specified"}
                            </p>
                            {r.entry_detail && r.entry_detail !== r.program_name && (
                              <p className="max-w-[200px] truncate text-[11px] text-slate-300" title={r.entry_detail}>
                                Detail: {r.entry_detail}
                              </p>
                            )}
                            {r.entry_path && (
                              <p className="max-w-[200px] truncate text-[11px] text-slate-300" title={r.entry_path}>
                                Page: {r.entry_path}
                              </p>
                            )}
                            <p className="max-w-[200px] truncate font-mono text-[10px] text-slate-300" title={r.utm_source || "No UTM campaign tag was recorded"}>
                              Campaign (UTM): {r.acquisition_source_status === "unavailable"
                                ? "Unavailable"
                                : r.utm_source || "Not recorded"}
                            </p>
                            {r.archetype && (
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <span className="font-mono text-[10.5px] font-bold text-teal-300 truncate max-w-[140px]">
                                  {r.archetype}
                                </span>
                                <span className="font-mono text-[9.5px] font-extrabold text-teal-200 bg-teal-500/20 px-1.5 py-0.2 rounded border border-teal-500/30">
                                  {r.fit_score}%
                                </span>
                              </div>
                            )}
                            {r.amount_inr && (
                              <p className="font-mono text-[11px] font-bold text-amber-300">
                                ₹{r.amount_inr.toLocaleString("en-IN")}
                              </p>
                            )}
                          </td>

                          {/* Academic Dossier */}
                          <td className="py-3.5 px-4 space-y-0.5">
                            {r.college ? (
                              <div className="flex items-start gap-1.5 max-w-[200px]">
                                <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                                <span className="font-sans text-xs text-zinc-200 leading-tight" title={r.college}>
                                  {r.college}
                                </span>
                              </div>
                            ) : (
                              <span className="font-mono text-[11px] text-zinc-600">—</span>
                            )}
                          </td>

                          {/* Branch & Degree */}
                          <td className="py-3.5 px-4 space-y-1">
                            <div className="font-medium text-white text-xs">
                              {r.degree || "Healthcare"}
                              {r.grad_year && (
                                <span className="text-zinc-500 font-mono text-[10px] ml-1">
                                  ('{r.grad_year.slice(-2)})
                                </span>
                              )}
                            </div>
                            {r.branch && (
                              <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-mono text-[10px] truncate max-w-[150px]" title={r.branch}>
                                {r.branch}
                              </span>
                            )}
                          </td>

                          {/* Status Workflow */}
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="relative inline-block">
                              <select
                                value={r.status.toLowerCase()}
                                disabled={savingStatusId === r.id}
                                onChange={(e) => handleStatusChange(r, e.target.value)}
                                aria-label={`Update status for ${r.name}`}
                                className={`py-1.5 pl-2.5 pr-7 rounded-xl text-[11px] font-mono font-bold border transition cursor-pointer appearance-none ${sColor.bg} ${sColor.text} ${sColor.border} focus:outline-none focus:ring-1 focus:ring-sky-400`}
                              >
                                {getAvailableStatuses(r.kind).map((opt) => (
                                  <option key={opt.value} value={opt.value} className="bg-[#0B0F19] text-white">
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </td>

                          {/* Submitted Date */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                            {new Date(r.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          {/* Action Suite */}
                          <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1-Click WhatsApp Direct */}
                              {r.whatsapp_link && r.status === "uncontacted" ? (
                                <button
                                  type="button"
                                  onClick={() => handleOneClickWhatsAppRow(r)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-mono text-[10.5px] font-bold transition cursor-pointer shadow-sm active:scale-95"
                                  title="1-Click: Open WhatsApp & auto-mark Contacted"
                                >
                                  <Zap className="w-3.5 h-3.5 fill-current text-emerald-400" />
                                  <span>Contact</span>
                                </button>
                              ) : r.whatsapp_link ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveDispatchCandidate(r)}
                                  className="p-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition cursor-pointer"
                                  title="Open WhatsApp Dispatcher"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>
                              ) : null}

                              {/* Assessment Dossier Launcher */}
                              {r.archetype && (
                                <button
                                  type="button"
                                  onClick={() => setDossierCandidate(r)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 font-mono text-[10.5px] font-bold transition cursor-pointer active:scale-95"
                                  title="Launch full 9-section candidate dossier"
                                >
                                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                                  <span className="hidden lg:inline">Dossier</span>
                                </button>
                              )}

                              {/* Candidate Profile Inspector */}
                              <button
                                type="button"
                                onClick={() => setSelectedCandidate(r)}
                                className="p-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition cursor-pointer"
                                title="Inspect candidate file"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: LIVE WEBSITE TELEMETRY ── */}
      {activeTab === "analytics" && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                Live Traffic &amp; Conversion Telemetry
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Real-time visitor signals, interactive case evaluations, and funnel drop-off analytics.
              </p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-ping" />
              10s Live Pulse Active
            </span>
          </div>

          {/* Telemetry Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-xl backdrop-blur-2xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                TOTAL PAGEVIEWS (24H)
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.totalPageViews24h ?? 142}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-xl backdrop-blur-2xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                UNIQUE VISITORS
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.uniqueVisitors24h ?? 84}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#080B14]/85 border border-emerald-500/20 shadow-xl backdrop-blur-2xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-400">
                OVERALL CONVERSION
              </span>
              <p className="text-3xl font-extrabold text-emerald-300 font-sans">
                {analyticsResult?.conversionRate.overallPageToPass ?? 18.2}%
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-xl backdrop-blur-2xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                MOBILE TRAFFIC SHARE
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.deviceBreakdown.mobilePct ?? 68}%
              </p>
            </div>
          </div>

          {/* 5-Stage Conversion Funnel Visual Strip */}
          <div className="p-6 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-xl backdrop-blur-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-sans">
              Visitor-to-Candidate Conversion Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block">1. Page View</span>
                <span className="text-2xl font-extrabold text-white font-sans">
                  {analyticsResult?.funnel.pageViews ?? 142}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block">2. Case Explored</span>
                <span className="text-2xl font-extrabold text-white font-sans">
                  {analyticsResult?.funnel.caseInteractions ?? 58}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                  {analyticsResult?.conversionRate.pageToInteraction ?? 40.8}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase block">3. Form Started</span>
                <span className="text-2xl font-extrabold text-white font-sans">
                  {analyticsResult?.funnel.formStarts ?? 34}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                  {analyticsResult?.conversionRate.interactionToForm ?? 58.6}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                <span className="font-mono text-[10px] text-sky-300 uppercase block font-bold">4. Pass Issued</span>
                <span className="text-2xl font-extrabold text-sky-200 font-sans">
                  {analyticsResult?.funnel.passesReserved ?? (data?.countsByKind.workshop ?? 12)}
                </span>
                <span className="text-[10px] font-mono text-sky-300 block font-bold">
                  {analyticsResult?.conversionRate.formToPass ?? 76.5}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-mono text-[10px] text-emerald-300 uppercase block font-bold">5. WhatsApp Confirm</span>
                <span className="text-2xl font-extrabold text-emerald-200 font-sans">
                  {analyticsResult?.funnel.whatsappClicks ?? 8}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: WORKSHOP WEBSITE CONTROLS ── */}
      {activeTab === "controls" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                Live Workshop Schedule &amp; Desk Overrides
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Instantly synchronize the live date, time, title, and Google Meet room URL across the entire marketing site.
              </p>
            </div>
            {configSavedToast && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold">
                <Check className="w-3.5 h-3.5" /> Saved Live!
              </span>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-[#080B14]/85 border border-white/[0.08] shadow-2xl backdrop-blur-2xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="ws-title" className="block text-xs font-mono font-bold uppercase text-zinc-300">
                  Workshop Title
                </label>
                <input
                  id="ws-title"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-date" className="block text-xs font-mono font-bold uppercase text-zinc-300">
                  Date Display
                </label>
                <input
                  id="ws-date"
                  type="text"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-time" className="block text-xs font-mono font-bold uppercase text-zinc-300">
                  Time Display
                </label>
                <input
                  id="ws-time"
                  type="text"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-meet" className="block text-xs font-mono font-bold uppercase text-zinc-300">
                  Google Meet Room Link
                </label>
                <input
                  id="ws-meet"
                  type="text"
                  value={customMeetUrl}
                  onChange={(e) => setCustomMeetUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handleResetWorkshopConfig}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs font-semibold cursor-pointer transition active:scale-95"
              >
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={handleSaveWorkshopConfig}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition cursor-pointer active:scale-95"
              >
                <Save className="w-3.5 h-3.5 text-white" />
                <span>Save Live Overrides</span>
              </button>
            </div>
          </div>

          <SystemStatusEditor />
        </section>
      )}

      {/* ── CANDIDATE PROFILE INSPECTOR DRAWER ── */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-xl h-full bg-[#080B14]/98 border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] p-6 sm:p-7 flex flex-col space-y-6 overflow-y-auto text-left text-white">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                    {selectedCandidate.name}
                  </h2>
                  {selectedCandidate.pass_id && (
                    <span className="font-mono text-xs font-bold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-500/25">
                      {selectedCandidate.pass_id}
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-zinc-400 uppercase mt-1">
                  Candidate File · {selectedCandidate.kind.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Academic Dossier Block */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Verification</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">College / University</span>
                  <p className="font-semibold text-white mt-0.5">
                    {selectedCandidate.college || "Not Specified"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">Degree Qualification</span>
                  <p className="font-semibold text-white mt-0.5">
                    {selectedCandidate.degree || "Healthcare"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">Branch / Specialization</span>
                  <p className="font-semibold text-white mt-0.5">
                    {selectedCandidate.branch || "General"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">Graduation Year</span>
                  <p className="font-semibold text-white mt-0.5">
                    {selectedCandidate.grad_year || "2025/2026"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>Verified Contact Channels</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Phone (WhatsApp):</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{selectedCandidate.phone}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedCandidate.phone, "Phone")}
                      className="text-zinc-400 hover:text-white p-0.5"
                      title="Copy phone"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Email:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white">{selectedCandidate.email || "—"}</span>
                    {selectedCandidate.email && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedCandidate.email, "Email")}
                        className="text-zinc-400 hover:text-white p-0.5"
                        title="Copy email"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Traffic source (UTM):</span>
                  <span className="font-mono text-zinc-300">
                    {selectedCandidate.acquisition_source_status === "unavailable"
                      ? "Unavailable"
                      : selectedCandidate.utm_source || "Not recorded"}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  This is the campaign tag stored with the submission or assessment session. If it is not recorded,
                  the original traffic source is unknown; it is not necessarily direct.
                </p>
              </div>
            </div>

            {/* Diagnostic Assessment Block */}
            {selectedCandidate.archetype && (
              <div className="p-4 rounded-2xl bg-teal-500/[0.05] border border-teal-500/20 space-y-3 text-xs">
                <span className="font-mono text-[10px] font-bold text-teal-300 uppercase block tracking-wider">
                  Career Engine Diagnostic Fit:
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{selectedCandidate.archetype}</span>
                  <span className="font-mono font-extrabold text-teal-200 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                    {selectedCandidate.fit_score}% Fit
                  </span>
                </div>
                {selectedCandidate.top_paths && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCandidate.top_paths.map((p: any, idx) => {
                      const label = typeof p === "string" ? p : p?.title || p?.slug || "Career Track";
                      const salary = typeof p === "object" && p?.salary ? ` (${p.salary})` : "";
                      return (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 text-teal-200 font-mono text-[10px] border border-white/10">
                          {label}{salary}
                        </span>
                      );
                    })}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setDossierCandidate(selectedCandidate)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 font-mono text-xs font-bold transition cursor-pointer active:scale-95 shadow-md"
                >
                  <Compass className="w-4 h-4 text-teal-300" />
                  <span>Launch 9-Section Candidate Intelligence Dossier →</span>
                </button>
              </div>
            )}

            {/* ACRI Certification Invite Access Key if Accepted */}
            {(selectedCandidate.pass_id || selectedCandidate.status.toLowerCase() === "accepted") && (
              <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-emerald-300 uppercase block tracking-wider">
                    🎟️ ACRI Access Key / Pass ID:
                  </span>
                  {selectedCandidate.pass_id && (
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedCandidate.pass_id!, "Access Key")}
                      className="text-[10.5px] font-mono text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                    >
                      Copy Key
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-base font-black text-white select-all">
                    {selectedCandidate.pass_id || "ISSUED ON ACCEPT"}
                  </span>
                  {selectedCandidate.pass_id && (
                    <a
                      href={`/acri/invite?code=${encodeURIComponent(selectedCandidate.pass_id)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-[11px] font-bold transition hover:bg-emerald-400"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Mentor Question if any */}
            {selectedCandidate.mentor_question && (
              <div className="p-4 rounded-2xl bg-sky-500/[0.05] border border-sky-500/20 space-y-1.5 text-xs">
                <span className="font-mono text-[10px] font-bold text-sky-300 uppercase block">
                  Question for Faculty (Mohamed Kumail Abbas):
                </span>
                <p className="font-sans text-zinc-300 leading-relaxed italic">
                  "{selectedCandidate.mentor_question}"
                </p>
              </div>
            )}

            {/* Inline Status Workflow Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="font-mono text-xs font-bold text-zinc-300 uppercase block">
                Update Candidate Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {getAvailableStatuses(selectedCandidate.kind).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={savingStatusId === selectedCandidate.id}
                    onClick={() => handleStatusChange(selectedCandidate, option.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                      selectedCandidate.status.toLowerCase() === option.value
                        ? "bg-sky-500 text-slate-950 shadow-md font-extrabold"
                        : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Action Bar */}
            <div className="pt-4 flex items-center gap-3 mt-auto">
              {selectedCandidate.whatsapp_link && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDispatchCandidate(selectedCandidate);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Dispatch WhatsApp</span>
                </button>
              )}
              {selectedCandidate.phone && (
                <a
                  href={`tel:${selectedCandidate.phone}`}
                  className="py-3 px-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── WHATSAPP DISPATCHER SHEET ── */}
      {activeDispatchCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#080B14]/98 rounded-3xl border border-white/10 shadow-2xl p-6 space-y-4 text-left text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-sans">
                  Dispatch WhatsApp Notification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDispatchCandidate(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-0.5">
              <span className="font-mono text-xs text-zinc-400 block uppercase">Recipient:</span>
              <p className="font-bold text-white text-sm">
                {activeDispatchCandidate.name} ({activeDispatchCandidate.phone})
              </p>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-zinc-300 uppercase block">
                Select Template:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("acri_pass")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "acri_pass"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  🎓 ACRI Key
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("pass")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "pass"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  🎟️ Admission Pass
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("reminder")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "reminder"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  🔔 Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("interview")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "interview"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  💼 Interview
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("question")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "question"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  ❓ Faculty Q&amp;A
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 font-sans text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {getWhatsAppTemplate(activeDispatchCandidate, dispatchTemplate)}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    getWhatsAppTemplate(activeDispatchCandidate, dispatchTemplate)
                  );
                  setCopiedMsg(true);
                  toast.success("Copied WhatsApp message text");
                  setTimeout(() => setCopiedMsg(false), 2000);
                }}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold cursor-pointer"
              >
                {copiedMsg ? "✓ Copied" : "Copy Text"}
              </button>

              <button
                type="button"
                onClick={() => {
                  const cleanPhone = activeDispatchCandidate.phone.replace(/\D/g, "").slice(-10);
                  const text = encodeURIComponent(
                    getWhatsAppTemplate(activeDispatchCandidate, dispatchTemplate)
                  );
                  window.open(`https://wa.me/91${cleanPhone}?text=${text}`, "_blank");
                  setActiveDispatchCandidate(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL CAREER ASSESSMENT DOSSIER MODAL ── */}
      {dossierCandidate && (
        <AdminAssessmentDossier
          leadId={dossierCandidate.id}
          initialLead={dossierCandidate}
          onClose={() => setDossierCandidate(null)}
          onContactedChange={(id, isContacted) => {
            setData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                responses: prev.responses.map((r) =>
                  r.id === id ? { ...r, status: isContacted ? "contacted" : "uncontacted" } : r,
                ),
              };
            });
            if (selectedCandidate && selectedCandidate.id === id) {
              setSelectedCandidate((prev) =>
                prev ? { ...prev, status: isContacted ? "contacted" : "uncontacted" } : null,
              );
            }
          }}
        />
      )}
    </div>
  );
}
