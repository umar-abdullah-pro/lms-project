const express = require("express");
const paymentRouter = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const paymentController = require("../Controllers/paymentController");

paymentRouter.post(
  "/create-order",
  authMiddleware.protect,
  authMiddleware.requireVerified,
  paymentController.createRazorpayOrder,
);
paymentRouter.post(
  "/verify-payment",
  authMiddleware.protect,
  authMiddleware.requireVerified,
  paymentController.verifyRazorpayPayment,
);

module.exports = paymentRouter;
