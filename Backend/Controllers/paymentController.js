// Backend/Controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Course } = require("../Models/course");
const Enrollment = require("../Models/enrollment");

// Initialize Razorpay with your keys
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_API_KEY,
  key_secret: process.env.RAZORPAY_TEST_API_SECRET,
});

// 1. GENERATE THE BILL (Order)
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Razorpay expects amounts in subunits (Paise). So ₹500 = 50000 Paise.
    // If your course price is in USD, you can change currency to "USD", but "INR" is standard for Razorpay India.
    const amountInPaise = Math.round(course.price * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_course_${course._id}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create order" });
    }

    res.status(200).json({ success: true, order, course });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error creating order" });
  }
};

// 2. VERIFY THE PAYMENT & ENROLL THE STUDENT
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;
    const studentId = req.user._id;

    // A. Cryptographically verify the signature using your Secret Key
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_TEST_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Payment verification failed. Signature mismatch.",
        });
    }

    // B. If authentic, check if they are already enrolled (just in case)
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course." });
    }

    // C. Securely enroll the student!
    const newEnrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      completedLessons: [],
      progress: [],
    });

    res.status(200).json({
      success: true,
      message: "Payment verified & Enrolled successfully!",
      data: newEnrollment,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error verifying payment" });
  }
};
