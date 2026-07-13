import apiClient from "../../api/client";

export const verifyEmailAction = async ({ params }) => {
  try {
    const response = await apiClient.put(`/auth/verify-email/${params.token}`);
    
    return { 
      success: true, 
      message: response.data.message || "Email successfully verified!" 
    };
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || "Invalid or expired verification token.",
    };
  }
};