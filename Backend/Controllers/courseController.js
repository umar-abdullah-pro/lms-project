const { Course } = require("../Models/course");
const Enrollment = require("../Models/enrollment");
const cloudinary = require("../cloudinaryConfig");

exports.postCreateCourse = async (req, res) => {
  const { title, description, category, price, isPublished } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: "Title and Description are required",
      });
    }
    const publishStatus = isPublished === "true";

    let thumbnailUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "lms_thumbnails" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(req.file.buffer);
      });
      thumbnailUrl = uploadResult.secure_url;
    }

    let formattedCategory = req.body.category
      ? req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1)
      : "Uncategorized";

    const newCourse = await Course.create({
      title,
      description,
      price: Number(price) || 0,
      category: formattedCategory,
      thumbnail: thumbnailUrl,
      instructor: req.user._id,
      isPublished: publishStatus,
    });

    res.status(201).json({
      message: "Course created successfully",
      success: true,
      data: newCourse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error while creating course",
      success: false,
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "instructor",
      "name email",
    );
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log("Error fetching all courses:", error);
    res.status(500).json({
      message: "server error while fetching courses",
      success: false,
      error: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name",
    );
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error while fetching the course",
      error: error.message,
    });
  }
};

exports.postaddLesson = async (req, res) => {
  try {
    const { title, description } = req.body;
    const courseId = req.params.id;

    // 1. Verify the course and ownership
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this course",
      });
    }

    // 2. Check if a video file was actually attached to the request
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a video file" });
    }

    // 3. Upload the video to Cloudinary using a Promise (so our code waits for it to finish)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "lms_lessons",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(req.file.buffer);
    });

    const videoUrl = uploadResult.secure_url;

    course.lessons.push({
      title,
      description,
      videoUrl,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Lesson added successfully!",
      data: course,
    });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during upload",
      error: error.message,
    });
  }
};

exports.getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort(
      "-createdAt",
    );
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const studentCount = await Enrollment.countDocuments({
          course: course._id,
        });

        return {
          ...course.toObject(),
          studentCount,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: coursesWithStats,
    });
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching instructor dashboard",
      error: error.message,
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this course",
      });
    }

    course.lessons = course.lessons.filter(
      (lesson) => lesson._id.toString() !== lessonId,
    );

    await course.save();

    res
      .status(200)
      .json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {

  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this course",
      });
    }

    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { isPublished } = req.body;

    // 1. Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 2. Security Check: Ensure the logged-in user actually owns this course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this course" });
    }

    // 3. Update the field if it was provided
    if (isPublished !== undefined) {
      course.isPublished = isPublished;
    }

    // Save to database
    await course.save();

    res.status(200).json({ 
      success: true, 
      message: "Course updated successfully",
      data: course 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating course", 
      error: error.message 
    });
  }
};