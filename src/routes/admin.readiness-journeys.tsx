import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, MessageCircle } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import {
  listReadinessJourneys,
  type ReadinessJourneyRow,
} from "@/lib/admin-readiness-journeys.functions";
import { useAdminGate } from "@/hooks/useAdminGate";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

export const Route = createFileRoute("/admin/readiness-journeys")({
  head: () => ({
    meta: [
      { title: "Readiness journeys · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminReadinessJourneys,
});

type StatusFilter = "all" | "started" | "submitted" | "paid";

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "All",
  started: "Started (test only)",
  submitted: "Submitted (lead, unpaid)",
  paid: "Paid",
};

function fmtTs(value: string | null): string {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function counsellorWaLink(lead: ReadinessJourneyRow): string {
  const text =
    `Hi ${lead.leadName ?? "there"} - this is Arzon Careers (founders' line). ` +
    `Following up on your readiness test (session ${lead.sessionId.slice(0, 8)}…).`;
  return `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;
}

function AdminReadinessJourneys() {
  const list = useServerFn(listReadinessJourneys);
  const { status: gate } = useAdminGate(["admin"]);
  const [rows, setRows] = useState<ReadinessJourneyRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sinceHours, setSinceHours] = useState<number>(168);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const res = await list({ data: { status, sinceHours } });
        if (!cancel) setRows(res.rows);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load journeys");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [gate, list, status, sinceHours]);

  const counts = useMemo(() => {
    const c = { started: 0, submitted: 0, paid: 0 };
    for (const r of rows) {
      if (r.paidAt) c.paid++;
      else if (r.submittedAt) c.submitted++;
      else if (r.startedAt) c.started++;
    }
    return c;
  }, [rows]);

  if (gate === "loading") {
    return (
      <main className="mx-auto flex max-w-5xl items-center p-8">
        <AiThinkingLoader label="Thinking & verifying access…" size="sm" />
      </main>
    );
  }
  if (gate === "unauth") return <main className="p-8">Sign in required.</main>;
  if (gate === "forbidden") return <main className="p-8">Forbidden.</main>;

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Readiness journeys</h1>
          <p className="text-sm text-muted-foreground">
            Conversion funnel: started → submitted → paid. Counsellor WhatsApp is the founders'
            line.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border bg-muted px-2 py-1">
            Started: <b>{counts.started}</b>
          </span>
          <span className="rounded-md border bg-muted px-2 py-1">
            Submitted: <b>{counts.submitted}</b>
          </span>
          <span className="rounded-md border bg-muted px-2 py-1">
            Paid: <b>{counts.paid}</b>
          </span>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Status filter">
        {(Object.keys(STATUS_LABELS) as StatusFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            data-testid={`status-filter-${s}`}
            aria-pressed={status === s}
            onClick={() => setStatus(s)}
            className={`rounded-full border px-3 py-1 text-xs ${
              status === s
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
        <select
          className="ml-auto rounded-md border bg-background px-2 py-1 text-xs"
          value={sinceHours}
          onChange={(e) => setSinceHours(Number(e.target.value))}
          aria-label="Window"
        >
          <option value={24}>Last 24h</option>
          <option value={72}>Last 3 days</option>
          <option value={168}>Last 7 days</option>
          <option value={720}>Last 30 days</option>
          <option value={2160}>Last 90 days</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Lead</th>
              <th className="p-3">Session</th>
              <th className="p-3">Started</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Counsellor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={7}>
                  <Loader2 className="mx-auto h-4 w-4 motion-safe:animate-spin" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={7}>
                  No journeys in this window.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} data-testid="journey-row" className="border-t align-top">
                  <td className="p-3">
                    <div className="font-medium">{r.leadName ?? "-"}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.leadEmail ?? "no email"}
                      {r.leadPhone ? ` · ${r.leadPhone}` : ""}
                    </div>
                    {r.archetype ? (
                      <div className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-xs">
                        {r.archetype}
                        {r.scoreBand ? ` · ${r.scoreBand}` : ""}
                      </div>
                    ) : null}
                  </td>
                  <td className="p-3 font-mono text-xs">{r.sessionId.slice(0, 12)}…</td>
                  <td className="p-3 text-xs">{fmtTs(r.startedAt)}</td>
                  <td className="p-3 text-xs">{fmtTs(r.submittedAt)}</td>
                  <td className="p-3 text-xs">
                    {r.paidAt ? (
                      <span className="rounded bg-sky-500/15 px-1.5 py-0.5 font-medium text-sky-700 dark:text-sky-300">
                        {fmtTs(r.paidAt)}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 text-xs">
                    {r.amountInr ? `₹${r.amountInr.toLocaleString("en-IN")}` : "-"}
                  </td>
                  <td className="p-3">
                    {r.leadPhone ? (
                      <a
                        href={counsellorWaLink(r)}
                        target="_blank" rel="noopener noreferrer"
                        data-testid="journey-wa-link"
                        className="inline-flex items-center gap-1 rounded border border-sky-500/40 px-2 py-1 text-xs text-sky-700 hover:bg-sky-500/10 dark:text-sky-300"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
