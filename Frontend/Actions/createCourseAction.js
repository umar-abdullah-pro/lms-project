// Frontend/src/Actions/createCourseAction.js
import apiClient from "../API/client";

const createCourseAction = async ({ request }) => {
  console.log("🚀 1. Create Course button pressed!");
  
  // Grab the raw FormData (which perfectly handles both text and file uploads)
  const formData = await request.formData();

  try {
    console.log("🌐 2. Attempting to hit endpoint: /courses");
    
    // We pass the raw formData directly to apiClient!
    const response = await apiClient.post("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log("✅ 3. Backend responded with SUCCESS:", response.data);
    
    return { success: true, courseId: response.data.data?._id || response.data._id };
    
  } catch (error) {
    console.error("❌ 4. Backend responded with an ERROR:", error);
    
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create course. Please try again.",
    };
  }
};

export default createCourseAction;