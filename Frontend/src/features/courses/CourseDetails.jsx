import { useState, useEffect } from "react";
import useCourseDetails from "../../hooks/useCourseDetails";
import apiClient from "../../api/client";

import CourseHeader from "./CourseHeader";
import CourseLessonList from "./CourseLessonList";
import CourseSidebar from "./CourseSidebar";
import CourseReviews from "./CourseReviews";
import Footer from "../../components/Footer";
import VideoPlayer from "../../components/VideoPlayer";

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
    updateVideoProgress,
    enrollment,
  } = useCourseDetails();

  // We need local state to track if the lesson they just clicked is locked!
  const [isCurrentLessonLocked, setIsCurrentLessonLocked] = useState(false);
  const [secureVideoUrl, setSecureVideoUrl] = useState(null);

  useEffect(() => {
    const fetchSecureUrl = async () => {
      if (!currentLesson || isCurrentLessonLocked) {
        setSecureVideoUrl(null);
        return;
      }
      
      try {
        const { data } = await apiClient.get(`/courses/${course._id}/lessons/${currentLesson._id}/video-url`);
        if (data.success && data.url) {
          setSecureVideoUrl(data.url);
        } else {
          setSecureVideoUrl(currentLesson.videoUrl); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch secure video URL", err);
        setSecureVideoUrl(currentLesson.videoUrl); // fallback
      }
    };

    fetchSecureUrl();
  }, [currentLesson, isCurrentLessonLocked, course?._id]);

  const handleLessonPlay = (lesson, lockedStatus) => {
    setCurrentLesson(lesson);
    setIsCurrentLessonLocked(lockedStatus);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!course) {
    return <div className="py-20 text-center text-xl">Course not found.</div>;
  }

  const handleDeleteLesson = async (lessonId) => {
    try {
      await apiClient.delete(`/courses/${course._id}/lessons/${lessonId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Find initial time for the current lesson
  const currentLessonProgress = enrollment?.lessonProgress?.find(
    (p) => p.lessonId === currentLesson?._id
  );
  const initialTime = currentLessonProgress?.watchedSeconds || 0;

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            {currentLesson ? (
              <VideoPlayer
                url={secureVideoUrl || currentLesson.videoUrl}
                title={currentLesson.title}
                isLocked={isCurrentLessonLocked}
                initialTime={initialTime}
                onProgressUpdate={(seconds, totalSeconds) => {
                  if (isEnrolled) updateVideoProgress(currentLesson._id, seconds, totalSeconds);
                }}
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
              lessonProgress={enrollment?.lessonProgress || []}
              isEnrolled={isEnrolled || isCourseOwner}
              isCourseOwner={isCourseOwner}
              onPlay={handleLessonPlay}
              onMarkComplete={markLessonComplete}
              onDeleteLesson={handleDeleteLesson}
            />
            
            <CourseReviews 
              courseId={course._id} 
              isEnrolled={isEnrolled} 
              progressPercentage={progressPercentage} 
            />
          </div>

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
