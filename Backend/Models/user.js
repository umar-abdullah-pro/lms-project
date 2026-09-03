const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },

    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dxjv0gq1f/image/upload/v1697040915/avatars/default-avatar_owzq3k.png",
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpire: {
      type: Date, 
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
