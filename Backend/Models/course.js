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
    catogory: {
        type: String,
        default: "Uncategorized",
        enum: ["Programming", "Design", "Business", "Marketing", "Uncategorized"],
        required: true,
    },

    thumbnail:{
        type: String,
        default: ""
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

    const Course = mongoose.model("course", courseSchema);
    const Lesson = mongoose.model("lesson", lessonSchema);
    module.exports = { Course, Lesson};