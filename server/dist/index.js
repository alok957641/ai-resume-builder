"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const atsRoutes_1 = __importDefault(require("./routes/atsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// ✅ CORS setup
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ai-resume-builder-bice-three.vercel.app',
    'https://ai-resume-builder.netlify.app',
    process.env.CLIENT_URL
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        }
        else {
            console.log('❌ Blocked origin:', origin);
            callback(null, true); // Allow all for now
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// ✅ Root route
app.get('/', (req, res) => {
    res.json({
        message: '✅ Server running!',
        status: 'active'
    });
});
// API routes. The client calls `/api/*`, while the old root paths are kept
// for backwards compatibility during local testing.
app.use('/api/auth', authRoutes_1.default);
app.use('/api/resume', resumeRoutes_1.default);
app.use('/api/ai', aiRoutes_1.default);
app.use('/api/payment', paymentRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/ats', atsRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/resume', resumeRoutes_1.default);
app.use('/ai', aiRoutes_1.default);
app.use('/payment', paymentRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/ats', atsRoutes_1.default);
// ✅ Health check
app.get('/health', (req, res) => {
    res.json({ message: '✅ Server running!', status: 'ok' });
});
// ✅ 404 handler - NO wildcard '*' here
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
    });
});
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
});
