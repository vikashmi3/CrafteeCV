import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import CertificatesForm from '../components/resume/CertificatesForm';
import AwardsForm from '../components/resume/AwardsForm';
import LanguagesForm from '../components/resume/LanguagesForm';
import VolunteerForm from '../components/resume/VolunteerForm';

const Builder = () => {
  const { resumeData, activeSection, setActiveSection, selectedTemplate, setSelectedTemplate, resetResume } = useResume();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [resumeId, setResumeId] = useState(null);

  // Get resume ID from URL if it exists
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setResumeId(id);
      // fetchResume(id); // Uncomment when Firebase is properly configured
    }
  }, [location]);

  const handleSaveResume = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setSaveMessage('Resume saved successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const sections = [
    {
      id: 'personalInfo',
      name: 'Personal Info',
      description: 'Add your contact details and personal information',
      tooltip: 'Start with your basic information like name, email, phone, and address. This appears at the top of your resume.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      component: <PersonalInfoForm />
    },
    {
      id: 'education',
      name: 'Education',
      description: 'List your educational background and qualifications',
      tooltip: 'Include your degrees, certifications, and relevant coursework. Start with the most recent education first.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      component: <EducationForm />
    },
    {
      id: 'experience',
      name: 'Experience',
      description: 'Detail your work history and professional achievements',
      tooltip: 'Showcase your work experience, internships, and key accomplishments. Use action verbs and quantify your achievements.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      component: <ExperienceForm />
    },
    {
      id: 'skills',
      name: 'Skills',
      description: 'Highlight your technical and soft skills',
      tooltip: 'List your relevant skills, programming languages, tools, and competencies. Group similar skills together.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      component: <SkillsForm />
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Showcase your personal and professional projects',
      tooltip: 'Display projects that demonstrate your skills and experience. Include links to live demos or GitHub repositories.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      component: <ProjectsForm />
    },
    {
      id: 'certificates',
      name: 'Certificates',
      description: 'Add your professional certifications and licenses',
      tooltip: 'Include relevant certifications, licenses, and professional credentials that support your qualifications.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      component: <CertificatesForm />
    },
    {
      id: 'awards',
      name: 'Awards',
      description: 'Highlight your achievements, honors, and recognitions',
      tooltip: 'List awards, honors, recognitions, and achievements that showcase your excellence and accomplishments.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      component: <AwardsForm />
    },
    {
      id: 'languages',
      name: 'Languages',
      description: 'List languages you speak and your proficiency levels',
      tooltip: 'Include all languages you can speak, read, or write, along with your proficiency level for each.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      component: <LanguagesForm />
    },
    {
      id: 'volunteer',
      name: 'Volunteer Experience',
      description: 'Add your volunteer work and community involvement',
      tooltip: 'Include volunteer positions, community service, and non-profit work that demonstrates your values and commitment.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      component: <VolunteerForm />
    }
  ];

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🎨' },
    { id: 'classic', name: 'Classic', preview: '📄' },
    { id: 'minimal', name: 'Minimal', preview: '✨' }
  ];

  const getCompletionPercentage = () => {
    let completed = 0;
    const total = 9; // Updated to include all sections
    
    if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName) completed++;
    if (resumeData.education.some(edu => edu.institution)) completed++;
    if (resumeData.experience.some(exp => exp.company)) completed++;
    if (resumeData.skills.some(skill => skill.name)) completed++;
    if (resumeData.projects.some(project => project.title)) completed++;
    if (resumeData.certificates && resumeData.certificates.some(cert => cert.name)) completed++;
    if (resumeData.awards && resumeData.awards.some(award => award.title)) completed++;
    if (resumeData.languages && resumeData.languages.some(lang => lang.name)) completed++;
    if (resumeData.volunteer && resumeData.volunteer.some(vol => vol.organization)) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Resume Builder
              </h1>
              <p className="text-gray-600">
                Create your professional resume with our easy-to-use builder
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <div className="progress-bar w-32">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">{completionPercentage}%</span>
                </div>
                
                {/* Preview navigation button */}
                <button
                  onClick={() => navigate('/preview')}
                  className="lg:hidden btn-primary px-4 py-2 text-sm flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resume Settings */}
            <div className="card p-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Settings</h3>
              
              {/* Resume Title */}
              {currentUser && (
                <div className="mb-4">
                  <label htmlFor="resumeTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    type="text"
                    id="resumeTitle"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    className="form-input"
                    placeholder="My Professional Resume"
                  />
                </div>
              )}

              {/* Template Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Template
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedTemplate === template.id
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{template.preview}</div>
                      <div className="text-xs font-medium">{template.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={resetResume}
                  className="btn-secondary flex-1 text-sm py-2"
                >
                  Reset
                </button>
                <button
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="btn-primary flex-1 text-sm py-2 flex items-center justify-center space-x-2"
                >
                  {isSaving && <div className="spinner"></div>}
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>

              {/* Save Message */}
              {saveMessage && (
                <div className={`mt-3 notification-success animate-scale-in`}>
                  {saveMessage}
                </div>
              )}
            </div>

            {/* Section Navigation */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`${
                      activeSection === section.id ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      {section.icon}
                    </div>
                    <span className="font-medium">{section.name}</span>
                    {activeSection === section.id && (
                      <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right - Form Content */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Form Section */}
              <div className="card p-6 animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {sections.find(s => s.id === activeSection)?.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill in your {sections.find(s => s.id === activeSection)?.name.toLowerCase()} details
                  </p>
                </div>
                
                <div className="space-y-6">
                  {sections.find(s => s.id === activeSection)?.component}
                </div>
              </div>

              {/* Preview Action Card */}
              <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Preview?</h3>
                  <p className="text-gray-600 mb-4">See how your resume looks with different templates</p>
                  <button
                    onClick={() => navigate('/preview')}
                    className="btn-primary px-6 py-3 text-base font-medium inline-flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Preview Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
