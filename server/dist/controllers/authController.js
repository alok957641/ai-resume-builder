"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Token banane ka function
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
// ✅ REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Kya email already registered hai?
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Ye email pehle se registered hai!' });
            return;
        }
        // Naya user banao
        const user = await User_1.default.create({ name, email, password });
        // Token banao aur bhejo
        const token = generateToken(user._id.toString());
        res.status(201).json({
            message: 'Account ban gaya! 🎉',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
// ✅ LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // User dhundo email se
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Email ya password galat hai!' });
            return;
        }
        // Password check karo
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: 'Email ya password galat hai!' });
            return;
        }
        // Token banao aur bhejo
        const token = generateToken(user._id.toString());
        res.json({
            message: 'Login ho gaye! 🎉',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
// ✅ GET CURRENT USER (profile)
const getMe = async (req, res) => {
    try {
        // req.user authMiddleware se aayega (aage banayenge)
        const user = await User_1.default.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMe = getMe;
