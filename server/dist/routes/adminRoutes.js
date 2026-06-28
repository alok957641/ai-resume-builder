"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = __importDefault(require("../models/User"));
const Resume_1 = __importDefault(require("../models/Resume"));
const router = (0, express_1.Router)();
// ✅ Admin check middleware - Hardcoded email
const isAdmin = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.user.id);
        // ✅ Hardcoded admin email
        const adminEmail = 'rajalok957641@gmail.com';
        if (!user || user.email !== adminEmail) {
            return res.status(403).json({ message: '🚫 Admin only! Unauthorized access.' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
router.use(authMiddleware_1.protect, isAdmin);
// Stats
router.get('/stats', async (req, res) => {
    try {
        const [users, resumes, proUsers] = await Promise.all([
            User_1.default.countDocuments(),
            Resume_1.default.countDocuments(),
            User_1.default.countDocuments({ plan: 'pro' }),
        ]);
        res.json({ users, resumes, proUsers });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
});
// All users
router.get('/users', async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password').lean();
        const withCounts = await Promise.all(users.map(async (u) => ({
            ...u,
            resumeCount: await Resume_1.default.countDocuments({ userId: u._id }),
        })));
        res.json(withCounts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
// Update plan
router.put('/users/:id/plan', async (req, res) => {
    try {
        const { plan } = req.body;
        await User_1.default.findByIdAndUpdate(req.params.id, { plan });
        res.json({ message: 'Plan update ho gaya!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update plan' });
    }
});
exports.default = router;
