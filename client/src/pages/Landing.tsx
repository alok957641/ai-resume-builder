import { useNavigate } from 'react-router-dom';
import {
  Sparkles, FileText, Download, Zap,
  CheckCircle, ArrowRight, Star
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* ===== NAVBAR ===== */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600" size={28} />
          <span className="text-xl font-bold text-gray-800">ResumeAI</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 font-medium hover:text-gray-900"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Free Mein Shuru Karo
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles size={14} />
          AI Powered Resume Builder
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
          Perfect Resume Banao{' '}
          <span className="text-blue-600">AI ke Saath</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Sirf 5 minute mein professional resume banao.
          AI tumhara summary improve karega, skills suggest karega
          aur PDF download kar sakte ho — bilkul free!
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Abhi Banao — Free Hai!
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition"
          >
            Login Karo
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 text-sm">
          <div className="flex">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span>1000+ logon ne banaya apna resume</span>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-8">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kyun ResumeAI?
            </h2>
            <p className="text-gray-500 text-lg">
              Saari features jo ek perfect resume ke liye chahiye
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                <Sparkles size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                AI se Improve Karo
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Summary aur experience AI se automatically improve hoti hai.
                Professional language, action words, ATS friendly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
                <Zap size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Live Preview
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Jaise jaise type karo, resume real-time mein update hota hai.
                Koi wait nahi, koi confusion nahi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-5">
                <Download size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                PDF Download
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Ek click mein professional PDF download karo.
                High quality, print-ready format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sirf 3 Steps!
            </h2>
          </div>

          <div className="space-y-8">

            {[
              {
                step: '01',
                title: 'Account Banao',
                desc: 'Free mein register karo — email aur password bas!',
                color: 'bg-blue-600',
              },
              {
                step: '02',
                title: 'Details Bharo',
                desc: 'Personal info, experience, education aur skills add karo. AI help karega!',
                color: 'bg-purple-600',
              },
              {
                step: '03',
                title: 'PDF Download Karo',
                desc: 'Ek click mein PDF ready! Apply karo job ke liye!',
                color: 'bg-green-600',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <div className={`${item.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0`}>
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-8">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-gray-500 text-lg">Shuru karo free mein!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
              <p className="text-4xl font-bold text-gray-900 mb-1">₹0</p>
              <p className="text-gray-400 mb-8">Hamesha free!</p>
              <ul className="space-y-3 mb-8">
                {[
                  '2 Resumes',
                  '3 Templates',
                  'AI Suggestions',
                  'PDF Download',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle size={18} className="text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                Free Mein Shuru Karo
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 p-8 rounded-2xl border border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-4xl font-bold text-white mb-1">₹299</p>
              <p className="text-blue-200 mb-8">per month</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited Resumes',
                  'All Templates',
                  'Advanced AI',
                  'No Watermark',
                  'Custom URL',
                  'Priority Support',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle size={18} className="text-blue-200" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                Pro Try Karo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            Ready Ho? Abhi Banao Apna Resume! 🚀
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Free mein shuru karo — credit card ki zaroorat nahi!
          </p>
          <button
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition mx-auto shadow-lg shadow-blue-200"
          >
            Free Mein Shuru Karo
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <span className="font-bold text-gray-700">ResumeAI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 ResumeAI — Bhai ke liye banaya! 😄
          </p>
        </div>
      </footer>

    </div>
  );
}