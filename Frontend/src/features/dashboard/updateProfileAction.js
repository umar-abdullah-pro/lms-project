import apiClient from "../../api/client";

const updateProfileAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiClient.put("/auth/profile", data);
    const updatedUserData = response.data.data;
    return { success: true, updatedUserData: updatedUserData };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Profile update failed. Please try again.",
    };
  }
};

export default updateProfileAction;
