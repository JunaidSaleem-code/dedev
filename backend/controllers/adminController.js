import User from '../models/User.js';
import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Delete any user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error('User not found');
  await user.remove();
  res.json({ message: 'User deleted' });
});

// Get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('author', 'name email');
  res.json(posts);
});

// Delete any post
export const deleteAnyPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new Error('Post not found');
  await post.remove();
  res.json({ message: 'Post deleted by admin' });
});
