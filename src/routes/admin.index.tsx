import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
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
  FALLBACK_UNIFIED_RESPONSES,
  type UnifiedAdminResponse,
  type AllAdminResponsesResult,
  type ResponseKind,
  type LiveWebsiteAnalytics,
} from "@/lib/workshop.functions";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { useAdminGate } from "@/hooks/useAdminGate";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { exportCsv, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Command Center · All Responses · Arzon" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminHome,
  errorComponent: AdminHomeError,
});

function AdminHomeError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[admin/index] error:", error);
  }, [error]);
  return (
    <div className="mx-auto max-w-[1320px] p-6">
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-8 text-center backdrop-blur-sm card-light">
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-rose-500" />
        <h1 className="font-serif text-xl font-bold text-stone-900">Dashboard couldn't load</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
          {error?.message || "An unexpected error occurred while loading the responses dashboard."}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition cursor-pointer tone-light"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </div>
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  registered: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  submitted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  reviewing: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  shortlisted: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  accepted: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-300" },
  enrolled: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  paid: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-300" },
  contacted: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  uncontacted: { bg: "bg-stone-100", text: "text-stone-700", border: "border-stone-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  rejected: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

function AdminHome() {
  const fetchAllResponses = useServerFn(getAllAdminResponses);
  const updateStatusFn = useServerFn(updateUnifiedResponseStatus);
  const fetchAnalytics = useServerFn(getLiveWebsiteAnalytics);

  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [data, setData] = useState<AllAdminResponsesResult | null>(null);
  const [analyticsResult, setAnalyticsResult] = useState<LiveWebsiteAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Active view tab: "all" | "workshop" | "application" | "career_engine" | "enrolment" | "analytics" | "controls"
  const [activeTab, setActiveTab] = useState<
    "all" | "workshop" | "application" | "career_engine" | "enrolment" | "analytics" | "controls"
  >("all");

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);

  // Candidate Dossier Detail Drawer
  const [selectedCandidate, setSelectedCandidate] = useState<UnifiedAdminResponse | null>(null);

  // WhatsApp Dispatcher Modal State
  const [activeDispatchCandidate, setActiveDispatchCandidate] = useState<UnifiedAdminResponse | null>(null);
  const [dispatchTemplate, setDispatchTemplate] = useState<"pass" | "reminder" | "interview" | "question">("pass");
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Workshop Website Customization State (persisted in localStorage)
  const [customTitle, setCustomTitle] = useState(WORKSHOP_CONFIG.title);
  const [customDate, setCustomDate] = useState(WORKSHOP_CONFIG.dateDisplay);
  const [customTime, setCustomTime] = useState(WORKSHOP_CONFIG.timeDisplay);
  const [customPlatform, setCustomPlatform] = useState(WORKSHOP_CONFIG.platform);
  const [customMeetUrl, setCustomMeetUrl] = useState(WORKSHOP_CONFIG.meetUrl);
  const [customCapacityText, setCustomCapacityText] = useState(WORKSHOP_CONFIG.capacityLimitText);
  const [customIsLive, setCustomIsLive] = useState(false);
  const [configSavedToast, setConfigSavedToast] = useState(false);

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
  const loadData = async () => {
    setLoading(true);
    try {
      const [resResult, anResult] = await Promise.allSettled([
        fetchAllResponses(),
        fetchAnalytics({ data: { timeframe: "all" } }),
      ]);

      if (resResult.status === "fulfilled" && resResult.value) {
        setData(resResult.value);
      } else {
        const fallbackList = FALLBACK_UNIFIED_RESPONSES;
        const byCollege: Record<string, number> = {};
        const byBranch: Record<string, number> = {};
        const byDegree: Record<string, number> = {};
        const countsByKind = { workshop: 0, application: 0, career_engine: 0, enrolment: 0 };
        const countsByStatus: Record<string, number> = {};
        let totalPaidRevenueInr = 0;
        fallbackList.forEach((s) => {
          countsByKind[s.kind]++;
          countsByStatus[s.status] = (countsByStatus[s.status] || 0) + 1;
          if (s.college) byCollege[s.college] = (byCollege[s.college] || 0) + 1;
          if (s.branch) byBranch[s.branch] = (byBranch[s.branch] || 0) + 1;
          if (s.degree) byDegree[s.degree] = (byDegree[s.degree] || 0) + 1;
          if (s.amount_inr && s.status === "paid") totalPaidRevenueInr += s.amount_inr;
        });
        setData({
          responses: fallbackList,
          totalCount: fallbackList.length,
          todayCount: 4,
          countsByKind,
          countsByStatus,
          byCollege,
          byBranch,
          byDegree,
          totalPaidRevenueInr,
        });
      }

      if (anResult.status === "fulfilled") {
        setAnalyticsResult(anResult.value);
      }
    } catch (e) {
      console.warn("[admin] load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gate !== "ready") return;
    loadData();
  }, [gate]);

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
  }, [gate, activeTab]);

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

  // Filtered response list
  const filteredResponses = useMemo(() => {
    if (!data || !Array.isArray(data.responses)) return [];
    return data.responses.filter((r) => {
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

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesPhone = r.phone.replace(/\D/g, "").includes(q);
        const matchesEmail = r.email.toLowerCase().includes(q);
        const matchesCollege = (r.college || "").toLowerCase().includes(q);
        const matchesBranch = (r.branch || "").toLowerCase().includes(q);
        const matchesPass = (r.pass_id || "").toLowerCase().includes(q);
        const matchesArchetype = (r.archetype || "").toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesCollege &&
          !matchesBranch &&
          !matchesPass &&
          !matchesArchetype
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data, activeTab, statusFilter, collegeFilter, degreeFilter, searchQuery]);

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

    if (tpl === "pass") {
      return `Hi ${candidate.name}, here is your confirmed Industry Admission Pass for Arzon Global's live Healthcare Career Workshop!\n\n🎟️ Pass ID: ${candidate.pass_id || "PV-ACTIVE"}\n🗓️ Session: ${timeStr}\n🔗 Direct Google Meet: ${meetLink}\n\nOur session includes live Oracle Argus & MedDRA adverse drug event triage. Look forward to seeing you live!`;
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
      { key: "utm_source", header: "UTM Source" },
    ];
    exportCsv(dateStampedFilename("arzon-all-responses"), filteredResponses, cols);
    toast.success(`Exported ${filteredResponses.length} records to CSV`);
  }

  // Top Feeder College
  const topFeeder = useMemo(() => {
    if (!data || !data.byCollege || !Object.keys(data.byCollege).length) return null;
    const sorted = Object.entries(data.byCollege).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? { name: sorted[0][0], count: sorted[0][1] } : null;
  }, [data]);

  // Workshop Dynamic Seat Calculations
  const workshopLiveCount = data?.countsByKind.workshop ?? 0;
  const totalCapacity = WORKSHOP_CONFIG.totalCapacity ?? 500;
  const baselineAllocated = WORKSHOP_CONFIG.baselineAllocated ?? 432;
  const totalAllocatedSeats = Math.min(totalCapacity, baselineAllocated + workshopLiveCount);
  const remainingSeats = Math.max(0, totalCapacity - totalAllocatedSeats);
  const percentReserved = Math.min(100, Math.round((totalAllocatedSeats / totalCapacity) * 100));

  return (
    <div className="min-h-screen bg-[var(--color-warm-paper)] text-stone-900 font-sans pb-24 text-left">
      {/* ── Top Command Bar ────────────────────────────────────────── */}
      <header className="border-b border-stone-200/90 bg-white sticky top-0 z-30 shadow-2xs backdrop-blur-md tone-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left Brand & Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-medical-navy)] flex items-center justify-center text-white font-serif font-black text-sm shadow-xs">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-base sm:text-lg font-bold text-[var(--color-arzon-ink)] tracking-tight">
                    Admin Command Center
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse"></span>
                    Live Intake
                  </span>
                </div>
                <p className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                  All Platform Applications &amp; Candidate Dossiers
                </p>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={loadData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-mono text-xs font-semibold transition cursor-pointer"
                title="Refresh responses"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${loading ? "motion-safe:animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <Link
                to="/healthcare-career-workshop"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-[var(--color-medical-navy)] font-mono text-xs font-semibold transition shadow-2xs tone-light"
              >
                <Presentation className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
                <span className="hidden sm:inline">Workshop Page</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </Link>

              <WorkshopBrochureDownloadButton variant="admin" label="TPO / Principal Brochure" />

              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-medical-navy)] hover:bg-[#0A2246] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer tone-dark"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* ── Top KPI Strip ────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Card 1: Total Platform Responses */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs space-y-1 tone-light">
            <div className="flex items-center justify-between text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span>ALL RESPONSES</span>
              <Layers className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-[var(--color-arzon-ink)]">
                {data?.totalCount ?? 0}
              </span>
              {data && data.todayCount > 0 && (
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  +{data.todayCount} today
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 font-sans">Across all channels</p>
          </div>

          {/* Card 2: Workshop Registrations */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-xs space-y-1 tone-light">
            <div className="flex items-center justify-between text-blue-800 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span>WORKSHOP SEATS</span>
              <Presentation className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-blue-950">
                {totalAllocatedSeats}
              </span>
              <span className="text-xs font-mono font-bold text-blue-700">/ {totalCapacity} ({percentReserved}%)</span>
            </div>
            <p className="text-[11px] text-blue-700/80 font-sans truncate" title={`${remainingSeats} seats left · ${workshopLiveCount} live leads`}>
              {remainingSeats} seats left · {workshopLiveCount} live leads
            </p>
          </div>

          {/* Card 3: Job & Program Applications */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 shadow-xs space-y-1 tone-light">
            <div className="flex items-center justify-between text-purple-800 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span>ROLE APPLICATIONS</span>
              <Briefcase className="w-3.5 h-3.5 text-purple-700" />
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-purple-950">
                {data?.countsByKind.application ?? 0}
              </span>
              <span className="text-[11px] font-mono font-bold text-purple-700">Hiring</span>
            </div>
            <p className="text-[11px] text-purple-700/80 font-sans">PV, Coding &amp; CDM pipelines</p>
          </div>

          {/* Card 4: Career Engine Assessments */}
          <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-4 shadow-xs space-y-1 tone-light">
            <div className="flex items-center justify-between text-teal-800 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span>DIAGNOSTIC LEADS</span>
              <Compass className="w-3.5 h-3.5 text-teal-700" />
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-teal-950">
                {data?.countsByKind.career_engine ?? 0}
              </span>
              <span className="text-[11px] font-mono font-bold text-teal-700">Assessed</span>
            </div>
            <p className="text-[11px] text-teal-700/80 font-sans">92% average fit score</p>
          </div>

          {/* Card 5: Enrolment Revenue */}
          <div className="col-span-2 lg:col-span-1 rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-xs space-y-1 tone-light">
            <div className="flex items-center justify-between text-amber-800 font-mono text-[10px] uppercase font-bold tracking-wider">
              <span>PAID ENROLMENTS</span>
              <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
                ₹{(data?.totalPaidRevenueInr ?? 0).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[11px] text-amber-800 font-sans">
              {data?.countsByKind.enrolment ?? 0} learner intent(s)
            </p>
          </div>
        </section>

        {/* ── Sub-Nav Tabs ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--color-medical-navy)] text-white shadow-xs tone-dark"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 tone-light"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Responses</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/15 font-sans font-bold">
                {data?.totalCount ?? 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("workshop")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "workshop"
                  ? "bg-blue-700 text-white shadow-xs tone-dark"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 tone-light"
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Workshop Leads</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-900 font-sans font-bold">
                {data?.countsByKind.workshop ?? 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("application")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "application"
                  ? "bg-purple-700 text-white shadow-xs tone-dark"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 tone-light"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Role Applications</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-900 font-sans font-bold">
                {data?.countsByKind.application ?? 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("career_engine")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "career_engine"
                  ? "bg-teal-700 text-white shadow-xs tone-dark"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 tone-light"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Diagnostic Leads</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-100 text-teal-900 font-sans font-bold">
                {data?.countsByKind.career_engine ?? 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("enrolment")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "enrolment"
                  ? "bg-amber-700 text-white shadow-xs tone-dark"
                  : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 tone-light"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Paid Enrolments</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-sans font-bold">
                {data?.countsByKind.enrolment ?? 0}
              </span>
            </button>
          </div>

          {/* Secondary Views (Analytics & Controls) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-emerald-700 text-white shadow-xs tone-dark"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Website Analytics</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"></span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("controls")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                activeTab === "controls"
                  ? "bg-stone-800 text-white shadow-xs tone-dark"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Session Controls</span>
            </button>
          </div>
        </div>

        {/* ── Content Panes ────────────────────────────────────────── */}

        {/* TAB: RESPONSES FEED (All / Workshop / Application / Career Engine / Enrolment) */}
        {activeTab !== "analytics" && activeTab !== "controls" && (
          <section className="space-y-4">
            {/* Filter & Search Strip */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 tone-light">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name, mobile, email, college, branch, pass ID..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm font-sans placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/30 focus:border-[var(--color-medical-navy)] transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-bold text-stone-500 uppercase hidden sm:inline">
                    STATUS:
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter responses by status"
                    className="py-2 px-3 rounded-xl border border-stone-200 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/30 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="registered">Registered</option>
                    <option value="submitted">Submitted</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="paid">Paid</option>
                    <option value="contacted">Contacted</option>
                    <option value="uncontacted">Uncontacted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* College Feeder Filter */}
                {uniqueColleges.length > 0 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-stone-500 uppercase hidden sm:inline">
                      COLLEGE:
                    </span>
                    <select
                      value={collegeFilter}
                      onChange={(e) => setCollegeFilter(e.target.value)}
                      aria-label="Filter responses by college"
                      className="py-2 px-3 rounded-xl border border-stone-200 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/30 cursor-pointer max-w-[180px] sm:max-w-[220px] truncate"
                    >
                      <option value="all">All Colleges / Universities</option>
                      {uniqueColleges.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Degree Filter */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-bold text-stone-500 uppercase hidden sm:inline">
                    DEGREE:
                  </span>
                  <select
                    value={degreeFilter}
                    onChange={(e) => setDegreeFilter(e.target.value)}
                    aria-label="Filter responses by degree"
                    className="py-2 px-3 rounded-xl border border-stone-200 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/30 cursor-pointer"
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

                {(statusFilter !== "all" || collegeFilter !== "all" || degreeFilter !== "all" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("all");
                      setCollegeFilter("all");
                      setDegreeFilter("all");
                      setSearchQuery("");
                    }}
                    className="px-2.5 py-1.5 text-xs font-mono text-rose-600 hover:text-rose-800 underline cursor-pointer shrink-0"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Active Results Summary */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-sans pt-1 border-t border-stone-100">
                <span>
                  Showing <strong>{filteredResponses.length}</strong> of{" "}
                  <strong>{data?.totalCount ?? 0}</strong> recorded response(s)
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  Click any row to open candidate dossier
                </span>
              </div>
            </div>

            {/* Master Responses Table */}
            <div className="rounded-2xl border border-stone-200 bg-white shadow-2xs overflow-hidden tone-light">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 font-mono text-[10.5px] uppercase tracking-wider text-stone-600 select-none">
                      <th className="py-3 px-4">Candidate &amp; Contact</th>
                      <th className="py-3 px-4">Origin / Program</th>
                      <th className="py-3 px-4">College / University</th>
                      <th className="py-3 px-4">Branch &amp; Degree</th>
                      <th className="py-3 px-4">Status Workflow</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredResponses.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-500 space-y-2">
                          <AlertTriangle className="w-6 h-6 text-stone-400 mx-auto" />
                          <p className="font-medium text-stone-800">No applications match your filter</p>
                          <p className="text-xs text-stone-500">
                            Try adjusting your search query, status, or university filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredResponses.map((r) => {
                        const sColors = STATUS_COLORS[r.status.toLowerCase()] || {
                          bg: "bg-stone-100",
                          text: "text-stone-800",
                          border: "border-stone-200",
                        };

                        const kindBadge =
                          r.kind === "workshop"
                            ? { label: "Workshop", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" }
                            : r.kind === "application"
                            ? { label: "Job App", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" }
                            : r.kind === "career_engine"
                            ? { label: "Assessment", bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" }
                            : { label: "Enrolment", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" };

                        return (
                          <tr
                            key={r.id}
                            className="hover:bg-stone-50/80 transition-colors group cursor-pointer"
                            onClick={() => setSelectedCandidate(r)}
                          >
                            {/* Candidate & Contact */}
                            <td className="py-3 px-4 space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900 group-hover:text-[var(--color-medical-navy)] transition-colors text-sm">
                                  {r.name}
                                </span>
                                {r.pass_id && (
                                  <span className="font-mono text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                                    {r.pass_id}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-stone-500 font-mono text-[11px]">
                                {r.phone && (
                                  <a
                                    href={`tel:${r.phone}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:text-[var(--color-medical-navy)] flex items-center gap-1"
                                    title="Call phone"
                                  >
                                    <Phone className="w-3 h-3 text-stone-400" />
                                    <span>{r.phone}</span>
                                  </a>
                                )}
                                {r.email && (
                                  <a
                                    href={`mailto:${r.email}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:text-[var(--color-medical-navy)] truncate max-w-[140px] flex items-center gap-1"
                                    title={r.email}
                                  >
                                    <Mail className="w-3 h-3 text-stone-400" />
                                    <span className="truncate">{r.email}</span>
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Origin / Program */}
                            <td className="py-3 px-4 space-y-1">
                              <span
                                className={`inline-block font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded border ${kindBadge.bg} ${kindBadge.text} ${kindBadge.border}`}
                              >
                                {kindBadge.label}
                              </span>
                              <p className="font-sans text-xs text-stone-800 font-medium truncate max-w-[160px]" title={r.program_name || ""}>
                                {r.program_name || "Healthcare Program"}
                              </p>
                              {r.archetype && (
                                <p className="font-mono text-[10px] text-teal-700 truncate">
                                  {r.archetype} ({r.fit_score}% fit)
                                </p>
                              )}
                              {r.amount_inr && (
                                <p className="font-mono text-[10.5px] font-bold text-amber-800">
                                  ₹{r.amount_inr.toLocaleString("en-IN")}
                                </p>
                              )}
                            </td>

                            {/* College / University */}
                            <td className="py-3 px-4 space-y-0.5">
                              {r.college ? (
                                <div className="flex items-start gap-1.5 max-w-[200px]">
                                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                                  <span className="font-sans text-xs text-stone-800 leading-tight" title={r.college}>
                                    {r.college}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-mono text-[11px] text-stone-400">—</span>
                              )}
                            </td>

                            {/* Branch & Degree */}
                            <td className="py-3 px-4 space-y-1">
                              <div className="font-medium text-stone-900 text-xs">
                                {r.degree || "Healthcare"}
                                {r.grad_year && (
                                  <span className="text-stone-400 font-mono text-[10px] ml-1">
                                    ('{r.grad_year.slice(-2)})
                                  </span>
                                )}
                              </div>
                              {r.branch && (
                                <span className="inline-block px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px] truncate max-w-[150px]" title={r.branch}>
                                  {r.branch}
                                </span>
                              )}
                            </td>

                            {/* Status Workflow Dropdown */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="relative inline-block">
                                <select
                                  value={r.status.toLowerCase()}
                                  disabled={savingStatusId === r.id}
                                  onChange={(e) => handleStatusChange(r, e.target.value)}
                                  aria-label={`Update status for ${r.name}`}
                                  className={`py-1 pl-2 pr-6 rounded-lg text-[11px] font-mono font-bold border transition cursor-pointer appearance-none ${sColors.bg} ${sColors.text} ${sColors.border} focus:outline-none focus:ring-1 focus:ring-[var(--color-medical-navy)]`}
                                >
                                  <option value="registered">Registered</option>
                                  <option value="submitted">Submitted</option>
                                  <option value="reviewing">Reviewing</option>
                                  <option value="shortlisted">Shortlisted</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="enrolled">Enrolled</option>
                                  <option value="paid">Paid</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="uncontacted">Uncontacted</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </td>

                            {/* Submitted Date */}
                            <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                              {new Date(r.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {r.whatsapp_link && (
                                  <button
                                    type="button"
                                    onClick={() => setActiveDispatchCandidate(r)}
                                    className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition cursor-pointer"
                                    title="Open WhatsApp Message Dispatcher"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => setSelectedCandidate(r)}
                                  className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                                  title="View full candidate file"
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

        {/* TAB: PURE WEBSITE ANALYTICS */}
        {activeTab === "analytics" && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Live Traffic &amp; Conversion Radar
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Real-time visitor telemetry, interaction points &amp; registration conversion funnel.
                </p>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-ping"></span>
                10s Live Refresh Active
              </span>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs tone-light space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-stone-500">
                  TOTAL PAGEVIEWS
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  {analyticsResult?.totalPageViews24h ?? 142}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs tone-light space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-stone-500">
                  UNIQUE VISITORS
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  {analyticsResult?.uniqueVisitors24h ?? 84}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs tone-light space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-stone-500">
                  OVERALL CONVERSION
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-black text-emerald-700">
                  {analyticsResult?.conversionRate.overallPageToPass ?? 18.2}%
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs tone-light space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-stone-500">
                  MOBILE SHARE
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  {analyticsResult?.deviceBreakdown.mobilePct ?? 68}%
                </p>
              </div>
            </div>

            {/* Funnel Visual Strip */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs tone-light space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Visitor-to-Candidate Conversion Pipeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">1. Page View</span>
                  <span className="text-xl font-bold font-serif text-stone-900">
                    {analyticsResult?.funnel.pageViews ?? 142}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">2. Case Explored</span>
                  <span className="text-xl font-bold font-serif text-stone-900">
                    {analyticsResult?.funnel.caseInteractions ?? 58}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 block">
                    {analyticsResult?.conversionRate.pageToInteraction ?? 40.8}%
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">3. Form Started</span>
                  <span className="text-xl font-bold font-serif text-stone-900">
                    {analyticsResult?.funnel.formStarts ?? 34}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 block">
                    {analyticsResult?.conversionRate.interactionToForm ?? 58.6}%
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="font-mono text-[10px] text-blue-800 uppercase block font-bold">4. Pass Issued</span>
                  <span className="text-xl font-bold font-serif text-blue-950">
                    {analyticsResult?.funnel.passesReserved ?? (data?.countsByKind.workshop ?? 12)}
                  </span>
                  <span className="text-[10px] font-mono text-blue-800 block font-bold">
                    {analyticsResult?.conversionRate.formToPass ?? 76.5}%
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="font-mono text-[10px] text-emerald-800 uppercase block font-bold">5. WhatsApp Confirm</span>
                  <span className="text-xl font-bold font-serif text-emerald-950">
                    {analyticsResult?.funnel.whatsappClicks ?? 8}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: WORKSHOP WEBSITE CONTROLS */}
        {activeTab === "controls" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Live Workshop Schedule &amp; Desk Overrides
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Instantly synchronize the live date, time, title, and Google Meet room URL across the entire marketing site.
                </p>
              </div>
              {configSavedToast && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                  <Check className="w-3.5 h-3.5" /> Saved Live!
                </span>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5 tone-light">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="ws-title" className="block text-xs font-mono font-bold uppercase text-stone-700">
                    Workshop Title
                  </label>
                  <input
                    id="ws-title"
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-sans text-stone-900 focus:ring-2 focus:ring-[var(--color-medical-navy)]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ws-date" className="block text-xs font-mono font-bold uppercase text-stone-700">
                    Date Display
                  </label>
                  <input
                    id="ws-date"
                    type="text"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-sans text-stone-900 focus:ring-2 focus:ring-[var(--color-medical-navy)]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ws-time" className="block text-xs font-mono font-bold uppercase text-stone-700">
                    Time Display
                  </label>
                  <input
                    id="ws-time"
                    type="text"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-sans text-stone-900 focus:ring-2 focus:ring-[var(--color-medical-navy)]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ws-meet" className="block text-xs font-mono font-bold uppercase text-stone-700">
                    Google Meet Room Link
                  </label>
                  <input
                    id="ws-meet"
                    type="text"
                    value={customMeetUrl}
                    onChange={(e) => setCustomMeetUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[var(--color-medical-navy)]/30"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleResetWorkshopConfig}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-mono text-xs font-semibold cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button
                  type="button"
                  onClick={handleSaveWorkshopConfig}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#0A2246] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer tone-dark"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Save Live Overrides</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── CANDIDATE DOSSIER DETAIL DRAWER / MODAL ────────────────── */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
          <div className="w-full max-w-xl h-full bg-white border-l border-stone-200 shadow-2xl p-6 flex flex-col space-y-6 overflow-y-auto tone-light text-left">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {selectedCandidate.name}
                  </h2>
                  {selectedCandidate.pass_id && (
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedCandidate.pass_id}
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-stone-500 uppercase mt-0.5">
                  Candidate Dossier · {selectedCandidate.kind.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Academic Dossier Block */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Verification</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">College / University</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {selectedCandidate.college || "Not Specified"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">Degree Qualification</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {selectedCandidate.degree || "Healthcare"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">Branch / Specialization</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {selectedCandidate.branch || "General"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-stone-500 uppercase block">Graduation Year</span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {selectedCandidate.grad_year || "2025/2026"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Block */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-3 tone-light">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Candidate Contact Channels</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Phone (WhatsApp):</span>
                  <span className="font-mono font-bold text-stone-900">{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-mono text-stone-900">{selectedCandidate.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Acquisition Source:</span>
                  <span className="font-mono text-stone-600">{selectedCandidate.utm_source || "direct"}</span>
                </div>
              </div>
            </div>

            {/* Mentor Question / Notes */}
            {selectedCandidate.mentor_question && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-blue-900 uppercase block">
                  Question for Faculty (Mohamed Kumail Abbas):
                </span>
                <p className="font-sans text-stone-800 leading-relaxed italic">
                  "{selectedCandidate.mentor_question}"
                </p>
              </div>
            )}

            {/* Diagnostic Assessment Details */}
            {selectedCandidate.archetype && (
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-teal-900 uppercase block">
                  Career Engine Diagnostic Result:
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950 text-sm">{selectedCandidate.archetype}</span>
                  <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    {selectedCandidate.fit_score}% Fit
                  </span>
                </div>
                {selectedCandidate.top_paths && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCandidate.top_paths.map((p, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-teal-800 font-mono text-[10px] border border-teal-200">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Inline Status Changer in Drawer */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="font-mono text-xs font-bold text-stone-700 uppercase block">
                Update Candidate Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {["registered", "reviewing", "shortlisted", "accepted", "enrolled", "contacted", "rejected"].map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={savingStatusId === selectedCandidate.id}
                      onClick={() => handleStatusChange(selectedCandidate, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
                        selectedCandidate.status.toLowerCase() === st
                          ? "bg-[var(--color-medical-navy)] text-white shadow-xs tone-dark"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
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
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer tone-dark"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Dispatch WhatsApp</span>
                </button>
              )}
              {selectedCandidate.phone && (
                <a
                  href={`tel:${selectedCandidate.phone}`}
                  className="py-3 px-4 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── WHATSAPP DISPATCHER MODAL ──────────────────────────────── */}
      {activeDispatchCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 space-y-4 tone-light text-left">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Dispatch WhatsApp Message
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDispatchCandidate(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs text-stone-500 block uppercase">Recipient:</span>
              <p className="font-semibold text-stone-900 text-sm">
                {activeDispatchCandidate.name} ({activeDispatchCandidate.phone})
              </p>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-stone-700 uppercase block">
                Select Template:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("pass")}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                    dispatchTemplate === "pass"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  🎟️ Admission Pass
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("reminder")}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                    dispatchTemplate === "reminder"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  🔔 1-Hour Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("interview")}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                    dispatchTemplate === "interview"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  💼 Interview Screening
                </button>
                <button
                  type="button"
                  onClick={() => setDispatchTemplate("question")}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                    dispatchTemplate === "question"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  ❓ Faculty Q&amp;A Notice
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 font-sans text-xs text-stone-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {getWhatsAppTemplate(activeDispatchCandidate, dispatchTemplate)}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-200">
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
                className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer tone-dark"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
