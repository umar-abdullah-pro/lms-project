const express = require("express");
const enrollmentRouter = express.Router();

const enrollmentController = require("../Controllers/enrollmentController");
const authMiddleware = require("../Middlewares/authMiddleware");

enrollmentRouter.post(
  "/",
  authMiddleware.protect,
  authMiddleware.requireVerified,
  enrollmentController.enrollInCourse,
);
enrollmentRouter.get(
  "/my-courses",
  authMiddleware.protect,
  enrollmentController.getMyEnrollments,
);
enrollmentRouter.post(
  "/:enrollmentId/complete",
  authMiddleware.protect,
  enrollmentController.completeLesson,
);

module.exports = enrollmentRouter;
