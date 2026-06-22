import { useState, useEffect } from 'react';
import { Lock, Check, Crown, Sparkles, Star, ArrowRight } from 'lucide-react';
import { useResumeStore } from '../../../store/useResumeStore';
import { useAuthStore } from '../../../store/useAuthStore';
import api from '../../../api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// ALL 11 TEMPLATES - ATS Friendly, Black & White
// ============================================================
const ALL_TEMPLATES = [
  // FREE TEMPLATES (5)
  { 
    id: 'classic', 
    name: 'Classic Pro', 
    color: '#1a1a1a', 
    free: true, 
    icon: '📄', 
    description: 'Timeless professional design',
    category: 'Free'
  },
  { 
    id: 'modern-clean', 
    name: 'Modern Clean', 
    color: '#2d2d2d', 
    free: true, 
    icon: '✨', 
    description: 'Clean & contemporary',
    category: 'Free'
  },
  { 
    id: 'minimalist', 
    name: 'Minimalist', 
    color: '#404040', 
    free: true, 
    icon: '⬜', 
    description: 'Ultra minimal & elegant',
    category: 'Free'
  },
  { 
    id: 'executive', 
    name: 'Executive', 
    color: '#1a1a2e', 
    free: true, 
    icon: '👔', 
    description: 'Corporate & sophisticated',
    category: 'Free'
  },
  { 
    id: 'ats-optimized', 
    name: 'ATS Optimized', 
    color: '#2d3748', 
    free: true, 
    icon: '🤖', 
    description: 'Best for ATS parsing',
    category: 'Free'
  },
  
  // PRO TEMPLATES (6)
  { 
    id: 'bold-header', 
    name: 'Bold Header', 
    color: '#000000', 
    free: false, 
    icon: '⚡', 
    description: 'Strong visual impact',
    category: 'Pro'
  },
  { 
    id: 'two-column', 
    name: 'Two Column', 
    color: '#2c3e50', 
    free: false, 
    icon: '📊', 
    description: 'Modern split layout',
    category: 'Pro'
  },
  { 
    id: 'clean-serif', 
    name: 'Clean Serif', 
    color: '#3d3d3d', 
    free: false, 
    icon: '✒️', 
    description: 'Elegant serif font',
    category: 'Pro'
  },
  { 
    id: 'compact', 
    name: 'Compact', 
    color: '#2d2d2d', 
    free: false, 
    icon: '📋', 
    description: 'Space-efficient design',
    category: 'Pro'
  },
  { 
    id: 'dark-sidebar', 
    name: 'Dark Sidebar', 
    color: '#1a202c', 
    free: false, 
    icon: '🌙', 
    description: 'Sleek dark accent',
    category: 'Pro'
  },
  { 
    id: 'european', 
    name: 'European', 
    color: '#2c3e50', 
    free: false, 
    icon: '🇪🇺', 
    description: 'Two-column grid layout',
    category: 'Pro'
  },
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'pro'>('all');
  
  const isPro = user?.plan === 'pro';
  const freeCount = ALL_TEMPLATES.filter(t => t.free).length;
  const proCount = ALL_TEMPLATES.filter(t => !t.free).length;

  // Filter templates based on category
  const filteredTemplates = selectedCategory === 'all' 
    ? ALL_TEMPLATES 
    : selectedCategory === 'free' 
      ? ALL_TEMPLATES.filter(t => t.free) 
      : ALL_TEMPLATES.filter(t => !t.free);

  // ✅ Fix: Empty useEffect with no errors
  useEffect(() => {
    // Component mounted
  }, []);

  const selectTemplate = async (templateId: string, isFree: boolean) => {
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
      
      setCurrentResume(res.data.resume);
      
      const templateName = ALL_TEMPLATES.find(t => t.id === templateId)?.name || templateId;
      toast.success(`✅ "${templateName}" template applied successfully!`);
      
      if (onTemplateChange) {
        onTemplateChange();
      }
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change template");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📄</span> Resume Templates
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Choose from {ALL_TEMPLATES.length} ATS-friendly designs
          </p>
        </div>
        {!isPro && (
          <div className="flex items-center gap-2 text-xs bg-gray-100 px-3 py-1.5 rounded-full">
            <span className="text-gray-600 font-medium">
              {freeCount} Free • {proCount} Pro
            </span>
            <Crown size={12} className="text-yellow-500" />
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {['all', 'free', 'pro'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' && 'All Templates'}
            {cat === 'free' && '🆓 Free'}
            {cat === 'pro' && '👑 Pro'}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence>
          {filteredTemplates.map((t, idx) => {
            const isLocked = !t.free && !isPro;
            const isActive = currentResume?.template === t.id;
            const isLoading = loading === t.id;
            const isHovered = hoveredTemplate === t.id;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => selectTemplate(t.id, t.free)}
                className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-gray-900 shadow-lg shadow-gray-200'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                } ${isLocked ? 'opacity-75' : ''}`}
                onMouseEnter={() => setHoveredTemplate(t.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Template Preview Card */}
                <div className="h-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <motion.div 
                    className="absolute inset-0 p-3"
                    animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xl">{t.icon}</span>
                      {!t.free && (
                        <span className="text-[8px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Star size={8} /> PRO
                        </span>
                      )}
                    </div>
                    {/* Preview lines */}
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 rounded w-3/4" style={{ background: t.color }} />
                      <div className="h-1 rounded w-1/2" style={{ background: t.color, opacity: 0.5 }} />
                      <div className="h-0.5 rounded bg-gray-300 w-full" />
                      <div className="h-0.5 rounded bg-gray-300 w-2/3" />
                    </div>
                  </motion.div>
                  
                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="bg-white rounded-lg p-2 shadow-lg">
                        <Lock size={14} className="text-gray-700" />
                      </div>
                    </div>
                  )}
                  
                  {/* Loading Spinner */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  
                  {/* Active Badge */}
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 bg-gray-900 rounded-full p-0.5 shadow-lg"
                    >
                      <Check size={10} className="text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-2.5 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{t.name}</span>
                    {!t.free && isPro && (
                      <Sparkles size={10} className="text-purple-500" />
                    )}
                  </div>
                  <p className="text-[8px] text-gray-400 mt-0.5 truncate">{t.description}</p>
                  <div className="mt-1 flex gap-1.5">
                    <span className="text-[7px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">ATS</span>
                    <span className="text-[7px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">PDF</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Current Template Status */}
      {currentResume?.template && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Active Template</p>
              <p className="text-sm font-semibold text-gray-800">
                {ALL_TEMPLATES.find(t => t.id === currentResume.template)?.name || currentResume.template}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-gray-400">✓ Applied</span>
        </motion.div>
      )}

      {/* Pro Upgrade Banner */}
      {!isPro && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200"
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Crown size={14} className="text-yellow-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800">Upgrade to Pro</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Unlock {proCount} premium templates + unlimited resumes
              </p>
              <button
                onClick={() => window.location.href = '/upgrade'}
                className="mt-1.5 text-[10px] font-medium text-gray-900 hover:text-gray-700 flex items-center gap-1"
              >
                Upgrade Now <ArrowRight size={10} />
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
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Pro Templates 👑</h3>
              <p className="text-gray-500 text-sm mb-6">
                Get access to {proCount} premium templates, unlimited resumes, and AI-powered suggestions.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setShowUpgrade(false); window.location.href = '/upgrade'; }}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow-lg text-sm"
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
