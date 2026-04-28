import express from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from "../controlles/NotesControllers.js";

const router = express.Router();

// GET all notes
router.get("/", getAllNotes);

// CREATE note
router.post("/", createNotes);

// UPDATE note (you can add :id later)
router.put("/:id", updateNotes);

// DELETE note
router.delete("/:id", deleteNotes);

export default router;
