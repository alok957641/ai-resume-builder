import { useState, useRef } from 'react';
import { Upload, Target, Loader, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';

interface ATSResult {
  total: number;
  grade: 'A' | 'B' | 'C' | 'D';
  breakdown: { label: string; score: number; tip: string }[];
  topSuggestions: string[];
}

export default function ATSChecker() {
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [fileName, setFileName] = useState('');
  const [resumeText, setResumeText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setResumeText(file.name + ' resume content...');
    };
    reader.readAsText(file);
  };

  const checkScore = async () => {
    if (!resumeText && !fileName) {
      toast.error('Please upload your resume first!');
      return;
    }
    if (!jobRole.trim()) {
      toast.error('Please enter the job role!');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/ats/check', { resumeText, jobRole });
      setResult(res.data);
      toast.success('ATS score ready! 🎯');
    } catch {
      toast.error('ATS check failed!');
    } finally { setLoading(false); }
  };

  const gradeColor = result
    ? result.total >= 85 ? '#16a34a' : result.total >= 70 ? '#2563eb' : result.total >= 50 ? '#d97706' : '#dc2626'
    : '#2563eb';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Target size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-black text-slate-950">ATS score checker</h3>
          <p className="text-xs text-gray-400">Upload your resume — AI will check the score</p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-wide text-slate-500 block mb-1.5">Job role / title *</label>
            <input
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              placeholder="e.g., Software Engineer, Data Analyst"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wide text-slate-500 block mb-1.5">Upload resume *</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <Upload size={24} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">
                {fileName || 'Click here to upload your PDF file'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF only • Max 5MB</p>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          </div>

          <button
            onClick={checkScore}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition shadow-md"
          >
            {loading ? <><Loader size={16} className="animate-spin" /> Checking...</> : <><Target size={16} /> Check ATS score</>}
          </button>
        </div>
      ) : (
        <div>
          {/* Score circle */}
          <div className="text-center mb-5">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg viewBox="0 0 100 100" className="w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke={gradeColor} strokeWidth="10"
                  strokeDasharray={`${result.total * 2.51} 251`} strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1.5s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold" style={{ color: gradeColor }}>{result.total}</span>
                <span className="text-[10px] text-gray-400">/100</span>
              </div>
            </div>
            <span className="inline-block text-xl font-extrabold px-4 py-1 rounded-full" style={{ color: gradeColor, background: gradeColor + '15' }}>
              Grade: {result.grade}
            </span>
            <p className="text-xs text-gray-500 mt-2">Job Role: {jobRole}</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-4">
            {result.breakdown.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-gray-700">{b.label}</span>
                  <span className="font-bold" style={{ color: b.score >= 80 ? '#16a34a' : b.score >= 60 ? '#d97706' : '#dc2626' }}>{b.score}/100</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${b.score}%`, background: b.score >= 80 ? '#16a34a' : b.score >= 60 ? '#f59e0b' : '#ef4444' }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">💡 {b.tip}</p>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {result.topSuggestions?.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-blue-700 mb-2">🚀 Top Improvements:</p>
              {result.topSuggestions.map((s, i) => <p key={i} className="text-[10px] text-blue-600 mb-1">• {s}</p>)}
            </div>
          )}

          <button onClick={() => { setResult(null); setFileName(''); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            <RefreshCw size={14} /> Check again
          </button>
        </div>
      )}
    </div>
  );
}
