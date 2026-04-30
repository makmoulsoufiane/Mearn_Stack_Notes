import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv, { configDotenv } from "dotenv";

dotenv.config();
// create ratelimit to allow 10 request per 20 second
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export default ratelimit;
