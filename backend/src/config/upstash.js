import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const envPath = fileURLToPath(new URL("../../.env", import.meta.url));
dotenv.config({ path: envPath });

const requiredEnvVars = ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
const hasUpstashConfig = missingEnvVars.length === 0;

if (!hasUpstashConfig) {
  console.warn(
    `Rate limiter disabled. Missing Upstash Redis environment variables: ${missingEnvVars.join(", ")}.`
  );
}

// create ratelimit to allow 10 request per 20 second
export const ratelimit = hasUpstashConfig
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "10 s"),
    })
  : null;

export default ratelimit;
