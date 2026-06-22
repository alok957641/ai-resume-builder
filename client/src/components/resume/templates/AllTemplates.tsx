import { Mail, Phone, MapPin } from 'lucide-react';
import type { Resume } from '../../../types';

// ============================================================
// ICONS - Minimal, Clean
// ============================================================
function LinkedInIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// ============================================================
// TEMPLATE 1: CLASSIC PROFESSIONAL (ATS-Friendly)
// ============================================================
export function TemplateClassic({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px] leading-relaxed">
      {/* Header */}
      <div className="border-b-3 border-black pb-4 px-8 pt-6">
        <h1 className="text-[24px] font-bold tracking-wide text-black">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-gray-700">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-5 space-y-5">
        {/* Summary */}
        {p.summary && (
          <p className="text-gray-800 text-[10px] leading-relaxed border-l-2 border-gray-300 pl-3">
            {p.summary}
          </p>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
              Experience
            </h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <p className="font-bold text-gray-900">{e.position}</p>
                    <p className="text-gray-600 text-[10px]">{e.company}</p>
                  </div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">
                    {e.startDate} — {e.current ? 'Present' : e.endDate}
                  </span>
                </div>
                {e.description && (
                  <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">
                    {e.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <p className="font-bold text-gray-900 text-[11px]">{project.name}</p>
                    <p className="text-gray-600 text-[10px]">{project.technologies}</p>
                  </div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">
                    {project.startDate} — {project.endDate}
                  </span>
                </div>
                {project.description && (
                  <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <p className="font-bold text-gray-900">{e.school}</p>
                    <p className="text-gray-600 text-[10px]">
                      {e.degree} — {e.field}
                      {e.grade && ` | ${e.grade}`}
                    </p>
                  </div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">
                    {e.startDate} — {e.endDate}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <p className="font-bold text-gray-900 text-[11px]">{cert.name}</p>
                    <p className="text-gray-600 text-[10px]">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-[9px] text-gray-500 whitespace-nowrap">
                      {cert.date}
                    </span>
                  )}
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                     className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                    Verify Certificate →
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-[9px]">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 2: MODERN CLEAN (ATS-Friendly)
// ============================================================
export function TemplateModernClean({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="bg-gray-900 text-white px-8 py-6">
        <h1 className="text-[22px] font-light tracking-wide">{p.fullName || 'Your Name'}</h1>
        <p className="text-gray-400 text-[10px] mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-[9px] text-gray-300">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>| {p.phone}</span>}
          {p.location && <span>| {p.location}</span>}
          {p.linkedin && <span>| {p.linkedin}</span>}
          {p.github && <span>| {p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {p.summary && (
          <p className="text-gray-700 text-[10px] leading-relaxed border-l-2 border-gray-400 pl-3">
            {p.summary}
          </p>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Experience
            </h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{e.position}</p>
                    <p className="text-gray-600 text-[10px]">{e.company}</p>
                  </div>
                  <span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && (
                  <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 text-[11px]">{project.name}</p>
                    <p className="text-gray-600 text-[10px]">{project.technologies}</p>
                  </div>
                  <span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span>
                </div>
                {project.description && (
                  <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            {education.map((e, i) => (
              <div key={i} className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{e.school}</p>
                  <p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p>
                </div>
                <span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span>
              </div>
            ))}
          </section>
        )}

        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h2>
            {certificates.map((cert, i) => (
              <div key={i} className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900 text-[11px]">{cert.name}</p>
                  <p className="text-gray-600 text-[10px]">{cert.issuer}</p>
                </div>
                {cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-[9px]">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 3: MINIMALIST (ATS-Friendly)
// ============================================================
export function TemplateMinimalist({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-sans text-[11px]">
      <div className="border-b-2 border-black pb-3 mb-4">
        <h1 className="text-[28px] font-light tracking-widest uppercase">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
        </div>
      </div>

      {p.summary && (
        <p className="text-gray-700 text-[10px] leading-relaxed mb-5">{p.summary}</p>
      )}

      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{e.position}</p>
                  <p className="text-gray-600 text-[10px]">{e.company}</p>
                </div>
                <span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
              </div>
              {e.description && (
                <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-[11px]">{project.name}</p>
                  <p className="text-gray-600 text-[10px]">{project.technologies}</p>
                </div>
                <span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span>
              </div>
              {project.description && (
                <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900">{e.school}</p>
                <p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p>
              </div>
              <span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {certificates && certificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900 text-[11px]">{cert.name}</p>
                <p className="text-gray-600 text-[10px]">{cert.issuer}</p>
              </div>
              {cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="border border-gray-300 text-gray-800 px-3 py-1 rounded text-[9px]">
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 4: EXECUTIVE (ATS-Friendly)
// ============================================================
export function TemplateExecutive({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-serif text-[11px] leading-relaxed">
      <div className="text-center border-b-2 border-black pb-4 mb-5">
        <h1 className="text-[26px] font-bold tracking-wider">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-[10px] text-gray-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>| {p.phone}</span>}
          {p.location && <span>| {p.location}</span>}
          {p.linkedin && <span>| {p.linkedin}</span>}
          {p.github && <span>| {p.github}</span>}
        </div>
        {p.summary && (
          <p className="text-gray-700 text-[10px] leading-relaxed mt-3 max-w-2xl mx-auto">
            {p.summary}
          </p>
        )}
      </div>

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{e.position}</p>
                  <p className="text-gray-600 italic text-[10px]">{e.company}</p>
                </div>
                <span className="text-[9px] text-gray-500 whitespace-nowrap">
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </span>
              </div>
              {e.description && (
                <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900 text-[11px]">{project.name}</p>
                  <p className="text-gray-600 italic text-[10px]">{project.technologies}</p>
                </div>
                <span className="text-[9px] text-gray-500 whitespace-nowrap">
                  {project.startDate} — {project.endDate}
                </span>
              </div>
              {project.description && (
                <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900">{e.school}</p>
                <p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p>
              </div>
              <span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {certificates && certificates.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
            Certifications
          </h2>
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900 text-[11px]">{cert.name}</p>
                <p className="text-gray-600 text-[10px]">{cert.issuer}</p>
              </div>
              {cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="border border-gray-400 text-gray-800 px-3 py-1 rounded text-[9px]">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 5: ATS OPTIMIZED (Best for ATS)
// ============================================================
export function TemplateATSOptimized({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 text-[11px] font-sans leading-relaxed">
      <div className="mb-4">
        <h1 className="text-[22px] font-bold uppercase tracking-wider">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-700">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>| {p.phone}</span>}
          {p.location && <span>| {p.location}</span>}
          {p.linkedin && <span>| {p.linkedin}</span>}
          {p.github && <span>| {p.github}</span>}
        </div>
      </div>

      {p.summary && (
        <div className="mb-4 border-t border-b border-gray-200 py-2">
          <p className="text-gray-800 text-[10px]">{p.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Experience</h2>
          <hr className="border-black mb-2" />
          {experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{e.position}</p>
                  <p className="text-gray-700 text-[10px]">{e.company}</p>
                </div>
                <span className="text-[9px] text-gray-600 whitespace-nowrap">
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </span>
              </div>
              {e.description && (
                <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Projects</h2>
          <hr className="border-black mb-2" />
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[11px]">{project.name}</p>
                  <p className="text-gray-700 text-[10px]">{project.technologies}</p>
                </div>
                <span className="text-[9px] text-gray-600 whitespace-nowrap">
                  {project.startDate} — {project.endDate}
                </span>
              </div>
              {project.description && (
                <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 text-[9px] hover:underline inline-block mt-1">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Education</h2>
          <hr className="border-black mb-2" />
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold">{e.school}</p>
                <p className="text-gray-700 text-[10px]">{e.degree} — {e.field}</p>
              </div>
              <span className="text-[9px] text-gray-600 whitespace-nowrap">
                {e.startDate} — {e.endDate}
              </span>
            </div>
          ))}
        </div>
      )}

      {certificates && certificates.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Certifications</h2>
          <hr className="border-black mb-2" />
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-[11px]">{cert.name}</p>
                <p className="text-gray-700 text-[10px]">{cert.issuer}</p>
              </div>
              {cert.date && <span className="text-[9px] text-gray-600 whitespace-nowrap">{cert.date}</span>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Skills</h2>
          <hr className="border-black mb-2" />
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 text-[9px]">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
