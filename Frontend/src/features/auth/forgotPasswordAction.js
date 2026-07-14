import apiClient from "../../api/client";

export const forgotPasswordAction = async ({ request }) => {

  const formData = await request.formData();
  const email = formData.get("email");

  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return { success: true, message: response.data.message || "Email sent successfully! Check your inbox." };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Something went wrong. Please try again." };
  }
};