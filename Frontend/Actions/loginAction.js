import apiClient from "../API/client";

const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiClient.post("/auth/login", data);
    console.log(response);
    const token = response.data.token;
    const userData = response.data.user;

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
