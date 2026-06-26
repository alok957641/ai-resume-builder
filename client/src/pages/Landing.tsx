import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    Users,
    Cloud,
    ListChecks,
    Paperclip,
    BarChart3,
    Star,
    Menu,
    X,
    ChevronRight,
    Globe,
    Clock,
    Award,
    Smartphone,
    Monitor,
    Brain,
    Settings,
    Briefcase,
    FolderKanban,
    Link2,
    Lock,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

// ---------- Resume Card Component (Hero Mockup) ----------
function MiniResumeCard() {
    return (
        <div className="bg-white rounded-xl shadow-xl p-5 w-72">
            <div className="bg-blue-600 rounded-lg p-4 mb-4 text-white">
                <div className="text-base font-bold">Alok Singh</div>
                <div className="text-blue-200 text-xs mt-1">Senior Software Engineer</div>
                <div className="text-blue-300 text-[10px] mt-2">
                    rajalok957641@email.com • Mumbai, India
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    Experience
                </div>
                <div className="text-xs font-semibold text-gray-800">
                    Senior Engineer — Google India
                </div>
                <div className="text-[10px] text-gray-400">2022 – Present</div>
                <div className="text-[10px] text-gray-600">
                    • Led microservices migration, reduced latency by 40%
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {['React', 'Node.js', 'AWS', 'Docker'].map((s) => (
                        <span
                            key={s}
                            className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ---------- Feature Card Component ----------
function FeatureCard({
    icon,
    title,
    desc,
    bg,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    bg: string;
}) {
    return (
        <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-200">
            <div
                className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition`}
            >
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

// ---------- Main Landing Component ----------
export default function Landing() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const isAdmin = user?.email === 'rajalok957641@gmail.com';

    const navItems = [
        { label: 'Features', id: 'features' },
        { label: 'Templates', id: 'templates' },
        { label: 'Pricing', id: 'pricing' },
        { label: 'Blog', id: 'blog' },
    ];

    const features = [
        {
            icon: <Brain size={24} className="text-purple-600" />,
            title: 'AI Improvement',
            desc: 'Improve summary and experience with AI. Professional language, action words, ATS friendly.',
            bg: 'bg-purple-50',
        },
        {
            icon: <Zap size={24} className="text-amber-600" />,
            title: 'Live Preview',
            desc: 'Type and see your resume update in real-time. No waiting.',
            bg: 'bg-amber-50',
        },
        {
            icon: <Paperclip size={24} className="text-rose-600" />,
            title: 'PDF Download',
            desc: 'Download professional PDF with one click. Print-ready format.',
            bg: 'bg-rose-50',
        },
        {
            icon: <BarChart3 size={24} className="text-cyan-600" />,
            title: 'ATS Score Check',
            desc: 'Get instant feedback on how well your resume matches job descriptions.',
            bg: 'bg-cyan-50',
        },
        {
            icon: <Briefcase size={24} className="text-emerald-600" />,
            title: 'Multiple Templates',
            desc: 'Choose from 10+ professionally designed templates for any industry.',
            bg: 'bg-emerald-50',
        },
        {
            icon: <Link2 size={24} className="text-indigo-600" />,
            title: 'Public Resume Link',
            desc: 'Share your resume online with a unique link to impress recruiters.',
            bg: 'bg-indigo-50',
        },
    ];

    const stats = [
        { number: '10K+', label: 'Resumes Created', color: '#2563eb' },
        { number: '48%', label: 'More Interviews', color: '#16a34a' },
        { number: '12%', label: 'Salary Increase', color: '#d97706' },
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            role: 'Software Engineer at Microsoft',
            quote: 'ResumeAI helped me land my dream job! The AI suggestions were spot on.',
            avatar: 'PS',
            rating: 5,
        },
        {
            name: 'Rahul Verma',
            role: 'Product Manager at Amazon',
            quote: 'I got 3 interview calls within a week of using this tool. Absolutely brilliant!',
            avatar: 'RV',
            rating: 5,
        },
        {
            name: 'Ananya Patel',
            role: 'Data Scientist at Google',
            quote: 'The ATS score feature is a game-changer. My resume now gets past filters easily.',
            avatar: 'AP',
            rating: 5,
        },
    ];

    const howItWorks = [
        {
            step: '01',
            title: 'Sign Up Free',
            desc: 'Create your account in seconds. No credit card needed.',
        },
        {
            step: '02',
            title: 'Enter Your Details',
            desc: 'Fill in your work experience, education, skills, and projects.',
        },
        {
            step: '03',
            title: 'Get AI-Powered Resume',
            desc: 'Let our AI generate a professional, ATS-friendly resume instantly.',
        },
    ];

    const templates = [
        { name: 'Modern Blue', color: '#2563eb', tag: 'Popular ⭐' },
        { name: 'Emerald Pro', color: '#059669', tag: 'New' },
        { name: 'ATS Classic', color: '#374151', tag: 'ATS ✓' },
        { name: 'Rose Elegant', color: '#e11d48', tag: 'PRO' },
        { name: 'Tech Modern', color: '#0891b2', tag: 'PRO' },
    ];

    const blogPosts = [
        {
            title: 'How to Write an ATS-Friendly Resume',
            date: 'Dec 15, 2024',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop',
        },
        {
            title: 'Top 10 Resume Keywords for 2024',
            date: 'Dec 10, 2024',
            readTime: '4 min read',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
        },
        {
            title: 'Remote Job Application Tips',
            date: 'Dec 5, 2024',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop',
        },
    ];

    return (
        <div
            className="min-h-screen"
            style={{
                background: '#f0f7ff',
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}
        >
            {/* ========== NAVBAR ========== */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/80 sticky top-0 z-50 px-4 sm:px-8 lg:px-16 py-4 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-200">
                        R
                    </div>
                    <span className="font-bold text-2xl text-gray-900 tracking-tight">
                        Resume<span className="text-blue-600">AI</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-200 pb-0.5"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {isAdmin && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-200 transition shadow-md"
                        >
                            <Shield size={16} />
                            Admin Panel
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/login')}
                        className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 rounded-lg hover:shadow-xl hover:shadow-blue-200 transition shadow-md"
                    >
                        Get Started Free <ArrowRight size={16} />
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        {mobileMenuOpen ? (
                            <X size={24} className="text-gray-700" />
                        ) : (
                            <Menu size={24} className="text-gray-700" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="block w-full text-left text-sm font-medium text-gray-700 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            {item.label}
                        </button>
                    ))}
                    <hr className="border-gray-100" />
                    {isAdmin && (
                        <button
                            onClick={() => {
                                navigate('/admin');
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full text-left text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 rounded-lg"
                        >
                            <Shield size={16} /> Admin Panel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-sm font-medium text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 rounded-lg"
                    >
                        Get Started Free <ArrowRight size={16} />
                    </button>
                </div>
            )}

            {/* ========== HERO SECTION ========== */}
            <section className="relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-28">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT */}
                        <div
                            className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200/50">
                                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
                                AI-Powered • 100% Free
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                                Your <br />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    professional AI
                                </span>
                                <br />
                                resume, ready in minutes
                            </h1>

                            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                                Our AI resume builder saves your time with smart content suggestions and impactful summaries.
                                Get hired faster, stress-free!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-blue-200 transition shadow-lg"
                                >
                                    Create AI Resume Now <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => navigate('/templates')}
                                    className="px-8 py-4 border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-600 hover:bg-white hover:border-blue-300 transition"
                                >
                                    Browse Templates
                                </button>
                            </div>

                            <div className="flex justify-center lg:justify-start gap-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-2xl font-extrabold" style={{ color: stat.color }}>
                                            {stat.number}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT - Hero visual (Resume Card with floating badges) */}
                        <div
                            className={`flex-1 relative flex justify-center transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-3xl scale-110" />
                                <div className="relative" style={{ transform: 'rotate(-2deg)' }}>
                                    <MiniResumeCard />
                                </div>

                                {/* Floating Badge 1: ATS Score */}
                                <div
                                    className="absolute -top-4 -right-8 bg-white rounded-xl px-3 py-2.5 shadow-xl z-10"
                                    style={{ animation: 'float1 3s ease-in-out infinite' }}
                                >
                                    <div className="text-[10px] text-gray-400 mb-1">ATS Score</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-extrabold text-green-600">95%</span>
                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-lg font-semibold">
                                            Excellent
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Badge 2: AI Suggestion */}
                                <div
                                    className="absolute -bottom-4 -left-8 bg-white rounded-xl px-3 py-2.5 shadow-xl z-10 max-w-44"
                                    style={{ animation: 'float2 3.5s ease-in-out infinite' }}
                                >
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Sparkles size={11} className="text-purple-500" />
                                        <span className="text-[10px] font-bold text-gray-800">AI Suggestion</span>
                                    </div>
                                    <div className="text-[9px] text-gray-500 leading-relaxed">
                                        Add metrics to your experience for 40% better response rate
                                    </div>
                                </div>

                                {/* Floating Badge 3: PDF Ready */}
                                <div
                                    className="absolute top-0 left-0 -translate-x-4 -translate-y-4 bg-yellow-100 rounded-lg px-3 py-2 shadow-md z-10"
                                    style={{ animation: 'float3 4s ease-in-out infinite' }}
                                >
                                    <div className="text-[10px] font-bold text-yellow-800">📄 PDF Ready!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== TEMPLATES SECTION ========== */}
            <section id="templates" className="bg-white py-20 border-t border-gray-100/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Smartphone size={14} /> Templates
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Choose Your <span className="text-indigo-600">Perfect Design</span>
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Simple to use and ready in minutes — try it for free!
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['All Templates', 'Simple', 'Modern', 'ATS', 'Professional'].map((c) => (
                            <button
                                key={c}
                                className="px-4 py-2 rounded-full text-sm border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition"
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {templates.map((t) => (
                            <div
                                key={t.name}
                                onClick={() => navigate('/templates')}
                                className="bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all relative"
                            >
                                <div className="h-40 p-3" style={{ background: t.color + '10' }}>
                                    <div
                                        className="h-4 rounded"
                                        style={{ background: t.color, marginBottom: 6 }}
                                    />
                                    <div
                                        className="h-2.5 rounded mb-2"
                                        style={{ background: t.color + '60', width: '70%' }}
                                    />
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-2 bg-gray-200 rounded mb-1.5"
                                            style={{ width: `${60 + i * 8}%` }}
                                        />
                                    ))}
                                </div>
                                <div className="p-2.5 flex justify-between items-center">
                                    <span className="text-xs font-semibold text-gray-800">{t.name}</span>
                                    <span
                                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white`}
                                        style={{
                                            background:
                                                t.tag === 'PRO'
                                                    ? '#4f46e5'
                                                    : t.tag === 'ATS ✓'
                                                    ? '#059669'
                                                    : t.tag === 'New'
                                                    ? '#db2777'
                                                    : '#f59e0b',
                                        }}
                                    >
                                        {t.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate('/templates')}
                            className="px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition"
                        >
                            View All Templates →
                        </button>
                    </div>
                </div>
            </section>

            {/* ========== FEATURES SECTION ========== */}
            <section id="features" className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Sparkles size={14} /> Features
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Why <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ResumeAI</span>?
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Everything you need to create a standout resume in minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, idx) => (
                            <FeatureCard key={idx} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="bg-white py-20 px-4 sm:px-8 lg:px-16 border-t border-gray-100/80">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Brain size={14} /> How it works
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Get started in <span className="text-indigo-600">3 simple steps</span>
                        </h2>
                        <p className="text-gray-500 text-lg">From sign-up to your dream resume — it's that easy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connector line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -translate-y-1/2" />

                        {howItWorks.map((item, idx) => (
                            <div key={idx} className="relative z-10">
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                                        <span className="text-white font-extrabold text-xl">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center justify-center gap-1">
                                        Learn more <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TESTIMONIALS ========== */}
            <section className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Star size={14} fill="currentColor" /> Testimonials
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Loved by <span className="text-rose-600">thousands</span> of job seekers
                        </h2>
                        <p className="text-gray-500 text-lg">Real stories from real people who landed their dream jobs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                                        <div className="text-xs text-gray-400">{t.role}</div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={14} fill="#f59e0b" className="text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">"{t.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== PRICING SECTION ========== */}
            <section id="pricing" className="bg-white py-20 border-t border-gray-100/80 px-4 sm:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Star size={14} /> Pricing
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Simple <span className="text-green-600">Pricing</span>
                        </h2>
                        <p className="text-gray-500 text-lg">Start for free!</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Free Plan */}
                        <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
                            <p className="text-4xl font-extrabold text-gray-900 mb-1">₹0</p>
                            <p className="text-gray-400 mb-7 text-sm">Forever free!</p>
                            <ul className="space-y-3 mb-7">
                                {[
                                    '2 Resumes',
                                    '4 Templates',
                                    'AI Suggestions',
                                    'PDF Download',
                                    'ATS Score Check',
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-gray-600"
                                    >
                                        <CheckCircle size={16} className="text-green-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition"
                            >
                                Start Free
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-2xl relative text-white shadow-xl">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                                ⭐ POPULAR
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-4xl font-extrabold mb-1">₹299</p>
                            <p className="text-blue-200 mb-7 text-sm">per month</p>
                            <ul className="space-y-3 mb-7">
                                {[
                                    'Unlimited Resumes',
                                    '10+ Templates',
                                    'Advanced AI',
                                    'No Watermark',
                                    'Public Resume Link',
                                    'AI Interview Questions',
                                    'Priority Support',
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-white"
                                    >
                                        <CheckCircle size={16} className="text-blue-200" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition"
                            >
                                Try Pro
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== BLOG SECTION ========== */}
            <section id="blog" className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <FolderKanban size={14} /> Blog
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Latest from <span className="text-purple-600">Blog</span>
                        </h2>
                        <p className="text-gray-500 text-lg">Tips and tricks to land your dream job</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                            <div
                                key={post.title}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition cursor-pointer group"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                                />
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-800 mb-2">{post.title}</h3>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FINAL CTA ========== */}
            <section className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 sm:p-14 text-center shadow-2xl shadow-blue-200/50 relative overflow-hidden">
                        {/* Decorative blobs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                                <Sparkles size={16} /> Ready to start?
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                                Ready to Start? <br className="hidden sm:block" />
                                Build Now! 🚀
                            </h2>
                            <p className="text-blue-100/90 text-lg max-w-2xl mx-auto mb-8">
                                Start for free — no credit card required!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-base font-bold hover:shadow-2xl hover:scale-105 transition shadow-lg"
                                >
                                    Start for Free <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="px-8 py-4 border-2 border-white/30 text-white rounded-xl text-base font-semibold hover:bg-white/10 transition"
                                >
                                    Explore Features
                                </button>
                            </div>
                            <div className="mt-6 text-blue-100/70 text-sm">
                                🚀 No credit card required • Free forever plan
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="bg-gray-900 text-gray-400 pt-14 pb-8 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold">
                                    R
                                </div>
                                <span className="font-bold text-xl text-white">
                                    Resume<span className="text-blue-400">AI</span>
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                                Your AI-powered resume builder. Create professional resumes in minutes!
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <button
                                        onClick={() => scrollToSection('features')}
                                        className="hover:text-white transition"
                                    >
                                        Features
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('templates')}
                                        className="hover:text-white transition"
                                    >
                                        Templates
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => scrollToSection('pricing')}
                                        className="hover:text-white transition"
                                    >
                                        Pricing
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <button className="hover:text-white transition">About us</button>
                                </li>
                                <li>
                                    <button className="hover:text-white transition">Blog</button>
                                </li>
                                <li>
                                    <button className="hover:text-white transition">Contact</button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <button className="hover:text-white transition">Help Center</button>
                                </li>
                                <li>
                                    <button className="hover:text-white transition">Privacy Policy</button>
                                </li>
                                <li>
                                    <button className="hover:text-white transition">Terms of Service</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2025 ResumeAI — Made with ❤️ by Rajalok</p>
                        <div className="flex items-center gap-6">
                            <span className="hover:text-white cursor-pointer transition flex items-center gap-1.5">
                                <Globe size={14} /> English
                            </span>
                            <span className="hover:text-white cursor-pointer transition">Twitter</span>
                            <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
                            <span className="hover:text-white cursor-pointer transition">GitHub</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
                            <span className="hover:text-white cursor-pointer transition">📞 +91 75418 40606</span>
                            <span className="hover:text-white cursor-pointer transition">✉️ rajalok957641@gmail.com</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ========== ANIMATIONS ========== */}
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-7px); }
                }
            `}</style>
        </div>
    );
}
