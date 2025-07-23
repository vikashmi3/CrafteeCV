import React from 'react';
import { useResume } from '../../context/ResumeContext';

const SkillsForm = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateSkill(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Skills</h3>
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor={`skill-${skill.id}`} className="block text-sm font-medium text-gray-700">
                  Skill
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id={`skill-${skill.id}`}
                    value={skill.name}
                    onChange={(e) => handleChange(skill.id, e)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., JavaScript, Project Management, etc."
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`level-${skill.id}`} className="block text-sm font-medium text-gray-700">
                  Proficiency Level
                </label>
                <div className="mt-1">
                  <select
                    id={`level-${skill.id}`}
                    name="level"
                    value={skill.level}
                    onChange={(e) => handleChange(skill.id, e)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;