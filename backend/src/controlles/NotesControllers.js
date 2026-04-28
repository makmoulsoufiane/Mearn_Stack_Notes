export function getAllNotes(req, res) {
  res.status(200).send("you just fetch the notes");
}

export function createNotes(req, res) {
  res.status(201).json({ message: "note created  succed" });
}

export function updateNotes(req, res) {
  res.status(200).json({ message: "note update  succed" });
}

export function deleteNotes(req, res) {
  res.status(200).json({ message: "note deleted  succed" });
}
