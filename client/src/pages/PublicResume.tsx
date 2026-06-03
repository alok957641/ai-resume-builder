import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { TemplateRenderer } from '../components/resume/templates';

export default function PublicResume() {
  const { slug } = useParams();
  const [resume, setResume] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/resume/public/${slug}`)
      .then(res => setResume(res.data))
      .catch(() => setError(true));
  }, [slug]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Resume not found! 😢</p>
    </div>
  );

  if (!resume) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading resume...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <TemplateRenderer resume={resume} />
      </div>
    </div>
  );
}