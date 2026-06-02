import { useResumeStore } from '../../store/useResumeStore';
import { calculateScore } from '../../utils/resumeScore';
import { TrendingUp } from 'lucide-react';

export default function ResumeScore() {
  const { currentResume } = useResumeStore();
  if (!currentResume) return null;

  const { total, breakdown, grade } = calculateScore(currentResume);

  const gradeColor = {
    A: 'text-green-600 bg-green-50',
    B: 'text-blue-600 bg-blue-50',
    C: 'text-yellow-600 bg-yellow-50',
    D: 'text-red-600 bg-red-50',
  }[grade];

  const scoreColor = total >= 85 ? '#22C55E' : total >= 70 ? '#3B82F6' : total >= 50 ? '#F59E0B' : '#EF4444';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <TrendingUp size={20} className="text-indigo-600" />
        Resume Score
      </h2>

      {/* Big Score Circle */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
        <div className="relative w-28 h-28 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={scoreColor} strokeWidth="10"
              strokeDasharray={`${total * 2.51} 251`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{total}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>

        <div className={`inline-block text-2xl font-bold px-4 py-1.5 rounded-full ${gradeColor}`}>
          Grade: {grade}
        </div>

        <p className="text-gray-500 text-sm mt-2">
          {total >= 85 ? '🎉 Bahut acha resume hai!' :
           total >= 70 ? '👍 Acha hai, thoda aur improve karo!' :
           total >= 50 ? '⚠️ Aur kaam karna hai!' :
           '❌ Resume incomplete hai!'}
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {breakdown.map((b, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">{b.label}</span>
              <span className="text-sm font-bold text-gray-900">{b.score}/{b.max}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(b.score / b.max) * 100}%`,
                  background: scoreColor,
                }}
              />
            </div>
            <p className="text-xs text-gray-400">{b.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}