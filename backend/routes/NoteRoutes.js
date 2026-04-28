import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).send("you just fetch the notes");
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "note created  succed" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "note update  succed" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "note deleted  succed" });
});



export default router;
