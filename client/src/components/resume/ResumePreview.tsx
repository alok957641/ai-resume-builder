import { useRef, useState, useEffect } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Download, Loader, Eye, X } from 'lucide-react';
import { TemplateRenderer } from './templates';
import { exportToPDF } from '../../utils/exportPDF';
import { toast } from 'react-hot-toast';

export default function ResumePreview() {
  const { currentResume } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force refresh when template changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [currentResume?.template]);

  if (!currentResume) return null;

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    const toastId = toast.loading('Generating PDF... 📄');
    try {
      await exportToPDF(resumeRef.current, currentResume.personalInfo?.fullName || 'Resume');
      toast.dismiss(toastId);
      toast.success('PDF downloaded successfully! 🎉');
    } catch {
      toast.dismiss(toastId);
      toast.error('PDF generation failed!');
    } finally { 
      setIsDownloading(false); 
    }
  };

  // Common PDF Button
  const PDFButton = () => (
    <button
      onClick={downloadPDF}
      disabled={isDownloading}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all duration-200 shadow-md"
    >
      {isDownloading ? (
        <>
          <Loader size={18} className="animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download size={18} />
          <span>Download PDF</span>
        </>
      )}
    </button>
  );

  // Desktop View
  if (!isMobile) {
    return (
      <div className="space-y-4">
        <PDFButton />
        <div ref={resumeRef} className="shadow-lg rounded-xl overflow-hidden bg-white">
          <TemplateRenderer key={refreshKey} resume={currentResume} />
        </div>
      </div>
    );
  }

  // Mobile View
  return (
    <>
      {/* Mobile Preview Trigger Button */}
      <button
        onClick={() => setShowPreview(true)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md"
      >
        <Eye size={18} />
        <span>Preview Resume</span>
      </button>

      {/* Mobile Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
          {/* Modal Header */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10">
            <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Eye size={16} className="text-indigo-600" />
              Resume Preview
            </h2>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {/* PDF Button inside modal */}
            <div className="mb-4 sticky top-0 z-10 bg-gray-100 pt-1 pb-2">
              <PDFButton />
            </div>
            
            {/* Resume Preview */}
            <div ref={resumeRef} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <TemplateRenderer key={refreshKey} resume={currentResume} />
            </div>
            
            {/* Extra spacing at bottom */}
            <div className="h-4" />
          </div>
        </div>
      )}
    </>
  );
}