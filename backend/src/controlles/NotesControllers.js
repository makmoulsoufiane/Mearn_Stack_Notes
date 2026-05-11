import Note from "../models/Note.js";

/* GET ALL NOTES */
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);


  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* CREATE NOTE */
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({title,content,});

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
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
    const updated = await Note.findByIdAndUpdate(req.params.id,req.body,{ new: true });

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
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "note deleted" });
  } catch (error) {
    console.error("Error in deleteNotes:", error);
    res.status(500).json({ message: "Server error" });
  }
}
