"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resumeSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'Naya Resume'
    },
    template: {
        type: String,
        default: 'modern-blue'
    },
    // ✅ PUBLIC SLUG FIELD - For public sharing
    publicSlug: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    personalInfo: {
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        website: { type: String, default: '' },
        summary: { type: String, default: '' }
    },
    experience: [{
            title: String,
            company: String,
            location: String,
            startDate: String,
            endDate: String,
            current: Boolean,
            description: String
        }],
    education: [{
            degree: String,
            institution: String,
            location: String,
            startDate: String,
            endDate: String,
            current: Boolean,
            description: String
        }],
    skills: [{
            name: String,
            level: String
        }],
    projects: [{
            name: String,
            technologies: String,
            link: String,
            description: String
        }],
    certificates: [{
            name: String,
            issuer: String,
            date: String,
            link: String
        }],
    // ✅ YAHAN PAR YEH FIELDS ADD KARO (schema ke ANDAR)
    views: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    atsScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
// ✅ Create unique index for publicSlug
resumeSchema.index({ publicSlug: 1 }, { unique: true, sparse: true });
exports.default = mongoose_1.default.model('Resume', resumeSchema);
