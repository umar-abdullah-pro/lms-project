import { useLoaderData, Link, useFetcher } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  FiBookOpen,
  FiUsers,
  FiEdit3,
  FiPlusCircle,
  FiTrendingUp,
  FiTrash2,
} from "react-icons/fi";
import Footer from "../../components/Footer";
import { confirmAction } from "../../utils/alertUtils";

const InstructorDashboard = ({ onToggle }) => {
  const fetcher = useFetcher();
  const { user } = useAuth();

  const { instructorCourses } = useLoaderData();

  const totalCourses = instructorCourses?.length || 0;
  const totalStudents =
    instructorCourses?.reduce((sum, course) => sum + course.studentCount, 0) ||
    0;

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Instructor Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Welcome back,{" "}
              <span className="font-bold text-brand-purple">{user?.name}</span>!
              Here's how your courses are doing.
            </p>
          </div>

          <Link
            to="/create-course"
            className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all rounded-xl bg-brand-purple hover:shadow-lg hover:-translate-y-0.5"
          >
            <FiPlusCircle className="w-5 h-5" />
            Create New Course
          </Link>
        </div>

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2">
          <div className="flex items-center gap-5 p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
            <div className="p-4 text-brand-purple bg-[#f0f2ff] rounded-2xl">
              <FiBookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                Total Courses
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {totalCourses}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
            <div className="p-4 text-green-600 bg-green-50 rounded-2xl">
              <FiTrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                Total Students
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {totalStudents}
              </h2>
            </div>
          </div>
        </div>

        {/* --- COURSE LIST --- */}
        <h2 className="mb-6 text-2xl font-extrabold text-gray-900">
          Manage Your Courses
        </h2>

        {instructorCourses?.length === 0 ? (
          <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-3xl">
            <p className="text-lg font-medium text-gray-500">
              You haven't created any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instructorCourses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col relative overflow-hidden transition-shadow bg-white border border-gray-200 shadow-sm rounded-3xl hover:shadow-md"
              >
                <div className="w-full h-80 overflow-hidden bg-gray-100 rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  {course.isPublished ? (
                    <span className="absolute px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-lg top-3 right-3">
                      Published
                    </span>
                  ) : (
                    <span className="absolute px-3 py-1 text-xs font-bold text-gray-700 bg-yellow-400 rounded-lg top-3 right-3">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex flex-col grow p-6">
                  <h3 className="mb-2 text-xl font-extrabold text-gray-900 line-clamp-1">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between mb-6 text-sm font-bold text-gray-500">
                    <span className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <FiUsers className="text-brand-purple" />{" "}
                      {course.studentCount} Students
                    </span>
                    <span className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <FiBookOpen className="text-brand-purple" />{" "}
                      {course.lessons.length} Lessons
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    {/* 1. Manage Button */}
                    <Link
                      to={`/course/${course._id}`}
                      className="flex items-center justify-center grow gap-2 py-3 font-bold transition-all border-2 text-brand-purple border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple hover:text-white rounded-xl"
                    >
                      <FiEdit3 className="w-5 h-5" />
                      Manage
                    </Link>

                    {/* 2. Toggle Publish Button */}
                    <button
                      onClick={() => onToggle(course)}
                      className={`h-12 px-4 flex items-center justify-center text-sm font-bold rounded-xl transition-all border-2 ${
                        course.isPublished
                          ? "bg-yellow-50 text-yellow-700 border-yellow-100 hover:bg-yellow-500 hover:text-white hover:border-yellow-500"
                          : "bg-green-50 text-green-700 border-green-100 hover:bg-green-500 hover:text-white hover:border-green-500"
                      }`}
                    >
                      {course.isPublished ? "Unpublish" : "Publish"}
                    </button>

                    {/* 3. Delete Form */}
                    <fetcher.Form method="delete" className="m-0">
                      <input type="hidden" name="courseId" value={course._id} />
                      <button
                        type="submit"
                        onClick={async (e) => {
                          e.preventDefault();
                          const confirmed = await confirmAction(
                            "Delete Course?",
                            "WARNING: Delete this ENTIRE course? This is permanent.",
                            "Yes, delete it"
                          );
                          if (confirmed) {
                            fetcher.submit(e.currentTarget.form, { method: "delete" });
                          }
                        }}
                        className="flex items-center justify-center w-12 h-12 text-red-500 transition-all border-2 border-red-100 bg-red-50 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl"
                        title="Delete Course"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InstructorDashboard;
