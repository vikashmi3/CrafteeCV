import React from 'react';
import { useResume } from '../../context/ResumeContext';

const CertificatesForm = () => {
  const { resumeData, addCertificate, updateCertificate, removeCertificate } = useResume();
  const { certificates } = resumeData;

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateCertificate(id, { [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Certificates</h3>
        <button
          type="button"
          onClick={addCertificate}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Certificate
        </button>
      </div>

      {certificates.map((cert) => (
        <div key={cert.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`name-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Certificate Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id={`name-${cert.id}`}
                  value={cert.name}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`organization-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="organization"
                  id={`organization-${cert.id}`}
                  value={cert.organization}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`dateIssued-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Date Issued
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dateIssued"
                  id={`dateIssued-${cert.id}`}
                  value={cert.dateIssued}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`expiryDate-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Expiry Date (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="expiryDate"
                  id={`expiryDate-${cert.id}`}
                  value={cert.expiryDate}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`credentialId-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Credential ID (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="credentialId"
                  id={`credentialId-${cert.id}`}
                  value={cert.credentialId}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., ABC123XYZ"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor={`url-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Verification URL (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="url"
                  id={`url-${cert.id}`}
                  value={cert.url}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor={`description-${cert.id}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id={`description-${cert.id}`}
                  name="description"
                  rows={3}
                  value={cert.description}
                  onChange={(e) => handleChange(cert.id, e)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Brief description of the certificate and skills gained..."
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => removeCertificate(cert.id)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {certificates.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No certificates yet. Click "Add Certificate" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesForm;
