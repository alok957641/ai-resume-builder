import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield, Zap, FileText, TrendingUp, Users, Award } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function MiniResumeCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 18, width: 270,
      boxShadow: '0 20px 60px rgba(108,99,255,0.18)', color: '#1e293b'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
        borderRadius: 10, padding: '12px 14px',
        display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0
        }}>AS</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Alok Singh</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Senior Software Engineer</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>rajalok957641@email.com • Mumbai</div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 9, fontWeight: 800, color: '#6c63ff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Experience</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>Senior Engineer — Google India</div>
        <div style={{ fontSize: 9, color: '#94a3b8', margin: '2px 0 5px' }}>2022 – Present</div>
        <div style={{ fontSize: 9, color: '#475569', marginBottom: 2 }}>• Led microservices migration, reduced latency by 40%</div>
        <div style={{ fontSize: 9, color: '#475569', marginBottom: 8 }}>• Built data pipeline serving 2M+ users daily</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['React', 'Node.js', 'AWS', 'Docker'].map(s => (
            <span key={s} style={{
              fontSize: 8, fontWeight: 700,
              background: '#ede9fe', color: '#6c63ff',
              padding: '3px 8px', borderRadius: 6
            }}>{s}</span>
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

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const isAdmin = user?.email === 'rajalok957641@gmail.com';

  const templates = [
    { name: 'Modern Blue', color: '#6c63ff', tag: 'Popular', cat: 'Modern' },
    { name: 'Emerald Pro', color: '#059669', tag: 'New', cat: 'Modern' },
    { name: 'ATS Classic', color: '#374151', tag: 'ATS', cat: 'ATS' },
    { name: 'Rose Elegant', color: '#e11d48', tag: 'PRO', cat: 'Professional' },
    { name: 'Tech Modern', color: '#0891b2', tag: 'PRO', cat: 'Modern' },
    { name: 'Minimal Clean', color: '#7c3aed', tag: 'Simple', cat: 'Simple' },
  ];
  const tagColor: Record<string, string> = {
    'Popular': '#f59e0b', 'New': '#db2777', 'ATS': '#059669', 'PRO': '#6c63ff', 'Simple': '#7c3aed'
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", background: '#f0eeff', color: '#1e293b', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(108,99,255,0.1)',
        boxShadow: '0 2px 20px rgba(108,99,255,0.08)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 32 }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 16, color: '#fff'
            }}>R</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#1e293b' }}>
              Resume<span style={{ color: '#6c63ff' }}>AI</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: 28, flex: 1 }}>
            {[['Features','features'],['Pricing','pricing'],['Blog','blog']].map(([l,id]) => (
              <button key={l} onClick={() => scrollTo(id)}
                style={{ fontSize: 14, color: '#64748b', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color='#6c63ff')}
                onMouseLeave={e => (e.currentTarget.style.color='#64748b')}
              >{l}</button>
            ))}
            <button onClick={() => navigate('/templates')}
              style={{ fontSize: 14, color: '#64748b', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color='#6c63ff')}
              onMouseLeave={e => (e.currentTarget.style.color='#64748b')}
            >Templates</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {isAdmin && (
              <button onClick={() => navigate('/admin')} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                padding: '8px 14px', borderRadius: 9, border: 'none', cursor: 'pointer'
              }}><Shield size={15} /> Admin</button>
            )}
            <button onClick={() => navigate('/login')} style={{
              color: '#64748b', fontSize: 14, fontWeight: 500, border: '1.5px solid #e2e8f0',
              background: 'none', padding: '8px 16px', borderRadius: 9, cursor: 'pointer'
            }}>Log in</button>
            <button onClick={() => navigate('/register')} style={{
              background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(108,99,255,0.35)'
            }}>Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden', minHeight: '90vh',
        background: 'linear-gradient(145deg, #f0eeff 0%, #e8e0ff 40%, #f5f0ff 100%)',
        padding: '80px 24px 0'
      }}>
        {/* blobs */}
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'#a78bfa', opacity:0.18, filter:'blur(90px)', top:-150, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'#818cf8', opacity:0.15, filter:'blur(70px)', bottom:0, left:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'#f0abfc', opacity:0.18, filter:'blur(60px)', top:'35%', right:'25%', pointerEvents:'none' }} />

        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 60,
          position: 'relative', zIndex: 2,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .7s, transform .7s'
        }}>
          {/* LEFT */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
              color: '#6c63ff', fontSize: 13, fontWeight: 600,
              padding: '7px 16px', borderRadius: 50, marginBottom: 24
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6c63ff', display: 'inline-block', animation: 'pulseA 2s infinite' }} />
              AI-Powered Resume Builder &nbsp;·&nbsp; 100% Free
            </div>

            <h1 style={{
              fontSize: 'clamp(36px,5vw,62px)', fontWeight: 900,
              lineHeight: 1.1, color: '#0f172a', letterSpacing: -2, marginBottom: 20
            }}>
              Build Your{' '}
              <span style={{
                background: 'linear-gradient(135deg,#6c63ff,#a78bfa,#f0abfc)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Dream Resume</span>
              <br />with AI — in Minutes
            </h1>

            <p style={{ fontSize: 17, color: '#64748b', lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
              Smart AI suggestions, ATS-friendly templates, and real-time preview.
              Land more interviews with a resume that actually gets noticed.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <button onClick={() => navigate('/register')} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                padding: '16px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(108,99,255,0.4)'
              }}>
                Create My Resume <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/templates')} style={{
                color: '#6c63ff', fontSize: 16, fontWeight: 600,
                padding: '16px 28px', borderRadius: 14, border: '2px solid rgba(108,99,255,0.3)',
                background: 'rgba(108,99,255,0.05)', cursor: 'pointer'
              }}>Browse Templates</button>
            </div>

            <div style={{ display: 'flex', gap: 36 }}>
              {[
                { val: '48%', label: 'More Interviews', color: '#10b981' },
                { val: '10K+', label: 'Resumes Created', color: '#6c63ff' },
                { val: '4.9★', label: 'User Rating', color: '#f59e0b' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: .5, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – floating cards */}
          <div style={{
            flex: 1, display: 'flex', justifyContent: 'center',
            opacity: loaded ? 1 : 0, transition: 'opacity 1s .25s'
          }}>
            <div style={{ position: 'relative', width: 320, height: 420 }}>
              <div style={{
                position: 'absolute', inset: -50,
                background: 'radial-gradient(ellipse, rgba(108,99,255,0.15), transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ transform: 'rotate(-3deg)', position: 'relative', zIndex: 2 }}>
                <MiniResumeCard />
              </div>

              {/* ATS badge */}
              <div style={{
                position: 'absolute', top: -18, right: -35,
                background: '#fff', borderRadius: 14, padding: '10px 14px',
                boxShadow: '0 12px 40px rgba(108,99,255,0.18)',
                border: '1px solid rgba(108,99,255,0.1)',
                animation: 'floatA 3.5s ease-in-out infinite', zIndex: 10, minWidth: 130
              }}>
                <div style={{ fontSize: 9, color: '#94a3b8', marginBottom: 4 }}>ATS Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#10b981' }}>95%</span>
                  <span style={{ fontSize: 9, fontWeight: 700, background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: 6 }}>Excellent</span>
                </div>
              </div>

              {/* AI suggestion */}
              <div style={{
                position: 'absolute', bottom: 30, left: -45,
                background: '#fff', borderRadius: 14, padding: '10px 14px',
                boxShadow: '0 12px 40px rgba(108,99,255,0.15)',
                border: '1px solid rgba(108,99,255,0.1)',
                animation: 'floatB 4s ease-in-out infinite', zIndex: 10, maxWidth: 175
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Sparkles size={12} color="#a78bfa" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>AI Suggestion</span>
                </div>
                <div style={{ fontSize: 9, color: '#64748b', lineHeight: 1.4 }}>Add metrics to boost response rate by 40%</div>
              </div>

              {/* PDF ready */}
              <div style={{
                position: 'absolute', top: '50%', right: -50,
                background: '#fff', borderRadius: 12, padding: '8px 12px',
                boxShadow: '0 8px 28px rgba(108,99,255,0.15)',
                border: '1px solid rgba(108,99,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 6,
                animation: 'floatC 3s ease-in-out infinite', zIndex: 10
              }}>
                <FileText size={13} color="#6c63ff" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>PDF Ready!</span>
              </div>

              {/* Hired */}
              <div style={{
                position: 'absolute', bottom: -18, right: 10,
                background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
                borderRadius: 12, padding: '8px 14px',
                boxShadow: '0 8px 24px rgba(108,99,255,0.35)',
                display: 'flex', alignItems: 'center', gap: 6,
                animation: 'floatA 4.5s ease-in-out infinite', zIndex: 10
              }}>
                <span style={{ fontSize: 14 }}>🎉</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Just got hired!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by bar */}
        <div style={{
          maxWidth: 1200, margin: '60px auto 0',
          display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 24,
          padding: '24px', borderTop: '1px solid rgba(108,99,255,0.12)',
          position: 'relative', zIndex: 2
        }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>Trusted by job seekers at</span>
          {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS'].map(c => (
            <span key={c} style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8' }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Simple Process</div>
          <h2 style={titleStyle}>Three steps to your perfect resume</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, position: 'relative' }}>
            {[
              { n: '01', icon: <FileText size={26} />, title: 'Fill Your Details', desc: 'Enter your work experience, skills, and education. Our smart form guides you every step.' },
              { n: '02', icon: <Sparkles size={26} />, title: 'AI Enhances It', desc: 'Our AI rewrites your bullet points with impact, adds keywords, and optimizes for ATS systems.' },
              { n: '03', icon: <Award size={26} />, title: 'Download & Apply', desc: 'Export a pixel-perfect PDF. Apply with confidence and watch your interview rate go up.' },
            ].map((s, i) => (
              <div key={s.n} style={{
                background: i === 1 ? 'linear-gradient(135deg,#6c63ff,#a78bfa)' : '#f8f6ff',
                borderRadius: 20, padding: '32px 28px', position: 'relative',
                boxShadow: i === 1 ? '0 20px 50px rgba(108,99,255,0.35)' : 'none'
              }}>
                <div style={{
                  fontSize: 52, fontWeight: 900, position: 'absolute', top: 18, right: 24,
                  color: i === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(108,99,255,0.1)', lineHeight: 1
                }}>{s.n}</div>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: i === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(108,99,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === 1 ? '#fff' : '#6c63ff', marginBottom: 16
                }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: i === 1 ? '#fff' : '#0f172a', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: i === 1 ? 'rgba(255,255,255,0.8)' : '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
                {i < 2 && (
                  <div style={{
                    position: 'absolute', top: '50%', right: -20,
                    fontSize: 22, color: 'rgba(108,99,255,0.3)', transform: 'translateY(-50%)', zIndex: 3
                  }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 24px', background: '#f8f6ff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Features</div>
          <h2 style={titleStyle}>Everything you need to land the job</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { icon: <Sparkles size={24} />, title: 'AI Writing Assistant', desc: 'Rewrites weak bullet points into compelling, metric-driven impact statements automatically.', color: '#6c63ff' },
              { icon: <Zap size={24} />, title: 'Live Preview', desc: 'Every keystroke updates your resume in real-time. What you see is exactly what you get.', color: '#10b981' },
              { icon: <FileText size={24} />, title: 'One-Click PDF', desc: 'Professional, print-ready PDF export in seconds. No watermarks on free plan.', color: '#ec4899' },
              { icon: <TrendingUp size={24} />, title: 'ATS Score Checker', desc: "Know your resume's pass rate before applying. Beat the bots that filter candidates.", color: '#f59e0b' },
              { icon: <Users size={24} />, title: 'Multiple Resumes', desc: 'Create tailored resumes for different roles. Pro users get unlimited versions.', color: '#0891b2' },
              { icon: <Award size={24} />, title: 'AI Interview Prep', desc: 'Practice questions generated from your resume. Go into interviews fully prepared.', color: '#7c3aed' },
            ].map(f => (
              <div key={f.title} style={{
                background: '#fff', borderRadius: 20, padding: 28,
                border: '1.5px solid rgba(108,99,255,0.08)',
                boxShadow: '0 4px 20px rgba(108,99,255,0.06)',
                transition: 'transform .25s, box-shadow .25s'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(108,99,255,0.14)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(108,99,255,0.06)'; }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: f.color + '18', color: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Templates</div>
          <h2 style={titleStyle}>Resume templates that get interviews</h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32 }}>Simple to use and ready in minutes — try it for free!</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {['All', 'Simple', 'Modern', 'ATS', 'Professional'].map(c => (
              <button key={c} onClick={() => setActiveTemplate(c)} style={{
                padding: '8px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all .2s',
                background: activeTemplate === c ? '#6c63ff' : 'transparent',
                color: activeTemplate === c ? '#fff' : '#64748b',
                border: activeTemplate === c ? '1.5px solid #6c63ff' : '1.5px solid #e2e8f0'
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(165px,1fr))', gap: 16, marginBottom: 32 }}>
            {templates.filter(t => activeTemplate === 'All' || t.cat === activeTemplate).map(t => (
              <div key={t.name} onClick={() => navigate('/templates')} style={{
                background: '#f8f6ff', borderRadius: 16, overflow: 'hidden',
                border: '2px solid #ede9fe', cursor: 'pointer',
                transition: 'transform .25s, border-color .25s, box-shadow .25s'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#6c63ff'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(108,99,255,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#ede9fe'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div style={{ height: 148, padding: 12, background: t.color + '10', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ height: 13, borderRadius: 4, background: t.color }} />
                  <div style={{ height: 7, borderRadius: 3, background: t.color + '55', width: '65%' }} />
                  {[80, 70, 85, 60].map((w, i) => (
                    <div key={i} style={{ height: 6, borderRadius: 3, background: '#e2e8f0', width: w + '%' }} />
                  ))}
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ede9fe' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>{t.name}</span>
                  <span style={{ fontSize: 8, fontWeight: 800, color: '#fff', background: tagColor[t.tag], padding: '2px 7px', borderRadius: 5 }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/templates')} style={{
              color: '#6c63ff', fontSize: 14, fontWeight: 700,
              padding: '12px 28px', borderRadius: 12,
              border: '2px solid rgba(108,99,255,0.3)',
              background: 'transparent', cursor: 'pointer'
            }}>View All Templates →</button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 24px', background: '#f8f6ff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Testimonials</div>
          <h2 style={titleStyle}>Job seekers love ResumeAI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { name: 'Priya Sharma', role: 'Data Analyst @ Razorpay', text: 'The AI suggestions were spot-on. I rewrote my summary in 2 minutes and started getting calls within a week.' },
              { name: 'Arjun Mehta', role: 'Frontend Dev @ Swiggy', text: 'Clean templates, super fast. I used the ATS checker and got my score from 60% to 94% before applying.' },
              { name: 'Sneha Patel', role: 'Product Manager @ Meesho', text: 'Honestly the best free resume tool out there. The live preview alone saves so much time compared to Word.' },
            ].map(r => (
              <div key={r.name} style={{
                background: '#fff', borderRadius: 20, padding: 28,
                border: '1.5px solid rgba(108,99,255,0.1)',
                boxShadow: '0 4px 20px rgba(108,99,255,0.06)'
              }}>
                <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, marginBottom: 20, fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 15, color: '#fff', flexShrink: 0
                  }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Pricing</div>
          <h2 style={titleStyle}>Simple, honest pricing</h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 48 }}>Start for free — upgrade when ready.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 760, margin: '0 auto' }}>
            <div style={{ background: '#f8f6ff', borderRadius: 24, padding: 36, border: '2px solid #ede9fe' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Free</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', marginBottom: 4 }}>₹0 <span style={{ fontSize: 16, fontWeight: 500, color: '#94a3b8' }}>/ forever</span></div>
              <ul style={{ listStyle: 'none', margin: '24px 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['2 Resumes', '4 Templates', 'AI Suggestions', 'PDF Download', 'ATS Score Check'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#475569' }}>
                    <CheckCircle size={15} color="#10b981" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} style={{
                width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 700,
                border: '2px solid #6c63ff', color: '#6c63ff', background: 'transparent', cursor: 'pointer'
              }}>Start Free</button>
            </div>
            <div style={{
              background: 'linear-gradient(145deg,#6c63ff,#a78bfa)',
              borderRadius: 24, padding: 36, position: 'relative',
              boxShadow: '0 20px 60px rgba(108,99,255,0.4)'
            }}>
              <div style={{
                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                color: '#78350f', fontSize: 10, fontWeight: 800,
                padding: '5px 16px', borderRadius: 50, whiteSpace: 'nowrap'
              }}>⭐ MOST POPULAR</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Pro</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 4 }}>₹299 <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>/ month</span></div>
              <ul style={{ listStyle: 'none', margin: '24px 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Unlimited Resumes', '10+ Premium Templates', 'Advanced AI Rewriting', 'No Watermark', 'Public Resume Link', 'AI Interview Questions', 'Priority Support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                    <CheckCircle size={15} color="rgba(255,255,255,0.7)" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} style={{
                width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 700,
                border: 'none', background: '#fff', color: '#6c63ff', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
              }}>Try Pro Free →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={{ padding: '100px 24px', background: '#f8f6ff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={tagStyle}>Blog</div>
          <h2 style={titleStyle}>Tips to land your dream job</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { title: 'How to Write an ATS-Friendly Resume in 2024', date: 'Dec 15, 2024', read: '5 min', cat: 'ATS Tips', color: '#6c63ff' },
              { title: 'Top 10 Resume Keywords That Get You Noticed', date: 'Dec 10, 2024', read: '4 min', cat: 'Keywords', color: '#10b981' },
              { title: 'Remote Job Application Strategy That Works', date: 'Dec 5, 2024', read: '6 min', cat: 'Strategy', color: '#ec4899' },
            ].map(b => (
              <div key={b.title} style={{
                background: '#fff', borderRadius: 20, overflow: 'hidden',
                border: '1.5px solid rgba(108,99,255,0.08)',
                boxShadow: '0 4px 20px rgba(108,99,255,0.06)', cursor: 'pointer'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
                style={{ transition: 'transform .25s' } as any}
              >
                <div style={{
                  height: 130, background: `linear-gradient(135deg,${b.color}22,${b.color}44)`,
                  display: 'flex', alignItems: 'flex-end', padding: 12
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', background: b.color, padding: '3px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{b.cat}</span>
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: 10 }}>{b.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
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
      <section style={{ margin: '40px 24px', borderRadius: 28, background: 'linear-gradient(135deg,#6c63ff,#a78bfa,#c084fc)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.18), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 18px', borderRadius: 50, marginBottom: 20 }}>
            🚀 Join 10,000+ job seekers
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, marginBottom: 14 }}>
            Ready to build your dream resume?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>Start for free — no credit card needed. Takes less than 5 minutes.</p>
          <button onClick={() => navigate('/register')} style={{
            background: '#fff', color: '#6c63ff', fontSize: 17, fontWeight: 800,
            padding: '18px 40px', borderRadius: 14, border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>Create My Resume Free →</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f172a', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>R</div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9' }}>Resume<span style={{ color: '#818cf8' }}>AI</span></span>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>© 2024 ResumeAI — Made with ❤️ by Rajalok</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#475569' }}>
            <span>📞 +91 75418 40606</span>
            <span>✉️ rajalok957641@gmail.com</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulseA { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @media(max-width:900px){
          .hero-flex{flex-direction:column!important}
        }
      `}</style>
    </div>
  );
}

const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
  color: '#6c63ff', fontSize: 12, fontWeight: 700,
  padding: '5px 14px', borderRadius: 50, marginBottom: 16,
  letterSpacing: .5, textTransform: 'uppercase'
};
const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900,
  color: '#0f172a', letterSpacing: -1, marginBottom: 12
};
