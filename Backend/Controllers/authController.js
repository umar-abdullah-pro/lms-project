const bcrypt = require("bcryptjs");
const user = require('../Models/user')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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
    existingUser.email = req.body.email || existingUser.email;

    const updatedUser = await existingUser.save();

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

exports.forgotPassword = async (req, res) => {
  try {
    // 1. Find user by email
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "There is no user with that email." });
    }

    // 2. Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // 3. Save the token and an expiration time (10 minutes) to the database
    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await existingUser.save();

    // 4. Create the reset URL (pointing to your React frontend)
    // IMPORTANT: Make sure this port matches your Vite frontend (default is usually 5173)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `You requested a password reset. Please click this link to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes. If you did not request this, please ignore this email.`;

    // 5. Send the email
    try {
      await sendEmail({
        email: existingUser.email,
        subject: "Password Reset Request",
        message: message,
      });

      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (emailError) {
      // If email fails, wipe the token from the database for security
      existingUser.resetPasswordToken = undefined;
      existingUser.resetPasswordExpire = undefined;
      await existingUser.save();

      console.error("Email Error: ", emailError);
      return res.status(500).json({ success: false, message: "Email could not be sent." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    
    console.log("\n========================================");
    console.log("🕵️ STARTING PASSWORD RESET DIAGNOSTIC");
    console.log("1. Token arriving from Frontend:", resetToken);

    // Let's search the database WITHOUT checking the timer first
    const userJustToken = await user.findOne({ resetPasswordToken: resetToken });
    
    console.log("2. Did we find this token in the DB?", userJustToken ? "YES" : "NO");

    if (userJustToken) {
        console.log("   -> DB Expiration Time:", userJustToken.resetPasswordExpire);
        console.log("   -> Server Current Time:", new Date(Date.now()));
    }
    console.log("========================================\n");

    const existingUser = await user.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() }, 
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    existingUser.password = hashedPassword;
    existingUser.resetPasswordToken = undefined;
    existingUser.resetPasswordExpire = undefined;
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("🚨 CRASH:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};