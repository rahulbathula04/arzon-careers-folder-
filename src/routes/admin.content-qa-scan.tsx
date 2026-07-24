import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Loader2,
  RotateCw,
  ClipboardCopy,
  AlertTriangle,
  Info,
  Download,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminGate } from "@/hooks/useAdminGate";
import { scanLandingCopy } from "@/lib/landingCopyScan.functions";

export const Route = createFileRoute("/admin/content-qa-scan")({
  head: () => ({
    meta: [{ title: "Content QA scan · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: ContentQAScanPage,
});

type Finding = {
  file: string;
  line: number;
  column: number;
  snippet: string;
  rule: string;
  severity: "warn" | "info";
  category: "typography" | "a11y";
};

type Summary = {
  warnCount: number;
  typographyWarnCount: number;
  a11yWarnCount: number;
  infoCount: number;
  publishReady: boolean;
};

function ContentQAScanPage() {
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  const scanFn = useServerFn(scanLandingCopy);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [scannedAt, setScannedAt] = useState<string | null>(null);
  const [scannedFiles, setScannedFiles] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "warn" | "info">("warn");
  const [summary, setSummary] = useState<Summary | null>(null);

  const runScan = async () => {
    setLoading(true);
    try {
      const r = await scanFn();
      setFindings(r.findings as Finding[]);
      setScannedAt(r.scannedAt);
      setScannedFiles(r.scannedFiles);
      setSummary(r.summary as Summary);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "ready") runScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const visible = useMemo(
    () => (filter === "all" ? findings : findings.filter((f) => f.severity === filter)),
    [findings, filter],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Finding[]>();
    for (const f of visible) {
      const arr = map.get(f.file) ?? [];
      arr.push(f);
      map.set(f.file, arr);
    }
    return Array.from(map.entries());
  }, [visible]);

  const warnCount = findings.filter((f) => f.severity === "warn").length;
  const infoCount = findings.filter((f) => f.severity === "info").length;

  const exportCsv = () => {
    if (findings.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    const headers = ["severity", "category", "file", "line", "column", "rule", "snippet"];
    const esc = (v: unknown) =>
      `"${String(v ?? "")
        .replace(/\r?\n/g, "\\n")
        .replace(/"/g, '""')}"`;
    const rows = findings.map((f) =>
      [f.severity, f.category, f.file, f.line, f.column, f.rule, f.snippet].map(esc).join(","),
    );
    const meta = [
      `# Landing copy QA scan`,
      `# scanned_at,${scannedAt ?? new Date().toISOString()}`,
      `# files_scanned,${scannedFiles}`,
      `# warnings,${warnCount}`,
      `# info,${infoCount}`,
      `# publish_ready,${summary?.publishReady ?? false}`,
      "",
    ];
    const csv = "\ufeff" + meta.join("\n") + headers.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `content-qa-report-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${findings.length} row${findings.length === 1 ? "" : "s"}`);
  };

  const copyReport = async () => {
    const lines = [
      `Landing copy QA scan — ${scannedAt ?? new Date().toISOString()}`,
      `${scannedFiles} files scanned · ${warnCount} warnings · ${infoCount} info`,
      "",
      ...findings.map(
        (f) =>
          `[${f.severity.toUpperCase()}] ${f.file}:${f.line}:${f.column} — ${f.rule}\n    ${f.snippet}`,
      ),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success("Report copied to clipboard");
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  if (status !== "ready") return null;

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-h3 text-foreground">Content QA scan</h1>
          <p className="mt-1 text-sm text-foreground">
            Pre-publish punctuation and style check for landing copy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportCsv}
            disabled={findings.length === 0}
            aria-label="Export QA report as CSV"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden /> Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyReport}
            disabled={findings.length === 0}
            aria-label="Copy QA report to clipboard"
          >
            <ClipboardCopy className="mr-1.5 h-3.5 w-3.5" aria-hidden /> Copy report
          </Button>
          <Button size="sm" onClick={runScan} disabled={loading} aria-label="Re-run scan">
            {loading ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 motion-safe:animate-spin" aria-hidden />
            ) : (
              <RotateCw className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            )}
            Re-scan
          </Button>
        </div>
      </header>

      <PublishGate summary={summary} loading={loading} />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Pill
          tone="warn"
          active={filter !== "info"}
          onClick={() => setFilter(filter === "warn" ? "all" : "warn")}
        >
          <AlertTriangle className="h-3 w-3" /> {warnCount} warnings
        </Pill>
        <Pill
          tone="info"
          active={filter === "info"}
          onClick={() => setFilter(filter === "info" ? "all" : "info")}
        >
          <Info className="h-3 w-3" /> {infoCount} info
        </Pill>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-md border px-2.5 py-1 text-micro font-medium uppercase tracking-wider transition ${
            filter === "all"
              ? "border-slate-200/30 bg-accent text-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Show all
        </button>
        {scannedAt && (
          <span className="ml-auto font-mono text-micro uppercase tracking-wider text-muted-foreground">
            Scanned {new Date(scannedAt).toLocaleString()} · {scannedFiles} files
          </span>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-sky-400/25 bg-sky-400/5 p-6 text-center text-sm text-sky-200">
          {loading ? "Scanning…" : "No findings at this severity. Landing copy is clean."}
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(([file, list]) => (
            <section key={file} className="rounded-xl border border-border bg-muted/60">
              <header className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                <code className="text-meta text-foreground">{file}</code>
                <span className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
                  {list.length} {list.length === 1 ? "finding" : "findings"}
                </span>
              </header>
              <ul className="divide-y divide-border">
                {list.map((f, idx) => (
                  <li key={idx} className="px-4 py-3">
                    <div className="flex items-center gap-2 text-micro">
                      <span
                        className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono uppercase tracking-wider ${
                          f.severity === "warn"
                            ? "bg-amber-400/15 text-amber-200"
                            : "bg-accent-glow/15 text-eyebrow-strong"
                        }`}
                      >
                        {f.severity}
                      </span>
                      <span className="text-muted-foreground">
                        line {f.line}:{f.column}
                      </span>
                      <span className="text-foreground">— {f.rule}</span>
                    </div>
                    <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-words rounded bg-[#0a0c10]/40 backdrop-blur-md shadow-sm px-2.5 py-1.5 font-mono text-micro text-foreground">
                      {f.snippet}
                    </pre>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({
  tone,
  active,
  onClick,
  children,
}: {
  tone: "warn" | "info";
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-micro font-medium uppercase tracking-wider transition";
  const colors =
    tone === "warn"
      ? active
        ? "border-amber-300/40 bg-amber-400/15 text-amber-100"
        : "border-border text-muted-foreground hover:text-amber-100"
      : active
        ? "border-accent-glow/40 bg-accent-glow/15 text-eyebrow-strong"
        : "border-border text-muted-foreground hover:text-eyebrow-strong";
  return (
    <button type="button" onClick={onClick} className={`${base} ${colors}`}>
      {children}
    </button>
  );
}

function PublishGate({ summary, loading }: { summary: Summary | null; loading: boolean }) {
  if (loading && !summary) {
    return (
      <div className="mb-5 rounded-xl border border-border bg-muted/60 p-4 text-sm text-foreground">
        Running publish-readiness check…
      </div>
    );
  }
  if (!summary) return null;
  const ready = summary.publishReady;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mb-5 flex flex-wrap items-start gap-3 rounded-xl border p-4 ${
        ready ? "border-sky-400/30 bg-sky-400/[0.06]" : "border-amber-400/30 bg-amber-400/[0.06]"
      }`}
    >
      {ready ? (
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" aria-hidden />
      ) : (
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
      )}
      <div className="flex-1">
        <p className={`text-sm font-semibold ${ready ? "text-sky-100" : "text-amber-100"}`}>
          {ready
            ? "Publish-ready — no blocking findings"
            : "Publish blocked — resolve warnings before pushing live"}
        </p>
        <p className="mt-1 text-meta text-foreground">
          {summary.typographyWarnCount} typography{" "}
          {summary.typographyWarnCount === 1 ? "violation" : "violations"} · {summary.a11yWarnCount}{" "}
          accessibility {summary.a11yWarnCount === 1 ? "violation" : "violations"} ·{" "}
          {summary.infoCount} info
        </p>
        {!ready && (
          <p className="mt-1.5 text-meta text-muted-foreground">
            Publish reviewers should hold the release until warnings reach zero. Info-level findings
            are advisory and do not block.
          </p>
        )}
      </div>
    </div>
  );
}
