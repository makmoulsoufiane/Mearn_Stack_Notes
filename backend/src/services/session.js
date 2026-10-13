import { createHash, randomBytes } from "node:crypto";
import Session from "../models/Session.js";

export const hashToken = (token) =>
  createHash("sha256").update(token).digest("hex");

export async function createSession(userId) {
  const token = randomBytes(32).toString("hex");
  await Session.create({
    tokenHash: hashToken(token),
    user: userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return token;
}
