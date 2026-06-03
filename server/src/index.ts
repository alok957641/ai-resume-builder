import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import aiRoutes from './routes/aiRoutes';
import paymentRoutes from './routes/paymentRoutes';
import adminRoutes from './routes/adminRoutes';
import atsRoutes from './routes/atsRoutes';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',    authRoutes);
app.use('/api/resume',  resumeRoutes);
app.use('/api/ai',      aiRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/ats', atsRoutes);



app.get('/api/health', (_, res) => res.json({ message: '✅ Server running!' }));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
});