const express = require("express");
const courseRouter = express.Router();
const multer = require("../Middlewares/multer");
const courseController = require("../Controllers/courseController");
const authMiddleware = require("../Middlewares/authMiddleware");


courseRouter.get("/", courseController.getAllCourses);

courseRouter.post(
  "/",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  gitupload.single("thumbnail"),
  courseController.postCreateCourse,
);

courseRouter.get(
  "/instructor-dashboard",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
  courseController.getInstructorDashboard,
);

courseRouter.get("/:id", courseController.getCourseById);

courseRouter.post(
  "/:id/lessons",
  authMiddleware.protect,
  authMiddleware.instructorOnly,
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

module.exports = courseRouter;
