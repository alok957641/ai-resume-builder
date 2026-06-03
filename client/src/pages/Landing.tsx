import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function MiniResumeCard() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-5 w-72">
      <div className="bg-blue-600 rounded-lg p-4 mb-4 text-white">
        <div className="text-base font-bold">Alok Singh</div>
        <div className="text-blue-200 text-xs mt-1">Senior Software Engineer</div>
        <div className="text-blue-300 text-[10px] mt-2">rajalok957641@email.com • Mumbai, India</div>
      </div>
      <div className="space-y-2">
        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Experience</div>
        <div className="text-xs font-semibold text-gray-800">Senior Engineer — Google India</div>
        <div className="text-[10px] text-gray-400">2022 – Present</div>
        <div className="text-[10px] text-gray-600">• Led microservices migration, reduced latency by 40%</div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['React', 'Node.js', 'AWS', 'Docker'].map(s => (
            <span key={s} className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdmin = user?.email === 'rajalok957641@gmail.com';

  return (
    <div className="min-h-screen" style={{ background: '#EBF2FF', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-4 sm:px-10 py-4 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">R</div>
          <span className="font-bold text-xl text-gray-900">Resume<span className="text-blue-600">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm text-gray-500">
          <button onClick={() => scrollToSection('features')} className="cursor-pointer hover:text-blue-600 transition">Features</button>
          <button onClick={() => navigate('/templates')} className="cursor-pointer hover:text-blue-600 transition">Templates</button>
          <button onClick={() => scrollToSection('pricing')} className="cursor-pointer hover:text-blue-600 transition">Pricing</button>
          <button onClick={() => scrollToSection('blog')} className="cursor-pointer hover:text-blue-600 transition">Blog</button>
        </div>
        
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              <Shield size={16} />
              Admin Panel
            </button>
          )}
          <button 
            onClick={() => navigate('/login')} 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Log in
          </button>
          <button 
            onClick={() => navigate('/register')} 
            className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-200"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16 flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">

        {/* LEFT */}
        <div className={`flex-1 text-center lg:text-left transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            AI-Powered • 100% Free
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6" style={{ letterSpacing: '-1.5px' }}>
            Your <span className="text-blue-600">professional AI</span><br />resume, ready in<br />minutes
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            Our AI resume builder saves your time with smart content suggestions and impactful summaries. Get hired faster, stress-free!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
            <button onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200">
              Create AI Resume Now <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/templates')}
              className="px-7 py-4 border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-600 hover:bg-white transition">
              Browse Templates
            </button>
          </div>
          <div className="flex justify-center lg:justify-start gap-10">
            {[['48%', '#16a34a', 'More Interviews'], ['12%', '#d97706', 'Salary Increase'], ['10K+', '#2563eb', 'Resumes Created']].map(([n, c, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold" style={{ color: c }}>{n}</div>
                <div className="text-xs text-gray-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={`flex-1 relative flex justify-center transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-3xl scale-110" />
            <div className="relative" style={{ transform: 'rotate(-2deg)' }}>
              <MiniResumeCard />
            </div>

            <div className="absolute -top-4 -right-8 bg-white rounded-xl px-3 py-2.5 shadow-xl z-10" style={{ animation: 'float1 3s ease-in-out infinite' }}>
              <div className="text-[10px] text-gray-400 mb-1">ATS Score</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-green-600">95%</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-lg font-semibold">Excellent</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-8 bg-white rounded-xl px-3 py-2.5 shadow-xl z-10 max-w-44" style={{ animation: 'float2 3.5s ease-in-out infinite' }}>
              <div className="flex items-center gap-1.5 mb-1"><Sparkles size={11} className="text-purple-500" /><span className="text-[10px] font-bold text-gray-800">AI Suggestion</span></div>
              <div className="text-[9px] text-gray-500 leading-relaxed">Add metrics to your experience for 40% better response rate</div>
            </div>

            <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 bg-yellow-100 rounded-lg px-3 py-2 shadow-md z-10" style={{ animation: 'float3 4s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-yellow-800">📄 PDF Ready!</div>
            </div>
          </div>
        </div>
      </div>

      {/* TEMPLATE STRIP */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Resume Templates</h2>
            <p className="text-gray-500">Simple to use and ready in minutes — try it for free!</p>
          </div>
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {['All Templates', 'Simple', 'Modern', 'ATS', 'Professional'].map(c => (
              <button key={c} className="px-4 py-2 rounded-full text-sm border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition">{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Modern Blue', color: '#2563eb', tag: 'Popular ⭐' },
              { name: 'Emerald Pro', color: '#059669', tag: 'New' },
              { name: 'ATS Classic', color: '#374151', tag: 'ATS ✓' },
              { name: 'Rose Elegant', color: '#e11d48', tag: 'PRO' },
              { name: 'Tech Modern', color: '#0891b2', tag: 'PRO' },
            ].map(t => (
              <div key={t.name} onClick={() => navigate('/templates')}
                className="bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all relative">
                <div className="h-40 p-3" style={{ background: t.color + '10' }}>
                  <div className="h-4 rounded" style={{ background: t.color, marginBottom: 6 }} />
                  <div className="h-2.5 rounded mb-2" style={{ background: t.color + '60', width: '70%' }} />
                  {[1,2,3,4].map(i => <div key={i} className="h-2 bg-gray-200 rounded mb-1.5" style={{ width: `${60+i*8}%` }} />)}
                </div>
                <div className="p-2.5 flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-800">{t.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white`}
                    style={{ background: t.tag === 'PRO' ? '#4f46e5' : t.tag === 'ATS ✓' ? '#059669' : t.tag === 'New' ? '#db2777' : '#f59e0b' }}>
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate('/templates')} className="px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition">
              View All Templates →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES Section with ID */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why ResumeAI?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '✨', title: 'AI Improvement', desc: 'Improve summary and experience with AI. Professional language, action words, ATS friendly.', bg: 'bg-blue-50', color: 'text-blue-600' },
            { icon: '⚡', title: 'Live Preview', desc: 'Type and see your resume update in real-time. No waiting.', bg: 'bg-green-50', color: 'text-green-600' },
            { icon: '📄', title: 'PDF Download', desc: 'Download professional PDF with one click. Print-ready format.', bg: 'bg-purple-50', color: 'text-purple-600' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition">
              <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING Section with ID */}
      <section id="pricing" className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Simple Pricing</h2>
            <p className="text-gray-500">Start for free!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-1">₹0</p>
              <p className="text-gray-400 mb-7 text-sm">Forever free!</p>
              <ul className="space-y-3 mb-7">
                {['2 Resumes', '4 Templates', 'AI Suggestions', 'PDF Download', 'ATS Score Check'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500" />{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition">Start Free</button>
            </div>
            <div className="bg-blue-600 p-8 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">⭐ POPULAR</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-4xl font-extrabold text-white mb-1">₹299</p>
              <p className="text-blue-200 mb-7 text-sm">per month</p>
              <ul className="space-y-3 mb-7">
                {['Unlimited Resumes', '10+ Templates', 'Advanced AI', 'No Watermark', 'Public Resume Link', 'AI Interview Questions', 'Priority Support'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white"><CheckCircle size={16} className="text-blue-200" />{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/register')} className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition">Try Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG Section */}
      <section id="blog" className="py-16 max-w-7xl mx-auto px-4 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Latest from Blog</h2>
          <p className="text-gray-500">Tips and tricks to land your dream job</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'How to Write an ATS-Friendly Resume', date: 'Dec 15, 2024', readTime: '5 min read' },
            { title: 'Top 10 Resume Keywords for 2024', date: 'Dec 10, 2024', readTime: '4 min read' },
            { title: 'Remote Job Application Tips', date: 'Dec 5, 2024', readTime: '6 min read' },
          ].map(blog => (
            <div key={blog.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition cursor-pointer">
              <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl mb-4"></div>
              <h3 className="font-bold text-gray-800 mb-2">{blog.title}</h3>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{blog.date}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Start? Build Now! 🚀</h2>
          <p className="text-blue-200 mb-8">Start for free — no credit card required!</p>
          <button onClick={() => navigate('/register')} className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition shadow-xl">
            Start for Free →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">R</div>
            <span className="font-bold text-white">ResumeAI</span>
          </div>
          <p className="text-sm text-center">© 2024 ResumeAI — Made with ❤️ by Rajalok</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <span className="hover:text-white cursor-pointer transition">📞 +91 75418 40606</span>
            <span className="hover:text-white cursor-pointer transition">✉️ rajalok957641@gmail.com</span>
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-gray-600">
          <p>ResumeAI - Your AI-powered resume builder. Create professional resumes in minutes!</p>
        </div>
      </footer>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </div>
  );
}