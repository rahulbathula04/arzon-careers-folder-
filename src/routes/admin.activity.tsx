import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listAdminActivity, type ActivityRow } from "@/lib/admin-activity.functions";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/admin/activity")({
  head: () => ({
    meta: [{ title: "Activity · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminActivity,
});

const ACTIONS = [
  "results_view",
  "results_detail",
  "results_export",
  "bulk_export",
  "role_granted",
  "role_revoked",
];
const ROLES = ["admin", "analyst", "exporter", "viewer", "reviewer", "support"];
const RESOURCES = ["career_engine_leads", "career_engine_results", "applications", "user_roles"];

function AdminActivity() {
  const navigate = useNavigate();
  const list = useServerFn(listAdminActivity);
  const recordExport = useServerFn(recordAdminExport);
  const { status: gate } = useAdminGate(["admin"]);

  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionFilter, setActionFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actorQuery, setActorQuery] = useState("");
  const [sinceHours, setSinceHours] = useState(168); // 7d default

  useEffect(() => {
    if (gate !== "ready") return;
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({
          data: {
            action: actionFilter || undefined,
            resource: resourceFilter || undefined,
            sinceHours,
          },
        });
        if (!cancel) setRows(res.rows as ActivityRow[]);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load activity");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [gate, list, actionFilter, resourceFilter, sinceHours]);

  const visible = useMemo(() => {
    const q = actorQuery.trim().toLowerCase();
    return rows.filter((r) => {
      if (roleFilter && !r.actorRoles.includes(roleFilter)) return false;
      if (q && !(r.actorEmail ?? "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, roleFilter, actorQuery]);

  const summary = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of visible) counts[r.action] = (counts[r.action] ?? 0) + 1;
    const byActor: Record<string, number> = {};
    for (const r of visible) {
      const k = r.actorEmail ?? r.actorId ?? "(unknown)";
      byActor[k] = (byActor[k] ?? 0) + 1;
    }
    const top = Object.entries(byActor)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    return {
      total: visible.length,
      views: counts["results_view"] ?? 0,
      details: counts["results_detail"] ?? 0,
      exports: (counts["results_export"] ?? 0) + (counts["bulk_export"] ?? 0),
      top,
    };
  }, [visible]);

  const columns: CsvColumn<ActivityRow>[] = [
    { key: "occurredAt", header: "occurred_at" },
    { key: "actorEmail", header: "actor_email" },
    { key: "actorRoles", header: "actor_roles", accessor: (r) => r.actorRoles.join("|") },
    { key: "action", header: "action" },
    { key: "tableName", header: "resource" },
    { key: "recordId", header: "record_id" },
    { key: "diff", header: "diff", accessor: (r) => JSON.stringify(r.diff ?? {}) },
  ];

  const onExport = async () => {
    try {
      await exportCsvAudited(
        recordExport,
        "admin_activity",
        dateStampedFilename("admin-activity"),
        visible,
        columns,
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };

  if (gate === "loading")
    return (
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden")
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        Admins only.
      </div>
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Activity
          </p>
          <h1 className="h-display mt-2">Access log</h1>
          <p className="mt-1 text-sm text-foreground">
            Every admin view, detail open, export, and role change.
          </p>
        </div>
        <Button variant="secondary" onClick={onExport} className="gap-1.5">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Events" value={summary.total} />
        <Kpi label="Views" value={summary.views} />
        <Kpi label="Details" value={summary.details} />
        <Kpi label="Exports" value={summary.exports} />
      </section>

      {summary.top.length > 0 && (
        <section className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="text-micro uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Top actors
          </div>
          <ul className="flex flex-wrap gap-2 text-meta text-foreground">
            {summary.top.map(([who, n]) => (
              <li key={who} className="rounded-full border border-border bg-muted px-3 py-1">
                {who} · <span className="font-mono">{n}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-muted/40 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Input
            type="search"
            value={actorQuery}
            onChange={(e) => setActorQuery(e.target.value)}
            placeholder="Actor email…"
            className="h-10 rounded-lg border-border bg-muted px-3 text-sm text-foreground"
          />
          <Select
            label="Action"
            value={actionFilter}
            onChange={setActionFilter}
            options={ACTIONS}
          />
          <Select
            label="Resource"
            value={resourceFilter}
            onChange={setResourceFilter}
            options={RESOURCES}
          />
          <Select label="Role" value={roleFilter} onChange={setRoleFilter} options={ROLES} />
          <div>
            <label className="block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1">
              Window
            </label>
            <select
              value={String(sinceHours)}
              onChange={(e) => setSinceHours(Number(e.target.value))}
              className="h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground"
            >
              <option value="24">24h</option>
              <option value="168">7 days</option>
              <option value="720">30 days</option>
              <option value="2160">90 days</option>
            </select>
          </div>
        </div>
      </section>

      <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-micro uppercase tracking-[0.22em] text-foreground">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">Summary</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  <Loader2 className="inline h-4 w-4 motion-safe:animate-spin" /> Loading…
                </td>
              </tr>
            )}
            {!loading &&
              visible.map((r) => (
                <tr key={r.id} className="border-t border-border/60 align-top">
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {new Date(r.occurredAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.actorEmail ?? r.actorId ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.actorRoles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full border border-border bg-muted px-2 py-0.5 text-micro uppercase tracking-wider text-foreground"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground font-mono text-meta">{r.action}</td>
                  <td className="px-4 py-3 text-foreground text-meta">{r.tableName}</td>
                  <td className="px-4 py-3 text-foreground text-micro font-mono max-w-md">
                    <details>
                      <summary className="cursor-pointer hover:text-foreground">
                        {summaryFor(r)}
                      </summary>
                      <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                        {JSON.stringify(r.diff ?? {}, null, 2)}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))}
            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No activity in this window.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function summaryFor(r: ActivityRow): string {
  const d = r.diff ?? {};
  if (typeof d.row_count === "number")
    return `${d.row_count} rows${d.masked_pii ? " · masked" : ""}`;
  if (typeof d.lead_email_masked === "string") return d.lead_email_masked;
  if (typeof d.role === "string") return String(d.role);
  return r.recordId || "—";
}

function Kpi({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-4">
      <div className="text-micro uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-h3 font-semibold text-foreground">{value}</div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
