import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import type { Certificate } from '../../types';

const emptyCertificate: Certificate = {
  name: '',
  issuer: '',
  date: '',
  link: '',
};

export default function CertificatesForm() {
  const { currentResume, addCertificate, updateCertificate, removeCertificate } = useResumeStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const certificates = currentResume?.certificates && Array.isArray(currentResume.certificates) 
    ? currentResume.certificates 
    : [];

  const handleAddCertificate = () => {
    addCertificate({ ...emptyCertificate });
    setTimeout(() => {
      setOpenIndex(certificates.length);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">📜 Certifications</h2>
        <button
          onClick={handleAddCertificate}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No certificates added yet</p>
          <p className="text-xs mt-1">Add your professional certifications here</p>
        </div>
      )}

      {certificates.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {cert?.name || `Certificate ${index + 1}`}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-md">
                {cert?.issuer || 'No issuer added'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  removeCertificate(index);
                  if (openIndex === index) setOpenIndex(null);
                }}
                className="p-1.5 text-red-400 hover:text-red-600 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {openIndex === index && cert && (
            <CertificateCardForm
              certificate={cert}
              onUpdate={(data) => updateCertificate(index, data)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function CertificateCardForm({ certificate, onUpdate }: { certificate: Certificate; onUpdate: (d: Certificate) => void }) {
  const { register, watch } = useForm<Certificate>({ 
    defaultValues: certificate 
  });

  useEffect(() => {
    const subscription = watch((data) => {
      if (data) {
        onUpdate(data as Certificate);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className="p-4 border-t border-gray-100 space-y-4 bg-gray-50/30">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certificate Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          placeholder="e.g., AWS Certified Solutions Architect"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issuing Organization <span className="text-red-500">*</span>
        </label>
        <input
          {...register('issuer')}
          placeholder="e.g., Amazon Web Services"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date Received
        </label>
        <input
          {...register('date')}
          placeholder="e.g., March 2024"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certificate URL / Credential ID <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          {...register('link')}
          placeholder="https://www.credential.net/..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      
      <div className="text-xs text-gray-400 mt-2">
        💡 Tip: Adding professional certifications can boost your resume credibility
      </div>
    </div>
  );
}