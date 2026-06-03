import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Crown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import { useResumeStore } from '../store/useResumeStore';

// Import templates
import { 
  TemplateModernBlue, 
  TemplateEmerald, 
  TemplateMinimal,
  TemplateATS,
  TemplateDark, 
  TemplateRose, 
  TemplateViolet,
  TemplateAmber, 
  TemplateCyan, 
  TemplatePink,
  TemplateNavy 
} from '../components/resume/templates/AllTemplates';

// Simple preview data
const PREVIEW_DATA = {
  personalInfo: { fullName: 'Your Name', email: 'you@example.com', phone: '+91 98765 43210' },
  experience: [{ 
    position: 'Software Engineer', 
    company: 'Tech Corp',
    startDate: '2020',
    endDate: 'Present',
    description: 'Worked on awesome projects'
  }],
  education: [{ 
    degree: 'B.Tech',
    institution: 'University',
    startDate: '2016',
    endDate: '2020'
  }],
  skills: [{ name: 'JavaScript' }, { name: 'React' }, { name: 'Node.js' }],
  projects: [],
  certificates: []
};

const TEMPLATES = [
  { id: 'modern-blue', name: 'Modern Blue', tag: 'Popular', free: true, Component: TemplateModernBlue },
  { id: 'minimal-clean', name: 'Minimal Clean', tag: null, free: true, Component: TemplateMinimal },
  { id: 'ats-classic', name: 'ATS Classic', tag: 'ATS ✓', free: true, Component: TemplateATS },
  { id: 'emerald-pro', name: 'Emerald Pro', tag: 'New', free: true, Component: TemplateEmerald },
  { id: 'slate-dark', name: 'Slate Dark', tag: 'PRO', free: false, Component: TemplateDark },
  { id: 'rose-elegant', name: 'Rose Elegant', tag: 'PRO', free: false, Component: TemplateRose },
  { id: 'violet-bold', name: 'Violet Bold', tag: 'PRO', free: false, Component: TemplateViolet },
  { id: 'amber-warm', name: 'Amber Warm', tag: 'PRO', free: false, Component: TemplateAmber },
  { id: 'tech-modern', name: 'Tech Modern', tag: 'PRO', free: false, Component: TemplateCyan },
  { id: 'creative-pink', name: 'Creative Pink', tag: 'PRO', free: false, Component: TemplatePink },
  { id: 'executive-pro', name: 'Navy Executive', tag: 'PRO', free: false, Component: TemplateNavy },
];

interface Template {
  id: string;
  name: string;
  tag: string | null;
  free: boolean;
  Component: React.ComponentType<any>;
}

export default function TemplateChooser() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setCurrentResume } = useResumeStore();
  const [loading, setLoading] = useState<string>('');
  
  const isPro = user?.plan === 'pro';

  const handleSelect = async (templateId: string, isFree: boolean) => {
    if (!isFree && !isPro) {
      toast.error('Pro feature! Upgrade to unlock 👑');
      navigate('/upgrade');
      return;
    }
    
    setLoading(templateId);
    
    try {
      const res = await api.post('/resume', {
        title: 'My Resume',
        template: templateId,
      });
      
      setCurrentResume(res.data.resume);
      const templateName = TEMPLATES.find(t => t.id === templateId)?.name;
      toast.success(`✨ ${templateName} template selected!`);
      navigate(`/resume/${res.data.resume._id}`);
      
    } catch (error: any) {
      if (error.response?.data?.upgrade) {
        toast.error('Free plan: Only 2 resumes! Upgrade to Pro 👑');
        navigate('/upgrade');
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
    } finally { 
      setLoading(''); 
    }
  };

  const getTagStyle = (tag: string | null): string => {
    if (!tag) return '';
    if (tag === 'PRO') return 'bg-gradient-to-r from-indigo-600 to-purple-600';
    if (tag === 'ATS ✓') return 'bg-green-600';
    if (tag === 'New') return 'bg-pink-600';
    return 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold">
              Resume<span className="text-indigo-600">AI</span>
            </span>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-gray-400 hover:text-gray-600 text-sm transition flex items-center gap-1"
            >
              ← Dashboard
            </button>
          </div>
          {!isPro && (
            <div className="flex items-center gap-2 text-xs bg-yellow-50 px-3 py-1.5 rounded-full">
              <Crown size={12} className="text-yellow-600" />
              <span className="text-yellow-700">Free: 4 templates</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Template</h1>
        <p className="text-gray-500 mt-3">Select a professional template to get started</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((template: Template) => {
            const TemplateComponent = template.Component;
            const isLocked = !template.free && !isPro;
            
            return (
              <div 
                key={template.id} 
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gray-100" style={{ height: 220 }}>
                  <div className="scale-[0.4] origin-top-left pointer-events-none" style={{ width: 400 }}>
                    <TemplateComponent resume={PREVIEW_DATA} />
                  </div>

                  {template.tag && (
                    <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full text-white shadow-sm ${getTagStyle(template.tag)}`}>
                      {template.tag}
                    </div>
                  )}

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                        <Lock size={14} /> Pro Feature
                      </div>
                    </div>
                  )}

                  {!isLocked && (
                    <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(template.id, template.free);
                        }}
                        disabled={loading === template.id}
                        className="bg-white text-indigo-600 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
                      >
                        {loading === template.id ? (
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Use Template <ArrowRight size={14} /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">{template.name}</span>
                  {!template.free && <span className="text-xs text-yellow-600 flex items-center gap-1"><Crown size={10} /> Pro</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}