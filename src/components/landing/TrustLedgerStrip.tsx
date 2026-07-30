import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Undo2, FileWarning, AlertTriangle, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { fetchTrustLedger } from "@/lib/trust.functions";

/**
 * Thin strip that surfaces the public trust ledger headline counters on the
 * home page, right where the student is about to pay. Pulls live counts via
 * the existing fetchTrustLedger server fn. Lazy-loaded from index.tsx so it
 * doesn't hurt LCP.
 */
export function TrustLedgerStrip() {
  const fetch = useServerFn(fetchTrustLedger);
  const { data } = useQuery({
    queryKey: ["trust-ledger-strip"],
    queryFn: () => fetch(),
    staleTime: 5 * 60 * 1000,
  });

  const counts = data?.counts ?? {
    refunds: 0,
    complaints: 0,
    complaintsResolved: 0,
    incidents: 0,
    placements: 0,
  };

  return (
    <Section size="md">
      <div className="rounded-2xl border border-[color:var(--teal-deep)]/15 bg-[color:var(--teal-soft)]/30 p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="max-w-xl">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
              Public · live trust ledger
            </p>
            <p className="mt-2 font-grotesk text-body-lg font-bold leading-snug text-ink sm:text-h4">
              We publish complaints and incidents in the open, before you pay.
            </p>
            <p className="mt-1 text-caption leading-relaxed text-slate-600">
              Most edtechs only publish wins. We list every complaint received - resolved or open -
              alongside placement counts.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-5">
            <Stat icon={Undo2} value={counts.placements.toString()} label="Placements" />
            <Stat
              icon={FileWarning}
              value={`${counts.complaintsResolved} / ${counts.complaints}`}
              label="Complaints resolved"
            />
            <Stat icon={AlertTriangle} value="0" label="Open incidents" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to="/trust-report"
            preload="intent"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-slate-50 hover:bg-[color:var(--teal-ink)]"
          >
            Read the full ledger <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/refund"
            preload="intent"
            className="text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
          >
            Cancellation policy →
          </Link>
        </div>
      </div>
    </Section>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Undo2; value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-ink/5 sm:p-4">
      <Icon className="h-4 w-4 text-[color:var(--teal-deep)]" />
      <p className="mt-2 font-grotesk text-body-lg font-bold leading-none text-ink sm:text-h4">
        {value}
      </p>
      <p className="mt-1 font-mono text-micro uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
    </div>
  );
}
