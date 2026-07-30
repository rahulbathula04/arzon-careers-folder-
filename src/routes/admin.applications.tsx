import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useAdminGate } from "@/hooks/useAdminGate";
import { listApplications, updateApplicationStatus } from "@/lib/applications.functions";
import { track } from "@/lib/track";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [{ title: "Applications · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminApplicationsPage,
});

type Status = "loading" | "unauth" | "forbidden" | "ready";

type AppRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  program_slug: string;
  program_name: string | null;
  status: string;
  notes: string | null;
  utm_source: string | null;
};

const STATUSES = [
  "submitted",
  "reviewing",
  "shortlisted",
  "accepted",
  "enrolled",
  "rejected",
  "withdrawn",
] as const;

function AdminApplicationsPage() {
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  const [rows, setRows] = useState<AppRow[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 50;
  const list = useServerFn(listApplications);
  const update = useServerFn(updateApplicationStatus);
  const recordExport = useServerFn(recordAdminExport);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list({ data: { page, pageSize, status: filter || undefined } });
        if (!cancelled) {
          setRows(res.applications as AppRow[]);
          setTotal(res.total ?? 0);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load applications");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, list, page, filter]);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  const filtered = rows; // server-side filtered + paginated
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const csvColumns: CsvColumn<AppRow>[] = useMemo(
    () => [
      { key: "created_at", header: "Created" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "phone", header: "Phone" },
      { key: "program_slug", header: "Programme slug" },
      { key: "program_name", header: "Programme" },
      { key: "status", header: "Status" },
      { key: "utm_source", header: "UTM source" },
      { key: "notes", header: "Notes" },
      { key: "id", header: "ID" },
    ],
    [],
  );

  async function onExport() {
    try {
      await exportCsvAudited(
        recordExport,
        "applications",
        dateStampedFilename(filter ? `applications-${filter}` : "applications"),
        filtered,
        csvColumns,
        { filter: filter || null },
      );
      track("admin_export_csv", {
        props: { entity: "applications", count: filtered.length, filter: filter || null },
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  }

  async function changeStatus(row: AppRow, next: string) {
    setSavingId(row.id);
    try {
      await update({ data: { id: row.id, status: next as (typeof STATUSES)[number] } });
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)));
      toast.success(`Moved to ${next}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  }

  function viewApplication(row: AppRow) {
    track("admin_application_viewed", {
      application_id: row.id,
      program_slug: row.program_slug,
    });
  }

  if (status !== "ready") return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Pipeline
          </p>
          <h1 className="h-display mt-2">Applications</h1>
          <p className="mt-1 text-sm text-foreground">
            {total} total · page {page + 1} of {pageCount}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 rounded-full border border-border bg-muted px-4 text-sm text-foreground"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onExport}
            disabled={filtered.length === 0}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-micro uppercase tracking-[0.22em] text-foreground">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Programme</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-t border-border/60 cursor-pointer hover:bg-muted/60"
                onClick={() => viewApplication(r)}
              >
                <td className="px-4 py-3 text-foreground">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-foreground">{r.utm_source ?? "-"}</div>
                </td>
                <td className="px-4 py-3 text-foreground">{r.program_name ?? r.program_slug}</td>
                <td className="px-4 py-3 text-foreground">
                  <div>{r.email}</div>
                  <div className="text-xs text-foreground">{r.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    disabled={savingId === r.id}
                    onChange={(e) => changeStatus(r, e.target.value)}
                    className="rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span className="font-mono text-xs text-foreground">
          {page + 1} / {pageCount}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
