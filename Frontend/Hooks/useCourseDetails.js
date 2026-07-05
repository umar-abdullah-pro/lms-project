import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useAuth } from "../src/Context/AuthContext";
import apiClient from "../API/client";

export const useCourseDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { course, initialEnrollment } = useLoaderData();

  // 1. Local state
  const [enrollment, setEnrollment] = useState(initialEnrollment);
  const [currentLesson, setCurrentLesson] = useState(null);

  // 2. Derived Math (Added optional chaining ? to course.instructor just in case)
  const isCourseOwner = Boolean(
    user &&
    (course?.instructor?._id === user._id || course?.instructor === user._id),
  );
  const isEnrolled = Boolean(enrollment);
  const completedLessons = enrollment?.completedLessons || [];
  const progressPercentage = course?.lessons?.length
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

  // 3. API Actions
  const handleEnrollment = async () => {
    // 1. Check if the user is logged in
    if (!user) {
      alert("Please log in to purchase this course.");
      return;
    }

    //FREE Course, Skip the Razorpay
    try {
      if (course.price === 0) {
        try {
          const { data } = await apiClient.post("/enrollments", {
            course: course._id,
          });
          if (data.success) {
            alert("You have been Enrolled in the Course, Start Learning!");
            window.location.reload();
          }
        } catch (error) {
          const msg =
            error.response?.data?.message || "Could not enroll. Try again.";
          alert(`Enrollment Error: ${msg}`);
        }

        return;
      }
      
      // 3. PAID Course, Ask the backend to generate the Bill (Order)
      const orderResponse = await apiClient.post("/payments/create-order", {
        courseId: course._id,
      });
      const { order } = orderResponse.data;

      // 4. Configure the Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Learnly",
        description: `Unlock: ${course.title}`,
        image: course.thumbnail,
        order_id: order.id,

        // 5. The 'handler' runs automatically when the student pays successfully
        handler: async function (response) {
          try {
            // Send the secret signatures back to our backend for cryptographic verification
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
              alert("Payment Successful! Welcome to the course 🚀");
              // Refresh the page so the padlocks disappear!
              window.location.reload();
            }
          } catch (error) {
            // 🌟 Upgraded error logging!
            console.error(
              "Order creation failed:",
              error.response?.data || error,
            );

            const errorMessage =
              error.response?.data?.message || "Could not initiate checkout.";
            alert(`Checkout Error: ${errorMessage}`);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#7c3aed", // Matches your brand-purple
        },
      };

      // 6. Open the beautiful Razorpay Popup!
      const razorpayPopup = new window.Razorpay(options);

      razorpayPopup.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error.description);
        alert("Payment failed or was cancelled. You have not been charged.");
      });

      razorpayPopup.open();
    } catch (error) {
      console.error("Order creation failed", error);
      alert("Could not initiate checkout. Please try again.");
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!enrollment || completedLessons.includes(lessonId)) return;

    // Optimistic update
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
      // Optional: You could revert the state here if the API fails
    }
  };

  // 4. Return everything the UI needs
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
  };
};

export default useCourseDetails;
