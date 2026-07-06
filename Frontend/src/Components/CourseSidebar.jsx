import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiPlusCircle } from "react-icons/fi";


const CourseSidebar = ({
  handleEnrollment,
  isCourseOwner,
  progressPercentage,
  course,
  isEnrolled,
}) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-24 p-8 bg-white border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.04)] rounded-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          {course?.price === 0 ? "Free" : `Rs.${course?.price}`}
        </h2>
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          {course?.lessons?.length || 0} Lessons
        </p>
      </div>

      {/* Progress Bar (Only show if enrolled, otherwise show a basic line or nothing) */}
      {isEnrolled && (
        <div className="p-4 mb-8 bg-gray-50 rounded-2xl">
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#1de9b6] rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
            {progressPercentage}% Complete
          </div>
        </div>
      )}

      {/* Action Button */}
      {isCourseOwner ? (
        // IF THEY OWN THE COURSE: Show the Add Lessons button
        <button
          onClick={() => navigate(`/course/${course._id}/manage`)}
          className="w-full flex items-center justify-center gap-2 px-8 py-3 mb-8 text-white transition-colors rounded-full bg-brand-purple hover:bg-opacity-90 font-bold"
        >
          <FiPlusCircle  className="w-5 h-5" />
          Add Lessons
        </button>
      ) : isEnrolled ? (
        // IF THEY BOUGHT IT: Show the Enrolled button
        <button className="w-full flex items-center justify-center gap-2 py-3.5 mb-8 text-gray-600 font-bold bg-white border-2 border-gray-200 rounded-full cursor-default">
          <FiCheckCircle  className="w-5 h-5 text-gray-400" />
          Enrolled
        </button>
      ) : (
        // IF THEY HAVEN'T BOUGHT IT: Show the Enroll button
        <button
          onClick={handleEnrollment}
          className="w-full px-8 py-3 mb-8 font-bold text-white transition-colors rounded-full bg-brand-coral hover:bg-opacity-90"
        >
          Enroll Now!
        </button>
      )}

      {/* Instructor Info */}
      <div className="pt-6 border-t border-gray-100">
        <p className="mb-3 text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Instructor
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center font-bold text-brand-purple bg-[#f0f2ff] rounded-full w-11 h-11">
            {course?.instructor?.name?.substring(0, 2).toUpperCase() || "IN"}
          </div>
          <span className="font-extrabold text-gray-900">
            {course?.instructor?.name || "Instructor"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
