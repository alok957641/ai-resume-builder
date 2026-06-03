import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Plus,
  FileText,
  Trash2,
  Edit3,
  Crown,
  LogOut,
  Clock,
  Sparkles,
  TrendingUp,
  Target,
  Palette,
  Star,
  Eye,
  Rocket,
} from "lucide-react";

import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { useResumeStore } from "../store/useResumeStore";
import ATSChecker from '../components/ATSChecker';
import { motion, AnimatePresence } from "framer-motion";

// Template colors with full info
const TEMPLATES = {
  "modern-blue": { color: "#3B82F6", name: "Modern Blue", icon: "🎨", premium: false },
  "emerald-pro": { color: "#10B981", name: "Emerald Pro", icon: "💎", premium: true },
  "minimal-clean": { color: "#6B7280", name: "Minimal Clean", icon: "✨", premium: false },
  "slate-dark": { color: "#334155", name: "Slate Dark", icon: "🌙", premium: true },
  "rose-elegant": { color: "#F43F5E", name: "Rose Elegant", icon: "🌹", premium: true },
  "violet-bold": { color: "#8B5CF6", name: "Violet Bold", icon: "💜", premium: false },
  "amber-warm": { color: "#F59E0B", name: "Amber Warm", icon: "☀️", premium: true },
  "executive-pro": { color: "#1E293B", name: "Executive Pro", icon: "👔", premium: true },
  "creative-split": { color: "#EC4899", name: "Creative Split", icon: "🎭", premium: true },
  "tech-modern": { color: "#06B6D4", name: "Tech Modern", icon: "⚡", premium: false },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, setResumes, setCurrentResume } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [hoveredResume, setHoveredResume] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch {
      toast.error("Resumes load nahi hue!");
    }
  };

  const createNewResume = async (template?: string) => {
    setIsCreating(true);
    try {
      const res = await api.post("/resume", { 
        title: `My Resume ${resumes.length + 1}`,
        template: template || "modern-blue"
      });
      setCurrentResume(res.data.resume);
      navigate(`/resume/${res.data.resume._id}`);
      toast.success("Naya resume ban gaya! 🎉");
      setShowTemplateModal(false);
    } catch (error: any) {
      if (error.response?.data?.upgrade) {
        toast.error("Free plan: sirf 2 resumes! Pro upgrade karo 👑");
      } else {
        toast.error("Resume nahi bana!");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const deleteResume = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Resume delete karna chahte ho?")) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      toast.success("Delete ho gaya! 🗑️");
    } catch {
      toast.error("Delete nahi hua!");
    }
  };

  const openResume = async (id: string) => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
      navigate(`/resume/${id}`);
    } catch {
      toast.error("Resume nahi khula!");
    }
  };

  const isPro = user?.plan === "pro";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Rocket size={18} className="text-white sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Resume<span className="text-indigo-600">AI</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Plan Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                isPro
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isPro ? <Crown size={14} /> : <Star size={14} />}
              {isPro ? "Pro Member" : "Free Member"}
            </motion.div>

            {/* User Menu */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-sm"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {user?.name}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 block">
                  {user?.email}
                </span>
              </div>
            </motion.div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-red-50 transition"
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{resumes.length}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Total Resumes</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <FileText size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{isPro ? "∞" : `${resumes.length}/2`}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Plan Limit</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <TrendingUp size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{isPro ? "10+" : "3"}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Templates</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Sparkles size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* PRO Upgrade Banner */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="flex-shrink-0"
                >
                  <Crown size={24} className="text-yellow-300 sm:w-8 sm:h-8" />
                </motion.div>
                <div>
                  <p className="text-white font-bold text-base sm:text-xl">Unlock Premium Features! 🚀</p>
                  <p className="text-indigo-200 text-xs sm:text-sm">Unlimited resumes, 10+ templates, AI suggestions</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/upgrade")}
                className="bg-white text-indigo-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:shadow-xl transition"
              >
                Upgrade Now → ₹299/month
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Header with Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {resumes.length === 0 ? "Create your first professional resume" : `${resumes.length} resume${resumes.length > 1 ? 's' : ''} created`}
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/templates')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-indigo-50 transition text-sm sm:text-base"
            >
              <Palette size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Templates</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => createNewResume()}
              disabled={isCreating}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition text-sm sm:text-base"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              {isCreating ? "Creating..." : "New Resume"}
            </motion.button>
          </div>
        </div>

        {/* Resume Grid */}
        {resumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-24 bg-white rounded-2xl sm:rounded-3xl border-2 border-dashed border-gray-200"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <FileText size={32} className="text-indigo-600 sm:w-10 sm:h-10" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">No Resumes Yet</h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Click "New Resume" to start your journey! 🚀</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => createNewResume()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg text-sm sm:text-base"
            >
              + Create First Resume
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {resumes.map((resume, idx) => {
                const template = TEMPLATES[resume.template as keyof typeof TEMPLATES] || TEMPLATES["modern-blue"];
                const color = template.color;
                
                return (
                  <motion.div
                    key={resume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredResume(resume._id)}
                    onHoverEnd={() => setHoveredResume(null)}
                    className="group cursor-pointer"
                    onClick={() => openResume(resume._id)}
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                      {/* Template Preview */}
                      <div className="relative h-32 sm:h-40 overflow-hidden">
                        <div
                          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
                          }}
                        >
                          <div className="absolute inset-0 p-4 sm:p-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-xl mb-2 sm:mb-3" />
                                <div className="w-20 sm:w-32 h-1.5 bg-white/40 rounded mb-1.5" />
                                <div className="w-16 sm:w-24 h-1.5 bg-white/30 rounded" />
                              </div>
                              <motion.div
                                animate={{ rotate: hoveredResume === resume._id ? 360 : 0 }}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                              >
                                {template.premium && <Crown size={12} className="text-yellow-300 sm:w-4 sm:h-4" />}
                              </motion.div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                              <div className="flex gap-1.5 sm:gap-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-1 rounded-full bg-white/40"
                                    style={{ width: `${12 + i * 10}px` }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                          <span 
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-sm font-semibold"
                            style={{ color }}
                          >
                            {template.icon} {template.name}
                          </span>
                        </div>
                      </div>

                      {/* Resume Info */}
                      <div className="p-4 sm:p-5">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-indigo-600 transition">
                              {resume.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock size={10} className="text-gray-400 sm:w-3 sm:h-3" />
                              <span className="text-[10px] sm:text-xs text-gray-400">
                                Updated {new Date(resume.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => deleteResume(resume._id, e)}
                            className="p-1.5 sm:p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                          >
                            <Trash2 size={14} className="sm:w-4 sm:h-4" />
                          </motion.button>
                        </div>

                        {resume.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                            {resume.skills.slice(0, 3).map((skill: any, i: number) => (
                              <span
                                key={i}
                                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                              >
                                {skill.name}
                              </span>
                            ))}
                            {resume.skills.length > 3 && (
                              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                                +{resume.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openResume(resume._id)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-600 hover:to-purple-600 hover:text-white transition"
                          >
                            <Edit3 size={12} className="sm:w-3.5 sm:h-3.5" />
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition"
                          >
                            <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                            Preview
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ATS Checker Section - FULLY CENTERED & RESPONSIVE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200"
        >
          <div className="text-center max-w-3xl mx-auto px-4">
            {/* Animated Icon - Centered */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Target size={22} className="text-white sm:w-7 sm:h-7" />
              </motion.div>
            </div>
            
            {/* Title - Centered */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ATS Score Checker
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Upload your resume and get AI-powered ATS score with suggestions
            </p>
            
            {/* ATS Checker Component - Centered */}
            <div className="mt-4 sm:mt-6 flex justify-center">
              <div className="w-full max-w-lg sm:max-w-xl">
                <ATSChecker />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowTemplateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold">Choose a Template</h2>
              <p className="text-gray-500 text-sm">Select the perfect design for your resume</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {Object.entries(TEMPLATES).map(([key, template]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => createNewResume(key)}
                    className="relative group"
                    disabled={!isPro && template.premium}
                  >
                    <div
                      className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-indigo-600 transition"
                      style={{ background: `linear-gradient(135deg, ${template.color}dd, ${template.color}99)` }}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{template.icon}</div>
                        <div className="w-full h-1 bg-white/40 rounded mb-1.5" />
                        <div className="w-3/4 h-1 bg-white/30 rounded" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="font-semibold text-xs sm:text-sm">{template.name}</p>
                      {template.premium && (
                        <p className="text-[10px] sm:text-xs text-yellow-600 flex items-center justify-center gap-1">
                          <Crown size={10} /> Premium
                        </p>
                      )}
                    </div>
                    {!isPro && template.premium && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center text-white">
                          <Crown size={20} className="mx-auto mb-1 sm:w-6 sm:h-6" />
                          <p className="text-[10px] sm:text-xs font-semibold">Pro Feature</p>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}