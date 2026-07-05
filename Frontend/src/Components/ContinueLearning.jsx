import { Link } from "react-router-dom";
import ProgressCourseCard from "./ProgressCourseCard";
import { HiOutlineLink } from "react-icons/hi2";

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
          <HiOutlineLink className="w-5 h-5" />
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
            to="/all-courses"
            className="px-6 py-3 font-bold text-white bg-brand-coral rounded-full hover:bg-[#ff554a] transition-colors"
          >
            Find a Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((enrollment, index) => {
            // Calculate dynamic progress
            // 'enrollment.course' is the course data, 'enrollment.completedLessons' is the progress array
            const totalLessons = enrollment.course?.lessons?.length || 1;
            const completedLessons = enrollment.completedLessons?.length || 0;
            const progress = Math.round(
              (completedLessons / totalLessons) * 100,
            );

            return (
              <ProgressCourseCard
                key={enrollment._id}
                course={enrollment.course} // Pass the course object
                index={index}
                progress={progress} // Pass the real calculated percentage
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ContinueLearning;
