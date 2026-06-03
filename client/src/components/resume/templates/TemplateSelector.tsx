import { useState, useEffect } from 'react';
import { Lock, Check, Crown, Sparkles, Star } from 'lucide-react';
import { useResumeStore } from '../../../store/useResumeStore';
import { useAuthStore } from '../../../store/useAuthStore';
import api from '../../../api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_TEMPLATES = [
  { id: 'modern-blue',    name: 'Modern Blue',    color: '#3B82F6', free: true,  icon: '🎨', description: 'Clean & Professional' },
  { id: 'emerald-pro',    name: 'Emerald Pro',    color: '#10B981', free: true,  icon: '💎', description: 'Premium Design' },
  { id: 'minimal-clean',  name: 'Minimal Clean',  color: '#6B7280', free: true,  icon: '✨', description: 'Simple & Elegant' },
  { id: 'slate-dark',     name: 'Slate Dark',     color: '#334155', free: false, icon: '🌙', description: 'Dark Modern Theme' },
  { id: 'rose-elegant',   name: 'Rose Elegant',   color: '#F43F5E', free: false, icon: '🌹', description: 'Elegant Pink Theme' },
  { id: 'violet-bold',    name: 'Violet Bold',    color: '#8B5CF6', free: false, icon: '💜', description: 'Bold Purple Design' },
  { id: 'amber-warm',     name: 'Amber Warm',     color: '#F59E0B', free: false, icon: '☀️', description: 'Warm Orange Theme' },
  { id: 'executive-pro',  name: 'Executive Pro',  color: '#1E293B', free: false, icon: '👔', description: 'Corporate Style' },
  { id: 'creative-split', name: 'Creative Split', color: '#EC4899', free: false, icon: '🎭', description: 'Creative Layout' },
  { id: 'tech-modern',    name: 'Tech Modern',    color: '#06B6D4', free: false, icon: '⚡', description: 'Tech Focused' },
];

interface TemplateSelectorProps {
  resumeId: string;
  onTemplateChange?: () => void;
}

export default function TemplateSelector({ resumeId, onTemplateChange }: TemplateSelectorProps) {
  const { currentResume, setCurrentResume } = useResumeStore();
  const { user } = useAuthStore();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  
  const isPro = user?.plan === 'pro';
  const freeCount = ALL_TEMPLATES.filter(t => t.free).length;
  const proCount = ALL_TEMPLATES.filter(t => !t.free).length;

  // ✅ Remove or comment this useEffect if it's causing error
  useEffect(() => {
    // Optional: Do something on mount
    console.log("TemplateSelector mounted");
  }, []); // ✅ Empty dependency array

  const selectTemplate = async (templateId: string, isFree: boolean) => {
    console.log("🟡 1. Template clicked:", templateId);
    console.log("🟡 2. Current resume before update:", currentResume?.template);
    
    if (!isFree && !isPro) {
      setShowUpgrade(true);
      return;
    }
    
    setLoading(templateId);
    
    try {
      const res = await api.put(`/resume/${resumeId}`, {
        ...currentResume,
        template: templateId,
      });
      
      console.log("🟢 3. API response:", res.data);
      console.log("🟢 4. New template from API:", res.data.resume?.template);
      
      setCurrentResume(res.data.resume);
      
      console.log("🟢 5. Store updated with template:", res.data.resume?.template);
      
      toast.success(`✨ ${ALL_TEMPLATES.find(t => t.id === templateId)?.name} template applied!`);
      
      // Call the callback if provided
      if (onTemplateChange) {
        onTemplateChange();
      }
      
    } catch (error: any) {
      console.log("🔴 Error:", error);
      toast.error(error.response?.data?.message || "Template change nahi hua!");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🎨 Resume Templates
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Choose a design that fits your style
          </p>
        </div>
        {!isPro && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-xs bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full"
          >
            <span className="text-yellow-700 font-semibold">
              {freeCount} Free • {proCount} Pro 👑
            </span>
          </motion.div>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {ALL_TEMPLATES.map((t, idx) => {
            const isLocked = !t.free && !isPro;
            const isActive = currentResume?.template === t.id;
            const isLoading = loading === t.id;
            const isHovered = hoveredTemplate === t.id;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => selectTemplate(t.id, t.free)}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-indigo-500 shadow-lg shadow-indigo-100'
                    : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
                } ${isLocked ? 'opacity-90' : ''}`}
                onMouseEnter={() => setHoveredTemplate(t.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Template Preview */}
                <div className="h-28 relative overflow-hidden" style={{ background: `${t.color}10` }}>
                  <motion.div 
                    className="absolute inset-0 p-3"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-2xl">{t.icon}</div>
                      {!t.free && isPro && (
                        <div className="bg-yellow-400 text-yellow-900 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <Star size={8} /> PRO
                        </div>
                      )}
                    </div>
                    <div className="h-1.5 rounded w-2/3 mb-1.5" style={{ background: t.color }} />
                    <div className="h-1 rounded w-1/2 opacity-60" style={{ background: t.color }} />
                    <div className="mt-2 space-y-1">
                      <div className="h-0.5 rounded bg-gray-200 w-full" />
                      <div className="h-0.5 rounded bg-gray-200 w-3/4" />
                    </div>
                  </motion.div>
                  
                  {isLocked && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="bg-white rounded-xl p-2 flex flex-col items-center shadow-lg">
                        <Lock size={16} className="text-indigo-600" />
                        <span className="text-[10px] font-bold text-indigo-600 mt-0.5">PRO</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1 shadow-lg"
                    >
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                </div>

                <div className="p-3 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">{t.name}</span>
                    {!t.free && !isPro && <Crown size={12} className="text-yellow-500" />}
                    {!t.free && isPro && <Sparkles size={10} className="text-purple-500" />}
                  </div>
                  <p className="text-[10px] text-gray-400">{t.description}</p>
                  <div className="mt-2 flex gap-2 text-[8px] text-gray-400">
                    <span>✓ ATS Friendly</span>
                    <span>✓ PDF Ready</span>
                  </div>
                </div>

                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverBorder"
                    className="absolute inset-0 border-2 border-indigo-300 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Current Template Badge */}
      {currentResume?.template && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Check size={14} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Active Template</p>
                <p className="text-sm font-semibold text-gray-800">
                  {ALL_TEMPLATES.find(t => t.id === currentResume.template)?.name || currentResume.template}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-gray-400">Applied ✓</div>
          </div>
        </motion.div>
      )}

      {/* Pro Features List */}
      {!isPro && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-100"
        >
          <div className="flex items-start gap-2">
            <Crown size={14} className="text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-yellow-800">Pro Templates Include:</p>
              <p className="text-[10px] text-yellow-700 mt-1">
                ✨ 7 Premium Designs • 🎨 Creative Layouts • 📄 Unlimited Downloads
              </p>
              <button
                onClick={() => window.location.href = '/upgrade'}
                className="mt-2 text-[10px] font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Upgrade to Pro →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpgrade(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Crown size={40} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Pro Templates! 👑</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Get access to all 10 premium templates, unlimited resumes, and AI-powered suggestions.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setShowUpgrade(false); window.location.href = '/upgrade'; }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  🚀 Upgrade Now — ₹299/month
                </motion.button>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="w-full text-gray-400 py-2 text-sm hover:text-gray-600 transition"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}