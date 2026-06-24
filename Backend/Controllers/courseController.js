const { Course } = require("../Models/course");

exports.postCreateCourse = async (req, res) => {
    const {title, description, price, isPublished} = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                error: 'Title and Description are required'
            });
        }

        const newCourse = await Course.create({
            title,
            description,
            price,
            instructor: req.user._id,
            isPublished: isPublished !== undefined ? isPublished : false
        });

        res.status(201).json({
            message: 'Course created successfully',
            success: true,
            data: newCourse
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error while creating course',
            success: false,
            error: error.message
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).populate('instructor', 'name email');
        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.log('Error fetching all courses:', error);
        res.status(500).json({
            message: 'server error while fetching courses',
            success: false,
            error: error.message
        });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }
        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Server Error while fetching the course',
            error: error.message
        });
    }
}