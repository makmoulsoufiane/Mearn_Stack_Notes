import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      {loading && (
        <div className="flex justify-center items-center p-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* NOTES */}
      {!loading &&
        notes.map((note) => (
          <div key={note._id} className="p-3 border-b">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
