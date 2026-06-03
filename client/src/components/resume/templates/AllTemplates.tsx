import { Mail, Phone, MapPin } from 'lucide-react';
import type{ Resume } from '../../../types';


function LinkedInIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Custom GitHub Icon (100% working)
function GitHubIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// ============================================================
// TEMPLATE 1: Modern Blue (Free + ATS) - WITH PROJECTS & CERTIFICATES
// ============================================================
export function TemplateModernBlue({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="bg-blue-600 text-white px-8 py-6">
        <h1 className="text-[22px] font-bold tracking-wide">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-blue-100 text-[10px]">
          {p.email    && <span className="flex items-center gap-1"><Mail size={10}/>{p.email}</span>}
          {p.phone    && <span className="flex items-center gap-1"><Phone size={10}/>{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin size={10}/>{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><LinkedInIcon size={10}/>{p.linkedin}</span>}
          {p.github   && <span className="flex items-center gap-1"><GitHubIcon size={10}/>{p.github}</span>}
        </div>
        {p.summary && <p className="mt-3 text-blue-100 text-[10px] leading-relaxed max-w-2xl">{p.summary}</p>}
      </div>
      <div className="px-8 py-6 space-y-5">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-600 pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start">
                  <div><p className="font-bold text-gray-800">{e.position}</p><p className="text-blue-600">{e.company}</p></div>
                  <span className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && <p className="text-gray-600 mt-1 leading-relaxed whitespace-pre-line text-[10px]">{e.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Projects - NEW */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-600 pb-1 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((project, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <p className="font-bold text-gray-800 text-[11px]">{project.name}</p>
                      <p className="text-blue-600 text-[10px]">{project.technologies}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {project.startDate} — {project.endDate}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-gray-600 text-[10px] mt-1 leading-relaxed">{project.description}</p>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-500 text-[9px] hover:underline block mt-1">
                      🔗 View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-600 pb-1 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="flex justify-between mb-2">
                <div><p className="font-bold text-gray-800">{e.school}</p><p className="text-gray-500 text-[10px]">{e.degree} — {e.field}{e.grade && ` | ${e.grade}`}</p></div>
                <span className="text-[9px] text-gray-400">{e.startDate} — {e.endDate}</span>
              </div>
            ))}
          </section>
        )}

        {/* Certificates - NEW */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-600 pb-1 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certificates.map((cert, i) => (
                <div key={i} className="flex justify-between items-start flex-wrap">
                  <div>
                    <p className="font-bold text-gray-800 text-[11px]">{cert.name}</p>
                    <p className="text-gray-600 text-[10px]">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {cert.date}
                    </span>
                  )}
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                       className="text-blue-500 text-[9px] hover:underline block w-full mt-1">
                      🔗 Verify Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-blue-600 font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-600 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-medium">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 2: Emerald Pro (Free) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateEmerald({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans flex text-[11px]">
      <div className="w-[35%] bg-emerald-800 text-white p-6 space-y-5">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-2xl font-bold mx-auto mb-3">{p.fullName?.[0] || 'A'}</div>
          <h1 className="text-[15px] font-bold leading-tight">{p.fullName || 'Your Name'}</h1>
          <p className="text-emerald-300 text-[10px] mt-1">{experience[0]?.position || ''}</p>
        </div>
        <div className="space-y-1 text-[9px] text-emerald-200">
          {p.email    && <p className="flex items-center gap-1.5"><Mail size={9}/>{p.email}</p>}
          {p.phone    && <p className="flex items-center gap-1.5"><Phone size={9}/>{p.phone}</p>}
          {p.location && <p className="flex items-center gap-1.5"><MapPin size={9}/>{p.location}</p>}
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">Skills</h3>
            {skills.map((s, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-[9px] mb-0.5"><span>{s.name}</span><span className="text-emerald-400 capitalize">{s.level}</span></div>
                <div className="h-1 bg-emerald-900 rounded-full"><div className="h-1 bg-emerald-400 rounded-full" style={{ width: s.level === 'expert' ? '90%' : s.level === 'intermediate' ? '65%' : '40%' }}/></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">Education</h3>
            {education.map((e, i) => (
              <div key={i} className="text-[9px] mb-2"><p className="font-semibold">{e.school}</p><p className="text-emerald-300">{e.degree}</p><p className="text-emerald-400">{e.startDate} — {e.endDate}</p></div>
            ))}
          </div>
        )}
        
        {/* Certifications - Left Side (Skills ke baad, Education ke baad) */}
        {certificates && certificates.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-2">Certifications</h3>
            {certificates.map((cert, i) => (
              <div key={i} className="text-[9px] mb-2">
                <p className="font-semibold text-emerald-200">{cert.name}</p>
                <p className="text-emerald-300">{cert.issuer}</p>
                {cert.date && <p className="text-emerald-400 text-[8px]">{cert.date}</p>}
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-emerald-300 text-[8px] underline block mt-0.5">
                    🔗 Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6 space-y-5">
        {/* Profile Summary */}
        {p.summary && <div><h2 className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Profile</h2><p className="text-gray-600 text-[10px] leading-relaxed">{p.summary}</p></div>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-emerald-300">
                <p className="font-bold text-gray-800">{e.position}</p>
                <p className="text-emerald-600 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Projects - Right Side (Experience ke baad) */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-emerald-300">
                <p className="font-bold text-gray-800 text-[11px]">{project.name}</p>
                <p className="text-emerald-600 text-[10px]">{project.technologies} | {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-gray-600 text-[10px] mt-1 leading-relaxed">{project.description}</p>}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[9px] hover:underline inline-block mt-1">
                    🔗 View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 3: Minimal Clean (Free + ATS) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateMinimal({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-serif text-[11px]">
      <div className="border-b-2 border-gray-900 pb-4 mb-5">
        <h1 className="text-[24px] font-bold tracking-widest uppercase">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-[10px] text-gray-600">
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github   && <span>{p.github}</span>}
        </div>
      </div>
      
      {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed mb-5">{p.summary}</p>}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between"><span className="font-bold">{e.position}, {e.company}</span><span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
              {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {/* Projects - NEW (Experience ke baad) */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold">{project.name}</span>
                <span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span>
              </div>
              <p className="text-gray-600 text-[10px] italic">{project.technologies}</p>
              {project.description && <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between mb-2"><span className="font-bold">{e.school}</span><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>
          ))}
        </section>
      )}
      
      {/* Certifications - NEW (Education ke baad) */}
      {certificates && certificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold text-[10px]">{cert.name}</span>
                <span className="text-[9px] text-gray-500">{cert.date}</span>
              </div>
              <p className="text-gray-500 text-[9px]">{cert.issuer}</p>
              {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline">🔗 Verify</a>}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Skills</h2>
          <p className="text-[10px] text-gray-700">{skills.map(s => s.name).join(' • ')}</p>
        </section>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 4: ATS Classic (Free + ATS) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateATS({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 text-[11px]" style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="text-center border-b border-gray-400 pb-4 mb-5">
        <h1 className="text-[20px] font-bold uppercase tracking-wider">{p.fullName || 'Your Name'}</h1>
        <p className="text-[10px] text-gray-600 mt-1">{p.email} | {p.phone} | {p.location}</p>
        {p.linkedin && <p className="text-[10px] text-gray-600">{p.linkedin} {p.github && `| ${p.github}`}</p>}
      </div>
      
      {/* Professional Summary */}
      {p.summary && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-[10px]">{p.summary}</p>
        </div>
      )}
      
      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-3">Work Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between"><span className="font-bold uppercase">{e.position}</span><span className="text-[9px]">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
              <p className="italic text-gray-700 text-[10px]">{e.company}</p>
              {e.description && <div className="mt-1 text-[10px] text-gray-700 whitespace-pre-line">{e.description.split('\n').map((line, j) => line.trim() && <p key={j}>• {line.replace(/^[•\-\*]\s*/, '')}</p>)}</div>}
            </div>
          ))}
        </div>
      )}
      
      {/* Projects - NEW (Experience ke baad) */}
      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-3">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold uppercase text-[10px]">{project.name}</span>
                <span className="text-[9px]">{project.startDate} — {project.endDate}</span>
              </div>
              <p className="italic text-gray-700 text-[10px]">{project.technologies}</p>
              {project.description && (
                <div className="mt-1 text-[10px] text-gray-700">
                  {project.description.split('\n').map((line, j) => line.trim() && <p key={j}>• {line.replace(/^[•\-\*]\s*/, '')}</p>)}
                </div>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline block mt-1">
                  🔗 Project Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between mb-1"><span className="font-bold">{e.degree} in {e.field}</span><span className="text-[9px]">{e.startDate} — {e.endDate}</span></div>
          ))}
          {education[0] && <p className="text-[10px] text-gray-600">{education[0].school}{education[0].grade && ` — ${education[0].grade}`}</p>}
        </div>
      )}
      
      {/* Certifications - NEW (Education ke baad) */}
      {certificates && certificates.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2">Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold text-[10px]">{cert.name}</span>
                <span className="text-[9px] text-gray-500">{cert.date}</span>
              </div>
              <p className="text-gray-600 text-[9px]">{cert.issuer}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline">
                  🔗 Verify Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2">Skills</h2>
          <p className="text-[10px] text-gray-700">{skills.map(s => s.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}


// ============================================================
// TEMPLATE 5: Slate Dark (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateDark({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-slate-900 w-full min-h-[297mm] text-white text-[11px]">
      <div className="bg-slate-800 px-8 py-6 border-b-2 border-blue-500">
        <h1 className="text-[22px] font-bold text-white">{p.fullName || 'Your Name'}</h1>
        <p className="text-blue-400 mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-slate-400">
          {p.email && <span>{p.email}</span>}{p.phone && <span>{p.phone}</span>}{p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}{p.github && <span>{p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {p.summary && <p className="text-slate-300 text-[10px] leading-relaxed">{p.summary}</p>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 pl-3 border-l border-blue-500">
                <p className="font-bold text-white">{e.position}</p>
                <p className="text-blue-400 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-slate-400 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Projects - NEW */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4 pl-3 border-l border-blue-500">
                <p className="font-bold text-white text-[11px]">{project.name}</p>
                <p className="text-blue-400 text-[10px]">{project.technologies} | {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-slate-400 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2"><p className="font-bold text-white">{e.school}</p><p className="text-slate-400 text-[10px]">{e.degree} — {e.field}</p></div>
            ))}
          </section>
        )}
        
        {/* Certifications - NEW */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-white text-[11px]">{cert.name}</p>
                <p className="text-slate-400 text-[9px]">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[9px] hover:underline">🔗 Verify</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="border border-blue-500 text-blue-300 px-2.5 py-1 rounded text-[9px]">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}


// ============================================================
// TEMPLATE 6: Rose Elegant (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateRose({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-serif text-[11px]">
      <div className="bg-gradient-to-r from-rose-700 to-pink-500 text-white px-8 py-6">
        <h1 className="text-[22px] font-bold">{p.fullName || 'Your Name'}</h1>
        <p className="text-rose-200 text-[11px] mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-rose-100">
          {p.email && <span>{p.email}</span>}{p.phone && <span>{p.phone}</span>}{p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}{p.github && <span>{p.github}</span>}
        </div>
      </div>
      <div className="flex">
        {/* Left Side - Main Content */}
        <div className="flex-1 px-8 py-5 space-y-5">
          {p.summary && <div><h2 className="text-[11px] font-bold text-rose-700 mb-2">Profile</h2><p className="text-gray-600 text-[10px] leading-relaxed">{p.summary}</p></div>}
          
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold text-rose-700 mb-3">Experience</h2>
              {experience.map((e, i) => (
                <div key={i} className="mb-4 bg-rose-50 rounded-lg p-3">
                  <p className="font-bold text-gray-800">{e.position}</p>
                  <p className="text-rose-600 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                  {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          )}
          
          {/* Projects - NEW */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold text-rose-700 mb-3">Projects</h2>
              {projects.map((project, i) => (
                <div key={i} className="mb-4 bg-rose-50 rounded-lg p-3">
                  <p className="font-bold text-gray-800 text-[11px]">{project.name}</p>
                  <p className="text-rose-600 text-[10px]">{project.technologies} | {project.startDate} — {project.endDate}</p>
                  {project.description && <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>}
                  {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-rose-500 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Side - Sidebar */}
        <div className="w-36 bg-rose-50 p-4 space-y-4">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-rose-700 mb-2">Skills</h3>
              {skills.map((s, i) => <p key={i} className="text-[9px] text-gray-600 py-1 border-b border-rose-200">{s.name}</p>)}
            </div>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-rose-700 mb-2">Education</h3>
              <p className="text-[9px] font-semibold">{education[0].school}</p>
              <p className="text-[9px] text-gray-500">{education[0].degree}</p>
            </div>
          )}
          
          {/* Certifications - NEW (Sidebar mein) */}
          {certificates && certificates.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-rose-700 mb-2">Certifications</h3>
              {certificates.slice(0, 3).map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="text-[9px] font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-[8px] text-gray-500">{cert.issuer}</p>
                  {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-rose-500 text-[8px] hover:underline">Verify</a>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 7: Violet Bold (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateViolet({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans flex text-[11px]">
      <div className="w-[38%] bg-violet-900 text-white p-5 space-y-5">
        <div>
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-xl font-bold mx-auto mb-3">{p.fullName?.[0] || 'A'}</div>
          <h1 className="text-[15px] font-bold text-center leading-tight">{p.fullName || 'Your Name'}</h1>
          <p className="text-violet-300 text-[9px] text-center mt-1">{experience[0]?.position || ''}</p>
        </div>
        <div className="space-y-1 text-[9px] text-violet-200">
          {p.email && <p><Mail size={8} className="inline mr-1"/>{p.email}</p>}
          {p.phone && <p><Phone size={8} className="inline mr-1"/>{p.phone}</p>}
          {p.location && <p><MapPin size={8} className="inline mr-1"/>{p.location}</p>}
          {p.linkedin && <p className="truncate">🔗 {p.linkedin}</p>}
          {p.github && <p>🐙 {p.github}</p>}
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-violet-300 mb-2">Skills</h3>
            {skills.map((s, i) => (
              <div key={i} className="mb-2">
                <p className="text-[9px] text-violet-100">{s.name}</p>
                <div className="h-1 bg-violet-800 rounded"><div className="h-1 bg-violet-400 rounded" style={{ width: s.level === 'expert' ? '90%' : s.level === 'intermediate' ? '65%' : '40%' }}/></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-violet-300 mb-2">Education</h3>
            {education.map((e, i) => (
              <div key={i} className="text-[9px] mb-2"><p className="font-semibold">{e.school}</p><p className="text-violet-300">{e.degree}</p><p className="text-violet-400 text-[8px]">{e.startDate} — {e.endDate}</p></div>
            ))}
          </div>
        )}
        
        {/* Certifications - NEW (Left Side) */}
        {certificates && certificates.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-violet-300 mb-2">Certifications</h3>
            {certificates.slice(0, 4).map((cert, i) => (
              <div key={i} className="text-[9px] mb-2">
                <p className="font-semibold text-violet-200">{cert.name}</p>
                <p className="text-violet-300 text-[8px]">{cert.issuer}</p>
                {cert.date && <p className="text-violet-400 text-[8px]">{cert.date}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-5 space-y-5">
        {/* About Me / Summary */}
        {p.summary && <div><h2 className="text-[11px] font-bold text-violet-700 border-b border-violet-200 pb-1 mb-2">About Me</h2><p className="text-gray-600 text-[10px] leading-relaxed">{p.summary}</p></div>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold text-violet-700 border-b border-violet-200 pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-gray-800">{e.position}</p>
                <p className="text-violet-600 text-[10px]">{e.company} • {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Projects - NEW (Right Side Main Content) */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold text-violet-700 border-b border-violet-200 pb-1 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-gray-800 text-[11px]">{project.name}</p>
                <p className="text-violet-600 text-[10px]">{project.technologies} • {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-violet-500 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 8: Amber Warm (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateAmber({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-amber-50 w-full min-h-[297mm] font-serif text-[11px]">
      <div className="bg-amber-900 text-amber-50 px-8 py-6">
        <h1 className="text-[22px] font-bold">{p.fullName || 'Your Name'}</h1>
        <p className="text-amber-300 text-[11px] mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-amber-200">
          {p.email && <span>{p.email}</span>}{p.phone && <span>{p.phone}</span>}{p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}{p.github && <span>{p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {/* Summary */}
        {p.summary && <p className="text-amber-900 text-[10px] leading-relaxed">{p.summary}</p>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-amber-900 border-b-2 border-amber-400 pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-amber-900">{e.position}</p>
                <p className="text-amber-700 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Projects - NEW (Experience ke baad) */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-amber-900 border-b-2 border-amber-400 pb-1 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-amber-900 text-[11px]">{project.name}</p>
                <p className="text-amber-700 text-[10px]">{project.technologies} | {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-amber-600 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-amber-900 border-b-2 border-amber-400 pb-1 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div>
            ))}
          </section>
        )}
        
        {/* Certifications - NEW (Education ke baad) */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-amber-900 border-b-2 border-amber-400 pb-1 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-amber-900 text-[11px]">{cert.name}</p>
                <p className="text-gray-600 text-[9px]">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-amber-600 text-[9px] hover:underline">🔗 Verify</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-amber-900 border-b-2 border-amber-400 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="border border-amber-400 text-amber-900 px-2.5 py-1 rounded text-[9px]">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 9: Tech Modern / Cyan (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateCyan({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-gray-950 w-full min-h-[297mm] text-white text-[11px]" style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="bg-gray-900 border-b border-cyan-500 px-8 py-6">
        <h1 className="text-[22px] font-bold text-cyan-400">{p.fullName || 'Your Name'}</h1>
        <p className="text-cyan-300 text-[11px] mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-gray-400">
          {p.email && <span>{p.email}</span>}{p.phone && <span>{p.phone}</span>}{p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}{p.github && <span>{p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {p.summary && <p className="text-gray-300 text-[10px] leading-relaxed border-l-2 border-cyan-500 pl-3">{p.summary}</p>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] text-cyan-400 font-bold mb-3">{'>'} EXPERIENCE</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 pl-3 border-l border-cyan-800">
                <p className="font-bold text-white">{e.position}</p>
                <p className="text-cyan-400 text-[10px]">{e.company} // {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-400 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Projects - NEW */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] text-cyan-400 font-bold mb-3">{'>'} PROJECTS</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4 pl-3 border-l border-cyan-800">
                <p className="font-bold text-white text-[11px]">{project.name}</p>
                <p className="text-cyan-400 text-[10px]">{project.technologies} // {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-gray-400 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-[9px] hover:underline block mt-1">🔗 REPO</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] text-cyan-400 font-bold mb-3">{'>'} EDUCATION</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-400 text-[10px]">{e.degree} — {e.field}</p></div>
            ))}
          </section>
        )}
        
        {/* Certifications - NEW */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] text-cyan-400 font-bold mb-3">{'>'} CERTIFICATIONS</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-white text-[11px]">{cert.name}</p>
                <p className="text-gray-400 text-[9px]">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-[9px] hover:underline">🔗 VERIFY</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] text-cyan-400 font-bold mb-3">{'>'} SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="border border-cyan-600 text-cyan-300 px-2 py-0.5 rounded text-[9px]">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 10: Creative Pink (Pro) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplatePink({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="h-2 bg-gradient-to-r from-pink-600 to-rose-400"/>
      <div className="px-8 py-5 border-b border-pink-100">
        <h1 className="text-[22px] font-bold text-gray-900">{p.fullName || 'Your Name'}</h1>
        <p className="text-pink-600 font-medium mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-gray-500">
          {p.email && <span>✉ {p.email}</span>}{p.phone && <span>📞 {p.phone}</span>}{p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>🔗 {p.linkedin}</span>}{p.github && <span>🐙 {p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-5 space-y-5">
        {p.summary && <p className="text-gray-600 text-[10px] leading-relaxed">{p.summary}</p>}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold text-pink-600 mb-3">Work Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 rounded-xl bg-pink-50 p-3">
                <p className="font-bold text-gray-900">{e.position}</p>
                <p className="text-pink-600 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Projects - NEW */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold text-pink-600 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4 rounded-xl bg-pink-50 p-3">
                <p className="font-bold text-gray-900 text-[11px]">{project.name}</p>
                <p className="text-pink-600 text-[10px]">{project.technologies} | {project.startDate} — {project.endDate}</p>
                {project.description && <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold text-pink-600 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-500 text-[10px]">{e.degree} — {e.field}</p></div>
            ))}
          </section>
        )}
        
        {/* Certifications - NEW */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold text-pink-600 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2 rounded-lg bg-pink-50/50 p-2">
                <p className="font-bold text-gray-800 text-[11px]">{cert.name}</p>
                <p className="text-gray-500 text-[9px]">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-[9px] hover:underline">🔗 Verify</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold text-pink-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-[9px] font-medium">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 11: Navy Executive (Pro + ATS) - WITH PROJECTS & CERTIFICATIONS
// ============================================================
export function TemplateNavy({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="bg-[#1E3A5F] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-white">{p.fullName || 'Your Name'}</h1>
          <p className="text-blue-300 mt-1">{experience[0]?.position || ''}</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">{p.fullName?.[0] || 'A'}</div>
      </div>
      <div className="bg-blue-50 px-8 py-2 flex flex-wrap gap-6 text-[9px] text-blue-800">
        {p.email && <span>✉ {p.email}</span>}{p.phone && <span>📞 {p.phone}</span>}{p.location && <span>📍 {p.location}</span>}
        {p.linkedin && <span>🔗 {p.linkedin}</span>}{p.github && <span>🐙 {p.github}</span>}
      </div>
      <div className="px-8 py-5 space-y-5">
        {/* Professional Summary */}
        {p.summary && (
          <div>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-2">Professional Summary</h2>
            <p className="text-gray-600 text-[10px] leading-relaxed">{p.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div><p className="font-bold text-gray-900">{e.position}</p><p className="text-blue-600 text-[10px]">{e.company}</p></div>
                  <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && <p className="text-gray-600 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Projects - NEW */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div><p className="font-bold text-gray-900 text-[11px]">{project.name}</p><p className="text-blue-600 text-[10px]">{project.technologies}</p></div>
                  <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{project.startDate} — {project.endDate}</span>
                </div>
                {project.description && <p className="text-gray-600 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline block mt-1">🔗 View Project</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-500 text-[10px]">{e.degree} — {e.field}{e.grade && ` | ${e.grade}`}</p></div>
            ))}
          </section>
        )}
        
        {/* Certifications - NEW */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-gray-800 text-[11px]">{cert.name}</p>
                <p className="text-gray-500 text-[9px]">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[9px] hover:underline">🔗 Verify</a>}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold text-[#1E3A5F] border-l-4 border-blue-600 pl-2 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <span key={i} className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-[9px] font-medium">{s.name}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}