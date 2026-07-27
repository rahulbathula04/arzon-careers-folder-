import { createHash } from "crypto";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
function hashIp(ip) {
  const salt = process.env.ANALYTICS_IP_SALT;
  if (!salt || salt.length < 16) {
    return null;
  }
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
async function recordServerEvent(input) {
  try {
    await supabaseAdmin.rpc("track_event", {
      p_event_name: input.event_name,
      p_user_id: input.user_id ?? void 0,
      p_application_id: input.application_id ?? void 0,
      p_lead_id: input.lead_id ?? void 0,
      p_program_slug: input.program_slug ?? void 0,
      p_props: input.props ?? {}
    });
  } catch (err) {
    console.error("[analytics] recordServerEvent failed", err);
  }
}
export {
  hashIp as h,
  recordServerEvent as r
};
