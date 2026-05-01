//import express from  "express";

import express from "express";
import NoteRoutes from "../src/routes/NoteRoutes.js";
import { connectDB } from "../src/config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
const app = express();

dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;
connectDB();

//middleware
app.use(express.json());
app.use(rateLimiter)
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
