import { useState } from 'react';
import { Lock, Check, Crown } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../api';
import { toast } from 'react-hot-toast';

const ALL_TEMPLATES = [
  { id: 'modern-blue',    name: 'Modern Blue',    color: '#3B82F6', free: true  },
  { id: 'emerald-pro',    name: 'Emerald Pro',    color: '#10B981', free: true  },
  { id: 'minimal-clean',  name: 'Minimal Clean',  color: '#6B7280', free: true  },
  { id: 'slate-dark',     name: 'Slate Dark',     color: '#334155', free: false },
  { id: 'rose-elegant',   name: 'Rose Elegant',   color: '#F43F5E', free: false },
  { id: 'violet-bold',    name: 'Violet Bold',    color: '#8B5CF6', free: false },
  { id: 'amber-warm',     name: 'Amber Warm',     color: '#F59E0B', free: false },
  { id: 'executive-pro',  name: 'Executive Pro',  color: '#1E293B', free: false },
  { id: 'creative-split', name: 'Creative Split', color: '#EC4899', free: false },
  { id: 'tech-modern',    name: 'Tech Modern',    color: '#06B6D4', free: false },
];

export default function TemplateSelector({ resumeId }: { resumeId: string }) {
  const { currentResume, setCurrentResume } = useResumeStore();
  const { user } = useAuthStore();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const isPro = user?.plan === 'pro';

  const selectTemplate = async (templateId: string, isFree: boolean) => {
    if (!isFree && !isPro) {
      setShowUpgrade(true);
      return;
    }
    try {
      const res = await api.put(`/resume/${resumeId}`, {
        ...currentResume,
        template: templateId,
      });
      setCurrentResume(res.data.resume);
      toast.success('Template change ho gaya!');
    } catch {
      toast.error('Template nahi chala!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">🎨 Templates</h2>
        {!isPro && (
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            3 free • 7 pro 👑
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ALL_TEMPLATES.map((t) => {
          const isLocked = !t.free && !isPro;
          const isActive = currentResume?.template === t.id;

          return (
            <div
              key={t.id}
              onClick={() => selectTemplate(t.id, t.free)}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                isActive
                  ? 'border-indigo-500 shadow-md shadow-indigo-100'
                  : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              {/* Mini Preview */}
              <div className="h-20 relative" style={{ background: `${t.color}15` }}>
                <div className="absolute inset-0 p-3">
                  <div className="h-2 rounded w-1/2 mb-1.5" style={{ background: t.color }} />
                  <div className="h-1.5 rounded w-1/3 mb-2 opacity-60" style={{ background: t.color }} />
                  {[1,2,3].map(i => (
                    <div key={i} className="h-1 rounded mb-1 bg-gray-200" style={{ width: `${60+i*10}%` }} />
                  ))}
                </div>
                {/* Lock overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-white/90 rounded-xl p-2 flex flex-col items-center">
                      <Lock size={14} className="text-indigo-600" />
                      <span className="text-[10px] font-bold text-indigo-600 mt-0.5">PRO</span>
                    </div>
                  </div>
                )}
                {/* Active checkmark */}
                {isActive && (
                  <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-0.5">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="p-2 bg-white flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{t.name}</span>
                {!t.free && !isPro && (
                  <Crown size={12} className="text-yellow-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown size={32} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Template!</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Ye template Pro plan mein milega. Upgrade karo aur
              unlock karo saare 10 templates!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { setShowUpgrade(false); window.location.href = '/upgrade'; }}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                👑 Pro Upgrade Karo — ₹299/month
              </button>
              <button
                onClick={() => setShowUpgrade(false)}
                className="w-full text-gray-400 py-2 text-sm"
              >
                Baad mein
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}