import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Users, UserCheck, Undo2, FileWarning, ArrowRight } from "lucide-react";
import { fetchTrustLedger } from "@/lib/trust.functions";

/**
 * Batch outcome panel for TPOs. Reads live counts from the public trust
 * ledger. Missing ledger data must not be displayed as zero outcomes.
 */
export function BatchOutcomeStrip() {
  const fetch = useServerFn(fetchTrustLedger);
  const { data } = useQuery({
    queryKey: ["trust-ledger-tpo"],
    queryFn: () => fetch(),
    staleTime: 5 * 60 * 1000,
  });
  const counts = data?.counts;\n  const countValue = (value: number | undefined) => data?.available ? value ?? 0 : "Unavailable";

  return (
    <div className="rounded-2xl border border-[color:var(--teal-deep)]/20 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
            PUBLIC LEDGER SNAPSHOT
          </p>
          <h2 className="mt-1 font-grotesk text-body-lg font-bold text-ink sm:text-h4">
            What we publish, not what we claim
          </h2>
          <p className="mt-1 text-caption leading-relaxed text-slate-600">
            This is an early public dataset. Counts are read from the ledger and should not be interpreted as a placement rate or proof of outcomes beyond the records shown.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={Users}
          value={countValue(counts?.refunds)}
          label="Refunds logged"
          hint="ledger records"
        />
        <Stat
          icon={UserCheck}
          value={countValue(counts?.placements)}
          label="Placements logged"
          hint="with employer reference"
        />
        <Stat
          icon={FileWarning}
          value={data?.available ? `${counts?.complaintsResolved ?? 0} / ${counts?.complaints ?? 0}` : "Unavailable"}
          label="Complaints resolved"
          hint="open + closed"
        />
        <Stat icon={Undo2} value={countValue(counts?.incidents)} label="Incidents recorded" hint="ledger records" />
      </div>

      <div className="mt-5 rounded-xl border border-amber-300/30 bg-amber-50/60 p-3 text-meta leading-relaxed text-amber-900">
        <strong>Honest note for placement officers:</strong> we deliberately do not quote a
        placement percentage until the dataset is large enough to be stable across batches. The ledger above shows the records currently available. Confirm how any cohort-specific outcomes would be reported before entering a partnership.
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/trust-report"
          preload="intent"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]"
        >
          Open the public ledger <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/refund"
          preload="intent"
          className="inline-flex h-10 items-center text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
        >
          Cancellation policy
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  hint,
}: {
  icon: typeof Users;
  value: string | number;
  label: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl bg-[color:var(--teal-soft)]/30 p-3">
      <Icon className="h-4 w-4 text-[color:var(--teal-deep)]" />
      <p className="mt-2 font-grotesk text-h4 font-bold leading-none text-ink">{value}</p>
      <p className="mt-1 font-mono text-micro uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 text-micro text-slate-500">{hint}</p>
    </div>
  );
}
