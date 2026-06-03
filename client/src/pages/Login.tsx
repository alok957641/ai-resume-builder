import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginForm, AuthResponse } from "../types";
import { useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition group"
        >
          <ArrowRight size={16} className="group-hover:-translate-x-1 transition" />
          <span className="text-sm">Back to Home</span>
        </motion.button>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50"
        >
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
            >
              <LogIn size={32} className="text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-2 relative z-10"
            >
              Welcome Back! 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-indigo-200 text-sm relative z-10"
            >
              Login to your account
            </motion.p>
            {/* Floating circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20" />
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('email', { required: 'Email is required!' })}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50"
                  />
                </div>
                {errors.email && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('password', { required: 'Password is required!' })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50"
                  />
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-base hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login 🚀
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Register Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-gray-500 mt-6 text-sm"
            >
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                Create Account
              </Link>
            </motion.p>

            {/* Footer Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-gray-400 text-xs mt-4"
            >
              Secure login with 256-bit encryption
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}