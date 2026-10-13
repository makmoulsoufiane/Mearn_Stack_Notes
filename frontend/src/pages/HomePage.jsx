import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react"
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/notes");

        setNotes(res.data);
      } catch (error) {
        setError(error.response?.data?.message || "Could not load your notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [retry]);

  return (
    <div className="min-h-screen">
      <NavBar />

      {error && (
        <div role="alert" className="mx-auto max-w-6xl p-6">
          <p>{error}</p>
          <button className="btn btn-outline mt-4" onClick={() => setRetry((value) => value + 1)} disabled={loading}>
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/70">Loading notes...</p>
        </div>
      )}

      {!loading && !error && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            No Notes Yet
          </h2>

          <p className="text-lg text-gray-500 text-center max-w-md">
            You don’t have any notes right now. Start by creating your first
            note 🚀
          </p>
          <div className="p-4">
             <Link
            to="/create"
            className="btn btn-success flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Your First Note</span>
          </Link>
          </div>

        </div>
      )}

      {/* NOTES */}
      {!loading && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <div key={note._id} className="h-full">
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
