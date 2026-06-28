import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  GraduationCap,
  LayoutTemplate,
  Link2,
  Save,
  Share2,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const TABS = [
  { id: "personal", label: "Profile", icon: UserRound },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "score", label: "ATS Score", icon: CheckCircle2 },
  { id: "share", label: "Share", icon: Share2 },
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchResume = useCallback(async () => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume({
        ...res.data,
        projects: res.data.projects || [],
        certificates: res.data.certificates || [],
        experience: res.data.experience || [],
        education: res.data.education || [],
        skills: res.data.skills || [],
      });
    } catch {
      toast.error("Resume load nahi hua.");
      navigate("/dashboard");
    }
  }, [id, navigate, setCurrentResume]);

  useEffect(() => {
    if (id) fetchResume();
  }, [fetchResume, id]);

  const saveResume = async () => {
    if (!currentResume) return;
    setIsSaving(true);
    try {
      const res = await api.put(`/resume/${id}`, {
        ...currentResume,
        projects: currentResume.projects || [],
        certificates: currentResume.certificates || [],
      });
      setCurrentResume(res.data.resume);
      toast.success("Resume saved successfully.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  const handleTemplateChange = useCallback(() => {
    setPreviewKey((value) => value + 1);
    fetchResume();
  }, [fetchResume]);

  const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);
  const completion = Math.round(((activeIndex + 1) / TABS.length) * 100);

  if (!currentResume) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading your resume workspace...</p>
        </div>
      </div>
    );
  }

  const renderTab = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.18 }}
        className="builder-panel"
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
        {activeTab === "templates" && <TemplateSelector resumeId={id!} onTemplateChange={handleTemplateChange} />}
        {activeTab === "score" && <ResumeScore />}
        {activeTab === "share" && <ShareResume />}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => navigate("/dashboard")} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold text-slate-950">{currentResume.title}</h1>
              <p className="text-xs font-medium text-slate-500">
                {isSaving ? "Saving changes..." : "Autosave-ready editor with live preview"}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              {completion}% workflow complete
            </div>
            {currentResume.publicSlug && (
              <div className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <Link2 size={13} /> Public link active
              </div>
            )}
          </div>

          <button
            onClick={saveResume}
            disabled={isSaving}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 disabled:opacity-60"
          >
            <Save size={16} />
            {isSaving ? "Saving" : "Save"}
          </button>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[minmax(440px,0.92fr)_minmax(520px,1fr)]">
        <section className="min-h-[calc(100vh-65px)] border-r border-slate-200 bg-white">
          <div className="sticky top-[65px] z-20 border-b border-slate-200 bg-white">
            <div className="flex items-center px-3">
              <button onClick={() => scroll("left")} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-slate-100">
                <ChevronLeft size={18} />
              </button>
              <div ref={scrollRef} className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto px-2 py-3">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                        active ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => scroll("right")} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-slate-100">
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="h-1 bg-slate-100">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>

          <div className="p-4 sm:p-6">{renderTab()}</div>
        </section>

        {!isMobile && (
          <aside className="min-h-[calc(100vh-65px)] bg-slate-100 p-5 xl:p-8">
            <div className="sticky top-[89px]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">Live preview</h2>
                  <p className="text-xs text-slate-500">PDF output follows this layout.</p>
                </div>
                <button onClick={() => setPreviewKey((value) => value + 1)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">
                  Refresh
                </button>
              </div>
              <ResumePreview key={previewKey} />
            </div>
          </aside>
        )}
      </div>

      {isMobile && (
        <button
          onClick={() => setShowMobilePreview(true)}
          className="fixed bottom-4 left-4 right-4 z-30 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-2xl"
        >
          <Eye size={18} />
          Preview resume
        </button>
      )}

      <AnimatePresence>
        {isMobile && showMobilePreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-100">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <div>
                <h2 className="font-extrabold text-slate-950">Resume preview</h2>
                <p className="text-xs text-slate-500">Review and download your PDF.</p>
              </div>
              <button onClick={() => setShowMobilePreview(false)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200">
                <X size={20} />
              </button>
            </div>
            <div className="h-[calc(100vh-66px)] overflow-y-auto p-4">
              <ResumePreview key={previewKey} inline />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
