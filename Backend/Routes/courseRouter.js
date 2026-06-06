const express = require('express')
const courseRouter = express.Router()

const courseController = require('../Controllers/courseController')
const authMiddleware = require('../Middlewares/authMiddleware')

courseRouter.get('/', courseController.getAllCourses)
courseRouter.post('/', authMiddleware.protect, authMiddleware.instructorOnly, courseController.postCreateCourse)
courseRouter.get('/courses/:id', courseController.getCourseById)

module.exports = courseRouter