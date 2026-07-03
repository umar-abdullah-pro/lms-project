const express = require('express')
const courseRouter = express.Router()
const multer = require('../Middlewares/multer')

const courseController = require('../Controllers/courseController')
const authMiddleware = require('../Middlewares/authMiddleware')
const { single } = require('../Middlewares/multer')
const upload = require('../Middlewares/multer')

courseRouter.get('/', courseController.getAllCourses)
courseRouter.post('/', authMiddleware.protect, authMiddleware.instructorOnly, upload.single('thumbnail'), courseController.postCreateCourse)
courseRouter.get('/:id', courseController.getCourseById)
courseRouter.post('/:id/lessons', authMiddleware.protect, authMiddleware.instructorOnly, upload.single('video'), courseController.postaddLesson)

module.exports = courseRouter