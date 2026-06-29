import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import DashboardHeader from "../Components/DashboardHeader";
import ContinueLearning from "../Components/ContinueLearning";
import Footer from "../Components/Footer";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Calculate stats dynamically inside the component body
  const totalLessons = enrolledCourses.reduce((acc, enrollment) => {
    return acc + (enrollment.completedLessons?.length || 0);
  }, 0);

  const totalProgressSum = enrolledCourses.reduce((acc, enrollment) => {
    const totalCourseLessons = enrollment.course?.lessons?.length || 1; // Prevent div by zero
    const progress =
      (enrollment.completedLessons?.length || 0) / totalCourseLessons;
    return acc + progress;
  }, 0);

  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round((totalProgressSum / enrolledCourses.length) * 100)
      : 0;

  // 2. Pass the dynamic stats object
  const userStats = {
    courses: enrolledCourses.length,
    lessons: totalLessons,
    progress: avgProgress,
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/enrollments/my-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setEnrolledCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchMyCourses();
    }
  }, [token]);

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        {/* Everything here will now update automatically when data loads! */}
        <DashboardHeader stats={userStats} userName={user?.name || "Student"} />
        <ContinueLearning enrolledCourses={enrolledCourses} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
