import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "../components/CourseHeader";
import CourseLessonList from "../components/CourseLessonList";
import CourseSidebar from "../components/CourseSidebar";
import Footer from "../components/Footer";

const CourseDetail = () => {
  const { id } = useParams(); // Grabs the course ID from the URL (e.g., /course/12345)
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/courses/${id}`,
        );
        setCourse(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

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
        {/* CSS Grid for the 2-Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left Column (Spans 2/3 of the page) */}
          <div className="lg:col-span-2">
            <CourseHeader course={course} />
            <CourseLessonList lessons={course.lessons} />
          </div>

          {/* Right Column (Spans 1/3 of the page) */}
          <div className="lg:col-span-1">
            <CourseSidebar course={course} isEnrolled={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
