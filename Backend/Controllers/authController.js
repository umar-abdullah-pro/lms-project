const bcrypt = require("bcryptjs")
const User = require("../Models/User")
const jwt = require("jsonwebtoken")

exports.postUserRegister = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        } 

        const hashedPassword = await bcrypt.hash(password, 12)

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    }
    catch (error) {
        console.log('error while registering the user' ,error)
        res.status(500).json({ message: "Server error" })
    }
}

exports.postUserLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d' }
        );

        res.status(200).json({ 
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            })    
        } 
    catch (error){
        console.log('error while logging in the user' ,error)
        res.status(500).json({ message: "Server error" })
    }
}
