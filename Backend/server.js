
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();

const authRouter = require("./Routes/authRouter");
const courseRouter = require("./Routes/courseRouter");
const enrollmentRouter = require("./Routes/enrollmentRouter");
const paymentRouter = require("./Routes/paymentRouter");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http:
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/api/payments", paymentRouter);

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http:
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
    process.exit(1);
  });


