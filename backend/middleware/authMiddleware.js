// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js"; // adjust if your model name is different

// Protect route middleware
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded.userId;
    req.user = await User.findById(userId).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Only admin access middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Admin access only");
  }
};

// Author or admin access (for deleting or editing their own post)
export const isAuthorOrAdmin = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    console.error('Post not found for id:', req.params.id);
    res.status(404);
    throw new Error("Post not found");
  }

  const isAuthor = post.author.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (isAuthor || isAdmin) {
    next();
  } else {
    console.error('Not authorized: user', req.user._id, 'is not author or admin for post', post._id);
    res.status(403);
    throw new Error("Not authorized to perform this action");
  }
});
