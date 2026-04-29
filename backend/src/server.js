//import express from  "express";

import express from "express";
import NoteRoutes from "../src/routes/NoteRoutes.js";
import { connectDB } from "../src/config/db.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;
connectDB();



app.use("/api/notes", NoteRoutes);

app.listen(PORT, () => {
  console.log("server running on port :", 5001);

});
