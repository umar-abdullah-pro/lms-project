import apiClient from "../../api/client";

const createCourseAction = async ({ request }) => {
  const formData = await request.formData();

  try {
    const response = await apiClient.post("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, courseId: response.data.data?._id || response.data._id };
    
  } catch (error) {    
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create course. Please try again.",
    };
  }
};

export default createCourseAction;