import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, AlertTriangle, CheckCircle2, FileWarning } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import manifest from "@/data/public-assets-manifest.json";

type Asset = {
  path: string;
  size: number;
  ext: string;
  referenced: boolean;
  matchedBy: "path" | "basename" | "always-kept" | null;
};

export const Route = createFileRoute("/admin/assets")({
  head: () => ({
    meta: [{ title: "Static assets · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminAssetsPage,
});

function fmt(n: number) {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  if (n > 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

type Filter = "all" | "unused" | "large";

function AdminAssetsPage() {
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const assets = (manifest.assets as Asset[]) ?? [];
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return assets.filter((a) => {
      if (needle && !a.path.toLowerCase().includes(needle)) return false;
      if (filter === "unused") return !a.referenced;
      if (filter === "large") return a.size > 5 * 1024 * 1024;
      return true;
    });
  }, [assets, q, filter]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="motion-safe:animate-spin h-5 w-5 text-muted-foreground" />
      </div>
    );
  }
  if (status !== "ready") {
    return (
      <div className="p-8 text-sm text-muted-foreground">
        You need admin, reviewer, or support access to view this page.
      </div>
    );
  }

  const unusedCount = assets.filter((a) => !a.referenced).length;
  const generatedAt = new Date(manifest.generatedAt).toLocaleString();

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Static assets</h1>
        <p className="text-sm text-muted-foreground">
          Every file under <code className="rounded bg-muted px-1">public/</code>, its size, and
          whether any source file references it. Regenerate with{" "}
          <code className="rounded bg-muted px-1">bun run scan:public-assets</code>.
        </p>
        <p className="text-xs text-muted-foreground">
          Manifest generated {generatedAt} · {manifest.totalCount} files ·{" "}
          {fmt(manifest.totalBytes)} total
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Total assets"
          value={String(manifest.totalCount)}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          label="Unreferenced"
          value={String(unusedCount)}
          tone={unusedCount ? "warn" : "ok"}
          icon={<FileWarning className="h-4 w-4" />}
        />
        <StatCard
          label="Large (>5 MB)"
          value={String(manifest.largeCount ?? 0)}
          tone={(manifest.largeCount ?? 0) > 0 ? "warn" : "ok"}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by path…"
          className="max-w-sm"
        />
        {(["all", "unused", "large"] as Filter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "unused" ? "Unreferenced" : "Large"}
          </Button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2 font-medium">Path</th>
              <th className="px-3 py-2 font-medium">Size</th>
              <th className="px-3 py-2 font-medium">Referenced</th>
              <th className="px-3 py-2 font-medium">Match</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((a) => (
              <tr key={a.path} className={a.referenced ? "" : "bg-amber-500/5"}>
                <td className="px-3 py-2 font-mono text-xs">{a.path}</td>
                <td className="px-3 py-2 tabular-nums">{fmt(a.size)}</td>
                <td className="px-3 py-2">
                  {a.referenced ? (
                    <span className="inline-flex items-center gap-1 text-sky-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <FileWarning className="h-3.5 w-3.5" /> no
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{a.matchedBy ?? "-"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                  No assets match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Unreferenced assets are candidates for deletion. Verify manually before running{" "}
        <code className="rounded bg-muted px-1">rm public&lt;path&gt;</code> - the scan matches
        basenames, so a file referenced only via a dynamic template string may show as unused.
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone = "ok",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "ok" | "warn";
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tone === "warn" ? "border-amber-500/40 bg-amber-500/5" : "bg-card"
      }`}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
