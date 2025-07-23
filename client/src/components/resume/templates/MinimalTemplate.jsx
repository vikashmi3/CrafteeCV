import React from 'react';

const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <div className="font-sans text-gray-800 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm text-center text-gray-600">
          {[
            personalInfo.email,
            personalInfo.phone,
            [personalInfo.city, personalInfo.state].filter(Boolean).join(', '),
          ]
            .filter(Boolean)
            .join(' • ')}
        </div>
      </header>

      {/* Objective */}
      {personalInfo.objective && (
        <section className="mb-6">
          <p className="text-sm text-center max-w-2xl mx-auto">{personalInfo.objective}</p>
        </section>
      )}

      <div className="border-t border-gray-200 pt-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-medium">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
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
                  <p className="text-sm">
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                  {exp.description && (
                    <div className="mt-2 text-xs whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-medium">{edu.institution}</h3>
                    <span className="text-xs text-gray-500">
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
                  <p className="text-sm">
                    {edu.degree}
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.description && (
                    <p className="mt-1 text-xs text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-4">Skills</h2>
            <div className="flex flex-wrap gap-y-2">
              {skills.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span className="text-sm">
                    {skill.name}
                  </span>
                  {index < skills.length - 1 && <span className="mx-2 text-gray-300">•</span>}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-medium">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:underline"
                      >
                        Link
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-gray-500">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="mt-1 text-xs">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;