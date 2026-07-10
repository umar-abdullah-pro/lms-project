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
      default: "https://api.dicebear.com/7.x/bottts/svg?seed=Learnly",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
