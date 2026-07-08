import apiClient from "../../API/client";

export const dashboardAction = async ({ request }) => {
  // If the form method is DELETE, process the course deletion
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const courseId = formData.get("courseId"); // Grab the hidden ID

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