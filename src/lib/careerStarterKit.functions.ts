import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";

const LeadMagnetSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[0-9]{10,15}$/),
  qualification: z.string().trim().min(2).max(120),
  whatsappOptin: z.boolean(),
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
      p_user_agent: null,
      p_honeypot: null,
      p_client_fp: fp.slice(0, 64),
    });
    if (sessionError) throw new Error(sessionError.message);

    const session = Array.isArray(sessionRows) ? sessionRows[0] : sessionRows;
    const sessionId = session?.session_id as string | undefined;
    if (!sessionId) throw new Error("Could not create a lead session.");

    const { data: leadId, error: leadError } = await sb.rpc("ce_create_lead_early", {
      p_session_id: sessionId,
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
          ...(existingLead?.result_payload ?? {}),
          source: "careers_starter_kit",
          source_path: data.sourcePath ?? "/careers",
          qualification: data.qualification,
          lead_magnet: "2026 Healthcare Career Starter Kit",
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

    return { leadId: leadId as string, sessionId };
  });
