const CourseLessonList = ({
  lessons,
  completedLessons,
  onPlay,
  onMarkComplete,
}) => {
  // Create a reversed copy so the newest lessons appear at the top
  const displayLessons = [...(lessons || [])].reverse();

  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Lessons</h2>

      {/* Conditional Check: If length is 0, show the empty state message */}
      {displayLessons.length === 0 ? (
        <div className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl text-gray-500">
          <p className="font-medium">
            No lessons have been added to this course yet.
          </p>
        </div>
      ) : (
        /* If there ARE lessons, render the list */
        <div className="flex flex-col gap-3">
          {displayLessons.map((lesson, index) => {
            // --- HERE IS THE isCompleted VARIABLE ---
            // We force both IDs to be plain Strings so they match perfectly every time
            const isCompleted = completedLessons?.some(
              (id) => String(id) === String(lesson._id),
            );

            return (
              <div
                key={lesson._id}
                className="flex items-center justify-between p-5 transition-all bg-white border border-gray-200 shadow-sm rounded-2xl hover:border-gray-300"
              >
                <div className="flex items-center gap-5">
                  {/* Clickable Check Circle Icon */}
                  <button onClick={() => onMarkComplete(lesson._id)}>
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
                      {/* Numbering: Keeps the oldest lesson as 01 even when pushed to the bottom */}
                      <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                        {String(displayLessons.length - index).padStart(2, "0")}
                      </span>

                      {/* Title: Adds a grey strikethrough effect if completed */}
                      <h3
                        className={`font-extrabold ${isCompleted ? "text-gray-400 line-through decoration-2" : "text-gray-900"}`}
                      >
                        {lesson.title}
                      </h3>
                    </div>

                    <p className="pl-9 text-sm font-medium text-gray-500">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Play Button Icon */}
                <button
                  onClick={() => onPlay(lesson)}
                  className="p-2 text-brand-purple hover:bg-[#f0f2ff] rounded-full transition-colors"
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
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseLessonList;
