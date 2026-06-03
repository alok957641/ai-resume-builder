// src/types/index.ts

// ✅ User type
export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro";
}

// ✅ Auth response type
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// ✅ Form data types
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

// ✅ Personal Info (with optional fields)
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string; // Optional
  github?: string; // Optional
  website?: string; // Optional
  summary: string;
}

// ✅ Experience (with proper optional fields)
export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // Optional (if current job)
  current: boolean;
  description: string;
}

// ✅ Education
export interface Education {
  _id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string; // Optional
}

// ✅ Skill (level optional)
export interface Skill {
  _id?: string;
  name: string;
  level?: "beginner" | "intermediate" | "expert"; // Optional
}

// ✅ Project (NEW)
export interface Project {
  _id?: string;
  name: string;
  technologies: string;
  description: string;
  link?: string; // Optional - GitHub or Live link
  startDate: string;
  endDate: string;
}

// ✅ Certificate (Optional - extra mile)
export interface Certificate {
  _id?: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

// ✅ Template types
// ✅ Template types - UPDATE KARO (saare 11 templates ke liye)
export type TemplateType =
  | "modern-blue"
  | "emerald"
  | "minimal"
  | "ats"
  | "dark"
  | "rose"
  | "violet"
  | "amber"
  | "cyan"
  | "pink"
  | "navy";

// ✅ Resume (main type) - ADDED projects
// ✅ Resume (main type)
export interface Resume {
  _id: string;
  userId?: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certificates?: Certificate[];
  template: TemplateType; // ab sahi type hai
  isPublic: boolean;
  publicSlug?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ For creating new resume (without _id)
export interface CreateResumeDTO {
  title: string;
  template?: TemplateType;
}

// ✅ For updating resume
export interface UpdateResumeDTO {
  title?: string;
  personalInfo?: Partial<PersonalInfo>;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  projects?: Project[]; // 👈 ADDED
  certificates?: Certificate[]; // 👈 ADDED
  template?: TemplateType;
}

// ✅ API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ResumesResponse {
  success: boolean;
  resumes: Resume[];
  plan?: {
    name: string;
    isPro: boolean;
    limits: {
      maxResumes: number | "unlimited";
      currentCount: number;
      remainingSlots: number | "unlimited";
      canCreateMore: boolean;
    };
  };
}

export interface SingleResumeResponse {
  success: boolean;
  resume: Resume;
}

// ✅ Default values (for initial state)
export const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  website: "",
  summary: "",
};

export const defaultExperience: Experience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export const defaultEducation: Education = {
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  grade: "",
};

export const defaultSkill: Skill = {
  name: "",
  level: "beginner",
};

// ✅ Default Project (NEW)
export const defaultProject: Project = {
  name: "",
  technologies: "",
  description: "",
  link: "",
  startDate: "",
  endDate: "",
};

// ✅ Default Certificate (NEW)
export const defaultCertificate: Certificate = {
  name: "",
  issuer: "",
  date: "",
  link: "",
};

// ✅ Helper function for empty resume
export const getEmptyResume = (): Resume => ({
  _id: "",
  title: "Mera Resume",
  personalInfo: { ...defaultPersonalInfo },
  experience: [],
  education: [],
  skills: [],
  projects: [], // 👈 ADDED
  certificates: [], // 👈 ADDED
  template: "modern-blue", // 👈 CHANGE YAHAN
  isPublic: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});