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
    if (Number(price) < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Price cannot be negative" });
    }

    const publishStatus = isPublished === "true";

    let thumbnailUrl = "";
    let thumbnailPublicId = "";

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
      thumbnailPublicId = uploadResult.public_id;
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
      thumbnailPublicId: thumbnailPublicId,
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
    const { search, category, page = 1, limit = 10 } = req.query;
    let query = { isPublished: true };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }
    const skip = (Number(page) - 1) * Number(limit);
    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / Number(limit));

    const courses = await Course.find(query)
      .populate("instructor", "name avatar") 
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        courses,
        meta: {
          totalPages,
          currentPage: Number(page),
          totalCourses,
        },
      },
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

    const isOwner =
      !!req.user &&
      course.instructor._id.toString() === req.user._id.toString();

    let isEnrolled = false;
    if (req.user && !isOwner) {
      const enrollment = await Enrollment.findOne({
        student: req.user._id,
        course: course._id,
      });
      isEnrolled = !!enrollment;
    }

    const courseData = course.toObject();


    if (!isOwner && !isEnrolled) {
      courseData.lessons = courseData.lessons.map((lesson, index) => {
        if (index === 0) return lesson;
        const { videoUrl, videoPublicId, ...lessonWithoutVideo } = lesson;
        return lessonWithoutVideo;
      });
    }

    res.status(200).json({
      success: true,
      data: courseData,
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

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a video file" });
    }

    const safeFolderName = course.title.replace(/[^a-zA-Z0-9]/g, "_");

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: `lms_courses/${safeFolderName}/lessons`,
          type: "authenticated",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(req.file.buffer);
    });

    const videoUrl = uploadResult.secure_url;
    const videoPublicId = uploadResult.public_id;

    course.lessons.push({
      title,
      description,
      videoUrl,
      videoPublicId,
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

    const lesson = course.lessons.id(lessonId);
    if (lesson && lesson.videoPublicId) {
      await cloudinary.uploader.destroy(lesson.videoPublicId, { resource_type: "video" });
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

    for (const lesson of course.lessons) {
      if (lesson.videoPublicId) {
        await cloudinary.uploader.destroy(lesson.videoPublicId, { resource_type: "video" });
      }
    }

    if (course.thumbnailPublicId) {
      await cloudinary.uploader.destroy(course.thumbnailPublicId);
    }

    await Enrollment.deleteMany({ course: courseId });
    await Review.deleteMany({ course: courseId });

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
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to edit this course",
        });
    }

    if (isPublished !== undefined) {
      course.isPublished = isPublished;
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating course",
      error: error.message,
    });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { page = 1, limit = 5 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const totalReviews = await Review.countDocuments({ course: courseId });
    const totalPages = Math.ceil(totalReviews / Number(limit));

    const reviews = await Review.find({ course: courseId })
      .populate("student", "name avatar")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ 
      success: true, 
      data: {
        reviews,
        meta: {
          totalPages,
          currentPage: Number(page),
          totalReviews,
        }
      } 
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching reviews",
        error: error.message,
      });
  }
};

exports.postCourseReview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { rating, comment } = req.body;
    const studentId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });
    if (!enrollment) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You must be enrolled to leave a review.",
        });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    const isCompleted =
      enrollment.completedLessons.length === course.lessons.length &&
      course.lessons.length > 0;
    if (!isCompleted) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You must complete the course before leaving a review.",
        });
    }

    const existingReview = await Review.findOne({
      course: courseId,
      student: studentId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already reviewed this course.",
        });
    }

    const review = await Review.create({
      course: courseId,
      student: studentId,
      rating: Number(rating),
      comment,
    });

    const newCount = course.reviewCount + 1;
    const newAverage =
      (course.averageRating * course.reviewCount + Number(rating)) / newCount;

    course.reviewCount = newCount;
    course.averageRating = newAverage;
    await course.save();

    res
      .status(201)
      .json({
        success: true,
        data: review,
        message: "Review submitted successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error posting review",
        error: error.message,
      });
  }
};

exports.getSecureVideoUrl = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const isInstructor = course.instructor.toString() === studentId.toString();
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });

    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }
    const lessonIndex = course.lessons.findIndex(
      (l) => l._id.toString() === lessonId,
    );

    const isFreePreview = lessonIndex === 0;

    if (!isInstructor && !enrollment && !isFreePreview) {
      return res
        .status(403)
        .json({ success: false, message: "Not enrolled in this course" });
    }

    if (lesson.videoPublicId) {
      const expirationTimestamp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

      const secureUrl = cloudinary.url(lesson.videoPublicId, {
        resource_type: "video",
        type: "authenticated",
        sign_url: true,
        auth_token: {
          key: process.env.CLOUDINARY_API_SECRET,
          duration: 7200,
        },
      });
      const basicSignedUrl = cloudinary.url(lesson.videoPublicId, {
        resource_type: "video",
        type: "authenticated",
        sign_url: true,
        expires_at: expirationTimestamp,
      });

      return res.status(200).json({ success: true, url: basicSignedUrl });
    } else {
      return res.status(200).json({ success: true, url: lesson.videoUrl });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
