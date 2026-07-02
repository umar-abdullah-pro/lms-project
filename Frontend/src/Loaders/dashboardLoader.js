  import apiClient from "../../API/client";

  const dashboardLoader = async () => {
    try {
      const enrollResponse = await apiClient.get("/enrollments/my-courses");
      return { enrolledCourses: enrollResponse.data.data };
    } catch (error) {
      console.error(
        "❌ ERROR: Failed to load enrolled courses in dashboardLoader:",
        error,
      );
      return { enrolledCourses: [] };
    }
  };

  export default dashboardLoader;
