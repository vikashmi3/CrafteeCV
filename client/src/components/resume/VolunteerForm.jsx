import React from 'react';
import { useResume } from '../../context/ResumeContext';

const VolunteerForm = () => {
  const { resumeData, addVolunteer, updateVolunteer, removeVolunteer } = useResume();
  const { volunteer } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateVolunteer(id, { [name]: value });
  };

  const handleCurrentRoleChange = (id, isCurrentRole) => {
    const endDate = isCurrentRole ? '' : volunteer.find(vol => vol.id === id)?.endDate || '';
    updateVolunteer(id, { 
      isCurrentRole, 
      endDate 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Volunteer Experience</h3>
        <button
          type="button"
          onClick={addVolunteer}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Volunteer Experience
        </button>
      </div>

      {volunteer.map((experience) => (
        <div key={experience.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`role-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Role/Position
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="role"
                  id={`role-${experience.id}`}
                  value={experience.role}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Volunteer Teacher, Event Coordinator"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`organization-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="organization"
                  id={`organization-${experience.id}`}
                  value={experience.organization}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Red Cross, Local Food Bank"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`location-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., New York, NY or Remote"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`cause-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Cause/Area
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cause"
                  id={`cause-${experience.id}`}
                  value={experience.cause}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Education, Environment, Health"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`startDate-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="month"
                  name="startDate"
                  id={`startDate-${experience.id}`}
                  value={experience.startDate}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`endDate-${experience.id}`} className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1">
                <input
                  type="month"
                  name="endDate"
                  id={`endDate-${experience.id}`}
                  value={experience.endDate}
                  onChange={(e) => handleChange(experience.id, e)}
                  disabled={experience.isCurrentRole}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center">
              <div className="flex items-center h-5">
                <input
                  id={`current-${experience.id}`}
                  name="isCurrentRole"
                  type="checkbox"
                  checked={experience.isCurrentRole || false}
                  onChange={(e) => handleCurrentRoleChange(experience.id, e.target.checked)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`current-${experience.id}`} className="font-medium text-gray-700">
                  Currently volunteering
                </label>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`hoursPerWeek-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Hours per Week (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="hoursPerWeek"
                  id={`hoursPerWeek-${experience.id}`}
                  value={experience.hoursPerWeek}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., 10"
                  min="0"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`totalHours-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Total Hours (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="totalHours"
                  id={`totalHours-${experience.id}`}
                  value={experience.totalHours}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., 200"
                  min="0"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Description & Achievements
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${experience.id}`}
                  name="description"
                  rows={4}
                  value={experience.description}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe your volunteer work, responsibilities, and any achievements or impact..."
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`skills-${experience.id}`} className="block text-sm font-medium text-gray-700">
                Skills Developed (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="skills"
                  id={`skills-${experience.id}`}
                  value={experience.skills}
                  onChange={(e) => handleChange(experience.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Leadership, Event Planning, Public Speaking (comma-separated)"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeVolunteer(experience.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {volunteer.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No volunteer experience yet. Click "Add Volunteer Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default VolunteerForm;
