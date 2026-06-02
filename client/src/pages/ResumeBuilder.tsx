import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Save, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import api from '../api';
import { useResumeStore } from '../store/useResumeStore';
import PersonalInfoForm from "../components/resume/PersonalInfoForm"
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import ResumePreview from '../components/resume/ResumePreview';

// Tabs ka list
const TABS = [
  { id: 'personal', label: '👤 Personal' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'skills', label: '🛠️ Skills' },
];

export default function ResumeBuilder() {
  const { id } = useParams();           // URL se resume id lo
  const navigate = useNavigate();
  const { currentResume, setCurrentResume } = useResumeStore();

  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Page load pe resume fetch karo
  useEffect(() => {
    if (id) fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
    } catch (error) {
      toast.error('Resume load nahi hua!');
      navigate('/dashboard');
    }
  };

  // Save karo database mein
  const saveResume = async () => {
    if (!currentResume) return;
    setIsSaving(true);
    try {
      await api.put(`/resume/${id}`, currentResume);
      toast.success('Saved! ✅');
    } catch (error) {
      toast.error('Save nahi hua!');
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading... ⏳</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {currentResume.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview toggle — mobile pe */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Preview Chupaao' : 'Preview Dikhao'}
          </button>

          {/* Save button */}
          <button
            onClick={saveResume}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </nav>

      {/* Main Layout — Left: Form, Right: Preview */}
      <div className="flex h-[calc(100vh-60px)]">

        {/* LEFT SIDE — Form */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-y-auto border-r border-gray-200 bg-white`}>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && <PersonalInfoForm />}
            {activeTab === 'experience' && <ExperienceForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'skills' && <SkillsForm />}
          </div>
        </div>

        {/* RIGHT SIDE — Preview */}
        {showPreview && (
          <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
            <ResumePreview />
          </div>
        )}
      </div>
    </div>
  );
}