//import express from  "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import NoteRoutes from "../src/routes/NoteRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();



console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


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
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
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
    console.error("Database connection failed:", err);
  });
