import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Crown,
  Edit3,
  Eye,
  FileText,
  LayoutTemplate,
  LogOut,
  Plus,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { useResumeStore } from "../store/useResumeStore";
import ATSChecker from "../components/ATSChecker";

const TEMPLATE_META: Record<string, { color: string; name: string; premium: boolean }> = {
  "modern-blue": { color: "#2563eb", name: "Modern Blue", premium: false },
  "emerald-pro": { color: "#059669", name: "Emerald Pro", premium: false },
  "minimal-clean": { color: "#64748b", name: "Minimal Clean", premium: false },
  "ats-classic": { color: "#0f766e", name: "ATS Classic", premium: false },
  "slate-dark": { color: "#334155", name: "Slate Dark", premium: true },
  "rose-elegant": { color: "#e11d48", name: "Rose Elegant", premium: true },
  "violet-bold": { color: "#7c3aed", name: "Violet Bold", premium: true },
  "amber-warm": { color: "#d97706", name: "Amber Warm", premium: true },
  "executive-pro": { color: "#111827", name: "Executive Pro", premium: true },
  "creative-pink": { color: "#db2777", name: "Creative Pink", premium: true },
  "tech-modern": { color: "#0891b2", name: "Tech Modern", premium: true },
};

const stats: Array<{ label: string; value: string | number; Icon: LucideIcon }> = [
  { label: "Total resumes", value: 0, Icon: FileText },
  { label: "Plan limit", value: "0/2", Icon: Target },
  { label: "Templates", value: "4 free", Icon: LayoutTemplate },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, setResumes, setCurrentResume } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);
  const isPro = user?.plan === "pro";

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch {
      toast.error("Resumes load nahi hue.");
    }
  };

  const createNewResume = async () => {
    setIsCreating(true);
    try {
      const res = await api.post("/resume", {
        title: `My Resume ${resumes.length + 1}`,
        template: "ats-classic",
      });
      setCurrentResume(res.data.resume);
      navigate(`/resume/${res.data.resume._id}`);
      toast.success("New resume created.");
    } catch (error: any) {
      if (error.response?.data?.upgrade) toast.error("Free plan me 2 resumes allowed hain. Pro upgrade karein.");
      else toast.error("Resume create nahi hua.");
    } finally {
      setIsCreating(false);
    }
  };

  const deleteResume = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Is resume ko delete karna hai?")) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((resume) => resume._id !== id));
      toast.success("Resume deleted.");
    } catch {
      toast.error("Delete nahi hua.");
    }
  };

  const openResume = async (id: string) => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
      navigate(`/resume/${id}`);
    } catch {
      toast.error("Resume open nahi hua.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-black text-white">R</span>
            <span className="text-xl font-black text-slate-950">ResumeAI</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 sm:block">
              {user?.name || "Job seeker"}
            </div>
            <div className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${isPro ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
              {isPro ? <Crown size={13} /> : <Sparkles size={13} />}
              {isPro ? "Pro" : "Free"}
            </div>
            <button onClick={() => navigate("/templates")} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Templates">
              <LayoutTemplate size={18} />
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
              <Target size={14} /> Professional resume workspace
            </div>
            <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              Create, improve, and export resumes that are ready for recruiters.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Manage versions, choose templates, check ATS score, and continue editing from one clean dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={createNewResume} disabled={isCreating} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 disabled:opacity-60">
                <Plus size={18} />
                {isCreating ? "Creating..." : "New resume"}
              </button>
              <button onClick={() => navigate("/templates")} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-bold text-white hover:bg-white/10">
                <LayoutTemplate size={18} /> Browse templates
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map(({ label, Icon }) => {
              const value =
                label === "Total resumes" ? resumes.length :
                label === "Plan limit" ? (isPro ? "Unlimited" : `${resumes.length}/2`) :
                isPro ? "10+" : "4 free";
              return (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="mb-4 text-blue-600" size={22} />
                <div className="text-2xl font-black text-slate-950">{value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-500">{label}</div>
              </div>
            )})}
          </div>
        </section>

        {!isPro && (
          <section className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div>
              <h2 className="font-black text-slate-950">Upgrade for unlimited resume versions</h2>
              <p className="mt-1 text-sm text-slate-600">Premium templates, advanced AI, public links, and priority support.</p>
            </div>
            <button onClick={() => navigate("/upgrade")} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white">
              <Crown size={16} /> Upgrade
            </button>
          </section>
        )}

        <section className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-950">My resumes</h2>
              <p className="text-sm text-slate-500">Open a resume to edit content, templates, score, and PDF export.</p>
            </div>
            <button onClick={createNewResume} disabled={isCreating} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white disabled:opacity-60">
              <Plus size={16} /> New resume
            </button>
          </div>

          {resumes.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
              <FileText className="mx-auto mb-4 text-slate-400" size={42} />
              <h3 className="text-xl font-black text-slate-950">No resumes yet</h3>
              <p className="mt-2 text-sm text-slate-500">Start with an ATS classic template and customize it in the builder.</p>
              <button onClick={createNewResume} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white">
                <Plus size={18} /> Create first resume
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {resumes.map((resume, index) => {
                  const template = TEMPLATE_META[resume.template] || TEMPLATE_META["modern-blue"];
                  return (
                    <motion.article
                      key={resume._id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => openResume(resume._id)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-44 p-5" style={{ background: `linear-gradient(135deg, ${template.color}, ${template.color}99)` }}>
                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black" style={{ color: template.color }}>
                          {template.name}
                        </div>
                        {template.premium && (
                          <div className="absolute right-4 top-4 rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-700">Pro</div>
                        )}
                        <div className="mt-12 h-8 w-32 rounded-lg bg-white/25" />
                        <div className="mt-4 grid gap-2">
                          <span className="h-2 w-3/4 rounded-full bg-white/50" />
                          <span className="h-2 w-2/3 rounded-full bg-white/35" />
                          <span className="h-2 w-5/6 rounded-full bg-white/35" />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-black text-slate-950">{resume.title}</h3>
                            <p className="text-xs font-semibold text-slate-500">
                              Updated {new Date(resume.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button onClick={(event) => deleteResume(resume._id, event)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={(event) => { event.stopPropagation(); openResume(resume._id); }} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                            <Edit3 size={15} /> Edit
                          </button>
                          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-600">
                            <Eye size={15} /> Preview
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mx-auto mb-5 max-w-2xl text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-950">ATS score checker</h2>
            <p className="mt-2 text-sm text-slate-500">Upload a resume and get improvement suggestions before applying.</p>
          </div>
          <div className="mx-auto max-w-xl">
            <ATSChecker />
          </div>
        </section>
      </div>
    </main>
  );
}
