import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Users, Mail, MailCheck, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGate } from "@/hooks/useAdminGate";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard, AdminKpi } from "@/components/admin/AdminCard";
import {
  RetentionCohortChart,
  type CohortMeta,
  type CohortPoint,
} from "@/components/admin/RetentionCohortChart";

export const Route = createFileRoute("/admin/retention")({
  head: () => ({
    meta: [{ title: "Retention · Admin" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminRetention,
});

type CheckinRow = {
  id: string;
  outcome_id: string;
  checkin_type: string;
  sent_at: string | null;
  responded_at: string | null;
  channel: string;
  created_at: string;
};

type OutcomeRow = {
  id: string;
  recommended_family_id: string | null;
  chosen_role_slug: string | null;
  stage: string;
  still_in_role: boolean | null;
  recommended_at: string | null;
  joined_at: string | null;
};

function daysBetween(a: string, b: string) {
  const d = (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
  return Math.max(0, Math.round(d));
}

function AdminRetention() {
  const navigate = useNavigate();
  const { status: gate } = useAdminGate(["admin"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkins, setCheckins] = useState<CheckinRow[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeRow[]>([]);
  const [groupBy, setGroupBy] = useState<"family" | "role">("family");

  useEffect(() => {
    if (gate === "unauth") navigate({ to: "/admin/login" });
  }, [gate, navigate]);

  useEffect(() => {
    if (gate !== "ready") return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const [cRes, oRes] = await Promise.all([
          supabase
            .from("retention_checkins")
            .select("id,outcome_id,checkin_type,sent_at,responded_at,channel,created_at")
            .order("created_at", { ascending: false })
            .limit(2000),
          supabase
            .from("recommendation_outcomes")
            .select(
              "id,recommended_family_id,chosen_role_slug,stage,still_in_role,recommended_at,joined_at",
            )
            .limit(2000),
        ]);
        if (cancelled) return;
        if (cRes.error) throw cRes.error;
        if (oRes.error) throw oRes.error;
        setCheckins((cRes.data as CheckinRow[]) ?? []);
        setOutcomes((oRes.data as OutcomeRow[]) ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load retention data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gate]);

  const kpis = useMemo(() => {
    const delivered = checkins.filter((c) => c.sent_at).length;
    const responded = checkins.filter((c) => c.responded_at).length;
    const responseRate = delivered ? Math.round((responded / delivered) * 100) : 0;
    const inRole = outcomes.filter((o) => o.stage === "in_role" || o.stage === "left_role").length;
    const stillIn = outcomes.filter((o) => o.still_in_role === true).length;
    const retainedRate = inRole ? Math.round((stillIn / inRole) * 100) : 0;
    return {
      delivered,
      responded,
      responseRate,
      stillIn,
      retainedRate,
      totalOutcomes: outcomes.length,
    };
  }, [checkins, outcomes]);

  const cohortData = useMemo(() => buildCohortSeries(outcomes, groupBy), [outcomes, groupBy]);

  if (gate === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> Loading…
      </div>
    );
  }
  if (gate === "forbidden") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-foreground">
        You need admin access to view retention metrics.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px]">
      <AdminPageHeader
        eyebrow="Retention"
        title="Cohort retention"
        description="Check-in delivery, response rate, and 30/90/180/365-day retention by cohort. Updates whenever the dispatcher runs."
        actions={
          <div
            role="group"
            aria-label="Group by"
            className="inline-flex rounded-lg border border-border bg-card p-0.5 text-sm"
          >
            {(["family", "role"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroupBy(g)}
                className={
                  "rounded-md px-3 py-1.5 font-medium capitalize transition " +
                  (groupBy === g
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground")
                }
              >
                {g === "family" ? "By family" : "By role"}
              </button>
            ))}
          </div>
        }
      />

      {error ? (
        <div className="mb-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error}
        </div>
      ) : null}

      <section
        aria-label="Retention KPIs"
        className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <AdminKpi
          label="Check-ins delivered"
          value={loading ? "…" : kpis.delivered.toLocaleString("en-IN")}
          icon={<Mail className="h-4 w-4" />}
          helper="across email + SMS"
        />
        <AdminKpi
          label="Responded"
          value={loading ? "…" : kpis.responded.toLocaleString("en-IN")}
          icon={<MailCheck className="h-4 w-4" />}
          helper={`${kpis.responseRate}% response rate`}
          accent
        />
        <AdminKpi
          label="Outcomes tracked"
          value={loading ? "…" : kpis.totalOutcomes.toLocaleString("en-IN")}
          icon={<Users className="h-4 w-4" />}
          helper="recommendations with feedback"
        />
        <AdminKpi
          label="12mo retention"
          value={loading ? "…" : `${kpis.retainedRate}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          helper={`${kpis.stillIn.toLocaleString("en-IN")} still in recommended role`}
        />
      </section>

      <AdminCard
        eyebrow="Cohort curves"
        title={groupBy === "family" ? "Retention by family" : "Retention by role"}
        description="Percentage of each cohort still in their recommended role at 30, 90, 180 and 365 days post-enrolment."
        footer={
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Cohorts with fewer than 10 members are hidden to protect statistical signal.
          </span>
        }
      >
        {loading ? (
          <div className="grid h-[280px] place-items-center text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 motion-safe:animate-spin" />
          </div>
        ) : (
          <RetentionCohortChart data={cohortData.data} cohorts={cohortData.cohorts} />
        )}
      </AdminCard>
    </div>
  );
}

/**
 * Build a retention curve per cohort from raw outcomes.
 *
 * For each cohort (family or role), compute % still_in_role at the four
 * day milestones, using `recommended_at` as t=0 and the most recent
 * status check (`status_last_checked_at` falling back to `now()`) as the
 * survival window. Tiny cohorts (N<10) are filtered.
 */
function buildCohortSeries(
  outcomes: OutcomeRow[],
  groupBy: "family" | "role",
): { data: CohortPoint[]; cohorts: CohortMeta[] } {
  const now = new Date().toISOString();
  const buckets = new Map<string, OutcomeRow[]>();
  for (const o of outcomes) {
    const key = (groupBy === "family" ? o.recommended_family_id : o.chosen_role_slug) ?? "-";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(o);
  }

  const days = [30, 90, 180, 365];
  const eligible = Array.from(buckets.entries()).filter(([, rows]) => rows.length >= 10);
  if (!eligible.length) {
    return { data: [], cohorts: [] };
  }

  const cohorts: CohortMeta[] = eligible
    .slice(0, 5)
    .map(([id, rows]) => ({ id, label: id, n: rows.length }));

  const data: CohortPoint[] = days.map((day) => {
    const point: CohortPoint = { day };
    for (const c of cohorts) {
      const rows = buckets.get(c.id) ?? [];
      // Pool: members whose recommendation is at least `day` days old.
      const pool = rows.filter((r) => {
        if (!r.recommended_at) return false;
        return daysBetween(r.recommended_at, now) >= day;
      });
      if (pool.length === 0) {
        point[c.id] = 0;
        continue;
      }
      const retained = pool.filter((r) => r.still_in_role === true).length;
      point[c.id] = Math.round((retained / pool.length) * 100);
    }
    return point;
  });

  return { data, cohorts };
}
