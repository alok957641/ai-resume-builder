"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    try {
        // Header se token lo
        // Frontend bhejta hai: "Bearer eyJhbGc..."
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Login karo pehle!' });
            return;
        }
        // "Bearer " hataao, sirf token rakho
        const token = authHeader.split(' ')[1];
        // Token verify karo
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // User id request mein daalo taaki controller use kar sake
        req.user = { id: decoded.id };
        next(); // aage jao
    }
    catch (error) {
        res.status(401).json({ message: 'Token galat hai ya expire ho gaya!' });
    }
};
exports.protect = protect;
