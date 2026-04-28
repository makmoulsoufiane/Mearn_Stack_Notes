//import express from  "express";

const express = require("express");
import NoteRoutes from "./routes/NoteRoutes.js";
const app = express();

app.use("api/notes", NoteRoutes);

app.listen(5001, () => {
  console.log("server post is 5001");
  console.log("moha souf");
});
