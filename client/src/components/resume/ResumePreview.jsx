import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      setIsDownloading(true);
      setDownloadMessage('Generating PDF...');
      
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        removeContainer: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // If content is longer than one page, add multiple pages
      if (imgHeight > 297) {
        const pageCount = Math.ceil(imgHeight / 297);
        for (let i = 0; i < pageCount; i++) {
          if (i > 0) pdf.addPage();
          const yOffset = -(297 * i);
          pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      const fileName = `${resumeData.personalInfo.firstName || 'Resume'}_${resumeData.personalInfo.lastName || 'Download'}.pdf`;
      pdf.save(fileName);
      
      setDownloadMessage('PDF downloaded successfully!');
      setTimeout(() => setDownloadMessage(''), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloadMessage('Failed to generate PDF. Please try again.');
      setTimeout(() => setDownloadMessage(''), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const printResume = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  const getTemplateName = () => {
    const templates = {
      modern: 'Modern',
      classic: 'Classic',
      minimal: 'Minimal'
    };
    return templates[selectedTemplate] || 'Modern';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
            <p className="text-sm text-gray-600">Template: {getTemplateName()}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Fullscreen Preview Button */}
            <Link
              to={`/preview?template=${selectedTemplate}`}
              className="btn-ghost flex items-center space-x-2"
              title="Open Fullscreen Preview"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="hidden sm:inline">Fullscreen</span>
            </Link>
            
            {/* Print Button */}
            <button
              onClick={printResume}
              className="btn-ghost flex items-center space-x-2"
              title="Print Resume"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="hidden sm:inline">Print</span>
            </button>
            
            {/* Download PDF Button */}
            <button
              onClick={downloadAsPDF}
              disabled={isDownloading}
              className="btn-primary flex items-center space-x-2"
            >
              {isDownloading ? (
                <>
                  <div className="spinner"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Download Message */}
        {downloadMessage && (
          <div className={`mt-3 p-3 rounded-lg text-sm animate-scale-in ${
            downloadMessage.includes('Failed') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {downloadMessage}
          </div>
        )}
      </div>
      
      {/* Preview Container */}
      <div className="relative">
        <div className="card-elevated overflow-hidden">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 no-print">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded" title="Zoom Out">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <span className="text-xs text-gray-600 px-2">100%</span>
                <button className="p-1 hover:bg-gray-100 rounded" title="Zoom In">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Resume Content */}
          <div className="resume-page" ref={resumeRef}>
            {renderTemplate()}
          </div>
        </div>
        
        {/* Paper Shadow Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-8 bg-gradient-to-t from-black/5 to-transparent transform translate-x-2 translate-y-2 rounded-lg -z-10"></div>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="card p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">ATS-Friendly Template</p>
            <p className="text-xs text-gray-600">Optimized for Applicant Tracking Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
