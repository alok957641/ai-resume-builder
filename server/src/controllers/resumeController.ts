import { Request, Response } from 'express';
import Resume from '../models/Resume';
import { nanoid } from 'nanoid'; 
// ✅ Naya resume banao
export const createResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const resume = await Resume.create({
      userId,
      title: req.body.title || 'Mera Resume',
    });

    res.status(201).json({
      message: 'Resume ban gaya! ✅',
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Apne saare resumes lo
export const getMyResumes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 });   // naye pehle

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Ek resume lo by ID
export const getResumeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId,             // sirf apna resume dekh sako
    });

    if (!resume) {
      res.status(404).json({ message: 'Resume nahi mila!' });
      return;
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Resume update karo
export const updateResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId },
      { ...req.body },          // jo bhi frontend ne bheja update karo
      { new: true }             // updated resume wapas bhejo
    );

    if (!resume) {
      res.status(404).json({ message: 'Resume nahi mila!' });
      return;
    }

    res.json({ message: 'Saved! ✅', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Resume delete karo
export const deleteResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!resume) {
      res.status(404).json({ message: 'Resume nahi mila!' });
      return;
    }

    res.json({ message: 'Resume delete ho gaya! 🗑️' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




// ✅ Public link banao ya hatao
export const togglePublic = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const resume = await Resume.findOne({ _id: req.params.id, userId });
    if (!resume) { res.status(404).json({ message: 'Resume nahi mila!' }); return; }

    if (!resume.isPublic) {
      // Public banao — slug generate karo
      resume.publicSlug = nanoid(8);
      resume.isPublic = true;
    } else {
      // Private banao
      resume.isPublic = false;
      resume.publicSlug = undefined;
    }
    await resume.save();
    res.json({ resume, message: resume.isPublic ? 'Public link ban gaya!' : 'Private kar diya!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Public resume dekho (bina login ke)
export const getPublicResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const resume = await Resume.findOne({
      publicSlug: req.params.slug,
      isPublic: true,
    });
    if (!resume) { res.status(404).json({ message: 'Resume nahi mila!' }); return; }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};