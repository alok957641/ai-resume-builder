import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus, FileText, Trash2, Edit } from 'lucide-react';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';
import { useResumeStore } from '../store/useResumeStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { resumes, setResumes, setCurrentResume } = useResumeStore();

  // Page load pe resumes fetch karo
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resume');
      setResumes(res.data);
    } catch (error) {
      toast.error('Resumes load nahi hue!');
    }
  };

  const createNewResume = async () => {
    try {
      const res = await api.post('/resume', { title: 'Naya Resume' });
      setCurrentResume(res.data.resume);
      navigate(`/resume/${res.data.resume._id}`);
      toast.success('Naya resume ban gaya!');
    } catch (error) {
      toast.error('Resume nahi bana!');
    }
  };

  const deleteResume = async (id: string) => {
    if (!confirm('Resume delete karna chahte ho?')) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      toast.success('Delete ho gaya!');
    } catch (error) {
      toast.error('Delete nahi hua!');
    }
  };

  const openResume = async (id: string) => {
    try {
      const res = await api.get(`/resume/${id}`);
      setCurrentResume(res.data);
      navigate(`/resume/${id}`);
    } catch (error) {
      toast.error('Resume nahi khula!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          📄 AI Resume Builder
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Namaste, {user?.name}! 👋
          </span>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Mere Resumes
            </h2>
            <p className="text-gray-500 mt-1">
              {resumes.length} resume bane hain
            </p>
          </div>
          <button
            onClick={createNewResume}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Naya Resume
          </button>
        </div>

        {/* Resume Cards */}
        {resumes.length === 0 ? (

          // Koi resume nahi hai
          <div className="text-center py-20">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500">
              Koi resume nahi hai abhi
            </h3>
            <p className="text-gray-400 mt-2">
              Upar "Naya Resume" button dabao!
            </p>
          </div>

        ) : (

          // Resume cards grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <FileText size={24} className="text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {resume.title}
                </h3>

                {/* Date */}
                <p className="text-sm text-gray-400 mb-4">
                  Updated: {new Date(resume.updatedAt).toLocaleDateString('hi-IN')}
                </p>

                {/* Template Badge */}
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {resume.template}
                </span>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openResume(resume._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}