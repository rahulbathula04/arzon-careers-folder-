import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Button } from "@/components/ui/button";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useServerFn } from "@tanstack/react-start";
import { recordAdminExport } from "@/lib/admin-export.functions";

export const Route = createFileRoute("/admin/backups")({
  head: () => ({
    meta: [{ title: "Backups · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminBackupsPage,
});

type BackupRun = {
  id: string;
  started_at: string;
  finished_at: string | null;
  status: "running" | "success" | "failed" | "skipped";
  table_count: number;
  row_count: number;
  bytes: number;
  destination: string | null;
  error: string | null;
  details: Record<string, unknown> | null;
};

function formatBytes(n: number): string {
  if (!n) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1);
  return `${(n / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function statusClass(status: BackupRun["status"]): string {
  switch (status) {
    case "success":
      return "bg-sky-500/15 text-sky-200 border-sky-400/30";
    case "failed":
      return "bg-rose-500/15 text-rose-200 border-rose-400/30";
    case "running":
      return "bg-accent-glow/15 text-eyebrow-strong border-accent-glow/30";
    case "skipped":
      return "bg-amber-500/15 text-amber-200 border-amber-400/30";
  }
}

function AdminBackupsPage() {
  const recordExport = useServerFn(recordAdminExport);
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  const [runs, setRuns] = useState<BackupRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("backup_runs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(60);
      if (cancelled) return;
      if (error) toast.error(error.message);
      else setRuns((data ?? []) as BackupRun[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status !== "ready") return null;

  const lastSuccess = runs.find((r) => r.status === "success");
  const lastFailure = runs.find((r) => r.status === "failed");

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Reliability
          </p>
          <h1 className="h-display mt-2">Nightly backups</h1>
          <p className="mt-1 text-sm text-foreground">
            Off-site copies of high-value tables. Triggered nightly via pg_cron.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={runs.length === 0}
          onClick={() => {
            const columns: CsvColumn<BackupRun>[] = [
              { key: "started_at", header: "Started" },
              { key: "finished_at", header: "Finished" },
              { key: "status", header: "Status" },
              { key: "table_count", header: "Tables" },
              { key: "row_count", header: "Rows" },
              { key: "bytes", header: "Bytes" },
              { key: "destination", header: "Destination" },
              { key: "error", header: "Error" },
              { key: "id", header: "ID" },
            ];
            exportCsvAudited(
              recordExport,
              "backup_runs",
              dateStampedFilename("backup-runs"),
              runs,
              columns,
            ).catch((e) => toast.error(e instanceof Error ? e.message : "Export blocked"));
          }}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
        </Button>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Last success"
          value={lastSuccess ? new Date(lastSuccess.started_at).toLocaleString() : "-"}
        />
        <Stat
          label="Last failure"
          value={lastFailure ? new Date(lastFailure.started_at).toLocaleString() : "-"}
        />
        <Stat label="Runs (last 60)" value={String(runs.length)} />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-foreground">
          <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
        </div>
      ) : runs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
          No backup runs yet. The nightly job will appear here once it has run at least once.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-micro uppercase tracking-[0.22em] text-foreground">
              <tr>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tables</th>
                <th className="px-4 py-3">Rows</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Destination</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id} className="border-t border-border/60 align-top">
                  <td className="px-4 py-3 text-foreground">
                    <div>{new Date(r.started_at).toLocaleString()}</div>
                    {r.finished_at && (
                      <div className="text-xs text-muted-foreground">
                        finished {new Date(r.finished_at).toLocaleTimeString()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-micro uppercase tracking-wider ${statusClass(r.status)}`}
                    >
                      {r.status}
                    </span>
                    {r.error && (
                      <div className="mt-1 max-w-md text-xs text-rose-200/80">{r.error}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.table_count}</td>
                  <td className="px-4 py-3 text-foreground">{r.row_count.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">{formatBytes(r.bytes)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {r.destination ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4">
      <p className="text-micro font-mono uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
