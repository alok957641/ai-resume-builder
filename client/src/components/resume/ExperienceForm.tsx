import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useResumeStore } from '../../store/useResumeStore';
import type { Experience } from '../../types';
import api from '../../api';

const emptyExp: Experience = {
  company: '', position: '',
  startDate: '', endDate: '',
  current: false, description: '',
};

export default function ExperienceForm() {
  const { currentResume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const experiences = currentResume?.experience || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">💼 Experience</h2>
        <button
          onClick={() => { addExperience(emptyExp); setOpenIndex(experiences.length); }}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>Koi experience nahi — add karo!</p>
        </div>
      )}

      {experiences.map((exp, index) => (
        <ExperienceCard
          key={index}
          exp={exp}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          onUpdate={(data) => updateExperience(index, data)}
          onRemove={() => removeExperience(index)}
        />
      ))}
    </div>
  );
}

function ExperienceCard({ exp, index, isOpen, onToggle, onUpdate, onRemove }: {
  exp: Experience; index: number; isOpen: boolean;
  onToggle: () => void; onUpdate: (d: Experience) => void; onRemove: () => void;
}) {
  const { register, watch, setValue } = useForm<Experience>({ defaultValues: exp });
  const [isImproving, setIsImproving] = useState(false);

  useEffect(() => {
    const sub = watch((data) => onUpdate(data as Experience));
    return () => sub.unsubscribe();
  }, [watch]);

  const isCurrent = watch('current');

  // AI se description improve karo
  const improveDescription = async () => {
    const description = watch('description');
    const position = watch('position');
    const company = watch('company');

    if (!description.trim()) {
      toast.error('Pehle kuch description likho!');
      return;
    }
    setIsImproving(true);
    try {
      const res = await api.post('/ai/improve-experience', {
        description, position, company,
      });
      setValue('description', res.data.improved);
      onUpdate({ ...watch(), description: res.data.improved });
      toast.success('AI ne improve kar diya! ✨');
    } catch (error) {
      toast.error('AI error!');
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div>
          <p className="font-medium text-gray-800">{exp.position || `Experience ${index + 1}`}</p>
          <p className="text-sm text-gray-500">{exp.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-1.5 text-red-400 hover:text-red-600 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input {...register('company')} placeholder="Google"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input {...register('position')} placeholder="Software Engineer"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input {...register('startDate')} placeholder="Jan 2022"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input {...register('endDate')} placeholder="Dec 2023" disabled={isCurrent}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('current')} className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">Abhi bhi kaam kar raha hoon</span>
          </label>

          {/* Description + AI Button */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <button
                onClick={improveDescription}
                disabled={isImproving}
                className="flex items-center gap-1.5 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
              >
                {isImproving
                  ? <><Loader size={12} className="animate-spin" /> Improving...</>
                  : <><Sparkles size={12} /> AI Improve</>
                }
              </button>
            </div>
            <textarea
              {...register('description')} rows={3}
              placeholder="Kya kaam kiya — phir AI button dabao!"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}