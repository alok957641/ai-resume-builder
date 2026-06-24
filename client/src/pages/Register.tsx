import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowLeft, ArrowRight, ShieldCheck, Eye, EyeOff, LogIn } from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginForm, AuthResponse } from '../types';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div
        className={`w-full max-w-md transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

          {/* Top Section */}
          <div className="relative overflow-hidden px-8 pt-8 pb-7 border-b border-gray-100">
            {/* Background blobs */}
            <div className="absolute w-44 h-44 rounded-full bg-violet-400 opacity-[0.06] -top-16 -right-14 pointer-events-none" />
            <div className="absolute w-56 h-56 rounded-full bg-violet-400 opacity-[0.06] -bottom-24 -left-20 pointer-events-none" />

            {/* Back button */}
            <button
              onClick={() => navigate('/')}
              className="relative z-10 flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-600 mb-6 transition-colors group"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to home
            </button>

            {/* Icon */}
            <div className="relative z-10 w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center mb-5">
              <LogIn size={20} className="text-violet-500" />
            </div>

            {/* Heading */}
            <div className="relative z-10">
              <h1 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
                Welcome back
              </h1>
              <p className="text-sm text-gray-400 mt-1">Login to your account to continue</p>

              {/* Security badge */}
              <span className="inline-flex items-center gap-1.5 mt-3 text-xs text-violet-700 bg-violet-50 rounded-full px-3 py-1">
                <ShieldCheck size={12} />
                256-bit encrypted
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

              {/* Email */}
              <div
                className={`transition-all duration-500 delay-100 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.email ? 'text-red-400' : 'text-gray-300'
                    }`}
                  />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                    })}
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-gray-50 text-gray-900 placeholder-gray-300 outline-none transition-all
                      focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                      ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div
                className={`transition-all duration-500 delay-150 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      errors.password ? 'text-red-400' : 'text-gray-300'
                    }`}
                  />
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Your password"
                    className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border bg-gray-50 text-gray-900 placeholder-gray-300 outline-none transition-all
                      focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                      ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-violet-500 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
                )}
                <div className="text-right mt-1.5">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-violet-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <div
                className={`transition-all duration-500 delay-200 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 active:scale-[0.99] disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-all mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300">new here?</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <p className="text-center text-sm text-gray-400">
              <Link
                to="/register"
                className="text-violet-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>

            <p className="text-center text-xs text-gray-300 flex items-center justify-center gap-1.5 mt-4">
              <ShieldCheck size={12} />
              Secure login with end-to-end encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
