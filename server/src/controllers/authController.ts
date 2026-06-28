import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Token banane ka function
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },                             
    process.env.JWT_SECRET as string,    
    { expiresIn: '7d' }                
  );
};

// ✅ REGISTER
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Kya email already registered hai?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Ye email pehle se registered hai!' });
      return;
    }

    // Naya user banao
    const user = await User.create({ name, email, password });

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ LOGIN
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // User dhundo email se
    const user = await User.findOne({ email });
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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ GET CURRENT USER (profile)
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user authMiddleware se aayega (aage banayenge)
    const user = await User.findById((req as any).user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};