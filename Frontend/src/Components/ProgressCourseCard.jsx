import { Link } from "react-router-dom";

const ProgressCourseCard = ({ course, index, progress = 0 }) => {
  // Reusing our beautiful pastel theme logic
  const colors = [
    {
      bg: "bg-[#ffeae5]",
      text: "text-brand-coral",
      pill: "bg-[#ffedec] text-[#ff7970]",
    },
    {
      bg: "bg-[#eef0ff]",
      text: "text-brand-purple",
      pill: "bg-[#f0f2ff] text-[#7b6df5]",
    },
    {
      bg: "bg-[#fff5d6]",
      text: "text-[#d99f00]",
      pill: "bg-[#fff8e1] text-[#d99f00]",
    },
  ];
  
  // Safe fallback in case index is missing
  const theme = colors[(index || 0) % 3];

  return (
    <Link
      to={`/course/${course?._id}`}
      className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 group rounded-[2rem] hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className={`h-40 flex items-center justify-center text-5xl font-extrabold ${theme.bg} ${theme.text}`}
      >
        {/* ✅ FIX: Added optional chaining and a fallback "C" */}
        {(course?.title?.charAt(0) || "C").toUpperCase()}
      </div>
      
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <div
          className={`inline-flex px-3 py-1 mb-4 text-xs font-bold rounded-full w-fit ${theme.pill}`}
        >
          {/* ✅ FIX: Safely grab instructor name */}
          {course?.instructor?.name || "Instructor"}
        </div>
        
        <h3 className="mb-2 text-xl font-extrabold text-gray-900 transition-colors group-hover:text-brand-purple">
          {/* ✅ FIX: Safe title fallback */}
          {course?.title || "Untitled Course"}
        </h3>
        
        <p className="flex-grow mb-6 text-sm font-medium text-gray-500 line-clamp-2">
          {/* ✅ FIX: Safe description fallback */}
          {course?.description || "No description provided."}
        </p>

        {/* Lesson Count & Progress Bar */}
        <div className="pt-4 mt-auto border-t border-gray-50">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {/* ✅ FIX: Safe lesson array check */}
            {course?.lessons?.length || 0} LESSONS
          </div>

          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1de9b6] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
            {progress}% Complete
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgressCourseCard;