import { redis } from "@/lib/redis.server";

/**
 * Generic wrapper to cache a heavy async operation in Upstash Redis.
 *
 * @param key Unique cache key
 * @param ttlSeconds Time-to-live in seconds
 * @param fetcher Async function to execute on cache miss
 * @returns Cached or fresh data
 */
export async function withCache<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    // Graceful fallback if Redis isn't configured
    return fetcher();
  }

  try {
    const cached = await redis.get<T>(key);
    if (cached !== null) {
      return cached;
    }
  } catch (err) {
    console.warn(`[cache] Failed to GET key "${key}":`, err);
  }

  const fresh = await fetcher();

  try {
    await redis.set(key, fresh, { ex: ttlSeconds });
  } catch (err) {
    console.warn(`[cache] Failed to SET key "${key}":`, err);
  }

  return fresh;
}
