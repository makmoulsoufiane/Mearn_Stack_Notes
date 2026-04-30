import { ratelimit } from "../config/upstash.js"

  export const rateLimiter = async (req, res, next) => {
    try {
      //const ip = req.ip; // أو userId إلا عندك auth

      const {success} = await ratelimit.limit("my_limit_key");

      if (!success) {
        return res.status(429).json({
          message: "Too many requests 🚫",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Rate limit error",
      });
    }
  };

export default  rateLimiter
