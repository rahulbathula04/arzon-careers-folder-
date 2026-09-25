import { useEffect, useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminShell } from "@/features/admin/components/admin/AdminShell";
import {
  getAcriInvitationCodes,
  saveAcriInvitationCodes,
  resetAcriCodes,
  type AcriInvitationCode,
  type AcriInviteStatus,
} from "@/lib/acri/acriAccessCodes";
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

function AdminAcriInvitesPage() {
  const [codes, setCodes] = useState<AcriInvitationCode[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | AcriInviteStatus>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadCodes = () => {
    setCodes(getAcriInvitationCodes());
  };

  useEffect(() => {
    loadCodes();
    const handleUpdate = () => loadCodes();
    window.addEventListener("arzon:acri:codes-updated", handleUpdate);
    return () => window.removeEventListener("arzon:acri:codes-updated", handleUpdate);
  }, []);

  const stats = useMemo(() => {
    const total = codes.length;
    const available = codes.filter((c) => c.status === "available").length;
    const active = codes.filter((c) => c.status === "active").length;
    const completed = codes.filter((c) => c.status === "completed").length;
    return { total, available, active, completed };
  }, [codes]);

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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Copied code: ${code}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/career-engine/test?code=${code}`;
    navigator.clipboard.writeText(url);
    toast.success(`Copied assessment direct link for ${code}`);
  };

  const handleCopyNextAvailable = () => {
    const next = codes.find((c) => c.status === "available");
    if (!next) {
      toast.error("No available codes remaining! All 100 codes have been redeemed.");
      return;
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/career-engine/test?code=${next.code}`;
    navigator.clipboard.writeText(url);
    toast.success(`Copied direct invite link for next slot #${next.slotNumber} (${next.code})`);
  };

  const handleExportCsv = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
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
      `${origin}/career-engine/test?code=${c.code}`,
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

  return (
    <AdminShell>
      <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
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
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
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

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-zinc-900/60 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span>Total Cohort Cap</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-50 font-mono">{stats.total}</div>
            <div className="text-[11px] text-zinc-500">Fixed candidate capacity</div>
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
            {(["all", "available", "active", "completed"] as const).map((st) => (
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
                {st} ({st === "all" ? stats.total : stats[st]})
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
                  <th className="py-3 px-4 text-right">Quick Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {filteredCodes.map((item) => (
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
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {item.score !== undefined ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="font-mono font-extrabold text-slate-50 text-sm bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                            {item.score}/100
                          </span>
                          <span className="text-[11px] text-emerald-300 font-medium">
                            {item.readinessBand || "Evaluated"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-600 font-mono">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.code)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-50 font-mono text-[11px] transition-colors cursor-pointer border border-slate-700"
                        title="Copy direct invite link"
                      >
                        <ExternalLink className="h-3 w-3 text-emerald-400" />
                        <span>Copy Link</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
