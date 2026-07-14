const express = require("express");
const courseRouter = express.Router();
const upload = require("../Middlewares/multer");
const courseController = require("../Controllers/courseController");
const authMiddleware = require("../Middlewares/authMiddleware");

courseRouter.get("/", courseController.getAllCourses);

courseRouter.post(
  "/",
  authMiddleware.protect,
  authMiddleware.requireVerified,
  authMiddleware.instructorOnly,
  upload.single("thumbnail"),
  courseController.postCreateCourse,
);

courseRouter.get(
  "/instructor-dashboard",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  courseController.getInstructorDashboard,
);

courseRouter.get(
  "/:id",
  authMiddleware.optionalAuth,
  courseController.getCourseById,
);

courseRouter.post(
  "/:id/lessons",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  authMiddleware.requireVerified,
  upload.single("video"),
  courseController.postaddLesson,
);

courseRouter.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  courseController.deleteCourse,
);

courseRouter.delete(
  "/:courseId/lessons/:lessonId",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  courseController.deleteLesson,
);

courseRouter.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  courseController.updateCourse,
);

courseRouter.get("/:id/reviews", courseController.getCourseReviews);

courseRouter.post(
  "/:id/reviews",
  authMiddleware.protect,
  authMiddleware.requireVerified,
  courseController.postCourseReview,
);

courseRouter.get(
  "/:courseId/lessons/:lessonId/video-url",
  authMiddleware.protect,
  courseController.getSecureVideoUrl,
);

module.exports = courseRouter;
