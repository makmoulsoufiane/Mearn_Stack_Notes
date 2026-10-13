import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

const TEST_USER = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

export const seedTestUser = async () => {
  if (process.env.NODE_ENV === "production") return;

  const existingUser = await User.findOne({ email: TEST_USER.email });

  if (existingUser) return;

  await User.create({
    name: TEST_USER.name,
    email: TEST_USER.email,
    password: hashPassword(TEST_USER.password),
  });

  console.log(`Test user ready: ${TEST_USER.email}`);
};
