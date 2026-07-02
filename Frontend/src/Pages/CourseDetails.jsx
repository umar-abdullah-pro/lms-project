import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useCourseDetails from "../../Hooks/useCourseDetails";
import apiClient from "../../API/client";

import CourseHeader from "../Components/CourseHeader";
import CourseLessonList from "../Components/CourseLessonList";
import CourseSidebar from "../Components/CourseSidebar";
import Footer from "../Components/Footer";
import VideoPlayer from "../Components/VideoPlayer";
import { useAuth } from "../Context/AuthContext";

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
  // If the course ID was invalid or deleted, stop here.
  if (!course) {
    return <div className="py-20 text-center text-xl">Course not found.</div>;
  }
  // 5. Render
  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            {currentLesson ? (
              <VideoPlayer
                url={currentLesson.videoUrl}
                title={currentLesson.title}
                onVideoEnd={() => markLessonComplete(currentLesson._id)}
              />
            ) : (
              <CourseHeader course={course} />
            )}

            <CourseLessonList
              lessons={course.lessons}
              completedLessons={completedLessons}
              onPlay={setCurrentLesson}
              onMarkComplete={markLessonComplete}
            />
          </div>

          <div className="lg:col-span-1">
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
      <Footer />
    </div>
  );
};

export default CourseDetail;
