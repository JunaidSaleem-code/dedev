// routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser, deleteOwnAccount, updateOwnAccount, logoutUser } from '../controllers/userController.js';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, loginUser);

router.post('/logout', logoutUser);

router.delete('/me', protect, deleteOwnAccount);

router.put('/me', protect, updateOwnAccount);

export default router;
