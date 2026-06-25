import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import type { RegisterForm, AuthResponse } from '../types';

// ── Apni property image yahan daal do ──
const HERO_IMAGE =
  'https://i.pinimg.com/736x/c9/6a/22/c96a224fa0624eb2c8f5fd59ee979d03.jpg';

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const colors = ['#E24B4A', '#E24B4A', '#EF9F27', '#1D9E75', '#1D9E75'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return {
    pct: Math.min(100, score * 22),
    color: password.length ? colors[Math.max(0, score - 1)] : '',
    label: password.length ? (labels[score] || 'Strong') : '',
  };
}

export default function Register() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post<AuthResponse>('/auth/register', data);
      setAuth(res.data.user, res.data.token);
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const strength = getStrength(password);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-xl border border-gray-200 transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >

        {/* ════════════════════════════════
            LEFT PANEL — Image + Branding
            ════════════════════════════════ */}
        <div className="relative hidden md:flex flex-col flex-1 overflow-hidden min-h-[620px]">
          <img
            src={HERO_IMAGE}
            alt="Modern luxury home"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5 p-7">
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/28 flex items-center justify-center backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <span className="text-white font-medium text-[15px] tracking-wide">Realnest</span>
          </div>

          {/* Bottom tagline */}
          <div className="relative z-10 mt-auto p-7 pb-9">
            <h2 className="text-white text-[25px] font-medium leading-snug mb-2">
              Start your journey<br />to a new home
            </h2>
            <p className="text-white/60 text-[13px] leading-relaxed max-w-[260px]">
              Join thousands finding their dream property in just a few clicks
            </p>
            {/* Slide dots */}
            <div className="flex items-center gap-1.5 mt-5">
              <div className="h-[3px] w-7 rounded-full bg-white" />
              <div className="h-[3px] w-5 rounded-full bg-white/35" />
              <div className="h-[3px] w-5 rounded-full bg-white/35" />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT PANEL — Register Form
            ════════════════════════════════ */}
        <div className="w-full md:w-[350px] flex-shrink-0 bg-white flex flex-col justify-center px-[34px] py-10">

          {/* Top pill */}
          <div className="flex justify-end mb-7">
            <Link
              to="/login"
              className="bg-gray-900 text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Sign in
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-[19px] font-medium text-gray-900 mb-1">Create your account</h1>
            <p className="text-[13px] text-gray-400">Start your professional journey today</p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">

            {/* Full Name */}
            <div
              className={`transition-all duration-500 delay-[100ms] ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Full name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] text-gray-900
                  placeholder-gray-300 bg-gray-50 outline-none transition-all
                  focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                  ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div
              className={`transition-all duration-500 delay-[150ms] ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Email address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] text-gray-900
                  placeholder-gray-300 bg-gray-50 outline-none transition-all
                  focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                  ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div
              className={`transition-all duration-500 delay-[200ms] ${
                mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-[13.5px] text-gray-900
                    placeholder-gray-300 bg-gray-50 outline-none transition-all
                    focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                    ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-violet-500 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-1.5">
                  <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${strength.pct}%`, background: strength.color }}
                    />
                  </div>
                  <p className="text-[11px] text-right mt-1" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div
              className={`transition-all duration-500 delay-[250ms] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700
                  active:scale-[0.99] disabled:opacity-50 text-white text-[14px] font-medium
                  py-2.5 rounded-lg transition-all mt-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social login */}
          <div className="flex items-center gap-3 mt-4 mb-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-300 whitespace-nowrap">or sign up with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="flex gap-2">
            {/* Google */}
            <button
              type="button"
              onClick={() => toast('Google signup coming soon!')}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200
                rounded-lg py-2.5 text-[12px] text-gray-500 bg-white
                hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => toast('Facebook signup coming soon!')}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200
                rounded-lg py-2.5 text-[12px] text-gray-500 bg-white
                hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => toast('GitHub signup coming soon!')}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200
                rounded-lg py-2.5 text-[12px] text-gray-500 bg-white
                hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-center text-[12.5px] text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>

          {/* ToS */}
          <p className="text-center text-[11px] text-gray-300 mt-2.5 leading-relaxed">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

      </div>
    </div>
  );
}
