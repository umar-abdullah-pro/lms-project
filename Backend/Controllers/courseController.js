const { Course } = require("../Models/course");
const Enrollment = require("../Models/enrollment");
const Review = require("../Models/review");
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
    // 1. Grab parameters from the URL query, setting defaults
    const { search, category, page = 1, limit = 10 } = req.query;
    
    // 2. Build a dynamic query object
    let query = {};

    // If a search term exists, look in title OR description (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // If a specific category is selected, add it to the query
    if (category && category !== "All") {
      query.category = category;
    }

    // 3. Calculate pagination math
    const skip = (Number(page) - 1) * Number(limit);
    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / Number(limit));

    // 4. Fetch the exact slice of data we need
    const courses = await Course.find(query)
      .populate("instructor", "name avatar") // Assuming you want instructor details
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); // Newest courses first

    res.status(200).json({
      success: true,
      data: {
        courses,
        meta: {
          totalPages,
          currentPage: Number(page),
          totalCourses
        }
      }
    });
  } catch (error) {
    console.log("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
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

exports.getCourseReviews = async (req, res) => {
  try {
    const courseId = req.params.id;
    const reviews = await Review.find({ course: courseId })
      .populate("student", "name avatar")
      .sort("-createdAt");

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching reviews", error: error.message });
  }
};

exports.postCourseReview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { rating, comment } = req.body;
    const studentId = req.user._id;

    // Verify enrollment
    const enrollment = await Enrollment.findOne({ course: courseId, student: studentId });
    if (!enrollment) {
      return res.status(403).json({ success: false, message: "You must be enrolled to leave a review." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    // Verify completion (Optional, but per requirements)
    const isCompleted = enrollment.completedLessons.length === course.lessons.length && course.lessons.length > 0;
    if (!isCompleted) {
      return res.status(403).json({ success: false, message: "You must complete the course before leaving a review." });
    }

    // Check for existing review
    const existingReview = await Review.findOne({ course: courseId, student: studentId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this course." });
    }

    // Create review
    const review = await Review.create({
      course: courseId,
      student: studentId,
      rating: Number(rating),
      comment
    });

    // Update aggregate on course
    const newCount = course.reviewCount + 1;
    const newAverage = ((course.averageRating * course.reviewCount) + Number(rating)) / newCount;
    
    course.reviewCount = newCount;
    course.averageRating = newAverage;
    await course.save();

    res.status(201).json({ success: true, data: review, message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error posting review", error: error.message });
  }
};