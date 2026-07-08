import apiClient from "../../API/client";

const dashboardLoader = async () => {
  try {
    // 1. Peek into localStorage to see who is logged in
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    // 2. 🚦 If it's an INSTRUCTOR, fetch their specific courses
    if (user?.role === "instructor") {
      const response = await apiClient.get("/courses/instructor-dashboard");
      return {
        role: "instructor",
        instructorCourses: response.data.data,
      };
    }

    // 3. 🚦 Default to STUDENT, fetch their enrolled courses
    const enrollResponse = await apiClient.get("/enrollments/my-courses");
    return {
      role: "student",
      enrolledCourses: enrollResponse.data.data,
    };
  } catch (error) {
    console.error("❌ ERROR: Failed to fetch dashboard data:", error);
    return { role: "student", enrolledCourses: [], instructorCourses: [] };
  }
};

export default dashboardLoader;
