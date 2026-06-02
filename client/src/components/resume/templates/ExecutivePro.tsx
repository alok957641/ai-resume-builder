import type { Resume } from '../../../types';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ExecutivePro({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume;
  return (
    <div className="bg-white w-full min-h-[900px] flex font-sans">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-emerald-700 text-white p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold leading-tight">{p.fullName || 'Tumhara Naam'}</h1>
          <div className="mt-4 space-y-2 text-emerald-200 text-xs">
            {p.email && <p className="flex items-center gap-2"><Mail size={11}/>{p.email}</p>}
            {p.phone && <p className="flex items-center gap-2"><Phone size={11}/>{p.phone}</p>}
            {p.location && <p className="flex items-center gap-2"><MapPin size={11}/>{p.location}</p>}
          </div>
        </div>
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{s.name}</span>
                    <span className="text-emerald-300 capitalize">{s.level}</span>
                  </div>
                  <div className="h-1 bg-emerald-800 rounded">
                    <div className="h-1 bg-emerald-300 rounded" style={{
                      width: s.level === 'expert' ? '90%' : s.level === 'intermediate' ? '65%' : '40%'
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-3 text-xs">
                <p className="font-semibold">{e.school}</p>
                <p className="text-emerald-300">{e.degree}</p>
                <p className="text-emerald-400">{e.startDate} — {e.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Right Content */}
      <div className="flex-1 p-6 space-y-6">
        {p.summary && (
          <section>
            <h2 className="text-emerald-700 font-bold text-sm uppercase tracking-widest mb-2">Profile</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{p.summary}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section>
            <h2 className="text-emerald-700 font-bold text-sm uppercase tracking-widest mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-emerald-200">
                <p className="font-bold text-gray-800 text-sm">{e.position}</p>
                <p className="text-emerald-600 text-xs">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}