import Session from "../models/Session.js";
import { hashToken } from "../services/session.js";

export async function requireAuth(req, res, next) {
  const match = req.get("Authorization")?.match(/^Bearer ([a-f0-9]{64})$/);
  if (!match) return res.status(401).json({ message: "Please log in." });

  try {
    const session = await Session.findOne({
      tokenHash: hashToken(match[1]),
      expiresAt: { $gt: new Date() },
    }).populate("user");

    if (!session?.user) {
      return res.status(401).json({ message: "Please log in again." });
    }

    req.user = session.user;
    req.session = session;
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(500).json({ message: "Server error" });
  }
}
