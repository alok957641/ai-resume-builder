import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield, Star } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

// 1. Updated Card Component for "Premium" Vibe
function MiniResumeCard() {
  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 w-80">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 mb-5 text-white shadow-lg">
        <div className="text-lg font-bold">Alok Singh</div>
        <div className="text-violet-100 text-sm">Full Stack Developer</div>
      </div>
      <div className="space-y-3">
        <div className="h-2 w-3/4 bg-indigo-100 rounded-full" />
        <div className="h-2 w-full bg-indigo-100 rounded-full" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-16 bg-violet-100 rounded-md" />
          <div className="h-6 w-16 bg-violet-100 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => { setLoaded(true); }, []);

  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden" style={{ background: '#F0F4FF' }}>
      
      {/* Navbar with Glass Effect */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-950">Resume<span className="text-indigo-600">AI</span></div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          {['Features', 'Templates', 'Pricing', 'Blog'].map(item => <button key={item} className="hover:text-indigo-600">{item}</button>)}
        </div>
        <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">Get Started</button>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm mb-6">
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-900">AI-Powered Resume Builder</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-950 mb-8 leading-tight">
          Maximize Your <br /> <span className="text-indigo-600">Career Potential</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">Create a stunning, professional resume in minutes. Let our AI handle the design while you get the job.</p>
        
        {/* Card Mockup */}
        <div className="relative flex justify-center mt-12">
          <div className="absolute -inset-20 bg-indigo-300/30 blur-3xl rounded-full" />
          <div className="relative rotate-3 hover:rotate-0 transition-all duration-500">
            <MiniResumeCard />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {[
          { icon: '✨', title: 'AI Improvement', desc: 'Action-oriented, ATS-optimized content suggestions.' },
          { icon: '⚡', title: 'Live Preview', desc: 'Watch your resume update in real-time as you type.' },
          { icon: '📄', title: 'PDF Export', desc: 'Download print-ready, high-resolution PDFs instantly.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-lg transition">
            <div className="text-3xl mb-4">{feat.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
            <p className="text-gray-500 text-sm">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-indigo-100 rounded-3xl p-8">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-5xl font-extrabold mb-6">₹0</div>
              <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                <li>✓ 2 Resumes</li>
                <li>✓ AI Suggestions</li>
              </ul>
              <button onClick={() => navigate('/register')} className="w-full py-4 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50">Choose Plan</button>
            </div>
            <div className="bg-indigo-600 rounded-3xl p-8 text-white">
              <div className="text-2xl font-bold mb-2">Pro</div>
              <div className="text-5xl font-extrabold mb-6">₹299</div>
              <ul className="space-y-4 text-left text-sm text-indigo-100 mb-8">
                <li>✓ Unlimited Resumes</li>
                <li>✓ 10+ Templates</li>
                <li>✓ AI Interview Qs</li>
              </ul>
              <button onClick={() => navigate('/register')} className="w-full py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50">Go Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm">
        <p>© 2026 ResumeAI — Made with passion by Alok.</p>
      </footer>
    </div>
  );
}
