import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Plus, FileText, Trash2, Edit3,
  Crown, LogOut, User, Clock,
  Sparkles, TrendingUp
} from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import { useResumeStore } from '../store/useResumeStore';

// Template colors
const TEMPLATE_COLORS: Record<string, string> = {
  'modern-blue': '#3B82F6',
  'emerald-pro': '#10B981',
  'minimal-clean': '#6B7280',
  'slate-dark': '#334155',
  'rose-elegant': '#F43F5E',
  'violet-bold': '#8B5CF6',
  'amber-warm': '#F59E0B',
  'executive-pro': '#1E293B',
  'creative-split': '#EC4899',
  'tech-modern': '#06B6D4',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, setResumes, setCurrentResume } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => { fetchResumes(); }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resume');
      setResumes(res.data);
    } catch { toast.error('Resumes load nahi hue!'); }
  };

  const createNewResume = async () => {
    setIsCreating(true);
    try {
      const res = await api.post('/resume', { title: 'Naya Resume' });
      setCurrentResume(res.data.resume);
      navigate(`/resume/${res.data.resume._id}`);
      toast.success('Naya resume ban gaya!');
    } catch (error: any) {
      if (error.response?.data?.upgrade) {
        toast.error('Free plan: sirf 2 resumes! Pro upgrade karo 👑');
      } else {
        toast.error('Resume nahi bana!');
      }
    } finally { setIsCreating(false); }
  };

  const deleteResume = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Resume delete karna chahte ho?')) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter(r => r._id !== id));
      toast.success('Delete ho gaya!');
    } catch { toast.error('Delete nahi hua!'); }
  };

  const openResume = async (id: string) => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
      navigate(`/resume/${id}`);
    } catch { toast.error('Resume nahi khula!'); }
  };

  const isPro = user?.plan === 'pro';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Resume<span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">

            {/* Plan Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isPro
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {isPro ? <Crown size={12} /> : <User size={12} />}
              {isPro ? 'Pro Plan' : 'Free Plan'}
            </div>

            {/* User Name */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-xl hover:bg-red-50 transition text-sm"
            >
              <LogOut size={15} />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
                <p className="text-sm text-gray-500">Total Resumes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {isPro ? '∞' : `${resumes.length}/2`}
                </p>
                <p className="text-sm text-gray-500">Plan Limit</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {isPro ? '10+' : '3'}
                </p>
                <p className="text-sm text-gray-500">Templates</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRO UPGRADE BANNER — Free users ke liye */}
        {!isPro && (
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown size={24} className="text-yellow-300" />
              <div>
                <p className="text-white font-bold">Pro Plan upgrade karo!</p>
                <p className="text-indigo-200 text-sm">
                  Unlimited resumes, 10+ templates, advanced AI
                </p>
              </div>
            </div>
            <button className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition shrink-0">
              ₹299/month →
            </button>
          </div>
        )}

        {/* HEADER + CREATE BUTTON */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mere Resumes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {resumes.length === 0
                ? 'Abhi koi resume nahi — pehla banao!'
                : `${resumes.length} resume bane hain`}
            </p>
          </div>
          <button
            onClick={createNewResume}
            disabled={isCreating}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition shadow-sm shadow-indigo-200"
          >
            <Plus size={18} />
            {isCreating ? 'Ban raha hai...' : 'Naya Resume'}
          </button>
        </div>

        {/* RESUME GRID */}
        {resumes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Koi resume nahi hai abhi
            </h3>
            <p className="text-gray-400 mb-6">
              "Naya Resume" button dabao aur shuru karo!
            </p>
            <button
              onClick={createNewResume}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              + Pehla Resume Banao
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => {
              const color = TEMPLATE_COLORS[resume.template] || '#3B82F6';
              return (
                <div
                  key={resume._id}
                  onClick={() => openResume(resume._id)}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                >
                  {/* Mini Preview Header */}
                  <div className="h-24 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}>
                    <div className="absolute inset-0 p-4">
                      <div className="h-2 rounded w-1/2 mb-2" style={{ background: color }} />
                      <div className="h-1.5 rounded w-1/3 opacity-60" style={{ background: color }} />
                      <div className="absolute bottom-3 right-3 flex gap-1">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-1 rounded" style={{
                            width: `${20 + i * 8}px`, background: `${color}60`
                          }}/>
                        ))}
                      </div>
                    </div>
                    {/* Template color indicator */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ background: color }} />
                  </div>

                  {/* Card Info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">
                          {resume.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {new Date(resume.updatedAt).toLocaleDateString('hi-IN')}
                          </span>
                        </div>
                      </div>
                      {/* Delete button */}
                      <button
                        onClick={(e) => deleteResume(resume._id, e)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Template + Skills chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${color}15`, color }}>
                        {resume.template || 'modern-blue'}
                      </span>
                      {resume.skills?.slice(0, 2).map((s, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                          {s.name}
                        </span>
                      ))}
                      {resume.skills?.length > 2 && (
                        <span className="text-xs text-gray-400">+{resume.skills.length - 2}</span>
                      )}
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => openResume(resume._id)}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition"
                    >
                      <Edit3 size={14} />
                      Edit Karo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}