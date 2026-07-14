const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  videoUrl: {
    type: String,
    required: true,
  },

  videoPublicId: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
});

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Uncategorized",
      enum: [
        "Programming",
        "Design",
        "Business",
        "Marketing",
        "General",
        "Uncategorized",
      ],
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    lessons: [lessonSchema],
  },
  { timestamps: true },
);

const Course = mongoose.model("course", courseSchema);
const Lesson = mongoose.model("lesson", lessonSchema);
module.exports = { Course, Lesson };
