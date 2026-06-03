import { Router } from 'express';
import { checkATSScore } from '../controllers/atsController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
router.post('/check', protect, checkATSScore);
export default router;