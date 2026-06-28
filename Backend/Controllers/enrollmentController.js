const Enrollment = require("../Models/enrollment");
const { Course } = require("../Models/course");

exports.enrollInCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const student = req.user._id;

    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: student,
      course: course,
    });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // 4. FIXED: Use 'course' to save the record
    const enrollment = await Enrollment.create({
      student: student,
      course: course,
      completedLessons: [],
      progress: [],
    });

    res.status(201).json({
      success: true,
      data: enrollment,
      message: "Successfully enrolled!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate("course", "title description price lessons instructor")
      .sort("-enrolledAt");

    res
      .status(200)
      .json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
