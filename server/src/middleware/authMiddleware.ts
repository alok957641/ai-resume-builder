import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // User id request mein daalo taaki controller use kar sake
    (req as any).user = { id: decoded.id };

    next(); // aage jao
  } catch (error) {
    res.status(401).json({ message: 'Token galat hai ya expire ho gaya!' });
  }
};