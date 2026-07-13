const express = require("express");
const authRouter = express.Router();

const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

authRouter.post("/register", authController.postUserRegister);

authRouter.post("/login", authController.postUserLogin);

authRouter.put("/verify-email/:token", authController.verifyEmail);

authRouter.post("/forgot-password", authController.forgotPassword);

authRouter.put("/reset-password/:token", authController.resetPassword);

authRouter.post(
  "/send-verification-email",
  authMiddleware.protect,
  authController.sendVerificationEmail,
);

authRouter.put(
  "/profile",
  authMiddleware.protect,
  authController.updateProfile,
);

module.exports = authRouter;
