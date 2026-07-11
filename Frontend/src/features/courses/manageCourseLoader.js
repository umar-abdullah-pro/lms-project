import apiClient from "../../api/client";

export const manageCourseLoader = async ({ params }) => {
  try {
    const response = await apiClient.get(`/courses/${params.id}`);
    return {
      course: response.data.data,
    };
  } catch (error) {
    console.error("❌ ERROR: Failed to load course for management:", error);
    throw new Response("Course Not Found", { status: 404 });
  }
};
