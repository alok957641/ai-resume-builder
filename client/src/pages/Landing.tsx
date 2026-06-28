import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  LayoutTemplate,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const templates = [
  { name: "ATS Classic", tag: "ATS", color: "#0f766e", category: "ATS" },
  { name: "Modern Blue", tag: "Popular", color: "#2563eb", category: "Modern" },
  { name: "Executive Pro", tag: "Pro", color: "#111827", category: "Professional" },
  { name: "Minimal Clean", tag: "Clean", color: "#64748b", category: "Simple" },
  { name: "Emerald Pro", tag: "New", color: "#059669", category: "Modern" },
  { name: "Tech Compact", tag: "Tech", color: "#0891b2", category: "ATS" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI writing assistant",
    text: "Turn rough notes into recruiter-ready summary and achievement bullets.",
  },
  {
    icon: ShieldCheck,
    title: "ATS score checker",
    text: "Spot missing sections, weak keywords, and formatting gaps before applying.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional templates",
    text: "Choose clean templates built for real hiring workflows and PDF export.",
  },
  {
    icon: Download,
    title: "One-click PDF",
    text: "Export a polished resume that keeps spacing, fonts, and layout intact.",
  },
];

const steps = [
  "Choose an ATS-friendly template",
  "Fill guided sections with AI help",
  "Check score and download PDF",
];

function ResumeMockup() {
  return (
    <div className="resume-mockup" aria-hidden="true">
      <div className="mockup-header">
        <div>
          <div className="mockup-name">Aarav Sharma</div>
          <div className="mockup-role">Senior Frontend Engineer</div>
        </div>
        <div className="mockup-score">
          <span>96</span>
          ATS
        </div>
      </div>
      <div className="mockup-contact">
        <span>aarav@email.com</span>
        <span>+91 98765 43210</span>
        <span>Bengaluru</span>
      </div>
      <div className="mockup-section">
        <div className="mockup-title">Professional Summary</div>
        <p>
          Frontend engineer with 6+ years building fast, accessible dashboards and
          design systems for high-growth SaaS teams.
        </p>
      </div>
      <div className="mockup-section">
        <div className="mockup-title">Experience</div>
        <div className="mockup-row">
          <strong>Lead Frontend Engineer</strong>
          <span>2022 - Present</span>
        </div>
        <p>Improved dashboard load time by 42% and shipped reusable UI patterns.</p>
        <div className="mockup-lines">
          <i style={{ width: "92%" }} />
          <i style={{ width: "76%" }} />
          <i style={{ width: "84%" }} />
        </div>
      </div>
      <div className="mockup-grid">
        <div>
          <div className="mockup-title">Skills</div>
          <div className="mockup-pills">
            <span>React</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>AWS</span>
          </div>
        </div>
        <div>
          <div className="mockup-title">Education</div>
          <p>B.Tech Computer Science</p>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: (typeof templates)[number] }) {
  return (
    <div className="template-card">
      <div className="template-preview" style={{ ["--accent" as string]: template.color }}>
        <div />
        <span />
        <i />
        <i />
        <i />
      </div>
      <div className="template-meta">
        <strong>{template.name}</strong>
        <span>{template.tag}</span>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const isAdmin = user?.email === "rajalok957641@gmail.com";

  const visibleTemplates = useMemo(
    () => templates.filter((template) => filter === "All" || template.category === filter),
    [filter]
  );

  const goStart = () => navigate(user ? "/dashboard" : "/register");
  const navItems = [
    ["Features", "features"],
    ["Templates", "templates"],
    ["Pricing", "pricing"],
  ];

  return (
    <main className="site-shell">
      <nav className="site-nav">
        <button className="brand-mark" onClick={() => navigate("/")}>
          <span>R</span>
          ResumeAI
        </button>

        <div className="nav-links">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>
              {label}
            </button>
          ))}
          {isAdmin && <button onClick={() => navigate("/admin")}>Admin</button>}
        </div>

        <div className="nav-actions">
          <button className="ghost-button" onClick={() => navigate("/login")}>Log in</button>
          <button className="primary-button" onClick={goStart}>Create resume</button>
        </div>

        <button className="icon-button mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-panel">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => {
              setMenuOpen(false);
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}>
              {label}
            </button>
          ))}
          <button onClick={() => navigate("/login")}>Log in</button>
          <button onClick={goStart}>Create resume</button>
        </div>
      )}

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <FileCheck2 size={16} />
            AI resume builder with ATS scoring
          </div>
          <h1>Build a job-winning resume in minutes</h1>
          <p>
            Create a clean, recruiter-friendly resume with guided sections, AI bullet
            improvements, professional templates, and PDF export.
          </p>
          <div className="hero-actions">
            <button className="primary-button large" onClick={goStart}>
              Start building <ArrowRight size={18} />
            </button>
            <button className="secondary-button large" onClick={() => navigate("/templates")}>
              View templates
            </button>
          </div>
          <div className="trust-row">
            <span><Star size={16} /> 4.9 user rating</span>
            <span><ShieldCheck size={16} /> ATS-friendly output</span>
            <span><Download size={16} /> PDF ready</span>
          </div>
        </div>

        <div className="hero-preview">
          <ResumeMockup />
          <div className="floating-card card-top">
            <CheckCircle2 size={18} />
            ATS score improved to 96
          </div>
          <div className="floating-card card-bottom">
            <Sparkles size={18} />
            AI rewrote 3 weak bullets
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <span>Trusted workflow for</span>
        {["Freshers", "Developers", "Analysts", "Managers", "Designers"].map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>How it works</span>
          <h2>From blank page to polished resume</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <p>Simple guidance keeps the resume professional, complete, and easy to scan.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="content-section soft-section">
        <div className="section-heading">
          <span>Features</span>
          <h2>Everything expected from a real resume builder</h2>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="templates" className="content-section">
        <div className="split-heading">
          <div>
            <span>Templates</span>
            <h2>Clean templates for ATS and hiring teams</h2>
          </div>
          <button className="secondary-button" onClick={() => navigate("/templates")}>Open gallery</button>
        </div>
        <div className="filter-row">
          {["All", "ATS", "Modern", "Professional", "Simple"].map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="template-grid">
          {visibleTemplates.map((template) => <TemplateCard key={template.name} template={template} />)}
        </div>
      </section>

      <section className="content-section soft-section">
        <div className="section-heading">
          <span>Built for outcomes</span>
          <h2>Better content, cleaner structure, faster applications</h2>
        </div>
        <div className="outcome-grid">
          {[
            ["48%", "more interview confidence"],
            ["10+", "professional templates"],
            ["5 min", "to first resume draft"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="content-section">
        <div className="section-heading">
          <span>Pricing</span>
          <h2>Start free, upgrade when you need more</h2>
        </div>
        <div className="pricing-grid">
          <article className="price-card">
            <h3>Free</h3>
            <strong>Rs 0</strong>
            <p>Create resumes, use core templates, check score, and download PDF.</p>
            <button className="secondary-button" onClick={goStart}>Start free</button>
          </article>
          <article className="price-card featured">
            <Award size={24} />
            <h3>Pro</h3>
            <strong>Rs 299/mo</strong>
            <p>Unlock unlimited resumes, premium templates, AI tools, public links, and priority support.</p>
            <button className="primary-button" onClick={goStart}>Try Pro</button>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <BriefcaseBusiness size={28} />
        <h2>Ready to create your professional resume?</h2>
        <p>Start with a template, improve it with AI, then download a clean PDF.</p>
        <button className="primary-button large" onClick={goStart}>Create my resume</button>
      </section>

      <footer className="site-footer">
        <div className="brand-mark footer-brand"><span>R</span> ResumeAI</div>
        <span>Made for professional, ATS-friendly resumes.</span>
        <span><FileText size={14} /> PDF export ready</span>
      </footer>
    </main>
  );
}
