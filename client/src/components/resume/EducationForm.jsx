import React from 'react';
import { useResume } from '../../context/ResumeContext';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Education
        </button>
      </div>

      {education.map((edu) => (
        <div key={edu.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="institution"
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="degree"
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`fieldOfStudy-${edu.id}`} className="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fieldOfStudy"
                  id={`fieldOfStudy-${edu.id}`}
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor={`gpa-${edu.id}`} className="block text-sm font-medium text-gray-700">
                GPA
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="gpa"
                  id={`gpa-${edu.id}`}
                  value={edu.gpa}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`startDate-${edu.id}`} className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="startDate"
                  id={`startDate-${edu.id}`}
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`endDate-${edu.id}`} className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="endDate"
                  id={`endDate-${edu.id}`}
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${edu.id}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${edu.id}`}
                  name="description"
                  rows={3}
                  value={edu.description}
                  onChange={(e) => handleChange(edu.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Relevant coursework, achievements, etc."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EducationForm;