import express from 'express';
import { getAllUsers, deleteUser, getAllPosts, deleteAnyPost } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Users
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);

// Posts
router.get('/posts', protect, adminOnly, getAllPosts);
router.delete('/posts/:id', protect, adminOnly, deleteAnyPost);

export default router;
