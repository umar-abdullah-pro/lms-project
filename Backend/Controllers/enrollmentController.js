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

    const enrollment = await Enrollment.create({
      student: student,
      course: course,
      completedLessons: [],
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
      .populate({
        path: "course",
        select: "title description thumbnail price lessons instructor",
        populate: {
          path: "instructor",
          select: "name avatar",
        },
      })
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

exports.completeLesson = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { lessonId } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify someone else's progress.",
      });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
      await enrollment.save();
    }

    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { lessonId, watchedSeconds, totalSeconds } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify someone else's progress.",
      });
    }

    // Find if the lesson progress already exists
    const progressIndex = enrollment.lessonProgress.findIndex(
      (p) => p.lessonId.toString() === lessonId
    );

    if (progressIndex > -1) {
      // Update existing
      enrollment.lessonProgress[progressIndex].watchedSeconds = watchedSeconds;
      if (totalSeconds) {
        enrollment.lessonProgress[progressIndex].totalSeconds = totalSeconds;
      }
    } else {
      // Create new entry
      enrollment.lessonProgress.push({
        lessonId,
        watchedSeconds,
        totalSeconds: totalSeconds || 0,
      });
    }

    await enrollment.save();

    res.status(200).json({ success: true, data: enrollment.lessonProgress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
