import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  Download,
  ExternalLink,
  Eye,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  listIndustryNetworkAppsFn,
  updateIndustryNetworkStatusFn,
  type ApplicationStatus,
  type IndustryNetworkApplicationRecord,
} from "@/lib/industryNetwork.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/industry-network")({
  head: () => ({
    meta: [
      { title: "Industry Network Applications · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminIndustryNetworkPage,
});

const ALL_STATUSES: ApplicationStatus[] = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Submitted: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
  Shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  "Interview Scheduled": "bg-sky-50 text-sky-700 border-sky-200",
  Selected: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

function AdminIndustryNetworkPage() {
  const { status: authStatus } = useAdminGate(["admin", "reviewer", "support"]);
  const listApps = useServerFn(listIndustryNetworkAppsFn);
  const updateStatus = useServerFn(updateIndustryNetworkStatusFn);

  const [apps, setApps] = useState<IndustryNetworkApplicationRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    shortlisted: 0,
    interviewScheduled: 0,
    selected: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  // Selected Detail Modal
  const [selectedApp, setSelectedApp] = useState<IndustryNetworkApplicationRecord | null>(null);
  const [modalStatus, setModalStatus] = useState<ApplicationStatus>("Submitted");
  const [modalRemarks, setModalRemarks] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listApps({
        data: {
          search,
          status: statusFilter,
          course: courseFilter,
          academicYear: yearFilter,
        },
      });
      setApps(res.applications);
      setStats(res.stats);
    } catch (err: any) {
      toast.error(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus === "ready") {
      loadData();
    }
  }, [authStatus, statusFilter, courseFilter, yearFilter]);

  // Handle Search Debounce / Trigger
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const openDetails = (app: IndustryNetworkApplicationRecord) => {
    setSelectedApp(app);
    setModalStatus(app.status);
    setModalRemarks(app.adminRemarks || "");
  };

  const handleStatusChange = async (newStatus: ApplicationStatus, id: string) => {
    try {
      await updateStatus({
        data: {
          id,
          status: newStatus,
        },
      });
      toast.success(`Application updated to ${newStatus}`);
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
      );
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleSaveModal = async () => {
    if (!selectedApp) return;
    setSavingStatus(true);
    try {
      await updateStatus({
        data: {
          id: selectedApp.id,
          status: modalStatus,
          adminRemarks: modalRemarks,
        },
      });
      toast.success("Saved application status & remarks");
      setSelectedApp((prev) =>
        prev ? { ...prev, status: modalStatus, adminRemarks: modalRemarks } : null,
      );
      setApps((prev) =>
        prev.map((a) =>
          a.id === selectedApp.id
            ? { ...a, status: modalStatus, adminRemarks: modalRemarks }
            : a,
        ),
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to save remarks");
    } finally {
      setSavingStatus(false);
    }
  };

  const exportCSV = () => {
    if (apps.length === 0) {
      toast.error("No applications to export");
      return;
    }

    const headers = [
      "Application Number",
      "Full Name",
      "Email",
      "Mobile Number",
      "College Name",
      "College City",
      "Course",
      "Academic Year",
      "Status",
      "Submitted At",
      "Interest Confirmation",
      "Motivation",
      "Admin Remarks",
    ];

    const rows = apps.map((a) => [
      a.applicationNumber,
      `"${a.fullName.replace(/"/g, '""')}"`,
      a.email,
      a.mobileNumber,
      `"${a.collegeName.replace(/"/g, '""')}"`,
      `"${a.collegeCity.replace(/"/g, '""')}"`,
      `"${a.course.replace(/"/g, '""')}"`,
      a.academicYear,
      a.status,
      a.submittedAt,
      `"${a.interestConfirmation.replace(/"/g, '""')}"`,
      `"${a.motivation.replace(/"/g, '""')}"`,
      `"${(a.adminRemarks || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `industry_network_applications_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export downloaded successfully!");
  };

  if (authStatus === "loading") {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-2">
          <RefreshCw className="h-6 w-6 motion-safe:animate-spin text-[#2563EB] mx-auto" />
          <p className="text-xs font-mono text-slate-500">Checking permissions…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
              Campus Operations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#081F38] mt-1">
            Industry Network Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review, evaluate and manage student campus leadership applications (8 leads per college).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="flex items-center gap-1.5 text-xs font-mono font-bold"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "motion-safe:animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <Button
            size="sm"
            onClick={exportCSV}
            className="flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 text-xs font-mono font-bold"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Received", val: stats.total, color: "text-[#081F38]" },
          { label: "Submitted", val: stats.submitted, color: "text-blue-600" },
          { label: "Under Review", val: stats.underReview, color: "text-amber-600" },
          { label: "Shortlisted", val: stats.shortlisted, color: "text-purple-600" },
          { label: "Selected", val: stats.selected, color: "text-emerald-600" },
          { label: "Rejected", val: stats.rejected, color: "text-rose-600" },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1 shadow-2xs"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
              {card.label}
            </span>
            <p className={`font-mono text-2xl font-bold ${card.color}`}>{card.val}</p>
          </div>
        ))}
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, college, city, email, or application number..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#FAF8F5] text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-10 px-5 text-xs font-mono font-bold bg-[#2563EB] hover:bg-[#1D4ED8]"
          >
            Search
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] font-bold">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters:</span>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium"
          >
            <option value="All">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium"
          >
            <option value="All">All Academic Years</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Final Year">Final Year</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">College &amp; City</th>
                <th className="py-3 px-4">Course &amp; Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {apps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No applications match the selected criteria.
                  </td>
                </tr>
              ) : (
                apps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Applicant */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {app.photoUrl ? (
                          <img
                            src={app.photoUrl}
                            alt=""
                            className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-[#081F38]">{app.fullName}</p>
                          <p className="font-mono text-[10px] text-slate-400">
                            {app.applicationNumber}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">{app.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* College & City */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800">{app.collegeName}</p>
                      {app.collegeCity ? (
                        <p className="text-slate-400 text-[11px] flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{app.collegeCity}</span>
                        </p>
                      ) : (
                        <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200">
                          Quick Apply Lead
                        </span>
                      )}
                    </td>

                    {/* Course & Year */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 block truncate max-w-[200px]">
                        {app.course}
                      </span>
                      <span className="font-mono text-[10px] text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {app.academicYear}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(e.target.value as ApplicationStatus, app.id)
                        }
                        className={`h-7 px-2 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                          STATUS_COLORS[app.status]
                        }`}
                      >
                        {ALL_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Submitted At */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(app.submittedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetails(app)}
                        className="h-8 px-2.5 text-xs text-[#2563EB] hover:text-[#1D4ED8]"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        <span>Inspect</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INSPECTION MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {selectedApp.photoUrl ? (
                  <img
                    src={selectedApp.photoUrl}
                    alt={selectedApp.fullName}
                    className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <User className="h-8 w-8" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#081F38]">{selectedApp.fullName}</h2>
                    <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded">
                      {selectedApp.applicationNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedApp.collegeName}
                    {selectedApp.collegeCity ? ` · ${selectedApp.collegeCity}` : ""}
                  </p>
                  <p className="font-mono text-[11px] text-slate-400">
                    {selectedApp.course} ({selectedApp.academicYear})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Details & Direct Connect Actions */}
            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span className="font-mono font-medium">+91 {selectedApp.mobileNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">{selectedApp.email}</span>
                </div>
              </div>

              {/* Direct Outreach Shortcuts */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/80">
                <a
                  href={`https://wa.me/91${selectedApp.mobileNumber}?text=${encodeURIComponent(
                    `Hi ${selectedApp.fullName}, this is from the Arzon Global Directorate regarding your Industry Network Lead application (${selectedApp.applicationNumber}) for ${selectedApp.collegeName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-slate-50 font-mono text-xs font-bold transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Candidate</span>
                </a>
                <a
                  href={`tel:+91${selectedApp.mobileNumber}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-bold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Candidate</span>
                </a>
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-bold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Motivation Statement */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                APPLICATION NOTES / MOTIVATION
              </span>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedApp.motivation === "Fast-Track Application" ? (
                  <span className="text-slate-500 italic">
                    ⚡ Fast-Track 4-Field Application (Name, Mobile, Email, College). Direct outreach recommended.
                  </span>
                ) : (
                  selectedApp.motivation
                )}
              </div>
            </div>

            {/* Representation Confirmation */}
            <div className="p-3.5 rounded-xl border border-blue-100 bg-[#EEF6FF] text-xs space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase text-[#1D4ED8] block">
                CAMPUS REPRESENTATION INTEREST
              </span>
              <p className="font-semibold text-[#081F38]">{selectedApp.interestConfirmation}</p>
            </div>

            {/* Status & Remarks Form */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Update Application Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as ApplicationStatus)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Remarks / Interview Notes
                </label>
                <textarea
                  rows={2}
                  value={modalRemarks}
                  onChange={(e) => setModalRemarks(e.target.value)}
                  placeholder="Add evaluation comments, interview date, or coordinator notes..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveModal}
                  disabled={savingStatus}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-slate-50 text-xs font-mono font-bold"
                >
                  {savingStatus ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
