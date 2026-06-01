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