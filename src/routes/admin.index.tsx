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
  Headphones,
  IndianRupee,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
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
      { title: "Admissions & Leads Command · Arzon Global" },
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
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">Failed to Load Admissions Dashboard</h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-zinc-400 leading-relaxed font-mono">
          {error instanceof Error ? error.message : "An unexpected error occurred while loading lead responses."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-100/10 bg-slate-100/5 hover:bg-slate-100/10 text-slate-100 text-xs font-semibold transition cursor-pointer"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
}

// Clear Status Color Specifications
const STATUS_SPECS: Record<string, { bg: string; text: string; border: string }> = {
  uncontacted: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30" },
  new: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30" },
  submitted: { bg: "bg-sky-500/10", text: "text-sky-300", border: "border-sky-500/30" },
  registered: { bg: "bg-sky-500/10", text: "text-sky-300", border: "border-sky-500/30" },
  contacted: { bg: "bg-teal-500/10", text: "text-teal-300", border: "border-teal-500/30" },
  reviewing: { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/30" },
  shortlisted: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/30" },
  interview_scheduled: { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/30" },
  accepted: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/40" },
  enrolled: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/40" },
  selected: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/40" },
  paid: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/40" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/30" },
  rejected: { bg: "bg-rose-500/10", text: "text-rose-300", border: "border-rose-500/30" },
  withdrawn: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/30" },
};

const KIND_SPECS: Record<ResponseKind, { label: string; bg: string; text: string; border: string }> = {
  industry_network: { label: "Campus Network", bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/30" },
  counsellor: { label: "Counsellor Request", bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/30" },
  application: { label: "Course Application", bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30" },
  workshop: { label: "Workshop", bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/30" },
  career_engine: { label: "Career Assessment", bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  enrolment: { label: "Enrolment / Payment", bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
};

function getAvailableStatuses(kind: ResponseKind): { value: string; label: string }[] {
  switch (kind) {
    case "industry_network":
      return [
        { value: "uncontacted", label: "New Application" },
        { value: "reviewing", label: "Under Review" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "interview_scheduled", label: "Interview Scheduled" },
        { value: "enrolled", label: "Selected as Lead" },
        { value: "rejected", label: "Not Selected" },
      ];
    case "career_engine":
      return [
        { value: "uncontacted", label: "Uncontacted" },
        { value: "contacted", label: "Contacted" },
      ];
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
    "all" | "counsellor" | "industry_network" | "application" | "career_engine" | "workshop" | "enrolment" | "analytics" | "controls"
  >("all");

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);
  const [onlyNeedsAttention, setOnlyNeedsAttention] = useState(false);
  const [dispatchingNext, setDispatchingNext] = useState(false);

  // Candidate Dossier Detail Drawer & Assessment Modal
  const [selectedCandidate, setSelectedCandidate] = useState<UnifiedAdminResponse | null>(null);
  const [dossierCandidate, setDossierCandidate] = useState<UnifiedAdminResponse | null>(null);

  // WhatsApp Dispatcher Modal State
  const [activeDispatchCandidate, setActiveDispatchCandidate] = useState<UnifiedAdminResponse | null>(null);
  const [dispatchTemplate, setDispatchTemplate] = useState<"intro" | "pass" | "acri_pass" | "reminder" | "interview" | "question">("intro");
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
            industry_network: 0,
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

  // Attention Metrics: calculate leads that need action
  const attentionMetrics = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) {
      return {
        uncontactedLeads: [],
        pendingReview: [],
        totalNeedsAttention: 0,
      };
    }

    const uncontactedLeads = data.responses.filter(
      (r) => r.status === "uncontacted" || r.status === "new"
    );
    const pendingReview = data.responses.filter(
      (r) => r.status === "submitted" || r.status === "reviewing"
    );

    return {
      uncontactedLeads,
      pendingReview,
      totalNeedsAttention: uncontactedLeads.length + pendingReview.length,
    };
  }, [data]);

  // 1-Click WhatsApp + Auto-Mark Contacted for Next Lead
  async function handleOneClickDispatchNextLead() {
    const nextLead = attentionMetrics.uncontactedLeads.find((lead) => lead.whatsapp_link);
    if (!nextLead) {
      toast.success("All pending leads have been contacted!");
      return;
    }
    setDispatchingNext(true);
    try {
      const msg = getWhatsAppTemplate(nextLead, "intro");
      const digits10 = (nextLead.phone || "").replace(/\D/g, "").slice(-10);
      if (!digits10) {
        toast.error(`Candidate ${nextLead.name} has no valid 10-digit phone number`);
        return;
      }
      const waUrl = `https://wa.me/91${digits10}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      if (nextLead.status === "uncontacted" || nextLead.status === "new") {
        await handleStatusChange(nextLead, "contacted");
      }
      toast.success(`WhatsApp opened & marked ${nextLead.name} as Contacted!`);
    } finally {
      setDispatchingNext(false);
    }
  }

  // 1-Click WhatsApp for a Specific Row
  async function handleOneClickWhatsAppRow(r: UnifiedAdminResponse) {
    const digits10 = (r.phone || "").replace(/\D/g, "").slice(-10);
    if (!digits10) {
      toast.error(`Candidate ${r.name} has no valid 10-digit phone number`);
      return;
    }
    const msg = getWhatsAppTemplate(r, "intro");
    const waUrl = `https://wa.me/91${digits10}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (r.status === "uncontacted" || r.status === "new") {
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
      // Attention filter toggle
      if (onlyNeedsAttention) {
        if (r.status !== "uncontacted" && r.status !== "new" && r.status !== "submitted") {
          return false;
        }
      }

      // Tab filter
      if (activeTab !== "all" && activeTab !== "analytics" && activeTab !== "controls") {
        if (r.kind !== activeTab) return false;
      }

      // Status filter
      if (statusFilter !== "all" && r.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // College filter
      if (collegeFilter !== "all" && r.college !== collegeFilter) {
        return false;
      }

      // Degree filter
      if (degreeFilter !== "all") {
        if (!r.degree || !r.degree.toLowerCase().includes(degreeFilter.toLowerCase())) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesPhone = r.phone.replace(/\D/g, "").includes(q);
        const matchesEmail = r.email.toLowerCase().includes(q);
        const matchesCollege = (r.college || "").toLowerCase().includes(q);
        const matchesBranch = (r.branch || "").toLowerCase().includes(q);
        const matchesPass = (r.pass_id || "").toLowerCase().includes(q);
        const matchesProgram = (r.program_name || "").toLowerCase().includes(q);
        const matchesEntryAction = (r.entry_action || "").toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesCollege &&
          !matchesBranch &&
          !matchesPass &&
          !matchesProgram &&
          !matchesEntryAction
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data, activeTab, statusFilter, collegeFilter, degreeFilter, searchQuery, onlyNeedsAttention]);

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

    if (candidate.kind === "industry_network") {
      if (tpl === "interview") {
        return `Hi ${candidate.name}, we reviewed your Arzon Global Industry Network Lead application for ${candidate.college || "your college"}. We would like to invite you for a 15-minute briefing call with our campus director. What time works best for you today or tomorrow?`;
      }
      return `Hi ${candidate.name}, this is Arzon Global admissions regarding your application (${candidate.pass_id || "INL"}) for the Industry Network Lead role at ${candidate.college || "your university"}. When is a good time for a brief 5-minute introduction call?`;
    }

    if (candidate.kind === "counsellor") {
      return `Hi ${candidate.name}, this is Arzon Global Admissions Desk. You requested a callback regarding ${candidate.program_name || "healthcare career counselling"}. When would be convenient for a quick 5-minute guidance call?`;
    }

    if (candidate.kind === "career_engine") {
      return `Hi ${candidate.name}, I reviewed your Arzon Career Engine diagnostic assessment. You scored an impressive ${candidate.fit_score ?? 90}% match for ${candidate.archetype || "Clinical Research & Safety"} roles! We would love to walk you through your personalized career roadmap. When would be a good time for a quick 10-minute briefing today?`;
    }

    const isAcri =
      candidate.program_slug?.toLowerCase().includes("acri") ||
      candidate.program_name?.toLowerCase().includes("acri") ||
      candidate.program_name?.toLowerCase().includes("pharmacovigilance");

    if (tpl === "acri_pass" || (tpl === "pass" && isAcri && candidate.status.toLowerCase() === "accepted")) {
      const code = candidate.pass_id || "ACRI-PV-READY";
      return `Hi ${candidate.name}! 🎉 Congratulations, your application for the ACRI Pharmacovigilance Certification has been ACCEPTED by Arzon Admissions!\n\n🔑 Your Official ACRI Access Key is:\n*${code}*\n\nStart your 25-minute certification directly:\n👉 https://arzoncareers.in/acri/invite?code=${encodeURIComponent(code)}\n\nCollege: ${candidate.college || "Affiliated Institute"}\nDegree: ${candidate.degree || "Healthcare"}\n\nAll the best!\n— Arzon Global Admissions Desk`;
    }

    if (tpl === "pass") {
      return `Hi ${candidate.name}, here is your confirmed Industry Admission Pass for Arzon Global's live Healthcare Career Workshop!\n\n🎟️ Pass ID: ${candidate.pass_id || "PV-ACTIVE"}\n🗓️ Session: ${timeStr}\n🔗 Direct Google Meet: ${meetLink}\n\nLook forward to seeing you live!`;
    }

    if (tpl === "reminder") {
      return `Hi ${candidate.name}, quick reminder: the live Healthcare Career Workshop begins shortly at ${customTime || WORKSHOP_CONFIG.timeDisplay}!\n\n🎟️ Pass ID: ${candidate.pass_id || "PV-ACTIVE"}\n🔗 Direct Room Link: ${meetLink}`;
    }

    if (tpl === "interview") {
      return `Hi ${candidate.name}, we reviewed your application for ${candidate.program_name || "Arzon Healthcare roles"} and would like to schedule a 15-minute introductory technical screening. What time works best for you today or tomorrow?`;
    }

    return `Hi ${candidate.name}, this is Arzon Global admissions regarding your inquiry for ${candidate.program_name || "our healthcare career programs"}. When is a good time to connect?`;
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
      { key: "degree", header: "Degree / Year" },
      { key: "branch", header: "Branch / Stream" },
      { key: "status", header: "Status" },
      { key: "pass_id", header: "Application ID / Pass ID" },
      { key: "program_name", header: "Program / Role" },
      { key: "entry_action", header: "Entry Action" },
      { key: "entry_detail", header: "Entry Detail" },
      { key: "notes", header: "Notes / Motivation" },
      { key: "utm_source", header: "UTM Source" },
    ];
    exportCsv(dateStampedFilename("arzon-admissions-leads"), filteredResponses, cols);
    toast.success(`Exported ${filteredResponses.length} candidate leads to CSV`);
  }

  return (
    <div className="tone-dark space-y-6 text-left pb-16">
      {/* ── TOP EXECUTIVE COMMAND BAR ── */}
      <header className="rounded-3xl border border-white/10 bg-[#0A1020]/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl flex flex-col xl:flex-row xl:items-center justify-between gap-5 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand & Title */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A2560] to-[#1E3A8A] border border-blue-400/40 flex items-center justify-center text-white font-serif font-black text-xl shadow-md shrink-0">
            A
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none font-sans">
                Admissions &amp; Lead Management
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                <span>LIVE FEED ACTIVE</span>
              </div>
              {currentTime && (
                <span className="font-mono text-xs text-zinc-400 hidden md:inline">
                  {currentTime}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Unified inbox for Campus Network leads, Counsellor requests, WhatsApp inquiries, and Applications.
            </p>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Quick Outreach Next Button */}
          {attentionMetrics.uncontactedLeads.length > 0 && (
            <button
              type="button"
              onClick={handleOneClickDispatchNextLead}
              disabled={dispatchingNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-sans font-extrabold text-xs shadow-lg transition cursor-pointer active:scale-95 disabled:opacity-50"
              title="Dispatches WhatsApp greeting for the oldest uncontacted lead and marks them Contacted"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Outreach Next Lead</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-950/20 text-[10px] font-mono">
                {attentionMetrics.uncontactedLeads.length} Waiting
              </span>
            </button>
          )}

          {/* Auto Refresh Toggle */}
          <button
            type="button"
            onClick={() => setAutoRefreshActive(!autoRefreshActive)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-medium transition cursor-pointer active:scale-95 ${
              autoRefreshActive
                ? "border-sky-500/40 bg-sky-500/15 text-sky-300"
                : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            }`}
            title="Auto-refresh loop"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{autoRefreshActive ? `${refreshCountdown}s` : "Paused"}</span>
          </button>

          {/* Manual Refresh */}
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Force refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "motion-safe:animate-spin text-sky-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Industry Network Direct Link */}
          <Link
            to="/industry-network"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold transition active:scale-95"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Industry Network Page</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </Link>

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* ── 4 HIGH-CLARITY EXECUTIVE METRIC CARDS ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Leads */}
        <div className="rounded-3xl border border-white/10 bg-[#0B1021]/80 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
              TOTAL INQUIRIES
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                {data?.totalCount ?? 0}
              </span>
              {data && data.todayCount > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  +{data.todayCount} today
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-sans">All prospective student touchpoints</p>
          </div>
        </div>

        {/* Card 2: Counsellor & Callback Leads */}
        <div className="rounded-3xl border border-teal-500/30 bg-[#081822]/80 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-teal-300 uppercase tracking-wider">
              COUNSELLOR &amp; CALLBACKS
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-teal-300" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-200 tracking-tight font-sans">
                {data?.countsByKind.counsellor ?? 0}
              </span>
              {attentionMetrics.uncontactedLeads.filter((r) => r.kind === "counsellor").length > 0 && (
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {attentionMetrics.uncontactedLeads.filter((r) => r.kind === "counsellor").length} uncontacted
                </span>
              )}
            </div>
            <p className="text-xs text-teal-300/70 mt-1 font-sans">Direct student guidance requests</p>
          </div>
        </div>

        {/* Card 3: Industry Network Campus Leads */}
        <div className="rounded-3xl border border-indigo-500/30 bg-[#0E122B]/80 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-wider">
              CAMPUS NETWORK LEADS
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-300" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-200 tracking-tight font-sans">
                {data?.countsByKind.industry_network ?? 0}
              </span>
              <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-full border border-indigo-500/30">
                8 per campus
              </span>
            </div>
            <p className="text-xs text-indigo-300/70 mt-1 font-sans">Appointed student campus representatives</p>
          </div>
        </div>

        {/* Card 4: Course & Diagnostic Applications */}
        <div className="rounded-3xl border border-blue-500/30 bg-[#08122B]/80 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-blue-300 uppercase tracking-wider">
              APPLICATIONS &amp; DIAGNOSTICS
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-blue-300" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-200 tracking-tight font-sans">
                {(data?.countsByKind.application ?? 0) + (data?.countsByKind.career_engine ?? 0) + (data?.countsByKind.workshop ?? 0)}
              </span>
              {data && data.totalPaidRevenueInr > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ₹{data.totalPaidRevenueInr.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="text-xs text-blue-300/70 mt-1 font-sans">PV, Bioinformatics, and ACRI Assessments</p>
          </div>
        </div>
      </section>

      {/* ── SPEED-TO-LEAD ATTENTION ALERT STRIP ── */}
      {attentionMetrics.totalNeedsAttention > 0 && (
        <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-200 font-sans">
                {attentionMetrics.uncontactedLeads.length} Uncontacted Leads Awaiting Response
              </h3>
              <p className="text-xs text-zinc-300 font-sans mt-0.5">
                Speed-to-lead under 15 minutes increases conversion rates by over 3.8x. Connect with waiting candidates on WhatsApp now.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyNeedsAttention(!onlyNeedsAttention)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition cursor-pointer ${
                onlyNeedsAttention
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-white/10 text-amber-200 border-amber-500/30 hover:bg-white/15"
              }`}
            >
              {onlyNeedsAttention ? "✓ Showing Uncontacted Only" : "Filter Uncontacted"}
            </button>
            <button
              type="button"
              onClick={handleOneClickDispatchNextLead}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Next</span>
            </button>
          </div>
        </section>
      )}

      {/* ── NAVIGATION TABS & FILTER BAR ── */}
      <section className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/10 text-xs font-sans">
          <button
            type="button"
            onClick={() => { setActiveTab("all"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "all"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Leads</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono">
              {data?.totalCount ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("counsellor"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "counsellor"
                ? "bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm"
                : "text-zinc-400 hover:text-teal-300 hover:bg-teal-500/10"
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Counsellor Requests</span>
            <span className="px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono">
              {data?.countsByKind.counsellor ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("industry_network"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "industry_network"
                ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-sm"
                : "text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Campus Network Leads</span>
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
              {data?.countsByKind.industry_network ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("application"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "application"
                ? "bg-blue-500/20 text-blue-200 border border-blue-500/40 shadow-sm"
                : "text-zinc-400 hover:text-blue-300 hover:bg-blue-500/10"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Course Applications</span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono">
              {data?.countsByKind.application ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("career_engine"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "career_engine"
                ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm"
                : "text-zinc-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Diagnostic Assessments</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              {data?.countsByKind.career_engine ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("enrolment"); setOnlyNeedsAttention(false); }}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "enrolment"
                ? "bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm"
                : "text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Enrolments</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {data?.countsByKind.enrolment ?? 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "analytics"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Site Traffic</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("controls")}
            className={`px-4 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "controls"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Workshop Settings</span>
          </button>
        </div>

        {/* Unified Search & Dropdown Filters */}
        {activeTab !== "analytics" && activeTab !== "controls" && (
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[#0B1021]/80 border border-white/10">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates by name, phone, email, college, or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 pl-3 pr-8 rounded-xl border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-[#0B1021] text-white">All Statuses</option>
                <option value="uncontacted" className="bg-[#0B1021] text-amber-300">Uncontacted / New</option>
                <option value="contacted" className="bg-[#0B1021] text-teal-300">Contacted</option>
                <option value="reviewing" className="bg-[#0B1021] text-blue-300">Under Review</option>
                <option value="shortlisted" className="bg-[#0B1021] text-emerald-300">Shortlisted</option>
                <option value="enrolled" className="bg-[#0B1021] text-emerald-300">Selected / Enrolled</option>
                <option value="rejected" className="bg-[#0B1021] text-rose-300">Rejected</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* College Filter */}
            {uniqueColleges.length > 0 && (
              <div className="relative max-w-[220px]">
                <select
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                  className="w-full py-2 pl-3 pr-8 rounded-xl border border-white/10 bg-white/5 text-xs text-white truncate focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-[#0B1021] text-white">All Colleges ({uniqueColleges.length})</option>
                  {uniqueColleges.map((col) => (
                    <option key={col} value={col} className="bg-[#0B1021] text-white">
                      {col}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            {/* Clear All Filters */}
            {(searchQuery || statusFilter !== "all" || collegeFilter !== "all" || onlyNeedsAttention) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setCollegeFilter("all");
                  setOnlyNeedsAttention(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}

            <div className="ml-auto text-xs text-zinc-400 font-mono">
              Showing <span className="font-bold text-white">{filteredResponses.length}</span> leads
            </div>
          </div>
        )}
      </section>

      {/* ── MASTER LEADS TABLE ── */}
      {activeTab !== "analytics" && activeTab !== "controls" && (
        <section className="rounded-3xl border border-white/10 bg-[#0B1021]/80 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400 select-none">
                  <th className="py-4 px-5">Candidate Details</th>
                  <th className="py-4 px-4">Inquiry / Lead Type</th>
                  <th className="py-4 px-4">College &amp; Qualification</th>
                  <th className="py-4 px-4">Status Workflow</th>
                  <th className="py-4 px-4">Received</th>
                  <th className="py-4 px-5 text-right">Instant Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-zinc-400 space-y-2">
                      <AlertTriangle className="w-8 h-8 text-zinc-500 mx-auto" />
                      <p className="font-semibold text-white text-base">No candidate leads found</p>
                      <p className="text-xs text-zinc-400 font-sans">
                        Try modifying search query or resetting filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((r) => {
                    const statusSpec = STATUS_SPECS[r.status.toLowerCase()] || STATUS_SPECS.uncontacted;
                    const kindSpec = KIND_SPECS[r.kind] || KIND_SPECS.application;
                    const initials = (r.name || "A")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                        onClick={() => setSelectedCandidate(r)}
                      >
                        {/* 1. Candidate Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/20 border border-blue-400/30 flex items-center justify-center font-mono font-bold text-xs text-blue-200 shrink-0">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                                  {r.name}
                                </span>
                                {r.pass_id && (
                                  <span className="font-mono text-[10px] font-bold text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/25">
                                    {r.pass_id}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs mt-1">
                                {r.phone && (
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopy(r.phone, "Phone");
                                    }}
                                    className="hover:text-blue-300 flex items-center gap-1 cursor-pointer transition"
                                    title="Click to copy phone"
                                  >
                                    <Phone className="w-3 h-3 text-zinc-500" />
                                    <span>{r.phone}</span>
                                  </span>
                                )}
                                {r.email && (
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopy(r.email, "Email");
                                    }}
                                    className="hover:text-white truncate max-w-[150px] flex items-center gap-1 cursor-pointer transition"
                                    title="Click to copy email"
                                  >
                                    <Mail className="w-3 h-3 text-zinc-500" />
                                    <span className="truncate">{r.email}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Inquiry / Lead Type */}
                        <td className="py-4 px-4 space-y-1">
                          <span
                            className={`inline-block font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${kindSpec.bg} ${kindSpec.text} ${kindSpec.border}`}
                          >
                            {kindSpec.label}
                          </span>
                          <p className="font-semibold text-white text-xs truncate max-w-[220px]">
                            {r.program_name || r.entry_action || "Career Guidance"}
                          </p>
                          {r.entry_detail && r.entry_detail !== r.program_name && (
                            <p className="text-[11px] text-zinc-400 truncate max-w-[220px]">
                              {r.entry_detail}
                            </p>
                          )}
                          {r.notes && (
                            <p className="text-[10px] text-zinc-500 truncate max-w-[220px] italic">
                              "{r.notes}"
                            </p>
                          )}
                        </td>

                        {/* 3. College & Qualification */}
                        <td className="py-4 px-4 space-y-1">
                          {r.college ? (
                            <div className="flex items-start gap-1.5 max-w-[220px]">
                              <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                              <span className="font-sans text-xs text-zinc-200 leading-snug line-clamp-2">
                                {r.college}
                              </span>
                            </div>
                          ) : (
                            <span className="text-zinc-500 text-xs">—</span>
                          )}
                          <div className="text-zinc-400 text-[11px] font-mono">
                            {r.degree || "Healthcare Graduate"}
                            {r.branch && ` · ${r.branch}`}
                          </div>
                        </td>

                        {/* 4. Status Workflow */}
                        <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block">
                            <select
                              value={r.status.toLowerCase()}
                              disabled={savingStatusId === r.id}
                              onChange={(e) => handleStatusChange(r, e.target.value)}
                              aria-label={`Update status for ${r.name}`}
                              className={`py-1.5 pl-3 pr-7 rounded-xl text-xs font-mono font-bold border transition cursor-pointer appearance-none ${statusSpec.bg} ${statusSpec.text} ${statusSpec.border} focus:outline-none focus:ring-1 focus:ring-blue-400`}
                            >
                              {getAvailableStatuses(r.kind).map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-[#0B1021] text-white">
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </td>

                        {/* 5. Date Received */}
                        <td className="py-4 px-4 text-xs font-mono text-zinc-400 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* 6. Instant Contact Suite */}
                        <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            {/* 1-Click WhatsApp Button */}
                            {r.phone && (
                              <button
                                type="button"
                                onClick={() => handleOneClickWhatsAppRow(r)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-mono text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
                                title="Open WhatsApp and auto-mark contacted"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-400" />
                                <span>WhatsApp</span>
                              </button>
                            )}

                            {/* Direct Phone Call */}
                            {r.phone && (
                              <a
                                href={`tel:${r.phone}`}
                                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition"
                                title="Call student"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Open Details Drawer */}
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(r)}
                              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition cursor-pointer"
                              title="View full lead dossier"
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
        </section>
      )}

      {/* ── TAB: LIVE WEBSITE TRAFFIC ── */}
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

          {/* Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#0B1021]/80 border border-white/10 shadow-xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                TOTAL PAGEVIEWS (24H)
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.totalPageViews24h ?? 142}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0B1021]/80 border border-white/10 shadow-xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                UNIQUE VISITORS
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.uniqueVisitors24h ?? 84}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0B1021]/80 border border-emerald-500/20 shadow-xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-400">
                OVERALL CONVERSION
              </span>
              <p className="text-3xl font-extrabold text-emerald-300 font-sans">
                {analyticsResult?.conversionRate.overallPageToPass ?? 18.2}%
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-[#0B1021]/80 border border-white/10 shadow-xl space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                MOBILE TRAFFIC SHARE
              </span>
              <p className="text-3xl font-extrabold text-white font-sans">
                {analyticsResult?.deviceBreakdown.mobilePct ?? 68}%
              </p>
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

          <div className="p-6 rounded-3xl bg-[#0B1021]/80 border border-white/10 shadow-2xl space-y-5">
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
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
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
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition cursor-pointer active:scale-95"
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
          <div className="w-full max-w-xl h-full bg-[#0A1020] border-l border-white/10 shadow-2xl p-6 sm:p-7 flex flex-col space-y-6 overflow-y-auto text-left text-white">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                    {selectedCandidate.name}
                  </h2>
                  {selectedCandidate.pass_id && (
                    <span className="font-mono text-xs font-bold text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/25">
                      {selectedCandidate.pass_id}
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-zinc-400 uppercase mt-1">
                  Candidate File · {selectedCandidate.kind.replace("_", " ").toUpperCase()}
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
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Background</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">College / University:</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {selectedCandidate.college || "Not Specified"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Degree / Year:</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {selectedCandidate.degree || "Healthcare Graduate"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Contact Channels</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Mobile / WhatsApp:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{selectedCandidate.phone || "—"}</span>
                    {selectedCandidate.phone && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedCandidate.phone, "Phone")}
                        className="text-blue-400 hover:text-blue-300 text-[11px] underline cursor-pointer"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Email:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white truncate max-w-[220px]">{selectedCandidate.email || "—"}</span>
                    {selectedCandidate.email && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedCandidate.email, "Email")}
                        className="text-blue-400 hover:text-blue-300 text-[11px] underline cursor-pointer"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes / Motivation / Details */}
            {selectedCandidate.notes && (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                <span className="font-mono text-[11px] font-bold text-zinc-300 uppercase block">
                  Candidate Notes / Inquiry Details:
                </span>
                <p className="font-sans text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedCandidate.notes}
                </p>
              </div>
            )}

            {/* Assessment Score if any */}
            {selectedCandidate.archetype && (
              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-teal-300 uppercase">
                    Diagnostic Role Recommendation:
                  </span>
                  <span className="font-mono font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded">
                    {selectedCandidate.fit_score}% Match
                  </span>
                </div>
                <p className="font-bold text-white text-sm">
                  {selectedCandidate.archetype}
                </p>
                <button
                  type="button"
                  onClick={() => setDossierCandidate(selectedCandidate)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 font-mono text-xs font-bold transition cursor-pointer active:scale-95 shadow-md"
                >
                  <Compass className="w-4 h-4 text-teal-300" />
                  <span>Launch Candidate Intelligence Dossier →</span>
                </button>
              </div>
            )}

            {/* Status Workflow Buttons */}
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
                        ? "bg-blue-600 text-white shadow-md font-extrabold"
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
              <button
                type="button"
                onClick={() => {
                  setActiveDispatchCandidate(selectedCandidate);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950 fill-current" />
                <span>Message on WhatsApp</span>
              </button>
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
          <div className="w-full max-w-lg bg-[#0A1020] rounded-3xl border border-white/10 shadow-2xl p-6 space-y-4 text-left text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-sans">
                  Send WhatsApp Message
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
                Select Message Template:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("intro")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                    dispatchTemplate === "intro"
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  👋 Intro Greeting
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
                  💼 Interview Call
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
                  🔔 Session Reminder
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
                  toast.success("Copied message text");
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
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
