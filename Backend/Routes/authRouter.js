const express = require("express");
const authRouter = express.Router();

const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

authRouter.post("/register", authController.postUserRegister);

authRouter.post("/login", authController.postUserLogin);

authRouter.put(
  "/profile",
  authMiddleware.protect,
  authController.updateProfile,
);

authRouter.post(
  "/forgot-password",
  authController.forgotPassword,
);

authRouter.put(
  "/reset-password/:token",
  authController.resetPassword,
);

module.exports = authRouter;
