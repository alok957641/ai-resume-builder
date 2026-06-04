<div align="center">

<img src="https://img.shields.io/badge/AI%20Resume%20Builder-SaaS-4F46E5?style=for-the-badge&logo=react&logoColor=white" alt="AI Resume Builder" />

# 🚀 AI Resume Builder — SaaS Platform

### Build professional resumes in minutes with the power of AI

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-4F46E5?style=for-the-badge)](https://ai-resume-builder-bice-three.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/alok957641/ai-resume-builder)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 About

**AI Resume Builder** is a full-stack SaaS application that helps users create professional, ATS-friendly resumes in minutes using the power of AI (Google Gemini). The platform features 11+ beautiful templates, real-time preview, PDF export, and a complete subscription system.

> Built as a portfolio project to demonstrate full-stack development skills including React, Node.js, MongoDB, AI integration, and payment processing.

---

## ✨ Features

### 🆓 Free Plan
| Feature | Status |
|---------|--------|
| Create up to 2 resumes | ✅ |
| 4 resume templates | ✅ |
| AI content suggestions | ✅ |
| PDF download | ✅ |
| ATS score checker | ✅ |
| Real-time live preview | ✅ |

### 👑 Pro Plan (₹299/month)
| Feature | Status |
|---------|--------|
| Unlimited resumes | ✅ |
| 11+ premium templates | ✅ |
| Advanced AI rewriting | ✅ |
| PDF without watermark | ✅ |
| Public resume link | ✅ |
| AI interview questions | ✅ |
| Resume score analyzer | ✅ |
| Custom resume URL | ✅ |

### 🛠️ Technical Features
- 🔐 JWT Authentication (Register/Login)
- 🤖 AI-Powered content improvement (Google Gemini API)
- 📊 Resume score with grade (A/B/C/D)
- 🎯 ATS Score Checker (PDF upload)
- 📄 Pixel-perfect PDF export (A4, multi-page)
- 💳 Razorpay payment integration (UPI, Cards, NetBanking)
- 🌐 Public resume sharing link
- 🔒 Admin panel (role-based access)
- 📱 Fully responsive design

---

## 🧱 Tech Stack

### Frontend
```
React 18 + TypeScript     — UI Framework
Vite                      — Build Tool
Tailwind CSS              — Styling
React Router DOM          — Client-side Routing
Zustand                   — State Management
React Hook Form           — Form Handling
TanStack Query            — Server State
Axios                     — HTTP Client
jsPDF + html2canvas       — PDF Generation
Lucide React              — Icons
React Hot Toast           — Notifications
```

### Backend
```
Node.js + Express         — Server Framework
TypeScript                — Type Safety
MongoDB + Mongoose        — Database
JWT (jsonwebtoken)        — Authentication
bcryptjs                  — Password Encryption
Razorpay                  — Payment Gateway
Google Gemini API         — AI Features
Multer                    — File Uploads
Helmet + CORS             — Security
```

### Infrastructure
```
Vercel                    — Frontend Hosting
Railway / Render          — Backend Hosting
MongoDB Atlas             — Cloud Database
```

---

## 📁 Project Structure

```
ai-resume-builder/
│
├── 📁 client/                      # React Frontend
│   ├── public/
│   │   └── _redirects              # Vercel SPA routing
│   ├── src/
│   │   ├── components/
│   │   │   ├── resume/
│   │   │   │   ├── templates/
│   │   │   │   │   ├── AllTemplates.tsx    # 11 template components
│   │   │   │   │   └── index.tsx           # Template renderer
│   │   │   │   ├── PersonalInfoForm.tsx
│   │   │   │   ├── ExperienceForm.tsx
│   │   │   │   ├── EducationForm.tsx
│   │   │   │   ├── SkillsForm.tsx
│   │   │   │   ├── ResumePreview.tsx
│   │   │   │   ├── ResumeScore.tsx
│   │   │   │   ├── ShareResume.tsx
│   │   │   │   └── InterviewQuestions.tsx
│   │   │   └── ATSChecker.tsx
│   │   ├── pages/
│   │   │   ├── Landing.tsx         # Home page
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx       # Main dashboard
│   │   │   ├── ResumeBuilder.tsx   # Resume editor
│   │   │   ├── TemplateChooser.tsx # Template selection
│   │   │   ├── Upgrade.tsx         # Pro plan page
│   │   │   ├── AdminPanel.tsx      # Admin only
│   │   │   └── PublicResume.tsx    # Public resume view
│   │   ├── store/
│   │   │   ├── useAuthStore.ts     # Zustand auth state
│   │   │   └── useResumeStore.ts   # Zustand resume state
│   │   ├── api/
│   │   │   └── index.ts            # Axios instance
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── exportPDF.ts        # PDF generation
│   │   │   └── resumeScore.ts      # ATS scoring
│   │   └── hooks/
│   │       └── useDebounce.ts
│   ├── vercel.json                 # Vercel config
│   └── package.json
│
├── 📁 server/                      # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── resumeController.ts
│   │   │   ├── aiController.ts
│   │   │   ├── paymentController.ts
│   │   │   └── atsController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Resume.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── resumeRoutes.ts
│   │   │   ├── aiRoutes.ts
│   │   │   ├── paymentRoutes.ts
│   │   │   ├── atsRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # JWT verification
│   │   │   └── planMiddleware.ts   # Free/Pro limits
│   │   └── index.ts               # Express app entry
│   ├── .env                        # Environment variables
│   └── package.json
│
├── vercel.json                     # Root Vercel config
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
```bash
node --version   # v18+ required
npm --version    # v9+ required
```

### 1. Clone the Repository
```bash
git clone https://github.com/alok957641/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env    # Fill in your environment variables
npm run dev
# ✅ Server running on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
# ✅ App running on http://localhost:5173
```

---

## 🔐 Environment Variables

### `server/.env`
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai-resume-builder

# Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars

# AI
GEMINI_API_KEY=your_google_gemini_api_key

# Payment
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx

# Admin
ADMIN_EMAIL=your_admin_email@gmail.com
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

### `client/.env.production`
```env
VITE_API_URL=https://your-backend-url.render.com/api
```

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Resume
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/resume` | Create resume | ✅ |
| GET | `/api/resume` | Get all resumes | ✅ |
| GET | `/api/resume/:id` | Get single resume | ✅ |
| PUT | `/api/resume/:id` | Update resume | ✅ |
| DELETE | `/api/resume/:id` | Delete resume | ✅ |
| PUT | `/api/resume/:id/toggle-public` | Toggle public link | ✅ |
| GET | `/api/resume/public/:slug` | View public resume | ❌ |

### AI Features
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ai/improve-summary` | AI improve summary | ✅ |
| POST | `/api/ai/improve-experience` | AI improve experience | ✅ |
| POST | `/api/ai/suggest-skills` | AI suggest skills | ✅ |
| POST | `/api/ai/interview-questions` | Generate interview Qs | ✅ |

### Payment
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payment/create-order` | Create Razorpay order | ✅ |
| POST | `/api/payment/verify` | Verify payment | ✅ |

### ATS
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ats/check` | Check ATS score | ✅ |

### Admin (Admin only)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/stats` | Dashboard stats | 🔐 |
| GET | `/api/admin/users` | All users | 🔐 |
| PUT | `/api/admin/users/:id/plan` | Update user plan | 🔐 |

---

## 🎨 Resume Templates

| # | Template | Plan | ATS Friendly |
|---|----------|------|--------------|
| 1 | Modern Blue | Free | ✅ |
| 2 | Minimal Clean | Free | ✅ |
| 3 | ATS Classic | Free | ✅ |
| 4 | Emerald Pro | Free | ❌ |
| 5 | Slate Dark | Pro | ❌ |
| 6 | Rose Elegant | Pro | ❌ |
| 7 | Violet Bold | Pro | ❌ |
| 8 | Amber Warm | Pro | ❌ |
| 9 | Tech Modern | Pro | ❌ |
| 10 | Creative Pink | Pro | ❌ |
| 11 | Navy Executive | Pro | ✅ |

---

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/66f79fb9-389c-4283-95f9-44804bd963d7" alt="Landing Page" width="45%">
  <img src="https://github.com/user-attachments/assets/a4635811-0785-4c2e-8fe4-a9e292d83b4f" alt="Dashboard" width="45%">
  <br/>
  <img src="https://github.com/user-attachments/assets/c1b1d4ca-71fb-46d8-ad22-b854573c0571" alt="Resume Builder" width="45%">
  <img src="https://github.com/user-attachments/assets/c4488c1e-c7e1-46cc-bb99-85c28eef7ec3" alt="Templates" width="45%">
</div>

---


## 🚢 Deployment

### Frontend → Vercel
```bash
# Vercel Dashboard Settings:
# Framework:        Vite
# Root Directory:   client
# Build Command:    npx vite build
# Output Dir:       dist
# Node Version:     20.x
```

### Backend → Render / Railway
```bash
# Build Command:    npm install && npm run build
# Start Command:    npm start
# Add all .env variables in dashboard
```

### Database → MongoDB Atlas
```bash
# 1. Create free M0 cluster
# 2. Get connection string
# 3. Add to MONGO_URI in .env
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```bash
# Fork karo → Clone karo → Branch banao
git checkout -b feature/amazing-feature

# Changes karo → Commit karo
git commit -m 'feat: add amazing feature'

# Push karo → PR banao
git push origin feature/amazing-feature
```

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Alok Kumar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/alok957641)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail)](mailto:rajalok957641@gmail.com)

---

<div align="center">

⭐ Star this repository if you like it! ⭐

Made with ❤️ in India 🇮🇳

</div>
