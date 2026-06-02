import { Router } from 'express';
import { improveSummary, improveExperience, suggestSkills } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.post('/improve-summary', improveSummary);
router.post('/improve-experience', improveExperience);
router.post('/suggest-skills', suggestSkills);

export default router;