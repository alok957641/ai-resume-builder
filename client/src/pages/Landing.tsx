import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const isAdmin = user?.email === 'rajalok957641@gmail.com';

  return (
    <div className="min-h-screen" style={{ background: '#111409', fontFamily: "'Inter', system-ui, sans-serif", color: '#f0f0e8' }}>

      {/* NAVBAR */}
      <nav style={{ background: 'rgba(17,20,9,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        className="sticky top-0 z-50 px-6 sm:px-16 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: '#C8FF00', color: '#111409', fontFamily: "'Syne', sans-serif" }}>R</div>
          <span className="font-black text-lg" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.5px', color: '#f0f0e8' }}>
            Resume<span style={{ color: '#C8FF00' }}>AI</span>
          </span>
        </div>

        <div className="hidden md:flex gap-7">
          {[['Features', '#features'], ['Pricing', '#pricing'], ['Templates', '/templates'], ['FAQ', '#faq']].map(([label, href]) => (
            <button key={label}
              onClick={() => href.startsWith('/') ? navigate(href) : document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium transition-colors" style={{ color: '#7a8060' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0e8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7a8060')}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          {isAdmin && (
            <button onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition"
              style={{ background: 'rgba(200,255,0,0.12)', border: '1px solid rgba(200,255,0,0.25)', color: '#C8FF00' }}>
              <Shield size={15} /> Admin
            </button>
          )}
          <button onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-2 rounded-lg transition"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#f0f0e8' }}>
            Log in
          </button>
          <button onClick={() => navigate('/register')}
            className="text-sm font-black px-5 py-2 rounded-lg transition"
            style={{ background: '#C8FF00', color: '#111409', fontFamily: "'Syne', sans-serif" }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className={`min-h-screen flex flex-col items-center justify-center text-center px-6 relative transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(200,255,0,0.06) 0%, transparent 70%)' }} />

        {/* badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-10"
          style={{ background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)', color: '#C8FF00' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C8FF00' }} />
          AI-Powered Resume Builder
        </div>

        {/* H1 */}
        <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '-4px', color: '#f0f0e8' }}>
          Build a Resume<br />
          That Gets You<br />
          <span style={{ color: '#C8FF00', fontStyle: 'italic' }}>Hired</span>
          <span style={{ color: '#C8FF00', fontSize: '0.5em', verticalAlign: 'super', marginLeft: 8 }}>✦</span>
        </h1>

        <p className="text-base mb-10 max-w-md" style={{ color: '#7a8060', lineHeight: 1.7 }}>
          Smart AI content, ATS optimization, live preview — spend less time writing, more time interviewing.
        </p>

        <button onClick={() => navigate('/register')}
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-black text-base mb-16 transition-all hover:-translate-y-1"
          style={{ background: '#C8FF00', color: '#111409', fontFamily: "'Syne', sans-serif" }}>
          Create My Resume Free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>

        {/* trusted strip */}
        <div className="flex items-center gap-6 px-8 py-4 rounded-2xl flex-wrap justify-center"
          style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5a6040' }}>Trusted by</span>
          <div className="w-8 h-px" style={{ background: '#5a6040' }} />
          {['🎓 IIT Grads', '💼 Freshers', '🚀 Startups', '🏢 MNC Pros'].map(b => (
            <span key={b} className="text-sm font-semibold" style={{ color: '#7a8060' }}>{b}</span>
          ))}
        </div>
      </div>

      {/* STATS ROW */}
      <div className="mx-6 sm:mx-16 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(200,255,0,0.12)', background: '#181d0a' }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[['48%', 'More interview callbacks'], ['10K+', 'Resumes created'], ['95%', 'Average ATS score'], ['12%', 'Avg. salary increase']].map(([num, label], i) => (
            <div key={label} className="py-8 px-6 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(200,255,0,0.12)' : 'none' }}>
              <div className="font-black mb-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, letterSpacing: '-2px', color: '#C8FF00', lineHeight: 1 }}>{num}</div>
              <div className="text-sm font-medium" style={{ color: '#7a8060' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-6xl mx-auto px-6 sm:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#C8FF00', letterSpacing: 2 }}>How we work</div>
            <h2 className="font-black mb-4" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-2px', color: '#f0f0e8', lineHeight: 1.05 }}>
              Get a professional resume at a fraction of the cost.
            </h2>
            <p className="text-sm mb-8" style={{ color: '#7a8060', lineHeight: 1.75, maxWidth: 400 }}>
              Fill in your details, let AI handle the writing. Download a job-ready PDF in minutes — no designer needed.
            </p>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition"
              style={{ border: '1px solid rgba(200,255,0,0.2)', color: '#f0f0e8', background: 'transparent' }}>
              See Pricing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* mini live card */}
          <div className="rounded-2xl p-6" style={{ background: '#181d0a', border: '1px solid rgba(200,255,0,0.12)' }}>
            <div className="rounded-xl p-5 mb-3" style={{ background: '#1e240d', border: '1px solid rgba(200,255,0,0.1)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C8FF00' }}>✦ AI Writing</div>
              <div className="text-sm" style={{ color: '#7a8060', lineHeight: 1.6 }}>Transforming bullet points into compelling, recruiter-approved descriptions...</div>
              <div className="mt-3 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="h-1 rounded-full" style={{ width: '72%', background: '#C8FF00' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['ATS Score', '95%', '#C8FF00'], ['PDF Ready', '✓', '#f0f0e8']].map(([label, val, color]) => (
                <div key={label} className="rounded-xl p-4" style={{ background: '#1e240d', border: '1px solid rgba(200,255,0,0.1)' }}>
                  <div className="text-xs font-semibold mb-1.5" style={{ color: '#5a6040' }}>{label}</div>
                  <div className="font-black" style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, letterSpacing: '-1px', color, lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STEPS */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#181d0a' }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { icon: '🖊️', title: 'Fill your details', desc: 'Enter your experience, education, and skills. Takes under 5 minutes.' },
              { icon: '✨', title: 'AI writes it for you', desc: 'Our AI rewrites your content — action verbs, metrics, ATS keywords — automatically.' },
              { icon: '📄', title: 'Download & apply', desc: 'One-click PDF download. Print-ready, recruiter-approved, no watermark on free plan.' },
            ].map((step, i) => (
              <div key={step.title} className="p-10" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6"
                  style={{ background: 'rgba(200,255,0,0.15)', border: '1px solid rgba(200,255,0,0.25)' }}>
                  {step.icon}
                </div>
                <div className="font-black text-base mb-3" style={{ fontFamily: "'Syne', sans-serif", color: '#f0f0e8', letterSpacing: '-0.5px' }}>{step.title}</div>
                <div className="text-sm" style={{ color: '#7a8060', lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 sm:px-16 pb-24">
        <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#C8FF00', letterSpacing: 2 }}>Features</div>
        <h2 className="font-black mb-12" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-2px', color: '#f0f0e8', lineHeight: 1.05 }}>
          Everything you need to land the job
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: 'rgba(255,255,255,0.07)' }}>
            {[
              { num: '01', icon: '✨', title: 'AI Content Writing', desc: 'Rewrites your experience with powerful action verbs, quantified achievements, and keywords recruiters search for.', tag: 'Powered by Claude' },
              { num: '02', icon: '⚡', title: 'Live Preview', desc: 'Type and watch your resume update in real-time. No lag, no waiting — what you see is what gets printed.', tag: 'Instant' },
              { num: '03', icon: '📄', title: 'One-click PDF', desc: 'Download a pixel-perfect, ATS-safe PDF in seconds. Recruiters will notice the quality immediately.', tag: 'Print Ready' },
            ].map(f => (
              <div key={f.title} className="p-10 transition-colors" style={{ background: '#181d0a' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1e240d')}
                onMouseLeave={e => (e.currentTarget.style.background = '#181d0a')}>
                <div className="text-xs font-bold tracking-widest mb-5" style={{ color: '#5a6040', letterSpacing: 1.5 }}>{f.num}</div>
                <div className="text-3xl mb-5">{f.icon}</div>
                <div className="font-black text-lg mb-3" style={{ fontFamily: "'Syne', sans-serif", color: '#f0f0e8', letterSpacing: '-0.5px' }}>{f.title}</div>
                <div className="text-sm mb-5" style={{ color: '#7a8060', lineHeight: 1.7 }}>{f.desc}</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.2)', color: '#C8FF00', letterSpacing: .5 }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 sm:px-16 py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C8FF00', letterSpacing: 2 }}>Pricing</div>
            <h2 className="font-black mb-3" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-2px', color: '#f0f0e8', lineHeight: 1.05 }}>
              Simple, honest pricing
            </h2>
            <p className="text-sm" style={{ color: '#7a8060' }}>Start for free. Upgrade when you're ready.</p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: 'rgba(255,255,255,0.07)' }}>

              {/* Free */}
              <div className="p-10" style={{ background: '#181d0a' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#7a8060', letterSpacing: 2 }}>Free</div>
                <div className="font-black mb-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: 56, letterSpacing: '-3px', color: '#f0f0e8', lineHeight: 1 }}>₹0</div>
                <div className="text-sm mb-9" style={{ color: '#7a8060' }}>Forever free, no card needed</div>
                <ul className="mb-10 space-y-0">
                  {['2 Resumes', '4 Templates', 'AI Suggestions', 'PDF Download', 'ATS Score Check'].map(f => (
                    <li key={f} className="flex items-center gap-3 py-2.5 text-sm" style={{ color: '#7a8060', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="font-black" style={{ color: '#C8FF00' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')}
                  className="w-full py-3.5 rounded-xl text-sm font-bold transition"
                  style={{ border: '1px solid rgba(200,255,0,0.3)', background: 'transparent', color: '#C8FF00', fontFamily: "'Syne', sans-serif" }}>
                  Start for free
                </button>
              </div>

              {/* Pro */}
              <div className="p-10 relative" style={{ background: '#C8FF00' }}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap uppercase tracking-wider"
                  style={{ background: '#111409', color: '#C8FF00', border: '1px solid #C8FF00' }}>
                  ⭐ Most Popular
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(17,20,9,0.55)', letterSpacing: 2 }}>Pro</div>
                <div className="font-black mb-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: 56, letterSpacing: '-3px', color: '#111409', lineHeight: 1 }}>₹299</div>
                <div className="text-sm mb-9" style={{ color: 'rgba(17,20,9,0.5)' }}>per month, cancel anytime</div>
                <ul className="mb-10 space-y-0">
                  {['Unlimited Resumes', '10+ Templates', 'Advanced AI Writing', 'No Watermark', 'Public Resume Link', 'AI Interview Prep', 'Priority Support'].map(f => (
                    <li key={f} className="flex items-center gap-3 py-2.5 text-sm" style={{ color: 'rgba(17,20,9,0.75)', borderBottom: '1px solid rgba(17,20,9,0.1)' }}>
                      <span className="font-black" style={{ color: '#111409' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')}
                  className="w-full py-3.5 rounded-xl text-sm font-bold transition"
                  style={{ background: '#111409', color: '#C8FF00', border: 'none', fontFamily: "'Syne', sans-serif" }}>
                  Get Pro now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 sm:px-16 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-5 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs" style={{ background: '#C8FF00', color: '#111409', fontFamily: "'Syne', sans-serif" }}>R</div>
            <span className="font-black text-sm" style={{ fontFamily: "'Syne', sans-serif", color: '#f0f0e8' }}>Resume<span style={{ color: '#C8FF00' }}>AI</span></span>
          </div>
          <p className="text-xs text-center" style={{ color: '#5a6040' }}>© 2024 ResumeAI — Made with ❤️ by Rajalok</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="tel:+917541840606" className="text-xs transition" style={{ color: '#7a8060', textDecoration: 'none' }}>📞 +91 75418 40606</a>
            <a href="mailto:rajalok957641@gmail.com" className="text-xs transition" style={{ color: '#7a8060', textDecoration: 'none' }}>✉️ rajalok957641@gmail.com</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
}
