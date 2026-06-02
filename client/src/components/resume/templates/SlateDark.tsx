import type { Resume } from '../../../types';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function ModernBlue({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume;
  return (
    <div className="bg-white w-full min-h-[900px] font-sans">
      {/* Header */}
      <div className="bg-blue-600 text-white p-8">
        <h1 className="text-3xl font-bold">{p.fullName || 'Tumhara Naam'}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-blue-100 text-sm">
          {p.email && <span className="flex items-center gap-1"><Mail size={12}/>{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone size={12}/>{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin size={12}/>{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={12}/>{p.linkedin}</span>}
          {p.github && <span className="flex items-center gap-1"><Github size={12}/>{p.github}</span>}
        </div>
        {p.summary && <p className="mt-4 text-blue-100 text-sm leading-relaxed">{p.summary}</p>}
      </div>
      <div className="p-8 space-y-6">
        {experience.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1 mb-4">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-gray-800">{e.position}</p>
                    <p className="text-blue-600 text-sm">{e.company}</p>
                  </div>
                  <span className="text-xs text-gray-400">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="flex justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{e.school}</p>
                  <p className="text-sm text-gray-500">{e.degree} — {e.field} {e.grade && `| ${e.grade}`}</p>
                </div>
                <span className="text-xs text-gray-400">{e.startDate} — {e.endDate}</span>
              </div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{s.name}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}