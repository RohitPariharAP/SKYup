import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, token is required" });
    }

    // Check if the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    // Get user from DB
    const user = await User.findById(decoded.userId).select("-password ");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next(); // Continue to next middleware or route handler

  } catch (error) {
    console.log("Error in auth middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
