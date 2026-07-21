import { useEffect, useState } from "react";
import { ShieldCheck, QrCode, Eye, FileText, Sparkles, Clock } from "lucide-react";
import {
  fetchVerificationAudit,
  type AuditRow,
  type VerificationEvent,
} from "@/lib/verificationAudit";

const EVENT_META: Record<VerificationEvent, { label: string; icon: typeof ShieldCheck }> = {
  id_generated: { label: "ID & QR generated", icon: Sparkles },
  qr_scanned: { label: "QR / ID verified", icon: QrCode },
  rubric_viewed: { label: "Recruiter viewed rubric", icon: Eye },
  artifact_unlocked: { label: "Graded artifact unlocked", icon: FileText },
  portfolio_viewed: { label: "Portfolio opened", icon: ShieldCheck },
};

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function VerificationAuditTrail({
  candidateRef,
  tone = "light",
}: {
  candidateRef: string;
  tone?: "light" | "dark";
}) {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchVerificationAudit(candidateRef)
      .then((r) => {
        if (active) setRows(r);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [candidateRef]);

  const isDark = tone === "dark";
  const shellClass = isDark
    ? "rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    : "rounded-2xl border border-ink/10 bg-white p-5";
  const titleClass = isDark
    ? "font-grotesk text-body-sm font-bold text-white"
    : "font-grotesk text-body-sm font-bold text-ink";
  const subClass = isDark ? "text-meta text-white/65" : "text-meta text-slate-600";
  const rowClass = isDark
    ? "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
    : "flex items-start gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3";
  const eventLabelClass = isDark
    ? "text-caption font-semibold text-white"
    : "text-caption font-semibold text-ink";
  const timestampClass = isDark
    ? "font-mono text-micro text-white/55"
    : "font-mono text-micro text-slate-500";

  return (
    <div className={shellClass}>
      <div className="flex items-center gap-2">
        <ShieldCheck
          className={isDark ? "h-4 w-4 text-primary-glow" : "h-4 w-4 text-[color:var(--teal-deep)]"}
        />
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.2em] ${isDark ? "text-primary-glow" : "text-[color:var(--teal-deep)]"}`}
        >
          Public verification audit trail
        </p>
      </div>
      <h3 className={`mt-1.5 ${titleClass}`}>What's happened on this candidate</h3>
      <p className={`mt-1 ${subClass}`}>
        De-identified. Shows when the ID was generated, when recruiters viewed the rubric, and when
        graded artifacts were unlocked. No PII.
      </p>

      <ol className="mt-4 space-y-2.5">
        {loading && (
          <li className={rowClass}>
            <Clock className={isDark ? "h-4 w-4 text-white/60" : "h-4 w-4 text-slate-400"} />
            <p className={subClass}>Loading audit trail…</p>
          </li>
        )}
        {!loading && rows.length === 0 && (
          <li className={rowClass}>
            <Clock className={isDark ? "h-4 w-4 text-white/60" : "h-4 w-4 text-slate-400"} />
            <p className={subClass}>
              No public events yet for <span className="font-mono">{candidateRef}</span>. This page
              logs the first one when a recruiter opens it.
            </p>
          </li>
        )}
        {rows.map((r) => {
          const meta = EVENT_META[r.event_type];
          const Icon = meta?.icon ?? ShieldCheck;
          return (
            <li key={r.id} className={rowClass}>
              <Icon
                className={
                  isDark
                    ? "mt-0.5 h-4 w-4 shrink-0 text-primary-glow"
                    : "mt-0.5 h-4 w-4 shrink-0 text-[color:var(--teal-deep)]"
                }
              />
              <div className="min-w-0 flex-1">
                <p className={eventLabelClass}>{meta?.label ?? r.event_type}</p>
                <p className={timestampClass}>{fmt(r.occurred_at)}</p>
                {r.viewer_org_tag && (
                  <p className={timestampClass}>
                    by <span className="font-mono">{r.viewer_org_tag}</span>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
