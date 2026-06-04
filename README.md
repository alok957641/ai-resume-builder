# 🚀 ResumeAI - AI-Powered Resume Builder

<div align="center">

![ResumeAI Banner](https://img.shields.io/badge/ResumeAI-AI%20Powered-blue)
[![Website](https://img.shields.io/badge/Website-Live-green)](https://ai-resume-builder-bice-three.vercel.app)
[![API](https://img.shields.io/badge/API-Render-orange)](https://ai-resume-builder-t8of.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**Create professional resumes with AI assistance in minutes!**

[Live Demo](https://ai-resume-builder-bice-three.vercel.app) • [Report Bug](https://github.com/alok957641/ai-resume-builder/issues) • [Request Feature](https://github.com/alok957641/ai-resume-builder/issues)

</div>

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Live Demo](#-live-demo)
- [📸 Screenshots](#-screenshots)
- [🏗️ Architecture](#️-architecture)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📡 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## ✨ Features

### 🎨 Resume Builder
- **11 Professional Templates** - Modern, Classic, ATS-friendly designs
- **Live Preview** - See changes in real-time as you type
- **Drag & Drop Sections** - Easy to rearrange content
- **PDF Download** - One-click professional PDF export

### 🤖 AI-Powered Features
- **AI Summary Improvement** - Enhance your professional summary
- **AI Experience Description** - Improve job descriptions with AI
- **AI Project Descriptions** - Make project details impactful
- **AI Skill Suggestions** - Get relevant skill recommendations
- **AI Interview Questions** - Generate practice questions for your role
- **ATS Score Checker** - Get AI-powered ATS compatibility score

### 👥 User Features
- **Authentication System** - Secure JWT-based auth
- **Resume Management** - Create, edit, delete multiple resumes
- **Public Resume Links** - Share your resume with anyone
- **Resume Score** - Detailed breakdown of resume quality

### 💳 Monetization
- **Free Plan** - 2 resumes, 4 templates, basic AI
- **Pro Plan** - Unlimited resumes, 11 templates, advanced AI (₹299/month)
- **Razorpay Integration** - Secure payment processing

### 🛡️ Admin Panel
- **User Management** - View all users, upgrade/downgrade plans
- **Analytics Dashboard** - Track users, revenue, templates usage
- **Revenue Reports** - Monthly and annual revenue tracking

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | State Management |
| React Hook Form | Form Handling |
| Axios | API Calls |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Groq API | AI Features |
| Razorpay | Payments |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Database |

---

## 🚀 Live Demo

| Environment | URL |
|-------------|-----|
| **Frontend** | [https://ai-resume-builder-bice-three.vercel.app](https://ai-resume-builder-bice-three.vercel.app) |
| **Backend API** | [https://ai-resume-builder-t8of.onrender.com](https://ai-resume-builder-t8of.onrender.com) |
| **API Health** | [https://ai-resume-builder-t8of.onrender.com/health](https://ai-resume-builder-t8of.onrender.com/health) |

### Test Credentials

Email: test@example.com
Password: test123456

text

---

## 📸 Screenshots
<img alt="Landing Page" width="45%" src="https://github.com/user-attachments/assets/66f79fb9-389c-4283-95f9-44804bd963d7" />

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Landing+Page" alt="Landing Page" width="45%">
  <img src="https://via.placeholder.com/800x400?text=Dashboard" alt="Dashboard" width="45%">
  <br/>
  <img src="https://via.placeholder.com/800x400?text=Resume+Builder" alt="Resume Builder" width="45%">
  <img src="https://via.placeholder.com/800x400?text=Templates" alt="Templates" width="45%">
</div>

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ Client (Vercel) │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐ │
│ │ React │ │Tailwind │ │Framer │ │ Zustand Store │ │
│ │ 19 │ │ CSS │ │ Motion │ │ │ │
│ └────┬────┘ └────┬────┘ └────┬────┘ └────────┬────────┘ │
│ │ │ │ │ │
│ └───────────┴───────────┴───────────────┘ │
│ │ │
│ Axios API Calls │
└─────────────────────────┼────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Render) │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Express.js Server │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │
│ │ │ Auth │ │ Resume │ │ AI │ │ │
│ │ │ Routes │ │ Routes │ │ Routes │ │ │
│ │ └────┬─────┘ └────┬─────┘ └────┬─────┘ │ │
│ │ │ │ │ │ │
│ │ └────────────┼────────────┘ │ │
│ │ ▼ │ │
│ │ ┌─────────────┐ │ │
│ │ │ MongoDB │ │ │
│ │ │ (Atlas) │ │ │
│ │ └─────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

text

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Groq API key
- Razorpay account (for payments)

### Clone Repository
```bash
git clone https://github.com/alok957641/ai-resume-builder.git
cd ai-resume-builder
Backend Setup
bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
Frontend Setup
bash
cd client
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
Environment Variables
Backend (.env)
env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key
ADMIN_EMAIL=admin@example.com
GROQ_API_KEY=your_groq_api_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
Frontend (.env)
env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key
🔧 Configuration
MongoDB Setup
Create account on MongoDB Atlas

Create new cluster

Create database user

Whitelist IP address (0.0.0.0/0 for production)

Get connection string

Groq API Setup
Sign up at Groq Console

Generate API key

Add to .env file

Razorpay Setup
Create account on Razorpay

Get API keys from dashboard

Add to .env file

📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Resume
Method	Endpoint	Description
GET	/api/resume	Get all resumes
POST	/api/resume	Create resume
GET	/api/resume/:id	Get single resume
PUT	/api/resume/:id	Update resume
DELETE	/api/resume/:id	Delete resume
AI Features
Method	Endpoint	Description
POST	/api/ai/improve-summary	Improve summary
POST	/api/ai/improve-experience	Improve experience
POST	/api/ai/suggest-skills	Get skill suggestions
POST	/api/ai/interview-questions	Generate questions
ATS Checker
Method	Endpoint	Description
POST	/api/ats/check	Check ATS score
Admin
Method	Endpoint	Description
GET	/api/admin/stats	Get platform stats
GET	/api/admin/users	Get all users
PUT	/api/admin/users/:id/plan	Update user plan
Payment
Method	Endpoint	Description
POST	/api/payment/create-order	Create Razorpay order
POST	/api/payment/verify	Verify payment
🗂️ Project Structure
text
ai-resume-builder/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── resume/          # Resume builder components
│   │   │   │   ├── templates/   # 11 resume templates
│   │   │   │   └── ...
│   │   │   └── ATSChecker.tsx   # ATS score checker
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.tsx      # Landing page
│   │   │   ├── Dashboard.tsx    # User dashboard
│   │   │   ├── ResumeBuilder.tsx # Resume editor
│   │   │   ├── TemplateChooser.tsx # Template selector
│   │   │   ├── Upgrade.tsx      # Payment page
│   │   │   └── AdminPanel.tsx   # Admin dashboard
│   │   ├── store/               # Zustand stores
│   │   ├── utils/               # Helper functions
│   │   └── api.ts               # API configuration
│   ├── public/                  # Static files
│   ├── index.html
│   └── package.json
│
├── server/                      # Express Backend
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth middleware
│   │   ├── config/              # Configuration
│   │   └── index.ts             # Entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Rajalok

GitHub: @alok957641

Email: rajalok957641@gmail.com

Phone: +91 75418 40606

🙏 Acknowledgments
Groq for AI API

Razorpay for payment gateway

MongoDB for database

Vercel for frontend hosting

Render for backend hosting

<div align="center">
Built with ❤️ by Rajalok

⭐ Star this repository if you like it! ⭐

</div> ```
📝 Instructions to Add:
Save this content as README.md in your project root folder
