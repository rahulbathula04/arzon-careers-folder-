import { timingSafeEqual } from "crypto";

function safeCompare(aStr: string, bStr: string): boolean {
  if (!aStr || !bStr) return false;
  const a = Buffer.from(aStr);
  const b = Buffer.from(bStr);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Verify shared-secret / auth header for internal cron/webhook endpoints.
 * Supports:
 * - x-hook-secret header vs HOOK_SECRET
 * - Authorization: Bearer <token> vs CRON_SECRET or HOOK_SECRET
 * - apikey header vs SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY
 * Returns a 401 Response if missing/invalid, otherwise null.
 */
export function verifyHookSecret(request: Request): Response | null {
  const hookSecret = process.env.HOOK_SECRET;
  const cronSecret = process.env.CRON_SECRET || process.env.VERCEL_CRON_SECRET;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  // Extract auth headers
  const xHookSecret = request.headers.get("x-hook-secret") ?? "";
  const authHeader = request.headers.get("authorization") ?? "";
  const bearerToken = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : "";
  const apikey = request.headers.get("apikey") ?? "";

  // 1. Direct HOOK_SECRET match via header or bearer
  if (hookSecret) {
    if (safeCompare(xHookSecret, hookSecret) || safeCompare(bearerToken, hookSecret)) {
      return null;
    }
  }

  // 2. Vercel CRON_SECRET match via Authorization header
  if (cronSecret) {
    if (safeCompare(bearerToken, cronSecret) || safeCompare(xHookSecret, cronSecret)) {
      return null;
    }
  }

  // 3. Supabase pg_cron apikey / service role key match
  if (serviceRoleKey && (safeCompare(apikey, serviceRoleKey) || safeCompare(bearerToken, serviceRoleKey))) {
    return null;
  }
  if (anonKey && (safeCompare(apikey, anonKey) || safeCompare(bearerToken, anonKey))) {
    return null;
  }

  // If no secrets are configured in environment at all, reject gracefully with 401 rather than 500
  if (!hookSecret && !cronSecret && !serviceRoleKey && !anonKey) {
    console.warn("verifyHookSecret: No hook or cron secrets configured in environment.");
    return new Response(JSON.stringify({ error: "Hook secret not configured" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

