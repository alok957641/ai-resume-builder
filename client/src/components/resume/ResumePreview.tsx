import { useRef, useState } from "react";
import { useResumeStore } from "../../store/useResumeStore";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Loader,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";

export default function ResumePreview() {
  const { currentResume } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!currentResume) return null;

  const { personalInfo: p, experience, education, skills } = currentResume;

  // PDF Download Function
const downloadPDF = async () => {
  if (!resumeRef.current) return;

  setIsDownloading(true);
  const toastId = toast.loading("PDF ban raha hai... ⏳");

  try {
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${p.fullName || "Resume"}_Resume.pdf`);

    toast.success("PDF Download Ho Gaya 🎉", {
      id: toastId,
    });
  } catch (error) {
    console.error("PDF Error:", error);

    toast.error("PDF Generate Nahi Hua ❌", {
      id: toastId,
    });
  } finally {
    setIsDownloading(false);
  }
};


  return (
    <div className="space-y-4">
      {/* Download Button */}
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
      >
        {isDownloading ? (
          <>
            <Loader size={18} className="animate-spin" /> PDF Ban Raha Hai...
          </>
        ) : (
          <>
            <Download size={18} /> PDF Download Karo
          </>
        )}
      </button>

      {/* Resume — yahi PDF mein convert hoga */}
      <div
        ref={resumeRef}
      className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-2xl mx-auto"
      >
        {/* Header */}
       <div className="bg-blue-600 text-white p-4 sm:p-6 md:p-8">
         <h1 className="text-2xl sm:text-3xl font-bold mb-1 break-words">
            {p.fullName || "Tumhara Naam"}
          </h1>
         <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-3 text-blue-100 text-sm break-all">
            {p.email && (
              <span className="flex items-center gap-1">
                <Mail size={13} /> {p.email}
              </span>
            )}
            {p.phone && (
              <span className="flex items-center gap-1">
                <Phone size={13} /> {p.phone}
              </span>
            )}
            {p.location && (
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {p.location}
              </span>
            )}
            {p.linkedin && (
              <span className="flex items-center gap-1">🔗 {p.linkedin}</span>
            )}
            {p.github && (
              <span className="flex items-center gap-1">💻 {p.github}</span>
            )}
          </div>
          {p.summary && (
            <p className="mt-4 text-blue-100 text-sm leading-relaxed">
              {p.summary}
            </p>
          )}
        </div>

<div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-4">
                💼 Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} —{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-4">
                🎓 Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, i) => (
                 <div
  key={i}
  className="flex flex-col sm:flex-row justify-between items-start gap-2"
>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {edu.school}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {edu.degree} in {edu.field}
                        {edu.grade && ` — ${edu.grade}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-4">
                🛠️ Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                  className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full font-medium break-words"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
