import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

const CourseHeader = ({ course }) => {
  return (
    <div className="mb-12">
      <Link
        to="/all-courses"
        className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
      >
        <HiOutlineArrowLeft className="w-4 h-4" strokeWidth={3} />
        Back to courses
      </Link>

      <div>
        <div className="inline-flex px-3 py-1 mb-6 text-xs font-bold rounded-full w-fit bg-[#ffedec] text-[#ff7970]">
          Taught by {course?.instructor?.name || "Instructor"}
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
          {course?.title || "Loading Title..."}
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-500">
          {course?.description || "Loading description..."}
        </p>
      </div>
    </div>
  );
};

export default CourseHeader;
