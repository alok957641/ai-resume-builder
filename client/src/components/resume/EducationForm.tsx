import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Education } from '../../types';

const emptyEdu: Education = {
  school: '', degree: '', field: '',
  startDate: '', endDate: '', grade: '',
};

export default function EducationForm() {
  const { currentResume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const educations = currentResume?.education || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">Education</div>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Education</h2>
          <p className="mt-1 text-sm text-slate-500">Add degrees, schools, dates, grades, and relevant academic details.</p>
        </div>
        <button
          onClick={() => { addEducation(emptyEdu); setOpenIndex(educations.length); }}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      {educations.length === 0 && (
        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No education added yet</p>
          <p className="text-xs mt-1">Add your educational qualifications here</p>
        </div>
      )}

      {educations.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div>
              <p className="font-medium text-gray-800">
                {edu.school || `Education ${index + 1}`}
              </p>
              <p className="text-sm text-gray-500">{edu.degree} {edu.field}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); removeEducation(index); }}
                className="p-1.5 text-red-400 hover:text-red-600 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {openIndex === index && (
            <EducationCardForm
              edu={edu}
              onUpdate={(data) => updateEducation(index, data)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EducationCardForm({ edu, onUpdate }: { edu: Education; onUpdate: (d: Education) => void }) {
  const { register, watch } = useForm<Education>({ defaultValues: edu });

  useEffect(() => {
    const sub = watch((data) => onUpdate(data as Education));
    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <div className="p-4 border-t border-gray-100 space-y-4 bg-gray-50/30">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          School / College / University <span className="text-red-500">*</span>
        </label>
        <input
          {...register('school')}
          placeholder="e.g., Indian Institute of Technology Delhi"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree <span className="text-red-500">*</span>
          </label>
          <input
            {...register('degree')}
            placeholder="e.g., Bachelor of Technology"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            {...register('field')}
            placeholder="e.g., Computer Science"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Year
          </label>
          <input
            {...register('startDate')}
            placeholder="e.g., 2020"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Year
          </label>
          <input
            {...register('endDate')}
            placeholder="e.g., 2024"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Grade / CGPA / Percentage
        </label>
        <input
          {...register('grade')}
          placeholder="e.g., 8.5 CGPA or 85%"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div className="text-xs text-gray-400 mt-2">
        Tip: Include relevant coursework or academic achievements.
      </div>
    </div>
  );
}
