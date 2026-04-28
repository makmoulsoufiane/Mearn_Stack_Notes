//import express from  "express";

import express from "express";
import NoteRoutes from '../src/routes/NoteRoutes.js'
const app = express();

app.use("/api/notes",NoteRoutes)

app.listen(5001,() => {
  console.log("server post is 5001");
  console.log("moha souf");


});
