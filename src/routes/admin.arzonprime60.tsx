import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { Prime60TalentExchange } from "@/components/prime60/Prime60TalentExchange";
import {
  getArzonPrime60Funnel,
  type Prime60FunnelResult,
} from "@/lib/arzonPrime60Funnel.functions";

export const Route = createFileRoute("/admin/arzonprime60")({
  head: () => ({
    meta: [
      { title: "ARZONPRIME60 funnel · Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Prime60FunnelPage,
});

type Gate = "loading" | "unauth" | "forbidden" | "ready";

const TIER_LABEL: Record<"essential" | "career" | "elite", string> = {
  essential: "Essential",
  career: "Career",
  elite: "Elite",
};

const SURFACE_LABEL: Record<string, string> = {
  result: "Career-engine result",
  next_step: "Personalised next step",
  pricing_mobile: "Pricing (mobile)",
  pricing_desktop: "Pricing (desktop)",
  unknown: "Unknown",
};

function Prime60FunnelPage() {
  const navigate = useNavigate();
  const fn = useServerFn(getArzonPrime60Funnel);
  const { status: gate } = useAdminGate(["admin", "reviewer", "support"]);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Prime60FunnelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const f = await fn({ data: { fromDays: days } });
        if (!cancelled) setData(f);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load funnel.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate, days, fn]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "unauth") {
    navigate({ to: "/admin/login" });
    return null;
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 text-amber-100">
        No staff role assigned.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-yellow-300">
            <Zap className="h-3 w-3" /> Admin · Coupon funnel
          </p>
          <h1 className="h-display mt-2">ARZONPRIME60</h1>
          <p className="mt-1 text-sm text-foreground">
            Shown → Clicked → Applied → Paid, broken down by tier. Owner:
            <span className="ml-1 inline-flex items-center gap-1 text-foreground">
              <ShieldCheck className="h-3 w-3 text-yellow-300" /> Arzon Academic Director
            </span>
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground"
        >
          <option value={1}>Last 24h</option>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </header>

      {/* Prime60 Elite Talent Exchange Grid */}
      <section className="mb-10">
        <Prime60TalentExchange />
      </section>

      {loading && (
        <p className="flex items-center gap-2 text-sm text-foreground">
          <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" /> Loading data…
        </p>
      )}
      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {data && (
        <>
          {/* ---------------- Top funnel ---------------- */}
          <section className="rounded-2xl border border-border bg-muted/60 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
                Top-line funnel · unique users
              </p>
              <p className="font-display text-h3 text-primary-glow">
                {data.totals.shownToPaidPct}%
                <span className="ml-1 text-micro font-normal uppercase tracking-widest text-muted-foreground">
                  shown → paid
                </span>
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <StepTile label="Offer shown" value={data.totals.shown} />
              <StepTile
                label="CTA clicked"
                value={data.totals.clicked}
                dropFrom={data.totals.shown}
              />
              <StepTile
                label="Coupon applied"
                value={data.totals.applied}
                dropFrom={data.totals.clicked}
              />
              <StepTile
                label="Paid"
                value={data.totals.paid}
                dropFrom={data.totals.applied}
                highlight
              />
            </div>
            <p className="mt-4 grid gap-2 text-micro text-foreground sm:grid-cols-3">
              <span>
                Click → pay:{" "}
                <span className="font-mono text-foreground">{data.totals.clickToPayPct}%</span>
              </span>
              <span>
                Apply → pay:{" "}
                <span className="font-mono text-foreground">{data.totals.applyToPayPct}%</span>
              </span>
              <span>{data.totalEvents.toLocaleString()} events scanned</span>
            </p>
          </section>

          {/* ---------------- By tier ---------------- */}
          <section className="rounded-2xl border border-border bg-muted/60 p-5">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
              Conversion by tier
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-micro uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-mono">Tier</th>
                    <th className="px-3 py-2 text-right font-mono">Clicked</th>
                    <th className="px-3 py-2 text-right font-mono">Applied</th>
                    <th className="px-3 py-2 text-right font-mono">Paid</th>
                    <th className="px-3 py-2 text-right font-mono">Click → pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.byTier.map((row) => (
                    <tr key={row.tier} className="text-foreground">
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          {TIER_LABEL[row.tier]}
                          <ArrowRight className="h-3 w-3 text-muted-foreground/70" />
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">{row.clicked}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">{row.applied}</td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums text-eyebrow">
                        {row.paid}
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">
                        {row.clickToPayPct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-micro text-muted-foreground">
              Tier is derived from <code className="text-foreground">props.tier</code> on the click
              / apply / paid event. The offer card itself shows all three tiers, so the top-line
              "Shown" number isn't split by tier.
            </p>
          </section>

          {/* ---------------- By surface ---------------- */}
          <section className="rounded-2xl border border-border bg-muted/60 p-5">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-foreground">
              Clicks by surface
            </p>
            {data.bySurface.length === 0 ? (
              <p className="mt-3 text-sm text-foreground">No click events in this range yet.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {data.bySurface.map((s) => {
                  const max = data.bySurface[0]?.clicked ?? 1;
                  const pct = max ? Math.round((s.clicked / max) * 100) : 0;
                  return (
                    <li key={s.surface}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-foreground">
                          {SURFACE_LABEL[s.surface] ?? s.surface}
                        </span>
                        <span className="font-mono tabular-nums text-foreground">{s.clicked}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-yellow-400/80"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function StepTile({
  label,
  value,
  dropFrom,
  highlight,
}: {
  label: string;
  value: number;
  dropFrom?: number;
  highlight?: boolean;
}) {
  const conversion =
    dropFrom !== undefined && dropFrom > 0 ? Math.round((value / dropFrom) * 1000) / 10 : null;
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-accent-glow/30 bg-accent-glow/5" : "border-border bg-muted/40"
      }`}
    >
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-h2 tabular-nums ${
          highlight ? "text-eyebrow" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {conversion !== null && (
        <p className="mt-1 text-micro text-muted-foreground">{conversion}% of previous</p>
      )}
    </div>
  );
}
