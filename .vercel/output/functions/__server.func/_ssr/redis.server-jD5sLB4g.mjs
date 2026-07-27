import { R as Redis2 } from "../_libs/upstash__redis.mjs";
const redis = new Redis2({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ""
});
export {
  redis as r
};
