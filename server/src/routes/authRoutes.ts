import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes — koi bhi access kar sakta hai
router.post('/register', register);
router.post('/login', login);

// Protected route — sirf logged in user
router.get('/me', protect, getMe);

export default router;