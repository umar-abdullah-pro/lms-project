import apiClient from "../../api/client";

const dashboardLoader = async () => {
  try {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.role === "instructor") {
      const response = await apiClient.get("/courses/instructor-dashboard");
      return {
        role: "instructor",
        instructorCourses: response.data.data,
      };
    }
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
