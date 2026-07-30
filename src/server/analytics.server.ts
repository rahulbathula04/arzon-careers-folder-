import { createHash } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.ANALYTICS_IP_SALT;
  if (!salt || salt.length < 16) {
    // Fail closed for storage - if no strong salt is configured, skip
    // IP hashing entirely rather than persisting a weakly-salted hash
    // (IPv4 is small enough to be reversed via rainbow table when the
    // salt is predictable). Analytics still records the event without IP.
    return null;
  }
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function recordServerEvent(input: {
  event_name: string;
  user_id?: string | null;
  application_id?: string | null;
  lead_id?: string | null;
  program_slug?: string | null;
  props?: Record<string, unknown>;
}) {
  try {
    await supabaseAdmin.rpc("track_event", {
      p_event_name: input.event_name,
      p_user_id: input.user_id ?? undefined,
      p_application_id: input.application_id ?? undefined,
      p_lead_id: input.lead_id ?? undefined,
      p_program_slug: input.program_slug ?? undefined,
      p_props: (input.props ?? {}) as never,
    });
  } catch (err) {
    console.error("[analytics] recordServerEvent failed", err);
  }
}

export { supabaseAdmin };
