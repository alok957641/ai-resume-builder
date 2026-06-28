"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicResume = exports.togglePublic = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getMyResumes = exports.createResume = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const nanoid_1 = require("nanoid");
// Helper function to ensure arrays exist
const ensureArrays = (resume) => {
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
const createResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, template } = req.body;
        console.log("📥 Creating resume with template:", template);
        const resume = await Resume_1.default.create({
            userId,
            title: title || 'Mera Resume',
            template: template || 'modern-blue', // ✅ IMPORTANT FIX
            projects: [],
            certificates: [],
        });
        console.log("✅ Created resume with template:", resume.template);
        res.status(201).json({
            message: 'Resume ban gaya! ✅',
            resume: ensureArrays(resume),
        });
    }
    catch (error) {
        console.error("❌ Create error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createResume = createResume;
// ✅ Apne saare resumes lo
const getMyResumes = async (req, res) => {
    try {
        const userId = req.user.id;
        const resumes = await Resume_1.default.find({ userId }).sort({ updatedAt: -1 });
        const resumesWithArrays = resumes.map(resume => ensureArrays(resume));
        res.json(resumesWithArrays);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMyResumes = getMyResumes;
// ✅ Ek resume lo by ID
const getResumeById = async (req, res) => {
    try {
        const userId = req.user.id;
        const resume = await Resume_1.default.findOne({ _id: req.params.id, userId });
        if (!resume) {
            res.status(404).json({ message: 'Resume nahi mila!' });
            return;
        }
        res.json(ensureArrays(resume));
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getResumeById = getResumeById;
// ✅ Resume update karo
const updateResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = { ...req.body };
        console.log('📝 Received update template:', updateData.template);
        const projects = Array.isArray(updateData.projects) ? updateData.projects : [];
        const certificates = Array.isArray(updateData.certificates) ? updateData.certificates : [];
        const experience = Array.isArray(updateData.experience) ? updateData.experience : [];
        const education = Array.isArray(updateData.education) ? updateData.education : [];
        const skills = Array.isArray(updateData.skills) ? updateData.skills : [];
        const updateFields = {
            title: updateData.title,
            template: updateData.template, // ✅ Template update karo
            personalInfo: updateData.personalInfo,
            experience: experience,
            education: education,
            skills: skills,
            projects: projects,
            certificates: certificates,
        };
        const resume = await Resume_1.default.findOneAndUpdate({ _id: req.params.id, userId }, { $set: updateFields }, { new: true, runValidators: true });
        if (!resume) {
            res.status(404).json({ message: 'Resume nahi mila!' });
            return;
        }
        console.log('✅ Updated template:', resume.template);
        res.json({ message: 'Saved! ✅', resume: ensureArrays(resume) });
    }
    catch (error) {
        console.error('❌ Update error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateResume = updateResume;
const deleteResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const resume = await Resume_1.default.findOneAndDelete({ _id: req.params.id, userId });
        if (!resume) {
            res.status(404).json({ message: 'Resume nahi mila!' });
            return;
        }
        res.json({ message: 'Resume delete ho gaya! 🗑️' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteResume = deleteResume;
// ✅ Public link banao ya hatao
const togglePublic = async (req, res) => {
    try {
        const userId = req.user.id;
        const resume = await Resume_1.default.findOne({ _id: req.params.id, userId });
        if (!resume) {
            res.status(404).json({ message: 'Resume nahi mila!' });
            return;
        }
        if (!resume.isPublic) {
            resume.publicSlug = (0, nanoid_1.nanoid)(8);
            resume.isPublic = true;
        }
        else {
            resume.isPublic = false;
            resume.publicSlug = undefined;
        }
        await resume.save();
        res.json({
            resume: ensureArrays(resume),
            message: resume.isPublic ? 'Public link ban gaya!' : 'Private kar diya!'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.togglePublic = togglePublic;
// ✅ Public resume dekho (bina login ke)
const getPublicResume = async (req, res) => {
    try {
        const resume = await Resume_1.default.findOne({
            publicSlug: req.params.slug,
            isPublic: true,
        });
        if (!resume) {
            res.status(404).json({ message: 'Resume nahi mila!' });
            return;
        }
        res.json(ensureArrays(resume));
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getPublicResume = getPublicResume;
