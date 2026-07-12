import { useAuth } from "../auth/AuthContext";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const handlePublishToggle = async (course) => {
    try {
      await apiClient.put(`/courses/${course._id}`,{
        isPublished: !course.isPublished,
      });
      navigate(".", { replace: true });
    } catch (error) {
      console.error("Failed to update course status", error);
      alert("Could not update the publish status.");
    }
  };

  if (user?.role === "instructor") {
    return <InstructorDashboard onToggle={handlePublishToggle} />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
