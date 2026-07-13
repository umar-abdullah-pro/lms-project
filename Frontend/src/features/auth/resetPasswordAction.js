import apiClient from "../../api/client";

export const resetPasswordAction = async ({ request, params }) => {
  const formData = await request.formData();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  try {
    const response = await apiClient.put(`/auth/reset-password/${params.token}`, { password });
    return { success: true, message: response.data.message };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Invalid or expired token." };
  }
};  