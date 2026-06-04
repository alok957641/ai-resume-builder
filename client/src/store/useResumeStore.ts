// src/store/useResumeStore.tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Resume, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill,
  Project,
  Certificate,
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
  
  // Projects
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Partial<Project>) => void;
  removeProject: (index: number) => void;
  
  // Certificates
  addCertificate: (cert: Certificate) => void;
  updateCertificate: (index: number, cert: Partial<Certificate>) => void;
  removeCertificate: (index: number) => void;
}

// Helper function to ensure projects and certificates arrays exist
const ensureArrays = (resume: Resume): Resume => {
  return {
    ...resume,
    projects: resume.projects || [],
    certificates: resume.certificates || [],
    experience: resume.experience || [],
    education: resume.education || [],
    skills: resume.skills || [],
  };
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumes: [],
      currentResume: null,
      isLoading: false,

      setResumes: (resumes) => set({ 
        resumes: resumes?.map(r => ensureArrays(r)) || [] 
      }),
      
      setCurrentResume: (resume) => {
        set({ 
          currentResume: resume ? ensureArrays(resume) : null 
        });
      },
      
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

      // PROJECTS FUNCTIONS
      addProject: (project) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                projects: [...(state.currentResume.projects || []), project],
              }
            : null,
        })),

      updateProject: (index, project) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = [...(state.currentResume.projects || [])];
          if (updated[index]) {
            updated[index] = { ...updated[index], ...project };
          }
          return { currentResume: { ...state.currentResume, projects: updated } };
        }),

      removeProject: (index) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = (state.currentResume.projects || []).filter((_, i) => i !== index);
          return { currentResume: { ...state.currentResume, projects: updated } };
        }),

      // CERTIFICATES FUNCTIONS
      addCertificate: (cert) =>
        set((state) => ({
          currentResume: state.currentResume
            ? {
                ...state.currentResume,
                certificates: [...(state.currentResume.certificates || []), cert],
              }
            : null,
        })),

      updateCertificate: (index, cert) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = [...(state.currentResume.certificates || [])];
          if (updated[index]) {
            updated[index] = { ...updated[index], ...cert };
          }
          return { currentResume: { ...state.currentResume, certificates: updated } };
        }),

      removeCertificate: (index) =>
        set((state) => {
          if (!state.currentResume) return {};
          const updated = (state.currentResume.certificates || []).filter((_, i) => i !== index);
          return { currentResume: { ...state.currentResume, certificates: updated } };
        }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ 
        resumes: state.resumes,
        currentResume: state.currentResume 
      }),
      // On storage load, ensure arrays exist
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.currentResume) {
            state.currentResume = ensureArrays(state.currentResume);
          }
          if (state.resumes) {
            state.resumes = state.resumes.map(r => ensureArrays(r));
          }
        }
      },
    }
  )
);