const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    videoUrl:{
        type: String,
        required: true
    },

    description:{
        type: String
    }
})

const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    price:{
        type: Number,
        required: true,
        default: 0
    },

    isPublished:{
        type: Boolean,
        default: false
    },

    lessons: [lessonSchema]

    }, {timestamps: true})

    const Course = mongoose.model("Course", courseSchema);
    const Lesson = mongoose.model("Lesson", lessonSchema);
    module.exports = { Course, Lesson};