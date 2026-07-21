import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SubmitSchema = z.object({
  route: z.string().min(1).max(200),
  surface: z.string().max(120).optional(),
  reason: z.enum(["sounds_ai", "not_verified", "wrong_data", "other"]),
  note: z.string().max(1000).optional(),
  userAgent: z.string().max(500).optional(),
});

/**
 * Public submission endpoint for the "sounds AI / not verified" prompt.
 * Uses service-role inside the handler so no anon GRANT is needed.
 * No PII is collected; note field is bounded and user-controlled.
 */
export const submitAiFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SubmitSchema.parse(d ?? {}))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("ai_feedback").insert({
      route: data.route,
      surface: data.surface ?? null,
      reason: data.reason,
      note: data.note ?? null,
      user_agent: data.userAgent ?? null,
    });
    if (error) {
      console.error("[ai-feedback] insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
