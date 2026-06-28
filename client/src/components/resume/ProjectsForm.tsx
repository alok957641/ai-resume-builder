import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Project } from '../../types';
import api from '../../api';
import { toast } from 'react-hot-toast';

const emptyProject: Project = {
  name: '',
  technologies: '',
  description: '',
  link: '',
  startDate: '',
  endDate: '',
};

export default function ProjectsForm() {
  const { currentResume, addProject, updateProject, removeProject } = useResumeStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const projects = currentResume?.projects && Array.isArray(currentResume.projects) ? currentResume.projects : [];

  const handleAddProject = () => {
    addProject({ ...emptyProject });
    setTimeout(() => {
      setOpenIndex(projects.length);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">Projects</div>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">Showcase practical work, tech stack, links, and measurable outcomes.</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No projects added yet</p>
          <p className="text-xs mt-1">Add your projects to showcase your skills</p>
        </div>
      )}

      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {project?.name || `Project ${index + 1}`}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-md">
                {project?.technologies || 'No technologies added'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  removeProject(index);
                  if (openIndex === index) setOpenIndex(null);
                }}
                className="p-1.5 text-red-400 hover:text-red-600 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {openIndex === index && project && (
            <ProjectCardForm
              project={project}
              onUpdate={(data) => updateProject(index, data)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCardForm({ project, onUpdate }: { project: Project; onUpdate: (d: Project) => void }) {
  const { register, watch, setValue } = useForm<Project>({ 
    defaultValues: project 
  });
  const [isImproving, setIsImproving] = useState(false);

  useEffect(() => {
    const subscription = watch((data) => {
      if (data) {
        onUpdate(data as Project);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // AI improve description
  const improveDescription = async () => {
    const description = watch('description');
    const projectName = watch('name');
    const technologies = watch('technologies');

    if (!description || !description.trim()) {
      toast.error('Please write a description first!');
      return;
    }

    setIsImproving(true);

    try {
      const res = await api.post('/ai/improve-project-description', {
        description,
        projectName,
        technologies,
      });

      setValue('description', res.data.improved);
      onUpdate({ ...watch(), description: res.data.improved });
      toast.success('AI improved your project description! ✨');
    } catch (error) {
      console.error(error);
      toast.error('AI improvement failed!');
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 space-y-4 bg-gray-50/30">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          placeholder="e.g., E-Commerce Website"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technologies Used <span className="text-red-500">*</span>
        </label>
        <input
          {...register('technologies')}
          placeholder="e.g., React, Node.js, MongoDB, Tailwind"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Project Description <span className="text-red-500">*</span>
          </label>
          <button
            onClick={improveDescription}
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
                Improve with AI
              </>
            )}
          </button>
        </div>
        <textarea
          {...register('description')}
          placeholder="Describe what your project does, your role, key features, and challenges solved..."
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          Tip: Include specific features, technologies used, and measurable outcomes.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            {...register('startDate')}
            placeholder="e.g., Jan 2024"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            {...register('endDate')}
            placeholder="e.g., Present / Mar 2024"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Live Link / GitHub <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          {...register('link')}
          placeholder="https://github.com/yourusername/project"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
}
