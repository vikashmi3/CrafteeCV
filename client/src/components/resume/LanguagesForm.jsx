import React from 'react';
import { useResume } from '../../context/ResumeContext';

const LanguagesForm = () => {
  const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResume();
  const { languages } = resumeData;

  const proficiencyLevels = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' },
  ];

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateLanguage(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Languages</h3>
        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Language
        </button>
      </div>

      {languages.map((language) => (
        <div key={language.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`name-${language.id}`} className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id={`name-${language.id}`}
                  value={language.name}
                  onChange={(e) => handleChange(language.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., English, Spanish, French"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`proficiency-${language.id}`} className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <div className="mt-1">
                <select
                  name="proficiency"
                  id={`proficiency-${language.id}`}
                  value={language.proficiency}
                  onChange={(e) => handleChange(language.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select proficiency level</option>
                  {proficiencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`certification-${language.id}`} className="block text-sm font-medium text-gray-700">
                Certification (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="certification"
                  id={`certification-${language.id}`}
                  value={language.certification}
                  onChange={(e) => handleChange(language.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., TOEFL, IELTS, DELF"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`score-${language.id}`} className="block text-sm font-medium text-gray-700">
                Test Score (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="score"
                  id={`score-${language.id}`}
                  value={language.score}
                  onChange={(e) => handleChange(language.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., 8.5/9, 110/120, C2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`notes-${language.id}`} className="block text-sm font-medium text-gray-700">
                Additional Notes (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id={`notes-${language.id}`}
                  name="notes"
                  rows={2}
                  value={language.notes}
                  onChange={(e) => handleChange(language.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Any additional information about your language skills..."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeLanguage(language.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {languages.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No languages yet. Click "Add Language" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;
