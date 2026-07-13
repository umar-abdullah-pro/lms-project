import apiClient from "../../api/client";

export const sendVerificationAction = async () => {
  try {
    const response = await apiClient.post("/auth/send-verification-email");
    return {
      success: true,
      message: response.data.message || "Email sent successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to send email. Try again.",
    };
  }
};
