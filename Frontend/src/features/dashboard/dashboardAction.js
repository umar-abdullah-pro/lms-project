import apiClient from "../../api/client";

export const dashboardAction = async ({ request }) => {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const courseId = formData.get("courseId"); 
    try {
      await apiClient.delete(`/courses/${courseId}`);
      return { success: true };
    } catch (error) {
      return { error: "Failed to delete course." };
    }
  }
  return null;
};

export default dashboardAction