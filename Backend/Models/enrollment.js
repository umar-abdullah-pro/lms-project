const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
      index: true,
    },

    completedLessons: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },

    progressPercentage: {
      type: Number,
      default: 0,
    },

    lessonProgress: [
      {
        lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "lesson" },
        watchedSeconds: { type: Number, default: 0 },
        totalSeconds: { type: Number, default: 0 },
        isCompleted: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
