import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../api/axios";
const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handledelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    console.log("Confirm:", confirmDelete);
    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note update successfully ✅");
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }

  }

  const handleSave = async (e) => {


    setLoading(true);
    try {
      const response = await api.put(`/notes/${id}`, note);

      toast.success("Note update successfully ✅");
      navigate("/");
      console.log("Data:", response.data);

      // reset form

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!note) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost btn-sm"
          >
            ← Back to Notes
          </button>

          <button className="btn btn-error btn-sm" onClick={handledelete}>Delete</button>
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
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
