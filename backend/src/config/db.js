import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI environment variable.");
  }

  mongoose.set("bufferCommands", false);
  await mongoose.connect(process.env.MONGO_URI);
};
