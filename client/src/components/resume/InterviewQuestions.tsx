import { useState } from 'react';
import { Sparkles, Loader, X, MessageSquare, Code, Heart, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api';
import { useResumeStore } from '../../store/useResumeStore';

const TYPE_STYLE: Record<string, { color: string; icon: any }> = {
  Technical:    { color: 'bg-blue-50 text-blue-700 border-blue-100',   icon: Code },
  Behavioral:   { color: 'bg-green-50 text-green-700 border-green-100', icon: Heart },
  Situational:  { color: 'bg-purple-50 text-purple-700 border-purple-100', icon: MessageSquare },
  HR:           { color: 'bg-orange-50 text-orange-700 border-orange-100', icon: Briefcase },
};

export default function InterviewQuestions() {
  const { currentResume } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<{ type: string; question: string }[]>([]);
  const [show, setShow] = useState(false);

  const generate = async () => {
    if (!currentResume?.experience[0]?.position) {
      toast.error('Pehle experience mein position daalo!');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/ai/interview-questions', {
        position: currentResume.experience[0].position,
        skills: currentResume.skills.map(s => s.name),
        experience: currentResume.experience.map(e =>
          `${e.position} at ${e.company}`).join(', '),
      });
      setQuestions(res.data.questions);
      setShow(true);
      toast.success('Questions ready hain! 🎯');
    } catch { toast.error('AI error!'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <button
        onClick={generate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 border border-indigo-200 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 disabled:opacity-50 transition text-sm"
      >
        {loading
          ? <><Loader size={16} className="animate-spin" /> Generating...</>
          : <><Sparkles size={16} /> AI Interview Questions Generate Karo</>
        }
      </button>

      {/* Modal */}
      {show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  🎯 Interview Questions
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {currentResume?.experience[0]?.position} ke liye
                </p>
              </div>
              <button onClick={() => setShow(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition">
                <X size={20} />
              </button>
            </div>

            {/* Questions */}
            <div className="overflow-y-auto p-6 space-y-3">
              {questions.map((q, i) => {
                const style = TYPE_STYLE[q.type] || TYPE_STYLE['HR'];
                const Icon = style.icon;
                return (
                  <div key={i} className={`border rounded-xl p-4 ${style.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {q.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {i + 1}. {q.question}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t">
              <button
                onClick={generate}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> Naye Questions Generate Karo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}