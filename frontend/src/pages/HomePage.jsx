import React, { useState, useEffect } from "react";
import axios from "axios";

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

        const res = await axios.get("http://localhost:5001/api/notes");

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

      {/* LOADING */}


      {/* NOTES */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note}  />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
