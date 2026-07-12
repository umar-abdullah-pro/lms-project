const bcrypt = require("bcryptjs");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");

exports.postUserRegister = async (req, res) => {
  const { name, email, password, role, avatar } = req.body;

  try {
    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      role,
      avatar: avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=Learnly",
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "user registered successfully",
      token,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.log("Error while registering the user", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await user.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
      },
    });
  } catch (error) {
    console.log("error while logging in the user", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const existingUser = await user.findById(req.user._id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    // Update fields if they are provided in the request body
    existingUser.name = req.body.name || existingUser.name;

    if (req.body.email && req.body.email !== existingUser.email) {
      const emailExists = await user.findOne({ email: req.body.email });
      if (emailExists) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already in use." });
      }
    }
    existingUser.email = req.body.email || existingUserzx.email;

    const updatedUser = await user.save();

    // Send back the updated user data (DO NOT send the password back!)
    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
