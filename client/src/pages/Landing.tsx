import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const isAdmin = user?.email === 'rajalok957641@gmail.com';

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const S = {
    bg: '#111409',
    bg2: '#181d0a',
    bg3: '#1e240d',
    lime: '#C8FF00',
    lime2: '#aee000',
    text: '#f0f0e8',
    muted: '#7a8060',
    muted2: '#5a6040',
    border: 'rgba(255,255,255,0.07)',
    limeBorder: 'rgba(200,255,0,0.15)',
    syne: "'Syne', sans-serif",
  };

  return (
    <div style={{ background: S.bg, fontFamily: "'Inter', system-ui, sans-serif", color: S.text, overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: 'rgba(17,20,9,0.94)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${S.border}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: S.lime, color: S.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: S.syne, fontWeight: 800, fontSize: 15 }}>R</div>
            <span style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: S.text }}>
              Resume<span style={{ color: S.lime }}>AI</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ gap: 28 }}>
            {[['Features', 'features'], ['Pricing', 'pricing']].map(([l, id]) => (
              <button key={l} onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', color: S.muted, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                onMouseLeave={e => (e.currentTarget.style.color = S.muted)}>{l}</button>
            ))}
            <button onClick={() => navigate('/templates')}
              style={{ background: 'none', border: 'none', color: S.muted, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = S.text)}
              onMouseLeave={e => (e.currentTarget.style.color = S.muted)}>Templates</button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10 }}>
            {isAdmin && (
              <button onClick={() => navigate('/admin')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.25)', color: S.lime, fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, cursor: 'pointer' }}>
                <Shield size={14} /> Admin
              </button>
            )}
            <button onClick={() => navigate('/login')}
              style={{ background: 'transparent', border: `1px solid ${S.border}`, color: S.text, fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}>
              Log in
            </button>
            <button onClick={() => navigate('/register')}
              style={{ background: S.lime, color: S.bg, fontSize: 13, fontWeight: 800, fontFamily: S.syne, padding: '9px 20px', borderRadius: 8, cursor: 'pointer', border: 'none' }}>
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: `1px solid ${S.border}`, color: S.text, padding: '6px 8px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: S.bg2, borderTop: `1px solid ${S.border}`, padding: '16px 20px 20px' }}>
            {[['Features', 'features'], ['Pricing', 'pricing']].map(([l, id]) => (
              <button key={l} onClick={() => scrollTo(id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: S.muted, fontSize: 15, fontWeight: 500, padding: '12px 0', cursor: 'pointer', borderBottom: `1px solid ${S.border}` }}>
                {l}
              </button>
            ))}
            <button onClick={() => { navigate('/templates'); setMenuOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: S.muted, fontSize: 15, fontWeight: 500, padding: '12px 0', cursor: 'pointer', borderBottom: `1px solid ${S.border}` }}>
              Templates
            </button>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={() => { navigate('/login'); setMenuOpen(false); }}
                style={{ flex: 1, background: 'transparent', border: `1px solid ${S.border}`, color: S.text, fontSize: 14, fontWeight: 500, padding: '11px', borderRadius: 8, cursor: 'pointer' }}>
                Log in
              </button>
              <button onClick={() => { navigate('/register'); setMenuOpen(false); }}
                style={{ flex: 1, background: S.lime, color: S.bg, fontSize: 14, fontWeight: 800, fontFamily: S.syne, padding: '11px', borderRadius: 8, cursor: 'pointer', border: 'none' }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div style={{
        minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '60px 20px 60px', position: 'relative',
        opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all .7s ease'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 350px at 50% 45%, rgba(200,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)', padding: '6px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, color: S.lime, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 36 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.lime, animation: 'pulse 2s ease-in-out infinite' }} />
          AI-Powered Resume Builder
        </div>

        {/* H1 */}
        <h1 style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(40px, 9vw, 92px)', letterSpacing: 'clamp(-2px, -0.04em, -4px)', lineHeight: .98, color: S.text, marginBottom: 24, maxWidth: 900 }}>
          Build a Resume<br />
          That Gets You<br />
          <span style={{ color: S.lime, fontStyle: 'italic' }}>Hired</span>
          <span style={{ color: S.lime, fontSize: '0.45em', verticalAlign: 'super', marginLeft: 6 }}>✦</span>
        </h1>

        <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: S.muted, lineHeight: 1.75, maxWidth: 420, marginBottom: 36 }}>
          Smart AI content, ATS optimization, live preview — spend less time writing, more time interviewing.
        </p>

        <button onClick={() => navigate('/register')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: S.lime, color: S.bg, fontFamily: S.syne, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 800, padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px)', borderRadius: 12, cursor: 'pointer', border: 'none', marginBottom: 52, transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = S.lime2; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = S.lime; e.currentTarget.style.transform = 'translateY(0)'; }}>
          Create My Resume Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>

        {/* Trusted strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', borderRadius: 16, border: `1px solid ${S.border}`, background: 'rgba(255,255,255,0.02)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 560 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: S.muted2 }}>Trusted by</span>
          <div style={{ width: 28, height: 1, background: S.muted2, opacity: .5 }} />
          {['🎓 IIT Grads', '💼 Freshers', '🚀 Startups', '🏢 MNC Pros'].map(b => (
            <span key={b} style={{ fontSize: 13, fontWeight: 600, color: S.muted }}>{b}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ margin: '0 16px 0', borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.limeBorder}`, background: S.bg2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} className="sm:grid-cols-4-custom">
          {[['48%', 'More interview callbacks'], ['10K+', 'Resumes created'], ['95%', 'Avg ATS score'], ['12%', 'Salary increase']].map(([num, label], i) => (
            <div key={label} style={{
              padding: 'clamp(20px, 4vw, 32px) 16px', textAlign: 'center',
              borderRight: (i === 1 || i === 3) ? 'none' : `1px solid ${S.limeBorder}`,
              borderBottom: i < 2 ? `1px solid ${S.limeBorder}` : 'none'
            }}>
              <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', letterSpacing: '-2px', color: S.lime, lineHeight: 1, marginBottom: 8 }}>{num}</div>
              <div style={{ fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 500, color: S.muted }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px, 5vw, 56px)', alignItems: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: S.lime, marginBottom: 16 }}>How we work</div>
            <h2 style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(26px, 4vw, 46px)', letterSpacing: '-1.5px', color: S.text, lineHeight: 1.06, marginBottom: 16 }}>
              Get a professional resume at a fraction of the cost.
            </h2>
            <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.75, maxWidth: 400, marginBottom: 28 }}>
              Fill in your details, let AI handle the writing. Download a job-ready PDF in minutes.
            </p>
            <button onClick={() => scrollTo('pricing')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(200,255,0,0.2)`, background: 'transparent', color: S.text, fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = S.lime; e.currentTarget.style.color = S.lime; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,255,0,0.2)'; e.currentTarget.style.color = S.text; }}>
              See Pricing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Live card */}
          <div style={{ background: S.bg2, border: `1px solid ${S.limeBorder}`, borderRadius: 16, padding: 'clamp(16px, 3vw, 28px)' }}>
            <div style={{ background: S.bg3, border: `1px solid rgba(200,255,0,0.1)`, borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: S.lime, marginBottom: 8 }}>✦ AI Writing</div>
              <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.6 }}>Transforming bullet points into compelling, recruiter-approved descriptions...</div>
              <div style={{ marginTop: 12, height: 4, background: S.border, borderRadius: 2 }}>
                <div style={{ width: '72%', height: '100%', background: S.lime, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['ATS Score', '95%', S.lime], ['PDF Ready', '✓', S.text]].map(([label, val, color]) => (
                <div key={label} style={{ background: S.bg3, border: `1px solid rgba(200,255,0,0.1)`, borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: S.muted2, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 26, letterSpacing: '-1px', color, lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.border}`, background: S.bg2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[
              { icon: '🖊️', title: 'Fill your details', desc: 'Enter your experience, education, and skills. Takes under 5 minutes.' },
              { icon: '✨', title: 'AI writes for you', desc: 'Our AI rewrites with action verbs, metrics, and ATS keywords automatically.' },
              { icon: '📄', title: 'Download & apply', desc: 'One-click PDF. Print-ready, recruiter-approved, no watermark on free plan.' },
            ].map((step, i) => (
              <div key={step.title} style={{ padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)', borderBottom: `1px solid ${S.border}` }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: 'rgba(200,255,0,0.15)', border: '1px solid rgba(200,255,0,0.25)', marginBottom: 20 }}>
                  {step.icon}
                </div>
                <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 15, color: S.text, letterSpacing: '-0.3px', marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px clamp(60px, 8vw, 100px)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: S.lime, marginBottom: 16 }}>Features</div>
        <h2 style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(26px, 4vw, 46px)', letterSpacing: '-1.5px', color: S.text, lineHeight: 1.06, marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          Everything you need to land the job
        </h2>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: S.border }}>
            {[
              { num: '01', icon: '✨', title: 'AI Content Writing', desc: 'Rewrites your experience with action verbs, quantified achievements, and keywords recruiters search for.', tag: 'Powered by Claude' },
              { num: '02', icon: '⚡', title: 'Live Preview', desc: 'Type and watch your resume update in real-time. No lag, no waiting — what you see is what gets printed.', tag: 'Instant' },
              { num: '03', icon: '📄', title: 'One-click PDF', desc: 'Download a pixel-perfect, ATS-safe PDF in seconds. Recruiters will notice the quality immediately.', tag: 'Print Ready' },
            ].map(f => (
              <div key={f.title} style={{ background: S.bg2, padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)', transition: 'background .2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = S.bg3)}
                onMouseLeave={e => (e.currentTarget.style.background = S.bg2)}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: S.muted2, marginBottom: 16 }}>{f.num}</div>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 17, color: S.text, letterSpacing: '-0.4px', marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.2)', color: S.lime, letterSpacing: .5 }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: 'clamp(60px, 8vw, 100px) 20px', borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: S.lime, marginBottom: 14 }}>Pricing</div>
            <h2 style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(28px, 4vw, 50px)', letterSpacing: '-1.5px', color: S.text, lineHeight: 1.05, marginBottom: 12 }}>
              Simple, honest pricing
            </h2>
            <p style={{ fontSize: 14, color: S.muted }}>Start for free. Upgrade when you're ready.</p>
          </div>

          <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${S.border}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: S.border }}>

              {/* Free */}
              <div style={{ background: S.bg2, padding: 'clamp(28px, 4vw, 44px)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: S.muted, marginBottom: 16 }}>Free</div>
                <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(44px, 6vw, 58px)', letterSpacing: '-2px', color: S.text, lineHeight: 1, marginBottom: 6 }}>₹0</div>
                <div style={{ fontSize: 13, color: S.muted, marginBottom: 32 }}>Forever free, no card needed</div>
                <ul style={{ listStyle: 'none', marginBottom: 36 }}>
                  {['2 Resumes', '4 Templates', 'AI Suggestions', 'PDF Download', 'ATS Score Check'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: S.muted, padding: '10px 0', borderBottom: `1px solid ${S.border}` }}>
                      <span style={{ fontWeight: 800, color: S.lime }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')}
                  style={{ width: '100%', padding: '13px', borderRadius: 10, border: '1px solid rgba(200,255,0,0.3)', background: 'transparent', color: S.lime, fontSize: 14, fontWeight: 700, fontFamily: S.syne, cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,255,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  Start for free
                </button>
              </div>

              {/* Pro */}
              <div style={{ background: S.lime, padding: 'clamp(28px, 4vw, 44px)', position: 'relative', paddingTop: 'clamp(40px, 5vw, 56px)' }}>
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: S.bg, color: S.lime, fontSize: 10, fontWeight: 700, padding: '5px 16px', borderRadius: 100, border: `1px solid ${S.lime}`, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 1 }}>
                  ⭐ Most Popular
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(17,20,9,0.5)', marginBottom: 16 }}>Pro</div>
                <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(44px, 6vw, 58px)', letterSpacing: '-2px', color: S.bg, lineHeight: 1, marginBottom: 6 }}>₹299</div>
                <div style={{ fontSize: 13, color: 'rgba(17,20,9,0.5)', marginBottom: 32 }}>per month, cancel anytime</div>
                <ul style={{ listStyle: 'none', marginBottom: 36 }}>
                  {['Unlimited Resumes', '10+ Templates', 'Advanced AI Writing', 'No Watermark', 'Public Resume Link', 'AI Interview Prep', 'Priority Support'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(17,20,9,0.75)', padding: '10px 0', borderBottom: '1px solid rgba(17,20,9,0.1)' }}>
                      <span style={{ fontWeight: 800, color: S.bg }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')}
                  style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: S.bg, color: S.lime, fontSize: 14, fontWeight: 700, fontFamily: S.syne, cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1e2800')}
                  onMouseLeave={e => (e.currentTarget.style.background = S.bg)}>
                  Get Pro now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{ margin: '0 16px clamp(60px, 8vw, 100px)', borderRadius: 20, background: S.bg2, border: `1px solid ${S.limeBorder}`, padding: 'clamp(40px, 6vw, 72px) 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 'clamp(26px, 5vw, 52px)', letterSpacing: '-2px', color: S.text, lineHeight: 1.05, marginBottom: 16 }}>
          Ready to get <span style={{ color: S.lime, fontStyle: 'italic' }}>hired?</span> <span style={{ color: S.lime }}>✦</span>
        </div>
        <p style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: S.muted, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          Start for free — no credit card required. Build your resume in minutes.
        </p>
        <button onClick={() => navigate('/register')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: S.lime, color: S.bg, fontFamily: S.syne, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 800, padding: 'clamp(12px, 2vw, 16px) clamp(28px, 4vw, 44px)', borderRadius: 12, cursor: 'pointer', border: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.background = S.lime2)}
          onMouseLeave={e => (e.currentTarget.style.background = S.lime)}>
          Create My Resume Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${S.border}`, padding: 'clamp(32px, 4vw, 48px) 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: S.lime, color: S.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: S.syne, fontWeight: 800, fontSize: 13 }}>R</div>
            <span style={{ fontFamily: S.syne, fontWeight: 800, fontSize: 15, color: S.text }}>Resume<span style={{ color: S.lime }}>AI</span></span>
          </div>
          <p style={{ fontSize: 12, color: S.muted2, textAlign: 'center' }}>© 2024 ResumeAI — Made with ❤️ by Rajalok</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:+917541840606" style={{ fontSize: 12, color: S.muted, textDecoration: 'none' }}>📞 +91 75418 40606</a>
            <a href="mailto:rajalok957641@gmail.com" style={{ fontSize: 12, color: S.muted, textDecoration: 'none' }}>✉️ rajalok957641@gmail.com</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
        * { box-sizing: border-box; }
        button { font-family: 'Inter', system-ui, sans-serif; }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
