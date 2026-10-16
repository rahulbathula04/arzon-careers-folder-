import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Download, Eye, MessageCircle, Mail, Phone, X, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { listResults } from "@/lib/leads.functions";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useAdminGate } from "@/hooks/useAdminGate";
import { AdminAssessmentDossier } from "@/components/admin/AdminAssessmentDossier";

export const Route = createFileRoute("/admin/results")({
  head: () => ({
    meta: [{ title: "Results · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminResults,
});

type PathItem = { slug?: string; title?: string; salary?: string };
type Payment = { tier: string | null; paid_at: string | null; status: string | null } | null;
type Result = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  whatsapp_optin: boolean;
  archetype: string | null;
  fit_score: number | null;
  top_paths: PathItem[] | unknown;
  result_payload: unknown;
  cohort_id: string | null;
  session_id: string | null;
  contacted_at: string | null;
  payment: Payment;
};

type Facets = { archetypes: string[]; cohorts: string[]; pathSlugs: string[] };

function fitColor(score: number | null): string {
  if (score == null) return "text-muted-foreground";
  if (score >= 80) return "text-sky-300";
  if (score >= 60) return "text-eyebrow";
  if (score >= 40) return "text-amber-300";
  return "text-rose-300";
}

function topPaths(r: Result): PathItem[] {
  return Array.isArray(r.top_paths) ? (r.top_paths as PathItem[]) : [];
}

function Sparkline({ payload }: { payload: unknown }) {
  const p = (payload ?? {}) as { breakdown?: Record<string, number> };
  const b = p.breakdown ?? {};
  const dims = ["aptitude", "background", "commitment", "interest"];
  const vals = dims.map((k) => Math.max(0, Math.min(100, Number(b[k] ?? 0))));
  if (vals.every((v) => v === 0)) return <span className="text-muted-foreground/70">-</span>;
  return (
    <div
      className="flex items-end gap-0.5 h-5"
      title={dims.map((k, i) => `${k}: ${vals[i]}`).join(" · ")}
    >
      {vals.map((v, i) => (
        <span
          key={i}
          className="w-1.5 rounded-sm bg-primary-glow/70"
          style={{ height: `${Math.max(8, v)}%`, minHeight: "2px" }}
        />
      ))}
    </div>
  );
}

function AdminResults() {
  const navigate = useNavigate();
  const list = useServerFn(listResults);
  const recordExport = useServerFn(recordAdminExport);
  const { status: gate } = useAdminGate(["admin", "analyst", "exporter", "viewer"]);

  const [rows, setRows] = useState<Result[]>([]);
  const [facets, setFacets] = useState<Facets>({ archetypes: [], cohorts: [], pathSlugs: [] });
  const [caps, setCaps] = useState<{ showPII: boolean; canExport: boolean; roles: string[] }>({
    showPII: false,
    canExport: false,
    roles: [],
  });
  const [confirmExport, setConfirmExport] = useState(false);
  const [loading, setLoading] = useState(false);

  const [archetype, setArchetype] = useState<string>("");
  const [pathSlug, setPathSlug] = useState<string>("");
  const [cohort, setCohort] = useState<string>("");
  const [minFit, setMinFit] = useState<number>(0);
  const [hasResult, setHasResult] = useState<"all" | "yes" | "no">("yes");
  const [sinceDays, setSinceDays] = useState<number>(90);
  const [query, setQuery] = useState("");

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({
          data: {
            archetype: archetype || undefined,
            pathSlug: pathSlug || undefined,
            cohort: cohort || undefined,
            minFit: minFit > 0 ? minFit : undefined,
            hasResult,
            sinceDays,
          },
        });
        if (!cancelled) {
          setRows(res.results as Result[]);
          setFacets(res.facets as Facets);
          const c = (
            res as { capabilities?: { showPII: boolean; canExport: boolean; roles: string[] } }
          ).capabilities;
          if (c) setCaps(c);
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load results");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, list, archetype, pathSlug, cohort, minFit, hasResult, sinceDays]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.email ?? "").toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q),
    );
  }, [rows, query]);

  const summary = useMemo(() => {
    const scored = visible.filter((r) => r.fit_score != null).map((r) => r.fit_score!) as number[];
    const median = scored.length
      ? [...scored].sort((a, b) => a - b)[Math.floor(scored.length / 2)]
      : null;
    const archetypeCounts: Record<string, number> = {};
    for (const r of visible) {
      if (r.archetype) archetypeCounts[r.archetype] = (archetypeCounts[r.archetype] ?? 0) + 1;
    }
    const topArch = Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
    const paidCount = visible.filter((r) => r.payment?.status === "paid").length;
    return { total: visible.length, median, topArch, paidCount };
  }, [visible]);

  const columns: CsvColumn<Result>[] = [
    { key: "created_at", header: "created_at" },
    { key: "name", header: "name" },
    { key: "email", header: "email" },
    { key: "phone", header: "phone" },
    { key: "whatsapp_optin", header: "whatsapp_optin" },
    { key: "archetype", header: "archetype" },
    { key: "fit_score", header: "fit_score" },
    { key: "cohort_id", header: "cohort_id" },
    { key: "top_path_1", header: "top_path_1", accessor: (r) => topPaths(r)[0]?.slug ?? "" },
    { key: "top_path_2", header: "top_path_2", accessor: (r) => topPaths(r)[1]?.slug ?? "" },
    { key: "top_path_3", header: "top_path_3", accessor: (r) => topPaths(r)[2]?.slug ?? "" },
    { key: "payment_status", header: "payment_status", accessor: (r) => r.payment?.status ?? "" },
    { key: "payment_tier", header: "payment_tier", accessor: (r) => r.payment?.tier ?? "" },
    { key: "paid_at", header: "paid_at", accessor: (r) => r.payment?.paid_at ?? "" },
    { key: "contacted_at", header: "contacted_at" },
  ];

  const downloadCsv = async () => {
    if (!caps.canExport) {
      toast.error("Your role doesn't permit CSV export.");
      return;
    }
    if (visible.length > 200) {
      setConfirmExport(true);
      return;
    }
    await doExport();
  };

  const doExport = async () => {
    setConfirmExport(false);
    try {
      await exportCsvAudited(
        recordExport,
        "career_engine_results",
        dateStampedFilename("arzon-results"),
        visible,
        columns,
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };

  const openDetail = (id: string) => {
    setOpenId(id);
  };

  if (gate === "loading")
    return <AiThinkingLoader label="Thinking…" size="sm" />;
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden")
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        No staff access.
      </div>
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Results
          </p>
          <h1 className="h-display mt-2">Student test results</h1>
          <p className="mt-1 text-sm text-foreground">
            Every completed career-engine test with archetype, fit score, top paths & payment
            status.{" "}
            <Link to="/admin/leads" className="underline text-primary-glow">
              View leads instead →
            </Link>
          </p>
          {!caps.showPII && caps.roles.length > 0 && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 px-2.5 py-1 text-micro text-amber-200">
              <EyeOff className="h-3 w-3" /> PII masked for your role ({caps.roles.join(", ")})
            </div>
          )}
        </div>
        {caps.canExport && (
          <Button onClick={downloadCsv} variant="secondary" className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        )}
      </header>

      {/* Summary strip */}
      <section className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Results shown" value={summary.total} />
        <Kpi label="Median fit" value={summary.median ?? "-"} />
        <Kpi label="Top archetype" value={summary.topArch} />
        <Kpi label="Paid (matched)" value={summary.paidCount} />
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-border bg-muted/40 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name/email/phone"
            className="h-10 rounded-lg border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <Select
            label="Archetype"
            value={archetype}
            onChange={setArchetype}
            options={facets.archetypes}
          />
          <Select
            label="Top path"
            value={pathSlug}
            onChange={setPathSlug}
            options={facets.pathSlugs}
          />
          <Select label="Cohort" value={cohort} onChange={setCohort} options={facets.cohorts} />
          <div>
            <label className="block text-micro uppercase tracking-[0.18em] text-muted-foreground mb-1">
              Min fit {minFit > 0 ? minFit : ""}
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={minFit}
              onChange={(e) => setMinFit(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <SelectBare
              value={hasResult}
              onChange={(v) => setHasResult(v as "all" | "yes" | "no")}
              options={[
                ["yes", "Completed"],
                ["no", "Lead only"],
                ["all", "All"],
              ]}
            />
            <SelectBare
              value={String(sinceDays)}
              onChange={(v) => setSinceDays(Number(v))}
              options={[
                ["7", "7d"],
                ["30", "30d"],
                ["90", "90d"],
                ["365", "1y"],
              ]}
            />
          </div>
        </div>
      </section>

      <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-micro uppercase tracking-[0.22em] text-foreground">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Archetype</th>
              <th className="px-4 py-3">Fit</th>
              <th className="px-4 py-3">ACRI</th>
              <th className="px-4 py-3">Top path</th>
              <th className="px-4 py-3">Cohort</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center">
                  <AiThinkingLoader label="Thinking…" size="sm" />
                </td>
              </tr>
            )}
            {!loading &&
              visible.map((r) => {
                const paths = topPaths(r);
                const top1 = paths[0];
                const phoneClean = (r.phone ?? "").replace(/\D/g, "");
                return (
                  <tr key={r.id} className="border-t border-border/60 align-top hover:bg-muted/40">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-foreground font-medium">{r.name}</div>
                      <div className="text-muted-foreground text-micro">{r.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {phoneClean && (
                          <a
                            href={`https://wa.me/${phoneClean}`}
                            target="_blank" rel="noopener noreferrer"
                            title="WhatsApp"
                            className="text-sky-300 hover:text-sky-200"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        )}
                        {phoneClean && (
                          <a
                            href={`tel:${phoneClean}`}
                            title="Call"
                            className="text-eyebrow hover:text-eyebrow-strong"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                        {r.email && (
                          <a
                            href={`mailto:${r.email}`}
                            title="Email"
                            className="text-foreground hover:text-foreground"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground text-caption">{r.archetype ?? "-"}</td>
                    <td className={`px-4 py-3 font-mono font-semibold ${fitColor(r.fit_score)}`}>
                      {r.fit_score ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Sparkline payload={r.result_payload} />
                    </td>
                    <td className="px-4 py-3 text-foreground text-meta">
                      {top1 ? (
                        <span title={top1.salary ?? ""}>{top1.title ?? top1.slug}</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-meta">
                      {r.cohort_id ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      {r.payment?.status === "paid" ? (
                        <span className="rounded-full bg-sky-400/15 text-sky-200 px-2 py-0.5 text-micro uppercase tracking-wider">
                          {r.payment.tier}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/70 text-micro">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openDetail(r.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-micro text-foreground hover:bg-accent"
                      >
                        <Eye className="h-3.5 w-3.5" /> Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">
                  No results match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openId && (
        <AdminAssessmentDossier
          leadId={openId}
          initialLead={visible.find((r) => r.id === openId)}
          onClose={() => {
            setOpenId(null);
          }}
          onContactedChange={(id, isContacted) => {
            setRows((prev) =>
              prev.map((r) =>
                r.id === id ? { ...r, contacted_at: isContacted ? new Date().toISOString() : null } : r,
              ),
            );
          }}
        />
      )}
      {confirmExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-[#0b1020] p-6 text-foreground">
            <h3 className="text-base font-semibold">Confirm large export</h3>
            <p className="mt-2 text-sm text-foreground">
              You're about to export <strong>{visible.length}</strong> student records including
              {caps.showPII ? " names, emails, and phone numbers" : " masked PII"}. This action will
              be logged with your account.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setConfirmExport(false)}>
                Cancel
              </Button>
              <Button onClick={doExport}>Export {visible.length} rows</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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

function SelectBare({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 flex-1 rounded-lg border border-border bg-muted px-2 text-sm text-foreground"
    >
      {options.map(([v, lbl]) => (
        <option key={v} value={v}>
          {lbl}
        </option>
      ))}
    </select>
  );
}

