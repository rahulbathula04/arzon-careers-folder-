import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { recordServerEvent, supabaseAdmin } from "@/server/analytics.server";
import { checkRateLimit } from "@/server/ratelimit.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  requireStaff,
  requireAdmin,
  requireResultsView,
  loadUserRoles,
  type AppRole,
} from "@/server/auth-guards.server";

function maskEmail(e: string | null | undefined): string {
  const s = (e ?? "").trim();
  if (!s.includes("@")) return s ? "•••" : "";
  const [u, d] = s.split("@");
  if (u.length <= 1) return `•••@${d}`;
  return `${u[0]}${"•".repeat(Math.max(3, u.length - 1))}@${d}`;
}
function maskPhone(p: string | null | undefined): string {
  const digits = (p ?? "").replace(/\D/g, "");
  if (digits.length <= 4) return digits ? "••••" : "";
  return `${digits.slice(0, 2)}${"•".repeat(Math.max(4, digits.length - 4))}${digits.slice(-2)}`;
}
function canSeePII(roles: AppRole[]): boolean {
  return roles.some((r) => r === "admin" || r === "analyst" || r === "exporter");
}
function canExport(roles: AppRole[]): boolean {
  return roles.some((r) => r === "admin" || r === "exporter");
}
// User-scoped supabase client comes from requireSupabaseAuth middleware as
// `context.supabase`. We need it (not the service client) so auth.uid()
// resolves inside the SECURITY DEFINER log_admin_action RPC.
type UserScopedSb = {
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ error: unknown }>;
};
async function logAction(
  sb: UserScopedSb,
  action: string,
  resource: string,
  recordId: string,
  diff: Record<string, unknown>,
) {
  try {
    await sb.rpc("log_admin_action", {
      _action: action,
      _resource: resource,
      _record_id: recordId,
      _diff: diff,
    });
  } catch (_e) {
    // never let audit failure block the read
  }
}

function admin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

const ListSchema = z.object({
  contacted: z.enum(["all", "yes", "no"]).optional(),
  limit: z.number().int().min(1).max(1000).optional(),
});

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ListSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    let q = sb
      .from("career_engine_leads")
      .select(
        "id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at",
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 500);
    if (data.contacted === "yes") q = q.not("contacted_at", "is", null);
    if (data.contacted === "no") q = q.is("contacted_at", null);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { leads: rows ?? [] };
  });

const MarkSchema = z.object({
  id: z.string().uuid(),
  contacted: z.boolean(),
  actorId: z.string().uuid().nullable().optional(),
});

const LeadDetailSchema = z.object({ id: z.string().uuid() });

export const getLeadDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => LeadDetailSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const { data: lead, error } = await sb
      .from("career_engine_leads")
      .select(
        "id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at",
      )
      .eq("id", data.id)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!lead) throw new Error("lead not found");

    let session: {
      stream: string | null;
      device: string | null;
      utm_source: string | null;
      user_agent: string | null;
      started_at: string | null;
      completed_at: string | null;
    } | null = null;
    let trace: Array<{
      at: string;
      source: string;
      event: string;
      question_id: string | null;
      answer: string | null;
      props: { [k: string]: {} } | null;
    }> = [];
    if (lead.session_id) {
      const [{ data: s }, { data: t }] = await Promise.all([
        sb
          .from("career_engine_sessions")
          .select("stream, device, utm_source, user_agent, started_at, completed_at")
          .eq("id", lead.session_id)
          .maybeSingle(),
        sb.rpc("ce_session_trace", { p_session_id: lead.session_id }),
      ]);
      session = (s as typeof session) ?? null;
      trace = (t as typeof trace) ?? [];
    }
    return { lead, session, trace };
  });

/** /admin/results detail drawer — gated by results-view, PII masked unless permitted, audited. */
export const getResultDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => LeadDetailSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireResultsView(context.userId);
    const roles = await loadUserRoles(context.userId);
    const showPII = canSeePII(roles);
    const sb = admin();
    const { data: lead, error } = await sb
      .from("career_engine_leads")
      .select(
        "id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at",
      )
      .eq("id", data.id)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!lead) throw new Error("lead not found");

    let session: {
      stream: string | null;
      device: string | null;
      utm_source: string | null;
      user_agent: string | null;
      started_at: string | null;
      completed_at: string | null;
    } | null = null;
    let trace: Array<{
      at: string;
      source: string;
      event: string;
      question_id: string | null;
      answer: string | null;
      props: { [k: string]: {} } | null;
    }> = [];
    if (lead.session_id) {
      const [{ data: s }, { data: t }] = await Promise.all([
        sb
          .from("career_engine_sessions")
          .select("stream, device, utm_source, user_agent, started_at, completed_at")
          .eq("id", lead.session_id)
          .maybeSingle(),
        sb.rpc("ce_session_trace", { p_session_id: lead.session_id }),
      ]);
      session = (s as typeof session) ?? null;
      trace = (t as typeof trace) ?? [];
    }

    const maskedEmail = showPII ? lead.email : maskEmail(lead.email);
    const maskedPhone = showPII ? lead.phone : maskPhone(lead.phone);

    await logAction(
      context.supabase as unknown as UserScopedSb,
      "results_detail",
      "career_engine_leads",
      lead.id,
      {
        lead_email_masked: maskEmail(lead.email),
        archetype: lead.archetype,
        masked_pii: !showPII,
      },
    );

    return {
      lead: { ...lead, email: maskedEmail, phone: maskedPhone },
      session,
      trace,
      capabilities: { showPII, roles },
    };
  });

const LookupSchema = z.object({ email: z.string().email() });

/** Test helper — fetch the most recent lead for an email. Staff-only. */
export const getLatestLeadByEmail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => LookupSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const { data: rows, error } = await sb
      .from("career_engine_leads")
      .select("id, created_at, name, email, phone, archetype, fit_score, session_id")
      .eq("email", data.email.toLowerCase())
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw new Error(error.message);
    return { lead: rows?.[0] ?? null };
  });

// ─── Results browser ─────────────────────────────────────────────────────────
const ResultsListSchema = z.object({
  archetype: z.string().max(64).optional(),
  pathSlug: z.string().max(64).optional(),
  cohort: z.string().max(32).optional(),
  utm: z.string().max(64).optional(),
  minFit: z.number().int().min(0).max(100).optional(),
  maxFit: z.number().int().min(0).max(100).optional(),
  sinceDays: z.number().int().min(1).max(365).optional(),
  hasResult: z.enum(["all", "yes", "no"]).optional(),
  limit: z.number().int().min(1).max(2000).optional(),
});

export const listResults = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => ResultsListSchema.parse(data ?? {}))
  .handler(async ({ data, context }) => {
    await requireResultsView(context.userId);
    const roles = await loadUserRoles(context.userId);
    const showPII = canSeePII(roles);
    const exportAllowed = canExport(roles);
    const sb = admin();
    let q = sb
      .from("career_engine_leads")
      .select(
        "id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at",
      )
      .is("deleted_at", null)
      .order("fit_score", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 500);
    if (data.archetype) q = q.eq("archetype", data.archetype);
    if (data.cohort) q = q.eq("cohort_id", data.cohort);
    if (typeof data.minFit === "number") q = q.gte("fit_score", data.minFit);
    if (typeof data.maxFit === "number") q = q.lte("fit_score", data.maxFit);
    if (data.hasResult === "yes") q = q.not("archetype", "is", null);
    if (data.hasResult === "no") q = q.is("archetype", null);
    if (data.sinceDays) {
      const since = new Date(Date.now() - data.sinceDays * 86400_000).toISOString();
      q = q.gte("created_at", since);
    }
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    let leads = rows ?? [];

    // Optional client-shaped filters (top path slug, utm) — done after fetch
    if (data.pathSlug) {
      const slug = data.pathSlug.toLowerCase();
      leads = leads.filter((r) => {
        const arr = Array.isArray(r.top_paths) ? (r.top_paths as Array<{ slug?: string }>) : [];
        return arr.some((p) => String(p?.slug ?? "").toLowerCase() === slug);
      });
    }

    // Payment status — join enrolment_intents by email
    const emails = Array.from(new Set(leads.map((r) => r.email).filter(Boolean)));
    const paidByEmail = new Map<
      string,
      { tier: string | null; paid_at: string | null; status: string | null }
    >();
    if (emails.length) {
      const { data: intents } = await sb
        .from("enrolment_intents")
        .select("email, tier, status, paid_at, created_at")
        .in("email", emails)
        .order("created_at", { ascending: false });
      for (const i of intents ?? []) {
        const key = (i.email ?? "").toLowerCase();
        if (!key) continue;
        const existing = paidByEmail.get(key);
        if (!existing || (i.status === "paid" && existing.status !== "paid")) {
          paidByEmail.set(key, {
            tier: i.tier ?? null,
            paid_at: i.paid_at ?? null,
            status: i.status ?? null,
          });
        }
      }
    }

    const enriched = leads.map((r) => ({
      ...r,
      email: showPII ? r.email : maskEmail(r.email),
      phone: showPII ? r.phone : maskPhone(r.phone),
      payment: paidByEmail.get((r.email ?? "").toLowerCase()) ?? null,
    }));

    // Distinct facets for filter dropdowns
    const archetypes = Array.from(
      new Set(enriched.map((r) => r.archetype).filter(Boolean) as string[]),
    ).sort();
    const cohorts = Array.from(
      new Set(enriched.map((r) => r.cohort_id).filter(Boolean) as string[]),
    ).sort();
    const pathSlugs = Array.from(
      new Set(
        enriched.flatMap((r) => {
          const arr = Array.isArray(r.top_paths)
            ? (r.top_paths as Array<{ slug?: string; title?: string }>)
            : [];
          return arr.map((p) => p?.slug ?? "").filter(Boolean);
        }),
      ),
    ).sort();

    // Audit the view (debounced server-side per filter_hash + actor)
    const filterHash = JSON.stringify({
      a: data.archetype ?? "",
      p: data.pathSlug ?? "",
      c: data.cohort ?? "",
      mf: data.minFit ?? 0,
      xf: data.maxFit ?? 100,
      hr: data.hasResult ?? "all",
      d: data.sinceDays ?? 0,
    });
    await logAction(
      context.supabase as unknown as UserScopedSb,
      "results_view",
      "career_engine_leads",
      "",
      {
        filter_hash: filterHash,
        filters: {
          archetype: data.archetype,
          pathSlug: data.pathSlug,
          cohort: data.cohort,
          minFit: data.minFit,
          hasResult: data.hasResult,
          sinceDays: data.sinceDays,
        },
        row_count: enriched.length,
        masked_pii: !showPII,
      },
    );

    return {
      results: enriched,
      facets: { archetypes, cohorts, pathSlugs },
      capabilities: { showPII, canExport: exportAllowed, roles },
    };
  });

export const markLeadContacted = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => MarkSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const patch = data.contacted
      ? { contacted_at: new Date().toISOString(), contacted_by: data.actorId ?? null }
      : { contacted_at: null, contacted_by: null };
    const { error } = await sb.from("career_engine_leads").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    await recordServerEvent({
      event_name: "admin_lead_contacted",
      lead_id: data.id,
      props: { contacted: data.contacted },
    });
    return { ok: true };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => MarkSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const { error } = await sb.from("career_engine_leads").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    await logAction(
      context.supabase as unknown as UserScopedSb,
      "delete_lead",
      "career_engine_leads",
      data.id,
      { force_hard_delete: true },
    );
    return { ok: true };
  });

// ─── Rate Limited Lead Submission ─────────────────────────────────────────

const SubmitLeadSchema = z.object({
  sessionId: z.string().uuid(),
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  whatsappOptin: z.boolean(),
  resultPayload: z.record(z.string(), z.unknown()),
  archetypeId: z.string(),
  fitScore: z.number(),
  topPaths: z.any(),
});

export const submitLeadEndpoint = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SubmitLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    
    // Strict rate limit: 5 leads per minute per IP
    const rl = await checkRateLimit(ip, "submit_lead", 5, 60);
    if (!rl.success) {
      throw new Error("Too many requests. Please wait a minute before trying again.");
    }

    const { data: result, error } = await supabaseAdmin.rpc("ce_submit_lead", {
      p_session_id: data.sessionId,
      p_session_token: "", // Provided for backward compatibility or future use
      p_name: data.name,
      p_phone: data.phone,
      p_email: data.email,
      p_whatsapp_optin: data.whatsappOptin,
      p_archetype: data.archetypeId,
      p_top_paths: data.topPaths as any,
      p_fit_score: data.fitScore,
      p_result_payload: data.resultPayload as any,
    });

    if (error) {
      console.error("[leads] submitLeadEndpoint failed", error);
      throw new Error(error.message);
    }

    return { data: result };
  });

export const adminCounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const [appsTotal, appsToday, appsReviewing, leadsTotal, leadsUncontacted, invitesOpen] =
      await Promise.all([
        sb.from("applications").select("id", { count: "exact", head: true }).is("deleted_at", null),
        sb
          .from("applications")
          .select("id", { count: "exact", head: true })
          .is("deleted_at", null)
          .gte("created_at", since),
        sb
          .from("applications")
          .select("id", { count: "exact", head: true })
          .is("deleted_at", null)
          .eq("status", "reviewing"),
        sb
          .from("career_engine_leads")
          .select("id", { count: "exact", head: true })
          .is("deleted_at", null),
        sb
          .from("career_engine_leads")
          .select("id", { count: "exact", head: true })
          .is("deleted_at", null)
          .is("contacted_at", null),
        sb
          .from("admin_invites")
          .select("id", { count: "exact", head: true })
          .is("deleted_at", null)
          .is("used_at", null),
      ]);
    return {
      applicationsTotal: appsTotal.count ?? 0,
      applicationsToday: appsToday.count ?? 0,
      applicationsReviewing: appsReviewing.count ?? 0,
      leadsTotal: leadsTotal.count ?? 0,
      leadsUncontacted: leadsUncontacted.count ?? 0,
      invitesOpen: invitesOpen.count ?? 0,
    };
  });

/**
 * Admin overview — richer dataset for the redesigned dashboard.
 * Returns 14-day timeseries (apps + leads + paid intents), funnel snapshot,
 * a "today" activity stream, and an "attention" queue (stalled rows).
 */
export const adminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const sb = admin();
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const since14 = new Date(now - 14 * day).toISOString();
    const since7 = new Date(now - 7 * day).toISOString();
    const since14prev = new Date(now - 28 * day).toISOString();
    const since48 = new Date(now - 2 * day).toISOString();

    const [
      apps14,
      appsPrev14,
      leads14,
      leadsPrev14,
      paid14,
      paidPrev14,
      stalledApps,
      expiringInvites,
      recentApps,
      recentLeads,
      recentPaid,
      appsByStatus,
    ] = await Promise.all([
      sb
        .from("applications")
        .select("id, created_at, status, email, name, program_slug")
        .is("deleted_at", null)
        .gte("created_at", since14)
        .order("created_at", { ascending: false }),
      sb
        .from("applications")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", since14prev)
        .lt("created_at", since14),
      sb
        .from("career_engine_leads")
        .select("id, created_at, name, email")
        .is("deleted_at", null)
        .gte("created_at", since14)
        .order("created_at", { ascending: false }),
      sb
        .from("career_engine_leads")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", since14prev)
        .lt("created_at", since14),
      sb
        .from("enrolment_intents")
        .select("id, created_at, name, email, tier, base_price_inr, status")
        .is("deleted_at", null)
        .gte("created_at", since14)
        .eq("status", "paid")
        .order("created_at", { ascending: false }),
      sb
        .from("enrolment_intents")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null)
        .gte("created_at", since14prev)
        .lt("created_at", since14)
        .eq("status", "paid"),
      sb
        .from("applications")
        .select("id, created_at, name, email, program_slug, status")
        .is("deleted_at", null)
        .eq("status", "reviewing")
        .lt("created_at", since48)
        .order("created_at", { ascending: true })
        .limit(6),
      sb
        .from("admin_invites")
        .select("id, email, role, created_at")
        .is("deleted_at", null)
        .is("used_at", null)
        .order("created_at", { ascending: true })
        .limit(6),
      sb
        .from("applications")
        .select("id, created_at, name, email, program_slug, status")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(8),
      sb
        .from("career_engine_leads")
        .select("id, created_at, name, email, archetype")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(8),
      sb
        .from("enrolment_intents")
        .select("id, created_at, name, email, tier, base_price_inr")
        .is("deleted_at", null)
        .eq("status", "paid")
        .order("created_at", { ascending: false })
        .limit(8),
      sb.from("applications").select("status").is("deleted_at", null).gte("created_at", since14),
    ]);

    // Build 14-day timeseries
    const buckets: { date: string; apps: number; leads: number; paid: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * day);
      const key = d.toISOString().slice(0, 10);
      buckets.push({ date: key, apps: 0, leads: 0, paid: 0 });
    }
    const idx = new Map(buckets.map((b, i) => [b.date, i]));
    for (const r of apps14.data ?? []) {
      const k = String(r.created_at).slice(0, 10);
      const i = idx.get(k);
      if (i != null) buckets[i].apps++;
    }
    for (const r of leads14.data ?? []) {
      const k = String(r.created_at).slice(0, 10);
      const i = idx.get(k);
      if (i != null) buckets[i].leads++;
    }
    for (const r of paid14.data ?? []) {
      const k = String(r.created_at).slice(0, 10);
      const i = idx.get(k);
      if (i != null) buckets[i].paid++;
    }

    const sumLast = (k: "apps" | "leads" | "paid", n: number) =>
      buckets.slice(-n).reduce((s, b) => s + b[k], 0);

    const apps7 = sumLast("apps", 7);
    const leads7 = sumLast("leads", 7);
    const paid7 = sumLast("paid", 7);
    const appsPrev7 = sumLast("apps", 14) - apps7;
    const leadsPrev7 = sumLast("leads", 14) - leads7;
    const paidPrev7 = sumLast("paid", 14) - paid7;
    const pct = (cur: number, prev: number) =>
      prev === 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 100);

    const revenue7 = (paid14.data ?? [])
      .filter((r: any) => new Date(r.created_at).getTime() >= now - 7 * day)
      .reduce((s: number, r: any) => s + (r.base_price_inr ?? 0), 0);
    const revenuePrev7 = (paid14.data ?? [])
      .filter((r: any) => {
        const t = new Date(r.created_at).getTime();
        return t < now - 7 * day && t >= now - 14 * day;
      })
      .reduce((s: number, r: any) => s + (r.base_price_inr ?? 0), 0);

    // Funnel snapshot (14d)
    const statusCounts: Record<string, number> = {};
    for (const r of appsByStatus.data ?? [])
      statusCounts[String((r as any).status)] = (statusCounts[String((r as any).status)] ?? 0) + 1;
    const funnel = [
      { stage: "Leads", value: leads14.data?.length ?? 0 },
      { stage: "Applied", value: apps14.data?.length ?? 0 },
      { stage: "Reviewing", value: statusCounts["reviewing"] ?? 0 },
      { stage: "Accepted", value: statusCounts["accepted"] ?? 0 },
      { stage: "Paid", value: paid14.data?.length ?? 0 },
    ];

    type Activity = {
      kind: "application" | "lead" | "paid";
      id: string;
      created_at: string;
      title: string;
      sub?: string;
    };
    const stream: Activity[] = [
      ...(recentApps.data ?? []).map((r: any) => ({
        kind: "application" as const,
        id: r.id,
        created_at: r.created_at,
        title: r.name || r.email,
        sub: r.program_slug,
      })),
      ...(recentLeads.data ?? []).map((r: any) => ({
        kind: "lead" as const,
        id: r.id,
        created_at: r.created_at,
        title: r.name || r.email,
        sub: r.archetype ?? "career engine",
      })),
      ...(recentPaid.data ?? []).map((r: any) => ({
        kind: "paid" as const,
        id: r.id,
        created_at: r.created_at,
        title: r.name || r.email,
        sub: `${r.tier} · ₹${(r.base_price_inr ?? 0).toLocaleString("en-IN")}`,
      })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 12);

    return {
      kpis: {
        applications: { value: apps7, delta: pct(apps7, appsPrev7) },
        leads: { value: leads7, delta: pct(leads7, leadsPrev7) },
        paid: { value: paid7, delta: pct(paid7, paidPrev7) },
        revenue: { value: revenue7, delta: pct(revenue7, revenuePrev7) },
        reviewing: { value: statusCounts["reviewing"] ?? 0, delta: 0 },
        invitesOpen: { value: expiringInvites.data?.length ?? 0, delta: 0 },
      },
      timeseries: buckets,
      funnel,
      stream,
      attention: {
        stalledApplications: stalledApps.data ?? [],
        expiringInvites: expiringInvites.data ?? [],
      },
    };
  });
