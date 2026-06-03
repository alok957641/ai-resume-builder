import { useState } from 'react';
import { Plus, X, Sparkles, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useResumeStore } from '../../store/useResumeStore';
import type { Skill } from '../../types';
import api from '../../api';

export default function SkillsForm() {
  const { currentResume, addSkill, removeSkill } = useResumeStore();
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const skills = currentResume?.skills || [];

  const handleAdd = () => {
    if (!skillName.trim()) return;
    addSkill({ name: skillName.trim(), level: skillLevel });
    setSkillName('');
  };

  const getSuggestions = async () => {
    const jobTitle = currentResume?.experience[0]?.position || '';
    if (!jobTitle) {
      toast.error('Please add a job position in Experience first!');
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post('/ai/suggest-skills', {
        jobTitle,
        currentSkills: skills.map((s) => s.name),
      });
      setSuggestions(res.data.skills);
      toast.success('AI suggestions generated! ✨');
    } catch (error) {
      toast.error('AI suggestion failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const addSuggestion = (name: string) => {
    addSkill({ name, level: 'intermediate' });
    setSuggestions(suggestions.filter((s) => s !== name));
    toast.success(`${name} added!`);
  };

  // ✅ FIXED: Simple Record type
  const levelColor: Record<string, string> = {
    beginner: 'bg-yellow-100 text-yellow-700',
    intermediate: 'bg-blue-100 text-blue-700',
    expert: 'bg-green-100 text-green-700',
  };

  // ✅ Get color safely
  const getLevelColor = (level: string | undefined) => {
    return levelColor[level || 'intermediate'] || levelColor.intermediate;
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">🛠️ Skills</h2>

        <button
          onClick={getSuggestions}
          disabled={isLoading}
          className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition"
        >
          {isLoading
            ? <><Loader size={14} className="animate-spin" /> Loading...</>
            : <><Sparkles size={14} /> AI Suggest</>
          }
        </button>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm font-medium text-purple-700 mb-3">
            ✨ AI Suggested Skills - Click to add:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => addSuggestion(s)}
                className="bg-white border border-purple-300 text-purple-700 text-sm px-3 py-1.5 rounded-full hover:bg-purple-600 hover:text-white transition"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual Add */}
      <div className="flex gap-2">
        <input
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Skill name (e.g., React, Python, JavaScript)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value as Skill['level'])}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Skills List */}
      {skills.length === 0 ? (
        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No skills added yet</p>
          <p className="text-xs mt-1">Add skills manually or get AI suggestions</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm font-medium text-gray-800">{skill.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getLevelColor(skill.level)}`}>
                {skill.level || 'intermediate'}
              </span>
              <button 
                onClick={() => removeSkill(index)} 
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}