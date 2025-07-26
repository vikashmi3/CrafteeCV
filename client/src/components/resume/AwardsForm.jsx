import React from 'react';
import { useResume } from '../../context/ResumeContext';

const AwardsForm = () => {
  const { resumeData, addAward, updateAward, removeAward } = useResume();
  const { awards } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateAward(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Awards & Achievements</h3>
        <button
          type="button"
          onClick={addAward}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Award
        </button>
      </div>

      {awards.map((award) => (
        <div key={award.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor={`title-${award.id}`} className="block text-sm font-medium text-gray-700">
                Award Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id={`title-${award.id}`}
                  value={award.title}
                  onChange={(e) => handleChange(award.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Employee of the Year"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`date-${award.id}`} className="block text-sm font-medium text-gray-700">
                Date Received
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="date"
                  id={`date-${award.id}`}
                  value={award.date}
                  onChange={(e) => handleChange(award.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`organization-${award.id}`} className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="organization"
                  id={`organization-${award.id}`}
                  value={award.organization}
                  onChange={(e) => handleChange(award.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., ABC Company, XYZ Foundation"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`category-${award.id}`} className="block text-sm font-medium text-gray-700">
                Category (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="category"
                  id={`category-${award.id}`}
                  value={award.category}
                  onChange={(e) => handleChange(award.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Academic, Professional, Volunteer"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${award.id}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${award.id}`}
                  name="description"
                  rows={3}
                  value={award.description}
                  onChange={(e) => handleChange(award.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Brief description of the achievement and its significance..."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeAward(award.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {awards.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No awards yet. Click "Add Award" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AwardsForm;
