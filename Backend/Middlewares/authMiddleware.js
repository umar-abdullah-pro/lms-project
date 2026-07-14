const jwt = require("jsonwebtoken");
const user = require("../Models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await user.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, account no longer exists" });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

const requireVerified = (req, res, next) => {
  if (req.user && req.user.isEmailVerified === false) {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Please verify your email address to perform this action.",
    });
  }
  next();
};

const instructorOnly = (req, res, next) => {
  if (req.user && req.user.role === "instructor") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Instructors only." });
  }
};


const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
    } catch (error) {

    }
  }
  next();
};

module.exports = { protect, instructorOnly, requireVerified, optionalAuth };
