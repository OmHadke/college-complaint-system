const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ← ADD THIS(solved /admin issue)

exports.protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");//decoded;// { id, role, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user.role); 
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};



