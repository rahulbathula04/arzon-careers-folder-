import { Redis } from "@upstash/redis";

const hasRedisConfig =
  typeof process !== "undefined" &&
  Boolean(process.env?.UPSTASH_REDIS_REST_URL && process.env?.UPSTASH_REDIS_REST_TOKEN);

export const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : ({
      get: async () => null,
      set: async () => null,
      setex: async () => null,
      del: async () => 0,
      incr: async () => 1,
      expire: async () => 1,
      lpush: async () => 0,
      lrange: async () => [],
      ltrim: async () => "OK",
      pipeline: () => ({
        incr: () => {},
        expire: () => {},
        exec: async () => [1, 1],
      }),
    } as unknown as Redis);
