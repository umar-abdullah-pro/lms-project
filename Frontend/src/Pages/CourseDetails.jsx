import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useCourseDetails from "../../Hooks/useCourseDetails";

import CourseHeader from "../Components/CourseHeader";
import CourseLessonList from "../Components/CourseLessonList";
import CourseSidebar from "../Components/CourseSidebar";
import Footer from "../Components/Footer";
import VideoPlayer from "../Components/VideoPlayer";

const CourseDetail = () => {
  const {
    course,
    currentLesson,
    setCurrentLesson,
    isCourseOwner,
    isEnrolled,
    completedLessons,
    progressPercentage,
    handleEnrollment,
    markLessonComplete,
  } = useCourseDetails();

  // We need local state to track if the lesson they just clicked is locked!
  const [isCurrentLessonLocked, setIsCurrentLessonLocked] = useState(false);

  // Custom handler so we can receive the 'isLocked' flag from the LessonList
  const handleLessonPlay = (lesson, lockedStatus) => {
    setCurrentLesson(lesson);
    setIsCurrentLessonLocked(lockedStatus);

    // Automatically scroll to top so mobile users instantly see the video player!
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!course) {
    return <div className="py-20 text-center text-xl">Course not found.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* LEFT SIDE: Video Player & Lesson List */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <VideoPlayer
                url={currentLesson.videoUrl}
                title={currentLesson.title}
                isLocked={isCurrentLessonLocked} // Pass the lock status!
                onVideoEnd={() => {
                  if (isEnrolled) markLessonComplete(currentLesson._id);
                }}
              />
            ) : (
              <CourseHeader course={course} />
            )}

            <CourseLessonList
              lessons={course.lessons}
              completedLessons={completedLessons}
              isEnrolled={isEnrolled || isCourseOwner} // Pass Enrollment status!
              onPlay={handleLessonPlay} // Use our custom play handler
              onMarkComplete={markLessonComplete}
            />
          </div>

          {/* RIGHT SIDE: Enrollment Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <CourseSidebar
                course={course}
                isCourseOwner={isCourseOwner}
                isEnrolled={isEnrolled}
                progressPercentage={progressPercentage}
                handleEnrollment={handleEnrollment}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
