// Core Modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();

// //Local Modules
const authRouter = require("./Routes/authRouter");
const courseRouter = require("./Routes/courseRouter");
const enrollmentRouter = require("./Routes/enrollmentRouter");
const paymentRouter = require("./Routes/paymentRouter");

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/api/payments", paymentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
