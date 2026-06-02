// User ka type
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
}

// Auth response ka type
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Form data types
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}



export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  _id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  _id?: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  template: 'modern' | 'classic' | 'minimal';
  createdAt: string;
  updatedAt: string;
}