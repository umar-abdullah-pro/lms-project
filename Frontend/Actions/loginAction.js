import apiClient from "../API/client";

const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiClient.post("/auth/login", data);
    const { token, ...userData } = response.data;

    if (!token || !userData._id) {
      throw new Error("Could not find user or token in the API response!");
    }
    return { success: true, userData: userData, userToken: token };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Invalid Credentials",
    };
  }
};

export default loginAction;
