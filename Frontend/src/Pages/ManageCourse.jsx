import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
//import { LiaFileUploadSolid } from "react-icons/lia";

const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video");

    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("video", videoFile); // Must match upload.single("video") in backend

    try {
      await axios.post(
        `http://localhost:3000/api/courses/${id}/lessons`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Lesson uploaded!");
      navigate(`/course/${id}`);
    } catch (err) {
      alert("Upload failed: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white rounded-4xl max-w-2xl mx-auto mt-10 shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add New Lesson</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Lesson Title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="w-full p-3 border rounded-xl"
          placeholder="Description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {/* <LiaFileUploadSolid /> */}
        <input
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
          accept="video/*"
          required
        />
        <button
          disabled={loading}
          className="w-full py-3 bg-brand-purple text-white rounded-xl font-bold"
        >
          {loading ? "Uploading to Cloudinary..." : "Upload Lesson"}
        </button>
      </form>
    </div>
  );
};

export default ManageCourse;
