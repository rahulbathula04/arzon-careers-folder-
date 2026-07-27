import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as recordServerEvent } from "./analytics.server-CrqWaWZN.mjs";
import { c as checkRateLimit } from "./ratelimit.server-Bh_u6tnu.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { a as requireStaff, c as requireResultsView, l as loadUserRoles } from "./auth-guards.server-Cz9eye0S.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { c as createServerFn, a as getRequestIP$1 } from "./server-BKkhNWog.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as objectType, x as numberType, v as enumType, q as stringType, w as booleanType, B as anyType, z as recordType, A as unknownType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "crypto";
import "./redis.server-jD5sLB4g.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
function maskEmail(e) {
  const s = (e ?? "").trim();
  if (!s.includes("@")) return s ? "•••" : "";
  const [u, d] = s.split("@");
  if (u.length <= 1) return `•••@${d}`;
  return `${u[0]}${"•".repeat(Math.max(3, u.length - 1))}@${d}`;
}
function maskPhone(p) {
  const digits = (p ?? "").replace(/\D/g, "");
  if (digits.length <= 4) return digits ? "••••" : "";
  return `${digits.slice(0, 2)}${"•".repeat(Math.max(4, digits.length - 4))}${digits.slice(-2)}`;
}
function canSeePII(roles) {
  return roles.some((r) => r === "admin" || r === "analyst" || r === "exporter");
}
function canExport(roles) {
  return roles.some((r) => r === "admin" || r === "exporter");
}
async function logAction(sb, action, resource, recordId, diff) {
  try {
    await sb.rpc("log_admin_action", {
      _action: action,
      _resource: resource,
      _record_id: recordId,
      _diff: diff
    });
  } catch (_e) {
  }
}
function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}
const ListSchema = objectType({
  contacted: enumType(["all", "yes", "no"]).optional(),
  limit: numberType().int().min(1).max(1e3).optional()
});
const listLeads_createServerFn_handler = createServerRpc({
  id: "77acd1c20769f0aaa93fdea78adabaa9f8b27285e13363740e4c85703e8554bc",
  name: "listLeads",
  filename: "src/lib/leads.functions.ts"
}, (opts) => listLeads.__executeServer(opts));
const listLeads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(listLeads_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  let q = sb.from("career_engine_leads").select("id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at").is("deleted_at", null).order("created_at", {
    ascending: false
  }).limit(data.limit ?? 500);
  if (data.contacted === "yes") q = q.not("contacted_at", "is", null);
  if (data.contacted === "no") q = q.is("contacted_at", null);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return {
    leads: rows ?? []
  };
});
const MarkSchema = objectType({
  id: stringType().uuid(),
  contacted: booleanType(),
  actorId: stringType().uuid().nullable().optional()
});
const LeadDetailSchema = objectType({
  id: stringType().uuid()
});
const getLeadDetail_createServerFn_handler = createServerRpc({
  id: "1d72a981ddda94c3e788533eaae7d5cc47770ba4291f272c09ec798630f777a7",
  name: "getLeadDetail",
  filename: "src/lib/leads.functions.ts"
}, (opts) => getLeadDetail.__executeServer(opts));
const getLeadDetail = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LeadDetailSchema.parse(data)).handler(getLeadDetail_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const {
    data: lead,
    error
  } = await sb.from("career_engine_leads").select("id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at").eq("id", data.id).is("deleted_at", null).maybeSingle();
  if (error) throw new Error(error.message);
  if (!lead) throw new Error("lead not found");
  let session = null;
  let trace = [];
  if (lead.session_id) {
    const [{
      data: s
    }, {
      data: t
    }] = await Promise.all([sb.from("career_engine_sessions").select("stream, device, utm_source, user_agent, started_at, completed_at").eq("id", lead.session_id).maybeSingle(), sb.rpc("ce_session_trace", {
      p_session_id: lead.session_id
    })]);
    session = s ?? null;
    trace = t ?? [];
  }
  return {
    lead,
    session,
    trace
  };
});
const getResultDetail_createServerFn_handler = createServerRpc({
  id: "db2365b3919f1b7b2667b010cf0d43aabf9c9502573319ac0c857bf82916c641",
  name: "getResultDetail",
  filename: "src/lib/leads.functions.ts"
}, (opts) => getResultDetail.__executeServer(opts));
const getResultDetail = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LeadDetailSchema.parse(data)).handler(getResultDetail_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireResultsView(context.userId);
  const roles = await loadUserRoles(context.userId);
  const showPII = canSeePII(roles);
  const sb = admin();
  const {
    data: lead,
    error
  } = await sb.from("career_engine_leads").select("id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at").eq("id", data.id).is("deleted_at", null).maybeSingle();
  if (error) throw new Error(error.message);
  if (!lead) throw new Error("lead not found");
  let session = null;
  let trace = [];
  if (lead.session_id) {
    const [{
      data: s
    }, {
      data: t
    }] = await Promise.all([sb.from("career_engine_sessions").select("stream, device, utm_source, user_agent, started_at, completed_at").eq("id", lead.session_id).maybeSingle(), sb.rpc("ce_session_trace", {
      p_session_id: lead.session_id
    })]);
    session = s ?? null;
    trace = t ?? [];
  }
  const maskedEmail = showPII ? lead.email : maskEmail(lead.email);
  const maskedPhone = showPII ? lead.phone : maskPhone(lead.phone);
  await logAction(context.supabase, "results_detail", "career_engine_leads", lead.id, {
    lead_email_masked: maskEmail(lead.email),
    archetype: lead.archetype,
    masked_pii: !showPII
  });
  return {
    lead: {
      ...lead,
      email: maskedEmail,
      phone: maskedPhone
    },
    session,
    trace,
    capabilities: {
      showPII,
      roles
    }
  };
});
const LookupSchema = objectType({
  email: stringType().email()
});
const getLatestLeadByEmail_createServerFn_handler = createServerRpc({
  id: "5ad740de131cf43b837d0464e5b58252c7fef4ab1a5ec36eac8a5243e469a977",
  name: "getLatestLeadByEmail",
  filename: "src/lib/leads.functions.ts"
}, (opts) => getLatestLeadByEmail.__executeServer(opts));
const getLatestLeadByEmail = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LookupSchema.parse(data)).handler(getLatestLeadByEmail_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const {
    data: rows,
    error
  } = await sb.from("career_engine_leads").select("id, created_at, name, email, phone, archetype, fit_score, session_id").eq("email", data.email.toLowerCase()).is("deleted_at", null).order("created_at", {
    ascending: false
  }).limit(1);
  if (error) throw new Error(error.message);
  return {
    lead: rows?.[0] ?? null
  };
});
const ResultsListSchema = objectType({
  archetype: stringType().max(64).optional(),
  pathSlug: stringType().max(64).optional(),
  cohort: stringType().max(32).optional(),
  utm: stringType().max(64).optional(),
  minFit: numberType().int().min(0).max(100).optional(),
  maxFit: numberType().int().min(0).max(100).optional(),
  sinceDays: numberType().int().min(1).max(365).optional(),
  hasResult: enumType(["all", "yes", "no"]).optional(),
  limit: numberType().int().min(1).max(2e3).optional()
});
const listResults_createServerFn_handler = createServerRpc({
  id: "feefac6ed2632b1257c5d929f3cb8c3e62bd6b70387b9954e3b017f9c346bb29",
  name: "listResults",
  filename: "src/lib/leads.functions.ts"
}, (opts) => listResults.__executeServer(opts));
const listResults = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ResultsListSchema.parse(data ?? {})).handler(listResults_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireResultsView(context.userId);
  const roles = await loadUserRoles(context.userId);
  const showPII = canSeePII(roles);
  const exportAllowed = canExport(roles);
  const sb = admin();
  let q = sb.from("career_engine_leads").select("id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, result_payload, cohort_id, session_id, contacted_at").is("deleted_at", null).order("fit_score", {
    ascending: false,
    nullsFirst: false
  }).order("created_at", {
    ascending: false
  }).limit(data.limit ?? 500);
  if (data.archetype) q = q.eq("archetype", data.archetype);
  if (data.cohort) q = q.eq("cohort_id", data.cohort);
  if (typeof data.minFit === "number") q = q.gte("fit_score", data.minFit);
  if (typeof data.maxFit === "number") q = q.lte("fit_score", data.maxFit);
  if (data.hasResult === "yes") q = q.not("archetype", "is", null);
  if (data.hasResult === "no") q = q.is("archetype", null);
  if (data.sinceDays) {
    const since = new Date(Date.now() - data.sinceDays * 864e5).toISOString();
    q = q.gte("created_at", since);
  }
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  let leads = rows ?? [];
  if (data.pathSlug) {
    const slug = data.pathSlug.toLowerCase();
    leads = leads.filter((r) => {
      const arr = Array.isArray(r.top_paths) ? r.top_paths : [];
      return arr.some((p) => String(p?.slug ?? "").toLowerCase() === slug);
    });
  }
  const emails = Array.from(new Set(leads.map((r) => r.email).filter(Boolean)));
  const paidByEmail = /* @__PURE__ */ new Map();
  if (emails.length) {
    const {
      data: intents
    } = await sb.from("enrolment_intents").select("email, tier, status, paid_at, created_at").in("email", emails).order("created_at", {
      ascending: false
    });
    for (const i of intents ?? []) {
      const key = (i.email ?? "").toLowerCase();
      if (!key) continue;
      const existing = paidByEmail.get(key);
      if (!existing || i.status === "paid" && existing.status !== "paid") {
        paidByEmail.set(key, {
          tier: i.tier ?? null,
          paid_at: i.paid_at ?? null,
          status: i.status ?? null
        });
      }
    }
  }
  const enriched = leads.map((r) => ({
    ...r,
    email: showPII ? r.email : maskEmail(r.email),
    phone: showPII ? r.phone : maskPhone(r.phone),
    payment: paidByEmail.get((r.email ?? "").toLowerCase()) ?? null
  }));
  const archetypes = Array.from(new Set(enriched.map((r) => r.archetype).filter(Boolean))).sort();
  const cohorts = Array.from(new Set(enriched.map((r) => r.cohort_id).filter(Boolean))).sort();
  const pathSlugs = Array.from(new Set(enriched.flatMap((r) => {
    const arr = Array.isArray(r.top_paths) ? r.top_paths : [];
    return arr.map((p) => p?.slug ?? "").filter(Boolean);
  }))).sort();
  const filterHash = JSON.stringify({
    a: data.archetype ?? "",
    p: data.pathSlug ?? "",
    c: data.cohort ?? "",
    mf: data.minFit ?? 0,
    xf: data.maxFit ?? 100,
    hr: data.hasResult ?? "all",
    d: data.sinceDays ?? 0
  });
  await logAction(context.supabase, "results_view", "career_engine_leads", "", {
    filter_hash: filterHash,
    filters: {
      archetype: data.archetype,
      pathSlug: data.pathSlug,
      cohort: data.cohort,
      minFit: data.minFit,
      hasResult: data.hasResult,
      sinceDays: data.sinceDays
    },
    row_count: enriched.length,
    masked_pii: !showPII
  });
  return {
    results: enriched,
    facets: {
      archetypes,
      cohorts,
      pathSlugs
    },
    capabilities: {
      showPII,
      canExport: exportAllowed,
      roles
    }
  };
});
const markLeadContacted_createServerFn_handler = createServerRpc({
  id: "cd1707f1325761c7a6e97b12339b2bee1b055947db473310570bee0dba05c1f5",
  name: "markLeadContacted",
  filename: "src/lib/leads.functions.ts"
}, (opts) => markLeadContacted.__executeServer(opts));
const markLeadContacted = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MarkSchema.parse(data)).handler(markLeadContacted_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const patch = data.contacted ? {
    contacted_at: (/* @__PURE__ */ new Date()).toISOString(),
    contacted_by: data.actorId ?? null
  } : {
    contacted_at: null,
    contacted_by: null
  };
  const {
    error
  } = await sb.from("career_engine_leads").update(patch).eq("id", data.id);
  if (error) throw new Error(error.message);
  await recordServerEvent({
    event_name: "admin_lead_contacted",
    lead_id: data.id,
    props: {
      contacted: data.contacted
    }
  });
  return {
    ok: true
  };
});
const deleteLead_createServerFn_handler = createServerRpc({
  id: "a2d83a89925a8e6fc39241e2456466dcf5d6d586aa004c0da5480d8504e9bcbb",
  name: "deleteLead",
  filename: "src/lib/leads.functions.ts"
}, (opts) => deleteLead.__executeServer(opts));
const deleteLead = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MarkSchema.parse(data)).handler(deleteLead_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const {
    error
  } = await sb.from("career_engine_leads").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  await logAction(context.supabase, "delete_lead", "career_engine_leads", data.id, {
    force_hard_delete: true
  });
  return {
    ok: true
  };
});
const SubmitLeadSchema = objectType({
  sessionId: stringType().uuid(),
  name: stringType().min(1),
  phone: stringType().min(6),
  email: stringType().email(),
  whatsappOptin: booleanType(),
  resultPayload: recordType(stringType(), unknownType()),
  archetypeId: stringType(),
  fitScore: numberType(),
  topPaths: anyType()
});
const submitLeadEndpoint_createServerFn_handler = createServerRpc({
  id: "c97af74688dabadc77afe17538c53df9173e6ee71221c2abd6c7a74c6bddef09",
  name: "submitLeadEndpoint",
  filename: "src/lib/leads.functions.ts"
}, (opts) => submitLeadEndpoint.__executeServer(opts));
const submitLeadEndpoint = createServerFn({
  method: "POST"
}).inputValidator((data) => SubmitLeadSchema.parse(data)).handler(submitLeadEndpoint_createServerFn_handler, async ({
  data
}) => {
  const ip = getRequestIP$1({
    xForwardedFor: true
  }) || "unknown";
  const rl = await checkRateLimit(ip, "submit_lead", 5, 60);
  if (!rl.success) {
    throw new Error("Too many requests. Please wait a minute before trying again.");
  }
  const {
    data: result,
    error
  } = await supabaseAdmin.rpc("ce_submit_lead", {
    p_session_id: data.sessionId,
    p_session_token: "",
    // Provided for backward compatibility or future use
    p_name: data.name,
    p_phone: data.phone,
    p_email: data.email,
    p_whatsapp_optin: data.whatsappOptin,
    p_archetype: data.archetypeId,
    p_top_paths: data.topPaths,
    p_fit_score: data.fitScore,
    p_result_payload: data.resultPayload
  });
  if (error) {
    console.error("[leads] submitLeadEndpoint failed", error);
    throw new Error(error.message);
  }
  return {
    data: result
  };
});
const adminCounts_createServerFn_handler = createServerRpc({
  id: "38714a784ef18026be665fb1d4b5b789c83232ca7f938cc0524b512160be5ff1",
  name: "adminCounts",
  filename: "src/lib/leads.functions.ts"
}, (opts) => adminCounts.__executeServer(opts));
const adminCounts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminCounts_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString();
  const [appsTotal, appsToday, appsReviewing, leadsTotal, leadsUncontacted, invitesOpen] = await Promise.all([sb.from("applications").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null), sb.from("applications").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).gte("created_at", since), sb.from("applications").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).eq("status", "reviewing"), sb.from("career_engine_leads").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null), sb.from("career_engine_leads").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).is("contacted_at", null), sb.from("admin_invites").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).is("used_at", null)]);
  return {
    applicationsTotal: appsTotal.count ?? 0,
    applicationsToday: appsToday.count ?? 0,
    applicationsReviewing: appsReviewing.count ?? 0,
    leadsTotal: leadsTotal.count ?? 0,
    leadsUncontacted: leadsUncontacted.count ?? 0,
    invitesOpen: invitesOpen.count ?? 0
  };
});
const adminOverview_createServerFn_handler = createServerRpc({
  id: "a79cede85faaf45a8e23da0628f7235e83a0348365cc05732606cd932e6dfccd",
  name: "adminOverview",
  filename: "src/lib/leads.functions.ts"
}, (opts) => adminOverview.__executeServer(opts));
const adminOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminOverview_createServerFn_handler, async ({
  context
}) => {
  await requireStaff(context.userId);
  const sb = admin();
  const now = Date.now();
  const day = 24 * 60 * 60 * 1e3;
  const since14 = new Date(now - 14 * day).toISOString();
  new Date(now - 7 * day).toISOString();
  const since14prev = new Date(now - 28 * day).toISOString();
  const since48 = new Date(now - 2 * day).toISOString();
  const [apps14, appsPrev14, leads14, leadsPrev14, paid14, paidPrev14, stalledApps, expiringInvites, recentApps, recentLeads, recentPaid, appsByStatus] = await Promise.all([sb.from("applications").select("id, created_at, status, email, name, program_slug").is("deleted_at", null).gte("created_at", since14).order("created_at", {
    ascending: false
  }), sb.from("applications").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).gte("created_at", since14prev).lt("created_at", since14), sb.from("career_engine_leads").select("id, created_at, name, email").is("deleted_at", null).gte("created_at", since14).order("created_at", {
    ascending: false
  }), sb.from("career_engine_leads").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).gte("created_at", since14prev).lt("created_at", since14), sb.from("enrolment_intents").select("id, created_at, name, email, tier, base_price_inr, status").is("deleted_at", null).gte("created_at", since14).eq("status", "paid").order("created_at", {
    ascending: false
  }), sb.from("enrolment_intents").select("id", {
    count: "exact",
    head: true
  }).is("deleted_at", null).gte("created_at", since14prev).lt("created_at", since14).eq("status", "paid"), sb.from("applications").select("id, created_at, name, email, program_slug, status").is("deleted_at", null).eq("status", "reviewing").lt("created_at", since48).order("created_at", {
    ascending: true
  }).limit(6), sb.from("admin_invites").select("id, email, role, created_at").is("deleted_at", null).is("used_at", null).order("created_at", {
    ascending: true
  }).limit(6), sb.from("applications").select("id, created_at, name, email, program_slug, status").is("deleted_at", null).order("created_at", {
    ascending: false
  }).limit(8), sb.from("career_engine_leads").select("id, created_at, name, email, archetype").is("deleted_at", null).order("created_at", {
    ascending: false
  }).limit(8), sb.from("enrolment_intents").select("id, created_at, name, email, tier, base_price_inr").is("deleted_at", null).eq("status", "paid").order("created_at", {
    ascending: false
  }).limit(8), sb.from("applications").select("status").is("deleted_at", null).gte("created_at", since14)]);
  const buckets = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * day);
    const key = d.toISOString().slice(0, 10);
    buckets.push({
      date: key,
      apps: 0,
      leads: 0,
      paid: 0
    });
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
  const sumLast = (k, n) => buckets.slice(-n).reduce((s, b) => s + b[k], 0);
  const apps7 = sumLast("apps", 7);
  const leads7 = sumLast("leads", 7);
  const paid7 = sumLast("paid", 7);
  const appsPrev7 = sumLast("apps", 14) - apps7;
  const leadsPrev7 = sumLast("leads", 14) - leads7;
  const paidPrev7 = sumLast("paid", 14) - paid7;
  const pct = (cur, prev) => prev === 0 ? cur > 0 ? 100 : 0 : Math.round((cur - prev) / prev * 100);
  const revenue7 = (paid14.data ?? []).filter((r) => new Date(r.created_at).getTime() >= now - 7 * day).reduce((s, r) => s + (r.base_price_inr ?? 0), 0);
  const revenuePrev7 = (paid14.data ?? []).filter((r) => {
    const t = new Date(r.created_at).getTime();
    return t < now - 7 * day && t >= now - 14 * day;
  }).reduce((s, r) => s + (r.base_price_inr ?? 0), 0);
  const statusCounts = {};
  for (const r of appsByStatus.data ?? []) statusCounts[String(r.status)] = (statusCounts[String(r.status)] ?? 0) + 1;
  const funnel = [{
    stage: "Leads",
    value: leads14.data?.length ?? 0
  }, {
    stage: "Applied",
    value: apps14.data?.length ?? 0
  }, {
    stage: "Reviewing",
    value: statusCounts["reviewing"] ?? 0
  }, {
    stage: "Accepted",
    value: statusCounts["accepted"] ?? 0
  }, {
    stage: "Paid",
    value: paid14.data?.length ?? 0
  }];
  const stream = [...(recentApps.data ?? []).map((r) => ({
    kind: "application",
    id: r.id,
    created_at: r.created_at,
    title: r.name || r.email,
    sub: r.program_slug
  })), ...(recentLeads.data ?? []).map((r) => ({
    kind: "lead",
    id: r.id,
    created_at: r.created_at,
    title: r.name || r.email,
    sub: r.archetype ?? "career engine"
  })), ...(recentPaid.data ?? []).map((r) => ({
    kind: "paid",
    id: r.id,
    created_at: r.created_at,
    title: r.name || r.email,
    sub: `${r.tier} · ₹${(r.base_price_inr ?? 0).toLocaleString("en-IN")}`
  }))].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 12);
  return {
    kpis: {
      applications: {
        value: apps7,
        delta: pct(apps7, appsPrev7)
      },
      leads: {
        value: leads7,
        delta: pct(leads7, leadsPrev7)
      },
      paid: {
        value: paid7,
        delta: pct(paid7, paidPrev7)
      },
      revenue: {
        value: revenue7,
        delta: pct(revenue7, revenuePrev7)
      },
      reviewing: {
        value: statusCounts["reviewing"] ?? 0,
        delta: 0
      },
      invitesOpen: {
        value: expiringInvites.data?.length ?? 0,
        delta: 0
      }
    },
    timeseries: buckets,
    funnel,
    stream,
    attention: {
      stalledApplications: stalledApps.data ?? [],
      expiringInvites: expiringInvites.data ?? []
    }
  };
});
export {
  adminCounts_createServerFn_handler,
  adminOverview_createServerFn_handler,
  deleteLead_createServerFn_handler,
  getLatestLeadByEmail_createServerFn_handler,
  getLeadDetail_createServerFn_handler,
  getResultDetail_createServerFn_handler,
  listLeads_createServerFn_handler,
  listResults_createServerFn_handler,
  markLeadContacted_createServerFn_handler,
  submitLeadEndpoint_createServerFn_handler
};
