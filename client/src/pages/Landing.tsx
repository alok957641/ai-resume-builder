import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield, Star, Zap, FileText, TrendingUp, Users, Award } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function MiniResumeCard() {
  return (
    <div className="resume-card">
      <div className="resume-header">
        <div className="resume-avatar">AS</div>
        <div>
          <div className="resume-name">Alok Singh</div>
          <div className="resume-title">Senior Software Engineer</div>
          <div className="resume-contact">rajalok957641@email.com • Mumbai, India</div>
        </div>
      </div>
      <div className="resume-body">
        <div className="resume-section-label">Experience</div>
        <div className="resume-job">Senior Engineer — Google India</div>
        <div className="resume-date">2022 – Present</div>
        <div className="resume-bullet">• Led microservices migration, reduced latency by 40%</div>
        <div className="resume-bullet">• Built real-time data pipeline serving 2M+ users daily</div>
        <div className="resume-skills">
          {['React', 'Node.js', 'AWS', 'Docker'].map(s => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('All');
  const { user } = useAuthStore();

  useEffect(() => { setTimeout(() => setLoaded(true), 120); }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isAdmin = user?.email === 'rajalok957641@gmail.com';

  const templates = [
    { name: 'Modern Blue', color: '#4f46e5', tag: 'Popular', cat: 'Modern' },
    { name: 'Emerald Pro', color: '#059669', tag: 'New', cat: 'Modern' },
    { name: 'ATS Classic', color: '#374151', tag: 'ATS ✓', cat: 'ATS' },
    { name: 'Rose Elegant', color: '#e11d48', tag: 'PRO', cat: 'Professional' },
    { name: 'Tech Modern', color: '#0891b2', tag: 'PRO', cat: 'Modern' },
    { name: 'Minimal Clean', color: '#7c3aed', tag: 'Simple', cat: 'Simple' },
  ];

  const tagColor: Record<string, string> = {
    'Popular': '#f59e0b', 'New': '#db2777', 'ATS ✓': '#059669', 'PRO': '#4f46e5', 'Simple': '#7c3aed'
  };

  return (
    <div className="page-root">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">R</div>
            <span className="logo-text">Resume<span className="logo-accent">AI</span></span>
          </div>

          <div className="nav-links">
            <button onClick={() => scrollTo('features')}>Features</button>
            <button onClick={() => navigate('/templates')}>Templates</button>
            <button onClick={() => scrollTo('pricing')}>Pricing</button>
            <button onClick={() => scrollTo('blog')}>Blog</button>
          </div>

          <div className="nav-actions">
            {isAdmin && (
              <button onClick={() => navigate('/admin')} className="btn-admin">
                <Shield size={15} /> Admin
              </button>
            )}
            <button onClick={() => navigate('/login')} className="btn-ghost">Log in</button>
            <button onClick={() => navigate('/register')} className="btn-primary-sm">Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-blob blob1" />
        <div className="hero-bg-blob blob2" />
        <div className="hero-bg-blob blob3" />

        <div className={`hero-inner fade-up ${loaded ? 'in' : ''}`}>
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              AI-Powered Resume Builder &nbsp;·&nbsp; 100% Free
            </div>

            <h1 className="hero-headline">
              Build Your <span className="gradient-text">Dream Resume</span><br />
              with AI — in Minutes
            </h1>

            <p className="hero-sub">
              Smart AI suggestions, ATS-friendly templates, and real-time preview.
              Land more interviews with a resume that actually gets noticed.
            </p>

            <div className="hero-btns">
              <button onClick={() => navigate('/register')} className="btn-cta">
                Create My Resume <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/templates')} className="btn-outline">
                Browse Templates
              </button>
            </div>

            <div className="hero-stats">
              {[
                { val: '48%', label: 'More Interviews', color: '#10b981' },
                { val: '10K+', label: 'Resumes Created', color: '#818cf8' },
                { val: '4.9★', label: 'User Rating', color: '#f59e0b' },
              ].map(s => (
                <div key={s.label} className="stat-item">
                  <span className="stat-val" style={{ color: s.color }}>{s.val}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – floating UI */}
          <div className={`hero-right fade-up ${loaded ? 'in delay' : ''}`}>
            <div className="float-stage">
              <div className="stage-glow" />
              <div className="card-tilt">
                <MiniResumeCard />
              </div>

              {/* ATS badge */}
              <div className="float-badge ats-badge" style={{ animationName: 'floatA' }}>
                <div className="fb-label">ATS Score</div>
                <div className="fb-row">
                  <span className="fb-val green">95%</span>
                  <span className="chip chip-green">Excellent</span>
                </div>
              </div>

              {/* AI suggestion */}
              <div className="float-badge ai-badge" style={{ animationName: 'floatB' }}>
                <div className="fb-row mb4">
                  <Sparkles size={12} color="#a78bfa" />
                  <span className="fb-title">AI Suggestion</span>
                </div>
                <div className="fb-body">Add metrics to boost response rate by 40%</div>
              </div>

              {/* PDF ready */}
              <div className="float-badge pdf-badge" style={{ animationName: 'floatC' }}>
                <FileText size={13} color="#818cf8" />
                <span className="fb-title">PDF Ready!</span>
              </div>

              {/* Hired chip */}
              <div className="float-badge hired-badge" style={{ animationName: 'floatA' }}>
                🎉 <span className="fb-title">Just got hired!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by */}
        <div className="trust-bar">
          <span className="trust-label">Trusted by job seekers at</span>
          {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS'].map(c => (
            <span key={c} className="trust-co">{c}</span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-inner">
          <div className="section-tag">Simple Process</div>
          <h2 className="section-title">Three steps to your perfect resume</h2>

          <div className="steps-grid">
            {[
              { n: '01', icon: <FileText size={28} />, title: 'Fill Your Details', desc: 'Enter your work experience, skills, and education. Our smart form guides you every step.' },
              { n: '02', icon: <Sparkles size={28} />, title: 'AI Enhances It', desc: 'Our AI rewrites your bullet points with impact, adds keywords, and optimizes for ATS systems.' },
              { n: '03', icon: <Award size={28} />, title: 'Download & Apply', desc: 'Export a pixel-perfect PDF. Apply with confidence and track your interview rate go up.' },
            ].map((s, i) => (
              <div key={s.n} className="step-card">
                <div className="step-number">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                {i < 2 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section className="templates-section">
        <div className="section-inner">
          <div className="section-tag">Templates</div>
          <h2 className="section-title">Resume templates that get interviews</h2>
          <p className="section-sub">Simple to use and ready in minutes — try it for free!</p>

          <div className="filter-row">
            {['All', 'Simple', 'Modern', 'ATS', 'Professional'].map(c => (
              <button key={c}
                className={`filter-btn ${activeTemplate === c ? 'active' : ''}`}
                onClick={() => setActiveTemplate(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="templates-grid">
            {templates.filter(t => activeTemplate === 'All' || t.cat === activeTemplate).map(t => (
              <div key={t.name} className="template-card" onClick={() => navigate('/templates')}>
                <div className="template-preview" style={{ background: t.color + '12' }}>
                  <div className="tp-bar" style={{ background: t.color }} />
                  <div className="tp-line" style={{ background: t.color + '55', width: '65%' }} />
                  <div className="tp-line" style={{ background: '#e2e8f0', width: '80%' }} />
                  <div className="tp-line" style={{ background: '#e2e8f0', width: '70%' }} />
                  <div className="tp-line" style={{ background: '#e2e8f0', width: '85%' }} />
                  <div className="tp-line" style={{ background: '#e2e8f0', width: '60%' }} />
                </div>
                <div className="template-foot">
                  <span className="template-name">{t.name}</span>
                  <span className="template-tag" style={{ background: tagColor[t.tag] }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="center-btn">
            <button onClick={() => navigate('/templates')} className="btn-outline-purple">
              View All Templates →
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="features-section">
        <div className="section-inner">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything you need to land the job</h2>

          <div className="features-grid">
            {[
              { icon: <Sparkles size={26} />, title: 'AI Writing Assistant', desc: 'Rewrites weak bullet points into compelling, metric-driven impact statements automatically.', color: '#818cf8' },
              { icon: <Zap size={26} />, title: 'Live Preview', desc: 'Every keystroke updates your resume in real-time. What you see is exactly what you get.', color: '#34d399' },
              { icon: <FileText size={26} />, title: 'One-Click PDF', desc: 'Professional, print-ready PDF export in seconds. No watermarks on free plan.', color: '#f472b6' },
              { icon: <TrendingUp size={26} />, title: 'ATS Score Checker', desc: 'Know your resume's pass rate before applying. Beat the bots that filter candidates.', color: '#fb923c' },
              { icon: <Users size={26} />, title: 'Multiple Resumes', desc: 'Create tailored resumes for different roles. Pro users get unlimited versions.', color: '#38bdf8' },
              { icon: <Award size={26} />, title: 'AI Interview Prep', desc: 'Practice questions generated from your resume. Go into interviews fully prepared.', color: '#a78bfa' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div className="feat-icon" style={{ background: f.color + '18', color: f.color }}>{f.icon}</div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="proof-section">
        <div className="section-inner">
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">Job seekers love ResumeAI</h2>

          <div className="reviews-grid">
            {[
              { name: 'Priya Sharma', role: 'Data Analyst @ Razorpay', text: 'The AI suggestions were spot-on. I rewrote my summary in 2 minutes and started getting calls within a week.' },
              { name: 'Arjun Mehta', role: 'Frontend Dev @ Swiggy', text: 'Clean templates, super fast. I used the ATS checker and got my score from 60% to 94% before applying.' },
              { name: 'Sneha Patel', role: 'Product Manager @ Meesho', text: 'Honestly the best free resume tool out there. The live preview alone saves so much time compared to Word.' },
            ].map(r => (
              <div key={r.name} className="review-card">
                <div className="review-stars">{'★★★★★'}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="reviewer">
                  <div className="reviewer-avatar">{r.name[0]}</div>
                  <div>
                    <div className="reviewer-name">{r.name}</div>
                    <div className="reviewer-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="pricing-section">
        <div className="section-inner">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">Simple, honest pricing</h2>
          <p className="section-sub">Start for free — upgrade when you're ready.</p>

          <div className="pricing-grid">
            {/* Free */}
            <div className="plan-card">
              <div className="plan-name">Free</div>
              <div className="plan-price">₹0 <span className="plan-period">/ forever</span></div>
              <ul className="plan-features">
                {['2 Resumes', '4 Templates', 'AI Suggestions', 'PDF Download', 'ATS Score Check'].map(f => (
                  <li key={f}><CheckCircle size={15} className="check-free" /> {f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} className="plan-btn-free">Start Free</button>
            </div>

            {/* Pro */}
            <div className="plan-card plan-pro">
              <div className="plan-popular">⭐ MOST POPULAR</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">₹299 <span className="plan-period">/ month</span></div>
              <ul className="plan-features">
                {['Unlimited Resumes', '10+ Premium Templates', 'Advanced AI Rewriting', 'No Watermark', 'Public Resume Link', 'AI Interview Questions', 'Priority Support'].map(f => (
                  <li key={f}><CheckCircle size={15} className="check-pro" /> {f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} className="plan-btn-pro">Try Pro Free →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="blog-section">
        <div className="section-inner">
          <div className="section-tag">Blog</div>
          <h2 className="section-title">Tips to land your dream job</h2>

          <div className="blog-grid">
            {[
              { title: 'How to Write an ATS-Friendly Resume in 2024', date: 'Dec 15, 2024', read: '5 min', cat: 'ATS Tips', color: '#818cf8' },
              { title: 'Top 10 Resume Keywords That Get You Noticed', date: 'Dec 10, 2024', read: '4 min', cat: 'Keywords', color: '#34d399' },
              { title: 'Remote Job Application Strategy That Works', date: 'Dec 5, 2024', read: '6 min', cat: 'Strategy', color: '#f472b6' },
            ].map(b => (
              <div key={b.title} className="blog-card">
                <div className="blog-thumb" style={{ background: `linear-gradient(135deg, ${b.color}22, ${b.color}44)` }}>
                  <span className="blog-cat" style={{ background: b.color }}>{b.cat}</span>
                </div>
                <div className="blog-body">
                  <h3 className="blog-title">{b.title}</h3>
                  <div className="blog-meta">
                    <span>{b.date}</span>
                    <span>{b.read} read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <div className="cta-badge">🚀 Join 10,000+ job seekers</div>
          <h2 className="cta-headline">Ready to build your dream resume?</h2>
          <p className="cta-sub">Start for free — no credit card needed. Takes less than 5 minutes.</p>
          <button onClick={() => navigate('/register')} className="btn-cta-white">
            Create My Resume Free →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-icon sm">R</div>
            <span className="footer-logo">Resume<span className="logo-accent">AI</span></span>
          </div>
          <p className="footer-copy">© 2024 ResumeAI — Made with ❤️ by Rajalok</p>
          <div className="footer-contact">
            <span>📞 +91 75418 40606</span>
            <span>✉️ rajalok957641@gmail.com</span>
          </div>
        </div>
      </footer>

      <style>{`
        /* ── RESET & BASE ── */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        .page-root {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #0f0c29;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(15, 12, 41, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(129,140,248,0.12);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 14px 24px;
          display: flex; align-items: center; gap: 32px;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px; color: #fff;
        }
        .logo-icon.sm { width: 28px; height: 28px; font-size: 13px; border-radius: 7px; }
        .logo-text { font-weight: 800; font-size: 20px; color: #f1f5f9; }
        .logo-accent { color: #818cf8; }
        .nav-links { display: flex; gap: 28px; flex: 1; }
        .nav-links button { font-size: 14px; color: #94a3b8; transition: color .2s; font-weight: 500; }
        .nav-links button:hover { color: #818cf8; }
        .nav-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .btn-admin {
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          color: #fff; font-size: 13px; font-weight: 700;
          padding: 8px 14px; border-radius: 9px;
        }
        .btn-ghost {
          color: #94a3b8; font-size: 14px; font-weight: 500;
          padding: 8px 14px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.1);
          transition: all .2s;
        }
        .btn-ghost:hover { color: #fff; border-color: rgba(129,140,248,0.4); }
        .btn-primary-sm {
          background: linear-gradient(135deg, #818cf8, #6366f1);
          color: #fff; font-size: 14px; font-weight: 700;
          padding: 9px 18px; border-radius: 9px;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
          transition: opacity .2s;
        }
        .btn-primary-sm:hover { opacity: 0.88; }

        /* ── HERO ── */
        .hero-section {
          position: relative; overflow: hidden;
          min-height: 92vh;
          background: linear-gradient(160deg, #0f0c29 0%, #1a1040 50%, #0f0c29 100%);
          padding: 80px 24px 0;
        }
        .hero-bg-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.25; pointer-events: none;
        }
        .blob1 { width: 600px; height: 600px; background: #6366f1; top: -150px; right: -100px; }
        .blob2 { width: 400px; height: 400px; background: #a78bfa; bottom: 0; left: -100px; }
        .blob3 { width: 300px; height: 300px; background: #38bdf8; top: 40%; right: 30%; }

        .hero-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; gap: 60px;
          position: relative; z-index: 2;
        }
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity .7s, transform .7s; }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fade-up.delay { transition-delay: .25s; }

        .hero-left { flex: 1; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(129,140,248,0.12);
          border: 1px solid rgba(129,140,248,0.25);
          color: #a5b4fc; font-size: 13px; font-weight: 600;
          padding: 7px 16px; border-radius: 50px; margin-bottom: 24px;
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #818cf8;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        .hero-headline {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          color: #f8fafc;
          letter-spacing: -2px;
          margin-bottom: 20px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #c084fc, #38bdf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 17px; color: #94a3b8; line-height: 1.7;
          max-width: 480px; margin-bottom: 32px;
        }

        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
        .btn-cta {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          color: #fff; font-size: 16px; font-weight: 700;
          padding: 16px 28px; border-radius: 14px;
          box-shadow: 0 8px 32px rgba(99,102,241,0.45);
          transition: transform .2s, box-shadow .2s;
        }
        .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(99,102,241,0.55); }
        .btn-outline {
          color: #cbd5e1; font-size: 16px; font-weight: 600;
          padding: 16px 28px; border-radius: 14px;
          border: 2px solid rgba(255,255,255,0.12);
          transition: all .2s;
        }
        .btn-outline:hover { border-color: rgba(129,140,248,0.5); color: #818cf8; }

        .hero-stats { display: flex; gap: 32px; }
        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-val { font-size: 26px; font-weight: 900; }
        .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .5px; }

        /* ── FLOAT STAGE ── */
        .hero-right { flex: 1; display: flex; justify-content: center; }
        .float-stage {
          position: relative; width: 320px; height: 420px;
        }
        .stage-glow {
          position: absolute; inset: -40px;
          background: radial-gradient(ellipse, rgba(129,140,248,0.18), transparent 70%);
          border-radius: 50%;
        }
        .card-tilt { transform: rotate(-3deg); position: relative; z-index: 2; }

        /* Resume card */
        .resume-card {
          background: rgba(255,255,255,0.97);
          border-radius: 16px; padding: 18px;
          width: 280px; color: #1e293b;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        .resume-header {
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border-radius: 10px; padding: 14px;
          display: flex; gap: 10px; align-items: center; margin-bottom: 14px;
        }
        .resume-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 13px; color: #fff; flex-shrink: 0;
        }
        .resume-name { font-size: 13px; font-weight: 800; color: #fff; }
        .resume-title { font-size: 10px; color: rgba(255,255,255,0.75); margin-top: 2px; }
        .resume-contact { font-size: 9px; color: rgba(255,255,255,0.55); margin-top: 4px; }
        .resume-body { padding: 0 2px; }
        .resume-section-label { font-size: 9px; font-weight: 800; color: #6366f1; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
        .resume-job { font-size: 11px; font-weight: 700; color: #1e293b; }
        .resume-date { font-size: 9px; color: #94a3b8; margin: 2px 0 4px; }
        .resume-bullet { font-size: 9px; color: #475569; margin-bottom: 2px; }
        .resume-skills { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
        .skill-tag {
          font-size: 8px; font-weight: 700;
          background: #ede9fe; color: #6366f1;
          padding: 3px 8px; border-radius: 6px;
        }

        /* Floating badges */
        .float-badge {
          position: absolute; background: rgba(30,27,75,0.95);
          border: 1px solid rgba(129,140,248,0.2);
          border-radius: 14px; padding: 10px 14px;
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          animation-duration: 3.5s; animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          z-index: 10;
        }
        .ats-badge { top: -20px; right: -30px; min-width: 130px; }
        .ai-badge { bottom: 20px; left: -40px; max-width: 170px; }
        .pdf-badge { top: 50%; right: -50px; display: flex; align-items: center; gap: 6px; }
        .hired-badge { bottom: -20px; right: 0; display: flex; align-items: center; gap: 6px; }

        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .fb-label { font-size: 9px; color: #64748b; margin-bottom: 4px; }
        .fb-row { display: flex; align-items: center; gap: 6px; }
        .fb-row.mb4 { margin-bottom: 4px; }
        .fb-val { font-size: 20px; font-weight: 900; }
        .fb-val.green { color: #34d399; }
        .fb-title { font-size: 11px; font-weight: 700; color: #e2e8f0; }
        .fb-body { font-size: 9px; color: #94a3b8; line-height: 1.4; }
        .chip { font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
        .chip-green { background: rgba(52,211,153,0.15); color: #34d399; }

        /* Trust bar */
        .trust-bar {
          max-width: 1200px; margin: 60px auto 0;
          display: flex; align-items: center; flex-wrap: wrap; gap: 20px;
          padding: 24px; border-top: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 2;
        }
        .trust-label { font-size: 12px; color: #475569; flex-shrink: 0; }
        .trust-co {
          font-size: 13px; font-weight: 700; color: #64748b;
          transition: color .2s;
        }
        .trust-co:hover { color: #818cf8; }

        /* ── SHARED SECTION STYLES ── */
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .section-tag {
          display: inline-block;
          background: rgba(129,140,248,0.12);
          border: 1px solid rgba(129,140,248,0.2);
          color: #818cf8; font-size: 12px; font-weight: 700;
          padding: 5px 14px; border-radius: 50px; margin-bottom: 16px;
          letter-spacing: .5px; text-transform: uppercase;
        }
        .section-title {
          font-size: clamp(26px, 3vw, 40px);
          font-weight: 900; color: #f1f5f9;
          letter-spacing: -1px; margin-bottom: 12px;
        }
        .section-sub { font-size: 16px; color: #64748b; margin-bottom: 40px; }

        /* ── HOW IT WORKS ── */
        .how-section { padding: 100px 24px; }
        .steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          position: relative;
        }
        .step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 32px 28px;
          position: relative;
          transition: background .3s, border-color .3s;
        }
        .step-card:hover { background: rgba(129,140,248,0.06); border-color: rgba(129,140,248,0.2); }
        .step-number {
          font-size: 48px; font-weight: 900;
          color: rgba(129,140,248,0.12); position: absolute; top: 20px; right: 24px;
          line-height: 1; letter-spacing: -2px;
        }
        .step-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: rgba(129,140,248,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #818cf8; margin-bottom: 16px;
        }
        .step-title { font-size: 18px; font-weight: 800; color: #f1f5f9; margin-bottom: 10px; }
        .step-desc { font-size: 14px; color: #64748b; line-height: 1.6; }
        .step-arrow {
          position: absolute; top: 50%; right: -20px;
          font-size: 24px; color: rgba(129,140,248,0.3);
          transform: translateY(-50%); z-index: 3;
        }

        /* ── TEMPLATES ── */
        .templates-section {
          padding: 100px 24px;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .filter-btn {
          padding: 8px 18px; border-radius: 50px;
          font-size: 13px; font-weight: 600; color: #64748b;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all .2s;
        }
        .filter-btn:hover, .filter-btn.active {
          background: rgba(129,140,248,0.12);
          border-color: rgba(129,140,248,0.3);
          color: #818cf8;
        }
        .templates-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px;
          margin-bottom: 32px;
        }
        .template-card {
          background: rgba(255,255,255,0.03);
          border: 2px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden;
          cursor: pointer;
          transition: transform .25s, border-color .25s, box-shadow .25s;
        }
        .template-card:hover {
          transform: translateY(-6px);
          border-color: rgba(129,140,248,0.4);
          box-shadow: 0 16px 40px rgba(99,102,241,0.2);
        }
        .template-preview { height: 150px; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
        .tp-bar { height: 14px; border-radius: 4px; }
        .tp-line { height: 7px; border-radius: 3px; }
        .template-foot {
          padding: 10px 12px;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .template-name { font-size: 11px; font-weight: 700; color: #cbd5e1; }
        .template-tag {
          font-size: 8px; font-weight: 800; color: #fff;
          padding: 2px 7px; border-radius: 5px;
        }
        .center-btn { text-align: center; }
        .btn-outline-purple {
          color: #818cf8; font-size: 14px; font-weight: 700;
          padding: 12px 28px; border-radius: 12px;
          border: 2px solid rgba(129,140,248,0.3);
          transition: all .2s;
        }
        .btn-outline-purple:hover { background: rgba(129,140,248,0.08); }

        /* ── FEATURES ── */
        .features-section { padding: 100px 24px; }
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px;
          transition: all .3s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(129,140,248,0.18);
          transform: translateY(-3px);
        }
        .feat-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .feat-title { font-size: 16px; font-weight: 800; color: #f1f5f9; margin-bottom: 8px; }
        .feat-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* ── SOCIAL PROOF ── */
        .proof-section {
          padding: 100px 24px;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .review-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 28px;
          transition: all .3s;
        }
        .review-card:hover { border-color: rgba(129,140,248,0.2); }
        .review-stars { color: #fbbf24; font-size: 14px; margin-bottom: 12px; }
        .review-text { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; font-style: italic; }
        .reviewer { display: flex; align-items: center; gap: 12px; }
        .reviewer-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 15px; color: #fff; flex-shrink: 0;
        }
        .reviewer-name { font-size: 13px; font-weight: 700; color: #e2e8f0; }
        .reviewer-role { font-size: 11px; color: #475569; }

        /* ── PRICING ── */
        .pricing-section { padding: 100px 24px; }
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 760px; margin: 0 auto; }
        .plan-card {
          background: rgba(255,255,255,0.04);
          border: 2px solid rgba(255,255,255,0.08);
          border-radius: 24px; padding: 36px;
          position: relative;
        }
        .plan-pro {
          background: linear-gradient(160deg, rgba(99,102,241,0.15), rgba(129,140,248,0.08));
          border-color: rgba(129,140,248,0.3);
          box-shadow: 0 20px 60px rgba(99,102,241,0.2);
        }
        .plan-popular {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #78350f; font-size: 10px; font-weight: 800;
          padding: 5px 16px; border-radius: 50px;
          white-space: nowrap;
        }
        .plan-name { font-size: 22px; font-weight: 800; color: #f1f5f9; margin-bottom: 8px; }
        .plan-price { font-size: 40px; font-weight: 900; color: #f8fafc; margin-bottom: 6px; }
        .plan-period { font-size: 16px; font-weight: 500; color: #64748b; }
        .plan-features { list-style: none; margin: 24px 0 28px; display: flex; flex-direction: column; gap: 12px; }
        .plan-features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #94a3b8; }
        .check-free { color: #34d399; flex-shrink: 0; }
        .check-pro { color: #a5b4fc; flex-shrink: 0; }
        .plan-btn-free {
          width: 100%; padding: 14px;
          border: 2px solid rgba(129,140,248,0.3);
          border-radius: 12px; font-size: 15px; font-weight: 700;
          color: #818cf8; transition: all .2s;
        }
        .plan-btn-free:hover { background: rgba(129,140,248,0.08); }
        .plan-btn-pro {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          border-radius: 12px; font-size: 15px; font-weight: 700;
          color: #fff;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
          transition: opacity .2s;
        }
        .plan-btn-pro:hover { opacity: 0.88; }

        /* ── BLOG ── */
        .blog-section { padding: 100px 24px; }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .blog-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; overflow: hidden;
          cursor: pointer; transition: all .3s;
        }
        .blog-card:hover { transform: translateY(-4px); border-color: rgba(129,140,248,0.2); }
        .blog-thumb { height: 130px; position: relative; display: flex; align-items: flex-end; padding: 12px; }
        .blog-cat {
          font-size: 9px; font-weight: 800; color: #fff;
          padding: 3px 10px; border-radius: 6px;
          text-transform: uppercase; letter-spacing: .5px;
        }
        .blog-body { padding: 16px 18px 20px; }
        .blog-title { font-size: 14px; font-weight: 700; color: #e2e8f0; line-height: 1.4; margin-bottom: 10px; }
        .blog-meta { display: flex; justify-content: space-between; font-size: 11px; color: #475569; }

        /* ── CTA ── */
        .cta-section {
          margin: 40px 24px;
          border-radius: 28px;
          background: linear-gradient(135deg, #4338ca, #6366f1, #818cf8);
          padding: 80px 24px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.15), transparent 60%);
        }
        .cta-inner { position: relative; z-index: 2; }
        .cta-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: #e0e7ff; font-size: 13px; font-weight: 700;
          padding: 6px 16px; border-radius: 50px; margin-bottom: 20px;
        }
        .cta-headline {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900; color: #fff; letter-spacing: -1.5px; margin-bottom: 14px;
        }
        .cta-sub { font-size: 17px; color: rgba(255,255,255,0.7); margin-bottom: 32px; }
        .btn-cta-white {
          display: inline-block;
          background: #fff; color: #4338ca;
          font-size: 17px; font-weight: 800;
          padding: 18px 36px; border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transition: transform .2s;
        }
        .btn-cta-white:hover { transform: translateY(-3px); }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 32px 24px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-brand { display: flex; align-items: center; gap: 8px; }
        .footer-logo { font-size: 16px; font-weight: 800; color: #f1f5f9; }
        .footer-copy { font-size: 13px; color: #475569; }
        .footer-contact { display: flex; gap: 20px; font-size: 13px; color: #475569; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-inner { flex-direction: column; padding-top: 20px; }
          .hero-right { display: none; }
          .steps-grid, .features-grid, .reviews-grid, .blog-grid { grid-template-columns: 1fr 1fr; }
          .step-arrow { display: none; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; }
          .nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .steps-grid, .features-grid, .reviews-grid, .blog-grid { grid-template-columns: 1fr; }
          .templates-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
