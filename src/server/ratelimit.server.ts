import { redis } from "@/lib/redis.server";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * A lightweight Fixed Window rate limiter using Upstash Redis.
 *
 * @param identifier e.g., the IP address or User ID
 * @param action e.g., "submit_lead", "track_event"
 * @param limit Max requests allowed in the window
 * @param windowSeconds Window size in seconds
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  limit: number,
  windowSeconds: number,
  failOpen = true,
): Promise<RateLimitResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return { success: failOpen, limit, remaining: failOpen ? limit : 0, reset: Date.now() + windowSeconds * 1000 };
  }

  const key = `ratelimit:${action}:${identifier}`;

  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);

    const [count, ttl] = await pipeline.exec<[number, number]>();

    // If this is the first request in the window, set the expiry
    if (count === 1 || ttl === -1) {
      await redis.expire(key, windowSeconds);
    }

    const resetTime = Date.now() + (ttl > 0 ? ttl : windowSeconds) * 1000;
    const remaining = Math.max(0, limit - count);

    return {
      success: count <= limit,
      limit,
      remaining,
      reset: resetTime,
    };
  } catch (err) {
    console.warn(`[ratelimit] Failed to rate limit for ${key}:`, err);
    return { success: failOpen, limit, remaining: failOpen ? limit : 0, reset: Date.now() + windowSeconds * 1000 };
  }
}
