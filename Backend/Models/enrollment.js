const mongoose = require('mongoose')

const enrollmentSchema = mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },

    completedLessons:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },

    progressPercentage:{
        type: Number,
        default: 0}
        
    }, {timestamps: true})

    module.exports = mongoose.model("Enrollment", enrollmentSchema) 