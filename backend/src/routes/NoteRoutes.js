import express from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import {
  getAllNotes,
  createNotes,
  getNoteById,
  updateNotes,

  deleteNotes,
} from "../controlles/NotesControllers.js";

const router = express.Router();

router.use(requireAuth);
router.param("id", (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  next();
});

// GET all notes
router.get("/", getAllNotes);

// CREATE note
router.post("/", createNotes);

router.get("/:id", getNoteById);

// UPDATE note
router.put("/:id", updateNotes);

// DELETE note
router.delete("/:id", deleteNotes);



export default router;
