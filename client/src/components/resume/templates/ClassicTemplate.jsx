import React from 'react';

const ClassicTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <div className="font-serif text-gray-900 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm">
          {[
            personalInfo.email,
            personalInfo.phone,
            [personalInfo.city, personalInfo.state].filter(Boolean).join(', '),
          ]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </header>

      {/* Objective */}
      {personalInfo.objective && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.objective}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <span className="text-sm">
                    {exp.startDate && (
                      <>
                        {new Date(exp.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' - '}
                        {exp.current
                          ? 'Present'
                          : exp.endDate &&
                            new Date(exp.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                      </>
                    )}
                  </span>
                </div>
                <p className="text-base font-medium">
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </p>
                {exp.description && (
                  <div className="mt-2 text-sm whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <span className="text-sm">
                    {edu.startDate && (
                      <>
                        {new Date(edu.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' - '}
                        {edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Present'}
                      </>
                    )}
                  </span>
                </div>
                <p className="text-base">
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  {edu.gpa && ` - GPA: ${edu.gpa}`}
                </p>
                {edu.description && (
                  <p className="mt-1 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.id}>
                <span className="text-sm">
                  {skill.name}
                  {skill.level && ` (${skill.level})`}
                </span>
                {index < skills.length - 1 && <span className="mx-2">•</span>}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm italic">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="mt-1 text-sm">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;