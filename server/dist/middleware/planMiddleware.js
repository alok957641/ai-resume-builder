"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTemplatePlan = exports.checkFreeLimit = void 0;
const User_1 = __importDefault(require("../models/User"));
const Resume_1 = __importDefault(require("../models/Resume"));
// Free plan mein sirf 2 resumes
const checkFreeLimit = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User_1.default.findById(userId);
        if (user?.plan === 'pro') {
            next(); // Pro user — unlimited
            return;
        }
        // Free user — count check karo
        const count = await Resume_1.default.countDocuments({ userId });
        if (count >= 2) {
            res.status(403).json({
                message: 'Free plan mein sirf 2 resumes! Pro upgrade karo.',
                upgrade: true,
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.checkFreeLimit = checkFreeLimit;
// Free plan mein sirf 3 templates
const checkTemplatePlan = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User_1.default.findById(userId);
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
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.checkTemplatePlan = checkTemplatePlan;
