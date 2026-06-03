import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useResumeStore } from '../../store/useResumeStore';
import type { PersonalInfo } from '../../types';
import api from '../../api';
import { useDebounce } from '../../hooks/useDebounce';

export default function PersonalInfoForm() {
  const { currentResume, updatePersonalInfo } = useResumeStore();
  const [isImproving, setIsImproving] = useState(false);

  const { register, watch, reset, setValue } = useForm<PersonalInfo>({
    defaultValues: currentResume?.personalInfo,
  });

  // Reset when resume changes
  useEffect(() => {
    if (currentResume?.personalInfo) {
      reset(currentResume.personalInfo);
    }
  }, [currentResume?._id, reset]);

  // Watch form values
  const formValues = watch();

  // Debounce values (performance fix)
  const debouncedValues = useDebounce(formValues, 600);

  // Update store (no lag typing)
  useEffect(() => {
    if (debouncedValues) {
      updatePersonalInfo(debouncedValues as PersonalInfo);
    }
  }, [debouncedValues, updatePersonalInfo]);

  // AI improve summary
  const improveSummary = async () => {
    const summary = watch('summary');

    if (!summary || !summary.trim()) {
      toast.error('Please write a summary first!');
      return;
    }

    setIsImproving(true);

    try {
      const res = await api.post('/ai/improve-summary', {
        summary,
        jobTitle: currentResume?.experience?.[0]?.position || '',
      });

      setValue('summary', res.data.improved);

      updatePersonalInfo({
        ...watch(),
        summary: res.data.improved,
      });

      toast.success('AI improved your summary! ✨');
    } catch (error) {
      console.error(error);
      toast.error('AI improvement failed!');
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-800">
        👤 Personal Information
      </h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('fullName')}
          placeholder="e.g., Rahul Kumar"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            placeholder="e.g., rahul@gmail.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            placeholder="e.g., +91 98765 43210"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
        </label>
        <input
          {...register('location')}
          placeholder="e.g., Delhi, India"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* LinkedIn + GitHub */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <input
            {...register('linkedin')}
            placeholder="e.g., linkedin.com/in/rahul"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Profile
          </label>
          <input
            {...register('github')}
            placeholder="e.g., github.com/rahul"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary + AI */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>

          <button
            onClick={improveSummary}
            disabled={isImproving}
            className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition"
          >
            {isImproving ? (
              <>
                <Loader size={12} className="animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles size={12} />
                AI Improve
              </>
            )}
          </button>
        </div>

        <textarea
          {...register('summary')}
          rows={4}
          placeholder="Write about your professional background, skills, and career goals..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          💡 Tip: A strong summary helps you stand out to recruiters
        </p>
      </div>
    </div>
  );
}