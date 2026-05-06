import React, { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"; // تأكد من path
import { Link } from "react-router";
const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });

      console.log("Data:", response.data);

      // reset form
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center p-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* FORM */}
      {!loading && (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <Link to={"/"}>back to home page</Link>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <textarea
            placeholder="Content"
            className="border p-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePage;
