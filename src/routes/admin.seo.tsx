import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import {
  Loader2,
  ArrowLeft,
  MousePointerClick,
  Eye,
  Percent,
  TrendingUp,
  AlertTriangle,
  Bell,
  Check,
  Play,
  Settings,
  PlugZap,
  CheckCircle2,
  Upload,
  Search,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import {
  getGscOverview,
  listSeoAlerts,
  acknowledgeSeoAlert,
  updateSeoAlertConfig,
  runSeoAlertSweep,
  pingGsc,
  submitSitemap,
  inspectUrl,
  type GscOverview,
  type SeoAlert,
  type SeoAlertConfig,
  type GscPingResult,
  type SitemapSubmitResult,
  type UrlInspectionResult,
} from "@/lib/seo-gsc.functions";

export const Route = createFileRoute("/admin/seo")({
  head: () => ({
    meta: [{ title: "SEO · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminSeo,
});

type Gate = "loading" | "unauth" | "forbidden" | "ready";

function AdminSeo() {
  const navigate = useNavigate();
  const fetchOverview = useServerFn(getGscOverview);
  const fetchAlerts = useServerFn(listSeoAlerts);
  const ackAlert = useServerFn(acknowledgeSeoAlert);
  const saveConfig = useServerFn(updateSeoAlertConfig);
  const runSweep = useServerFn(runSeoAlertSweep);
  const runPing = useServerFn(pingGsc);
  const { status: gate } = useAdminGate(["admin"]);
  const [days, setDays] = useState<7 | 28 | 90>(28);
  const [data, setData] = useState<GscOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<SeoAlert[]>([]);
  const [alertCfg, setAlertCfg] = useState<SeoAlertConfig>({ min_impressions: 20, drop_pct: 50 });
  const [showAck, setShowAck] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [sweepMsg, setSweepMsg] = useState<string | null>(null);
  const [editCfg, setEditCfg] = useState(false);
  const [cfgDraft, setCfgDraft] = useState<SeoAlertConfig>({ min_impressions: 20, drop_pct: 50 });
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState<GscPingResult | null>(null);
  const [pingError, setPingError] = useState<string | null>(null);
  const submitFn = useServerFn(submitSitemap);
  const inspectFn = useServerFn(inspectUrl);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SitemapSubmitResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inspectPath, setInspectPath] = useState("/");
  const [inspecting, setInspecting] = useState(false);
  const [inspectResult, setInspectResult] = useState<UrlInspectionResult | null>(null);
  const [inspectError, setInspectError] = useState<string | null>(null);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchOverview({ data: { days } })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [gate, days, fetchOverview]);

  if (gate === "loading") {
    return <AiThinkingLoader label="Thinking…" size="sm" />;
  }
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        Admin role required.
      </div>
    );
  }

  async function refreshAlerts() {
    const res = await fetchAlerts({ data: { includeAcknowledged: showAck } });
    setAlerts(res.alerts);
    setAlertCfg(res.config);
    setCfgDraft(res.config);
  }

  // Load alerts when gate ready or showAck changes
  // (kept inline since this component grew; effect added once)

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Admin
          </Link>
          <h1 className="h-display mt-2">SEO performance</h1>
          <p className="mt-1 text-sm text-black/80">
            Google Search Console · arzoncareers.in
            {data && ` · ${data.range.startDate} → ${data.range.endDate}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/seo/settings"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
          >
            <Settings className="h-3 w-3" /> GSC settings
          </Link>
          <div className="inline-flex rounded-full border border-border bg-muted p-1">
            {([7, 28, 90] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded-full px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] transition ${days === d ? "bg-white text-black" : "text-foreground hover:text-foreground"}`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-100 inline-flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ConnectivityPanel
        pinging={pinging}
        result={pingResult}
        error={pingError}
        onTest={async () => {
          setPinging(true);
          setPingError(null);
          setPingResult(null);
          try {
            const r = await runPing({});
            setPingResult(r);
          } catch (e) {
            setPingError(e instanceof Error ? e.message : String(e));
          } finally {
            setPinging(false);
          }
        }}
      />

      <SitemapPanel
        submitting={submitting}
        result={submitResult}
        error={submitError}
        onSubmit={async () => {
          setSubmitting(true);
          setSubmitError(null);
          try {
            const r = await submitFn({ data: {} });
            setSubmitResult(r);
          } catch (e) {
            setSubmitError(e instanceof Error ? e.message : String(e));
          } finally {
            setSubmitting(false);
          }
        }}
      />

      <InspectPanel
        path={inspectPath}
        setPath={setInspectPath}
        inspecting={inspecting}
        result={inspectResult}
        error={inspectError}
        onInspect={async () => {
          setInspecting(true);
          setInspectError(null);
          setInspectResult(null);
          try {
            const url = inspectPath.startsWith("http")
              ? inspectPath
              : `https://arzoncareers.in${inspectPath.startsWith("/") ? "" : "/"}${inspectPath}`;
            const r = await inspectFn({ data: { inspectionUrl: url } });
            setInspectResult(r);
          } catch (e) {
            setInspectError(e instanceof Error ? e.message : String(e));
          } finally {
            setInspecting(false);
          }
        }}
      />

      {loading && !data ? (
        <AiThinkingLoader label="Thinking & fetching from Search Console…" size="sm" />
      ) : data ? (
        <>
          <AlertsPanel
            alerts={alerts}
            config={alertCfg}
            showAck={showAck}
            sweeping={sweeping}
            sweepMsg={sweepMsg}
            editCfg={editCfg}
            cfgDraft={cfgDraft}
            setShowAck={setShowAck}
            setEditCfg={setEditCfg}
            setCfgDraft={setCfgDraft}
            onMount={refreshAlerts}
            onAck={async (id) => {
              await ackAlert({ data: { id } });
              await refreshAlerts();
            }}
            onSweep={async () => {
              setSweeping(true);
              setSweepMsg(null);
              try {
                const r = await runSweep({});
                setSweepMsg(typeof r === "object" && "result" in r ? r.result : "Done");
                await refreshAlerts();
              } catch (e) {
                setSweepMsg(e instanceof Error ? e.message : String(e));
              } finally {
                setSweeping(false);
              }
            }}
            onSaveCfg={async () => {
              await saveConfig({ data: cfgDraft });
              setEditCfg(false);
              await refreshAlerts();
            }}
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon={<MousePointerClick className="h-4 w-4" />}
              label="Clicks"
              value={fmtInt(data.totals.clicks)}
            />
            <Stat
              icon={<Eye className="h-4 w-4" />}
              label="Impressions"
              value={fmtInt(data.totals.impressions)}
            />
            <Stat
              icon={<Percent className="h-4 w-4" />}
              label="CTR"
              value={fmtPct(data.totals.ctr)}
            />
            <Stat
              icon={<TrendingUp className="h-4 w-4" />}
              label="Avg position"
              value={data.totals.position.toFixed(1)}
            />
          </div>

          <Section title="Clicks & impressions over time">
            <DailyChart daily={data.daily} />
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section title={`Top queries (${data.topQueries.length})`}>
              <DataTable
                headers={["Query", "Clicks", "Impr.", "CTR", "Pos."]}
                rows={data.topQueries.map((q) => [
                  q.query || "(not provided)",
                  fmtInt(q.clicks),
                  fmtInt(q.impressions),
                  fmtPct(q.ctr),
                  q.position.toFixed(1),
                ])}
              />
            </Section>
            <Section title={`Top pages (${data.topPages.length})`}>
              <DataTable
                headers={["Page", "Clicks", "Impr.", "CTR", "Pos."]}
                rows={data.topPages.map((p) => [
                  shortPath(p.page),
                  fmtInt(p.clicks),
                  fmtInt(p.impressions),
                  fmtPct(p.ctr),
                  p.position.toFixed(1),
                ])}
              />
            </Section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="Devices">
              <DataTable
                headers={["Device", "Clicks", "Impr.", "CTR"]}
                rows={data.devices.map((d) => [
                  d.device,
                  fmtInt(d.clicks),
                  fmtInt(d.impressions),
                  fmtPct(d.ctr),
                ])}
              />
            </Section>
            <Section title="Countries (top 10)">
              <DataTable
                headers={["Country", "Clicks", "Impr."]}
                rows={data.countries.map((c) => [
                  c.country.toUpperCase(),
                  fmtInt(c.clicks),
                  fmtInt(c.impressions),
                ])}
              />
            </Section>
          </div>

          {data.sitemap && (
            <Section title="Sitemap coverage">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Submitted URLs" value={fmtInt(data.sitemap.submitted)} />
                <Stat
                  label="Indexed"
                  value={fmtInt(data.sitemap.indexed)}
                  sub={
                    data.sitemap.submitted
                      ? `${Math.round((data.sitemap.indexed / data.sitemap.submitted) * 100)}% coverage`
                      : undefined
                  }
                />
                <Stat label="Errors" value={fmtInt(data.sitemap.errors)} />
                <Stat label="Warnings" value={fmtInt(data.sitemap.warnings)} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {data.sitemap.isPending ? "Re-fetch pending · " : ""}Last submitted{" "}
                {fmtDate(data.sitemap.lastSubmitted)} · last downloaded{" "}
                {fmtDate(data.sitemap.lastDownloaded)}
              </p>
            </Section>
          )}
        </>
      ) : null}
    </div>
  );
}

type AlertsPanelProps = {
  alerts: SeoAlert[];
  config: SeoAlertConfig;
  showAck: boolean;
  sweeping: boolean;
  sweepMsg: string | null;
  editCfg: boolean;
  cfgDraft: SeoAlertConfig;
  setShowAck: (v: boolean) => void;
  setEditCfg: (v: boolean) => void;
  setCfgDraft: (v: SeoAlertConfig) => void;
  onMount: () => void | Promise<void>;
  onAck: (id: string) => void | Promise<void>;
  onSweep: () => void | Promise<void>;
  onSaveCfg: () => void | Promise<void>;
};

function AlertsPanel(props: AlertsPanelProps) {
  const {
    alerts,
    config,
    showAck,
    sweeping,
    sweepMsg,
    editCfg,
    cfgDraft,
    setShowAck,
    setEditCfg,
    setCfgDraft,
    onMount,
    onAck,
    onSweep,
    onSaveCfg,
  } = props;
  useEffect(() => {
    void onMount(); /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [showAck]);
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground inline-flex items-center gap-2">
          <Bell className="h-3.5 w-3.5" /> Drop alerts (
          {alerts.filter((a) => !a.acknowledged_at).length} open)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAck(!showAck)}
            className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent"
          >
            {showAck ? "Hide acknowledged" : "Show acknowledged"}
          </button>
          <button
            onClick={() => setEditCfg(!editCfg)}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent"
          >
            <Settings className="h-3 w-3" /> Thresholds
          </button>
          <button
            onClick={() => void onSweep()}
            disabled={sweeping}
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-slate-50/90 disabled:opacity-50"
          >
            {sweeping ? (
              <Loader2 className="h-3 w-3 motion-safe:animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}{" "}
            Run check now
          </button>
        </div>
      </div>

      {editCfg && (
        <div className="mb-3 rounded-2xl border border-border bg-muted/60 p-4">
          <p className="mb-2 text-xs text-foreground">
            Alert when a query's clicks or impressions drop by at least{" "}
            <strong>{cfgDraft.drop_pct}%</strong> week-over-week, provided the previous week had at
            least <strong>{cfgDraft.min_impressions}</strong> impressions.
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <label className="text-xs text-foreground">
              <span className="block mb-1">Min prior impressions</span>
              <input
                type="number"
                min={1}
                max={10000}
                value={cfgDraft.min_impressions}
                onChange={(e) =>
                  setCfgDraft({ ...cfgDraft, min_impressions: Number(e.target.value) || 0 })
                }
                className="w-28 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"
              />
            </label>
            <label className="text-xs text-foreground">
              <span className="block mb-1">Drop %</span>
              <input
                type="number"
                min={5}
                max={95}
                value={cfgDraft.drop_pct}
                onChange={(e) =>
                  setCfgDraft({ ...cfgDraft, drop_pct: Number(e.target.value) || 0 })
                }
                className="w-24 rounded-md border border-border bg-[#0a0c10]/40 px-2 py-1 text-foreground"
              />
            </label>
            <button
              onClick={() => void onSaveCfg()}
              className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-foreground hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-muted/60 p-5">
        {sweepMsg && <p className="mb-3 text-micro text-muted-foreground">{sweepMsg}</p>}
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No alerts. Drops will appear here when a top query loses ≥ {config.drop_pct}%
            week-over-week (min {config.min_impressions} prior impressions).
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {alerts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {a.query || "(not provided)"}
                  </p>
                  <p className="mt-0.5 text-micro text-muted-foreground">
                    {a.metric === "clicks" ? "Clicks" : "Impressions"} {fmtInt(a.prev_value)} →{" "}
                    {fmtInt(a.curr_value)} · {a.curr_window_start} vs {a.prev_window_start}
                  </p>
                </div>
                <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-300 tabular-nums">
                  {a.pct_change.toFixed(1)}%
                </span>
                {a.acknowledged_at ? (
                  <span className="text-micro text-muted-foreground">Acknowledged</span>
                ) : (
                  <button
                    onClick={() => void onAck(a.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground hover:bg-accent"
                  >
                    <Check className="h-3 w-3" /> Ack
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
        {title}
      </h2>
      <div className="rounded-2xl border border-border bg-muted/60 p-5">{children}</div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/60 p-5">
      <div className="flex items-center gap-2 text-primary-glow">
        {icon}
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
          {label}
        </p>
      </div>
      <p className="mt-2 font-display text-h2 text-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  if (rows.length === 0)
    return <p className="text-sm text-muted-foreground">No data in this range.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            {headers.map((h, i) => (
              <th
                key={h}
                className={`pb-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground ${i === 0 ? "" : "text-right"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-border/60">
              {r.map((cell, i) => (
                <td
                  key={i}
                  className={`py-2 ${i === 0 ? "pr-3 text-foreground/90 truncate max-w-[260px]" : "text-right tabular-nums text-foreground"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DailyChart({ daily }: { daily: GscOverview["daily"] }) {
  if (daily.length === 0)
    return <p className="text-sm text-muted-foreground">No data in this range.</p>;
  const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date));
  const maxImp = Math.max(...sorted.map((d) => d.impressions), 1);
  const maxClk = Math.max(...sorted.map((d) => d.clicks), 1);
  const W = 800,
    H = 200,
    P = 24;
  const xStep = (W - P * 2) / Math.max(sorted.length - 1, 1);
  const impPath = sorted
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${P + i * xStep},${H - P - (d.impressions / maxImp) * (H - P * 2)}`,
    )
    .join(" ");
  const clkPath = sorted
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"}${P + i * xStep},${H - P - (d.clicks / maxClk) * (H - P * 2)}`,
    )
    .join(" ");
  return (
    <div>
      <div className="mb-3 flex items-center gap-4 text-xs text-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-primary-glow" /> Impressions (max {fmtInt(maxImp)})
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-white" /> Clicks (max {fmtInt(maxClk)})
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
        <path
          d={impPath}
          fill="none"
          stroke="currentColor"
          className="text-primary-glow"
          strokeWidth={1.5}
        />
        <path
          d={clkPath}
          fill="none"
          stroke="currentColor"
          className="text-foreground"
          strokeWidth={1.5}
        />
      </svg>
      <div className="mt-1 flex justify-between text-micro text-muted-foreground">
        <span>{sorted[0]?.date}</span>
        <span>{sorted[sorted.length - 1]?.date}</span>
      </div>
    </div>
  );
}

function fmtInt(n: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}

function ConnectivityPanel({
  pinging,
  result,
  error,
  onTest,
}: {
  pinging: boolean;
  result: GscPingResult | null;
  error: string | null;
  onTest: () => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <PlugZap className="h-3.5 w-3.5" /> Connector health
          </h2>
          <p className="mt-1 text-sm text-foreground">
            Live end-to-end check against Google Search Console via the Lovable gateway.
          </p>
        </div>
        <button
          type="button"
          onClick={onTest}
          disabled={pinging}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {pinging ? (
            <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
          ) : (
            <PlugZap className="h-3.5 w-3.5" />
          )}
          {pinging ? "Testing…" : "Test connection"}
        </button>
      </div>

      {error && (
        <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-sky-300">
            <CheckCircle2 className="h-3.5 w-3.5" /> Connected · {result.latencyMs} ms
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Property</dt>
              <dd className="truncate">{result.site}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Sites in account</dt>
              <dd>{result.sitesCount}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Permission</dt>
              <dd>{result.permissionLevel ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Sample range</dt>
              <dd>
                {result.sample.range.startDate} → {result.sample.range.endDate}
              </dd>
            </div>
          </dl>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left font-mono text-micro uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Top query (last 7d)</th>
                  <th className="px-3 py-2 text-right">Clicks</th>
                  <th className="px-3 py-2 text-right">Impr.</th>
                  <th className="px-3 py-2 text-right">CTR</th>
                  <th className="px-3 py-2 text-right">Pos.</th>
                </tr>
              </thead>
              <tbody>
                {result.sample.rows.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3 text-muted-foreground" colSpan={5}>
                      No impressions in the last 7 days - connection works, but the property has no
                      data yet.
                    </td>
                  </tr>
                ) : (
                  result.sample.rows.map((r) => (
                    <tr key={r.query} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{r.query || "(unset)"}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{fmtInt(r.clicks)}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{fmtInt(r.impressions)}</td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {(r.ctr * 100).toFixed(1)}%
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{r.position.toFixed(1)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
function fmtPct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}
function fmtDate(s: string | null) {
  if (!s) return "-";
  return new Date(s).toISOString().slice(0, 10);
}
function shortPath(url: string) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

function SitemapPanel({
  submitting,
  result,
  error,
  onSubmit,
}: {
  submitting: boolean;
  result: SitemapSubmitResult | null;
  error: string | null;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Upload className="h-3.5 w-3.5" /> Sitemap submission
          </h2>
          <p className="mt-1 text-sm text-foreground">
            Resubmit{" "}
            <code className="rounded bg-[#0a0c10]/40 px-1 py-0.5 text-xs">/sitemap.xml</code> to
            Google and read back its coverage.
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )}
          {submitting ? "Submitting…" : "Submit sitemap"}
        </button>
      </div>
      {error && (
        <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}
      {result && result.status && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Submitted URLs" value={fmtInt(result.status.submitted)} />
          <Stat
            label="Indexed"
            value={fmtInt(result.status.indexed)}
            sub={
              result.status.submitted
                ? `${Math.round((result.status.indexed / result.status.submitted) * 100)}% coverage`
                : undefined
            }
          />
          <Stat label="Errors" value={fmtInt(result.status.errors)} />
          <Stat label="Warnings" value={fmtInt(result.status.warnings)} />
          <p className="sm:col-span-2 lg:col-span-4 text-xs text-muted-foreground">
            {result.status.isPending ? "Re-fetch pending · " : ""}Last submitted{" "}
            {fmtDate(result.status.lastSubmitted)} · last downloaded{" "}
            {fmtDate(result.status.lastDownloaded)} · {result.feedpath}
          </p>
        </div>
      )}
      {result && !result.status && (
        <p className="mt-4 text-sm text-muted-foreground">
          Submitted. Google hasn't returned status yet - check back in a few minutes.
        </p>
      )}
    </section>
  );
}

function InspectPanel({
  path,
  setPath,
  inspecting,
  result,
  error,
  onInspect,
}: {
  path: string;
  setPath: (v: string) => void;
  inspecting: boolean;
  result: UrlInspectionResult | null;
  error: string | null;
  onInspect: () => void;
}) {
  const verdictClass = (v: string | null) =>
    v === "PASS"
      ? "bg-sky-500/15 text-sky-300"
      : v === "PARTIAL"
        ? "bg-amber-500/15 text-amber-200"
        : v === "FAIL" || v === "NEUTRAL"
          ? "bg-red-500/15 text-red-300"
          : "bg-muted text-muted-foreground";
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="inline-flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Search className="h-3.5 w-3.5" /> URL indexing status
          </h2>
          <p className="mt-1 text-sm text-foreground">
            Live check against Google's index for a specific page.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/courses/medical-coding"
            className="w-64 rounded-full border border-border bg-[#0a0c10]/40 px-3 py-2 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={onInspect}
            disabled={inspecting || !path.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {inspecting ? (
              <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
            ) : (
              <Search className="h-3.5 w-3.5" />
            )}
            {inspecting ? "Inspecting…" : "Inspect"}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-sm text-red-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}
      {result && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.verdict)}`}
            >
              Index: {result.verdict ?? "-"}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.mobileVerdict)}`}
            >
              Mobile: {result.mobileVerdict ?? "-"}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono font-semibold uppercase tracking-[0.18em] ${verdictClass(result.richResultsVerdict)}`}
            >
              Rich results: {result.richResultsVerdict ?? "-"}
            </span>
            {result.inspectionResultLink && (
              <a
                href={result.inspectionResultLink}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground hover:bg-accent"
              >
                Open in Search Console <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Coverage</dt>
              <dd>{result.coverageState ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Indexing</dt>
              <dd>{result.indexingState ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Robots.txt</dt>
              <dd>{result.robotsTxtState ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Page fetch</dt>
              <dd>{result.pageFetchState ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Crawled as</dt>
              <dd>{result.crawledAs ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Last crawl</dt>
              <dd>{fmtDate(result.lastCrawlTime)}</dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="text-muted-foreground">Google canonical</dt>
              <dd className="truncate">{result.googleCanonical ?? "-"}</dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="text-muted-foreground">User canonical</dt>
              <dd className="truncate">{result.userCanonical ?? "-"}</dd>
            </div>
          </dl>
          {result.sitemaps.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Discovered via sitemap: {result.sitemaps.join(", ")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
