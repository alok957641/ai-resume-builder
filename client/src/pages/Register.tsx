import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import type { RegisterForm, AuthResponse } from '../types';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

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
      toast.error(error.response?.data?.message || 'Kuch galat hua!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Account Banao 🚀
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Free mein shuru karo!
        </p>

        {/* Form */}
        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Naam
            </label>
            <input
              {...register('name', { required: 'Naam daalo bhai!' })}
              type="text"
              placeholder="Tumhara naam"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email daalo bhai!',
                pattern: { value: /^\S+@\S+$/i, message: 'Valid email daalo' },
              })}
              type="email"
              placeholder="bhai@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password daalo!',
                minLength: { value: 6, message: 'Kam se kam 6 characters' },
              })}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isSubmitting ? 'Ban raha hai...' : 'Account Banao 🎉'}
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">
          Pehle se account hai?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login karo
          </Link>
        </p>
      </div>
    </div>
  );
}