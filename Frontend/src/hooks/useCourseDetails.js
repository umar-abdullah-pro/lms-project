import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import apiClient from "../api/client";
import { showSuccessToast, showErrorToast } from "../utils/alertUtils";

export const useCourseDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { course, initialEnrollment } = useLoaderData();

  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [currentLesson, setCurrentLesson] = useState(null);
  const isCourseOwner = Boolean(
    user &&
    (course?.instructor?._id === user._id || course?.instructor === user._id),
  );
  const isEnrolled = Boolean(enrollment);
  const completedLessons = enrollment?.completedLessons || [];
  const progressPercentage = course?.lessons?.length
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

  const handleEnrollment = async () => {
    if (!user) {
      showErrorToast("Please log in to purchase this course.");
      return;
    }

    try {
      if (course.price === 0) {
        try {
          const { data } = await apiClient.post("/enrollments", {
            course: course._id,
          });
          if (data.success) {
            showSuccessToast("You have been Enrolled in the Course, Start Learning!");
            window.location.reload();
          }
        } catch (error) {
          const msg =
            error.response?.data?.message || "Could not enroll. Try again.";
          showErrorToast(`Enrollment Error: ${msg}`);
        }

        return;
      }

      const orderResponse = await apiClient.post("/payments/create-order", {
        courseId: course._id,
      });
      const { order } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Learnly",
        description: `Unlock: ${course.title}`,
        image: course.thumbnail,
        order_id: order.id,

        handler: async function (response) {
          try {

            const verifyResponse = await apiClient.post(
              "/payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course._id,
              },
            );

            if (verifyResponse.data.success) {
              showSuccessToast("Payment Successful! Welcome to the course 🚀");

              window.location.reload();
            }
          } catch (error) {
            console.error(
              "Order creation failed:",
              error.response?.data || error,
            );

            const errorMessage =
              error.response?.data?.message || "Could not initiate checkout.";
            showErrorToast(`Checkout Error: ${errorMessage}`);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const razorpayPopup = new window.Razorpay(options);

      razorpayPopup.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error.description);
        showErrorToast("Payment failed or was cancelled. You have not been charged.");
      });

      razorpayPopup.open();
    } catch (error) {
      console.error("Order creation failed", error);
      showErrorToast("Could not initiate checkout. Please try again.");
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!enrollment || completedLessons.includes(lessonId)) return;
    
    setEnrollment((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
    }));

    try {
      await apiClient.post(`/enrollments/${enrollment._id}/complete`, {
        lessonId,
      });
    } catch (error) {
      console.error("Failed to sync completion with backend");
    }
  };

  const updateVideoProgress = async (lessonId, watchedSeconds, totalSeconds) => {
    if (!enrollment) return;

    setEnrollment((prev) => {
      const lessonProgress = prev.lessonProgress || [];
      const index = lessonProgress.findIndex((p) => p.lessonId === lessonId);
      
      let newProgress = [...lessonProgress];
      if (index > -1) {
        newProgress[index] = { ...newProgress[index], watchedSeconds, totalSeconds };
      } else {
        newProgress.push({ lessonId, watchedSeconds, totalSeconds, isCompleted: false });
      }
      
      return { ...prev, lessonProgress: newProgress };
    });

    try {
      await apiClient.put(`/enrollments/${enrollment._id}/progress`, {
        lessonId,
        watchedSeconds,
        totalSeconds
      });
    } catch (error) {
      console.error("Failed to sync video progress with backend");
    }
  };

  return {
    course,
    currentLesson,
    setCurrentLesson,
    isCourseOwner,
    isEnrolled,
    completedLessons,
    progressPercentage,
    handleEnrollment,
    markLessonComplete,
    updateVideoProgress,
    enrollment,
  };
};

export default useCourseDetails;
