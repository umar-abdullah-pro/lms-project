import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../src/Context/AuthContext"; 
import apiClient from "../API/client"; 

export const useCourseDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { course, initialEnrollment } = useLoaderData();

  // 1. Local state
  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [currentLesson, setCurrentLesson] = useState(null);

  // 2. Derived Math (Added optional chaining ? to course.instructor just in case)
  const isCourseOwner = Boolean(
    user && (course?.instructor?._id === user._id || course?.instructor === user._id)
  );
  const isEnrolled = Boolean(enrollment);
  const completedLessons = enrollment?.completedLessons || [];
  const progressPercentage = course?.lessons?.length
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

  // 3. API Actions
  const handleEnrollment = async () => {
    if (!user) return navigate("/login");
    try {
      const res = await apiClient.post("/enrollments", { course: course._id });
      setEnrollment(res.data.data);
      alert("Successfully enrolled!");
    } catch (error) {
      alert("Error enrolling in course");
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!enrollment || completedLessons.includes(lessonId)) return;

    // Optimistic update
    setEnrollment((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
    }));

    try {
      await apiClient.post(`/enrollments/${enrollment._id}/complete`, {
        lessonId,
      });
    } catch (error) {
      console.error("Failed to sync completion with backend");
      // Optional: You could revert the state here if the API fails
    }
  };

  // 4. Return everything the UI needs
  return {
    course,
    currentLesson,
    setCurrentLesson,
    isCourseOwner,
    isEnrolled,
    completedLessons,
    progressPercentage,
    handleEnrollment,
    markLessonComplete,
  };
};

export default useCourseDetails 