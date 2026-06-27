import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Plus, FileText, Trash2, Edit3, Crown, LogOut, Clock,
  Sparkles, TrendingUp, Target, Palette, Star, Eye, Rocket,
} from "lucide-react";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { useResumeStore } from "../store/useResumeStore";
import ATSChecker from "../components/ATSChecker";
import { motion, AnimatePresence } from "framer-motion";

const TEMPLATES = {
  "modern-blue":    { color: "#6c63ff", name: "Modern Blue",    icon: "🎨", premium: false },
  "emerald-pro":    { color: "#10B981", name: "Emerald Pro",    icon: "💎", premium: true  },
  "minimal-clean":  { color: "#6B7280", name: "Minimal Clean",  icon: "✨", premium: false },
  "slate-dark":     { color: "#334155", name: "Slate Dark",     icon: "🌙", premium: true  },
  "rose-elegant":   { color: "#F43F5E", name: "Rose Elegant",   icon: "🌹", premium: true  },
  "violet-bold":    { color: "#8B5CF6", name: "Violet Bold",    icon: "💜", premium: false },
  "amber-warm":     { color: "#F59E0B", name: "Amber Warm",     icon: "☀️", premium: true  },
  "executive-pro":  { color: "#1E293B", name: "Executive Pro",  icon: "👔", premium: true  },
  "creative-split": { color: "#EC4899", name: "Creative Split", icon: "🎭", premium: true  },
  "tech-modern":    { color: "#06B6D4", name: "Tech Modern",    icon: "⚡", premium: false },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, setResumes, setCurrentResume } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [hoveredResume, setHoveredResume] = useState<string | null>(null);
  const isPro = user?.plan === "pro";

  useEffect(() => { fetchResumes(); }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch { toast.error("Resumes load nahi hue!"); }
  };

  const createNewResume = async (template?: string) => {
    setIsCreating(true);
    try {
      const res = await api.post("/resume", {
        title: `My Resume ${resumes.length + 1}`,
        template: template || "modern-blue",
      });
      setCurrentResume(res.data.resume);
      navigate(`/resume/${res.data.resume._id}`);
      toast.success("Naya resume ban gaya! 🎉");
      setShowTemplateModal(false);
    } catch (error: any) {
      if (error.response?.data?.upgrade) toast.error("Free plan: sirf 2 resumes! Pro upgrade karo 👑");
      else toast.error("Resume nahi bana!");
    } finally { setIsCreating(false); }
  };

  const deleteResume = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Resume delete karna chahte ho?")) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      toast.success("Delete ho gaya! 🗑️");
    } catch { toast.error("Delete nahi hua!"); }
  };

  const openResume = async (id: string) => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
      navigate(`/resume/${id}`);
    } catch { toast.error("Resume nahi khula!"); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg,#f0eeff 0%,#e8e0ff 40%,#f5f0ff 100%)", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>

      {/* blobs */}
      <div style={{ position:"fixed", width:500, height:500, borderRadius:"50%", background:"#a78bfa", opacity:0.12, filter:"blur(90px)", top:-100, right:-80, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", width:350, height:350, borderRadius:"50%", background:"#818cf8", opacity:0.1, filter:"blur(70px)", bottom:0, left:-60, pointerEvents:"none", zIndex:0 }} />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }}
        style={{
          position:"sticky", top:0, zIndex:100,
          background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)",
          borderBottom:"1px solid rgba(108,99,255,0.12)",
          boxShadow:"0 2px 20px rgba(108,99,255,0.08)"
        }}
      >
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <motion.div whileHover={{ scale:1.05 }}
            onClick={() => navigate("/dashboard")}
            style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
          >
            <div style={{
              width:38, height:38, borderRadius:11,
              background:"linear-gradient(135deg,#6c63ff,#a78bfa)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 16px rgba(108,99,255,0.35)"
            }}>
              <Rocket size={18} color="#fff" />
            </div>
            <span style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>
              Resume<span style={{ color:"#6c63ff" }}>AI</span>
            </span>
          </motion.div>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Plan badge */}
            <motion.div whileHover={{ scale:1.05 }} style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"6px 14px", borderRadius:50, fontSize:13, fontWeight:700,
              background: isPro ? "linear-gradient(135deg,#f59e0b,#f97316)" : "rgba(108,99,255,0.08)",
              color: isPro ? "#fff" : "#6c63ff",
              boxShadow: isPro ? "0 4px 16px rgba(249,115,22,0.3)" : "none"
            }}>
              {isPro ? <Crown size={14} /> : <Star size={14} />}
              {isPro ? "Pro Member" : "Free Member"}
            </motion.div>

            {/* User chip */}
            <motion.div whileHover={{ scale:1.05 }} style={{
              display:"flex", alignItems:"center", gap:8,
              background:"#fff", border:"1.5px solid rgba(108,99,255,0.15)",
              padding:"6px 12px", borderRadius:50,
              boxShadow:"0 2px 10px rgba(108,99,255,0.08)"
            }}>
              <div style={{
                width:28, height:28, borderRadius:"50%",
                background:"linear-gradient(135deg,#6c63ff,#a78bfa)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontWeight:800, fontSize:12, color:"#fff", flexShrink:0
              }}>{user?.name?.[0]?.toUpperCase()}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{user?.name}</div>
                <div style={{ fontSize:10, color:"#94a3b8" }}>{user?.email}</div>
              </div>
            </motion.div>

            {/* Logout */}
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => { logout(); navigate("/login"); }}
              style={{
                display:"flex", alignItems:"center", gap:6,
                color:"#94a3b8", background:"none", border:"1.5px solid #e2e8f0",
                padding:"8px 12px", borderRadius:10, cursor:"pointer", fontSize:13
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color="#ef4444"; (e.currentTarget as HTMLButtonElement).style.borderColor="#fecaca"; (e.currentTarget as HTMLButtonElement).style.background="#fff5f5"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color="#94a3b8"; (e.currentTarget as HTMLButtonElement).style.borderColor="#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.background="none"; }}
            >
              <LogOut size={16} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px", position:"relative", zIndex:1 }}>

        {/* ── STATS ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:28 }}
        >
          {[
            { val: resumes.length, label:"Total Resumes", icon:<FileText size={22} />, color:"#6c63ff", bg:"#ede9fe" },
            { val: isPro ? "∞" : `${resumes.length}/2`, label:"Plan Limit", icon:<TrendingUp size={22} />, color:"#10b981", bg:"#d1fae5" },
            { val: isPro ? "10+" : "3", label:"Templates", icon:<Sparkles size={22} />, color:"#a78bfa", bg:"#f3e8ff" },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y:-4, boxShadow:"0 16px 40px rgba(108,99,255,0.14)" }}
              style={{
                background:"#fff", borderRadius:20, padding:"24px 24px",
                border:"1.5px solid rgba(108,99,255,0.1)",
                boxShadow:"0 4px 16px rgba(108,99,255,0.06)",
                display:"flex", justifyContent:"space-between", alignItems:"center",
                transition:"all .25s"
              }}
            >
              <div>
                <div style={{ fontSize:32, fontWeight:900, color:"#0f172a" }}>{s.val}</div>
                <div style={{ fontSize:13, color:"#64748b", marginTop:4 }}>{s.label}</div>
              </div>
              <div style={{ width:50, height:50, borderRadius:14, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>
                {s.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── PRO BANNER ── */}
        {!isPro && (
          <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
            style={{
              background:"linear-gradient(135deg,#6c63ff,#a78bfa,#ec4899)",
              borderRadius:20, padding:"24px 28px", marginBottom:28,
              boxShadow:"0 16px 50px rgba(108,99,255,0.35)",
              display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <motion.div animate={{ rotate:360 }} transition={{ duration:2, repeat:Infinity, ease:"linear" }}>
                <Crown size={28} color="#fde68a" />
              </motion.div>
              <div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:18 }}>Unlock Premium Features! 🚀</div>
                <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, marginTop:2 }}>Unlimited resumes, 10+ templates, advanced AI</div>
              </div>
            </div>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => navigate("/upgrade")}
              style={{
                background:"#fff", color:"#6c63ff", fontWeight:800, fontSize:14,
                padding:"12px 24px", borderRadius:12, border:"none", cursor:"pointer",
                boxShadow:"0 4px 16px rgba(0,0,0,0.15)"
              }}
            >Upgrade Now → ₹299/month</motion.button>
          </motion.div>
        )}

        {/* ── HEADER + BUTTONS ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:16 }}>
          <div>
            <h1 style={{ fontSize:28, fontWeight:900, color:"#0f172a", letterSpacing:-1 }}>My Resumes</h1>
            <p style={{ fontSize:14, color:"#64748b", marginTop:4 }}>
              {resumes.length === 0 ? "Create your first professional resume" : `${resumes.length} resume${resumes.length > 1 ? "s" : ""} created`}
            </p>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => navigate("/templates")}
              style={{
                display:"flex", alignItems:"center", gap:8,
                background:"#fff", border:"2px solid #6c63ff", color:"#6c63ff",
                padding:"11px 20px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer"
              }}
            ><Palette size={16} /> Templates</motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => createNewResume()} disabled={isCreating}
              style={{
                display:"flex", alignItems:"center", gap:8,
                background:"linear-gradient(135deg,#6c63ff,#a78bfa)",
                color:"#fff", padding:"11px 22px", borderRadius:12,
                fontWeight:700, fontSize:14, border:"none", cursor:"pointer",
                boxShadow:"0 6px 24px rgba(108,99,255,0.4)", opacity: isCreating ? 0.6 : 1
              }}
            ><Plus size={16} /> {isCreating ? "Creating..." : "New Resume"}</motion.button>
          </div>
        </div>

        {/* ── RESUME GRID ── */}
        {resumes.length === 0 ? (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            style={{
              textAlign:"center", padding:"80px 24px",
              background:"#fff", borderRadius:24,
              border:"2px dashed rgba(108,99,255,0.2)",
              boxShadow:"0 4px 20px rgba(108,99,255,0.05)"
            }}
          >
            <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:2, repeat:Infinity }}
              style={{
                width:72, height:72, borderRadius:20,
                background:"linear-gradient(135deg,#ede9fe,#f3e8ff)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 20px"
              }}
            ><FileText size={32} color="#6c63ff" /></motion.div>
            <h3 style={{ fontSize:22, fontWeight:800, color:"#0f172a", marginBottom:8 }}>No Resumes Yet</h3>
            <p style={{ fontSize:15, color:"#94a3b8", marginBottom:28 }}>Click "New Resume" to start your journey! 🚀</p>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => createNewResume()}
              style={{
                background:"linear-gradient(135deg,#6c63ff,#a78bfa)",
                color:"#fff", padding:"14px 32px", borderRadius:14,
                fontWeight:800, fontSize:15, border:"none", cursor:"pointer",
                boxShadow:"0 8px 28px rgba(108,99,255,0.4)"
              }}
            >+ Create First Resume</motion.button>
          </motion.div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24 }}>
            <AnimatePresence>
              {resumes.map((resume, idx) => {
                const template = TEMPLATES[resume.template as keyof typeof TEMPLATES] || TEMPLATES["modern-blue"];
                const color = template.color;
                return (
                  <motion.div key={resume._id}
                    initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y:-8 }}
                    onHoverStart={() => setHoveredResume(resume._id)}
                    onHoverEnd={() => setHoveredResume(null)}
                    onClick={() => openResume(resume._id)}
                    style={{ cursor:"pointer" }}
                  >
                    <div style={{
                      background:"#fff", borderRadius:20, overflow:"hidden",
                      border:"1.5px solid rgba(108,99,255,0.1)",
                      boxShadow:"0 4px 20px rgba(108,99,255,0.07)",
                      transition:"box-shadow .3s"
                    }}>
                      {/* Preview */}
                      <div style={{ position:"relative", height:148, overflow:"hidden" }}>
                        <div style={{
                          width:"100%", height:"100%",
                          background:`linear-gradient(135deg,${color}dd,${color}88)`,
                          transition:"transform .4s"
                        }}>
                          <div style={{ position:"absolute", inset:0, padding:18 }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                              <div>
                                <div style={{ width:44, height:44, background:"rgba(255,255,255,0.2)", borderRadius:12, marginBottom:10 }} />
                                <div style={{ width:110, height:6, background:"rgba(255,255,255,0.45)", borderRadius:4, marginBottom:6 }} />
                                <div style={{ width:80, height:6, background:"rgba(255,255,255,0.3)", borderRadius:4 }} />
                              </div>
                              <motion.div animate={{ rotate: hoveredResume === resume._id ? 360 : 0 }}
                                style={{ width:36, height:36, background:"rgba(255,255,255,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}
                              >
                                {template.premium && <Crown size={14} color="#fde68a" />}
                              </motion.div>
                            </div>
                            <div style={{ position:"absolute", bottom:16, left:18, right:18, display:"flex", gap:6 }}>
                              {[1,2,3].map(i => (
                                <div key={i} style={{ height:4, borderRadius:3, background:"rgba(255,255,255,0.35)", width: 12+i*10 }} />
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Template badge */}
                        <div style={{
                          position:"absolute", top:10, left:10,
                          background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)",
                          borderRadius:8, padding:"4px 10px",
                          fontSize:11, fontWeight:700, color
                        }}>{template.icon} {template.name}</div>
                      </div>

                      {/* Info */}
                      <div style={{ padding:"16px 18px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                          <div>
                            <h3 style={{ fontSize:16, fontWeight:800, color:"#0f172a", marginBottom:4 }}>{resume.title}</h3>
                            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                              <Clock size={10} color="#94a3b8" />
                              <span style={{ fontSize:11, color:"#94a3b8" }}>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                            onClick={(e) => deleteResume(resume._id, e)}
                            style={{
                              padding:"6px 8px", borderRadius:10, border:"none", cursor:"pointer",
                              background:"transparent", color:"#cbd5e1"
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="#fff5f5"; (e.currentTarget as HTMLButtonElement).style.color="#ef4444"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.color="#cbd5e1"; }}
                          ><Trash2 size={15} /></motion.button>
                        </div>

                        {resume.skills?.length > 0 && (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                            {resume.skills.slice(0,3).map((skill: any, i: number) => (
                              <span key={i} style={{ fontSize:10, padding:"3px 9px", borderRadius:50, background:"rgba(108,99,255,0.08)", color:"#6c63ff", fontWeight:600 }}>{skill.name}</span>
                            ))}
                            {resume.skills.length > 3 && (
                              <span style={{ fontSize:10, padding:"3px 9px", borderRadius:50, background:"#f1f5f9", color:"#94a3b8" }}>+{resume.skills.length-3}</span>
                            )}
                          </div>
                        )}

                        <div style={{ display:"flex", gap:8 }}>
                          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                            onClick={() => openResume(resume._id)}
                            style={{
                              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                              padding:"9px 0", borderRadius:10, fontSize:13, fontWeight:700,
                              background:"rgba(108,99,255,0.08)", color:"#6c63ff",
                              border:"none", cursor:"pointer", transition:"all .2s"
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="linear-gradient(135deg,#6c63ff,#a78bfa)"; (e.currentTarget as HTMLButtonElement).style.color="#fff"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(108,99,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color="#6c63ff"; }}
                          ><Edit3 size={13} /> Edit</motion.button>
                          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                            style={{
                              display:"flex", alignItems:"center", gap:6,
                              padding:"9px 14px", borderRadius:10, fontSize:13, fontWeight:700,
                              background:"transparent", color:"#64748b",
                              border:"1.5px solid #e2e8f0", cursor:"pointer"
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#6c63ff"; (e.currentTarget as HTMLButtonElement).style.color="#6c63ff"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.color="#64748b"; }}
                          ><Eye size={13} /> Preview</motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ── ATS CHECKER ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ marginTop:60, paddingTop:40, borderTop:"1px solid rgba(108,99,255,0.15)" }}
        >
          <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <motion.div
                animate={{ rotate:[0,10,-10,0], scale:[1,1.05,1] }}
                transition={{ duration:2, repeat:Infinity }}
                style={{
                  width:60, height:60, borderRadius:18,
                  background:"linear-gradient(135deg,#6c63ff,#38bdf8)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 8px 28px rgba(108,99,255,0.35)"
                }}
              ><Target size={26} color="#fff" /></motion.div>
            </div>
            <div style={{ display:"inline-block", background:"rgba(108,99,255,0.1)", border:"1px solid rgba(108,99,255,0.2)", color:"#6c63ff", fontSize:12, fontWeight:700, padding:"5px 14px", borderRadius:50, marginBottom:12, letterSpacing:.5, textTransform:"uppercase" }}>AI Powered</div>
            <h2 style={{ fontSize:28, fontWeight:900, color:"#0f172a", letterSpacing:-1, marginBottom:8 }}>ATS Score Checker</h2>
            <p style={{ fontSize:15, color:"#64748b", marginBottom:28 }}>Upload your resume and get AI-powered ATS score with improvement suggestions</p>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:520 }}>
                <ATSChecker />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── TEMPLATE MODAL ── */}
      {showTemplateModal && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{
            position:"fixed", inset:0, background:"rgba(15,12,41,0.6)",
            backdropFilter:"blur(8px)", zIndex:200,
            display:"flex", alignItems:"center", justifyContent:"center", padding:20
          }}
          onClick={() => setShowTemplateModal(false)}
        >
          <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
            onClick={e => e.stopPropagation()}
            style={{
              background:"#fff", borderRadius:24, maxWidth:820, width:"100%",
              maxHeight:"82vh", overflowY:"auto",
              boxShadow:"0 32px 80px rgba(108,99,255,0.3)"
            }}
          >
            <div style={{ position:"sticky", top:0, background:"#fff", borderBottom:"1px solid rgba(108,99,255,0.1)", padding:"20px 28px" }}>
              <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a" }}>Choose a Template</h2>
              <p style={{ fontSize:14, color:"#64748b", marginTop:4 }}>Select the perfect design for your resume</p>
            </div>
            <div style={{ padding:"24px 28px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:16 }}>
                {Object.entries(TEMPLATES).map(([key, template]) => (
                  <motion.button key={key}
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => createNewResume(key)}
                    disabled={!isPro && template.premium}
                    style={{ position:"relative", background:"none", border:"none", cursor: !isPro && template.premium ? "not-allowed" : "pointer", padding:0 }}
                  >
                    <div style={{
                      aspectRatio:"3/4", borderRadius:14, overflow:"hidden",
                      border:"2px solid rgba(108,99,255,0.15)",
                      background:`linear-gradient(135deg,${template.color}dd,${template.color}88)`
                    }}>
                      <div style={{ padding:14 }}>
                        <div style={{ fontSize:32, marginBottom:12 }}>{template.icon}</div>
                        <div style={{ height:4, background:"rgba(255,255,255,0.4)", borderRadius:3, marginBottom:6 }} />
                        <div style={{ height:4, background:"rgba(255,255,255,0.3)", borderRadius:3, width:"75%" }} />
                      </div>
                    </div>
                    <div style={{ marginTop:8, textAlign:"center" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>{template.name}</div>
                      {template.premium && (
                        <div style={{ fontSize:10, color:"#f59e0b", display:"flex", alignItems:"center", justifyContent:"center", gap:3, marginTop:2 }}>
                          <Crown size={10} /> Premium
                        </div>
                      )}
                    </div>
                    {!isPro && template.premium && (
                      <div style={{
                        position:"absolute", inset:0, background:"rgba(15,12,41,0.6)",
                        borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center",
                        backdropFilter:"blur(4px)"
                      }}>
                        <div style={{ textAlign:"center", color:"#fff" }}>
                          <Crown size={22} style={{ margin:"0 auto 4px" }} />
                          <div style={{ fontSize:11, fontWeight:700 }}>Pro Only</div>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
