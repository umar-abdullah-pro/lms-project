import apiClient from "../../api/client";

const courseDetailsLoader = async ({ params }) => {
  try {
    const courseResponse = await apiClient.get(`/courses/${params.id}`);
    const courseData = courseResponse.data.data || courseResponse.data || [];

    let initialEnrollment = null;
    const token = localStorage.getItem("token");

    if (token) {
      const userResponse = await apiClient.get("/enrollments/my-courses");
      const userData = userResponse.data.data || userResponse.data || [];
      initialEnrollment = userData.find(event => event.course._id === params.id);
    }
    return { course: courseData, initialEnrollment: initialEnrollment };
  } catch (error) {
    console.error("ERROR: Failed to load courses Details", error);
    return { course: null, initialEnrollment: null };
  }
};

export default courseDetailsLoader;
