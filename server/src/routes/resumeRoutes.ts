import { Router } from 'express';
import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Saare routes protected hain — login zaroori
router.use(protect);

router.post('/', createResume);
router.get('/', getMyResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

export default router;