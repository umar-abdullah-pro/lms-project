// Frontend/src/Pages/Dashboard.jsx
import { useLoaderData } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../Context/AuthContext";
import DashboardHeader from "../Components/DashboardHeader";
import ContinueLearning from "../Components/ContinueLearning";
import Footer from "../Components/Footer";

const StudentDashboard = () => {
  const { user } = useAuth();

  const { enrolledCourses } = useLoaderData();

  //Calculate stats safely using useMemo (only runs if data changes)
  const userStats = useMemo(() => {
    let totalLessons = 0;
    let totalProgressSum = 0;

    enrolledCourses.forEach((enrollment) => {
      const completed = enrollment.completedLessons?.length || 0;
      const total = enrollment.course?.lessons?.length || 1;

      totalLessons += completed;
      totalProgressSum += completed / total;
    });

    return {
      courses: enrolledCourses.length,
      lessons: totalLessons,
      progress: enrolledCourses.length
        ? Math.round((totalProgressSum / enrolledCourses.length) * 100)
        : 0,
    };
  }, [enrolledCourses]);

  // 3. Render Pure UI
  return (
    <div className="w-full min-h-screen bg-brand-beige">
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-12 md:py-16">
        <DashboardHeader stats={userStats} userName={user?.name || "Student"} />
        <ContinueLearning enrolledCourses={enrolledCourses} />
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
