import type { Resume } from '../../../types';

// ============================================================
// TEMPLATE 1: CLASSIC PROFESSIONAL
// ============================================================
export function TemplateModernBlue({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px] leading-relaxed">
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
      <div className="px-8 py-5 space-y-5">
        {p.summary && <p className="text-gray-800 text-[10px] leading-relaxed border-l-2 border-gray-300 pl-3">{p.summary}</p>}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div><p className="font-bold text-gray-900">{e.position}</p><p className="text-gray-600 text-[10px]">{e.company}</p></div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div><p className="font-bold text-gray-900 text-[11px]">{project.name}</p><p className="text-gray-600 text-[10px]">{project.technologies}</p></div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">{project.startDate} — {project.endDate}</span>
                </div>
                {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">View Project →</a>}
              </div>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div><p className="font-bold text-gray-900">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}{e.grade && ` | ${e.grade}`}</p></div>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">{e.startDate} — {e.endDate}</span>
                </div>
              </div>
            ))}
          </section>
        )}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <div><p className="font-bold text-gray-900 text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>
                  {cert.date && <span className="text-[9px] text-gray-500 whitespace-nowrap">{cert.date}</span>}
                </div>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">Verify Certificate →</a>}
              </div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-[9px]">{s.name}</span>)}</div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 2: MODERN CLEAN
// ============================================================
export function TemplateEmerald({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="bg-gray-900 text-white px-8 py-6">
        <h1 className="text-[22px] font-light tracking-wide">{p.fullName || 'Your Name'}</h1>
        <p className="text-gray-400 text-[10px] mt-1">{experience[0]?.position || ''}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-[9px] text-gray-300">
          {p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}{p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}{p.github && <span>| {p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed border-l-2 border-gray-400 pl-3">{p.summary}</p>}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start"><div><p className="font-semibold text-gray-900">{e.position}</p><p className="text-gray-600 text-[10px]">{e.company}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
                {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </section>
        )}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start"><div><p className="font-semibold text-gray-900 text-[11px]">{project.name}</p><p className="text-gray-600 text-[10px]">{project.technologies}</p></div><span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span></div>
                {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">View Project →</a>}
              </div>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-semibold text-gray-900">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>
            ))}
          </section>
        )}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-semibold text-gray-900 text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>{cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}</div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-[9px]">{s.name}</span>)}</div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 3: MINIMALIST
// ============================================================
export function TemplateMinimal({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-sans text-[11px]">
      <div className="border-b-2 border-black pb-3 mb-4">
        <h1 className="text-[28px] font-light tracking-widest uppercase">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-600">{p.email && <span>{p.email}</span>}{p.phone && <span>• {p.phone}</span>}{p.location && <span>• {p.location}</span>}{p.linkedin && <span>• {p.linkedin}</span>}{p.github && <span>• {p.github}</span>}</div>
      </div>
      {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed mb-5">{p.summary}</p>}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start"><div><p className="font-bold text-gray-900">{e.position}</p><p className="text-gray-600 text-[10px]">{e.company}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
              {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
            </div>
          ))}
        </section>
      )}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start"><div><p className="font-bold text-gray-900 text-[11px]">{project.name}</p><p className="text-gray-600 text-[10px]">{project.technologies}</p></div><span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span></div>
              {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">View Project →</a>}
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-gray-900">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>
          ))}
        </section>
      )}
      {certificates && certificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-gray-900 text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>{cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}</div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="border border-gray-300 text-gray-800 px-3 py-1 rounded text-[9px]">{s.name}</span>)}</div>
        </section>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 4: EXECUTIVE
// ============================================================
export function TemplateATS({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-serif text-[11px] leading-relaxed">
      <div className="text-center border-b-2 border-black pb-4 mb-5">
        <h1 className="text-[26px] font-bold tracking-wider">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-[10px] text-gray-600">{p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}{p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}{p.github && <span>| {p.github}</span>}</div>
        {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed mt-3 max-w-2xl mx-auto">{p.summary}</p>}
      </div>
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Professional Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start"><div><p className="font-bold text-gray-900">{e.position}</p><p className="text-gray-600 italic text-[10px]">{e.company}</p></div><span className="text-[9px] text-gray-500 whitespace-nowrap">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
              {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
            </div>
          ))}
        </div>
      )}
      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start"><div><p className="font-bold text-gray-900 text-[11px]">{project.name}</p><p className="text-gray-600 italic text-[10px]">{project.technologies}</p></div><span className="text-[9px] text-gray-500 whitespace-nowrap">{project.startDate} — {project.endDate}</span></div>
              {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">View Project →</a>}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-gray-900">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>
          ))}
        </div>
      )}
      {certificates && certificates.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Certifications</h2>
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-gray-900 text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>{cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}</div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="border border-gray-400 text-gray-800 px-3 py-1 rounded text-[9px]">{s.name}</span>)}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 5: ATS OPTIMIZED
// ============================================================
export function TemplateDark({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 text-[11px] font-sans leading-relaxed">
      <div className="mb-4">
        <h1 className="text-[22px] font-bold uppercase tracking-wider">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-700">{p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}{p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}{p.github && <span>| {p.github}</span>}</div>
      </div>
      {p.summary && <div className="mb-4 border-t border-b border-gray-200 py-2"><p className="text-gray-800 text-[10px]">{p.summary}</p></div>}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Experience</h2>
          <hr className="border-black mb-2" />
          {experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start"><div><p className="font-bold">{e.position}</p><p className="text-gray-700 text-[10px]">{e.company}</p></div><span className="text-[9px] text-gray-600 whitespace-nowrap">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div>
              {e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}
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
              <div className="flex justify-between items-start"><div><p className="font-bold text-[11px]">{project.name}</p><p className="text-gray-700 text-[10px]">{project.technologies}</p></div><span className="text-[9px] text-gray-600 whitespace-nowrap">{project.startDate} — {project.endDate}</span></div>
              {project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline inline-block mt-1">View Project →</a>}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Education</h2>
          <hr className="border-black mb-2" />
          {education.map((e, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold">{e.school}</p><p className="text-gray-700 text-[10px]">{e.degree} — {e.field}</p></div><span className="text-[9px] text-gray-600 whitespace-nowrap">{e.startDate} — {e.endDate}</span></div>
          ))}
        </div>
      )}
      {certificates && certificates.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Certifications</h2>
          <hr className="border-black mb-2" />
          {certificates.map((cert, i) => (
            <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-[11px]">{cert.name}</p><p className="text-gray-700 text-[10px]">{cert.issuer}</p></div>{cert.date && <span className="text-[9px] text-gray-600 whitespace-nowrap">{cert.date}</span>}</div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider">Skills</h2>
          <hr className="border-black mb-2" />
          <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 text-[9px]">{s.name}</span>)}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// TEMPLATE 6: BOLD HEADER
// ============================================================
export function TemplateRose({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px]">
      <div className="bg-black text-white px-8 py-6">
        <h1 className="text-[28px] font-bold tracking-tight">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-gray-300">
          {p.email && <span>{p.email}</span>}{p.phone && <span>• {p.phone}</span>}{p.location && <span>• {p.location}</span>}{p.linkedin && <span>• {p.linkedin}</span>}{p.github && <span>• {p.github}</span>}
        </div>
      </div>
      <div className="px-8 py-6 space-y-5">
        {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed">{p.summary}</p>}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">Experience</h2>
            {experience.map((e, i) => (
              <div key={i} className="mb-4"><div className="flex justify-between"><p className="font-bold">{e.position}</p><span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div><p className="text-gray-600 text-[10px]">{e.company}</p>{e.description && <p className="text-gray-700 text-[10px] mt-1 whitespace-pre-line">{e.description}</p>}</div>
            ))}
          </section>
        )}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">Projects</h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-3"><div className="flex justify-between"><p className="font-bold text-[11px]">{project.name}</p><span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span></div><p className="text-gray-600 text-[10px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-[9px] hover:underline">View Project →</a>}</div>
            ))}
          </section>
        )}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">Education</h2>
            {education.map((e, i) => (
              <div key={i} className="flex justify-between mb-2"><div><p className="font-bold">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>
            ))}
          </section>
        )}
        {certificates && certificates.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} className="flex justify-between items-start mb-2"><div><p className="font-bold text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>{cert.date && <span className="text-[9px] text-gray-500">{cert.date}</span>}</div>
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 text-[9px]">{s.name}</span>)}</div>
          </section>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 7: TWO COLUMN (ATS Friendly)
// ============================================================
export function  TemplateViolet({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px] flex">
      <div className="w-[30%] bg-gray-50 p-6 space-y-4">
        <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Contact</h2>{p.email && <p className="text-[9px]">{p.email}</p>}{p.phone && <p className="text-[9px]">{p.phone}</p>}{p.location && <p className="text-[9px]">{p.location}</p>}{p.linkedin && <p className="text-[9px]">{p.linkedin}</p>}{p.github && <p className="text-[9px]">{p.github}</p>}</div>
        {skills.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Skills</h2>{skills.map((s, i) => <p key={i} className="text-[9px] py-1 border-b border-gray-200">{s.name}</p>)}</div>}
        {certificates && certificates.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Certifications</h2>{certificates.slice(0, 4).map((cert, i) => <div key={i} className="mb-2"><p className="text-[9px] font-semibold">{cert.name}</p><p className="text-[8px] text-gray-500">{cert.issuer}</p></div>)}</div>}
      </div>
      <div className="flex-1 p-6 space-y-4">
        <div><h1 className="text-[22px] font-bold">{p.fullName || 'Your Name'}</h1>{p.summary && <p className="text-gray-700 text-[10px] mt-2 leading-relaxed">{p.summary}</p>}</div>
        {experience.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Experience</h2>{experience.map((e, i) => <div key={i} className="mb-3"><p className="font-bold">{e.position}</p><p className="text-gray-600 text-[10px]">{e.company} | {e.startDate} — {e.current ? 'Present' : e.endDate}</p>{e.description && <p className="text-gray-700 text-[10px] mt-1">{e.description}</p>}</div>)}</div>}
        {projects && projects.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Projects</h2>{projects.map((project, i) => <div key={i} className="mb-3"><p className="font-bold text-[11px]">{project.name}</p><p className="text-gray-600 text-[10px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}</div>)}</div>}
        {education.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">Education</h2>{education.map((e, i) => <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-600 text-[10px]">{e.degree} — {e.field}</p></div>)}</div>}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 8: CLEAN SERIF
// ============================================================
export function TemplateAmber({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-10 py-8 font-serif text-[11px]">
      <div className="mb-5"><h1 className="text-[30px] font-light tracking-wide">{p.fullName || 'Your Name'}</h1><div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-600">{p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}{p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}{p.github && <span>| {p.github}</span>}</div></div>
      {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed mb-5 italic">{p.summary}</p>}
      {experience.length > 0 && <div className="mb-5"><h2 className="text-[11px] font-bold uppercase tracking-widest mb-3">Experience</h2>{experience.map((e, i) => <div key={i} className="mb-4"><div className="flex justify-between"><span className="font-bold">{e.position}</span><span className="text-[9px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</span></div><p className="text-gray-600 italic text-[10px]">{e.company}</p>{e.description && <p className="text-gray-700 text-[10px] mt-1">{e.description}</p>}</div>)}</div>}
      {projects && projects.length > 0 && <div className="mb-5"><h2 className="text-[11px] font-bold uppercase tracking-widest mb-3">Projects</h2>{projects.map((project, i) => <div key={i} className="mb-3"><div className="flex justify-between"><span className="font-bold text-[11px]">{project.name}</span><span className="text-[9px] text-gray-500">{project.startDate} — {project.endDate}</span></div><p className="text-gray-600 italic text-[10px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}</div>)}</div>}
      {education.length > 0 && <div className="mb-5"><h2 className="text-[11px] font-bold uppercase tracking-widest mb-3">Education</h2>{education.map((e, i) => <div key={i} className="flex justify-between mb-2"><span className="font-bold">{e.school}</span><span className="text-[9px] text-gray-500">{e.startDate} — {e.endDate}</span></div>)}</div>}
      {certificates && certificates.length > 0 && <div className="mb-5"><h2 className="text-[11px] font-bold uppercase tracking-widest mb-3">Certifications</h2>{certificates.map((cert, i) => <div key={i} className="mb-2"><p className="font-bold text-[11px]">{cert.name}</p><p className="text-gray-600 text-[10px]">{cert.issuer}</p></div>)}</div>}
      {skills.length > 0 && <div><h2 className="text-[11px] font-bold uppercase tracking-widest mb-3">Skills</h2><div className="flex flex-wrap gap-2">{skills.map((s, i) => <span key={i} className="border border-gray-300 px-3 py-1 rounded text-[9px]">{s.name}</span>)}</div></div>}
    </div>
  );
}

// ============================================================
// TEMPLATE 9: COMPACT
// ============================================================
export function TemplateCyan({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-6 py-6 font-sans text-[10px] leading-tight">
      <div className="border-b border-black pb-2 mb-3"><h1 className="text-[20px] font-bold">{p.fullName || 'Your Name'}</h1><div className="flex flex-wrap gap-2 text-[9px] text-gray-600">{p.email && <span>{p.email}</span>}{p.phone && <span>| {p.phone}</span>}{p.location && <span>| {p.location}</span>}{p.linkedin && <span>| {p.linkedin}</span>}{p.github && <span>| {p.github}</span>}</div></div>
      {p.summary && <p className="text-gray-700 text-[9px] mb-3">{p.summary}</p>}
      {experience.length > 0 && <div className="mb-3"><h2 className="text-[9px] font-bold uppercase tracking-wider mb-2">Experience</h2>{experience.map((e, i) => <div key={i} className="mb-2"><div className="flex justify-between"><span className="font-bold">{e.position}</span><span className="text-[8px] text-gray-500">{e.startDate}—{e.current ? 'Present' : e.endDate}</span></div><p className="text-gray-600 text-[9px]">{e.company}</p>{e.description && <p className="text-gray-700 text-[9px] mt-0.5">{e.description}</p>}</div>)}</div>}
      {projects && projects.length > 0 && <div className="mb-3"><h2 className="text-[9px] font-bold uppercase tracking-wider mb-2">Projects</h2>{projects.map((project, i) => <div key={i} className="mb-2"><div className="flex justify-between"><span className="font-bold text-[10px]">{project.name}</span><span className="text-[8px] text-gray-500">{project.startDate}—{project.endDate}</span></div><p className="text-gray-600 text-[9px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[9px]">{project.description}</p>}</div>)}</div>}
      {education.length > 0 && <div className="mb-3"><h2 className="text-[9px] font-bold uppercase tracking-wider mb-2">Education</h2>{education.map((e, i) => <div key={i} className="flex justify-between"><span className="font-bold">{e.school}</span><span className="text-[8px] text-gray-500">{e.startDate}—{e.endDate}</span></div>)}</div>}
      {certificates && certificates.length > 0 && <div className="mb-3"><h2 className="text-[9px] font-bold uppercase tracking-wider mb-2">Certifications</h2>{certificates.map((cert, i) => <div key={i}><span className="font-bold text-[10px]">{cert.name}</span> <span className="text-gray-600 text-[9px]">{cert.issuer}</span></div>)}</div>}
      {skills.length > 0 && <div><h2 className="text-[9px] font-bold uppercase tracking-wider mb-2">Skills</h2><div className="flex flex-wrap gap-1">{skills.map((s, i) => <span key={i} className="bg-gray-100 px-2 py-0.5 text-[8px]">{s.name}</span>)}</div></div>}
    </div>
  );
}

// ============================================================
// TEMPLATE 10: DARK SIDEBAR (ATS Friendly)
// ============================================================
export function TemplatePink({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] font-sans text-[11px] flex">
      <div className="w-[35%] bg-gray-800 text-white p-6 space-y-4">
        <div><h1 className="text-[18px] font-bold">{p.fullName || 'Your Name'}</h1><p className="text-gray-400 text-[9px]">{experience[0]?.position || ''}</p></div>
        <div className="space-y-1 text-[9px] text-gray-300">{p.email && <p>{p.email}</p>}{p.phone && <p>{p.phone}</p>}{p.location && <p>{p.location}</p>}{p.linkedin && <p>{p.linkedin}</p>}{p.github && <p>{p.github}</p>}</div>
        {skills.length > 0 && <div><h3 className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2">Skills</h3>{skills.map((s, i) => <p key={i} className="text-[9px] py-1 border-b border-gray-700">{s.name}</p>)}</div>}
        {certificates && certificates.length > 0 && <div><h3 className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2">Certifications</h3>{certificates.slice(0, 3).map((cert, i) => <div key={i} className="text-[9px] mb-2"><p className="font-semibold">{cert.name}</p><p className="text-gray-400 text-[8px]">{cert.issuer}</p></div>)}</div>}
        {education.length > 0 && <div><h3 className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-2">Education</h3>{education.slice(0, 2).map((e, i) => <div key={i} className="text-[9px] mb-2"><p className="font-semibold">{e.school}</p><p className="text-gray-400">{e.degree}</p></div>)}</div>}
      </div>
      <div className="flex-1 p-6 space-y-4">
        {p.summary && <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Profile</h2><p className="text-gray-700 text-[10px] leading-relaxed">{p.summary}</p></div>}
        {experience.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Experience</h2>{experience.map((e, i) => <div key={i} className="mb-3"><p className="font-bold">{e.position}</p><p className="text-gray-600 text-[10px]">{e.company} | {e.startDate}—{e.current ? 'Present' : e.endDate}</p>{e.description && <p className="text-gray-700 text-[10px] mt-1">{e.description}</p>}</div>)}</div>}
        {projects && projects.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Projects</h2>{projects.map((project, i) => <div key={i} className="mb-3"><p className="font-bold text-[11px]">{project.name}</p><p className="text-gray-600 text-[10px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[10px] mt-1">{project.description}</p>}</div>)}</div>}
      </div>
    </div>
  );
}

// ============================================================
// TEMPLATE 11: EUROPEAN
// ============================================================
export function TemplateNavy({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills, projects, certificates } = resume;
  return (
    <div id="resume-preview" className="bg-white w-full min-h-[297mm] px-8 py-8 font-sans text-[10px]">
      <div className="text-center border-b-3 border-black pb-4 mb-5">
        <h1 className="text-[28px] font-light uppercase tracking-[0.3em]">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-[9px] text-gray-600">
          {p.email && <span>{p.email}</span>}{p.phone && <span>• {p.phone}</span>}{p.location && <span>• {p.location}</span>}{p.linkedin && <span>• {p.linkedin}</span>}{p.github && <span>• {p.github}</span>}
        </div>
        {p.summary && <p className="text-gray-700 text-[10px] leading-relaxed mt-3 max-w-2xl mx-auto">{p.summary}</p>}
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {experience.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">Experience</h2>{experience.map((e, i) => <div key={i} className="mb-3"><p className="font-bold">{e.position}</p><p className="text-gray-600">{e.company}</p><p className="text-[8px] text-gray-500">{e.startDate} — {e.current ? 'Present' : e.endDate}</p>{e.description && <p className="text-gray-700 text-[9px] mt-1">{e.description}</p>}</div>)}</div>}
          {projects && projects.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">Projects</h2>{projects.map((project, i) => <div key={i} className="mb-3"><p className="font-bold text-[11px]">{project.name}</p><p className="text-gray-600 text-[9px]">{project.technologies}</p>{project.description && <p className="text-gray-700 text-[9px] mt-1">{project.description}</p>}</div>)}</div>}
        </div>
        <div className="space-y-4">
          {education.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">Education</h2>{education.map((e, i) => <div key={i} className="mb-2"><p className="font-bold">{e.school}</p><p className="text-gray-600 text-[9px]">{e.degree} — {e.field}</p><p className="text-[8px] text-gray-500">{e.startDate} — {e.endDate}</p></div>)}</div>}
          {certificates && certificates.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">Certifications</h2>{certificates.map((cert, i) => <div key={i} className="mb-2"><p className="font-bold text-[11px]">{cert.name}</p><p className="text-gray-600 text-[9px]">{cert.issuer}</p>{cert.date && <p className="text-[8px] text-gray-500">{cert.date}</p>}</div>)}</div>}
          {skills.length > 0 && <div><h2 className="text-[10px] font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">Skills</h2><div className="flex flex-wrap gap-1">{skills.map((s, i) => <span key={i} className="border border-gray-300 px-2 py-0.5 text-[8px]">{s.name}</span>)}</div></div>}
        </div>
      </div>
    </div>
  );
}
