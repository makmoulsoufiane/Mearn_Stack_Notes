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

    {/* NOTES */}
    {!loading && (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div key={note._id} className="h-full">
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default HomePage;
