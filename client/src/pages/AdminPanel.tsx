import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api';
import { Users, FileText, TrendingUp, Crown, ArrowLeft, LogOut, RefreshCw, Menu, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_EMAIL = 'rajalok957641@gmail.com';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState({ users: 0, resumes: 0, proUsers: 0 });
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        toast.error('Login karo pehle!');
        navigate('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email !== ADMIN_EMAIL) {
          toast.error('Admin access only! 🚫');
          navigate('/dashboard');
          return;
        }
        setChecking(false);
        fetchData();
      } catch (error) {
        toast.error('Session expired! Login again.');
        navigate('/login');
      }
    };
    checkAdminAccess();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
      ]);
      setStats(statsRes.data);
      setUsersList(usersRes.data);
    } catch (error: any) {
      toast.error(`Data fetch failed: ${error?.response?.data?.message || error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const togglePlan = async (userId: string, currentPlan: string) => {
    const newPlan = currentPlan === 'pro' ? 'free' : 'pro';
    try {
      await api.put(`/admin/users/${userId}/plan`, { plan: newPlan });
      toast.success(`✅ ${newPlan === 'pro' ? 'Upgraded to Pro!' : 'Downgraded to Free'}`);
      fetchData();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Plan change nahi hua!');
    }
  };

  const SIDEBAR = [
    { id: 'overview', label: '📊 Overview', icon: <TrendingUp size={18} /> },
    { id: 'users', label: '👥 Users', icon: <Users size={18} /> },
    { id: 'revenue', label: '💰 Revenue', icon: <Crown size={18} /> },
  ];

  if (checking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{checking ? 'Verifying admin access...' : 'Loading admin data...'}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* TOP BAR */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">R</div>
          <span className="font-bold text-white">ResumeAI</span>
          <span className="text-slate-500 text-sm hidden sm:inline">/</span>
          <span className="text-slate-400 text-sm font-medium hidden sm:inline">Admin Panel</span>
        </div>
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        )}

        {/* Desktop Actions */}
        {!isMobile && (
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs hidden md:flex items-center gap-1">
              🔐 {ADMIN_EMAIL}
            </span>
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <ArrowLeft size={13} /> Dashboard
            </button>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 text-sm transition px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-gray-100 shadow-lg z-10"
          >
            <div className="p-3 space-y-1">
              {SIDEBAR.map(s => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTab(s.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    tab === s.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {s.icon}
                  {s.label}
                </motion.button>
              ))}
              <div className="border-t border-gray-100 my-2 pt-2">
                <button
                  onClick={fetchData}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                  <RefreshCw size={18} /> Refresh
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                  <ArrowLeft size={18} /> Dashboard
                </button>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
              <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 pt-3">
                🔐 {ADMIN_EMAIL}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-52 bg-white border-r border-gray-100 py-6"
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-5 mb-3">Menu</p>
            {SIDEBAR.map(s => (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={`w-full text-left px-5 py-3 text-sm font-medium transition border-l-2 ${
                  tab === s.id
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-600'
                    : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* CONTENT */}
        <div className="flex-1 p-4 sm:p-7 overflow-auto">
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {tab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                  <p className="text-gray-500 text-sm mt-1">Complete analytics at a glance</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Users', value: stats.users, icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50', delay: 0 },
                    { label: 'Pro Users', value: stats.proUsers, icon: <Crown size={20}/>, color: 'text-yellow-600', bg: 'bg-yellow-50', delay: 0.1 },
                    { label: 'Resumes', value: stats.resumes, icon: <FileText size={20}/>, color: 'text-green-600', bg: 'bg-green-50', delay: 0.2 },
                    { label: 'Monthly Rev', value: `₹${stats.proUsers*299}`, icon: <TrendingUp size={20}/>, color:'text-pink-600', bg: 'bg-pink-50', delay: 0.3 },
                  ].map((s, idx) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
                    >
                      <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Users Table - Responsive */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-5 border-b flex justify-between items-center flex-wrap gap-2">
                    <span className="font-bold text-gray-900">All Users</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {usersList.length} total
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {['Name', 'Email', 'Plan', 'Resumes', 'Action'].map(h => (
                            <th key={h} className="px-4 sm:px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {usersList.slice(0, 10).map((u: any, idx: number) => (
                          <motion.tr 
                            key={u._id} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-4 sm:px-5 py-3.5 font-semibold text-gray-900 flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                                {u.name?.[0]?.toUpperCase()}
                              </div>
                              <span className="truncate max-w-[100px] sm:max-w-none">{u.name}</span>
                              {u.email === ADMIN_EMAIL && (
                                <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">Admin</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-5 py-3.5 text-gray-500 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{u.email}</td>
                            <td className="px-4 sm:px-5 py-3.5">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                u.plan === 'pro' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {u.plan === 'pro' ? '👑 Pro' : 'Free'}
                              </span>
                            </td>
                            <td className="px-4 sm:px-5 py-3.5 text-gray-500 font-medium">{u.resumeCount || 0}</td>
                            <td className="px-4 sm:px-5 py-3.5">
                              <button
                                onClick={() => togglePlan(u._id, u.plan)}
                                disabled={u.email === ADMIN_EMAIL}
                                className={`text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-lg transition ${
                                  u.email === ADMIN_EMAIL
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : u.plan === 'pro'
                                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                }`}
                              >
                                {u.email === ADMIN_EMAIL ? '—' : u.plan === 'pro' ? 'Downgrade' : 'Upgrade'}
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                    {usersList.length > 10 && (
                      <div className="p-4 text-center text-xs text-gray-400 border-t">
                        Showing 10 of {usersList.length} users
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* USERS TAB */}
            {tab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
                  <p className="text-sm text-gray-500 mt-1">{usersList.length} registered users</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {usersList.map((u: any, idx: number) => (
                    <motion.div
                      key={u._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{u.name}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[150px]">{u.email}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          u.plan === 'pro' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {u.plan === 'pro' ? '👑 Pro' : 'Free'}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400 mb-4">
                        <span>📄 {u.resumeCount || 0} resumes</span>
                        <span>📅 {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</span>
                      </div>
                      <button
                        onClick={() => togglePlan(u._id, u.plan)}
                        disabled={u.email === ADMIN_EMAIL}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                          u.email === ADMIN_EMAIL
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : u.plan === 'pro'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                      >
                        {u.email === ADMIN_EMAIL ? 'Admin Account' : u.plan === 'pro' ? '⬇ Downgrade to Free' : '⬆ Upgrade to Pro'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* REVENUE TAB */}
            {tab === 'revenue' && (
              <motion.div
                key="revenue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
                  <p className="text-sm text-gray-500 mt-1">Monthly recurring revenue breakdown</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Monthly Revenue (MRR)', value: `₹${stats.proUsers * 299}`, icon: '💰', color: 'text-green-600', bg: 'bg-green-50', delay: 0 },
                    { label: 'Pro Subscribers', value: stats.proUsers, icon: '👑', color: 'text-yellow-600', bg: 'bg-yellow-50', delay: 0.1 },
                    { label: 'Annual Revenue', value: `₹${stats.proUsers * 299 * 12}`, icon: '📈', color: 'text-indigo-600', bg: 'bg-indigo-50', delay: 0.2 },
                  ].map((s, idx) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
                    >
                      <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl mb-3`}>{s.icon}</div>
                      <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-700 mb-4">Revenue Breakdown</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-50 flex-wrap gap-2">
                      <span className="text-sm text-gray-600">Pro Plan (₹299 × {stats.proUsers} users)</span>
                      <span className="font-bold text-green-600">₹{stats.proUsers * 299}/month</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-50 flex-wrap gap-2">
                      <span className="text-sm text-gray-600">Free Users</span>
                      <span className="font-bold text-gray-400">{stats.users - stats.proUsers} users</span>
                    </div>
                    <div className="flex justify-between items-center py-3 flex-wrap gap-2">
                      <span className="text-sm font-bold text-gray-800">Total MRR</span>
                      <span className="font-bold text-green-600 text-lg">₹{stats.proUsers * 299}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}