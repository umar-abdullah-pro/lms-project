import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to create course. Make sure you are logged in as an Instructor.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-8 bg-white border border-gray-100 shadow-sm md:p-10 rounded-[2rem]">
        {error && (
          <div className="p-4 mb-6 text-sm font-medium text-red-600 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Course title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Intro to Calculus"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="What will students be able to do after this course?"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Price (USD — leave at 0 for a free course)
            </label>
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 font-bold text-white transition-all transform rounded-full bg-brand-coral hover:bg-[#ff554a] shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "Creating..."
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create course
              </>
            )}
          </button>
        </form>
      </div>

      {/* Back Link positioned right below the form card */}
      <div className="mt-8 text-center md:text-left">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 font-bold transition-colors text-brand-purple hover:text-indigo-800"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to dashboard
        </Link>
      </div>
    </>
  );
};

export default CreateCourseForm;
