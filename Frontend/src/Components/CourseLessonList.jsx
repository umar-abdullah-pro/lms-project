const CourseLessonList = ({
  lessons,
  completedLessons,
  isEnrolled, // 🌟 NEW: We need to know if they bought the course!
  onPlay,
  onMarkComplete,
}) => {
  const displayLessons = [...(lessons || [])]
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-extrabold text-gray-900">
        Course Content
      </h2>

      {displayLessons.length === 0 ? (
        <div className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl text-gray-500">
          <p className="font-medium">
            No lessons have been added to this course yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayLessons.map((lesson, index) => {
            // Find the original chronological number of the lesson
            const chronologicalNumber = displayLessons.length - index;
            const isCompleted = completedLessons?.some(
              (id) => String(id) === String(lesson._id),
            );

            // 🌟 THE LOCK LOGIC: Lesson 1 is always free. The rest require enrollment!
            const isLocked = !isEnrolled && chronologicalNumber !== 1;

            return (
              <div
                key={lesson._id}
                onClick={() => onPlay(lesson, isLocked)} // Pass lock status to the player!
                className={`flex items-center justify-between p-5 transition-all border shadow-sm rounded-2xl cursor-pointer
                  ${isLocked ? "bg-gray-50 border-gray-100 hover:bg-gray-100 opacity-80" : "bg-white border-gray-200 hover:border-brand-purple hover:shadow-md"}
                `}
              >
                <div className="flex items-center gap-5">
                  {/* Mark Complete Checkbox (Only works if enrolled and not locked) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the lesson from playing when clicking the checkbox
                      if (!isLocked && isEnrolled) onMarkComplete(lesson._id);
                    }}
                    disabled={isLocked || !isEnrolled}
                    className="disabled:opacity-50"
                  >
                    <div
                      className={
                        isCompleted
                          ? "text-[#1de9b6]"
                          : "text-gray-200 hover:text-[#1de9b6]"
                      }
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </button>

                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                        {String(chronologicalNumber).padStart(2, "0")}
                      </span>
                      <h3
                        className={`font-extrabold ${isCompleted ? "text-gray-400 line-through decoration-2" : "text-gray-900"}`}
                      >
                        {lesson.title}
                      </h3>
                      {/* Free Preview Badge */}
                      {!isEnrolled && !isLocked && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-green-500 rounded-md uppercase tracking-wide">
                          Free Preview
                        </span>
                      )}
                    </div>
                    <p className="pl-9 text-sm font-medium text-gray-500 line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* 🌟 DYNAMIC ICON: Play button OR Padlock */}
                <div className="flex-shrink-0 p-2">
                  {isLocked ? (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ) : (
                    <div className="p-2 text-brand-purple bg-[#f0f2ff] rounded-full transition-colors group-hover:bg-brand-purple group-hover:text-white">
                      <svg
                        className="w-5 h-5 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseLessonList;
