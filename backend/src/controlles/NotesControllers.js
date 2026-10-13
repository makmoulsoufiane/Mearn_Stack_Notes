import Note from "../models/Note.js";

const noteFilter = (req) => ({ _id: req.params.id, user: req.user._id });

function noteFields(body) {
  const { title, content } = body ?? {};
  if (typeof title !== "string" || typeof content !== "string") return null;
  if (!title.trim() || !content.trim()) return null;
  return { title: title.trim(), content: content.trim() };
}

/* GET ALL NOTES */
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(notes);


  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* CREATE NOTE */
export async function createNotes(req, res) {
  try {
    const fields = noteFields(req.body);
    if (!fields) {
      return res.status(400).json({ message: "Title and content are required." });
    }
    const newNote = await Note.create({ ...fields, user: req.user._id });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne(noteFilter(req));
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
/* UPDATE NOTE */
export async function updateNotes(req, res) {
  try {
    const fields = noteFields(req.body);
    if (!fields) {
      return res.status(400).json({ message: "Title and content are required." });
    }
    const updated = await Note.findOneAndUpdate(noteFilter(req), fields, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* DELETE NOTE */
export async function deleteNotes(req, res) {
  try {
    const deleted = await Note.findOneAndDelete(noteFilter(req));

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "note deleted" });
  } catch (error) {
    console.error("Error in deleteNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}
