import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";
import { syncCounselorLeadToGoogleSheet } from "@/server/googleSheetSync.server";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

const LeadMagnetSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[0-9]{10,15}$/),
  qualification: z.string().trim().min(2).max(120),
  whatsappOptin: z.boolean(),
  targetRole: z.string().max(120).optional(),
  sourcePath: z.string().max(160).optional(),
  clientFp: z.string().trim().min(16).max(64),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(160).optional(),
  utmContent: z.string().max(160).optional(),
});

export const submitCareerStarterKitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadMagnetSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    const rl = await checkRateLimit(ip, "career_starter_kit", 5, 60, false);
    if (!rl.success) throw new Error("Too many requests. Please wait a minute before trying again.");

    const sb = createSafeAdminClient();
    const fp = data.clientFp;
    const { data: sessionRows, error: sessionError } = await sb.rpc("ce_start_session", {
      p_stream: "healthcare-careers",
      p_device: "lead-magnet",
      p_utm_source: "careers-starter-kit",
      p_user_agent: undefined,
      p_honeypot: undefined,
      p_client_fp: fp.slice(0, 64),
    });
    if (sessionError) throw new Error(sessionError.message);

    const session = Array.isArray(sessionRows) ? sessionRows[0] : sessionRows;
    const sessionId = session?.session_id as string | undefined;
    const sessionToken = session?.session_token as string | undefined;
    if (!sessionId || !sessionToken) throw new Error("Could not create a lead session.");

    const { data: leadId, error: leadError } = await sb.rpc("ce_create_lead_early", {
      p_session_id: sessionId,
      p_session_token: sessionToken,
      p_name: data.name,
      p_phone: data.phone,
      p_email: data.email,
      p_whatsapp_optin: data.whatsappOptin,
    });
    if (leadError) throw new Error(leadError.message);

    const { data: existingLead, error: existingLeadError } = await sb
      .from("career_engine_leads")
      .select("result_payload")
      .eq("id", leadId as string)
      .maybeSingle();
    if (existingLeadError) throw new Error(existingLeadError.message);

    const { error: profileError } = await sb
      .from("career_engine_leads")
      .update({
        result_payload: {
          ...((existingLead?.result_payload && typeof existingLead.result_payload === "object" && !Array.isArray(existingLead.result_payload)) ? existingLead.result_payload : {}),
          source: "careers_starter_kit",
          source_path: data.sourcePath ?? "/careers",
          qualification: data.qualification,
          target_role: data.targetRole ?? null,
          lead_magnet: data.targetRole ? `${data.targetRole} Blueprint 2026` : "2026 Healthcare Career Starter Kit",
          lead_magnet_version: "2026-v1",
          referrer: data.referrer ?? null,
          utm_source: data.utmSource ?? null,
          utm_medium: data.utmMedium ?? null,
          utm_campaign: data.utmCampaign ?? null,
          utm_content: data.utmContent ?? null,
          consent_timestamp: new Date().toISOString(),
        },
      })
      .eq("id", leadId as string);
    if (profileError) throw new Error(profileError.message);

    await syncCounselorLeadToGoogleSheet({
      name: data.name,
      phone: data.phone,
      email: data.email,
      college: data.targetRole ? `Role: ${data.targetRole}` : "Career Starter Kit",
      degree: data.qualification,
      programName: data.targetRole ? `${data.targetRole} Blueprint 2026` : "2026 Healthcare Career Starter Kit",
      source: data.utmSource || "career_starter_kit",
      question: `Path: ${data.sourcePath || "/careers"}`,
    }).catch(() => {});

    return { leadId: leadId as string, sessionId };
  });

export const ExpertConsultationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  qualification: z.string().trim().min(2, "Please select your academic qualification"),
  targetTrack: z.string().trim().min(2, "Please select your target track"),
  college: z.string().trim().max(120).optional().default(""),
  graduationYear: z.string().trim().max(20).optional().default("2026"),
  source: z.string().max(80).optional().default("talk_to_experts_modal"),
  clientFp: z.string().trim().min(16).max(64).optional(),
  whatsappOptin: z.boolean().default(true),
});

export const submitExpertConsultationLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ExpertConsultationSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    const rl = await checkRateLimit(ip, "expert_consultation", 8, 60, false);
    if (!rl.success) throw new Error("Too many requests. Please wait a minute before trying again.");

    const sb = createSafeAdminClient();
    const fp = (data.clientFp || `fp_exp_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`).slice(0, 64);

    const { data: sessionRows, error: sessionError } = await sb.rpc("ce_start_session", {
      p_stream: "healthcare-careers",
      p_device: "expert-consultation",
      p_utm_source: data.source || "talk_to_experts",
      p_user_agent: undefined,
      p_honeypot: undefined,
      p_client_fp: fp,
    });
    if (sessionError) throw new Error(sessionError.message);

    const session = Array.isArray(sessionRows) ? sessionRows[0] : sessionRows;
    const sessionId = session?.session_id as string | undefined;
    const sessionToken = session?.session_token as string | undefined;
    if (!sessionId || !sessionToken) throw new Error("Could not create lead session.");

    const effectiveEmail = data.email && data.email.trim().length > 0
      ? data.email.trim()
      : `${data.phone}@arzoncareers.in`;

    const { data: leadId, error: leadError } = await sb.rpc("ce_create_lead_early", {
      p_session_id: sessionId,
      p_session_token: sessionToken,
      p_name: data.name,
      p_phone: data.phone,
      p_email: effectiveEmail,
      p_whatsapp_optin: data.whatsappOptin,
    });
    if (leadError) throw new Error(leadError.message);

    const { data: existingLead, error: existingLeadError } = await sb
      .from("career_engine_leads")
      .select("result_payload")
      .eq("id", leadId as string)
      .maybeSingle();
    if (existingLeadError) throw new Error(existingLeadError.message);

    const { error: profileError } = await sb
      .from("career_engine_leads")
      .update({
        result_payload: {
          ...((existingLead?.result_payload && typeof existingLead.result_payload === "object" && !Array.isArray(existingLead.result_payload)) ? existingLead.result_payload : {}),
          source: data.source || "talk_to_experts",
          qualification: data.qualification,
          target_role: data.targetTrack,
          college: data.college || null,
          graduation_year: data.graduationYear || "2026",
          lead_type: "expert_profile_analysis",
          consent_timestamp: new Date().toISOString(),
        },
      })
      .eq("id", leadId as string);
    if (profileError) throw new Error(profileError.message);

    // Redundant record in counsellor_leads for counselor tracking tools
    try {
      await sb.from("counsellor_leads").insert({
        name: data.name,
        contact: data.phone,
        contact_type: "phone",
        source: data.source || "talk_to_experts",
        requested_role: data.targetTrack,
      });
    } catch {
      // Non-blocking
    }

    // Synchronous sync to Google Sheet
    await syncCounselorLeadToGoogleSheet({
      name: data.name,
      phone: data.phone,
      email: effectiveEmail,
      college: data.college || `Track: ${data.targetTrack}`,
      degree: data.qualification,
      passoutYear: data.graduationYear || "2026",
      programName: data.targetTrack,
      source: data.source || "talk_to_experts",
      question: `Expert Profile Analysis & Roadmap requested for ${data.targetTrack}`,
    }).catch(() => {});

    // Pre-formatted counselor WhatsApp text
    const waText = encodeURIComponent(
      `Hi Arzon Team! My name is ${data.name} (${data.qualification}, Class of ${data.graduationYear || "2026"}). I am interested in ${data.targetTrack} and would like to talk to an expert to evaluate my profile and discuss my next career steps.`
    );
    const whatsappLink = `https://wa.me/${COUNSELLOR_PHONE}?text=${waText}`;

    return {
      leadId: leadId as string,
      sessionId,
      whatsappLink,
    };
  });
