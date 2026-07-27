import { r as redis } from "./redis.server-jD5sLB4g.mjs";
async function checkRateLimit(identifier, action, limit, windowSeconds) {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return { success: true, limit, remaining: limit, reset: Date.now() + windowSeconds * 1e3 };
  }
  const key = `ratelimit:${action}:${identifier}`;
  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);
    const [count, ttl] = await pipeline.exec();
    if (count === 1 || ttl === -1) {
      await redis.expire(key, windowSeconds);
    }
    const resetTime = Date.now() + (ttl > 0 ? ttl : windowSeconds) * 1e3;
    const remaining = Math.max(0, limit - count);
    return {
      success: count <= limit,
      limit,
      remaining,
      reset: resetTime
    };
  } catch (err) {
    console.warn(`[ratelimit] Failed to rate limit for ${key}:`, err);
    return { success: true, limit, remaining: limit, reset: Date.now() + windowSeconds * 1e3 };
  }
}
export {
  checkRateLimit as c
};
