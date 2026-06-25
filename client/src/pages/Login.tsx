import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginForm, AuthResponse } from '../types';

// ── Replace with any property image you like ──
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post<AuthResponse>('/auth/login', data);
      setAuth(res.data.user, res.data.token);
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-xl border border-gray-200 transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* ── LEFT PANEL ── */}
        <div className="relative hidden md:flex flex-col flex-1 overflow-hidden min-h-[600px]">
          {/* Background image */}
          <img
            src={HERO_IMAGE}
            alt="Luxury modern home"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5 p-7">
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur-sm">
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
            <h2 className="text-white text-[26px] font-medium leading-snug mb-2">
              Find your<br />sweet home
            </h2>
            <p className="text-white/60 text-[13px] leading-relaxed max-w-xs">
              Schedule a visit in just a few clicks
            </p>
            {/* Slide dots */}
            <div className="flex items-center gap-1.5 mt-5">
              <div className="h-[3px] w-7 rounded-full bg-white" />
              <div className="h-[3px] w-5 rounded-full bg-white/35" />
              <div className="h-[3px] w-5 rounded-full bg-white/35" />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="w-full md:w-[360px] flex-shrink-0 bg-white flex flex-col justify-center px-9 py-10">
          {/* Top: pill button */}
          <div className="flex justify-end mb-8">
            <Link
              to="/register"
              className="bg-gray-900 text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Sign in
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-[20px] font-medium text-gray-900 mb-1">
              Welcome Back to Realnest!
            </h1>
            <p className="text-[13px] text-gray-400">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Your Email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="info@example.com"
                className={`w-full border rounded-lg px-3 py-2.5 text-[13.5px] text-gray-900 placeholder-gray-300 bg-gray-50 outline-none transition-all
                  focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                  ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-[13.5px] text-gray-900 placeholder-gray-300 bg-gray-50 outline-none transition-all
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
              {errors.password && (
                <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-[12px] text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-violet-500 w-3.5 h-3.5 cursor-pointer"
                />
                Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="text-[12px] text-violet-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 active:scale-[0.99] disabled:opacity-50 text-white text-[14px] font-medium py-2.5 rounded-lg transition-all mt-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-300 whitespace-nowrap">Instan Login</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => toast('Google login coming soon!')}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-[12px] text-gray-500 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => toast('Facebook login coming soon!')}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-[12px] text-gray-500 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-[12px] text-gray-400 mt-6">
            Don't have any account?{' '}
            <Link to="/register" className="text-violet-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
