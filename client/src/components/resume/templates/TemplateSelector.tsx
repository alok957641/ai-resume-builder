import { useMemo, useState } from "react";
import { Check, Crown, Lock, Search, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../../api";
import { useAuthStore } from "../../../store/useAuthStore";
import { useResumeStore } from "../../../store/useResumeStore";
import { TEMPLATES_LIST } from ".";

const templateMeta: Record<string, { description: string; colors: string[]; style: string }> = {
  "modern-blue": { description: "Professional sidebar layout", colors: ["#0f5d7c", "#166534", "#7c3aed", "#d97706"], style: "Professional" },
  "minimal-clean": { description: "Simple black and white resume", colors: ["#111827", "#64748b", "#0f766e", "#9f1239"], style: "Simple" },
  "ats-classic": { description: "Best parser-friendly structure", colors: ["#111827", "#1d4ed8", "#0f766e", "#64748b"], style: "ATS" },
  "emerald-pro": { description: "Modern clean header", colors: ["#059669", "#0284c7", "#9333ea", "#111827"], style: "Modern" },
  "slate-dark": { description: "Dark premium accent", colors: ["#111827", "#334155", "#0f766e", "#7c3aed"], style: "Modern" },
  "rose-elegant": { description: "Elegant bold header", colors: ["#be123c", "#9f1239", "#1d4ed8", "#111827"], style: "Creative" },
  "violet-bold": { description: "Two-column modern format", colors: ["#7c3aed", "#4f46e5", "#0f766e", "#d97706"], style: "Creative" },
  "amber-warm": { description: "Warm serif document", colors: ["#d97706", "#92400e", "#334155", "#0f766e"], style: "Traditional" },
  "tech-modern": { description: "Compact technology resume", colors: ["#0284c7", "#2563eb", "#0f766e", "#111827"], style: "ATS" },
  "creative-pink": { description: "Dark sidebar resume", colors: ["#db2777", "#be123c", "#7c3aed", "#111827"], style: "Creative" },
  "navy-exec": { description: "Executive two-column design", colors: ["#1e3a8a", "#111827", "#0f766e", "#64748b"], style: "Professional" },
};

interface TemplateSelectorProps {
  resumeId: string;
  onTemplateChange?: () => void;
}

export default function TemplateSelector({ resumeId, onTemplateChange }: TemplateSelectorProps) {
  const { currentResume, setCurrentResume } = useResumeStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const isPro = user?.plan === "pro";

  const visibleTemplates = useMemo(() => {
    return TEMPLATES_LIST.filter((template) => {
      const meta = templateMeta[template.id] || { style: "Professional", description: "", colors: [] };
      const planMatch = filter === "All" || (filter === "Free" ? template.free : filter === "Pro" ? !template.free : meta.style === filter);
      const queryMatch = template.name.toLowerCase().includes(query.toLowerCase());
      return planMatch && queryMatch;
    });
  }, [filter, query]);

  const selectTemplate = async (templateId: string, isFree: boolean) => {
    if (!isFree && !isPro) {
      toast.error("Pro template unlock karne ke liye upgrade karein.");
      window.location.href = "/upgrade";
      return;
    }

    setLoading(templateId);
    try {
      const res = await api.put(`/resume/${resumeId}`, {
        ...currentResume,
        template: templateId,
      });
      setCurrentResume(res.data.resume);
      toast.success("Template applied.");
      onTemplateChange?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Template change failed.");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="space-y-5">
      <div className="builder-section-head">
        <div>
          <span>Design</span>
          <h2>Resume templates</h2>
          <p>Choose a polished ATS-ready design. You can change it anytime.</p>
        </div>
        {!isPro && <button onClick={() => (window.location.href = "/upgrade")}><Crown size={16} /> Upgrade</button>}
      </div>

      <div className="builder-template-tools">
        <label>
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates" />
        </label>
        <div>
          {["All", "Free", "Pro", "ATS", "Modern", "Creative", "Professional"].map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-template-grid">
        {visibleTemplates.map((template, index) => {
          const meta = templateMeta[template.id] || { description: "", colors: ["#111827"], style: "Professional" };
          const isLocked = !template.free && !isPro;
          const isActive = currentResume?.template === template.id;
          return (
            <motion.article
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.025 }}
              className={`builder-template-card ${isActive ? "active" : ""} ${isLocked ? "locked" : ""}`}
              onClick={() => selectTemplate(template.id, template.free)}
            >
              <div className="builder-template-preview" style={{ ["--template-color" as string]: meta.colors[0] }}>
                <span />
                <i />
                <i />
                <i />
                {isActive && <b><Check size={14} /></b>}
                {isLocked && <em><Lock size={15} /> Pro</em>}
              </div>
              <div className="builder-template-info">
                <div>
                  <strong>{template.name}</strong>
                  <p>{meta.description}</p>
                </div>
                {!template.free && <Sparkles size={16} className="text-amber-500" />}
              </div>
              <div className="swatches small">
                {meta.colors.map((color) => <i key={color} style={{ background: color }} />)}
                <i className="rainbow" />
              </div>
              <button disabled={loading === template.id}>
                {loading === template.id ? "Applying..." : isActive ? "Selected" : isLocked ? "Unlock" : "Use template"}
              </button>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
