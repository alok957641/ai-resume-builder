import { create } from 'zustand';
import  type { Resume, PersonalInfo, Experience, Education, Skill } from '../types';

interface ResumeStore {
  resumes: Resume[];
  currentResume: Resume | null;
  isLoading: boolean;

  setResumes: (resumes: Resume[]) => void;
  setCurrentResume: (resume: Resume) => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Experience) => void;
  removeExperience: (index: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Education) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (index: number) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,

  setResumes: (resumes) => set({ resumes }),

  setCurrentResume: (resume) => set({ currentResume: resume }),

  updatePersonalInfo: (info) =>
    set((state) => ({
      currentResume: state.currentResume
        ? { ...state.currentResume, personalInfo: info }
        : null,
    })),

  addExperience: (exp) =>
    set((state) => ({
      currentResume: state.currentResume
        ? {
            ...state.currentResume,
            experience: [...state.currentResume.experience, exp],
          }
        : null,
    })),

  updateExperience: (index, exp) =>
    set((state) => {
      if (!state.currentResume) return {};
      const updated = [...state.currentResume.experience];
      updated[index] = exp;
      return { currentResume: { ...state.currentResume, experience: updated } };
    }),

  removeExperience: (index) =>
    set((state) => {
      if (!state.currentResume) return {};
      const updated = state.currentResume.experience.filter((_, i) => i !== index);
      return { currentResume: { ...state.currentResume, experience: updated } };
    }),

  addEducation: (edu) =>
    set((state) => ({
      currentResume: state.currentResume
        ? {
            ...state.currentResume,
            education: [...state.currentResume.education, edu],
          }
        : null,
    })),

  updateEducation: (index, edu) =>
    set((state) => {
      if (!state.currentResume) return {};
      const updated = [...state.currentResume.education];
      updated[index] = edu;
      return { currentResume: { ...state.currentResume, education: updated } };
    }),

  removeEducation: (index) =>
    set((state) => {
      if (!state.currentResume) return {};
      const updated = state.currentResume.education.filter((_, i) => i !== index);
      return { currentResume: { ...state.currentResume, education: updated } };
    }),

  addSkill: (skill) =>
    set((state) => ({
      currentResume: state.currentResume
        ? {
            ...state.currentResume,
            skills: [...state.currentResume.skills, skill],
          }
        : null,
    })),

  removeSkill: (index) =>
    set((state) => {
      if (!state.currentResume) return {};
      const updated = state.currentResume.skills.filter((_, i) => i !== index);
      return { currentResume: { ...state.currentResume, skills: updated } };
    }),
}));