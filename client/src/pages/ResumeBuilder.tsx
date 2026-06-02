import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import api from '../api';
import { useResumeStore } from '../store/useResumeStore';
import PersonalInfoForm from "../components/resume/PersonalInfoForm"
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import ResumePreview from '../components/resume/ResumePreview';

const TABS = [
  { id: 'personal', label: '👤 Personal' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'skills', label: '🛠️ Skills' },
];

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, setCurrentResume } = useResumeStore();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-3 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
            {currentResume.title}
          </h1>
        </div>
        <button
          onClick={saveResume}
          disabled={isSaving}
          className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700"
        >
          <Save size={14} />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </nav>

      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex h-[calc(100vh-60px)]">
          {/* Form - Left */}
          <div className="w-1/2 overflow-y-auto border-r bg-white">
            <div className="flex border-b sticky top-0 bg-white">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === 'personal' && <PersonalInfoForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
            </div>
          </div>

          {/* Preview - Right */}
          <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
            <ResumePreview />
          </div>
        </div>
      ) : (
        /* Mobile Layout - Sirf Form, Preview button ResumePreview mein handle karega */
        <div className="h-[calc(100vh-60px)] overflow-y-auto">
          <div className="flex border-b sticky top-0 bg-white overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 pb-24">
            {activeTab === 'personal' && <PersonalInfoForm />}
            {activeTab === 'experience' && <ExperienceForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'skills' && <SkillsForm />}
          </div>
          
          {/* Mobile Preview Button - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t shadow-lg">
            <ResumePreview />
          </div>
        </div>
      )}
    </div>
  );
}