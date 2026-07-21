import { useEffect, useState, useCallback } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Lock, Unlock, Save } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  adminListCohorts,
  adminCohortAudit,
  adminSetCohortCapacity,
  adminSetCohortLock,
} from "@/lib/cohort.functions";

export const Route = createFileRoute("/admin/cohorts")({
  head: () => ({
    meta: [{ title: "Cohorts · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: CohortsPage,
});

type Cohort = Awaited<ReturnType<typeof adminListCohorts>>[number];
type AuditRow = Awaited<ReturnType<typeof adminCohortAudit>>[number];

function CohortsPage() {
  const nav = useNavigate();
  const { status: gate } = useAdminGate(["admin"]);
  const list = useServerFn(adminListCohorts);
  const audit = useServerFn(adminCohortAudit);
  const setCap = useServerFn(adminSetCohortCapacity);
  const setLock = useServerFn(adminSetCohortLock);

  const [rows, setRows] = useState<Cohort[]>([]);
  const [log, setLog] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [r, a] = await Promise.all([list(), audit({ data: { limit: 50 } })]);
      setRows(r);
      setLog(a);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load cohorts");
    } finally {
      setLoading(false);
    }
  }, [list, audit]);

  useEffect(() => {
    if (gate === "ready") void reload();
  }, [gate, reload]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    nav({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        Admin role required.
      </div>
    );
  }

  async function onSaveCap(id: string, capStr: string) {
    const cap = Number(capStr);
    if (!Number.isInteger(cap) || cap < 1) {
      setErr("Capacity must be a positive integer.");
      return;
    }
    setSavingId(id);
    try {
      await setCap({ data: { id, cap } });
      await reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to update capacity");
    } finally {
      setSavingId(null);
    }
  }

  async function onToggleLock(c: Cohort, reason: string) {
    setSavingId(c.id);
    try {
      await setLock({
        data: { id: c.id, locked: !c.is_locked, reason: reason.trim() || null },
      });
      await reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to update lock");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
          Admin · Cohorts
        </p>
        <h1 className="h-display mt-2">Capacity &amp; lock control</h1>
        <p className="mt-1 text-sm text-foreground">
          Adjust seat caps and lock state per cohort. All changes are appended to the audit log
          below.
        </p>
      </header>

      {err && (
        <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
          {err}
        </div>
      )}
      {loading && <p className="text-sm text-foreground">Loading…</p>}

      <section className="space-y-4">
        {rows.map((c) => (
          <CohortRow
            key={c.id}
            c={c}
            saving={savingId === c.id}
            onSaveCap={(v) => onSaveCap(c.id, v)}
            onToggleLock={(reason) => onToggleLock(c, reason)}
          />
        ))}
      </section>

      <section>
        <h2 className="font-display text-h3 text-foreground">Audit log</h2>
        <p className="mt-1 text-meta text-foreground/70">
          Most recent {log.length} change(s). All seat/lock writes are recorded server-side.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-muted/60 text-left text-foreground">
              <tr>
                <th className="px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]">When</th>
                <th className="px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]">
                  Cohort
                </th>
                <th className="px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]">
                  Action
                </th>
                <th className="px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]">
                  Actor
                </th>
                <th className="px-3 py-2 font-mono text-micro uppercase tracking-[0.18em]">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {log.map((r) => (
                <tr key={r.id} className="border-t border-border/60 text-foreground">
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                    {new Date(r.occurred_at).toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-2 font-mono">{r.cohort_id}</td>
                  <td className="px-3 py-2">{r.action}</td>
                  <td className="px-3 py-2 font-mono text-xs text-foreground/70">
                    {r.actor_id ? r.actor_id.slice(0, 8) : "—"}
                  </td>
                  <td className="px-3 py-2 text-xs text-foreground/70">
                    {r.before || r.after ? (
                      <code>
                        {JSON.stringify(r.before)} → {JSON.stringify(r.after)}
                      </code>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {log.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-foreground/60">
                    No changes recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CohortRow({
  c,
  saving,
  onSaveCap,
  onToggleLock,
}: {
  c: Cohort;
  saving: boolean;
  onSaveCap: (v: string) => void;
  onToggleLock: (reason: string) => void;
}) {
  const [cap, setCap] = useState(String(c.seats_cap));
  const [reason, setReason] = useState("");
  const seatsLeft = Math.max(0, c.seats_cap - c.seats_taken);

  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-display text-h3 text-foreground">{c.display_label}</h3>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-foreground/60">
            id: {c.id} · starts {new Date(c.starts_at).toLocaleDateString("en-IN")} · locks{" "}
            {new Date(c.lock_at).toLocaleString("en-IN")}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-micro uppercase tracking-[0.22em] ${
            c.is_locked ? "bg-rose-500/15 text-rose-200" : "bg-sky-500/15 text-sky-200"
          }`}
        >
          {c.is_locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
          {c.is_locked ? "Locked" : "Open"}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-3 text-sm text-foreground">
        <div>
          <dt className="text-xs text-foreground/60">Capacity</dt>
          <dd className="font-display text-h3 text-foreground">{c.seats_cap}</dd>
        </div>
        <div>
          <dt className="text-xs text-foreground/60">Taken</dt>
          <dd className="font-display text-h3 text-foreground">{c.seats_taken}</dd>
        </div>
        <div>
          <dt className="text-xs text-foreground/60">Left</dt>
          <dd className="font-display text-h3 text-primary-glow">{seatsLeft}</dd>
        </div>
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-foreground/70">
            Set capacity
          </span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              className="w-28 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            />
            <button
              type="button"
              disabled={saving || cap === String(c.seats_cap)}
              onClick={() => onSaveCap(cap)}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save
            </button>
          </div>
        </label>

        <label className="block">
          <span className="font-mono text-micro uppercase tracking-[0.18em] text-foreground/70">
            {c.is_locked ? "Unlock reason (optional)" : "Lock reason (optional)"}
          </span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={240}
              placeholder="e.g. capacity reached"
              className="flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground"
            />
            <button
              type="button"
              disabled={saving}
              onClick={() => onToggleLock(reason)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold disabled:opacity-50 ${
                c.is_locked ? "bg-sky-500 text-sky-50" : "bg-rose-500 text-rose-50"
              }`}
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
              ) : c.is_locked ? (
                <Unlock className="h-3.5 w-3.5" />
              ) : (
                <Lock className="h-3.5 w-3.5" />
              )}
              {c.is_locked ? "Unlock cohort" : "Lock cohort"}
            </button>
          </div>
        </label>
      </div>

      {c.lock_reason && (
        <p className="mt-3 text-meta text-foreground/70">
          <span className="font-semibold text-foreground/80">Lock reason:</span> {c.lock_reason}
        </p>
      )}
    </div>
  );
}
