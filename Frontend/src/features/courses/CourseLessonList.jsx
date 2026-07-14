import {
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlinePlayCircle,
} from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { confirmAction } from "../../utils/alertUtils";

const CourseLessonList = ({
  lessons,
  completedLessons,
  lessonProgress = [],
  isEnrolled,
  isCourseOwner,
  onDeleteLesson,
  onPlay,
  onMarkComplete,
}) => {
  const displayLessons = [...(lessons || [])];
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

            const chronologicalNumber = index + 1;
            const isCompleted = completedLessons?.some(
              (id) => String(id) === String(lesson._id),
            );

            const isLocked = !isEnrolled && chronologicalNumber !== 1;

            const progressObj = lessonProgress.find((p) => p.lessonId === lesson._id);
            let progressPercent = 0;
            if (isCompleted) {
              progressPercent = 100;
            } else if (progressObj && progressObj.totalSeconds > 0) {
              progressPercent = (progressObj.watchedSeconds / progressObj.totalSeconds) * 100;
            }

            return (
              <div
                key={lesson._id}
                onClick={() => onPlay(lesson, isLocked)}
                className={`relative overflow-hidden flex items-center justify-between p-5 transition-all border shadow-sm rounded-2xl cursor-pointer
                  ${isLocked ? "bg-gray-50 border-gray-100 hover:bg-gray-100 opacity-80" : "bg-white border-gray-200 hover:border-brand-purple hover:shadow-md"}
                `}
              >
                {/* Sleek Progress Line */}
                {!isLocked && (progressPercent > 0 || isCompleted) && (
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                    <div 
                      className="h-full bg-brand-purple transition-all duration-500 ease-out" 
                      style={{ width: `${Math.min(progressPercent, 100)}%` }} 
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-5 z-10">
                  <div className="shrink-0 text-gray-200">
                    <div
                      className={
                        isCompleted
                          ? "text-[#1de9b6]"
                          : "text-gray-200"
                      }
                    >
                      <HiOutlineCheckCircle className="w-6 h-6" />
                    </div>
                  </div>

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
                <div className="flex">
                  <div className="shrink-0 p-2">
                    {isLocked ? (
                      <HiOutlineLockClosed className="w-6 h-6 text-gray-400" />
                    ) : (
                      <div className="p-2 text-brand-purple bg-[#f0f2ff] rounded-full transition-colors group-hover:bg-brand-purple group-hover:text-white">
                        <HiOutlinePlayCircle className="w-5 h-5 ml-0.5" />
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 p-2">
                    {isCourseOwner && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          const confirmed = await confirmAction(
                            "Delete Lesson?",
                            `Are you sure you want to delete "${lesson.title}"?`,
                            "Yes, delete it"
                          );
                          if (confirmed) {
                            onDeleteLesson(lesson._id);
                          }
                        }}
                        className="shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
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
