// routes/postRoutes.js
import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { protect, adminOnly, isAuthorOrAdmin } from '../middleware/authMiddleware.js'; // ✅ import adminOnly
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Public route to get all posts
router.route('/').get(getPosts);

// Protected route for creating post
router.route('/')
  .get(getPosts)
  .post([
    protect,
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ], createPost);

// Get a single post (public)
// Update (protected), Delete (admin only)
router
  .route('/:id')
  .get(getPostById)
  .put([
    protect,
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ], updatePost)
  .delete(protect, isAuthorOrAdmin, deletePost);
  // .delete(protect, isAuthorOrAdmin, deletePost); // ✅ Only admin can delete

export default router;
