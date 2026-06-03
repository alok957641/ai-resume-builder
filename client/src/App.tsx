import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Upgrade from './pages/Upgrade';
import TemplateChooser from './pages/TemplateChooser';
import AdminPanel from './pages/AdminPanel';
import PublicResume from './pages/PublicResume';

// ✅ Protected Route — login nahi toh /login pe bhejo
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

// ✅ Public Route — already logged in toh /dashboard pe bhejo
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  return !isLoggedIn ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public pages */}
        <Route path="/"         element={<Landing />} />
        <Route path="/r/:slug"  element={<PublicResume />} />

        {/* Auth pages — logged in hai toh dashboard pe redirect */}
        <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected pages — login zaroori */}
        <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/templates"  element={<ProtectedRoute><TemplateChooser /></ProtectedRoute>} />
        <Route path="/resume/:id" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
        <Route path="/upgrade"    element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
        <Route path="/admin"      element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}