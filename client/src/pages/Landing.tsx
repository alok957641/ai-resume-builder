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
            <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function StatBadge({ number, label, color }: { number: string; label: string; color: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl font-extrabold" style={{ color }}>
                {number}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 font-medium">{label}</div>
        </div>
    );
}

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

    // Navigation items
    const navItems = [
        { label: 'Services', id: 'services' },
        { label: 'How it works', id: 'how-it-works' },
        { label: 'About us', id: 'about' },
    ];

    const features = [
        {
            icon: <Zap size={24} className="text-blue-600" />,
            title: 'Custom Workflow',
            desc: 'Create a custom workflow to automate your tasks. Automate repetitive tasks and free up time for more important work.',
            bg: 'bg-blue-50',
        },
        {
            icon: <Users size={24} className="text-emerald-600" />,
            title: 'Multi-team projects',
            desc: 'Collaborate with your team on projects. Share files and documents with ease.',
            bg: 'bg-emerald-50',
        },
        {
            icon: <Cloud size={24} className="text-purple-600" />,
            title: 'Data Sync and Backup',
            desc: 'Sync your data with our secure cloud storage. Backup your data to prevent data loss.',
            bg: 'bg-purple-50',
        },
        {
            icon: <ListChecks size={24} className="text-rose-600" />,
            title: 'Task List',
            desc: 'Create and manage tasks. Add subtasks to your tasks.',
            bg: 'bg-rose-50',
        },
        {
            icon: <Paperclip size={24} className="text-amber-600" />,
            title: 'Task Attachments',
            desc: 'Attach files to your tasks. Share files with your team.',
            bg: 'bg-amber-50',
        },
        {
            icon: <BarChart3 size={24} className="text-cyan-600" />,
            title: 'Analytics & Insights',
            desc: 'Track your productivity with detailed analytics. Visualize your progress and identify areas for improvement.',
            bg: 'bg-cyan-50',
        },
    ];

    const stats = [
        { number: '29M+', label: 'Intuitive interface', color: '#2563eb' },
        { number: '100M+', label: 'Total tasks saved', color: '#059669' },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Product Manager at TechCorp',
            quote: 'Mutmiz has completely transformed how our team manages projects. The workflow automation is a game-changer!',
            avatar: 'SJ',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            role: 'Freelance Developer',
            quote: 'I love how easy it is to track tasks and collaborate with clients. The interface is so intuitive!',
            avatar: 'MC',
            rating: 5,
        },
        {
            name: 'Emily Rodriguez',
            role: 'Operations Lead at StartUpHub',
            quote: 'The data sync and backup features give me peace of mind. I never worry about losing important project data.',
            avatar: 'ER',
            rating: 5,
        },
    ];

    const howItWorks = [
        { step: '01', title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card required.' },
        { step: '02', title: 'Create Your Workspace', desc: 'Set up your projects, invite team members, and start organizing.' },
        { step: '03', title: 'Automate & Collaborate', desc: 'Build custom workflows, assign tasks, and watch your productivity soar.' },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#f0f7ff', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

            {/* ========== NAVBAR ========== */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/80 sticky top-0 z-50 px-4 sm:px-8 lg:px-16 py-4 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-200">
                        M
                    </div>
                    <span className="font-bold text-2xl text-gray-900 tracking-tight">
                        Mut<span className="text-blue-600">miz</span>
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
                        {mobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
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
                            onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
                            className="flex items-center gap-2 w-full text-left text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 rounded-lg"
                        >
                            <Shield size={16} /> Admin Panel
                        </button>
                    )}
                    <button
                        onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                        className="block w-full text-left text-sm font-medium text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
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
                        <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200/50">
                                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
                                Task Management • Made Simple
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                                Maximize Your <br />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Productivity</span>
                            </h1>

                            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                                Courage Your Tasks and Take Control with Our Task Manager App.
                                Simplify your workflow, collaborate seamlessly, and achieve more every day.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-blue-200 transition shadow-lg"
                                >
                                    Get Started Free <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('how-it-works')}
                                    className="px-8 py-4 border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-600 hover:bg-white hover:border-blue-300 transition"
                                >
                                    How it works
                                </button>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-2">
                                    {['#1a1a2e', '#16213e', '#0f3460', '#533483'].map((c, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                                            style={{ background: c }}
                                        >
                                            {['A', 'B', 'C', 'D'][i]}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold text-gray-900">1M+</span>
                                    <span className="text-gray-400 ml-1">users trust Mutmiz</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT - Hero visual */}
                        <div className={`flex justify-center relative transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="relative w-full max-w-md">
                                {/* Main card */}
                                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100/50 relative" style={{ transform: 'rotate(1deg)' }}>
                                    {/* App mockup header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
                                            <span className="font-bold text-gray-900 text-sm">Mutmiz</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                    </div>

                                    {/* Task list mockup */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                            <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-800">Design review meeting</div>
                                                <div className="text-xs text-gray-400">Today, 3:00 PM</div>
                                            </div>
                                            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Urgent</div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-800">Update project docs</div>
                                                <div className="text-xs text-gray-400">Tomorrow, 10:00 AM</div>
                                            </div>
                                            <div className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Medium</div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                            <div className="w-5 h-5 rounded-full border-2 border-green-400 flex items-center justify-center">
                                                <CheckCircle size={14} className="text-green-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-400 line-through">Send weekly report</div>
                                                <div className="text-xs text-gray-400">Completed</div>
                                            </div>
                                            <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Done</div>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                            <span>Daily progress</span>
                                            <span className="font-semibold text-gray-700">65%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '65%' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-4 -right-6 bg-white rounded-2xl px-4 py-3 shadow-xl z-10 border border-gray-100/50" style={{ animation: 'float1 3s ease-in-out infinite' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <Award size={20} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-medium">Productivity</div>
                                            <div className="text-lg font-extrabold text-gray-900">+42%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-xl z-10 border border-gray-100/50 max-w-44" style={{ animation: 'float2 3.5s ease-in-out infinite' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles size={14} className="text-purple-500" />
                                        <span className="text-xs font-bold text-gray-800">AI Assistant</span>
                                    </div>
                                    <div className="text-[10px] text-gray-500 leading-relaxed">"You're 2x more productive with Mutmiz!"</div>
                                </div>

                                <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-amber-100 rounded-xl px-3 py-2 shadow-md z-10 border border-amber-200/50" style={{ animation: 'float3 4s ease-in-out infinite' }}>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} className="text-amber-700" />
                                        <span className="text-[10px] font-bold text-amber-800">Time saved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== STATS BANNER ========== */}
            <section className="bg-white/80 backdrop-blur-sm border-y border-gray-100/80 py-8 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: stat.color + '15' }}>
                                <span className="text-2xl font-extrabold" style={{ color: stat.color }}>
                                    {stat.number.replace(/[^0-9.]/g, '')}
                                </span>
                            </div>
                            <div>
                                <div className="text-lg font-extrabold text-gray-900">{stat.number}</div>
                                <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== SERVICES / FEATURES ========== */}
            <section id="services" className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Sparkles size={14} /> Features
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Everything you need to <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">stay organized</span>
                        </h2>
                        <p className="text-gray-500 text-lg">Powerful features designed to help you and your team work smarter, not harder.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, idx) => (
                            <FeatureCard key={idx} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section id="how-it-works" className="bg-white py-20 px-4 sm:px-8 lg:px-16 border-t border-gray-100/80">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Brain size={14} /> How it works
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Get started in <span className="text-indigo-600">3 simple steps</span>
                        </h2>
                        <p className="text-gray-500 text-lg">From sign-up to full productivity — it's that easy.</p>
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
            <section id="about" className="py-20 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                            <Star size={14} fill="currentColor" /> Testimonials
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                            Loved by <span className="text-rose-600">1M+ users</span> worldwide
                        </h2>
                        <p className="text-gray-500 text-lg">Real stories from real people who transformed their workflow with Mutmiz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
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

            {/* ========== CTA SECTION ========== */}
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
                                Ready? Let's Start with Mutmiz <br className="hidden sm:block" />
                                and Get Awesome Experience
                            </h2>
                            <p className="text-blue-100/90 text-lg max-w-2xl mx-auto mb-8">
                                Join our community of 1M+ users. Start your journey with Mutmiz today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-base font-bold hover:shadow-2xl hover:scale-105 transition shadow-lg"
                                >
                                    Get Started Free <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
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
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold">M</div>
                                <span className="font-bold text-xl text-white">Mut<span className="text-blue-400">miz</span></span>
                            </div>
                            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                                The smartest way to manage tasks, collaborate with teams, and boost productivity.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition">Features</button></li>
                                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition">How it works</button></li>
                                <li><button className="hover:text-white transition">Pricing</button></li>
                                <li><button className="hover:text-white transition">Integrations</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">About us</button></li>
                                <li><button className="hover:text-white transition">Careers</button></li>
                                <li><button className="hover:text-white transition">Blog</button></li>
                                <li><button className="hover:text-white transition">Contact</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><button className="hover:text-white transition">Help Center</button></li>
                                <li><button className="hover:text-white transition">Community</button></li>
                                <li><button className="hover:text-white transition">Privacy Policy</button></li>
                                <li><button className="hover:text-white transition">Terms of Service</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2025 Mutmiz — Made with ❤️ by Rajalok</p>
                        <div className="flex items-center gap-6">
                            <span className="hover:text-white cursor-pointer transition flex items-center gap-1.5">
                                <Globe size={14} /> English
                            </span>
                            <span className="hover:text-white cursor-pointer transition">Twitter</span>
                            <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
                            <span className="hover:text-white cursor-pointer transition">GitHub</span>
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
