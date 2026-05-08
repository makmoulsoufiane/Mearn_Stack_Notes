import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const res = await api.get("/notes");

        setNotes(res.data);
      } catch (error) {
        console.log("error fetching notes");

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimited />}

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/70">Loading notes...</p>
        </div>
      )}

      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            No Notes Yet
          </h2>

          <p className="text-lg text-gray-500 text-center max-w-md">
            You don’t have any notes right now. Start by creating your first
            note 🚀
          </p>
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
