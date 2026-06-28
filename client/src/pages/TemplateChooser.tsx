import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, Filter, Lock, Search, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { useResumeStore } from "../store/useResumeStore";
import {
  TemplateATS,
  TemplateAmber,
  TemplateCyan,
  TemplateDark,
  TemplateEmerald,
  TemplateMinimal,
  TemplateModernBlue,
  TemplateNavy,
  TemplatePink,
  TemplateRose,
  TemplateViolet,
} from "../components/resume/templates/AllTemplates";

const PREVIEW_DATA = {
  _id: "preview",
  title: "Preview Resume",
  personalInfo: {
    fullName: "Saanvi Patel",
    email: "saanvi@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    linkedin: "linkedin.com/in/saanvi",
    github: "",
    website: "",
    summary: "Customer-focused professional with experience improving operations, reporting, and team outcomes.",
  },
  experience: [
    {
      company: "Northstar Solutions",
      position: "Senior Sales Associate",
      startDate: "2021",
      endDate: "Present",
      current: true,
      description: "Improved weekly reporting accuracy by 35% and trained 8 new team members on customer workflows.",
    },
  ],
  education: [
    {
      school: "Delhi University",
      degree: "Bachelor of Arts",
      field: "Business Administration",
      startDate: "2017",
      endDate: "2020",
      grade: "8.2 CGPA",
    },
  ],
  skills: [
    { name: "Customer service", level: "expert" },
    { name: "Reporting", level: "intermediate" },
    { name: "Team training", level: "intermediate" },
  ],
  projects: [],
  certificates: [],
  template: "modern-blue",
  isPublic: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as any;

const TEMPLATES = [
  { id: "modern-blue", name: "Modern Blue", free: true, ats: true, style: "Professional", Component: TemplateModernBlue, colors: ["#0f5d7c", "#166534", "#7c3aed", "#d97706", "#1e3a8a"] },
  { id: "minimal-clean", name: "Minimal Clean", free: true, ats: true, style: "Simple", Component: TemplateMinimal, colors: ["#111827", "#9f1239", "#0f766e", "#334155", "#ca8a04"] },
  { id: "ats-classic", name: "ATS Classic", free: true, ats: true, style: "Traditional", Component: TemplateATS, colors: ["#111827", "#1d4ed8", "#0f766e", "#64748b", "#7c2d12"] },
  { id: "emerald-pro", name: "Emerald Pro", free: true, ats: true, style: "Modern", Component: TemplateEmerald, colors: ["#059669", "#0284c7", "#9333ea", "#dc2626", "#111827"] },
  { id: "slate-dark", name: "Slate Dark", free: false, ats: false, style: "Modern", Component: TemplateDark, colors: ["#111827", "#334155", "#0f766e", "#7c3aed", "#dc2626"] },
  { id: "rose-elegant", name: "Rose Elegant", free: false, ats: false, style: "Creative", Component: TemplateRose, colors: ["#be123c", "#9f1239", "#7c2d12", "#1d4ed8", "#111827"] },
  { id: "violet-bold", name: "Violet Bold", free: false, ats: false, style: "Creative", Component: TemplateViolet, colors: ["#7c3aed", "#4f46e5", "#0f766e", "#d97706", "#111827"] },
  { id: "amber-warm", name: "Amber Warm", free: false, ats: true, style: "Traditional", Component: TemplateAmber, colors: ["#d97706", "#92400e", "#334155", "#0f766e", "#9f1239"] },
  { id: "tech-modern", name: "Tech Modern", free: false, ats: true, style: "Modern", Component: TemplateCyan, colors: ["#0284c7", "#2563eb", "#0f766e", "#111827", "#7c3aed"] },
  { id: "creative-pink", name: "Creative Pink", free: false, ats: false, style: "Creative", Component: TemplatePink, colors: ["#db2777", "#be123c", "#7c3aed", "#0f766e", "#111827"] },
  { id: "navy-exec", name: "Navy Executive", free: false, ats: true, style: "Professional", Component: TemplateNavy, colors: ["#1e3a8a", "#111827", "#0f766e", "#64748b", "#d97706"] },
];

const styles = ["All", "ATS", "Traditional", "Modern", "Creative", "Professional", "Simple"];

export default function TemplateChooser() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setCurrentResume } = useResumeStore();
  const [loading, setLoading] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [query, setQuery] = useState("");
  const isPro = user?.plan === "pro";

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((template) => {
      const styleMatch = selectedStyle === "All" || (selectedStyle === "ATS" ? template.ats : template.style === selectedStyle);
      const searchMatch = template.name.toLowerCase().includes(query.toLowerCase());
      return styleMatch && searchMatch;
    });
  }, [query, selectedStyle]);

  const handleSelect = async (templateId: string, isFree: boolean) => {
    if (!isFree && !isPro) {
      toast.error("Pro template hai. Upgrade karke unlock karein.");
      navigate("/upgrade");
      return;
    }

    setLoading(templateId);
    try {
      const res = await api.post("/resume", {
        title: "My Resume",
        template: templateId,
      });
      setCurrentResume(res.data.resume);
      toast.success("Template selected. Builder open ho raha hai.");
      navigate(`/resume/${res.data.resume._id}`);
    } catch (error: any) {
      if (error.response?.data?.upgrade) {
        toast.error("Free plan me 2 resumes allowed hain. Pro upgrade karein.");
        navigate("/upgrade");
      } else {
        toast.error(error.response?.data?.message || "Template select nahi hua.");
      }
    } finally {
      setLoading("");
    }
  };

  return (
    <main className="template-page">
      <header className="template-topbar">
        <button onClick={() => navigate("/dashboard")} className="template-back">
          <ArrowLeft size={18} />
          Dashboard
        </button>
        <div>
          <h1>Choose your favorite template design</h1>
          <p>You can always change your template later.</p>
        </div>
        {!isPro && <button onClick={() => navigate("/upgrade")} className="template-upgrade"><Crown size={16} /> Upgrade</button>}
      </header>

      <div className="template-layout">
        <aside className="template-filters">
          <div className="filter-title"><Filter size={16} /> Filters</div>
          <label className="template-search">
            <Search size={15} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates" />
          </label>
          <div className="filter-group">
            <strong>Style</strong>
            {styles.map((style) => (
              <button key={style} className={selectedStyle === style ? "active" : ""} onClick={() => setSelectedStyle(style)}>
                {style}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <strong>Plan</strong>
            <span>{TEMPLATES.filter((template) => template.free).length} free templates</span>
            <span>{TEMPLATES.filter((template) => !template.free).length} pro templates</span>
          </div>
        </aside>

        <section className="template-results">
          <div className="template-count">
            <span>{filteredTemplates.length} templates</span>
            <span>ATS-friendly and PDF-ready</span>
          </div>
          <div className="template-gallery">
            {filteredTemplates.map((template) => {
              const TemplateComponent = template.Component;
              const locked = !template.free && !isPro;
              return (
                <article className={`resume-template-card ${locked ? "locked" : ""}`} key={template.id}>
                  <div className="resume-template-preview">
                    <div className="preview-scale">
                      <TemplateComponent resume={{ ...PREVIEW_DATA, template: template.id }} />
                    </div>
                    {template.ats && <span className="recommended-badge">ATS</span>}
                    {locked && <div className="locked-layer"><Lock size={18} /> Pro</div>}
                    {!locked && (
                      <button onClick={() => handleSelect(template.id, template.free)} disabled={loading === template.id} className="use-template">
                        {loading === template.id ? "Creating..." : "Use this template"}
                      </button>
                    )}
                  </div>
                  <div className="template-card-foot">
                    <div>
                      <strong>{template.name}</strong>
                      <span>{template.style}</span>
                    </div>
                    <div className="swatches">
                      {template.colors.map((color) => <i key={color} style={{ background: color }} />)}
                      <i className="rainbow" />
                    </div>
                  </div>
                  <div className="template-tags">
                    <span>{template.free ? "Free" : "Pro"}</span>
                    {template.ats && <span><Check size={12} /> ATS</span>}
                    {!template.free && <span><Sparkles size={12} /> Premium</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <div className="template-sticky-action">
        <button onClick={() => navigate("/dashboard")} className="secondary-button">Choose later</button>
        <button onClick={() => handleSelect("ats-classic", true)} className="primary-button">Use ATS Classic</button>
      </div>
    </main>
  );
}
