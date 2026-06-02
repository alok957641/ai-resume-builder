// src/components/resume/ResumePreview.tsx
import { useRef, useState, useEffect } from "react";
import { exportToPDF } from '../../utils/exportPDF';
import { useResumeStore } from "../../store/useResumeStore";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Loader,
  Eye,
  X,
} from "lucide-react";


import { toast } from "react-hot-toast";

export default function ResumePreview() {
  const { currentResume } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!currentResume) return null;

  const { personalInfo: p, experience, education, skills } = currentResume;

  const downloadPDF = async () => {
  if (!resumeRef.current) return;
  setIsDownloading(true);
  const toastId = toast.loading('PDF ban raha hai... ⏳');
  try {
    await exportToPDF(
      resumeRef.current,
      currentResume?.personalInfo?.fullName || 'Resume'
    );
    toast.dismiss(toastId);
    toast.success('PDF download ho gaya! 🎉');
  } catch {
    toast.dismiss(toastId);
    toast.error('PDF nahi bana!');
  } finally {
    setIsDownloading(false);
  }
};

  const ResumeContent = () => (
    <div ref={resumeRef} className="bg-white w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5">
        <h1 className="text-xl font-bold mb-1 break-words">
          {p.fullName || "Tumhara Naam"}
        </h1>
        
        <div className="grid grid-cols-1 gap-1.5 mt-3 text-blue-100 text-xs">
          {p.email && (
            <span className="flex items-center gap-1.5 truncate">
              <Mail size={12} className="flex-shrink-0" /> 
              <span className="truncate text-xs">{p.email}</span>
            </span>
          )}
          {p.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="flex-shrink-0" /> {p.phone}
            </span>
          )}
          {p.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="flex-shrink-0" /> 
              <span className="truncate text-xs">{p.location}</span>
            </span>
          )}
        </div>
        
        {p.summary && (
          <p className="mt-3 text-blue-100 text-xs leading-relaxed">
            {p.summary}
          </p>
        )}
      </div>

      <div className="p-5 space-y-5">
        {experience.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-800 border-l-4 border-blue-600 pl-2 mb-3">💼 Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex flex-col gap-1">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{exp.position}</h3>
                      <p className="text-blue-600 text-xs mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full self-start">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                  {i !== experience.length - 1 && <div className="border-b border-gray-100 mt-3" />}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-800 border-l-4 border-blue-600 pl-2 mb-3">🎓 Education</h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{edu.school}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {edu.degree} in {edu.field}
                      {edu.grade && ` — Grade: ${edu.grade}`}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  {i !== education.length - 1 && <div className="border-b border-gray-100 mt-2" />}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-800 border-l-4 border-blue-600 pl-2 mb-3">🛠️ Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // Desktop view - Normal preview
  if (!isMobile) {
    return (
      <div className="space-y-4">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {isDownloading ? <><Loader size={18} className="animate-spin" /> PDF Ban Raha Hai...</> : <><Download size={18} /> PDF Download Karo</>}
        </button>
        <ResumeContent />
      </div>
    );
  }

  // Mobile view - Button FORM KE UPAR and Popup
  return (
    <>
      {/* Mobile: Preview Button - Form ke top par */}
      <div className="mb-4">
        <button
          onClick={() => setShowPreview(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          <Eye size={18} />
          Resume Preview Dekho
        </button>
      </div>

      {/* Full Screen Popup Modal */}
      {showPreview && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}
          onClick={() => setShowPreview(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: 'white',
              position: 'sticky',
              top: 0
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Resume Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  padding: '8px',
                  borderRadius: '9999px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={22} color="#6b7280" />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              overflowY: 'auto',
              padding: '16px',
              maxHeight: 'calc(90vh - 70px)'
            }}>
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                {isDownloading ? (
                  <><Loader size={18} className="animate-spin" /> PDF Ban Raha Hai...</>
                ) : (
                  <><Download size={18} /> PDF Download Karo</>
                )}
              </button>
              <ResumeContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}