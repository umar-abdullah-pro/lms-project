const jwt = require("jsonwebtoken");
const User = require("../Models/user");

// 1. The Bouncer: Checks if the user is logged in
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token (e.g., "Bearer eyJhbGciOiJIUzI1...")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using your secret key from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database using the ID embedded in the token
      // .select('-password') ensures we don't accidentally pass the hashed password along
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, account no longer exists" });
      }

      // The ID is valid, let them proceed to the actual route
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

// 2. The VIP Manager: Checks if the logged-in user is an instructor
const instructorOnly = (req, res, next) => {
  // req.user was just set by the 'protect' function above!
  if (req.user && req.user.role === "instructor") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Instructors only." });
  }
};

module.exports = { protect, instructorOnly };
