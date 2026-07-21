import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Download, Loader2, RotateCw, Undo2, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  listLandingCopyChanges,
  requestPublishRollback,
} from "@/lib/landingCopyChangelog.functions";

export const Route = createFileRoute("/admin/landing-changelog")({
  head: () => ({
    meta: [
      { title: "Landing copy changelog · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LandingChangelogPage,
});

type Row = {
  id: string;
  changed_at: string;
  actor_email: string | null;
  file_path: string;
  section: string | null;
  before_text: string;
  after_text: string;
  reason: string | null;
  source: string;
};

function LandingChangelogPage() {
  const { status } = useAdminGate(["admin", "reviewer"]);
  const listFn = useServerFn(listLandingCopyChanges);
  const rollbackFn = useServerFn(requestPublishRollback);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileFilter, setFileFilter] = useState("");
  const [rollingBack, setRollingBack] = useState(false);
  const [rollbackResult, setRollbackResult] = useState<{
    rollbackNeeded: boolean;
    message: string;
    warnCount: number;
  } | null>(null);

  const runRollback = async () => {
    setRollingBack(true);
    try {
      const r = await rollbackFn();
      setRollbackResult({
        rollbackNeeded: r.rollbackNeeded,
        message: r.message,
        warnCount: r.summary.warnCount,
      });
      if (r.rollbackNeeded) {
        toast.warning(r.message, {
          description: "Open the chat History panel and revert to the last approved version.",
          duration: 8000,
        });
        await load();
      } else {
        toast.success(r.message);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Rollback check failed");
    } finally {
      setRollingBack(false);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const r = await listFn();
      setRows(r.rows as Row[]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load changelog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "ready") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status !== "ready") return null;

  const visible = rows.filter((r) =>
    fileFilter ? r.file_path.toLowerCase().includes(fileFilter.toLowerCase()) : true,
  );

  const exportCsv = () => {
    if (visible.length === 0) {
      toast.error("No rows to export");
      return;
    }
    const headers = [
      "changed_at",
      "actor_email",
      "source",
      "file_path",
      "section",
      "reason",
      "before_text",
      "after_text",
    ];
    const esc = (v: string | null | undefined) => {
      const s = (v ?? "").replace(/\r?\n/g, "\\n");
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [
      headers.join(","),
      ...visible.map((r) =>
        [
          r.changed_at,
          r.actor_email,
          r.source,
          r.file_path,
          r.section,
          r.reason,
          r.before_text,
          r.after_text,
        ]
          .map(esc)
          .join(","),
      ),
    ];
    const blob = new Blob(["\ufeff" + lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `landing-copy-changelog-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${visible.length} row${visible.length === 1 ? "" : "s"}`);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-h3 text-foreground">Landing copy changelog</h1>
          <p className="mt-1 text-sm text-foreground">
            Every recorded edit to landing-page copy, newest first.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={runRollback}
            disabled={rollingBack}
            aria-label="Check published landing for QA regressions and request rollback"
          >
            {rollingBack ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin" aria-hidden />
            ) : (
              <Undo2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            )}
            Rollback published landing
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={exportCsv}
            disabled={loading || visible.length === 0}
            aria-label={`Export ${visible.length} changelog row${visible.length === 1 ? "" : "s"} as CSV`}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Export CSV
          </Button>
          <Button size="sm" onClick={load} disabled={loading} aria-label="Refresh changelog">
            {loading ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin" aria-hidden />
            ) : (
              <RotateCw className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            )}
            Refresh
          </Button>
        </div>
      </header>

      {rollbackResult && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${
            rollbackResult.rollbackNeeded
              ? "border-amber-400/30 bg-amber-400/[0.06]"
              : "border-sky-400/30 bg-sky-400/[0.06]"
          }`}
        >
          {rollbackResult.rollbackNeeded ? (
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
          ) : (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" aria-hidden />
          )}
          <div className="flex-1 text-sm">
            <p
              className={`font-semibold ${
                rollbackResult.rollbackNeeded ? "text-amber-100" : "text-sky-100"
              }`}
            >
              {rollbackResult.message}
            </p>
            {rollbackResult.rollbackNeeded && (
              <p className="mt-1 text-meta text-foreground">
                A rollback request has been logged below. To restore the last approved version, open
                the chat History panel and revert to the prior approved landing commit. Publishing
                is owned by the deploy pipeline — this audit row is the formal trigger.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mb-4">
        <input
          type="search"
          value={fileFilter}
          onChange={(e) => setFileFilter(e.target.value)}
          placeholder="Filter by file path…"
          className="h-9 w-full max-w-sm rounded-md border border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-slate-200/30 focus:outline-none focus:ring-2 focus:ring-border"
        />
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted/60 p-6 text-center text-sm text-muted-foreground">
          {loading ? "Loading…" : "No copy changes recorded yet."}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((r) => (
            <li key={r.id} className="rounded-xl border border-border bg-muted/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-micro text-muted-foreground">
                <span className="font-mono uppercase tracking-wider text-muted-foreground">
                  {new Date(r.changed_at).toLocaleString()}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 font-mono uppercase tracking-wider ${
                    r.source === "admin"
                      ? "bg-sky-400/15 text-sky-200"
                      : r.source === "agent"
                        ? "bg-accent-glow/15 text-eyebrow-strong"
                        : "bg-accent text-foreground"
                  }`}
                >
                  {r.source}
                </span>
                {r.actor_email && <span>by {r.actor_email}</span>}
              </div>
              <p className="mt-1.5 font-mono text-meta text-foreground">
                {r.file_path}
                {r.section && <span className="text-muted-foreground"> · {r.section}</span>}
              </p>
              {r.reason && <p className="mt-1.5 text-caption text-foreground">{r.reason}</p>}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Diff label="Before" tone="rust" text={r.before_text} />
                <Diff label="After" tone="emerald" text={r.after_text} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Diff({ label, tone, text }: { label: string; tone: "rust" | "emerald"; text: string }) {
  const color =
    tone === "rust"
      ? "border-rose-400/25 bg-rose-400/[0.06] text-rose-100"
      : "border-sky-400/25 bg-sky-400/[0.06] text-sky-100";
  return (
    <div className={`rounded-md border p-2.5 ${color}`}>
      <p className="mb-1 font-mono text-micro uppercase tracking-wider opacity-70">{label}</p>
      <pre className="whitespace-pre-wrap break-words font-mono text-micro leading-relaxed">
        {text || "—"}
      </pre>
    </div>
  );
}
