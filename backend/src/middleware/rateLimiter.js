const WINDOW_MS = 20 * 1000;
const MAX_REQUESTS = 10;
const requests = new Map();

export const rateLimiter = (req, res, next) => {
  const identifier = req.ip || "anonymous";
  const now = Date.now();
  const current = requests.get(identifier);

  if (!current || current.resetAt <= now) {
    requests.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return next();
  }

  current.count += 1;

  if (current.count > MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  }

  next();
};

export default rateLimiter;
