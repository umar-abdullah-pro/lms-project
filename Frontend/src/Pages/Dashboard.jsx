import { useAuth } from "../Context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard"; 

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === "instructor") {
    return <InstructorDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;