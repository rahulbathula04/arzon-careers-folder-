import { getRequest } from "@tanstack/react-start/server";
import { checkRateLimit } from "@/server/ratelimit.server";

/**
 * Returns a proxy-provided client address for abuse controls.
 * This is intentionally only used for rate limiting, never authorization.
 */
export function getClientRateLimitKey(): string {
  const request = getRequest();
  const headers = request?.headers;
  const forwarded =
    headers?.get("x-vercel-forwarded-for") ??
    headers?.get("x-real-ip") ??
    headers?.get("cf-connecting-ip") ??
    headers?.get("x-forwarded-for") ??
    "";
  const ip = forwarded.split(",")[0]?.trim();
  return ip && ip.length <= 128 ? ip : "unknown";
}

export async function enforcePublicRateLimit(
  action: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const key = getClientRateLimitKey();
  const result = await checkRateLimit(key, action, limit, windowSeconds);
  return result.success;
}
