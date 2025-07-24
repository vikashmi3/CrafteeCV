import React from 'react';
import { useResume } from '../../context/ResumeContext';

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  const handleChange = (id, e) => {
    const { name, value, type, checked } = e.target;
    updateExperience(id, { [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Work Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Experience
        </button>
      </div>

      {experience.map((exp) => (
        <div key={exp.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`position-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id={`position-${exp.id}`}
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`location-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id={`location-${exp.id}`}
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="startDate"
                  id={`startDate-${exp.id}`}
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="endDate"
                  id={`endDate-${exp.id}`}
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, e)}
                  disabled={exp.current}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    exp.current ? 'bg-gray-100' : ''
                  }`}
                />
              </div>
            </div>

            <div className="sm:col-span-1 flex items-end">
              <div className="flex items-center h-5">
                <input
                  id={`current-${exp.id}`}
                  name="current"
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-700">
                  Current
                </label>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${exp.id}`}
                  name="description"
                  rows={4}
                  value={exp.description}
                  onChange={(e) => handleChange(exp.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your responsibilities, achievements, and skills used in this role."
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Use bullet points by starting lines with • or - for better readability.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {experience.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;