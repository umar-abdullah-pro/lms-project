import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // 1. Import your auth context
import DashboardHeader from "../components/DashboardHeader";
import ContinueLearning from "../components/ContinueLearning";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { user, token } = useAuth(); // 2. Grab the logged-in user and token
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Make stats dynamic based on actual fetched data
  const userStats = {
    courses: enrolledCourses.length, 
    lessons: 0, // We can update this when you build the lesson backend
    progress: 0, 
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // 4. Hit the REAL enrollment endpoint with the authorization header
        const response = await axios.get("http://localhost:3000/api/enrollments/my-courses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Save the actual enrollments to state
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
        {/* 5. Dynamically pass the user's real name instead of "Asha" */}
        <DashboardHeader stats={userStats} userName={user?.name || "Student"} />
        <ContinueLearning enrolledCourses={enrolledCourses} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;