import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

function pub() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false },
  });
}

export type TrustLedgerEntry = {
  id: string;
  occurred_on: string;
  kind: "refund" | "complaint" | "acri" | "placement" | "incident";
  headline: string;
  detail: string | null;
  amount_inr: number | null;
  resolved: boolean;
};

export type ChangelogEntry = {
  id: string;
  released_on: string;
  area: string;
  title: string;
  body: string | null;
};

export type StatusComponent = {
  id: string;
  name: string;
  state: "operational" | "degraded" | "down" | "maintenance";
  note: string | null;
  updated_at: string;
};

export const fetchTrustLedger = createServerFn({ method: "GET" }).handler(async () => {
  const sb = pub();
  const { data: ledger } = await sb
    .from("trust_ledger")
    .select("id, occurred_on, kind, headline, detail, amount_inr, resolved")
    .order("occurred_on", { ascending: false })
    .limit(50);

  // Aggregate counters
  const { count: refunds } = await sb
    .from("trust_ledger")
    .select("id", { count: "exact", head: true })
    .eq("kind", "refund");
  const { count: complaints } = await sb
    .from("trust_ledger")
    .select("id", { count: "exact", head: true })
    .eq("kind", "complaint");
  const { count: complaintsResolved } = await sb
    .from("trust_ledger")
    .select("id", { count: "exact", head: true })
    .eq("kind", "complaint")
    .eq("resolved", true);
  const { count: placements } = await sb
    .from("trust_ledger")
    .select("id", { count: "exact", head: true })
    .eq("kind", "placement");
  const { count: incidents } = await sb
    .from("trust_ledger")
    .select("id", { count: "exact", head: true })
    .eq("kind", "incident");

  return {
    entries: (ledger ?? []) as TrustLedgerEntry[],
    counts: {
      refunds: refunds ?? 0,
      complaints: complaints ?? 0,
      complaintsResolved: complaintsResolved ?? 0,
      placements: placements ?? 0,
      incidents: incidents ?? 0,
    },
  };
});

export const fetchChangelog = createServerFn({ method: "GET" }).handler(async () => {
  const sb = pub();
  const { data } = await sb
    .from("changelog_entries")
    .select("id, released_on, area, title, body")
    .order("released_on", { ascending: false })
    .limit(40);
  return { entries: (data ?? []) as ChangelogEntry[] };
});

export const fetchStatus = createServerFn({ method: "GET" }).handler(async () => {
  const sb = pub();
  const { data } = await sb
    .from("status_components")
    .select("id, name, state, note, updated_at")
    .order("name", { ascending: true });
  const components = (data ?? []) as StatusComponent[];
  const overall = components.every((c) => c.state === "operational")
    ? "operational"
    : components.some((c) => c.state === "down")
      ? "down"
      : "degraded";
  return { components, overall };
});
