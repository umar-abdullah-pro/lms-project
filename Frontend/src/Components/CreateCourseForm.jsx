// Frontend/src/Pages/CreateCourse.jsx
import { useEffect } from "react";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";

const CreateCourse = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  // The Bridge: Redirect the instructor to their new course page when successful!
  useEffect(() => {
    if (actionData?.success) {
      alert("Course created successfully! Let's add some lessons.");
      console.log(
        "🚀 5. Redirecting to the new course's lessons page:",
        actionData.courseId,
      );
      // Assuming you have a route to manage the specific course they just built
      navigate(`/course/${actionData.courseId}`);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen px-6 py-12 bg-brand-beige md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Create a
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">
              New Course
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your knowledge with the Learnly community.
          </p>
        </div>

        <div className="p-10 bg-white border border-gray-100 shadow-sm rounded-4xl">
          {/* Show Errors from Action */}
          {actionData?.error && (
            <div className="p-4 mb-6 text-sm font-medium text-red-600 bg-red-50 rounded-xl">
              {actionData.error}
            </div>
          )}

          {/* Important: encType is required for file uploads (like thumbnails) */}
          <Form
            method="post"
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Advanced React Patterns"
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
                rows="4"
                placeholder="What will students learn in this course?"
                className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                  required
                >
                  <option value="">Select a category...</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Price (INR)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 transition-colors bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Course Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="w-full px-4 py-2 transition-colors bg-white border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-purple/10 file:text-brand-purple hover:file:bg-brand-purple/20"
              />
            </div>

            <div className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl bg-gray-50">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                value="true"
                className="w-6 h-6 text-brand-purple bg-white border-gray-300 rounded cursor-pointer focus:ring-brand-purple focus:ring-2"
              />
              <label htmlFor="isPublished" className="cursor-pointer">
                <span className="block text-sm font-bold text-gray-700">
                  Publish immediately?
                </span>
                <span className="block text-sm font-medium text-gray-500">
                  If unchecked, this course will be hidden from students as a
                  draft.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-8 text-white font-bold bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 text-lg shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)]"
            >
              {isSubmitting ? "Publishing Course..." : "Create Course"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
