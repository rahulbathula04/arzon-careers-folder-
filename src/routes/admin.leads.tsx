import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Loader2,
  Download,
  CheckCircle2,
  Circle,
  Eye,
  X,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { listLeads, markLeadContacted, getLeadDetail } from "@/lib/leads.functions";
import { recordAdminExport } from "@/lib/admin-export.functions";
import { exportCsvAudited, dateStampedFilename, type CsvColumn } from "@/lib/csv";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{ title: "Leads · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminLeads,
});

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  whatsapp_optin: boolean;
  archetype: string | null;
  fit_score: number | null;
  top_paths: unknown;
  result_payload: unknown;
  cohort_id: string | null;
  session_id: string | null;
  contacted_at: string | null;
};

type SessionInfo = {
  stream: string | null;
  device: string | null;
  utm_source: string | null;
  user_agent: string | null;
  started_at: string | null;
  completed_at: string | null;
};
type TraceEvent = {
  at: string;
  source: string;
  event: string;
  question_id: string | null;
  answer: string | null;
};
type Detail = {
  lead: Lead;
  session: SessionInfo | null;
  trace: TraceEvent[];
};

type Filter = "all" | "yes" | "no";

function AdminLeads() {
  const navigate = useNavigate();
  const list = useServerFn(listLeads);
  const mark = useServerFn(markLeadContacted);
  const detail = useServerFn(getLeadDetail);
  const recordExport = useServerFn(recordAdminExport);
  const { status: gate, userId: actorId } = useAdminGate(["admin", "reviewer", "support"]);
  const [rows, setRows] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<Detail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await list({ data: { contacted: filter } });
        if (!cancelled) setRows(res.leads as Lead[]);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load leads");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, filter, list]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const name = (r.name ?? "").toLowerCase();
      const email = (r.email ?? "").toLowerCase();
      const fit = r.fit_score == null ? "" : String(r.fit_score);
      return name.includes(q) || email.includes(q) || fit.includes(q);
    });
  }, [rows, query]);

  const leadColumns: CsvColumn<Lead>[] = [
    { key: "created_at", header: "created_at" },
    { key: "name", header: "name" },
    { key: "email", header: "email" },
    { key: "phone", header: "phone" },
    { key: "whatsapp_optin", header: "whatsapp_optin" },
    { key: "archetype", header: "archetype" },
    { key: "fit_score", header: "fit_score" },
    { key: "cohort_id", header: "cohort_id" },
    { key: "top_paths", header: "top_paths", accessor: (r) => JSON.stringify(r.top_paths ?? null) },
    { key: "contacted_at", header: "contacted_at" },
  ];

  const downloadCsv = async () => {
    try {
      await exportCsvAudited(
        recordExport,
        "career_engine_leads",
        dateStampedFilename("arzon-leads"),
        visible,
        leadColumns,
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export blocked");
    }
  };

  const toggle = async (lead: Lead) => {
    setSavingId(lead.id);
    try {
      await mark({ data: { id: lead.id, contacted: !lead.contacted_at, actorId } });
      setRows((cur) =>
        cur.map((r) =>
          r.id === lead.id
            ? { ...r, contacted_at: lead.contacted_at ? null : new Date().toISOString() }
            : r,
        ),
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  };

  const openDetail = async (id: string) => {
    setOpenId(id);
    setDetailData(null);
    setDetailLoading(true);
    try {
      const res = await detail({ data: { id } });
      setDetailData(res as unknown as Detail);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load detail");
      setOpenId(null);
    } finally {
      setDetailLoading(false);
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
        No staff access.
      </div>
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Admin · Leads
          </p>
          <h1 className="h-display mt-2">Career-engine leads</h1>
          <p className="mt-1 text-sm text-foreground">
            {visible.length} shown{query.trim() ? ` · filtered from ${rows.length}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, fit…"
            aria-label="Search leads by name, email, or fit score"
            maxLength={120}
            className="h-10 w-56 rounded-full border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            className="h-10 rounded-full border border-border bg-muted px-4 text-sm text-foreground"
          >
            <option value="all">All</option>
            <option value="no">Uncontacted</option>
            <option value="yes">Contacted</option>
          </select>
          <Button onClick={downloadCsv} variant="secondary" className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-border bg-muted/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-micro uppercase tracking-[0.22em] text-foreground">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Archetype</th>
              <th className="px-4 py-3">Fit</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-t border-border/60 align-top">
                <td className="px-4 py-3 text-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-foreground">{r.name}</td>
                <td className="px-4 py-3 text-foreground">{r.email}</td>
                <td className="px-4 py-3 text-foreground">{r.phone}</td>
                <td className="px-4 py-3 text-foreground">{r.archetype ?? "—"}</td>
                <td className="px-4 py-3 text-foreground">{r.fit_score ?? "—"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggle(r)}
                    disabled={savingId === r.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent disabled:opacity-50"
                  >
                    {r.contacted_at ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-eyebrow" /> Contacted
                      </>
                    ) : (
                      <>
                        <Circle className="h-3.5 w-3.5 text-muted-foreground" /> Mark contacted
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => openDetail(r.id)}
                    className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground hover:bg-accent"
                    aria-label={`View details for ${r.name}`}
                  >
                    <Eye className="h-3.5 w-3.5 text-foreground" /> Details
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                  {query.trim()
                    ? `No leads match "${query.trim()}".`
                    : "No leads match this filter."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openId && (
        <LeadDetailDrawer
          loading={detailLoading}
          data={detailData}
          onClose={() => {
            setOpenId(null);
            setDetailData(null);
          }}
        />
      )}
    </div>
  );
}

function LeadDetailDrawer({
  loading,
  data,
  onClose,
}: {
  loading: boolean;
  data: Detail | null;
  onClose: () => void;
}) {
  const lead = data?.lead;
  const session = data?.session ?? null;
  const trace = data?.trace ?? [];
  const waLink = lead ? `https://wa.me/${lead.phone.replace(/\D/g, "")}` : "#";
  const mailLink = lead ? `mailto:${lead.email}` : "#";
  const telLink = lead ? `tel:${lead.phone}` : "#";
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Lead detail"
    >
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close detail"
      />
      <aside className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#0b0f1c] p-6 text-foreground shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Lead detail</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-foreground hover:bg-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {loading && (
          <div className="mt-6 flex items-center gap-2 text-foreground">
            <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
          </div>
        )}
        {!loading && lead && (
          <div className="mt-6 space-y-6 text-sm">
            <section>
              <h3 className="text-micro font-mono uppercase tracking-[0.22em] text-primary-glow">
                Contact
              </h3>
              <p className="mt-2 text-lg font-medium">{lead.name}</p>
              <p className="text-foreground">{lead.email}</p>
              <p className="text-foreground">
                {lead.phone}
                {lead.whatsapp_optin ? " · WhatsApp ok" : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 text-xs text-sky-200 hover:bg-sky-500/25"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
                <a
                  href={mailLink}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-glow/15 px-3 py-1 text-xs text-eyebrow-strong hover:bg-accent-glow/25"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
                <a
                  href={telLink}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-foreground hover:bg-slate-50/20"
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </div>
            </section>
            <section>
              <h3 className="text-micro font-mono uppercase tracking-[0.22em] text-primary-glow">
                Result
              </h3>
              <p className="mt-2 text-foreground">
                Archetype: <span className="text-foreground">{lead.archetype ?? "—"}</span>
              </p>
              <p className="text-foreground">
                Fit score: <span className="text-foreground">{lead.fit_score ?? "—"}</span>
              </p>
              <p className="text-foreground">
                Cohort interest: <span className="text-foreground">{lead.cohort_id ?? "—"}</span>
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-foreground">Top paths JSON</summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded bg-black/50 p-3 text-micro leading-snug text-foreground">
                  {JSON.stringify(lead.top_paths, null, 2)}
                </pre>
              </details>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-foreground">
                  Result payload (ACRI etc.)
                </summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded bg-black/50 p-3 text-micro leading-snug text-foreground">
                  {JSON.stringify(lead.result_payload, null, 2)}
                </pre>
              </details>
            </section>
            <section>
              <h3 className="text-micro font-mono uppercase tracking-[0.22em] text-primary-glow">
                Session
              </h3>
              {session ? (
                <ul className="mt-2 space-y-1 text-foreground">
                  <li>
                    Stream: <span className="text-foreground">{session.stream ?? "—"}</span>
                  </li>
                  <li>
                    Device: <span className="text-foreground">{session.device ?? "—"}</span>
                  </li>
                  <li>
                    UTM source: <span className="text-foreground">{session.utm_source ?? "—"}</span>
                  </li>
                  <li>
                    Started:{" "}
                    <span className="text-foreground">
                      {session.started_at ? new Date(session.started_at).toLocaleString() : "—"}
                    </span>
                  </li>
                  <li>
                    Completed:{" "}
                    <span className="text-foreground">
                      {session.completed_at ? new Date(session.completed_at).toLocaleString() : "—"}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="mt-2 text-muted-foreground">No session linked.</p>
              )}
            </section>
            <section>
              <h3 className="text-micro font-mono uppercase tracking-[0.22em] text-primary-glow">
                Session trace ({trace.length})
              </h3>
              <ol className="mt-2 space-y-1 text-micro leading-snug">
                {trace.map((t, i) => (
                  <li key={i} className="rounded bg-muted/60 p-2">
                    <div className="text-muted-foreground">
                      {new Date(t.at).toLocaleTimeString()} · {t.source} · {t.event}
                    </div>
                    {t.question_id && (
                      <div className="text-foreground">
                        Q: {t.question_id} →{" "}
                        <span className="text-foreground">{t.answer ?? "—"}</span>
                      </div>
                    )}
                  </li>
                ))}
                {trace.length === 0 && <li className="text-muted-foreground">No trace events.</li>}
              </ol>
            </section>
          </div>
        )}
      </aside>
    </div>
  );
}
