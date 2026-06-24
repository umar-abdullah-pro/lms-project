const CourseSyllabus = ({ lessons }) => {
  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
        Course Syllabus
        <span className="ml-3 text-base font-bold text-gray-400">
          {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
        </span>
      </h2>

      {lessons.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <svg
            className="w-10 h-10 text-gray-200 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
            />
          </svg>
          <p className="font-bold text-gray-600">No lessons added yet</p>
          <p className="text-gray-400 text-sm mt-1">
            The instructor is still building this course.
          </p>
        </div>
      ) : (
        /* Lessons list */
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              {/* Lesson number */}
              <div className="w-9 h-9 rounded-full bg-brand-purple/10 text-brand-purple font-extrabold text-sm flex items-center justify-center shrink-0">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{lesson.title}</p>
                {lesson.description && (
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {lesson.description}
                  </p>
                )}
              </div>

              {/* Video icon */}
              <svg
                className="w-5 h-5 text-gray-300 shrink-0 mt-0.5"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSyllabus;
