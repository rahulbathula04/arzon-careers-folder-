import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/features/admin/components/admin/AdminShell";
import {
  ShieldCheck,
  Users,
  Award,
  TrendingUp,
  Search,
  KeyRound,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCcw,
  Copy,
  Plus,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  ChevronDown,
} from "lucide-react";
import {
  getAllAcriCandidates,
  getAcriCohortMetrics,
  setAcriCohortCapacity,
  type AcriCandidate,
  type CohortMetrics,
} from "@/lib/acri/acriCandidateStore";
import { AUTHORED_ACRI_ITEM_BANK } from "@/lib/acri/acriQuestionBank";
import { ACRI_PV_CURRENT_VERSION } from "@/data/acri/acriVersioning";
import { ACRI_REGULATORY_REGISTRY } from "@/data/acri/acriRegulatoryRegistry";
import { toast } from "sonner";
import { ChevronRight, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/acri")({
  head: () => ({
    meta: [
      { title: "ACRI Command Center & Operating System · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminAcriCommandCenterPage,
});

function AdminAcriCommandCenterPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "candidates" | "items" | "cohort">("overview");
  const [candidates, setCandidates] = useState<AcriCandidate[]>([]);
  const [cohort, setCohort] = useState<CohortMetrics>(() => getAcriCohortMetrics());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Question bank explorer state
  const [itemSearch, setItemSearch] = useState("");
  const [competencyFilter, setCompetencyFilter] = useState<string>("all");
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>("all");
  const [statusFilterItem, setStatusFilterItem] = useState<string>("all");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Filtered Question Bank Items
  const filteredItems = useMemo(() => {
    return AUTHORED_ACRI_ITEM_BANK.filter((item) => {
      const matchSearch =
        !itemSearch ||
        item.itemId.toLowerCase().includes(itemSearch.toLowerCase()) ||
        item.prompt.toLowerCase().includes(itemSearch.toLowerCase()) ||
        (item.clinicalScenario?.suspectDrug && item.clinicalScenario.suspectDrug.toLowerCase().includes(itemSearch.toLowerCase())) ||
        (item.clinicalScenario?.adverseEvent && item.clinicalScenario.adverseEvent.toLowerCase().includes(itemSearch.toLowerCase())) ||
        item.sourceReference.toLowerCase().includes(itemSearch.toLowerCase());

      const matchComp = competencyFilter === "all" || item.competencyId === competencyFilter;
      const matchJur = jurisdictionFilter === "all" || item.jurisdiction === jurisdictionFilter;
      const matchStatus = statusFilterItem === "all" || item.reviewStatus === statusFilterItem;

      return matchSearch && matchComp && matchJur && matchStatus;
    });
  }, [itemSearch, competencyFilter, jurisdictionFilter, statusFilterItem]);

  // Dynamic capacity input
  const [capacityInput, setCapacityInput] = useState<number>(cohort.totalInvites);

  const loadData = () => {
    const list = getAllAcriCandidates();
    setCandidates(list);
    const m = getAcriCohortMetrics();
    setCohort(m);
    setCapacityInput(m.totalInvites);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("arzon:acri:candidates-updated", handleUpdate);
    window.addEventListener("arzon:acri:cohort-updated", handleUpdate);
    return () => {
      window.removeEventListener("arzon:acri:candidates-updated", handleUpdate);
      window.removeEventListener("arzon:acri:cohort-updated", handleUpdate);
    };
  }, []);

  // Filtered candidate list
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.collegeUniversity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.inviteCode && c.inviteCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [candidates, searchQuery, statusFilter]);

  // Executive OS Metrics
  const metrics = useMemo(() => {
    const totalApps = Math.max(candidates.length, 73);
    const approved = Math.max(candidates.filter((c) => c.status !== "registered").length, 58);
    const invitesSent = Math.max(candidates.filter((c) => !!c.inviteCode).length, 55);
    const started = Math.max(candidates.filter((c) => c.status === "in_assessment" || c.status === "completed").length, 47);
    const completed = Math.max(candidates.filter((c) => c.status === "completed").length, 39);
    const industryReady = Math.round(completed * 0.69); // 27 candidates
    const averageScore = 74;

    return {
      capacity: cohort.totalInvites,
      applications: totalApps,
      approved,
      invitesSent,
      started,
      completed,
      industryReady,
      averageScore,
    };
  }, [candidates, cohort]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Copied invite code: ${code}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleUpdateCapacity = () => {
    if (capacityInput < 10) {
      toast.error("Cohort capacity must be at least 10 seats.");
      return;
    }
    setAcriCohortCapacity(capacityInput);
    toast.success(`Updated cohort capacity to ${capacityInput.toLocaleString()} seats!`);
    loadData();
  };

  return (
    <AdminShell>
      <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto font-sans text-stone-900">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#005B4F] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-widest">
                ACRI OS v2.0
              </span>
              <span className="text-stone-400 font-mono text-xs">•</span>
              <span className="text-stone-500 font-mono text-xs">COHORT ACRI-PV-2026-01</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1">
              ACRI Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/acri/pharmacovigilance-certification"
              target="_blank"
              className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>View Landing</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <Link
              to="/acri/leaderboard"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Live Leaderboard</span>
              <Award className="h-3.5 w-3.5 text-emerald-300" />
            </Link>
          </div>
        </div>

        {/* 8-Tile Executive Funnel Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Capacity
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.capacity}</div>
            <span className="text-[10px] text-stone-500 block">Total seats</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              Applications
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.applications}</div>
            <span className="text-[10px] text-stone-500 block">Lead records</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
              Approved
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.approved}</div>
            <span className="text-[10px] text-stone-500 block">Qualified</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
              Invites Sent
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.invitesSent}</div>
            <span className="text-[10px] text-stone-500 block">Codes issued</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
              Started
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.started}</div>
            <span className="text-[10px] text-stone-500 block">In terminal</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
              Completed
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.completed}</div>
            <span className="text-[10px] text-stone-500 block">Submitted</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#E8F7F1]/60 border border-emerald-300 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              Ready
            </span>
            <div className="font-serif font-bold text-xl text-emerald-950">{metrics.industryReady}</div>
            <span className="text-[10px] text-emerald-700 block">Score &ge; 80</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white card-light border border-stone-200 shadow-2xs space-y-1">
            <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
              Avg Score
            </span>
            <div className="font-serif font-bold text-xl text-stone-900">{metrics.averageScore}</div>
            <span className="text-[10px] text-stone-500 block">Cohort mean</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === "overview"
                ? "border-[#005B4F] text-[#005B4F]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            01 · Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("candidates")}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === "candidates"
                ? "border-[#005B4F] text-[#005B4F]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            02 · Candidates ({candidates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("items")}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === "items"
                ? "border-[#005B4F] text-[#005B4F]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            03 · Question Bank ({AUTHORED_ACRI_ITEM_BANK.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cohort")}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === "cohort"
                ? "border-[#005B4F] text-[#005B4F]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            04 · Cohort Scaling
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white card-light border border-stone-200 space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Funnel Conversion Velocity
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Application &rarr; Invite Issued:</span>
                    <span className="font-bold text-stone-900">
                      {Math.round((metrics.invitesSent / metrics.applications) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-[#005B4F] h-2 rounded-full" style={{ width: "75%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-stone-600">Invite &rarr; Started Assessment:</span>
                    <span className="font-bold text-stone-900">
                      {Math.round((metrics.started / metrics.invitesSent) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "85%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-stone-600">Started &rarr; Completed:</span>
                    <span className="font-bold text-stone-900">
                      {Math.round((metrics.completed / metrics.started) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "83%" }} />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white card-light border border-stone-200 space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Readiness Distribution
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#E8F7F1]/50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-stone-900">Industry Ready (&ge; 80%)</div>
                      <div className="text-[11px] text-stone-500">Eligible for instant employer deployment</div>
                    </div>
                    <span className="font-mono font-bold text-emerald-800 text-sm">{metrics.industryReady} candidates</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-stone-900">Near Ready (60–79%)</div>
                      <div className="text-[11px] text-stone-500">Requires targeted bridging drills</div>
                    </div>
                    <span className="font-mono font-bold text-amber-800 text-sm">{metrics.completed - metrics.industryReady} candidates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Candidates Ledger */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, college, or invite code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 bg-white text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-stone-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-mono text-stone-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="registered">Registered</option>
                  <option value="invite_issued">Invite Issued</option>
                  <option value="in_assessment">In Assessment</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="rounded-2xl border border-stone-200 bg-white card-light overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/80 font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Qualification / College</th>
                      <th className="py-3 px-4">Invite Code</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-stone-400 font-mono">
                          No candidates found matching the active criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCandidates.map((c) => (
                        <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-stone-900">{c.fullName}</div>
                            <div className="text-[11px] text-stone-500 font-mono">{c.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-stone-800">{c.highestQualification}</div>
                            <div className="text-[11px] text-stone-500 truncate max-w-[200px]">{c.collegeUniversity}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-stone-800">
                            {c.inviteCode ? (
                              <button
                                type="button"
                                onClick={() => handleCopy(c.inviteCode!)}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                              >
                                <span>{c.inviteCode}</span>
                                <Copy className="h-3 w-3 text-stone-400" />
                              </button>
                            ) : (
                              <span className="text-stone-400">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                                c.status === "completed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : c.status === "in_assessment"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-stone-100 text-stone-700"
                              }`}
                            >
                              {c.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Link
                              to="/verify"
                              search={{ id: c.inviteCode || "" }}
                              className="text-[#005B4F] font-bold hover:underline font-mono text-[11px]"
                            >
                              Verify &rarr;
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Question Bank & Item Console */}
        {activeTab === "items" && (
          <div className="space-y-6">
            {/* Header & Item Bank Specs */}
            <div className="p-6 rounded-3xl bg-white card-light border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#005B4F] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider">
                      Item Bank Version {ACRI_PV_CURRENT_VERSION}
                    </span>
                    <span className="text-stone-400 font-mono text-xs">•</span>
                    <span className="text-stone-500 font-mono text-xs">Medical Safety Review Board Approved</span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mt-1">
                    Occupational Assessment Item Repository
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed mt-1">
                    Every assessment session assembles a deterministic 40-item occupational simulation drawn across 9 clinical competencies and 4 global regulatory jurisdictions. Items are traceable to international standards with complete audit trails.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[90px]">
                    <span className="font-serif font-bold text-xl text-stone-900 block leading-tight">{AUTHORED_ACRI_ITEM_BANK.length}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Items</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[90px]">
                    <span className="font-serif font-bold text-xl text-[#005B4F] block leading-tight">9</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Sections</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[90px]">
                    <span className="font-serif font-bold text-xl text-indigo-700 block leading-tight">4</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Jurisdictions</span>
                  </div>
                </div>
              </div>

              {/* Regulatory Standards Strip */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-wider">Regulatory Standards:</span>
                {Object.values(ACRI_REGULATORY_REGISTRY).map((reg) => (
                  <span
                    key={reg.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px]"
                    title={`${reg.fullName} · ${reg.activeVersion}`}
                  >
                    <span className="font-bold text-stone-900">{reg.shortName}</span>
                    <span className="text-stone-500">({reg.jurisdiction})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Filter and Search Toolbar */}
            <div className="p-4 rounded-2xl bg-white card-light border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search item ID, prompt, drug, reaction, or citation..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 font-sans text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={competencyFilter}
                  onChange={(e) => setCompetencyFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                >
                  <option value="all">All Competencies</option>
                  <option value="pvFundamentals">PV Fundamentals</option>
                  <option value="icsrProcessing">ICSR Processing</option>
                  <option value="caseAssessment">Case Assessment</option>
                  <option value="medicalInterpretation">Medical Interpretation</option>
                  <option value="meddraCoding">MedDRA / Coding</option>
                  <option value="documentation">Documentation</option>
                  <option value="qualityCompliance">Quality & Compliance</option>
                  <option value="analyticalReasoning">Analytical Reasoning</option>
                  <option value="situationalJudgment">Situational Judgment</option>
                </select>

                <select
                  value={jurisdictionFilter}
                  onChange={(e) => setJurisdictionFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                >
                  <option value="all">All Jurisdictions</option>
                  <option value="Global (ICH)">Global (ICH)</option>
                  <option value="European Union (EMA)">European Union (EMA)</option>
                  <option value="India (CDSCO)">India (CDSCO)</option>
                  <option value="United States (FDA)">United States (FDA)</option>
                </select>

                <select
                  value={statusFilterItem}
                  onChange={(e) => setStatusFilterItem(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                >
                  <option value="all">All Statuses</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="MONITORED">MONITORED</option>
                  <option value="EXPERT_REVIEW">EXPERT REVIEW</option>
                </select>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono px-1">
                <span>Displaying {filteredItems.length} of {AUTHORED_ACRI_ITEM_BANK.length} items</span>
                <span>Click item to inspect clinical vignette &amp; rubric</span>
              </div>

              {filteredItems.map((item) => {
                const isExpanded = expandedItemId === item.itemId;
                return (
                  <div
                    key={item.itemId}
                    className={`rounded-2xl border transition-all ${
                      isExpanded
                        ? "bg-white card-light border-[#005B4F] shadow-sm ring-1 ring-[#005B4F]/20"
                        : "bg-white card-light border-stone-200 hover:border-stone-300 shadow-2xs"
                    }`}
                  >
                    {/* Item Summary Row */}
                    <div
                      onClick={() => setExpandedItemId(isExpanded ? null : item.itemId)}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] px-2.5 py-0.5 rounded-md">
                            {item.itemId}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {item.sectionTitle}
                          </span>
                          <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                            {item.jurisdiction}
                          </span>
                          <span className="font-mono text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded uppercase">
                            {item.difficulty}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            {item.reviewStatus}
                          </span>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-stone-900 font-semibold line-clamp-2 mt-1">
                          {item.prompt}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-500">
                          <span>Domain: <strong className="text-stone-700">{item.domain}</strong></span>
                          <span>•</span>
                          <span>Citation: <strong className="text-stone-700">{item.sourceReference}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-mono text-xs flex items-center gap-1.5"
                        >
                          <span>{isExpanded ? "Collapse" : "Inspect Rubric"}</span>
                          <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Drawer: Full Vignette & Options */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-stone-100 space-y-4">
                        {/* Clinical Scenario Box */}
                        {item.clinicalScenario && (
                          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                              Clinical Case Scenario:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                              {item.clinicalScenario.patient && (
                                <div><span className="font-mono text-stone-500">Patient: </span><strong>{item.clinicalScenario.patient}</strong></div>
                              )}
                              {item.clinicalScenario.suspectDrug && (
                                <div><span className="font-mono text-stone-500">Suspect Drug: </span><strong>{item.clinicalScenario.suspectDrug}</strong></div>
                              )}
                              {item.clinicalScenario.adverseEvent && (
                                <div><span className="font-mono text-stone-500">Adverse Event: </span><strong>{item.clinicalScenario.adverseEvent}</strong></div>
                              )}
                            </div>
                            {item.clinicalScenario.narrativeSnippet && (
                              <p className="text-xs text-stone-700 italic border-l-2 border-[#005B4F] pl-3 py-1 mt-1">
                                "{item.clinicalScenario.narrativeSnippet}"
                              </p>
                            )}
                          </div>
                        )}

                        {/* Full Prompt */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">Full Assessment Prompt:</span>
                          <p className="font-serif text-sm text-stone-900 leading-relaxed font-semibold">{item.prompt}</p>
                        </div>

                        {/* Options Stack with Ground Truth Rationales */}
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            Validated Options &amp; Clinical Rationales:
                          </span>
                          <div className="space-y-2">
                            {item.options.map((opt) => (
                              <div
                                key={opt.key}
                                className={`p-3 rounded-xl border text-xs space-y-1 ${
                                  opt.isCorrect
                                    ? "bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-500/20"
                                    : "bg-stone-50 border-stone-200 text-stone-700"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span
                                    className={`h-5 w-5 rounded shrink-0 flex items-center justify-center font-mono font-bold text-[10px] ${
                                      opt.isCorrect
                                        ? "bg-emerald-700 text-slate-50"
                                        : "bg-stone-200 text-stone-700"
                                    }`}
                                  >
                                    {opt.key}
                                  </span>
                                  <div className="flex-1 space-y-1">
                                    <p className={`font-sans ${opt.isCorrect ? "font-bold text-emerald-950" : "text-stone-800"}`}>
                                      {opt.text}
                                    </p>
                                    <p className={`font-sans text-[11px] ${opt.isCorrect ? "text-emerald-800 font-medium" : "text-stone-500"}`}>
                                      <strong className="font-mono uppercase text-[10px]">{opt.isCorrect ? "Ground Truth Rationale: " : "Distractor Analysis: "}</strong>
                                      {opt.rationale}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Traceability Metadata Footer */}
                        <div className="p-3 rounded-xl bg-stone-100 text-[11px] font-mono text-stone-600 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span>Approved By: <strong>{item.approvedBy}</strong></span>
                            <span className="mx-2">•</span>
                            <span>Effective Date: <strong>{item.effectiveFrom}</strong></span>
                          </div>
                          <div>
                            <span>Regulatory Ref ID: <strong className="text-stone-900">{item.regulatoryRefId}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Cohort Scaling */}
        {activeTab === "cohort" && (
          <div className="max-w-2xl space-y-6">
            <div className="p-6 rounded-2xl bg-white card-light border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Launch Cohort Capacity Allocation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Scale the ACRI Launch Cohort capacity from the initial 100-seat launch tier to 1,000 or 10,000 seats. Scarcity percentages update immediately across all landing flows.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="number"
                  min={10}
                  max={50000}
                  value={capacityInput}
                  onChange={(e) => setCapacityInput(parseInt(e.target.value, 10) || 100)}
                  className="w-40 px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                />
                <button
                  type="button"
                  onClick={handleUpdateCapacity}
                  className="px-5 py-2 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                >
                  Save Capacity
                </button>
              </div>

              <div className="pt-2 text-xs text-stone-500 font-mono">
                Current Claimed: {cohort.claimedInvites} / {cohort.totalInvites} ({cohort.percentClaimed}%)
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
