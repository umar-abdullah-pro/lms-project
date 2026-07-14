// Core Modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();

// //Local Modules
const authRouter = require("./Routes/authRouter");
const courseRouter = require("./Routes/courseRouter");
const enrollmentRouter = require("./Routes/enrollmentRouter");
const paymentRouter = require("./Routes/paymentRouter");

const app = express();

// Global middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    credentials: true, // Allow cookies to be sent if needed
  }),
);


// Rate limiters for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/forgot-password requests per `window` (here, per 15 minutes)
  message: "Too many attempts from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to specific routes
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);

// Routes
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
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
    process.exit(1);
  });


