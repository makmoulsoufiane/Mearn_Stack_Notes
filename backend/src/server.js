import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import NoteRoutes from "../src/routes/NoteRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const app = express();

const PORT = process.env.PORT || 5001;


// middleware
app.use(express.json());
app.use(rateLimiter);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/notes", NoteRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("server running on port :", PORT);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
