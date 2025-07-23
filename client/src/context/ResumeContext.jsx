import React, { createContext, useState, useContext, useEffect } from 'react';

const ResumeContext = createContext();

const initialResumeState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    objective: '',
  },
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    },
  ],
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  skills: [
    {
      id: '1',
      name: '',
      level: 'Intermediate',
    },
  ],
  projects: [
    {
      id: '1',
      title: '',
      description: '',
      technologies: '',
      link: '',
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeState;
  });
  
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (info) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  const addEducation = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: '',
        }
      ]
    }));
  };

  const updateEducation = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addExperience = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: newId,
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        }
      ]
    }));
  };

  const updateExperience = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const addSkill = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: newId,
          name: '',
          level: 'Intermediate',
        }
      ]
    }));
  };

  const updateSkill = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  const addProject = () => {
    const newId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: newId,
          title: '',
          description: '',
          technologies: '',
          link: '',
        }
      ]
    }));
  };

  const updateProject = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const resetResume = () => {
    setResumeData(initialResumeState);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        activeSection,
        setActiveSection,
        selectedTemplate,
        setSelectedTemplate,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);