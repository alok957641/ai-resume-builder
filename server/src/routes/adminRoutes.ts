import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import User from '../models/User';
import Resume from '../models/Resume';

const router = Router();

// ✅ Admin check middleware - Hardcoded email
const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const user = await User.findById(req.user.id);
    // ✅ Hardcoded admin email
    const adminEmail = 'rajalok957641@gmail.com';
    
    if (!user || user.email !== adminEmail) {
      return res.status(403).json({ message: '🚫 Admin only! Unauthorized access.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

router.use(protect, isAdmin);

// Stats
router.get('/stats', async (req, res) => {
  try {
    const [users, resumes, proUsers] = await Promise.all([
      User.countDocuments(),
      Resume.countDocuments(),
      User.countDocuments({ plan: 'pro' }),
    ]);
    res.json({ users, resumes, proUsers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// All users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    const withCounts = await Promise.all(
      users.map(async (u) => ({
        ...u,
        resumeCount: await Resume.countDocuments({ userId: u._id }),
      }))
    );
    res.json(withCounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update plan
router.put('/users/:id/plan', async (req, res) => {
  try {
    const { plan } = req.body;
    await User.findByIdAndUpdate(req.params.id, { plan });
    res.json({ message: 'Plan update ho gaya!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update plan' });
  }
});

export default router;