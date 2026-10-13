import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axios";
import { notesPath } from "../utils/notesPath";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const navigate = useNavigate();

  const handledelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    setSaving(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate(notesPath());
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete this note.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {


    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title: note.title, content: note.content });

      toast.success("Note update successfully ✅");
      navigate(notesPath());

      // reset form

    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save this note.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setNote(null);
      try {
        const res = await api.get(`/notes/${id}`);
        if (active) setNote(res.data);
      } catch (error) {
        if (active) setError(error.response?.data?.message || "Could not load this note. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => { active = false; };
  }, [id, retry]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!note) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p role="alert">{error || "Note not found."}</p>
        <div className="mt-4 flex gap-3">
          <button className="btn btn-ghost" onClick={() => navigate(notesPath())}>Back to Notes</button>
          <button className="btn btn-outline" onClick={() => setRetry((value) => value + 1)}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(notesPath())}
            className="btn btn-ghost btn-sm"
          >
            ← Back to Notes
          </button>

          <button className="btn btn-error btn-sm" onClick={handledelete} disabled={saving}>Delete</button>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Title input */}
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />

            {/* Content input */}
            <label className="label mt-4">
              <span className="label-text">Content</span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full min-h-40"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />

            {/* Save button */}
            <div className="flex justify-end mt-6">
              <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
