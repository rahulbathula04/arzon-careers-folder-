import { redis, isRedisConfigured } from "@/lib/redis.server";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Distributed fixed-window rate limiting.
 *
 * Production security controls must fail closed when Redis is unavailable or
 * not configured. Non-security telemetry can explicitly opt into fail-open.
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  limit: number,
  windowSeconds: number,
  failOpen = true,
): Promise<RateLimitResult> {
  const production = process.env.NODE_ENV === "production";

  if (!isRedisConfigured) {
    const success = production ? false : failOpen;
    return {
      success,
      limit,
      remaining: success ? limit : 0,
      reset: Date.now() + windowSeconds * 1000,
    };
  }

  const key = `ratelimit:${action}:${identifier}`;

  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);

    const [count, ttl] = await pipeline.exec<[number, number]>();

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
    const success = production ? false : failOpen;
    return {
      success,
      limit,
      remaining: success ? limit : 0,
      reset: Date.now() + windowSeconds * 1000,
    };
  }
}
