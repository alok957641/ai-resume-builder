import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Resume from '../models/Resume';

// Free plan mein sirf 2 resumes
export const checkFreeLimit = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    if (user?.plan === 'pro') {
      next(); // Pro user — unlimited
      return;
    }

    // Free user — count check karo
    const count = await Resume.countDocuments({ userId });
    if (count >= 2) {
      res.status(403).json({
        message: 'Free plan mein sirf 2 resumes! Pro upgrade karo.',
        upgrade: true,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Free plan mein sirf 3 templates
export const checkTemplatePlan = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    const freeTemplates = ['modern-blue', 'emerald-pro', 'minimal-clean'];
    const requestedTemplate = req.body.template;

    if (user?.plan === 'pro' || !requestedTemplate) {
      next();
      return;
    }

    if (!freeTemplates.includes(requestedTemplate)) {
      res.status(403).json({
        message: 'Ye template Pro plan mein milega! Upgrade karo.',
        upgrade: true,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};