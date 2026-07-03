import apiClient from "../API/client";

const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiClient.post("/auth/register", data);
    console.log("🌐 3. Attempting to hit endpoint: /auth/register");
    console.log("📦 2. Data being sent to backend:", data);
    console.log("Respnonse from backend:", response);
    const userData = response.data.data;
    const userToken = response.data.token;
    console.log("🚀 4. Registration successful! User data:", userData, "Token:", userToken);

    return { success: true, userData: userData, userToken: userToken };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed. Please try again.",
    };
  }
};

export default registerAction;
