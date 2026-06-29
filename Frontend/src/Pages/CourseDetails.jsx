import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

// Keeping your exact component structure!
import CourseHeader from "../Components/CourseHeader";
import CourseLessonList from "../Components/CourseLessonList";
import CourseSidebar from "../Components/CourseSidebar";
import Footer from "../Components/Footer";
import VideoPlayer from '../Components/VideoPlayer'

// Need this to check if the user is logged in
import { useAuth } from "../Context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false); // Track real enrollment status

  const isCourseOwner =
    user &&
    course &&
    (course.instructor?._id === user._id || course.instructor === user._id);
  <Link
    to={`/course/${id}/manage`}
    className="px-6 py-3 bg-brand-purple text-white font-bold rounded-full"
  >
    + Add Lessons
  </Link>;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // 1. Fetch the course details
        const courseResponse = await axios.get(
          `http://localhost:3000/api/courses/${id}`,
        );
        setCourse(courseResponse.data.data);

        // 2. If the user is logged in, check the backend to see if they own it
        if (token) {
          const enrollmentsResponse = await axios.get(
            "http://localhost:3000/api/enrollments/my-courses",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const myCourses = enrollmentsResponse.data.data;

          // Check if the current course ID is in their purchased courses
          const alreadyOwned = myCourses.find(
            (enrollment) => enrollment.course._id === id,
          );

          if (alreadyOwned) {
            setIsEnrolled(true);
            const totalLessons = course?.lessons?.length || 4; // Fallback to 4 for your mock UI
            const completedCount = alreadyOwned.completedLessons?.length || 0;

            // Calculate percentage and round to a whole number
            const calculatedProgress =
              totalLessons > 0
                ? Math.round((completedCount / totalLessons) * 100)
                : 0;

            console.log(calculatedProgress);
            setProgressPercentage(calculatedProgress);
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

  const handleEnrollment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // 3. Send the real POST request to enroll
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
  const handlePlay = (lesson) => {
    setCurrentLesson(lesson);
  };
  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Show Video Player if a lesson is selected, otherwise Header */}
            {currentLesson ? (
              <VideoPlayer
                url={currentLesson.videoUrl}
                title={currentLesson.title}
              />
            ) : (
              <CourseHeader course={course} />
            )}

            {/* Pass the handlePlay function down to the list */}
            <CourseLessonList lessons={course.lessons} onPlay={handlePlay} />
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar
              isCourseOwner={isCourseOwner}
              course={course}
              progressPercentage={progressPercentage}
              isEnrolled={isEnrolled} // Passes the real boolean to the sidebar
              handleEnrollment={handleEnrollment} // Passes the real backend function
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
