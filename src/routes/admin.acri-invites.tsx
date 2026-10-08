import { useEffect, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/features/admin/components/admin/AdminShell";
import {
  getAcriInvitationCodes,
  resetAcriCodes,
  assignCandidateToSeat,
  releaseAcriSeat,
  type AcriInvitationCode,
  type AcriInviteStatus,
} from "@/lib/acri/acriAccessCodes";
import {
  type AcriCandidate,
  rejectCandidateApplication,
  approveCandidateApplication,
} from "@/lib/acri/acriCandidateStore";
import { getAcriAdminCandidatesFn, approveAcriCandidateFn } from "@/lib/acri-core.functions";
import {
  KeyRound,
  Download,
  Copy,
  CheckCircle2,
  Clock,
  RotateCcw,
  Search,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Users,
  AlertCircle,
  Share2,
  MessageSquare,
  Mail,
  Phone,
  GraduationCap,
  X,
  Check,
  ArrowRight,
  UserPlus,
} from "lucide-react";

export const Route = createFileRoute("/admin/acri-invites")({
  head: () => ({
    meta: [
      { title: "ACRI Candidate Invites (100) · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminAcriInvitesPage,
});

export function AdminAcriInvitesPage() {
  const [codes, setCodes] = useState<AcriInvitationCode[]>([]);
  const [candidates, setCandidates] = useState<AcriCandidate[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | AcriInviteStatus>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const getCandidates = useServerFn(getAcriAdminCandidatesFn);
  const approveCandidate = useServerFn(approveAcriCandidateFn);

  // Dispatch Modal State
  const [dispatchModalData, setDispatchModalData] = useState<{
    candidateName: string;
    candidateEmail: string;
    candidateMobile?: string;
    qualification?: string;
    seatNumber: number;
    code: string;
  } | null>(null);

  // Assign Candidate to Specific Seat Modal State
  const [assignSeatTarget, setAssignSeatTarget] = useState<AcriInvitationCode | null>(null);

  const loadData = async () => {
    setCodes(getAcriInvitationCodes());
    try {
      const list = await getCandidates();
      setCandidates(list.map((x: any) => ({ id: x.id, fullName: x.full_name, email: x.email, mobile: x.mobile, highestQualification: x.highest_qualification, collegeUniversity: x.college_university, currentlyWorking: x.currently_working, cohortId: x.cohort_id, inviteCode: x.invite_code, status: x.status, createdAt: x.created_at, updatedAt: x.updated_at })));
    } catch (err: any) { toast.error(err?.message || "Unable to load live ACRI candidates."); }
  };

  useEffect(() => {
    void loadData();
    const handleCodesUpdate = () => setCodes(getAcriInvitationCodes());
    const handleCandidatesUpdate = () => void loadData();
    window.addEventListener("arzon:acri:codes-updated", handleCodesUpdate);
    window.addEventListener("arzon:acri:candidates-updated", handleCandidatesUpdate);
    return () => {
      window.removeEventListener("arzon:acri:codes-updated", handleCodesUpdate);
      window.removeEventListener("arzon:acri:candidates-updated", handleCandidatesUpdate);
    };
  }, []);

  // Compute Pending Admissions Candidates
  const pendingCandidates = useMemo(() => {
    return candidates.filter(
      (c) => c.status === "pending_review" || (!c.inviteCode && c.status === "registered")
    );
  }, [candidates]);

  const stats = useMemo(() => {
    const total = codes.length;
    const available = codes.filter((c) => c.status === "available").length;
    const active = codes.filter((c) => c.status === "active").length;
    const completed = codes.filter((c) => c.status === "completed").length;
    const pending = pendingCandidates.length;
    return { total, available, active, completed, pending };
  }, [codes, pendingCandidates]);

  const filteredCodes = useMemo(() => {
    return codes.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        (c.assignedCandidateName &&
          c.assignedCandidateName.toLowerCase().includes(search.toLowerCase())) ||
        (c.assignedCandidateEmail &&
          c.assignedCandidateEmail.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = filterStatus === "all" || c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [codes, search, filterStatus]);

  const filteredPending = useMemo(() => {
    return pendingCandidates.filter((c) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.collegeUniversity.toLowerCase().includes(s)
      );
    });
  }, [pendingCandidates, search]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Copied code: ${code}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    const url = `${origin}/acri/invite?code=${code}`;
    navigator.clipboard.writeText(url);
    toast.success(`Copied direct assessment link for ${code}`);
  };

  const handleCopyNextAvailable = () => {
    const next = codes.find((c) => c.status === "available");
    if (!next) {
      toast.error("No available codes remaining! No available ACRI invitations remain.");
      return;
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    const url = `${origin}/acri/invite?code=${next.code}`;
    navigator.clipboard.writeText(url);
    toast.success(`Copied direct invite link for next slot #${next.slotNumber} (${next.code})`);
  };

  const handleApproveCandidate = async (candidate: AcriCandidate) => {
    try {
const res = await approveCandidate({ data: { candidateId: candidate.id } });
      loadData();
      toast.success(`Approved ${candidate.fullName}! Allocated seat: ${res.inviteCode}`);

      // Extract slot number from code (e.g. ARZON-ACRI-005 -> 5)
      const slotMatch = res.inviteCode.match(/\d+$/);
      const slotNum = slotMatch ? parseInt(slotMatch[0], 10) : 1;

      setDispatchModalData({
        candidateName: candidate.fullName,
        candidateEmail: candidate.email,
        candidateMobile: candidate.mobile,
        qualification: candidate.highestQualification,
        seatNumber: slotNum,
        code: res.inviteCode,
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve candidate.");
    }
  };

  const handleRejectCandidate = (candidate: AcriCandidate) => {
    if (window.confirm(`Reject admission application for ${candidate.fullName}?`)) {
      rejectCandidateApplication(candidate.id);
      loadData();
      toast.info(`Application for ${candidate.fullName} removed from review queue.`);
    }
  };

  const handleAssignPendingToSeat = (candidate: AcriCandidate, seat: AcriInvitationCode) => {
    try {
      assignCandidateToSeat(seat.slotNumber, {
        fullName: candidate.fullName,
        email: candidate.email,
        mobile: candidate.mobile,
      });

      // Update candidate record
      approveCandidateApplication(candidate.id);

      loadData();
      setAssignSeatTarget(null);
      toast.success(`Assigned ${candidate.fullName} to Seat #${seat.slotNumber.toString().padStart(3, "0")} (${seat.code})`);

      setDispatchModalData({
        candidateName: candidate.fullName,
        candidateEmail: candidate.email,
        candidateMobile: candidate.mobile,
        qualification: candidate.highestQualification,
        seatNumber: seat.slotNumber,
        code: seat.code,
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to assign seat.");
    }
  };

  const handleReleaseSeat = (slotNumber: number) => {
    if (window.confirm(`Release seat #${slotNumber.toString().padStart(3, "0")} back to available state?`)) {
      releaseAcriSeat(slotNumber);
      loadData();
      toast.success(`Seat #${slotNumber.toString().padStart(3, "0")} is now Available.`);
    }
  };

  const handleExportCsv = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
    const headers = [
      "Slot",
      "Code",
      "Direct Invite URL",
      "Status",
      "Candidate Name",
      "Candidate Email",
      "Redeemed At",
      "Score",
      "Readiness Band",
    ];

    const rows = codes.map((c) => [
      c.slotNumber,
      c.code,
      `${origin}/acri/invite?code=${c.code}`,
      c.status.toUpperCase(),
      c.assignedCandidateName || "",
      c.assignedCandidateEmail || "",
      c.redeemedAt || "",
      c.score !== undefined ? `${c.score}/100` : "",
      c.readinessBand || "",
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.map((f) => `"${f}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `arzon_acri_100_cohort_invitations_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("Exported 100 ACRI candidate codes to CSV");
  };

  const handleResetCodes = () => {
    if (window.confirm("Are you sure you want to reset all 100 codes to default available state?")) {
      const fresh = resetAcriCodes();
      setCodes(fresh);
      toast.success("Reset all 100 ACRI invitation codes.");
    }
  };

  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";

  return (
    <AdminShell>
      <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Navigation & Section Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              <span>100 Seat Ledger</span>
            </span>
            <Link
              to="/admin/acri"
              className="px-3 py-1.5 rounded-xl text-zinc-400 hover:text-slate-100 hover:bg-slate-800/60 font-mono font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>ACRI Command Center</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/acri/pharmacovigilance-certification"
              target="_blank"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-zinc-300 hover:text-slate-50 font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Landing</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              to="/acri/leaderboard"
              target="_blank"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-zinc-300 hover:text-slate-50 font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Leaderboard</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>COHORT CONTROL · 100 SEAT ALLOCATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-50 tracking-tight">
              ACRI Candidate Invitation Codes
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Strict invitation-only access codes for 100 candidates. Both Practice Mode and Official
              Certification Mode require a valid code from this ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyNextAvailable}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <KeyRound className="h-4 w-4" />
              <span>Copy Next Available Link</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-50 font-mono font-medium text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export 100 Codes CSV</span>
            </button>

            <button
              type="button"
              onClick={handleResetCodes}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-mono text-xs border border-red-500/20 transition-colors cursor-pointer"
              title="Reset codes"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Metrics Cards (Including Admissions Review Queue indicator) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-zinc-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>Total Cohort Cap</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-50 font-mono">{stats.total}</div>
            <div className="text-[11px] text-zinc-500">Fixed candidate capacity</div>
          </div>

          <div
            onClick={() => setFilterStatus("pending")}
            className={`rounded-2xl border p-5 space-y-1 cursor-pointer transition-all ${
              stats.pending > 0
                ? "border-amber-500/50 bg-amber-950/20 hover:bg-amber-950/30"
                : "border-slate-800 bg-zinc-900/60"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className={stats.pending > 0 ? "text-amber-400 font-bold" : ""}>Pending Admissions</span>
              <AlertCircle className={`h-4 w-4 ${stats.pending > 0 ? "text-amber-400" : "text-zinc-500"}`} />
            </div>
            <div className={`text-3xl font-extrabold font-mono flex items-center gap-2 ${
              stats.pending > 0 ? "text-amber-400" : "text-zinc-400"
            }`}>
              <span>{stats.pending}</span>
              {stats.pending > 0 && (
                <span className="h-2 w-2 rounded-full bg-amber-400 motion-safe:animate-pulse" />
              )}
            </div>
            <div className="text-[11px] text-zinc-500">
              {stats.pending > 0 ? "Awaiting seat allocation" : "Admissions clear"}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-zinc-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>Available Codes</span>
              <KeyRound className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.available}
            </div>
            <div className="text-[11px] text-zinc-500">Ready to distribute</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-zinc-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>In Progress / Active</span>
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">{stats.active}</div>
            <div className="text-[11px] text-zinc-500">Candidates in battery</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-zinc-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>Completed &amp; Evaluated</span>
              <CheckCircle2 className="h-4 w-4 text-teal-400" />
            </div>
            <div className="text-3xl font-extrabold text-teal-400 font-mono">{stats.completed}</div>
            <div className="text-[11px] text-zinc-500">Generated scorecards</div>
          </div>
        </div>

        {/* ── Admissions Review Queue Banner (Prominently displays pending applicants like Rahul Bathula) ── */}
        {pendingCandidates.length > 0 && (
          <div className="rounded-2xl border border-amber-500/40 bg-zinc-900/90 overflow-hidden shadow-xl">
            <div className="bg-amber-500/10 px-5 py-3.5 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 motion-safe:animate-pulse shrink-0" />
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Admissions Board Review Queue · {pendingCandidates.length} Application{pendingCandidates.length > 1 ? "s" : ""} Pending Review
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                Verify degree alignment &amp; dispatch private Access Key
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              {pendingCandidates.map((cand) => (
                <div key={cand.id} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base text-slate-100">{cand.fullName}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ● Admissions Review In Progress
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Mail className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{cand.email}</span>
                      </span>
                      {cand.mobile && (
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Phone className="h-3.5 w-3.5 text-zinc-500" />
                          <span>{cand.mobile}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>{cand.highestQualification}</span>
                      </span>
                      {cand.collegeUniversity && (
                        <span className="text-zinc-500 truncate max-w-xs">
                          {cand.collegeUniversity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleApproveCandidate(cand)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve &amp; Allocate Next Seat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRejectCandidate(cand)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-400 hover:text-red-300 font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, candidate name, or email..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-800/80 border border-slate-700 rounded-lg text-xs text-slate-50 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                filterStatus === "all"
                  ? "bg-slate-800 text-slate-50 border border-slate-700 shadow-xs"
                  : "text-zinc-400 hover:text-slate-50 hover:bg-slate-800/40"
              }`}
            >
              ALL ({stats.total})
            </button>

            {stats.pending > 0 && (
              <button
                type="button"
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  filterStatus === "pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs font-bold"
                    : "text-amber-400 hover:bg-amber-500/10"
                }`}
              >
                Pending Review ({stats.pending})
              </button>
            )}

            {(["available", "active", "completed"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors cursor-pointer ${
                  filterStatus === st
                    ? "bg-slate-800 text-slate-50 border border-slate-700 shadow-xs"
                    : "text-zinc-400 hover:text-slate-50 hover:bg-slate-800/40"
                }`}
              >
                {st} ({stats[st]})
              </button>
            ))}
          </div>
        </div>

        {/* Codes Table */}
        <div className="rounded-2xl border border-slate-800 bg-zinc-900/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-800/80 text-zinc-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Seat #</th>
                  <th className="py-3 px-4">Access Code</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Performance</th>
                  <th className="py-3 px-4 text-right">Quick Share &amp; Dispatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {filterStatus === "pending" ? (
                  filteredPending.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono">
                        No pending applications matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPending.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-amber-400 font-bold">
                          QUEUED
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-zinc-400 italic">Unassigned</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 motion-safe:animate-pulse" />
                            Pending Review
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-50">{p.fullName}</div>
                          <div className="text-[11px] text-zinc-400 font-mono">{p.email}</div>
                          {p.mobile && <div className="text-[10px] text-zinc-500 font-mono">{p.mobile}</div>}
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-400">
                          {p.highestQualification}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleApproveCandidate(p)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold text-[11px] uppercase transition-colors cursor-pointer"
                          >
                            <Check className="h-3 w-3" />
                            <span>Approve &amp; Assign</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                ) : filteredCodes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono">
                      No codes found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCodes.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-zinc-400">
                        #{item.slotNumber.toString().padStart(3, "0")}
                      </td>

                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-50 bg-zinc-800 px-2.5 py-1 rounded border border-slate-700">
                            {item.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(item.code)}
                            className="text-zinc-400 hover:text-slate-50 p-1 rounded hover:bg-slate-800 transition-colors"
                            title="Copy Code"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {item.status === "available" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Available
                          </span>
                        )}
                        {item.status === "active" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 motion-safe:animate-pulse" />
                            In Assessment
                          </span>
                        )}
                        {item.status === "completed" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                            <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
                            Completed
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {item.assignedCandidateName ? (
                          <div>
                            <div className="font-medium text-slate-50">{item.assignedCandidateName}</div>
                            {item.assignedCandidateEmail && (
                              <div className="text-[11px] text-zinc-400 font-mono">
                                {item.assignedCandidateEmail}
                              </div>
                            )}
                            {item.notes && item.notes.startsWith("Mobile:") && (
                              <div className="text-[10px] text-zinc-500 font-mono">
                                {item.notes}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-500 italic">Unassigned</span>
                            {pendingCandidates.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setAssignSeatTarget(item)}
                                className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                              >
                                + Assign Candidate
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {item.score !== undefined ? (
                          <div className="inline-flex items-center gap-2">
                            <span className="font-mono font-extrabold text-slate-50 text-sm bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                              {item.score}/100
                            </span>
                            <span className="text-[11px] text-emerald-300 font-medium">
                              {item.readinessBand || "Industry Ready"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-600 font-mono">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(item.code)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-50 font-mono text-[11px] transition-colors cursor-pointer border border-slate-700"
                            title="Copy direct invite link"
                          >
                            <ExternalLink className="h-3 w-3 text-emerald-400" />
                            <span>Copy Link</span>
                          </button>

                          {item.assignedCandidateName && (
                            <button
                              type="button"
                              onClick={() => {
                                const phoneMatch = item.notes?.match(/\+?\d[\d\s-]{8,}/);
                                setDispatchModalData({
                                  candidateName: item.assignedCandidateName || "Candidate",
                                  candidateEmail: item.assignedCandidateEmail || "",
                                  candidateMobile: phoneMatch ? phoneMatch[0] : undefined,
                                  seatNumber: item.slotNumber,
                                  code: item.code,
                                });
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-slate-50 font-mono text-[11px] transition-colors cursor-pointer border border-slate-700"
                              title="Open dispatch options"
                            >
                              <Share2 className="h-3 w-3 text-blue-400" />
                              <span>Dispatch</span>
                            </button>
                          )}

                          {item.assignedCandidateName && item.status !== "completed" && (
                            <button
                              type="button"
                              onClick={() => handleReleaseSeat(item.slotNumber)}
                              className="text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                              title="Release seat back to Available"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Access Key Dispatch Modal (Satisfies Step 02 of Candidate Protocol) ── */}
      {dispatchModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-slate-700 shadow-2xl p-6 space-y-5 text-slate-100 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Access Key Dispatch Protocol
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDispatchModalData(null)}
                className="text-zinc-400 hover:text-slate-50 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-slate-700 space-y-2">
                <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                  Allocated Cohort Seat
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400 text-lg">
                      #{dispatchModalData.seatNumber.toString().padStart(3, "0")}
                    </span>
                    <span className="font-mono font-extrabold text-slate-50 bg-zinc-900 px-3 py-1 rounded-lg border border-slate-600 text-sm">
                      {dispatchModalData.code}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">ACRI Pharmacovigilance Certification</span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-zinc-300 font-mono">
                <div>Candidate: <strong>{dispatchModalData.candidateName}</strong></div>
                <div>Email: <strong>{dispatchModalData.candidateEmail}</strong></div>
                {dispatchModalData.candidateMobile && (
                  <div>Mobile: <strong>{dispatchModalData.candidateMobile}</strong></div>
                )}
              </div>

              {/* Pre-written dispatch message */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  Dispatch Notification Text
                </label>
                <textarea
                  readOnly
                  rows={4}
                  value={`Dear ${dispatchModalData.candidateName},\n\nYour application for the ACRI Pharmacovigilance Certification (ACRI Pharmacovigilance Certification) has been approved by the Admissions Board.\n\nYour Private Access Key: ${dispatchModalData.code}\nDirect Workstation Link: ${originUrl}/acri/invite?code=${dispatchModalData.code}\n\nYour profile has been pre-loaded for immediate entry into the 25-minute examination battery.\n\n— Arzon Admissions Board`}
                  className="w-full p-3 bg-zinc-800 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 select-all focus:outline-none"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {dispatchModalData.candidateMobile ? (
                <a
                  href={`https://wa.me/${dispatchModalData.candidateMobile.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                    `Dear ${dispatchModalData.candidateName},\n\nYour application for the ACRI Pharmacovigilance Certification (ACRI Pharmacovigilance Certification) has been approved by the Admissions Board.\n\nYour Access Key: ${dispatchModalData.code}\nDirect Link: ${originUrl}/acri/invite?code=${dispatchModalData.code}\n\nGood luck!\n— Arzon Admissions Board`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm text-center"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send via WhatsApp</span>
                </a>
              ) : null}

              <a
                href={`mailto:${dispatchModalData.candidateEmail}?subject=${encodeURIComponent(
                  "ACRI Pharmacovigilance Certification · Access Key Approved"
                )}&body=${encodeURIComponent(
                  `Dear ${dispatchModalData.candidateName},\n\nYour application for the ACRI Pharmacovigilance Certification (ACRI Pharmacovigilance Certification) has been approved by the Admissions Board.\n\nYour Private Access Key: ${dispatchModalData.code}\nDirect Workstation Link: ${originUrl}/acri/invite?code=${dispatchModalData.code}\n\nYour profile has been pre-loaded. When you enter with your key, your 25-minute workstation launches immediately.\n\n— Arzon Admissions Board`
                )}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm text-center"
              >
                <Mail className="h-4 w-4" />
                <span>Send via Email</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${originUrl}/acri/invite?code=${dispatchModalData.code}`);
                  toast.success("Copied direct workstation link to clipboard!");
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copy Direct Link</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const msg = `Dear ${dispatchModalData.candidateName},\n\nYour application for the ACRI Pharmacovigilance Certification (ACRI Pharmacovigilance Certification) has been approved by the Admissions Board.\n\nYour Access Key: ${dispatchModalData.code}\nDirect Link: ${originUrl}/acri/invite?code=${dispatchModalData.code}\n\n— Arzon Admissions Board`;
                  navigator.clipboard.writeText(msg);
                  toast.success("Copied dispatch message to clipboard!");
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Copy Message Text</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Assign Pending Candidate to Specific Seat Modal ── */}
      {assignSeatTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-slate-100 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Assign Seat #{assignSeatTarget.slotNumber.toString().padStart(3, "0")} ({assignSeatTarget.code})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAssignSeatTarget(null)}
                className="text-zinc-400 hover:text-slate-50 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select an applicant from the Admissions Review Queue to allocate to this seat:
            </p>

            <div className="max-h-60 overflow-y-auto space-y-2 divide-y divide-slate-800">
              {pendingCandidates.map((cand) => (
                <div key={cand.id} className="pt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-100 text-xs">{cand.fullName}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{cand.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAssignPendingToSeat(cand, assignSeatTarget)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-mono font-bold text-[11px] uppercase cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
