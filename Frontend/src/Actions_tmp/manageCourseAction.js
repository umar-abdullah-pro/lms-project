import { redirect } from "react-router-dom";
import apiClient from "../api/client";

export const manageCourseAction = async ({ request, params }) => {
  const formData = await request.formData();
  const videoFile = formData.get("video");

  if (!videoFile || videoFile.size === 0) {
    return { error: "Please select a valid video file." };
  }

  try {
    await apiClient.post(`/courses/${params.id}/lessons`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return redirect(`/course/${params.id}`);
  } catch (err) {
    return { error: err.response?.data?.message || "Failed to upload lesson." };
  }
};

export default manageCourseAction;
