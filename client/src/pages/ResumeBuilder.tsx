import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Save, ArrowLeft, ChevronLeft, ChevronRight, Eye, Edit3 } from "lucide-react";
import api from "../api";
import { useResumeStore } from "../store/useResumeStore";
import PersonalInfoForm from "../components/resume/PersonalInfoForm";
import ExperienceForm from "../components/resume/ExperienceForm";
import EducationForm from "../components/resume/EducationForm";
import SkillsForm from "../components/resume/SkillsForm";
import ProjectsForm from "../components/resume/ProjectsForm";
import CertificatesForm from "../components/resume/CertificatesForm";
import ResumePreview from "../components/resume/ResumePreview";
import TemplateSelector from "../components/resume/templates/TemplateSelector";
import ResumeScore from "../components/resume/ResumeScore";
import ShareResume from "../components/resume/ShareResume";
import InterviewQuestions from "../components/resume/InterviewQuestions";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "certificates", label: "Certificates", icon: "📜" },
  { id: "templates", label: "Templates", icon: "🎨" },
  { id: "score", label: "Score", icon: "📊" },
  { id: "share", label: "Share", icon: "🔗" },
];

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, setCurrentResume } = useResumeStore();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch resume on mount
  useEffect(() => {
    if (id) fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resume/${id}`);
      const resumeData = {
        ...res.data,
        projects: res.data.projects || [],
        certificates: res.data.certificates || [],
        experience: res.data.experience || [],
        education: res.data.education || [],
        skills: res.data.skills || [],
      };
      setCurrentResume(resumeData);
    } catch (error) {
      toast.error("Failed to load resume!");
      navigate("/dashboard");
    }
  };

  const saveResume = async () => {
    if (!currentResume) return;
    setIsSaving(true);
    try {
      const saveData = {
        ...currentResume,
        projects: currentResume.projects || [],
        certificates: currentResume.certificates || [],
      };
      const res = await api.put(`/resume/${id}`, saveData);
      setCurrentResume(res.data.resume);
      toast.success("Saved successfully! ✅");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save!");
    } finally {
      setIsSaving(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTemplateChange = useCallback(() => {
    setPreviewKey(prev => prev + 1);
    fetchResume();
  }, [id]);

  if (!currentResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-20"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800">{currentResume.title}</h1>
            {isSaving && (
              <p className="text-xs text-gray-400">Saving...</p>
            )}
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveResume}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save"}
        </motion.button>
      </motion.nav>

      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex h-[calc(100vh-60px)]">
          {/* Left Panel - Forms */}
          <div className="w-1/2 overflow-y-auto border-r bg-white">
            {/* Tabs */}
            <div className="relative border-b sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 z-10 p-1.5 bg-white shadow-md rounded-full ml-2 hover:bg-gray-100 transition"
                >
                  <ChevronLeft size={16} />
                </button>
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto scrollbar-hide mx-10"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
                          activeTab === tab.id
                            ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <span className="mr-1">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 z-10 p-1.5 bg-white shadow-md rounded-full mr-2 hover:bg-gray-100 transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "personal" && <PersonalInfoForm />}
                  {activeTab === "experience" && <ExperienceForm />}
                  {activeTab === "education" && <EducationForm />}
                  {activeTab === "skills" && (
                    <div className="space-y-6">
                      <SkillsForm />
                      <InterviewQuestions />
                    </div>
                  )}
                  {activeTab === "projects" && <ProjectsForm />}
                  {activeTab === "certificates" && <CertificatesForm />}
                  {activeTab === "templates" && (
                    <TemplateSelector 
                      resumeId={id!} 
                      onTemplateChange={handleTemplateChange}
                    />
                  )}
                  {activeTab === "score" && <ResumeScore />}
                  {activeTab === "share" && <ShareResume />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
            <div className="sticky top-6">
              <ResumePreview key={previewKey} />
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div className="h-[calc(100vh-60px)] overflow-y-auto pb-24">
          {/* Mobile Tabs */}
          <div className="relative border-b sticky top-0 bg-white z-10">
            <div className="flex items-center">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-10 p-1 bg-white shadow-md rounded-full ml-1"
              >
                <ChevronLeft size={16} />
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide mx-7"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-3 text-xs font-medium transition whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500"
                      }`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-10 p-1 bg-white shadow-md rounded-full mr-1"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          {/* Mobile Form Content */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {activeTab === "personal" && <PersonalInfoForm />}
                {activeTab === "experience" && <ExperienceForm />}
                {activeTab === "education" && <EducationForm />}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <SkillsForm />
                    <InterviewQuestions />
                  </div>
                )}
                {activeTab === "projects" && <ProjectsForm />}
                {activeTab === "certificates" && <CertificatesForm />}
                {activeTab === "templates" && (
                  <TemplateSelector 
                    resumeId={id!} 
                    onTemplateChange={handleTemplateChange}
                  />
                )}
                {activeTab === "score" && <ResumeScore />}
                {activeTab === "share" && <ShareResume />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Preview Button */}
          <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t shadow-lg z-20">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {showMobilePreview ? <Edit3 size={16} /> : <Eye size={16} />}
              {showMobilePreview ? "Edit Resume" : "Preview Resume"}
            </motion.button>
          </div>

          {/* Mobile Preview Modal */}
          <AnimatePresence>
            {showMobilePreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white z-30 overflow-y-auto"
              >
                <div className="sticky top-0 bg-white p-3 border-b flex justify-between items-center">
                  <h3 className="font-bold text-indigo-600">Resume Preview</h3>
                  <button
                    onClick={() => setShowMobilePreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <ResumePreview key={previewKey} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}