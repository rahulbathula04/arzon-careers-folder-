import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminGate } from "@/hooks/useAdminGate";
import { auditTables, listAuditLog, restoreRecord } from "@/lib/audit.functions";
import { exportCsvAudited, dateStampedFilename } from "@/lib/csv";
import { recordAdminExport } from "@/lib/admin-export.functions";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [{ title: "Audit log · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminAuditPage,
});

type AuditRow = {
  id: string;
  occurred_at: string;
  actor_id: string | null;
  table_name: string;
  record_id: string;
  action: "insert" | "update" | "archive" | "restore" | "hard_delete";
  diff: Record<string, unknown>;
};

const ACTIONS = ["insert", "update", "archive", "restore", "hard_delete"] as const;
const ARCHIVABLE = new Set<string>(auditTables);

function AdminAuditPage() {
  const { status } = useAdminGate(["admin"]);
  const listFn = useServerFn(listAuditLog);
  const restoreFn = useServerFn(restoreRecord);
  const recordExport = useServerFn(recordAdminExport);
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    if (status !== "ready") return;
    let cancelled = false;
    setLoading(true);
    listFn({
      data: {
        table: table || undefined,
        action: (action || undefined) as AuditRow["action"] | undefined,
        limit: 200,
      },
    })
      .then((res) => {
        if (!cancelled) setRows(res.rows as AuditRow[]);
      })
      .catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [status, table, action, bump, listFn]);

  const visibleRows = useMemo(() => rows, [rows]);

  async function onRestore(row: AuditRow) {
    if (!ARCHIVABLE.has(row.table_name)) {
      toast.error("This table does not support restore.");
      return;
    }
    if (!confirm(`Restore ${row.table_name} record ${row.record_id}?`)) return;
    try {
      await restoreFn({ data: { table: row.table_name, id: row.record_id } });
      toast.success("Restored");
      setBump((b) => b + 1);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Restore failed");
    }
  }

  async function onExport() {
    try {
      await exportCsvAudited(
        recordExport,
        "audit_log",
        dateStampedFilename("audit-log"),
        visibleRows,
        [
          { key: "occurred_at", header: "When" },
          { key: "table_name", header: "Table" },
          { key: "record_id", header: "Record ID" },
          { key: "action", header: "Action" },
          { key: "actor_id", header: "Actor" },
          { key: "diff", header: "Diff" },
        ],
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 p-8 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (status === "unauth") {
    return (
      <div className="mx-auto max-w-md p-8 text-center text-sm text-foreground">
        You need to sign in.{" "}
        <Link to="/admin/login" className="underline">
          Go to sign in
        </Link>
      </div>
    );
  }
  if (status === "forbidden") {
    return (
      <div className="mx-auto max-w-md p-8 text-center text-sm text-foreground">Admin only.</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h3 font-semibold text-foreground">Audit log</h1>
          <p className="text-sm text-muted-foreground">
            Every insert, update, archive, restore, and hard delete on protected tables.
          </p>
        </div>
        <Button variant="secondary" onClick={onExport} disabled={!visibleRows.length}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </header>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-border bg-muted/60 p-4">
        <label className="text-xs text-foreground">
          Table
          <select
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground"
          >
            <option value="">All</option>
            {auditTables.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-foreground">
          Action
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="ml-2 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-sm text-foreground"
          >
            <option value="">All</option>
            {ACTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <Button size="sm" variant="ghost" onClick={() => setBump((b) => b + 1)}>
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Table</th>
              <th className="px-3 py-2">Record</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Actor</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : visibleRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">
                  No audit events yet.
                </td>
              </tr>
            ) : (
              visibleRows.map((r) => {
                const isOpen = expanded === r.id;
                const isArchive = r.action === "archive";
                return (
                  <>
                    <tr key={r.id} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-mono text-micro text-foreground">
                        {new Date(r.occurred_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-foreground">{r.table_name}</td>
                      <td className="px-3 py-2 font-mono text-micro text-muted-foreground">
                        {r.record_id.slice(0, 8)}…
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-micro uppercase tracking-wider ${
                            r.action === "archive"
                              ? "bg-amber-500/20 text-amber-200"
                              : r.action === "restore"
                                ? "bg-sky-500/20 text-sky-200"
                                : r.action === "hard_delete"
                                  ? "bg-rose-500/20 text-rose-200"
                                  : r.action === "insert"
                                    ? "bg-accent-glow/20 text-eyebrow-strong"
                                    : "bg-accent text-foreground"
                          }`}
                        >
                          {r.action}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono text-micro text-muted-foreground">
                        {r.actor_id ? r.actor_id.slice(0, 8) + "…" : "system"}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpanded(isOpen ? null : r.id)}
                          >
                            {isOpen ? "Hide" : "Diff"}
                          </Button>
                          {isArchive && ARCHIVABLE.has(r.table_name) && (
                            <Button size="sm" variant="secondary" onClick={() => onRestore(r)}>
                              <RotateCcw className="mr-1 h-3 w-3" /> Restore
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={r.id + "-diff"} className="border-t border-border/60">
                        <td colSpan={6} className="bg-[#0a0c10]/40 px-3 py-3">
                          <pre className="max-h-[40vh] overflow-auto whitespace-pre-wrap text-micro text-foreground">
                            {JSON.stringify(r.diff, null, 2)}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
