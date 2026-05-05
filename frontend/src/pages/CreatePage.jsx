import React from 'react';
import axios from "axios";
const CreatePage = () => {
  const [newNote, setnewNote] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchnewNote = async () => {
      try {
        setLoading(true);

        const res = await axios.post("http://localhost:5001/api/notes");

        setnewNote(res.data);

      } catch (error) {
        console.log("error fetching notes");

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchnewNote();
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

      {/*NOTES */}
      {!loading &&
        notes.map((note) => (
          <div key={note._id} className="p-3 border-b">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
    </div>
  );


}

export default CreatePage
