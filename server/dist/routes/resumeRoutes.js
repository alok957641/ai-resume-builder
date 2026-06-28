"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resumeController_1 = require("../controllers/resumeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const planMiddleware_1 = require("../middleware/planMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
router.post('/', planMiddleware_1.checkFreeLimit, resumeController_1.createResume); // 2 limit
router.get('/', resumeController_1.getMyResumes);
router.get('/:id', resumeController_1.getResumeById);
router.put('/:id', planMiddleware_1.checkTemplatePlan, resumeController_1.updateResume); // template check
router.delete('/:id', resumeController_1.deleteResume);
router.put('/:id/toggle-public', authMiddleware_1.protect, resumeController_1.togglePublic);
router.get('/public/:slug', resumeController_1.getPublicResume);
exports.default = router;
