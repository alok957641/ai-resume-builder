import { useState } from 'react';
import { Link2, Lock, Copy, Globe, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api';
import { useResumeStore } from '../../store/useResumeStore';

export default function ShareResume() {
  const { currentResume, setCurrentResume } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentResume) return null;

  const publicUrl = currentResume.isPublic
    ? `${window.location.origin}/r/${currentResume.publicSlug}`
    : null;

  const togglePublic = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/resume/${currentResume._id}/toggle-public`);
      setCurrentResume(res.data.resume);
      toast.success(res.data.message);
    } catch { toast.error('Kuch galat hua!'); }
    finally { setLoading(false); }
  };

  const copyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success('Link copy ho gaya!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Globe size={20} className="text-indigo-600" />
        Share Resume
      </h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-gray-800">Public Link</p>
            <p className="text-sm text-gray-400">
              {currentResume.isPublic ? 'Koi bhi dekh sakta hai' : 'Sirf tum dekh sakte ho'}
            </p>
          </div>
          <button
            onClick={togglePublic}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              currentResume.isPublic ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              currentResume.isPublic ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {publicUrl && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
            <Link2 size={14} className="text-gray-400 shrink-0" />
            <span className="text-sm text-gray-600 flex-1 truncate">{publicUrl}</span>
            <button
              onClick={copyLink}
              className="shrink-0 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}

        {!currentResume.isPublic && (
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
            <Lock size={14} />
            Toggle karo public link banane ke liye
          </div>
        )}
      </div>
    </div>
  );
}