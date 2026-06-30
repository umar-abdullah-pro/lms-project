import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import CourseHeader from "../Components/CourseHeader";
import CourseLessonList from "../Components/CourseLessonList";
import CourseSidebar from "../Components/CourseSidebar";
import Footer from "../Components/Footer";
import VideoPlayer from "../Components/VideoPlayer";

// Need this to check if the user is logged in
import { useAuth } from "../Context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  const isCourseOwner =
    user &&
    course &&
    (course.instructor?._id === user._id || course.instructor === user._id);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:3000/api/courses/${id}`,
        );
        const fetchedCourse = courseResponse.data.data;
        setCourse(fetchedCourse);

        if (token) {
          const enrollmentsResponse = await axios.get(
            "http://localhost:3000/api/enrollments/my-courses",
            { headers: { Authorization: `Bearer ${token}` } },
          );

          const myCourses = enrollmentsResponse.data.data;
          const alreadyOwned = myCourses.find((e) => e.course._id === id);

          if (alreadyOwned) {
            setIsEnrolled(true);
            setEnrollmentId(alreadyOwned._id);
            setCompletedLessons(alreadyOwned.completedLessons || []);
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, token]);

  // DERIVED STATE: Automatically recalculates when completedLessons changes!
  const progressPercentage =
    course?.lessons?.length > 0
      ? Math.round((completedLessons.length / course.lessons.length) * 100)
      : 0;

  const handleEnrollment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/api/enrollments",
        { course: course._id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Successfully enrolled!");
      setIsEnrolled(true);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error enrolling in course");
    }
  };

  const handlePlay = (lesson) => {
    setCurrentLesson(lesson);
  };

  // --- THE UNIFIED COMPLETION LOGIC ---
  const markLessonComplete = async (lessonId) => {
    console.log("--- ATTEMPTING TO MARK COMPLETE ---");
    console.log("Target Lesson ID:", lessonId);
    console.log("Current Enrollment ID:", enrollmentId);

    if (!enrollmentId) {
      console.warn("FAILED: Enrollment ID is null or missing.");
      alert("Could not find your enrollment ID. Try refreshing the page.");
      return;
    }

    if (completedLessons.includes(lessonId)) {
      console.log("ABORTED: Lesson is already marked complete in local state.");
      return;
    }

    try {
      console.log("Sending POST request to backend...");
      const response = await axios.post(
        `http://localhost:3000/api/enrollments/${enrollmentId}/complete`,
        { lessonId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Backend Success Response:", response.data);

      // Update Local State Instantly!
      setCompletedLessons((prev) => [...prev, lessonId]);
    } catch (error) {
      console.error("Backend Error:", error.response?.data || error);
      alert("Failed to update progress on the server.");
    }
  };

  // This fires when the video player reaches the end
  const handleVideoEnd = () => {
    if (currentLesson) {
      console.log("Video naturally ended! Triggering complete...");
      markLessonComplete(currentLesson._id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold text-gray-400 bg-brand-beige">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold text-gray-400 bg-brand-beige">
        Course not found.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            {currentLesson ? (
              <VideoPlayer
                url={currentLesson.videoUrl}
                title={currentLesson.title}
                onVideoEnd={handleVideoEnd} // Triggers when video finishes
              />
            ) : (
              <CourseHeader course={course} />
            )}

            <CourseLessonList
              lessons={course.lessons}
              onPlay={handlePlay}
              completedLessons={completedLessons}
              onMarkComplete={markLessonComplete} // Passes the manual click function down
            />
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar
              isCourseOwner={isCourseOwner}
              course={course}
              progressPercentage={progressPercentage}
              isEnrolled={isEnrolled}
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
