import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import { LoginForm, AuthResponse } from '../types/index.ts';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

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
      toast.error(error.response?.data?.message || 'Kuch galat hua!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Wapas Aao! 👋
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login karo apne account mein
        </p>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email', { required: 'Email daalo!' })}
              type="email"
              placeholder="bhai@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password', { required: 'Password daalo!' })}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isSubmitting ? 'Login ho raha hai...' : 'Login Karo 🚀'}
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6">
          Account nahi hai?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Banao abhi
          </Link>
        </p>
      </div>
    </div>
  );
}