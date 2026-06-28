const express = require("express")
const enrollmentRouter = express.Router()


const enrollmentController = require('../Controllers/enrollmentController')
const authMiddleware = require('../Middlewares/authMiddleware')

enrollmentRouter.post('/', authMiddleware.protect, enrollmentController.enrollInCourse)
enrollmentRouter.get('/my-courses', authMiddleware.protect, enrollmentController.getMyEnrollments)

module.exports = enrollmentRouter;