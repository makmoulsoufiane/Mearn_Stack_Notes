//import express from  "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import NoteRoutes from "../src/routes/NoteRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(rateLimiter);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

connectDB();

app.use("/api/notes", NoteRoutes);

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
