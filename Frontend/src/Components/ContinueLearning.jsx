import { Link } from "react-router-dom";
import ProgressCourseCard from "./ProgressCourseCard";

const ContinueLearning = ({ enrolledCourses, loading }) => {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          Continue learning
        </h2>
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-brand-purple hover:text-indigo-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          Browse more
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-xl font-bold text-center text-gray-400">
          Loading your progress...
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-gray-100 rounded-3xl">
          <p className="mb-4 text-lg font-medium text-gray-500">
            You haven't started any courses yet.
          </p>
          <Link
            to="/"
            className="px-6 py-3 font-bold text-white bg-brand-coral rounded-full hover:bg-[#ff554a] transition-colors"
          >
            Find a Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course, index) => {
            // Mocking individual course progress based on index for the visual
            const mockProgress = index === 0 ? 50 : 33;
            return (
              <ProgressCourseCard
                key={course._id}
                course={course}
                index={index}
                progress={mockProgress}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ContinueLearning;
