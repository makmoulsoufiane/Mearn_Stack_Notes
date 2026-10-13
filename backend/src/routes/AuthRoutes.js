import express from "express";
import { loginUser, registerUser } from "../controlles/AuthController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", requireAuth, async (req, res) => {
  try {
    await req.session.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
