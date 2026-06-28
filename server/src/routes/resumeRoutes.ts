import { Router } from 'express';
import {
  createResume, getMyResumes,
  getResumeById, updateResume, deleteResume,togglePublic , getPublicResume
} from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';
import { checkFreeLimit, checkTemplatePlan } from '../middleware/planMiddleware';

const router = Router();
router.use(protect);

router.post('/', checkFreeLimit, createResume);          // 2 limit
router.get('/', getMyResumes);
router.get('/:id', getResumeById);
router.put('/:id', checkTemplatePlan, updateResume);    // template check
router.delete('/:id', deleteResume);
router.put('/:id/toggle-public', protect, togglePublic);
router.get('/public/:slug', getPublicResume);
export default router;