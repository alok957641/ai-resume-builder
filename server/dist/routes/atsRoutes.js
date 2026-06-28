"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const atsController_1 = require("../controllers/atsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/check', authMiddleware_1.protect, atsController_1.checkATSScore);
exports.default = router;
