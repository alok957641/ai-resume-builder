import { Request, Response } from 'express';
import Resume from '../models/Resume';
import { nanoid } from 'nanoid';

// Helper function to ensure arrays exist
const ensureArrays = (resume: any) => {
  return {
    ...resume.toObject(),
    projects: resume.projects || [],
    certificates: resume.certificates || [],
    experience: resume.experience || [],
    education: resume.education || [],
    skills: resume.skills || [],
  };
};

// ✅ Naya resume banao - FIXED
export const createResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { title, template } = req.body;
    
    console.log("📥 Creating resume with template:", template);
    
    const resume = await Resume.create({
      userId,
      title: title || 'Mera Resume',
      template: template || 'modern-blue',  // ✅ IMPORTANT FIX
      projects: [],
      certificates: [],
    });

    console.log("✅ Created resume with template:", resume.template);

    res.status(201).json({
      message: 'Resume ban gaya! ✅',
      resume: ensureArrays(resume),
    });
  } catch (error) {
    console.error("❌ Create error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Apne saare resumes lo
export const getMyResumes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    const resumesWithArrays = resumes.map(resume => ensureArrays(resume));
    res.json(resumesWithArrays);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Ek resume lo by ID
export const getResumeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const resume = await Resume.findOne({ _id: req.params.id, userId });

    if (!resume) {
      res.status(404).json({ message: 'Resume nahi mila!' });
      return;
    }

    res.json(ensureArrays(resume));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Resume update karo
export const updateResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const updateData = { ...req.body };
    
    console.log('📝 Received update template:', updateData.template);
    
    const projects = Array.isArray(updateData.projects) ? updateData.projects : [];
    const certificates = Array.isArray(updateData.certificates) ? updateData.certificates : [];
    const experience = Array.isArray(updateData.experience) ? updateData.experience : [];
    const education = Array.isArray(updateData.education) ? updateData.education : [];
    const skills = Array.isArray(updateData.skills) ? updateData.skills : [];
    
    const updateFields: any = {
      title: updateData.title,
      template: updateData.template,  // ✅ Template update karo
      personalInfo: updateData.personalInfo,
      experience: experience,
      education: education,
      skills: skills,
      projects: projects,
      certificates: certificates,
    };
    
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!resume) {
      res.status(404).json({ message: 'Resume nahi mila!' });
      return;
    }

    console.log('✅ Updated template:', resume.template);
    
    res.json({ message: 'Saved! ✅', resume: ensureArrays(resume) });
  } catch (error) {
    console.error('❌ Update error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId });

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
    if (!resume) { 
      res.status(404).json({ message: 'Resume nahi mila!' }); 
      return; 
    }

    if (!resume.isPublic) {
      resume.publicSlug = nanoid(8);
      resume.isPublic = true;
    } else {
      resume.isPublic = false;
      resume.publicSlug = undefined;
    }
    await resume.save();
    res.json({ 
      resume: ensureArrays(resume), 
      message: resume.isPublic ? 'Public link ban gaya!' : 'Private kar diya!' 
    });
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
    if (!resume) { 
      res.status(404).json({ message: 'Resume nahi mila!' }); 
      return; 
    }
    res.json(ensureArrays(resume));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};