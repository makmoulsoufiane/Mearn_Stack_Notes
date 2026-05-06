import React, { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"; // تأكد من path
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title || !content) {
  toast.error("Title and content are required ❌");
  return;
}
   setLoading(true);

    try {
        const response = await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });
      toast.success("Note created successfully ✅");
      navigate("/");
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
      <h1 className="text-green-700 p-4 text-xl text-center font-bold">CREATE PAGE</h1>
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
