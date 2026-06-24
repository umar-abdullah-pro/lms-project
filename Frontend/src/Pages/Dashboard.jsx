import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "../components/DashboardHeader";
import ContinueLearning from "../components/ContinueLearning";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocking the stats for now until the backend has full progress tracking
  const userStats = {
    courses: enrolledCourses.length || 2,
    lessons: 3,
    progress: 42,
  };

  useEffect(() => {
    // Simulated fetch of enrolled courses
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setEnrolledCourses(response.data.data.slice(0, 2));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <DashboardHeader stats={userStats} userName="Asha" />
        <ContinueLearning enrolledCourses={enrolledCourses} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
