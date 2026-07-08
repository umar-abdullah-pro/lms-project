import apiClient from "../../API/client";

const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiClient.post("/auth/register", data);
    const userData = response.data.data;
    const userToken = response.data.token;
    
    return { success: true, userData: userData, userToken: userToken };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed. Please try again.",
    };
  }
};

export default registerAction;
