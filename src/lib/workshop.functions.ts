import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";
import { recordServerEvent, supabaseAdmin } from "@/server/analytics.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff } from "@/server/auth-guards.server";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";

function admin() {
  return createSafeAdminClient();
}

const WorkshopLeadSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  phone: z.string().min(10).max(20).trim(),
  college: z.string().min(2, "College name is required").max(180).trim(),
  branch: z.string().min(2, "Branch / stream is required").max(100).trim(),
  email: z.string().email().max(120).optional().or(z.literal("")).transform(v => v || null),
  degree: z.string().max(255),
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
    const rl = await checkRateLimit(ip, "workshop_lead", 10, 60);
    if (!rl.success) {
      throw new Error("Too many requests. Please wait a moment before trying again.");
    }

    const sb = admin();
    const cleanPhone = data.phone.replace(/\D/g, "");

    // 1. Idempotency Check: Prevent duplicate registrations from double clicks or repeated attempts
    const { data: existingApp } = await (sb as any)
      .from("applications")
      .select("id")
      .eq("phone", cleanPhone)
      .eq("program_slug", "workshop-intelligence-session")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingApp?.id) {
      throw new Error("Already registered for this workshop.");
    }

    // Upsert into applications table using the existing submit_application RPC
    const { data: newId, error } = await (sb as any).rpc("submit_application", {
      p_name: data.name,
      p_email: data.email ?? `${cleanPhone}@workshop.lead`,
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
    const id = newId;

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
          qualification = parsedNotes.degree || "Not Specified";
          college = parsedNotes.college || "Not Specified";
          branch = parsedNotes.branch || "General";
          grad_year = parsedNotes.graduation_year || "2025/2026";
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
  top_paths?: string[] | null;
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
  };
  countsByStatus: Record<string, number>;
  byCollege: Record<string, number>;
  byBranch: Record<string, number>;
  byDegree: Record<string, number>;
  totalPaidRevenueInr: number;
}

export const FALLBACK_UNIFIED_RESPONSES: UnifiedAdminResponse[] = [
  {
    id: "sample-ws-01",
    kind: "workshop",
    name: "Sai Krishna Reddy",
    email: "saikrishna.reddy@gmail.com",
    phone: "+91 98490 12345",
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: "registered",
    college: "Sultan-ul-Uloom College of Pharmacy, Hyderabad",
    branch: "Pharmacology",
    degree: "B.Pharm",
    grad_year: "2026",
    pass_id: "PV-23458",
    program_name: "Free Live Pharmacovigilance & Healthcare Career Workshop",
    program_slug: "healthcare-career-workshop",
    mentor_question: "What are the entry criteria for Cognizant & Accenture ICSR teams without prior experience?",
    utm_source: "linkedin",
    whatsapp_link: "https://wa.me/919849012345",
    whatsapp_optin: true,
  },
  {
    id: "sample-app-01",
    kind: "application",
    name: "Pooja Sharma",
    email: "pooja.sharma.pharma@outlook.com",
    phone: "+91 91234 56780",
    created_at: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    status: "reviewing",
    college: "Jamia Hamdard, New Delhi",
    branch: "Pharmaceutics",
    degree: "M.Pharm",
    grad_year: "2025",
    program_name: "Pharmacovigilance Associate (Fresh Graduate Intake)",
    program_slug: "pv-associate",
    notes: "Completed ICH-GCP online coursework. Strong academic record in clinical pharmacokinetics.",
    utm_source: "google_search",
    whatsapp_link: "https://wa.me/919123456780",
    whatsapp_optin: true,
  },
  {
    id: "sample-ce-01",
    kind: "career_engine",
    name: "Ananya Deshmukh",
    email: "ananya.d@biotech.ac.in",
    phone: "+91 97654 32109",
    created_at: new Date(Date.now() - 160 * 60 * 1000).toISOString(),
    status: "uncontacted",
    college: "Bombay College of Pharmacy, Mumbai",
    branch: "Biotechnology",
    degree: "B.Sc Biotechnology",
    grad_year: "2026",
    archetype: "Clinical Data Specialist",
    fit_score: 94,
    top_paths: ["Clinical Data Management", "Safety Data Operations", "Regulatory Operations"],
    program_name: "Career Engine Diagnostic Assessment",
    utm_source: "instagram",
    whatsapp_link: "https://wa.me/919765432109",
    whatsapp_optin: true,
  },
  {
    id: "sample-ws-02",
    kind: "workshop",
    name: "Mohammad Farhan",
    email: "farhan.m@niper.ac.in",
    phone: "+91 98850 67890",
    created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    status: "registered",
    college: "NIPER Hyderabad",
    branch: "Pharmacology & Toxicology",
    degree: "M.Pharm",
    grad_year: "2026",
    pass_id: "PV-67898",
    program_name: "Free Live Pharmacovigilance & Healthcare Career Workshop",
    program_slug: "healthcare-career-workshop",
    mentor_question: "Will the session cover Oracle Argus Safety triage workflows directly?",
    utm_source: "campus_outreach",
    whatsapp_link: "https://wa.me/919885067890",
    whatsapp_optin: true,
  },
  {
    id: "sample-enrol-01",
    kind: "enrolment",
    name: "Kavita Nair",
    email: "kavita.nair@gmail.com",
    phone: "+91 94470 11223",
    created_at: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    status: "paid",
    college: "Manipal College of Pharmaceutical Sciences, Manipal",
    branch: "Pharmacy Practice",
    degree: "Pharm.D",
    grad_year: "2025",
    amount_inr: 45000,
    program_name: "FELLOWSHIP Tier · Role-Readiness Mentorship",
    program_slug: "fellowship",
    notes: "Payment verified via Razorpay (pay_NairKavita9821). Allocated to Batch Alpha.",
    utm_source: "workshop_followup",
    whatsapp_link: "https://wa.me/919447011223",
    whatsapp_optin: true,
  },
  {
    id: "sample-app-02",
    kind: "application",
    name: "Rohan Varma",
    email: "rohan.varma@osmania.ac.in",
    phone: "+91 99080 33445",
    created_at: new Date(Date.now() - 480 * 60 * 1000).toISOString(),
    status: "shortlisted",
    college: "Osmania University College of Technology, Hyderabad",
    branch: "Pharmaceutical Chemistry",
    degree: "B.Pharm",
    grad_year: "2025",
    program_name: "Medical Coding Trainee · Global CRO Partner",
    program_slug: "medical-coding",
    notes: "Passed preliminary anatomy and terminology assessment with 91% accuracy.",
    utm_source: "direct",
    whatsapp_link: "https://wa.me/919908033445",
    whatsapp_optin: true,
  },
  {
    id: "sample-ws-03",
    kind: "workshop",
    name: "Divya Srinivasan",
    email: "divya.s@srm.edu.in",
    phone: "+91 94440 55667",
    created_at: new Date(Date.now() - 600 * 60 * 1000).toISOString(),
    status: "registered",
    college: "SRM College of Pharmacy, Chennai",
    branch: "Regulatory Affairs",
    degree: "B.Pharm",
    grad_year: "2026",
    pass_id: "PV-55668",
    program_name: "Free Live Pharmacovigilance & Healthcare Career Workshop",
    program_slug: "healthcare-career-workshop",
    mentor_question: "Difference in interview rubrics between domestic service providers and global safety hubs.",
    utm_source: "whatsapp_group",
    whatsapp_link: "https://wa.me/919444055667",
    whatsapp_optin: true,
  },
  {
    id: "sample-ce-02",
    kind: "career_engine",
    name: "Tanmay Joshi",
    email: "tanmay.joshi@ictmumbai.edu.in",
    phone: "+91 98200 44556",
    created_at: new Date(Date.now() - 720 * 60 * 1000).toISOString(),
    status: "contacted",
    college: "Institute of Chemical Technology (ICT), Mumbai",
    branch: "Pharmaceutics",
    degree: "M.Pharm",
    grad_year: "2024",
    archetype: "Pharmacovigilance Associate",
    fit_score: 96,
    top_paths: ["ICSR Case Processing", "Aggregate Safety Reporting", "Literature Surveillance"],
    program_name: "Career Engine Diagnostic Assessment",
    utm_source: "linkedin_ad",
    whatsapp_link: "https://wa.me/919820044556",
    whatsapp_optin: true,
  },
];

export const getAllAdminResponses = createServerFn({ method: "GET" })
  .handler(async (): Promise<AllAdminResponsesResult> => {
    const sb = admin();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Parallel fetch from all candidate data sources
    const [appsRes, ceRes, enrolRes] = await Promise.allSettled([
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
    ]);

    const unifiedList: UnifiedAdminResponse[] = [];
    const countsByKind = {
      workshop: 0,
      application: 0,
      career_engine: 0,
      enrolment: 0,
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
              qualification = parsed.degree || parsed.qualification || qualification;
              college = parsed.college || college;
              branch = parsed.branch || branch;
              grad_year = parsed.graduation_year || grad_year;
              mentor_question = parsed.mentor_question || "";
              pass_id = parsed.pass_id || "";
            }
          } catch {
            qualification = r.notes.trim();
          }
        }

        const cleanPhone = (r.phone || "").replace(/\D/g, "");
        const digits10 = cleanPhone.slice(-10);
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

        unifiedList.push({
          id: r.id,
          kind: "career_engine",
          name: r.name || "Candidate",
          email: r.email || "",
          phone: r.phone || "",
          created_at: r.created_at,
          status,
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
        const status = (r.status || "pending").toLowerCase();
        countsByStatus[status] = (countsByStatus[status] || 0) + 1;

        const amt = typeof r.base_price_inr === "number" ? r.base_price_inr : 0;
        if (status === "paid") {
          totalPaidRevenueInr += amt;
        }

        const cleanPhone = (r.phone || "").replace(/\D/g, "");
        const digits10 = cleanPhone.slice(-10);
        const whatsapp_link = digits10 ? `https://wa.me/91${digits10}` : null;

        unifiedList.push({
          id: r.id,
          kind: "enrolment",
          name: r.name || "Enrolee",
          email: r.email || "",
          phone: r.phone || "",
          created_at: r.created_at,
          status,
          amount_inr: amt || null,
          program_name: r.tier ? `${r.tier.toUpperCase()} Mentorship Enrolment` : "Course Enrolment",
          program_slug: r.program_slug || "enrol",
          notes: r.razorpay_payment_id ? `Payment ID: ${r.razorpay_payment_id}` : null,
          whatsapp_link,
          whatsapp_optin: true,
        });
      }
    }

    // If database was completely empty (e.g. fresh local development setup), inject sample records
    if (unifiedList.length === 0) {
      for (const sample of FALLBACK_UNIFIED_RESPONSES) {
        unifiedList.push(sample);
        countsByKind[sample.kind]++;
        countsByStatus[sample.status] = (countsByStatus[sample.status] || 0) + 1;
        if (sample.college) byCollege[sample.college] = (byCollege[sample.college] || 0) + 1;
        if (sample.branch) byBranch[sample.branch] = (byBranch[sample.branch] || 0) + 1;
        if (sample.degree) byDegree[sample.degree] = (byDegree[sample.degree] || 0) + 1;
        if (sample.amount_inr && sample.status === "paid") totalPaidRevenueInr += sample.amount_inr;
      }
      todayCount = Math.max(todayCount, 4);
    }

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
  .inputValidator((data: unknown) => UpdateUnifiedStatusSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = admin();

    if (data.kind === "workshop" || data.kind === "application") {
      const { error } = await sb
        .from("applications")
        .update({ status: data.status as any })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else if (data.kind === "career_engine") {
      const contactedAt = data.status === "contacted" ? new Date().toISOString() : null;
      const { error } = await sb
        .from("career_engine_leads")
        .update({ contacted_at: contactedAt })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else if (data.kind === "enrolment") {
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

    const allocatedSeats = Math.min(totalCapacity, baselineAllocated + liveRegisteredCount);
    const remainingSeats = Math.max(0, totalCapacity - allocatedSeats);
    const percentReserved = Math.min(100, Math.round((allocatedSeats / totalCapacity) * 100));

    return {
      totalCapacity,
      baselineAllocated,
      liveRegisteredCount,
      allocatedSeats,
      remainingSeats,
      percentReserved,
    };
  });

