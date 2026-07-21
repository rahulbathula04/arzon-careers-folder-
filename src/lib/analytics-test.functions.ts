import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/server/analytics.server";
import { requireAdmin } from "@/server/auth-guards.server";

export const clearTestEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);

    const { error, count } = await supabaseAdmin
      .from("analytics_events")
      .delete({ count: "exact" })
      .filter("props->>test", "eq", "true");
    if (error) throw new Error(error.message);
    return { deleted: count ?? 0 };
  });
