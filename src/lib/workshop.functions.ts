import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { createSafeAdminClient } from "@/lib/supabaseEnv";
import { checkRateLimit } from "@/server/ratelimit.server";
import { recordServerEvent } from "@/server/analytics.server";

function admin() {
  return createSafeAdminClient();
}

const WorkshopLeadSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  phone: z.string().min(10).max(20).trim(),
  email: z.string().email().max(120).optional().or(z.literal("")).transform(v => v || null),
  degree: z.string().max(120),
  source: z.string().max(64).optional().default("workshop-page"),
  utmSource: z.string().max(64).optional().nullable(),
});

export type WorkshopLeadInput = z.infer<typeof WorkshopLeadSchema>;

export const submitWorkshopLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => WorkshopLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";

    // Rate-limit: 3 submissions per minute per IP
    const rl = await checkRateLimit(ip, "workshop_lead", 3, 60);
    if (!rl.success) {
      throw new Error("Too many requests. Please wait a moment before trying again.");
    }

    const sb = admin();

    // Upsert into applications table using the existing submit_application RPC
    const { data: id, error } = await (sb as any).rpc("submit_application", {
      p_name: data.name,
      p_email: data.email ?? `${data.phone}@workshop.lead`,
      p_phone: data.phone,
      p_program_slug: "workshop-intelligence-session",
      p_program_name: "Healthcare Career Intelligence Workshop",
      p_whatsapp_optin: true,
      p_lead_id: null,
      p_utm_source: data.utmSource ?? data.source ?? "workshop-page",
      p_user_agent: null,
    });

    if (error) {
      console.error("[workshop] submitWorkshopLead failed", error);
      throw new Error(error.message);
    }

    // Fire analytics event
    await recordServerEvent({
      event_name: "workshop_lead_submitted",
      application_id: id as string,
      program_slug: "workshop-intelligence-session",
      props: {
        degree: data.degree,
        source: data.source ?? "workshop-page",
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
