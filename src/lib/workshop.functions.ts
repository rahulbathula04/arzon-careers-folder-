import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";
import { recordServerEvent, supabaseAdmin } from "@/server/analytics.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff } from "@/server/auth-guards.server";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { syncAndApproveAcriApplication } from "@/lib/acri-core.functions";

function admin() {
  return createSafeAdminClient();
}

const WorkshopLeadSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  phone: z.string().min(10).max(20).trim(),
  college: z.string().min(2, "College name is required").max(180).trim(),
  branch: z.string().min(2, "Branch / stream is required").max(100).trim(),
  degree: z.string().max(255),
  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .min(5, "Email address is required")
    .email("Enter a valid email address")
    .max(120),
  source: z.string().max(64).optional().default("workshop-landing-page"),
  utmSource: z.string().max(64).optional().nullable(),
  utmMedium: z.string().max(64).optional().nullable(),
  utmCampaign: z.string().max(64).optional().nullable(),
  utmContent: z.string().max(64).optional().nullable(),
  utmTerm: z.string().max(64).optional().nullable(),
  variant: z.string().max(16).optional().nullable(),
  graduationYear: z.string().max(32).optional().nullable(),
  currentStatus: z.string().max(64).optional().nullable(),
  interestTrack: z.string().max(64).optional().nullable(),
  appliedBefore: z.string().max(64).optional().nullable(),
});

export type WorkshopLeadInput = z.infer<typeof WorkshopLeadSchema>;

export const submitWorkshopLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => WorkshopLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";

    // Rate-limit: 10 submissions per minute per IP
    const rl = await checkRateLimit(ip, "workshop_lead", 10, 60, false);
    if (!rl.success) {
      throw new Error("Too many requests. Please wait a moment before trying again.");
    }

    const sb = admin();
    const cleanPhone = data.phone.replace(/\D/g, "");

    // 1. Idempotency Check: if already registered, update notes with latest college/academic details
    const { data: existingApp } = await (sb as any)
      .from("applications")
      .select("id")
      .eq("phone", cleanPhone)
      .eq("program_slug", "workshop-intelligence-session")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const digits10 = cleanPhone.slice(-10);
    const passId = `PV-${digits10.slice(-4)}8`;

    let id = existingApp?.id;

    if (!id) {
      // Upsert into applications table using the existing submit_application RPC
      const { data: newId, error } = await (sb as any).rpc("submit_application", {
        p_name: data.name,
        p_email: data.email,
        p_phone: cleanPhone,
        p_program_slug: "workshop-intelligence-session",
        p_program_name: "Pharmacovigilance Industry Connect",
        p_whatsapp_optin: true,
        p_lead_id: null,
        p_utm_source: data.utmSource ?? data.source ?? "pv-workshop",
        p_user_agent: null,
      });

      if (error) {
        console.error("[workshop] submitWorkshopLead failed", error);
        throw new Error(error.message);
      }
      id = newId;
    }

    // 2. Persist degree, college, branch, A/B variant, and all UTM attribution in structured notes
    if (id) {
      try {
        const attributionNotes = JSON.stringify({
          degree: data.degree,
          college: data.college,
          branch: data.branch,
          graduation_year: data.graduationYear ?? null,
          current_status: data.currentStatus ?? null,
          interest_track: data.interestTrack ?? null,
          applied_before: data.appliedBefore ?? null,
          variant: data.variant ?? "a",
          utm_source: data.utmSource ?? null,
          utm_medium: data.utmMedium ?? null,
          utm_campaign: data.utmCampaign ?? null,
          utm_content: data.utmContent ?? null,
          utm_term: data.utmTerm ?? null,
          pass_id: passId,
          registered_at: new Date().toISOString(),
        });

        await (sb as any)
          .from("applications")
          .update({
            notes: attributionNotes,
            program_name: "Pharmacovigilance Industry Connect",
          })
          .eq("id", id);
      } catch (updateErr) {
        console.warn("[workshop] failed to update notes:", updateErr);
      }
    }

    // 3. Fire server analytics event with ZERO PII (no name, phone, or email)
    if (id) {
      await recordServerEvent({
        event_name: "workshop_lead_submitted",
        application_id: id,
        program_slug: "workshop-intelligence-session",
        props: {
          degree: data.degree,
          college: data.college,
          branch: data.branch,
          variant: data.variant ?? "a",
          utm_source: data.utmSource ?? null,
          source: data.source ?? "workshop-landing-page",
        },
      }).catch(() => {
        /* non-blocking */
      });
    }

    return {
      applicationId: id as string,
      ok: true,
    };
  });

export interface RegisteredStudent {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  college: string;
  branch: string;
  grad_year: string;
  mentor_question: string;
  utm_source: string;
  pass_id: string;
  status: string;
  program_name: string;
  whatsapp_link: string;
}

export interface RegisteredStudentsResult {
  students: RegisteredStudent[];
  totalCount: number;
  todayCount: number;
  byDegree: Record<string, number>;
  byGradYear: Record<string, number>;
  byUtmSource: Record<string, number>;
  byCollege: Record<string, number>;
  byBranch: Record<string, number>;
}

export const getRegisteredStudents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RegisteredStudentsResult> => {
    await requireStaff(context.userId);
    const sb = admin();

    const { data: rows, error } = await sb
      .from("applications")
      .select("id, created_at, name, email, phone, notes, utm_source, status, program_slug, program_name")
      .is("deleted_at", null)
      .or("program_slug.eq.healthcare-career-workshop,program_slug.eq.workshop-intelligence-session,program_slug.eq.pv-industry-connect,program_name.ilike.%workshop%,program_name.ilike.%pharmacovigilance%")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("[workshop] getRegisteredStudents failed", error);
      throw new Error(error.message);
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const byDegree: Record<string, number> = {};
    const byGradYear: Record<string, number> = {};
    const byUtmSource: Record<string, number> = {};
    const byCollege: Record<string, number> = {};
    const byBranch: Record<string, number> = {};
    let todayCount = 0;

    const students: RegisteredStudent[] = (rows ?? []).map((r: any) => {
      const isToday = new Date(r.created_at) >= todayStart;
      if (isToday) todayCount++;

      // Parse degree, college, branch & question from notes
      const rawNotes = r.notes || "";
      let qualification = "Not Specified";
      let college = "Not Specified";
      let branch = "General";
      let grad_year = "2025/2026";
      let mentor_question = "";

      try {
        const parsedNotes = JSON.parse(rawNotes);
        if (parsedNotes && typeof parsedNotes === "object") {
          qualification =
            parsedNotes.degree ||
            parsedNotes.qualification ||
            parsedNotes.highestQualification ||
            "Not Specified";
          college =
            parsedNotes.college ||
            parsedNotes.collegeUniversity ||
            parsedNotes.college_university ||
            parsedNotes.college_name ||
            parsedNotes.institution ||
            "Not Specified";
          branch = parsedNotes.branch || parsedNotes.stream || "General";
          grad_year =
            parsedNotes.graduation_year ||
            parsedNotes.grad_year ||
            parsedNotes.year ||
            "2025/2026";
          mentor_question = parsedNotes.mentor_question || "";
        }
      } catch (e) {
        // Fallback for old string format
        if (rawNotes.includes("| Q:")) {
          const [degPart, qPart] = rawNotes.split("| Q:");
          mentor_question = (qPart || "").trim();
          const degMatch = degPart.match(/^([^(]+)(?:\(([^)]+)\))?/);
          if (degMatch) {
            qualification = (degMatch[1] || "").trim();
            grad_year = (degMatch[2] || "").trim();
          } else {
            qualification = degPart.trim();
          }
        } else if (rawNotes.includes("(")) {
          const degMatch = rawNotes.match(/^([^(]+)(?:\(([^)]+)\))?/);
          if (degMatch) {
            qualification = (degMatch[1] || "").trim();
            grad_year = (degMatch[2] || "").trim();
          } else {
            qualification = rawNotes.trim();
          }
        } else if (rawNotes.trim()) {
          qualification = rawNotes.trim();
        }
      }

      // Tally distributions
      const degKey = qualification || "Other";
      byDegree[degKey] = (byDegree[degKey] || 0) + 1;

      if (college && college !== "Not Specified") {
        byCollege[college] = (byCollege[college] || 0) + 1;
      }
      if (branch && branch !== "General") {
        byBranch[branch] = (byBranch[branch] || 0) + 1;
      }

      if (grad_year) {
        byGradYear[grad_year] = (byGradYear[grad_year] || 0) + 1;
      }

      const utmKey = r.utm_source || "direct";
      byUtmSource[utmKey] = (byUtmSource[utmKey] || 0) + 1;

      const cleanPhone = (r.phone || "").replace(/\D/g, "");
      const digits10 = cleanPhone.slice(-10);
      const pass_id = digits10.length >= 4 ? `PV-${digits10.slice(-4)}8` : `PV-94821`;

      const whatsappText = encodeURIComponent(
        `Hi ${r.name || "there"}, welcome to Arzon Global's Healthcare Career Workshop! Your Industry Pass ID is ${pass_id}. Here is your session link for Sunday Evening 6:00 PM IST.`
      );
      const whatsapp_link = digits10 ? `https://wa.me/91${digits10}?text=${whatsappText}` : "#";

      return {
        id: r.id,
        created_at: r.created_at,
        name: r.name || "Anonymous",
        email: r.email || "",
        phone: r.phone || "",
        qualification,
        college,
        branch,
        grad_year,
        mentor_question,
        utm_source: r.utm_source || "direct",
        pass_id,
        status: r.status || "reviewing",
        program_name: r.program_name || "Pharmacovigilance Industry Connect",
        whatsapp_link,
      };
    });

    return {
      students,
      totalCount: students.length,
      todayCount,
      byDegree,
      byGradYear,
      byUtmSource,
      byCollege,
      byBranch,
    };
  });

export interface LiveWebsiteAnalytics {
  timeframe: string;
  totalPageViews24h: number;
  uniqueVisitors24h: number;
  totalEvents24h: number;
  funnel: {
    pageViews: number;
    caseInteractions: number;
    workflowClicks: number;
    formStarts: number;
    passesReserved: number;
    whatsappClicks: number;
    calendarClicks: number;
  };
  conversionRate: {
    pageToInteraction: number;
    interactionToForm: number;
    formToPass: number;
    overallPageToPass: number;
  };
  trafficSources: Array<{ source: string; count: number; pct: number }>;
  topPages: Array<{ path: string; views: number }>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    mobilePct: number;
  };
  recentLiveEvents: Array<{
    id: string;
    event_name: string;
    path: string;
    created_at: string;
    utm_source?: string | null;
    props_summary?: string | null;
  }>;
}

const AnalyticsFilterSchema = z.object({
  timeframe: z.enum(["24h", "7d", "30d", "all"]).optional().default("all"),
}).optional();

export const getLiveWebsiteAnalytics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => AnalyticsFilterSchema.parse(data || {}))
  .handler(async ({ context, data }): Promise<LiveWebsiteAnalytics> => {
    await requireStaff(context.userId);

    const tf = data?.timeframe || "all";
    const now = Date.now();
    let query = supabaseAdmin
      .from("analytics_events")
      .select("id, event_name, path, anon_id, created_at, utm_source, props, user_agent")
      .order("created_at", { ascending: false })
      .limit(5000);

    let timeframeLabel = "All Time Telemetry";
    if (tf === "24h") {
      const since24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
      query = query.gte("created_at", since24h);
      timeframeLabel = "Past 24 Hours";
    } else if (tf === "7d") {
      const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte("created_at", since7d);
      timeframeLabel = "Past 7 Days";
    } else if (tf === "30d") {
      const since30d = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte("created_at", since30d);
      timeframeLabel = "Past 30 Days";
    }

    const { data: events, error } = await query;

    if (error) {
      console.warn("[analytics] getLiveWebsiteAnalytics query failed", error);
    }

    const rows = events || [];

    // Distinct visitors
    const uniqueAnons = new Set<string>();
    let totalPageViews = 0;
    let caseInteractions = 0;
    let workflowClicks = 0;
    let formStarts = 0;
    let passesReserved = 0;
    let whatsappClicks = 0;
    let calendarClicks = 0;

    let mobileCount = 0;
    let desktopCount = 0;

    const sourceCounts: Record<string, number> = {};
    const pageCounts: Record<string, number> = {};

    for (const ev of rows) {
      if (ev.anon_id) uniqueAnons.add(ev.anon_id);

      const path = ev.path || "/";
      pageCounts[path] = (pageCounts[path] || 0) + 1;

      const src = ev.utm_source || "direct";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;

      // Device detection
      const ua = (ev.user_agent || "").toLowerCase();
      const p = (ev.props || {}) as Record<string, any>;
      const isMobile =
        p.device === "mobile" ||
        /mobi|android|iphone|ipad|ipod/.test(ua);

      if (isMobile) {
        mobileCount++;
      } else {
        desktopCount++;
      }

      switch (ev.event_name) {
        case "page_view":
          totalPageViews++;
          break;
        case "workshop_case_tab_click":
          caseInteractions++;
          break;
        case "workshop_workflow_step_click":
          workflowClicks++;
          break;
        case "workshop_form_started":
          formStarts++;
          break;
        case "workshop_lead_submitted":
        case "apply_submitted":
        case "ce_server_lead_created":
          passesReserved++;
          break;
        case "whatsapp_click":
          whatsappClicks++;
          break;
        case "workshop_calendar_click":
          calendarClicks++;
          break;
      }
    }

    // Exact, unpadded conversion calculations
    const pageToInteraction =
      totalPageViews > 0 ? (caseInteractions / totalPageViews) * 100 : (caseInteractions > 0 ? 100 : 0);
    const interactionToForm =
      caseInteractions > 0 ? (formStarts / caseInteractions) * 100 : (formStarts > 0 ? 100 : 0);
    const formToPass =
      formStarts > 0 ? (passesReserved / formStarts) * 100 : (passesReserved > 0 ? 100 : 0);
    const overallPageToPass =
      totalPageViews > 0 ? (passesReserved / totalPageViews) * 100 : 0;

    const totalTraffic = Object.values(sourceCounts).reduce((a, b) => a + b, 0) || 0;
    const trafficSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({
        source,
        count,
        pct: totalTraffic > 0 ? Math.round((count / totalTraffic) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const topPages = Object.entries(pageCounts)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    const totalDevices = mobileCount + desktopCount || 0;
    const mobilePct = totalDevices > 0 ? Math.round((mobileCount / totalDevices) * 100) : 0;

    const recentLiveEvents = rows.slice(0, 30).map((r: any) => {
      let propsSummary: string | null = null;
      if (r.props && typeof r.props === "object") {
        const parts: string[] = [];
        if (r.props.degree) parts.push(String(r.props.degree));
        if (r.props.phone) parts.push(`Ph: ${String(r.props.phone).slice(-4)}`);
        if (r.props.source) parts.push(`Src: ${String(r.props.source)}`);
        if (r.props.device) parts.push(String(r.props.device));
        if (parts.length > 0) propsSummary = parts.join(" · ");
      }

      return {
        id: r.id,
        event_name: r.event_name,
        path: r.path || "/",
        created_at: r.created_at,
        utm_source: r.utm_source,
        props_summary: propsSummary,
      };
    });

    return {
      timeframe: timeframeLabel,
      totalPageViews24h: totalPageViews,
      uniqueVisitors24h: uniqueAnons.size,
      totalEvents24h: rows.length,
      funnel: {
        pageViews: totalPageViews,
        caseInteractions,
        workflowClicks,
        formStarts,
        passesReserved,
        whatsappClicks,
        calendarClicks,
      },
      conversionRate: {
        pageToInteraction: Math.min(100, Math.round(pageToInteraction * 10) / 10),
        interactionToForm: Math.min(100, Math.round(interactionToForm * 10) / 10),
        formToPass: Math.min(100, Math.round(formToPass * 10) / 10),
        overallPageToPass: Math.min(100, Math.round(overallPageToPass * 10) / 10),
      },
      trafficSources,
      topPages,
      deviceBreakdown: {
        mobile: mobileCount,
        desktop: desktopCount,
        mobilePct,
      },
      recentLiveEvents,
    };
  });

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED ADMIN RESPONSES & APPLICATIONS STREAM
// Centralizes Workshop Leads, Job/Cohort Applications, Career Engine Leads & Paid Enrolments
// ─────────────────────────────────────────────────────────────────────────────

export type ResponseKind = "workshop" | "application" | "career_engine" | "enrolment";

export interface UnifiedAdminResponse {
  id: string;
  kind: ResponseKind;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  status: string;
  college?: string | null;
  branch?: string | null;
  degree?: string | null;
  grad_year?: string | null;
  pass_id?: string | null;
  program_name?: string | null;
  program_slug?: string | null;
  archetype?: string | null;
  fit_score?: number | null;
  top_paths?: (string | { slug?: string; title?: string; salary?: string })[] | null;
  amount_inr?: number | null;
  mentor_question?: string | null;
  utm_source?: string | null;
  notes?: string | null;
  whatsapp_link?: string | null;
  whatsapp_optin?: boolean;
}

export interface AllAdminResponsesResult {
  responses: UnifiedAdminResponse[];
  totalCount: number;
  todayCount: number;
  countsByKind: {
    workshop: number;
    application: number;
    career_engine: number;
    enrolment: number;
    enrolment_paid: number;
    enrolment_intent: number;
  };
  countsByStatus: Record<string, number>;
  byCollege: Record<string, number>;
  byBranch: Record<string, number>;
  byDegree: Record<string, number>;
  totalPaidRevenueInr: number;
}

/**
 * Empty fallback array preserved for legacy imports.
 * In production, genuine empty state or error states are surfaced instead of synthetic records.
 */
export const FALLBACK_UNIFIED_RESPONSES: UnifiedAdminResponse[] = [];

export const getAllAdminResponses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AllAdminResponsesResult> => {
    await requireStaff(context.userId);
    const sb = admin();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Parallel fetch from all candidate data sources including ACRI candidates
    const [appsRes, ceRes, enrolRes, acriRes] = await Promise.allSettled([
      sb
        .from("applications")
        .select("id, created_at, name, email, phone, notes, utm_source, status, program_slug, program_name")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(2000),
      sb
        .from("career_engine_leads")
        .select("id, created_at, name, email, phone, whatsapp_optin, archetype, fit_score, top_paths, contacted_at, result_payload, session_id")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(2000),
      sb
        .from("enrolment_intents")
        .select("id, created_at, name, email, phone, tier, base_price_inr, status, razorpay_payment_id, program_slug")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(2000),
      (sb as any)
        .from("acri_candidates")
        .select("id, candidate_id, full_name, email, mobile, highest_qualification, college_university, status, created_at")
        .order("created_at", { ascending: false })
        .limit(2000),
    ]);

    // Build lookup maps for ACRI candidates to enrich applications or backfill missing college data
    const acriByEmail = new Map<string, any>();
    const acriByPhone = new Map<string, any>();
    if (acriRes.status === "fulfilled" && Array.isArray((acriRes.value as any)?.data)) {
      for (const c of (acriRes.value as any).data) {
        if (c.email) acriByEmail.set(c.email.toLowerCase().trim(), c);
        const cleanP = (c.mobile || "").replace(/\D/g, "").slice(-10);
        if (cleanP) acriByPhone.set(cleanP, c);
      }
    }

    // Query answers for Career Engine leads to get their exact college and academic info
    const ceAnswersBySession = new Map<string, Record<string, string>>();
    if (ceRes.status === "fulfilled" && Array.isArray((ceRes.value as any)?.data)) {
      const sessionIds = ((ceRes.value as any).data as any[])
        .map((r) => r.session_id)
        .filter(Boolean);

      if (sessionIds.length > 0) {
        try {
          const { data: answersData } = await sb
            .from("career_engine_answers")
            .select("session_id, question_id, answer")
            .in("session_id", sessionIds.slice(0, 1000))
            .in("question_id", ["college_name", "college", "course", "stream", "year"]);

          if (answersData) {
            for (const ans of answersData) {
              if (!ans.session_id) continue;
              const cur = ceAnswersBySession.get(ans.session_id) || {};
              cur[ans.question_id] = ans.answer;
              ceAnswersBySession.set(ans.session_id, cur);
            }
          }
        } catch (e) {
          console.warn("[workshop] failed to query career_engine_answers:", e);
        }
      }
    }

    const unifiedList: UnifiedAdminResponse[] = [];
    const countsByKind = {
      workshop: 0,
      application: 0,
      career_engine: 0,
      enrolment: 0,
      enrolment_paid: 0,
      enrolment_intent: 0,
    };
    const countsByStatus: Record<string, number> = {};
    const byCollege: Record<string, number> = {};
    const byBranch: Record<string, number> = {};
    const byDegree: Record<string, number> = {};
    let totalPaidRevenueInr = 0;
    let todayCount = 0;

    // 1. Process applications (both workshop and job applications)
    if (appsRes.status === "fulfilled" && appsRes.value.data) {
      for (const r of appsRes.value.data as any[]) {
        const isToday = new Date(r.created_at) >= todayStart;
        if (isToday) todayCount++;

        const isWorkshop =
          r.program_slug === "healthcare-career-workshop" ||
          r.program_slug === "workshop-intelligence-session" ||
          r.program_slug === "pv-industry-connect" ||
          (r.program_name && /workshop|webinar/i.test(r.program_name));

        const kind: ResponseKind = isWorkshop ? "workshop" : "application";
        countsByKind[kind]++;

        const status = (r.status || (isWorkshop ? "registered" : "submitted")).toLowerCase();
        countsByStatus[status] = (countsByStatus[status] || 0) + 1;

        // Parse notes JSON for academic details
        let qualification = "Not Specified";
        let college = "Not Specified";
        let branch = "General";
        let grad_year = "2025/2026";
        let mentor_question = "";
        let pass_id = "";

        if (r.notes) {
          try {
            const parsed = JSON.parse(r.notes);
            if (parsed && typeof parsed === "object") {
              qualification =
                parsed.degree ||
                parsed.qualification ||
                parsed.highestQualification ||
                qualification;
              college =
                parsed.college ||
                parsed.collegeUniversity ||
                parsed.college_university ||
                parsed.college_name ||
                parsed.institution ||
                college;
              branch = parsed.branch || parsed.stream || branch;
              grad_year =
                parsed.graduation_year ||
                parsed.grad_year ||
                parsed.year ||
                grad_year;
              mentor_question = parsed.mentor_question || "";
              pass_id = parsed.pass_id || parsed.invite_code || parsed.acri_invite_code || "";
            }
          } catch {
            qualification = r.notes.trim();
          }
        }

        const cleanPhone = (r.phone || "").replace(/\D/g, "");
        const digits10 = cleanPhone.slice(-10);

        const acriCandidate =
          (r.email && acriByEmail.get(r.email.toLowerCase().trim())) ||
          (digits10 && acriByPhone.get(digits10));

        // Fallback to ACRI registration table for college / qualification if missing
        if (college === "Not Specified" || qualification === "Not Specified") {
          if (acriCandidate) {
            if (college === "Not Specified" && acriCandidate.college_university) {
              college = acriCandidate.college_university;
            }
            if (qualification === "Not Specified" && acriCandidate.highest_qualification) {
              qualification = acriCandidate.highest_qualification;
            }
          }
        }

        if (!pass_id && acriCandidate?.invite_code) {
          pass_id = acriCandidate.invite_code;
        }

        if (!pass_id && isWorkshop && digits10.length >= 4) {
          pass_id = `PV-${digits10.slice(-4)}8`;
        }

        if (college && college !== "Not Specified") {
          byCollege[college] = (byCollege[college] || 0) + 1;
        }
        if (branch && branch !== "General") {
          byBranch[branch] = (byBranch[branch] || 0) + 1;
        }
        if (qualification && qualification !== "Not Specified") {
          byDegree[qualification] = (byDegree[qualification] || 0) + 1;
        }

        const whatsappText = encodeURIComponent(
          isWorkshop
            ? `Hi ${r.name || "there"}, here is your confirmed pass (${pass_id}) for Arzon Global's Healthcare Career Workshop!`
            : `Hi ${r.name || "there"}, regarding your application for ${r.program_name || "Arzon Healthcare roles"}...`
        );
        const whatsapp_link = digits10 ? `https://wa.me/91${digits10}?text=${whatsappText}` : null;

        unifiedList.push({
          id: r.id,
          kind,
          name: r.name || "Anonymous",
          email: r.email || "",
          phone: r.phone || "",
          created_at: r.created_at,
          status,
          college: college !== "Not Specified" ? college : null,
          branch: branch !== "General" ? branch : null,
          degree: qualification !== "Not Specified" ? qualification : null,
          grad_year,
          pass_id: pass_id || null,
          program_name: r.program_name || (isWorkshop ? WORKSHOP_CONFIG.title : "Healthcare Program Application"),
          program_slug: r.program_slug || (isWorkshop ? "healthcare-career-workshop" : "general-application"),
          mentor_question: mentor_question || null,
          notes: r.notes || null,
          utm_source: r.utm_source || "direct",
          whatsapp_link,
          whatsapp_optin: true,
        });
      }
    }

    // 2. Process Career Engine Leads
    const DEGREE_LABELS: Record<string, string> = {
      pharma: "B.Pharm / Pharm.D",
      lifesci: "B.Sc Life Sciences / Biotech",
      med: "MBBS / BDS / Allied Health",
      engg: "B.Tech / B.E",
      comm: "B.Com / BBA",
      agri: "B.Sc Agri",
      arts: "BA / Humanities",
    };

    const YEAR_LABELS: Record<string, string> = {
      "1": "1st Year",
      "2": "2nd Year",
      "3": "3rd Year",
      "4": "Final Year",
      graduated: "Graduated",
    };

    if (ceRes.status === "fulfilled" && ceRes.value.data) {
      for (const r of ceRes.value.data as any[]) {
        const isToday = new Date(r.created_at) >= todayStart;
        if (isToday) todayCount++;

        countsByKind.career_engine++;
        const status = r.contacted_at ? "contacted" : "uncontacted";
        countsByStatus[status] = (countsByStatus[status] || 0) + 1;

        const cleanPhone = (r.phone || "").replace(/\D/g, "");
        const digits10 = cleanPhone.slice(-10);
        const whatsappText = encodeURIComponent(
          `Hi ${r.name || "there"}, your Career Engine assessment recommended ${r.archetype || "Pharmacovigilance"}. Would you like to review your detailed evaluation?`
        );
        const whatsapp_link = digits10 ? `https://wa.me/91${digits10}?text=${whatsappText}` : null;

        // Extract college, course/degree, stream/branch and year
        const ans = (r.session_id && ceAnswersBySession.get(r.session_id)) || {};
        const payload = (r.result_payload && typeof r.result_payload === "object" ? r.result_payload : {}) as any;
        const profilePayload = payload.profile || {};

        let college =
          profilePayload.college ||
          payload.college ||
          ans.college_name ||
          ans.college ||
          null;

        if (!college) {
          const acriCandidate =
            (r.email && acriByEmail.get(r.email.toLowerCase().trim())) ||
            (digits10 && acriByPhone.get(digits10));
          if (acriCandidate?.college_university) {
            college = acriCandidate.college_university;
          }
        }

        const rawCourse = profilePayload.course || ans.course || null;
        const degree = rawCourse ? (DEGREE_LABELS[rawCourse] || rawCourse) : null;
        const branch = profilePayload.stream || ans.stream || null;
        const rawYear = profilePayload.year || ans.year || null;
        const grad_year = rawYear ? (YEAR_LABELS[rawYear] || rawYear) : null;

        if (college && college !== "Not Specified") {
          byCollege[college] = (byCollege[college] || 0) + 1;
        }
        if (branch && branch !== "General") {
          byBranch[branch] = (byBranch[branch] || 0) + 1;
        }
        if (degree && degree !== "Not Specified") {
          byDegree[degree] = (byDegree[degree] || 0) + 1;
        }

        unifiedList.push({
          id: r.id,
          kind: "career_engine",
          name: r.name || "Candidate",
          email: r.email || "",
          phone: r.phone || "",
          created_at: r.created_at,
          status,
          college: college || null,
          branch: branch || null,
          degree: degree || null,
          grad_year: grad_year || null,
          archetype: r.archetype || null,
          fit_score: r.fit_score || null,
          top_paths: Array.isArray(r.top_paths) ? r.top_paths : null,
          program_name: "Career Engine Assessment",
          program_slug: "career-engine",
          whatsapp_link,
          whatsapp_optin: Boolean(r.whatsapp_optin),
        });
      }
    }

    // 3. Process Enrolment Intents
    if (enrolRes.status === "fulfilled" && enrolRes.value.data) {
      for (const r of enrolRes.value.data as any[]) {
        const isToday = new Date(r.created_at) >= todayStart;
        if (isToday) todayCount++;

        countsByKind.enrolment++;
        countsByKind.enrolment_intent++;
        const status = (r.status || "pending").toLowerCase();
        countsByStatus[status] = (countsByStatus[status] || 0) + 1;

        const amt = typeof r.base_price_inr === "number" ? r.base_price_inr : 0;
        if (status === "paid") {
          countsByKind.enrolment_paid++;
          totalPaidRevenueInr += amt;
        }

        const cleanPhone = (r.phone || "").replace(/\D/g, "");
        const digits10 = cleanPhone.slice(-10);
        const whatsapp_link = digits10 ? `https://wa.me/91${digits10}` : null;

        // Try to associate college if candidate exists in ACRI
        const acriCandidate =
          (r.email && acriByEmail.get(r.email.toLowerCase().trim())) ||
          (digits10 && acriByPhone.get(digits10));

        unifiedList.push({
          id: r.id,
          kind: "enrolment",
          name: r.name || "Enrolee",
          email: r.email || "",
          phone: r.phone || "",
          created_at: r.created_at,
          status,
          college: acriCandidate?.college_university || null,
          degree: acriCandidate?.highest_qualification || null,
          amount_inr: amt || null,
          program_name: r.tier ? `${r.tier.toUpperCase()} Mentorship Enrolment` : "Course Enrolment",
          program_slug: r.program_slug || "enrol",
          notes: r.razorpay_payment_id ? `Payment ID: ${r.razorpay_payment_id}` : null,
          whatsapp_link,
          whatsapp_optin: true,
        });
      }
    }

    // In production, an empty database returns a clean empty list rather than synthetic records.

    // Sort all responses chronologically descending
    unifiedList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
      responses: unifiedList,
      totalCount: unifiedList.length,
      todayCount,
      countsByKind,
      countsByStatus,
      byCollege,
      byBranch,
      byDegree,
      totalPaidRevenueInr,
    };
  });

const UpdateUnifiedStatusSchema = z.object({
  id: z.string(),
  kind: z.enum(["workshop", "application", "career_engine", "enrolment"]),
  status: z.string().min(1).max(64),
});

export const updateUnifiedResponseStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => UpdateUnifiedStatusSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireStaff(context.userId);
    const sb = admin();

    if (data.kind === "workshop" || data.kind === "application") {
      const allowed = ["registered", "submitted", "reviewing", "shortlisted", "accepted", "rejected", "enrolled", "withdrawn"];
      if (!allowed.includes(data.status)) {
        throw new Error(`Invalid status for application. Allowed: ${allowed.join(", ")}`);
      }
      const { error } = await sb
        .from("applications")
        .update({ status: data.status as any })
        .eq("id", data.id);
      if (error) throw new Error(error.message);

      if (data.status === "accepted") {
        await syncAndApproveAcriApplication(data.id).catch((err) => {
          console.warn("[workshop] auto-approval for ACRI application failed:", err);
        });
      }
    } else if (data.kind === "career_engine") {
      const allowed = ["contacted", "uncontacted"];
      if (!allowed.includes(data.status)) {
        throw new Error("Invalid status for Career Engine lead. Allowed: contacted, uncontacted");
      }
      const contactedAt = data.status === "contacted" ? new Date().toISOString() : null;
      const contactedBy = data.status === "contacted" ? context.userId : null;
      const { data: updatedLead, error } = await sb
        .from("career_engine_leads")
        .update({ contacted_at: contactedAt, contacted_by: contactedBy })
        .eq("id", data.id)
        .select("id, contacted_at, contacted_by")
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!updatedLead) {
        throw new Error("Career Engine lead was not found or could not be updated.");
      }
    } else if (data.kind === "enrolment") {
      const allowed = ["pending", "paid", "failed", "abandoned", "refunded"];
      if (!allowed.includes(data.status)) {
        throw new Error(`Invalid status for enrolment. Allowed: ${allowed.join(", ")}`);
      }
      const { error } = await sb
        .from("enrolment_intents")
        .update({ status: data.status })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    }

    return { success: true, id: data.id, status: data.status };
  });

// ─────────────────────────────────────────────────────────────────────────────
// WORKSHOP DYNAMIC SEAT ALLOCATION CALCULATOR
// Computes live allocated seats, remaining capacity & reservation percentage
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkshopSeatStats {
  totalCapacity: number;
  baselineAllocated: number;
  liveRegisteredCount: number;
  allocatedSeats: number;
  remainingSeats: number;
  percentReserved: number;
}

export const getWorkshopSeatStats = createServerFn({ method: "GET" })
  .handler(async (): Promise<WorkshopSeatStats> => {
    const totalCapacity = WORKSHOP_CONFIG.totalCapacity ?? 500;
    const baselineAllocated = WORKSHOP_CONFIG.baselineAllocated ?? 432;

    let liveRegisteredCount = 0;
    try {
      const sb = admin();
      const { count, error } = await sb
        .from("applications")
        .select("id", { count: "exact", head: true })
        .eq("program_slug", "workshop-intelligence-session")
        .is("deleted_at", null);

      if (!error && typeof count === "number") {
        liveRegisteredCount = count;
      }
    } catch {
      liveRegisteredCount = 1;
    }

    const rawAllocated = baselineAllocated + liveRegisteredCount;
    // When registrations cross totalCapacity (500), dynamically expand capacity in increments
    // so registrations continue uninterrupted without hitting a hard ceiling.
    const effectiveCapacity =
      rawAllocated >= totalCapacity
        ? Math.max(totalCapacity, Math.ceil((rawAllocated + 15) / 50) * 50)
        : totalCapacity;
    const allocatedSeats = rawAllocated;
    const remainingSeats = Math.max(1, effectiveCapacity - allocatedSeats);
    const percentReserved = Math.min(99, Math.round((allocatedSeats / effectiveCapacity) * 100));

    return {
      totalCapacity: effectiveCapacity,
      baselineAllocated,
      liveRegisteredCount,
      allocatedSeats,
      remainingSeats,
      percentReserved,
    };
  });

