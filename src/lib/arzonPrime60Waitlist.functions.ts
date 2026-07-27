import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getRequestHeader } from "@tanstack/react-start/server";
import { recordServerEvent } from "@/server/analytics.server";

import { createSafeAdminClient } from "@/lib/supabaseEnv";

function admin() {
  return createSafeAdminClient();
}

const JoinSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  name: z.string().trim().min(1).max(120).optional().nullable(),
  phone: z
    .string()
    .trim()
    .min(5)
    .max(20)
    .regex(/^[+\d][\d\s()-]*$/)
    .optional()
    .nullable(),
  tier: z.string().trim().min(1).max(40).optional().nullable(),
  intentId: z.string().uuid().optional().nullable(),
  leadId: z.string().uuid().optional().nullable(),
  sessionId: z.string().uuid().optional().nullable(),
  reason: z.enum(["reminder", "early_access"]).default("reminder"),
  source: z.string().trim().min(1).max(40).optional().nullable(),
});

export const joinPrime60Waitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => JoinSchema.parse(data))
  .handler(async ({ data }) => {
    const sb = admin();
    const userAgent = getRequestHeader("user-agent") ?? null;

    // Dedup by (lower(email), reason) within the last 24h so we don't
    // pile up duplicate rows when a user retries.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await sb
      .from("arzonprime60_waitlist")
      .select("id")
      .eq("email", data.email)
      .eq("reason", data.reason)
      .gte("created_at", since)
      .is("deleted_at", null)
      .limit(1)
      .maybeSingle();

    if (existing) {
      return { ok: true as const, deduped: true as const };
    }

    const { error } = await sb.from("arzonprime60_waitlist").insert({
      email: data.email,
      name: data.name ?? null,
      phone: data.phone ?? null,
      tier: data.tier ?? null,
      intent_id: data.intentId ?? null,
      lead_id: data.leadId ?? null,
      session_id: data.sessionId ?? null,
      reason: data.reason,
      source: data.source ?? null,
      user_agent: userAgent,
    });
    if (error) throw new Error(error.message);

    await recordServerEvent({
      event_name: "arzonprime60_waitlist_joined",
      props: {
        reason: data.reason,
        source: data.source ?? null,
        tier: data.tier ?? null,
        has_phone: !!data.phone,
      },
      lead_id: data.leadId ?? null,
    }).catch(() => {});

    return { ok: true as const, deduped: false as const };
  });
