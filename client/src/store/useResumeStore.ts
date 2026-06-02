// src/store/useResumeStore.tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Resume, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill,
  TemplateType,
} from '../types';

interface ResumeStore {
  resumes: Resume[];
  currentResume: Resume | null;
  isLoading: boolean;

  // Actions
  setResumes: (resumes: Resume[]) => void;
  setCurrentResume: (resume: Resume | null) => void;
  setIsLoading: (loading: boolean) => void;
  clearCurrentResume: () => void;
  resetStore: () => void;
  
  // Resume operations
  updateResumeTitle: (title: string) => void;
  updateTemplate: (template: TemplateType) => void;
  
  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Experience
  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Partial<Experience>) => void;
  removeExperience: (index: number) => void;
  
  // Education
  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Partial<Education>) => void;
  removeEducation: (index: number) => void;
  
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Partial<Skill>) => void;
  removeSkill: (index: number) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumes: [],
      currentResume: null,
      isLoading: false,

      setResumes: (resumes) => set({ resumes: Array.isArray(resumes) ? resumes : [] }),
      
      setCurrentResume: (resume) => set({ currentResume: resume }),
      
      setIsLoading: (isLoading) => set({ isLoading }),
      
      clearCurrentResume: () => set({ currentResume: null }),
      
      resetStore: () => set({ resumes: [], currentResume: null, isLoading: false }),
      
      updateResumeTitle: (title) =>
        set((state) => ({
          currentResume: state.currentResume
            ? { ...state.currentResume, title }
            : null,
        })),
      
      updateTemplate: (template) =>
        set((state) => ({
          currentResume: state.currentResume
            ? { ...state.currentResume, template }
            : null,
        })),
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                personalInfo: { ...state.currentResume.personalInfo, ...info },
              }
            : null,
        })),

      addExperience: (exp) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                experience: [...(state.currentResume.experience || []), exp],
              }
            : null,
        })),

      updateExperience: (index, exp) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = [...(state.currentResume.experience || [])];
          if (updated[index]) {
            updated[index] = { ...updated[index], ...exp };
          }
          return { currentResume: { ...state.currentResume, experience: updated } };
        }),

      removeExperience: (index) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = (state.currentResume.experience || []).filter((_, i) => i !== index);
          return { currentResume: { ...state.currentResume, experience: updated } };
        }),

      addEducation: (edu) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                education: [...(state.currentResume.education || []), edu],
              }
            : null,
        })),

      updateEducation: (index, edu) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = [...(state.currentResume.education || [])];
          if (updated[index]) {
            updated[index] = { ...updated[index], ...edu };
          }
          return { currentResume: { ...state.currentResume, education: updated } };
        }),

      removeEducation: (index) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = (state.currentResume.education || []).filter((_, i) => i !== index);
          return { currentResume: { ...state.currentResume, education: updated } };
        }),

      addSkill: (skill) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                skills: [...(state.currentResume.skills || []), skill],
              }
            : null,
        })),

      updateSkill: (index, skill) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = [...(state.currentResume.skills || [])];
          if (updated[index]) {
            updated[index] = { ...updated[index], ...skill };
          }
          return { currentResume: { ...state.currentResume, skills: updated } };
        }),

      removeSkill: (index) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = (state.currentResume.skills || []).filter((_, i) => i !== index);
          return { currentResume: { ...state.currentResume, skills: updated } };
        }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ 
        resumes: state.resumes,
        currentResume: state.currentResume 
      }),
    }
  )
);