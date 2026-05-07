import { PresentationIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import api from "../api/axios";
import axios from "axios";

const NoteCard = ({ note,setNotes }) => {
  console.log(note);
  console.log(setNotes);



const handleDelete = async (e, id) => {
  console.log("🟡 Button clicked");
  console.log("ID:", id);

  e.preventDefault();

  const confirmDelete = window.confirm("Are you sure?");
  console.log("Confirm:", confirmDelete);

  if (!confirmDelete) return;

  console.log("🔵 Sending DELETE request...");

  try {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((note) => note._id !== id));// get rid of the delete one
    toast.success("Note deleted successfully ✅");
    console.log("🟢 Deleted successfully");
  } catch (error) {
    console.log("🔴 Delete error:", error);
    console.log("🔴 Error response:", error.response);
  }
};

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-champ-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PresentationIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
