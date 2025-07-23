import React from 'react';
import { useResume } from '../../context/ResumeContext';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateProject(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Projects</h3>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor={`title-${project.id}`} className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id={`title-${project.id}`}
                  value={project.title}
                  onChange={(e) => handleChange(project.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`technologies-${project.id}`} className="block text-sm font-medium text-gray-700">
                Technologies Used
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="technologies"
                  id={`technologies-${project.id}`}
                  value={project.technologies}
                  onChange={(e) => handleChange(project.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`link-${project.id}`} className="block text-sm font-medium text-gray-700">
                Project Link
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="link"
                  id={`link-${project.id}`}
                  value={project.link}
                  onChange={(e) => handleChange(project.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://github.com/yourusername/project"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${project.id}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${project.id}`}
                  name="description"
                  rows={3}
                  value={project.description}
                  onChange={(e) => handleChange(project.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the project, your role, and key achievements."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(project.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;