import { Router } from 'express';
import { improveSummary, improveExperience, suggestSkills , generateInterviewQuestions} from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.post('/improve-summary', improveSummary);
router.post('/improve-experience', improveExperience);
router.post('/suggest-skills', suggestSkills);
router.post('/interview-questions', generateInterviewQuestions);
export default router;