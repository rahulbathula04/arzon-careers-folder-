import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";
import { recordServerEvent, supabaseAdmin } from "@/server/analytics.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff } from "@/server/auth-guards.server";

function admin() {
  return createSafeAdminClient();
}

const WorkshopLeadSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  phone: z.string().min(10).max(20).trim(),
  email: z.string().email().max(120).optional().or(z.literal("")).transform(v => v || null),
  degree: z.string().max(255),
  source: z.string().max(64).optional().default("workshop-page"),
  utmSource: z.string().max(64).optional().nullable(),
});

export type WorkshopLeadInput = z.infer<typeof WorkshopLeadSchema>;

export const submitWorkshopLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => WorkshopLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";

    // Rate-limit: 5 submissions per minute per IP
    const rl = await checkRateLimit(ip, "workshop_lead", 5, 60);
    if (!rl.success) {
      throw new Error("Too many requests. Please wait a moment before trying again.");
    }

    const sb = admin();

    // Upsert into applications table using the existing submit_application RPC
    const { data: id, error } = await (sb as any).rpc("submit_application", {
      p_name: data.name,
      p_email: data.email ?? `${data.phone.replace(/\D/g, "")}@workshop.lead`,
      p_phone: data.phone,
      p_program_slug: "workshop-intelligence-session",
      p_program_name: "Pharmacovigilance Industry Connect",
      p_whatsapp_optin: true,
      p_lead_id: null,
      p_utm_source: data.utmSource ?? data.source ?? "pv-industry-connect",
      p_user_agent: null,
    });

    if (error) {
      console.error("[workshop] submitWorkshopLead failed", error);
      throw new Error(error.message);
    }

    // Persist degree, qualification and mentor questions directly in notes
    if (id && data.degree) {
      try {
        await (sb as any)
          .from("applications")
          .update({
            notes: data.degree,
            program_name: "Pharmacovigilance Industry Connect",
          })
          .eq("id", id);
      } catch (updateErr) {
        console.warn("[workshop] failed to update notes:", updateErr);
      }
    }

    // Fire analytics event
    await recordServerEvent({
      event_name: "workshop_lead_submitted",
      application_id: id as string,
      program_slug: "workshop-intelligence-session",
      props: {
        degree: data.degree,
        source: data.source ?? "pv-industry-connect",
        phone: data.phone,
      },
    }).catch(() => {
      /* non-blocking */
    });

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
      .or("program_slug.eq.workshop-intelligence-session,program_slug.eq.pv-industry-connect,program_name.ilike.%workshop%,program_name.ilike.%pharmacovigilance%")
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
    let todayCount = 0;

    const students: RegisteredStudent[] = (rows ?? []).map((r: any) => {
      const isToday = new Date(r.created_at) >= todayStart;
      if (isToday) todayCount++;

      // Parse degree & question from notes (e.g. "B.Pharm (2025) | Q: What skills matter?")
      const rawNotes = r.notes || "";
      let qualification = "Not Specified";
      let grad_year = "2025/2026";
      let mentor_question = "";

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

      // Tally distributions
      const degKey = qualification || "Other";
      byDegree[degKey] = (byDegree[degKey] || 0) + 1;

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
  }>;
}

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
