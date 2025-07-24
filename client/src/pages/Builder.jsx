import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import ResumePreview from '../components/resume/ResumePreview';

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
      fetchResume(id);
    }
  }, [location]);

  const fetchResume = async (id) => {
    if (!currentUser) return;
    
    try {
      const resumeRef = doc(db, 'resumes', id);
      const resumeSnap = await getDoc(resumeRef);
      
      if (resumeSnap.exists() && resumeSnap.data().userId === currentUser.uid) {
        const data = resumeSnap.data();
        // Update resume context with fetched data
        // This would require adding a setResumeData function to your context
        setResumeTitle(data.title || 'My Resume');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const handleSaveResume = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const resumeToSave = {
        title: resumeTitle,
        data: resumeData,
        template: selectedTemplate,
        userId: currentUser.uid,
        updatedAt: serverTimestamp(),
        createdAt: resumeId ? undefined : serverTimestamp(),
      };
      
      const docId = resumeId || doc(collection(db, 'resumes')).id;
      await setDoc(doc(db, 'resumes', docId), resumeToSave, { merge: true });
      
      if (!resumeId) {
        setResumeId(docId);
        navigate(`/builder?id=${docId}`);
      }
      
      setSaveMessage('Resume saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving resume:', error);
      setSaveMessage('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderFormSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form */}
        <div className="lg:w-1/2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Build Your Resume</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={resetResume}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className={`p-2 mb-4 text-sm rounded-md ${saveMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {saveMessage}
              </div>
            )}

            {currentUser && (
              <div className="mb-6">
                <label htmlFor="resumeTitle" className="block text-sm font-medium text-gray-700">
                  Resume Title
                </label>
                <input
                  type="text"
                  name="resumeTitle"
                  id="resumeTitle"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                Template
              </label>
              <select
                id="template"
                name="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>

            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveSection('personalInfo')}
                  className={`${
                    activeSection === 'personalInfo'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setActiveSection('education')}
                  className={`${
                    activeSection === 'education'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveSection('experience')}
                  className={`${
                    activeSection === 'experience'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveSection('skills')}
                  className={`${
                    activeSection === 'skills'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Skills
                </button>
                <button
                  onClick={() => setActiveSection('projects')}
                  className={`${
                    activeSection === 'projects'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Projects
                </button>
              </nav>
            </div>

            <div className="mt-6">{renderFormSection()}</div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:w-1/2">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default Builder;