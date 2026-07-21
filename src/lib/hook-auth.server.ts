import { timingSafeEqual } from "crypto";

/**
 * Verify shared-secret header for internal cron/webhook endpoints.
 * Returns a 401 Response if missing/invalid, otherwise null.
 */
export function verifyHookSecret(request: Request): Response | null {
  const expected = process.env.HOOK_SECRET;
  if (!expected) {
    return new Response("Hook secret not configured", { status: 500 });
  }
  const provided = request.headers.get("x-hook-secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}
