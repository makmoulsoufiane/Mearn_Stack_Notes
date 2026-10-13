import User from "../models/User.js";
import { createSession } from "../services/session.js";
import { comparePassword, hashPassword } from "../utils/password.js";

const createUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword(password),
    });

    res.status(201).json({
      message: "Account created successfully.",
      user: createUserResponse(user),
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordIsValid = comparePassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Logged in successfully.",
      token: await createSession(user._id),
      user: createUserResponse(user),
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
