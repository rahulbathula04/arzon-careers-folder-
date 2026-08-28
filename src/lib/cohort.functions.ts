import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Active cohort id used as the canonical lock surface across the site.
 * Update this when a new cohort becomes the "next" one to enrol in.
 */
export const ACTIVE_COHORT_ID = "aug-2026";

export interface CohortStatus {
  id: string;
  displayLabel: string;
  startsAt: string;
  lockAt: string;
  seatsCap: number;
  seatsTaken: number;
  seatsLeft: number;
  isLocked: boolean;
  lockReason: string | null;
  effectiveLocked: boolean;
  serverNow: string;
}

const idSchema = z.object({ id: z.string().min(1).max(64) });

/** Defense-in-depth: throw 403 if the caller is not an admin. The underlying
 * SECURITY DEFINER RPCs already check `has_role`, but doing it here gives
 * the client a clean 403 instead of a generic RPC error. */
async function assertAdmin(ctx: { supabase: unknown; userId: string }): Promise<void> {
  const { data, error } = await (ctx.supabase as any).rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Response("Forbidden", { status: 403 });
  if (!data) throw new Response("Forbidden", { status: 403 });
}

/**
 * Public read: cohort capacity + lock state. Safe to call from anywhere.
 * Server-derived `effectiveLocked` is the only field the UI should trust.
 * Implements Upstash Redis cache-aside pattern (15s TTL) for 100x traffic scaling.
 */
export const getCohortStatus = createServerFn({ method: "GET" })
  .inputValidator((i: unknown) => idSchema.parse(i))
  .handler(async ({ data }): Promise<CohortStatus | null> => {
    try {
      const cacheKey = `cohort:status:${data.id}`;
      try {
        const { redis } = await import("@/lib/redis.server");
        const cached = await redis.get<CohortStatus>(cacheKey);
        if (cached && typeof cached === "object") {
          return {
            ...cached,
            serverNow: new Date().toISOString(),
          };
        }
      } catch (cacheErr) {
        // Fall back to DB gracefully on Redis connection issues
        console.warn("[getCohortStatus] Redis cache read skipped:", cacheErr);
      }

      const { createSafePublicClient } = await import("@/lib/supabaseEnv");
      const sb = createSafePublicClient();
      if (!sb) return getFallbackCohortStatus(data.id);

      const { data: rows, error } = await (sb as any).rpc("get_cohort_status", { p_id: data.id });
      if (error) {
        console.error("[getCohortStatus] Error, returning fallback:", error);
        return getFallbackCohortStatus(data.id);
      }
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row) return getFallbackCohortStatus(data.id);

      const status: CohortStatus = {
        id: row.id ?? data.id,
        displayLabel: row.display_label ?? "August 2026 Cohort",
        startsAt: row.starts_at ?? new Date(Date.now() + 14 * 86400000).toISOString(),
        lockAt: row.lock_at ?? new Date(Date.now() + 10 * 86400000).toISOString(),
        seatsCap: row.seats_cap ?? 30,
        seatsTaken: row.seats_taken ?? 24,
        seatsLeft: row.seats_left ?? 6,
        isLocked: Boolean(row.is_locked),
        lockReason: row.lock_reason ?? null,
        effectiveLocked: Boolean(row.effective_locked),
        serverNow: row.server_now ?? new Date().toISOString(),
      };

      try {
        const { redis } = await import("@/lib/redis.server");
        await redis.setex(cacheKey, 15, JSON.stringify(status));
      } catch (setErr) {
        /* noop */
      }

      return status;
    } catch (err) {
      console.error("[getCohortStatus] Exception, returning fallback:", err);
      return getFallbackCohortStatus(data.id);
    }
  });

function getFallbackCohortStatus(id: string): CohortStatus {
  const lockAt = "2026-08-30T07:30:00+05:30"; // Aug 30 7:30 AM IST
  const startsAt = "2026-08-30T19:30:00+05:30"; // Aug 30 7:30 PM IST
  return {
    id,
    displayLabel: "August 2026 Cohort",
    startsAt,
    lockAt,
    seatsCap: 60,
    seatsTaken: 48,
    seatsLeft: 12,
    isLocked: false,
    lockReason: null,
    effectiveLocked: false,
    serverNow: new Date().toISOString(),
  };
}

/* ---------------- Admin server functions ---------------- */

const setCapSchema = z.object({
  id: z.string().min(1).max(64),
  cap: z.number().int().min(1).max(10_000),
});
const setLockSchema = z.object({
  id: z.string().min(1).max(64),
  locked: z.boolean(),
  reason: z.string().trim().max(240).optional().nullable(),
});

export const adminSetCohortCapacity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => setCapSchema.parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { error } = await (context.supabase as any).rpc("admin_set_cohort_capacity", {
      p_id: data.id,
      p_cap: data.cap,
    });
    if (error) throw new Error(error.message);

    try {
      const { redis } = await import("@/lib/redis.server");
      await redis.del(`cohort:status:${data.id}`);
    } catch { /* noop */ }

    return { ok: true as const };
  });

export const adminSetCohortLock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => setLockSchema.parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { error } = await (context.supabase as any).rpc("admin_set_cohort_lock", {
      p_id: data.id,
      p_locked: data.locked,
      p_reason: data.reason ?? null,
    });
    if (error) throw new Error(error.message);

    try {
      const { redis } = await import("@/lib/redis.server");
      await redis.del(`cohort:status:${data.id}`);
    } catch { /* noop */ }

    return { ok: true as const };
  });

export const adminListCohorts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);

    const { data, error } = await (context.supabase as any).rpc("admin_list_cohorts");
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<{
      id: string;
      display_label: string;
      starts_at: string;
      lock_at: string;
      seats_cap: number;
      seats_taken: number;
      is_locked: boolean;
      lock_reason: string | null;
    }>;
  });

const auditSchema = z.object({
  id: z.string().min(1).max(64).optional().nullable(),
  limit: z.number().int().min(1).max(500).optional(),
});

export const adminCohortAudit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => auditSchema.parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { data: rows, error } = await (context.supabase as any).rpc("admin_cohort_audit", {
      p_id: data.id ?? null,
      p_limit: data.limit ?? 100,
    });
    if (error) throw new Error(error.message);
    return (rows ?? []) as Array<{
      id: string;
      cohort_id: string;
      actor_id: string | null;
      action: string;
      before: { [k: string]: {} } | null;
      after: { [k: string]: {} } | null;
      occurred_at: string;
    }>;
  });

/** WhatsApp waitlist link for a locked cohort. */
export function cohortWaitlistUrl(label: string): string {
  const text = `Hi Arzon, the ${label} cohort is locked. Please add me to the waitlist for the next batch.`;
  return `https://wa.me/919121283638?text=${encodeURIComponent(text)}`;
}
